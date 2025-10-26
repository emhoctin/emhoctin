
import React, { useState, useCallback } from 'react';
import MainMenu from './components/MainMenu';
import QuizView from './components/QuizView';
import { GameState, Challenge } from './types';
import { INITIAL_GAME_STATE, ZONES_DATA } from './constants';
import Hud from './components/Hud';

const App: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>(INITIAL_GAME_STATE);
  const [activeChallenge, setActiveChallenge] = useState<Challenge | null>(null);

  const startChallenge = useCallback((challenge: Challenge) => {
    setActiveChallenge(challenge);
    setGameState(prev => ({ ...prev, currentScreen: 'quiz' }));
  }, []);

  const endChallenge = useCallback((answeredCorrectly: number) => {
    if (activeChallenge) {
      const newXp = gameState.player.xp + answeredCorrectly * 10;
      const newCodeBlocks = gameState.player.codeBlocks + answeredCorrectly * 5;
      
      const completedChallengeId = `${activeChallenge.zoneId}-${activeChallenge.gateId}`;

      setGameState(prev => {
        let player = { ...prev.player, xp: newXp, codeBlocks: newCodeBlocks };
        const { xpToNextLevel } = ZONES_DATA.levels[player.level - 1];
        if (player.xp >= xpToNextLevel) {
          player.level += 1;
          player.xp -= xpToNextLevel;
        }

        return {
          ...prev,
          player,
          completedChallenges: [...new Set([...prev.completedChallenges, completedChallengeId])],
          currentScreen: 'main_menu',
        };
      });
    }
    setActiveChallenge(null);
  }, [activeChallenge, gameState.player.xp, gameState.player.codeBlocks]);

  const useItem = (itemId: string) => {
    console.log(`Using item: ${itemId}`);
    // This is where item logic would be implemented.
    // For this example, we'll just log it.
  };

  const renderScreen = () => {
    switch (gameState.currentScreen) {
      case 'quiz':
        if (activeChallenge) {
          return <QuizView challenge={activeChallenge} onComplete={endChallenge} onUseItem={useItem} />;
        }
        // Fallback to main menu if no active challenge
        return <MainMenu onStartChallenge={startChallenge} gameState={gameState} />;
      case 'main_menu':
      default:
        return <MainMenu onStartChallenge={startChallenge} gameState={gameState} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-green-400 p-4 flex flex-col items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 bg-black opacity-50 z-0"></div>
      <div className="absolute inset-0 bg-repeat bg-[length:40px_40px]" style={{backgroundImage: 'linear-gradient(rgba(0,255,65,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,65,0.1) 1px, transparent 1px)'}}></div>
      <div className="w-full max-w-7xl mx-auto p-2 sm:p-4 z-10">
        <header className="mb-4">
          <h1 className="text-3xl md:text-5xl font-bold text-center uppercase tracking-widest" style={{ textShadow: '0 0 10px #00ff41, 0 0 20px #00ff41, 0 0 30px #00ff41' }}>
            Hành Trình Kiến Tạo Mạng
          </h1>
          <Hud player={gameState.player} levelData={ZONES_DATA.levels[gameState.player.level - 1]} />
        </header>
        <main className="cyber-border cyber-glow bg-black bg-opacity-70 p-4 md:p-6 rounded-lg backdrop-blur-sm">
          {renderScreen()}
        </main>
      </div>
    </div>
  );
};

export default App;
