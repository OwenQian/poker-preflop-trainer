/**
 * Button 3bet vs Cutoff 4bet Range
 * 
 * This range represents how Button should respond when Cutoff 4-bets after BU 3-bet.
 * This is a deeper level of the betting tree: CO RFI → BU 3bet → CO 4bet → BU response
 * 
 * Strategic notes:
 * - Button has position advantage even in 4bet pots  
 * - Mixed strategies create difficult decisions for opponent
 * - Premium hands can mix between calling and jamming
 * - Suited connectors have good playability in position
 */

import { RangeData } from '../../../types';

const range: RangeData = {
  positionCombo: 'BU_3BET_vs_CO_4BET',
  missingHandTreatment: "parent",
  parentRange: "BU_vs_CO_RFI", // Note: This corresponds to BU 3bet range against CO RFI
  hands: {
    '44': { raise: 0, call: 100, fold: 0 },
    '55': { raise: 0, call: 100, fold: 0 },
    '66': { raise: 0, call: 100, fold: 0 },
    '77': { raise: 0, call: 50, fold: 50 },
    '88': { raise: 0, call: 50, fold: 50 },
    '99': { raise: 0, call: 100, fold: 0 },
    'TT': { raise: 0, call: 100, fold: 0 },
    'JJ': { raise: 25, call: 75, fold: 0 },
    'QQ': { raise: 75, call: 25, fold: 0 },
    'KK': { raise: 75, call: 25, fold: 0 },
    'AA': { raise: 25, call: 75, fold: 0 },
    'AKs': { raise: 100, call: 0, fold: 0 },
    'AKo': { raise: 75, call: 25, fold: 0 },
    'AQs': { raise: 0, call: 100, fold: 0 },
    'AQo': { raise: 25, call: 75, fold: 0 },
    'AJs': { raise: 0, call: 100, fold: 0 },
    'AJo': { raise: 25, call: 0, fold: 75 },
    'ATs': { raise: 0, call: 100, fold: 0 },
    'ATo': { raise: 0, call: 0, fold: 100 },
    'A9s': { raise: 0, call: 100, fold: 0 },
    'A8s': { raise: 0, call: 0, fold: 100 },
    'A7s': { raise: 0, call: 0, fold: 100 },
    'A6s': { raise: 0, call: 0, fold: 100 },
    'A5s': { raise: 25, call: 75, fold: 0 },
    'A4s': { raise: 25, call: 75, fold: 0 },
    'A3s': { raise: 25, call: 50, fold: 25 },
    'A2s': { raise: 25, call: 25, fold: 50 },
    'KQs': { raise: 0, call: 100, fold: 0 },
    'KQo': { raise: 25, call: 25, fold: 50 },
    'KJs': { raise: 0, call: 100, fold: 0 },
    'KJo': { raise: 0, call: 0, fold: 100 },
    'KTs': { raise: 0, call: 100, fold: 0 },
    'KTo': { raise: 0, call: 0, fold: 100 },
    'K9s': { raise: 0, call: 25, fold: 75 },
    'K8s': { raise: 0, call: 0, fold: 100 },
    'QJs': { raise: 0, call: 100, fold: 0 },
    'QTs': { raise: 0, call: 100, fold: 0 },
    'Q9s': { raise: 0, call: 0, fold: 100 },
    'JTs': { raise: 0, call: 100, fold: 0 },
    'J9s': { raise: 0, call: 50, fold: 50 },
    'T9s': { raise: 0, call: 100, fold: 0 },
    'T8s': { raise: 0, call: 50, fold: 50 },
    '98s': { raise: 0, call: 0, fold: 100 },
    '87s': { raise: 0, call: 0, fold: 100 },
    '76s': { raise: 0, call: 100, fold: 0 },
    '65s': { raise: 0, call: 100, fold: 0 },
    '54s': { raise: 0, call: 0, fold: 100 }
  }
};

export default range;