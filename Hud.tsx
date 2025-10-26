import React from 'react';
import { Player, LevelData } from './types';

interface HudProps {
  player: Player;
  levels: LevelData[];
}

const Hud: React.FC<HudProps> = ({ player, levels }) => {
  const currentLevelData = levels.find(l => l.level === player.level);
  
  if (!currentLevelData) {
    // Handle max level case
    const maxLevel = levels[levels.length - 1];
    return (
       <header className="bg-gray-900/80 p-3 shadow-lg sticky top-0 z-20 border-b-2 border-cyan-800/50 backdrop-blur-sm">
          <div className="container mx-auto flex justify-between items-center">
              <div className="font-bold text-lg text-cyan-400" style={{ textShadow: '0 0 5px #0891b2' }}>
                  Cấp {player.level}: {maxLevel.title} (Tối đa)
              </div>
               <div className="text-right">
                  <span className="font-bold text-lg text-yellow-400" style={{ textShadow: '0 0 5px #f59e0b' }}>{player.codeBlocks}</span>
                  <span className="text-sm text-gray-400 block -mt-1">CodeBlocks</span>
              </div>
          </div>
      </header>
    );
  }

  const xpAtStartOfLevel = player.level > 1 ? (levels.find(l => l.level === player.level - 1)?.xpToNextLevel || 0) : 0;
  const xpNeededForLevel = currentLevelData.xpToNextLevel - xpAtStartOfLevel;
  const xpProgressInLevel = player.xp - xpAtStartOfLevel;
  const xpPercentage = xpNeededForLevel > 0 ? (xpProgressInLevel / xpNeededForLevel) * 100 : 0;
  
  return (
    <header className="bg-gray-900/80 p-3 shadow-lg sticky top-0 z-20 border-b-2 border-cyan-800/50 backdrop-blur-sm">
      <div className="container mx-auto flex justify-between items-center gap-4">
        <div className="flex-1">
          <div className="flex justify-between items-center mb-1">
            <span className="font-bold text-lg text-cyan-400" style={{ textShadow: '0 0 5px #0891b2' }}>
              Cấp {player.level}: {currentLevelData.title}
            </span>
            <span className="text-sm text-gray-400">{player.xp} / {currentLevelData.xpToNextLevel} XP</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-3 border border-gray-600 overflow-hidden">
            <div
              className="bg-green-500 h-full rounded-full transition-all duration-500 ease-out"
              style={{ width: `${Math.min(xpPercentage, 100)}%`, boxShadow: '0 0 8px #22c55e' }}
            ></div>
          </div>
        </div>
        <div className="ml-4 text-right flex-shrink-0">
          <span className="font-bold text-lg text-yellow-400" style={{ textShadow: '0 0 5px #f59e0b' }}>{player.codeBlocks}</span>
          <span className="text-sm text-gray-400 block -mt-1">CodeBlocks</span>
        </div>
      </div>
    </header>
  );
};

export default Hud;