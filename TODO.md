# Preflop Trainer - TODO

## Current Tasks

### High Priority
- [x] **Build Range Builder Dev Tool** - Create interactive range creation and editing tool for developers
- [ ] **Redesign Home Page** - Restructure home page to focus on range viewing with separate quiz page access
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
  - [ ] 🔄 NEXT: Add range comparison mode
  - [ ] Create export formats (JSON, CSV, TypeScript interface)

### Implementation Details for Quiz Feature
- [ ] Fix quiz question generation logic
- [ ] Implement proper card display in quiz mode
- [ ] Connect FSRS (spaced repetition) system
- [ ] Add answer evaluation and feedback
- [ ] Test quiz flow with all position combinations
- [ ] Re-enable the "Start Quiz" button once functionality is working

### Range Data Audit Tasks
- [x] **Add RFI bet sizing guidance** - Add bet sizing information to Range Explorer under RFI tab
  - Live poker: raise to 3-4bb
  - Online poker: raise to 2.5bb from everywhere except the SB where you raise to 3bb
- [ ] **vs RFI ranges** - Verify 3bet/call frequencies and position-specific adjustments
- [ ] **RFI vs 3bet ranges** - Validate 4bet/call ranges when facing 3bets
- [ ] **vs Limp ranges** - Cross-check extracted PNG data with strategic guidelines
- [ ] Test all range categories display correctly in HandMatrix
- [ ] Ensure color coding matches range category expectations

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

### Home Page Restructure Implementation Plan
- [ ] **Phase 1: Navigation Changes**
  - [ ] Change "Start Quiz" button to "Spaced Repetition Quiz"
  - [ ] Create separate quiz settings page with routing
  - [ ] Move quiz settings from bottom of current page to dedicated page
  
- [ ] **Phase 2: Home Page Focus**
  - [ ] Remove quiz-related elements from home page
  - [ ] Expand range visualization as primary feature
  - [ ] Add postflop visualizer navigation button
  - [ ] Enhance range matrix display for home page viewing

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
