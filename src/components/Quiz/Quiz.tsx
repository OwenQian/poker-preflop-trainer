import React, { useState } from 'react';
import { Action, QuizQuestion, QuizAnswer, QuizResult, GradingMode } from '../../types';
import { RangeCategory } from '../RangeTabSelector/RangeTabSelector';
import CardDisplay from '../CardDisplay/CardDisplay';
import HandMatrix from '../HandMatrix/HandMatrix';
import './Quiz.css';

interface QuizProps {
  question: QuizQuestion;
  gradingMode: GradingMode;
  onAnswer: (answer: QuizAnswer) => void;
  showMatrix?: boolean;
  onToggleMatrix?: () => void;
  rangeCategory?: RangeCategory;
  quizResult?: QuizResult | null;
  onNextQuestion?: () => void;
}

const Quiz: React.FC<QuizProps> = ({
  question,
  gradingMode,
  onAnswer,
  showMatrix = true,
  onToggleMatrix,
  rangeCategory = 'RFI',
  quizResult,
  onNextQuestion
}) => {
  const [selectedActions, setSelectedActions] = useState<Action[]>([]);
  const [showResult, setShowResult] = useState(false);

  const handleActionToggle = (action: Action) => {
    setSelectedActions(prev => 
      prev.includes(action)
        ? prev.filter(a => a !== action)
        : [...prev, action]
    );
  };

  const handleSubmit = () => {
    if (selectedActions.length === 0) return;
    
    const answer: QuizAnswer = {
      selectedActions,
      confidence: 3 // Default confidence - will be overridden by result-based FSRS
    };
    onAnswer(answer);
    setShowResult(true);
  };

  const handleNextQuestion = () => {
    // Reset for next question
    setSelectedActions([]);
    setShowResult(false);
    onNextQuestion?.();
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
            rangeCategory={rangeCategory}
            currentHand={question.handName}
            visible={showMatrix}
            missingHandTreatment="not-in-range"
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

        {!showResult ? (
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
        ) : quizResult && (
          <div className="result-section">
            <div className={`result-header ${quizResult.isCorrect ? 'correct' : 'incorrect'}`}>
              <h3>{quizResult.isCorrect ? '✓ Correct!' : '✗ Incorrect'}</h3>
            </div>
            
            <div className="result-details">
              <div className="your-answer">
                <h4>Your Answer:</h4>
                <div className="answer-actions">
                  {selectedActions.map(action => (
                    <span 
                      key={action}
                      className="answer-action"
                      style={{ backgroundColor: getActionColor(action) }}
                    >
                      {getActionLabel(action)}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="correct-answer">
                <h4>Correct Actions:</h4>
                <div className="answer-actions">
                  {question.correctActions.map(action => (
                    <span 
                      key={action}
                      className="answer-action correct"
                      style={{ backgroundColor: getActionColor(action) }}
                    >
                      {getActionLabel(action)}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="frequencies-display">
                <h4>Hand Frequencies:</h4>
                <div className="frequency-breakdown">
                  <span>Raise: {question.frequencies.raise}%</span>
                  <span>Call: {question.frequencies.call}%</span>
                  <span>Fold: {question.frequencies.fold}%</span>
                </div>
              </div>
              
              {quizResult.explanation && (
                <div className="explanation">
                  <h4>Explanation:</h4>
                  <p>{quizResult.explanation}</p>
                </div>
              )}
            </div>
            
            <button 
              className="next-button"
              onClick={handleNextQuestion}
            >
              Next Question
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Quiz;