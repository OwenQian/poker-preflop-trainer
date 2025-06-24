/**
 * Big Blind vs LJ RFI Range, LJ RFI size of 2bb (picked this size to allow a decently wide range with speculative "pot odds" type calls)
 * 
 * Mixed strategies: Many hands use frequency-based approaches with raise/call/fold splits
 * Strategic notes:
 * - Polar 3betting range. 
 *   - A lot of AXs. These have strong blocker properties against LJ range which make it less likely to get 4bet. Also AX as a call would often dominated by LJ's stronger AX.
 *   - Picking trashy suited K7-K3s again for the significant blocker affect making it less likely to get 4bet.
 *   - At QX, we start losing the blocker effect so we're more selective with the 3bets and choosing hands with double blockers like QJ and QTs.
 *   - Sprinkling in some big double broadway offsuit hands, but we have to be careful to control our frequency since there are 12 offsuit combos vs 4 suited combos.
 *   - Suited connectors are being mixed in as a 3bet bluff which we'll see in almost all 3bet ranges.
 * - Suited kind of connected hands getting called. If the raise size gets bigger these should fold as well.
 * - If offsuit, the connecting hands like JTo, T9o are playable but very marginal calls and should fold vs a larger raise size.
 */
import { RangeData } from '../../../types';

const BB_vs_LJ_RFI: RangeData = {
  positionCombo: 'BB_vs_LJ_RFI',
  missingHandTreatment: 'fold',
  hands: {
    '22': { raise: 0, call: 100, fold: 0 },
    '33': { raise: 0, call: 100, fold: 0 },
    '44': { raise: 0, call: 100, fold: 0 },
    '55': { raise: 0, call: 100, fold: 0 },
    '66': { raise: 0, call: 100, fold: 0 },
    '77': { raise: 0, call: 100, fold: 0 },
    '88': { raise: 0, call: 100, fold: 0 },
    '99': { raise: 0, call: 100, fold: 0 },
    'TT': { raise: 25, call: 75, fold: 0 },
    'JJ': { raise: 25, call: 75, fold: 0 },
    'QQ': { raise: 100, call: 0, fold: 0 },
    'KQs': { raise: 0, call: 100, fold: 0 },
    'KK': { raise: 100, call: 0, fold: 0 },
    'AKs': { raise: 100, call: 0, fold: 0 },
    'AA': { raise: 100, call: 0, fold: 0 },
    '87o': { raise: 0, call: 50, fold: 50 },
    '76o': { raise: 0, call: 50, fold: 50 },
    '65o': { raise: 0, call: 50, fold: 50 },
    '87s': { raise: 25, call: 75, fold: 0 },
    '43s': { raise: 25, call: 75, fold: 0 },
    '32s': { raise: 0, call: 100, fold: 0 },
    'K2s': { raise: 0, call: 100, fold: 0 },
    'Q2s': { raise: 0, call: 100, fold: 0 },
    'Q3s': { raise: 0, call: 100, fold: 0 },
    'Q4s': { raise: 0, call: 100, fold: 0 },
    'Q5s': { raise: 0, call: 100, fold: 0 },
    'Q6s': { raise: 0, call: 100, fold: 0 },
    'Q7s': { raise: 0, call: 100, fold: 0 },
    'K8s': { raise: 0, call: 100, fold: 0 },
    'K9s': { raise: 0, call: 100, fold: 0 },
    'KTo': { raise: 0, call: 100, fold: 0 },
    'QTo': { raise: 0, call: 100, fold: 0 },
    'JTo': { raise: 0, call: 100, fold: 0 },
    'AJo': { raise: 0, call: 100, fold: 0 },
    'T8s': { raise: 25, call: 75, fold: 0 },
    'T7s': { raise: 0, call: 100, fold: 0 },
    'T6s': { raise: 0, call: 100, fold: 0 },
    '86s': { raise: 0, call: 100, fold: 0 },
    '85s': { raise: 0, call: 100, fold: 0 },
    '84s': { raise: 0, call: 100, fold: 0 },
    '75s': { raise: 0, call: 100, fold: 0 },
    '74s': { raise: 0, call: 100, fold: 0 },
    '65s': { raise: 25, call: 75, fold: 0 },
    '64s': { raise: 0, call: 100, fold: 0 },
    '63s': { raise: 0, call: 100, fold: 0 },
    '53s': { raise: 0, call: 100, fold: 0 },
    '52s': { raise: 0, call: 100, fold: 0 },
    '42s': { raise: 0, call: 100, fold: 0 },
    '62s': { raise: 0, call: 50, fold: 50 },
    '73s': { raise: 0, call: 50, fold: 50 },
    '54s': { raise: 25, call: 75, fold: 0 },
    '76s': { raise: 25, call: 75, fold: 0 },
    '98s': { raise: 25, call: 75, fold: 0 },
    'T9s': { raise: 50, call: 50, fold: 0 },
    'JTs': { raise: 50, call: 50, fold: 0 },
    'QJs': { raise: 50, call: 50, fold: 0 },
    'QTs': { raise: 50, call: 50, fold: 0 },
    'KTs': { raise: 25, call: 75, fold: 0 },
    'KJs': { raise: 25, call: 75, fold: 0 },
    'AJs': { raise: 25, call: 75, fold: 0 },
    'ATs': { raise: 25, call: 75, fold: 0 },
    'A9s': { raise: 25, call: 75, fold: 0 },
    'A5s': { raise: 50, call: 50, fold: 0 },
    'A4s': { raise: 50, call: 50, fold: 0 },
    'A3s': { raise: 25, call: 75, fold: 0 },
    'A2s': { raise: 25, call: 75, fold: 0 },
    'A6s': { raise: 25, call: 75, fold: 0 },
    'A7s': { raise: 25, call: 75, fold: 0 },
    'A8s': { raise: 25, call: 75, fold: 0 },
    'AQs': { raise: 25, call: 75, fold: 0 },
    'K3s': { raise: 25, call: 75, fold: 0 },
    'K4s': { raise: 25, call: 75, fold: 0 },
    'K5s': { raise: 25, call: 75, fold: 0 },
    'K6s': { raise: 25, call: 75, fold: 0 },
    'K7s': { raise: 25, call: 75, fold: 0 },
    'Q8s': { raise: 25, call: 75, fold: 0 },
    'Q9s': { raise: 25, call: 75, fold: 0 },
    '97s': { raise: 25, call: 75, fold: 0 },
    'J9s': { raise: 25, call: 75, fold: 0 },
    '96s': { raise: 0, call: 100, fold: 0 },
    'AKo': { raise: 100, call: 0, fold: 0 },
    'ATo': { raise: 25, call: 75, fold: 0 },
    'AQo': { raise: 25, call: 75, fold: 0 },
    'KQo': { raise: 50, call: 50, fold: 0 },
    'KJo': { raise: 25, call: 75, fold: 0 },
    'QJo': { raise: 25, call: 75, fold: 0 },
    'A9o': { raise: 0, call: 75, fold: 25 },
    'A8o': { raise: 0, call: 25, fold: 75 },
    'T9o': { raise: 0, call: 50, fold: 50 },
    '98o': { raise: 0, call: 50, fold: 50 },
    'J8s': { raise: 25, call: 75, fold: 0 },
    'J7s': { raise: 0, call: 100, fold: 0 },
    'J6s': { raise: 0, call: 75, fold: 25 },
    '95s': { raise: 0, call: 100, fold: 0 }
  }
};

export default BB_vs_LJ_RFI;
