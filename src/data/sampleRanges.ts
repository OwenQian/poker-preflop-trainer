import { RangeData } from '../types';
import { ZENITH_RANGES, getRangeData as getZenithRangeData } from './zenithRanges';

// Export Zenith ranges as the main ranges
export const SAMPLE_RANGES: RangeData[] = ZENITH_RANGES;

export const getRangeData = (positionCombo: string): RangeData | undefined => {
  return getZenithRangeData(positionCombo);
};