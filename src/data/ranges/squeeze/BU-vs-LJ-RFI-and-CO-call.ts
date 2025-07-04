import { RangeData } from '../../../types';

// BU vs LJ RFI and CO call (squeeze) range - 2bb raise
const BU_vs_LJ_RFI_and_CO_call: RangeData = {
  positionCombo: 'BU_vs_LJ_RFI_and_CO_call',
  missingHandTreatment: 'fold',
  hands: {
    '22': { raise: 0, call: 25, fold: 75 },
    '33': { raise: 0, call: 25, fold: 75 },
    '44': { raise: 0, call: 25, fold: 75 },
    '55': { raise: 0, call: 25, fold: 75 },
    '66': { raise: 25, call: 50, fold: 25 },
    '77': { raise: 50, call: 25, fold: 25 },
    '88': { raise: 50, call: 50, fold: 0 },
    '99': { raise: 50, call: 50, fold: 0 },
    'TT': { raise: 50, call: 50, fold: 0 },
    'JJ': { raise: 75, call: 25, fold: 0 },
    'QQ': { raise: 100, call: 0, fold: 0 },
    'KK': { raise: 100, call: 0, fold: 0 },
    'AA': { raise: 100, call: 0, fold: 0 },
    'AKs': { raise: 100, call: 0, fold: 0 },
    'AKo': { raise: 100, call: 0, fold: 0 },
    'AQs': { raise: 100, call: 0, fold: 0 },
    'AJs': { raise: 75, call: 25, fold: 0 },
    'ATs': { raise: 0, call: 25, fold: 75 },
    'A5s': { raise: 50, call: 25, fold: 25 },
    'A4s': { raise: 50, call: 0, fold: 50 },
    'KQs': { raise: 75, call: 25, fold: 0 },
    'KJs': { raise: 50, call: 50, fold: 0 },
    'KTs': { raise: 50, call: 50, fold: 0 },
    'QJs': { raise: 100, call: 0, fold: 0 },
    'JTs': { raise: 75, call: 25, fold: 0 },
    'QTs': { raise: 0, call: 25, fold: 75 },
    'K9s': { raise: 25, call: 0, fold: 75 },
    '65s': { raise: 50, call: 25, fold: 25 },
    '54s': { raise: 25, call: 25, fold: 50 },
    'JTo': { raise: 0, call: 0, fold: 100 },
    'AQo': { raise: 75, call: 25, fold: 0 },
    'KQo': { raise: 75, call: 0, fold: 25 },
    'AJo': { raise: 25, call: 0, fold: 75 }
  }
};

export default BU_vs_LJ_RFI_and_CO_call;