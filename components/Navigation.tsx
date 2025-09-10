
import React from 'react';

interface NavigationProps {
  currentSlide: number;
  totalSlides: number;
  onPrev: () => void;
  onNext: () => void;
}

const Navigation: React.FC<NavigationProps> = ({ currentSlide, totalSlides, onPrev, onNext }) => {
  return (
    <div className="flex justify-between items-center p-5 sm:px-10 bg-gray-50 border-t border-[#e0e0e0]">
      <button
        onClick={onPrev}
        disabled={currentSlide === 0}
        className="bg-[#8A2BE2] text-white border-none py-2 px-5 rounded-lg text-base cursor-pointer disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
      >
        이전
      </button>
      <span className="font-bold text-[#8A2BE2]">
        {currentSlide + 1} / {totalSlides}
      </span>
      <button
        onClick={onNext}
        disabled={currentSlide === totalSlides - 1}
        className="bg-[#8A2BE2] text-white border-none py-2 px-5 rounded-lg text-base cursor-pointer disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
      >
        다음
      </button>
    </div>
  );
};

export default Navigation;
