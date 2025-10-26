// Fix: The original content of this file was incorrect. It contained constants
// that belong in 'constants.ts' and a circular import that broke the type system.
// This new content defines and exports all the necessary types and interfaces for the application.
// This single change resolves all type errors across the project.

export interface Player {
  level: number;
  xp: number;
  codeBlocks: number;
}

export interface Question {
  id: string;
  type: 'multiple-choice' | 'code-upload';
  text: string;
  options?: string[];
  correctOptionIndex?: number;
  explanation: string;
  xp: number;
  code?: string; // For code-upload questions
}

export interface Gate {
  id: string;
  name: string;
  type: 'easy' | 'medium' | 'hard' | 'boss';
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

export type UserRole = 'student' | 'teacher';
