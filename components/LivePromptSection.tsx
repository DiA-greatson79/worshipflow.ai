import React, { useState, useEffect } from 'react';
import Loader from './Loader';

interface LivePromptSectionProps {
  promptValue: string;
  onPromptChange: (value: string) => void;
  aiResult: string;
  isLoading: boolean;
  onExecuteAI: () => void;
  isTtsSlide: boolean;
  onExecuteTTS: () => void;
  ttsStatus: string;
  audioUrl: string;
  isLoadingTts: boolean;
}

const LivePromptSection: React.FC<LivePromptSectionProps> = ({
  promptValue,
  onPromptChange,
  aiResult,
  isLoading,
  onExecuteAI,
  isTtsSlide,
  onExecuteTTS,
  ttsStatus,
  audioUrl,
  isLoadingTts,
}) => {
  const [copied, setCopied] = useState(false);
  const showTtsControls = isTtsSlide && aiResult && !isLoading;

  const handleCopy = () => {
    if (aiResult && !isLoading) {
      navigator.clipboard.writeText(aiResult);
      setCopied(true);
    }
  };

  useEffect(() => {
    if (copied) {
      const timer = setTimeout(() => setCopied(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [copied]);
  
  useEffect(() => {
    // When AI result changes, reset copied state
    setCopied(false);
  }, [aiResult]);

  return (
    <div className="bg-[#f7f4ed] rounded-xl p-5 border border-[#e2e8f0] flex flex-col h-full">
      <h4 className="mt-0 text-2xl font-bold text-[#005f73]">Live AI Prompting</h4>
      <textarea
        value={promptValue}
        onChange={(e) => onPromptChange(e.target.value)}
        className="w-full h-28 p-3 rounded-lg border border-[#e2e8f0] text-base resize-vertical mb-4 focus:ring-2 focus:ring-[#005f73] focus:outline-none"
        placeholder="템플릿을 클릭하거나 직접 프롬프트를 입력하세요."
      />
      <div 
        className="ai-result relative mt-auto bg-white rounded-lg p-4 min-h-[100px] border border-[#e2e8f0] flex-grow flex items-center justify-center cursor-pointer"
        onClick={handleCopy}
      >
        {isLoading ? (
          <Loader />
        ) : (
          <pre className="result-text whitespace-pre-wrap break-words text-sm leading-relaxed w-full h-full font-sans">
            {aiResult}
          </pre>
        )}
        {copied && (
          <div className="absolute top-2 right-2 bg-[#005f73] text-white text-xs font-bold py-1 px-2 rounded-md">
            Copied!
          </div>
        )}
      </div>
      
      {showTtsControls && (
        <div className="tts-controls mt-4 pt-4 border-t border-dashed border-[#e2e8f0]">
          <button
            onClick={onExecuteTTS}
            disabled={isLoadingTts}
            className="w-full bg-[#005f73] text-white border-none py-2.5 px-4 rounded-lg text-base cursor-pointer disabled:bg-gray-400 mb-2 transition-colors"
          >
            {isLoadingTts ? '생성 중...' : '✨ 팟캐스트 오디오 생성'}
          </button>
          {ttsStatus && <div className="text-center mt-2 text-sm text-gray-600">{ttsStatus}</div>}
          {audioUrl && <audio controls src={audioUrl} className="w-full mt-2" />}
        </div>
      )}
      
      <button
        onClick={onExecuteAI}
        disabled={isLoading}
        className="block w-full bg-[#ca6702] text-white border-none py-3 rounded-lg text-lg font-bold cursor-pointer transition-colors hover:bg-[#bb5a00] mt-4 disabled:bg-[#e9d8a6] disabled:cursor-wait"
      >
        AI 실행
      </button>
    </div>
  );
};

export default LivePromptSection;
