/**
 * 3bet vs 4bet Ranges Index
 * 
 * Exports all ranges for responding to 4-bets after 3-betting.
 * These ranges represent optimal 5-betting and calling strategies when facing 4-bets.
 * 
 * Strategic context:
 * - This is a deep level of the betting tree
 * - Hero has 3-bet and opponent has 4-bet
 * - Decisions involve significant stack commitment
 * - Mixed strategies prevent exploitation at high stakes
 */

import { RangeCategoryConfig } from '../../../types';

// Category configuration: 3bet vs 4bet ranges treat missing hands as fold
export const THREEBET_VS_FOURBET_CATEGORY_CONFIG: RangeCategoryConfig = {
  defaultMissingHandTreatment: 'fold'
};

// Re-export ranges
export { default as BB_3BET_vs_SB_4BET } from './BB-3bet-vs-SB-4bet';
export { default as BU_3BET_vs_CO_4BET } from './BU-3bet-vs-CO-4bet';
export { default as SB_3BET_vs_CO_4BET } from './SB-3bet-vs-CO-4bet';