export type Suit = 'hearts' | 'diamonds' | 'clubs' | 'spades';
export type Rank = 'A' | 'K' | 'Q' | 'J' | 'T' | '9' | '8' | '7' | '6' | '5' | '4' | '3' | '2';

export interface Card {
  suit: Suit;
  rank: Rank;
}

export interface Hand {
  card1: Card;
  card2: Card;
}

export type HandName = string; // e.g., "AA", "AKs", "72o"

export type Position = 'UTG' | 'UTG+1' | 'LJ' | 'HJ' | 'CO' | 'BU' | 'SB' | 'BB';

export type Action = 'raise' | 'call' | 'fold';

export interface HandFrequencies {
  raise: number;
  call: number;
  fold: number;
}

export interface RangeData {
  positionCombo: string;
  hands: Record<HandName, HandFrequencies>;
}

export type GradingMode = 'strict' | 'lax' | 'randomizer';

// FSRS-4 Types
export type FSRSRating = 1 | 2 | 3 | 4; // Again, Hard, Good, Easy
export type CardState = 'new' | 'learning' | 'review';

export interface FSRSCard {
  due: Date;
  stability: number;
  difficulty: number;
  elapsedDays: number;
  scheduledDays: number;
  reps: number;
  lapses: number;
  state: CardState;
  lastReview?: Date;
}

export interface FSRSReview {
  rating: FSRSRating;
  reviewTime: Date;
}

export interface FSRSParameters {
  requestRetention: number;
  maximumInterval: number;
  weights: number[];
}

export interface HandProgress {
  handId: string;
  fsrsCard: FSRSCard;
  reviewHistory: FSRSReview[];
  performanceStats: {
    totalReviews: number;
    correctStreak: number;
    accuracyRate: number;
  };
}

export interface QuizQuestion {
  hand: Hand;
  handName: HandName;
  position: Position;
  opponents: Position[];
  correctActions: Action[];
  frequencies: HandFrequencies;
}

export interface QuizAnswer {
  selectedActions: Action[];
  confidence: FSRSRating;
}

export interface QuizResult {
  question: QuizQuestion;
  answer: QuizAnswer;
  isCorrect: boolean;
  explanation: string;
}