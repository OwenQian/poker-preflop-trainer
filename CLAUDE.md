# Preflop Poker Trainer - Architecture Guide for Coding Agents

## Project Overview

This is a React/TypeScript application for training poker players on preflop decisions using spaced repetition learning (FSRS-4 algorithm). The app presents poker hands and positions, allowing users to practice making optimal preflop decisions with immediate feedback and long-term progress tracking.

## Technology Stack

- **Frontend**: React 19.1.0 with TypeScript 4.9.5
- **Build Tool**: Create React App 5.0.1
- **Card Display**: `react-pokercards` library for visual card rendering
- **Memory Algorithm**: Custom FSRS-4 (Free Spaced Repetition Scheduler) implementation
- **Storage**: Browser localStorage for persistence
- **Styling**: CSS modules with component-specific stylesheets

## Project Structure

```
src/
├── components/           # React UI components
│   ├── HandMatrix/      # Poker hand range visualization
│   ├── PositionSelector/ # Poker table position selection UI
│   ├── Quiz/            # Main quiz interface
│   ├── CardDisplay/     # Playing card visual components
│   ├── RangeTabSelector/ # Tab interface for range categories
│   └── MultiRangeDisplay/ # Multi-range chart display component
├── data/                # Poker strategy data
│   ├── ranges/          # Organized range data by category
│   │   ├── RFI/         # Raise First In ranges (7 position files)
│   │   ├── vsRFI/       # Defending against RFI ranges (9 position files)
│   │   ├── RFI-vs-3bet/ # Responding to 3-bets (4 position files)
│   │   ├── vsLimp/      # Isolating limpers (7 position files)
│   │   └── index.ts     # Master export for all range categories
│   ├── sampleRanges.ts  # Range data interface and aggregation (central hub)
│   ├── zenithRanges.ts  # Legacy compatibility layer
│   └── jonLittleRanges.ts # Legacy file (data moved to ranges/ folder)
├── types/               # TypeScript type definitions
│   └── index.ts         # All application types
├── utils/               # Utility functions and algorithms
│   ├── fsrs/           # Spaced repetition algorithm
│   ├── storage/        # localStorage management
│   ├── handGenerator.ts # Quiz question generation
│   └── gradingSystem.ts # Answer evaluation logic
├── hooks/               # Custom React hooks (currently empty)
├── App.tsx             # Main application component
├── App.css             # Global styles
└── index.tsx           # Application entry point
```

## Core Architecture Concepts

### 1. Data Models (src/types/index.ts)

**Key Types:**
- `Position`: Poker table positions ('UTG', 'UTG+1', 'LJ', 'HJ', 'CO', 'BU', 'SB', 'BB')
- `HandName`: String representations of poker hands ("AA", "AKs", "72o")
- `HandFrequencies`: Action percentages `{raise: number, call: number, fold: number}`
- `RangeData`: Position-specific hand ranges
- `FSRSCard`: Spaced repetition card data
- `QuizQuestion`: Generated practice questions
- `GradingMode`: Answer evaluation modes ('strict', 'lax', 'randomizer')
- `RangeCategory`: Range types ('RFI', 'vs RFI', 'RFI vs 3bet', 'vs Limp')

### 2. Application State Management

The app uses React hooks for state management with three main states:
- **Setup State**: Position selection and configuration
- **Quiz State**: Active learning session
- **Results State**: (Future implementation)

**Key State Variables:**
- `heroPosition`: Player's selected position
- `opponentPositions`: Opposing player positions array
- `rangeCategory`: Selected range type ('RFI', 'vs RFI', 'RFI vs 3bet', 'vs Limp')
- `gradingMode`: How answers are evaluated
- `currentQuestion`: Active quiz question
- `sessionStats`: Current session performance metrics

### 3. Range System (src/data/ranges/)

**New Organized Structure:**
The range system has been completely reorganized into a modular, category-based structure for better maintainability and scalability.

**Range Data Structure:**
```typescript
{
  positionCombo: string,  // e.g., "LJ_RFI", "BB_vs_BU_RFI"
  hands: Record<HandName, HandFrequencies>
}
```

**Organized Range Categories:**

1. **RFI (Raise First In)** - `src/data/ranges/RFI/`
   - **7 individual files**: UTG.ts, UTG1.ts, LJ.ts, HJ.ts, CO.ts, BU.ts, SB.ts
   - **Position Combos**: UTG_RFI, UTG+1_RFI, LJ_RFI, HJ_RFI, CO_RFI, BU_RFI, SB_RFI
   - **Note**: BB_RFI doesn't exist (BB is forced bet, not RFI)
   - **Source**: Consolidated from zenith ranges (detailed mixed frequencies)

2. **vs RFI (Defending against RFI)** - `src/data/ranges/vsRFI/`
   - **9 individual files**: BB-vs-UTG.ts, BB-vs-UTG2.ts, BB-vs-CO.ts, BB-vs-BU.ts, BB-vs-SB.ts, SB-vs-UTG.ts, SB-vs-BU.ts, BU-vs-CO.ts, CO-vs-HJ.ts
   - **Position Combos**: BB_vs_[position]_RFI, SB_vs_[position]_RFI, etc.
   - **Contains**: 3bet and call ranges for each opponent position
   - **Source**: Extracted from jonLittleRanges.ts

3. **RFI vs 3bet (Responding to 3-bets)** - `src/data/ranges/RFI-vs-3bet/`
   - **4 individual files**: UTG-vs-3bet.ts, BU-vs-3bet.ts, CO-vs-SB-3bet.ts, CO-vs-BU-3bet.ts
   - **Position Combos**: UTG_RFI_vs_3BET, BU_RFI_vs_3BET, CO_RFI_vs_SB_3BET, CO_RFI_vs_BU_3BET
   - **Contains**: 4bet and call ranges when facing 3-bets
   - **Source**: Extracted from jonLittleRanges.ts

4. **vs Limp (Isolating Limpers)** - `src/data/ranges/vsLimp/`
   - **7 individual files**: UTG1-vs-limp.ts, LJ-vs-limp.ts, HJ-vs-limp.ts, CO-vs-limp.ts, BU-vs-limp.ts, SB-vs-limp.ts, BB-vs-limp.ts
   - **Position Combos**: [position]_vs_LIMP for UTG+1, LJ, HJ, CO, BU, SB, BB
   - **Sizing**: 6bb raise sizing (4bb + 2×limpers)
   - **Source**: Extracted from jonLittleRanges.ts

**Import System:**
- **Central Hub**: `sampleRanges.ts` imports from organized structure
- **Category Indexes**: Each folder has index.ts for clean imports
- **Master Index**: `ranges/index.ts` exports all categories
- **Backward Compatibility**: Maintained through `sampleRanges.ts` public API

### 4. Quiz Generation (src/utils/handGenerator.ts)

**Process:**
1. Select position combination (hero vs opponents)
2. Load appropriate range data
3. Filter hands with non-zero frequencies
4. Randomly select hand
5. Generate actual Card objects
6. Determine correct actions based on frequencies

**Key Functions:**
- `generateQuizQuestion()`: Main generation logic
- `handToHandName()`: Convert Card objects to string notation
- `handNameToHand()`: Convert string notation to Card objects

### 5. Grading System (src/utils/gradingSystem.ts)

**Three Grading Modes:**

1. **Strict Mode**: Must select ALL correct actions (actions with ≥20% frequency)
2. **Lax Mode**: Must select at least ONE correct action
3. **Randomizer Mode**: Random number determines single correct action based on frequencies

**Action Threshold Logic:**
- Actions with ≥20% frequency are considered "correct"
- If no action has ≥20%, highest frequency action is correct

### 6. Spaced Repetition (src/utils/fsrs/)

**FSRS-4 Algorithm Implementation:**
- Cards have states: 'new', 'learning', 'review'
- Rating scale: 1 (Again), 2 (Hard), 3 (Good), 4 (Easy)
- Calculates stability, difficulty, and next review intervals
- Tracks performance statistics per hand

**Card Progression:**
```
New Card → Learning → Review (with lapses back to Learning)
```

### 7. Persistence Layer (src/utils/storage/)

**LocalStorage Keys:**
- `preflop_trainer_hand_progress`: FSRS card data per hand
- `preflop_trainer_settings`: User preferences
- `preflop_trainer_quiz_state`: Current session data

**Data Export/Import**: Full data backup/restore functionality

## Component Architecture

### App.tsx (Main Controller)
- **State Management**: Centralized application state
- **Navigation**: Controls app state transitions
- **Settings Persistence**: Loads/saves user preferences
- **FSRS Integration**: Updates spaced repetition data

### HandMatrix Component
- **Purpose**: Visualizes poker hand ranges as 13x13 grid with combo counting
- **Features**:
  - Displays total combinations and percentage of all 1,326 possible starting hands
  - Factors in raise frequencies (e.g., 50% frequency = 0.5x combos)
  - Combo calculation: Pocket pairs (6), Suited (4), Offsuit (12)
- **Color Coding by Range Category**:
  - **RFI**: Orange (100%), Yellow (borderline), Gray (fold)
  - **vs RFI**: Red (3-bet), Blue (call), Gray (fold) 
  - **RFI vs 3bet**: Dark Red (4-bet), Light Blue (call), Gray (fold)
  - **vs Limp**: Orange (raise), Gray (fold)

#### Missing Hand Treatment (`missingHandTreatment`)
The HandMatrix component handles missing hands differently based on the `missingHandTreatment` prop:

**Two Treatment Modes:**
1. **`'not-in-range'`** (default): Missing hands are excluded from calculations
   - Used for: Quiz display, basic range visualization
   - Range total: Only hands explicitly in range data
   - Percentages: Relative to hands in range only

2. **`'fold'`**: Missing hands treated as 100% fold
   - Used for: Complete strategy ranges (vs RFI, RFI vs 3bet)
   - Range total: Always 1,326 combos (all possible hands)
   - Percentages: Actions calculated relative to total action combos, ensuring they sum to 100%

**Frequency Calculation Logic:**
```typescript
// For hands explicitly in range data
frequencies = rangeData[handName];

// For missing hands when treatment is 'fold'
if (!frequencies && missingHandTreatment === 'fold') {
  frequencies = { raise: 0, call: 0, fold: 100 };
}

// Percentage calculation uses total action combos as denominator
const totalActionCombos = raiseCombos + callCombos + foldCombos;
raisePercentage = (raiseCombos / totalActionCombos) * 100;
```

**Dependency Range Weighting:**
- Applied only to hands explicitly in the original range data
- Missing hands (when treatment is 'fold') get full weight (1.0)
- Used for conditional ranges like "RFI vs 3bet" where action depends on prior RFI decision

### PositionSelector Component
- **Interactive Table**: Visual 8-player poker table with clickable positions
- **Seat Order**: Clockwise from BU: BU → SB → BB → UTG → UTG+1 → LJ → HJ → CO
- **Dealer Button**: Round white circle with "D" at button position
- **Blind Indicators**: 1 chip at SB, 2 chips at BB to represent blinds
- **Validation**: Prevents hero/opponent position conflicts
- **Help Text**: Position descriptions and strategic context

### RangeTabSelector Component
- **Tab Interface**: Four tabs for different range categories
- **Tooltips**: Descriptive explanations for each range type
- **State Persistence**: Selected tab saved to localStorage

### MultiRangeDisplay Component  
- **Dynamic Charts**: Shows different numbers of charts based on range category
- **RFI**: Single chart per position (excludes BB_RFI)
- **vs RFI/RFI vs 3bet**: One chart per opponent position
- **vs Limp**: Single chart with strategy notes
- **Error Handling**: Clear messaging for unavailable ranges

### Quiz Component
- **Question Display**: Hand cards and position info
- **Action Selection**: Raise/Call/Fold buttons
- **Confidence Rating**: FSRS rating scale
- **Matrix Toggle**: Show/hide range reference

## Development Guidelines

### Adding New Ranges

**NEW ORGANIZED APPROACH:**

1. **Create Individual Range File**: Add to appropriate category folder in `src/data/ranges/`
   - **RFI ranges**: Create new file in `src/data/ranges/RFI/` (e.g., `MP_RFI.ts`)
   - **vs RFI ranges**: Create new file in `src/data/ranges/vsRFI/` (e.g., `BB-vs-MP.ts`)
   - **RFI vs 3bet ranges**: Create new file in `src/data/ranges/RFI-vs-3bet/`
   - **vs Limp ranges**: Create new file in `src/data/ranges/vsLimp/`

```typescript
// Example: src/data/ranges/RFI/MP.ts
import { RangeData } from '../../../types';

const MP_RFI: RangeData = {
  positionCombo: 'MP_RFI',
  hands: {
    'AA': { raise: 100, call: 0, fold: 0 },
    'KK': { raise: 100, call: 0, fold: 0 },
    // ... rest of hands
  }
};

export default MP_RFI;
```

2. **Update Category Index**: Add export to appropriate `index.ts` file
```typescript
// src/data/ranges/RFI/index.ts
export { default as MP_RFI } from './MP';
```

3. **Automatic Integration**: The new range will be automatically included in `sampleRanges.ts` through the organized import system

4. **Testing**: Verify range appears in UI and quiz generation works

**Benefits of New Structure:**
- **Individual files** are easier to maintain and review
- **Automatic aggregation** through organized imports
- **Type safety** with individual file exports
- **Clear organization** by strategic category

### Modifying Hand Matrix Colors

Edit `getHandColor()` function in `src/components/HandMatrix/HandMatrix.tsx`. Colors adapt based on `rangeCategory`:
```typescript
switch (rangeCategory) {
  case 'RFI':
    if (raise >= 80) return 'orange';    // Always raise
    if (raise > 0) return 'yellow';      // Borderline
    return 'gray';                       // Fold
  case 'vs RFI':
    if (raise > 0) return 'red';         // 3-bet
    if (call > 0) return 'blue';         // Call  
    return 'gray';                       // Fold
  // ... other categories
}
```

### Adding New Grading Modes

1. Update `GradingMode` type in `src/types/index.ts`
2. Add case in `gradeAnswer()` function in `src/utils/gradingSystem.ts`
3. Update UI in Quiz component

### Debugging Common Issues

**Range Not Found**: 
- Check `positionCombo` format in range data
- Verify fallback logic in `generateQuizQuestion()`

**Hand Matrix Colors Wrong**:
- Check frequency thresholds in `getHandColor()`
- Verify range data has correct percentages

**FSRS Not Working**:
- Check date handling (FSRS uses Date objects)
- Verify localStorage persistence

## File Modification Patterns

**For Range Updates**: 
- **NEW**: Individual files in `src/data/ranges/[category]/` folders
- **Central Hub**: `src/data/sampleRanges.ts` for import system changes
- **Legacy**: `src/data/zenithRanges.ts` and `src/data/jonLittleRanges.ts` (now compatibility layers)

**For UI Changes**: Component-specific files in `src/components/`
**For Logic Changes**: Utility files in `src/utils/`
**For Type Changes**: `src/types/index.ts` (affects multiple files)

**Range Data Architecture:**
- **Individual Range Files**: `src/data/ranges/[RFI|vsRFI|RFI-vs-3bet|vsLimp]/[position].ts`
- **Category Indexes**: `src/data/ranges/[category]/index.ts` 
- **Master Index**: `src/data/ranges/index.ts`
- **Aggregation Hub**: `src/data/sampleRanges.ts` (central import point)
- **Component Access**: All components import from `sampleRanges.ts` for consistent API

## Testing Entry Points

- **Development**: `npm start` (http://localhost:3000)
- **Build**: `npm run build`
- **Test**: `npm test`

## Future Architecture Considerations

- **State Management**: Consider Redux for complex state
- **Backend Integration**: API for range data and progress sync
- **Mobile Optimization**: Responsive design improvements
- **Advanced FSRS**: Custom parameters per user
- **Multiplayer**: Real-time practice sessions

This architecture supports the core learning loop: Question Generation → User Input → Grading → FSRS Update → Next Question, with full persistence and customizable difficulty modes.

## Range Data Reorganization (2024)

### Architecture Improvements

The range data system was completely reorganized from a monolithic structure to a modular, category-based architecture:

**Before:**
- **2 large files**: `zenithRanges.ts` (988 lines), `jonLittleRanges.ts` (835 lines)
- **Mixed categories**: All range types bundled together
- **Difficult maintenance**: Hard to find and modify specific ranges
- **Import complexity**: Manual aggregation in multiple places

**After:**
- **27 individual files**: Organized by category and position
- **Clear separation**: RFI, vs RFI, RFI vs 3bet, vs Limp in separate folders
- **Easy maintenance**: Individual files for each range scenario
- **Automatic aggregation**: Organized import system through indexes

### Benefits Achieved

1. **Better Organization**: Ranges grouped by strategic purpose
2. **Easier Maintenance**: Individual files are simpler to find and edit  
3. **Scalability**: Easy to add new positions or range categories
4. **Type Safety**: Each file has proper TypeScript exports
5. **Data Integrity**: All original hand frequencies preserved exactly
6. **Backward Compatibility**: Existing components unchanged through `sampleRanges.ts` API
7. **Clear Structure**: File names clearly indicate range type and positions

### File Count Summary
- **RFI**: 7 files (UTG through SB)
- **vs RFI**: 9 files (BB vs positions, SB vs positions, etc.)
- **RFI vs 3bet**: 4 files (responses to 3-bets)
- **vs Limp**: 7 files (isolation ranges)
- **Total**: 27 range files + 5 index files + 1 master aggregator 

## Verifying Changes
After making a change verify that the feature works as expected using the puppeteer MCP. The server is running locally at http://localhost:3000. You do not need to run the server. It is already running in another tab with `npm start`
