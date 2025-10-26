import React from 'react';
import { Player, LevelData, UserRole } from '../types';

interface HudProps {
  player: Player;
  levels: LevelData[];
  userRole: UserRole;
  onToggleRole: () => void;
}

const Hud: React.FC<HudProps> = ({ player, levels, userRole, onToggleRole }) => {
  const currentLevelData = levels.find(l => l.level === player.level);
  
  if (!currentLevelData) {
      const maxLevel = levels[levels.length - 1];
      return (
         <header className="bg-gray-800 p-4 shadow-md sticky top-0 z-10">
            <div className="container mx-auto flex justify-between items-center">
                <div>
                    <span className="font-bold text-lg text-cyan-400">Cấp {player.level}: {maxLevel.title} (Tối đa)</span>
                </div>
                 <div className="flex items-center gap-4">
                     <div className="text-right">
                        <span className="font-bold text-lg text-yellow-400">{player.codeBlocks}</span>
                        <span className="text-sm text-gray-400 block">CodeBlocks</span>
                    </div>
                     <button onClick={onToggleRole} className="text-xs bg-purple-600 hover:bg-purple-700 text-white font-bold py-1 px-2 rounded">
                         {userRole === 'student' ? 'Chế độ GV' : 'Chế độ HS'}
                    </button>
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
    <header className="bg-gray-800 p-4 shadow-md sticky top-0 z-10">
      <div className="container mx-auto flex justify-between items-center gap-4">
        <div className="flex-1">
          <div className="flex justify-between items-center mb-1">
            <span className="font-bold text-lg text-cyan-400">Cấp {player.level}: {currentLevelData.title}</span>
            <span className="text-sm text-gray-400">{player.xp} / {currentLevelData.xpToNextLevel} XP</span>
          </div>
          <div className="w-full bg-gray-600 rounded-full h-4 overflow-hidden">
            <div
              className="bg-green-500 h-4 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${Math.min(xpPercentage, 100)}%` }}
            ></div>
          </div>
        </div>
        <div className="ml-4 flex items-center gap-4 flex-shrink-0">
            <div className="text-right">
                <span className="font-bold text-lg text-yellow-400">{player.codeBlocks}</span>
                <span className="text-sm text-gray-400 block">CodeBlocks</span>
            </div>
             <button onClick={onToggleRole} title={`Chuyển sang Chế độ ${userRole === 'student' ? 'Giáo viên' : 'Học sinh'}`} className="text-sm bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-3 rounded">
                {userRole === 'student' ? 'GV' : 'HS'}
            </button>
        </div>
      </div>
    </header>
  );
};

export default Hud;
