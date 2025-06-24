/**
 * vs RFI Ranges Index
 * 
 * Exports all ranges for defending against RFI (Raise First In) actions.
 * These ranges represent optimal calling and 3-betting strategies when facing opens.
 */

// Import ranges
import BB_vs_UTG_RFI from './BB-vs-UTG';
import BB_vs_UTG2_RFI from './BB-vs-UTG2';
import BB_vs_LJ_RFI from './BB-vs-LJ';
import BB_vs_HJ_RFI from './BB-vs-HJ';
import BB_vs_CO_RFI from './BB-vs-CO';
import BB_vs_BU_RFI from './BB-vs-BU';
import BB_vs_SB_RFI from './BB-vs-SB';
import SB_vs_UTG_RFI from './SB-vs-UTG';
import SB_vs_BU_RFI from './SB-vs-BU';
import BU_vs_UTG_RFI from './BU-vs-UTG';
import BU_vs_UTG2_RFI from './BU-vs-UTG2';
import BU_vs_LJ_RFI from './BU-vs-LJ';
import BU_vs_HJ_RFI from './BU-vs-HJ';
import BU_vs_CO_RFI from './BU-vs-CO';
import CO_vs_HJ_RFI from './CO-vs-HJ';

// Re-export ranges
export { default as BB_vs_UTG_RFI } from './BB-vs-UTG';
export { default as BB_vs_UTG2_RFI } from './BB-vs-UTG2';
export { default as BB_vs_LJ_RFI } from './BB-vs-LJ';
export { default as BB_vs_HJ_RFI } from './BB-vs-HJ';
export { default as BB_vs_CO_RFI } from './BB-vs-CO';
export { default as BB_vs_BU_RFI } from './BB-vs-BU';
export { default as BB_vs_SB_RFI } from './BB-vs-SB';
export { default as SB_vs_UTG_RFI } from './SB-vs-UTG';
export { default as SB_vs_BU_RFI } from './SB-vs-BU';
export { default as BU_vs_UTG_RFI } from './BU-vs-UTG';
export { default as BU_vs_UTG2_RFI } from './BU-vs-UTG2';
export { default as BU_vs_LJ_RFI } from './BU-vs-LJ';
export { default as BU_vs_HJ_RFI } from './BU-vs-HJ';
export { default as BU_vs_CO_RFI } from './BU-vs-CO';
export { default as CO_vs_HJ_RFI } from './CO-vs-HJ';

// Collect all ranges into an array
export const ALL_VS_RFI_RANGES = [
  BB_vs_UTG_RFI,
  BB_vs_UTG2_RFI,
  BB_vs_LJ_RFI,
  BB_vs_HJ_RFI,
  BB_vs_CO_RFI,
  BB_vs_BU_RFI,
  BB_vs_SB_RFI,
  SB_vs_UTG_RFI,
  SB_vs_BU_RFI,
  BU_vs_UTG_RFI,
  BU_vs_UTG2_RFI,
  BU_vs_LJ_RFI,
  BU_vs_HJ_RFI,
  BU_vs_CO_RFI,
  CO_vs_HJ_RFI,
];