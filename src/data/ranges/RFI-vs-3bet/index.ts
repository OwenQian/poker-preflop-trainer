/**
 * RFI vs 3bet Ranges Index
 * 
 * Exports all ranges for responding to 3-bets after opening (RFI).
 * These ranges represent optimal 4-betting and calling strategies when facing 3-bets.
 */

import { RangeCategoryConfig } from '../../../types';

// Category configuration: RFI vs 3bet ranges treat missing hands as fold
export const RFI_VS_3BET_CATEGORY_CONFIG: RangeCategoryConfig = {
  defaultMissingHandTreatment: 'fold'
};

// Re-export ranges
export { default as CO_RFI_vs_SB_3BET } from './CO-vs-SB-3bet';
export { default as CO_RFI_vs_BU_3BET } from './CO-vs-BU-3bet';
export { default as SB_3BET_vs_CO_4BET } from './SB-3bet-vs-CO-4bet';
export { default as BU_3BET_vs_CO_4BET } from './BU-3bet-vs-CO-4bet';
export { default as SB_RFI_vs_BB_3BET } from './SB-RFI-vs-BB-3bet';
export { default as BB_3BET_vs_SB_4BET } from './BB-3bet-vs-SB-4bet';