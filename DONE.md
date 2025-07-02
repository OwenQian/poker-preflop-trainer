Don't pay too much attention to this file. This is just for moving tasks from TODO.md after they've been completed to keep it tidy.
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

## Completed
- [x] Connect FSRS (spaced repetition) system
- [x] **Add due cards count display above Start Quiz button** ✅ COMPLETE
- [x] **Implement days ahead number input with dynamic due count updates** ✅ COMPLETE
- [x] **Add sampling mode selector (Random vs Spaced Repetition)** ✅ COMPLETE
- [x] **Integrate FSRS getDueCards functionality** ✅ COMPLETE
- [x] **Update hand generator to support FSRS-based sampling** ✅ COMPLETE
- [x] **Add state persistence for new FSRS settings** ✅ COMPLETE

#### FSRS Integration Implementation Summary
**✅ COMPLETED - FSRS Quiz Setup Integration**

The following FSRS (spaced repetition) features have been successfully implemented:

**New UI Features:**
- **Due Cards Display**: Shows count of cards ready for review (e.g., "5 cards due for review (of 50 total)") - **Only appears when Spaced Repetition mode is selected**
- **Days Ahead Selector**: Number input (0-365) with up/down controls to review cards due in future days - **Only appears when Spaced Repetition mode is selected**
- **Sampling Mode Selector**: Radio buttons for "Random" vs "Spaced Repetition" hand selection
- **Dynamic Updates**: Due count updates automatically when days ahead value changes

**Technical Implementation:**
- **FSRS Integration**: Created `src/utils/fsrs/quizIntegration.ts` with core FSRS functions
- **Smart Hand Sampling**: Modified `generateQuizQuestion()` to support FSRS-based weighted selection
- **Progress Tracking**: Enhanced hand progress system to track difficulty and due dates
- **State Persistence**: Added `samplingMode` and `daysAhead` to user settings with localStorage persistence

**Hand Selection Logic:**
- **Random Mode**: Original random selection (unchanged behavior)
- **Spaced Repetition Mode**: Intelligent weighting system:
  - Due cards: 5x priority weight
  - New cards: 3x priority weight  
  - Difficult cards (high difficulty/lapses): 2x priority weight
  - Regular review cards: 1x priority weight

**UI Location**: All new features appear in the quiz setup page above the "Start Quiz" button when a range is selected.

**Data Integration**: Full integration with existing state manager for export/import of FSRS progress data.

#### Recent Critical Fixes (Latest Updates)
**✅ COMPLETED - Critical FSRS Improvements**

1. **Days Ahead Default**: Confirmed default value is 0 for spaced repetition mode
2. **Remaining Cards Display**: Added remaining cards count in quiz interface during spaced repetition sessions
3. **Missing Hand Treatment**: **CRITICAL FIX** - Spaced repetition now properly includes fold:100 hands
   - When `missingHandTreatment: 'fold'`, all 169 possible hands are included in FSRS sampling
   - Hands not explicitly in range data are treated as `{ raise: 0, call: 0, fold: 100 }`
   - This ensures players practice fold decisions on weak hands, not just action hands
   - **Most Important**: Ensures complete range coverage for optimal learning

#### UI and Tracking Improvements (Latest Updates)
**✅ COMPLETED - Enhanced Remaining Cards UI & Tracking**

1. **Improved Due Cards Tracking**: Enhanced algorithm to properly track rescheduled cards
   - Fixed issue where hands weren't being removed from review sample correctly
   - Better separation of new, due, and scheduled cards
   - Real-time updates when cards get rescheduled after answers

2. **Hover Overlay for Remaining Cards**: Interactive visual grid showing remaining cards
   - **Hover over "Remaining: X"** to see detailed 13x13 hand matrix
   - **Color-coded visualization**: Red (overdue), Orange (due today), Green (new)
   - **Category breakdown**: Shows counts for overdue, due, and new cards
   - **Real-time updates**: Overlay updates immediately after cards are answered

3. **Enhanced User Feedback**: Better visual indicators and real-time updates
   - Dotted underline on "Remaining" text to indicate it's hoverable
   - Immediate count updates when cards are rescheduled
   - Clear visual distinction between different card states

- [x] **Fix FSRS Over-Scheduling and Stuck Cards Issue** ✅ COMPLETE - Cards getting reviewed 6-28 times per session and never leaving schedule
  - [x] **Phase 1: Fix FSRS Rating System** ✅ COMPLETE - Proper wrong=1, correct=3 rating system
  - [x] **Phase 2: Optimize FSRS Parameters** ✅ COMPLETE - Poker-specific parameters for 2-3 reviews per new card
  - [x] **Phase 3: Improve Strict Mode** ✅ COMPLETE - Partial credit based on percentage of correct actions selected
  - [x] **Phase 4: Fix Sampling/Visualization Consistency** ✅ COMPLETE - Centralized range resolution with debug logging
  - [x] **Phase 5: Add FSRS Monitoring** ✅ COMPLETE - Debug panel, stuck card detection, manual reset functionality
  - [x] **Phase 6: Enhanced Features** ✅ COMPLETE - Session limits, review intensity controls

#### FSRS Overhaul Implementation Summary
**✅ COMPLETED - Major FSRS Algorithm Fixes**

**Problem Solved:** Cards were getting reviewed 6-28+ times per session without leaving the schedule, creating infinite loops and poor user experience.

**Root Causes Identified:**
1. **Binary rating system** (only 1 or 3) caused cards to get stuck in learning loops
2. **Aggressive default parameters** designed for general knowledge, not poker training
3. **Strict mode penalties** caused repeated failures and short intervals
4. **Sampling/visualization inconsistency** showed wrong cards as "due"
5. **No monitoring tools** to detect or fix stuck cards

**Solutions Implemented:**

**🎯 FSRS Algorithm Improvements:**
- **Poker-Optimized Parameters**: Custom weights designed for 2-3 reviews per new card
- **Smarter Intervals**: New cards graduate in 3 days, wrong answers get 2.4 hours
- **Partial Credit for Strict Mode**: Rating based on percentage of correct actions (60%+ = rating 2, 100% = rating 3)
- **Learning Graduation**: Cards need 2+ correct answers to leave learning state

**🔧 Monitoring & Control Tools:**
- **FSRS Debug Panel**: Shows all card states, difficulties, intervals, and review counts
- **Stuck Card Detection**: Automatically identifies cards with >5 reviews or >3 lapses
- **Manual Reset Functionality**: Reset individual cards or all stuck cards
- **Comprehensive Logging**: Debug console output for sampling vs visualization consistency

**⚙️ Enhanced User Experience:**
- **Session Limits**: Configurable limit (10-200) with break reminders 
- **Session Hand Tracking**: Visual indicators showing review counts in overlay
- **Centralized Range Resolution**: Consistent sampling and visualization logic
- **Real-time Updates**: Immediate feedback when cards are rescheduled

**📊 Results Expected:**
- New cards: 2-3 reviews if answered correctly
- Wrong cards: 2-3 correct answers needed to graduate
- Maximum session protection against over-reviewing
- Clear visibility into algorithm behavior
- Manual control over problematic cards
- [x] **Build Range Builder Dev Tool** - Create interactive range creation and editing tool for developers
- [x] **Organize and Unify Range Data Structure** - Reorganize range files into proper folder structure
- [x] **Add frequency answer bar** - fix it so it doesn't give the answer away, add this to all quiz modes, in randomizer mode indicate on the bar where the rolled number is.
- [x] **Redesign Home Page For Range Viewing** - Restructure home page to focus on range viewing

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
