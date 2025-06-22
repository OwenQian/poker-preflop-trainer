# Preflop Trainer - TODO

## Current Tasks

### High Priority
- [ ] **Make the preflop quiz work** - Implement the quiz functionality to allow users to practice preflop decisions with spaced repetition learning
- [ ] **Audit and fix ranges in non-RFI tabs** - Review and correct range data for vs RFI, RFI vs 3bet, and vs Limp categories

### Implementation Details for Quiz Feature
- [ ] Fix quiz question generation logic
- [ ] Implement proper card display in quiz mode
- [ ] Connect FSRS (spaced repetition) system
- [ ] Add answer evaluation and feedback
- [ ] Test quiz flow with all position combinations
- [ ] Re-enable the "Start Quiz" button once functionality is working

### Range Data Audit Tasks
- [ ] **vs RFI ranges** - Verify 3bet/call frequencies and position-specific adjustments
- [ ] **RFI vs 3bet ranges** - Validate 4bet/call ranges when facing 3bets
- [ ] **vs Limp ranges** - Cross-check extracted PNG data with strategic guidelines
- [ ] Test all range categories display correctly in HandMatrix
- [ ] Ensure color coding matches range category expectations

### Critical Range Data Fixes Needed
- [ ] **Completely rebuild Jon Little range conversion** - Current conversion is fundamentally flawed
  - [ ] Preserve separate action arrays (threebet, call, fourbet) instead of combined frequencies
  - [ ] Maintain position-specific matchups (bb.vsUtg vs bb.vsBtn, etc.)
  - [ ] Implement mixed strategy frequencies from source data instead of binary 100% assignments
  - [ ] Handle SB's special limp/3bet strategy with AA/KK/AKo properly
  - [ ] Add proper bet sizing context (2.5bb IP vs 3.5bb OOP)
  - [ ] Cross-reference against source PDF: `jon-little-extracted-ranges/source-Jonathan-little-full-preflop-charts.pdf`

- [ ] **Re-examine vs-limp ranges** - Current PNG extraction may be inaccurate
  - [ ] Carefully re-analyze each PNG file in `upswing-live-ranges/vs-limp/`
  - [ ] Cross-reference vs-limp strategy notes from README
  - [ ] Verify 6bb sizing (4bb + 2×limpers) is correctly represented
  - [ ] Ensure ranges follow pattern: "between RFI and vs-RFI 3betting range"

- [ ] **Update application architecture** to handle sophisticated range data
  - [ ] Modify data structures to support action-specific ranges (3bet vs call)
  - [ ] Update HandMatrix color coding for mixed strategies
  - [ ] Enhance getRangeData function for complex lookups
  - [ ] Add support for frequency-based displays rather than binary actions

### Notes
- Quiz settings UI is complete and positioned at bottom of page
- Position selector and hand matrix are working correctly
- Range data is properly loaded and displayed
- Need to debug the quiz generation and card rendering systems

## Completed

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