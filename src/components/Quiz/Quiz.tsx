import React, { useState } from 'react';
import { Action, FSRSRating, QuizQuestion, QuizAnswer, GradingMode } from '../../types';
import CardDisplay from '../CardDisplay/CardDisplay';
import HandMatrix from '../HandMatrix/HandMatrix';
import './Quiz.css';

interface QuizProps {
  question: QuizQuestion;
  gradingMode: GradingMode;
  onAnswer: (answer: QuizAnswer) => void;
  showMatrix?: boolean;
  onToggleMatrix?: () => void;
}

const Quiz: React.FC<QuizProps> = ({
  question,
  gradingMode,
  onAnswer,
  showMatrix = true,
  onToggleMatrix
}) => {
  const [selectedActions, setSelectedActions] = useState<Action[]>([]);
  const [showConfidenceButtons, setShowConfidenceButtons] = useState(false);

  const handleActionToggle = (action: Action) => {
    setSelectedActions(prev => 
      prev.includes(action)
        ? prev.filter(a => a !== action)
        : [...prev, action]
    );
  };

  const handleSubmit = () => {
    if (selectedActions.length === 0) return;
    setShowConfidenceButtons(true);
  };

  const handleConfidenceSelect = (confidence: FSRSRating) => {
    const answer: QuizAnswer = {
      selectedActions,
      confidence
    };
    onAnswer(answer);
    
    // Reset for next question
    setSelectedActions([]);
    setShowConfidenceButtons(false);
  };

  const getActionLabel = (action: Action): string => {
    switch (action) {
      case 'raise': return 'Raise';
      case 'call': return 'Call';
      case 'fold': return 'Fold';
    }
  };

  const getActionColor = (action: Action): string => {
    switch (action) {
      case 'raise': return '#ff9500';
      case 'call': return '#4CAF50';
      case 'fold': return '#9e9e9e';
    }
  };

  const getGradingModeHelp = (): string => {
    switch (gradingMode) {
      case 'strict':
        return 'Strict Mode: You must select ALL correct actions to get it right.';
      case 'lax':
        return 'Lax Mode: Selecting at least ONE correct action counts as correct.';
      case 'randomizer':
        return 'Randomizer Mode: The correct answer is determined by frequency percentages.';
    }
  };

  return (
    <div className="quiz-container">
      <div className="quiz-header">
        <h2>Preflop Decision</h2>
        <div className="grading-mode-info">
          {getGradingModeHelp()}
        </div>
      </div>

      <div className="quiz-content">
        <div className="situation-info">
          <div className="position-info">
            <span className="label">Position:</span>
            <span className="value">{question.position}</span>
          </div>
          {question.opponents.length > 0 && (
            <div className="opponents-info">
              <span className="label">Opponents:</span>
              <span className="value">{question.opponents.join(', ')}</span>
            </div>
          )}
        </div>

        <div className="cards-section">
          <h3>Your Hand: {question.handName}</h3>
          <CardDisplay cards={[question.hand.card1, question.hand.card2]} size="large" />
        </div>

        {showMatrix && (
          <HandMatrix
            rangeData={{ [question.handName]: question.frequencies }}
            currentHand={question.handName}
            visible={showMatrix}
          />
        )}

        <div className="matrix-toggle">
          <button 
            className="toggle-button"
            onClick={onToggleMatrix}
          >
            {showMatrix ? 'Hide Matrix' : 'Show Matrix'}
          </button>
        </div>

        {!showConfidenceButtons ? (
          <div className="actions-section">
            <h3>What would you do?</h3>
            <div className="action-buttons">
              {(['raise', 'call', 'fold'] as Action[]).map(action => (
                <button
                  key={action}
                  className={`action-button ${selectedActions.includes(action) ? 'selected' : ''}`}
                  style={{
                    backgroundColor: selectedActions.includes(action) 
                      ? getActionColor(action) 
                      : 'white',
                    color: selectedActions.includes(action) ? 'white' : getActionColor(action),
                    borderColor: getActionColor(action)
                  }}
                  onClick={() => handleActionToggle(action)}
                >
                  {getActionLabel(action)}
                </button>
              ))}
            </div>
            
            <button 
              className="submit-button"
              onClick={handleSubmit}
              disabled={selectedActions.length === 0}
            >
              Submit Answer
            </button>
          </div>
        ) : (
          <div className="confidence-section">
            <h3>How confident are you in your answer?</h3>
            <div className="confidence-buttons">
              <button
                className="confidence-button again"
                onClick={() => handleConfidenceSelect(1)}
              >
                Again
                <span className="confidence-desc">Got it completely wrong</span>
              </button>
              <button
                className="confidence-button hard"
                onClick={() => handleConfidenceSelect(2)}
              >
                Hard
                <span className="confidence-desc">Eventually got it right but struggled</span>
              </button>
              <button
                className="confidence-button good"
                onClick={() => handleConfidenceSelect(3)}
              >
                Good
                <span className="confidence-desc">Got it right with normal effort</span>
              </button>
              <button
                className="confidence-button easy"
                onClick={() => handleConfidenceSelect(4)}
              >
                Easy
                <span className="confidence-desc">Got it right effortlessly</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Quiz;