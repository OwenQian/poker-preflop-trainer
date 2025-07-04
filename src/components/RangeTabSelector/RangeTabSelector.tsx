import React from 'react';
import './RangeTabSelector.css';

export type RangeCategory = 'RFI' | 'vs RFI' | 'RFI vs 3bet' | '3bet vs 4bet' | '4bet vs JAM' | 'vs Limp' | 'squeeze';

interface RangeTabSelectorProps {
  activeCategory: RangeCategory;
  onCategoryChange: (category: RangeCategory) => void;
  className?: string;
  excludeTabs?: RangeCategory[];
}

const RangeTabSelector: React.FC<RangeTabSelectorProps> = ({
  activeCategory,
  onCategoryChange,
  className = '',
  excludeTabs = []
}) => {
  const allTabs: RangeCategory[] = ['RFI', 'vs RFI', 'RFI vs 3bet', '3bet vs 4bet', '4bet vs JAM', 'vs Limp', 'squeeze'];
  const tabs = allTabs.filter(tab => !excludeTabs.includes(tab));

  const getTabDescription = (category: RangeCategory): string => {
    switch (category) {
      case 'RFI':
        return 'Raise First In - Opening ranges when action folds to you';
      case 'vs RFI':
        return 'Facing RFI - 3bet/call/fold vs opponent raises';
      case 'RFI vs 3bet':
        return 'RFI vs 3bet - 4bet/call/fold when your raise gets 3bet';
      case '3bet vs 4bet':
        return '3bet vs 4bet - 5bet/call/fold when your 3bet gets 4bet';
      case '4bet vs JAM':
        return '4bet vs JAM - Call/fold when opponent jams after your 4bet';
      case 'vs Limp':
        return 'vs Limp - Raise/call/fold vs limpers';
      case 'squeeze':
        return 'Squeeze - 3bet/call/fold when facing RFI + call';
      default:
        return '';
    }
  };

  return (
    <div className={`range-tab-selector ${className}`}>
      <div className="tab-container">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`tab ${activeCategory === tab ? 'active' : ''}`}
            onClick={() => onCategoryChange(tab)}
            title={getTabDescription(tab)}
          >
            {tab}
          </button>
        ))}
      </div>
      <div className="tab-description">
        {getTabDescription(activeCategory)}
      </div>
    </div>
  );
};

export default RangeTabSelector;