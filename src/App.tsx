import React, { useState, useEffect } from 'react';
import { Position, GradingMode, QuizQuestion, QuizAnswer, HandProgress } from './types';
import { FSRS } from './utils/fsrs/fsrs';
import { generateQuizQuestion } from './utils/handGenerator';
import { gradeAnswer } from './utils/gradingSystem';
import { 
  getUserSettings, 
  saveUserSettings, 
  getHandProgress, 
  saveHandProgress,
  getQuizState,
  saveQuizState 
} from './utils/storage/localStorage';

import PositionSelector from './components/PositionSelector/PositionSelector';
import Quiz from './components/Quiz/Quiz';
import RangeTabSelector, { RangeCategory } from './components/RangeTabSelector/RangeTabSelector';
import MultiRangeDisplay from './components/MultiRangeDisplay/MultiRangeDisplay';

import './App.css';

type AppState = 'setup' | 'quiz' | 'results';

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>('setup');
  const [heroPosition, setHeroPosition] = useState<Position | null>(null);
  const [opponentPositions, setOpponentPositions] = useState<Position[]>([]);
  const [gradingMode, setGradingMode] = useState<GradingMode>('lax');
  const [showMatrix, setShowMatrix] = useState(true);
  const [rangeCategory, setRangeCategory] = useState<RangeCategory>('RFI');
  
  const [currentQuestion, setCurrentQuestion] = useState<QuizQuestion | null>(null);
  const [sessionStats, setSessionStats] = useState({
    questionsAnswered: 0,
    correctAnswers: 0,
    sessionStartTime: new Date()
  });
  
  const [fsrs] = useState(new FSRS());

  // Load settings on mount
  useEffect(() => {
    const settings = getUserSettings();
    setHeroPosition(settings.heroPosition);
    setOpponentPositions(settings.opponentPositions);
    setGradingMode(settings.gradingMode);
    setShowMatrix(settings.showMatrix);
    setRangeCategory(settings.rangeCategory || 'RFI');

    const quizState = getQuizState();
    setSessionStats(quizState.currentSessionStats);
  }, []);

  // Save settings when they change
  useEffect(() => {
    saveUserSettings({
      heroPosition,
      opponentPositions,
      gradingMode,
      showMatrix,
      rangeCategory
    });
  }, [heroPosition, opponentPositions, gradingMode, showMatrix, rangeCategory]);

  const startQuiz = () => {
    if (!heroPosition || opponentPositions.length === 0) {
      alert('Please select your position and at least one opponent position.');
      return;
    }

    const question = generateQuizQuestion(heroPosition, opponentPositions, rangeCategory);
    if (!question) {
      alert('Unable to generate quiz question. Please try different position settings.');
      return;
    }

    setCurrentQuestion(question);
    setAppState('quiz');
    
    // Reset session stats
    const newStats = {
      questionsAnswered: 0,
      correctAnswers: 0,
      sessionStartTime: new Date()
    };
    setSessionStats(newStats);
    saveQuizState({ currentSessionStats: newStats });
  };

  const handleQuizAnswer = (answer: QuizAnswer) => {
    if (!currentQuestion) return;

    // Grade the answer
    const result = gradeAnswer(currentQuestion, answer, gradingMode);
    
    // Update session stats
    const newStats = {
      ...sessionStats,
      questionsAnswered: sessionStats.questionsAnswered + 1,
      correctAnswers: sessionStats.correctAnswers + (result.isCorrect ? 1 : 0)
    };
    setSessionStats(newStats);
    saveQuizState({ currentSessionStats: newStats });

    // Update FSRS progress
    const handId = `${currentQuestion.handName}_${currentQuestion.position}_vs_${currentQuestion.opponents.join('_')}`;
    let handProgress = getHandProgress(handId);
    
    if (!handProgress) {
      // Create new hand progress
      handProgress = {
        handId,
        fsrsCard: fsrs.createCard(),
        reviewHistory: [],
        performanceStats: {
          totalReviews: 0,
          correctStreak: 0,
          accuracyRate: 0
        }
      };
    }

    // Update FSRS card based on confidence rating
    const newCard = fsrs.repeat(handProgress.fsrsCard, answer.confidence);
    
    // Update performance stats
    const newPerformanceStats = {
      totalReviews: handProgress.performanceStats.totalReviews + 1,
      correctStreak: result.isCorrect 
        ? handProgress.performanceStats.correctStreak + 1 
        : 0,
      accuracyRate: 0 // Will be recalculated
    };
    
    // Calculate new accuracy rate
    const totalCorrect = handProgress.performanceStats.totalReviews * handProgress.performanceStats.accuracyRate + (result.isCorrect ? 1 : 0);
    newPerformanceStats.accuracyRate = totalCorrect / newPerformanceStats.totalReviews;

    // Update hand progress
    const updatedProgress: HandProgress = {
      ...handProgress,
      fsrsCard: newCard,
      reviewHistory: [
        ...handProgress.reviewHistory,
        {
          rating: answer.confidence,
          reviewTime: new Date()
        }
      ],
      performanceStats: newPerformanceStats
    };
    
    saveHandProgress(handId, updatedProgress);

    // Show results
    alert(`${result.isCorrect ? 'Correct!' : 'Incorrect!'}\n\n${result.explanation}`);

    // Generate next question
    setTimeout(() => {
      const nextQuestion = generateQuizQuestion(heroPosition!, opponentPositions, rangeCategory);
      if (nextQuestion) {
        setCurrentQuestion(nextQuestion);
      }
    }, 1000);
  };

  const handleBackToSetup = () => {
    setAppState('setup');
    setCurrentQuestion(null);
  };


  return (
    <div className="app">
      <header className="app-header">
        <h1>Preflop Poker Trainer</h1>
        <p>Master your preflop ranges with spaced repetition</p>
      </header>

      <main className="app-main">
        {appState === 'setup' && (
          <div className="setup-screen">
            <div className="main-setup-content">
              <div className="position-section">
                <PositionSelector
                  heroPosition={heroPosition}
                  opponentPositions={opponentPositions}
                  onHeroPositionChange={setHeroPosition}
                  onOpponentPositionsChange={setOpponentPositions}
                />
              </div>

              <div className="range-preview">
                <RangeTabSelector
                  activeCategory={rangeCategory}
                  onCategoryChange={setRangeCategory}
                />
                {heroPosition ? (
                  <MultiRangeDisplay
                    heroPosition={heroPosition}
                    opponentPositions={opponentPositions}
                    rangeCategory={rangeCategory}
                  />
                ) : (
                  <div className="select-position-message">
                    <p>Select your position to see range charts</p>
                  </div>
                )}
              </div>
            </div>

            <div className="start-section">
              <button
                className="start-quiz-button"
                onClick={startQuiz}
                disabled={true}
              >
                Start Quiz (Coming Soon)
              </button>
            </div>

            <div className="settings-section">
              <h2>Quiz Settings</h2>
              
              <div className="grading-mode-selector">
                <h3>Grading Mode</h3>
                <div className="mode-options">
                  <label className="mode-option">
                    <input
                      type="radio"
                      name="gradingMode"
                      value="strict"
                      checked={gradingMode === 'strict'}
                      onChange={(e) => setGradingMode(e.target.value as GradingMode)}
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
                      onChange={(e) => setGradingMode(e.target.value as GradingMode)}
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
                      onChange={(e) => setGradingMode(e.target.value as GradingMode)}
                    />
                    <div className="mode-content">
                      <span className="mode-title">Randomizer</span>
                      <span className="mode-desc">Based on frequency percentages</span>
                    </div>
                  </label>
                </div>
              </div>
            </div>
          </div>
        )}

        {appState === 'quiz' && currentQuestion && (
          <div className="quiz-screen">
            <div className="quiz-header-stats">
              <div className="session-stats">
                <span>Questions: {sessionStats.questionsAnswered}</span>
                <span>Correct: {sessionStats.correctAnswers}</span>
                <span>Accuracy: {sessionStats.questionsAnswered > 0 ? Math.round((sessionStats.correctAnswers / sessionStats.questionsAnswered) * 100) : 0}%</span>
              </div>
              <button className="back-button" onClick={handleBackToSetup}>
                Back to Setup
              </button>
            </div>

            <Quiz
              question={currentQuestion}
              gradingMode={gradingMode}
              onAnswer={handleQuizAnswer}
              showMatrix={showMatrix}
              onToggleMatrix={() => setShowMatrix(!showMatrix)}
              rangeCategory={rangeCategory}
            />
          </div>
        )}
      </main>
    </div>
  );
};

export default App;