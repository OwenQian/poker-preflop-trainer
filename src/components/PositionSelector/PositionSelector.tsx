import React from 'react';
import { Position } from '../../types';
import './PositionSelector.css';

interface PositionSelectorProps {
  heroPosition: Position | null;
  opponentPositions: Position[];
  onHeroPositionChange: (position: Position) => void;
  onOpponentPositionsChange: (positions: Position[]) => void;
}

const POSITIONS: Position[] = ['UTG', 'UTG+1', 'LJ', 'HJ', 'CO', 'BU', 'SB', 'BB'];

const POSITION_DESCRIPTIONS: Record<Position, string> = {
  'UTG': 'Under the Gun - First to act preflop',
  'UTG+1': 'Under the Gun +1 - Second to act preflop',
  'LJ': 'Lojack - Middle position',
  'HJ': 'Hijack - Late middle position',
  'CO': 'Cutoff - Late position',
  'BU': 'Button - Best position, acts last postflop',
  'SB': 'Small Blind - Acts first postflop',
  'BB': 'Big Blind - Last to act preflop'
};

const PositionSelector: React.FC<PositionSelectorProps> = ({
  heroPosition,
  opponentPositions,
  onHeroPositionChange,
  onOpponentPositionsChange
}) => {
  const handleOpponentToggle = (position: Position) => {
    if (position === heroPosition) return; // Can't select hero position as opponent
    
    const newOpponents = opponentPositions.includes(position)
      ? opponentPositions.filter(p => p !== position)
      : [...opponentPositions, position];
    
    onOpponentPositionsChange(newOpponents);
  };

  const getAvailableOpponentPositions = (): Position[] => {
    return POSITIONS.filter(pos => pos !== heroPosition);
  };

  return (
    <div className="position-selector">
      <div className="selector-section">
        <h3>Select Your Position (Hero)</h3>
        <div className="position-grid">
          {POSITIONS.map(position => (
            <div
              key={position}
              className={`position-card ${heroPosition === position ? 'selected' : ''}`}
              onClick={() => onHeroPositionChange(position)}
            >
              <div className="position-name">{position}</div>
              <div className="position-desc">{POSITION_DESCRIPTIONS[position]}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="selector-section">
        <h3>Select Opponent Positions</h3>
        <p className="help-text">Choose which positions you want to practice against</p>
        <div className="position-grid">
          {getAvailableOpponentPositions().map(position => (
            <div
              key={position}
              className={`position-card opponent ${opponentPositions.includes(position) ? 'selected' : ''}`}
              onClick={() => handleOpponentToggle(position)}
            >
              <div className="position-name">{position}</div>
              <div className="position-desc">{POSITION_DESCRIPTIONS[position]}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="selection-summary">
        <div className="summary-item">
          <strong>Hero Position:</strong> {heroPosition || 'Not selected'}
        </div>
        <div className="summary-item">
          <strong>Opponent Positions:</strong> {
            opponentPositions.length > 0 
              ? opponentPositions.join(', ') 
              : 'None selected'
          }
        </div>
      </div>

      <div className="poker-table-visual">
        <h4>Table Layout Preview</h4>
        <div className="table-container">
          <div className="poker-table">
            <div className="seat utg">
              <span className={`seat-label ${heroPosition === 'UTG' ? 'hero' : opponentPositions.includes('UTG') ? 'opponent' : ''}`}>
                UTG
              </span>
            </div>
            <div className="seat utg1">
              <span className={`seat-label ${heroPosition === 'UTG+1' ? 'hero' : opponentPositions.includes('UTG+1') ? 'opponent' : ''}`}>
                UTG+1
              </span>
            </div>
            <div className="seat lj">
              <span className={`seat-label ${heroPosition === 'LJ' ? 'hero' : opponentPositions.includes('LJ') ? 'opponent' : ''}`}>
                LJ
              </span>
            </div>
            <div className="seat hj">
              <span className={`seat-label ${heroPosition === 'HJ' ? 'hero' : opponentPositions.includes('HJ') ? 'opponent' : ''}`}>
                HJ
              </span>
            </div>
            <div className="seat co">
              <span className={`seat-label ${heroPosition === 'CO' ? 'hero' : opponentPositions.includes('CO') ? 'opponent' : ''}`}>
                CO
              </span>
            </div>
            <div className="seat bu">
              <span className={`seat-label ${heroPosition === 'BU' ? 'hero' : opponentPositions.includes('BU') ? 'opponent' : ''}`}>
                BU
              </span>
              <div className="button-marker">D</div>
            </div>
            <div className="seat sb">
              <span className={`seat-label ${heroPosition === 'SB' ? 'hero' : opponentPositions.includes('SB') ? 'opponent' : ''}`}>
                SB
              </span>
              <div className="blind-chip"></div>
            </div>
            <div className="seat bb">
              <span className={`seat-label ${heroPosition === 'BB' ? 'hero' : opponentPositions.includes('BB') ? 'opponent' : ''}`}>
                BB
              </span>
              <div className="blind-chips">
                <div className="blind-chip"></div>
                <div className="blind-chip"></div>
              </div>
            </div>
          </div>
        </div>
        <div className="table-legend">
          <span className="legend-item hero-legend">Hero</span>
          <span className="legend-item opponent-legend">Opponent</span>
          <span className="legend-item empty-legend">Empty</span>
        </div>
      </div>
    </div>
  );
};

export default PositionSelector;