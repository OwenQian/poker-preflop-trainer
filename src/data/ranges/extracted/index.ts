/**
 * Extracted Ranges Index
 * 
 * Central export point for all extracted poker ranges organized by category.
 * These ranges have been separated from the original jonLittleRanges.ts file
 * into individual files for better organization and maintainability.
 */

// vs RFI ranges (defending against opens)
export * from '../vsRFI';
export { ALL_VS_RFI_RANGES } from '../vsRFI';

// RFI vs 3bet ranges (responding to 3-bets)
export * from '../RFI-vs-3bet';
export { ALL_RFI_VS_3BET_RANGES } from '../RFI-vs-3bet';

// vs Limp ranges (isolating limpers)
export * from '../vsLimp';
export { ALL_VS_LIMP_RANGES } from '../vsLimp';

// Aggregate all extracted ranges
import { ALL_VS_RFI_RANGES } from '../vsRFI';
import { ALL_RFI_VS_3BET_RANGES } from '../RFI-vs-3bet';
import { ALL_VS_LIMP_RANGES } from '../vsLimp';

export const ALL_EXTRACTED_RANGES = [
  ...ALL_VS_RFI_RANGES,
  ...ALL_RFI_VS_3BET_RANGES,
  ...ALL_VS_LIMP_RANGES,
];

// Summary statistics
export const EXTRACTED_RANGES_SUMMARY = {
  vsRFI: ALL_VS_RFI_RANGES.length,
  RFI_vs_3bet: ALL_RFI_VS_3BET_RANGES.length,
  vsLimp: ALL_VS_LIMP_RANGES.length,
  total: ALL_EXTRACTED_RANGES.length,
};