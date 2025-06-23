import React, { useState } from 'react';
import { HandName, HandFrequencies } from '../../types';
import { ALL_RANGES, getAvailablePositionCombos } from '../../data/sampleRanges';
import { RangeCategory } from '../RangeTabSelector/RangeTabSelector';
import './PresetSelector.css';

type ExtendedRangeCategory = RangeCategory | 'Custom Ranges';

interface PresetSelectorProps {
  onLoadPreset: (rangeData: Record<HandName, HandFrequencies>) => void;
}

const PresetSelector: React.FC<PresetSelectorProps> = ({ onLoadPreset }) => {
  const [selectedCategory, setSelectedCategory] = useState<ExtendedRangeCategory>('RFI');
  const [selectedPosition, setSelectedPosition] = useState<string>('');
  const [isExpanded, setIsExpanded] = useState(false);

  const handleLoadPreset = () => {
    try {
      if (!selectedPosition) {
        alert('Please select a position first');
        return;
      }

      let selectedRange;
      
      if (selectedCategory === 'Custom Ranges') {
        // Load from localStorage
        const customRanges = JSON.parse(localStorage.getItem('custom_poker_ranges') || '[]');
        selectedRange = customRanges.find((range: any) => range.positionCombo === selectedPosition);
      } else {
        // Load from predefined ranges
        const categoryRanges = ALL_RANGES[selectedCategory as RangeCategory];
        if (!categoryRanges) {
          alert(`No ranges available for category: ${selectedCategory}`);
          return;
        }
        selectedRange = categoryRanges.find(range => range.positionCombo === selectedPosition);
      }

      if (!selectedRange) {
        alert('Range not found for selected position');
        return;
      }

      const confirmLoad = window.confirm(
        `Load ${selectedPosition} preset? This will replace your current range.`
      );

      if (confirmLoad) {
        onLoadPreset(selectedRange.hands);
        setIsExpanded(false);
      }
    } catch (error) {
      console.error('Error loading preset:', error);
      alert('Error loading preset range. Please try again.');
    }
  };

  const availablePositions = React.useMemo(() => {
    try {
      if (selectedCategory === 'Custom Ranges') {
        // Get custom ranges from localStorage
        const customRanges = JSON.parse(localStorage.getItem('custom_poker_ranges') || '[]');
        return customRanges.map((range: any) => range.positionCombo);
      } else {
        return getAvailablePositionCombos(selectedCategory as RangeCategory);
      }
    } catch (error) {
      console.error('Error getting available position combos:', error);
      return [];
    }
  }, [selectedCategory]);

  if (!isExpanded) {
    return (
      <div className="preset-selector-collapsed">
        <button 
          className="preset-toggle-button"
          onClick={() => setIsExpanded(true)}
        >
          📁 Load Preset Range
        </button>
      </div>
    );
  }

  return (
    <div className="preset-selector">
      <div className="preset-header">
        <h4>Load Preset Range</h4>
        <button 
          className="preset-close-button"
          onClick={() => setIsExpanded(false)}
        >
          ✕
        </button>
      </div>

      <div className="preset-controls">
        <div className="preset-field">
          <label>Range Category:</label>
          <select 
            value={selectedCategory} 
            onChange={(e) => {
              setSelectedCategory(e.target.value as ExtendedRangeCategory);
              setSelectedPosition(''); // Reset position when category changes
            }}
          >
            <option value="RFI">RFI (Raise First In)</option>
            <option value="vs RFI">vs RFI (Defending)</option>
            <option value="RFI vs 3bet">RFI vs 3bet (4bet/Call)</option>
            <option value="vs Limp">vs Limp (Isolation)</option>
            <option value="Custom Ranges">💾 Custom Ranges</option>
          </select>
        </div>

        <div className="preset-field">
          <label>Position:</label>
          <select 
            value={selectedPosition} 
            onChange={(e) => setSelectedPosition(e.target.value)}
          >
            <option value="">Select position...</option>
            {availablePositions.map((position: string) => (
              <option key={position} value={position}>
                {position}
              </option>
            ))}
          </select>
        </div>

        <div className="preset-actions">
          <button 
            className="load-preset-button"
            onClick={handleLoadPreset}
            disabled={!selectedPosition}
          >
            Load Preset
          </button>
          <button 
            className="cancel-preset-button"
            onClick={() => setIsExpanded(false)}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default PresetSelector;