# Range Extraction Summary

This document summarizes the extraction of non-RFI ranges from `jonLittleRanges.ts` into separate organized files.

## Extracted Range Categories

### 1. vs RFI Ranges (9 ranges)
**Location**: `src/data/ranges/vsRFI/`
**Description**: Optimal response ranges when facing RFI (Raise First In) actions

- `BB-vs-UTG.ts` - Big Blind vs UTG RFI
- `BB-vs-UTG2.ts` - Big Blind vs UTG+2 RFI  
- `BB-vs-CO.ts` - Big Blind vs Cutoff RFI
- `BB-vs-BU.ts` - Big Blind vs Button RFI
- `BB-vs-SB.ts` - Big Blind vs Small Blind RFI
- `SB-vs-UTG.ts` - Small Blind vs UTG RFI
- `SB-vs-BU.ts` - Small Blind vs Button RFI
- `BU-vs-CO.ts` - Button vs Cutoff RFI
- `CO-vs-HJ.ts` - Cutoff vs Hijack RFI

### 2. RFI vs 3bet Ranges (4 ranges)
**Location**: `src/data/ranges/RFI-vs-3bet/`
**Description**: Optimal response ranges when facing 3-bets after opening

- `UTG-vs-3bet.ts` - UTG RFI vs 3bet response
- `BU-vs-3bet.ts` - Button RFI vs 3bet response
- `CO-vs-SB-3bet.ts` - Cutoff RFI vs Small Blind 3bet (mixed strategy)
- `CO-vs-BU-3bet.ts` - Cutoff RFI vs Button 3bet (mixed strategy)

### 3. vs Limp Ranges (7 ranges)
**Location**: `src/data/ranges/vsLimp/`
**Description**: Optimal isolation ranges vs single limper with 6bb sizing

- `UTG1-vs-limp.ts` - UTG+1 vs Limper
- `LJ-vs-limp.ts` - Lojack vs Limper
- `HJ-vs-limp.ts` - Hijack vs Limper
- `CO-vs-limp.ts` - Cutoff vs Limper
- `BU-vs-limp.ts` - Button vs Limper
- `SB-vs-limp.ts` - Small Blind vs Limper
- `BB-vs-limp.ts` - Big Blind vs Limper

## File Structure

```
src/data/ranges/
├── vsRFI/
│   ├── index.ts (exports all vs RFI ranges)
│   └── [9 individual range files]
├── RFI-vs-3bet/
│   ├── index.ts (exports all RFI vs 3bet ranges)
│   └── [4 individual range files]
├── vsLimp/
│   ├── index.ts (exports all vs limp ranges)
│   └── [7 individual range files]
└── extracted/
    └── index.ts (central export point)
```

## Key Features

### Range Types
- **Pure strategies**: 100% one action (raise/call/fold)
- **Mixed strategies**: Percentage-based frequencies for optimal play
- **Strategic annotations**: Comments explaining range construction and usage

### Naming Convention
- Files use position abbreviations: UTG, UTG1, LJ, HJ, CO, BU, SB, BB
- Actions clearly indicated: vs-RFI, vs-3bet, vs-limp
- Consistent hyphenated format for readability

### Strategic Context
Each file includes:
- Header comments explaining the range purpose
- Strategic notes about position and stack considerations
- Adjustments for multiway scenarios
- Mixed strategy explanations where applicable

## Original Source

All ranges extracted from:
- **File**: `src/data/jonLittleRanges.ts`
- **Exported constants**: 
  - `JON_LITTLE_FACING_RFI_RANGES`
  - `JON_LITTLE_RFI_VS_3BET_RANGES`
  - `UPSWING_VS_LIMP_RANGES`

## Total Ranges Extracted: 20

This extraction improves code organization by:
1. Separating concerns into logical categories
2. Making individual ranges easier to find and modify
3. Providing better documentation and strategic context
4. Enabling selective imports based on range category
5. Maintaining all original strategic data and frequencies