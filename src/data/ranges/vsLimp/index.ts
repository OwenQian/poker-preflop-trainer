/**
 * vs Limp Ranges Index
 * 
 * Exports all ranges for isolating limpers with 6bb sizing (4bb + 2×limpers).
 * These ranges use mixed strategies optimized for single limper scenarios.
 */

import { RangeCategoryConfig } from '../../../types';

// Category configuration: vs Limp ranges treat missing hands as fold  
export const VS_LIMP_CATEGORY_CONFIG: RangeCategoryConfig = {
  defaultMissingHandTreatment: 'fold'
};

// Re-export ranges
export { default as UTG1_vs_LIMP } from './UTG1-vs-limp';
export { default as LJ_vs_LIMP } from './LJ-vs-limp';
export { default as HJ_vs_LIMP } from './HJ-vs-limp';
export { default as CO_vs_LIMP } from './CO-vs-limp';
export { default as BU_vs_LIMP } from './BU-vs-limp';
export { default as SB_vs_LIMP } from './SB-vs-limp';
export { default as BB_vs_SB_LIMP } from './BB-vs-SB-limp';