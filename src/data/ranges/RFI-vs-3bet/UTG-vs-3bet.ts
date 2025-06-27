/**
 * UTG RFI vs 3bet Range
 * 
 * This range represents how UTG should respond when facing a 3-bet after opening.
 * UTG opened with a tight range, so this response should be conservative.
 * 
 * 4-bet hands: Premium pairs and AK for value
 * Call hands: Strong hands that can play well against 3-bet ranges
 * 
 * Strategic notes:
 * - Very tight 4-bet range due to tight opening range
 * - Call with hands strong enough to continue but not quite 4-bet worthy
 * - Fold many hands that were good opens but can't continue vs 3-bet
 * - Consider stack sizes and 3-bettor position for sizing decisions
 */

import { RangeData } from '../../../types';

const range: RangeData = {
  positionCombo: 'UTG_RFI_vs_3BET',
  missingHandTreatment: "not-in-range",
  hands: {
    // 4-bet hands (raise = 100)
    'AA': { raise: 100, call: 0, fold: 0 },
    'KK': { raise: 100, call: 0, fold: 0 },
    'QQ': { raise: 100, call: 0, fold: 0 },
    'JJ': { raise: 100, call: 0, fold: 0 },
    'AKs': { raise: 100, call: 0, fold: 0 },
    'AKo': { raise: 100, call: 0, fold: 0 },
    
    // Call hands (call = 100)
    'TT': { raise: 0, call: 100, fold: 0 },
    '99': { raise: 0, call: 100, fold: 0 },
    '88': { raise: 0, call: 100, fold: 0 },
    '77': { raise: 0, call: 100, fold: 0 },
    'AQs': { raise: 0, call: 100, fold: 0 },
    'AJs': { raise: 0, call: 100, fold: 0 },
    'ATs': { raise: 0, call: 100, fold: 0 },
    'A9s': { raise: 0, call: 100, fold: 0 },
    'A8s': { raise: 0, call: 100, fold: 0 },
    'A7s': { raise: 0, call: 100, fold: 0 },
    'A6s': { raise: 0, call: 100, fold: 0 },
    'A5s': { raise: 0, call: 100, fold: 0 },
    'A4s': { raise: 0, call: 100, fold: 0 },
    'A3s': { raise: 0, call: 100, fold: 0 },
    'A2s': { raise: 0, call: 100, fold: 0 },
    'AQo': { raise: 0, call: 100, fold: 0 },
    'AJo': { raise: 0, call: 100, fold: 0 },
    'ATo': { raise: 0, call: 100, fold: 0 },
    'KQs': { raise: 0, call: 100, fold: 0 },
    'KJs': { raise: 0, call: 100, fold: 0 },
    'KTs': { raise: 0, call: 100, fold: 0 },
    'K9s': { raise: 0, call: 100, fold: 0 },
    'KQo': { raise: 0, call: 100, fold: 0 },
    'KJo': { raise: 0, call: 100, fold: 0 },
    'QJs': { raise: 0, call: 100, fold: 0 },
    'QTs': { raise: 0, call: 100, fold: 0 },
    'Q9s': { raise: 0, call: 100, fold: 0 },
    'QJo': { raise: 0, call: 100, fold: 0 },
    'JTs': { raise: 0, call: 100, fold: 0 },
    'J9s': { raise: 0, call: 100, fold: 0 },
    'T9s': { raise: 0, call: 100, fold: 0 },
    '98s': { raise: 0, call: 100, fold: 0 },
    '87s': { raise: 0, call: 100, fold: 0 },
    '76s': { raise: 0, call: 100, fold: 0 },
    '65s': { raise: 0, call: 100, fold: 0 }
  }
};

export default range;