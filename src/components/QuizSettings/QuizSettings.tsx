import React from 'react';
import { Position, GradingMode } from '../../types';
import PositionSelector from '../PositionSelector/PositionSelector';
import { RangeCategory } from '../RangeTabSelector/RangeTabSelector';
import './QuizSettings.css';

interface QuizSettingsProps {
  heroPosition: Position | null;
  opponentPositions: Position[];
  gradingMode: GradingMode;
  rangeCategory: RangeCategory;
  onHeroPositionChange: (position: Position | null) => void;
  onOpponentPositionsChange: (positions: Position[]) => void;
  onGradingModeChange: (mode: GradingMode) => void;
  onRangeCategoryChange: (category: RangeCategory) => void;
  onStartQuiz: () => void;
  onBackToHome: () => void;
}

const QuizSettings: React.FC<QuizSettingsProps> = ({
  heroPosition,
  opponentPositions,
  gradingMode,
  rangeCategory,
  onHeroPositionChange,
  onOpponentPositionsChange,
  onGradingModeChange,
  onRangeCategoryChange,
  onStartQuiz,
  onBackToHome
}) => {
  return (
    <div className="quiz-settings">
      <div className="quiz-settings-header">
        <button className="back-button" onClick={onBackToHome}>
          ← Back to Home
        </button>
        <h1>Spaced Repetition Quiz Setup</h1>
      </div>

      <div className="quiz-settings-content">
        <div className="position-section">
          <h2>Position Selection</h2>
          <PositionSelector
            heroPosition={heroPosition}
            opponentPositions={opponentPositions}
            onHeroPositionChange={onHeroPositionChange}
            onOpponentPositionsChange={onOpponentPositionsChange}
          />
        </div>

        <div className="range-category-section">
          <h2>Range Category</h2>
          <div className="category-options">
            <label className="category-option">
              <input
                type="radio"
                name="rangeCategory"
                value="RFI"
                checked={rangeCategory === 'RFI'}
                onChange={(e) => onRangeCategoryChange(e.target.value as RangeCategory)}
              />
              <div className="category-content">
                <span className="category-title">RFI (Raise First In)</span>
                <span className="category-desc">Opening ranges from each position</span>
              </div>
            </label>
            <label className="category-option">
              <input
                type="radio"
                name="rangeCategory"
                value="vs RFI"
                checked={rangeCategory === 'vs RFI'}
                onChange={(e) => onRangeCategoryChange(e.target.value as RangeCategory)}
              />
              <div className="category-content">
                <span className="category-title">vs RFI</span>
                <span className="category-desc">Defending against raises</span>
              </div>
            </label>
            <label className="category-option">
              <input
                type="radio"
                name="rangeCategory"
                value="RFI vs 3bet"
                checked={rangeCategory === 'RFI vs 3bet'}
                onChange={(e) => onRangeCategoryChange(e.target.value as RangeCategory)}
              />
              <div className="category-content">
                <span className="category-title">RFI vs 3bet</span>
                <span className="category-desc">Responding to 3-bets</span>
              </div>
            </label>
            <label className="category-option">
              <input
                type="radio"
                name="rangeCategory"
                value="vs Limp"
                checked={rangeCategory === 'vs Limp'}
                onChange={(e) => onRangeCategoryChange(e.target.value as RangeCategory)}
              />
              <div className="category-content">
                <span className="category-title">vs Limp</span>
                <span className="category-desc">Isolating limpers</span>
              </div>
            </label>
          </div>
        </div>

        <div className="grading-mode-section">
          <h2>Grading Mode</h2>
          <div className="mode-options">
            <label className="mode-option">
              <input
                type="radio"
                name="gradingMode"
                value="strict"
                checked={gradingMode === 'strict'}
                onChange={(e) => onGradingModeChange(e.target.value as GradingMode)}
              />
              <div className="mode-content">
                <span className="mode-title">Strict</span>
                <span className="mode-desc">Must select ALL correct actions</span>
              </div>
            </label>
            <label className="mode-option">
              <input
                type="radio"
                name="gradingMode"
                value="lax"
                checked={gradingMode === 'lax'}
                onChange={(e) => onGradingModeChange(e.target.value as GradingMode)}
              />
              <div className="mode-content">
                <span className="mode-title">Lax</span>
                <span className="mode-desc">At least ONE correct action</span>
              </div>
            </label>
            <label className="mode-option">
              <input
                type="radio"
                name="gradingMode"
                value="randomizer"
                checked={gradingMode === 'randomizer'}
                onChange={(e) => onGradingModeChange(e.target.value as GradingMode)}
              />
              <div className="mode-content">
                <span className="mode-title">Randomizer</span>
                <span className="mode-desc">Based on frequency percentages</span>
              </div>
            </label>
          </div>
        </div>

        <div className="start-section">
          <button
            className="start-quiz-button"
            onClick={onStartQuiz}
            disabled={!heroPosition || opponentPositions.length === 0}
          >
            Start Quiz
          </button>
          {(!heroPosition || opponentPositions.length === 0) && (
            <p className="validation-message">
              Please select your position and at least one opponent position to start the quiz.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuizSettings;