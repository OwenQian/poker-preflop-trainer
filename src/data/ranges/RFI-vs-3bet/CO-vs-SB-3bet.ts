/**
 * Cutoff RFI vs Small Blind 3bet Range
 * 
 * This range represents how Cutoff should respond when the Small Blind 3-bets after CO opened.
 * This uses mixed strategies with specific frequencies for optimal play.
 * 
 * Mixed frequencies: Different actions with specific percentages based on GTO analysis
 * 
 * Strategic notes:
 * - SB 3-bets are often wider and more aggressive
 * - Mixed strategies prevent exploitation
 * - Some hands use pure strategies (100% one action)
 * - Consider position advantage and stack sizes
 */

import { RangeData } from '../../../types';

const range: RangeData = {
  positionCombo: 'CO_RFI_vs_SB_3BET',
  hands: {
    // Mixed strategy hands with specific frequencies
    '22': { raise: 0, call: 25, fold: 75 },
    '33': { raise: 0, call: 25, fold: 75 },
    '44': { raise: 0, call: 25, fold: 75 },
    '55': { raise: 0, call: 50, fold: 50 },
    '66': { raise: 0, call: 50, fold: 50 },
    '77': { raise: 0, call: 50, fold: 50 },
    '88': { raise: 25, call: 75, fold: 0 },
    '99': { raise: 25, call: 75, fold: 0 },
    'KK': { raise: 100, call: 0, fold: 0 },
    'AA': { raise: 100, call: 0, fold: 0 },
    'TT': { raise: 25, call: 75, fold: 0 },
    'JJ': { raise: 25, call: 75, fold: 0 },
    'QQ': { raise: 75, call: 25, fold: 0 },
    'AKo': { raise: 50, call: 50, fold: 0 },
    'AQo': { raise: 25, call: 75, fold: 0 },
    'A5s': { raise: 50, call: 50, fold: 0 },
    'KJs': { raise: 25, call: 75, fold: 0 },
    'KTs': { raise: 25, call: 75, fold: 0 },
    'ATs': { raise: 25, call: 75, fold: 0 },
    'A9s': { raise: 25, call: 75, fold: 0 },
    'AQs': { raise: 0, call: 100, fold: 0 },
    'KQs': { raise: 0, call: 100, fold: 0 },
    'AJs': { raise: 0, call: 100, fold: 0 },
    'JTs': { raise: 0, call: 100, fold: 0 },
    'QJs': { raise: 0, call: 75, fold: 25 },
    'QTs': { raise: 0, call: 75, fold: 25 },
    'AKs': { raise: 100, call: 0, fold: 0 },
    'KQo': { raise: 25, call: 25, fold: 50 },
    'AJo': { raise: 25, call: 0, fold: 75 },
    'ATo': { raise: 25, call: 0, fold: 75 },
    'A4s': { raise: 25, call: 25, fold: 50 },
    'K9s': { raise: 50, call: 0, fold: 50 },
    'A8s': { raise: 25, call: 0, fold: 75 },
    '76s': { raise: 0, call: 50, fold: 50 },
    '65s': { raise: 0, call: 25, fold: 75 },
    'T9s': { raise: 0, call: 50, fold: 50 },
    
    // Pure fold hands
    'A7s': { raise: 0, call: 0, fold: 100 },
    'A6s': { raise: 0, call: 0, fold: 100 },
    'A3s': { raise: 0, call: 0, fold: 100 },
    'A2s': { raise: 0, call: 0, fold: 100 },
    'A9o': { raise: 0, call: 0, fold: 100 },
    'A8o': { raise: 0, call: 0, fold: 100 },
    'A5o': { raise: 0, call: 0, fold: 100 },
    'K8s': { raise: 0, call: 0, fold: 100 },
    'K7s': { raise: 0, call: 0, fold: 100 },
    'K6s': { raise: 0, call: 0, fold: 100 },
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
    'J9s': { raise: 0, call: 0, fold: 100 },
    'J8s': { raise: 0, call: 0, fold: 100 },
    'JTo': { raise: 0, call: 0, fold: 100 },
    'T8s': { raise: 0, call: 0, fold: 100 },
    'T7s': { raise: 0, call: 0, fold: 100 },
    'T9o': { raise: 0, call: 0, fold: 100 },
    '98s': { raise: 0, call: 0, fold: 100 },
    '97s': { raise: 0, call: 0, fold: 100 },
    '96s': { raise: 0, call: 0, fold: 100 },
    '87s': { raise: 0, call: 0, fold: 100 },
    '86s': { raise: 0, call: 0, fold: 100 },
    '75s': { raise: 0, call: 0, fold: 100 },
    '54s': { raise: 0, call: 25, fold: 75 },
    'K3s': { raise: 0, call: 0, fold: 100 }
  }
};

export default range;
