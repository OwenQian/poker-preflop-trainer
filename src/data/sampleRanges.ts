import { RangeData } from '../types';
import { ZENITH_RANGES, getRangeData as getZenithRangeData } from './zenithRanges';
import { JON_LITTLE_RANGES, UPSWING_RANGES } from './jonLittleRanges';
import { RangeCategory } from '../components/RangeTabSelector/RangeTabSelector';

// Export Zenith ranges as the main ranges
export const SAMPLE_RANGES: RangeData[] = ZENITH_RANGES;

// Combined range data source
export const ALL_RANGES = {
  RFI: [...ZENITH_RANGES, ...JON_LITTLE_RANGES.RFI],
  'vs RFI': JON_LITTLE_RANGES.FACING_RFI,
  'RFI vs 3bet': JON_LITTLE_RANGES.RFI_VS_3BET,
  'vs Limp': UPSWING_RANGES.VS_LIMP
};

export const getRangeData = (positionCombo: string, rangeCategory: RangeCategory = 'RFI'): RangeData | undefined => {
  // First try category-specific ranges
  const categoryRanges = ALL_RANGES[rangeCategory];
  const categoryRange = categoryRanges.find(range => range.positionCombo === positionCombo);
  
  if (categoryRange) {
    return categoryRange;
  }
  
  // Fallback to Zenith ranges for RFI if not found in Jon Little ranges
  if (rangeCategory === 'RFI') {
    return getZenithRangeData(positionCombo);
  }
  
  return undefined;
};

// Helper function to get all available position combos for a range category
export const getAvailablePositionCombos = (rangeCategory: RangeCategory): string[] => {
  try {
    const categoryRanges = ALL_RANGES[rangeCategory];
    if (!categoryRanges || !Array.isArray(categoryRanges)) {
      console.warn(`No ranges found for category: ${rangeCategory}`);
      return [];
    }
    // Remove duplicates using Set
    const uniquePositions = Array.from(new Set(categoryRanges.map(range => range.positionCombo)));
    return uniquePositions;
  } catch (error) {
    console.error('Error in getAvailablePositionCombos:', error);
    return [];
  }
};