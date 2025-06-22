// RFI (Raise First In) Ranges
// Extracted from PokerCoaching.com Preflop Charts
// 100bb effective stacks with ante, applies to 50bb+ stacks

export const rfiRanges = {
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
    'AA', 'KK', 'QQ', 'JJ', 'TT', '99', '88', '77', '66',
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
  ],

  sb: {
    raiseForValue: [
      // 9.8% range - Raise for Value
      'AA', 'KK', 'QQ', 'JJ',
      'AKs', 'AQs', 'AJs', 'ATs', 'A9s', 'A8s', 'A7s', 'A6s', 'A5s', 'A4s', 'A3s', 'A2s',
      'AKo', 'AQo', 'AJo', 'ATo', 'A9o', 'A8o', 'A7o', 'A6o', 'A5o',
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
      '76s', '75s', '74s', '73s',
      '65s', '64s', '63s',
      '54s', '53s',
      '43s'
    ],
    
    raiseAsBluff: [
      // 13.0% range - Raise as a Bluff (additional hands for balance)
      'TT', '99', '88', '77', '66', '55', '44', '33', '22',
      'A4o', 'A3o', 'A2o',
      'K7o', 'K6o', 'K5o', 'K4o', 'K3o', 'K2o',
      'Q7o', 'Q6o', 'Q5o', 'Q4o', 'Q3o', 'Q2o',
      'J7o', 'J6o', 'J5o', 'J4o', 'J3o', 'J2o',
      'T7o', 'T6o', 'T5o', 'T4o', 'T3o', 'T2o',
      '97o', '96o', '95o', '94o', '93o', '92o',
      '86o', '85o', '84o', '83o', '82o',
      '75o', '74o', '73o', '72o',
      '64o', '63o', '62o',
      '53o', '52o',
      '42o',
      'K4s', 'K3s', 'K2s',
      'Q4s', 'Q3s', 'Q2s',
      'J4s', 'J3s', 'J2s',
      'T4s', 'T3s', 'T2s',
      '93s', '92s',
      '82s',
      '72s',
      '62s',
      '52s',
      '42s',
      '32s'
    ],

    limp: [
      // 46.5% range - Limp (includes AA, KK, AKo for balance)
      'AA', 'KK', 'AKo', // Premium hands for limp/3-bet balance
      // All other hands not in raise ranges that are playable
    ]
  }
};

// RFI frequencies from the charts
export const rfiFrequencies = {
  utg: 10.1, // 134/1326 hands
  utg1: 14.3, // 190/1326 hands  
  utg2: 15.7, // 208/1326 hands
  lj: 18.3, // 242/1326 hands
  hj: 21.3, // 282/1326 hands
  co: 27.0, // 358/1326 hands
  btn: 51.1, // 678/1326 hands
  sb: {
    raiseForValue: 9.8, // 119/1326 hands
    raiseAsBluff: 13.0, // 172/1326 hands
    limp: 46.5, // 644/1326 hands
    fold: 29.6 // 392/1326 hands
  }
};