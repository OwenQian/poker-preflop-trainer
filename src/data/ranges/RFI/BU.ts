/**
 * BU (Button) RFI Range
 * 
 * This is the Raise First In range for the BU position (button - best position).
 * BU should play a very loose range of approximately 40-45% of hands.
 * 
 * Source: Consolidated from zenith ranges
 */

import { RangeData } from '../../../types';

const BU_RFI: RangeData = {
  positionCombo: 'BU_RFI',
  hands: {
    // Premium pairs - 100% raise (dark red)
    'AA': { raise: 100, call: 0, fold: 0 },
    'KK': { raise: 100, call: 0, fold: 0 },
    'QQ': { raise: 100, call: 0, fold: 0 },
    'JJ': { raise: 100, call: 0, fold: 0 },
    'TT': { raise: 100, call: 0, fold: 0 },
    '99': { raise: 100, call: 0, fold: 0 },
    '88': { raise: 100, call: 0, fold: 0 },
    '77': { raise: 100, call: 0, fold: 0 },
    '66': { raise: 100, call: 0, fold: 0 },  // Light red
    '55': { raise: 100, call: 0, fold: 0 },  // Light red
    '44': { raise: 100, call: 0, fold: 0 },
    '33': { raise: 100, call: 0, fold: 0 },
    '22': { raise: 100, call: 0, fold: 0 },
    
    // Ace hands
    'AKs': { raise: 100, call: 0, fold: 0 },  // Dark red
    'AKo': { raise: 100, call: 0, fold: 0 },  // Dark red
    'AQs': { raise: 100, call: 0, fold: 0 },  // Light red
    'AQo': { raise: 100, call: 0, fold: 0 },  // Light red
    'AJs': { raise: 100, call: 0, fold: 0 },  // Light red
    'AJo': { raise: 100, call: 0, fold: 0 },  // Light red
    'ATs': { raise: 100, call: 0, fold: 0 },  // Light red
    'ATo': { raise: 100, call: 0, fold: 0 },  // Light red
    'A9s': { raise: 100, call: 0, fold: 0 },
    'A9o': { raise: 100, call: 0, fold: 0 },
    'A8s': { raise: 100, call: 0, fold: 0 },
    'A8o': { raise: 100, call: 0, fold: 0 },
    'A7s': { raise: 100, call: 0, fold: 0 },
    'A7o': { raise: 100, call: 0, fold: 0 },
    'A6s': { raise: 100, call: 0, fold: 0 },
    'A6o': { raise: 100, call: 0, fold: 0 },
    'A5s': { raise: 100, call: 0, fold: 0 },
    'A5o': { raise: 100, call: 0, fold: 0 },
    'A4s': { raise: 100, call: 0, fold: 0 },
    'A4o': { raise: 100, call: 0, fold: 0 },
    'A3s': { raise: 100, call: 0, fold: 0 },
    'A3o': { raise: 100, call: 0, fold: 0 },
    'A2s': { raise: 100, call: 0, fold: 0 },
    'A2o': { raise: 50, call: 0, fold: 50 },
    
    // King hands
    'KQs': { raise: 100, call: 0, fold: 0 },  // Light red
    'KQo': { raise: 100, call: 0, fold: 0 },  // Light red
    'KJs': { raise: 100, call: 0, fold: 0 },
    'KJo': { raise: 100, call: 0, fold: 0 },  // Light red
    'KTs': { raise: 100, call: 0, fold: 0 },
    'KTo': { raise: 100, call: 0, fold: 0 },
    'K9s': { raise: 100, call: 0, fold: 0 },
    'K9o': { raise: 100, call: 0, fold: 0 },
    'K8s': { raise: 100, call: 0, fold: 0 },
    'K8o': { raise: 50, call: 0, fold: 50 },
    'K7s': { raise: 100, call: 0, fold: 0 },
    'K7o': { raise: 0, call: 0, fold: 100 },
    'K6s': { raise: 100, call: 0, fold: 0 },
    'K6o': { raise: 0, call: 0, fold: 100 },
    'K5s': { raise: 100, call: 0, fold: 0 },
    'K5o': { raise: 0, call: 0, fold: 100 },
    'K4s': { raise: 100, call: 0, fold: 0 },
    'K4o': { raise: 0, call: 0, fold: 100 },
    'K3s': { raise: 100, call: 0, fold: 0 },
    'K3o': { raise: 0, call: 0, fold: 100 },
    'K2s': { raise: 100, call: 0, fold: 0 },
    'K2o': { raise: 0, call: 0, fold: 100 },
    
    // Queen hands
    'QJs': { raise: 100, call: 0, fold: 0 },
    'QJo': { raise: 100, call: 0, fold: 0 },  // Light red
    'QTs': { raise: 100, call: 0, fold: 0 },
    'QTo': { raise: 100, call: 0, fold: 0 },
    'Q9s': { raise: 100, call: 0, fold: 0 },
    'Q9o': { raise: 100, call: 0, fold: 0 },
    'Q8s': { raise: 100, call: 0, fold: 0 },
    'Q8o': { raise: 0, call: 0, fold: 100 },
    'Q7s': { raise: 100, call: 0, fold: 0 },
    'Q7o': { raise: 0, call: 0, fold: 100 },
    'Q6s': { raise: 100, call: 0, fold: 0 },
    'Q6o': { raise: 0, call: 0, fold: 100 },
    'Q5s': { raise: 100, call: 0, fold: 0 },
    'Q5o': { raise: 0, call: 0, fold: 100 },
    'Q4s': { raise: 100, call: 0, fold: 0 },
    'Q4o': { raise: 0, call: 0, fold: 100 },
    'Q3s': { raise: 100, call: 0, fold: 0 },
    'Q3o': { raise: 0, call: 0, fold: 100 },
    'Q2s': { raise: 50, call: 0, fold: 50 },
    'Q2o': { raise: 0, call: 0, fold: 100 },
    
    // Jack hands
    'JTs': { raise: 100, call: 0, fold: 0 },  // Light red
    'JTo': { raise: 100, call: 0, fold: 0 },
    'J9s': { raise: 100, call: 0, fold: 0 },
    'J9o': { raise: 100, call: 0, fold: 0 },
    'J8s': { raise: 100, call: 0, fold: 0 },
    'J8o': { raise: 0, call: 0, fold: 100 },
    'J7s': { raise: 100, call: 0, fold: 0 },
    'J7o': { raise: 0, call: 0, fold: 100 },
    'J6s': { raise: 100, call: 0, fold: 0 },
    'J6o': { raise: 0, call: 0, fold: 100 },
    'J5s': { raise: 100, call: 0, fold: 0 },
    'J5o': { raise: 0, call: 0, fold: 100 },
    'J4s': { raise: 50, call: 0, fold: 50 },
    'J4o': { raise: 0, call: 0, fold: 100 },
    'J3s': { raise: 0, call: 0, fold: 100 },
    'J3o': { raise: 0, call: 0, fold: 100 },
    'J2s': { raise: 0, call: 0, fold: 100 },
    'J2o': { raise: 0, call: 0, fold: 100 },
    
    // Ten hands
    'T9s': { raise: 100, call: 0, fold: 0 },  // Light red
    'T9o': { raise: 100, call: 0, fold: 0 },
    'T8s': { raise: 100, call: 0, fold: 0 },
    'T8o': { raise: 50, call: 0, fold: 50 },
    'T7s': { raise: 100, call: 0, fold: 0 },
    'T7o': { raise: 0, call: 0, fold: 100 },
    'T6s': { raise: 100, call: 0, fold: 0 },
    'T6o': { raise: 0, call: 0, fold: 100 },
    'T5s': { raise: 100, call: 0, fold: 0 },
    'T5o': { raise: 0, call: 0, fold: 100 },
    'T4s': { raise: 100, call: 0, fold: 0 },
    'T4o': { raise: 0, call: 0, fold: 100 },
    'T3s': { raise: 0, call: 0, fold: 100 },
    'T3o': { raise: 0, call: 0, fold: 100 },
    'T2s': { raise: 0, call: 0, fold: 100 },
    'T2o': { raise: 0, call: 0, fold: 100 },
    
    // Nine hands
    '98s': { raise: 100, call: 0, fold: 0 },  // Light red
    '98o': { raise: 50, call: 0, fold: 50 },
    '97s': { raise: 100, call: 0, fold: 0 },
    '97o': { raise: 0, call: 0, fold: 100 },
    '96s': { raise: 100, call: 0, fold: 0 },
    '96o': { raise: 0, call: 0, fold: 100 },
    '95s': { raise: 100, call: 0, fold: 0 },
    '95o': { raise: 0, call: 0, fold: 100 },
    '94s': { raise: 0, call: 0, fold: 100 },
    '94o': { raise: 0, call: 0, fold: 100 },
    '93s': { raise: 0, call: 0, fold: 100 },
    '93o': { raise: 0, call: 0, fold: 100 },
    '92s': { raise: 0, call: 0, fold: 100 },
    '92o': { raise: 0, call: 0, fold: 100 },
    
    // Eight hands
    '87s': { raise: 100, call: 0, fold: 0 },
    '87o': { raise: 0, call: 0, fold: 100 },  // Light red
    '86s': { raise: 100, call: 0, fold: 0 },
    '86o': { raise: 0, call: 0, fold: 100 },
    '85s': { raise: 100, call: 0, fold: 0 },
    '85o': { raise: 0, call: 0, fold: 100 },
    '84s': { raise: 0, call: 0, fold: 100 },
    '84o': { raise: 0, call: 0, fold: 100 },
    '83s': { raise: 0, call: 0, fold: 100 },
    '83o': { raise: 0, call: 0, fold: 100 },
    '82s': { raise: 0, call: 0, fold: 100 },
    '82o': { raise: 0, call: 0, fold: 100 },
    
    // Seven hands
    '76s': { raise: 100, call: 0, fold: 0 },
    '76o': { raise: 0, call: 0, fold: 100 },
    '75s': { raise: 100, call: 0, fold: 0 },
    '75o': { raise: 0, call: 0, fold: 100 },
    '74s': { raise: 0, call: 0, fold: 100 },
    '74o': { raise: 0, call: 0, fold: 100 },
    '73s': { raise: 0, call: 0, fold: 100 },
    '73o': { raise: 0, call: 0, fold: 100 },
    '72s': { raise: 0, call: 0, fold: 100 },
    '72o': { raise: 0, call: 0, fold: 100 },
    
    // Six hands
    '65s': { raise: 100, call: 0, fold: 0 },
    '65o': { raise: 0, call: 0, fold: 100 },
    '64s': { raise: 100, call: 0, fold: 0 },
    '64o': { raise: 0, call: 0, fold: 100 },
    '63s': { raise: 0, call: 0, fold: 100 },
    '63o': { raise: 0, call: 0, fold: 100 },
    '62s': { raise: 0, call: 0, fold: 100 },
    '62o': { raise: 0, call: 0, fold: 100 },
    
    // Five hands
    '54s': { raise: 100, call: 0, fold: 0 },
    '54o': { raise: 0, call: 0, fold: 100 },
    '53s': { raise: 100, call: 0, fold: 0 },
    '53o': { raise: 0, call: 0, fold: 100 },
    '52s': { raise: 0, call: 0, fold: 100 },
    '52o': { raise: 0, call: 0, fold: 100 },
    
    // Four hands
    '43s': { raise: 50, call: 0, fold: 50 },
    '43o': { raise: 0, call: 0, fold: 100 },
    '42s': { raise: 0, call: 0, fold: 100 },
    '42o': { raise: 0, call: 0, fold: 100 },
    
    // Three-two hands
    '32s': { raise: 0, call: 0, fold: 100 },
    '32o': { raise: 0, call: 0, fold: 100 }
  }
};

export default BU_RFI;