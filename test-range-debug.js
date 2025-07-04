// Quick test to debug SB vs BU range issue

// Try to require the range directly
try {
  const sbVsBuRange = require('./src/data/ranges/vsRFI/SB-vs-BU.ts');
  console.log('Direct import successful');
  console.log('Range position combo:', sbVsBuRange.default?.positionCombo);
  console.log('Hand count:', Object.keys(sbVsBuRange.default?.hands || {}).length);
} catch (e) {
  console.log('Direct import failed:', e.message);
}

// Check if it's exported from index
try {
  const vsRfiIndex = require('./src/data/ranges/vsRFI/index.ts');
  console.log('VS RFI exports:', Object.keys(vsRfiIndex));
  console.log('Has SB_vs_BU_RFI:', 'SB_vs_BU_RFI' in vsRfiIndex);
} catch (e) {
  console.log('VS RFI index import failed:', e.message);
}

// Check main ranges aggregation
try {
  const sampleRanges = require('./src/data/sampleRanges.ts');
  console.log('Sample ranges import success');
  
  const range = sampleRanges.getRangeData('SB_vs_BU_RFI', 'vs RFI');
  console.log('Range retrieval result:', !!range);
  if (range) {
    console.log('Found range:', range.positionCombo);
  }
} catch (e) {
  console.log('Sample ranges import failed:', e.message);
}