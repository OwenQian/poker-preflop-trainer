/**
 * Small Blind 3bet vs Cutoff 4bet Range
 * 
 * This range represents how Small Blind should respond when Cutoff 4-bets after SB 3-bet.
 * This is a deeper level of the betting tree: CO RFI → SB 3bet → CO 4bet → SB response
 * 
 * Strategic notes:
 * - At this betting level, stacks are getting committed
 * - Mixed strategies prevent exploitation at high stakes
 * - Premium hands generally call or jam
 * - Bluffs and marginal hands often fold
 */

import { RangeData } from '../../../types';

const range: RangeData = {
  positionCombo: 'SB_3BET_vs_CO_4BET',
  hands: {
    '55': { raise: 0, call: 100, fold: 0 },
    '66': { raise: 0, call: 100, fold: 0 },
    '77': { raise: 0, call: 0, fold: 100 },
    '88': { raise: 0, call: 50, fold: 50 },
    '99': { raise: 0, call: 75, fold: 25 },
    'TT': { raise: 25, call: 75, fold: 0 },
    'JJ': { raise: 50, call: 50, fold: 0 },
    'QQ': { raise: 100, call: 0, fold: 0 },
    'KK': { raise: 100, call: 0, fold: 0 },
    'AA': { raise: 100, call: 0, fold: 0 },
    'AKs': { raise: 100, call: 0, fold: 0 },
    'AKo': { raise: 100, call: 0, fold: 0 },
    'AQs': { raise: 0, call: 100, fold: 0 },
    'AQo': { raise: 0, call: 25, fold: 75 },
    'AJs': { raise: 0, call: 100, fold: 0 },
    'AJo': { raise: 0, call: 0, fold: 100 },
    'ATs': { raise: 0, call: 100, fold: 0 },
    'A9s': { raise: 0, call: 25, fold: 75 },
    'A5s': { raise: 50, call: 25, fold: 25 },
    'A4s': { raise: 0, call: 0, fold: 100 },
    'KQs': { raise: 0, call: 100, fold: 0 },
    'KQo': { raise: 0, call: 0, fold: 100 },
    'KJs': { raise: 0, call: 0, fold: 100 },
    'KJo': { raise: 0, call: 0, fold: 100 },
    'KTs': { raise: 0, call: 0, fold: 100 },
    'K9s': { raise: 0, call: 0, fold: 100 },
    'QJs': { raise: 0, call: 0, fold: 100 },
    'QTs': { raise: 0, call: 0, fold: 100 },
    'JTs': { raise: 0, call: 0, fold: 100 },
    'J9s': { raise: 0, call: 0, fold: 100 },
    'T9s': { raise: 0, call: 25, fold: 75 },
    '65s': { raise: 0, call: 75, fold: 25 }
  }
};

export default range;