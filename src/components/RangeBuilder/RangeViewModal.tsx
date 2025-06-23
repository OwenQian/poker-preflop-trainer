import React from 'react';
import { HandName, HandFrequencies } from '../../types';
import './RangeViewModal.css';

interface RangeViewModalProps {
  isOpen: boolean;
  onClose: () => void;
  rangeData: Record<HandName, HandFrequencies>;
}

const RangeViewModal: React.FC<RangeViewModalProps> = ({ 
  isOpen, 
  onClose, 
  rangeData 
}) => {
  if (!isOpen) return null;

  const validateRangeData = (): { isValid: boolean; errors: string[] } => {
    const errors: string[] = [];
    
    Object.entries(rangeData).forEach(([handName, frequencies]) => {
      // Check for negative percentages
      if (frequencies.raise < 0 || frequencies.call < 0 || frequencies.fold < 0) {
        errors.push(`${handName}: Contains negative percentage values`);
      }
      
      // Check frequencies sum to 100%
      const total = frequencies.raise + frequencies.call + frequencies.fold;
      if (Math.abs(total - 100) > 0.1) { // Allow small floating point errors
        errors.push(`${handName}: Frequencies don't sum to 100% (currently ${total.toFixed(1)}%)`);
      }
      
      // Validate hand name format
      const validHandPattern = /^(A[AKQJT98765432][so]?|K[KQJT98765432][so]?|Q[QJT98765432][so]?|J[JT98765432][so]?|T[T98765432][so]?|9[98765432][so]?|8[8765432][so]?|7[765432][so]?|6[65432][so]?|5[5432][so]?|4[432][so]?|3[32][so]?|2[2][so]?)$/;
      if (!validHandPattern.test(handName)) {
        errors.push(`${handName}: Invalid poker hand name format`);
      }
      
      // Check for valid suit designators
      if (handName.length === 3 && !handName.endsWith('s') && !handName.endsWith('o')) {
        errors.push(`${handName}: Must end with 's' (suited) or 'o' (offsuit)`);
      }
      
      // Check pocket pairs don't have suit designators
      if (handName.length > 2 && handName[0] === handName[1]) {
        errors.push(`${handName}: Pocket pairs should not have suit designators`);
      }
    });
    
    return {
      isValid: errors.length === 0,
      errors
    };
  };

  const generateRangeOutput = () => {
    const nonEmptyHands = Object.entries(rangeData).filter(([_, frequencies]) => 
      frequencies.raise > 0 || frequencies.call > 0
    );

    if (nonEmptyHands.length === 0) {
      return {
        typescript: '// Empty range - no hands selected',
        json: '{}',
        summary: 'No hands in range'
      };
    }

    // TypeScript format
    const tsOutput = `const CUSTOM_RANGE = {
  positionCombo: 'CUSTOM_RANGE',
  hands: {
${nonEmptyHands.map(([handName, frequencies]) => 
  `    '${handName}': { raise: ${frequencies.raise}, call: ${frequencies.call}, fold: ${frequencies.fold} }`
).join(',\n')}
  }
};`;

    // JSON format
    const jsonOutput = JSON.stringify(
      Object.fromEntries(nonEmptyHands), 
      null, 
      2
    );

    // Calculate combinations using poker combinatorics
    const getHandCombinations = (handName: string): number => {
      // Pocket pairs (AA, KK, QQ, etc.)
      if (handName[0] === handName[1]) {
        return 6; // 4 choose 2 = 6 combinations
      }
      
      // Suited hands (AKs, AQs, etc.)
      if (handName.endsWith('s')) {
        return 4; // 4 combinations (one for each suit)
      }
      
      // Offsuit hands (AKo, AQo, etc.)
      if (handName.endsWith('o')) {
        return 12; // 4 * 3 = 12 combinations
      }
      
      return 0; // Shouldn't happen with valid hand names
    };

    // Summary stats using combinations
    const totalCombinations = nonEmptyHands.reduce((sum, [handName]) => 
      sum + getHandCombinations(handName), 0
    );
    
    const totalPossibleCombinations = 1326; // 52 choose 2 = 52*51/2 = 1326
    
    const raiseOnlyHands = nonEmptyHands.filter(([_, f]) => f.raise === 100).length;
    const callOnlyHands = nonEmptyHands.filter(([_, f]) => f.call === 100).length;
    const mixedHands = nonEmptyHands.filter(([_, f]) => f.raise > 0 && f.raise < 100 || f.call > 0 && f.call < 100).length;

    const summary = `Range Summary:
• Total combinations: ${totalCombinations}/${totalPossibleCombinations} (${((totalCombinations/totalPossibleCombinations) * 100).toFixed(1)}%)
• Hand types: ${nonEmptyHands.length}/169 unique hands
• Always raise: ${raiseOnlyHands} hands
• Always call: ${callOnlyHands} hands  
• Mixed frequency: ${mixedHands} hands`;

    return { typescript: tsOutput, json: jsonOutput, summary };
  };

  const { typescript, json, summary } = generateRangeOutput();
  const validation = validateRangeData();

  return (
    <div className="range-view-modal-overlay" onClick={onClose}>
      <div className="range-view-modal" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Range Data Output</h2>
          <button className="close-button" onClick={onClose}>✕</button>
        </div>
        
        <div className="modal-content">
          {!validation.isValid && (
            <div className="output-section">
              <h3>⚠️ Validation Warnings</h3>
              <pre className="validation-output">
{validation.errors.join('\n')}
              </pre>
            </div>
          )}
          
          <div className="output-section">
            <h3>Summary</h3>
            <pre className="summary-output">{summary}</pre>
          </div>

          <div className="output-section">
            <h3>TypeScript Format</h3>
            <pre className="code-output">{typescript}</pre>
          </div>

          <div className="output-section">
            <h3>JSON Format</h3>
            <pre className="code-output">{json}</pre>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RangeViewModal;