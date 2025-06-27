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
  '3bet vs 4bet': rfiVs3betRanges, // Will filter in getRangeData
  'vs Limp': vsLimpRanges
};

export const getRangeData = (positionCombo: string, rangeCategory: RangeCategory = 'RFI'): RangeData | undefined => {
  // Get ranges for the specified category
  let categoryRanges = ALL_RANGES[rangeCategory];
  
  if (!categoryRanges || !Array.isArray(categoryRanges)) {
    console.warn(`No ranges found for category: ${rangeCategory}`);
    return undefined;
  }
  
  // Filter ranges based on category
  if (rangeCategory === 'RFI vs 3bet') {
    categoryRanges = categoryRanges.filter(range => 
      range && range.positionCombo && 
      range.positionCombo.includes('_RFI_vs_') && 
      !range.positionCombo.includes('_3BET_vs_') && 
      !range.positionCombo.includes('_4BET_vs_')
    );
  } else if (rangeCategory === '3bet vs 4bet') {
    categoryRanges = categoryRanges.filter(range => 
      range && range.positionCombo && (
        range.positionCombo.includes('_3BET_vs_') || 
        range.positionCombo.includes('_4BET_vs_')
      )
    );
  }
  
  // Find the specific range by position combo
  const foundRange = categoryRanges.find(range => range.positionCombo === positionCombo);
  
  return foundRange;
};

// Helper function to get all available position combos for a range category
export const getAvailablePositionCombos = (rangeCategory: RangeCategory): string[] => {
  try {
    let categoryRanges = ALL_RANGES[rangeCategory];
    if (!categoryRanges || !Array.isArray(categoryRanges)) {
      console.warn(`No ranges found for category: ${rangeCategory}`);
      return [];
    }
    
    // Filter ranges based on category
    if (rangeCategory === 'RFI vs 3bet') {
      categoryRanges = categoryRanges.filter(range => 
        range && range.positionCombo && 
        range.positionCombo.includes('_RFI_vs_') && 
        !range.positionCombo.includes('_3BET_vs_') && 
        !range.positionCombo.includes('_4BET_vs_')
      );
    } else if (rangeCategory === '3bet vs 4bet') {
      categoryRanges = categoryRanges.filter(range => 
        range && range.positionCombo && (
          range.positionCombo.includes('_3BET_vs_') || 
          range.positionCombo.includes('_4BET_vs_')
        )
      );
    }
    
    // Remove duplicates using Set
    const uniquePositions = Array.from(new Set(categoryRanges.map(range => range.positionCombo).filter(combo => combo)));
    return uniquePositions;
  } catch (error) {
    console.error('Error in getAvailablePositionCombos:', error);
    return [];
  }
};