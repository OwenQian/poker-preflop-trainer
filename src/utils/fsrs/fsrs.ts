import { FSRSCard, FSRSParameters, FSRSRating } from '../../types';

// Default FSRS-4 parameters
export const DEFAULT_FSRS_PARAMETERS: FSRSParameters = {
  requestRetention: 0.9,
  maximumInterval: 36500, // 100 years in days
  weights: [
    0.4072, 1.1829, 3.1262, 15.4722, 7.2102, 0.5316, 1.0651, 0.0234,
    1.616, 0.1544, 1.0824, 1.9813, 0.0953, 0.2975, 2.2042, 0.2407,
    2.9466, 0.5034, 0.6567, 0.0000, 2.1115
  ]
};

export class FSRS {
  private parameters: FSRSParameters;

  constructor(parameters: FSRSParameters = DEFAULT_FSRS_PARAMETERS) {
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
        newCard.scheduledDays = 1;
        newCard.state = 'learning';
      } else if (rating === 2) {
        newCard.scheduledDays = 6;
        newCard.state = 'learning';
      } else if (rating === 3) {
        newCard.scheduledDays = 10;
        newCard.state = 'review';
        newCard.stability = this.calculateStability(newCard, rating);
      } else {
        newCard.scheduledDays = 4;
        newCard.state = 'review';
        newCard.stability = this.calculateStability(newCard, rating);
      }
    } else if (card.state === 'learning' || card.state === 'review') {
      if (rating === 1) {
        newCard.lapses += 1;
        newCard.difficulty = this.constrainDifficulty(newCard.difficulty + this.parameters.weights[6]);
        newCard.stability = this.calculateStability(newCard, rating) * Math.exp(this.parameters.weights[11] * (rating - 3));
        newCard.scheduledDays = 1;
        newCard.state = 'learning';
      } else {
        newCard.difficulty = this.constrainDifficulty(newCard.difficulty + this.parameters.weights[8] * (rating - 3));
        newCard.difficulty = this.meanReversion(this.parameters.weights[7], newCard.difficulty, newCard);
        newCard.stability = this.calculateStability(newCard, rating);
        newCard.scheduledDays = this.nextInterval(newCard.stability);
        newCard.state = 'review';
      }
    }

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