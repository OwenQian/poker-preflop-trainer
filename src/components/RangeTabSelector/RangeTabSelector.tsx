import React from 'react';
import './RangeTabSelector.css';

export type RangeCategory = 'RFI' | 'vs RFI' | 'RFI vs 3bet' | 'vs Limp';

interface RangeTabSelectorProps {
  activeCategory: RangeCategory;
  onCategoryChange: (category: RangeCategory) => void;
  className?: string;
}

const RangeTabSelector: React.FC<RangeTabSelectorProps> = ({
  activeCategory,
  onCategoryChange,
  className = ''
}) => {
  const tabs: RangeCategory[] = ['RFI', 'vs RFI', 'RFI vs 3bet', 'vs Limp'];

  const getTabDescription = (category: RangeCategory): string => {
    switch (category) {
      case 'RFI':
        return 'Raise First In - Opening ranges when action folds to you';
      case 'vs RFI':
        return 'Facing RFI - 3bet/call/fold vs opponent raises';
      case 'RFI vs 3bet':
        return 'RFI vs 3bet - 4bet/call/fold when your raise gets 3bet';
      case 'vs Limp':
        return 'vs Limp - Raise/call/fold vs limpers';
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
            {tab === 'RFI' ? tab : `${tab} (WIP)`}
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