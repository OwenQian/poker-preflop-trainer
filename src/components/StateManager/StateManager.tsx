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

const StateManager: React.FC<StateManagerProps> = ({ onStateImported }) => {
  const [showStateText, setShowStateText] = useState(false);
  const [stateText, setStateText] = useState('');
  const [importText, setImportText] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState<'success' | 'error'>('success');
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
        const state = parseStateFromText(text);
        importAppState(state);
        showMessage('State file imported successfully!');
        onStateImported?.();
      } catch (error) {
        showMessage(`Import failed: ${(error as Error).message}`, 'error');
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
        <p>Load your progress from a file or paste state data</p>
        
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
              onClick={handleImportFromText}
              disabled={!importText.trim()}
              className="import-button"
            >
              Import State
            </button>
          </div>
        </div>
      </div>

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