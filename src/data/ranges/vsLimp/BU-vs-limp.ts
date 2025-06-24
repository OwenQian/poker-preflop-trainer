/**
 * Button vs Limper Range
 * 
 * This range represents Button's optimal strategy when facing a single limper.
 * Raise size: 6bb (4bb + 2×number of limpers, where n=1)
 * 
 * Mixed frequencies: 50% hands can randomize between raise and fold
 * Pure strategies: 100% raise or 100% fold
 * 
 * Strategic notes:
 * - Most aggressive range due to position advantage
 * - Widest range of hands at mixed frequencies
 * - Include many offsuit hands and small pairs
 * - Position guarantees last action postflop
 * - Against multiple limpers, still more liberal than other positions
 */

import { RangeData } from '../../../types';

const range: RangeData = {
  positionCombo: 'BU_vs_LIMP',
  hands: {
    // Mixed strategy hands (50% raise, 50% fold)
    '22': { raise: 50, call: 0, fold: 50 },
    '33': { raise: 50, call: 0, fold: 50 },
    '44': { raise: 50, call: 0, fold: 50 },
    'ATo': { raise: 50, call: 0, fold: 50 },
    'A7s': { raise: 50, call: 0, fold: 50 },
    'A6s': { raise: 50, call: 0, fold: 50 },
    'A3s': { raise: 50, call: 0, fold: 50 },
    'A2s': { raise: 50, call: 0, fold: 50 },
    'KJo': { raise: 50, call: 0, fold: 50 },
    'KTo': { raise: 50, call: 0, fold: 50 },
    'K9s': { raise: 50, call: 0, fold: 50 },
    'K8s': { raise: 50, call: 0, fold: 50 },
    'K7s': { raise: 50, call: 0, fold: 50 },
    'K6s': { raise: 50, call: 0, fold: 50 },
    'K5s': { raise: 50, call: 0, fold: 50 },
    'QJo': { raise: 50, call: 0, fold: 50 },
    'QTo': { raise: 50, call: 0, fold: 50 },
    'Q9s': { raise: 50, call: 0, fold: 50 },
    'Q8s': { raise: 50, call: 0, fold: 50 },
    'Q7s': { raise: 50, call: 0, fold: 50 },
    'JTo': { raise: 50, call: 0, fold: 50 },
    'J9s': { raise: 50, call: 0, fold: 50 },
    'J8s': { raise: 50, call: 0, fold: 50 },
    'J7s': { raise: 50, call: 0, fold: 50 },
    'T8s': { raise: 50, call: 0, fold: 50 },
    'T7s': { raise: 50, call: 0, fold: 50 },
    'T6s': { raise: 50, call: 0, fold: 50 },
    '97s': { raise: 50, call: 0, fold: 50 },
    '96s': { raise: 50, call: 0, fold: 50 },
    '87s': { raise: 50, call: 0, fold: 50 },
    '86s': { raise: 50, call: 0, fold: 50 },
    '85s': { raise: 50, call: 0, fold: 50 },
    '76s': { raise: 50, call: 0, fold: 50 },
    '75s': { raise: 50, call: 0, fold: 50 },
    '65s': { raise: 50, call: 0, fold: 50 },
    '64s': { raise: 50, call: 0, fold: 50 },
    '54s': { raise: 50, call: 0, fold: 50 },
    '53s': { raise: 50, call: 0, fold: 50 },
    'A9o': { raise: 50, call: 0, fold: 50 },
    'T9o': { raise: 50, call: 0, fold: 50 },
    
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
    'A8s': { raise: 100, call: 0, fold: 0 },
    'A5s': { raise: 100, call: 0, fold: 0 },
    'A4s': { raise: 100, call: 0, fold: 0 },
    'KQs': { raise: 100, call: 0, fold: 0 },
    'KQo': { raise: 100, call: 0, fold: 0 },
    'KJs': { raise: 100, call: 0, fold: 0 },
    'KTs': { raise: 100, call: 0, fold: 0 },
    'QJs': { raise: 100, call: 0, fold: 0 },
    'QTs': { raise: 100, call: 0, fold: 0 },
    'JTs': { raise: 100, call: 0, fold: 0 },
    'T9s': { raise: 100, call: 0, fold: 0 },
    '98s': { raise: 100, call: 0, fold: 0 }
  }
};

export default range;