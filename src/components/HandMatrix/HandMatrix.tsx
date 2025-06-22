import React from 'react';
import { HandName, HandFrequencies, Action } from '../../types';
import './HandMatrix.css';

interface HandMatrixProps {
  rangeData: Record<HandName, HandFrequencies>;
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
  currentHand,
  onHandSelect,
  visible = true
}) => {
  const calculateCombos = () => {
    let totalCombos = 0;
    
    Object.entries(rangeData).forEach(([handName, frequencies]) => {
      const raiseFreq = frequencies.raise / 100; // Convert percentage to decimal
      
      if (handName.length >= 2) {
        const rank1 = handName[0];
        const rank2 = handName[1];
        
        // Pocket pairs have 6 combinations
        if (rank1 === rank2) {
          totalCombos += 6 * raiseFreq;
        }
        // Suited hands have 4 combinations
        else if (handName.endsWith('s')) {
          totalCombos += 4 * raiseFreq;
        }
        // Offsuit hands have 12 combinations
        else if (handName.endsWith('o')) {
          totalCombos += 12 * raiseFreq;
        }
      }
    });
    
    return {
      combos: Math.round(totalCombos * 10) / 10, // Round to 1 decimal place
      percentage: Math.round((totalCombos / 1326) * 1000) / 10 // Round to 1 decimal place
    };
  };

  const { combos, percentage } = calculateCombos();
  const getHandColor = (hand: HandName): string => {
    const frequencies = rangeData[hand];
    if (!frequencies) return 'gray';

    const { raise, call, fold } = frequencies;
    
    if (fold === 100) return 'gray';
    if (raise === 100) return 'orange';
    if (raise > 0) return 'yellow';
    if (call >= 80) return 'green';
    if (call >= 50) return 'lightgreen';
    return 'lightgray';
  };

  const getHandAction = (hand: HandName): Action | null => {
    const frequencies = rangeData[hand];
    if (!frequencies) return null;

    const { raise, call, fold } = frequencies;
    
    if (fold === 100) return 'fold';
    if (raise >= call && raise >= fold) return 'raise';
    if (call >= fold) return 'call';
    return 'fold';
  };

  const formatFrequencies = (hand: HandName): string => {
    const frequencies = rangeData[hand];
    if (!frequencies) return '';

    const { raise, call } = frequencies;
    return `${raise > 0 ? `BET ${raise}%` : ''}\n${call > 0 ? `CHECK ${call}%` : ''}`.trim();
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
          <div className="legend-item">
            <div className="legend-color orange"></div>
            <span>Always raise (100%)</span>
          </div>
          <div className="legend-item">
            <div className="legend-color yellow"></div>
            <span>Borderline - raise in favorable conditions</span>
          </div>
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
                style={{ backgroundColor: getHandColor(hand) }}
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