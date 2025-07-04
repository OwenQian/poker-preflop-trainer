/**
 * Small Blind vs Cutoff RFI Range
 * 
 * This range represents the Small Blind's optimal response when the Cutoff raises first in.
 * Range is optimized vs CO 2.5bb sizing
 * 
 * 3-bet hands: Value hands and bluff combinations to avoid playing out of position
 * Call hands: Strong hands that can handle being out of position
 * 
 * Strategic notes:
 * - Moderate defense frequency vs CO's wide opening range
 * - 3-bet to take control and avoid difficult postflop spots
 * - Mix of pure 3-bets and mixed frequency hands
 * - Many pure folds due to positional disadvantage
 */

import { RangeData } from '../../../types';

const range: RangeData = {
  positionCombo: 'SB_vs_CO_RFI',
  missingHandTreatment: 'fold',
  hands: {
    // Premium hands - 100% 3-bet
    'AA': { raise: 100, call: 0, fold: 0 },
    'KK': { raise: 100, call: 0, fold: 0 },
    'QQ': { raise: 100, call: 0, fold: 0 },
    'JJ': { raise: 100, call: 0, fold: 0 },
    'TT': { raise: 100, call: 0, fold: 0 },
    '99': { raise: 100, call: 0, fold: 0 },
    '88': { raise: 100, call: 0, fold: 0 },
    '77': { raise: 100, call: 0, fold: 0 },
    '66': { raise: 100, call: 0, fold: 0 },
    'AKs': { raise: 100, call: 0, fold: 0 },
    'AKo': { raise: 100, call: 0, fold: 0 },
    'AQs': { raise: 100, call: 0, fold: 0 },
    'AQo': { raise: 100, call: 0, fold: 0 },
    'AJs': { raise: 100, call: 0, fold: 0 },
    'ATs': { raise: 100, call: 0, fold: 0 },
    'A9s': { raise: 100, call: 0, fold: 0 },
    'A5s': { raise: 100, call: 0, fold: 0 },
    'KQs': { raise: 100, call: 0, fold: 0 },
    'KQo': { raise: 100, call: 0, fold: 0 },
    'KJs': { raise: 100, call: 0, fold: 0 },
    'KTs': { raise: 100, call: 0, fold: 0 },
    'QJs': { raise: 100, call: 0, fold: 0 },
    'QTs': { raise: 100, call: 0, fold: 0 },
    'JTs': { raise: 100, call: 0, fold: 0 },
    
    // High frequency 3-bets
    'A4s': { raise: 75, call: 0, fold: 25 },
    'AJo': { raise: 75, call: 0, fold: 25 },
    
    // Mixed frequency hands
    'T9s': { raise: 50, call: 0, fold: 50 },
    'K9s': { raise: 25, call: 0, fold: 75 },
    'KJo': { raise: 25, call: 0, fold: 75 },
    'J9s': { raise: 25, call: 0, fold: 75 },
    '55': { raise: 25, call: 25, fold: 50 },
    
    // Pure folds
    'QJo': { raise: 0, call: 0, fold: 100 },
    'JTo': { raise: 0, call: 0, fold: 100 },
    'T9o': { raise: 0, call: 0, fold: 100 },
    '87s': { raise: 0, call: 0, fold: 100 },
    'A8s': { raise: 0, call: 0, fold: 100 },
    'A7s': { raise: 0, call: 0, fold: 100 },
    'A9o': { raise: 0, call: 0, fold: 100 },
    'ATo': { raise: 0, call: 0, fold: 100 },
    'KTo': { raise: 0, call: 0, fold: 100 },
    'K8s': { raise: 0, call: 0, fold: 100 },
    'Q9s': { raise: 0, call: 0, fold: 100 },
    'T8s': { raise: 0, call: 0, fold: 100 },
    '98s': { raise: 0, call: 0, fold: 100 },
    'A6s': { raise: 0, call: 0, fold: 100 }
  }
};

export default range;