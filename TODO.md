# Preflop Trainer - TODO

## Current Tasks
- [x] Scan through the codebase for TODO comments and add them to this file as the top of the high priority.

### High Priority
- [x] Fix problems with spaced repetition / FSRS algorithm problems.
- [x] Handling of missingHandTreatment should be done in `getRangeData()`
- [x] Setting of missingHandTreatment by grouping. E.g., set in index.ts, then individual files like `CO-vs-SB-3bet.ts` can explicitly set it to override the folder wide setting.
- [x] Add support for 4bet vs 5bet ranges in A) the home page range explorer, fix bugs where the quiz for these aren't working. CO 3bet vs BU jam is currently in the `RFI-vs-3bet` folder.
- [ ] Implement parent range feature so that the sampler will know what the full range is and thus sample hands that are 100% frequency folds.
  - If a hand is in the parent range but doesn't appear in the child range, then the program should treat that as if it's a 100% fold.
  - This behavior is related to the treatment missingHandTreatment: 'fold'. However, instead of treating any of the missing 169 hands as fold, it treats missing hands in the parent range as 100% fold. Since the behavior is related, the implementation should be cohesive between the two.
  - Add a new missingHandTreatment option: "parent". When this is set then the behavior will be to treat hands that are in the parent range but not in the child range as fold:100%. Should also add a field to specify which range is the parent. If no parent is explicitly specified, default to a parent range of 100% of hands (169) in which case the behavior would be equivalent to missingHandTreatment: fold.
- [x] If the primary range can't be found in `quizIntegration` then display an error instead of falling back to a range.
- [ ] Create test suite for FSRS spaced repetition to test that it's working correctly.
- [ ] **Create Postflop Visualizer** - Build dedicated postflop analysis page with flop selection and equity visualization

### Backlog
- [ ] **Make the preflop quiz work** - Implement the quiz functionality to allow users to practice preflop decisions with spaced repetition learning
  - need to support export and import of spaced repetition state, since local storage is not durable
- [ ] **Experiment with discrete review intensity modes** - Light Review vs Repetitive Review parameter sets (hidden from users)
- [x] **Bring frequency bars to all quiz modes** - Add probability visualization to strict and lax modes

### Spaced repetition / FSRS problems
- Bugs
  - [x] The remaining cards to review display and the sampler have a discrepancy. The sampler should only be drawing from hands that are due or new but for some reason hands that aren't due are being sampled.
  - [x] The 3bet vs 4bet quiz isn't reading the data correctly. When CO 4bet vs BU jam quiz is selected, the `BB 3BET vs SB 4BET` range gets loaded instead.
  - [ ] After the pop up that ends the quiz, the stats on the page don't reset until the page is refreshed. So if a spaced repetition quiz just ended because there were no more scheduled cards then we go back to the quiz setup page, that page still shows that the 1 card is due for review. Seems to just be a text update problem because trying to start the quiz again does correctly get stopped by the pop up.
- UI improvements
  - [ ] spaced repetition sampling should be the default instead of random
  - [ ] FSRS debug panel should be able to sort by any of the columns by clicking on the column title. Clicking once sorts it by descending, clicking it again reverse it to sort by ascending.
  - [ ] FSRS debug panel should have a more descriptive title to indicate which range we're looking at. Situation e.g., CO RFI vs 3bet vs BU. Strictness: Lax.

### Parent-Child Range Relationship
  - [ ] **Add Parent Range System for Game Tree Structure** - Implement ability to specify parent ranges for proper poker decision tree modeling
    - [ ] Add `parentRange` field to range data structure to track decision tree dependencies
    - [ ] Implement parent range lookup system (e.g., CO RFI is parent of CO RFI vs 3bet)
    - [ ] Support multi-level dependencies: vs 4bet ranges are descendants of 3bet portions of vs RFI ranges
    - [ ] Example game tree paths:
      - CO RFI → BU 3bet → CO faces 3bet (CO RFI vs 3bet range weighted by CO RFI frequencies)
      - CO RFI → BU 3bet → BU faces 4bet (BU vs 4bet range weighted by BU 3bet frequencies from BU vs RFI range)
    - [ ] Update frequency weighting to traverse full decision tree path for accurate combo calculations
    - [ ] Add UI to display decision tree context and parent range information


### Range Data Audit Tasks
- [x] **Add RFI bet sizing guidance** - Add bet sizing information to Range Explorer under RFI tab
  - Live poker: raise to 3-4bb
  - Online poker: raise to 2.5bb from everywhere except the SB where you raise to 3bb
- [x] **Separate Fold vs not in range** - change the data structure to store what the initial starting range is and visually distinguish between hands that are in the range and should fold vs hands that weren't in the range in the first place.
  - ✅ **Implemented visual distinction**: Hands not in range show as darker gray (#606060), hands in range that fold show as lighter gray (#9e9e9e)
  - ✅ **Updated legend**: Added separate legend items for "Fold (in range)" and "Not in range"
  - ✅ **Enhanced Range Builder**: Added "Not in Range" action button to remove hands from range entirely
- [x] **Show total frequency of each action as % of range** - currently we show x/1326 as the total number of hands that are not folding, I also want to see more stats, where the denominator is the total number of combinations in the range. I want call%, raise%, fold%.
  - ✅ **Enhanced statistics display**: Added range breakdown showing "Range: X combos | Raise: X% | Call: X% | Fold: X%"
  - ✅ **Maintained backward compatibility**: Still shows traditional "X/1326 combos (X%)" alongside new range-based statistics
  - ✅ **Dynamic calculation**: Percentages calculated relative to hands actually in the range, not all 1326 possible combinations
- [ ] Test all range categories display correctly in HandMatrix
- [ ] Ensure color coding matches range category expectations

#### To be done manually
- [ ] **vs RFI ranges** - Verify 3bet/call frequencies and position-specific adjustments
- [ ] **RFI vs 3bet ranges** - Validate 4bet/call ranges when facing 3bets
- [x] **vs Limp ranges** - Cross-check extracted PNG data with strategic guidelines

### Postflop Visualizer Implementation Plan
- [ ] **Phase 1: Core Infrastructure**
  - [x] Add navigation button to home page
  - [ ] Parse and load 95-flop subset data from piosolver-flop-subsets/95-flop-subset.txt
  - [ ] Create flop selector dropdown with frequency weighting display
  
- [ ] **Phase 2: Hand Classification System**
  - [ ] Implement hand strength evaluation for each group (1a, 1b, 2a, 2b, 3a, 3b, 4)
  - [ ] Create hand classification logic for any given board texture
  - [ ] Build visual hand breakdown display component
  
- [ ] **Phase 3: Percentile vs Percentile Overlay**
  - [ ] Create chart component with percentile (x-axis) vs equity (y-axis)
  - [ ] Implement range vs range equity calculations
  - [ ] Add interactive overlay visualization for range comparison
  
- [ ] **Phase 4: Integration & Polish**
  - [ ] Connect postflop visualizer with existing preflop range data
  - [ ] Add responsive design for mobile/desktop
  - [ ] Test equity calculations and hand classifications


### Mobile usability
- [ ] **Mobile usability**
  - [ ] Enhance range matrix display for home page viewing, especially for mobile

