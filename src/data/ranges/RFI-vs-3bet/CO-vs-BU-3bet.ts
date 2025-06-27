/**
 * Cutoff RFI vs Button 3bet Range
 * 
 * This range represents how Cutoff should respond when the Button 3-bets after CO opened.
 * This uses mixed strategies with specific frequencies for optimal play.
 * 
 * Mixed frequencies: Different actions with specific percentages based on GTO analysis
 * 
 * Strategic notes:
 * - BU 3-bets from position are often more aggressive
 * - Mixed strategies prevent exploitation by position
 * - More calling than vs SB due to position considerations
 * - Adjust based on effective stack sizes
 */

import { RangeData } from '../../../types';

const range: RangeData = {
  positionCombo: 'CO_RFI_vs_BU_3BET',
  missingHandTreatment: "not-in-range",
  hands: {
    // Mixed strategy hands with specific frequencies
    '22': { raise: 0, call: 100, fold: 0 },
    '33': { raise: 0, call: 100, fold: 0 },
    '44': { raise: 0, call: 100, fold: 0 },
    '55': { raise: 0, call: 100, fold: 0 },
    '66': { raise: 0, call: 100, fold: 0 },
    '77': { raise: 25, call: 75, fold: 0 },
    '88': { raise: 25, call: 75, fold: 0 },
    '99': { raise: 25, call: 75, fold: 0 },
    'KK': { raise: 100, call: 0, fold: 0 },
    'AA': { raise: 100, call: 0, fold: 0 },
    'TT': { raise: 50, call: 50, fold: 0 },
    'JJ': { raise: 100, call: 0, fold: 0 },
    'QQ': { raise: 100, call: 0, fold: 0 },
    'AKo': { raise: 100, call: 0, fold: 0 },
    'AQo': { raise: 25, call: 75, fold: 0 },
    'A5s': { raise: 75, call: 0, fold: 25 },
    'KJs': { raise: 50, call: 50, fold: 0 },
    'KTs': { raise: 50, call: 50, fold: 0 },
    'ATs': { raise: 25, call: 75, fold: 0 },
    'A9s': { raise: 25, call: 75, fold: 0 },
    'AQs': { raise: 25, call: 75, fold: 0 },
    'KQs': { raise: 0, call: 100, fold: 0 },
    'AJs': { raise: 0, call: 100, fold: 0 },
    'JTs': { raise: 50, call: 50, fold: 0 },
    'QJs': { raise: 25, call: 75, fold: 0 },
    'QTs': { raise: 25, call: 75, fold: 0 },
    'AKs': { raise: 100, call: 0, fold: 0 },
    'KQo': { raise: 25, call: 25, fold: 50 },
    'AJo': { raise: 25, call: 25, fold: 50 },
    'A4s': { raise: 25, call: 0, fold: 75 },
    'K9s': { raise: 50, call: 50, fold: 0 },
    'A8s': { raise: 25, call: 75, fold: 0 },
    '76s': { raise: 0, call: 50, fold: 50 },
    '65s': { raise: 0, call: 50, fold: 50 },
    'T9s': { raise: 25, call: 50, fold: 25 },
    '54s': { raise: 0, call: 50, fold: 50 },
    '87s': { raise: 0, call: 50, fold: 50 },
    '98s': { raise: 0, call: 50, fold: 50 },
    'K8s': { raise: 25, call: 0, fold: 75 },
    'K6s': { raise: 25, call: 0, fold: 75 },
    'A7s': { raise: 25, call: 0, fold: 75 },
    'J9s': { raise: 25, call: 0, fold: 75 },
    
    // Pure fold hands
    'A6s': { raise: 0, call: 0, fold: 100 },
    'A3s': { raise: 0, call: 0, fold: 100 },
    'A2s': { raise: 0, call: 0, fold: 100 },
    'ATo': { raise: 0, call: 0, fold: 100 },
    'A9o': { raise: 0, call: 0, fold: 100 },
    'A8o': { raise: 0, call: 0, fold: 100 },
    'A5o': { raise: 0, call: 0, fold: 100 },
    'K7s': { raise: 0, call: 0, fold: 100 },
    'K5s': { raise: 0, call: 0, fold: 100 },
    'K4s': { raise: 0, call: 0, fold: 100 },
    'KJo': { raise: 0, call: 0, fold: 100 },
    'KTo': { raise: 0, call: 0, fold: 100 },
    'Q9s': { raise: 0, call: 0, fold: 100 },
    'Q8s': { raise: 0, call: 0, fold: 100 },
    'Q7s': { raise: 0, call: 0, fold: 100 },
    'Q6s': { raise: 0, call: 0, fold: 100 },
    'Q5s': { raise: 0, call: 0, fold: 100 },
    'QJo': { raise: 0, call: 0, fold: 100 },
    'QTo': { raise: 0, call: 0, fold: 100 },
    'J8s': { raise: 0, call: 0, fold: 100 },
    'JTo': { raise: 0, call: 0, fold: 100 },
    'T8s': { raise: 0, call: 0, fold: 100 },
    'T7s': { raise: 0, call: 0, fold: 100 },
    'T9o': { raise: 0, call: 0, fold: 100 },
    '97s': { raise: 0, call: 0, fold: 100 },
    '96s': { raise: 0, call: 0, fold: 100 },
    '86s': { raise: 0, call: 0, fold: 100 },
    '75s': { raise: 0, call: 0, fold: 100 },
    'K3s': { raise: 0, call: 0, fold: 100 }
  }
};

export default range;