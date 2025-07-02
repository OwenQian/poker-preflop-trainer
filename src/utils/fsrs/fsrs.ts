import { FSRSCard, FSRSParameters, FSRSRating } from '../../types';

// Default FSRS-4 parameters (original)
export const DEFAULT_FSRS_PARAMETERS: FSRSParameters = {
  requestRetention: 0.9,
  maximumInterval: 36500, // 100 years in days
  weights: [
    0.4072, 1.1829, 3.1262, 15.4722, 7.2102, 0.5316, 1.0651, 0.0234,
    1.616, 0.1544, 1.0824, 1.9813, 0.0953, 0.2975, 2.2042, 0.2407,
    2.9466, 0.5034, 0.6567, 0.0000, 2.1115
  ]
};

// Poker-optimized FSRS parameters
// Designed for poker decision training where:
// - New cards should appear 2-3 times if answered correctly
// - Wrong cards need 2-3 correct answers to graduate
// - Reduced aggressive rescheduling to prevent stuck cards
export const POKER_FSRS_PARAMETERS: FSRSParameters = {
  requestRetention: 0.85, // Slightly lower retention to reduce frequency
  maximumInterval: 30, // Max 30 days for active training
  weights: [
    2.0,    // w[0] - Initial stability for new cards (increased from 0.4072)
    1.5,    // w[1] - Stability growth factor (increased from 1.1829)
    4.0,    // w[2] - Learning stability multiplier (increased from 3.1262)
    20.0,   // w[3] - Review stability multiplier (increased from 15.4722) 
    6.0,    // w[4] - Difficulty factor (reduced from 7.2102)
    0.3,    // w[5] - Difficulty decay (reduced from 0.5316)
    0.8,    // w[6] - Lapse difficulty penalty (reduced from 1.0651)
    0.02,   // w[7] - Mean reversion factor (reduced from 0.0234)
    1.2,    // w[8] - Difficulty adjustment (reduced from 1.616)
    0.1,    // w[9] - Stability factor (reduced from 0.1544)
    0.8,    // w[10] - Minimum stability (reduced from 1.0824)
    1.5,    // w[11] - Lapse stability penalty (reduced from 1.9813)
    0.05,   // w[12] - Minimum difficulty (reduced from 0.0953)
    0.2,    // w[13] - Difficulty scaling (reduced from 0.2975)
    1.8,    // w[14] - Stability scaling (reduced from 2.2042)
    0.15,   // w[15] - Hard penalty (reduced from 0.2407)
    2.5,    // w[16] - Easy bonus (reduced from 2.9466)
    0.4,    // w[17] - Base factor (reduced from 0.5034)
    0.5,    // w[18] - Stability factor (reduced from 0.6567)
    0.0,    // w[19] - Unused (same as original)
    1.8     // w[20] - Final factor (reduced from 2.1115)
  ]
};

export class FSRS {
  private parameters: FSRSParameters;

  constructor(parameters: FSRSParameters = POKER_FSRS_PARAMETERS) {
    this.parameters = parameters;
  }

  // Create a new card
  createCard(): FSRSCard {
    return {
      due: new Date(),
      stability: 0,
      difficulty: 0,
      elapsedDays: 0,
      scheduledDays: 0,
      reps: 0,
      lapses: 0,
      state: 'new'
    };
  }

  // Calculate next review schedule based on rating
  repeat(card: FSRSCard, rating: FSRSRating, now: Date = new Date()): FSRSCard {
    const newCard = { ...card };
    
    if (card.state === 'new') {
      newCard.elapsedDays = 0;
    } else {
      newCard.elapsedDays = Math.max(0, Math.floor((now.getTime() - card.due.getTime()) / (1000 * 60 * 60 * 24)));
    }

    newCard.lastReview = now;
    newCard.reps += 1;

    if (card.state === 'new') {
      this.initDS(newCard);
      newCard.difficulty = this.constrainDifficulty(newCard.difficulty + this.parameters.weights[4] * (rating - 3));
      newCard.difficulty = this.meanReversion(this.parameters.weights[7], newCard.difficulty, newCard);
      newCard.difficulty = this.constrainDifficulty(newCard.difficulty);

      if (rating === 1) {
        // Wrong answer - short interval, stay in learning
        newCard.scheduledDays = 0.1; // ~2.4 hours - review in same session
        newCard.state = 'learning';
      } else if (rating === 2) {
        // Hard - longer learning interval
        newCard.scheduledDays = 1; // 1 day
        newCard.state = 'learning';
      } else if (rating === 3) {
        // Good - graduate to review with longer interval
        newCard.scheduledDays = 3; // 3 days (reduced from 10)
        newCard.state = 'review';
        newCard.stability = this.calculateStability(newCard, rating);
      } else {
        // Easy - longer initial interval
        newCard.scheduledDays = 7; // 1 week (increased from 4)
        newCard.state = 'review';
        newCard.stability = this.calculateStability(newCard, rating);
      }
    } else if (card.state === 'learning' || card.state === 'review') {
      if (rating === 1) {
        // Wrong answer - back to learning with short interval
        newCard.lapses += 1;
        newCard.difficulty = this.constrainDifficulty(newCard.difficulty + this.parameters.weights[6]);
        newCard.stability = this.calculateStability(newCard, rating) * Math.exp(this.parameters.weights[11] * (rating - 3));
        newCard.scheduledDays = 0.1; // ~2.4 hours - review in same session
        newCard.state = 'learning';
      } else {
        // Correct answer - calculate next interval based on stability
        newCard.difficulty = this.constrainDifficulty(newCard.difficulty + this.parameters.weights[8] * (rating - 3));
        newCard.difficulty = this.meanReversion(this.parameters.weights[7], newCard.difficulty, newCard);
        newCard.stability = this.calculateStability(newCard, rating);
        
        // Use calculated interval but with poker-specific constraints
        let calculatedInterval = this.nextInterval(newCard.stability);
        
        // For learning cards, graduation requires at least 2 correct answers
        if (card.state === 'learning') {
          if (newCard.reps >= 2) {
            // Graduate to review state with reasonable interval
            newCard.scheduledDays = Math.min(calculatedInterval, 3); // Max 3 days initially
            newCard.state = 'review';
          } else {
            // Still in learning, but longer interval than before
            newCard.scheduledDays = Math.min(calculatedInterval, 1); // Max 1 day for learning
            newCard.state = 'learning';
          }
        } else {
          // Already in review state
          newCard.scheduledDays = Math.min(calculatedInterval, this.parameters.maximumInterval);
          newCard.state = 'review';
        }
      }
    }

    // Calculate due date as milliseconds since epoch for consistent storage
    newCard.due = new Date(now.getTime() + newCard.scheduledDays * 24 * 60 * 60 * 1000);
    return newCard;
  }

  private initDS(card: FSRSCard): void {
    card.difficulty = this.parameters.weights[4] - Math.exp(this.parameters.weights[5] * card.reps) + 1;
    card.difficulty = this.constrainDifficulty(card.difficulty);
    card.stability = this.parameters.weights[0] + this.parameters.weights[1] * card.reps;
  }

  private calculateStability(card: FSRSCard, rating: FSRSRating): number {
    let hardPenalty = rating === 2 ? this.parameters.weights[15] : 1;
    let easyBonus = rating === 4 ? this.parameters.weights[16] : 1;

    if (card.state === 'new') {
      return Math.max(card.stability * Math.exp(this.parameters.weights[8] * (rating - 3)) * hardPenalty * easyBonus, 0.01);
    } else {
      let factor = Math.exp(this.parameters.weights[8] * (rating - 3)) * hardPenalty * easyBonus;
      let decay = Math.pow(card.elapsedDays / card.stability, this.parameters.weights[9]);
      let stability = card.stability * (1 + factor * decay);
      return Math.max(stability, 0.01);
    }
  }

  private nextInterval(stability: number): number {
    const interval = stability * (Math.log(this.parameters.requestRetention) / Math.log(0.9));
    return Math.min(Math.max(Math.round(interval), 1), this.parameters.maximumInterval);
  }

  private constrainDifficulty(difficulty: number): number {
    return Math.min(Math.max(difficulty, 1), 10);
  }

  private meanReversion(weight: number, current: number, card: FSRSCard): number {
    return weight * (4 - current) + current;
  }

  // Get cards due for review
  getDueCards(cards: FSRSCard[], now: Date = new Date()): FSRSCard[] {
    return cards.filter(card => card.due <= now);
  }

  // Calculate retention rate
  calculateRetention(card: FSRSCard, days: number): number {
    return Math.exp(-days / card.stability);
  }
}
