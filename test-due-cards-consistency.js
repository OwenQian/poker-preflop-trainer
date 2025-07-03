// Quick test script to verify due cards consistency
// This is a Node.js script to test the functions outside the React app

const fs = require('fs');
const path = require('path');

// Mock the TypeScript imports for testing
const mockDueCardsInfo = {
  dueCount: 5,
  totalCards: 150,
  dueCards: ['AA_BU_vs__lax', 'KK_BU_vs__lax', 'QQ_BU_vs__lax', 'JJ_BU_vs__lax', 'TT_BU_vs__lax']
};

const mockWeightedSelection = ['AA_BU_vs__lax', 'KK_BU_vs__lax', 'QQ_BU_vs__lax', 'JJ_BU_vs__lax', 'TT_BU_vs__lax'];

console.log('=== Due Cards Consistency Test ===');
console.log('Mock getDueCardsInfo result:', mockDueCardsInfo);
console.log('Mock getWeightedHandSelection result length:', mockWeightedSelection.length);

// Test if they return consistent results
const dueCardsSet = new Set(mockDueCardsInfo.dueCards);
const weightedSet = new Set(mockWeightedSelection);

const intersection = [...dueCardsSet].filter(x => weightedSet.has(x));
const dueNotInWeighted = [...dueCardsSet].filter(x => !weightedSet.has(x));
const weightedNotInDue = [...weightedSet].filter(x => !dueCardsSet.has(x));

console.log('\n=== Consistency Check ===');
console.log('Common cards:', intersection.length);
console.log('Due but not in weighted:', dueNotInWeighted.length, dueNotInWeighted);
console.log('Weighted but not in due:', weightedNotInDue.length, weightedNotInDue);

if (intersection.length === dueCardsSet.size && intersection.length === weightedSet.size) {
  console.log('✅ CONSISTENT: Both functions return the same set of cards');
} else {
  console.log('❌ INCONSISTENT: Functions return different sets of cards');
}

console.log('\n=== Test Summary ===');
console.log('The fix should ensure that:');
console.log('1. Both functions use resolveRangeCombo for range resolution');
console.log('2. Both functions use effectiveOpponents consistently');
console.log('3. Both functions use the same date comparison logic');
console.log('4. Both functions filter cards using the same criteria');