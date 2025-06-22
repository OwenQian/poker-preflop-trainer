// Facing RFI Ranges
// How to respond when facing a Raise First In from different positions
// Extracted from PokerCoaching.com Preflop Charts

export const facingRfiRanges = {
  // Big Blind vs various positions
  bb: {
    vsUtg: {
      threebet: [
        'AA', 'KK', 'QQ',
        'AKs', 'AQs', 'AJs', 'ATs', 'A9s', 'A8s', 'A7s', 'A6s', 'A5s', 'A4s', 'A3s', 'A2s',
        'AKo', 'AQo', 'AJo',
        'KQs', 'KJs', 'KTs', 'K9s',
        'KQo',
        'QJs', 'QTs',
        'JTs',
        'T9s',
        '98s',
        '87s',
        '76s',
        '65s'
      ],
      call: [
        'JJ', 'TT', '99', '88', '77', '66', '55', '44', '33', '22',
        'ATo', 'A9o', 'A8o', 'A7o', 'A6o', 'A5o', 'A4o', 'A3o', 'A2o',
        'KJo', 'KTo', 'K9o', 'K8o', 'K7o', 'K6o', 'K5o', 'K4o', 'K3o', 'K2o',
        'Q9s', 'Q8s', 'Q7s', 'Q6s', 'Q5s', 'Q4s', 'Q3s', 'Q2s',
        'QJo', 'QTo', 'Q9o', 'Q8o', 'Q7o', 'Q6o', 'Q5o', 'Q4o', 'Q3o', 'Q2o',
        'J9s', 'J8s', 'J7s', 'J6s', 'J5s', 'J4s', 'J3s', 'J2s',
        'JTo', 'J9o', 'J8o', 'J7o', 'J6o', 'J5o', 'J4o', 'J3o', 'J2o',
        'T8s', 'T7s', 'T6s', 'T5s', 'T4s', 'T3s', 'T2s',
        'T9o', 'T8o', 'T7o', 'T6o', 'T5o', 'T4o', 'T3o', 'T2o',
        '97s', '96s', '95s', '94s', '93s', '92s',
        '98o', '97o', '96o', '95o', '94o', '93o', '92o',
        '86s', '85s', '84s', '83s', '82s',
        '87o', '86o', '85o', '84o', '83o', '82o',
        '75s', '74s', '73s', '72s',
        '76o', '75o', '74o', '73o', '72o',
        '64s', '63s', '62s',
        '65o', '64o', '63o', '62o',
        '54s', '53s', '52s',
        '54o', '53o', '52o',
        '43s', '42s',
        '43o', '42o',
        '32s', '32o'
      ]
    },

    vsUtg2: {
      threebet: [
        'AA', 'KK', 'QQ', 'JJ',
        'AKs', 'AQs', 'AJs', 'ATs', 'A9s', 'A8s', 'A7s', 'A6s', 'A5s', 'A4s', 'A3s', 'A2s',
        'AKo', 'AQo', 'AJo', 'ATo',
        'KQs', 'KJs', 'KTs', 'K9s', 'K8s',
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
      call: [
        'TT', '99', '88', '77', '66', '55', '44', '33', '22',
        'A9o', 'A8o', 'A7o', 'A6o', 'A5o', 'A4o', 'A3o', 'A2o',
        'KTo', 'K9o', 'K8o', 'K7o', 'K6o', 'K5o', 'K4o', 'K3o', 'K2o',
        'Q8s', 'Q7s', 'Q6s', 'Q5s', 'Q4s', 'Q3s', 'Q2s',
        'QTo', 'Q9o', 'Q8o', 'Q7o', 'Q6o', 'Q5o', 'Q4o', 'Q3o', 'Q2o',
        'J8s', 'J7s', 'J6s', 'J5s', 'J4s', 'J3s', 'J2s',
        'JTo', 'J9o', 'J8o', 'J7o', 'J6o', 'J5o', 'J4o', 'J3o', 'J2o',
        'T8s', 'T7s', 'T6s', 'T5s', 'T4s', 'T3s', 'T2s',
        'T9o', 'T8o', 'T7o', 'T6o', 'T5o', 'T4o', 'T3o', 'T2o',
        '97s', '96s', '95s', '94s', '93s', '92s',
        '98o', '97o', '96o', '95o', '94o', '93o', '92o',
        '86s', '85s', '84s', '83s', '82s',
        '87o', '86o', '85o', '84o', '83o', '82o',
        '75s', '74s', '73s', '72s',
        '76o', '75o', '74o', '73o', '72o',
        '64s', '63s', '62s',
        '65o', '64o', '63o', '62o',
        '54s', '53s', '52s',
        '54o', '53o', '52o',
        '43s', '42s',
        '43o', '42o',
        '32s', '32o'
      ]
    },

    vsCo: {
      threebet: [
        'AA', 'KK', 'QQ', 'JJ', 'TT',
        'AKs', 'AQs', 'AJs', 'ATs', 'A9s', 'A8s', 'A7s', 'A6s', 'A5s', 'A4s', 'A3s', 'A2s',
        'AKo', 'AQo', 'AJo', 'ATo', 'A9o',
        'KQs', 'KJs', 'KTs', 'K9s', 'K8s', 'K7s', 'K6s',
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
        '54s', '53s',
        '43s'
      ],
      call: [
        '99', '88', '77', '66', '55', '44', '33', '22',
        'A8o', 'A7o', 'A6o', 'A5o', 'A4o', 'A3o', 'A2o',
        'K9o', 'K8o', 'K7o', 'K6o', 'K5o', 'K4o', 'K3o', 'K2o',
        'Q6s', 'Q5s', 'Q4s', 'Q3s', 'Q2s',
        'Q9o', 'Q8o', 'Q7o', 'Q6o', 'Q5o', 'Q4o', 'Q3o', 'Q2o',
        'J6s', 'J5s', 'J4s', 'J3s', 'J2s',
        'J9o', 'J8o', 'J7o', 'J6o', 'J5o', 'J4o', 'J3o', 'J2o',
        'T6s', 'T5s', 'T4s', 'T3s', 'T2s',
        'T9o', 'T8o', 'T7o', 'T6o', 'T5o', 'T4o', 'T3o', 'T2o',
        '95s', '94s', '93s', '92s',
        '98o', '97o', '96o', '95o', '94o', '93o', '92o',
        '84s', '83s', '82s',
        '87o', '86o', '85o', '84o', '83o', '82o',
        '73s', '72s',
        '76o', '75o', '74o', '73o', '72o',
        '62s',
        '65o', '64o', '63o', '62o',
        '52s',
        '54o', '53o', '52o',
        '42s',
        '43o', '42o',
        '32s', '32o'
      ]
    },

    vsBtn: {
      threebet: [
        'AA', 'KK', 'QQ', 'JJ',
        'AKs', 'AQs', 'AJs', 'ATs', 'A9s', 'A8s', 'A7s', 'A6s', 'A5s', 'A4s', 'A3s', 'A2s',
        'AKo', 'AQo', 'AJo', 'ATo', 'A9o',
        'KQs', 'KJs', 'KTs', 'K9s', 'K8s', 'K7s', 'K6s', 'K5s', 'K4s',
        'KQo', 'KJo', 'KTo',
        'QJs', 'QTs', 'Q9s', 'Q8s', 'Q7s', 'Q6s', 'Q5s',
        'QJo', 'QTo',
        'JTs', 'J9s', 'J8s', 'J7s', 'J6s', 'J5s',
        'JTo',
        'T9s', 'T8s', 'T7s', 'T6s', 'T5s',
        '98s', '97s', '96s', '95s',
        '87s', '86s', '85s', '84s',
        '76s', '75s', '74s',
        '65s', '64s', '63s',
        '54s', '53s',
        '43s'
      ],
      call: [
        'TT', '99', '88', '77', '66', '55', '44', '33', '22',
        'A8o', 'A7o', 'A6o', 'A5o', 'A4o', 'A3o', 'A2o',
        'K9o', 'K8o', 'K7o', 'K6o', 'K5o', 'K4o', 'K3o', 'K2o',
        'Q4s', 'Q3s', 'Q2s',
        'Q9o', 'Q8o', 'Q7o', 'Q6o', 'Q5o', 'Q4o', 'Q3o', 'Q2o',
        'J4s', 'J3s', 'J2s',
        'J9o', 'J8o', 'J7o', 'J6o', 'J5o', 'J4o', 'J3o', 'J2o',
        'T4s', 'T3s', 'T2s',
        'T9o', 'T8o', 'T7o', 'T6o', 'T5o', 'T4o', 'T3o', 'T2o',
        '94s', '93s', '92s',
        '98o', '97o', '96o', '95o', '94o', '93o', '92o',
        '83s', '82s',
        '87o', '86o', '85o', '84o', '83o', '82o',
        '73s', '72s',
        '76o', '75o', '74o', '73o', '72o',
        '62s',
        '65o', '64o', '63o', '62o',
        '52s',
        '54o', '53o', '52o',
        '42s',
        '43o', '42o',
        '32s', '32o'
      ]
    },

    vsSb: {
      threebet: [
        'AA', 'KK', 'QQ', 'JJ', 'TT', '99',
        'AKs', 'AQs', 'AJs', 'ATs', 'A9s', 'A8s', 'A7s', 'A6s', 'A5s', 'A4s', 'A3s', 'A2s',
        'AKo', 'AQo', 'AJo', 'ATo', 'A9o', 'A8o',
        'KQs', 'KJs', 'KTs', 'K9s', 'K8s', 'K7s', 'K6s', 'K5s',
        'KQo', 'KJo', 'KTo', 'K9o',
        'QJs', 'QTs', 'Q9s', 'Q8s', 'Q7s', 'Q6s',
        'QJo', 'QTo', 'Q9o',
        'JTs', 'J9s', 'J8s', 'J7s', 'J6s',
        'JTo', 'J9o',
        'T9s', 'T8s', 'T7s', 'T6s',
        'T9o',
        '98s', '97s', '96s', '95s',
        '87s', '86s', '85s', '84s',
        '76s', '75s', '74s',
        '65s', '64s', '63s',
        '54s', '53s',
        '43s'
      ],
      call: [
        '88', '77', '66', '55', '44', '33', '22',
        'A7o', 'A6o', 'A5o', 'A4o', 'A3o', 'A2o',
        'K8o', 'K7o', 'K6o', 'K5o', 'K4o', 'K3o', 'K2o',
        'Q5s', 'Q4s', 'Q3s', 'Q2s',
        'Q8o', 'Q7o', 'Q6o', 'Q5o', 'Q4o', 'Q3o', 'Q2o',
        'J5s', 'J4s', 'J3s', 'J2s',
        'J8o', 'J7o', 'J6o', 'J5o', 'J4o', 'J3o', 'J2o',
        'T5s', 'T4s', 'T3s', 'T2s',
        'T8o', 'T7o', 'T6o', 'T5o', 'T4o', 'T3o', 'T2o',
        '94s', '93s', '92s',
        '98o', '97o', '96o', '95o', '94o', '93o', '92o',
        '83s', '82s',
        '87o', '86o', '85o', '84o', '83o', '82o',
        '73s', '72s',
        '76o', '75o', '74o', '73o', '72o',
        '62s',
        '65o', '64o', '63o', '62o',
        '52s',
        '54o', '53o', '52o',
        '42s',
        '43o', '42o',
        '32s', '32o'
      ]
    }
  },

  // Small Blind vs various positions
  sb: {
    vsUtg: {
      threebet: [
        'AA', 'KK', 'QQ',
        'AKs', 'AQs', 'AJs', 'ATs', 'A9s', 'A8s', 'A7s', 'A6s', 'A5s', 'A4s', 'A3s', 'A2s',
        'AKo', 'AQo', 'AJo',
        'KQs', 'KJs', 'KTs',
        'KQo',
        'QJs', 'QTs',
        'JTs',
        'T9s',
        '98s',
        '87s',
        '76s',
        '65s'
      ],
      call: [
        'JJ', 'TT', '99', '88', '77', '66', '55', '44', '33', '22',
        'ATo', 'A9o', 'A8o', 'A7o', 'A6o', 'A5o', 'A4o', 'A3o', 'A2o',
        'KJo', 'KTo', 'K9o', 'K8o', 'K7o', 'K6o', 'K5o', 'K4o', 'K3o', 'K2o',
        'K9s', 'K8s', 'K7s', 'K6s', 'K5s', 'K4s', 'K3s', 'K2s',
        'Q9s', 'Q8s', 'Q7s', 'Q6s', 'Q5s', 'Q4s', 'Q3s', 'Q2s',
        'QJo', 'QTo', 'Q9o', 'Q8o', 'Q7o', 'Q6o', 'Q5o', 'Q4o', 'Q3o', 'Q2o',
        'J9s', 'J8s', 'J7s', 'J6s', 'J5s', 'J4s', 'J3s', 'J2s',
        'JTo', 'J9o', 'J8o', 'J7o', 'J6o', 'J5o', 'J4o', 'J3o', 'J2o',
        'T8s', 'T7s', 'T6s', 'T5s', 'T4s', 'T3s', 'T2s',
        'T9o', 'T8o', 'T7o', 'T6o', 'T5o', 'T4o', 'T3o', 'T2o',
        '97s', '96s', '95s', '94s', '93s', '92s',
        '98o', '97o', '96o', '95o', '94o', '93o', '92o',
        '86s', '85s', '84s', '83s', '82s',
        '87o', '86o', '85o', '84o', '83o', '82o',
        '75s', '74s', '73s', '72s',
        '76o', '75o', '74o', '73o', '72o',
        '64s', '63s', '62s',
        '65o', '64o', '63o', '62o',
        '54s', '53s', '52s',
        '54o', '53o', '52o',
        '43s', '42s',
        '43o', '42o',
        '32s', '32o'
      ]
    },

    vsBtn: {
      threebet: [
        'AA', 'KK', 'QQ',
        'AKs', 'AQs', 'AJs', 'ATs', 'A9s', 'A8s', 'A7s', 'A6s', 'A5s', 'A4s', 'A3s', 'A2s',
        'AKo', 'AQo', 'AJo', 'ATo',
        'KQs', 'KJs', 'KTs', 'K9s', 'K8s', 'K7s', 'K6s', 'K5s',
        'KQo', 'KJo', 'KTo',
        'QJs', 'QTs', 'Q9s', 'Q8s', 'Q7s', 'Q6s',
        'QJo', 'QTo',
        'JTs', 'J9s', 'J8s', 'J7s', 'J6s',
        'JTo',
        'T9s', 'T8s', 'T7s', 'T6s',
        '98s', '97s', '96s', '95s',
        '87s', '86s', '85s', '84s',
        '76s', '75s', '74s',
        '65s', '64s', '63s',
        '54s', '53s',
        '43s'
      ],
      call: [
        'JJ', 'TT', '99', '88', '77', '66', '55', '44', '33', '22',
        'A9o', 'A8o', 'A7o', 'A6o', 'A5o', 'A4o', 'A3o', 'A2o',
        'K9o', 'K8o', 'K7o', 'K6o', 'K5o', 'K4o', 'K3o', 'K2o',
        'K4s', 'K3s', 'K2s',
        'Q5s', 'Q4s', 'Q3s', 'Q2s',
        'Q9o', 'Q8o', 'Q7o', 'Q6o', 'Q5o', 'Q4o', 'Q3o', 'Q2o',
        'J5s', 'J4s', 'J3s', 'J2s',
        'J9o', 'J8o', 'J7o', 'J6o', 'J5o', 'J4o', 'J3o', 'J2o',
        'T5s', 'T4s', 'T3s', 'T2s',
        'T9o', 'T8o', 'T7o', 'T6o', 'T5o', 'T4o', 'T3o', 'T2o',
        '94s', '93s', '92s',
        '98o', '97o', '96o', '95o', '94o', '93o', '92o',
        '83s', '82s',
        '87o', '86o', '85o', '84o', '83o', '82o',
        '73s', '72s',
        '76o', '75o', '74o', '73o', '72o',
        '62s',
        '65o', '64o', '63o', '62o',
        '52s',
        '54o', '53o', '52o',
        '42s',
        '43o', '42o',
        '32s', '32o'
      ]
    }
  },

  // Button vs various positions
  btn: {
    vsCo: {
      threebet: [
        'AA', 'KK', 'QQ', 'JJ', 'TT',
        'AKs', 'AQs', 'AJs', 'ATs', 'A9s', 'A8s', 'A7s', 'A6s', 'A5s', 'A4s', 'A3s', 'A2s',
        'AKo', 'AQo', 'AJo', 'ATo', 'A9o',
        'KQs', 'KJs', 'KTs', 'K9s', 'K8s', 'K7s', 'K6s', 'K5s',
        'KQo', 'KJo', 'KTo',
        'QJs', 'QTs', 'Q9s', 'Q8s', 'Q7s', 'Q6s',
        'QJo', 'QTo',
        'JTs', 'J9s', 'J8s', 'J7s', 'J6s',
        'JTo',
        'T9s', 'T8s', 'T7s', 'T6s',
        '98s', '97s', '96s', '95s',
        '87s', '86s', '85s', '84s',
        '76s', '75s', '74s',
        '65s', '64s', '63s',
        '54s', '53s',
        '43s'
      ],
      call: [
        '99', '88', '77', '66', '55', '44', '33', '22',
        'A8o', 'A7o', 'A6o', 'A5o', 'A4o', 'A3o', 'A2o',
        'K9o', 'K8o', 'K7o', 'K6o', 'K5o', 'K4o', 'K3o', 'K2o',
        'K4s', 'K3s', 'K2s',
        'Q5s', 'Q4s', 'Q3s', 'Q2s',
        'Q9o', 'Q8o', 'Q7o', 'Q6o', 'Q5o', 'Q4o', 'Q3o', 'Q2o',
        'J5s', 'J4s', 'J3s', 'J2s',
        'J9o', 'J8o', 'J7o', 'J6o', 'J5o', 'J4o', 'J3o', 'J2o',
        'T5s', 'T4s', 'T3s', 'T2s',
        'T9o', 'T8o', 'T7o', 'T6o', 'T5o', 'T4o', 'T3o', 'T2o',
        '94s', '93s', '92s',
        '98o', '97o', '96o', '95o', '94o', '93o', '92o',
        '83s', '82s',
        '87o', '86o', '85o', '84o', '83o', '82o',
        '73s', '72s',
        '76o', '75o', '74o', '73o', '72o',
        '62s',
        '65o', '64o', '63o', '62o',
        '52s',
        '54o', '53o', '52o',
        '42s',
        '43o', '42o',
        '32s', '32o'
      ]
    }
  },

  // Cutoff vs various positions  
  co: {
    vsHj: {
      threebet: [
        'AA', 'KK', 'QQ', 'JJ',
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
      call: [
        'TT', '99', '88', '77', '66', '55', '44', '33', '22',
        'A9o', 'A8o', 'A7o', 'A6o', 'A5o', 'A4o', 'A3o', 'A2o',
        'KTo', 'K9o', 'K8o', 'K7o', 'K6o', 'K5o', 'K4o', 'K3o', 'K2o',
        'K7s', 'K6s', 'K5s', 'K4s', 'K3s', 'K2s',
        'Q7s', 'Q6s', 'Q5s', 'Q4s', 'Q3s', 'Q2s',
        'QTo', 'Q9o', 'Q8o', 'Q7o', 'Q6o', 'Q5o', 'Q4o', 'Q3o', 'Q2o',
        'J7s', 'J6s', 'J5s', 'J4s', 'J3s', 'J2s',
        'JTo', 'J9o', 'J8o', 'J7o', 'J6o', 'J5o', 'J4o', 'J3o', 'J2o',
        'T7s', 'T6s', 'T5s', 'T4s', 'T3s', 'T2s',
        'T9o', 'T8o', 'T7o', 'T6o', 'T5o', 'T4o', 'T3o', 'T2o',
        '96s', '95s', '94s', '93s', '92s',
        '98o', '97o', '96o', '95o', '94o', '93o', '92o',
        '85s', '84s', '83s', '82s',
        '87o', '86o', '85o', '84o', '83o', '82o',
        '74s', '73s', '72s',
        '76o', '75o', '74o', '73o', '72o',
        '63s', '62s',
        '65o', '64o', '63o', '62o',
        '52s',
        '54o', '53o', '52o',
        '42s',
        '43o', '42o',
        '32s', '32o'
      ]
    }
  }
};

// Action frequencies from charts
export const facingRfiFrequencies = {
  bb: {
    vsUtg: { threebet: 2.0, call: 23.7, fold: 72.1 },
    vsUtg2: { threebet: 3.3, call: 26.7, fold: 70.0 },
    vsCo: { threebet: 5.0, call: 39.2, fold: 55.1 },
    vsBtn: { threebet: 9.4, call: 64.8, fold: 26.1 },
    vsSb: { threebet: 9.4, call: 54.9, fold: 21.7 }
  },
  sb: {
    vsUtg: { threebet: 1.7, call: 81.3, fold: 17.0 },
    vsBtn: { threebet: 7.7, call: 78.7, fold: 13.6 }
  },
  btn: {
    vsCo: { threebet: 4.1, call: 70.8, fold: 25.1 }
  }
};