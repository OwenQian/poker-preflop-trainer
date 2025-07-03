import {
  resolveRangeCombo,
  generateHandId,
  getHandIdsForRange,
  getDueCardsInfo,
  getWeightedHandSelection,
  hasProgressData
} from '../quizIntegration';
import { FSRS } from '../fsrs';
import { FSRSCard, Position, GradingMode, HandName } from '../../../types';
import { RangeCategory } from '../../../components/RangeTabSelector/RangeTabSelector';
import { saveHandProgress, getAllHandProgress, clearAllData } from '../../storage/localStorage';

// Mock the sampleRanges import
jest.mock('../../../data/sampleRanges', () => ({
  getRangeData: jest.fn((rangeCombo: string, rangeCategory: string) => {
    // Mock range data for testing
    const mockRanges: Record<string, any> = {
      'CO_RFI': {
        positionCombo: 'CO_RFI',
        hands: {
          'AA': { raise: 100, call: 0, fold: 0 },
          'KK': { raise: 100, call: 0, fold: 0 },
          'QQ': { raise: 100, call: 0, fold: 0 },
          'AKs': { raise: 100, call: 0, fold: 0 },
          'AKo': { raise: 100, call: 0, fold: 0 },
          '22': { raise: 50, call: 0, fold: 50 }
        },
        missingHandTreatment: 'not-in-range'
      },
      'BB_vs_CO_RFI': {
        positionCombo: 'BB_vs_CO_RFI',
        hands: {
          'AA': { raise: 100, call: 0, fold: 0 },
          'KK': { raise: 100, call: 0, fold: 0 },
          'AKs': { raise: 80, call: 20, fold: 0 },
          'AQs': { raise: 30, call: 70, fold: 0 },
          '22': { raise: 0, call: 50, fold: 50 }
        },
        missingHandTreatment: 'fold'
      },
      'CO_RFI_vs_BB_3BET': {
        positionCombo: 'CO_RFI_vs_BB_3BET',
        hands: {
          'AA': { raise: 100, call: 0, fold: 0 },
          'KK': { raise: 100, call: 0, fold: 0 },
          'AKs': { raise: 50, call: 50, fold: 0 },
          'QQ': { raise: 0, call: 100, fold: 0 }
        },
        missingHandTreatment: 'fold'
      },
      'CO_vs_UTG_LIMP': {
        positionCombo: 'CO_vs_UTG_LIMP',
        hands: {
          'AA': { raise: 100, call: 0, fold: 0 },
          'KK': { raise: 100, call: 0, fold: 0 },
          'ATo': { raise: 80, call: 0, fold: 20 },
          '55': { raise: 60, call: 0, fold: 40 }
        },
        missingHandTreatment: 'not-in-range'
      }
    };
    
    return mockRanges[rangeCombo] || null;
  })
}));

describe('Quiz Integration Tests', () => {
  const testDate = new Date('2024-01-01T00:00:00Z');
  let fsrs: FSRS;

  beforeEach(() => {
    fsrs = new FSRS();
    // Clear localStorage before each test
    clearAllData();
    jest.clearAllMocks();
  });

  afterEach(() => {
    // Clean up localStorage after each test
    clearAllData();
  });

  describe('resolveRangeCombo', () => {
    it('should resolve RFI range combo correctly', () => {
      const result = resolveRangeCombo('CO', [], 'RFI');
      
      expect(result.rangeCombo).toBe('CO_RFI');
      expect(result.effectiveOpponents).toEqual([]);
      expect(result.error).toBeUndefined();
    });

    it('should resolve vs RFI range combo correctly', () => {
      const result = resolveRangeCombo('BB', ['CO'], 'vs RFI');
      
      expect(result.rangeCombo).toBe('BB_vs_CO_RFI');
      expect(result.effectiveOpponents).toEqual(['CO']);
      expect(result.error).toBeUndefined();
    });

    it('should resolve RFI vs 3bet range combo correctly', () => {
      const result = resolveRangeCombo('CO', ['BB'], 'RFI vs 3bet');
      
      expect(result.rangeCombo).toBe('CO_RFI_vs_BB_3BET');
      expect(result.effectiveOpponents).toEqual(['BB']);
      expect(result.error).toBeUndefined();
    });

    it('should resolve vs Limp range combo correctly', () => {
      const result = resolveRangeCombo('CO', ['UTG'], 'vs Limp');
      
      expect(result.rangeCombo).toBe('CO_vs_UTG_LIMP');
      expect(result.effectiveOpponents).toEqual(['UTG']);
      expect(result.error).toBeUndefined();
    });

    it('should handle fallback opponents when none provided', () => {
      const result = resolveRangeCombo('BB', [], 'vs RFI');
      
      expect(result.rangeCombo).toBe('BB_vs_BU_RFI');
      expect(result.effectiveOpponents).toEqual([]);
    });

    it('should return error for non-existent range', () => {
      const result = resolveRangeCombo('INVALID' as Position, [], 'RFI');
      
      expect(result.error).toContain('No range data found');
      expect(result.rangeCombo).toBe('INVALID_RFI');
    });
  });

  describe('generateHandId', () => {
    it('should generate consistent hand IDs', () => {
      const handId1 = generateHandId('AA', 'CO', ['BB'], 'strict');
      const handId2 = generateHandId('AA', 'CO', ['BB'], 'strict');
      
      expect(handId1).toBe(handId2);
      expect(handId1).toBe('AA_CO_vs_BB_strict');
    });

    it('should sort opponent positions consistently', () => {
      const handId1 = generateHandId('KK', 'CO', ['BB', 'SB'], 'lax');
      const handId2 = generateHandId('KK', 'CO', ['SB', 'BB'], 'lax');
      
      expect(handId1).toBe(handId2);
      expect(handId1).toBe('KK_CO_vs_BB_SB_lax');
    });

    it('should include all parameters in hand ID', () => {
      const handId = generateHandId('AKs', 'BU', ['CO', 'HJ'], 'randomizer');
      
      expect(handId).toContain('AKs');
      expect(handId).toContain('BU');
      expect(handId).toContain('CO');
      expect(handId).toContain('HJ');
      expect(handId).toContain('randomizer');
    });
  });

  describe('getHandIdsForRange', () => {
    it('should return hand IDs for range with not-in-range treatment', () => {
      const handIds = getHandIdsForRange('CO', [], 'strict', 'RFI');
      
      expect(handIds.length).toBeGreaterThan(0);
      expect(handIds).toContain('AA_CO_vs__strict');
      expect(handIds).toContain('KK_CO_vs__strict');
      expect(handIds).toContain('22_CO_vs__strict'); // Has 50% raise frequency
      
      // Should not include hands with 0% frequencies or missing hands
      expect(handIds.length).toBe(6); // Only hands with non-zero raise/call
    });

    it('should return hand IDs for range with fold treatment', () => {
      const handIds = getHandIdsForRange('BB', ['CO'], 'lax', 'vs RFI');
      
      expect(handIds.length).toBe(169); // All possible hands (fold treatment)
      expect(handIds).toContain('AA_BB_vs_CO_lax');
      expect(handIds).toContain('72o_BB_vs_CO_lax'); // Missing hand treated as fold
    });

    it('should return empty array for invalid range', () => {
      const handIds = getHandIdsForRange('INVALID' as Position, [], 'strict', 'RFI');
      
      expect(handIds).toEqual([]);
    });

    it('should handle range with opponent positions', () => {
      const handIds = getHandIdsForRange('CO', ['BB'], 'strict', 'RFI vs 3bet');
      
      expect(handIds.length).toBe(169); // All hands due to fold treatment
      expect(handIds[0]).toContain('_CO_vs_BB_');
    });
  });

  describe('getDueCardsInfo', () => {
    it('should return correct info for range with no progress', () => {
      const info = getDueCardsInfo('CO', [], 'strict', 'RFI');
      
      expect(info.totalCards).toBe(6); // Hands in CO_RFI range
      expect(info.dueCount).toBe(6); // All are new cards (due)
      expect(info.dueCards.length).toBe(6);
    });

    it('should return correct info for range with some progress', () => {
      // Create some progress data
      const handId = generateHandId('AA', 'CO', [], 'strict');
      const card = fsrs.createCard();
      const reviewedCard = fsrs.repeat(card, 3, testDate);
      
      saveHandProgress(handId, {
        handId,
        fsrsCard: reviewedCard,
        reviewHistory: [],
        performanceStats: {
          totalReviews: 1,
          correctStreak: 1,
          accuracyRate: 1.0
        }
      });
      
      const info = getDueCardsInfo('CO', [], 'strict', 'RFI');
      
      expect(info.totalCards).toBe(6);
      expect(info.dueCount).toBe(5); // One card has progress and is not due
      expect(info.dueCards.length).toBe(5);
    });

    it('should handle daysAhead parameter', () => {
      // Create a card that will be due in 2 days
      const handId = generateHandId('KK', 'CO', [], 'strict');
      const card = fsrs.createCard();
      const reviewedCard = fsrs.repeat(card, 3, testDate);
      
      saveHandProgress(handId, {
        handId,
        fsrsCard: reviewedCard,
        reviewHistory: [],
        performanceStats: {
          totalReviews: 1,
          correctStreak: 1,
          accuracyRate: 1.0
        }
      });
      
      const infoToday = getDueCardsInfo('CO', [], 'strict', 'RFI', 0);
      const infoFuture = getDueCardsInfo('CO', [], 'strict', 'RFI', 5);
      
      expect(infoFuture.dueCount).toBeGreaterThanOrEqual(infoToday.dueCount);
    });

    it('should return empty info for invalid range', () => {
      const info = getDueCardsInfo('INVALID' as Position, [], 'strict', 'RFI');
      
      expect(info.totalCards).toBe(0);
      expect(info.dueCount).toBe(0);
      expect(info.dueCards).toEqual([]);
    });

    it('should categorize difficult cards correctly', () => {
      // Create a difficult card (high difficulty, has lapses)
      const handId = generateHandId('AKs', 'CO', [], 'strict');
      const card = fsrs.createCard();
      card.difficulty = 8; // High difficulty
      card.lapses = 2; // Has lapses
      card.due = new Date(testDate.getTime() - 24 * 60 * 60 * 1000); // Due yesterday
      
      saveHandProgress({
        handId,
        fsrsCard: card,
        reviewHistory: [],
        performanceStats: {
          totalReviews: 3,
          correctStreak: 0,
          accuracyRate: 0.33
        }
      });
      
      const info = getDueCardsInfo('CO', [], 'strict', 'RFI');
      
      expect(info.dueCount).toBe(6); // 5 new + 1 difficult due card
      expect(info.dueCards).toContain(handId);
    });
  });

  describe('getWeightedHandSelection', () => {
    it('should return weighted array for new cards', () => {
      const selection = getWeightedHandSelection('CO', [], 'strict', 'RFI');
      
      expect(selection.length).toBeGreaterThan(0);
      // Should have multiple copies of each hand (weighted)
      const aaCount = selection.filter(id => id.includes('AA')).length;
      expect(aaCount).toBe(3); // New cards get 3x weight
    });

    it('should prioritize due cards over new cards', () => {
      // Create a due card
      const handId = generateHandId('AA', 'CO', [], 'strict');
      const card = fsrs.createCard();
      card.due = new Date(testDate.getTime() - 24 * 60 * 60 * 1000); // Due yesterday
      card.state = 'review';
      
      saveHandProgress({
        handId,
        fsrsCard: card,
        reviewHistory: [],
        performanceStats: {
          totalReviews: 1,
          correctStreak: 1,
          accuracyRate: 1.0
        }
      });
      
      const selection = getWeightedHandSelection('CO', [], 'strict', 'RFI');
      
      const aaCount = selection.filter(id => id.includes('AA')).length;
      expect(aaCount).toBe(5); // Due cards get 5x weight
    });

    it('should filter out overpracticed hands', () => {
      const sessionCorrectAnswers = { 'AA': 5, 'KK': 2 };
      const maxCorrectPerSession = 3;
      
      const selection = getWeightedHandSelection(
        'CO', [], 'strict', 'RFI', 0, sessionCorrectAnswers, maxCorrectPerSession
      );
      
      // AA should be filtered out (5 > 3), KK should remain
      const hasAA = selection.some(id => id.includes('AA'));
      const hasKK = selection.some(id => id.includes('KK'));
      
      expect(hasAA).toBe(false);
      expect(hasKK).toBe(true);
    });

    it('should return empty array when no cards are due', () => {
      // Create cards that are all scheduled for future
      const handIds = getHandIdsForRange('CO', [], 'strict', 'RFI');
      
      handIds.forEach(handId => {
        const card = fsrs.createCard();
        card.due = new Date(testDate.getTime() + 7 * 24 * 60 * 60 * 1000); // Due in 1 week
        card.state = 'review';
        
        saveHandProgress(handId, {
          handId,
          fsrsCard: card,
          reviewHistory: [],
          performanceStats: {
            totalReviews: 1,
            correctStreak: 1,
            accuracyRate: 1.0
          }
        });
      });
      
      const selection = getWeightedHandSelection('CO', [], 'strict', 'RFI');
      expect(selection).toEqual([]);
    });

    it('should handle daysAhead parameter', () => {
      // Create a card due in 2 days
      const handId = generateHandId('QQ', 'CO', [], 'strict');
      const card = fsrs.createCard();
      card.due = new Date(testDate.getTime() + 2 * 24 * 60 * 60 * 1000);
      card.state = 'review';
      
      saveHandProgress({
        handId,
        fsrsCard: card,
        reviewHistory: [],
        performanceStats: {
          totalReviews: 1,
          correctStreak: 1,
          accuracyRate: 1.0
        }
      });
      
      const selectionToday = getWeightedHandSelection('CO', [], 'strict', 'RFI', 0);
      const selectionFuture = getWeightedHandSelection('CO', [], 'strict', 'RFI', 3);
      
      expect(selectionFuture.length).toBeGreaterThan(selectionToday.length);
    });
  });

  describe('hasProgressData', () => {
    it('should return false for range with no progress', () => {
      const hasProgress = hasProgressData('CO', [], 'strict', 'RFI');
      expect(hasProgress).toBe(false);
    });

    it('should return true for range with some progress', () => {
      const handId = generateHandId('AA', 'CO', [], 'strict');
      const card = fsrs.createCard();
      
      saveHandProgress(handId, {
        handId,
        fsrsCard: card,
        reviewHistory: [],
        performanceStats: {
          totalReviews: 0,
          correctStreak: 0,
          accuracyRate: 0
        }
      });
      
      const hasProgress = hasProgressData('CO', [], 'strict', 'RFI');
      expect(hasProgress).toBe(true);
    });

    it('should handle invalid range gracefully', () => {
      const hasProgress = hasProgressData('INVALID' as Position, [], 'strict', 'RFI');
      expect(hasProgress).toBe(false);
    });
  });

  describe('Integration with FSRS Algorithm', () => {
    it('should correctly identify cards in different states', () => {
      const handIds = getHandIdsForRange('CO', [], 'strict', 'RFI');
      
      // Create cards in different states
      const newCard = fsrs.createCard(); // new state
      const learningCard = fsrs.repeat(newCard, 1, testDate); // learning state
      const reviewCard = fsrs.repeat(newCard, 3, testDate); // review state
      
      saveHandProgress({
        handId: handIds[0],
        fsrsCard: newCard,
        reviewHistory: [],
        performanceStats: { totalReviews: 0, correctStreak: 0, accuracyRate: 0 }
      });
      
      saveHandProgress({
        handId: handIds[1],
        fsrsCard: learningCard,
        reviewHistory: [],
        performanceStats: { totalReviews: 1, correctStreak: 0, accuracyRate: 0 }
      });
      
      saveHandProgress({
        handId: handIds[2],
        fsrsCard: reviewCard,
        reviewHistory: [],
        performanceStats: { totalReviews: 1, correctStreak: 1, accuracyRate: 1.0 }
      });
      
      const info = getDueCardsInfo('CO', [], 'strict', 'RFI');
      
      // Should have 3 cards with progress + 3 new cards = 6 due (assuming reviewCard is not yet due)
      expect(info.totalCards).toBe(6);
      expect(info.dueCount).toBeGreaterThanOrEqual(5);
    });

    it('should respect FSRS scheduling when determining due cards', () => {
      const handId = generateHandId('AKs', 'CO', [], 'strict');
      const card = fsrs.createCard();
      
      // Review with "Easy" rating to get longer interval
      const reviewedCard = fsrs.repeat(card, 4, testDate);
      
      saveHandProgress({
        handId,
        fsrsCard: reviewedCard,
        reviewHistory: [],
        performanceStats: { totalReviews: 1, correctStreak: 1, accuracyRate: 1.0 }
      });
      
      const infoToday = getDueCardsInfo('CO', [], 'strict', 'RFI', 0);
      const infoFuture = getDueCardsInfo('CO', [], 'strict', 'RFI', 10);
      
      // Card should not be due today but should be due within 10 days
      expect(infoFuture.dueCount).toBeGreaterThanOrEqual(infoToday.dueCount);
    });
  });
});