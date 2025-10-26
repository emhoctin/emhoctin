import React, { useState, useEffect } from 'react';
import { Challenge, Question, MultipleChoiceQuestion, TrueFalseQuestion } from '../types';
import FeedbackModal from './FeedbackModal';

interface QuizViewProps {
  challenge: Challenge;
  onComplete: (xpGained: number, codeBlocksGained: number) => void;
  onBack: () => void;
}

const QuizView: React.FC<QuizViewProps> = ({ challenge, onComplete, onBack }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedMcqAnswer, setSelectedMcqAnswer] = useState<number | null>(null);
  const [tfAnswers, setTfAnswers] = useState<{ [key: number]: boolean }>({});
  
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);
  const [isCurrentAnswerCorrect, setIsCurrentAnswerCorrect] = useState(false);
  
  const [totalXp, setTotalXp] = useState(0);
  const [totalCodeBlocks, setTotalCodeBlocks] = useState(0);
  
  const currentQuestion = challenge.questions[currentQuestionIndex];
  
  useEffect(() => {
    // Reset answers when question changes
    setSelectedMcqAnswer(null);
    setTfAnswers({});
  }, [currentQuestion]);

  const handleMcqSelect = (optionIndex: number) => {
    setSelectedMcqAnswer(optionIndex);
  };

  const handleTfSelect = (statementIndex: number, value: boolean) => {
    setTfAnswers(prev => ({
      ...prev,
      [statementIndex]: value
    }));
  };

  const handleSubmit = () => {
    if (!currentQuestion) return;
    
    let isCorrect = false;
    if (currentQuestion.type === 'multiple-choice') {
      if (selectedMcqAnswer === null) return;
      isCorrect = selectedMcqAnswer === currentQuestion.correctOptionIndex;
    } else if (currentQuestion.type === 'true-false') {
      isCorrect = currentQuestion.correctAnswers.every((val, index) => val === tfAnswers[index]);
    }

    if (isCorrect) {
      setTotalXp(prev => prev + currentQuestion.xp);
      const codeBlocksGained = Math.round(currentQuestion.xp / 2);
      setTotalCodeBlocks(prev => prev + codeBlocksGained);
    }
    
    setIsCurrentAnswerCorrect(isCorrect);
    setIsFeedbackModalOpen(true);
  };
  
  const handleNextQuestion = () => {
    setIsFeedbackModalOpen(false);
    const isLastQuestion = currentQuestionIndex === challenge.questions.length - 1;

    if (isLastQuestion) {
      onComplete(totalXp, totalCodeBlocks);
    } else {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const renderMultipleChoiceQuestion = (question: MultipleChoiceQuestion) => (
    <div>
      <h3 className="text-xl md:text-2xl text-cyan-300 font-semibold">{question.text}</h3>
      <ul className="mt-6 space-y-3">
        {question.options.map((option, index) => (
          <li key={index}>
            <button
              onClick={() => handleMcqSelect(index)}
              className={`w-full text-left p-4 rounded-md transition-all border-2 ${
                selectedMcqAnswer === index
                  ? 'bg-cyan-600 border-cyan-400 scale-105 shadow-lg'
                  : 'bg-gray-800 border-gray-700 hover:bg-gray-700/70'
              }`}
            >
              <span className="font-mono text-cyan-400 mr-3">{String.fromCharCode(65 + index)}.</span>
              <span className="font-medium text-white">{option}</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );

  const renderTrueFalseQuestion = (question: TrueFalseQuestion) => (
    <div>
      <h3 className="text-xl md:text-2xl text-cyan-300 font-semibold">{question.text}</h3>
      <ul className="mt-6 space-y-4">
        {question.statements.map((statement, index) => (
          <li key={index} className="p-4 bg-gray-800 rounded-md border border-gray-700 flex justify-between items-center">
            <p className="flex-grow text-gray-300">{statement}</p>
            <div className="flex space-x-2 ml-4">
              <button onClick={() => handleTfSelect(index, true)} className={`px-4 py-2 rounded font-bold transition-colors ${tfAnswers[index] === true ? 'bg-green-500 text-white' : 'bg-gray-700 text-gray-300 hover:bg-green-700'}`}>Đ</button>
              <button onClick={() => handleTfSelect(index, false)} className={`px-4 py-2 rounded font-bold transition-colors ${tfAnswers[index] === false ? 'bg-red-500 text-white' : 'bg-gray-700 text-gray-300 hover:bg-red-700'}`}>S</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );

  const renderQuestion = () => {
    if (!currentQuestion) return null;
    switch (currentQuestion.type) {
      case 'multiple-choice':
        return renderMultipleChoiceQuestion(currentQuestion);
      case 'true-false':
        return renderTrueFalseQuestion(currentQuestion);
      default:
        return null;
    }
  };
  
  const isSubmitDisabled = () => {
    if (!currentQuestion) return true;
    if (currentQuestion.type === 'multiple-choice') {
      return selectedMcqAnswer === null;
    }
    if (currentQuestion.type === 'true-false') {
      return Object.keys(tfAnswers).length !== currentQuestion.statements.length;
    }
    return true;
  };

  if (!currentQuestion) {
    return <div className="text-center text-xl">Loading challenge...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <button onClick={onBack} className="text-cyan-400 hover:text-cyan-200 font-semibold">
          &larr; Quay lại Trung Tâm
        </button>
        <span className="text-gray-400 font-mono">Câu hỏi {currentQuestionIndex + 1} / {challenge.questions.length}</span>
      </div>
      
      <div className="bg-gray-800/80 p-6 md:p-8 rounded-lg shadow-2xl border-2 border-cyan-700/50">
        <h2 className="text-3xl font-bold text-cyan-300 mb-2" style={{ textShadow: '0 0 8px #0891b2' }}>
          {challenge.name}
        </h2>
        <p className="text-gray-400 mb-8">Phân tích và chọn đáp án chính xác để vá lỗi hệ thống.</p>
        
        <div className="min-h-[250px]">
          {renderQuestion()}
        </div>
        
        <div className="mt-8 pt-6 border-t-2 border-cyan-800/50">
          <button
            onClick={handleSubmit}
            disabled={isSubmitDisabled()}
            className="w-full bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-bold py-3 px-4 rounded-lg transition-colors text-lg disabled:bg-gray-600 disabled:cursor-not-allowed"
          >
            Xác Nhận Tín Hiệu
          </button>
        </div>
      </div>
      
      <FeedbackModal
        isOpen={isFeedbackModalOpen}
        onClose={handleNextQuestion}
        isCorrect={isCurrentAnswerCorrect}
        explanation={currentQuestion.explanation}
        isLastQuestion={currentQuestionIndex === challenge.questions.length - 1}
      />
    </div>
  );
};

export default QuizView;
