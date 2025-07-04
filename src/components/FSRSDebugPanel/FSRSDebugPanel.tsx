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
  daysAhead?: number; // Add daysAhead prop for better debugging
}

type SortColumn = 'hand' | 'state' | 'reviews' | 'accuracy' | 'difficulty' | 'interval' | 'lapses' | 'dueDate' | 'stability' | 'elapsedDays' | 'reps' | 'isDue';
type SortDirection = 'asc' | 'desc';

const FSRSDebugPanel: React.FC<FSRSDebugPanelProps> = ({
  heroPosition,
  opponentPositions,
  gradingMode,
  rangeCategory,
  visible,
  onClose,
  daysAhead = 0
}) => {
  const [sortBy, setSortBy] = useState<SortColumn>('reviews');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');
  const [filterStuck, setFilterStuck] = useState<boolean>(false);
  const [expandedCard, setExpandedCard] = useState<string | null>(null);

  if (!visible) return null;

  const formatPositionCombo = (): string => {
    switch (rangeCategory) {
      case 'RFI':
        return `${heroPosition} RFI`;
      case 'vs RFI':
        if (opponentPositions.length > 0) {
          return `${heroPosition} vs ${opponentPositions.join('/')} RFI`;
        }
        return `${heroPosition} vs RFI`;
      case 'RFI vs 3bet':
        if (opponentPositions.length > 0) {
          return `${heroPosition} RFI vs ${opponentPositions.join('/')} 3bet`;
        }
        return `${heroPosition} RFI vs 3bet`;
      case 'vs Limp':
        return `${heroPosition} vs Limp`;
      case '3bet vs 4bet':
        if (opponentPositions.length > 0) {
          return `${heroPosition} 3bet vs ${opponentPositions.join('/')} 4bet`;
        }
        return `${heroPosition} 3bet vs 4bet`;
      case '4bet vs JAM':
        if (opponentPositions.length > 0) {
          return `${heroPosition} 4bet vs ${opponentPositions.join('/')} jam`;
        }
        return `${heroPosition} 4bet vs jam`;
      default:
        return `${heroPosition} ${rangeCategory}`;
    }
  };

  const handleColumnClick = (column: SortColumn) => {
    if (sortBy === column) {
      // If clicking the same column, toggle direction
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      // If clicking a new column, set it as sort column with desc as default
      setSortBy(column);
      setSortDirection('desc');
    }
  };

  const allProgress = getAllHandProgress();
  const handIds = getHandIdsForRange(heroPosition, opponentPositions, gradingMode, rangeCategory);
  const now = new Date();
  const futureDate = new Date(now.getTime() + daysAhead * 24 * 60 * 60 * 1000);
  
  // Get cards with progress data and calculate due status
  const cardsWithProgress = handIds
    .map(handId => {
      const progress = allProgress[handId];
      const isDue = progress?.fsrsCard ? progress.fsrsCard.due <= futureDate : true; // New cards are always due
      const daysDiff = progress?.fsrsCard ? (progress.fsrsCard.due.getTime() - now.getTime()) / (1000 * 60 * 60 * 24) : 0;
      
      return {
        handId,
        handName: handId.split('_')[0] as HandName,
        progress: progress,
        isDue,
        daysDifference: Math.round(daysDiff * 100) / 100
      };
    })
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
    let comparison = 0;
    
    switch (sortBy) {
      case 'hand':
        comparison = a.handName.localeCompare(b.handName);
        break;
      case 'state':
        if (!a.progress?.fsrsCard || !b.progress?.fsrsCard) return 0;
        comparison = a.progress.fsrsCard.state.localeCompare(b.progress.fsrsCard.state);
        break;
      case 'reviews':
        if (!a.progress?.fsrsCard || !b.progress?.fsrsCard) return 0;
        comparison = a.progress.performanceStats.totalReviews - b.progress.performanceStats.totalReviews;
        break;
      case 'accuracy':
        if (!a.progress?.fsrsCard || !b.progress?.fsrsCard) return 0;
        comparison = a.progress.performanceStats.accuracyRate - b.progress.performanceStats.accuracyRate;
        break;
      case 'difficulty':
        if (!a.progress?.fsrsCard || !b.progress?.fsrsCard) return 0;
        comparison = a.progress.fsrsCard.difficulty - b.progress.fsrsCard.difficulty;
        break;
      case 'interval':
        if (!a.progress?.fsrsCard || !b.progress?.fsrsCard) return 0;
        comparison = a.progress.fsrsCard.scheduledDays - b.progress.fsrsCard.scheduledDays;
        break;
      case 'lapses':
        if (!a.progress?.fsrsCard || !b.progress?.fsrsCard) return 0;
        comparison = a.progress.fsrsCard.lapses - b.progress.fsrsCard.lapses;
        break;
      case 'dueDate':
        if (!a.progress?.fsrsCard || !b.progress?.fsrsCard) return 0;
        const aDate = a.progress.fsrsCard.due ? a.progress.fsrsCard.due.getTime() : 0;
        const bDate = b.progress.fsrsCard.due ? b.progress.fsrsCard.due.getTime() : 0;
        comparison = aDate - bDate;
        break;
      case 'stability':
        if (!a.progress?.fsrsCard || !b.progress?.fsrsCard) return 0;
        comparison = a.progress.fsrsCard.stability - b.progress.fsrsCard.stability;
        break;
      case 'elapsedDays':
        if (!a.progress?.fsrsCard || !b.progress?.fsrsCard) return 0;
        comparison = a.progress.fsrsCard.elapsedDays - b.progress.fsrsCard.elapsedDays;
        break;
      case 'reps':
        if (!a.progress?.fsrsCard || !b.progress?.fsrsCard) return 0;
        comparison = a.progress.fsrsCard.reps - b.progress.fsrsCard.reps;
        break;
      case 'isDue':
        comparison = (a.isDue ? 1 : 0) - (b.isDue ? 1 : 0);
        break;
      default:
        return 0;
    }
    
    return sortDirection === 'asc' ? comparison : -comparison;
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

  const getSortIndicator = (column: SortColumn): string => {
    if (sortBy === column) {
      return sortDirection === 'asc' ? ' ↑' : ' ↓';
    }
    return '';
  };

  return (
    <div className="fsrs-debug-overlay">
      <div className="fsrs-debug-panel">
        <div className="debug-header">
          <div className="debug-title-container">
            <h2>FSRS Debug Panel</h2>
            <div className="debug-subtitle">{formatPositionCombo()} • Strictness: {gradingMode.charAt(0).toUpperCase() + gradingMode.slice(1)}</div>
          </div>
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
          <div className="stat-card">
            <h3>Due Cards</h3>
            <div className="stat-value">{cardsWithProgress.filter(c => c.isDue).length}</div>
          </div>
          <div className="stat-card stuck">
            <h3>Stuck Cards</h3>
            <div className="stat-value">{stuckCards.length}</div>
          </div>
          <div className="stat-card">
            <h3>Days Ahead</h3>
            <div className="stat-value">{daysAhead}</div>
          </div>
        </div>

        <div className="debug-controls">
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
          
          <div className="sort-hint">
            💡 Click column headers to sort
          </div>
        </div>

        <div className="cards-table">
          <div className="table-header">
            <div className="sortable-header" onClick={() => handleColumnClick('hand')}>
              Hand{getSortIndicator('hand')}
            </div>
            <div className="sortable-header" onClick={() => handleColumnClick('state')}>
              State{getSortIndicator('state')}
            </div>
            <div className="sortable-header" onClick={() => handleColumnClick('isDue')}>
              Due?{getSortIndicator('isDue')}
            </div>
            <div className="sortable-header" onClick={() => handleColumnClick('reviews')}>
              Reviews{getSortIndicator('reviews')}
            </div>
            <div className="sortable-header" onClick={() => handleColumnClick('accuracy')}>
              Accuracy{getSortIndicator('accuracy')}
            </div>
            <div className="sortable-header" onClick={() => handleColumnClick('difficulty')}>
              Difficulty{getSortIndicator('difficulty')}
            </div>
            <div className="sortable-header" onClick={() => handleColumnClick('stability')}>
              Stability{getSortIndicator('stability')}
            </div>
            <div className="sortable-header" onClick={() => handleColumnClick('interval')}>
              Interval{getSortIndicator('interval')}
            </div>
            <div className="sortable-header" onClick={() => handleColumnClick('reps')}>
              Reps{getSortIndicator('reps')}
            </div>
            <div className="sortable-header" onClick={() => handleColumnClick('lapses')}>
              Lapses{getSortIndicator('lapses')}
            </div>
            <div className="sortable-header" onClick={() => handleColumnClick('dueDate')}>
              Due Date{getSortIndicator('dueDate')}
            </div>
            <div>Actions</div>
          </div>
          
          <div className="table-body">
            {displayCards.map(card => {
              if (!card.progress?.fsrsCard) return null;
              
              const { fsrsCard, performanceStats } = card.progress;
              const isStuck = stuckCards.some(stuck => stuck.handId === card.handId);
              
              return (
                <>
                  <div key={card.handId} className={`table-row ${isStuck ? 'stuck' : ''} ${card.isDue ? 'due' : ''}`}>
                    <div className="hand-name">{card.handName}</div>
                    <div 
                      className="card-state"
                      style={{ color: getStateColor(fsrsCard.state) }}
                    >
                      {fsrsCard.state}
                    </div>
                    <div className={`due-status ${card.isDue ? 'due' : 'not-due'}`}>
                      {card.isDue ? '✓' : '○'} {card.daysDifference.toFixed(1)}d
                    </div>
                    <div>{performanceStats.totalReviews}</div>
                    <div>{Math.round(performanceStats.accuracyRate * 100)}%</div>
                    <div>{fsrsCard.difficulty.toFixed(1)}</div>
                    <div>{fsrsCard.stability.toFixed(2)}</div>
                    <div>{fsrsCard.scheduledDays.toFixed(1)}d</div>
                    <div>{fsrsCard.reps}</div>
                    <div>{fsrsCard.lapses}</div>
                    <div className="due-date">
                      {fsrsCard.due ? formatDate(fsrsCard.due) : 'Never'}
                    </div>
                    <div>
                      <button 
                        onClick={() => setExpandedCard(expandedCard === card.handId ? null : card.handId)}
                        className="expand-button"
                        style={{ marginRight: '5px' }}
                      >
                        {expandedCard === card.handId ? '−' : '+'}
                      </button>
                      <button 
                        onClick={() => resetCard(card.handId)}
                        className="reset-button"
                      >
                        Reset
                      </button>
                    </div>
                  </div>
                  {expandedCard === card.handId && (
                    <div className="expanded-details">
                      <div className="details-grid">
                        <div><strong>Hand ID:</strong> {card.handId}</div>
                        <div><strong>Elapsed Days:</strong> {fsrsCard.elapsedDays}</div>
                        <div><strong>Last Review:</strong> {fsrsCard.lastReview ? formatDate(fsrsCard.lastReview) : 'Never'}</div>
                        <div><strong>Correct Streak:</strong> {performanceStats.correctStreak}</div>
                        <div><strong>Due in days:</strong> {card.daysDifference > 0 ? `+${card.daysDifference.toFixed(2)}` : card.daysDifference.toFixed(2)}</div>
                        <div><strong>Days Ahead Setting:</strong> {daysAhead}</div>
                        <div><strong>Review History:</strong> {card.progress.reviewHistory?.length || 0} entries</div>
                        <div><strong>FSRS State:</strong> {JSON.stringify({
                          state: fsrsCard.state,
                          stability: Math.round(fsrsCard.stability * 100) / 100,
                          difficulty: Math.round(fsrsCard.difficulty * 100) / 100,
                          reps: fsrsCard.reps,
                          lapses: fsrsCard.lapses
                        }, null, 2)}</div>
                      </div>
                    </div>
                  )}
                </>
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