import { RangeData, HandFrequencies, HandName } from '../types';
import { RangeCategory } from '../components/RangeTabSelector/RangeTabSelector';

// Import all consolidated ranges from new organized structure
import * as RFI_RANGES from './ranges/RFI';
import * as VS_RFI_RANGES from './ranges/vsRFI';
import * as RFI_VS_3BET_RANGES from './ranges/RFI-vs-3bet';
import * as THREEBET_VS_FOURBET_RANGES from './ranges/3bet-vs-4bet';
import * as FOURBET_VS_JAM_RANGES from './ranges/4bet-vs-JAM';
import * as VS_LIMP_RANGES from './ranges/vsLimp';

// Import category configurations
import { RFI_CATEGORY_CONFIG } from './ranges/RFI';
import { VS_RFI_CATEGORY_CONFIG } from './ranges/vsRFI';
import { RFI_VS_3BET_CATEGORY_CONFIG } from './ranges/RFI-vs-3bet';
import { THREEBET_VS_FOURBET_CATEGORY_CONFIG } from './ranges/3bet-vs-4bet';
import { FOURBET_VS_JAM_CATEGORY_CONFIG } from './ranges/4bet-vs-JAM';
import { VS_LIMP_CATEGORY_CONFIG } from './ranges/vsLimp';

// Convert imported ranges to RangeData arrays
const rfiRanges = Object.values(RFI_RANGES) as RangeData[];
const vsRfiRanges = Object.values(VS_RFI_RANGES) as RangeData[];
const rfiVs3betRanges = Object.values(RFI_VS_3BET_RANGES) as RangeData[];
const threebetVsFourbetRanges = Object.values(THREEBET_VS_FOURBET_RANGES) as RangeData[];
const fourbetVsJamRanges = Object.values(FOURBET_VS_JAM_RANGES) as RangeData[];
const vsLimpRanges = Object.values(VS_LIMP_RANGES) as RangeData[];

// Helper function to generate all possible hand names
const getAllHandNames = (): HandName[] => {
  const hands: HandName[] = [];
  const RANKS = ['A', 'K', 'Q', 'J', 'T', '9', '8', '7', '6', '5', '4', '3', '2'];
  
  // Add pocket pairs
  for (const rank of RANKS) {
    hands.push(`${rank}${rank}`);
  }
  
  // Add suited and unsuited combinations
  for (let i = 0; i < RANKS.length; i++) {
    for (let j = i + 1; j < RANKS.length; j++) {
      const rank1 = RANKS[i];
      const rank2 = RANKS[j];
      hands.push(`${rank1}${rank2}s`); // suited
      hands.push(`${rank1}${rank2}o`); // offsuit
    }
  }
  
  return hands;
};

// Category configuration mapping
const CATEGORY_CONFIGS = {
  'RFI': RFI_CATEGORY_CONFIG,
  'vs RFI': VS_RFI_CATEGORY_CONFIG,
  'RFI vs 3bet': RFI_VS_3BET_CATEGORY_CONFIG,
  '3bet vs 4bet': THREEBET_VS_FOURBET_CATEGORY_CONFIG,
  '4bet vs JAM': FOURBET_VS_JAM_CATEGORY_CONFIG,
  'vs Limp': VS_LIMP_CATEGORY_CONFIG
};

// Export consolidated RFI ranges as the main ranges (for backward compatibility)
export const SAMPLE_RANGES: RangeData[] = rfiRanges;

// Combined range data source using new organized structure
export const ALL_RANGES = {
  RFI: rfiRanges,
  'vs RFI': vsRfiRanges,
  'RFI vs 3bet': rfiVs3betRanges,
  '3bet vs 4bet': threebetVsFourbetRanges,
  '4bet vs JAM': fourbetVsJamRanges,
  'vs Limp': vsLimpRanges
};

export const getRangeData = (positionCombo: string, rangeCategory: RangeCategory = 'RFI'): RangeData | undefined => {
  // Get ranges for the specified category
  let categoryRanges = ALL_RANGES[rangeCategory];
  
  if (!categoryRanges || !Array.isArray(categoryRanges)) {
    console.warn(`No ranges found for category: ${rangeCategory}`);
    return undefined;
  }
  
  // No filtering needed since categories now have their own separate folders
  // The ranges are already properly separated by category
  
  // Find the specific range by position combo
  const foundRange = categoryRanges.find(range => range.positionCombo === positionCombo);
  
  if (!foundRange) {
    return undefined;
  }
  
  // Get category configuration for default missing hand treatment
  const categoryConfig = CATEGORY_CONFIGS[rangeCategory];
  const defaultTreatment = categoryConfig?.defaultMissingHandTreatment || 'not-in-range';
  
  // Use range-specific treatment if defined, otherwise use category default
  const missingHandTreatment = foundRange.missingHandTreatment || defaultTreatment;
  
  // If missingHandTreatment is 'fold', expand the range to include all possible hands
  if (missingHandTreatment === 'fold') {
    const allHands = getAllHandNames();
    const expandedHands: Record<HandName, HandFrequencies> = {};
    
    // Add all possible hands
    allHands.forEach(handName => {
      if (foundRange.hands[handName]) {
        // Use existing frequencies for hands in the range
        expandedHands[handName] = foundRange.hands[handName];
      } else {
        // Treat missing hands as 100% fold
        expandedHands[handName] = { raise: 0, call: 0, fold: 100 };
      }
    });
    
    // Return enhanced range with all hands included
    return {
      ...foundRange,
      hands: expandedHands,
      missingHandTreatment
    };
  }
  
  // If missingHandTreatment is 'parent', use parent range to determine missing hands
  if (missingHandTreatment === 'parent') {
    const parentRangeCombo = foundRange.parentRange;
    
    if (!parentRangeCombo) {
      // No parent specified, default to treating all 169 hands as parent range (equivalent to 'fold')
      const allHands = getAllHandNames();
      const expandedHands: Record<HandName, HandFrequencies> = {};
      
      allHands.forEach(handName => {
        if (foundRange.hands[handName]) {
          expandedHands[handName] = foundRange.hands[handName];
        } else {
          expandedHands[handName] = { raise: 0, call: 0, fold: 100 };
        }
      });
      
      return {
        ...foundRange,
        hands: expandedHands,
        missingHandTreatment
      };
    }
    
    // Look up parent range data directly to avoid circular dependency
    // For parent ranges, we need to look across all categories since parent may be in different category
    let parentRange: RangeData | undefined;
    
    // Search for parent range across all categories
    for (const [categoryName, categoryRanges] of Object.entries(ALL_RANGES)) {
      if (categoryRanges && Array.isArray(categoryRanges)) {
        parentRange = categoryRanges.find(range => range.positionCombo === parentRangeCombo);
        if (parentRange) break;
      }
    }
    
    if (!parentRange) {
      // Parent range not found, fall back to 'not-in-range' behavior
      console.warn(`Parent range not found: ${parentRangeCombo}, falling back to 'not-in-range' treatment`);
      return {
        ...foundRange,
        missingHandTreatment: 'not-in-range'
      };
    }
    
    // Build expanded hands using parent range as the universe
    const expandedHands: Record<HandName, HandFrequencies> = {};
    
    // Only include hands that are in the parent range
    Object.keys(parentRange.hands).forEach(handName => {
      if (foundRange.hands[handName]) {
        // Use existing frequencies for hands in the child range
        expandedHands[handName] = foundRange.hands[handName];
      } else {
        // Hand is in parent range but not in child range, treat as 100% fold
        expandedHands[handName] = { raise: 0, call: 0, fold: 100 };
      }
    });
    
    // Return enhanced range with parent range hands included
    return {
      ...foundRange,
      hands: expandedHands,
      missingHandTreatment
    };
  }
  
  // For 'not-in-range' treatment, return range as-is with explicit treatment
  return {
    ...foundRange,
    missingHandTreatment
  };
};

// Helper function to get all available position combos for a range category
export const getAvailablePositionCombos = (rangeCategory: RangeCategory): string[] => {
  try {
    let categoryRanges = ALL_RANGES[rangeCategory];
    if (!categoryRanges || !Array.isArray(categoryRanges)) {
      console.warn(`No ranges found for category: ${rangeCategory}`);
      return [];
    }
    
    // No filtering needed since categories now have their own separate folders
    // The ranges are already properly separated by category
    
    // Remove duplicates using Set
    const uniquePositions = Array.from(new Set(categoryRanges.map(range => range.positionCombo).filter(combo => combo)));
    return uniquePositions;
  } catch (error) {
    console.error('Error in getAvailablePositionCombos:', error);
    return [];
  }
};