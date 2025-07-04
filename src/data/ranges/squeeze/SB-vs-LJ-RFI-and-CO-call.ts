import { RangeData } from '../../../types';

// SB vs LJ RFI and CO call range
const SB_vs_LJ_RFI_and_CO_call: RangeData = {
  positionCombo: 'SB_vs_LJ_RFI_and_CO_call',
  missingHandTreatment: 'fold',
  hands: {
    '22': { raise: 0, call: 100, fold: 0 },
    '33': { raise: 0, call: 100, fold: 0 },
    '44': { raise: 0, call: 100, fold: 0 },
    '55': { raise: 0, call: 100, fold: 0 },
    '66': { raise: 25, call: 75, fold: 0 },
    '77': { raise: 25, call: 75, fold: 0 },
    '88': { raise: 25, call: 75, fold: 0 },
    '99': { raise: 25, call: 75, fold: 0 },
    'TT': { raise: 25, call: 75, fold: 0 },
    'JJ': { raise: 75, call: 25, fold: 0 },
    'QQ': { raise: 100, call: 0, fold: 0 },
    'KK': { raise: 100, call: 0, fold: 0 },
    'AA': { raise: 100, call: 0, fold: 0 },
    'AKs': { raise: 100, call: 0, fold: 0 },
    'AKo': { raise: 100, call: 0, fold: 0 },
    'AQs': { raise: 100, call: 0, fold: 0 },
    'AJs': { raise: 75, call: 25, fold: 0 },
    'ATs': { raise: 0, call: 75, fold: 25 },
    'A5s': { raise: 50, call: 0, fold: 50 },
    'A4s': { raise: 25, call: 0, fold: 75 },
    'KQs': { raise: 100, call: 0, fold: 0 },
    'KJs': { raise: 75, call: 25, fold: 0 },
    'KTs': { raise: 25, call: 75, fold: 0 },
    'QJs': { raise: 75, call: 25, fold: 0 },
    'JTs': { raise: 50, call: 50, fold: 0 },
    'QTs': { raise: 0, call: 25, fold: 75 },
    'K9s': { raise: 25, call: 25, fold: 50 },
    'K8s': { raise: 25, call: 0, fold: 75 },
    'K7s': { raise: 25, call: 0, fold: 75 },
    '65s': { raise: 25, call: 25, fold: 50 },
    '54s': { raise: 25, call: 25, fold: 50 },
    'AQo': { raise: 75, call: 25, fold: 0 },
    'KQo': { raise: 75, call: 0, fold: 25 },
    'AJo': { raise: 0, call: 0, fold: 100 },
    'JTo': { raise: 0, call: 0, fold: 100 },
    '43o': { raise: 0, call: 0, fold: 100 }
  }
};

export default SB_vs_LJ_RFI_and_CO_call;