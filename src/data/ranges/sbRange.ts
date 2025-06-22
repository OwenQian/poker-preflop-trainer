import { RangeData } from '../../types';

// SB (Small Blind) RFI Range - ~10.5%
export const SB_RFI: RangeData = {
  positionCombo: 'SB_RFI',
  hands: {
    // Premium pairs - 100% raise (green)
    'AA': { raise: 100, call: 0, fold: 0 },
    'KK': { raise: 100, call: 0, fold: 0 },
    'QQ': { raise: 100, call: 0, fold: 0 },
    'JJ': { raise: 100, call: 0, fold: 0 },
    'TT': { raise: 100, call: 0, fold: 0 },
    '99': { raise: 100, call: 0, fold: 0 },
    '88': { raise: 100, call: 0, fold: 0 },
    '77': { raise: 100, call: 0, fold: 0 },
    '66': { raise: 100, call: 0, fold: 0 },
    '55': { raise: 100, call: 0, fold: 0 },
    '44': { raise: 100, call: 0, fold: 0 },
    '33': { raise: 100, call: 0, fold: 0 },
    '22': { raise: 100, call: 0, fold: 0 },
    
    // Ace hands
    'AKs': { raise: 100, call: 0, fold: 0 },  // Green
    'AKo': { raise: 100, call: 0, fold: 0 },  // Green
    'AQs': { raise: 100, call: 0, fold: 0 },  // Green
    'AQo': { raise: 100, call: 0, fold: 0 },  // Green
    'AJs': { raise: 100, call: 0, fold: 0 },  // Green
    'AJo': { raise: 100, call: 0, fold: 0 },  // Green
    'ATs': { raise: 100, call: 0, fold: 0 },  // Green
    'ATo': { raise: 100, call: 0, fold: 0 },  // Green
    'A9s': { raise: 100, call: 0, fold: 0 },  // Green
    'A9o': { raise: 100, call: 0, fold: 0 },  // Green
    'A8s': { raise: 100, call: 0, fold: 0 },  // Green
    'A8o': { raise: 100, call: 0, fold: 0 },  // Green
    'A7s': { raise: 100, call: 0, fold: 0 },  // Green
    'A7o': { raise: 100, call: 0, fold: 0 },  // Green
    'A6s': { raise: 100, call: 0, fold: 0 },  // Green
    'A6o': { raise: 100, call: 0, fold: 0 },  // Green
    'A5s': { raise: 100, call: 0, fold: 0 },  // Green
    'A5o': { raise: 100, call: 0, fold: 0 },  // Green
    'A4s': { raise: 100, call: 0, fold: 0 },  // Green
    'A4o': { raise: 100, call: 0, fold: 0 },  // Green
    'A3s': { raise: 100, call: 0, fold: 0 },  // Green
    'A3o': { raise: 50, call: 0, fold: 50 },  // Yellow
    'A2s': { raise: 100, call: 0, fold: 0 },  // Green
    'A2o': { raise: 50, call: 0, fold: 50 },  // Yellow
    
    // King hands
    'KQs': { raise: 100, call: 0, fold: 0 },  // Green
    'KQo': { raise: 100, call: 0, fold: 0 },  // Green
    'KJs': { raise: 100, call: 0, fold: 0 },  // Green
    'KJo': { raise: 100, call: 0, fold: 0 },  // Green
    'KTs': { raise: 100, call: 0, fold: 0 },  // Green
    'KTo': { raise: 100, call: 0, fold: 0 },  // Green
    'K9s': { raise: 100, call: 0, fold: 0 },  // Green
    'K9o': { raise: 100, call: 0, fold: 0 },  // Green
    'K8s': { raise: 100, call: 0, fold: 0 },  // Green
    'K8o': { raise: 100, call: 0, fold: 0 },  // Green
    'K7s': { raise: 100, call: 0, fold: 0 },  // Green
    'K7o': { raise: 50, call: 0, fold: 50 },  // Yellow
    'K6s': { raise: 100, call: 0, fold: 0 },  // Green
    'K6o': { raise: 0, call: 0, fold: 100 },  // Gray
    'K5s': { raise: 100, call: 0, fold: 0 },  // Green
    'K5o': { raise: 0, call: 0, fold: 100 },  // Gray
    'K4s': { raise: 100, call: 0, fold: 0 },  // Green
    'K4o': { raise: 0, call: 0, fold: 100 },  // Gray
    'K3s': { raise: 100, call: 0, fold: 0 },  // Green
    'K3o': { raise: 0, call: 0, fold: 100 },  // Gray
    'K2s': { raise: 100, call: 0, fold: 0 },  // Green
    'K2o': { raise: 0, call: 0, fold: 100 },  // Gray
    
    // Queen hands
    'QJs': { raise: 100, call: 0, fold: 0 },  // Green
    'QJo': { raise: 100, call: 0, fold: 0 },  // Green
    'QTs': { raise: 100, call: 0, fold: 0 },  // Green
    'QTo': { raise: 100, call: 0, fold: 0 },  // Green
    'Q9s': { raise: 100, call: 0, fold: 0 },  // Green
    'Q9o': { raise: 100, call: 0, fold: 0 },  // Green
    'Q8s': { raise: 100, call: 0, fold: 0 },  // Green
    'Q8o': { raise: 50, call: 0, fold: 50 },  // Yellow
    'Q7s': { raise: 100, call: 0, fold: 0 },  // Green
    'Q7o': { raise: 50, call: 0, fold: 50 },  // Yellow
    'Q6s': { raise: 100, call: 0, fold: 0 },  // Green
    'Q6o': { raise: 0, call: 0, fold: 100 },  // Gray
    'Q5s': { raise: 100, call: 0, fold: 0 },  // Green
    'Q5o': { raise: 0, call: 0, fold: 100 },  // Gray
    'Q4s': { raise: 100, call: 0, fold: 0 },  // Green
    'Q4o': { raise: 0, call: 0, fold: 100 },  // Gray
    'Q3s': { raise: 100, call: 0, fold: 0 },  // Green
    'Q3o': { raise: 0, call: 0, fold: 100 },  // Gray
    'Q2s': { raise: 100, call: 0, fold: 0 },  // Green
    'Q2o': { raise: 0, call: 0, fold: 100 },  // Gray
    
    // Jack hands
    'JTs': { raise: 100, call: 0, fold: 0 },  // Green
    'JTo': { raise: 100, call: 0, fold: 0 },  // Green
    'J9s': { raise: 100, call: 0, fold: 0 },  // Green
    'J9o': { raise: 100, call: 0, fold: 0 },  // Green
    'J8s': { raise: 100, call: 0, fold: 0 },  // Green
    'J8o': { raise: 100, call: 0, fold: 0 },  // Green
    'J7s': { raise: 100, call: 0, fold: 0 },  // Green
    'J7o': { raise: 50, call: 0, fold: 50 },  // Yellow
    'J6s': { raise: 100, call: 0, fold: 0 },  // Green
    'J6o': { raise: 0, call: 0, fold: 100 },  // Gray
    'J5s': { raise: 100, call: 0, fold: 0 },  // Green
    'J5o': { raise: 0, call: 0, fold: 100 },  // Gray
    'J4s': { raise: 100, call: 0, fold: 0 },  // Green
    'J4o': { raise: 0, call: 0, fold: 100 },  // Gray
    'J3s': { raise: 50, call: 0, fold: 50 },  // Yellow
    'J3o': { raise: 0, call: 0, fold: 100 },  // Gray
    'J2s': { raise: 50, call: 0, fold: 50 },  // Yellow
    'J2o': { raise: 0, call: 0, fold: 100 },  // Gray
    
    // Ten hands
    'T9s': { raise: 100, call: 0, fold: 0 },  // Green
    'T9o': { raise: 100, call: 0, fold: 0 },  // Green
    'T8s': { raise: 100, call: 0, fold: 0 },  // Green
    'T8o': { raise: 100, call: 0, fold: 0 },  // Green
    'T7s': { raise: 100, call: 0, fold: 0 },  // Green
    'T7o': { raise: 50, call: 0, fold: 50 },  // Yellow
    'T6s': { raise: 100, call: 0, fold: 0 },  // Green
    'T6o': { raise: 0, call: 0, fold: 100 },  // Gray
    'T5s': { raise: 50, call: 0, fold: 50 },  // Yellow
    'T5o': { raise: 0, call: 0, fold: 100 },  // Gray
    'T4s': { raise: 50, call: 0, fold: 50 },  // Yellow
    'T4o': { raise: 0, call: 0, fold: 100 },  // Gray
    'T3s': { raise: 50, call: 0, fold: 50 },  // Yellow
    'T3o': { raise: 0, call: 0, fold: 100 },  // Gray
    'T2s': { raise: 0, call: 0, fold: 100 },  // Gray
    'T2o': { raise: 0, call: 0, fold: 100 },  // Gray
    
    // Nine hands
    '98s': { raise: 100, call: 0, fold: 0 },  // Green
    '98o': { raise: 100, call: 0, fold: 0 },  // Green
    '97s': { raise: 100, call: 0, fold: 0 },  // Green
    '97o': { raise: 50, call: 0, fold: 50 },  // Yellow
    '96s': { raise: 100, call: 0, fold: 0 },  // Green
    '96o': { raise: 0, call: 0, fold: 100 },  // Gray
    '95s': { raise: 50, call: 0, fold: 50 },  // Yellow
    '95o': { raise: 0, call: 0, fold: 100 },  // Gray
    '94s': { raise: 50, call: 0, fold: 50 },  // Yellow
    '94o': { raise: 0, call: 0, fold: 100 },  // Gray
    '93s': { raise: 50, call: 0, fold: 50 },  // Yellow
    '93o': { raise: 0, call: 0, fold: 100 },  // Gray
    '92s': { raise: 0, call: 0, fold: 100 },  // Gray
    '92o': { raise: 0, call: 0, fold: 100 },  // Gray
    
    // Eight hands
    '87s': { raise: 100, call: 0, fold: 0 },  // Green
    '87o': { raise: 50, call: 0, fold: 50 },  // Yellow
    '86s': { raise: 100, call: 0, fold: 0 },  // Green
    '86o': { raise: 50, call: 0, fold: 50 },  // Yellow
    '85s': { raise: 50, call: 0, fold: 50 },  // Yellow
    '85o': { raise: 0, call: 0, fold: 100 },  // Gray
    '84s': { raise: 50, call: 0, fold: 50 },  // Yellow
    '84o': { raise: 0, call: 0, fold: 100 },  // Gray
    '83s': { raise: 50, call: 0, fold: 50 },  // Yellow
    '83o': { raise: 0, call: 0, fold: 100 },  // Gray
    '82s': { raise: 0, call: 0, fold: 100 },  // Gray
    '82o': { raise: 0, call: 0, fold: 100 },  // Gray
    
    // Seven hands
    '76s': { raise: 100, call: 0, fold: 0 },  // Green
    '76o': { raise: 50, call: 0, fold: 50 },  // Yellow
    '75s': { raise: 100, call: 0, fold: 0 },  // Green
    '75o': { raise: 0, call: 0, fold: 100 },  // Gray
    '74s': { raise: 100, call: 0, fold: 0 },  // Green
    '74o': { raise: 0, call: 0, fold: 100 },  // Gray
    '73s': { raise: 50, call: 0, fold: 50 },  // Yellow
    '73o': { raise: 0, call: 0, fold: 100 },  // Gray
    '72s': { raise: 0, call: 0, fold: 100 },  // Gray
    '72o': { raise: 0, call: 0, fold: 100 },  // Gray
    
    // Six hands
    '65s': { raise: 100, call: 0, fold: 0 },  // Green
    '65o': { raise: 0, call: 0, fold: 100 },  // Gray
    '64s': { raise: 100, call: 0, fold: 0 },  // Green
    '64o': { raise: 0, call: 0, fold: 100 },  // Gray
    '63s': { raise: 100, call: 0, fold: 0 },  // Green
    '63o': { raise: 0, call: 0, fold: 100 },  // Gray
    '62s': { raise: 50, call: 0, fold: 50 },  // Yellow
    '62o': { raise: 0, call: 0, fold: 100 },  // Gray
    
    // Five hands
    '54s': { raise: 100, call: 0, fold: 0 },  // Green
    '54o': { raise: 0, call: 0, fold: 100 },  // Gray
    '53s': { raise: 100, call: 0, fold: 0 },  // Green
    '53o': { raise: 0, call: 0, fold: 100 },  // Gray
    '52s': { raise: 50, call: 0, fold: 50 },  // Yellow
    '52o': { raise: 0, call: 0, fold: 100 },  // Gray
    
    // Four hands
    '43s': { raise: 100, call: 0, fold: 0 },  // Green
    '43o': { raise: 0, call: 0, fold: 100 },  // Gray
    '42s': { raise: 50, call: 0, fold: 50 },  // Yellow
    '42o': { raise: 0, call: 0, fold: 100 },  // Gray
    
    // Three-two hands
    '32s': { raise: 100, call: 0, fold: 0 },  // Green
    '32o': { raise: 0, call: 0, fold: 100 }   // Gray
  }
}; 