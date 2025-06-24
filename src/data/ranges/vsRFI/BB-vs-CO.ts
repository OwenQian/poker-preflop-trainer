/**
 * Big Blind vs Cutoff RFI Range, CO RFI size of 2.5bb (picked this size to keep range relatively similar to vs HJ RFI range)
 * 
 * This range represents the Big Blind's optimal response when the Cutoff raises first in.
 * CO has a wide opening range, so BB can defend with a wider range including mixed strategies.
 * 
 * Mixed strategies: Many hands use frequency-based approaches with raise/call/fold splits
 * Strategic notes:
 * - Wider defense than vs early position due to CO's wide opening range
 * - Mixed strategies with suited connectors and broadway hands
 * - Liberal calling range with speculative hands that have good implied odds
 */

import { RangeData } from '../../../types';

const BB_vs_CO_RFI: RangeData = {
  positionCombo: 'BB_vs_CO_RFI',
  missingHandTreatment: 'fold',
  hands: {
    '22': { raise: 0, call: 100, fold: 0 },
    '33': { raise: 0, call: 100, fold: 0 },
    '44': { raise: 0, call: 100, fold: 0 },
    '55': { raise: 0, call: 100, fold: 0 },
    '66': { raise: 0, call: 100, fold: 0 },
    '77': { raise: 0, call: 100, fold: 0 },
    '88': { raise: 0, call: 100, fold: 0 },
    '99': { raise: 25, call: 75, fold: 0 },
    'TT': { raise: 50, call: 50, fold: 0 },
    'JJ': { raise: 100, call: 0, fold: 0 },
    'QQ': { raise: 100, call: 0, fold: 0 },
    'KQs': { raise: 25, call: 75, fold: 0 },
    'KK': { raise: 100, call: 0, fold: 0 },
    'AKs': { raise: 100, call: 0, fold: 0 },
    'AA': { raise: 100, call: 0, fold: 0 },
    '87o': { raise: 0, call: 25, fold: 75 },
    '76o': { raise: 0, call: 25, fold: 75 },
    '65o': { raise: 0, call: 25, fold: 75 },
    '87s': { raise: 25, call: 75, fold: 0 },
    '43s': { raise: 0, call: 100, fold: 0 },
    'K2s': { raise: 0, call: 100, fold: 0 },
    'Q4s': { raise: 0, call: 50, fold: 50 },
    'Q5s': { raise: 0, call: 100, fold: 0 },
    'Q6s': { raise: 25, call: 75, fold: 0 },
    'Q7s': { raise: 25, call: 75, fold: 0 },
    'K8s': { raise: 25, call: 75, fold: 0 },
    'K9s': { raise: 0, call: 100, fold: 0 },
    'KTo': { raise: 25, call: 75, fold: 0 },
    'QTo': { raise: 25, call: 75, fold: 0 },
    'JTo': { raise: 25, call: 25, fold: 50 },
    'AJo': { raise: 25, call: 75, fold: 0 },
    'T8s': { raise: 25, call: 75, fold: 0 },
    'T7s': { raise: 25, call: 75, fold: 0 },
    'T6s': { raise: 0, call: 75, fold: 25 },
    '86s': { raise: 0, call: 100, fold: 0 },
    '85s': { raise: 0, call: 100, fold: 0 },
    '75s': { raise: 0, call: 100, fold: 0 },
    '74s': { raise: 0, call: 100, fold: 0 },
    '65s': { raise: 25, call: 75, fold: 0 },
    '64s': { raise: 0, call: 100, fold: 0 },
    '63s': { raise: 0, call: 100, fold: 0 },
    '53s': { raise: 0, call: 100, fold: 0 },
    '52s': { raise: 0, call: 100, fold: 0 },
    '42s': { raise: 0, call: 100, fold: 0 },
    '32s': { raise: 0, call: 50, fold: 50 },
    '54s': { raise: 25, call: 75, fold: 0 },
    '76s': { raise: 25, call: 75, fold: 0 },
    '98s': { raise: 25, call: 75, fold: 0 },
    'T9s': { raise: 50, call: 50, fold: 0 },
    'JTs': { raise: 50, call: 50, fold: 0 },
    'QJs': { raise: 25, call: 75, fold: 0 },
    'QTs': { raise: 25, call: 75, fold: 0 },
    'KTs': { raise: 25, call: 75, fold: 0 },
    'KJs': { raise: 25, call: 75, fold: 0 },
    'AJs': { raise: 50, call: 50, fold: 0 },
    'ATs': { raise: 25, call: 75, fold: 0 },
    'A9s': { raise: 0, call: 100, fold: 0 },
    'A5s': { raise: 25, call: 75, fold: 0 },
    'A4s': { raise: 25, call: 75, fold: 0 },
    'A3s': { raise: 25, call: 75, fold: 0 },
    'A2s': { raise: 25, call: 75, fold: 0 },
    'A6s': { raise: 0, call: 100, fold: 0 },
    'A7s': { raise: 0, call: 100, fold: 0 },
    'A8s': { raise: 0, call: 100, fold: 0 },
    'AQs': { raise: 100, call: 0, fold: 0 },
    'K3s': { raise: 25, call: 75, fold: 0 },
    'K4s': { raise: 25, call: 75, fold: 0 },
    'K5s': { raise: 25, call: 75, fold: 0 },
    'K6s': { raise: 25, call: 75, fold: 0 },
    'K7s': { raise: 25, call: 75, fold: 0 },
    'Q8s': { raise: 25, call: 75, fold: 0 },
    'Q9s': { raise: 0, call: 100, fold: 0 },
    '97s': { raise: 25, call: 75, fold: 0 },
    'J9s': { raise: 25, call: 75, fold: 0 },
    '96s': { raise: 0, call: 100, fold: 0 },
    'AKo': { raise: 100, call: 0, fold: 0 },
    'ATo': { raise: 25, call: 75, fold: 0 },
    'AQo': { raise: 50, call: 50, fold: 0 },
    'KQo': { raise: 50, call: 50, fold: 0 },
    'KJo': { raise: 50, call: 50, fold: 0 },
    'QJo': { raise: 50, call: 50, fold: 0 },
    'A9o': { raise: 25, call: 75, fold: 0 },
    'A8o': { raise: 0, call: 25, fold: 75 },
    'T9o': { raise: 0, call: 25, fold: 75 },
    '98o': { raise: 0, call: 25, fold: 75 },
    'J8s': { raise: 25, call: 75, fold: 0 },
    'J7s': { raise: 25, call: 75, fold: 0 },
    'J6s': { raise: 0, call: 25, fold: 75 }
  }
};

export default BB_vs_CO_RFI;
