import React from 'react';
import { Zone, Gate, Challenge } from '../types';
import { CheckCircleIcon, LockClosedIcon, SparklesIcon } from './Icons';

interface MainMenuProps {
  zones: Zone[];
  onStartChallenge: (challenge: Challenge) => void;
  completedChallenges: string[];
  playerLevel: number;
}

const getGateIcon = (gateType: 'easy' | 'medium' | 'hard' | 'boss', isCompleted: boolean) => {
    const baseClasses = "w-8 h-8 mr-4 flex-shrink-0";
    if (isCompleted) {
        return <CheckCircleIcon className={`${baseClasses} text-green-400`} />;
    }
  
    const style = {
        'easy': 'bg-cyan-500 border-cyan-300',
        'medium': 'bg-yellow-500 border-yellow-300',
        'hard': 'bg-red-500 border-red-300',
        'boss': 'bg-purple-600 border-yellow-400 animate-pulse'
    }[gateType];

    return <div className={`${baseClasses} ${style} rounded-full border-2 shadow-lg`}></div>;
};

const MainMenu: React.FC<MainMenuProps> = ({ 
  zones, 
  onStartChallenge, 
  completedChallenges, 
  playerLevel, 
}) => {
  return (
    <div className="space-y-10">
      <div className="text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-cyan-300 uppercase" style={{ textShadow: '0 0 10px #0891b2' }}>
          Trung Tâm Chỉ Huy
        </h1>
        <p className="text-gray-400 mt-2">Chọn một Vùng Dữ Liệu để bắt đầu sửa chữa mạng lưới.</p>
      </div>
      
      {zones.map((zone, zoneIndex) => {
        const requiredLevel = zoneIndex + 1;
        const isZoneLocked = playerLevel < requiredLevel;

        return (
          <div key={zone.id} className={`p-4 md:p-6 rounded-lg shadow-lg transition-all duration-300 border-2 ${isZoneLocked ? 'bg-gray-800/50 border-gray-700' : 'bg-gray-800/80 border-cyan-700/50'}`}>
            <h2 className={`text-2xl font-semibold mb-2 flex items-center ${isZoneLocked ? 'text-gray-500' : 'text-cyan-400'}`}>
                <SparklesIcon className="w-6 h-6 mr-3 text-cyan-500"/>
                {zone.name}
            </h2>
            <p className="text-gray-400 mb-4 text-sm">{zone.description}</p>
            {isZoneLocked && (
                 <div className="flex items-center text-red-400 p-3 bg-red-900/50 rounded-md">
                    <LockClosedIcon className="w-6 h-6 mr-3 flex-shrink-0" />
                    <span className="font-semibold">Khu vực bị khóa: Yêu cầu Cấp {requiredLevel} để truy cập.</span>
                </div>
            )}
            {!isZoneLocked && (
              <ul className="space-y-3">
                {zone.gates.map(gate => {
                  const isCompleted = completedChallenges.includes(gate.id);
                  const isBoss = gate.type === 'boss';
                  const challenge: Challenge = {
                    zoneId: zone.id,
                    gateId: gate.id,
                    name: gate.name,
                    questions: gate.questions,
                    type: gate.type,
                  };
                  return (
                    <li key={gate.id}>
                      <button
                        onClick={() => onStartChallenge(challenge)}
                        disabled={isCompleted}
                        className={`w-full flex items-center p-4 bg-gray-900/70 rounded-md hover:bg-gray-700/90 transition-colors disabled:bg-gray-900/50 disabled:cursor-not-allowed group ${isBoss && !isCompleted ? 'border-2 border-purple-500/70 shadow-lg shadow-purple-600/20' : ''}`}
                      >
                        {getGateIcon(gate.type, isCompleted)}
                        <span className={`flex-grow text-left font-medium ${isCompleted ? 'text-gray-500 line-through' : 'text-white group-hover:text-cyan-300'}`}>{gate.name}</span>
                        <span className={`px-3 py-1 text-xs font-bold rounded-full ml-4 opacity-80 ${isCompleted ? 'bg-gray-700 text-gray-400' : isBoss ? 'bg-purple-800 text-purple-200' : `bg-cyan-800 text-cyan-200`}`}>
                          {gate.type.toUpperCase()}
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default MainMenu;
