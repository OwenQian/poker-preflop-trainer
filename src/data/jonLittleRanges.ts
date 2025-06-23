// Jon Little Preflop Ranges - Converted from PokerCoaching.com Charts
// Extracted ranges with complete range categories for multi-situation training

import { RangeData, HandName, HandFrequencies } from '../types';

// Helper function to convert hand arrays to range data format
const convertHandArrayToRange = (hands: HandName[], actionType: 'raise' | 'call' | 'threebet' | 'fourbet' = 'raise'): Record<HandName, HandFrequencies> => {
  const result: Record<HandName, HandFrequencies> = {};
  
  hands.forEach(hand => {
    switch (actionType) {
      case 'raise':
        result[hand] = { raise: 100, call: 0, fold: 0 };
        break;
      case 'call':
        result[hand] = { raise: 0, call: 100, fold: 0 };
        break;
      case 'threebet':
        result[hand] = { raise: 100, call: 0, fold: 0 }; // 3-bet is a raise action
        break;
      case 'fourbet':
        result[hand] = { raise: 100, call: 0, fold: 0 }; // 4-bet is a raise action
        break;
    }
  });
  
  return result;
};

// RFI Ranges from rfi.js
const rfiRanges = {
  utg: [
    'AA', 'KK', 'QQ', 'JJ', 'TT', '99', '88', '77',
    'AKs', 'AQs', 'AJs', 'ATs', 'A9s', 'A8s', 'A7s', 'A6s', 'A5s', 'A4s', 'A3s', 'A2s',
    'AKo', 'AQo', 'AJo', 'ATo',
    'KQs', 'KJs', 'KTs', 'K9s',
    'KQo', 'KJo',
    'QJs', 'QTs', 'Q9s',
    'QJo',
    'JTs', 'J9s',
    'T9s',
    '98s',
    '87s',
    '76s',
    '65s'
  ],
  utg1: [
    'AA', 'KK', 'QQ', 'JJ', 'TT', '99', 'BB', '77', '66',
    'AKs', 'AQs', 'AJs', 'ATs', 'A9s', 'A8s', 'A7s', 'A6s', 'A5s', 'A4s', 'A3s', 'A2s',
    'AKo', 'AQo', 'AJo', 'ATo',
    'KQs', 'KJs', 'KTs', 'K9s', 'K8s',
    'KQo', 'KJo',
    'QJs', 'QTs', 'Q9s', 'Q8s',
    'QJo',
    'JTs', 'J9s', 'J8s',
    'T9s', 'T8s',
    '98s', '97s',
    '87s', '86s',
    '76s', '75s',
    '65s', '64s',
    '54s', '53s'
  ],
  utg2: [
    'AA', 'KK', 'QQ', 'JJ', 'TT', '99', '88', '77', '66', '55',
    'AKs', 'AQs', 'AJs', 'ATs', 'A9s', 'A8s', 'A7s', 'A6s', 'A5s', 'A4s', 'A3s', 'A2s',
    'AKo', 'AQo', 'AJo', 'ATo', 'A9o',
    'KQs', 'KJs', 'KTs', 'K9s', 'K8s', 'K7s',
    'KQo', 'KJo', 'KTo',
    'QJs', 'QTs', 'Q9s', 'Q8s', 'Q7s',
    'QJo', 'QTo',
    'JTs', 'J9s', 'J8s', 'J7s',
    'JTo',
    'T9s', 'T8s', 'T7s',
    '98s', '97s', '96s',
    '87s', '86s', '85s',
    '76s', '75s', '74s',
    '65s', '64s', '63s',
    '54s', '53s', '52s',
    '43s', '42s'
  ],
  lj: [
    'AA', 'KK', 'QQ', 'JJ', 'TT', '99', '88', '77', '66', '55', '44',
    'AKs', 'AQs', 'AJs', 'ATs', 'A9s', 'A8s', 'A7s', 'A6s', 'A5s', 'A4s', 'A3s', 'A2s',
    'AKo', 'AQo', 'AJo', 'ATo', 'A9o', 'A8o',
    'KQs', 'KJs', 'KTs', 'K9s', 'K8s', 'K7s', 'K6s',
    'KQo', 'KJo', 'KTo', 'K9o',
    'QJs', 'QTs', 'Q9s', 'Q8s', 'Q7s', 'Q6s',
    'QJo', 'QTo', 'Q9o',
    'JTs', 'J9s', 'J8s', 'J7s', 'J6s',
    'JTo', 'J9o',
    'T9s', 'T8s', 'T7s', 'T6s',
    'T9o',
    '98s', '97s', '96s', '95s',
    '87s', '86s', '85s', '84s',
    '76s', '75s', '74s', '73s',
    '65s', '64s', '63s', '62s',
    '54s', '53s', '52s',
    '43s', '42s',
    '32s'
  ],
  hj: [
    'AA', 'KK', 'QQ', 'JJ', 'TT', '99', '88', '77', '66', '55', '44', '33', '22',
    'AKs', 'AQs', 'AJs', 'ATs', 'A9s', 'A8s', 'A7s', 'A6s', 'A5s', 'A4s', 'A3s', 'A2s',
    'AKo', 'AQo', 'AJo', 'ATo', 'A9o', 'A8o', 'A7o',
    'KQs', 'KJs', 'KTs', 'K9s', 'K8s', 'K7s', 'K6s', 'K5s',
    'KQo', 'KJo', 'KTo', 'K9o', 'K8o',
    'QJs', 'QTs', 'Q9s', 'Q8s', 'Q7s', 'Q6s', 'Q5s',
    'QJo', 'QTo', 'Q9o', 'Q8o',
    'JTs', 'J9s', 'J8s', 'J7s', 'J6s', 'J5s',
    'JTo', 'J9o', 'J8o',
    'T9s', 'T8s', 'T7s', 'T6s', 'T5s',
    'T9o', 'T8o',
    '98s', '97s', '96s', '95s', '94s',
    '98o',
    '87s', '86s', '85s', '84s', '83s',
    '76s', '75s', '74s', '73s', '72s',
    '65s', '64s', '63s', '62s',
    '54s', '53s', '52s',
    '43s', '42s',
    '32s'
  ],
  co: [
    'AA', 'KK', 'QQ', 'JJ', 'TT', '99', '88', '77', '66', '55', '44', '33', '22',
    'AKs', 'AQs', 'AJs', 'ATs', 'A9s', 'A8s', 'A7s', 'A6s', 'A5s', 'A4s', 'A3s', 'A2s',
    'AKo', 'AQo', 'AJo', 'ATo', 'A9o', 'A8o', 'A7o', 'A6o', 'A5o',
    'KQs', 'KJs', 'KTs', 'K9s', 'K8s', 'K7s', 'K6s', 'K5s', 'K4s',
    'KQo', 'KJo', 'KTo', 'K9o', 'K8o', 'K7o',
    'QJs', 'QTs', 'Q9s', 'Q8s', 'Q7s', 'Q6s', 'Q5s', 'Q4s',
    'QJo', 'QTo', 'Q9o', 'Q8o', 'Q7o',
    'JTs', 'J9s', 'J8s', 'J7s', 'J6s', 'J5s', 'J4s',
    'JTo', 'J9o', 'J8o', 'J7o',
    'T9s', 'T8s', 'T7s', 'T6s', 'T5s', 'T4s',
    'T9o', 'T8o', 'T7o',
    '98s', '97s', '96s', '95s', '94s', '93s',
    '98o', '97o',
    '87s', '86s', '85s', '84s', '83s', '82s',
    '87o',
    '76s', '75s', '74s', '73s', '72s',
    '65s', '64s', '63s', '62s',
    '54s', '53s', '52s',
    '43s', '42s',
    '32s'
  ],
  btn: [
    'AA', 'KK', 'QQ', 'JJ', 'TT', '99', '88', '77', '66', '55', '44', '33', '22',
    'AKs', 'AQs', 'AJs', 'ATs', 'A9s', 'A8s', 'A7s', 'A6s', 'A5s', 'A4s', 'A3s', 'A2s',
    'AKo', 'AQo', 'AJo', 'ATo', 'A9o', 'A8o', 'A7o', 'A6o', 'A5o', 'A4o', 'A3o', 'A2o',
    'KQs', 'KJs', 'KTs', 'K9s', 'K8s', 'K7s', 'K6s', 'K5s', 'K4s', 'K3s', 'K2s',
    'KQo', 'KJo', 'KTo', 'K9o', 'K8o', 'K7o', 'K6o', 'K5o', 'K4o',
    'QJs', 'QTs', 'Q9s', 'Q8s', 'Q7s', 'Q6s', 'Q5s', 'Q4s', 'Q3s', 'Q2s',
    'QJo', 'QTo', 'Q9o', 'Q8o', 'Q7o', 'Q6o', 'Q5o',
    'JTs', 'J9s', 'J8s', 'J7s', 'J6s', 'J5s', 'J4s', 'J3s', 'J2s',
    'JTo', 'J9o', 'J8o', 'J7o', 'J6o',
    'T9s', 'T8s', 'T7s', 'T6s', 'T5s', 'T4s', 'T3s', 'T2s',
    'T9o', 'T8o', 'T7o', 'T6o',
    '98s', '97s', '96s', '95s', '94s', '93s', '92s',
    '98o', '97o', '96o',
    '87s', '86s', '85s', '84s', '83s', '82s',
    '87o', '86o',
    '76s', '75s', '74s', '73s', '72s',
    '76o',
    '65s', '64s', '63s', '62s',
    '54s', '53s', '52s',
    '43s', '42s',
    '32s'
  ]
};

// Create facing RFI ranges (combining 3bet and call hands)
const createFacingRfiRange = (threebetHands: HandName[], callHands: HandName[]): Record<HandName, HandFrequencies> => {
  const result: Record<HandName, HandFrequencies> = {};
  
  threebetHands.forEach(hand => {
    result[hand] = { raise: 100, call: 0, fold: 0 }; // 3-bet is raise action
  });
  
  callHands.forEach(hand => {
    result[hand] = { raise: 0, call: 100, fold: 0 };
  });
  
  return result;
};

// Create RFI vs 3bet ranges (combining 4bet and call hands)
const createRfiVs3betRange = (fourbetHands: HandName[], callHands: HandName[]): Record<HandName, HandFrequencies> => {
  const result: Record<HandName, HandFrequencies> = {};
  
  fourbetHands.forEach(hand => {
    result[hand] = { raise: 100, call: 0, fold: 0 }; // 4-bet is raise action
  });
  
  callHands.forEach(hand => {
    result[hand] = { raise: 0, call: 100, fold: 0 };
  });
  
  return result;
};

// Jon Little RFI ranges - converted to RangeData format
export const JON_LITTLE_RFI_RANGES: RangeData[] = [
  {
    positionCombo: 'UTG_RFI',
    hands: convertHandArrayToRange(rfiRanges.utg)
  },
  {
    positionCombo: 'UTG+1_RFI', 
    hands: convertHandArrayToRange(rfiRanges.utg1.map(h => h === 'BB' ? '88' : h)) // Fix typo in original
  },
  {
    positionCombo: 'UTG+2_RFI',
    hands: convertHandArrayToRange(rfiRanges.utg2)
  },
  {
    positionCombo: 'LJ_RFI',
    hands: convertHandArrayToRange(rfiRanges.lj)
  },
  {
    positionCombo: 'HJ_RFI',
    hands: convertHandArrayToRange(rfiRanges.hj)
  },
  {
    positionCombo: 'CO_RFI',
    hands: convertHandArrayToRange(rfiRanges.co)
  },
  {
    positionCombo: 'BU_RFI',
    hands: convertHandArrayToRange(rfiRanges.btn)
  }
];

// Facing RFI ranges (vs RFI) - comprehensive position-specific ranges
export const JON_LITTLE_FACING_RFI_RANGES: RangeData[] = [
  // Big Blind ranges
  {
    positionCombo: 'BB_vs_UTG_RFI',
    hands: createFacingRfiRange(
      ['AA', 'KK', 'QQ', 'AKs', 'AQs', 'AJs', 'ATs', 'A9s', 'A8s', 'A7s', 'A6s', 'A5s', 'A4s', 'A3s', 'A2s', 'AKo', 'AQo', 'AJo', 'KQs', 'KJs', 'KTs', 'K9s', 'KQo', 'QJs', 'QTs', 'JTs', 'T9s', '98s', '87s', '76s', '65s'],
      ['JJ', 'TT', '99', '88', '77', '66', '55', '44', '33', '22', 'ATo', 'A9o', 'A8o', 'A7o', 'A6o', 'A5o', 'A4o', 'A3o', 'A2o', 'KJo', 'KTo', 'K9o', 'K8o', 'K7o', 'K6o', 'K5o', 'K4o', 'K3o', 'K2o', 'Q9s', 'Q8s', 'Q7s', 'Q6s', 'Q5s', 'Q4s', 'Q3s', 'Q2s', 'QJo', 'QTo', 'Q9o', 'Q8o', 'Q7o', 'Q6o', 'Q5o', 'Q4o', 'Q3o', 'Q2o', 'J9s', 'J8s', 'J7s', 'J6s', 'J5s', 'J4s', 'J3s', 'J2s', 'JTo', 'J9o', 'J8o', 'J7o', 'J6o', 'J5o', 'J4o', 'J3o', 'J2o', 'T8s', 'T7s', 'T6s', 'T5s', 'T4s', 'T3s', 'T2s', 'T9o', 'T8o', 'T7o', 'T6o', 'T5o', 'T4o', 'T3o', 'T2o', '97s', '96s', '95s', '94s', '93s', '92s', '98o', '97o', '96o', '95o', '94o', '93o', '92o', '86s', '85s', '84s', '83s', '82s', '87o', '86o', '85o', '84o', '83o', '82o', '75s', '74s', '73s', '72s', '76o', '75o', '74o', '73o', '72o', '64s', '63s', '62s', '65o', '64o', '63o', '62o', '54s', '53s', '52s', '54o', '53o', '52o', '43s', '42s', '43o', '42o', '32s', '32o']
    )
  },
  {
    positionCombo: 'BB_vs_UTG+2_RFI',
    hands: createFacingRfiRange(
      ['AA', 'KK', 'QQ', 'JJ', 'AKs', 'AQs', 'AJs', 'ATs', 'A9s', 'A8s', 'A7s', 'A6s', 'A5s', 'A4s', 'A3s', 'A2s', 'AKo', 'AQo', 'AJo', 'ATo', 'KQs', 'KJs', 'KTs', 'K9s', 'K8s', 'KQo', 'KJo', 'QJs', 'QTs', 'Q9s', 'QJo', 'JTs', 'J9s', 'T9s', '98s', '87s', '76s', '65s'],
      ['TT', '99', '88', '77', '66', '55', '44', '33', '22', 'A9o', 'A8o', 'A7o', 'A6o', 'A5o', 'A4o', 'A3o', 'A2o', 'KTo', 'K9o', 'K8o', 'K7o', 'K6o', 'K5o', 'K4o', 'K3o', 'K2o', 'Q8s', 'Q7s', 'Q6s', 'Q5s', 'Q4s', 'Q3s', 'Q2s', 'QTo', 'Q9o', 'Q8o', 'Q7o', 'Q6o', 'Q5o', 'Q4o', 'Q3o', 'Q2o', 'J8s', 'J7s', 'J6s', 'J5s', 'J4s', 'J3s', 'J2s', 'JTo', 'J9o', 'J8o', 'J7o', 'J6o', 'J5o', 'J4o', 'J3o', 'J2o', 'T8s', 'T7s', 'T6s', 'T5s', 'T4s', 'T3s', 'T2s', 'T9o', 'T8o', 'T7o', 'T6o', 'T5o', 'T4o', 'T3o', 'T2o', '97s', '96s', '95s', '94s', '93s', '92s', '98o', '97o', '96o', '95o', '94o', '93o', '92o', '86s', '85s', '84s', '83s', '82s', '87o', '86o', '85o', '84o', '83o', '82o', '75s', '74s', '73s', '72s', '76o', '75o', '74o', '73o', '72o', '64s', '63s', '62s', '65o', '64o', '63o', '62o', '54s', '53s', '52s', '54o', '53o', '52o', '43s', '42s', '43o', '42o', '32s', '32o']
    )
  },
  {
    positionCombo: 'BB_vs_CO_RFI',
    hands: createFacingRfiRange(
      ['AA', 'KK', 'QQ', 'JJ', 'TT', 'AKs', 'AQs', 'AJs', 'ATs', 'A9s', 'A8s', 'A7s', 'A6s', 'A5s', 'A4s', 'A3s', 'A2s', 'AKo', 'AQo', 'AJo', 'ATo', 'A9o', 'KQs', 'KJs', 'KTs', 'K9s', 'K8s', 'K7s', 'K6s', 'KQo', 'KJo', 'KTo', 'QJs', 'QTs', 'Q9s', 'Q8s', 'Q7s', 'QJo', 'QTo', 'JTs', 'J9s', 'J8s', 'J7s', 'JTo', 'T9s', 'T8s', 'T7s', '98s', '97s', '96s', '87s', '86s', '85s', '76s', '75s', '74s', '65s', '64s', '63s', '54s', '53s', '43s'],
      ['99', '88', '77', '66', '55', '44', '33', '22', 'A8o', 'A7o', 'A6o', 'A5o', 'A4o', 'A3o', 'A2o', 'K9o', 'K8o', 'K7o', 'K6o', 'K5o', 'K4o', 'K3o', 'K2o', 'Q6s', 'Q5s', 'Q4s', 'Q3s', 'Q2s', 'Q9o', 'Q8o', 'Q7o', 'Q6o', 'Q5o', 'Q4o', 'Q3o', 'Q2o', 'J6s', 'J5s', 'J4s', 'J3s', 'J2s', 'J9o', 'J8o', 'J7o', 'J6o', 'J5o', 'J4o', 'J3o', 'J2o', 'T6s', 'T5s', 'T4s', 'T3s', 'T2s', 'T9o', 'T8o', 'T7o', 'T6o', 'T5o', 'T4o', 'T3o', 'T2o', '95s', '94s', '93s', '92s', '98o', '97o', '96o', '95o', '94o', '93o', '92o', '84s', '83s', '82s', '87o', '86o', '85o', '84o', '83o', '82o', '73s', '72s', '76o', '75o', '74o', '73o', '72o', '62s', '65o', '64o', '63o', '62o', '52s', '54o', '53o', '52o', '42s', '43o', '42o', '32s', '32o']
    )
  },
  {
    positionCombo: 'BB_vs_BU_RFI',
    hands: createFacingRfiRange(
      ['AA', 'KK', 'QQ', 'JJ', 'AKs', 'AQs', 'AJs', 'ATs', 'A9s', 'A8s', 'A7s', 'A6s', 'A5s', 'A4s', 'A3s', 'A2s', 'AKo', 'AQo', 'AJo', 'ATo', 'A9o', 'KQs', 'KJs', 'KTs', 'K9s', 'K8s', 'K7s', 'K6s', 'K5s', 'K4s', 'KQo', 'KJo', 'KTo', 'QJs', 'QTs', 'Q9s', 'Q8s', 'Q7s', 'Q6s', 'Q5s', 'QJo', 'QTo', 'JTs', 'J9s', 'J8s', 'J7s', 'J6s', 'J5s', 'JTo', 'T9s', 'T8s', 'T7s', 'T6s', 'T5s', '98s', '97s', '96s', '95s', '87s', '86s', '85s', '84s', '76s', '75s', '74s', '65s', '64s', '63s', '54s', '53s', '43s'],
      ['TT', '99', '88', '77', '66', '55', '44', '33', '22', 'A8o', 'A7o', 'A6o', 'A5o', 'A4o', 'A3o', 'A2o', 'K9o', 'K8o', 'K7o', 'K6o', 'K5o', 'K4o', 'K3o', 'K2o', 'Q4s', 'Q3s', 'Q2s', 'Q9o', 'Q8o', 'Q7o', 'Q6o', 'Q5o', 'Q4o', 'Q3o', 'Q2o', 'J4s', 'J3s', 'J2s', 'J9o', 'J8o', 'J7o', 'J6o', 'J5o', 'J4o', 'J3o', 'J2o', 'T4s', 'T3s', 'T2s', 'T9o', 'T8o', 'T7o', 'T6o', 'T5o', 'T4o', 'T3o', 'T2o', '94s', '93s', '92s', '98o', '97o', '96o', '95o', '94o', '93o', '92o', '83s', '82s', '87o', '86o', '85o', '84o', '83o', '82o', '73s', '72s', '76o', '75o', '74o', '73o', '72o', '62s', '65o', '64o', '63o', '62o', '52s', '54o', '53o', '52o', '42s', '43o', '42o', '32s', '32o']
    )
  },
  {
    positionCombo: 'BB_vs_SB_RFI',
    hands: createFacingRfiRange(
      ['AA', 'KK', 'QQ', 'JJ', 'TT', '99', 'AKs', 'AQs', 'AJs', 'ATs', 'A9s', 'A8s', 'A7s', 'A6s', 'A5s', 'A4s', 'A3s', 'A2s', 'AKo', 'AQo', 'AJo', 'ATo', 'A9o', 'A8o', 'KQs', 'KJs', 'KTs', 'K9s', 'K8s', 'K7s', 'K6s', 'K5s', 'KQo', 'KJo', 'KTo', 'K9o', 'QJs', 'QTs', 'Q9s', 'Q8s', 'Q7s', 'Q6s', 'QJo', 'QTo', 'Q9o', 'JTs', 'J9s', 'J8s', 'J7s', 'J6s', 'JTo', 'J9o', 'T9s', 'T8s', 'T7s', 'T6s', 'T9o', '98s', '97s', '96s', '95s', '87s', '86s', '85s', '84s', '76s', '75s', '74s', '65s', '64s', '63s', '54s', '53s', '43s'],
      ['88', '77', '66', '55', '44', '33', '22', 'A7o', 'A6o', 'A5o', 'A4o', 'A3o', 'A2o', 'K8o', 'K7o', 'K6o', 'K5o', 'K4o', 'K3o', 'K2o', 'Q5s', 'Q4s', 'Q3s', 'Q2s', 'Q8o', 'Q7o', 'Q6o', 'Q5o', 'Q4o', 'Q3o', 'Q2o', 'J5s', 'J4s', 'J3s', 'J2s', 'J8o', 'J7o', 'J6o', 'J5o', 'J4o', 'J3o', 'J2o', 'T5s', 'T4s', 'T3s', 'T2s', 'T8o', 'T7o', 'T6o', 'T5o', 'T4o', 'T3o', 'T2o', '94s', '93s', '92s', '98o', '97o', '96o', '95o', '94o', '93o', '92o', '83s', '82s', '87o', '86o', '85o', '84o', '83o', '82o', '73s', '72s', '76o', '75o', '74o', '73o', '72o', '62s', '65o', '64o', '63o', '62o', '52s', '54o', '53o', '52o', '42s', '43o', '42o', '32s', '32o']
    )
  },
  // Small Blind ranges
  {
    positionCombo: 'SB_vs_UTG_RFI',
    hands: createFacingRfiRange(
      ['AA', 'KK', 'QQ', 'AKs', 'AQs', 'AJs', 'ATs', 'A9s', 'A8s', 'A7s', 'A6s', 'A5s', 'A4s', 'A3s', 'A2s', 'AKo', 'AQo', 'AJo', 'KQs', 'KJs', 'KTs', 'KQo', 'QJs', 'QTs', 'JTs', 'T9s', '98s', '87s', '76s', '65s'],
      ['JJ', 'TT', '99', '88', '77', '66', '55', '44', '33', '22', 'ATo', 'A9o', 'A8o', 'A7o', 'A6o', 'A5o', 'A4o', 'A3o', 'A2o', 'KJo', 'KTo', 'K9o', 'K8o', 'K7o', 'K6o', 'K5o', 'K4o', 'K3o', 'K2o', 'K9s', 'K8s', 'K7s', 'K6s', 'K5s', 'K4s', 'K3s', 'K2s', 'Q9s', 'Q8s', 'Q7s', 'Q6s', 'Q5s', 'Q4s', 'Q3s', 'Q2s', 'QJo', 'QTo', 'Q9o', 'Q8o', 'Q7o', 'Q6o', 'Q5o', 'Q4o', 'Q3o', 'Q2o', 'J9s', 'J8s', 'J7s', 'J6s', 'J5s', 'J4s', 'J3s', 'J2s', 'JTo', 'J9o', 'J8o', 'J7o', 'J6o', 'J5o', 'J4o', 'J3o', 'J2o', 'T8s', 'T7s', 'T6s', 'T5s', 'T4s', 'T3s', 'T2s', 'T9o', 'T8o', 'T7o', 'T6o', 'T5o', 'T4o', 'T3o', 'T2o', '97s', '96s', '95s', '94s', '93s', '92s', '98o', '97o', '96o', '95o', '94o', '93o', '92o', '86s', '85s', '84s', '83s', '82s', '87o', '86o', '85o', '84o', '83o', '82o', '75s', '74s', '73s', '72s', '76o', '75o', '74o', '73o', '72o', '64s', '63s', '62s', '65o', '64o', '63o', '62o', '54s', '53s', '52s', '54o', '53o', '52o', '43s', '42s', '43o', '42o', '32s', '32o']
    )
  },
  {
    positionCombo: 'SB_vs_BU_RFI',
    hands: createFacingRfiRange(
      ['AA', 'KK', 'QQ', 'AKs', 'AQs', 'AJs', 'ATs', 'A9s', 'A8s', 'A7s', 'A6s', 'A5s', 'A4s', 'A3s', 'A2s', 'AKo', 'AQo', 'AJo', 'ATo', 'KQs', 'KJs', 'KTs', 'K9s', 'K8s', 'K7s', 'K6s', 'K5s', 'KQo', 'KJo', 'KTo', 'QJs', 'QTs', 'Q9s', 'Q8s', 'Q7s', 'Q6s', 'QJo', 'QTo', 'JTs', 'J9s', 'J8s', 'J7s', 'J6s', 'JTo', 'T9s', 'T8s', 'T7s', 'T6s', '98s', '97s', '96s', '95s', '87s', '86s', '85s', '84s', '76s', '75s', '74s', '65s', '64s', '63s', '54s', '53s', '43s'],
      ['JJ', 'TT', '99', '88', '77', '66', '55', '44', '33', '22', 'A9o', 'A8o', 'A7o', 'A6o', 'A5o', 'A4o', 'A3o', 'A2o', 'K9o', 'K8o', 'K7o', 'K6o', 'K5o', 'K4o', 'K3o', 'K2o', 'K4s', 'K3s', 'K2s', 'Q5s', 'Q4s', 'Q3s', 'Q2s', 'Q9o', 'Q8o', 'Q7o', 'Q6o', 'Q5o', 'Q4o', 'Q3o', 'Q2o', 'J5s', 'J4s', 'J3s', 'J2s', 'J9o', 'J8o', 'J7o', 'J6o', 'J5o', 'J4o', 'J3o', 'J2o', 'T5s', 'T4s', 'T3s', 'T2s', 'T9o', 'T8o', 'T7o', 'T6o', 'T5o', 'T4o', 'T3o', 'T2o', '94s', '93s', '92s', '98o', '97o', '96o', '95o', '94o', '93o', '92o', '83s', '82s', '87o', '86o', '85o', '84o', '83o', '82o', '73s', '72s', '76o', '75o', '74o', '73o', '72o', '62s', '65o', '64o', '63o', '62o', '52s', '54o', '53o', '52o', '42s', '43o', '42o', '32s', '32o']
    )
  },
  // Button vs Cutoff
  {
    positionCombo: 'BU_vs_CO_RFI',
    hands: createFacingRfiRange(
      ['AA', 'KK', 'QQ', 'JJ', 'TT', 'AKs', 'AQs', 'AJs', 'ATs', 'A9s', 'A8s', 'A7s', 'A6s', 'A5s', 'A4s', 'A3s', 'A2s', 'AKo', 'AQo', 'AJo', 'ATo', 'A9o', 'KQs', 'KJs', 'KTs', 'K9s', 'K8s', 'K7s', 'K6s', 'K5s', 'KQo', 'KJo', 'KTo', 'QJs', 'QTs', 'Q9s', 'Q8s', 'Q7s', 'Q6s', 'QJo', 'QTo', 'JTs', 'J9s', 'J8s', 'J7s', 'J6s', 'JTo', 'T9s', 'T8s', 'T7s', 'T6s', '98s', '97s', '96s', '95s', '87s', '86s', '85s', '84s', '76s', '75s', '74s', '65s', '64s', '63s', '54s', '53s', '43s'],
      ['99', '88', '77', '66', '55', '44', '33', '22', 'A8o', 'A7o', 'A6o', 'A5o', 'A4o', 'A3o', 'A2o', 'K9o', 'K8o', 'K7o', 'K6o', 'K5o', 'K4o', 'K3o', 'K2o', 'K4s', 'K3s', 'K2s', 'Q5s', 'Q4s', 'Q3s', 'Q2s', 'Q9o', 'Q8o', 'Q7o', 'Q6o', 'Q5o', 'Q4o', 'Q3o', 'Q2o', 'J5s', 'J4s', 'J3s', 'J2s', 'J9o', 'J8o', 'J7o', 'J6o', 'J5o', 'J4o', 'J3o', 'J2o', 'T5s', 'T4s', 'T3s', 'T2s', 'T9o', 'T8o', 'T7o', 'T6o', 'T5o', 'T4o', 'T3o', 'T2o', '94s', '93s', '92s', '98o', '97o', '96o', '95o', '94o', '93o', '92o', '83s', '82s', '87o', '86o', '85o', '84o', '83o', '82o', '73s', '72s', '76o', '75o', '74o', '73o', '72o', '62s', '65o', '64o', '63o', '62o', '52s', '54o', '53o', '52o', '42s', '43o', '42o', '32s', '32o']
    )
  },
  // Cutoff vs Hijack
  {
    positionCombo: 'CO_vs_HJ_RFI',
    hands: createFacingRfiRange(
      ['AA', 'KK', 'QQ', 'JJ', 'AKs', 'AQs', 'AJs', 'ATs', 'A9s', 'A8s', 'A7s', 'A6s', 'A5s', 'A4s', 'A3s', 'A2s', 'AKo', 'AQo', 'AJo', 'ATo', 'KQs', 'KJs', 'KTs', 'K9s', 'K8s', 'KQo', 'KJo', 'QJs', 'QTs', 'Q9s', 'Q8s', 'QJo', 'JTs', 'J9s', 'J8s', 'T9s', 'T8s', '98s', '97s', '87s', '86s', '76s', '75s', '65s', '64s', '54s', '53s'],
      ['TT', '99', '88', '77', '66', '55', '44', '33', '22', 'A9o', 'A8o', 'A7o', 'A6o', 'A5o', 'A4o', 'A3o', 'A2o', 'KTo', 'K9o', 'K8o', 'K7o', 'K6o', 'K5o', 'K4o', 'K3o', 'K2o', 'K7s', 'K6s', 'K5s', 'K4s', 'K3s', 'K2s', 'Q7s', 'Q6s', 'Q5s', 'Q4s', 'Q3s', 'Q2s', 'QTo', 'Q9o', 'Q8o', 'Q7o', 'Q6o', 'Q5o', 'Q4o', 'Q3o', 'Q2o', 'J7s', 'J6s', 'J5s', 'J4s', 'J3s', 'J2s', 'JTo', 'J9o', 'J8o', 'J7o', 'J6o', 'J5o', 'J4o', 'J3o', 'J2o', 'T7s', 'T6s', 'T5s', 'T4s', 'T3s', 'T2s', 'T9o', 'T8o', 'T7o', 'T6o', 'T5o', 'T4o', 'T3o', 'T2o', '96s', '95s', '94s', '93s', '92s', '98o', '97o', '96o', '95o', '94o', '93o', '92o', '85s', '84s', '83s', '82s', '87o', '86o', '85o', '84o', '83o', '82o', '74s', '73s', '72s', '76o', '75o', '74o', '73o', '72o', '63s', '62s', '65o', '64o', '63o', '62o', '52s', '54o', '53o', '52o', '42s', '43o', '42o', '32s', '32o']
    )
  }
];

// RFI vs 3bet ranges
export const JON_LITTLE_RFI_VS_3BET_RANGES: RangeData[] = [
  {
    positionCombo: 'UTG_RFI_vs_3BET',
    hands: createRfiVs3betRange(
      ['AA', 'KK', 'QQ', 'JJ', 'AKs', 'AKo'],
      ['TT', '99', '88', '77', 'AQs', 'AJs', 'ATs', 'A9s', 'A8s', 'A7s', 'A6s', 'A5s', 'A4s', 'A3s', 'A2s', 'AQo', 'AJo', 'ATo', 'KQs', 'KJs', 'KTs', 'K9s', 'KQo', 'KJo', 'QJs', 'QTs', 'Q9s', 'QJo', 'JTs', 'J9s', 'T9s', '98s', '87s', '76s', '65s']
    )
  },
  {
    positionCombo: 'BU_RFI_vs_3BET',
    hands: createRfiVs3betRange(
      ['AA', 'KK', 'QQ', 'JJ', 'TT', '99', 'AKs', 'AQs', 'AJs', 'ATs', 'A9s', 'A8s', 'A7s', 'A6s', 'A5s', 'A4s', 'A3s', 'A2s', 'AKo', 'AQo', 'AJo', 'ATo', 'A9o', 'KQs', 'KJs', 'KTs', 'K9s', 'K8s', 'K7s', 'K6s', 'K5s', 'KQo', 'KJo', 'KTo', 'QJs', 'QTs', 'Q9s', 'Q8s', 'Q7s', 'QJo', 'QTo', 'JTs', 'J9s', 'J8s', 'J7s', 'J6s', 'JTo', 'T9s', 'T8s', 'T7s', 'T6s', 'T9o', '98s', '97s', '96s', '95s', '87s', '86s', '85s', '84s', '76s', '75s', '74s', '65s', '64s', '63s', '54s', '53s', '43s'],
      ['88', '77', '66', '55', '44', '33', '22', 'A8o', 'A7o', 'A6o', 'A5o', 'A4o', 'A3o', 'A2o', 'K9o', 'K8o', 'K7o', 'K6o', 'K5o', 'K4o', 'K4s', 'K3s', 'K2s', 'Q6s', 'Q5s', 'Q4s', 'Q3s', 'Q2s', 'Q9o', 'Q8o', 'Q7o', 'Q6o', 'Q5o', 'J5s', 'J4s', 'J3s', 'J2s', 'J9o', 'J8o', 'J7o', 'J6o', 'T5s', 'T4s', 'T3s', 'T2s', 'T8o', 'T7o', 'T6o', '94s', '93s', '92s', '98o', '97o', '96o', '83s', '82s', '87o', '86o', '73s', '72s', '76o', '62s', '52s', '42s', '32s']
    )
  },
  {
    positionCombo: 'CO_RFI_vs_3BET',
    hands: {
      '22': { raise: 0, call: 25, fold: 75 },
      '33': { raise: 0, call: 25, fold: 75 },
      '44': { raise: 0, call: 25, fold: 75 },
      '55': { raise: 0, call: 50, fold: 50 },
      '66': { raise: 0, call: 50, fold: 50 },
      '77': { raise: 0, call: 50, fold: 50 },
      '88': { raise: 25, call: 75, fold: 0 },
      '99': { raise: 25, call: 75, fold: 0 },
      'KK': { raise: 100, call: 0, fold: 0 },
      'AA': { raise: 100, call: 0, fold: 0 },
      'TT': { raise: 25, call: 75, fold: 0 },
      'JJ': { raise: 25, call: 75, fold: 0 },
      'QQ': { raise: 75, call: 25, fold: 0 },
      'AKo': { raise: 50, call: 50, fold: 0 },
      'AQo': { raise: 25, call: 75, fold: 0 },
      'A5s': { raise: 50, call: 50, fold: 0 },
      'KJs': { raise: 25, call: 75, fold: 0 },
      'KTs': { raise: 25, call: 75, fold: 0 },
      'ATs': { raise: 25, call: 75, fold: 0 },
      'A9s': { raise: 25, call: 75, fold: 0 },
      'AQs': { raise: 0, call: 100, fold: 0 },
      'KQs': { raise: 0, call: 100, fold: 0 },
      'AJs': { raise: 0, call: 100, fold: 0 },
      'JTs': { raise: 0, call: 100, fold: 0 },
      'QJs': { raise: 0, call: 75, fold: 25 },
      'QTs': { raise: 0, call: 75, fold: 25 },
      'AKs': { raise: 100, call: 0, fold: 0 },
      'KQo': { raise: 25, call: 25, fold: 50 },
      'AJo': { raise: 25, call: 0, fold: 75 },
      'ATo': { raise: 25, call: 0, fold: 75 },
      'A4s': { raise: 25, call: 25, fold: 50 },
      'K9s': { raise: 50, call: 0, fold: 50 },
      'A8s': { raise: 25, call: 0, fold: 75 },
      '76s': { raise: 0, call: 50, fold: 50 },
      '65s': { raise: 0, call: 50, fold: 50 },
      'T9s': { raise: 0, call: 50, fold: 50 }
    }
  }
  /* Note: This range was originally CO_RFI_vs_SB_3BET - we're using it as the general CO RFI vs 3bet range */
  /* For more accurate opponent-specific ranges, consider: 
     - CO_RFI_vs_SB_3BET (original data) tends to be tighter
     - CO_RFI_vs_BU_3BET (original data) allows more calls with small pairs */
];

// vs Limp ranges (Custom mixed-strategy ranges)
// Hero's position when facing a single limper
// Raise size: 6bb (4bb + 2n where n=1 limper)
// 
// IMPORTANT: These ranges are for facing ONE limper only
// With multiple limpers, tighten the range by removing the bluffier hands:
// - Remove suited connectors and weaker Ax hands from mixed-frequency spots
// - Keep premium hands (77+, broadway combinations) at same frequencies
// - Generally fold most 50% frequency hands against 2+ limpers
export const UPSWING_VS_LIMP_RANGES: RangeData[] = [
  {
    positionCombo: 'UTG+1_vs_LIMP',
    hands: {
      '77': { raise: 50, call: 0, fold: 50 },
      '88': { raise: 100, call: 0, fold: 0 },
      '99': { raise: 100, call: 0, fold: 0 },
      'AA': { raise: 100, call: 0, fold: 0 },
      'KK': { raise: 100, call: 0, fold: 0 },
      'QQ': { raise: 100, call: 0, fold: 0 },
      'JJ': { raise: 100, call: 0, fold: 0 },
      'TT': { raise: 100, call: 0, fold: 0 },
      'AKs': { raise: 100, call: 0, fold: 0 },
      'AKo': { raise: 100, call: 0, fold: 0 },
      'AQs': { raise: 100, call: 0, fold: 0 },
      'AQo': { raise: 100, call: 0, fold: 0 },
      'AJs': { raise: 100, call: 0, fold: 0 },
      'ATs': { raise: 100, call: 0, fold: 0 },
      'KQs': { raise: 100, call: 0, fold: 0 },
      'KJs': { raise: 50, call: 0, fold: 50 },
      'KTs': { raise: 50, call: 0, fold: 50 },
      'QJs': { raise: 100, call: 0, fold: 0 },
      'QTs': { raise: 50, call: 0, fold: 50 },
      'JTs': { raise: 100, call: 0, fold: 0 },
      'T9s': { raise: 50, call: 0, fold: 50 },
      '98s': { raise: 50, call: 0, fold: 50 }
    }
  },
  {
    positionCombo: 'LJ_vs_LIMP', 
    hands: {
      '55': { raise: 50, call: 0, fold: 50 },
      '66': { raise: 50, call: 0, fold: 50 },
      '77': { raise: 100, call: 0, fold: 0 },
      '88': { raise: 100, call: 0, fold: 0 },
      '99': { raise: 100, call: 0, fold: 0 },
      'AA': { raise: 100, call: 0, fold: 0 },
      'KK': { raise: 100, call: 0, fold: 0 },
      'QQ': { raise: 100, call: 0, fold: 0 },
      'JJ': { raise: 100, call: 0, fold: 0 },
      'TT': { raise: 100, call: 0, fold: 0 },
      'AKs': { raise: 100, call: 0, fold: 0 },
      'AKo': { raise: 100, call: 0, fold: 0 },
      'AQs': { raise: 100, call: 0, fold: 0 },
      'AQo': { raise: 100, call: 0, fold: 0 },
      'AJs': { raise: 100, call: 0, fold: 0 },
      'ATs': { raise: 100, call: 0, fold: 0 },
      'A9s': { raise: 50, call: 0, fold: 50 },
      'A5s': { raise: 50, call: 0, fold: 50 },
      'KQs': { raise: 100, call: 0, fold: 0 },
      'KJs': { raise: 100, call: 0, fold: 0 },
      'KTs': { raise: 50, call: 0, fold: 50 },
      'QJs': { raise: 100, call: 0, fold: 0 },
      'QTs': { raise: 50, call: 0, fold: 50 },
      'JTs': { raise: 100, call: 0, fold: 0 },
      'J9s': { raise: 50, call: 0, fold: 50 },
      'T9s': { raise: 100, call: 0, fold: 0 },
      '98s': { raise: 50, call: 0, fold: 50 },
      '87s': { raise: 50, call: 0, fold: 50 },
      '76s': { raise: 50, call: 0, fold: 50 },
      '65s': { raise: 50, call: 0, fold: 50 }
    }
  },
  {
    positionCombo: 'HJ_vs_LIMP',
    hands: {
      '55': { raise: 50, call: 0, fold: 50 },
      '66': { raise: 100, call: 0, fold: 0 },
      '77': { raise: 100, call: 0, fold: 0 },
      '88': { raise: 100, call: 0, fold: 0 },
      '99': { raise: 100, call: 0, fold: 0 },
      'AA': { raise: 100, call: 0, fold: 0 },
      'KK': { raise: 100, call: 0, fold: 0 },
      'QQ': { raise: 100, call: 0, fold: 0 },
      'JJ': { raise: 100, call: 0, fold: 0 },
      'TT': { raise: 100, call: 0, fold: 0 },
      'AKs': { raise: 100, call: 0, fold: 0 },
      'AKo': { raise: 100, call: 0, fold: 0 },
      'AQs': { raise: 100, call: 0, fold: 0 },
      'AQo': { raise: 100, call: 0, fold: 0 },
      'AJs': { raise: 100, call: 0, fold: 0 },
      'AJo': { raise: 50, call: 0, fold: 50 },
      'ATs': { raise: 100, call: 0, fold: 0 },
      'A9s': { raise: 50, call: 0, fold: 50 },
      'A8s': { raise: 50, call: 0, fold: 50 },
      'A5s': { raise: 50, call: 0, fold: 50 },
      'A4s': { raise: 50, call: 0, fold: 50 },
      'KQs': { raise: 100, call: 0, fold: 0 },
      'KQo': { raise: 50, call: 0, fold: 50 },
      'KJs': { raise: 100, call: 0, fold: 0 },
      'KTs': { raise: 50, call: 0, fold: 50 },
      'K9s': { raise: 50, call: 0, fold: 50 },
      'QJs': { raise: 100, call: 0, fold: 0 },
      'QTs': { raise: 50, call: 0, fold: 50 },
      'Q9s': { raise: 50, call: 0, fold: 50 },
      'JTs': { raise: 100, call: 0, fold: 0 },
      'J9s': { raise: 50, call: 0, fold: 50 },
      'T9s': { raise: 100, call: 0, fold: 0 },
      '98s': { raise: 50, call: 0, fold: 50 },
      '87s': { raise: 50, call: 0, fold: 50 },
      '76s': { raise: 50, call: 0, fold: 50 },
      '65s': { raise: 50, call: 0, fold: 50 }
    }
  },
  {
    positionCombo: 'CO_vs_LIMP',
    hands: {
      '22': { raise: 50, call: 0, fold: 50 },
      '33': { raise: 50, call: 0, fold: 50 },
      '44': { raise: 50, call: 0, fold: 50 },
      '55': { raise: 100, call: 0, fold: 0 },
      '66': { raise: 100, call: 0, fold: 0 },
      '77': { raise: 100, call: 0, fold: 0 },
      '88': { raise: 100, call: 0, fold: 0 },
      '99': { raise: 100, call: 0, fold: 0 },
      'AA': { raise: 100, call: 0, fold: 0 },
      'KK': { raise: 100, call: 0, fold: 0 },
      'QQ': { raise: 100, call: 0, fold: 0 },
      'JJ': { raise: 100, call: 0, fold: 0 },
      'TT': { raise: 100, call: 0, fold: 0 },
      'AKs': { raise: 100, call: 0, fold: 0 },
      'AKo': { raise: 100, call: 0, fold: 0 },
      'AQs': { raise: 100, call: 0, fold: 0 },
      'AQo': { raise: 100, call: 0, fold: 0 },
      'AJs': { raise: 100, call: 0, fold: 0 },
      'AJo': { raise: 100, call: 0, fold: 0 },
      'ATs': { raise: 100, call: 0, fold: 0 },
      'ATo': { raise: 50, call: 0, fold: 50 },
      'A9s': { raise: 100, call: 0, fold: 0 },
      'A8s': { raise: 50, call: 0, fold: 50 },
      'A7s': { raise: 50, call: 0, fold: 50 },
      'A6s': { raise: 50, call: 0, fold: 50 },
      'A5s': { raise: 50, call: 0, fold: 50 },
      'A4s': { raise: 50, call: 0, fold: 50 },
      'A3s': { raise: 50, call: 0, fold: 50 },
      'A2s': { raise: 50, call: 0, fold: 50 },
      'KQs': { raise: 100, call: 0, fold: 0 },
      'KQo': { raise: 100, call: 0, fold: 0 },
      'KJs': { raise: 100, call: 0, fold: 0 },
      'KJo': { raise: 50, call: 0, fold: 50 },
      'KTs': { raise: 100, call: 0, fold: 0 },
      'K9s': { raise: 50, call: 0, fold: 50 },
      'QJs': { raise: 100, call: 0, fold: 0 },
      'QJo': { raise: 50, call: 0, fold: 50 },
      'QTs': { raise: 100, call: 0, fold: 0 },
      'Q9s': { raise: 50, call: 0, fold: 50 },
      'JTs': { raise: 100, call: 0, fold: 0 },
      'J9s': { raise: 50, call: 0, fold: 50 },
      'T9s': { raise: 100, call: 0, fold: 0 },
      'T8s': { raise: 50, call: 0, fold: 50 },
      '98s': { raise: 50, call: 0, fold: 50 },
      '97s': { raise: 50, call: 0, fold: 50 },
      '87s': { raise: 50, call: 0, fold: 50 },
      '76s': { raise: 50, call: 0, fold: 50 },
      '65s': { raise: 50, call: 0, fold: 50 },
      '54s': { raise: 50, call: 0, fold: 50 }
    }
  },
  {
    positionCombo: 'BU_vs_LIMP',
    hands: {
      '22': { raise: 50, call: 0, fold: 50 },
      '33': { raise: 50, call: 0, fold: 50 },
      '44': { raise: 50, call: 0, fold: 50 },
      '55': { raise: 100, call: 0, fold: 0 },
      '66': { raise: 100, call: 0, fold: 0 },
      '77': { raise: 100, call: 0, fold: 0 },
      '88': { raise: 100, call: 0, fold: 0 },
      '99': { raise: 100, call: 0, fold: 0 },
      'AA': { raise: 100, call: 0, fold: 0 },
      'KK': { raise: 100, call: 0, fold: 0 },
      'QQ': { raise: 100, call: 0, fold: 0 },
      'JJ': { raise: 100, call: 0, fold: 0 },
      'TT': { raise: 100, call: 0, fold: 0 },
      'AKs': { raise: 100, call: 0, fold: 0 },
      'AKo': { raise: 100, call: 0, fold: 0 },
      'AQs': { raise: 100, call: 0, fold: 0 },
      'AQo': { raise: 100, call: 0, fold: 0 },
      'AJs': { raise: 100, call: 0, fold: 0 },
      'AJo': { raise: 100, call: 0, fold: 0 },
      'ATs': { raise: 100, call: 0, fold: 0 },
      'ATo': { raise: 50, call: 0, fold: 50 },
      'A9s': { raise: 100, call: 0, fold: 0 },
      'A8s': { raise: 100, call: 0, fold: 0 },
      'A7s': { raise: 50, call: 0, fold: 50 },
      'A6s': { raise: 50, call: 0, fold: 50 },
      'A5s': { raise: 100, call: 0, fold: 0 },
      'A4s': { raise: 100, call: 0, fold: 0 },
      'A3s': { raise: 50, call: 0, fold: 50 },
      'A2s': { raise: 50, call: 0, fold: 50 },
      'KQs': { raise: 100, call: 0, fold: 0 },
      'KQo': { raise: 100, call: 0, fold: 0 },
      'KJs': { raise: 100, call: 0, fold: 0 },
      'KJo': { raise: 50, call: 0, fold: 50 },
      'KTs': { raise: 100, call: 0, fold: 0 },
      'KTo': { raise: 50, call: 0, fold: 50 },
      'K9s': { raise: 50, call: 0, fold: 50 },
      'K8s': { raise: 50, call: 0, fold: 50 },
      'K7s': { raise: 50, call: 0, fold: 50 },
      'K6s': { raise: 50, call: 0, fold: 50 },
      'K5s': { raise: 50, call: 0, fold: 50 },
      'QJs': { raise: 100, call: 0, fold: 0 },
      'QJo': { raise: 50, call: 0, fold: 50 },
      'QTs': { raise: 100, call: 0, fold: 0 },
      'QTo': { raise: 50, call: 0, fold: 50 },
      'Q9s': { raise: 50, call: 0, fold: 50 },
      'Q8s': { raise: 50, call: 0, fold: 50 },
      'Q7s': { raise: 50, call: 0, fold: 50 },
      'JTs': { raise: 100, call: 0, fold: 0 },
      'JTo': { raise: 50, call: 0, fold: 50 },
      'J9s': { raise: 50, call: 0, fold: 50 },
      'J8s': { raise: 50, call: 0, fold: 50 },
      'J7s': { raise: 50, call: 0, fold: 50 },
      'T9s': { raise: 100, call: 0, fold: 0 },
      'T8s': { raise: 50, call: 0, fold: 50 },
      'T7s': { raise: 50, call: 0, fold: 50 },
      'T6s': { raise: 50, call: 0, fold: 50 },
      '98s': { raise: 100, call: 0, fold: 0 },
      '97s': { raise: 50, call: 0, fold: 50 },
      '96s': { raise: 50, call: 0, fold: 50 },
      '87s': { raise: 50, call: 0, fold: 50 },
      '86s': { raise: 50, call: 0, fold: 50 },
      '85s': { raise: 50, call: 0, fold: 50 },
      '76s': { raise: 50, call: 0, fold: 50 },
      '75s': { raise: 50, call: 0, fold: 50 },
      '65s': { raise: 50, call: 0, fold: 50 },
      '64s': { raise: 50, call: 0, fold: 50 },
      '54s': { raise: 50, call: 0, fold: 50 },
      '53s': { raise: 50, call: 0, fold: 50 },
      'A9o': { raise: 50, call: 0, fold: 50 },
      'T9o': { raise: 50, call: 0, fold: 50 }
    }
  },
  {
    positionCombo: 'SB_vs_LIMP',
    hands: {
      '55': { raise: 50, call: 0, fold: 50 },
      '66': { raise: 50, call: 0, fold: 50 },
      '77': { raise: 100, call: 0, fold: 0 },
      '88': { raise: 100, call: 0, fold: 0 },
      '99': { raise: 100, call: 0, fold: 0 },
      'AA': { raise: 100, call: 0, fold: 0 },
      'KK': { raise: 100, call: 0, fold: 0 },
      'QQ': { raise: 100, call: 0, fold: 0 },
      'JJ': { raise: 100, call: 0, fold: 0 },
      'TT': { raise: 100, call: 0, fold: 0 },
      'AKs': { raise: 100, call: 0, fold: 0 },
      'AKo': { raise: 100, call: 0, fold: 0 },
      'AQs': { raise: 100, call: 0, fold: 0 },
      'AQo': { raise: 100, call: 0, fold: 0 },
      'AJs': { raise: 100, call: 0, fold: 0 },
      'AJo': { raise: 50, call: 0, fold: 50 },
      'ATs': { raise: 100, call: 0, fold: 0 },
      'A9s': { raise: 100, call: 0, fold: 0 },
      'A8s': { raise: 50, call: 0, fold: 50 },
      'A7s': { raise: 50, call: 0, fold: 50 },
      'A6s': { raise: 50, call: 0, fold: 50 },
      'A5s': { raise: 50, call: 0, fold: 50 },
      'A4s': { raise: 50, call: 0, fold: 50 },
      'A3s': { raise: 50, call: 0, fold: 50 },
      'A2s': { raise: 50, call: 0, fold: 50 },
      'KQs': { raise: 100, call: 0, fold: 0 },
      'KQo': { raise: 50, call: 0, fold: 50 },
      'KJs': { raise: 100, call: 0, fold: 0 },
      'KTs': { raise: 100, call: 0, fold: 0 },
      'K9s': { raise: 50, call: 0, fold: 50 },
      'QJs': { raise: 100, call: 0, fold: 0 },
      'QTs': { raise: 100, call: 0, fold: 0 },
      'Q9s': { raise: 50, call: 0, fold: 50 },
      'JTs': { raise: 100, call: 0, fold: 0 },
      'J9s': { raise: 50, call: 0, fold: 50 },
      'T9s': { raise: 100, call: 0, fold: 0 },
      'T8s': { raise: 50, call: 0, fold: 50 },
      '98s': { raise: 50, call: 0, fold: 50 },
      '97s': { raise: 50, call: 0, fold: 50 },
      '87s': { raise: 50, call: 0, fold: 50 },
      '76s': { raise: 50, call: 0, fold: 50 },
      '65s': { raise: 50, call: 0, fold: 50 },
      '54s': { raise: 50, call: 0, fold: 50 }
    }
  },
  {
    positionCombo: 'BB_vs_LIMP',
    hands: {
      '22': { raise: 50, call: 0, fold: 50 },
      '33': { raise: 50, call: 0, fold: 50 },
      '44': { raise: 50, call: 0, fold: 50 },
      '55': { raise: 50, call: 0, fold: 50 },
      '66': { raise: 50, call: 0, fold: 50 },
      '77': { raise: 100, call: 0, fold: 0 },
      '88': { raise: 100, call: 0, fold: 0 },
      '99': { raise: 100, call: 0, fold: 0 },
      'AA': { raise: 100, call: 0, fold: 0 },
      'KK': { raise: 100, call: 0, fold: 0 },
      'QQ': { raise: 100, call: 0, fold: 0 },
      'JJ': { raise: 100, call: 0, fold: 0 },
      'TT': { raise: 100, call: 0, fold: 0 },
      'AKs': { raise: 100, call: 0, fold: 0 },
      'AKo': { raise: 100, call: 0, fold: 0 },
      'AQs': { raise: 100, call: 0, fold: 0 },
      'AQo': { raise: 100, call: 0, fold: 0 },
      'AJs': { raise: 100, call: 0, fold: 0 },
      'AJo': { raise: 50, call: 0, fold: 50 },
      'ATs': { raise: 100, call: 0, fold: 0 },
      'ATo': { raise: 50, call: 0, fold: 50 },
      'A9s': { raise: 100, call: 0, fold: 0 },
      'A8s': { raise: 50, call: 0, fold: 50 },
      'A7s': { raise: 50, call: 0, fold: 50 },
      'A6s': { raise: 50, call: 0, fold: 50 },
      'A5s': { raise: 100, call: 0, fold: 0 },
      'A4s': { raise: 50, call: 0, fold: 50 },
      'A3s': { raise: 50, call: 0, fold: 50 },
      'A2s': { raise: 50, call: 0, fold: 50 },
      'KQs': { raise: 100, call: 0, fold: 0 },
      'KQo': { raise: 50, call: 0, fold: 50 },
      'KJs': { raise: 100, call: 0, fold: 0 },
      'KJo': { raise: 50, call: 0, fold: 50 },
      'KTs': { raise: 100, call: 0, fold: 0 },
      'K9s': { raise: 50, call: 0, fold: 50 },
      'K8s': { raise: 50, call: 0, fold: 50 },
      'QJs': { raise: 100, call: 0, fold: 0 },
      'QJo': { raise: 50, call: 0, fold: 50 },
      'QTs': { raise: 100, call: 0, fold: 0 },
      'Q9s': { raise: 50, call: 0, fold: 50 },
      'JTs': { raise: 100, call: 0, fold: 0 },
      'J9s': { raise: 50, call: 0, fold: 50 },
      'T9s': { raise: 100, call: 0, fold: 0 },
      'T8s': { raise: 50, call: 0, fold: 50 },
      '98s': { raise: 50, call: 0, fold: 50 },
      '97s': { raise: 50, call: 0, fold: 50 },
      '87s': { raise: 50, call: 0, fold: 50 },
      '86s': { raise: 50, call: 0, fold: 50 },
      '76s': { raise: 50, call: 0, fold: 50 },
      '75s': { raise: 50, call: 0, fold: 50 },
      '65s': { raise: 50, call: 0, fold: 50 },
      '54s': { raise: 50, call: 0, fold: 50 }
    }
  }
];

// Export all Jon Little ranges
export const JON_LITTLE_RANGES = {
  RFI: JON_LITTLE_RFI_RANGES,
  FACING_RFI: JON_LITTLE_FACING_RFI_RANGES,
  RFI_VS_3BET: JON_LITTLE_RFI_VS_3BET_RANGES
};

// Export Upswing ranges
export const UPSWING_RANGES = {
  VS_LIMP: UPSWING_VS_LIMP_RANGES
};