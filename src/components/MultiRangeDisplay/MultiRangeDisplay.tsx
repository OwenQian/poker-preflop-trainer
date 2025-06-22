import React from 'react';
import { Position } from '../../types';
import { RangeCategory } from '../RangeTabSelector/RangeTabSelector';
import { getRangeData } from '../../data/sampleRanges';
import HandMatrix from '../HandMatrix/HandMatrix';
import './MultiRangeDisplay.css';

interface MultiRangeDisplayProps {
  heroPosition: Position;
  opponentPositions: Position[];
  rangeCategory: RangeCategory;
  currentHand?: string;
}

const MultiRangeDisplay: React.FC<MultiRangeDisplayProps> = ({
  heroPosition,
  opponentPositions,
  rangeCategory,
  currentHand
}) => {
  // For RFI, we only need one chart regardless of opponents
  if (rangeCategory === 'RFI') {
    // BB RFI doesn't make strategic sense since BB is a forced bet, not a raise first in
    if (heroPosition === 'BB') {
      return (
        <div className="multi-range-display">
          <div className="range-section">
            <h3>Preflop {rangeCategory} Range - {heroPosition}</h3>
            <div className="no-range-data">
              No range data available for this position combination.
              <br />
              <small>Note: Big Blind cannot "Raise First In" since it's a forced bet position.</small>
            </div>
          </div>
        </div>
      );
    }
    
    const positionCombo = `${heroPosition}_RFI`;
    const rangeData = getRangeData(positionCombo, rangeCategory);
    
    return (
      <div className="multi-range-display">
        <div className="range-section">
          <h3>Preflop {rangeCategory} Range - {heroPosition}</h3>
          <HandMatrix
            rangeData={rangeData?.hands || {}}
            rangeCategory={rangeCategory}
            currentHand={currentHand}
            visible={true}
          />
        </div>
      </div>
    );
  }

  // For vs RFI and RFI vs 3bet, we need separate charts for each opponent
  if (rangeCategory === 'vs RFI' || rangeCategory === 'RFI vs 3bet') {
    if (opponentPositions.length === 0) {
      return (
        <div className="multi-range-display">
          <div className="no-opponents">
            Select opponent positions to see ranges for {rangeCategory}
          </div>
        </div>
      );
    }

    return (
      <div className="multi-range-display">
        {opponentPositions.map((opponentPosition, index) => {
          let positionCombo: string;
          
          if (rangeCategory === 'vs RFI') {
            positionCombo = `${heroPosition}_vs_${opponentPosition}_RFI`;
          } else { // RFI vs 3bet
            positionCombo = `${heroPosition}_RFI_vs_3BET`;
          }
          
          const rangeData = getRangeData(positionCombo, rangeCategory);
          
          if (!rangeData) {
            return (
              <div key={`${opponentPosition}-${index}`} className="range-section">
                <h3>{heroPosition} {rangeCategory} vs {opponentPosition}</h3>
                <div className="no-range-data">
                  No range data available for this position combination
                </div>
              </div>
            );
          }

          return (
            <div key={`${opponentPosition}-${index}`} className="range-section">
              <h3>{heroPosition} {rangeCategory} vs {opponentPosition}</h3>
              <HandMatrix
                rangeData={rangeData.hands}
                rangeCategory={rangeCategory}
                currentHand={currentHand}
                visible={true}
              />
            </div>
          );
        })}
      </div>
    );
  }

  // For vs Limp - single chart based on hero position
  if (rangeCategory === 'vs Limp') {
    const positionCombo = `${heroPosition}_vs_LIMP`;
    const rangeData = getRangeData(positionCombo, rangeCategory);
    
    if (!rangeData || Object.keys(rangeData.hands).length === 0) {
      return (
        <div className="multi-range-display">
          <div className="range-section">
            <h3>{heroPosition} vs Limp (6bb)</h3>
            <div className="no-range-data">
              Range data not yet available for this position.
              <br />
              <small>Note: Raise size is 6bb (4bb + 2×1 limper)</small>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="multi-range-display">
        <div className="range-section">
          <h3>{heroPosition} vs Limp (6bb raise)</h3>
          <HandMatrix
            rangeData={rangeData.hands}
            rangeCategory={rangeCategory}
            currentHand={currentHand}
            visible={true}
          />
          <div className="range-notes">
            <small>
              <strong>Strategy:</strong> Assume single limper. Raise size: 6bb (4bb + 2×limpers).
              <br />
              Range should be strong - between RFI and vs-RFI 3betting range.
            </small>
          </div>
        </div>
      </div>
    );
  }

  // Fallback
  return (
    <div className="multi-range-display">
      <div className="range-section">
        <h3>Preflop {rangeCategory} Range - {heroPosition}</h3>
        <div className="no-range-data">
          Range category not implemented yet
        </div>
      </div>
    </div>
  );
};

export default MultiRangeDisplay;