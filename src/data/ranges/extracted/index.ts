/**
 * Extracted Ranges Index
 * 
 * Central export point for all extracted poker ranges organized by category.
 * These ranges have been separated from the original jonLittleRanges.ts file
 * into individual files for better organization and maintainability.
 */

// vs RFI ranges (defending against opens)
export * from '../vsRFI';

// RFI vs 3bet ranges (responding to 3-bets)
export * from '../RFI-vs-3bet';

// vs Limp ranges (isolating limpers)
export * from '../vsLimp';