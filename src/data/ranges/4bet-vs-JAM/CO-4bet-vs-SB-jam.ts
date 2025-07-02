/**
 * Cutoff 4bet vs Small Blind Jam Range
 * 
 * This range represents how Cutoff should respond when Small Blind jams (all-in) after CO 4-bet.
 * This is the deepest level of the betting tree: CO RFI → SB 3bet → CO 4bet → SB jam → CO response
 * 
 * Strategic notes:
 * - At this point, all remaining chips are going in
 * - Only premium hands can call an all-in jam
 * - Pot odds are usually favorable but risk is maximum
 * - Folding marginal hands is often correct to preserve stack
 */

import { RangeData } from '../../../types';

const range: RangeData = {
  positionCombo: 'CO_4BET_vs_SB_JAM',
  missingHandTreatment: "not-in-range",
  hands: {
    'AA': { raise: 0, call: 100, fold: 0 },
    'KK': { raise: 0, call: 100, fold: 0 },
    'QQ': { raise: 0, call: 100, fold: 0 },
    'JJ': { raise: 0, call: 100, fold: 0 },
    'TT': { raise: 0, call: 0, fold: 100 },
    '99': { raise: 0, call: 0, fold: 100 },
    '88': { raise: 0, call: 0, fold: 100 },
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
    'KJo': { raise: 0, call: 0, fold: 100 },
    'KTs': { raise: 0, call: 0, fold: 100 },
    'K9s': { raise: 0, call: 0, fold: 100 }
  }
};

export default range;