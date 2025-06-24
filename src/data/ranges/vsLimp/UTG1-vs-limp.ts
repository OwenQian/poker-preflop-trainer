/**
 * UTG+1 vs Limper Range
 * 
 * This range represents UTG+1's optimal strategy when facing a single limper.
 * Raise size: 6bb (4bb + 2×number of limpers, where n=1)
 * 
 * Mixed frequencies: 50% hands can randomize between raise and fold
 * Pure strategies: 100% raise or 100% fold
 * 
 * Strategic notes:
 * - Conservative approach from early position
 * - Strong hands raise for value and protection
 * - Mixed frequencies with marginal hands prevent exploitation
 * - Against multiple limpers, tighten significantly (fold most 50% hands)
 * - Consider stack sizes and limper's position
 */

import { RangeData } from '../../../types';

const range: RangeData = {
  positionCombo: 'UTG+1_vs_LIMP',
  hands: {
    // Mixed strategy hands (50% raise, 50% fold)
    '77': { raise: 50, call: 0, fold: 50 },
    'KJs': { raise: 50, call: 0, fold: 50 },
    'KTs': { raise: 50, call: 0, fold: 50 },
    'QTs': { raise: 50, call: 0, fold: 50 },
    'T9s': { raise: 50, call: 0, fold: 50 },
    '98s': { raise: 50, call: 0, fold: 50 },
    
    // Pure raise hands (100% raise)
    'AA': { raise: 100, call: 0, fold: 0 },
    'KK': { raise: 100, call: 0, fold: 0 },
    'QQ': { raise: 100, call: 0, fold: 0 },
    'JJ': { raise: 100, call: 0, fold: 0 },
    'TT': { raise: 100, call: 0, fold: 0 },
    '99': { raise: 100, call: 0, fold: 0 },
    '88': { raise: 100, call: 0, fold: 0 },
    'AKs': { raise: 100, call: 0, fold: 0 },
    'AKo': { raise: 100, call: 0, fold: 0 },
    'AQs': { raise: 100, call: 0, fold: 0 },
    'AQo': { raise: 100, call: 0, fold: 0 },
    'AJs': { raise: 100, call: 0, fold: 0 },
    'ATs': { raise: 100, call: 0, fold: 0 },
    'KQs': { raise: 100, call: 0, fold: 0 },
    'QJs': { raise: 100, call: 0, fold: 0 },
    'JTs': { raise: 100, call: 0, fold: 0 }
  }
};

export default range;