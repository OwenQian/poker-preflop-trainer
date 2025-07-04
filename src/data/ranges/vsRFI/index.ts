/**
 * vs RFI Ranges Index
 * 
 * Exports all ranges for defending against RFI (Raise First In) actions.
 * These ranges represent optimal calling and 3-betting strategies when facing opens.
 */

import { RangeCategoryConfig } from '../../../types';

// Category configuration: vs RFI ranges treat missing hands as fold
export const VS_RFI_CATEGORY_CONFIG: RangeCategoryConfig = {
  defaultMissingHandTreatment: 'fold'
};

// Re-export ranges
export { default as BB_vs_LJ_RFI } from './BB-vs-LJ';
export { default as BB_vs_HJ_RFI } from './BB-vs-HJ';
export { default as BB_vs_CO_RFI } from './BB-vs-CO';
export { default as BB_vs_BU_RFI } from './BB-vs-BU';
export { default as BB_vs_SB_RFI } from './BB-vs-SB';
export { default as BU_vs_UTG_RFI } from './BU-vs-UTG';
export { default as BU_vs_UTG2_RFI } from './BU-vs-UTG2';
export { default as BU_vs_LJ_RFI } from './BU-vs-LJ';
export { default as BU_vs_HJ_RFI } from './BU-vs-HJ';
export { default as BU_vs_CO_RFI } from './BU-vs-CO';
export { default as SB_vs_LJ_RFI } from './SB-vs-LJ';
export { default as SB_vs_CO_RFI } from './SB-vs-CO';
export { default as SB_vs_HJ_RFI } from './SB-vs-HJ';
export { default as SB_vs_BU_RFI } from './SB-vs-BU';
