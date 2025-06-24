// Complete list of all 169 possible starting poker hands in standard notation
// Used for identifying missing hands in poker range data

const ALL_POKER_HANDS = [
  // Pocket pairs (13 hands)
  'AA', 'KK', 'QQ', 'JJ', 'TT', '99', '88', '77', '66', '55', '44', '33', '22',
  
  // Suited hands (78 hands) - sorted by high card, then by kicker descending
  // Ace suited
  'AKs', 'AQs', 'AJs', 'ATs', 'A9s', 'A8s', 'A7s', 'A6s', 'A5s', 'A4s', 'A3s', 'A2s',
  
  // King suited
  'KQs', 'KJs', 'KTs', 'K9s', 'K8s', 'K7s', 'K6s', 'K5s', 'K4s', 'K3s', 'K2s',
  
  // Queen suited
  'QJs', 'QTs', 'Q9s', 'Q8s', 'Q7s', 'Q6s', 'Q5s', 'Q4s', 'Q3s', 'Q2s',
  
  // Jack suited
  'JTs', 'J9s', 'J8s', 'J7s', 'J6s', 'J5s', 'J4s', 'J3s', 'J2s',
  
  // Ten suited
  'T9s', 'T8s', 'T7s', 'T6s', 'T5s', 'T4s', 'T3s', 'T2s',
  
  // Nine suited
  '98s', '97s', '96s', '95s', '94s', '93s', '92s',
  
  // Eight suited
  '87s', '86s', '85s', '84s', '83s', '82s',
  
  // Seven suited
  '76s', '75s', '74s', '73s', '72s',
  
  // Six suited
  '65s', '64s', '63s', '62s',
  
  // Five suited
  '54s', '53s', '52s',
  
  // Four suited
  '43s', '42s',
  
  // Three suited
  '32s',
  
  // Offsuit hands (78 hands) - sorted by high card, then by kicker descending
  // Ace offsuit
  'AKo', 'AQo', 'AJo', 'ATo', 'A9o', 'A8o', 'A7o', 'A6o', 'A5o', 'A4o', 'A3o', 'A2o',
  
  // King offsuit
  'KQo', 'KJo', 'KTo', 'K9o', 'K8o', 'K7o', 'K6o', 'K5o', 'K4o', 'K3o', 'K2o',
  
  // Queen offsuit
  'QJo', 'QTo', 'Q9o', 'Q8o', 'Q7o', 'Q6o', 'Q5o', 'Q4o', 'Q3o', 'Q2o',
  
  // Jack offsuit
  'JTo', 'J9o', 'J8o', 'J7o', 'J6o', 'J5o', 'J4o', 'J3o', 'J2o',
  
  // Ten offsuit
  'T9o', 'T8o', 'T7o', 'T6o', 'T5o', 'T4o', 'T3o', 'T2o',
  
  // Nine offsuit
  '98o', '97o', '96o', '95o', '94o', '93o', '92o',
  
  // Eight offsuit
  '87o', '86o', '85o', '84o', '83o', '82o',
  
  // Seven offsuit
  '76o', '75o', '74o', '73o', '72o',
  
  // Six offsuit
  '65o', '64o', '63o', '62o',
  
  // Five offsuit
  '54o', '53o', '52o',
  
  // Four offsuit
  '43o', '42o',
  
  // Three offsuit
  '32o'
];

// Verification: Should be exactly 169 hands
console.log(`Total hands: ${ALL_POKER_HANDS.length}`);
console.log(`Breakdown:`);
console.log(`  Pocket pairs: 13`);
console.log(`  Suited hands: 78`);
console.log(`  Offsuit hands: 78`);
console.log(`  Total: 13 + 78 + 78 = 169`);

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = ALL_POKER_HANDS;
}

// Also make available as a global variable
if (typeof window !== 'undefined') {
  window.ALL_POKER_HANDS = ALL_POKER_HANDS;
}

export default ALL_POKER_HANDS;