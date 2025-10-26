
import React from 'react';
import { CheckCircleIcon, XCircleIcon } from './Icons';

interface FeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
  success: boolean;
  score: number;
  totalScore: number;
  xpGained: number;
  codeBlocksGained: number;
}

const FeedbackModal: React.FC<FeedbackModalProps> = ({ isOpen, onClose, success, score, totalScore, xpGained, codeBlocksGained }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 transition-opacity">
      <div className="bg-gray-800 rounded-lg shadow-xl p-8 max-w-md w-full transform transition-all scale-100">
        <div className="text-center">
          {success ? (
            <CheckCircleIcon className="w-20 h-20 text-green-500 mx-auto animate-pulse" />
          ) : (
            <XCircleIcon className="w-20 h-20 text-red-500 mx-auto" />
          )}
          <h2 className="mt-4 text-3xl font-bold text-white">
            {success ? 'Nhiệm Vụ Thành Công!' : 'Nhiệm Vụ Thất Bại'}
          </h2>
          <p className="mt-2 text-lg text-gray-400">
            Bạn đạt được {score} / {totalScore} điểm.
          </p>
          <div className="mt-6 text-left space-y-3 bg-gray-700 p-4 rounded-md">
            <p className="text-lg text-cyan-400">
              <strong>Phần thưởng:</strong>
            </p>
            <p className="text-md text-white">
              + {xpGained} XP
            </p>
            <p className="text-md text-yellow-400">
              + {codeBlocksGained} CodeBlocks
            </p>
          </div>
        </div>
        <div className="mt-8">
          <button
            onClick={onClose}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition-colors"
          >
            Trở về Trung Tâm Chỉ Huy
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeedbackModal;
