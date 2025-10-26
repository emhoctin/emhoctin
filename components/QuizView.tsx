
import React, { useState, useEffect, useCallback } from 'react';
import { Challenge, Question } from '../types';
import { CheckCircleIcon, XCircleIcon, ClockIcon } from './Icons';
import FeedbackModal from './FeedbackModal';

interface QuizViewProps {
  challenge: Challenge;
  onComplete: (answeredCorrectly: number) => void;
  onUseItem: (itemId: string) => void;
}

const TIMER_DURATION = {
  easy: 60,
  medium: 45,
  hard: 30,
  boss: 20
};

const QuizView: React.FC<QuizViewProps> = ({ challenge, onComplete, onUseItem }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(TIMER_DURATION[challenge.type]);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [answeredCorrectly, setAnsweredCorrectly] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);

  const currentQuestion = challenge.questions[currentQuestionIndex];

  const handleNextQuestion = useCallback(() => {
    setIsAnswered(false);
    setSelectedAnswer(null);
    setShowFeedback(false);

    if (currentQuestionIndex < challenge.questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setTimeLeft(TIMER_DURATION[challenge.type]);
    } else {
      onComplete(answeredCorrectly);
    }
  }, [currentQuestionIndex, challenge.questions.length, onComplete, answeredCorrectly, challenge.type]);

  useEffect(() => {
    if (isAnswered) return;

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          // Auto-move to next question on time out
          handleNextQuestion();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isAnswered, handleNextQuestion]);

  const handleAnswerClick = (index: number) => {
    if (isAnswered) return;

    setSelectedAnswer(index);
    setIsAnswered(true);
    if (index === currentQuestion.correctAnswerIndex) {
      setAnsweredCorrectly(prev => prev + 1);
    }
    setShowFeedback(true);
  };

  const getButtonClass = (index: number) => {
    if (!isAnswered) {
      return 'border-blue-500 bg-blue-900/50 hover:bg-blue-800/50 text-blue-300';
    }
    if (index === currentQuestion.correctAnswerIndex) {
      return 'border-green-500 bg-green-900/50 text-green-300 cyber-glow';
    }
    if (index === selectedAnswer && index !== currentQuestion.correctAnswerIndex) {
      return 'border-red-500 bg-red-900/50 text-red-300 cyber-glow-red';
    }
    return 'border-gray-600 bg-gray-800/50 text-gray-500 opacity-60';
  };
  
  const timeBarWidth = (timeLeft / TIMER_DURATION[challenge.type]) * 100;

  return (
    <div className="flex flex-col items-center w-full max-w-4xl mx-auto">
      <h2 className="text-xl md:text-2xl font-bold mb-2 text-center">{challenge.name}</h2>
      <p className="mb-4 text-yellow-300">Câu {currentQuestionIndex + 1} / {challenge.questions.length}</p>

      <div className="w-full bg-gray-800 rounded-full h-4 mb-4 cyber-border border-gray-600 overflow-hidden">
        <div 
            className="bg-yellow-400 h-full rounded-full transition-all duration-1000 linear" 
            style={{ width: `${timeBarWidth}%`, textShadow: '0 0 5px #facc15' }}
        ></div>
      </div>
      <div className="flex items-center justify-center text-2xl font-bold mb-6 text-yellow-300">
        <ClockIcon className="w-8 h-8 mr-2"/>
        <span>{timeLeft}s</span>
      </div>

      <div className="w-full cyber-border bg-black/30 p-6 rounded-lg mb-6">
        <p className="text-lg md:text-xl text-center">{currentQuestion.text}</p>
      </div>

      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
        {currentQuestion.options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleAnswerClick(index)}
            disabled={isAnswered}
            className={`p-4 rounded-lg border-2 text-left transition-all duration-300 transform hover:scale-105 ${getButtonClass(index)}`}
          >
            <span className="font-mono mr-2">{String.fromCharCode(65 + index)}.</span> {option}
          </button>
        ))}
      </div>
      
      {showFeedback && (
        <FeedbackModal 
          isCorrect={selectedAnswer === currentQuestion.correctAnswerIndex}
          explanation={currentQuestion.explanation}
          onNext={handleNextQuestion}
        />
      )}
    </div>
  );
};

export default QuizView;
