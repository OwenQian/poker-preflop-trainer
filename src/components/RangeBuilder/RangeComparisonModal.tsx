import React, { useState, useEffect, useMemo } from 'react';
import { HandName, HandFrequencies } from '../../types';
import { ALL_RANGES } from '../../data/sampleRanges';
import './RangeComparisonModal.css';

interface RangeComparisonModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type ExtendedRangeCategory = 'RFI' | 'vs RFI' | 'RFI vs 3bet' | 'vs Limp' | 'Custom Ranges';

interface RangeSelection {
  category: ExtendedRangeCategory;
  position: string;
  data: Record<HandName, HandFrequencies>;
  name: string;
}

const RangeComparisonModal: React.FC<RangeComparisonModalProps> = ({
  isOpen,
  onClose
}) => {
  const [rangeA, setRangeA] = useState<RangeSelection | null>(null);
  const [rangeB, setRangeB] = useState<RangeSelection | null>(null);
  const [selectedCategoryA, setSelectedCategoryA] = useState<ExtendedRangeCategory>('RFI');
  const [selectedCategoryB, setSelectedCategoryB] = useState<ExtendedRangeCategory>('RFI');
  const [selectedPositionA, setSelectedPositionA] = useState<string>('');
  const [selectedPositionB, setSelectedPositionB] = useState<string>('');
  const [viewMode, setViewMode] = useState<'unified' | 'side-by-side'>('unified');

  // Get available positions for each category
  const getAvailablePositions = (category: ExtendedRangeCategory): string[] => {
    if (category === 'Custom Ranges') {
      try {
        const customRanges = JSON.parse(localStorage.getItem('custom_poker_ranges') || '[]');
        return customRanges.map((range: any) => range.positionCombo);
      } catch {
        return [];
      }
    } else {
      const categoryRanges = ALL_RANGES[category];
      return categoryRanges ? categoryRanges.map(range => range.positionCombo) : [];
    }
  };

  const positionsA = useMemo(() => getAvailablePositions(selectedCategoryA), [selectedCategoryA]);
  const positionsB = useMemo(() => getAvailablePositions(selectedCategoryB), [selectedCategoryB]);

  // Load range data
  const loadRangeData = (category: ExtendedRangeCategory, position: string): Record<HandName, HandFrequencies> | null => {
    if (!position) return null;

    try {
      if (category === 'Custom Ranges') {
        const customRanges = JSON.parse(localStorage.getItem('custom_poker_ranges') || '[]');
        const range = customRanges.find((r: any) => r.positionCombo === position);
        return range ? range.hands : null;
      } else {
        const categoryRanges = ALL_RANGES[category];
        const range = categoryRanges?.find(r => r.positionCombo === position);
        return range ? range.hands : null;
      }
    } catch {
      return null;
    }
  };

  // Update ranges when selections change
  useEffect(() => {
    const dataA = loadRangeData(selectedCategoryA, selectedPositionA);
    if (dataA) {
      setRangeA({
        category: selectedCategoryA,
        position: selectedPositionA,
        data: dataA,
        name: `${selectedCategoryA}: ${selectedPositionA}`
      });
    } else {
      setRangeA(null);
    }
  }, [selectedCategoryA, selectedPositionA]);

  useEffect(() => {
    const dataB = loadRangeData(selectedCategoryB, selectedPositionB);
    if (dataB) {
      setRangeB({
        category: selectedCategoryB,
        position: selectedPositionB,
        data: dataB,
        name: `${selectedCategoryB}: ${selectedPositionB}`
      });
    } else {
      setRangeB(null);
    }
  }, [selectedCategoryB, selectedPositionB]);

  // Calculate comparison statistics
  const comparisonStats = useMemo(() => {
    if (!rangeA || !rangeB) return null;

    const allHands = new Set([...Object.keys(rangeA.data), ...Object.keys(rangeB.data)]);
    
    let overlap = 0;
    let onlyInA = 0;
    let onlyInB = 0;
    let totalHandsA = 0;
    let totalHandsB = 0;
    let totalCombosA = 0;
    let totalCombosB = 0;

    const getHandCombos = (hand: string): number => {
      if (hand.length === 2) return 6; // Pocket pairs
      if (hand.endsWith('s')) return 4; // Suited
      if (hand.endsWith('o')) return 12; // Offsuit
      return 0;
    };

    const isHandInRange = (hand: HandName, range: Record<HandName, HandFrequencies>): boolean => {
      const freq = range[hand];
      return freq ? (freq.raise > 0 || freq.call > 0) : false;
    };

    allHands.forEach(hand => {
      const inA = isHandInRange(hand as HandName, rangeA.data);
      const inB = isHandInRange(hand as HandName, rangeB.data);
      const combos = getHandCombos(hand);

      if (inA) {
        totalHandsA++;
        totalCombosA += combos;
      }
      if (inB) {
        totalHandsB++;
        totalCombosB += combos;
      }

      if (inA && inB) {
        overlap++;
      } else if (inA && !inB) {
        onlyInA++;
      } else if (!inA && inB) {
        onlyInB++;
      }
    });

    return {
      overlap,
      onlyInA,
      onlyInB,
      totalHandsA,
      totalHandsB,
      totalCombosA,
      totalCombosB,
      percentageA: ((totalCombosA / 1326) * 100).toFixed(1),
      percentageB: ((totalCombosB / 1326) * 100).toFixed(1)
    };
  }, [rangeA, rangeB]);

  // Generate all poker hands for the matrix
  const generateAllHands = (): HandName[] => {
    const ranks = ['A', 'K', 'Q', 'J', 'T', '9', '8', '7', '6', '5', '4', '3', '2'];
    const hands: HandName[] = [];
    
    for (let i = 0; i < ranks.length; i++) {
      for (let j = 0; j < ranks.length; j++) {
        if (i === j) {
          hands.push(`${ranks[i]}${ranks[j]}` as HandName); // Pocket pairs
        } else if (i < j) {
          hands.push(`${ranks[i]}${ranks[j]}s` as HandName); // Suited
        } else {
          hands.push(`${ranks[j]}${ranks[i]}o` as HandName); // Offsuit
        }
      }
    }
    return hands;
  };

  const allHands = generateAllHands();

  // Get hand status for comparison
  const getHandStatus = (hand: HandName) => {
    if (!rangeA || !rangeB) return 'none';

    const inA = rangeA.data[hand] && (rangeA.data[hand].raise > 0 || rangeA.data[hand].call > 0);
    const inB = rangeB.data[hand] && (rangeB.data[hand].raise > 0 || rangeB.data[hand].call > 0);

    if (inA && inB) return 'overlap';
    if (inA && !inB) return 'only-a';
    if (!inA && inB) return 'only-b';
    return 'none';
  };

  // Get hand color for individual range display
  const getHandColor = (hand: HandName, rangeData: Record<HandName, HandFrequencies> | null): string => {
    if (!rangeData || !rangeData[hand]) return '#e2e8f0'; // Gray for no data
    
    const freq = rangeData[hand];
    const isInRange = freq.raise > 0 || freq.call > 0;
    
    if (!isInRange) return '#e2e8f0'; // Gray
    if (freq.raise >= 80) return '#ff9500'; // Orange for always raise
    if (freq.raise > 0 && freq.call > 0) return '#9333ea'; // Purple for mixed
    if (freq.call >= 80) return '#8BC34A'; // Green for always call
    return '#60a5fa'; // Blue for other actions
  };

  // Render unified comparison matrix (single grid with comparison colors)
  const renderUnifiedMatrix = () => {
    const ranks = ['A', 'K', 'Q', 'J', 'T', '9', '8', '7', '6', '5', '4', '3', '2'];
    
    return (
      <div className="comparison-hand-matrix">
        {ranks.map((rank1, i) => (
          <div key={i} className="matrix-row">
            {ranks.map((rank2, j) => {
              let hand: HandName;
              if (i === j) {
                hand = `${rank1}${rank2}` as HandName; // Pocket pairs
              } else if (i < j) {
                hand = `${rank1}${rank2}s` as HandName; // Suited
              } else {
                hand = `${rank2}${rank1}o` as HandName; // Offsuit
              }
              
              const status = getHandStatus(hand);
              
              return (
                <div
                  key={j}
                  className={`comparison-hand-cell status-${status}`}
                  title={hand}
                >
                  {hand}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    );
  };

  // Render side-by-side matrices (two separate grids)
  const renderSideBySideMatrices = () => {
    const ranks = ['A', 'K', 'Q', 'J', 'T', '9', '8', '7', '6', '5', '4', '3', '2'];
    
    const renderSingleMatrix = (rangeData: Record<HandName, HandFrequencies> | null, title: string) => (
      <div className="side-by-side-matrix">
        <h4 className="matrix-title">{title}</h4>
        <div className="individual-hand-matrix">
          {ranks.map((rank1, i) => (
            <div key={i} className="matrix-row">
              {ranks.map((rank2, j) => {
                let hand: HandName;
                if (i === j) {
                  hand = `${rank1}${rank2}` as HandName; // Pocket pairs
                } else if (i < j) {
                  hand = `${rank1}${rank2}s` as HandName; // Suited
                } else {
                  hand = `${rank2}${rank1}o` as HandName; // Offsuit
                }
                
                const color = getHandColor(hand, rangeData);
                
                return (
                  <div
                    key={j}
                    className="individual-hand-cell"
                    style={{ backgroundColor: color }}
                    title={hand}
                  >
                    {hand}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    );

    return (
      <div className="side-by-side-container">
        {renderSingleMatrix(rangeA?.data || null, rangeA?.name || 'Range A')}
        {renderSingleMatrix(rangeB?.data || null, rangeB?.name || 'Range B')}
      </div>
    );
  };

  if (!isOpen) return null;

  return (
    <div className="range-comparison-modal-overlay">
      <div className="range-comparison-modal">
        <div className="range-comparison-header">
          <h2>Range Comparison</h2>
          <button className="range-comparison-close" onClick={onClose}>
            ✕
          </button>
        </div>

        <div className="range-comparison-content">
          {/* Range Selectors */}
          <div className="range-selectors">
            <div className="range-selector-group">
              <h3>Range A</h3>
              <div className="selector-fields">
                <select 
                  value={selectedCategoryA} 
                  onChange={(e) => {
                    setSelectedCategoryA(e.target.value as ExtendedRangeCategory);
                    setSelectedPositionA('');
                  }}
                >
                  <option value="RFI">RFI (Raise First In)</option>
                  <option value="vs RFI">vs RFI (Defending)</option>
                  <option value="RFI vs 3bet">RFI vs 3bet (4bet/Call)</option>
                  <option value="vs Limp">vs Limp (Isolation)</option>
                  <option value="Custom Ranges">💾 Custom Ranges</option>
                </select>
                <select 
                  value={selectedPositionA} 
                  onChange={(e) => setSelectedPositionA(e.target.value)}
                >
                  <option value="">Select position...</option>
                  {positionsA.map(pos => (
                    <option key={pos} value={pos}>{pos}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="range-selector-group">
              <h3>Range B</h3>
              <div className="selector-fields">
                <select 
                  value={selectedCategoryB} 
                  onChange={(e) => {
                    setSelectedCategoryB(e.target.value as ExtendedRangeCategory);
                    setSelectedPositionB('');
                  }}
                >
                  <option value="RFI">RFI (Raise First In)</option>
                  <option value="vs RFI">vs RFI (Defending)</option>
                  <option value="RFI vs 3bet">RFI vs 3bet (4bet/Call)</option>
                  <option value="vs Limp">vs Limp (Isolation)</option>
                  <option value="Custom Ranges">💾 Custom Ranges</option>
                </select>
                <select 
                  value={selectedPositionB} 
                  onChange={(e) => setSelectedPositionB(e.target.value)}
                >
                  <option value="">Select position...</option>
                  {positionsB.map(pos => (
                    <option key={pos} value={pos}>{pos}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* View Mode Toggle */}
          <div className="view-mode-toggle">
            <div className="toggle-buttons">
              <button 
                className={`toggle-button ${viewMode === 'unified' ? 'active' : ''}`}
                onClick={() => setViewMode('unified')}
              >
                🔄 Unified Comparison
              </button>
              <button 
                className={`toggle-button ${viewMode === 'side-by-side' ? 'active' : ''}`}
                onClick={() => setViewMode('side-by-side')}
              >
                ⚖️ Side by Side
              </button>
            </div>
          </div>

          {/* Legend */}
          {viewMode === 'unified' && (
            <div className="comparison-legend">
            <div className="legend-item overlap">
              <div className="legend-color"></div>
              <span>Both Ranges</span>
            </div>
            <div className="legend-item only-a">
              <div className="legend-color"></div>
              <span>Range A Only</span>
            </div>
            <div className="legend-item only-b">
              <div className="legend-color"></div>
              <span>Range B Only</span>
            </div>
            <div className="legend-item none">
              <div className="legend-color"></div>
              <span>Neither Range</span>
            </div>
          </div>
          )}

          {/* Side-by-side Legend */}
          {viewMode === 'side-by-side' && (
            <div className="side-by-side-legend">
              <div className="legend-item">
                <div className="legend-color" style={{ backgroundColor: '#ff9500' }}></div>
                <span>Always Raise</span>
              </div>
              <div className="legend-item">
                <div className="legend-color" style={{ backgroundColor: '#8BC34A' }}></div>
                <span>Always Call</span>
              </div>
              <div className="legend-item">
                <div className="legend-color" style={{ backgroundColor: '#9333ea' }}></div>
                <span>Mixed Strategy</span>
              </div>
              <div className="legend-item">
                <div className="legend-color" style={{ backgroundColor: '#60a5fa' }}></div>
                <span>Other Actions</span>
              </div>
              <div className="legend-item">
                <div className="legend-color" style={{ backgroundColor: '#e2e8f0' }}></div>
                <span>Not in Range</span>
              </div>
            </div>
          )}

          {/* Hand Matrix */}
          {rangeA && rangeB ? (
            <div className="comparison-matrix-container">
              {viewMode === 'unified' ? renderUnifiedMatrix() : renderSideBySideMatrices()}
            </div>
          ) : (
            <div className="select-ranges-message">
              <p>Select both ranges to see comparison</p>
            </div>
          )}

          {/* Statistics */}
          {comparisonStats && rangeA && rangeB && (
            <div className="comparison-stats">
              <h3>Comparison Statistics</h3>
              <div className="stats-grid">
                <div className="stat-group">
                  <h4>{rangeA.name}</h4>
                  <div className="stat-item">
                    <span className="stat-label">Hands:</span>
                    <span className="stat-value">{comparisonStats.totalHandsA}</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-label">Combinations:</span>
                    <span className="stat-value">{comparisonStats.totalCombosA}</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-label">Percentage:</span>
                    <span className="stat-value">{comparisonStats.percentageA}%</span>
                  </div>
                </div>

                <div className="stat-group">
                  <h4>{rangeB.name}</h4>
                  <div className="stat-item">
                    <span className="stat-label">Hands:</span>
                    <span className="stat-value">{comparisonStats.totalHandsB}</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-label">Combinations:</span>
                    <span className="stat-value">{comparisonStats.totalCombosB}</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-label">Percentage:</span>
                    <span className="stat-value">{comparisonStats.percentageB}%</span>
                  </div>
                </div>

                <div className="stat-group">
                  <h4>Comparison</h4>
                  <div className="stat-item">
                    <span className="stat-label">Overlap:</span>
                    <span className="stat-value">{comparisonStats.overlap} hands</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-label">Only in A:</span>
                    <span className="stat-value">{comparisonStats.onlyInA} hands</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-label">Only in B:</span>
                    <span className="stat-value">{comparisonStats.onlyInB} hands</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RangeComparisonModal;