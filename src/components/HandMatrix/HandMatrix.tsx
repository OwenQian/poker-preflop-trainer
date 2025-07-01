import React from 'react';
import { HandName, HandFrequencies } from '../../types';
import { RangeCategory } from '../RangeTabSelector/RangeTabSelector';
import './HandMatrix.css';

interface HandMatrixProps {
  rangeData: Record<HandName, HandFrequencies>;
  rangeCategory: RangeCategory;
  currentHand?: HandName;
  onHandSelect?: (hand: HandName) => void;
  visible?: boolean;
  // Optional dependency range for frequency weighting
  dependencyRangeData?: Record<HandName, HandFrequencies>;
  // Missing hand treatment - how to handle hands not in rangeData
  missingHandTreatment?: 'not-in-range' | 'fold';
  // Whether to show colors based on frequencies
  showColors?: boolean;
}

const HAND_MATRIX: HandName[][] = [
  ['AA', 'AKs', 'AQs', 'AJs', 'ATs', 'A9s', 'A8s', 'A7s', 'A6s', 'A5s', 'A4s', 'A3s', 'A2s'],
  ['AKo', 'KK', 'KQs', 'KJs', 'KTs', 'K9s', 'K8s', 'K7s', 'K6s', 'K5s', 'K4s', 'K3s', 'K2s'],
  ['AQo', 'KQo', 'QQ', 'QJs', 'QTs', 'Q9s', 'Q8s', 'Q7s', 'Q6s', 'Q5s', 'Q4s', 'Q3s', 'Q2s'],
  ['AJo', 'KJo', 'QJo', 'JJ', 'JTs', 'J9s', 'J8s', 'J7s', 'J6s', 'J5s', 'J4s', 'J3s', 'J2s'],
  ['ATo', 'KTo', 'QTo', 'JTo', 'TT', 'T9s', 'T8s', 'T7s', 'T6s', 'T5s', 'T4s', 'T3s', 'T2s'],
  ['A9o', 'K9o', 'Q9o', 'J9o', 'T9o', '99', '98s', '97s', '96s', '95s', '94s', '93s', '92s'],
  ['A8o', 'K8o', 'Q8o', 'J8o', 'T8o', '98o', '88', '87s', '86s', '85s', '84s', '83s', '82s'],
  ['A7o', 'K7o', 'Q7o', 'J7o', 'T7o', '97o', '87o', '77', '76s', '75s', '74s', '73s', '72s'],
  ['A6o', 'K6o', 'Q6o', 'J6o', 'T6o', '96o', '86o', '76o', '66', '65s', '64s', '63s', '62s'],
  ['A5o', 'K5o', 'Q5o', 'J5o', 'T5o', '95o', '85o', '75o', '65o', '55', '54s', '53s', '52s'],
  ['A4o', 'K4o', 'Q4o', 'J4o', 'T4o', '94o', '84o', '74o', '64o', '54o', '44', '43s', '42s'],
  ['A3o', 'K3o', 'Q3o', 'J3o', 'T3o', '93o', '83o', '73o', '63o', '53o', '43o', '33', '32s'],
  ['A2o', 'K2o', 'Q2o', 'J2o', 'T2o', '92o', '82o', '72o', '62o', '52o', '42o', '32o', '22']
];

// Flatten the matrix to get all 169 possible hands
const ALL_HANDS: HandName[] = HAND_MATRIX.flat();

const HandMatrix: React.FC<HandMatrixProps> = ({
  rangeData,
  rangeCategory,
  currentHand,
  onHandSelect,
  visible = true,
  dependencyRangeData,
  missingHandTreatment = 'not-in-range',
  showColors = true
}) => {
  const [showMixedStrategy, setShowMixedStrategy] = React.useState(true);
  
  const calculateCombos = () => {
    let raiseCombos = 0;
    let callCombos = 0;
    let foldCombos = 0;
    let rangeCombos = 0; // Total combinations in the range
    
    // Determine which hands to iterate through
    const handsToProcess = missingHandTreatment === 'fold' ? ALL_HANDS : Object.keys(rangeData);
    
    handsToProcess.forEach((handName) => {
      if (handName.length >= 2) {
        const rank1 = handName[0];
        const rank2 = handName[1];
        
        // Determine number of combinations for this hand
        let handCombos = 0;
        if (rank1 === rank2) {
          handCombos = 6; // Pocket pairs
        } else if (handName.endsWith('s')) {
          handCombos = 4; // Suited hands
        } else if (handName.endsWith('o')) {
          handCombos = 12; // Offsuit hands
        }
        
        // Get frequencies for this hand (use default fold:100 for missing hands when treatment is 'fold')
        let frequencies = rangeData[handName];
        const isHandInRange = !!frequencies;
        
        if (!frequencies && missingHandTreatment === 'fold') {
          frequencies = { raise: 0, call: 0, fold: 100 };
        }
        
        // Skip hands that don't exist when treatment is 'not-in-range'
        if (!frequencies) {
          return;
        }
        
        // Calculate frequency weighting if dependency range is provided
        let frequencyWeight = 1.0; // Default to 100% if no dependency
        
        // Only apply dependency weighting to hands that are actually in the original range
        if (dependencyRangeData && dependencyRangeData[handName] && isHandInRange) {
          const dependencyFreq = dependencyRangeData[handName];
          // For RFI dependency, the weight is the raise frequency (how often we RFI this hand)
          // For other dependencies, we might need different logic
          switch (rangeCategory) {
            case 'RFI vs 3bet':
              // Hand is only in this subrange if it was RFI'd first
              frequencyWeight = dependencyFreq.raise / 100;
              break;
            case 'vs RFI':
              // For vs RFI ranges, we don't apply dependency weighting for frequency calculations
              // These are complete strategy ranges showing what to do against all opponent hands
              frequencyWeight = 1.0;
              break;
            default:
              // For other categories, use full weight
              frequencyWeight = 1.0;
              break;
          }
        }
        
        // For hands not in range when treatment is 'fold', don't apply dependency weighting
        if (!isHandInRange && missingHandTreatment === 'fold') {
          frequencyWeight = 1.0;
        }
        
        // Calculate base combos (before frequency weighting for actions)
        const baseCombos = handCombos; // Don't apply frequency weight to base combos
        
        // For range total calculation - this should always be the full combo count
        if (missingHandTreatment === 'fold') {
          // When treatment is 'fold', ALL hands are in the range (should total 1326)
          rangeCombos += baseCombos;
        } else {
          // When treatment is 'not-in-range', only hands that exist in rangeData are in range
          if (rangeData[handName]) {
            rangeCombos += baseCombos;
          }
        }
        
        // Apply frequency weighting for action calculations only
        const effectiveHandCombos = baseCombos * frequencyWeight;
        
        // Calculate weighted combinations for each action with frequency weighting applied
        raiseCombos += effectiveHandCombos * (frequencies.raise / 100);
        callCombos += effectiveHandCombos * (frequencies.call / 100);
        foldCombos += effectiveHandCombos * (frequencies.fold / 100);
      }
    });
    
    // For range categories other than RFI, total active combos include both raise and call
    const activeCombos = rangeCategory === 'RFI' ? raiseCombos : (raiseCombos + callCombos);
    
    // Calculate total action combos for percentage calculation
    const totalActionCombos = raiseCombos + callCombos + foldCombos;
    
    return {
      combos: Math.round(activeCombos * 10) / 10,
      percentage: Math.round((activeCombos / 1326) * 1000) / 10,
      // New statistics relative to the range - using frequency-weighted totalActionCombos
      rangeCombos: Math.round(totalActionCombos * 10) / 10,
      raisePercentage: totalActionCombos > 0 ? Math.round((raiseCombos / totalActionCombos) * 1000) / 10 : 0,
      callPercentage: totalActionCombos > 0 ? Math.round((callCombos / totalActionCombos) * 1000) / 10 : 0,
      foldPercentage: totalActionCombos > 0 ? Math.round((foldCombos / totalActionCombos) * 1000) / 10 : 0
    };
  };

  const { combos, percentage, rangeCombos, raisePercentage, callPercentage, foldPercentage } = calculateCombos();
  
  const getMixedFrequencyStyle = (hand: HandName): React.CSSProperties => {
    // Always apply getHandColor first (handles current hand highlighting when showColors is false)
    const baseColor = getHandColor(hand);
    
    const frequencies = rangeData[hand];
    // Handle missing hands based on treatment setting
    if (!frequencies) {
      // If colors are disabled and this is the current hand, use yellow
      if (!showColors && hand === currentHand) {
        return { backgroundColor: '#ffeb3b' };
      }
      if (missingHandTreatment === 'fold') {
        // Treat as fold: 100 (lighter gray)
        return { backgroundColor: '#9e9e9e' };
      } else {
        // Treat as not in range (darker gray)
        return { backgroundColor: '#606060' };
      }
    }

    const { raise, call, fold } = frequencies;
    
    // If mixed strategy view is off, always use solid colors
    if (!showMixedStrategy) {
      return { backgroundColor: baseColor };
    }
    
    // If it's a single action (100% or all 0s), use solid colors
    if (raise === 100 || call === 100 || fold === 100 || (raise === 0 && call === 0)) {
      return { backgroundColor: baseColor };
    }
    
    // Build gradient for mixed frequencies
    const colors = {
      raise: (() => {
        switch (rangeCategory) {
          case 'RFI': return '#ff9500'; // orange
          case 'vs RFI': return '#c62828'; // dark red
          case 'RFI vs 3bet': return '#c62828'; // dark red
          case '3bet vs 4bet': return '#c62828'; // dark red
          case 'vs Limp': return '#ff9500'; // orange
          default: return '#ff9500';
        }
      })(),
      call: (() => {
        switch (rangeCategory) {
          case 'vs RFI': return '#4CAF50'; // green
          case 'RFI vs 3bet': return '#4CAF50'; // green
          case '3bet vs 4bet': return '#4CAF50'; // green
          default: return '#8BC34A'; // light green
        }
      })(),
      fold: '#9e9e9e' // gray
    };
    
    // Build gradient segments
    const segments = [];
    let currentPercent = 0;
    
    if (raise > 0) {
      segments.push(`${colors.raise} ${currentPercent}% ${currentPercent + raise}%`);
      currentPercent += raise;
    }
    
    if (call > 0) {
      segments.push(`${colors.call} ${currentPercent}% ${currentPercent + call}%`);
      currentPercent += call;
    }
    
    if (fold > 0) {
      segments.push(`${colors.fold} ${currentPercent}% ${currentPercent + fold}%`);
    }
    
    return {
      background: `linear-gradient(to right, ${segments.join(', ')})`,
      color: 'black',
      fontWeight: 'bold'
    };
  };
  
  const getHandColor = (hand: HandName): string => {
    // If colors are disabled, show current hand as yellow, others as gray
    if (!showColors) {
      if (hand === currentHand) {
        return '#ffeb3b'; // Yellow for current hand
      }
      return '#e0e0e0'; // Light gray for all other hands
    }

    const frequencies = rangeData[hand];
    
    // Handle missing hands based on treatment setting
    if (!frequencies) {
      if (missingHandTreatment === 'fold') {
        // Treat as fold: 100 (lighter gray)
        return '#9e9e9e';
      } else {
        // Treat as not in range (darker gray)
        return '#606060';
      }
    }

    const { raise, call, fold } = frequencies;
    
    
    // Hand in range but folds = in range but should fold (lighter gray)
    if (fold === 100 || (raise === 0 && call === 0)) return '#9e9e9e';
    
    // Different color schemes based on range category
    switch (rangeCategory) {
      case 'RFI':
        if (raise === 100) return 'orange';
        if (raise > 0) return 'yellow';
        return 'gray';
        
      case 'vs RFI':
        if (raise === 100) return '#c62828'; // 3-bet (same as RFI vs 3bet)
        if (raise > 0 && call === 0) return 'red'; // Pure mixed 3-bet
        if (call === 100) return '#4CAF50'; // Call (same as RFI vs 3bet)
        if (call > 0 && raise === 0) return '#4FC3F7'; // Pure mixed call (light blue)
        if (raise > 0 && call > 0 && fold === 0) return '#9C27B0'; // Raise/call (never fold) (purple)
        if (raise > 0 && call > 0) return '#FF9800'; // Mixed 3-bet/call/fold (orange)
        return 'gray';
        
      case 'RFI vs 3bet':
      case '3bet vs 4bet':
        if (raise > 0 && call > 0) return '#9C27B0'; // Mixed raise/call (purple for mixed strategy)
        if (raise > 0) return '#c62828'; // Any raise (dark red)
        if (call > 0) return '#4CAF50'; // Any call (green)
        return 'gray';
        
      case 'vs Limp':
        if (raise === 100) return 'orange'; // Always raise
        if (raise > 0) return 'yellow'; // Mixed frequency raise
        if (call === 100) return '#8BC34A'; // Call (same light green as mixed frequency)
        if (call > 0) return 'lightteal'; // Mixed call
        return 'gray';
        
      default:
        return 'gray';
    }
  };

  // Commented out unused function to fix ESLint warning
  // const getHandAction = (hand: HandName): Action | null => {
  //   const frequencies = rangeData[hand];
  //   if (!frequencies) return null;

  //   const { raise, call, fold } = frequencies;
    
  //   if (fold === 100) return 'fold';
  //   if (raise >= call && raise >= fold) return 'raise';
  //   if (call >= fold) return 'call';
  //   return 'fold';
  // };

  const formatFrequencies = (hand: HandName): string => {
    const frequencies = rangeData[hand];
    if (!frequencies) return '';

    const { raise, call, fold } = frequencies;
    
    // If in mixed strategy mode, show percentages as before
    if (showMixedStrategy) {
      // Different action labels based on range category
      const raiseLabel = (() => {
        switch (rangeCategory) {
          case 'RFI': return 'RFI';
          case 'vs RFI': return '3B';
          case 'RFI vs 3bet': return '4B';
          case 'vs Limp': return 'R';
          default: return 'R';
        }
      })();
      
      const callLabel = 'C';
      
      const parts = [];
      if (raise > 0) parts.push(`${raiseLabel} ${raise}%`);
      if (call > 0) parts.push(`${callLabel} ${call}%`);
      
      return parts.join('\n');
    }
    
    // If not in mixed strategy mode, show action labels
    const actions = [];
    
    // Get action names based on range category
    const raiseActionName = (() => {
      switch (rangeCategory) {
        case 'RFI': return 'raise';
        case 'vs RFI': return '3bet';
        case 'RFI vs 3bet': return '4bet';
        case 'vs Limp': return 'raise';
        default: return 'raise';
      }
    })();
    
    if (raise > 0) actions.push(raiseActionName);
    if (call > 0) actions.push('call');
    if (fold > 0) actions.push('fold');
    
    return actions.join('/');
  };

  if (!visible) return null;

  return (
    <div className="hand-matrix">
      <div className="matrix-header">
        <div className="header-top">
          <h3>Hand Range Matrix</h3>
          <div className="header-controls">
            <label className="toggle-label">
              <input
                type="checkbox"
                checked={showMixedStrategy}
                onChange={(e) => setShowMixedStrategy(e.target.checked)}
              />
              <span>Frequency View</span>
            </label>
            <div className="range-stats">
              <span className="combo-count">{combos}/1326 combos ({percentage}%)</span>
              <span className="range-breakdown">
                Range: {rangeCombos} combos | 
                Raise: {raisePercentage}% | 
                Call: {callPercentage}% | 
                Fold: {foldPercentage}%
              </span>
            </div>
          </div>
        </div>
        <div className="legend">
          {rangeCategory === 'RFI' && (
            <>
              <div className="legend-item">
                <div className="legend-color orange"></div>
                <span>Always raise (100%)</span>
              </div>
              <div className="legend-item">
                <div className="legend-color yellow"></div>
                <span>{showMixedStrategy ? 'Mixed frequency raise' : 'raise/fold'}</span>
              </div>
            </>
          )}
          {rangeCategory === 'vs RFI' && (
            <>
              <div className="legend-item">
                <div className="legend-color darkred"></div>
                <span>Raise</span>
              </div>
              <div className="legend-item">
                <div className="legend-color green"></div>
                <span>Call</span>
              </div>
              {showMixedStrategy && (
                <div className="legend-item">
                  <div className="legend-color" style={{ background: 'linear-gradient(to right, #c62828 50%, #4CAF50 50%)' }}></div>
                  <span>Mixed Raise/Call</span>
                </div>
              )}
              {!showMixedStrategy && (
                <>
                  <div className="legend-item">
                    <div className="legend-color purple"></div>
                    <span>raise/call</span>
                  </div>
                  <div className="legend-item">
                    <div className="legend-color olive"></div>
                    <span>raise/call/fold</span>
                  </div>
                  <div className="legend-item">
                    <div className="legend-color red"></div>
                    <span>raise/fold</span>
                  </div>
                  <div className="legend-item">
                    <div className="legend-color lightgreen"></div>
                    <span>call/fold</span>
                  </div>
                </>
              )}
            </>
          )}
          {(rangeCategory === 'RFI vs 3bet' || rangeCategory === '3bet vs 4bet') && (
            <>
              <div className="legend-item">
                <div className="legend-color darkred"></div>
                <span>Raise</span>
              </div>
              <div className="legend-item">
                <div className="legend-color green"></div>
                <span>Call</span>
              </div>
              {showMixedStrategy && (
                <div className="legend-item">
                  <div className="legend-color" style={{ background: 'linear-gradient(to right, #c62828 50%, #4CAF50 50%)' }}></div>
                  <span>Mixed Raise/Call</span>
                </div>
              )}
              {!showMixedStrategy && (
                <>
                  <div className="legend-item">
                    <div className="legend-color purple"></div>
                    <span>raise/call</span>
                  </div>
                  <div className="legend-item">
                    <div className="legend-color olive"></div>
                    <span>raise/call/fold</span>
                  </div>
                  <div className="legend-item">
                    <div className="legend-color red"></div>
                    <span>raise/fold</span>
                  </div>
                  <div className="legend-item">
                    <div className="legend-color lightgreen"></div>
                    <span>call/fold</span>
                  </div>
                </>
              )}
            </>
          )}
          {rangeCategory === 'vs Limp' && (
            <>
              <div className="legend-item">
                <div className="legend-color orange"></div>
                <span>Always raise (100%)</span>
              </div>
              <div className="legend-item">
                <div className="legend-color yellow"></div>
                <span>{showMixedStrategy ? 'Mixed frequency raise' : 'raise/fold'}</span>
              </div>
            </>
          )}
          <div className="legend-item">
            <div className="legend-color gray"></div>
            <span>Fold (in range)</span>
          </div>
          <div className="legend-item">
            <div className="legend-color darkgray"></div>
            <span>Not in range</span>
          </div>
        </div>
      </div>
      
      <div className="matrix-grid">
        {HAND_MATRIX.map((row, rowIndex) => (
          <div key={rowIndex} className="matrix-row">
            {row.map((hand, colIndex) => (
              <div
                key={`${rowIndex}-${colIndex}`}
                className={`matrix-cell ${currentHand === hand ? 'current' : ''}`}
                style={getMixedFrequencyStyle(hand)}
                onClick={() => onHandSelect?.(hand)}
              >
                <div className="hand-name">{hand}</div>
                <div className="hand-frequencies">
                  {formatFrequencies(hand)}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default HandMatrix;