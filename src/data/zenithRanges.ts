import { RangeData } from '../types';
import * as RFI_RANGES from './ranges/RFI';

// Convert imported ranges to array format (for backward compatibility)
export const ZENITH_RANGES: RangeData[] = Object.values(RFI_RANGES) as RangeData[];

export const getRangeData = (positionCombo: string): RangeData | undefined => {
  return ZENITH_RANGES.find(range => range.positionCombo === positionCombo);
};