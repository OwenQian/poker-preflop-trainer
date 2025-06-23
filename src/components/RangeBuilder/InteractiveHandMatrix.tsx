import React from 'react';
import { HandName, HandFrequencies } from '../../types';
import './InteractiveHandMatrix.css';

interface InteractiveHandMatrixProps {
  rangeData: Record<HandName, HandFrequencies>;
  selectedAction: string;
  onHandClick: (handName: HandName) => void;
  onMouseDown: (handName: HandName) => void;
  onMouseEnter: (handName: HandName) => void;
  onMouseUp: () => void;
  isDragging: boolean;
  draggedHands: Set<HandName>;
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

const getHandColor = (handName: HandName, frequencies: HandFrequencies): string => {
  const { raise, call, fold } = frequencies;
  
  // Always actions (100%)
  if (raise === 100) return 'always-raise';
  if (call === 100) return 'always-call';
  if (fold === 100) return 'always-fold';
  
  // Mixed frequency actions will use inline styles
  if (raise > 0 || call > 0) {
    return 'mixed-frequency';
  }
  
  // Default to fold if no specific action
  return 'default-fold';
};

const getMixedFrequencyStyle = (frequencies: HandFrequencies): React.CSSProperties => {
  const { raise, call, fold } = frequencies;
  
  // Only apply gradient for mixed frequencies
  if (raise === 100 || call === 100 || fold === 100 || (raise === 0 && call === 0)) {
    return {};
  }
  
  const colors = {
    raise: '#ff9500',
    call: '#8BC34A', 
    fold: '#6b7280'
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
    color: 'black' // Ensure text is readable on gradient
  };
};

const InteractiveHandMatrix: React.FC<InteractiveHandMatrixProps> = ({
  rangeData,
  selectedAction,
  onHandClick,
  onMouseDown,
  onMouseEnter,
  onMouseUp,
  isDragging,
  draggedHands
}) => {
  const handleCellClick = (handName: HandName, event: React.MouseEvent) => {
    // Only handle single clicks when not dragging
    if (!isDragging) {
      onHandClick(handName);
    }
  };

  const handleCellMouseDown = (handName: HandName, event: React.MouseEvent) => {
    event.preventDefault(); // Prevent text selection
    onMouseDown(handName);
  };

  const handleCellMouseEnter = (handName: HandName) => {
    onMouseEnter(handName);
  };

  return (
    <div 
      className={`interactive-hand-matrix ${isDragging ? 'dragging' : ''}`}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseUp} // End drag if mouse leaves the matrix
    >
      <table className="hand-matrix-table">
        <tbody>
          {HAND_MATRIX.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((handName, colIndex) => {
                const frequencies = rangeData[handName] || { raise: 0, call: 0, fold: 100 };
                const colorClass = getHandColor(handName, frequencies);
                const isDraggedCell = draggedHands.has(handName);
                const mixedStyle = getMixedFrequencyStyle(frequencies);
                
                return (
                  <td
                    key={colIndex}
                    className={`hand-cell ${colorClass} tool-${selectedAction} ${isDraggedCell ? 'drag-selected' : ''}`}
                    style={mixedStyle}
                    onClick={(e) => handleCellClick(handName, e)}
                    onMouseDown={(e) => handleCellMouseDown(handName, e)}
                    onMouseEnter={() => handleCellMouseEnter(handName)}
                    title={`${handName}: R${frequencies.raise}% C${frequencies.call}% F${frequencies.fold}%`}
                  >
                    <span className="hand-name">{handName}</span>
                    {frequencies.raise > 0 && frequencies.raise < 100 && (
                      <span className="frequency-label">{frequencies.raise}%</span>
                    )}
                    {frequencies.call > 0 && frequencies.call < 100 && (
                      <span className="frequency-label call">{frequencies.call}%</span>
                    )}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InteractiveHandMatrix;