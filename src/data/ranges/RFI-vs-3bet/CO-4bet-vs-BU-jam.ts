/**
 * Cutoff 4bet vs Button Jam Range
 * 
 * This range represents how Cutoff should respond when Button jams (all-in) after CO 4-bet.
 * This is the deepest level of the betting tree: CO RFI → BU 3bet → CO 4bet → BU jam → CO response
 * 
 * Strategic notes:
 * - Final decision point with all chips going in
 * - Only absolute premium hands can call jam
 * - Button's range is polarized at this point
 * - Stack preservation is crucial for marginal holdings
 */

import { RangeData } from '../../../types';

const range: RangeData = {
  positionCombo: 'CO_4BET_vs_BU_JAM',
  missingHandTreatment: "not-in-range",
  hands: {
    'AA': { raise: 0, call: 100, fold: 0 },
    'KK': { raise: 0, call: 100, fold: 0 },
    'QQ': { raise: 0, call: 100, fold: 0 },
    'JJ': { raise: 0, call: 75, fold: 25 },
    'TT': { raise: 0, call: 75, fold: 25 },
    '99': { raise: 0, call: 0, fold: 100 },
    '88': { raise: 0, call: 0, fold: 100 },
    '77': { raise: 0, call: 0, fold: 100 },
    '66': { raise: 0, call: 0, fold: 100 },
    'AKs': { raise: 0, call: 100, fold: 0 },
    'AKo': { raise: 0, call: 100, fold: 0 },
    'AQs': { raise: 0, call: 0, fold: 100 },
    'AQo': { raise: 0, call: 0, fold: 100 },
    'AJs': { raise: 0, call: 0, fold: 100 },
    'AJo': { raise: 0, call: 0, fold: 100 },
    'ATs': { raise: 0, call: 0, fold: 100 },
    'A9s': { raise: 0, call: 0, fold: 100 },
    'A8s': { raise: 0, call: 0, fold: 100 },
    'A5s': { raise: 0, call: 0, fold: 100 },
    'A4s': { raise: 0, call: 0, fold: 100 },
    'KQs': { raise: 0, call: 0, fold: 100 },
    'KQo': { raise: 0, call: 0, fold: 100 },
    'KJs': { raise: 0, call: 0, fold: 100 },
    'KTs': { raise: 0, call: 0, fold: 100 },
    'K9s': { raise: 0, call: 0, fold: 100 },
    'QJs': { raise: 0, call: 0, fold: 100 },
    'QTs': { raise: 0, call: 0, fold: 100 },
    'JTs': { raise: 0, call: 0, fold: 100 }
  }
};

export default range;