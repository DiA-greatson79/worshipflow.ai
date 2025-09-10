import React from 'react';

interface HeaderProps {
  onGoHome: () => void;
}

const Header: React.FC<HeaderProps> = ({ onGoHome }) => {
  return (
    <header className="relative text-center p-5 bg-[#005f73] text-white flex items-center justify-center">
      <button
        onClick={onGoHome}
        className="absolute left-2 sm:left-5 text-sm font-medium hover:underline focus:outline-none focus:ring-2 focus:ring-white rounded-md p-2 transition-opacity hover:opacity-80"
        aria-label="Go to homepage"
      >
        홈으로 돌아가기
      </button>
      <h1 className="m-0 text-2xl sm:text-3xl font-bold">WorshipFlow.ai</h1>
    </header>
  );
};

export default Header;