import { RangeData } from '../types';
import { UTG_RFI, UTG1_RFI, LJ_RFI, HJ_RFI, CO_RFI, BU_RFI, SB_RFI, BB_RFI } from './ranges';

// Zenith Poker ranges - comprehensive preflop ranges for 6-max
export const ZENITH_RANGES: RangeData[] = [
  UTG_RFI,
  UTG1_RFI,
  LJ_RFI,
  HJ_RFI,
  CO_RFI,
  BU_RFI,
  SB_RFI,
  BB_RFI
];

export const getRangeData = (positionCombo: string): RangeData | undefined => {
  return ZENITH_RANGES.find(range => range.positionCombo === positionCombo);
};