import { HandProgress, Position, GradingMode, SamplingMode } from '../../types';
import { RangeCategory } from '../../components/RangeTabSelector/RangeTabSelector';

const STORAGE_KEYS = {
  HAND_PROGRESS: 'preflop_trainer_hand_progress',
  USER_SETTINGS: 'preflop_trainer_settings',
  QUIZ_STATE: 'preflop_trainer_quiz_state'
} as const;

export interface UserSettings {
  heroPosition: Position | null;
  opponentPositions: Position[];
  gradingMode: GradingMode;
  showMatrix: boolean;
  rangeCategory?: RangeCategory;
  samplingMode?: SamplingMode;
  daysAhead?: number;
  sessionLimit?: number;
}

export interface QuizState {
  currentSessionStats: {
    questionsAnswered: number;
    correctAnswers: number;
    sessionStartTime: Date;
  };
}

// Hand Progress Storage
export const saveHandProgress = (handId: string, progress: HandProgress): void => {
  try {
    const allProgress = getAllHandProgress();
    allProgress[handId] = progress;
    localStorage.setItem(STORAGE_KEYS.HAND_PROGRESS, JSON.stringify(allProgress));
  } catch (error) {
    console.error('Failed to save hand progress:', error);
  }
};

export const getHandProgress = (handId: string): HandProgress | null => {
  try {
    const allProgress = getAllHandProgress();
    return allProgress[handId] || null;
  } catch (error) {
    console.error('Failed to get hand progress:', error);
    return null;
  }
};

export const getAllHandProgress = (): Record<string, HandProgress> => {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.HAND_PROGRESS);
    if (!stored) return {};
    
    const parsed = JSON.parse(stored);
    
    // Convert date strings back to Date objects for FSRS cards
    Object.values(parsed).forEach((progress: any) => {
      if (progress.fsrsCard) {
        if (progress.fsrsCard.due) {
          progress.fsrsCard.due = new Date(progress.fsrsCard.due);
        }
        if (progress.fsrsCard.lastReview) {
          progress.fsrsCard.lastReview = new Date(progress.fsrsCard.lastReview);
        }
      }
      if (progress.reviewHistory) {
        progress.reviewHistory.forEach((review: any) => {
          if (review.reviewTime) {
            review.reviewTime = new Date(review.reviewTime);
          }
        });
      }
    });
    
    return parsed;
  } catch (error) {
    console.error('Failed to get all hand progress:', error);
    return {};
  }
};

// User Settings Storage
export const saveUserSettings = (settings: UserSettings): void => {
  try {
    localStorage.setItem(STORAGE_KEYS.USER_SETTINGS, JSON.stringify(settings));
  } catch (error) {
    console.error('Failed to save user settings:', error);
  }
};

export const getUserSettings = (): UserSettings => {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.USER_SETTINGS);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error('Failed to get user settings:', error);
  }
  
  // Return default settings
  return {
    heroPosition: null,
    opponentPositions: [],
    gradingMode: 'lax',
    showMatrix: true,
    samplingMode: 'random',
    daysAhead: 0
  };
};

// Quiz State Storage
export const saveQuizState = (state: QuizState): void => {
  try {
    localStorage.setItem(STORAGE_KEYS.QUIZ_STATE, JSON.stringify({
      ...state,
      currentSessionStats: {
        ...state.currentSessionStats,
        sessionStartTime: state.currentSessionStats.sessionStartTime.toISOString()
      }
    }));
  } catch (error) {
    console.error('Failed to save quiz state:', error);
  }
};

export const getQuizState = (): QuizState => {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.QUIZ_STATE);
    if (stored) {
      const parsed = JSON.parse(stored);
      return {
        ...parsed,
        currentSessionStats: {
          ...parsed.currentSessionStats,
          sessionStartTime: new Date(parsed.currentSessionStats.sessionStartTime)
        }
      };
    }
  } catch (error) {
    console.error('Failed to get quiz state:', error);
  }
  
  // Return default state
  return {
    currentSessionStats: {
      questionsAnswered: 0,
      correctAnswers: 0,
      sessionStartTime: new Date()
    }
  };
};

// Utility functions
export const clearAllData = (): void => {
  try {
    Object.values(STORAGE_KEYS).forEach(key => {
      localStorage.removeItem(key);
    });
  } catch (error) {
    console.error('Failed to clear all data:', error);
  }
};

export const exportData = (): string => {
  try {
    const data = {
      handProgress: getAllHandProgress(),
      userSettings: getUserSettings(),
      quizState: getQuizState(),
      exportDate: new Date().toISOString()
    };
    return JSON.stringify(data, null, 2);
  } catch (error) {
    console.error('Failed to export data:', error);
    return '';
  }
};

export const importData = (jsonData: string): boolean => {
  try {
    const data = JSON.parse(jsonData);
    
    if (data.handProgress) {
      localStorage.setItem(STORAGE_KEYS.HAND_PROGRESS, JSON.stringify(data.handProgress));
    }
    
    if (data.userSettings) {
      localStorage.setItem(STORAGE_KEYS.USER_SETTINGS, JSON.stringify(data.userSettings));
    }
    
    if (data.quizState) {
      saveQuizState(data.quizState);
    }
    
    return true;
  } catch (error) {
    console.error('Failed to import data:', error);
    return false;
  }
};