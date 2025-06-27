import React from 'react';
import { HandFrequencies } from '../../types';
import './ProbabilityBars.css';

interface ProbabilityBarsProps {
  frequencies: HandFrequencies;
  randomNumber?: number;
  showResult?: boolean; // Whether to show which action the random number selected
}

const ProbabilityBars: React.FC<ProbabilityBarsProps> = ({ frequencies, randomNumber, showResult = false }) => {
  const { raise, call, fold } = frequencies;
  
  // Calculate cumulative ranges for the random number (1-100)
  const raiseRange = raise; // 0 to raise%
  const callRange = raise + call; // raise% to (raise + call)%
  const foldRange = 100; // (raise + call)% to 100%
  
  const getActionForNumber = (num: number): string => {
    if (num <= raiseRange) return 'raise';
    if (num <= callRange) return 'call';
    return 'fold';
  };

  const bars = [
    {
      action: 'Raise',
      percentage: raise,
      color: '#ff9500',
      range: `1-${Math.round(raiseRange)}`,
      isActive: showResult && randomNumber ? randomNumber <= raiseRange : false
    },
    {
      action: 'Call', 
      percentage: call,
      color: '#4CAF50',
      range: call > 0 ? `${Math.round(raiseRange) + 1}-${Math.round(callRange)}` : '',
      isActive: showResult && randomNumber ? randomNumber > raiseRange && randomNumber <= callRange : false
    },
    {
      action: 'Fold',
      percentage: fold,
      color: '#9e9e9e', 
      range: fold > 0 ? `${Math.round(callRange) + 1}-100` : '',
      isActive: showResult && randomNumber ? randomNumber > callRange : false
    }
  ];

  return (
    <div className="probability-bars">
      <div className="probability-title">
        <h4>Probability Ranges (1-100)</h4>
        {randomNumber && showResult && (
          <div className="current-roll">
            Roll: <span className="roll-number">{randomNumber}</span> → 
            <span className={`result-action ${getActionForNumber(randomNumber)}`}>
              {getActionForNumber(randomNumber).charAt(0).toUpperCase() + getActionForNumber(randomNumber).slice(1)}
            </span>
          </div>
        )}
      </div>
      
      <div className="bars-container">
        {bars.map(bar => (
          bar.percentage > 0 && (
            <div 
              key={bar.action}
              className={`probability-bar ${bar.isActive ? 'active' : ''}`}
              style={{ 
                width: `${bar.percentage}%`,
                backgroundColor: bar.color
              }}
            >
              <div className="bar-content">
                <div className="bar-label">{bar.action}</div>
                <div className="bar-percentage">{bar.percentage.toFixed(0)}%</div>
                <div className="bar-range">{bar.range}</div>
              </div>
            </div>
          )
        ))}
        {randomNumber && showResult && (
          <div 
            className="random-number-line"
            style={{ left: `${randomNumber}%` }}
          >
            <div className="line-marker"></div>
          </div>
        )}
      </div>
      
      <div className="range-scale">
        <span>1</span>
        <span>50</span>
        <span>100</span>
      </div>
    </div>
  );
};

export default ProbabilityBars;