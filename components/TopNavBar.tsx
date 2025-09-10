import React from 'react';
import { SlideData } from '../types';

interface TopNavBarProps {
  slides: SlideData[];
  currentSlide: number;
  onNavigate: (index: number) => void;
}

const TopNavBar: React.FC<TopNavBarProps> = ({ slides, currentSlide, onNavigate }) => {
  return (
    <nav className="bg-gray-50 border-b border-gray-200 shadow-sm">
      <div className="flex justify-start sm:justify-end space-x-2 sm:space-x-4 p-2 px-4 overflow-x-auto">
        {slides.map((slide, index) => {
          return (
            <button
              key={index}
              onClick={() => onNavigate(index)}
              aria-current={currentSlide === index ? 'page' : undefined}
              className={`py-2 px-3 whitespace-nowrap text-sm font-medium rounded-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#005f73] ${
                currentSlide === index
                  ? 'bg-[#005f73] text-white shadow'
                  : 'text-gray-600 hover:bg-gray-200 hover:text-gray-800'
              }`}
            >
              {slide.navTitle}
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default TopNavBar;
