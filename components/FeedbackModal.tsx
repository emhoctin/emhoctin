import React from 'react';
import { CheckCircleIcon, XCircleIcon } from './Icons';

interface FeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
  isCorrect: boolean;
  explanation: string;
  isLastQuestion: boolean;
}

const FeedbackModal: React.FC<FeedbackModalProps> = ({ isOpen, onClose, isCorrect, explanation, isLastQuestion }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 transition-opacity">
      <div className="bg-gray-800 rounded-lg shadow-xl p-6 md:p-8 max-w-md w-full m-4 transform transition-all scale-100 border-2"
           style={{ borderColor: isCorrect ? '#22c55e' : '#ef4444', boxShadow: `0 0 20px ${isCorrect ? '#22c55e' : '#ef4444'}40`}}
      >
        <div className="text-center">
          {isCorrect ? (
            <CheckCircleIcon className="w-16 h-16 text-green-500 mx-auto animate-pulse" />
          ) : (
            <XCircleIcon className="w-16 h-16 text-red-500 mx-auto" />
          )}
          <h2 className={`mt-4 text-3xl font-bold ${isCorrect ? 'text-green-400' : 'text-red-400'}`}>
            {isCorrect ? 'Kết Nối Chính Xác!' : 'Tín Hiệu Lỗi!'}
          </h2>
          
          <div className="mt-4 text-left space-y-3 bg-gray-900/70 p-4 rounded-md">
            <p className="text-lg text-cyan-400 font-semibold">
              Giải Mã:
            </p>
            <p className="text-md text-gray-300">
             {explanation}
            </p>
          </div>
        </div>
        <div className="mt-8">
          <button
            onClick={onClose}
            className="w-full bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-3 px-4 rounded-lg transition-colors"
          >
            {isLastQuestion ? 'Hoàn Thành Thử Thách' : 'Tiếp Tục'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeedbackModal;