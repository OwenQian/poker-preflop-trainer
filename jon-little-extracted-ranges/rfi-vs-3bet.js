// RFI vs 3-bet Ranges
// How to respond when your RFI faces a 3-bet
// Extracted from PokerCoaching.com Preflop Charts

export const rfiVs3betRanges = {
  // UTG RFI vs 3-bet from various positions
  utg: {
    vsUtg13bet: {
      fourbet: [
        'AA', 'KK', 'QQ', 'JJ',
        'AKs', 'AKo'
      ],
      call: [
        'TT', '99', '88', '77',
        'AQs', 'AJs', 'ATs', 'A9s', 'A8s', 'A7s', 'A6s', 'A5s', 'A4s', 'A3s', 'A2s',
        'AQo', 'AJo', 'ATo',
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
      ]
    },

    vsSb3bet: {
      fourbet: [
        'AA', 'KK', 'QQ', 'JJ',
        'AKs', 'AKo'
      ],
      call: [
        'TT', '99', '88', '77',
        'AQs', 'AJs', 'ATs', 'A9s', 'A8s', 'A7s', 'A6s', 'A5s', 'A4s', 'A3s', 'A2s',
        'AQo', 'AJo', 'ATo',
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
      ]
    }
  },

  // UTG+1 RFI vs 3-bet
  utg1: {
    vsSb3bet: {
      fourbet: [
        'AA', 'KK', 'QQ', 'JJ',
        'AKs', 'AKo'
      ],
      call: [
        'TT', '99', '88', '77', '66',
        'AQs', 'AJs', 'ATs', 'A9s', 'A8s', 'A7s', 'A6s', 'A5s', 'A4s', 'A3s', 'A2s',
        'AQo', 'AJo', 'ATo',
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
      ]
    }
  },

  // UTG+2 RFI vs 3-bet
  utg2: {
    vsSb3bet: {
      fourbet: [
        'AA', 'KK', 'QQ', 'JJ',
        'AKs', 'AKo'
      ],
      call: [
        'TT', '99', '88', '77', '66', '55',
        'AQs', 'AJs', 'ATs', 'A9s', 'A8s', 'A7s', 'A6s', 'A5s', 'A4s', 'A3s', 'A2s',
        'AQo', 'AJo', 'ATo', 'A9o',
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
      ]
    }
  },

  // Lojack RFI vs 3-bet
  lj: {
    vsHj3bet: {
      fourbet: [
        'AA', 'KK', 'QQ', 'JJ',
        'AKs', 'AKo'
      ],
      call: [
        'TT', '99', '88', '77', '66', '55', '44',
        'AQs', 'AJs', 'ATs', 'A9s', 'A8s', 'A7s', 'A6s', 'A5s', 'A4s', 'A3s', 'A2s',
        'AQo', 'AJo', 'ATo', 'A9o', 'A8o',
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
      ]
    },

    vsSb3bet: {
      fourbet: [
        'AA', 'KK', 'QQ', 'JJ',
        'AKs', 'AKo'
      ],
      call: [
        'TT', '99', '88', '77', '66', '55', '44',
        'AQs', 'AJs', 'ATs', 'A9s', 'A8s', 'A7s', 'A6s', 'A5s', 'A4s', 'A3s', 'A2s',
        'AQo', 'AJo', 'ATo', 'A9o', 'A8o',
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
      ]
    },

    vsBb3bet: {
      fourbet: [
        'AA', 'KK', 'QQ', 'JJ',
        'AKs', 'AKo'
      ],
      call: [
        'TT', '99', '88', '77', '66', '55', '44',
        'AQs', 'AJs', 'ATs', 'A9s', 'A8s', 'A7s', 'A6s', 'A5s', 'A4s', 'A3s', 'A2s',
        'AQo', 'AJo', 'ATo', 'A9o', 'A8o',
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
      ]
    }
  },

  // Hijack RFI vs 3-bet
  hj: {
    vsCo3bet: {
      fourbet: [
        'AA', 'KK', 'QQ', 'JJ',
        'AKs', 'AKo'
      ],
      call: [
        'TT', '99', '88', '77', '66', '55', '44', '33', '22',
        'AQs', 'AJs', 'ATs', 'A9s', 'A8s', 'A7s', 'A6s', 'A5s', 'A4s', 'A3s', 'A2s',
        'AQo', 'AJo', 'ATo', 'A9o', 'A8o', 'A7o',
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
      ]
    },

    vsSb3bet: {
      fourbet: [
        'AA', 'KK', 'QQ', 'JJ', 'TT',
        'AKs', 'AQs', 'AJs', 'ATs', 'A9s', 'A8s', 'A7s', 'A6s', 'A5s', 'A4s', 'A3s', 'A2s',
        'AKo', 'AQo', 'AJo', 'ATo', 'A9o',
        'KQs', 'KJs', 'KTs', 'K9s', 'K8s',
        'KQo', 'KJo', 'KTo',
        'QJs', 'QTs', 'Q9s', 'Q8s',
        'QJo', 'QTo',
        'JTs', 'J9s', 'J8s',
        'JTo',
        'T9s', 'T8s',
        '98s', '97s',
        '87s', '86s',
        '76s', '75s',
        '65s', '64s',
        '54s', '53s'
      ],
      call: [
        '99', '88', '77', '66', '55', '44', '33', '22',
        'A8o', 'A7o',
        'K9o', 'K8o',
        'K7s', 'K6s', 'K5s',
        'Q7s', 'Q6s', 'Q5s',
        'Q9o', 'Q8o',
        'J7s', 'J6s', 'J5s',
        'J9o', 'J8o',
        'T7s', 'T6s', 'T5s',
        'T9o', 'T8o',
        '96s', '95s', '94s',
        '98o',
        '85s', '84s', '83s',
        '74s', '73s', '72s',
        '63s', '62s',
        '52s',
        '42s',
        '32s'
      ]
    }
  },

  // Cutoff RFI vs 3-bet
  co: {
    vsBtnSb3bet: {
      fourbet: [
        'AA', 'KK', 'QQ', 'JJ', 'TT',
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
        '54s', '53s',
        '43s'
      ],
      call: [
        '99', '88', '77', '66', '55', '44', '33', '22',
        'A8o', 'A7o', 'A6o', 'A5o',
        'K9o', 'K8o', 'K7o',
        'K6s', 'K5s', 'K4s',
        'Q6s', 'Q5s', 'Q4s',
        'Q9o', 'Q8o', 'Q7o',
        'J6s', 'J5s', 'J4s',
        'J9o', 'J8o', 'J7o',
        'T6s', 'T5s', 'T4s',
        'T9o', 'T8o', 'T7o',
        '95s', '94s', '93s',
        '98o', '97o',
        '84s', '83s', '82s',
        '87o',
        '73s', '72s',
        '62s',
        '52s',
        '42s',
        '32s'
      ]
    },

    vsBb3bet: {
      fourbet: [
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
        'A9o', 'A8o', 'A7o', 'A6o', 'A5o',
        'KTo', 'K9o', 'K8o', 'K7o',
        'K7s', 'K6s', 'K5s', 'K4s',
        'Q7s', 'Q6s', 'Q5s', 'Q4s',
        'QTo', 'Q9o', 'Q8o', 'Q7o',
        'J7s', 'J6s', 'J5s', 'J4s',
        'JTo', 'J9o', 'J8o', 'J7o',
        'T7s', 'T6s', 'T5s', 'T4s',
        'T9o', 'T8o', 'T7o',
        '96s', '95s', '94s', '93s',
        '98o', '97o',
        '85s', '84s', '83s', '82s',
        '87o',
        '74s', '73s', '72s',
        '63s', '62s',
        '52s',
        '42s',
        '32s'
      ]
    }
  },

  // Button RFI vs 3-bet
  btn: {
    vsSb3bet: {
      fourbet: [
        'AA', 'KK', 'QQ', 'JJ', 'TT', '99',
        'AKs', 'AQs', 'AJs', 'ATs', 'A9s', 'A8s', 'A7s', 'A6s', 'A5s', 'A4s', 'A3s', 'A2s',
        'AKo', 'AQo', 'AJo', 'ATo', 'A9o',
        'KQs', 'KJs', 'KTs', 'K9s', 'K8s', 'K7s', 'K6s', 'K5s',
        'KQo', 'KJo', 'KTo',
        'QJs', 'QTs', 'Q9s', 'Q8s', 'Q7s',
        'QJo', 'QTo',
        'JTs', 'J9s', 'J8s', 'J7s', 'J6s',
        'JTo',
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
        'A8o', 'A7o', 'A6o', 'A5o', 'A4o', 'A3o', 'A2o',
        'K9o', 'K8o', 'K7o', 'K6o', 'K5o', 'K4o',
        'K4s', 'K3s', 'K2s',
        'Q6s', 'Q5s', 'Q4s', 'Q3s', 'Q2s',
        'Q9o', 'Q8o', 'Q7o', 'Q6o', 'Q5o',
        'J5s', 'J4s', 'J3s', 'J2s',
        'J9o', 'J8o', 'J7o', 'J6o',
        'T5s', 'T4s', 'T3s', 'T2s',
        'T8o', 'T7o', 'T6o',
        '94s', '93s', '92s',
        '98o', '97o', '96o',
        '83s', '82s',
        '87o', '86o',
        '73s', '72s',
        '76o',
        '62s',
        '52s',
        '42s',
        '32s'
      ]
    }
  },

  // Small Blind RFI vs BB 3-bet (note: excludes AA, KK, AKo as they're limped)
  sb: {
    vsBb3bet: {
      fourbet: [
        'QQ', 'JJ',
        'AQs', 'AJs', 'ATs', 'A9s', 'A8s', 'A7s', 'A6s', 'A5s', 'A4s', 'A3s', 'A2s',
        'AQo', 'AJo', 'ATo',
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
        'A9o', 'A8o', 'A7o', 'A6o', 'A5o',
        'KTo', 'K9o', 'K8o',
        'K7s', 'K6s', 'K5s',
        'Q8s', 'Q7s', 'Q6s', 'Q5s',
        'QTo', 'Q9o', 'Q8o',
        'J8s', 'J7s', 'J6s', 'J5s',
        'JTo', 'J9o', 'J8o',
        'T8s', 'T7s', 'T6s', 'T5s',
        'T9o', 'T8o',
        '97s', '96s', '95s', '94s',
        '98o',
        '86s', '85s', '84s', '83s',
        '75s', '74s', '73s',
        '64s', '63s',
        '53s',
        '43s'
      ]
    },

    // SB Limp vs BB Raise (AA, KK, AKo limp/3-bet for balance)
    limpVsBbRaise: {
      limp3bet: [
        'AA', 'KK', 'AKo' // Premium hands for limp/3-bet balance
      ],
      call: [
        'QQ', 'JJ', 'TT', '99', '88', '77', '66', '55', '44', '33', '22',
        'AKs', 'AQs', 'AJs', 'ATs', 'A9s', 'A8s', 'A7s', 'A6s', 'A5s', 'A4s', 'A3s', 'A2s',
        'AQo', 'AJo', 'ATo', 'A9o', 'A8o', 'A7o', 'A6o', 'A5o', 'A4o', 'A3o', 'A2o',
        'KQs', 'KJs', 'KTs', 'K9s', 'K8s', 'K7s', 'K6s', 'K5s', 'K4s', 'K3s', 'K2s',
        'KQo', 'KJo', 'KTo', 'K9o', 'K8o', 'K7o', 'K6o', 'K5o', 'K4o', 'K3o', 'K2o',
        'QJs', 'QTs', 'Q9s', 'Q8s', 'Q7s', 'Q6s', 'Q5s', 'Q4s', 'Q3s', 'Q2s',
        'QJo', 'QTo', 'Q9o', 'Q8o', 'Q7o', 'Q6o', 'Q5o', 'Q4o', 'Q3o', 'Q2o',
        'JTs', 'J9s', 'J8s', 'J7s', 'J6s', 'J5s', 'J4s', 'J3s', 'J2s',
        'JTo', 'J9o', 'J8o', 'J7o', 'J6o', 'J5o', 'J4o', 'J3o', 'J2o',
        'T9s', 'T8s', 'T7s', 'T6s', 'T5s', 'T4s', 'T3s', 'T2s',
        'T9o', 'T8o', 'T7o', 'T6o', 'T5o', 'T4o', 'T3o', 'T2o',
        '98s', '97s', '96s', '95s', '94s', '93s', '92s',
        '98o', '97o', '96o', '95o', '94o', '93o', '92o',
        '87s', '86s', '85s', '84s', '83s', '82s',
        '87o', '86o', '85o', '84o', '83o', '82o',
        '76s', '75s', '74s', '73s', '72s',
        '76o', '75o', '74o', '73o', '72o',
        '65s', '64s', '63s', '62s',
        '65o', '64o', '63o', '62o',
        '54s', '53s', '52s',
        '54o', '53o', '52o',
        '43s', '42s',
        '43o', '42o',
        '32s', '32o'
      ]
    }
  }
};

// Action frequencies from charts
export const rfiVs3betFrequencies = {
  utg: {
    vsUtg13bet: { fourbet: 2.1, call: 3.5, fold: 89.9 },
    vsSb3bet: { fourbet: 2.5, call: 6.0, fold: 88.9 }
  },
  utg1: {
    vsSb3bet: { fourbet: 2.8, call: 5.1, fold: 84.8 }
  },
  utg2: {
    vsSb3bet: { fourbet: 3.6, call: 7.7, fold: 84.3 }
  },
  lj: {
    vsHj3bet: { fourbet: 2.1, call: 6.3, fold: 81.7 },
    vsSb3bet: { fourbet: 3.0, call: 9.7, fold: 81.7 },
    vsBb3bet: { fourbet: 3.0, call: 8.0, fold: 81.7 }
  },
  hj: {
    vsCo3bet: { fourbet: 3.0, call: 10.9, fold: 78.7 },
    vsSb3bet: { fourbet: 3.0, call: 10.7, fold: 78.7 }
  },
  co: {
    vsBtnSb3bet: { fourbet: 3.5, call: 11.5, fold: 73.0 },
    vsBb3bet: { fourbet: 1.3, call: 10.9, fold: 73.0 }
  },
  btn: {
    vsSb3bet: { fourbet: 5.1, call: 48.6, fold: 46.9 }
  },
  sb: {
    vsBb3bet: { fourbet: 3.9, call: 7.4, fold: 78.1 },
    limpVsBbRaise: { limp3bet: 4.5, call: 37.7, fold: 51.4 }
  }
};

// Additional notes
export const specialSituations = {
  sbStrategy: {
    note: "AA, KK, and AKo are not in the SB RFI vs BB 3bet range because these hands were limped for balance",
    limpThreeBetHands: ['AA', 'KK', 'AKo'],
    purpose: "Used as limp/3-bet for value to balance the limping range"
  },
  
  generalGuidelines: {
    earlyPosition: "Tighter 4-bet ranges, more folding to 3-bets",
    latePosition: "Wider 4-bet ranges, more calling vs 3-bets", 
    vsBlindDefense: "Generally wider continuing ranges as blinds defend lighter",
    stackDepth: "These ranges assume 100bb+ effective stacks"
  }
};
