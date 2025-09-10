import React, { useState, useCallback } from 'react';
import { SLIDES_DATA } from './constants';
import { SlideState } from './types';
import Header from './components/Header';
import Slide from './components/Slide';
import TopNavBar from './components/TopNavBar';
import LandingPage from './components/LandingPage';
import { generateText, generateAudio } from './services/geminiService';

const initialSlidesState: SlideState[] = SLIDES_DATA.map(() => ({
  prompt: '',
  result: '',
  isLoading: false,
  ttsStatus: '',
  audioUrl: '',
  isLoadingTts: false,
}));

function App() {
  const [isAppStarted, setIsAppStarted] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slidesState, setSlidesState] = useState<SlideState[]>(initialSlidesState);

  const handleStartApp = () => {
    setIsAppStarted(true);
  };
  
  const handleGoHome = () => {
    setIsAppStarted(false);
  };

  const updateSlideState = useCallback((index: number, newState: Partial<SlideState>) => {
    setSlidesState(prev => {
      const newSlidesState = [...prev];
      newSlidesState[index] = { ...newSlidesState[index], ...newState };
      return newSlidesState;
    });
  }, []);

  const handlePromptChange = useCallback((index: number, value: string) => {
    updateSlideState(index, { prompt: value });
  }, [updateSlideState]);

  const handleTemplateClick = useCallback((index: number, template: string) => {
    updateSlideState(index, { prompt: template });
  }, [updateSlideState]);

  const handleExecuteAI = useCallback(async (index: number) => {
    const currentPrompt = slidesState[index].prompt;
    if (!currentPrompt) {
      updateSlideState(index, { result: "프롬프트를 입력해주세요." });
      return;
    }

    updateSlideState(index, { isLoading: true, result: '' });
    try {
      const text = await generateText(currentPrompt);
      updateSlideState(index, { result: text, isLoading: false });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      updateSlideState(index, { result: `오류가 발생했습니다: ${errorMessage}`, isLoading: false });
    }
  }, [slidesState, updateSlideState]);
  
  const handleExecuteTTS = useCallback(async (index: number) => {
    const textToSpeak = slidesState[index].result;
    if (!textToSpeak) {
      updateSlideState(index, { ttsStatus: '오디오로 변환할 텍스트가 없습니다.' });
      return;
    }
    
    updateSlideState(index, { isLoadingTts: true, ttsStatus: '오디오 생성 중...', audioUrl: '' });
    try {
        const audioUrl = await generateAudio(textToSpeak);
        updateSlideState(index, { audioUrl: audioUrl, ttsStatus: '오디오 생성이 완료되었습니다.', isLoadingTts: false });
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        updateSlideState(index, { ttsStatus: `오디오 생성 실패: ${errorMessage}`, isLoadingTts: false });
    }
  }, [slidesState, updateSlideState]);

  const handleNavigation = (index: number) => {
    setCurrentSlide(index);
  };

  if (!isAppStarted) {
    return <LandingPage onStart={handleStartApp} />;
  }

  return (
    <div className="bg-[#fdfbf7] min-h-screen flex items-center justify-center p-5 font-['Paperlogy'] text-[#2d3748]">
      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col h-[95vh]">
        <Header onGoHome={handleGoHome} />
        <TopNavBar
          slides={SLIDES_DATA}
          currentSlide={currentSlide}
          onNavigate={handleNavigation}
        />
        <main className="relative p-7 sm:p-10 overflow-y-auto flex-grow">
          {SLIDES_DATA.map((slideData, index) => (
            <Slide
              key={index}
              slideData={slideData}
              slideState={slidesState[index]}
              isActive={index === currentSlide}
              onPromptChange={(value) => handlePromptChange(index, value)}
              onTemplateClick={(template) => handleTemplateClick(index, template)}
              onExecuteAI={() => handleExecuteAI(index)}
              onExecuteTTS={() => handleExecuteTTS(index)}
            />
          ))}
        </main>
      </div>
    </div>
  );
}

export default App;