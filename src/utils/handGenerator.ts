import { Card, Hand, HandName, Position, QuizQuestion, Rank, Suit, Action } from '../types';
import { getRangeData } from '../data/sampleRanges';
import { RangeCategory } from '../components/RangeTabSelector/RangeTabSelector';

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
  rangeCategory: RangeCategory = 'RFI'
): QuizQuestion | null => {
  // Generate position combination string based on range category
  let positionCombo: string;
  
  switch (rangeCategory) {
    case 'RFI':
      positionCombo = `${heroPosition}_RFI`;
      break;
    case 'vs RFI':
      if (opponentPositions.length > 0) {
        positionCombo = `${heroPosition}_vs_${opponentPositions[0]}_RFI`;
      } else {
        positionCombo = `${heroPosition}_vs_BU_RFI`;
      }
      break;
    case 'RFI vs 3bet':
      positionCombo = `${heroPosition}_RFI_vs_3BET`;
      break;
    case 'vs Limp':
      positionCombo = `${heroPosition}_vs_LIMP`;
      break;
    default:
      positionCombo = `${heroPosition}_RFI`;
  }
  
  // Get range data for this position combination
  let rangeData = getRangeData(positionCombo, rangeCategory);
  
  // Fallback strategies for each range category
  if (!rangeData) {
    switch (rangeCategory) {
      case 'RFI':
        // Try standard RFI fallbacks
        rangeData = getRangeData(`${heroPosition}_RFI`, rangeCategory) || 
                   getRangeData('BU_RFI', rangeCategory);
        break;
      case 'vs RFI':
        // Try with different opponent positions
        rangeData = getRangeData('BB_vs_BU_RFI', rangeCategory);
        break;
      case 'RFI vs 3bet':
        // Try generic RFI vs 3bet
        rangeData = getRangeData('BU_RFI_vs_3BET', rangeCategory);
        break;
      case 'vs Limp':
        // For now, fall back to RFI until limp ranges are added
        rangeData = getRangeData(`${heroPosition}_RFI`, 'RFI');
        break;
    }
  }
  
  if (!rangeData) {
    console.error('No range data available');
    return null;
  }
  
  // Get all hands with non-zero frequencies
  const availableHands = Object.entries(rangeData.hands).filter(
    ([_, frequencies]) => frequencies.raise + frequencies.call + frequencies.fold > 0
  );
  
  if (availableHands.length === 0) {
    console.error('No available hands in range data');
    return null;
  }
  
  // Select random hand
  const [handName, frequencies] = availableHands[
    Math.floor(Math.random() * availableHands.length)
  ];
  
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
  
  return {
    hand,
    handName,
    position: heroPosition,
    opponents: opponentPositions,
    correctActions,
    frequencies
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