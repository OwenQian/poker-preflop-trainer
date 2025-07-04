/**
 * Button RFI vs Big Blind 3-bet Range
 * 
 * This range represents the Button's optimal response when facing a 3-bet from the Big Blind.
 * BU 2.5bb vs BB 12bb (big and polar)
 * 
 * The main difference compared to small blind is that BU's suited connectors don't do as well 
 * due to now blocking and being dominated by BB's polar bluffs. Vs BB, BU's AX do better 
 * because they dominate the polar AX bluffs.
 * 
 * 4-bet hands: Premium value hands and AX bluffs that dominate BB's polar range
 * Call hands: Strong hands that can handle being out of position against aggressive opponent
 * 
 * Strategic notes:
 * - Face very large 3-bet sizing (4.8x) which requires tight response
 * - AX hands perform better vs BB's polar AX bluffs than vs SB
 * - Suited connectors perform worse due to overlap with BB's bluffing range
 * - More folding overall due to larger sizing and BB's stronger range
 */

import { RangeData } from '../../../types';

const range: RangeData = {
  positionCombo: 'BU_RFI_vs_BB_3BET',
  missingHandTreatment: 'fold',
  hands: {
    // Premium 4-bets
    'AA': { raise: 100, call: 0, fold: 0 },
    'KK': { raise: 100, call: 0, fold: 0 },
    'QQ': { raise: 100, call: 0, fold: 0 },
    'AKs': { raise: 100, call: 0, fold: 0 },
    'A3s': { raise: 100, call: 0, fold: 0 },
    
    // High frequency 4-bets
    'JJ': { raise: 75, call: 25, fold: 0 },
    'AKo': { raise: 75, call: 25, fold: 0 },
    'A6s': { raise: 75, call: 25, fold: 0 },
    'K8s': { raise: 75, call: 0, fold: 25 },
    
    // Mixed frequency 4-bets
    'A2s': { raise: 50, call: 0, fold: 50 },
    
    // Lower frequency 4-bets with calls
    'TT': { raise: 25, call: 75, fold: 0 },
    '99': { raise: 25, call: 75, fold: 0 },
    '88': { raise: 25, call: 75, fold: 0 },
    '77': { raise: 25, call: 75, fold: 0 },
    '66': { raise: 25, call: 75, fold: 0 },
    '55': { raise: 25, call: 75, fold: 0 },
    '44': { raise: 25, call: 50, fold: 25 },
    'A5s': { raise: 25, call: 75, fold: 0 },
    'AQs': { raise: 25, call: 75, fold: 0 },
    'AQo': { raise: 25, call: 75, fold: 0 },
    'KQo': { raise: 25, call: 75, fold: 0 },
    'AJo': { raise: 25, call: 75, fold: 0 },
    'ATo': { raise: 25, call: 25, fold: 50 },
    'A4s': { raise: 25, call: 75, fold: 0 },
    'A8s': { raise: 25, call: 75, fold: 0 },
    'A7s': { raise: 25, call: 75, fold: 0 },
    'KJo': { raise: 25, call: 25, fold: 50 },
    'Q9s': { raise: 25, call: 0, fold: 75 },
    'J9s': { raise: 25, call: 50, fold: 25 },
    'T8s': { raise: 25, call: 50, fold: 25 },
    '22': { raise: 0, call: 25, fold: 75 },
    
    // Pure calls
    '33': { raise: 0, call: 50, fold: 50 },
    'KJs': { raise: 0, call: 100, fold: 0 },
    'KTs': { raise: 0, call: 100, fold: 0 },
    'ATs': { raise: 0, call: 100, fold: 0 },
    'A9s': { raise: 0, call: 100, fold: 0 },
    'KQs': { raise: 0, call: 100, fold: 0 },
    'AJs': { raise: 0, call: 100, fold: 0 },
    'JTs': { raise: 0, call: 100, fold: 0 },
    'QJs': { raise: 0, call: 100, fold: 0 },
    'QTs': { raise: 0, call: 100, fold: 0 },
    'K9s': { raise: 0, call: 100, fold: 0 },
    'T9s': { raise: 0, call: 100, fold: 0 },
    
    // Speculative calls
    '76s': { raise: 0, call: 50, fold: 50 },
    '65s': { raise: 0, call: 25, fold: 75 },
    '98s': { raise: 0, call: 25, fold: 75 },
    '87s': { raise: 0, call: 25, fold: 75 },
    '54s': { raise: 0, call: 25, fold: 75 },
    
    // Pure folds
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