
import React, from 'react';
import { GameState, Challenge, Zone, Gate } from '../types';
import { ZONES_DATA } from '../constants';
import { LockClosedIcon, CheckCircleIcon } from './Icons';


interface MainMenuProps {
  gameState: GameState;
  onStartChallenge: (challenge: Challenge) => void;
}

const MainMenu: React.FC<MainMenuProps> = ({ gameState, onStartChallenge }) => {

  const renderGate = (gate: Gate, zone: Zone) => {
    const isCompleted = gameState.completedChallenges.includes(`${zone.id}-${gate.id}`);
    const gateColorClass = isCompleted ? 'border-green-500 text-green-500' : 'border-blue-500 text-blue-400';
    const gateBgClass = isCompleted ? 'bg-green-500/10' : 'bg-blue-500/10';
    const glowClass = isCompleted ? 'hover:shadow-green-500/50' : 'hover:shadow-blue-500/50';

    return (
      <button
        key={gate.id}
        onClick={() => onStartChallenge({ 
            zoneId: zone.id,
            gateId: gate.id,
            name: `${zone.name} - ${gate.name}`,
            questions: gate.questions,
            type: gate.type,
        })}
        className={`w-full p-3 my-2 text-left rounded-md border ${gateColorClass} ${gateBgClass} transition-all duration-300 transform hover:scale-105 ${glowClass} flex items-center justify-between shadow-lg`}
      >
        <div>
          <h4 className="font-bold">{gate.name}</h4>
          <p className="text-xs opacity-70">{gate.questions.length} câu hỏi - Cấp độ: {gate.type}</p>
        </div>
        {isCompleted && <CheckCircleIcon className="w-6 h-6 text-green-400" />}
      </button>
    );
  };
  
  const isZoneUnlocked = (zone: Zone, index: number) => {
    if (index === 0) return true; // First zone is always unlocked
    const previousZone = ZONES_DATA.zones[index - 1];
    const bossGate = previousZone.gates.find(g => g.type === 'boss');
    if (!bossGate) return true; // If previous zone has no boss, unlock next
    return gameState.completedChallenges.includes(`${previousZone.id}-${bossGate.id}`);
  }

  return (
    <div className="w-full">
      <h2 className="text-2xl font-bold text-center mb-6 uppercase text-yellow-300" style={{ textShadow: '0 0 5px #fef08a' }}>Bản Đồ Mạng Lưới</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {ZONES_DATA.zones.map((zone, index) => {
           const unlocked = isZoneUnlocked(zone, index);
           if (unlocked) {
             return (
              <div key={zone.id} className="cyber-border-blue cyber-glow-blue bg-black/50 p-4 rounded-lg">
                <h3 className="text-xl font-bold mb-2 text-blue-300">{zone.name}</h3>
                <p className="text-sm opacity-80 mb-4">{zone.description}</p>
                <div>{zone.gates.map(gate => renderGate(gate, zone))}</div>
              </div>
             )
           } else {
             return (
              <div key={zone.id} className="cyber-border border-gray-600 bg-black/50 p-4 rounded-lg opacity-50 flex items-center justify-center">
                 <LockClosedIcon className="w-12 h-12 text-gray-500 mr-4" />
                <div>
                  <h3 className="text-xl font-bold mb-2 text-gray-400">{zone.name}</h3>
                  <p className="text-sm">Hoàn thành Trùm Cuối của Vùng Dữ Liệu trước để mở khóa.</p>
                </div>
              </div>
             )
           }
        })}
      </div>
    </div>
  );
};

export default MainMenu;
