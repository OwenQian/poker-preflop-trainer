/**
 * RFI vs 3bet Ranges Index
 * 
 * Exports all ranges for responding to 3-bets after opening (RFI).
 * These ranges represent optimal 4-betting and calling strategies when facing 3-bets.
 */

// Import ranges
import UTG_RFI_vs_3BET from './UTG-vs-3bet';
import BU_RFI_vs_3BET from './BU-vs-3bet';
import CO_RFI_vs_SB_3BET from './CO-vs-SB-3bet';
import CO_RFI_vs_BU_3BET from './CO-vs-BU-3bet';

// Re-export ranges
export { default as UTG_RFI_vs_3BET } from './UTG-vs-3bet';
export { default as BU_RFI_vs_3BET } from './BU-vs-3bet';
export { default as CO_RFI_vs_SB_3BET } from './CO-vs-SB-3bet';
export { default as CO_RFI_vs_BU_3BET } from './CO-vs-BU-3bet';

// Collect all ranges into an array
export const ALL_RFI_VS_3BET_RANGES = [
  UTG_RFI_vs_3BET,
  BU_RFI_vs_3BET,
  CO_RFI_vs_SB_3BET,
  CO_RFI_vs_BU_3BET,
];