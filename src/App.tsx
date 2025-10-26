import React, { useState, useEffect } from 'react';
import MainMenu from './components/MainMenu';
import QuizView from './components/QuizView';
import Hud from './Hud';
import { Player, Challenge, Zone, Question, LevelData } from './types';
import { ZONES, LEVELS } from './constants';

const initialPlayer: Player = {
  level: 1,
  xp: 0,
  codeBlocks: 100,
  name: 'Architect #001'
};

const App: React.FC = () => {
  const [player, setPlayer] = useState<Player>(initialPlayer);
  const [completedChallenges, setCompletedChallenges] = useState<string[]>([]);
  const [activeChallenge, setActiveChallenge] = useState<Challenge | null>(null);
 
  useEffect(() => {
    const currentLevelData = LEVELS.find(l => l.level === player.level);
    if (currentLevelData && player.xp >= currentLevelData.xpToNextLevel) {
      const nextLevel = LEVELS.find(l => l.level === player.level + 1);
      if (nextLevel) {
          setPlayer(prev => ({ ...prev, level: prev.level + 1 }));
      }
    }
  }, [player.xp, player.level]);
  
  const handleStartChallenge = (challenge: Challenge) => {
    setActiveChallenge(challenge);
  };

  const handleBackToMenu = () => {
    setActiveChallenge(null);
  };
  
  const handleQuizComplete = (xpGained: number, codeBlocksGained: number) => {
    if (activeChallenge) {
      let finalXp = xpGained;
      let finalCodeBlocks = codeBlocksGained;

      // Add a bonus for completing a boss challenge
      if (activeChallenge.type === 'boss') {
        finalXp = Math.round(finalXp * 1.5); // 50% XP bonus
        finalCodeBlocks = Math.round(finalCodeBlocks * 1.5); // 50% CodeBlocks bonus
      }

      setCompletedChallenges(prev => [...prev, activeChallenge.gateId]);
      setPlayer(prev => ({
        ...prev,
        xp: prev.xp + finalXp,
        codeBlocks: prev.codeBlocks + finalCodeBlocks,
      }));
      setActiveChallenge(null);
    }
  };

  const zonesForDisplay: Zone[] = ZONES;

  return (
    <div className="bg-gray-900 text-cyan-200 min-h-screen font-sans">
       <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre-v2.png')] opacity-5 z-0"></div>
      <div className="relative z-10">
        <Hud player={player} levels={LEVELS} />
        <main className="container mx-auto p-4 md:p-8">
          {!activeChallenge ? (
            <MainMenu 
              zones={zonesForDisplay} 
              onStartChallenge={handleStartChallenge}
              completedChallenges={completedChallenges}
              playerLevel={player.level}
            />
          ) : (
            <QuizView 
              challenge={activeChallenge}
              onComplete={handleQuizComplete}
              onBack={handleBackToMenu}
            />
          )}
        </main>
        <footer className="text-center p-4 text-gray-600 text-xs">
          <p>HÀNH TRÌNH KIẾN TẠO MẠNG v1.0</p>
        </footer>
      </div>
    </div>
  );
};

export default App;
