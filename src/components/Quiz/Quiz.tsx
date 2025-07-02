import React, { useState, useEffect, useCallback } from 'react';
import { Action, QuizQuestion, QuizAnswer, QuizResult, GradingMode } from '../../types';
import { RangeCategory } from '../RangeTabSelector/RangeTabSelector';
import CardDisplay from '../CardDisplay/CardDisplay';
import HandMatrix from '../HandMatrix/HandMatrix';
import ProbabilityBars from '../ProbabilityBars/ProbabilityBars';
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
  fullRangeData?: any; // Full range data for showing complete range in results
}

const Quiz: React.FC<QuizProps> = ({
  question,
  gradingMode,
  onAnswer,
  showMatrix = true,
  onToggleMatrix,
  rangeCategory = 'RFI',
  quizResult,
  onNextQuestion,
  fullRangeData
}) => {
  const [selectedActions, setSelectedActions] = useState<Action[]>([]);
  const [showResult, setShowResult] = useState(false);

  const handleActionToggle = useCallback((action: Action) => {
    setSelectedActions(prev => 
      prev.includes(action)
        ? prev.filter(a => a !== action)
        : [...prev, action]
    );
  }, []);

  const handleSubmit = useCallback(() => {
    if (selectedActions.length === 0) return;
    
    const answer: QuizAnswer = {
      selectedActions,
      confidence: 3 // Default confidence - will be overridden by result-based FSRS
    };
    onAnswer(answer);
    setShowResult(true);
  }, [selectedActions, onAnswer]);

  const handleNextQuestion = useCallback(() => {
    // Reset for next question
    setSelectedActions([]);
    setShowResult(false);
    onNextQuestion?.();
  }, [onNextQuestion]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      console.log('🎹 Key event received:', event.key, 'showResult:', showResult);
      
      // Prevent shortcuts if user is typing in an input field
      const target = event.target as HTMLElement;
      if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable)) {
        console.log('🚫 Ignoring key press - in input field');
        return;
      }
      
      // Prevent shortcuts when modifier keys are pressed (cmd+1, ctrl+1, etc.)
      if (event.metaKey || event.ctrlKey || event.altKey || event.shiftKey) {
        console.log('🚫 Ignoring key press - modifier key pressed');
        return;
      }
      
      // Only handle shortcuts when quiz is active (not showing results)
      if (showResult) {
        // Handle Enter or Space to go to next question
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          console.log('➡️ Going to next question');
          handleNextQuestion();
        }
        return;
      }

      // Handle shortcuts during question phase
      switch (event.key) {
        case '1':
          event.preventDefault();
          console.log('📊 Toggling RAISE');
          handleActionToggle('raise');
          break;
        case '2':
          event.preventDefault();
          console.log('📞 Toggling CALL');
          handleActionToggle('call');
          break;
        case '3':
          event.preventDefault();
          console.log('🗂️ Toggling FOLD');
          handleActionToggle('fold');
          break;
        case ' ':
        case 'Enter':
          event.preventDefault();
          console.log('✅ Submitting answer');
          handleSubmit();
          break;
        default:
          console.log('❓ Unhandled key:', event.key);
          break;
      }
    };

    // Add event listener
    window.addEventListener('keydown', handleKeyPress);

    // Cleanup
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [handleActionToggle, handleSubmit, handleNextQuestion, showResult]); // Dependencies for the handlers

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

  const getGradingModeColor = (): string => {
    switch (gradingMode) {
      case 'strict':
        return '#dc3545'; // Red for strict
      case 'lax':
        return '#28a745'; // Green for lax
      case 'randomizer':
        return '#007bff'; // Blue for randomizer
    }
  };

  return (
    <div className="quiz-container">
      <div className="quiz-header">
        <div className="quiz-title-section">
          <h2>Preflop Decision</h2>
          <div 
            className="strictness-badge"
            style={{ backgroundColor: getGradingModeColor() }}
          >
            {gradingMode.charAt(0).toUpperCase() + gradingMode.slice(1)} Mode
          </div>
        </div>
        <div className="grading-mode-info">
          {getGradingModeHelp()}
          <div className="keyboard-shortcuts-info">
            Keyboard shortcuts: <strong>1</strong> Raise, <strong>2</strong> Call, <strong>3</strong> Fold, <strong>Space</strong> Submit/Next
          </div>
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
          {question.rangeCombo && (
            <div className="range-info">
              <span className="label">Range:</span>
              <span className="value">{question.rangeCombo.replace(/_/g, ' ')}</span>
            </div>
          )}
          {gradingMode === 'randomizer' && question.randomNumber && (
            <div className="random-number-info">
              <span className="label">Random Number:</span>
              <span className="value random-number">{question.randomNumber}</span>
            </div>
          )}
        </div>

        <div className="cards-section">
          <h3>Your Hand: {question.handName}</h3>
          <CardDisplay cards={[question.hand.card1, question.hand.card2]} size="large" />
        </div>

        {showResult && (
          <ProbabilityBars 
            frequencies={question.frequencies} 
            randomNumber={gradingMode === 'randomizer' ? question.randomNumber : undefined}
            showResult={gradingMode === 'randomizer' ? showResult : false}
          />
        )}

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
                  {getActionLabel(action)} <span className="keyboard-shortcut">({action === 'raise' ? '1' : action === 'call' ? '2' : '3'})</span>
                </button>
              ))}
            </div>
            
            <button 
              className="submit-button"
              onClick={handleSubmit}
              disabled={selectedActions.length === 0}
            >
              Submit Answer <span className="keyboard-shortcut">(Space)</span>
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
              Next Question <span className="keyboard-shortcut">(Space/Enter)</span>
            </button>
          </div>
        )}

        <div className="matrix-toggle">
          <button 
            className="toggle-button"
            onClick={onToggleMatrix}
          >
            {showMatrix ? 'Hide Matrix' : 'Show Matrix'}
          </button>
        </div>

        {showMatrix && (
          <HandMatrix
            rangeData={showResult && fullRangeData ? fullRangeData : {}}
            rangeCategory={rangeCategory}
            currentHand={question.handName}
            visible={showMatrix}
            missingHandTreatment={showResult && fullRangeData ? "fold" : "not-in-range"}
            showColors={showResult}
          />
        )}
      </div>
    </div>
  );
};

export default Quiz;