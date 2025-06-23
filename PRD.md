# Product Requirements Document: Preflop Poker Training App

## 1. Overview

### 1.1 Product Vision
A React-based training application that helps poker players learn and memorize preflop ranges through spaced repetition and adaptive learning algorithms.

### 1.2 Target Users
- Beginner to intermediate poker players
- Players looking to improve their preflop decision-making
- Students of poker strategy and GTO (Game Theory Optimal) play

### 1.3 Success Metrics
- User retention and engagement
- Improvement in quiz accuracy over time
- Time spent per session
- Long-term memory retention of ranges

## 2. Core Features

### 2.1 Spaced Repetition System (FSRS-4)
**Description**: Implementation of the FSRS-4 (Four-Parameter Spaced Repetition System) algorithm for optimal long-term retention
- **Algorithm**: FSRS-4 with dynamic difficulty and stability calculations
- **Rating System**: Four response grades for each hand:
  - **Again** (1): Complete failure, immediate reschedule
  - **Hard** (2): Difficult but eventually correct
  - **Good** (3): Standard correct response
  - **Easy** (4): Effortless correct response
- **Core Features**:
  - **Dynamic Difficulty**: Each hand's difficulty adjusts based on individual performance
  - **Memory Stability**: Uses forgetting curve model to predict optimal review timing
  - **Intelligent Scheduling**: Prevents all cards from clustering on same review dates
- **Configuration Parameters**:
  - **Request Retention**: Target retention rate (default: 90%)
  - **Maximum Interval**: Cap on review intervals (default: 1 year)
  - **21 Weight Parameters**: Fine-tuned for poker hand learning optimization
- **Card States**:
  - **New**: Never seen before
  - **Learning**: Recently introduced, frequent reviews
  - **Review**: Established knowledge, spaced intervals

### 2.2 Multiple Choice Quiz System
**Description**: Present preflop decisions with multiple viable options
- **Options**: Raise, Call, Fold
- **Multi-select capability**: Allow selection of multiple correct answers
- **Visual feedback**: Clear indication of selected options
- **Instant feedback**: Show correct/incorrect immediately after submission

### 2.3 Grading System Modes
**Description**: Three distinct grading approaches to accommodate different learning styles

#### 2.3.1 Strict Mode
- **Requirement**: Must select ALL viable options to be marked correct
- **Use case**: Advanced players seeking precision
- **Scoring**: All-or-nothing approach

#### 2.3.2 Lax Mode
- **Requirement**: Selecting at least ONE correct option counts as correct
- **Use case**: Beginners building confidence
- **Scoring**: Partial credit system

#### 2.3.3 Randomizer Mode
- **Mechanism**: Generate random number 1-100 (inclusive)
- **Frequency mapping**: Each hand has specified raise/call/fold percentages (r%, c%, f%)
- **Answer determination**:
  - Numbers [1, f]: Fold is only correct answer
  - Numbers [f+1, f+c]: Call is only correct answer  
  - Numbers [f+c+1, 100]: Raise is only correct answer
- **Two-option scenarios**:
  - Raise/Fold: [1, f] = Fold, [f+1, 100] = Raise
  - Call/Fold: [1, f] = Fold, [f+1, 100] = Call
- **Use case**: Simulating real-world mixed strategy scenarios

### 2.4 Hand Representation System

#### 2.4.1 2D Grid Visualization
- **Layout**: 13x13 grid representing all 1,326 hand combinations
- **Organization**:
  - **Diagonal**: Pocket pairs (AA, KK, QQ, etc.)
  - **Upper right**: Suited hands (AKs, AQs, etc.)
  - **Lower left**: Unsuited hands (AKo, AQo, etc.)
- **Color Coding System**:
  - **Red**: Fold hands
  - **Green**: Call hands  
  - **Orange/Yellow**: Raise hands
  - **Gray**: Hands not in range/fold
- **Hand Labels**: Each cell displays the hand combination (e.g., "AA", "AKs", "72o")
- **Frequency Display**: Show BET/RAISE and CHECK/CALL percentages within each cell
- **Interactive**: Click/tap to highlight specific hands
- **Toggle visibility**: Hide/show button for grid display
- **Current Hand Highlighting**: Visual emphasis (border, glow) on the currently quizzed hand

#### 2.4.2 Card Visualization
- **High-quality graphics**: Professional card images with suits and ranks
- **Clear display**: Large, readable cards showing hole cards (e.g., A♥ K♣)
- **Grid highlighting**: Visual indication of current hand's position in 2D grid
- **Responsive design**: Scales appropriately across devices

### 2.5 Position Selection System

#### 2.5.1 Hero Position Selection
- **Single selection**: Choose your position at the table
- **8-handed table positions**:
  - UTG (Under the Gun)
  - UTG+1 (Under the Gun + 1)
  - LJ (Lojack)
  - HJ (Hijack)
  - CO (Cutoff)
  - BU (Button)
  - SB (Small Blind)
  - BB (Big Blind)

#### 2.5.2 Opponent Selection
- **Multi-select capability**: Choose multiple opponent positions
- **Dynamic scenarios**: System randomly samples from selected opponent combinations
- **Example**: Hero = BB, Opponents = [LJ, BU] creates scenarios where BB faces various preflop actions from LJ and BU

### 2.6 Range Builder
- Ability to build new preflop ranges and edit existing ones
- Load existing range into the range builder for easy editing
- Save ranges as new custom range with a name, or overwrite existing one

### 2.7 Postflop Visualizer
**Description**: Interactive postflop analysis and visualization tool
- **Navigation**: Dedicated button on home page leading to separate postflop visualizer page
- **Flop Selection**: Choose from 95 representative flop subsets from PIOSolver research
  - Data source: `piosolver-flop-subsets/95-flop-subset.txt`
  - Each flop includes relative frequency weighting
  - Format: board texture (e.g., "2s2d4c") with frequency value
- **Percentile vs Percentile Overlay**: 
  - X-axis: Hand strength percentile within range
  - Y-axis: Equity against opponent's range
  - Visual overlay to compare range strength distributions
- **Hand Breakdown Classification - this is subject to change**:
  - **Group 1a** (Very Strong): Two pair and better
  - **Group 1b**: Top pair
  - **Group 2a** (Medium - Non-pocket pairs): Middle pair, bottom pair
  - **Group 2b** (Medium - Pocket pairs): Pocket pairs below top pair
  - **Group 3a** (Strong Draws): Flush draws, 8-out straight draws, combo draws
  - **Group 3b** (Medium Draws): 4-out straight draws
  - **Group 3c** (Weak Draws): 2 overcards, 3-card flush, 3-card straight
  - **Group 4** (Air): None of the above categories

### 2.8 Home Page Restructure
**Description**: Redesigned home page focused on range visualization rather than quiz entry
- **Primary Purpose**: Viewing and exploring preflop ranges
- **Quiz Access**: "Spaced Repetition Quiz" button redirects to dedicated quiz settings page
- **Range Display**: Full-featured range matrix display with all range categories
- **Navigation Hub**: Central access point to postflop visualizer and quiz modules

## 3. Technical Requirements

### 3.1 Frontend Framework
- **Technology**: React.js
- **State Management**: Context API or Redux for complex state
- **Styling**: CSS-in-JS or Tailwind CSS for responsive design
- **Performance**: Optimized for mobile and desktop

### 3.2 Data Storage
- **Local Storage**: User progress and settings
- **Range Data**: JSON files containing preflop ranges and frequencies
- **FSRS-4 Card Data**: For each hand combination:
  - **Difficulty**: Current difficulty level (0-10)
  - **Stability**: Memory stability in days
  - **Due Date**: Next review timestamp
  - **State**: Card state (new, learning, review)
  - **Last Review**: Previous review date and rating
  - **Review History**: Complete performance history
- **Progress Tracking**: Comprehensive learning analytics and performance metrics

### 3.3 User Interface Requirements
- **Responsive Design**: Mobile-first approach
- **Accessibility**: WCAG 2.1 AA compliance
- **Performance**: < 3 second load times
- **Offline Capability**: Core functionality available without internet

## 4. User Experience Flow

### 4.1 Initial Setup
1. Select hero position
2. Select opponent positions
3. Choose grading mode
4. Begin first quiz session

### 4.2 Quiz Session
1. Display hole cards with visual representation
2. Show/hide 2D grid with current hand highlighted
   - once you answer it’ll keep your hand highlighted but also reveal the rest of your range
3. Present multiple choice options (Raise, Call, Fold)
4. Allow multiple selections based on grading mode
5. Provide immediate feedback with explanation
6. **FSRS-4 Rating Collection**: Present four-button rating system:
   - "Again" - Got it completely wrong
   - "Hard" - Eventually got it right but struggled
   - "Good" - Got it right with normal effort
   - "Easy" - Got it right effortlessly
7. **Schedule Next Review**: FSRS-4 algorithm calculates optimal next review time
8. **Progress Tracking**: Update difficulty, stability, and card state
9. In quiz mode be able to see your opponents range. Also show/hideable.
   - E.g., in a CO (hero) vs BU 3bet spot, display what the BU 3bet range looks like

### 4.3 Progress Tracking
1. Display session statistics
2. Show long-term progress graphs
3. Highlight areas needing improvement
4. Provide achievement milestones

## 5. Data Requirements

### 5.1 Range Data Structure
```json
{
  "position_combo": "BB_vs_LJ_BU",
  "hands": {
    "AA": {"raise": 100, "call": 0, "fold": 0},
    "AKs": {"raise": 80, "call": 20, "fold": 0},
    "72o": {"raise": 0, "call": 0, "fold": 100}
  }
}
```

### 5.2 FSRS-4 Progress Data Structure
```json
{
  "hand_id": "AA_BB_vs_LJ",
  "fsrs_data": {
    "difficulty": 5.2,
    "stability": 15.7,
    "due_date": "2024-01-15T10:30:00Z",
    "state": "review",
    "last_review": {
      "date": "2024-01-01T10:30:00Z",
      "rating": 3,
      "elapsed_days": 12
    },
    "review_history": [
      {"date": "2023-12-20", "rating": 2, "interval": 1},
      {"date": "2023-12-21", "rating": 3, "interval": 3},
      {"date": "2024-01-01", "rating": 3, "interval": 12}
    ]
  },
  "performance_stats": {
    "total_reviews": 15,
    "correct_streak": 5,
    "accuracy_rate": 0.73
  }
}
```

### 5.3 State export and import
Because there is no backend database and the data is stored in local storage, there needs to be a way to export the current state.
The state includes:
* the users spaced reptition status for every hand/range

## 6. Success Criteria

### 6.1 MVP Success Metrics
- Successfully implement spaced repetition algorithm
- Achieve 90%+ accuracy in hand combination representation
- Support all three grading modes
- Responsive design across mobile and desktop

## 7. Technical Constraints

### 7.1 Performance Requirements
- App load time < 3 seconds
- Quiz response time < 500ms
- Smooth animations and transitions
- Minimal memory footprint

### 7.2 Compatibility Requirements
- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile devices (iOS Safari, Android Chrome)
