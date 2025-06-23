#!/usr/bin/env node

// Simple test script to verify Range Builder save/load functionality
// This simulates the localStorage behavior for range saving

console.log('🧪 Testing Range Builder Save/Load Functionality\n');

// Simulate localStorage for Node.js environment
const localStorage = {
  storage: {},
  getItem(key) {
    return this.storage[key] || null;
  },
  setItem(key, value) {
    this.storage[key] = value;
  },
  removeItem(key) {
    delete this.storage[key];
  }
};

// Test data - simulating a range with some hands
const testRangeData = {
  'AA': { raise: 100, call: 0, fold: 0 },
  'KK': { raise: 100, call: 0, fold: 0 },
  'QQ': { raise: 100, call: 0, fold: 0 },
  'AKs': { raise: 100, call: 0, fold: 0 },
  'AKo': { raise: 80, call: 0, fold: 20 },
  'AQs': { raise: 100, call: 0, fold: 0 },
  'AQo': { raise: 60, call: 0, fold: 40 }
};

console.log('1. 📊 Testing save functionality...');

// Simulate the save process from RangeBuilder.tsx
function saveRange(rangeData, rangeName) {
  try {
    // Filter non-empty hands
    const nonEmptyHands = Object.entries(rangeData).filter(([_, frequencies]) => 
      frequencies.raise > 0 || frequencies.call > 0
    );

    if (nonEmptyHands.length === 0) {
      throw new Error('No hands in range to save!');
    }

    // Clean up range name
    const cleanRangeName = rangeName.trim().toUpperCase().replace(/[^A-Z0-9_]/g, '_');

    // Create range data structure
    const savedRange = {
      positionCombo: cleanRangeName,
      hands: { ...rangeData }
    };

    // Save to localStorage
    const existingRanges = JSON.parse(localStorage.getItem('custom_poker_ranges') || '[]');
    
    // Check if range name already exists
    const existingIndex = existingRanges.findIndex(range => range.positionCombo === cleanRangeName);
    if (existingIndex >= 0) {
      existingRanges[existingIndex] = savedRange;
      console.log(`   ✅ Range "${cleanRangeName}" updated successfully!`);
    } else {
      existingRanges.push(savedRange);
      console.log(`   ✅ Range "${cleanRangeName}" saved successfully!`);
    }

    localStorage.setItem('custom_poker_ranges', JSON.stringify(existingRanges));
    
    return true;
  } catch (error) {
    console.error(`   ❌ Error saving range: ${error.message}`);
    return false;
  }
}

// Simulate the load process from PresetSelector.tsx
function loadCustomRanges() {
  try {
    const customRanges = JSON.parse(localStorage.getItem('custom_poker_ranges') || '[]');
    return customRanges.map(range => range.positionCombo);
  } catch (error) {
    console.error(`   ❌ Error loading custom ranges: ${error.message}`);
    return [];
  }
}

function loadSpecificRange(positionCombo) {
  try {
    const customRanges = JSON.parse(localStorage.getItem('custom_poker_ranges') || '[]');
    const selectedRange = customRanges.find(range => range.positionCombo === positionCombo);
    return selectedRange ? selectedRange.hands : null;
  } catch (error) {
    console.error(`   ❌ Error loading specific range: ${error.message}`);
    return null;
  }
}

// Test 1: Save a range
const success1 = saveRange(testRangeData, 'TEST_UTG_RANGE');
console.log(`   📈 Non-empty hands: ${Object.entries(testRangeData).filter(([_, freq]) => freq.raise > 0 || freq.call > 0).length}`);

// Test 2: Save another range
const testRange2 = {
  'AA': { raise: 100, call: 0, fold: 0 },
  'KK': { raise: 100, call: 0, fold: 0 },
  'AKs': { raise: 100, call: 0, fold: 0 }
};
const success2 = saveRange(testRange2, 'TEST_TIGHT_RANGE');

console.log('\n2. 📂 Testing load functionality...');

// Test 3: Load available ranges
const availableRanges = loadCustomRanges();
console.log(`   📋 Available custom ranges: [${availableRanges.join(', ')}]`);

// Test 4: Load specific range
const loadedRange = loadSpecificRange('TEST_UTG_RANGE');
if (loadedRange) {
  console.log(`   ✅ Successfully loaded range with ${Object.keys(loadedRange).length} hands`);
  console.log(`   🃏 Sample hands: ${Object.keys(loadedRange).slice(0, 3).join(', ')}`);
} else {
  console.log('   ❌ Failed to load range');
}

console.log('\n3. 🔄 Testing overwrite functionality...');

// Test 5: Overwrite existing range
const modifiedRange = { ...testRangeData, 'JJ': { raise: 100, call: 0, fold: 0 } };
const success3 = saveRange(modifiedRange, 'TEST_UTG_RANGE'); // Same name as before

// Verify overwrite worked
const reloadedRange = loadSpecificRange('TEST_UTG_RANGE');
const hasJJ = reloadedRange && 'JJ' in reloadedRange;
console.log(`   ${hasJJ ? '✅' : '❌'} Range overwrite ${hasJJ ? 'successful' : 'failed'} - JJ ${hasJJ ? 'found' : 'not found'}`);

console.log('\n4. 📊 Final Summary:');
console.log(`   💾 Total ranges saved: ${loadCustomRanges().length}`);
console.log(`   🔧 Save functionality: ${success1 && success2 && success3 ? 'WORKING' : 'ISSUES DETECTED'}`);
console.log(`   📂 Load functionality: ${availableRanges.length > 0 && loadedRange ? 'WORKING' : 'ISSUES DETECTED'}`);

console.log('\n🎉 Range Builder save/load functionality test complete!');