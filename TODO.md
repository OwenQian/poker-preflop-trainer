# Preflop Trainer - TODO

## Current Tasks

### High Priority
- [x] **Build Range Builder Dev Tool** - Create interactive range creation and editing tool for developers
- [x] **Organize and Unify Range Data Structure** - Reorganize range files into proper folder structure
- [x] **Add frequency answer bar** - fix it so it doesn't give the answer away, add this to all quiz modes, in randomizer mode indicate on the bar where the rolled number is.
- [ ] **Redesign Home Page For Range Viewing** - Restructure home page to focus on range viewing
- [ ] **Audit and fix ranges in non-RFI tabs** - Review and correct range data for vs RFI, RFI vs 3bet, and vs Limp categories
- [ ] **Create Postflop Visualizer** - Build dedicated postflop analysis page with flop selection and equity visualization

### Backlog
- [ ] **Make the preflop quiz work** - Implement the quiz functionality to allow users to practice preflop decisions with spaced repetition learning
  - need to support export and import of spaced repetition state, since local storage is not durable

### Range Builder Dev Tool Implementation Plan
- [x] **Phase 1: Core Infrastructure** ✅ COMPLETE
  - [x] ✅ Create basic RangeBuilder component structure and styling
  - [x] ✅ Implement action selector panel (Always Raise, Mixed Frequency Raise, Always Call, Always Fold, etc.)
  - [x] ✅ Add RangeBuilder to App.tsx with toggle button to access dev tool
  - [x] ✅ Build interactive 13x13 poker hand matrix grid component
  - [x] ✅ Add click handler to set hand actions based on selected tool

- [x] **Phase 3: Export & Visualization** ✅ COMPLETE 
  - [x] ✅ Build "View" popup modal to display range data structure
  - [x] ✅ Implement "Copy to Clipboard" functionality for range export
  - [x] ✅ Add JSON/TypeScript format output generation  
  - [x] ✅ Create range summary statistics (total combos, percentage)
  
- [x] **Phase 2: Data Management** ✅ COMPLETE
  - [x] ✅ Create range state management system to track hand frequencies
  - [x] ✅ Build hand name mapping utilities (AA, AKs, AKo, etc.)
  - [x] ✅ Implement frequency input controls for mixed strategies
  - [x] ✅ Add range validation and consistency checks (export validation)
  
- [ ] **Phase 4: Enhanced Features** (IN PROGRESS)
  - [x] ✅ Add preset loading (import existing ranges for editing)
  - [x] ✅ Implement undo/redo functionality
  - [x] ✅ Enable deselection on repeated clicks (set to Always Fold) and implement click-and-drag multi-cell selection
  - [x] ✅ Add "Not in Range" action support with visual distinction (darker gray for hands not in starting range)
  - [x] ✅ Copy to clipboard and view range should correctly show hands that are 100% folds as opposed to not in range.
  - [x] ✅ Factor in frequencies that hands are in the previous range. E.g., if a hand is RFI 50% then in the RFI vs 3bet range it's only there 50% of the time not 100% which should be reflected in the combo count. It should reflect in the total number of combos in the subrange, and if a 50% frequency hand is 50% raise, 50% call, then that should end up as 25% raise, 25% call when counting the number of combos in the subrange that raise and call respectively.
  - [ ] **Add Parent Range System for Game Tree Structure** - Implement ability to specify parent ranges for proper poker decision tree modeling
    - [ ] Add `parentRange` field to range data structure to track decision tree dependencies
    - [ ] Implement parent range lookup system (e.g., CO RFI is parent of CO RFI vs 3bet)
    - [ ] Support multi-level dependencies: vs 4bet ranges are descendants of 3bet portions of vs RFI ranges
    - [ ] Example game tree paths:
      - CO RFI → BU 3bet → CO faces 3bet (CO RFI vs 3bet range weighted by CO RFI frequencies)
      - CO RFI → BU 3bet → BU faces 4bet (BU vs 4bet range weighted by BU 3bet frequencies from BU vs RFI range)
    - [ ] Update frequency weighting to traverse full decision tree path for accurate combo calculations
    - [ ] Add UI to display decision tree context and parent range information
  - [ ] 🔄 NEXT: Add range comparison mode
  - [ ] Create export formats (JSON, CSV, TypeScript interface)


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

### Critical Range Data Fixes Needed
- [ ] **Completely rebuild Jon Little range conversion** - The ranges for vs RFI, and vs 3bet are incorrect
  - [ ] Manually edit and save the ranges to correct them
  - [ ] Maintain position-specific matchups (bb.vsUtg vs bb.vsBtn, etc.)
  - [ ] Add proper bet sizing guideline (3 bet to 3x the bet when IP and 4x the bet when OOP) to the front page

- [ ] **Re-examine vs-limp ranges** - Current PNG extraction may be inaccurate
  - [ ] Manually edit and save the ranges to correct them
  - [ ] Add bet sizing guideline vs limpers 6bb sizing (4bb + 2×limpers)

- [ ] **Update application architecture** to handle sophisticated range data
  - [ ] Modify data structures to support action-specific ranges (3bet vs call)
  - [ ] Update HandMatrix color coding for mixed strategies, should be like the range builder tool, within a cell when there's a mixed strategy, the cell is split into 3 sections: the left bar shows raise frequency, the middle bar shows call frequency, and the right bar shows fold frequency

### Postflop Visualizer Implementation Plan
- [ ] **Phase 1: Core Infrastructure**
  - [ ] Create PostflopVisualizer component with routing
  - [ ] Add navigation button to home page
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


### Implementation Details for Quiz Feature
- [ ] Fix quiz question generation logic
- [ ] Implement proper card display in quiz mode
- [ ] Connect FSRS (spaced repetition) system
- [ ] Add answer evaluation and feedback
- [ ] Test quiz flow with all position combinations
- [ ] Re-enable the "Start Quiz" button once functionality is working

### Home Page Restructure Implementation Plan
- [ ] **Phase 1: Navigation Changes**
  - [x] Change "Start Quiz" button to "Spaced Repetition Quiz"
  - [x] Create separate quiz settings page with routing
  - [x] Move quiz settings from bottom of current page to dedicated page
  
- [ ] **Phase 2: Home Page Focus**
  - [ ] Expand range visualization as primary feature
  - [x] Add postflop visualizer navigation button
  - [ ] Enhance range matrix display for home page viewing, especially for mobile

### Notes
- Quiz settings UI is complete and positioned at bottom of page
- Position selector and hand matrix are working correctly
- Range data is properly loaded and displayed
- Need to debug the quiz generation and card rendering systems

## Completed

### GitHub Pages Deployment ✅
- [x] **Fix GitHub Pages deployment pipeline** - Successfully resolved deprecated GitHub Actions versions
  - **Solution**: Updated to latest stable versions (configure-pages@v5, upload-pages-artifact@v3, deploy-pages@v4)
  - **Repository URL**: https://github.com/OwenQian/poker-preflop-trainer
  - **Live Site URL**: https://owenqian.github.io/poker-preflop-trainer/
  - **Status**: Deployment pipeline now working successfully with both commits ba6ec6f and 7271377 passing CI

### Jon Little Range Integration ✅
- [x] Convert Jon Little JS range files to TypeScript format and integrate with existing data structure
- [x] Create RangeTabSelector component with tabs for RFI, vs RFI, RFI vs 3bet, vs Limp
- [x] Update HandMatrix component to accept and display different range categories
- [x] Extend getRangeData function to handle multiple range categories
- [x] Update quiz generation logic to work with new range types
- [x] Add tab state management and persistence to App.tsx
- [x] Test all functionality and ensure existing RFI ranges remain unchanged
- [x] Fix BB RFI issue with proper "No range data available" messaging
- [x] Populate vs-limp ranges using data extracted from upswing-live-ranges PNG files
- [x] Add (WIP) labels to non-RFI tabs to indicate work-in-progress status
- [x] Update CLAUDE.md architecture documentation with new components and range system

### Range Data Organization ✅
- [x] **Organize and Unify Range Data Structure** - Successfully reorganized range files into proper folder structure
  - **Phase 1: Analysis & Planning** ✅ COMPLETE
    - ✅ Analyzed current range file structure (jonLittleRanges.ts, ranges/*, sampleRanges.ts, zenithRanges.ts)
    - ✅ Mapped out which ranges belong in which categories (RFI, vs RFI, RFI vs 3bet, vs Limp)
    - ✅ Identified files that import/export ranges and will need updates

  - **Phase 2: Create New Folder Structure** ✅ COMPLETE
    - ✅ Created `src/data/ranges/RFI/` folder for all RFI ranges (UTG, UTG+1, LJ, HJ, CO, BU, SB)
    - ✅ Created `src/data/ranges/vsRFI/` folder for defending against RFI ranges (BB vs UTG, SB vs CO, etc.)
    - ✅ Created `src/data/ranges/RFI-vs-3bet/` folder for 4bet/call ranges when facing 3bets
    - ✅ Created `src/data/ranges/vsLimp/` folder for isolation ranges against limpers

  - **Phase 3: Move and Reorganize Range Files** ✅ COMPLETE
    - ✅ Moved position-specific RFI ranges from `ranges/` to `ranges/RFI/`
    - ✅ Extracted vs RFI ranges from `jonLittleRanges.ts` to separate files in `ranges/vsRFI/`
    - ✅ Extracted RFI vs 3bet ranges from `jonLittleRanges.ts` to separate files in `ranges/RFI-vs-3bet/`
    - ✅ Moved vs Limp ranges to `ranges/vsLimp/` folder
    - ✅ Created unified index files for each category

  - **Phase 4: Update Import/Export System** ✅ COMPLETE
    - ✅ Updated `sampleRanges.ts` to import from new structure
    - ✅ Updated all components that import range data
    - ✅ Created category-specific aggregation files (e.g., `ranges/RFI/index.ts`)
    - ✅ Ensured backward compatibility during transition

  - **Phase 5: Testing & Verification** ✅ COMPLETE
    - ✅ Tested build compilation after reorganization
    - ✅ Verified all range categories display correctly in UI
    - ✅ Ensured quiz generation works with new structure
    - ✅ Tested range builder dev tool with new organization

  **Final Results:**
  - **27 range files** created across 4 organized categories
  - **7 dependent files** updated with new import paths
  - **Build successful** with no TypeScript errors
  - **Backward compatibility** maintained through sampleRanges.ts
  - **Data integrity** preserved for all hand frequencies and mixed strategies
