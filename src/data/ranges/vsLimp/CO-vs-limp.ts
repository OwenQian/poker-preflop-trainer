/**
 * Cutoff vs Limper Range
 * 
 * This range represents Cutoff's optimal strategy when facing a single limper.
 * Raise size: 6bb (4bb + 2×number of limpers, where n=1)
 * 
 * Mixed frequencies: 50% hands can randomize between raise and fold
 * Pure strategies: 100% raise or 100% fold
 * 
 * Strategic notes:
 * - Aggressive approach from late position
 * - Wide range of hands at 50% frequency
 * - Include small pairs and many suited aces
 * - Position allows for profitable isolation with weaker hands
 * - Against multiple limpers, fold most 50% frequency hands
 */

import { RangeData } from '../../../types';

const range: RangeData = {
  positionCombo: 'CO_vs_LIMP',
  missingHandTreatment: 'fold',
  hands: {
    // Mixed strategy hands (50% raise, 50% fold)
    '22': { raise: 50, call: 0, fold: 50 },
    '33': { raise: 50, call: 0, fold: 50 },
    '44': { raise: 50, call: 0, fold: 50 },
    'ATo': { raise: 50, call: 0, fold: 50 },
    'A8s': { raise: 50, call: 0, fold: 50 },
    'A7s': { raise: 50, call: 0, fold: 50 },
    'A6s': { raise: 50, call: 0, fold: 50 },
    'A5s': { raise: 50, call: 0, fold: 50 },
    'A4s': { raise: 50, call: 0, fold: 50 },
    'A3s': { raise: 50, call: 0, fold: 50 },
    'A2s': { raise: 50, call: 0, fold: 50 },
    'KJo': { raise: 50, call: 0, fold: 50 },
    'K9s': { raise: 50, call: 0, fold: 50 },
    'QJo': { raise: 50, call: 0, fold: 50 },
    'Q9s': { raise: 50, call: 0, fold: 50 },
    'J9s': { raise: 50, call: 0, fold: 50 },
    'T8s': { raise: 50, call: 0, fold: 50 },
    '98s': { raise: 50, call: 0, fold: 50 },
    '97s': { raise: 50, call: 0, fold: 50 },
    '87s': { raise: 50, call: 0, fold: 50 },
    '76s': { raise: 50, call: 0, fold: 50 },
    '65s': { raise: 50, call: 0, fold: 50 },
    '54s': { raise: 50, call: 0, fold: 50 },
    
    // Pure raise hands (100% raise)
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
    'AKs': { raise: 100, call: 0, fold: 0 },
    'AKo': { raise: 100, call: 0, fold: 0 },
    'AQs': { raise: 100, call: 0, fold: 0 },
    'AQo': { raise: 100, call: 0, fold: 0 },
    'AJs': { raise: 100, call: 0, fold: 0 },
    'AJo': { raise: 100, call: 0, fold: 0 },
    'ATs': { raise: 100, call: 0, fold: 0 },
    'A9s': { raise: 100, call: 0, fold: 0 },
    'KQs': { raise: 100, call: 0, fold: 0 },
    'KQo': { raise: 100, call: 0, fold: 0 },
    'KJs': { raise: 100, call: 0, fold: 0 },
    'KTs': { raise: 100, call: 0, fold: 0 },
    'QJs': { raise: 100, call: 0, fold: 0 },
    'QTs': { raise: 100, call: 0, fold: 0 },
    'JTs': { raise: 100, call: 0, fold: 0 },
    'T9s': { raise: 100, call: 0, fold: 0 }
  }
};

export default range;