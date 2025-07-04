/**
 * Small Blind vs Limper Range
 * 
 * This range represents Small Blind's optimal strategy when facing a single limper.
 * Raise size: 6bb (4bb + 2×number of limpers, where n=1)
 * 
 * Mixed frequencies: 50% hands can randomize between raise and fold
 * Pure strategies: 100% raise or 100% fold
 * 
 * Strategic notes:
 * - Aggressive but balanced approach from the blinds
 * - Mix to avoid being exploited by limpers
 * - Consider potential for Big Blind to overcall
 * - Position disadvantage postflop requires stronger hands
 * - Against multiple limpers, become more conservative
 */

import { RangeData } from '../../../types';

const range: RangeData = {
  positionCombo: 'SB_vs_LIMP',
  missingHandTreatment: 'fold',
  hands: {
    // Mixed strategy hands (50% raise, 50% fold)
    '55': { raise: 50, call: 0, fold: 50 },
    '66': { raise: 50, call: 0, fold: 50 },
    'AJo': { raise: 50, call: 0, fold: 50 },
    'A8s': { raise: 50, call: 0, fold: 50 },
    'A7s': { raise: 50, call: 0, fold: 50 },
    'A6s': { raise: 50, call: 0, fold: 50 },
    'A5s': { raise: 50, call: 0, fold: 50 },
    'A4s': { raise: 50, call: 0, fold: 50 },
    'A3s': { raise: 50, call: 0, fold: 50 },
    'A2s': { raise: 50, call: 0, fold: 50 },
    'KQo': { raise: 50, call: 0, fold: 50 },
    'K9s': { raise: 50, call: 0, fold: 50 },
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
    'AKs': { raise: 100, call: 0, fold: 0 },
    'AKo': { raise: 100, call: 0, fold: 0 },
    'AQs': { raise: 100, call: 0, fold: 0 },
    'AQo': { raise: 100, call: 0, fold: 0 },
    'AJs': { raise: 100, call: 0, fold: 0 },
    'ATs': { raise: 100, call: 0, fold: 0 },
    'A9s': { raise: 100, call: 0, fold: 0 },
    'KQs': { raise: 100, call: 0, fold: 0 },
    'KJs': { raise: 100, call: 0, fold: 0 },
    'KTs': { raise: 100, call: 0, fold: 0 },
    'QJs': { raise: 100, call: 0, fold: 0 },
    'QTs': { raise: 100, call: 0, fold: 0 },
    'JTs': { raise: 100, call: 0, fold: 0 },
    'T9s': { raise: 100, call: 0, fold: 0 }
  }
};

export default range;