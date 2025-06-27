/**
 * vs Limp Ranges Index
 * 
 * Exports all ranges for isolating limpers with 6bb sizing (4bb + 2×limpers).
 * These ranges use mixed strategies optimized for single limper scenarios.
 */

// Import ranges
import UTG1_vs_LIMP from './UTG1-vs-limp';
import LJ_vs_LIMP from './LJ-vs-limp';
import HJ_vs_LIMP from './HJ-vs-limp';
import CO_vs_LIMP from './CO-vs-limp';
import BU_vs_LIMP from './BU-vs-limp';
import SB_vs_LIMP from './SB-vs-limp';
import BB_vs_LIMP from './BB-vs-limp';
import BB_vs_SB_LIMP from './BB-vs-SB-limp';

// Re-export ranges
export { default as UTG1_vs_LIMP } from './UTG1-vs-limp';
export { default as LJ_vs_LIMP } from './LJ-vs-limp';
export { default as HJ_vs_LIMP } from './HJ-vs-limp';
export { default as CO_vs_LIMP } from './CO-vs-limp';
export { default as BU_vs_LIMP } from './BU-vs-limp';
export { default as SB_vs_LIMP } from './SB-vs-limp';
export { default as BB_vs_LIMP } from './BB-vs-limp';
export { default as BB_vs_SB_LIMP } from './BB-vs-SB-limp';

// Collect all ranges into an array
export const ALL_VS_LIMP_RANGES = [
  UTG1_vs_LIMP,
  LJ_vs_LIMP,
  HJ_vs_LIMP,
  CO_vs_LIMP,
  BU_vs_LIMP,
  SB_vs_LIMP,
  BB_vs_LIMP,
  BB_vs_SB_LIMP,
];