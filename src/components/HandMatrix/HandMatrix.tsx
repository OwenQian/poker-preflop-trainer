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

const HandMatrix: React.FC<HandMatrixProps> = ({
  rangeData,
  rangeCategory,
  currentHand,
  onHandSelect,
  visible = true
}) => {
  const calculateCombos = () => {
    let totalCombos = 0;
    
    Object.entries(rangeData).forEach(([handName, frequencies]) => {
      // For range categories other than RFI, count both raise and call actions
      const actionFreq = rangeCategory === 'RFI' 
        ? frequencies.raise / 100 
        : (frequencies.raise + frequencies.call) / 100;
      
      if (handName.length >= 2) {
        const rank1 = handName[0];
        const rank2 = handName[1];
        
        // Pocket pairs have 6 combinations
        if (rank1 === rank2) {
          totalCombos += 6 * actionFreq;
        }
        // Suited hands have 4 combinations
        else if (handName.endsWith('s')) {
          totalCombos += 4 * actionFreq;
        }
        // Offsuit hands have 12 combinations
        else if (handName.endsWith('o')) {
          totalCombos += 12 * actionFreq;
        }
      }
    });
    
    return {
      combos: Math.round(totalCombos * 10) / 10, // Round to 1 decimal place
      percentage: Math.round((totalCombos / 1326) * 1000) / 10 // Round to 1 decimal place
    };
  };

  const { combos, percentage } = calculateCombos();
  
  const getMixedFrequencyStyle = (hand: HandName): React.CSSProperties => {
    const frequencies = rangeData[hand];
    if (!frequencies) return { backgroundColor: '#9e9e9e' };

    const { raise, call, fold } = frequencies;
    
    // If it's a single action (100% or all 0s), use solid colors
    if (raise === 100 || call === 100 || fold === 100 || (raise === 0 && call === 0)) {
      return { backgroundColor: getHandColor(hand) };
    }
    
    // Build gradient for mixed frequencies
    const colors = {
      raise: (() => {
        switch (rangeCategory) {
          case 'RFI': return '#ff9500'; // orange
          case 'vs RFI': return '#f44336'; // red
          case 'RFI vs 3bet': return '#c62828'; // dark red
          case 'vs Limp': return '#ff9500'; // orange
          default: return '#ff9500';
        }
      })(),
      call: (() => {
        switch (rangeCategory) {
          case 'vs RFI': return '#2196F3'; // blue
          case 'RFI vs 3bet': return '#4CAF50'; // green
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
    const frequencies = rangeData[hand];
    if (!frequencies) return 'gray';

    const { raise, call, fold } = frequencies;
    
    if (fold === 100 || (raise === 0 && call === 0)) return 'gray';
    
    // Different color schemes based on range category
    switch (rangeCategory) {
      case 'RFI':
        if (raise === 100) return 'orange';
        if (raise > 0) return 'yellow';
        return 'gray';
        
      case 'vs RFI':
        if (raise === 100) return 'red'; // 3-bet
        if (raise > 0) return 'orange'; // Mixed 3-bet
        if (call === 100) return 'blue'; // Call
        if (call > 0) return 'lightblue'; // Mixed call
        return 'gray';
        
      case 'RFI vs 3bet':
        if (raise === 100) return 'darkred'; // 4-bet
        if (raise > 0) return 'red'; // Mixed 4-bet
        if (call === 100) return 'green'; // Call
        if (call > 0) return 'lightgreen'; // Mixed call
        return 'gray';
        
      case 'vs Limp':
        if (raise === 100) return 'orange'; // Always raise
        if (raise > 0) return 'yellow'; // Mixed frequency raise
        if (call === 100) return 'teal'; // Call
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

    const { raise, call } = frequencies;
    
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
  };

  if (!visible) return null;

  return (
    <div className="hand-matrix">
      <div className="matrix-header">
        <div className="header-top">
          <h3>Hand Range Matrix</h3>
          <div className="range-stats">
            <span className="combo-count">{combos}/1326 combos ({percentage}%)</span>
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
                <span>Mixed frequency raise</span>
              </div>
            </>
          )}
          {rangeCategory === 'vs RFI' && (
            <>
              <div className="legend-item">
                <div className="legend-color red"></div>
                <span>3-bet (100%)</span>
              </div>
              <div className="legend-item">
                <div className="legend-color blue"></div>
                <span>Call (100%)</span>
              </div>
              <div className="legend-item">
                <div className="legend-color" style={{ background: 'linear-gradient(to right, #f44336 50%, #2196F3 50%)' }}></div>
                <span>Mixed 3bet/Call</span>
              </div>
            </>
          )}
          {rangeCategory === 'RFI vs 3bet' && (
            <>
              <div className="legend-item">
                <div className="legend-color darkred"></div>
                <span>4-bet (100%)</span>
              </div>
              <div className="legend-item">
                <div className="legend-color green"></div>
                <span>Call (100%)</span>
              </div>
              <div className="legend-item">
                <div className="legend-color" style={{ background: 'linear-gradient(to right, #c62828 50%, #4CAF50 50%)' }}></div>
                <span>Mixed 4bet/Call</span>
              </div>
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
                <span>Mixed frequency raise</span>
              </div>
            </>
          )}
          <div className="legend-item">
            <div className="legend-color gray"></div>
            <span>Fold</span>
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