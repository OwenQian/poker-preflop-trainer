import React, { useState, useEffect } from 'react';
import { Position, GradingMode, QuizQuestion, QuizAnswer, QuizResult, HandProgress, SamplingMode } from './types';
import { FSRS } from './utils/fsrs/fsrs';
import { generateQuizQuestion } from './utils/handGenerator';
import { gradeAnswer, GradingResult, calculateFSRSRating } from './utils/gradingSystem';
import { getRangeData } from './data/sampleRanges';
import { 
  getUserSettings, 
  saveUserSettings, 
  getHandProgress, 
  saveHandProgress,
  getQuizState,
  saveQuizState 
} from './utils/storage/localStorage';
import { getDueCardsInfo } from './utils/fsrs/quizIntegration';

import PositionSelector from './components/PositionSelector/PositionSelector';
import Quiz from './components/Quiz/Quiz';
import RangeTabSelector, { RangeCategory } from './components/RangeTabSelector/RangeTabSelector';
import MultiRangeDisplay from './components/MultiRangeDisplay/MultiRangeDisplay';
import RangeBuilder from './components/RangeBuilder/RangeBuilder';
import QuizSettings from './components/QuizSettings/QuizSettings';
import PostflopVisualizer from './components/PostflopVisualizer/PostflopVisualizer';
import StateManager from './components/StateManager/StateManager';
import RangeSelector from './components/RangeSelector/RangeSelector';
import RemainingCardsOverlay from './components/RemainingCardsOverlay/RemainingCardsOverlay';
import FSRSDebugPanel from './components/FSRSDebugPanel/FSRSDebugPanel';

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
  const [samplingMode, setSamplingMode] = useState<SamplingMode>('random');
  const [daysAhead, setDaysAhead] = useState<number>(0);
  const [showRemainingOverlay, setShowRemainingOverlay] = useState<boolean>(false);
  const [remainingCardsKey, setRemainingCardsKey] = useState<number>(0); // Force re-render of remaining count
  
  const [currentQuestion, setCurrentQuestion] = useState<QuizQuestion | null>(null);
  const [currentResult, setCurrentResult] = useState<QuizResult | null>(null);
  const [sessionStats, setSessionStats] = useState({
    questionsAnswered: 0,
    correctAnswers: 0,
    sessionStartTime: new Date()
  });
  
  const [sessionHandCounts, setSessionHandCounts] = useState<Record<string, number>>({});
  const [showFSRSDebug, setShowFSRSDebug] = useState<boolean>(false);
  const [sessionLimit, setSessionLimit] = useState<number>(50); // Default session limit
  const [sessionLimitWarningShown, setSessionLimitWarningShown] = useState<boolean>(false); // Track if popup shown
  
  const [fsrs] = useState(new FSRS());

  // Load settings on mount
  useEffect(() => {
    const settings = getUserSettings();
    setHeroPosition(settings.heroPosition);
    setOpponentPositions(settings.opponentPositions);
    setGradingMode(settings.gradingMode);
    setShowMatrix(settings.showMatrix);
    setRangeCategory(settings.rangeCategory || 'RFI');
    setSamplingMode(settings.samplingMode || 'random');
    setDaysAhead(settings.daysAhead || 0);
    setSessionLimit(settings.sessionLimit || 50);

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
      rangeCategory,
      samplingMode,
      daysAhead,
      sessionLimit
    });
  }, [heroPosition, opponentPositions, gradingMode, showMatrix, rangeCategory, samplingMode, daysAhead, sessionLimit]);

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

    const question = generateQuizQuestion(heroPosition, opponentPositions, rangeCategory, samplingMode, gradingMode, daysAhead);
    if (!question) {
      alert('Unable to generate quiz question. Please try different range settings.');
      return;
    }

    setCurrentQuestion(question);
    setAppState('quiz');
    
    // Reset session stats and hand counts
    const newStats = {
      questionsAnswered: 0,
      correctAnswers: 0,
      sessionStartTime: new Date()
    };
    setSessionStats(newStats);
    setSessionHandCounts({});
    setSessionLimitWarningShown(false); // Reset warning flag for new session
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
    setSamplingMode(settings.samplingMode || 'random');
    setDaysAhead(settings.daysAhead || 0);
  };

  const startQuiz = () => {
    if (!heroPosition || opponentPositions.length === 0) {
      alert('Please select your position and at least one opponent position.');
      return;
    }

    const question = generateQuizQuestion(heroPosition, opponentPositions, rangeCategory, samplingMode, gradingMode, daysAhead);
    if (!question) {
      alert('Unable to generate quiz question. Please try different position settings.');
      return;
    }

    setCurrentQuestion(question);
    setAppState('quiz');
    
    // Reset session stats and hand counts
    const newStats = {
      questionsAnswered: 0,
      correctAnswers: 0,
      sessionStartTime: new Date()
    };
    setSessionStats(newStats);
    setSessionHandCounts({});
    setSessionLimitWarningShown(false); // Reset warning flag for new session
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

    // Update session hand counts
    const handKey = currentQuestion.handName;
    setSessionHandCounts(prev => ({
      ...prev,
      [handKey]: (prev[handKey] || 0) + 1
    }));

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

    // Calculate FSRS rating based on answer quality
    const fsrsRating = calculateFSRSRating(currentQuestion, answer, gradingResult, gradingMode);
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

    // Force update of remaining cards count
    setRemainingCardsKey(prev => prev + 1);

    // Show result instead of alert
    setCurrentResult(quizResult);
  };

  const handleNextQuestion = () => {
    // Check session limit - only show popup once
    if (sessionStats.questionsAnswered >= sessionLimit && !sessionLimitWarningShown) {
      setSessionLimitWarningShown(true); // Mark popup as shown
      const continueSession = window.confirm(
        `You've reached your session limit of ${sessionLimit} questions! ` +
        `You've answered ${sessionStats.questionsAnswered} questions with ${Math.round((sessionStats.correctAnswers / sessionStats.questionsAnswered) * 100)}% accuracy.\n\n` +
        `Do you want to continue studying? (Click OK to continue, Cancel to stop)`
      );
      
      if (!continueSession) {
        handleBackToSetup();
        return;
      }
    }

    // Clear current result
    setCurrentResult(null);
    
    // Generate next question
    if (!heroPosition) {
      console.error('No hero position set for next question');
      return;
    }
    
    const nextQuestion = generateQuizQuestion(heroPosition, opponentPositions, rangeCategory, samplingMode, gradingMode, daysAhead);
    if (nextQuestion) {
      setCurrentQuestion(nextQuestion);
    } else {
      console.error('Failed to generate next question');
    }
  };

  const handleBackToSetup = () => {
    setAppState('range-select');
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
                {samplingMode === 'spaced-repetition' && heroPosition && (
                  <span 
                    className="remaining-cards-indicator"
                    onMouseEnter={() => setShowRemainingOverlay(true)}
                    onMouseLeave={() => setShowRemainingOverlay(false)}
                  >
                    Remaining: {(() => {
                      // Use remainingCardsKey to force re-render when cards are answered  
                      const _forceUpdate = remainingCardsKey; // Reference to trigger re-render
                      const dueInfo = getDueCardsInfo(heroPosition, opponentPositions, gradingMode, rangeCategory, daysAhead);
                      return dueInfo.dueCount;
                    })()}
                    {showRemainingOverlay && (
                      <RemainingCardsOverlay
                        heroPosition={heroPosition}
                        opponentPositions={opponentPositions}
                        gradingMode={gradingMode}
                        rangeCategory={rangeCategory}
                        daysAhead={daysAhead}
                        visible={showRemainingOverlay}
                        sessionHandCounts={sessionHandCounts}
                      />
                    )}
                  </span>
                )}
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
              <div className="header-buttons">
                <button 
                  className="debug-button"
                  onClick={() => setShowFSRSDebug(true)}
                  title="FSRS Debug Panel"
                >
                  🔍
                </button>
                <button 
                  className="state-manager-button"
                  onClick={() => setAppState('state-manager')}
                  title="Manage your progress data"
                >
                  💾
                </button>
              </div>
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

                <div className="fsrs-settings">
                  <div className="sampling-mode-selector">
                    <label>Sampling Mode:</label>
                    <div className="radio-group">
                      <label>
                        <input
                          type="radio"
                          value="random"
                          checked={samplingMode === 'random'}
                          onChange={(e) => setSamplingMode(e.target.value as SamplingMode)}
                        />
                        Random
                      </label>
                      <label>
                        <input
                          type="radio"
                          value="spaced-repetition"
                          checked={samplingMode === 'spaced-repetition'}
                          onChange={(e) => setSamplingMode(e.target.value as SamplingMode)}
                        />
                        Spaced Repetition
                      </label>
                    </div>
                  </div>

                  {samplingMode === 'spaced-repetition' && (
                    <div className="days-ahead-selector">
                      <label htmlFor="days-ahead">Days Ahead:</label>
                      <div className="number-input-group">
                        <input
                          id="days-ahead"
                          type="number"
                          min="0"
                          max="365"
                          value={daysAhead}
                          onChange={(e) => setDaysAhead(parseInt(e.target.value) || 0)}
                        />
                        <div className="number-controls">
                          <button 
                            type="button"
                            onClick={() => setDaysAhead(Math.min(365, daysAhead + 1))}
                          >
                            ▲
                          </button>
                          <button 
                            type="button"
                            onClick={() => setDaysAhead(Math.max(0, daysAhead - 1))}
                          >
                            ▼
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  {heroPosition && samplingMode === 'spaced-repetition' && (
                    <div className="due-cards-info">
                      {(() => {
                        const dueInfo = getDueCardsInfo(heroPosition, opponentPositions, gradingMode, rangeCategory, daysAhead);
                        return (
                          <p>
                            <strong>{dueInfo.dueCount}</strong> cards due for review 
                            {dueInfo.totalCards > 0 && (
                              <span> (of {dueInfo.totalCards} total)</span>
                            )}
                          </p>
                        );
                      })()}
                    </div>
                  )}

                  <div className="session-limit-selector">
                    <label htmlFor="session-limit">Session Limit:</label>
                    <div className="number-input-group">
                      <input
                        id="session-limit"
                        type="number"
                        min="10"
                        max="200"
                        value={sessionLimit}
                        onChange={(e) => setSessionLimit(parseInt(e.target.value) || 50)}
                      />
                      <div className="number-controls">
                        <button 
                          type="button"
                          onClick={() => setSessionLimit(Math.min(200, sessionLimit + 10))}
                        >
                          ▲
                        </button>
                        <button 
                          type="button"
                          onClick={() => setSessionLimit(Math.max(10, sessionLimit - 10))}
                        >
                          ▼
                        </button>
                      </div>
                    </div>
                    <span className="session-limit-help">questions before break reminder</span>
                  </div>
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

        {/* FSRS Debug Panel */}
        <FSRSDebugPanel
          heroPosition={heroPosition || 'BU'}
          opponentPositions={opponentPositions}
          gradingMode={gradingMode}
          rangeCategory={rangeCategory}
          visible={showFSRSDebug}
          onClose={() => setShowFSRSDebug(false)}
        />
      </main>
    </div>
  );
};

export default App;