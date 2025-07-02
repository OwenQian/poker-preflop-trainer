import React from 'react';
import { Position, GradingMode, HandName } from '../../types';
import { RangeCategory } from '../RangeTabSelector/RangeTabSelector';
import { getDueCardsInfo } from '../../utils/fsrs/quizIntegration';
import { getAllHandProgress } from '../../utils/storage/localStorage';
import './RemainingCardsOverlay.css';

interface RemainingCardsOverlayProps {
  heroPosition: Position;
  opponentPositions: Position[];
  gradingMode: GradingMode;
  rangeCategory: RangeCategory;
  daysAhead: number;
  visible: boolean;
  sessionHandCounts: Record<string, number>;
}

const RemainingCardsOverlay: React.FC<RemainingCardsOverlayProps> = ({
  heroPosition,
  opponentPositions,
  gradingMode,
  rangeCategory,
  daysAhead,
  visible,
  sessionHandCounts
}) => {
  if (!visible) return null;

  const dueInfo = getDueCardsInfo(heroPosition, opponentPositions, gradingMode, rangeCategory, daysAhead);
  const allProgress = getAllHandProgress();

  // Debug logging to track visualization consistency
  console.log('📊 Overlay Debug:', {
    heroPosition,
    opponentPositions,
    rangeCategory,
    daysAhead,
    dueCount: dueInfo.dueCount,
    dueCards: dueInfo.dueCards.slice(0, 5), // Show first 5 for debugging
    dueHandNames: dueInfo.dueCards.map(handId => handId.split('_')[0]).slice(0, 5)
  });

  // Extract hand names from handIds and categorize them
  const categorizedHands = {
    new: [] as HandName[],
    due: [] as HandName[],
    overdue: [] as HandName[]
  };

  const now = new Date();

  dueInfo.dueCards.forEach(handId => {
    // Extract hand name from handId (format: handName_position_vs_opponents_gradingMode)
    const handName = handId.split('_')[0] as HandName;
    const progress = allProgress[handId];
    
    if (!progress?.fsrsCard) {
      categorizedHands.new.push(handName);
    } else {
      const dueDate = progress.fsrsCard.due;
      const daysOverdue = Math.floor((now.getTime() - dueDate.getTime()) / (1000 * 60 * 60 * 24));
      
      if (daysOverdue > 0) {
        categorizedHands.overdue.push(handName);
      } else {
        categorizedHands.due.push(handName);
      }
    }
  });

  // Create 13x13 grid of all possible hands for visual reference
  const HAND_MATRIX: HandName[][] = [
    ['AA', 'AKs', 'AQs', 'AJs', 'ATs', 'A9s', 'A8s', 'A7s', 'A6s', 'A5s', 'A4s', 'A3s', 'A2s'],
    ['AKo', 'KK', 'KQs', 'KJs', 'KTs', 'K9s', 'K8s', 'K7s', 'K6s', 'K5s', 'K4s', 'K3s', 'K2s'],
    ['AQo', 'KQo', 'QQ', 'QJs', 'QTs', 'Q9s', 'Q8s', 'Q7s', 'Q6s', 'Q5s', 'Q4s', 'Q3s', 'Q2s'],
    ['AJo', 'KJo', 'QJo', 'JJ', 'JTs', 'J9s', 'J8s', 'J7s', 'J6s', 'J5s', 'J4s', 'J3s', 'J2s'],
    ['ATo', 'KTo', 'QTo', 'JTo', 'TT', 'T9s', 'T8s', 'T7s', 'T6s', 'T5s', 'T4s', 'T3s', 'T2s'],
    ['A9o', 'K9o', 'Q9o', 'J9o', 'T9o', '99', '98s', '97s', '96s', '95s', '94s', '93s', '92s'],
    ['A8o', 'K8o', 'Q8o', 'J8o', 'T8o', '98o', '88', '87s', '86s', '85s', '84s', '83s', '82s'],
    ['A7o', 'K7o', 'Q7o', 'J7o', 'T7o', '97o', '87o', '77', '76s', '75s', '74s', '73s', '72s'],
    ['A6o', 'K6o', 'Q6o', 'J6o', 'T6o', '96o', '86o', '76o', '66', '65s', '64s', '63s', '62s'],
    ['A5o', 'K5o', 'Q5o', 'J5o', 'T5o', '95o', '85o', '75o', '65o', '55', '54s', '53s', '52s'],
    ['A4o', 'K4o', 'Q4o', 'J4o', 'T4o', '94o', '84o', '74o', '64o', '54o', '44', '43s', '42s'],
    ['A3o', 'K3o', 'Q3o', 'J3o', 'T3o', '93o', '83o', '73o', '63o', '53o', '43o', '33', '32s'],
    ['A2o', 'K2o', 'Q2o', 'J2o', 'T2o', '92o', '82o', '72o', '62o', '52o', '42o', '32o', '22']
  ];

  const allDueHands = new Set([...categorizedHands.new, ...categorizedHands.due, ...categorizedHands.overdue]);

  const getHandColor = (hand: HandName): string => {
    if (categorizedHands.overdue.includes(hand)) {
      return '#d32f2f'; // red - overdue
    }
    if (categorizedHands.due.includes(hand)) {
      return '#ff9800'; // orange - due today
    }
    if (categorizedHands.new.includes(hand)) {
      return '#4caf50'; // green - new
    }
    return '#e0e0e0'; // gray - not due
  };

  return (
    <div className="remaining-cards-overlay">
      <div className="overlay-header">
        <h3>Remaining Cards to Review</h3>
        <div className="legend">
          <div className="legend-item">
            <div className="legend-color overdue"></div>
            <span>Overdue ({categorizedHands.overdue.length})</span>
          </div>
          <div className="legend-item">
            <div className="legend-color due"></div>
            <span>Due Today ({categorizedHands.due.length})</span>
          </div>
          <div className="legend-item">
            <div className="legend-color new"></div>
            <span>New ({categorizedHands.new.length})</span>
          </div>
        </div>
      </div>
      
      <div className="hand-grid">
        {HAND_MATRIX.map((row, rowIndex) => (
          <div key={rowIndex} className="hand-row">
            {row.map((hand, colIndex) => (
              <div
                key={`${rowIndex}-${colIndex}`}
                className={`hand-cell ${allDueHands.has(hand) ? 'due' : 'not-due'}`}
                style={{ backgroundColor: getHandColor(hand) }}
                title={(() => {
                  const sessionCount = sessionHandCounts[hand] || 0;
                  const sessionText = sessionCount > 0 ? ` (${sessionCount}x this session)` : '';
                  return `${hand}${allDueHands.has(hand) ? ' - Due for review' : ' - Not due'}${sessionText}`;
                })()}
              >
                {hand}
                {sessionHandCounts[hand] && (
                  <span className="session-count">{sessionHandCounts[hand]}</span>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
      
      <div className="overlay-footer">
        <p>Total: {dueInfo.dueCount} cards due for review</p>
        {Object.keys(sessionHandCounts).length > 0 && (
          <p className="session-summary">
            Session: {Object.keys(sessionHandCounts).length} hands reviewed, 
            {' '}{Object.values(sessionHandCounts).reduce((sum, count) => sum + count, 0)} total reviews
          </p>
        )}
      </div>
    </div>
  );
};

export default RemainingCardsOverlay;