
export interface Question {
  text: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
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

export interface Player {
  level: number;
  xp: number;
  codeBlocks: number;
}

export interface LevelData {
  level: number;
  title: string;
  xpToNextLevel: number;
}

export interface GameState {
  currentScreen: 'main_menu' | 'quiz' | 'shop' | 'leaderboard';
  player: Player;
  completedChallenges: string[];
}

export interface Challenge {
  zoneId: string;
  gateId: string;
  name: string;
  questions: Question[];
  type: 'easy' | 'medium' | 'hard' | 'boss';
}
