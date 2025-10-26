export interface Player {
  level: number;
  xp: number;
  codeBlocks: number;
  name: string;
}

export type QuestionType = 'multiple-choice' | 'true-false';

export interface BaseQuestion {
  id: string;
  type: QuestionType;
  text: string;
  explanation: string;
  xp: number;
}

export interface MultipleChoiceQuestion extends BaseQuestion {
  type: 'multiple-choice';
  options: string[];
  correctOptionIndex: number;
}

export interface TrueFalseQuestion extends BaseQuestion {
  type: 'true-false';
  statements: string[];
  correctAnswers: boolean[]; // Array of 4 booleans, e.g., [true, false, true, false]
}

export type Question = MultipleChoiceQuestion | TrueFalseQuestion;


export interface Gate {
  id: string;
  name: string;
  type: 'easy' | 'medium' | 'hard' | 'boss'; // NB, TH, VD
  questions: Question[];
}

export interface Zone {
  id: string;
  name: string;
  description: string;
  gates: Gate[];
}

export interface Challenge {
  zoneId: string;
  gateId: string;
  name: string;
  questions: Question[];
  type: 'easy' | 'medium' | 'hard' | 'boss';
}

export interface LevelData {
  level: number;
  title: string;
  xpToNextLevel: number;
}
