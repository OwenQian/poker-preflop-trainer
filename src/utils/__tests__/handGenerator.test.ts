import { generateQuizQuestionWithResult } from '../handGenerator';

describe('Hand Generator', () => {
  describe('SB vs CO RFI Quiz Generation', () => {
    it('should sample only hands with action (not pure fold hands)', () => {
      // Test multiple generations to ensure consistent behavior
      const results = [];
      
      for (let i = 0; i < 10; i++) {
        const result = generateQuizQuestionWithResult(
          'SB',          // heroPosition
          ['CO'],        // opponentPositions
          'vs RFI',      // rangeCategory
          'random',      // samplingMode
          'strict'       // gradingMode
        );
        
        if (result.success) {
          results.push(result.question!);
        }
      }
      
      // Should have successfully generated questions
      expect(results.length).toBeGreaterThan(0);
      
      // Check that all generated hands have some action (not pure fold)
      results.forEach((question, index) => {
        const hasAction = question.frequencies.raise > 0 || question.frequencies.call > 0;
        expect(hasAction).toBe(true);
        
        // Log for debugging
        console.log(`Question ${index + 1}: ${question.handName} - raise: ${question.frequencies.raise}%, call: ${question.frequencies.call}%, fold: ${question.frequencies.fold}%`);
      });
    });
    
    it('should generate valid SB vs CO RFI questions', () => {
      const result = generateQuizQuestionWithResult(
        'SB',          // heroPosition
        ['CO'],        // opponentPositions
        'vs RFI',      // rangeCategory
        'random',      // samplingMode
        'strict'       // gradingMode
      );
      
      expect(result.success).toBe(true);
      expect(result.question).toBeDefined();
      
      if (result.success) {
        expect(result.question!.rangeCombo).toBe('SB_vs_CO_RFI');
        expect(result.question!.position).toBe('SB');
        expect(result.question!.opponents).toEqual(['CO']);
        expect(result.question!.frequencies).toBeDefined();
        expect(result.question!.correctActions).toBeDefined();
        expect(result.question!.correctActions.length).toBeGreaterThan(0);
      }
    });
  });
});