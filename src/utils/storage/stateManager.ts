import { HandProgress } from '../../types';

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