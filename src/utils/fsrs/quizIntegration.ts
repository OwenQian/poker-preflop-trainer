import { FSRS } from './fsrs';
import { FSRSCard, HandProgress, Position, GradingMode, HandName } from '../../types';
import { RangeCategory } from '../../components/RangeTabSelector/RangeTabSelector';
import { getAllHandProgress } from '../storage/localStorage';
import { getRangeData } from '../../data/sampleRanges';

// Utility function to resolve range combo with fallbacks
// This ensures both sampling and visualization use the exact same range resolution logic
export const resolveRangeCombo = (
  heroPosition: Position,
  opponentPositions: Position[],
  rangeCategory: RangeCategory
): { rangeCombo: string; effectiveOpponents: Position[]; error?: string } => {
  // Generate initial position combination string based on range category
  let rangeCombo: string;
  let effectiveOpponents = [...opponentPositions];
  
  switch (rangeCategory) {
    case 'RFI':
      rangeCombo = `${heroPosition}_RFI`;
      break;
    case 'vs RFI':
      if (opponentPositions.length > 0) {
        rangeCombo = `${heroPosition}_vs_${opponentPositions[0]}_RFI`;
      } else {
        rangeCombo = `${heroPosition}_vs_BU_RFI`;
      }
      break;
    case 'RFI vs 3bet':
      if (opponentPositions.length > 0) {
        rangeCombo = `${heroPosition}_RFI_vs_${opponentPositions[0]}_3BET`;
      } else {
        rangeCombo = `${heroPosition}_RFI_vs_3BET`;
      }
      break;
    case '3bet vs 4bet':
      if (opponentPositions.length > 0) {
        rangeCombo = `${heroPosition}_3BET_vs_${opponentPositions[0]}_4BET`;
      } else {
        rangeCombo = `${heroPosition}_3BET_vs_4BET`;
      }
      break;
    case '4bet vs JAM':
      if (opponentPositions.length > 0) {
        rangeCombo = `${heroPosition}_4BET_vs_${opponentPositions[0]}_JAM`;
      } else {
        rangeCombo = `${heroPosition}_4BET_vs_JAM`;
      }
      break;
    case 'vs Limp':
      if (opponentPositions.length > 0) {
        rangeCombo = `${heroPosition}_vs_${opponentPositions[0]}_LIMP`;
      } else {
        rangeCombo = `${heroPosition}_vs_LIMP`;
      }
      break;
    default:
      rangeCombo = `${heroPosition}_RFI`;
  }
  
  // Check if primary range exists
  let rangeData = getRangeData(rangeCombo, rangeCategory);
  
  // Return error if primary range doesn't exist instead of using fallback
  if (!rangeData) {
    return {
      rangeCombo,
      effectiveOpponents,
      error: `No range data found for ${rangeCombo} in category ${rangeCategory}`
    };
  }

  // Primary range exists, return successful result
  return { rangeCombo, effectiveOpponents };
};

export interface DueCardsInfo {
  dueCount: number;
  totalCards: number;
  dueCards: string[]; // handIds
}

// Generate handId for a specific hand/position/grading combination
export const generateHandId = (
  handName: HandName,
  heroPosition: Position,
  opponentPositions: Position[],
  gradingMode: GradingMode
): string => {
  const opponents = opponentPositions.sort().join('_');
  return `${handName}_${heroPosition}_vs_${opponents}_${gradingMode}`;
};

// Get all possible handIds for a given range
export const getHandIdsForRange = (
  heroPosition: Position,
  opponentPositions: Position[],
  gradingMode: GradingMode,
  rangeCategory: RangeCategory
): string[] => {
  // Use centralized range resolution logic to ensure consistency
  const resolveResult = resolveRangeCombo(heroPosition, opponentPositions, rangeCategory);
  
  // If there's an error resolving the range, return empty array
  if (resolveResult.error) {
    console.error('Range resolution error:', resolveResult.error);
    return [];
  }
  
  const { rangeCombo, effectiveOpponents } = resolveResult;

  const rangeData = getRangeData(rangeCombo, rangeCategory);
  if (!rangeData?.hands) {
    return [];
  }

  // Get all possible hand names (169 possible combinations)
  const ALL_HANDS: HandName[] = [
    'AA', 'AKs', 'AQs', 'AJs', 'ATs', 'A9s', 'A8s', 'A7s', 'A6s', 'A5s', 'A4s', 'A3s', 'A2s',
    'AKo', 'KK', 'KQs', 'KJs', 'KTs', 'K9s', 'K8s', 'K7s', 'K6s', 'K5s', 'K4s', 'K3s', 'K2s',
    'AQo', 'KQo', 'QQ', 'QJs', 'QTs', 'Q9s', 'Q8s', 'Q7s', 'Q6s', 'Q5s', 'Q4s', 'Q3s', 'Q2s',
    'AJo', 'KJo', 'QJo', 'JJ', 'JTs', 'J9s', 'J8s', 'J7s', 'J6s', 'J5s', 'J4s', 'J3s', 'J2s',
    'ATo', 'KTo', 'QTo', 'JTo', 'TT', 'T9s', 'T8s', 'T7s', 'T6s', 'T5s', 'T4s', 'T3s', 'T2s',
    'A9o', 'K9o', 'Q9o', 'J9o', 'T9o', '99', '98s', '97s', '96s', '95s', '94s', '93s', '92s',
    'A8o', 'K8o', 'Q8o', 'J8o', 'T8o', '98o', '88', '87s', '86s', '85s', '84s', '83s', '82s',
    'A7o', 'K7o', 'Q7o', 'J7o', 'T7o', '97o', '87o', '77', '76s', '75s', '74s', '73s', '72s',
    'A6o', 'K6o', 'Q6o', 'J6o', 'T6o', '96o', '86o', '76o', '66', '65s', '64s', '63s', '62s',
    'A5o', 'K5o', 'Q5o', 'J5o', 'T5o', '95o', '85o', '75o', '65o', '55', '54s', '53s', '52s',
    'A4o', 'K4o', 'Q4o', 'J4o', 'T4o', '94o', '84o', '74o', '64o', '54o', '44', '43s', '42s',
    'A3o', 'K3o', 'Q3o', 'J3o', 'T3o', '93o', '83o', '73o', '63o', '53o', '43o', '33', '32s',
    'A2o', 'K2o', 'Q2o', 'J2o', 'T2o', '92o', '82o', '72o', '62o', '52o', '42o', '32o', '22'
  ];

  let availableHands: HandName[];

  if (rangeData.missingHandTreatment === 'fold') {
    // Include ALL hands when treatment is 'fold' - missing hands are treated as fold:100
    availableHands = ALL_HANDS.filter(handName => {
      const frequencies = rangeData.hands[handName];
      if (frequencies) {
        // Hand is explicitly in range data
        return frequencies.raise > 0 || frequencies.call > 0 || frequencies.fold > 0;
      } else {
        // Hand is missing but treated as fold:100, so include it
        return true;
      }
    });
  } else {
    // Only include hands with non-zero action frequencies when treatment is 'not-in-range'
    availableHands = Object.entries(rangeData.hands)
      .filter(([_, frequencies]) => 
        frequencies.raise > 0 || frequencies.call > 0
      )
      .map(([handName, _]) => handName as HandName);
  }

  // Generate handIds for all available hands using the effective opponents
  return availableHands.map(handName => 
    generateHandId(handName, heroPosition, effectiveOpponents, gradingMode)
  );
};

// Get due cards info for a specific range
export const getDueCardsInfo = (
  heroPosition: Position,
  opponentPositions: Position[],
  gradingMode: GradingMode,
  rangeCategory: RangeCategory,
  daysAhead: number = 0
): DueCardsInfo => {
  const fsrs = new FSRS();
  const allProgress = getAllHandProgress();
  const now = new Date();
  const futureDate = new Date(now.getTime() + daysAhead * 24 * 60 * 60 * 1000);
  
  // Get all possible handIds for this range
  const allHandIds = getHandIdsForRange(heroPosition, opponentPositions, gradingMode, rangeCategory);
  
  // If no hand IDs (likely due to range resolution error), return empty result
  if (allHandIds.length === 0) {
    return {
      dueCount: 0,
      totalCards: 0,
      dueCards: []
    };
  }
  
  // Separate cards by their status (matching getWeightedHandSelection logic)
  const newHandIds: string[] = [];
  const dueHandIds: string[] = [];
  const difficultHandIds: string[] = [];
  const scheduledHandIds: string[] = [];
  
  allHandIds.forEach(handId => {
    const progress = allProgress[handId];
    if (!progress?.fsrsCard) {
      // New card - hasn't been reviewed yet
      newHandIds.push(handId);
    } else {
      const card = progress.fsrsCard;
      const isDue = card.due <= futureDate;
      const isHard = card.difficulty > 6; // Difficulty scale 1-10
      const hasLapses = card.lapses > 0;
      
      // Debug logging for date comparison issues
      const handName = handId.split('_')[0];
      if (handName === 'KTs' || handName === 'A9s' || handName === 'AQs') {
        const timeDiff = card.due.getTime() - now.getTime();
        const daysDiff = timeDiff / (1000 * 60 * 60 * 24);
        console.log(`🔍 FSRS Debug ${handName}:`, {
          handId,
          dueDate: card.due.toISOString(),
          currentTime: now.toISOString(),
          futureDate: futureDate.toISOString(),
          daysAhead,
          daysDifference: Math.round(daysDiff * 100) / 100,
          isDue,
          isHard,
          hasLapses,
          difficulty: card.difficulty,
          lapses: card.lapses,
          state: card.state,
          reps: card.reps
        });
      }
      
      if (isDue) {
        // Cards that are actually due (including difficult ones that are due)
        if (isHard || hasLapses) {
          difficultHandIds.push(handId); // Priority: difficult cards that are due
        } else {
          dueHandIds.push(handId); // Regular due cards
        }
      } else {
        // Card is scheduled for future review - don't include unless actually due
        scheduledHandIds.push(handId);
      }
    }
  });
  
  // All due cards include:
  // 1. New cards (never reviewed) - always need review
  // 2. Actually due cards (due <= futureDate) - scheduled for review
  // Note: Only include difficult cards if they are actually due, not just because they're difficult
  // This matches the sampling logic in getWeightedHandSelection() for consistency
  const allDueHandIds = [...newHandIds, ...dueHandIds, ...difficultHandIds];
  
  return {
    dueCount: allDueHandIds.length,
    totalCards: allHandIds.length,
    dueCards: allDueHandIds
  };
};

// Get weighted hand selection for FSRS-based sampling
export const getWeightedHandSelection = (
  heroPosition: Position,
  opponentPositions: Position[],
  gradingMode: GradingMode,
  rangeCategory: RangeCategory,
  daysAhead: number = 0
): string[] => {
  const fsrs = new FSRS();
  const allProgress = getAllHandProgress();
  const now = new Date();
  const futureDate = new Date(now.getTime() + daysAhead * 24 * 60 * 60 * 1000);
  
  // Get all possible handIds for this range
  const allHandIds = getHandIdsForRange(heroPosition, opponentPositions, gradingMode, rangeCategory);
  
  // If no hand IDs (likely due to range resolution error), return empty array
  if (allHandIds.length === 0) {
    return [];
  }
  
  // Separate cards by priority
  const dueCards: string[] = [];
  const difficultCards: string[] = [];
  const newCards: string[] = [];
  const reviewCards: string[] = [];
  
  allHandIds.forEach(handId => {
    const progress = allProgress[handId];
    
    if (!progress?.fsrsCard) {
      // New card - high priority
      newCards.push(handId);
    } else {
      const card = progress.fsrsCard;
      const isDue = card.due <= futureDate; // Use futureDate to match getDueCardsInfo logic
      const isHard = card.difficulty > 6; // Difficulty scale 1-10
      const hasLapses = card.lapses > 0;
      
      if (isDue) {
        // Cards that are actually due (including difficult ones that are due)
        if (isHard || hasLapses) {
          difficultCards.push(handId); // Priority: difficult cards that are due
        } else {
          dueCards.push(handId); // Regular due cards
        }
      } else {
        // Card is scheduled for future review
        reviewCards.push(handId);
      }
    }
  });
  
  // Create weighted array: only include cards that should be reviewed
  // Don't include review cards (not due) as they shouldn't be sampled
  const weightedSelection = [
    ...Array(5).fill(dueCards).flat(),      // Due cards: 5x weight
    ...Array(3).fill(newCards).flat(),      // New cards: 3x weight  
    ...Array(2).fill(difficultCards).flat() // Difficult cards: 2x weight
    // Removed reviewCards - cards not due shouldn't be sampled
  ].filter(handId => handId); // Remove empty entries
  
  // If no cards are due/new/difficult, return empty array to force error handling
  return weightedSelection;
};

// Check if a range has any progress data
export const hasProgressData = (
  heroPosition: Position,
  opponentPositions: Position[],
  gradingMode: GradingMode,
  rangeCategory: RangeCategory
): boolean => {
  const allProgress = getAllHandProgress();
  const allHandIds = getHandIdsForRange(heroPosition, opponentPositions, gradingMode, rangeCategory);
  
  return allHandIds.some(handId => allProgress[handId]?.fsrsCard);
};
