import { RangeData } from '../../types';

// BB (Big Blind) RFI Range - 0% (all fold)
export const BB_RFI: RangeData = {
  positionCombo: 'BB_RFI',
  hands: {
    // Premium pairs - 100% fold (gray)
    'AA': { raise: 0, call: 0, fold: 100 },
    'KK': { raise: 0, call: 0, fold: 100 },
    'QQ': { raise: 0, call: 0, fold: 100 },
    'JJ': { raise: 0, call: 0, fold: 100 },
    'TT': { raise: 0, call: 0, fold: 100 },
    '99': { raise: 0, call: 0, fold: 100 },
    '88': { raise: 0, call: 0, fold: 100 },
    '77': { raise: 0, call: 0, fold: 100 },
    '66': { raise: 0, call: 0, fold: 100 },
    '55': { raise: 0, call: 0, fold: 100 },
    '44': { raise: 0, call: 0, fold: 100 },
    '33': { raise: 0, call: 0, fold: 100 },
    '22': { raise: 0, call: 0, fold: 100 },
    
    // Ace hands
    'AKs': { raise: 0, call: 0, fold: 100 },  // Gray
    'AKo': { raise: 0, call: 0, fold: 100 },  // Gray
    'AQs': { raise: 0, call: 0, fold: 100 },  // Gray
    'AQo': { raise: 0, call: 0, fold: 100 },  // Gray
    'AJs': { raise: 0, call: 0, fold: 100 },  // Gray
    'AJo': { raise: 0, call: 0, fold: 100 },  // Gray
    'ATs': { raise: 0, call: 0, fold: 100 },  // Gray
    'ATo': { raise: 0, call: 0, fold: 100 },  // Gray
    'A9s': { raise: 0, call: 0, fold: 100 },  // Gray
    'A9o': { raise: 0, call: 0, fold: 100 },  // Gray
    'A8s': { raise: 0, call: 0, fold: 100 },  // Gray
    'A8o': { raise: 0, call: 0, fold: 100 },  // Gray
    'A7s': { raise: 0, call: 0, fold: 100 },  // Gray
    'A7o': { raise: 0, call: 0, fold: 100 },  // Gray
    'A6s': { raise: 0, call: 0, fold: 100 },  // Gray
    'A6o': { raise: 0, call: 0, fold: 100 },  // Gray
    'A5s': { raise: 0, call: 0, fold: 100 },  // Gray
    'A5o': { raise: 0, call: 0, fold: 100 },  // Gray
    'A4s': { raise: 0, call: 0, fold: 100 },  // Gray
    'A4o': { raise: 0, call: 0, fold: 100 },  // Gray
    'A3s': { raise: 0, call: 0, fold: 100 },  // Gray
    'A3o': { raise: 0, call: 0, fold: 100 },  // Gray
    'A2s': { raise: 0, call: 0, fold: 100 },  // Gray
    'A2o': { raise: 0, call: 0, fold: 100 },  // Gray
    
    // King hands
    'KQs': { raise: 0, call: 0, fold: 100 },  // Gray
    'KQo': { raise: 0, call: 0, fold: 100 },  // Gray
    'KJs': { raise: 0, call: 0, fold: 100 },  // Gray
    'KJo': { raise: 0, call: 0, fold: 100 },  // Gray
    'KTs': { raise: 0, call: 0, fold: 100 },  // Gray
    'KTo': { raise: 0, call: 0, fold: 100 },  // Gray
    'K9s': { raise: 0, call: 0, fold: 100 },  // Gray
    'K9o': { raise: 0, call: 0, fold: 100 },  // Gray
    'K8s': { raise: 0, call: 0, fold: 100 },  // Gray
    'K8o': { raise: 0, call: 0, fold: 100 },  // Gray
    'K7s': { raise: 0, call: 0, fold: 100 },  // Gray
    'K7o': { raise: 0, call: 0, fold: 100 },  // Gray
    'K6s': { raise: 0, call: 0, fold: 100 },  // Gray
    'K6o': { raise: 0, call: 0, fold: 100 },  // Gray
    'K5s': { raise: 0, call: 0, fold: 100 },  // Gray
    'K5o': { raise: 0, call: 0, fold: 100 },  // Gray
    'K4s': { raise: 0, call: 0, fold: 100 },  // Gray
    'K4o': { raise: 0, call: 0, fold: 100 },  // Gray
    'K3s': { raise: 0, call: 0, fold: 100 },  // Gray
    'K3o': { raise: 0, call: 0, fold: 100 },  // Gray
    'K2s': { raise: 0, call: 0, fold: 100 },  // Gray
    'K2o': { raise: 0, call: 0, fold: 100 },  // Gray
    
    // Queen hands
    'QJs': { raise: 0, call: 0, fold: 100 },  // Gray
    'QJo': { raise: 0, call: 0, fold: 100 },  // Gray
    'QTs': { raise: 0, call: 0, fold: 100 },  // Gray
    'QTo': { raise: 0, call: 0, fold: 100 },  // Gray
    'Q9s': { raise: 0, call: 0, fold: 100 },  // Gray
    'Q9o': { raise: 0, call: 0, fold: 100 },  // Gray
    'Q8s': { raise: 0, call: 0, fold: 100 },  // Gray
    'Q8o': { raise: 0, call: 0, fold: 100 },  // Gray
    'Q7s': { raise: 0, call: 0, fold: 100 },  // Gray
    'Q7o': { raise: 0, call: 0, fold: 100 },  // Gray
    'Q6s': { raise: 0, call: 0, fold: 100 },  // Gray
    'Q6o': { raise: 0, call: 0, fold: 100 },  // Gray
    'Q5s': { raise: 0, call: 0, fold: 100 },  // Gray
    'Q5o': { raise: 0, call: 0, fold: 100 },  // Gray
    'Q4s': { raise: 0, call: 0, fold: 100 },  // Gray
    'Q4o': { raise: 0, call: 0, fold: 100 },  // Gray
    'Q3s': { raise: 0, call: 0, fold: 100 },  // Gray
    'Q3o': { raise: 0, call: 0, fold: 100 },  // Gray
    'Q2s': { raise: 0, call: 0, fold: 100 },  // Gray
    'Q2o': { raise: 0, call: 0, fold: 100 },  // Gray
    
    // Jack hands
    'JTs': { raise: 0, call: 0, fold: 100 },  // Gray
    'JTo': { raise: 0, call: 0, fold: 100 },  // Gray
    'J9s': { raise: 0, call: 0, fold: 100 },  // Gray
    'J9o': { raise: 0, call: 0, fold: 100 },  // Gray
    'J8s': { raise: 0, call: 0, fold: 100 },  // Gray
    'J8o': { raise: 0, call: 0, fold: 100 },  // Gray
    'J7s': { raise: 0, call: 0, fold: 100 },  // Gray
    'J7o': { raise: 0, call: 0, fold: 100 },  // Gray
    'J6s': { raise: 0, call: 0, fold: 100 },  // Gray
    'J6o': { raise: 0, call: 0, fold: 100 },  // Gray
    'J5s': { raise: 0, call: 0, fold: 100 },  // Gray
    'J5o': { raise: 0, call: 0, fold: 100 },  // Gray
    'J4s': { raise: 0, call: 0, fold: 100 },  // Gray
    'J4o': { raise: 0, call: 0, fold: 100 },  // Gray
    'J3s': { raise: 0, call: 0, fold: 100 },  // Gray
    'J3o': { raise: 0, call: 0, fold: 100 },  // Gray
    'J2s': { raise: 0, call: 0, fold: 100 },  // Gray
    'J2o': { raise: 0, call: 0, fold: 100 },  // Gray
    
    // Ten hands
    'T9s': { raise: 0, call: 0, fold: 100 },  // Gray
    'T9o': { raise: 0, call: 0, fold: 100 },  // Gray
    'T8s': { raise: 0, call: 0, fold: 100 },  // Gray
    'T8o': { raise: 0, call: 0, fold: 100 },  // Gray
    'T7s': { raise: 0, call: 0, fold: 100 },  // Gray
    'T7o': { raise: 0, call: 0, fold: 100 },  // Gray
    'T6s': { raise: 0, call: 0, fold: 100 },  // Gray
    'T6o': { raise: 0, call: 0, fold: 100 },  // Gray
    'T5s': { raise: 0, call: 0, fold: 100 },  // Gray
    'T5o': { raise: 0, call: 0, fold: 100 },  // Gray
    'T4s': { raise: 0, call: 0, fold: 100 },  // Gray
    'T4o': { raise: 0, call: 0, fold: 100 },  // Gray
    'T3s': { raise: 0, call: 0, fold: 100 },  // Gray
    'T3o': { raise: 0, call: 0, fold: 100 },  // Gray
    'T2s': { raise: 0, call: 0, fold: 100 },  // Gray
    'T2o': { raise: 0, call: 0, fold: 100 },  // Gray
    
    // Nine hands
    '98s': { raise: 0, call: 0, fold: 100 },  // Gray
    '98o': { raise: 0, call: 0, fold: 100 },  // Gray
    '97s': { raise: 0, call: 0, fold: 100 },  // Gray
    '97o': { raise: 0, call: 0, fold: 100 },  // Gray
    '96s': { raise: 0, call: 0, fold: 100 },  // Gray
    '96o': { raise: 0, call: 0, fold: 100 },  // Gray
    '95s': { raise: 0, call: 0, fold: 100 },  // Gray
    '95o': { raise: 0, call: 0, fold: 100 },  // Gray
    '94s': { raise: 0, call: 0, fold: 100 },  // Gray
    '94o': { raise: 0, call: 0, fold: 100 },  // Gray
    '93s': { raise: 0, call: 0, fold: 100 },  // Gray
    '93o': { raise: 0, call: 0, fold: 100 },  // Gray
    '92s': { raise: 0, call: 0, fold: 100 },  // Gray
    '92o': { raise: 0, call: 0, fold: 100 },  // Gray
    
    // Eight hands
    '87s': { raise: 0, call: 0, fold: 100 },  // Gray
    '87o': { raise: 0, call: 0, fold: 100 },  // Gray
    '86s': { raise: 0, call: 0, fold: 100 },  // Gray
    '86o': { raise: 0, call: 0, fold: 100 },  // Gray
    '85s': { raise: 0, call: 0, fold: 100 },  // Gray
    '85o': { raise: 0, call: 0, fold: 100 },  // Gray
    '84s': { raise: 0, call: 0, fold: 100 },  // Gray
    '84o': { raise: 0, call: 0, fold: 100 },  // Gray
    '83s': { raise: 0, call: 0, fold: 100 },  // Gray
    '83o': { raise: 0, call: 0, fold: 100 },  // Gray
    '82s': { raise: 0, call: 0, fold: 100 },  // Gray
    '82o': { raise: 0, call: 0, fold: 100 },  // Gray
    
    // Seven hands
    '76s': { raise: 0, call: 0, fold: 100 },  // Gray
    '76o': { raise: 0, call: 0, fold: 100 },  // Gray
    '75s': { raise: 0, call: 0, fold: 100 },  // Gray
    '75o': { raise: 0, call: 0, fold: 100 },  // Gray
    '74s': { raise: 0, call: 0, fold: 100 },  // Gray
    '74o': { raise: 0, call: 0, fold: 100 },  // Gray
    '73s': { raise: 0, call: 0, fold: 100 },  // Gray
    '73o': { raise: 0, call: 0, fold: 100 },  // Gray
    '72s': { raise: 0, call: 0, fold: 100 },  // Gray
    '72o': { raise: 0, call: 0, fold: 100 },  // Gray
    
    // Six hands
    '65s': { raise: 0, call: 0, fold: 100 },  // Gray
    '65o': { raise: 0, call: 0, fold: 100 },  // Gray
    '64s': { raise: 0, call: 0, fold: 100 },  // Gray
    '64o': { raise: 0, call: 0, fold: 100 },  // Gray
    '63s': { raise: 0, call: 0, fold: 100 },  // Gray
    '63o': { raise: 0, call: 0, fold: 100 },  // Gray
    '62s': { raise: 0, call: 0, fold: 100 },  // Gray
    '62o': { raise: 0, call: 0, fold: 100 },  // Gray
    
    // Five hands
    '54s': { raise: 0, call: 0, fold: 100 },  // Gray
    '54o': { raise: 0, call: 0, fold: 100 },  // Gray
    '53s': { raise: 0, call: 0, fold: 100 },  // Gray
    '53o': { raise: 0, call: 0, fold: 100 },  // Gray
    '52s': { raise: 0, call: 0, fold: 100 },  // Gray
    '52o': { raise: 0, call: 0, fold: 100 },  // Gray
    
    // Four hands
    '43s': { raise: 0, call: 0, fold: 100 },  // Gray
    '43o': { raise: 0, call: 0, fold: 100 },  // Gray
    '42s': { raise: 0, call: 0, fold: 100 },  // Gray
    '42o': { raise: 0, call: 0, fold: 100 },  // Gray
    
    // Three-two hands
    '32s': { raise: 0, call: 0, fold: 100 },  // Gray
    '32o': { raise: 0, call: 0, fold: 100 }   // Gray
  }
}; 