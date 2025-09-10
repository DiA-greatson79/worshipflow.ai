import React from 'react';
import { SlideData, SlideState } from '../types';
import LivePromptSection from './LivePromptSection';
import HowToSlide from './HowToSlide';

interface SlideProps {
  slideData: SlideData;
  slideState: SlideState;
  isActive: boolean;
  onPromptChange: (value: string) => void;
  onTemplateClick: (template: string) => void;
  onExecuteAI: () => void;
  onExecuteTTS: () => void;
}

const Slide: React.FC<SlideProps> = ({
  slideData,
  slideState,
  isActive,
  onPromptChange,
  onTemplateClick,
  onExecuteAI,
  onExecuteTTS,
}) => {
  if (slideData.howToContent) {
    return <HowToSlide title={slideData.title} items={slideData.howToContent} isActive={isActive} />;
  }
  
  const { title, purpose, ideasTitle, ideas, duration, promptTemplatesTitle, promptTemplates, isTtsSlide } = slideData;

  return (
    <div
      className={`transition-opacity duration-500 ${isActive ? 'opacity-100 block' : 'opacity-0 hidden'}`}
      style={{ animation: isActive ? 'fadeIn 0.6s' : 'none' }}
    >
      <div className="slide-header mb-5">
        <h2 className="text-4xl font-bold text-[#005f73] m-0">{title}</h2>
      </div>
      <div className="grid md:grid-cols-2 gap-8">
        <div className="content-box">
          <p className="font-bold text-[#005f73] text-lg">{purpose}</p>
          <strong className="text-base text-[#2d3748]">{ideasTitle}</strong>
          <ul className="list-none p-0 my-2">
            {ideas?.map((idea, index) => (
              <li key={index} className="pl-6 relative mb-2 before:content-['✓'] before:text-[#ca6702] before:absolute before:left-0">
                {idea}
              </li>
            ))}
          </ul>
          <p className="font-bold">소요 시간: {duration}</p>
          <div className="prompt-templates-list mt-6">
            <strong className="block mb-3 text-[#005f73] text-lg">{promptTemplatesTitle}</strong>
            {promptTemplates?.map((template, index) => (
              <p
                key={index}
                onClick={() => onTemplateClick(template)}
                className="bg-[#e0f2f1] p-3 rounded-lg mb-2 cursor-pointer transition-all duration-200 hover:bg-[#b2dfdb] hover:scale-[1.01] text-sm border-l-4 border-[#005f73]"
              >
                {template}
              </p>
            ))}
          </div>
        </div>
        <LivePromptSection
          promptValue={slideState.prompt}
          onPromptChange={onPromptChange}
          aiResult={slideState.result}
          isLoading={slideState.isLoading}
          onExecuteAI={onExecuteAI}
          isTtsSlide={!!isTtsSlide}
          onExecuteTTS={onExecuteTTS}
          ttsStatus={slideState.ttsStatus || ''}
          audioUrl={slideState.audioUrl || ''}
          isLoadingTts={slideState.isLoadingTts || false}
        />
      </div>
    </div>
  );
};

export default Slide;
