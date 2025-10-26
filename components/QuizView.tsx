
import React, { useState, useCallback } from 'react';
import { GenerateContentResponse } from '@google/genai';
import { Challenge, Question } from '../types';
import { UploadIcon } from './Icons';

// Mock API for demonstration
const mockEvaluateCode = (code: string, question: Question): Promise<GenerateContentResponse> => {
  console.log("Evaluating code for question:", question.id);
  console.log(code);
  return new Promise(resolve => {
    setTimeout(() => {
      const success = Math.random() > 0.3; // 70% chance of success
      const feedbackText = success
        ? `Phân tích thành công: Mã của bạn hoạt động hiệu quả. ${question.explanation}`
        : `Phân tích thất bại: Mã của bạn có lỗi logic. Gợi ý: ${question.explanation}`;

      // Casting to any to mock the response structure
      resolve({
        text: JSON.stringify({ success, feedback: feedbackText }),
      } as any);
    }, 1500);
  });
};

interface QuizViewProps {
  challenge: Challenge;
  onComplete: (success: boolean, score: number, xpGained: number, codeBlocksGained: number) => void;
  onBack: () => void;
}

const QuizView: React.FC<QuizViewProps> = ({ challenge, onComplete, onBack }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<(number | string | null)[]>(new Array(challenge.questions.length).fill(null));
  const [feedback, setFeedback] = useState<string[]>(new Array(challenge.questions.length).fill(''));
  const [isLoading, setIsLoading] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  
  const currentQuestion = challenge.questions[currentQuestionIndex];
  const totalQuestions = challenge.questions.length;

  const handleOptionSelect = (optionIndex: number) => {
    if (feedback[currentQuestionIndex]) return;

    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = optionIndex;
    setAnswers(newAnswers);

    const newFeedback = [...feedback];
    if (optionIndex === currentQuestion.correctOptionIndex) {
      newFeedback[currentQuestionIndex] = `Chính xác! ${currentQuestion.explanation}`;
    } else {
      newFeedback[currentQuestionIndex] = `Không chính xác. Gợi ý: ${currentQuestion.explanation}`;
    }
    setFeedback(newFeedback);
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (isLoading || !event.target.files || event.target.files.length === 0) return;
    
    setIsLoading(true);
    const file = event.target.files[0];
    const reader = new FileReader();
    
    reader.onload = async (e) => {
      const code = e.target?.result as string;
      
      const newAnswers = [...answers];
      newAnswers[currentQuestionIndex] = code;
      setAnswers(newAnswers);
      
      const response = await mockEvaluateCode(code, currentQuestion);
      
      const result = JSON.parse(response.text);
      
      const newFeedback = [...feedback];
      newFeedback[currentQuestionIndex] = result.feedback;
      setFeedback(newFeedback);

      if (!result.success) {
          const incorrectAnswers = [...answers];
          incorrectAnswers[currentQuestionIndex] = "INCORRECT_CODE_ATTEMPT"; // Mark as incorrect
          setAnswers(incorrectAnswers);
      }
      setIsLoading(false);
    };
    
    reader.readAsText(file);
  };

  const goToNextQuestion = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      finishQuiz();
    }
  };

  const finishQuiz = useCallback(() => {
      if (isFinished) return;
      setIsFinished(true);

      let score = 0;
      let xpGained = 0;
      challenge.questions.forEach((q, index) => {
          if (q.type === 'multiple-choice') {
              if (answers[index] === q.correctOptionIndex) {
                  score++;
                  xpGained += q.xp;
              }
          } else if (q.type === 'code-upload') {
              // Check if it's not the incorrect marker
              if (answers[index] && answers[index] !== "INCORRECT_CODE_ATTEMPT") {
                  score++;
                  xpGained += q.xp;
              }
          }
      });
      
      const success = score / totalQuestions >= 0.6; // Need at least 60% to pass
      const codeBlocksGained = success ? (score * 10) : 0;
      onComplete(success, score, xpGained, codeBlocksGained);
  }, [answers, challenge.questions, isFinished, onComplete, totalQuestions]);

  const currentFeedback = feedback[currentQuestionIndex];

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold text-yellow-400">{challenge.name}</h1>
          <button onClick={onBack} className="text-gray-400 hover:text-white">&times; Thoát</button>
        </div>
        <div className="mb-4">
          <div className="w-full bg-gray-600 rounded-full h-2.5">
            <div className="bg-blue-500 h-2.5 rounded-full" style={{ width: `${((currentQuestionIndex + 1) / totalQuestions) * 100}%` }}></div>
          </div>
          <p className="text-center text-sm text-gray-400 mt-2">Câu hỏi {currentQuestionIndex + 1} / {totalQuestions}</p>
        </div>
        
        <div className="bg-gray-900 p-6 rounded-md">
          <h2 className="text-xl font-semibold text-cyan-300 mb-4">{currentQuestion.text}</h2>
          
          {currentQuestion.type === 'multiple-choice' && currentQuestion.options && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {currentQuestion.options.map((option, index) => {
                const isSelected = answers[currentQuestionIndex] === index;
                const isCorrect = currentQuestion.correctOptionIndex === index;
                let buttonClass = 'bg-gray-700 hover:bg-gray-600';
                if (currentFeedback) {
                  if (isCorrect) {
                    buttonClass = 'bg-green-700';
                  } else if (isSelected && !isCorrect) {
                    buttonClass = 'bg-red-700';
                  }
                }
                
                return (
                  <button
                    key={index}
                    onClick={() => handleOptionSelect(index)}
                    disabled={!!currentFeedback}
                    className={`w-full text-left p-4 rounded-md transition-colors disabled:cursor-not-allowed ${buttonClass}`}
                  >
                    {option}
                  </button>
                );
              })}
            </div>
          )}

          {currentQuestion.type === 'code-upload' && (
            <div>
              <pre className="bg-black p-4 rounded-md text-white overflow-x-auto mb-4">
                <code>{currentQuestion.code}</code>
              </pre>
              <label htmlFor="file-upload" className={`
                w-full flex justify-center items-center p-4 rounded-md transition-colors cursor-pointer 
                ${isLoading ? 'bg-gray-600' : 'bg-blue-600 hover:bg-blue-700'}
                ${currentFeedback ? 'hidden' : ''}
              `}>
                <UploadIcon className="w-6 h-6 mr-2" />
                <span>{isLoading ? 'Đang phân tích...' : 'Tải lên tệp .js'}</span>
              </label>
              <input 
                id="file-upload" 
                type="file" 
                className="hidden" 
                accept=".js" 
                onChange={handleFileUpload}
                disabled={isLoading || !!currentFeedback}
              />
            </div>
          )}

          {currentFeedback && (
            <div className={`mt-6 p-4 rounded-md ${answers[currentQuestionIndex] === currentQuestion.correctOptionIndex || (currentQuestion.type === 'code-upload' && answers[currentQuestionIndex] !== "INCORRECT_CODE_ATTEMPT") ? 'bg-green-900/50 text-green-300' : 'bg-red-900/50 text-red-300'}`}>
              <p>{currentFeedback}</p>
            </div>
          )}
        </div>
        
        <div className="mt-6 text-right">
          {currentFeedback && (
            <button
              onClick={goToNextQuestion}
              className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-6 rounded-md"
            >
              {currentQuestionIndex < totalQuestions - 1 ? 'Câu tiếp theo' : 'Hoàn thành'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuizView;
