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
│   └── CardDisplay/     # Playing card visual components
├── data/                # Poker strategy data
│   ├── zenithRanges.ts  # Complete poker ranges (988 lines)
│   └── sampleRanges.ts  # Range data interface
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

### 2. Application State Management

The app uses React hooks for state management with three main states:
- **Setup State**: Position selection and configuration
- **Quiz State**: Active learning session
- **Results State**: (Future implementation)

**Key State Variables:**
- `heroPosition`: Player's selected position
- `opponentPositions`: Opposing player positions array
- `gradingMode`: How answers are evaluated
- `currentQuestion`: Active quiz question
- `sessionStats`: Current session performance metrics

### 3. Range System (src/data/)

**Range Data Structure:**
```typescript
{
  positionCombo: string,  // e.g., "LJ_RFI", "BB_vs_BU"
  hands: Record<HandName, HandFrequencies>
}
```

**Current Ranges Available:**
- LJ_RFI (Lojack Raise First In) - ~14.3%
- HJ_RFI (Hijack Raise First In) - ~18.6% 
- CO_RFI (Cutoff Raise First In) - ~25.9%
- BU_RFI (Button Raise First In)
- SB_RFI (Small Blind Raise First In)

**Missing Ranges** (commonly requested):
- UTG_RFI (Under The Gun)
- UTG+1_RFI (Under The Gun +1)

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
- **Color Coding**: 
  - Orange: Always raise (100%)
  - Light Red: Borderline - raise in favorable conditions (any % > 0)
  - Gray: Fold

### PositionSelector Component
- **Interactive Table**: Visual 8-player poker table with clickable positions
- **Seat Order**: Clockwise from BU: BU → SB → BB → UTG → UTG+1 → LJ → HJ → CO
- **Dealer Button**: Round white circle with "D" at button position
- **Blind Indicators**: 1 chip at SB, 2 chips at BB to represent blinds
- **Validation**: Prevents hero/opponent position conflicts
- **Help Text**: Position descriptions and strategic context

### Quiz Component
- **Question Display**: Hand cards and position info
- **Action Selection**: Raise/Call/Fold buttons
- **Confidence Rating**: FSRS rating scale
- **Matrix Toggle**: Show/hide range reference

## Development Guidelines

### Adding New Ranges

1. **Define Range Data**: Add to `src/data/zenithRanges.ts`
```typescript
{
  positionCombo: 'UTG_RFI',
  hands: {
    'AA': { raise: 100, call: 0, fold: 0 },
    // ... complete hand range
  }
}
```

2. **Update Position Logic**: Ensure range lookup works in `handGenerator.ts`

### Modifying Hand Matrix Colors

Edit `getHandColor()` function in `src/components/HandMatrix/HandMatrix.tsx`:
```typescript
if (raise >= 80) return 'orange';      // Dark red (100%)
if (raise >= 50) return 'yellow';      // Light red (50%)
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

**For Range Updates**: Focus on `src/data/zenithRanges.ts`
**For UI Changes**: Component-specific files in `src/components/`
**For Logic Changes**: Utility files in `src/utils/`
**For Type Changes**: `src/types/index.ts` (affects multiple files)

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