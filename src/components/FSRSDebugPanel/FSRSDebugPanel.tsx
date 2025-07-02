import React, { useState } from 'react';
import { Position, GradingMode, HandName } from '../../types';
import { RangeCategory } from '../RangeTabSelector/RangeTabSelector';
import { getAllHandProgress, saveHandProgress } from '../../utils/storage/localStorage';
import { getHandIdsForRange } from '../../utils/fsrs/quizIntegration';
import { FSRS } from '../../utils/fsrs/fsrs';
import './FSRSDebugPanel.css';

interface FSRSDebugPanelProps {
  heroPosition: Position;
  opponentPositions: Position[];
  gradingMode: GradingMode;
  rangeCategory: RangeCategory;
  visible: boolean;
  onClose: () => void;
}

const FSRSDebugPanel: React.FC<FSRSDebugPanelProps> = ({
  heroPosition,
  opponentPositions,
  gradingMode,
  rangeCategory,
  visible,
  onClose
}) => {
  const [sortBy, setSortBy] = useState<'reviews' | 'difficulty' | 'interval' | 'lapses'>('reviews');
  const [filterStuck, setFilterStuck] = useState<boolean>(false);

  if (!visible) return null;

  const allProgress = getAllHandProgress();
  const handIds = getHandIdsForRange(heroPosition, opponentPositions, gradingMode, rangeCategory);
  
  // Get cards with progress data
  const cardsWithProgress = handIds
    .map(handId => ({
      handId,
      handName: handId.split('_')[0] as HandName,
      progress: allProgress[handId]
    }))
    .filter(card => card.progress?.fsrsCard);

  // Identify stuck cards (>5 reviews in learning state or high lapses)
  const stuckCards = cardsWithProgress.filter(card => {
    if (!card.progress?.fsrsCard) return false;
    const { fsrsCard, performanceStats } = card.progress;
    return (
      (fsrsCard.state === 'learning' && performanceStats.totalReviews > 5) ||
      fsrsCard.lapses > 3 ||
      performanceStats.totalReviews > 15
    );
  });

  // Sort cards
  const sortedCards = [...cardsWithProgress].sort((a, b) => {
    if (!a.progress?.fsrsCard || !b.progress?.fsrsCard) return 0;
    
    switch (sortBy) {
      case 'reviews':
        return b.progress.performanceStats.totalReviews - a.progress.performanceStats.totalReviews;
      case 'difficulty':
        return b.progress.fsrsCard.difficulty - a.progress.fsrsCard.difficulty;
      case 'interval':
        return b.progress.fsrsCard.scheduledDays - a.progress.fsrsCard.scheduledDays;
      case 'lapses':
        return b.progress.fsrsCard.lapses - a.progress.fsrsCard.lapses;
      default:
        return 0;
    }
  });

  const displayCards = filterStuck ? stuckCards : sortedCards;

  const resetCard = (handId: string) => {
    if (window.confirm(`Reset progress for ${handId.split('_')[0]}? This will clear all review history.`)) {
      const fsrs = new FSRS();
      const newProgress = {
        handId,
        fsrsCard: fsrs.createCard(),
        reviewHistory: [],
        performanceStats: {
          totalReviews: 0,
          correctStreak: 0,
          accuracyRate: 0
        }
      };
      saveHandProgress(handId, newProgress);
      // Force refresh by triggering a re-render
      window.location.reload();
    }
  };

  const resetAllStuckCards = () => {
    if (window.confirm(`Reset ${stuckCards.length} stuck cards? This will clear their review history.`)) {
      const fsrs = new FSRS();
      stuckCards.forEach(card => {
        const newProgress = {
          handId: card.handId,
          fsrsCard: fsrs.createCard(),
          reviewHistory: [],
          performanceStats: {
            totalReviews: 0,
            correctStreak: 0,
            accuracyRate: 0
          }
        };
        saveHandProgress(card.handId, newProgress);
      });
      window.location.reload();
    }
  };

  const formatDate = (date: Date): string => {
    return new Date(date).toLocaleDateString() + ' ' + new Date(date).toLocaleTimeString();
  };

  const getStateColor = (state: string): string => {
    switch (state) {
      case 'new': return '#4caf50';
      case 'learning': return '#ff9800';
      case 'review': return '#2196f3';
      default: return '#9e9e9e';
    }
  };

  return (
    <div className="fsrs-debug-overlay">
      <div className="fsrs-debug-panel">
        <div className="debug-header">
          <h2>FSRS Debug Panel</h2>
          <button onClick={onClose} className="close-button">×</button>
        </div>

        <div className="debug-stats">
          <div className="stat-card">
            <h3>Total Cards</h3>
            <div className="stat-value">{handIds.length}</div>
          </div>
          <div className="stat-card">
            <h3>With Progress</h3>
            <div className="stat-value">{cardsWithProgress.length}</div>
          </div>
          <div className="stat-card stuck">
            <h3>Stuck Cards</h3>
            <div className="stat-value">{stuckCards.length}</div>
          </div>
          <div className="stat-card">
            <h3>Range</h3>
            <div className="stat-value">{rangeCategory}</div>
          </div>
        </div>

        <div className="debug-controls">
          <div className="control-group">
            <label>Sort by:</label>
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value as any)}>
              <option value="reviews">Total Reviews</option>
              <option value="difficulty">Difficulty</option>
              <option value="interval">Scheduled Days</option>
              <option value="lapses">Lapses</option>
            </select>
          </div>
          
          <div className="control-group">
            <label>
              <input 
                type="checkbox" 
                checked={filterStuck} 
                onChange={(e) => setFilterStuck(e.target.checked)}
              />
              Show only stuck cards
            </label>
          </div>

          {stuckCards.length > 0 && (
            <button 
              className="reset-all-button"
              onClick={resetAllStuckCards}
            >
              Reset All Stuck Cards ({stuckCards.length})
            </button>
          )}
        </div>

        <div className="cards-table">
          <div className="table-header">
            <div>Hand</div>
            <div>State</div>
            <div>Reviews</div>
            <div>Accuracy</div>
            <div>Difficulty</div>
            <div>Interval</div>
            <div>Lapses</div>
            <div>Due Date</div>
            <div>Actions</div>
          </div>
          
          <div className="table-body">
            {displayCards.map(card => {
              if (!card.progress?.fsrsCard) return null;
              
              const { fsrsCard, performanceStats } = card.progress;
              const isStuck = stuckCards.some(stuck => stuck.handId === card.handId);
              
              return (
                <div key={card.handId} className={`table-row ${isStuck ? 'stuck' : ''}`}>
                  <div className="hand-name">{card.handName}</div>
                  <div 
                    className="card-state"
                    style={{ color: getStateColor(fsrsCard.state) }}
                  >
                    {fsrsCard.state}
                  </div>
                  <div>{performanceStats.totalReviews}</div>
                  <div>{Math.round(performanceStats.accuracyRate * 100)}%</div>
                  <div>{fsrsCard.difficulty.toFixed(1)}</div>
                  <div>{fsrsCard.scheduledDays.toFixed(1)}d</div>
                  <div>{fsrsCard.lapses}</div>
                  <div className="due-date">
                    {fsrsCard.due ? formatDate(fsrsCard.due) : 'Never'}
                  </div>
                  <div>
                    <button 
                      onClick={() => resetCard(card.handId)}
                      className="reset-button"
                    >
                      Reset
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {displayCards.length === 0 && (
          <div className="no-data">
            {filterStuck ? 'No stuck cards found!' : 'No cards with progress data.'}
          </div>
        )}
      </div>
    </div>
  );
};

export default FSRSDebugPanel;