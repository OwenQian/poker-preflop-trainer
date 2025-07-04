import React, { useState, useRef } from 'react';
import { 
  exportAppState, 
  importAppState, 
  downloadStateFile, 
  getStateAsText, 
  parseStateFromText, 
  copyStateToClipboard,
  AppState
} from '../../utils/storage/stateManager';
import './StateManager.css';

interface StateManagerProps {
  onStateImported?: () => void;
}

interface RangeSelection {
  id: string;
  description: string;
  handIds: string[];
  stats: {
    totalHands: number;
    totalReviews: number;
    accuracy: number;
  };
}

const StateManager: React.FC<StateManagerProps> = ({ onStateImported }) => {
  const [showStateText, setShowStateText] = useState(false);
  const [stateText, setStateText] = useState('');
  const [importText, setImportText] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState<'success' | 'error'>('success');
  const [showImportSelection, setShowImportSelection] = useState(false);
  const [availableSelections, setAvailableSelections] = useState<RangeSelection[]>([]);
  const [selectedRanges, setSelectedRanges] = useState<Set<string>>(new Set());
  const [parsedImportData, setParsedImportData] = useState<any>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const showMessage = (msg: string, type: 'success' | 'error' = 'success') => {
    setMessage(msg);
    setMessageType(type);
    setTimeout(() => setMessage(''), 3000);
  };

  const handleExportDownload = () => {
    const state = exportAppState();
    downloadStateFile(state);
    showMessage('State file downloaded successfully!');
  };

  const handleExportView = () => {
    const state = exportAppState();
    const text = getStateAsText(state);
    setStateText(text);
    setShowStateText(true);
  };

  const handleExportCopy = async () => {
    try {
      const state = exportAppState();
      await copyStateToClipboard(state);
      showMessage('State copied to clipboard!');
    } catch (error) {
      showMessage('Failed to copy to clipboard', 'error');
    }
  };

  const handleImportFromText = () => {
    try {
      const state = parseStateFromText(importText);
      importAppState(state);
      showMessage('State imported successfully!');
      setImportText('');
      onStateImported?.();
    } catch (error) {
      showMessage(`Import failed: ${(error as Error).message}`, 'error');
    }
  };

  const handleFileImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const text = e.target?.result as string;
        parseImportDataAndShowSelections(text);
      } catch (error) {
        showMessage(`File import failed: ${(error as Error).message}`, 'error');
      }
    };
    reader.readAsText(file);
    
    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleCopyStateText = async () => {
    try {
      await navigator.clipboard.writeText(stateText);
      showMessage('State text copied to clipboard!');
    } catch (error) {
      showMessage('Failed to copy to clipboard', 'error');
    }
  };

  // Smart import functionality
  const parseImportDataAndShowSelections = (dataText: string) => {
    try {
      const parsed = JSON.parse(dataText);
      
      // Validate that it has handProgress
      if (!parsed.handProgress) {
        throw new Error('Invalid state format - no hand progress found');
      }

      // Extract available range selections from handIds
      const handProgress = parsed.handProgress;
      const selectionMap = new Map<string, RangeSelection>();

      Object.entries(handProgress).forEach(([handId, progress]: [string, any]) => {
        // Parse handId to extract range info: "AA_CO_vs_BU_strict"
        const parts = handId.split('_');
        if (parts.length >= 4) {
          const handName = parts[0];
          const heroPos = parts[1];
          const vs = parts[2]; // "vs"
          const opponentInfo = parts.slice(3, -1).join('_'); // everything except last part (grading mode)
          const gradingMode = parts[parts.length - 1];

          // Create a selection key that groups by position combo + grading mode
          const selectionKey = `${heroPos}_${vs}_${opponentInfo}_${gradingMode}`;
          
          if (!selectionMap.has(selectionKey)) {
            // Create description based on the pattern
            let description = `${gradingMode.charAt(0).toUpperCase() + gradingMode.slice(1)} mode - `;
            if (vs === 'vs') {
              description += `${heroPos} vs ${opponentInfo}`;
            } else {
              description += `${heroPos} ${vs} ${opponentInfo}`;
            }

            selectionMap.set(selectionKey, {
              id: selectionKey,
              description,
              handIds: [],
              stats: {
                totalHands: 0,
                totalReviews: 0,
                accuracy: 0
              }
            });
          }

          const selection = selectionMap.get(selectionKey)!;
          selection.handIds.push(handId);
          selection.stats.totalHands++;
          selection.stats.totalReviews += progress.performanceStats?.totalReviews || 0;
        }
      });

      // Calculate accuracy for each selection
      selectionMap.forEach(selection => {
        const totalCorrect = selection.handIds.reduce((sum, handId) => {
          const progress = handProgress[handId];
          const reviews = progress.performanceStats?.totalReviews || 0;
          const accuracy = progress.performanceStats?.accuracyRate || 0;
          return sum + (reviews * accuracy);
        }, 0);
        
        selection.stats.accuracy = selection.stats.totalReviews > 0 
          ? totalCorrect / selection.stats.totalReviews 
          : 0;
      });

      const selections = Array.from(selectionMap.values())
        .sort((a, b) => a.description.localeCompare(b.description));

      setAvailableSelections(selections);
      setSelectedRanges(new Set()); // Clear previous selections
      setParsedImportData(parsed);
      setShowImportSelection(true);
      
    } catch (error) {
      showMessage(`Failed to parse import data: ${(error as Error).message}`, 'error');
    }
  };

  const handleSmartImportFromText = () => {
    if (!importText.trim()) return;
    parseImportDataAndShowSelections(importText);
  };

  const handleConfirmSelectiveImport = () => {
    if (!parsedImportData || selectedRanges.size === 0) {
      showMessage('Please select at least one range to import', 'error');
      return;
    }

    try {
      // Get existing hand progress
      const existingProgressData = localStorage.getItem('preflop_trainer_hand_progress');
      const existingProgress = existingProgressData ? JSON.parse(existingProgressData) : {};

      // Filter to only include selected ranges
      const selectedHandIds = new Set<string>();
      availableSelections.forEach(selection => {
        if (selectedRanges.has(selection.id)) {
          selection.handIds.forEach(handId => selectedHandIds.add(handId));
        }
      });

      // Merge only selected hands
      const importedProgress = parsedImportData.handProgress;
      selectedHandIds.forEach(handId => {
        if (importedProgress[handId]) {
          existingProgress[handId] = importedProgress[handId];
        }
      });

      // Save merged progress
      localStorage.setItem('preflop_trainer_hand_progress', JSON.stringify(existingProgress));

      const selectedCount = selectedRanges.size;
      const handCount = selectedHandIds.size;
      showMessage(`Successfully imported ${selectedCount} range(s) with ${handCount} hands`);
      
      // Reset import state
      setShowImportSelection(false);
      setImportText('');
      setParsedImportData(null);
      setAvailableSelections([]);
      setSelectedRanges(new Set());
      
      onStateImported?.();
    } catch (error) {
      showMessage(`Import failed: ${(error as Error).message}`, 'error');
    }
  };

  const toggleRangeSelection = (selectionId: string) => {
    const newSelected = new Set(selectedRanges);
    if (newSelected.has(selectionId)) {
      newSelected.delete(selectionId);
    } else {
      newSelected.add(selectionId);
    }
    setSelectedRanges(newSelected);
  };

  const selectAllRanges = () => {
    setSelectedRanges(new Set(availableSelections.map(s => s.id)));
  };

  const selectNoneRanges = () => {
    setSelectedRanges(new Set());
  };

  return (
    <div className="state-manager">
      <div className="state-manager-section">
        <h3>Export State</h3>
        <p>Save your progress to a file or copy it to use on another device</p>
        <div className="export-buttons">
          <button onClick={handleExportDownload} className="export-button download">
            📥 Download File
          </button>
          <button onClick={handleExportView} className="export-button view">
            👁️ View State
          </button>
          <button onClick={handleExportCopy} className="export-button copy">
            📋 Copy to Clipboard
          </button>
        </div>
      </div>

      <div className="state-manager-section">
        <h3>Import State</h3>
        <p>Load your progress from a file or paste state data. You can select which ranges to import.</p>
        
        <div className="import-methods">
          <div className="import-method">
            <h4>From File</h4>
            <input
              ref={fileInputRef}
              type="file"
              accept=".json"
              onChange={handleFileImport}
              className="file-input"
            />
          </div>

          <div className="import-method">
            <h4>From Text</h4>
            <textarea
              value={importText}
              onChange={(e) => setImportText(e.target.value)}
              placeholder="Paste your state data here..."
              rows={4}
              className="import-textarea"
            />
            <button 
              onClick={handleSmartImportFromText}
              disabled={!importText.trim()}
              className="import-button"
            >
              Parse & Select Ranges
            </button>
          </div>
        </div>
      </div>

      {showImportSelection && (
        <div className="import-selection-modal">
          <div className="import-selection-content">
            <div className="import-selection-header">
              <h3>Select Ranges to Import</h3>
              <div className="selection-actions">
                <button onClick={selectAllRanges} className="selection-button">
                  Select All
                </button>
                <button onClick={selectNoneRanges} className="selection-button">
                  Select None
                </button>
                <button 
                  onClick={() => setShowImportSelection(false)} 
                  className="close-button"
                >
                  ✕
                </button>
              </div>
            </div>
            
            <div className="range-selections">
              {availableSelections.map(selection => (
                <div key={selection.id} className="range-selection-item">
                  <label className="selection-label">
                    <input
                      type="checkbox"
                      checked={selectedRanges.has(selection.id)}
                      onChange={() => toggleRangeSelection(selection.id)}
                      className="selection-checkbox"
                    />
                    <div className="selection-info">
                      <div className="selection-description">
                        {selection.description}
                      </div>
                      <div className="selection-stats">
                        {selection.stats.totalHands} hands • {selection.stats.totalReviews} reviews • {(selection.stats.accuracy * 100).toFixed(1)}% accuracy
                      </div>
                    </div>
                  </label>
                </div>
              ))}
            </div>

            <div className="import-selection-footer">
              <div className="selected-summary">
                {selectedRanges.size} of {availableSelections.length} ranges selected
              </div>
              <div className="import-actions">
                <button 
                  onClick={handleConfirmSelectiveImport}
                  disabled={selectedRanges.size === 0}
                  className="import-button confirm"
                >
                  Import Selected Ranges
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showStateText && (
        <div className="state-text-modal">
          <div className="state-text-content">
            <div className="state-text-header">
              <h3>Your State Data</h3>
              <div className="state-text-actions">
                <button onClick={handleCopyStateText} className="copy-text-button">
                  📋 Copy
                </button>
                <button onClick={() => setShowStateText(false)} className="close-button">
                  ✕
                </button>
              </div>
            </div>
            <textarea
              value={stateText}
              readOnly
              rows={15}
              className="state-text-display"
            />
          </div>
        </div>
      )}

      {message && (
        <div className={`message ${messageType}`}>
          {message}
        </div>
      )}
    </div>
  );
};

export default StateManager;