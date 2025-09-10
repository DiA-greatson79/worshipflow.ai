import React, { useState, useMemo } from 'react';
import { HowToItem } from '../types';

interface HowToSlideProps {
  title: string;
  items: HowToItem[];
  isActive: boolean;
}

const HowToSlide: React.FC<HowToSlideProps> = ({ title, items, isActive }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredItems = useMemo(() => {
    if (!searchTerm) {
      return items;
    }
    return items.filter(
      (item) =>
        item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.answer.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [items, searchTerm]);

  return (
    <div
      className={`transition-opacity duration-500 ${isActive ? 'opacity-100 block' : 'opacity-0 hidden'}`}
      style={{ animation: isActive ? 'fadeIn 0.6s' : 'none' }}
    >
      <div className="slide-header mb-5">
        <h2 className="text-4xl font-bold text-[#005f73] m-0">{title}</h2>
      </div>
      <div className="how-to-content">
        <div className="search-container mb-6">
          <input
            type="search"
            id="howToSearch"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="궁금한 기능 검색 (예: 오디오, 프롬프트, 복사)"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#005f73] focus:outline-none"
          />
        </div>
        <ul className="how-to-list space-y-4">
          {filteredItems.map((item, index) => (
            <li key={index} className="bg-[#f7f4ed] p-5 rounded-lg border border-[#e2e8f0]">
              <h3 className="text-lg font-bold text-[#005f73] mb-2">{item.question}</h3>
              <p className="text-gray-700 whitespace-pre-line leading-relaxed">{item.answer}</p>
            </li>
          ))}
           {filteredItems.length === 0 && (
            <div className="text-center py-10 text-gray-500">
              <p>검색 결과가 없습니다.</p>
              <p className="text-sm">다른 키워드로 검색해보세요.</p>
            </div>
          )}
        </ul>
      </div>
    </div>
  );
};

export default HowToSlide;
