
import React from 'react';
import { CheckCircleIcon, XCircleIcon } from './Icons';

interface FeedbackModalProps {
  isCorrect: boolean;
  explanation: string;
  onNext: () => void;
}

const FeedbackModal: React.FC<FeedbackModalProps> = ({ isCorrect, explanation, onNext }) => {
  const title = isCorrect ? 'GIẢI MÃ THÀNH CÔNG' : 'LỖI HỆ THỐNG';
  const Icon = isCorrect ? CheckCircleIcon : XCircleIcon;
  const colorClass = isCorrect ? 'text-green-400' : 'text-red-400';
  const borderColorClass = isCorrect ? 'border-green-500' : 'border-red-500';
  const glowClass = isCorrect ? 'cyber-glow' : 'cyber-glow-red';

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 backdrop-blur-sm p-4">
      <div className={`w-full max-w-lg p-6 bg-gray-900/90 border-2 ${borderColorClass} ${glowClass} rounded-lg flex flex-col items-center`}>
        <Icon className={`w-16 h-16 mb-4 ${colorClass}`} />
        <h3 className={`text-2xl font-bold mb-4 ${colorClass}`}>{title}</h3>
        <div className="text-center text-gray-300 mb-6">
          <p className="font-bold">Phân tích:</p>
          <p>{explanation}</p>
        </div>
        <button
          onClick={onNext}
          className={`px-8 py-3 rounded-md font-bold uppercase tracking-wider transition-all duration-300 ${
            isCorrect 
              ? 'bg-green-600/50 border border-green-400 text-green-300 hover:bg-green-500/50 hover:shadow-green-500/50' 
              : 'bg-blue-600/50 border border-blue-400 text-blue-300 hover:bg-blue-500/50 hover:shadow-blue-500/50'
          }`}
        >
          Tiếp Tục
        </button>
      </div>
    </div>
  );
};

export default FeedbackModal;
