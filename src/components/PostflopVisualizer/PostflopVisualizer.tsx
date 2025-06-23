import React, { useState, useEffect } from 'react';
import { parseFlopData, getBoardTexture, formatBoardWithSuits } from '../../utils/flopParser';
import { Position } from '../../types';
import { RangeCategory } from '../RangeTabSelector/RangeTabSelector';
import PositionSelector from '../PositionSelector/PositionSelector';
import RangeTabSelector from '../RangeTabSelector/RangeTabSelector';
import MultiRangeDisplay from '../MultiRangeDisplay/MultiRangeDisplay';
import './PostflopVisualizer.css';

interface FlopData {
  board: string;
  boardWithSuits: string;
  frequency: number;
}

const PostflopVisualizer: React.FC<{ onBackToHome: () => void }> = ({ onBackToHome }) => {
  const [flopData, setFlopData] = useState<FlopData[]>([]);
  const [selectedFlop, setSelectedFlop] = useState<string>('');
  const [loading, setLoading] = useState(true);
  
  // Range selection state
  const [heroPosition, setHeroPosition] = useState<Position | null>(null);
  const [opponentPositions, setOpponentPositions] = useState<Position[]>([]);
  const [rangeCategory, setRangeCategory] = useState<RangeCategory>('RFI');

  useEffect(() => {
    // Load flop data from the subset file
    loadFlopData();
  }, []);

  const loadFlopData = async () => {
    try {
      const flops = parseFlopData();
      setFlopData(flops);
      setSelectedFlop(flops[0].board);
    } catch (error) {
      console.error('Error loading flop data:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderHandClassification = () => {
    if (!selectedFlop) return null;

    return (
      <div className="hand-classification">
        <h3>Hand Classification for {flopData.find(f => f.board === selectedFlop)?.boardWithSuits || selectedFlop.replace(/ \(.*\)/, '')}</h3>
        <div className="classification-groups">
          <div className="group group-1a">
            <h4>Group 1a - Very Strong</h4>
            <p>Two pair and better</p>
            <div className="group-examples">Sets, Straights, Flushes, Full Houses</div>
          </div>
          <div className="group group-1b">
            <h4>Group 1b - Strong</h4>
            <p>Top pair</p>  
            <div className="group-examples">Top pair with various kickers</div>
          </div>
          <div className="group group-2a">
            <h4>Group 2a - Medium (Non-pairs)</h4>
            <p>Middle pair, bottom pair</p>
            <div className="group-examples">Weaker made hands</div>
          </div>
          <div className="group group-2b">
            <h4>Group 2b - Medium (Pocket pairs)</h4>  
            <p>Pocket pairs below top pair</p>
            <div className="group-examples">Underpairs to the board</div>
          </div>
          <div className="group group-3a">
            <h4>Group 3a - Strong Draws</h4>
            <p>Flush draws, 8-out straights, combo draws</p>
            <div className="group-examples">High equity drawing hands</div>
          </div>
          <div className="group group-3b">
            <h4>Group 3b - Medium Draws</h4>
            <p>4-out straight draws</p>
            <div className="group-examples">Gutshot straights</div>
          </div>
          <div className="group group-3c">
            <h4>Group 3c - Weak Draws</h4>
            <p>2 overcards, 3-card flush/straight</p>
            <div className="group-examples">Backdoor draws, overcards</div>
          </div>
          <div className="group group-4">
            <h4>Group 4 - Air</h4>
            <p>No pair, no draw</p>
            <div className="group-examples">Complete air hands</div>
          </div>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="postflop-visualizer">
        <div className="loading">Loading flop data...</div>
      </div>
    );
  }

  return (
    <div className="postflop-visualizer">
      <div className="postflop-header">
        <button className="back-button" onClick={onBackToHome}>
          ← Back to Home
        </button>
        <h1>Postflop Visualizer</h1>
        <p>Analyze hand strength and equity on different board textures</p>
      </div>

      <div className="postflop-content">
        <div className="top-controls">
          <div className="flop-selector-section">
            <h2>Select Board Texture</h2>
            <div className="flop-selector-wrapper">
              <label htmlFor="flop-select" className="flop-select-label">
                Choose a flop from 95 representative board textures:
              </label>
              <select
                id="flop-select"
                className="flop-select"
                value={selectedFlop}
                onChange={(e) => setSelectedFlop(e.target.value)}
              >
                {flopData.map((flop, index) => (
                  <option key={index} value={flop.board}>
                    {flop.board}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="range-selector-section">
            <h2>Select Range</h2>
            <div className="range-controls">
              <div className="position-selector-wrapper">
                <PositionSelector
                  heroPosition={heroPosition}
                  opponentPositions={opponentPositions}
                  onHeroPositionChange={setHeroPosition}
                  onOpponentPositionsChange={setOpponentPositions}
                />
              </div>
              
              <div className="range-category-wrapper">
                <RangeTabSelector
                  activeCategory={rangeCategory}
                  onCategoryChange={setRangeCategory}
                />
              </div>
            </div>
          </div>
        </div>

        {selectedFlop && (
          <div className="analysis-section">
            <div className="selected-board">
              <h2>Board: {flopData.find(f => f.board === selectedFlop)?.boardWithSuits || selectedFlop.replace(/ \(.*\)/, '')}</h2>
              <div className="board-info">
                <div className="texture-analysis">
                  <h3>Texture Analysis</h3>
                  <p><strong>Type:</strong> {getBoardTexture(selectedFlop)}</p>
                </div>
              </div>
            </div>

            {renderHandClassification()}

            {heroPosition && (
              <div className="range-display-section">
                <h3>Preflop Range Analysis</h3>
                <MultiRangeDisplay
                  heroPosition={heroPosition}
                  opponentPositions={opponentPositions}
                  rangeCategory={rangeCategory}
                />
              </div>
            )}

            <div className="equity-chart-placeholder">
              <h3>Percentile vs Equity Chart</h3>
              <div className="chart-container">
                <p>Interactive equity visualization will be implemented here</p>
                <div className="chart-axes">
                  <div className="y-axis">Equity %</div>
                  <div className="chart-area">
                    <div className="placeholder-chart">
                      Chart showing hand strength percentile (x-axis) vs equity (y-axis)
                    </div>
                  </div>
                  <div className="x-axis">Hand Strength Percentile</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PostflopVisualizer;