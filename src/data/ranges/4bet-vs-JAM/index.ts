/**
 * 4bet vs JAM Ranges Index
 * 
 * Exports all ranges for responding to all-in jams after 4-betting.
 * These ranges represent optimal call/fold decisions when facing jams after a 4-bet.
 * 
 * Strategic context:
 * - This is the deepest decision point in the preflop betting tree
 * - Hero has 4-bet and opponent has jammed (all-in)
 * - Only premium hands can profitably call these jams
 * - Stack preservation is crucial for marginal holdings
 */

import { RangeCategoryConfig } from '../../../types';

// Category configuration: 4bet vs JAM ranges treat missing hands as fold
export const FOURBET_VS_JAM_CATEGORY_CONFIG: RangeCategoryConfig = {
  defaultMissingHandTreatment: 'fold'
};

// Re-export ranges
export { default as CO_4BET_vs_SB_JAM } from './CO-4bet-vs-SB-jam';
export { default as CO_4BET_vs_BU_JAM } from './CO-4bet-vs-BU-jam';
export { default as SB_4BET_vs_BB_JAM } from './SB-4bet-vs-BB-jam';