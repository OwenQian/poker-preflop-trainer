import React, { useState, useEffect } from 'react';
import { HandName, HandFrequencies } from '../../types';
import { ALL_RANGES } from '../../data/sampleRanges';
import './SaveRangeModal.css';

interface SaveRangeModalProps {
  isOpen: boolean;
  onClose: () => void;
  rangeData: Record<HandName, HandFrequencies>;
  onSave: (rangeName: string, isCustom: boolean) => void;
}

const SaveRangeModal: React.FC<SaveRangeModalProps> = ({
  isOpen,
  onClose,
  rangeData,
  onSave
}) => {
  const [selectedRange, setSelectedRange] = useState<string>('custom');
  const [customRangeName, setCustomRangeName] = useState<string>('');
  const [availableRanges, setAvailableRanges] = useState<string[]>([]);

  useEffect(() => {
    if (isOpen) {
      // Get all available preset ranges
      const allPresetRanges: string[] = [];
      
      // Add ranges from all categories
      Object.entries(ALL_RANGES).forEach(([category, ranges]) => {
        ranges.forEach(range => {
          allPresetRanges.push(`${category}: ${range.positionCombo}`);
        });
      });

      // Get existing custom ranges
      try {
        const customRanges = JSON.parse(localStorage.getItem('custom_poker_ranges') || '[]');
        const customRangeNames = customRanges.map((range: any) => `Custom: ${range.positionCombo}`);
        
        setAvailableRanges([...allPresetRanges, ...customRangeNames]);
      } catch (error) {
        console.error('Error loading custom ranges:', error);
        setAvailableRanges(allPresetRanges);
      }

      // Reset form
      setSelectedRange('custom');
      setCustomRangeName('');
    }
  }, [isOpen]);

  const handleSave = () => {
    if (selectedRange === 'custom') {
      if (!customRangeName.trim()) {
        alert('Please enter a name for your custom range');
        return;
      }
      onSave(customRangeName.trim(), true);
    } else {
      // Extract the position combo from the selected range
      const rangeParts = selectedRange.split(': ');
      if (rangeParts.length === 2) {
        const positionCombo = rangeParts[1];
        onSave(positionCombo, false);
      } else {
        alert('Invalid range selection');
        return;
      }
    }
    onClose();
  };

  const handleCancel = () => {
    onClose();
  };

  const allHandsInRange = Object.entries(rangeData);

  if (!isOpen) return null;

  return (
    <div className="save-range-modal-overlay">
      <div className="save-range-modal">
        <div className="save-range-modal-header">
          <h3>Save Range</h3>
          <button className="save-range-modal-close" onClick={handleCancel}>
            ✕
          </button>
        </div>

        <div className="save-range-modal-content">
          <div className="range-info">
            <p><strong>Hands in range:</strong> {allHandsInRange.length}</p>
            <p><strong>Sample hands:</strong> {allHandsInRange.slice(0, 5).map(([hand]) => hand).join(', ')}{allHandsInRange.length > 5 ? '...' : ''}</p>
          </div>

          <div className="save-options">
            <div className="save-option-field">
              <label htmlFor="range-select">Save as:</label>
              <select 
                id="range-select"
                value={selectedRange} 
                onChange={(e) => setSelectedRange(e.target.value)}
                className="range-select"
              >
                <option value="custom">💾 New Custom Range</option>
                <optgroup label="Preset Ranges">
                  {availableRanges.map((range, index) => (
                    <option key={index} value={range}>
                      {range.startsWith('Custom: ') ? '📝' : '📊'} {range}
                    </option>
                  ))}
                </optgroup>
              </select>
            </div>

            {selectedRange === 'custom' && (
              <div className="custom-range-field">
                <label htmlFor="custom-name">Custom Range Name:</label>
                <input
                  id="custom-name"
                  type="text"
                  value={customRangeName}
                  onChange={(e) => setCustomRangeName(e.target.value)}
                  placeholder="e.g., MY_UTG_RFI, CUSTOM_3BET"
                  className="custom-name-input"
                  maxLength={50}
                />
                <small>Name will be automatically formatted (uppercase, underscores only)</small>
              </div>
            )}

            {selectedRange !== 'custom' && (
              <div className="overwrite-warning">
                <p>⚠️ <strong>Note:</strong> This will save as a modified version in your custom ranges.</p>
                <p>Original preset ranges cannot be directly overwritten.</p>
              </div>
            )}
          </div>
        </div>

        <div className="save-range-modal-actions">
          <button className="cancel-button" onClick={handleCancel}>
            Cancel
          </button>
          <button 
            className="confirm-save-button" 
            onClick={handleSave}
            disabled={selectedRange === 'custom' && !customRangeName.trim()}
          >
            💾 Save Range
          </button>
        </div>
      </div>
    </div>
  );
};

export default SaveRangeModal;