import React from 'react';
import { Position, GradingMode } from '../../types';
import { RangeCategory } from '../RangeTabSelector/RangeTabSelector';
import { getAvailablePositionCombos, getRangeData } from '../../data/sampleRanges';
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
    } else if (positionCombo.includes('_3BET_vs_') && positionCombo.includes('_4BET')) {
      // Format: "BB_3BET_vs_CO_4BET" -> hero: BB, opponents: [CO]
      const parts = positionCombo.split('_');
      const hero = parts[0] as Position;
      const opponentIndex = parts.indexOf('vs') + 1;
      const opponent = parts[opponentIndex] as Position;
      return { hero, opponents: [opponent] };
    } else if (positionCombo.includes('_4BET_vs_') && positionCombo.includes('_JAM')) {
      // Format: "CO_4BET_vs_BU_JAM" -> hero: CO, opponents: [BU]
      const parts = positionCombo.split('_');
      const hero = parts[0] as Position;
      const opponentIndex = parts.indexOf('vs') + 1;
      const opponent = parts[opponentIndex] as Position;
      return { hero, opponents: [opponent] };
    } else if (positionCombo.includes('_vs_LIMP') || positionCombo.includes('_vs_SB_LIMP')) {
      // Format: "BB_vs_LIMP" -> hero: BB, opponents: [] (generic vs limp)
      // Format: "BB_vs_SB_LIMP" -> hero: BB, opponents: [SB] (vs SB limp)
      const parts = positionCombo.split('_');
      const hero = parts[0] as Position;
      if (positionCombo.includes('_vs_SB_LIMP')) {
        return { hero, opponents: ['SB'] };
      }
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
    } else if (positionCombo.includes('_3BET_vs_') && positionCombo.includes('_4BET')) {
      // "BB_3BET_vs_CO_4BET" -> "BB 3-bet vs CO 4-bet"
      return positionCombo.replace(/_/g, ' ').replace('3BET', '3-bet').replace('4BET', '4-bet');
    } else if (positionCombo.includes('_4BET_vs_') && positionCombo.includes('_JAM')) {
      // "CO_4BET_vs_BU_JAM" -> "CO 4BET vs BU JAM"
      return positionCombo.replace(/_/g, ' ');
    } else if (positionCombo.includes('_vs_SB_LIMP')) {
      // "BB_vs_SB_LIMP" -> "BB vs SB Limp"
      return positionCombo.replace(/_/g, ' ').replace('SB LIMP', 'SB Limp');
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
    } else if (positionCombo.includes('_3BET_vs_') && positionCombo.includes('_4BET')) {
      const { hero, opponents } = parsePositionCombo(positionCombo);
      return `You 3-bet from ${hero} and ${opponents[0]} 4-bet you. Practice your 5-bet/call/fold ranges.`;
    } else if (positionCombo.includes('_4BET_vs_') && positionCombo.includes('_JAM')) {
      const { hero, opponents } = parsePositionCombo(positionCombo);
      return `You 4-bet from ${hero} and ${opponents[0]} jammed (all-in). Practice your call/fold ranges.`;
    } else if (positionCombo.includes('_vs_SB_LIMP')) {
      const { hero, opponents } = parsePositionCombo(positionCombo);
      return `You are in ${hero} and ${opponents[0]} limped. Practice your isolation raising ranges.`;
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
            <h5>No {rangeCategory} ranges available</h5>
            <p>This category doesn't have pre-configured ranges yet. Available categories with data:</p>
            <ul>
              <li><strong>RFI</strong>: Raise First In ranges for all positions</li>
              <li><strong>vs RFI</strong>: Defending against raises from various positions</li>
              <li><strong>RFI vs 3bet</strong>: Some 4-betting ranges when your raise gets 3-bet</li>
              <li><strong>vs Limp</strong>: Isolation ranges against limpers</li>
            </ul>
            <p>Additional {rangeCategory} ranges will be added in future updates.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RangeSelector;