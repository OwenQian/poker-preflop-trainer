import { HandProgress, Position, GradingMode } from '../../types';
import { RangeCategory } from '../../components/RangeTabSelector/RangeTabSelector';
import { getHandIdsForRange } from '../fsrs/quizIntegration';

export interface AppState {
  version: string;
  exportDate: string;
  handProgress: Record<string, HandProgress>;
  userSettings: {
    heroPosition: string | null;
    opponentPositions: string[];
    gradingMode: string;
    showMatrix: boolean;
    rangeCategory: string;
  };
  sessionStats: {
    totalQuestions: number;
    totalCorrect: number;
    allTimeAccuracy: number;
    lastSessionDate: string;
  };
}

export interface SelectiveExportOptions {
  heroPosition: Position;
  opponentPositions: Position[];
  gradingMode: GradingMode;
  rangeCategory: RangeCategory;
  description?: string;
}

export interface SelectiveAppState {
  version: string;
  exportDate: string;
  exportType: 'selective';
  selection: SelectiveExportOptions;
  handProgress: Record<string, HandProgress>;
  sessionStats: {
    totalQuestions: number;
    totalCorrect: number;
    allTimeAccuracy: number;
    lastSessionDate: string;
  };
}

export const exportAppState = (): AppState => {
  // Get all localStorage data
  const handProgressData = localStorage.getItem('preflop_trainer_hand_progress');
  const userSettingsData = localStorage.getItem('preflop_trainer_settings');
  const quizStateData = localStorage.getItem('preflop_trainer_quiz_state');

  // Parse localStorage data
  const handProgress = handProgressData ? JSON.parse(handProgressData) : {};
  const userSettings = userSettingsData ? JSON.parse(userSettingsData) : {
    heroPosition: null,
    opponentPositions: [],
    gradingMode: 'lax',
    showMatrix: true,
    rangeCategory: 'RFI'
  };
  const quizState = quizStateData ? JSON.parse(quizStateData) : {
    currentSessionStats: { questionsAnswered: 0, correctAnswers: 0 }
  };

  // Calculate aggregated stats
  const allHandProgress = Object.values(handProgress) as HandProgress[];
  const totalQuestions = allHandProgress.reduce((sum, progress) => sum + progress.performanceStats.totalReviews, 0);
  const totalCorrect = allHandProgress.reduce((sum, progress) => 
    sum + Math.round(progress.performanceStats.totalReviews * progress.performanceStats.accuracyRate), 0);

  return {
    version: '1.0.0',
    exportDate: new Date().toISOString(),
    handProgress,
    userSettings,
    sessionStats: {
      totalQuestions,
      totalCorrect,
      allTimeAccuracy: totalQuestions > 0 ? totalCorrect / totalQuestions : 0,
      lastSessionDate: new Date().toISOString()
    }
  };
};

export const importAppState = (stateData: AppState): void => {
  // Validate state data
  if (!stateData.version || !stateData.handProgress) {
    throw new Error('Invalid state file format');
  }

  // Import hand progress
  localStorage.setItem('preflop_trainer_hand_progress', JSON.stringify(stateData.handProgress));
  
  // Import user settings
  localStorage.setItem('preflop_trainer_settings', JSON.stringify(stateData.userSettings));
  
  // Update quiz state with imported session stats
  const currentQuizState = localStorage.getItem('preflop_trainer_quiz_state');
  const quizState = currentQuizState ? JSON.parse(currentQuizState) : {};
  quizState.allTimeStats = stateData.sessionStats;
  localStorage.setItem('preflop_trainer_quiz_state', JSON.stringify(quizState));
};

export const downloadStateFile = (state: AppState, filename?: string): void => {
  const dataStr = JSON.stringify(state, null, 2);
  const dataBlob = new Blob([dataStr], { type: 'application/json' });
  const url = URL.createObjectURL(dataBlob);
  
  const link = document.createElement('a');
  link.href = url;
  link.download = filename || `preflop-trainer-state-${new Date().toISOString().split('T')[0]}.json`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  
  URL.revokeObjectURL(url);
};

export const getStateAsText = (state: AppState): string => {
  return JSON.stringify(state, null, 2);
};

export const parseStateFromText = (text: string): AppState => {
  try {
    const parsed = JSON.parse(text);
    if (!parsed.version || !parsed.handProgress) {
      throw new Error('Invalid state format');
    }
    return parsed;
  } catch (error) {
    throw new Error('Failed to parse state data: ' + (error as Error).message);
  }
};

export const copyStateToClipboard = async (state: AppState): Promise<void> => {
  const stateText = getStateAsText(state);
  
  if (navigator.clipboard && window.isSecureContext) {
    await navigator.clipboard.writeText(stateText);
  } else {
    // Fallback for older browsers
    const textArea = document.createElement('textarea');
    textArea.value = stateText;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    document.execCommand('copy');
    textArea.remove();
  }
};

// Selective export - exports only progress for a specific range/grading mode combination
export const exportSelectiveAppState = (options: SelectiveExportOptions): SelectiveAppState => {
  // Get all localStorage data
  const handProgressData = localStorage.getItem('preflop_trainer_hand_progress');
  const allHandProgress = handProgressData ? JSON.parse(handProgressData) : {};

  // Get handIds for the specified range
  const handIds = getHandIdsForRange(
    options.heroPosition,
    options.opponentPositions,
    options.gradingMode,
    options.rangeCategory
  );

  // Filter handProgress to only include the specific range
  const filteredHandProgress: Record<string, HandProgress> = {};
  handIds.forEach(handId => {
    if (allHandProgress[handId]) {
      filteredHandProgress[handId] = allHandProgress[handId];
    }
  });

  // Calculate stats for the filtered data
  const progressArray = Object.values(filteredHandProgress) as HandProgress[];
  const totalQuestions = progressArray.reduce((sum, progress) => sum + progress.performanceStats.totalReviews, 0);
  const totalCorrect = progressArray.reduce((sum, progress) => 
    sum + Math.round(progress.performanceStats.totalReviews * progress.performanceStats.accuracyRate), 0);

  return {
    version: '1.0.0',
    exportDate: new Date().toISOString(),
    exportType: 'selective',
    selection: options,
    handProgress: filteredHandProgress,
    sessionStats: {
      totalQuestions,
      totalCorrect,
      allTimeAccuracy: totalQuestions > 0 ? totalCorrect / totalQuestions : 0,
      lastSessionDate: new Date().toISOString()
    }
  };
};

// Selective import - imports progress for only the specified range, leaving other data intact
export const importSelectiveAppState = (selectiveData: SelectiveAppState): void => {
  // Validate selective state data
  if (!selectiveData.version || !selectiveData.handProgress || selectiveData.exportType !== 'selective') {
    throw new Error('Invalid selective state file format');
  }

  // Get existing hand progress
  const existingProgressData = localStorage.getItem('preflop_trainer_hand_progress');
  const existingProgress = existingProgressData ? JSON.parse(existingProgressData) : {};

  // Merge selective import with existing data
  const mergedProgress = { ...existingProgress, ...selectiveData.handProgress };

  // Save merged progress back to localStorage
  localStorage.setItem('preflop_trainer_hand_progress', JSON.stringify(mergedProgress));

  console.log(`Imported selective data for ${Object.keys(selectiveData.handProgress).length} hands:`, {
    selection: selectiveData.selection,
    stats: selectiveData.sessionStats
  });
};

// Generate description for selective export
export const getSelectiveExportDescription = (options: SelectiveExportOptions): string => {
  const { heroPosition, opponentPositions, gradingMode, rangeCategory } = options;
  
  let description = `${gradingMode.charAt(0).toUpperCase() + gradingMode.slice(1)} mode - `;
  
  switch (rangeCategory) {
    case 'RFI':
      description += `${heroPosition} RFI`;
      break;
    case 'vs RFI':
      description += `${heroPosition} vs ${opponentPositions[0] || 'opponent'} RFI`;
      break;
    case 'RFI vs 3bet':
      description += `${heroPosition} RFI vs ${opponentPositions[0] || 'opponent'} 3bet`;
      break;
    case '3bet vs 4bet':
      description += `${heroPosition} 3bet vs ${opponentPositions[0] || 'opponent'} 4bet`;
      break;
    case '4bet vs JAM':
      description += `${heroPosition} 4bet vs ${opponentPositions[0] || 'opponent'} jam`;
      break;
    case 'vs Limp':
      description += `${heroPosition} vs ${opponentPositions[0] || 'opponent'} limp`;
      break;
    case 'squeeze':
      description += `${heroPosition} squeeze vs ${opponentPositions.join(' & ')}`;
      break;
    default:
      description += `${heroPosition} ${rangeCategory}`;
  }
  
  return description;
};

// Utilities for selective export
export const downloadSelectiveStateFile = (selectiveState: SelectiveAppState, filename?: string): void => {
  const description = getSelectiveExportDescription(selectiveState.selection);
  const dataStr = JSON.stringify(selectiveState, null, 2);
  const dataBlob = new Blob([dataStr], { type: 'application/json' });
  const url = URL.createObjectURL(dataBlob);
  
  const link = document.createElement('a');
  link.href = url;
  link.download = filename || `preflop-trainer-selective-${description.replace(/\s+/g, '-').toLowerCase()}-${new Date().toISOString().split('T')[0]}.json`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  
  URL.revokeObjectURL(url);
};

export const getSelectiveStateAsText = (selectiveState: SelectiveAppState): string => {
  return JSON.stringify(selectiveState, null, 2);
};

export const parseSelectiveStateFromText = (text: string): SelectiveAppState => {
  try {
    const parsed = JSON.parse(text);
    if (!parsed.version || !parsed.handProgress || parsed.exportType !== 'selective') {
      throw new Error('Invalid selective state format');
    }
    return parsed;
  } catch (error) {
    throw new Error('Failed to parse selective state data: ' + (error as Error).message);
  }
};

export const copySelectiveStateToClipboard = async (selectiveState: SelectiveAppState): Promise<void> => {
  const stateText = getSelectiveStateAsText(selectiveState);
  
  if (navigator.clipboard && window.isSecureContext) {
    await navigator.clipboard.writeText(stateText);
  } else {
    // Fallback for older browsers
    const textArea = document.createElement('textarea');
    textArea.value = stateText;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    document.execCommand('copy');
    textArea.remove();
  }
};