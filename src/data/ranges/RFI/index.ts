// RFI (Raise First In) Ranges - Export all RFI ranges

import { RangeCategoryConfig } from '../../../types';

// Category configuration: RFI ranges don't include fold-only hands
export const RFI_CATEGORY_CONFIG: RangeCategoryConfig = {
  defaultMissingHandTreatment: 'not-in-range'
};

export { default as UTG_RFI } from './UTG';
export { default as UTG1_RFI } from './UTG1';
export { default as LJ_RFI } from './LJ';
export { default as HJ_RFI } from './HJ';
export { default as CO_RFI } from './CO';
export { default as BU_RFI } from './BU';
export { default as SB_RFI } from './SB';