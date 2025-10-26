import React, { useState, useEffect } from 'react';
import { GoogleGenAI, GenerateContentResponse, Type } from '@google/genai';
import MainMenu from './components/MainMenu';
import QuizView from './components/QuizView';
import FeedbackModal from './components/FeedbackModal';
import Hud from './components/Hud';
import { Player, Challenge, Zone, Question, UserRole } from './types';
import { ZONES, LEVELS } from './constants';

const LOCAL_STORAGE_KEY = 'teacherGeneratedZone';

// Mock: In a real app, this would be loaded from a server or localStorage
const initialPlayer: Player = {
  level: 1,
  xp: 0,
  codeBlocks: 100,
};

const App: React.FC = () => {
  const [player, setPlayer] = useState<Player>(initialPlayer);
  const [completedChallenges, setCompletedChallenges] = useState<string[]>([]);
  const [activeChallenge, setActiveChallenge] = useState<Challenge | null>(null);
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);
  const [lastQuizResult, setLastQuizResult] = useState<{
    success: boolean;
    score: number;
    totalScore: number;
    xpGained: number;
    codeBlocksGained: number;
  } | null>(null);

  const [customZone, setCustomZone] = useState<Zone | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationError, setGenerationError] = useState<string | null>(null);
  const [userRole, setUserRole] = useState<UserRole>('student');

  // Load custom zone from localStorage on initial render
  useEffect(() => {
    try {
      const savedZoneJSON = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (savedZoneJSON) {
        const savedZone = JSON.parse(savedZoneJSON);
        setCustomZone(savedZone);
      }
    } catch (error) {
      console.error("Failed to load custom zone from localStorage", error);
      localStorage.removeItem(LOCAL_STORAGE_KEY);
    }
  }, []);


  useEffect(() => {
    // Check for level up
    const currentLevelData = LEVELS.find(l => l.level === player.level);
    if (currentLevelData && player.xp >= currentLevelData.xpToNextLevel) {
      // Find the next level data, but don't exceed max level
      const nextLevel = LEVELS.find(l => l.level === player.level + 1);
      if (nextLevel) {
          setPlayer(prev => ({ ...prev, level: prev.level + 1 }));
      }
    }
  }, [player.xp, player.level]);
  
  const toggleUserRole = () => {
    setUserRole(prevRole => (prevRole === 'teacher' ? 'student' : 'teacher'));
  };

  const handleStartChallenge = (challenge: Challenge) => {
    setActiveChallenge(challenge);
  };

  const handleBackToMenu = () => {
    setActiveChallenge(null);
  };
  
  const handleQuizComplete = (success: boolean, score: number, xpGained: number, codeBlocksGained: number) => {
    if (activeChallenge) {
      setLastQuizResult({ 
        success, 
        score, 
        totalScore: activeChallenge.questions.length,
        xpGained, 
        codeBlocksGained 
      });

      if (success) {
        setCompletedChallenges(prev => [...prev, activeChallenge.gateId]);
        setPlayer(prev => ({
          ...prev,
          xp: prev.xp + xpGained,
          codeBlocks: prev.codeBlocks + codeBlocksGained,
        }));
      }
      setActiveChallenge(null);
      setIsFeedbackModalOpen(true);
    }
  };

  const handleCloseFeedbackModal = () => {
    setIsFeedbackModalOpen(false);
    setLastQuizResult(null);
  };

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve((reader.result as string).split(',')[1]);
      reader.onerror = error => reject(error);
    });
  };

  const handleFileUpload = async (file: File) => {
    if (!file) return;
    setIsGenerating(true);
    setGenerationError(null);
    // Do not clear custom zone here, allow replacing it
    // setCustomZone(null); 

    try {
      const base64Data = await fileToBase64(file);
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

      const questionSchema = {
        type: Type.OBJECT,
        properties: {
          id: { type: Type.STRING },
          type: { type: Type.STRING, enum: ['multiple-choice']},
          text: { type: Type.STRING },
          options: { type: Type.ARRAY, items: { type: Type.STRING } },
          correctOptionIndex: { type: Type.INTEGER },
          explanation: { type: Type.STRING },
          xp: { type: Type.INTEGER },
        }
      };

      const prompt = `Dựa vào nội dung của tài liệu được cung cấp, hãy tạo ra 5 câu hỏi trắc nghiệm khách quan (chỉ có một đáp án đúng duy nhất). Các câu hỏi phải liên quan trực tiếp và chỉ dựa vào nội dung trong tài liệu. Không được bịa đặt thông tin. Mỗi câu hỏi phải có 4 lựa chọn. Cung cấp câu trả lời theo cấu trúc JSON đã định sẵn.`;

      const response: GenerateContentResponse = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: {
          parts: [
            { text: prompt },
            {
              inlineData: {
                mimeType: file.type,
                data: base64Data,
              },
            },
          ],
        },
        config: {
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.ARRAY,
            items: questionSchema,
          },
        },
      });

      const generatedQuestions: Question[] = JSON.parse(response.text);

      if (!generatedQuestions || generatedQuestions.length === 0) {
        throw new Error("AI không thể tạo câu hỏi từ tài liệu này.");
      }
      
      const newZone: Zone = {
        id: 'zone-custom',
        name: `Tài liệu: ${file.name}`,
        description: 'Thử thách được tạo bởi giáo viên từ tài liệu ôn tập.',
        gates: [
          {
            id: 'gate-custom-1',
            name: 'Cổng Thử Thách Chính',
            type: 'medium',
            questions: generatedQuestions,
          },
        ],
      };
      setCustomZone(newZone);
      // Save to localStorage
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newZone));

    } catch (error) {
      console.error("Lỗi khi tạo câu hỏi:", error);
      setGenerationError("Không thể tạo câu hỏi từ tài liệu này. Vui lòng thử lại với một tệp khác hoặc kiểm tra định dạng tệp.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleClearCustomZone = () => {
    setCustomZone(null);
    localStorage.removeItem(LOCAL_STORAGE_KEY);
  };


  let zonesForDisplay: Zone[];

  if (userRole === 'student' && customZone) {
    // Học sinh chỉ thấy nội dung tùy chỉnh nếu có.
    zonesForDisplay = [customZone];
  } else {
    // Giáo viên thấy tất cả. Học sinh thấy nội dung mặc định nếu chưa có nội dung tùy chỉnh.
    zonesForDisplay = customZone ? [...ZONES, customZone] : ZONES;
  }

  return (
    <div className="bg-gray-900 text-white min-h-screen font-sans">
      <Hud player={player} levels={LEVELS} userRole={userRole} onToggleRole={toggleUserRole} />
      <main className="container mx-auto p-4 md:p-8">
        {!activeChallenge ? (
          <MainMenu 
            zones={zonesForDisplay} 
            onStartChallenge={handleStartChallenge}
            completedChallenges={completedChallenges}
            playerLevel={player.level}
            onFileUpload={handleFileUpload}
            isGenerating={isGenerating}
            generationError={generationError}
            userRole={userRole}
            customZone={customZone}
            onClearCustomZone={handleClearCustomZone}
          />
        ) : (
          <QuizView 
            challenge={activeChallenge}
            onComplete={handleQuizComplete}
            onBack={handleBackToMenu}
          />
        )}
      </main>
      {lastQuizResult && (
        <FeedbackModal 
          isOpen={isFeedbackModalOpen}
          onClose={handleCloseFeedbackModal}
          success={lastQuizResult.success}
          score={lastQuizResult.score}
          totalScore={lastQuizResult.totalScore}
          xpGained={lastQuizResult.xpGained}
          codeBlocksGained={lastQuizResult.codeBlocksGained}
        />
      )}
      <footer className="text-center p-4 text-gray-500 text-xs">
        <p>Gemini API Edutainment Demo</p>
      </footer>
    </div>
  );
};

export default App;