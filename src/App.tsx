import React, { useState, useEffect } from 'react';
import { Position, GradingMode, QuizQuestion, QuizAnswer, QuizResult, HandProgress } from './types';
import { FSRS } from './utils/fsrs/fsrs';
import { generateQuizQuestion } from './utils/handGenerator';
import { gradeAnswer, GradingResult } from './utils/gradingSystem';
import { getRangeData } from './data/sampleRanges';
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
import RangeBuilder from './components/RangeBuilder/RangeBuilder';
import QuizSettings from './components/QuizSettings/QuizSettings';
import PostflopVisualizer from './components/PostflopVisualizer/PostflopVisualizer';
import StateManager from './components/StateManager/StateManager';
import RangeSelector from './components/RangeSelector/RangeSelector';

import './App.css';

type AppState = 'home' | 'quiz-settings' | 'quiz' | 'results' | 'range-builder' | 'postflop' | 'setup' | 'range-select' | 'state-manager';

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>('home');
  const [heroPosition, setHeroPosition] = useState<Position | null>(null);
  const [opponentPositions, setOpponentPositions] = useState<Position[]>([]);
  const [gradingMode, setGradingMode] = useState<GradingMode>('lax');
  const [showMatrix, setShowMatrix] = useState(true);
  const [rangeCategory, setRangeCategory] = useState<RangeCategory>('RFI');
  const [selectedRange, setSelectedRange] = useState<string | null>(null);
  
  const [currentQuestion, setCurrentQuestion] = useState<QuizQuestion | null>(null);
  const [currentResult, setCurrentResult] = useState<QuizResult | null>(null);
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

  const handleRangeSelect = (range: string, hero: Position, opponents: Position[]) => {
    setSelectedRange(range);
    setHeroPosition(hero);
    setOpponentPositions(opponents);
  };

  const handleStrictnessChange = (strictness: GradingMode) => {
    setGradingMode(strictness);
  };

  const startQuizFromRange = () => {
    if (!heroPosition || !selectedRange) {
      alert('Please select a range first.');
      return;
    }

    const question = generateQuizQuestion(heroPosition, opponentPositions, rangeCategory);
    if (!question) {
      alert('Unable to generate quiz question. Please try different range settings.');
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

  const handleStateImported = () => {
    // Refresh settings from localStorage after import
    const settings = getUserSettings();
    setHeroPosition(settings.heroPosition);
    setOpponentPositions(settings.opponentPositions);
    setGradingMode(settings.gradingMode);
    setShowMatrix(settings.showMatrix);
    setRangeCategory(settings.rangeCategory || 'RFI');
  };

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
    const gradingResult = gradeAnswer(currentQuestion, answer, gradingMode);
    
    // Create a proper QuizResult object
    const quizResult: QuizResult = {
      question: currentQuestion,
      answer,
      isCorrect: gradingResult.isCorrect,
      explanation: gradingResult.explanation
    };
    
    // Update session stats
    const newStats = {
      ...sessionStats,
      questionsAnswered: sessionStats.questionsAnswered + 1,
      correctAnswers: sessionStats.correctAnswers + (gradingResult.isCorrect ? 1 : 0)
    };
    setSessionStats(newStats);
    saveQuizState({ currentSessionStats: newStats });

    // Update FSRS progress with result-based rating (include strictness level for separate tracking)
    const handId = `${currentQuestion.handName}_${currentQuestion.position}_vs_${currentQuestion.opponents.join('_')}_${gradingMode}`;
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

    // Use result-based FSRS rating: 1 (Again) for incorrect, 3 (Good) for correct
    const fsrsRating = gradingResult.isCorrect ? 3 : 1;
    const newCard = fsrs.repeat(handProgress.fsrsCard, fsrsRating);
    
    // Update performance stats
    const newPerformanceStats = {
      totalReviews: handProgress.performanceStats.totalReviews + 1,
      correctStreak: gradingResult.isCorrect 
        ? handProgress.performanceStats.correctStreak + 1 
        : 0,
      accuracyRate: 0 // Will be recalculated
    };
    
    // Calculate new accuracy rate
    const totalCorrect = handProgress.performanceStats.totalReviews * handProgress.performanceStats.accuracyRate + (gradingResult.isCorrect ? 1 : 0);
    newPerformanceStats.accuracyRate = totalCorrect / newPerformanceStats.totalReviews;

    // Update hand progress
    const updatedProgress: HandProgress = {
      ...handProgress,
      fsrsCard: newCard,
      reviewHistory: [
        ...handProgress.reviewHistory,
        {
          rating: fsrsRating,
          reviewTime: new Date()
        }
      ],
      performanceStats: newPerformanceStats
    };
    
    saveHandProgress(handId, updatedProgress);

    // Show result instead of alert
    setCurrentResult(quizResult);
  };

  const handleNextQuestion = () => {
    // Clear current result
    setCurrentResult(null);
    
    // Generate next question
    const nextQuestion = generateQuizQuestion(heroPosition!, opponentPositions, rangeCategory);
    if (nextQuestion) {
      setCurrentQuestion(nextQuestion);
    }
  };

  const handleBackToSetup = () => {
    setAppState('home');
    setCurrentQuestion(null);
  };


  return (
    <div className="app">
      <header className="app-header">
        <h1>Preflop Poker Trainer</h1>
        <p>Master your preflop ranges with spaced repetition</p>
      </header>

      <main className="app-main">
        {appState === 'home' && (
          <div className="home-screen">
            <div className="home-content">
              <div className="main-content">
                <div className="position-section">
                  <h2>Position Selection</h2>
                  <PositionSelector
                    heroPosition={heroPosition}
                    opponentPositions={opponentPositions}
                    onHeroPositionChange={setHeroPosition}
                    onOpponentPositionsChange={setOpponentPositions}
                  />
                </div>

                <div className="range-preview">
                  <h2>Range Explorer</h2>
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

              <div className="navigation-section">
                <h2>Training Modules</h2>
                <div className="module-buttons">
                  <button
                    className="module-button quiz-button"
                    onClick={() => setAppState('range-select')}
                  >
                    <div className="module-icon">🧠</div>
                    <div className="module-info">
                      <h3>Spaced Repetition Quiz</h3>
                      <p>Practice preflop decisions with adaptive learning</p>
                    </div>
                  </button>
                  <button
                    className="module-button postflop-button disabled"
                    disabled
                  >
                    <div className="module-icon">🎯</div>
                    <div className="module-info">
                      <h3>Postflop Visualizer</h3>
                      <p>Coming Soon - Analyze hand strength and equity on different boards</p>
                    </div>
                  </button>
                  <button
                    className="module-button dev-button"
                    onClick={() => setAppState('range-builder')}
                  >
                    <div className="module-icon">🔧</div>
                    <div className="module-info">
                      <h3>Range Builder (Dev Tool)</h3>
                      <p>Development tool for creating and editing ranges</p>
                    </div>
                  </button>
                  <button
                    className="module-button state-button"
                    onClick={() => setAppState('state-manager')}
                  >
                    <div className="module-icon">💾</div>
                    <div className="module-info">
                      <h3>State Manager (WIP)</h3>
                      <p>Export/import your progress and settings</p>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {appState === 'quiz-settings' && (
          <QuizSettings
            heroPosition={heroPosition}
            opponentPositions={opponentPositions}
            gradingMode={gradingMode}
            rangeCategory={rangeCategory}
            onHeroPositionChange={setHeroPosition}
            onOpponentPositionsChange={setOpponentPositions}
            onGradingModeChange={setGradingMode}
            onRangeCategoryChange={setRangeCategory}
            onStartQuiz={startQuiz}
            onBackToHome={() => setAppState('home')}
          />
        )}

        {appState === 'postflop' && (
          <PostflopVisualizer onBackToHome={() => setAppState('home')} />
        )}

        {/* Legacy setup screen - can be removed later */}
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
                onClick={() => setAppState('quiz-settings')}
              >
                Go to Quiz Settings
              </button>
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
              quizResult={currentResult}
              onNextQuestion={handleNextQuestion}
              fullRangeData={selectedRange ? getRangeData(selectedRange, rangeCategory)?.hands : undefined}
            />
          </div>
        )}

        {appState === 'range-builder' && (
          <div className="range-builder-screen">
            <div className="range-builder-header">
              <button className="back-button" onClick={() => setAppState('home')}>
                ← Back to Home
              </button>
            </div>
            <RangeBuilder />
          </div>
        )}

        {appState === 'range-select' && (
          <div className="range-select-screen">
            <div className="range-select-header">
              <button className="back-button" onClick={() => setAppState('home')}>
                ← Back to Home
              </button>
              <h2>Quiz Setup</h2>
            </div>
            
            <div className="range-category-selector">
              <RangeTabSelector
                activeCategory={rangeCategory}
                onCategoryChange={setRangeCategory}
              />
            </div>

            <RangeSelector
              selectedRange={selectedRange}
              rangeCategory={rangeCategory}
              strictnessLevel={gradingMode}
              onRangeSelect={handleRangeSelect}
              onStrictnessChange={handleStrictnessChange}
            />

            {selectedRange && (
              <div className="quiz-start-section">
                <div className="selected-range-info">
                  <h3>Selected Range: {selectedRange.replace(/_/g, ' ')}</h3>
                  <p>Hero Position: {heroPosition}</p>
                  {opponentPositions.length > 0 && (
                    <p>Opponent Positions: {opponentPositions.join(', ')}</p>
                  )}
                  <p>Strictness Level: <strong>{gradingMode.charAt(0).toUpperCase() + gradingMode.slice(1)}</strong></p>
                </div>
                <button 
                  className="start-quiz-button"
                  onClick={startQuizFromRange}
                >
                  Start Quiz
                </button>
              </div>
            )}
          </div>
        )}

        {appState === 'state-manager' && (
          <div className="state-manager-screen">
            <div className="state-manager-header">
              <button className="back-button" onClick={() => setAppState('home')}>
                ← Back to Home
              </button>
              <h2>State Manager</h2>
            </div>
            <StateManager onStateImported={handleStateImported} />
          </div>
        )}
      </main>
    </div>
  );
};

export default App;