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
          <div className="bet-sizing-guidance">
            <strong>Bet Sizing:</strong>
            <ul>
              <li><strong>Live poker:</strong> Raise to 3-4bb</li>
              <li><strong>Online poker:</strong> Raise to 2.5bb from everywhere except SB where you raise to 3bb</li>
            </ul>
          </div>
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

  // For vs RFI, RFI vs 3bet, and 3bet vs 4bet, we need separate charts for each opponent
  if (rangeCategory === 'vs RFI' || rangeCategory === 'RFI vs 3bet' || rangeCategory === '3bet vs 4bet') {
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
          let dependencyRangeData = undefined;
          
          if (rangeCategory === 'vs RFI') {
            positionCombo = `${heroPosition}_vs_${opponentPosition}_RFI`;
            // For vs RFI, the dependency is the opponent's RFI range
            const opponentRfiCombo = `${opponentPosition}_RFI`;
            const opponentRfiRange = getRangeData(opponentRfiCombo, 'RFI');
            dependencyRangeData = opponentRfiRange?.hands;
          } else if (rangeCategory === 'RFI vs 3bet') {
            positionCombo = `${heroPosition}_RFI_vs_${opponentPosition}_3BET`;
            // For RFI vs 3bet, the dependency is our own RFI range
            const heroRfiCombo = `${heroPosition}_RFI`;
            const heroRfiRange = getRangeData(heroRfiCombo, 'RFI');
            dependencyRangeData = heroRfiRange?.hands;
          } else { // 3bet vs 4bet
            positionCombo = `${heroPosition}_3BET_vs_${opponentPosition}_4BET`;
            // For 3bet vs 4bet, the dependency is our own 3bet range
            const hero3betCombo = `${heroPosition}_vs_${opponentPosition}_RFI`;
            const hero3betRange = getRangeData(hero3betCombo, 'vs RFI');
            dependencyRangeData = hero3betRange?.hands;
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
              {rangeCategory === 'vs RFI' && (
                <div className="bet-sizing-guidance">
                  <strong>3-bet Sizing:</strong> 3x their total bet size if you are IP, 4x if OOP
                </div>
              )}
              {rangeCategory === 'RFI vs 3bet' && (
                <div className="bet-sizing-guidance">
                  <strong>4-bet Sizing:</strong> 2.5x their total bet size
                </div>
              )}
              {rangeCategory === '3bet vs 4bet' && (
                <div className="bet-sizing-guidance">
                  <strong>5-bet Sizing:</strong> 2.2x their total bet size or jam
                </div>
              )}
              <HandMatrix
                rangeData={rangeData.hands}
                rangeCategory={rangeCategory}
                missingHandTreatment={rangeData.missingHandTreatment}
                currentHand={currentHand}
                visible={true}
                dependencyRangeData={dependencyRangeData}
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
            <h3>{heroPosition} vs Limp</h3>
            <div className="bet-sizing-guidance">
              <strong>Isolation Sizing:</strong> 6bb (4bb + 2×limpers) - assume single limper
              <br />
              <strong>Range Construction:</strong> Range should be strong - between RFI and vs-RFI 3betting range
              <br />
              <strong>Multiple Limpers:</strong> Tighten range by removing bluffier hands (suited connectors, weaker Ax). Keep premium hands at same frequencies, fold most 50% frequency hands against 2+ limpers.
            </div>
            <div className="no-range-data">
              Range data not yet available for this position.
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="multi-range-display">
        <div className="range-section">
          <h3>{heroPosition} vs Limp</h3>
          <div className="bet-sizing-guidance">
            <strong>Isolation Sizing:</strong> 6bb (4bb + 2×limpers) - assume single limper
            <br />
            <strong>Range Construction:</strong> Range should be strong - between RFI and vs-RFI 3betting range
            <br />
            <strong>Multiple Limpers:</strong> Tighten range by removing bluffier hands (suited connectors, weaker Ax). Keep premium hands at same frequencies, fold most 50% frequency hands against 2+ limpers.
          </div>
          <HandMatrix
            rangeData={rangeData.hands}
            rangeCategory={rangeCategory}
            currentHand={currentHand}
            visible={true}
            missingHandTreatment="fold"
          />
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