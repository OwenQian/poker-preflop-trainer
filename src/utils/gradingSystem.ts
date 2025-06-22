import { Action, GradingMode, HandFrequencies, QuizAnswer, QuizQuestion } from '../types';

export interface GradingResult {
  isCorrect: boolean;
  explanation: string;
  correctActions: Action[];
}

export const gradeAnswer = (
  question: QuizQuestion,
  answer: QuizAnswer,
  gradingMode: GradingMode
): GradingResult => {
  const { frequencies } = question;
  const { selectedActions } = answer;

  switch (gradingMode) {
    case 'strict':
      return gradeStrict(frequencies, selectedActions);
    
    case 'lax':
      return gradeLax(frequencies, selectedActions);
    
    case 'randomizer':
      return gradeRandomizer(frequencies, selectedActions);
    
    default:
      return {
        isCorrect: false,
        explanation: 'Invalid grading mode',
        correctActions: []
      };
  }
};

const gradeStrict = (frequencies: HandFrequencies, selectedActions: Action[]): GradingResult => {
  const correctActions = getCorrectActions(frequencies);
  const selectedSet = new Set(selectedActions);
  const correctSet = new Set(correctActions);
  
  // Must select ALL correct actions and NO incorrect actions
  const isCorrect = selectedSet.size === correctSet.size && 
    Array.from(selectedSet).every(action => correctSet.has(action));

  return {
    isCorrect,
    explanation: isCorrect 
      ? 'Perfect! You selected all the correct actions.'
      : `You need to select ALL correct actions: ${correctActions.join(', ')}. You selected: ${selectedActions.join(', ')}.`,
    correctActions
  };
};

const gradeLax = (frequencies: HandFrequencies, selectedActions: Action[]): GradingResult => {
  const correctActions = getCorrectActions(frequencies);
  const selectedSet = new Set(selectedActions);
  const correctSet = new Set(correctActions);
  
  // Must select at least ONE correct action
  const hasCorrectAction = Array.from(selectedSet).some(action => correctSet.has(action));
  
  return {
    isCorrect: hasCorrectAction,
    explanation: hasCorrectAction
      ? 'Good! You selected at least one correct action.'
      : `You didn't select any correct actions. The correct actions are: ${correctActions.join(', ')}.`,
    correctActions
  };
};

const gradeRandomizer = (frequencies: HandFrequencies, selectedActions: Action[]): GradingResult => {
  const randomNumber = Math.floor(Math.random() * 100) + 1; // 1-100 inclusive
  const correctAction = getRandomizerCorrectAction(frequencies, randomNumber);
  
  const isCorrect = selectedActions.includes(correctAction);
  
  return {
    isCorrect,
    explanation: isCorrect
      ? `Correct! With random number ${randomNumber}, the correct action is ${correctAction}.`
      : `Incorrect. With random number ${randomNumber}, the correct action is ${correctAction}. You selected: ${selectedActions.join(', ')}.`,
    correctActions: [correctAction]
  };
};

const getCorrectActions = (frequencies: HandFrequencies): Action[] => {
  const { raise, call, fold } = frequencies;
  const actions: Action[] = [];
  
  // An action is considered "correct" if it has a reasonable frequency (>20%)
  if (raise >= 20) actions.push('raise');
  if (call >= 20) actions.push('call');
  if (fold >= 20) actions.push('fold');
  
  // If no action has >20%, pick the highest frequency action
  if (actions.length === 0) {
    if (raise >= call && raise >= fold) actions.push('raise');
    else if (call >= fold) actions.push('call');
    else actions.push('fold');
  }
  
  return actions;
};

const getRandomizerCorrectAction = (frequencies: HandFrequencies, randomNumber: number): Action => {
  const { call, fold } = frequencies;
  
  // Fold gets the lowest numbers
  if (randomNumber <= fold) {
    return 'fold';
  }
  
  // Call gets the middle numbers
  if (randomNumber <= fold + call) {
    return 'call';
  }
  
  // Raise gets the highest numbers
  return 'raise';
};

export const getActionDescription = (action: Action): string => {
  switch (action) {
    case 'raise':
      return 'Raise/Bet - Aggressive action to build the pot or apply pressure';
    case 'call':
      return 'Call/Check - Passive action to see more cards without committing more chips';
    case 'fold':
      return 'Fold - Give up the hand to avoid further losses';
  }
};

export const getFrequencyDescription = (frequencies: HandFrequencies): string => {
  const { raise, call, fold } = frequencies;
  const total = raise + call + fold;
  
  if (total !== 100) {
    return 'Invalid frequency data';
  }
  
  const descriptions: string[] = [];
  
  if (raise > 0) descriptions.push(`Raise ${raise}%`);
  if (call > 0) descriptions.push(`Call ${call}%`);
  if (fold > 0) descriptions.push(`Fold ${fold}%`);
  
  return descriptions.join(', ');
};