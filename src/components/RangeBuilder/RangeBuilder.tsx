import React, { useState } from 'react';
import { HandName, HandFrequencies } from '../../types';
import { ALL_RANGES } from '../../data/sampleRanges';
import InteractiveHandMatrix from './InteractiveHandMatrix';
import RangeViewModal from './RangeViewModal';
import SaveRangeModal from './SaveRangeModal';
import RangeComparisonModal from './RangeComparisonModal';
import PresetSelector from './PresetSelector';
import './RangeBuilder.css';

const RangeBuilder: React.FC = () => {
  const [selectedAction, setSelectedAction] = useState<string>('always-raise');
  const [rangeData, setRangeData] = useState<Record<HandName, HandFrequencies>>({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);
  const [isComparisonModalOpen, setIsComparisonModalOpen] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [draggedHands, setDraggedHands] = useState<Set<HandName>>(new Set());
  
  // Undo/Redo state
  const [rangeHistory, setRangeHistory] = useState<Record<HandName, HandFrequencies>[]>([{}]);
  const [historyIndex, setHistoryIndex] = useState(0);
  
  // New state for custom frequencies
  const [customFrequencies, setCustomFrequencies] = useState({
    raise: 50,
    call: 25,
    fold: 25
  });

  const getActionFrequencies = (action: string): HandFrequencies | null => {
    switch (action) {
      case 'always-raise':
        return { raise: 100, call: 0, fold: 0 };
      case 'mixed-frequency':
        return { raise: customFrequencies.raise, call: customFrequencies.call, fold: customFrequencies.fold };
      case 'always-call':
        return { raise: 0, call: 100, fold: 0 };
      case 'always-fold':
        return { raise: 0, call: 0, fold: 100 };
      case 'not-in-range':
        return null; // null indicates hand should be removed from range
      default:
        return { raise: 0, call: 0, fold: 100 };
    }
  };

  const roundTo25 = (value: number): number => {
    return Math.round(value / 25) * 25;
  };

  const updateCustomFrequency = (type: 'raise' | 'call' | 'fold', value: number) => {
    setCustomFrequencies(prev => {
      const updated = { ...prev, [type]: value };
      
      // Simple approach: adjust the other two values to maintain 100% total
      // while keeping everything in 25% increments
      const excess = updated.raise + updated.call + updated.fold - 100;
      
      if (excess !== 0) {
        if (type === 'raise') {
          // Distribute excess between call and fold
          const halfExcess = excess / 2;
          updated.call = Math.max(0, roundTo25(updated.call - halfExcess));
          updated.fold = Math.max(0, roundTo25(updated.fold - halfExcess));
          
          // Ensure total is exactly 100%
          const currentTotal = updated.raise + updated.call + updated.fold;
          const remaining = 100 - currentTotal;
          if (remaining !== 0) {
            // Add remaining to fold (or call if fold is 0)
            if (updated.fold > 0 || updated.call === 0) {
              updated.fold = Math.max(0, updated.fold + remaining);
            } else {
              updated.call = Math.max(0, updated.call + remaining);
            }
          }
        } else if (type === 'call') {
          // Distribute excess between raise and fold
          const halfExcess = excess / 2;
          updated.raise = Math.max(0, roundTo25(updated.raise - halfExcess));
          updated.fold = Math.max(0, roundTo25(updated.fold - halfExcess));
          
          // Ensure total is exactly 100%
          const currentTotal = updated.raise + updated.call + updated.fold;
          const remaining = 100 - currentTotal;
          if (remaining !== 0) {
            // Add remaining to fold (or raise if fold is 0)
            if (updated.fold > 0 || updated.raise === 0) {
              updated.fold = Math.max(0, updated.fold + remaining);
            } else {
              updated.raise = Math.max(0, updated.raise + remaining);
            }
          }
        } else { // fold
          // Distribute excess between raise and call
          const halfExcess = excess / 2;
          updated.raise = Math.max(0, roundTo25(updated.raise - halfExcess));
          updated.call = Math.max(0, roundTo25(updated.call - halfExcess));
          
          // Ensure total is exactly 100%
          const currentTotal = updated.raise + updated.call + updated.fold;
          const remaining = 100 - currentTotal;
          if (remaining !== 0) {
            // Add remaining to raise (or call if raise is 0)
            if (updated.raise > 0 || updated.call === 0) {
              updated.raise = Math.max(0, updated.raise + remaining);
            } else {
              updated.call = Math.max(0, updated.call + remaining);
            }
          }
        }
        
        // Final safety check to ensure all values are multiples of 25
        updated.raise = roundTo25(updated.raise);
        updated.call = roundTo25(updated.call);
        updated.fold = roundTo25(updated.fold);
        
        // One final adjustment to ensure 100% total
        const finalTotal = updated.raise + updated.call + updated.fold;
        if (finalTotal !== 100) {
          const diff = 100 - finalTotal;
          // Add difference to the largest non-changed value
          if (type !== 'fold' && updated.fold >= Math.max(updated.raise, updated.call)) {
            updated.fold += diff;
          } else if (type !== 'raise' && updated.raise >= Math.max(updated.call, updated.fold)) {
            updated.raise += diff;
          } else if (type !== 'call') {
            updated.call += diff;
          }
        }
      }
      
      return updated;
    });
  };

  const isHandMatchingAction = (handName: HandName, action: string): boolean => {
    const currentFreqs = rangeData[handName];
    
    if (action === 'not-in-range') {
      // Hand matches "not-in-range" if it's not in the range data
      return !currentFreqs;
    }
    
    if (!currentFreqs) return false;
    
    const targetFreqs = getActionFrequencies(action);
    if (!targetFreqs) return false;
    
    return (
      currentFreqs.raise === targetFreqs.raise &&
      currentFreqs.call === targetFreqs.call &&
      currentFreqs.fold === targetFreqs.fold
    );
  };

  const handleHandClick = (handName: HandName) => {
    // If clicking the same action that's already applied, deselect (set to Always Fold)
    const shouldDeselect = isHandMatchingAction(handName, selectedAction);
    
    const actionFrequencies = getActionFrequencies(selectedAction);
    
    let newRangeData;
    if (selectedAction === 'not-in-range' || actionFrequencies === null) {
      // Remove hand from range entirely
      const { [handName]: removed, ...rest } = rangeData;
      newRangeData = rest;
    } else {
      const newFrequencies: HandFrequencies = shouldDeselect 
        ? { raise: 0, call: 0, fold: 100 } // Always Fold (deselected)
        : actionFrequencies;

      newRangeData = {
        ...rangeData,
        [handName]: newFrequencies
      };
    }

    setRangeData(newRangeData);
    addToHistory(newRangeData);
  };

  const handleMouseDown = (handName: HandName) => {
    setIsDragging(true);
    setDraggedHands(new Set([handName]));
  };

  const handleMouseEnter = (handName: HandName) => {
    if (isDragging) {
      setDraggedHands(prev => new Set([...Array.from(prev), handName]));
    }
  };

  const handleMouseUp = () => {
    if (isDragging && draggedHands.size > 1) {
      // Apply selected action to all dragged hands
      const actionFrequencies = getActionFrequencies(selectedAction);
      
      let newRangeData = { ...rangeData };
      
      if (selectedAction === 'not-in-range' || actionFrequencies === null) {
        // Remove hands from range entirely
        draggedHands.forEach(handName => {
          const { [handName]: removed, ...rest } = newRangeData;
          newRangeData = rest;
        });
      } else {
        // Set frequencies for each hand
        draggedHands.forEach(handName => {
          newRangeData[handName] = actionFrequencies;
        });
      }
      
      setRangeData(newRangeData);
      addToHistory(newRangeData);
    }
    
    setIsDragging(false);
    setDraggedHands(new Set());
  };

  const validateRangeData = (): { isValid: boolean; errors: string[] } => {
    const errors: string[] = [];
    
    Object.entries(rangeData).forEach(([handName, frequencies]) => {
      // Check for negative percentages
      if (frequencies.raise < 0 || frequencies.call < 0 || frequencies.fold < 0) {
        errors.push(`${handName}: Contains negative percentage values`);
      }
      
      // Check frequencies sum to 100%
      const total = frequencies.raise + frequencies.call + frequencies.fold;
      if (Math.abs(total - 100) > 0.1) { // Allow small floating point errors
        errors.push(`${handName}: Frequencies don't sum to 100% (currently ${total.toFixed(1)}%)`);
      }
      
      // Validate hand name format
      const validHandPattern = /^(A[AKQJT98765432][so]?|K[KQJT98765432][so]?|Q[QJT98765432][so]?|J[JT98765432][so]?|T[T98765432][so]?|9[98765432][so]?|8[8765432][so]?|7[765432][so]?|6[65432][so]?|5[5432][so]?|4[432][so]?|3[32][so]?|2[2][so]?)$/;
      if (!validHandPattern.test(handName)) {
        errors.push(`${handName}: Invalid poker hand name format`);
      }
      
      // Check for valid suit designators
      if (handName.length === 3 && !handName.endsWith('s') && !handName.endsWith('o')) {
        errors.push(`${handName}: Must end with 's' (suited) or 'o' (offsuit)`);
      }
      
      // Check pocket pairs don't have suit designators
      if (handName.length > 2 && handName[0] === handName[1]) {
        errors.push(`${handName}: Pocket pairs should not have suit designators`);
      }
    });
    
    return {
      isValid: errors.length === 0,
      errors
    };
  };

  const handleCopyToClipboard = async () => {
    // Include all hands in rangeData, even those with 100% fold
    const allHandsInRange = Object.entries(rangeData);

    if (allHandsInRange.length === 0) {
      alert('No hands in range to copy!');
      return;
    }

    // Validate data before export
    const validation = validateRangeData();
    if (!validation.isValid) {
      const errorMessage = `Range validation failed:\n${validation.errors.join('\n')}\n\nCopy anyway?`;
      if (!window.confirm(errorMessage)) {
        return;
      }
    }

    const tsOutput = `const CUSTOM_RANGE = {
  positionCombo: 'CUSTOM_RANGE',
  hands: {
${allHandsInRange.map(([handName, frequencies]) => 
  `    '${handName}': { raise: ${frequencies.raise}, call: ${frequencies.call}, fold: ${frequencies.fold} }`
).join(',\n')}
  }
};`;

    try {
      await navigator.clipboard.writeText(tsOutput);
      alert('Range data copied to clipboard!');
    } catch (err) {
      console.error('Failed to copy to clipboard:', err);
      alert('Failed to copy to clipboard. Please try using the View button instead.');
    }
  };

  const handleClearAll = () => {
    const confirmClear = window.confirm('Are you sure you want to clear all hands from the range?');
    if (confirmClear) {
      setRangeData({});
      addToHistory({});
    }
  };

  const handleSaveRange = () => {
    // Include all hands in rangeData, even those with 100% fold
    const allHandsInRange = Object.entries(rangeData);

    if (allHandsInRange.length === 0) {
      alert('No hands in range to save!');
      return;
    }

    // Validate data before opening save modal
    const validation = validateRangeData();
    if (!validation.isValid) {
      const errorMessage = `Range validation failed:\n${validation.errors.join('\n')}\n\nContinue with save anyway?`;
      if (!window.confirm(errorMessage)) {
        return;
      }
    }

    // Open the save modal
    setIsSaveModalOpen(true);
  };

  const handleSaveConfirm = (rangeName: string, isCustom: boolean) => {
    try {
      if (isCustom) {
        // Save as new custom range
        const cleanRangeName = rangeName.trim().toUpperCase().replace(/[^A-Z0-9_]/g, '_');
        
        const savedRange = {
          positionCombo: cleanRangeName,
          hands: { ...rangeData }
        };

        const existingRanges = JSON.parse(localStorage.getItem('custom_poker_ranges') || '[]');
        
        // Check if range name already exists
        const existingIndex = existingRanges.findIndex((range: any) => range.positionCombo === cleanRangeName);
        if (existingIndex >= 0) {
          const overwrite = window.confirm(`Custom range "${cleanRangeName}" already exists. Overwrite?`);
          if (!overwrite) {
            return;
          }
          existingRanges[existingIndex] = savedRange;
        } else {
          existingRanges.push(savedRange);
        }

        localStorage.setItem('custom_poker_ranges', JSON.stringify(existingRanges));
        alert(`Custom range "${cleanRangeName}" saved successfully!`);
      } else {
        // Save as modified version of existing range
        const modifiedName = `MODIFIED_${rangeName}`;
        const savedRange = {
          positionCombo: modifiedName,
          hands: { ...rangeData }
        };

        const existingRanges = JSON.parse(localStorage.getItem('custom_poker_ranges') || '[]');
        
        // Check if modified name already exists
        const existingIndex = existingRanges.findIndex((range: any) => range.positionCombo === modifiedName);
        if (existingIndex >= 0) {
          existingRanges[existingIndex] = savedRange;
        } else {
          existingRanges.push(savedRange);
        }

        localStorage.setItem('custom_poker_ranges', JSON.stringify(existingRanges));
        alert(`Range saved as "${modifiedName}" in custom ranges!`);
      }
    } catch (error) {
      console.error('Error saving range:', error);
      alert('Failed to save range. Please try again.');
    }
  };

  const handleLoadPreset = (presetRangeData: Record<HandName, HandFrequencies>) => {
    setRangeData(presetRangeData);
    addToHistory(presetRangeData);
  };

  const addToHistory = (newRangeData: Record<HandName, HandFrequencies>) => {
    const newHistory = rangeHistory.slice(0, historyIndex + 1);
    newHistory.push({ ...newRangeData });
    
    // Limit history to 50 entries to prevent memory issues
    if (newHistory.length > 50) {
      newHistory.shift();
    } else {
      setHistoryIndex(historyIndex + 1);
    }
    
    setRangeHistory(newHistory);
  };

  const handleUndo = () => {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1;
      setHistoryIndex(newIndex);
      setRangeData({ ...rangeHistory[newIndex] });
    }
  };

  const handleRedo = () => {
    if (historyIndex < rangeHistory.length - 1) {
      const newIndex = historyIndex + 1;
      setHistoryIndex(newIndex);
      setRangeData({ ...rangeHistory[newIndex] });
    }
  };

  const canUndo = historyIndex > 0;
  const canRedo = historyIndex < rangeHistory.length - 1;

  const hasAnyHands = () => {
    return Object.values(rangeData).some(frequencies => 
      frequencies.raise > 0 || frequencies.call > 0
    );
  };

  const isMixedAction = (action: string) => {
    return action === 'mixed-frequency';
  };

  const renderFrequencyControls = () => {
    if (!isMixedAction(selectedAction)) return null;

    const frequencies = customFrequencies;
    
    return (
      <div className="frequency-controls">
        <h4>Mixed Frequency Settings</h4>
        <div className="frequency-sliders">
          <div className="frequency-slider">
            <label>Raise: {frequencies.raise}%</label>
            <input
              type="range"
              min="0"
              max="100"
              step="25"
              value={frequencies.raise}
              onChange={(e) => updateCustomFrequency('raise', parseInt(e.target.value))}
              className="slider raise-slider"
            />
          </div>
          <div className="frequency-slider">
            <label>Call: {frequencies.call}%</label>
            <input
              type="range"
              min="0"
              max="100"
              step="25"
              value={frequencies.call}
              onChange={(e) => updateCustomFrequency('call', parseInt(e.target.value))}
              className="slider call-slider"
            />
          </div>
          <div className="frequency-slider">
            <label>Fold: {frequencies.fold}%</label>
            <input
              type="range"
              min="0"
              max="100"
              step="25"
              value={frequencies.fold}
              onChange={(e) => updateCustomFrequency('fold', parseInt(e.target.value))}
              className="slider fold-slider"
            />
          </div>
        </div>
        <div className="frequency-total">
          Total: {frequencies.raise + frequencies.call + frequencies.fold}%
        </div>
      </div>
    );
  };

  return (
    <div className="range-builder">
      <h1>Range Builder Dev Tool</h1>
      
      <div className="range-builder-content">
        <PresetSelector onLoadPreset={handleLoadPreset} />
        
        <div className="action-selector">
          <h3>Select Action</h3>
          <div className="action-buttons">
            <button 
              className={selectedAction === 'always-raise' ? 'active' : ''}
              onClick={() => setSelectedAction('always-raise')}
            >
              Always Raise
            </button>
            <button 
              className={selectedAction === 'mixed-frequency' ? 'active' : ''}
              onClick={() => setSelectedAction('mixed-frequency')}
            >
              Mixed Frequency
            </button>
            <button 
              className={selectedAction === 'always-call' ? 'active' : ''}
              onClick={() => setSelectedAction('always-call')}
            >
              Always Call
            </button>
            <button 
              className={selectedAction === 'always-fold' ? 'active' : ''}
              onClick={() => setSelectedAction('always-fold')}
            >
              Always Fold
            </button>
            <button 
              className={selectedAction === 'not-in-range' ? 'active' : ''}
              onClick={() => setSelectedAction('not-in-range')}
            >
              Not in Range
            </button>
          </div>
          
          {renderFrequencyControls()}
        </div>

        <div className="range-grid-container">
          <InteractiveHandMatrix
            rangeData={rangeData}
            selectedAction={selectedAction}
            onHandClick={handleHandClick}
            onMouseDown={handleMouseDown}
            onMouseEnter={handleMouseEnter}
            onMouseUp={handleMouseUp}
            isDragging={isDragging}
            draggedHands={draggedHands}
          />
        </div>

        <div className="range-actions">
          <div className="history-controls">
            <button 
              className="undo-button" 
              onClick={handleUndo}
              disabled={!canUndo}
              title="Undo (Ctrl+Z)"
            >
              ↶ Undo
            </button>
            <button 
              className="redo-button" 
              onClick={handleRedo}
              disabled={!canRedo}
              title="Redo (Ctrl+Y)"
            >
              ↷ Redo
            </button>
          </div>
          
          <div className="export-controls">
            <button className="save-button" onClick={handleSaveRange}>
              💾 Save Range
            </button>
            <button className="view-button" onClick={() => setIsModalOpen(true)}>
              View Range Data
            </button>
            <button className="copy-button" onClick={handleCopyToClipboard}>
              Copy to Clipboard
            </button>
            <button className="compare-button" onClick={() => setIsComparisonModalOpen(true)}>
              📊 Compare Ranges
            </button>
            <button className="clear-button" onClick={handleClearAll}>
              Clear All
            </button>
          </div>
        </div>
      </div>

      <RangeViewModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        rangeData={rangeData}
      />

      <SaveRangeModal
        isOpen={isSaveModalOpen}
        onClose={() => setIsSaveModalOpen(false)}
        rangeData={rangeData}
        onSave={handleSaveConfirm}
      />

      <RangeComparisonModal
        isOpen={isComparisonModalOpen}
        onClose={() => setIsComparisonModalOpen(false)}
      />
    </div>
  );
};

export default RangeBuilder;