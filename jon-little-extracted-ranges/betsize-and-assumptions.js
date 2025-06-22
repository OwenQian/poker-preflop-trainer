// Betting Sizes and Assumptions
// From PokerCoaching.com Preflop Charts

export const bettingSizes = {
  // In Position (IP) sizing
  inPosition: {
    rfi: 2.5, // 2.5 big blinds
    threebet: 3.0, // 3x opponent's raise
    fourbet: 2.5 // 2.5x opponent's 3-bet
  },
  
  // Out of Position (OOP) sizing
  outOfPosition: {
    rfi: 3.5, // 3.5 big blinds
    threebet: 3.5, // 3.5x opponent's raise
    fourbet: 2.75 // 2.75x opponent's 3-bet
  }
};

// Stack size and game assumptions
export const assumptions = {
  effectiveStacks: 100, // 100 big blinds
  minApplicableStack: 50, // Charts apply to 50bb and larger
  ante: true, // Ante in play
  gameType: 'No Limit Hold\'em',
  tableSize: 9, // 9-handed
  
  // Position definitions
  positions: {
    utg: 'Under the Gun',
    utg1: 'UTG+1',
    utg2: 'UTG+2', 
    lj: 'Lojack',
    hj: 'Hijack',
    co: 'Cutoff',
    btn: 'Button',
    sb: 'Small Blind',
    bb: 'Big Blind'
  },

  // Important notes from the charts
  notes: [
    'These charts are designed for fundamentally sound preflop decisions',
    'Charts work well in most situations but should be adjusted for specific situations',
    'Playing default strategy in all situations results in roughly break-even play',
    'Adjust to take advantage of opponent mistakes for profitability',
    'Small Blind has special strategy with limp/3-bet using AA, KK, AKo for balance'
  ]
};

// Chart organization
export const chartStructure = {
  rfi: {
    description: 'Raise First In - hands to play when everyone folds to you',
    positions: ['utg', 'utg1', 'utg2', 'lj', 'hj', 'co', 'btn', 'sb']
  },
  
  facingRfi: {
    description: 'How to play when someone raises before you',
    actions: ['threebet', 'call', 'fold'],
    scenarios: [
      'bb vs utg/utg1/utg2/lj/hj/co/btn/sb',
      'sb vs utg/utg1/utg2/lj/hj/co/btn',
      'btn vs utg/utg1/utg2/lj/hj/co',
      'co vs utg/utg1/utg2/lj/hj',
      'hj vs utg/utg1/utg2/lj',
      'lj vs utg/utg1/utg2',
      'utg2 vs utg/utg1',
      'utg1 vs utg'
    ]
  },
  
  rfiVs3bet: {
    description: 'How to play when you RFI and someone yet to act 3-bets',
    actions: ['fourbet', 'call', 'fold'],
    scenarios: [
      'utg vs 3bet from any position',
      'utg1 vs 3bet from any position',
      'utg2 vs 3bet from any position', 
      'lj vs 3bet from any position',
      'hj vs 3bet from any position',
      'co vs 3bet from btn/sb/bb',
      'btn vs 3bet from sb/bb',
      'sb vs bb 3bet (special: excludes AA/KK/AKo as they limp)',
      'sb limp vs bb raise (includes AA/KK/AKo limp/3bet)'
    ]
  }
};

// Example usage patterns
export const usageExamples = {
  rfi: {
    example: "You're in the Cutoff and everyone folds to you",
    solution: "Use rfiRanges.co to determine which hands to raise"
  },
  
  facingRfi: {
    example: "You're in the Big Blind and the Button raises",
    solution: "Use facingRfiRanges.bb.vsBtn to see 3-bet/call/fold ranges"
  },
  
  rfiVs3bet: {
    example: "You raise from UTG and the Small Blind 3-bets",
    solution: "Use rfiVs3betRanges.utg.vsSb3bet to see 4-bet/call/fold ranges"
  }
};

// Frequency summaries (percentages of 1326 total hands)
export const frequencySummary = {
  rfi: {
    utg: '10.1% (134 hands)',
    utg1: '14.3% (190 hands)',
    utg2: '15.7% (208 hands)', 
    lj: '18.3% (242 hands)',
    hj: '21.3% (282 hands)',
    co: '27.0% (358 hands)',
    btn: '51.1% (678 hands)',
    sb: '9.8% raise for value + 13.0% raise as bluff + 46.5% limp = 69.3% total action'
  },
  
  facingRfi: {
    tightest: 'BB vs UTG: 2.0% 3-bet, 23.7% call, 74.3% fold',
    loosest: 'BB vs BTN: 9.4% 3-bet, 64.8% call, 25.8% fold'
  },
  
  rfiVs3bet: {
    tightest: 'UTG vs any 3-bet: ~2.5% 4-bet, ~6% call, ~91.5% fold',
    loosest: 'BTN vs SB 3-bet: 5.1% 4-bet, 48.6% call, 46.3% fold'
  }
};