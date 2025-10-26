
import React from 'react';
import { Player, LevelData } from '../types';

interface HudProps {
  player: Player;
  levelData: LevelData;
}

const Hud: React.FC<HudProps> = ({ player, levelData }) => {
  const xpPercentage = levelData.xpToNextLevel > 0 ? (player.xp / levelData.xpToNextLevel) * 100 : 100;

  return (
    <div className="w-full max-w-3xl mx-auto my-4 p-2 cyber-border bg-black/50 rounded-md flex flex-col sm:flex-row items-center justify-between gap-4">
      <div className="flex-1 text-center sm:text-left">
        <p className="text-sm uppercase tracking-widest text-blue-300">Cấp Độ {player.level}: {levelData.title}</p>
        <div className="w-full bg-gray-700/50 rounded-full h-3.5 mt-1 cyber-border border-blue-400/50">
          <div className="bg-blue-400 h-full rounded-full" style={{ width: `${xpPercentage}%`, boxShadow: '0 0 8px #60a5fa' }}></div>
        </div>
        <p className="text-xs text-blue-200 mt-1">{player.xp} / {levelData.xpToNextLevel} XP</p>
      </div>
      <div className="w-px h-12 bg-green-500/50 hidden sm:block"></div>
      <div className="flex-shrink-0 px-4 text-center">
        <p className="text-lg font-bold text-yellow-300">{player.codeBlocks} CB</p>
        <p className="text-xs uppercase tracking-wider text-yellow-400/80">Code Blocks</p>
      </div>
    </div>
  );
};

export default Hud;
