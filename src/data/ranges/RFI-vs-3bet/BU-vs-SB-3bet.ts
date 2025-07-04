/**
 * Button RFI vs Small Blind 3-bet Range
 * 
 * This range represents the Button's optimal response when facing a 3-bet from the Small Blind.
 * BU 2.5bb vs SB 10bb 3bet
 * 
 * 4-bet hands: Premium value hands and selected bluffs
 * Call hands: Strong hands that can handle being out of position against aggressive opponent
 * 
 * Strategic notes:
 * - Face large 3-bet sizing (4x) which requires tight response
 * - 4-bet for value with premium hands and some bluffs
 * - Call with strong hands that have good postflop playability
 * - Fold most speculative hands due to large sizing and position
 */

import { RangeData } from '../../../types';

const range: RangeData = {
  positionCombo: 'BU_RFI_vs_SB_3BET',
  missingHandTreatment: 'fold',
  hands: {
    // Premium 4-bets
    'AA': { raise: 100, call: 0, fold: 0 },
    'KK': { raise: 100, call: 0, fold: 0 },
    'QQ': { raise: 100, call: 0, fold: 0 },
    'AKs': { raise: 100, call: 0, fold: 0 },
    
    // High frequency 4-bets
    'JJ': { raise: 75, call: 25, fold: 0 },
    'AKo': { raise: 75, call: 25, fold: 0 },
    
    // Mixed frequency 4-bets and calls
    'A5s': { raise: 50, call: 50, fold: 0 },
    'ATo': { raise: 50, call: 0, fold: 50 },
    'A3s': { raise: 50, call: 25, fold: 25 },
    'K9s': { raise: 50, call: 50, fold: 0 },
    'A8s': { raise: 50, call: 50, fold: 0 },
    'Q9s': { raise: 50, call: 50, fold: 0 },
    'J9s': { raise: 50, call: 50, fold: 0 },
    
    // Lower frequency 4-bets
    'TT': { raise: 25, call: 75, fold: 0 },
    '99': { raise: 25, call: 75, fold: 0 },
    '88': { raise: 25, call: 75, fold: 0 },
    '77': { raise: 25, call: 75, fold: 0 },
    '66': { raise: 25, call: 75, fold: 0 },
    '55': { raise: 25, call: 75, fold: 0 },
    '44': { raise: 25, call: 50, fold: 25 },
    'A9s': { raise: 25, call: 75, fold: 0 },
    'JTs': { raise: 0, call: 100, fold: 0 },
    'QJs': { raise: 25, call: 75, fold: 0 },
    'AQo': { raise: 25, call: 75, fold: 0 },
    'KQo': { raise: 25, call: 75, fold: 0 },
    'AJo': { raise: 25, call: 75, fold: 0 },
    'KJo': { raise: 25, call: 0, fold: 75 },
    'A4s': { raise: 25, call: 25, fold: 50 },
    'A2s': { raise: 25, call: 0, fold: 75 },
    'K8s': { raise: 25, call: 0, fold: 75 },
    '76s': { raise: 25, call: 75, fold: 0 },
    '65s': { raise: 25, call: 75, fold: 0 },
    'T9s': { raise: 25, call: 75, fold: 0 },
    'T8s': { raise: 25, call: 75, fold: 0 },
    '98s': { raise: 25, call: 75, fold: 0 },
    '54s': { raise: 25, call: 75, fold: 0 },
    '22': { raise: 0, call: 25, fold: 75 },
    
    // Pure calls
    '33': { raise: 0, call: 50, fold: 50 },
    'KJs': { raise: 0, call: 100, fold: 0 },
    'KTs': { raise: 0, call: 100, fold: 0 },
    'ATs': { raise: 0, call: 100, fold: 0 },
    'AQs': { raise: 0, call: 100, fold: 0 },
    'KQs': { raise: 0, call: 100, fold: 0 },
    'AJs': { raise: 0, call: 100, fold: 0 },
    'QTs': { raise: 0, call: 100, fold: 0 },
    '87s': { raise: 0, call: 100, fold: 0 },
    
    // Pure folds
    'A7s': { raise: 0, call: 0, fold: 100 },
    'A6s': { raise: 0, call: 0, fold: 100 },
    'A9o': { raise: 0, call: 0, fold: 100 },
    'A8o': { raise: 0, call: 0, fold: 100 },
    'A5o': { raise: 0, call: 0, fold: 100 },
    'K7s': { raise: 0, call: 0, fold: 100 },
    'K6s': { raise: 0, call: 0, fold: 100 },
    'K5s': { raise: 0, call: 0, fold: 100 },
    'K4s': { raise: 0, call: 0, fold: 100 },
    'KTo': { raise: 0, call: 0, fold: 100 },
    'Q8s': { raise: 0, call: 0, fold: 100 },
    'Q7s': { raise: 0, call: 0, fold: 100 },
    'Q6s': { raise: 0, call: 0, fold: 100 },
    'Q5s': { raise: 0, call: 0, fold: 100 },
    'QJo': { raise: 0, call: 0, fold: 100 },
    'QTo': { raise: 0, call: 0, fold: 100 },
    'J8s': { raise: 0, call: 0, fold: 100 },
    'JTo': { raise: 0, call: 0, fold: 100 },
    'T7s': { raise: 0, call: 0, fold: 100 },
    'T9o': { raise: 0, call: 0, fold: 100 },
    '97s': { raise: 0, call: 0, fold: 100 },
    '96s': { raise: 0, call: 0, fold: 100 },
    '86s': { raise: 0, call: 0, fold: 100 },
    '75s': { raise: 0, call: 0, fold: 100 },
    'K3s': { raise: 0, call: 0, fold: 100 },
    'K2s': { raise: 0, call: 0, fold: 100 },
    'Q4s': { raise: 0, call: 0, fold: 100 },
    'Q3s': { raise: 0, call: 0, fold: 100 },
    'J7s': { raise: 0, call: 0, fold: 100 },
    'J5s': { raise: 0, call: 0, fold: 100 },
    'J6s': { raise: 0, call: 0, fold: 100 },
    'T6s': { raise: 0, call: 0, fold: 100 },
    'T5s': { raise: 0, call: 0, fold: 100 },
    'T4s': { raise: 0, call: 0, fold: 100 },
    '95s': { raise: 0, call: 0, fold: 100 },
    '85s': { raise: 0, call: 0, fold: 100 },
    '64s': { raise: 0, call: 0, fold: 100 },
    '53s': { raise: 0, call: 0, fold: 100 },
    'A3o': { raise: 0, call: 0, fold: 100 },
    'A4o': { raise: 0, call: 0, fold: 100 },
    'A6o': { raise: 0, call: 0, fold: 100 },
    'A7o': { raise: 0, call: 0, fold: 100 },
    'K8o': { raise: 0, call: 0, fold: 100 },
    'K9o': { raise: 0, call: 0, fold: 100 },
    'Q9o': { raise: 0, call: 0, fold: 100 },
    'J9o': { raise: 0, call: 0, fold: 100 },
    'T8o': { raise: 0, call: 0, fold: 100 },
    '98o': { raise: 0, call: 0, fold: 100 }
  }
};

export default range;
