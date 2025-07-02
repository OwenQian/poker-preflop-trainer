import { Card, Hand, HandName, Position, QuizQuestion, Rank, Suit, Action, SamplingMode, GradingMode } from '../types';
import { getRangeData } from '../data/sampleRanges';
import { RangeCategory } from '../components/RangeTabSelector/RangeTabSelector';
import { getWeightedHandSelection, generateHandId, resolveRangeCombo } from './fsrs/quizIntegration';

const RANKS: Rank[] = ['A', 'K', 'Q', 'J', 'T', '9', '8', '7', '6', '5', '4', '3', '2'];
const SUITS: Suit[] = ['hearts', 'diamonds', 'clubs', 'spades'];

export const generateRandomHand = (): Hand => {
  const getRandomCard = (): Card => ({
    rank: RANKS[Math.floor(Math.random() * RANKS.length)],
    suit: SUITS[Math.floor(Math.random() * SUITS.length)]
  });

  let card1 = getRandomCard();
  let card2 = getRandomCard();

  // Ensure cards are different
  while (card1.rank === card2.rank && card1.suit === card2.suit) {
    card2 = getRandomCard();
  }

  return { card1, card2 };
};

export const handToHandName = (hand: Hand): HandName => {
  const { card1, card2 } = hand;
  
  // Sort ranks by value (higher first)
  const rankValues: Record<Rank, number> = {
    'A': 14, 'K': 13, 'Q': 12, 'J': 11, 'T': 10,
    '9': 9, '8': 8, '7': 7, '6': 6, '5': 5, '4': 4, '3': 3, '2': 2
  };
  
  let rank1 = card1.rank;
  let rank2 = card2.rank;
  
  // Always put higher rank first
  if (rankValues[rank2] > rankValues[rank1]) {
    [rank1, rank2] = [rank2, rank1];
  }
  
  // Determine if suited
  const suited = card1.suit === card2.suit;
  
  // Handle pocket pairs
  if (rank1 === rank2) {
    return `${rank1}${rank1}`;
  }
  
  // Handle non-pairs
  const suitedSuffix = suited ? 's' : 'o';
  return `${rank1}${rank2}${suitedSuffix}`;
};

export const handNameToHand = (handName: HandName): Hand => {
  if (handName.length < 2) {
    throw new Error(`Invalid hand name: ${handName}`);
  }
  
  const rank1 = handName[0] as Rank;
  const rank2 = handName[1] as Rank;
  
  // Handle pocket pairs
  if (rank1 === rank2) {
    return {
      card1: { rank: rank1, suit: 'hearts' },
      card2: { rank: rank2, suit: 'diamonds' }
    };
  }
  
  // Handle non-pairs
  const suited = handName[2] === 's';
  const suit1: Suit = 'hearts';
  const suit2: Suit = suited ? 'hearts' : 'diamonds';
  
  return {
    card1: { rank: rank1, suit: suit1 },
    card2: { rank: rank2, suit: suit2 }
  };
};

export const generateQuizQuestion = (
  heroPosition: Position,
  opponentPositions: Position[],
  rangeCategory: RangeCategory = 'RFI',
  samplingMode: SamplingMode = 'spaced-repetition',
  gradingMode: GradingMode = 'strict',
  daysAhead: number = 0
): QuizQuestion | null => {
  // Use centralized range resolution to ensure consistency with FSRS visualization
  const resolveResult = resolveRangeCombo(heroPosition, opponentPositions, rangeCategory);
  
  // If there's an error resolving the range, return null and log the error
  if (resolveResult.error) {
    console.error('Range resolution error in quiz generation:', resolveResult.error);
    return null;
  }
  
  const { rangeCombo: positionCombo, effectiveOpponents } = resolveResult;
  
  // Get range data for the resolved position combination
  const rangeData = getRangeData(positionCombo, rangeCategory);
  
  if (!rangeData) {
    console.error(`No range data available for ${positionCombo} in category ${rangeCategory}`);
    return null;
  }
  
  // getRangeData() now handles missingHandTreatment logic
  // Sample from all hands in the range data (which may include all 169 hands if treatment is 'fold')
  const availableHands = Object.entries(rangeData.hands).filter(
    ([_, frequencies]) => frequencies.raise + frequencies.call + frequencies.fold > 0
  );
  
  if (availableHands.length === 0) {
    console.error('No available hands in range data');
    return null;
  }
  
  // Select hand based on sampling mode
  let handName: HandName;
  let frequencies;
  
  if (samplingMode === 'spaced-repetition') {
    // Use FSRS-based sampling with the effective opponents from range resolution
    const weightedHandIds = getWeightedHandSelection(heroPosition, effectiveOpponents, gradingMode, rangeCategory, daysAhead);
    
    // Debug logging to track sampling consistency
    console.log('🎯 FSRS Sampling Debug:', {
      originalOpponents: opponentPositions,
      effectiveOpponents,
      rangeCombo: positionCombo,
      weightedHandIds: weightedHandIds.length,
      sampledHandIds: weightedHandIds.slice(0, 5) // Show first 5 for debugging
    });
    
    if (weightedHandIds.length > 0) {
      // Select from weighted list
      const selectedHandId = weightedHandIds[Math.floor(Math.random() * weightedHandIds.length)];
      // Extract hand name from handId (format: handName_position_vs_opponents_gradingMode)
      handName = selectedHandId.split('_')[0] as HandName;
      frequencies = rangeData!.hands[handName];
      
      console.log('🎯 Hand Selected:', {
        selectedHandId,
        handName,
        frequencies
      });
    } else {
      // TODO: prompt the user if they want to continue. If they choose to continue then proceed with random sampling from the range.
      // Fallback to random if no weighted selection available
      const [randomHandName, randomFrequencies] = availableHands[
        Math.floor(Math.random() * availableHands.length)
      ];
      handName = randomHandName;
      frequencies = randomFrequencies;
    }
  } else {
    // Random sampling (original behavior)
    const [randomHandName, randomFrequencies] = availableHands[
      Math.floor(Math.random() * availableHands.length)
    ];
    handName = randomHandName;
    frequencies = randomFrequencies;
  }
  
  // Generate the actual hand cards
  const hand = handNameToHand(handName);
  
  // Determine correct actions based on frequencies
  const correctActions: Action[] = [];
  if (frequencies.raise >= 20) correctActions.push('raise');
  if (frequencies.call >= 20) correctActions.push('call');
  if (frequencies.fold >= 20) correctActions.push('fold');
  
  // If no action has >20%, pick the highest frequency action
  if (correctActions.length === 0) {
    const { raise, call, fold } = frequencies;
    if (raise >= call && raise >= fold) correctActions.push('raise');
    else if (call >= fold) correctActions.push('call');
    else correctActions.push('fold');
  }
  
  // Generate random number for randomizer mode (1-100)
  const randomNumber = Math.floor(Math.random() * 100) + 1;
  
  return {
    hand,
    handName,
    position: heroPosition,
    opponents: effectiveOpponents, // Use effective opponents for consistency
    correctActions,
    frequencies,
    randomNumber,
    rangeCombo: positionCombo
  };
};

export const getAllHandNames = (): HandName[] => {
  const hands: HandName[] = [];
  
  // Add pocket pairs
  for (const rank of RANKS) {
    hands.push(`${rank}${rank}`);
  }
  
  // Add suited and unsuited combinations
  for (let i = 0; i < RANKS.length; i++) {
    for (let j = i + 1; j < RANKS.length; j++) {
      const rank1 = RANKS[i];
      const rank2 = RANKS[j];
      hands.push(`${rank1}${rank2}s`); // suited
      hands.push(`${rank1}${rank2}o`); // offsuit
    }
  }
  
  return hands;
};

export const getHandStrength = (handName: HandName): number => {
  // Simple hand strength calculation for sorting/filtering
  const rankValues: Record<Rank, number> = {
    'A': 14, 'K': 13, 'Q': 12, 'J': 11, 'T': 10,
    '9': 9, '8': 8, '7': 7, '6': 6, '5': 5, '4': 4, '3': 3, '2': 2
  };
  
  const rank1 = handName[0] as Rank;
  const rank2 = handName[1] as Rank;
  
  // Pocket pairs get highest values
  if (rank1 === rank2) {
    return 1000 + rankValues[rank1];
  }
  
  // Suited hands get bonus
  const suited = handName[2] === 's';
  const suitedBonus = suited ? 100 : 0;
  
  // Calculate based on high card and kicker
  const highCard = Math.max(rankValues[rank1], rankValues[rank2]);
  const kicker = Math.min(rankValues[rank1], rankValues[rank2]);
  
  return highCard * 10 + kicker + suitedBonus;
};
