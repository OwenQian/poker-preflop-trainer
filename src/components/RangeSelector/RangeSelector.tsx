import React from 'react';
import { Position, GradingMode } from '../../types';
import { RangeCategory } from '../RangeTabSelector/RangeTabSelector';
import { getAvailablePositionCombos } from '../../data/sampleRanges';
import './RangeSelector.css';

interface RangeSelectorProps {
  selectedRange: string | null;
  rangeCategory: RangeCategory;
  strictnessLevel: GradingMode;
  onRangeSelect: (range: string, heroPosition: Position, opponentPositions: Position[]) => void;
  onStrictnessChange: (strictness: GradingMode) => void;
}

const RangeSelector: React.FC<RangeSelectorProps> = ({
  selectedRange,
  rangeCategory,
  strictnessLevel,
  onRangeSelect,
  onStrictnessChange
}) => {
  const availableRanges = getAvailablePositionCombos(rangeCategory);

  const parsePositionCombo = (positionCombo: string): { hero: Position; opponents: Position[] } => {
    // Parse different position combo formats
    if (positionCombo.includes('_vs_') && positionCombo.includes('_RFI')) {
      // Format: "BB_vs_BU_RFI" -> hero: BB, opponents: [BU]
      const parts = positionCombo.split('_');
      const hero = parts[0] as Position;
      const opponentIndex = parts.indexOf('vs') + 1;
      const opponent = parts[opponentIndex] as Position;
      return { hero, opponents: [opponent] };
    } else if (positionCombo.includes('_RFI_vs_')) {
      // Format: "BU_RFI_vs_3BET" -> hero: BU, opponents: [] (generic 3bet response)
      const parts = positionCombo.split('_');
      const hero = parts[0] as Position;
      return { hero, opponents: [] };
    } else if (positionCombo.includes('_vs_LIMP')) {
      // Format: "BB_vs_LIMP" -> hero: BB, opponents: [] (generic vs limp)
      const parts = positionCombo.split('_');
      const hero = parts[0] as Position;
      return { hero, opponents: [] };
    } else if (positionCombo.includes('_RFI')) {
      // Format: "BU_RFI" -> hero: BU, opponents: [] (generic RFI)
      const parts = positionCombo.split('_');
      const hero = parts[0] as Position;
      return { hero, opponents: [] };
    }
    
    // Fallback
    return { hero: 'BB' as Position, opponents: [] };
  };

  const formatRangeDisplayName = (positionCombo: string): string => {
    if (positionCombo.includes('_vs_') && positionCombo.includes('_RFI')) {
      // "BB_vs_BU_RFI" -> "BB vs BU RFI"
      return positionCombo.replace(/_/g, ' ');
    } else if (positionCombo.includes('_RFI_vs_')) {
      // "BU_RFI_vs_3BET" -> "BU RFI vs 3-bet"
      return positionCombo.replace(/_/g, ' ').replace('3BET', '3-bet');
    } else if (positionCombo.includes('_vs_LIMP')) {
      // "BB_vs_LIMP" -> "BB vs Limp"
      return positionCombo.replace(/_/g, ' ').replace('LIMP', 'Limp');
    } else if (positionCombo.includes('_RFI')) {
      // "BU_RFI" -> "BU RFI"
      return positionCombo.replace(/_/g, ' ');
    }
    
    return positionCombo.replace(/_/g, ' ');
  };

  const getRangeDescription = (positionCombo: string): string => {
    if (positionCombo.includes('_vs_') && positionCombo.includes('_RFI')) {
      const { hero, opponents } = parsePositionCombo(positionCombo);
      return `You are in ${hero} and facing an RFI from ${opponents[0]}. Practice your 3-betting and calling ranges.`;
    } else if (positionCombo.includes('_RFI_vs_')) {
      const { hero } = parsePositionCombo(positionCombo);
      return `You raised from ${hero} and are facing a 3-bet. Practice your 4-betting and calling ranges.`;
    } else if (positionCombo.includes('_vs_LIMP')) {
      const { hero } = parsePositionCombo(positionCombo);
      return `You are in ${hero} facing limpers. Practice your isolation raising ranges.`;
    } else if (positionCombo.includes('_RFI')) {
      const { hero } = parsePositionCombo(positionCombo);
      return `You are in ${hero} and action is folded to you. Practice your raise-first-in ranges.`;
    }
    
    return 'Practice your preflop decision making.';
  };

  const handleRangeClick = (positionCombo: string) => {
    const { hero, opponents } = parsePositionCombo(positionCombo);
    onRangeSelect(positionCombo, hero, opponents);
  };

  return (
    <div className="range-selector">
      <div className="range-selector-header">
        <h3>Select Range to Practice</h3>
        <p>Choose a specific range scenario for your quiz session</p>
      </div>

      <div className="strictness-selector">
        <h4>Quiz Strictness Level</h4>
        <p>Each strictness level maintains separate progress tracking</p>
        <div className="strictness-options">
          <div 
            className={`strictness-option ${strictnessLevel === 'lax' ? 'selected' : ''}`}
            onClick={() => onStrictnessChange('lax')}
          >
            <div className="strictness-option-header">
              <h5>Lax Mode</h5>
              {strictnessLevel === 'lax' && <span className="selected-indicator">✓</span>}
            </div>
            <p>Select at least ONE correct action to be marked correct</p>
          </div>
          
          <div 
            className={`strictness-option ${strictnessLevel === 'strict' ? 'selected' : ''}`}
            onClick={() => onStrictnessChange('strict')}
          >
            <div className="strictness-option-header">
              <h5>Strict Mode</h5>
              {strictnessLevel === 'strict' && <span className="selected-indicator">✓</span>}
            </div>
            <p>Must select ALL correct actions to be marked correct</p>
          </div>
          
          <div 
            className={`strictness-option ${strictnessLevel === 'randomizer' ? 'selected' : ''}`}
            onClick={() => onStrictnessChange('randomizer')}
          >
            <div className="strictness-option-header">
              <h5>Randomizer Mode</h5>
              {strictnessLevel === 'randomizer' && <span className="selected-indicator">✓</span>}
            </div>
            <p>One correct action chosen randomly based on frequencies</p>
          </div>
        </div>
      </div>

      <div className="range-categories">
        <h4>{rangeCategory} Ranges</h4>
        <div className="range-options">
          {availableRanges.map((positionCombo) => (
            <div 
              key={positionCombo}
              className={`range-option ${selectedRange === positionCombo ? 'selected' : ''}`}
              onClick={() => handleRangeClick(positionCombo)}
            >
              <div className="range-option-header">
                <h5>{formatRangeDisplayName(positionCombo)}</h5>
                {selectedRange === positionCombo && <span className="selected-indicator">✓</span>}
              </div>
              <p className="range-option-description">
                {getRangeDescription(positionCombo)}
              </p>
            </div>
          ))}
        </div>
        
        {availableRanges.length === 0 && (
          <div className="no-ranges">
            <p>No ranges available for {rangeCategory}. Try selecting a different category.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RangeSelector;