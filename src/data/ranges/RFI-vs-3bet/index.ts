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
import SB_3BET_vs_CO_4BET from './SB-3bet-vs-CO-4bet';
import CO_4BET_vs_SB_JAM from './CO-4bet-vs-SB-jam';
import BU_3BET_vs_CO_4BET from './BU-3bet-vs-CO-4bet';
import CO_4BET_vs_BU_JAM from './CO-4bet-vs-BU-jam';
import SB_RFI_vs_BB_3BET from './SB-RFI-vs-BB-3bet';
import BB_3BET_vs_SB_4BET from './BB-3bet-vs-SB-4bet';
import SB_4BET_vs_BB_JAM from './SB-4bet-vs-BB-jam';

// Re-export ranges
export { default as UTG_RFI_vs_3BET } from './UTG-vs-3bet';
export { default as BU_RFI_vs_3BET } from './BU-vs-3bet';
export { default as CO_RFI_vs_SB_3BET } from './CO-vs-SB-3bet';
export { default as CO_RFI_vs_BU_3BET } from './CO-vs-BU-3bet';
export { default as SB_3BET_vs_CO_4BET } from './SB-3bet-vs-CO-4bet';
export { default as CO_4BET_vs_SB_JAM } from './CO-4bet-vs-SB-jam';
export { default as BU_3BET_vs_CO_4BET } from './BU-3bet-vs-CO-4bet';
export { default as CO_4BET_vs_BU_JAM } from './CO-4bet-vs-BU-jam';
export { default as SB_RFI_vs_BB_3BET } from './SB-RFI-vs-BB-3bet';
export { default as BB_3BET_vs_SB_4BET } from './BB-3bet-vs-SB-4bet';
export { default as SB_4BET_vs_BB_JAM } from './SB-4bet-vs-BB-jam';

// Collect all ranges into an array
export const ALL_RFI_VS_3BET_RANGES = [
  UTG_RFI_vs_3BET,
  BU_RFI_vs_3BET,
  CO_RFI_vs_SB_3BET,
  CO_RFI_vs_BU_3BET,
  SB_3BET_vs_CO_4BET,
  CO_4BET_vs_SB_JAM,
  BU_3BET_vs_CO_4BET,
  CO_4BET_vs_BU_JAM,
  SB_RFI_vs_BB_3BET,
  BB_3BET_vs_SB_4BET,
  SB_4BET_vs_BB_JAM,
];