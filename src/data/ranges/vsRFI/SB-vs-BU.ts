/**
 * Small Blind vs Button RFI Range
 * 
 * This range represents the Small Blind's optimal response when the Button raises first in.
 * Range is optimized vs 2.5x BB sizing from Button
 * 
 * 3-bet hands: Value hands and bluff combinations to avoid playing out of position
 * Call hands: Strong hands that can handle being out of position
 * 
 * Strategic notes:
 * - Wider defense than vs UTG but tighter than BB vs BU due to position
 * - 3-bet to take control and avoid difficult postflop spots
 * - Call with hands that have good raw strength or implied odds
 * - Still fold more than BB would due to positional disadvantage
 */

import { RangeData } from '../../../types';

const range: RangeData = {
  positionCombo: 'SB_vs_BU_RFI',
  missingHandTreatment: 'fold',
  hands: {
    // Premium hands - 100% 3-bet
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
    'ATo': { raise: 100, call: 0, fold: 0 },
    'KQs': { raise: 100, call: 0, fold: 0 },
    'KQo': { raise: 100, call: 0, fold: 0 },
    'KJs': { raise: 100, call: 0, fold: 0 },
    'KTs': { raise: 100, call: 0, fold: 0 },
    'K9s': { raise: 100, call: 0, fold: 0 },
    'QTs': { raise: 100, call: 0, fold: 0 },
    'QJs': { raise: 100, call: 0, fold: 0 },
    'JTs': { raise: 100, call: 0, fold: 0 },
    'J9s': { raise: 100, call: 0, fold: 0 },
    'T9s': { raise: 100, call: 0, fold: 0 },
    'T8s': { raise: 100, call: 0, fold: 0 },
    'A9s': { raise: 100, call: 0, fold: 0 },
    'A8s': { raise: 100, call: 0, fold: 0 },
    'A5s': { raise: 100, call: 0, fold: 0 },
    '99': { raise: 100, call: 0, fold: 0 },
    '88': { raise: 100, call: 0, fold: 0 },
    '77': { raise: 100, call: 0, fold: 0 },
    '66': { raise: 100, call: 0, fold: 0 },
    
    // Mixed frequency hands
    '55': { raise: 50, call: 0, fold: 50 },
    'A7s': { raise: 50, call: 0, fold: 50 },
    'A4s': { raise: 50, call: 0, fold: 50 },
    'KJo': { raise: 50, call: 0, fold: 50 },
    'KTo': { raise: 50, call: 0, fold: 50 },
    'K8s': { raise: 25, call: 0, fold: 75 },
    'Q9s': { raise: 25, call: 0, fold: 75 },
    '98s': { raise: 25, call: 0, fold: 75 },
    'A6s': { raise: 25, call: 0, fold: 75 },
    
    // Pure folds
    'QJo': { raise: 0, call: 0, fold: 100 },
    'JTo': { raise: 0, call: 0, fold: 100 },
    'T9o': { raise: 0, call: 0, fold: 100 },
    '87s': { raise: 0, call: 0, fold: 100 },
    'A9o': { raise: 0, call: 0, fold: 100 }
  }
};

export default range;
