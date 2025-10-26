import React, { useRef } from 'react';
import { Zone, Gate, Challenge, UserRole } from '../types';
import { CheckCircleIcon, LockClosedIcon, UploadIcon, SparklesIcon } from './Icons';

interface MainMenuProps {
  zones: Zone[];
  onStartChallenge: (challenge: Challenge) => void;
  completedChallenges: string[];
  playerLevel: number;
  onFileUpload: (file: File) => void;
  isGenerating: boolean;
  generationError: string | null;
  userRole: UserRole;
}

const getGateIcon = (gate: Gate, isCompleted: boolean, isCustom: boolean) => {
    const baseClasses = "w-8 h-8 mr-4 flex-shrink-0";
    if (isCompleted) {
        return <CheckCircleIcon className={`${baseClasses} text-green-500`} />;
    }
    if (isCustom) {
        return <SparklesIcon className={`${baseClasses} text-yellow-400`} />;
    }
    // Using simple divs for icons to avoid complexity
    switch (gate.type) {
        case 'easy': return <div className={`${baseClasses} bg-blue-500 rounded-full border-2 border-blue-300`}></div>;
        case 'medium': return <div className={`${baseClasses} bg-yellow-500 rounded-full border-2 border-yellow-300`}></div>;
        case 'hard': return <div className={`${baseClasses} bg-red-500 rounded-full border-2 border-red-300`}></div>;
        case 'boss': return <div className={`${baseClasses} bg-purple-600 rounded-full border-2 border-yellow-400 animate-pulse`}></div>;
        default: return <div className={`${baseClasses} bg-gray-500 rounded-full`}></div>;
    }
};

const MainMenu: React.FC<MainMenuProps> = ({ zones, onStartChallenge, completedChallenges, playerLevel, onFileUpload, isGenerating, generationError, userRole }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onFileUpload(file);
    }
  };

  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold text-center text-cyan-400 drop-shadow-lg">TRUNG TÂM CHỈ HUY</h1>
      
      {/* Custom Zone Creator - Teacher only */}
      {userRole === 'teacher' && (
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg border-2 border-dashed border-purple-500">
          <h2 className="text-2xl font-semibold mb-2 text-purple-400 flex items-center">
            <SparklesIcon className="w-7 h-7 mr-3" />
            Tạo Vùng Dữ Liệu Tùy Chỉnh (Giáo viên)
          </h2>
          <p className="text-gray-400 mb-4">Tải lên tài liệu ôn tập của bạn (PDF, DOCX) và để AI tạo ra một thử thách dành riêng cho học sinh.</p>
          
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            onChange={handleFileChange}
            accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            disabled={isGenerating}
          />
          
          <button
            onClick={handleUploadClick}
            disabled={isGenerating}
            className="w-full flex items-center justify-center p-4 bg-purple-600 rounded-md hover:bg-purple-700 transition-colors disabled:bg-gray-600 disabled:cursor-wait"
          >
            <UploadIcon className="w-6 h-6 mr-3" />
            {isGenerating ? 'AI Đang Phân Tích Tài Liệu...' : 'Chọn Tệp Để Tải Lên'}
          </button>

          {generationError && (
            <p className="mt-4 text-center text-red-400 bg-red-900/50 p-3 rounded-md">{generationError}</p>
          )}
        </div>
      )}


      {zones.map((zone, zoneIndex) => {
        const isCustomZone = zone.id === 'zone-custom';
        // Custom zones are always unlocked. Other zones depend on player level.
        const isZoneLocked = !isCustomZone && (zoneIndex - (zones.some(z => z.id === 'zone-custom') ? 1 : 0) + 1 > playerLevel);

        return (
          <div key={zone.id} className={`p-6 rounded-lg shadow-lg transition-all duration-300 ${isZoneLocked ? 'bg-gray-800/50' : isCustomZone ? 'bg-gray-800 border-2 border-yellow-500' : 'bg-gray-800'}`}>
            <h2 className={`text-2xl font-semibold mb-2 ${isCustomZone ? 'text-yellow-400' : 'text-cyan-400'}`}>{zone.name}</h2>
            <p className="text-gray-400 mb-4">{zone.description}</p>
            {isZoneLocked && (
                 <div className="flex items-center text-red-400 p-3 bg-red-900/50 rounded-md">
                    <LockClosedIcon className="w-6 h-6 mr-3 flex-shrink-0" />
                    <span className="font-semibold">Khu vực bị khóa: Yêu cầu Cấp {zoneIndex - (zones.some(z => z.id === 'zone-custom') ? 1 : 0) + 1} để truy cập.</span>
                </div>
            )}
            {!isZoneLocked && (
              <ul className="space-y-4">
                {zone.gates.map(gate => {
                  const isCompleted = completedChallenges.includes(gate.id);
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
                        className="w-full flex items-center p-4 bg-gray-700 rounded-md hover:bg-gray-600 transition-colors disabled:bg-gray-900/50 disabled:cursor-not-allowed disabled:text-gray-500"
                      >
                        {getGateIcon(gate, isCompleted, isCustomZone)}
                        <span className="flex-grow text-left font-medium">{gate.name}</span>
                        <span className={`px-3 py-1 text-xs font-bold rounded-full ml-4 ${isCompleted ? 'bg-gray-600' : isCustomZone ? 'bg-yellow-600' : gate.type === 'easy' ? 'bg-blue-600' : gate.type === 'medium' ? 'bg-yellow-600' : gate.type === 'hard' ? 'bg-red-600' : 'bg-purple-700'}`}>
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
