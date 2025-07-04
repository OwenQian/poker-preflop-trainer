/**
 * Small Blind vs Lojack RFI Range
 * 
 * This range represents the Small Blind's optimal response when the Lojack raises first in.
 * Range is optimized vs 2.25x BB sizing from Lojack
 * 
 * 3-bet hands: Value hands and bluff combinations to avoid playing out of position
 * Call hands: Strong hands that can handle being out of position
 * 
 * Strategic notes:
 * - Tighter defense than vs Button due to stronger LJ opening range
 * - 3-bet to take control and avoid difficult postflop spots
 * - Call with hands that have good raw strength or implied odds
 * - Many mixed frequency hands due to close decision points
 */

import { RangeData } from '../../../types';

const range: RangeData = {
  positionCombo: 'SB_vs_LJ_RFI',
  missingHandTreatment: 'fold',
  hands: {
    // Premium hands - high 3-bet frequency
    'AA': { raise: 100, call: 0, fold: 0 },
    'KK': { raise: 100, call: 0, fold: 0 },
    'AKs': { raise: 100, call: 0, fold: 0 },
    'A5s': { raise: 75, call: 0, fold: 25 },
    'A4s': { raise: 75, call: 0, fold: 25 },
    'AKo': { raise: 75, call: 25, fold: 0 },
    'QQ': { raise: 75, call: 25, fold: 0 },
    'AQs': { raise: 75, call: 25, fold: 0 },
    'KQs': { raise: 75, call: 25, fold: 0 },
    'QJs': { raise: 75, call: 25, fold: 0 },
    
    // Mixed frequency hands - moderate 3-bet/call
    'JJ': { raise: 50, call: 50, fold: 0 },
    'ATs': { raise: 50, call: 50, fold: 0 },
    'AQo': { raise: 50, call: 50, fold: 0 },
    'KTs': { raise: 50, call: 50, fold: 0 },
    'KJs': { raise: 50, call: 50, fold: 0 },
    'QTs': { raise: 50, call: 50, fold: 0 },
    'JTs': { raise: 50, call: 50, fold: 0 },
    
    // Lower frequency 3-bets
    'TT': { raise: 25, call: 75, fold: 0 },
    '99': { raise: 25, call: 75, fold: 0 },
    '88': { raise: 25, call: 75, fold: 0 },
    '77': { raise: 25, call: 75, fold: 0 },
    '66': { raise: 25, call: 75, fold: 0 },
    '55': { raise: 25, call: 50, fold: 25 },
    'AJs': { raise: 25, call: 75, fold: 0 },
    'A9s': { raise: 25, call: 50, fold: 25 },
    'K9s': { raise: 25, call: 0, fold: 75 },
    'T9s': { raise: 25, call: 25, fold: 50 },
    '65s': { raise: 25, call: 25, fold: 50 },
    '54s': { raise: 25, call: 25, fold: 50 },
    'KQo': { raise: 25, call: 0, fold: 75 },
    
    // Speculative calls
    '22': { raise: 0, call: 50, fold: 50 },
    '33': { raise: 0, call: 50, fold: 50 },
    '44': { raise: 0, call: 50, fold: 50 },
    'A8s': { raise: 0, call: 25, fold: 75 },
    '98s': { raise: 0, call: 25, fold: 75 },
    '76s': { raise: 0, call: 25, fold: 75 },
    
    // Pure folds
    'QJo': { raise: 0, call: 0, fold: 100 },
    'JTo': { raise: 0, call: 0, fold: 100 },
    'T9o': { raise: 0, call: 0, fold: 100 },
    '87s': { raise: 0, call: 0, fold: 100 },
    'A7s': { raise: 0, call: 0, fold: 100 },
    'A9o': { raise: 0, call: 0, fold: 100 },
    'ATo': { raise: 0, call: 0, fold: 100 },
    'AJo': { raise: 0, call: 0, fold: 100 },
    'KJo': { raise: 0, call: 0, fold: 100 },
    'KTo': { raise: 0, call: 0, fold: 100 },
    'K8s': { raise: 0, call: 0, fold: 100 },
    'Q9s': { raise: 0, call: 0, fold: 100 },
    'J9s': { raise: 0, call: 0, fold: 100 },
    'T8s': { raise: 0, call: 0, fold: 100 },
    'A6s': { raise: 0, call: 0, fold: 100 }
  }
};

export default range;
