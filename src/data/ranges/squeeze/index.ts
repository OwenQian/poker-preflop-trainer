/**
 * Squeeze Ranges Index
 * 
 * Exports all ranges for squeezing (3-betting) when facing RFI + call action.
 * These ranges represent optimal 3-betting strategies when there's an opener and a caller.
 */

import { RangeCategoryConfig } from '../../../types';

// Category configuration: squeeze ranges treat missing hands as fold
export const SQUEEZE_CATEGORY_CONFIG: RangeCategoryConfig = {
  defaultMissingHandTreatment: 'fold'
};

// Re-export ranges
export { default as BB_vs_HJ_RFI_and_BU_call } from './BB-vs-HJ-RFI-and-BU-call';
export { default as BU_vs_LJ_RFI_and_CO_call } from './BU-vs-LJ-RFI-and-CO-call';
export { default as SB_vs_LJ_RFI_and_CO_call } from './SB-vs-LJ-RFI-and-CO-call';
