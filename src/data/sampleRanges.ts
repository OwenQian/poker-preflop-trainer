import { RangeData } from '../types';
import { RangeCategory } from '../components/RangeTabSelector/RangeTabSelector';

// Import all consolidated ranges from new organized structure
import * as RFI_RANGES from './ranges/RFI';
import * as VS_RFI_RANGES from './ranges/vsRFI';
import * as RFI_VS_3BET_RANGES from './ranges/RFI-vs-3bet';
import * as VS_LIMP_RANGES from './ranges/vsLimp';

// Convert imported ranges to RangeData arrays
const rfiRanges = Object.values(RFI_RANGES) as RangeData[];
const vsRfiRanges = Object.values(VS_RFI_RANGES) as RangeData[];
const rfiVs3betRanges = Object.values(RFI_VS_3BET_RANGES) as RangeData[];
const vsLimpRanges = Object.values(VS_LIMP_RANGES) as RangeData[];

// Export consolidated RFI ranges as the main ranges (for backward compatibility)
export const SAMPLE_RANGES: RangeData[] = rfiRanges;

// Combined range data source using new organized structure
export const ALL_RANGES = {
  RFI: rfiRanges,
  'vs RFI': vsRfiRanges,
  'RFI vs 3bet': rfiVs3betRanges,
  'vs Limp': vsLimpRanges
};

export const getRangeData = (positionCombo: string, rangeCategory: RangeCategory = 'RFI'): RangeData | undefined => {
  // Get ranges for the specified category
  const categoryRanges = ALL_RANGES[rangeCategory];
  
  if (!categoryRanges || !Array.isArray(categoryRanges)) {
    console.warn(`No ranges found for category: ${rangeCategory}`);
    return undefined;
  }
  
  // Find the specific range by position combo
  const foundRange = categoryRanges.find(range => range.positionCombo === positionCombo);
  
  return foundRange;
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