import React from 'react';

interface LandingPageProps {
  onStart: () => void;
}

const FeatureCard: React.FC<{ icon: string; title: string; description: string }> = ({ icon, title, description }) => (
  <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
    <div className="text-4xl mb-4">{icon}</div>
    <h3 className="text-xl font-bold text-[#005f73] mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

const LandingPage: React.FC<LandingPageProps> = ({ onStart }) => {
  return (
    <div className="bg-[#fdfbf7] min-h-screen font-['Paperlogy'] text-[#2d3748]">
      <div className="container mx-auto px-6 py-12">
        
        {/* Hero Section */}
        <header className="text-center max-w-4xl mx-auto py-16">
          <h1 className="text-4xl md:text-6xl font-extrabold text-[#005f73] leading-tight mb-4">
            살아있는 예배를 만드는<br/>가장 스마트한 방법
          </h1>
          <p className="text-lg md:text-xl text-gray-700 max-w-2xl mx-auto mb-8">
            예배 전 아이스브레이킹부터 주중 묵상 챌린지까지, 이제 AI가 당신의 든든한 사역 파트너가 되어 드립니다.
          </p>
          <button
            onClick={onStart}
            className="bg-[#ca6702] text-white font-bold py-4 px-10 rounded-lg text-lg hover:bg-[#bb5a00] transition-transform transform hover:scale-105 shadow-lg"
          >
            AI 플래너 지금 시작하기
          </button>
        </header>

        {/* Problem & Solution Section */}
        <section className="py-16">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-4">혹시 이런 고민, 하고 계신가요?</h2>
            <div className="space-y-4 text-gray-600">
              <p>"매주 새로운 소그룹 나눔 질문, 아이디어가 고갈되셨나요?"</p>
              <p>"설교 내용을 성도들의 삶에 연결할 방법이 막막하신가요?"</p>
              <p>"주중에도 성도들의 신앙을 독려할 콘텐츠 제작이 부담스러우신가요?"</p>
            </div>
            <div className="mt-10">
              <h3 className="text-2xl font-bold text-[#005f73]">WorshipFlow.ai가 명쾌한 해답을 드립니다.</h3>
              <p className="mt-2 text-gray-700">AI가 만드는 무한한 토론 질문부터 클릭 한 번으로 완성되는 묵상 팟캐스트까지 경험해보세요.</p>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-white rounded-2xl shadow-inner-lg border">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl font-bold">핵심 기능 소개</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            <FeatureCard icon="💡" title="AI 기반 맞춤 콘텐츠 생성" description="설교 주제만 입력하면 예배 단계별 활동 아이디어가 완성됩니다." />
            <FeatureCard icon="✍️" title="실시간 프롬프트 수정" description="AI의 제안을 바탕으로 우리 교회에 꼭 맞는 콘텐츠를 직접 디자인하세요." />
            <FeatureCard icon="🎙️" title="원클릭 오디오 제작" description="생성된 팟캐스트 대본을 터치 한 번으로 생생한 음성 콘텐츠로 변환하세요." />
            <FeatureCard icon="🔍" title="친절한 How-To 가이드" description="누구나 쉽게 사용할 수 있도록 단계별 가이드와 검색 기능을 제공합니다." />
          </div>
        </section>
        
        {/* How It Works Section */}
        <section className="py-20">
            <div className="text-center max-w-3xl mx-auto mb-12">
                <h2 className="text-3xl font-bold">간단한 3단계 사용법</h2>
            </div>
            <div className="flex flex-col md:flex-row justify-center items-center gap-8 md:gap-16 max-w-4xl mx-auto">
                <div className="text-center flex flex-col items-center">
                    <div className="bg-[#005f73] text-white rounded-full w-20 h-20 flex items-center justify-center text-3xl font-bold mb-4 shadow-lg">1</div>
                    <h3 className="text-xl font-bold mb-2">단계 선택</h3>
                    <p className="text-gray-600">예배 전, 소그룹 등<br/>원하는 계획 단계를 선택합니다.</p>
                </div>
                 <div className="text-gray-300 text-2xl hidden md:block">&rarr;</div>
                <div className="text-center flex flex-col items-center">
                    <div className="bg-[#005f73] text-white rounded-full w-20 h-20 flex items-center justify-center text-3xl font-bold mb-4 shadow-lg">2</div>
                    <h3 className="text-xl font-bold mb-2">AI로 생성</h3>
                    <p className="text-gray-600">템플릿을 활용하거나<br/>직접 질문하여 콘텐츠를 만듭니다.</p>
                </div>
                 <div className="text-gray-300 text-2xl hidden md:block">&rarr;</div>
                <div className="text-center flex flex-col items-center">
                    <div className="bg-[#005f73] text-white rounded-full w-20 h-20 flex items-center justify-center text-3xl font-bold mb-4 shadow-lg">3</div>
                    <h3 className="text-xl font-bold mb-2">즉시 활용</h3>
                    <p className="text-gray-600">완성된 텍스트와 오디오를<br/>복사하여 바로 사용합니다.</p>
                </div>
            </div>
        </section>

        {/* Final CTA Section */}
        <section className="text-center py-20 bg-[#005f73] text-white rounded-2xl my-10">
          <h2 className="text-4xl font-bold mb-4">당신의 사역에<br/>AI라는 날개를 달아보세요.</h2>
          <p className="text-lg opacity-90 mb-8 max-w-xl mx-auto">반복적인 업무는 AI에게 맡기고, 성도들과의 관계에 더 깊이 집중하세요.</p>
          <button
            onClick={onStart}
            className="bg-white text-[#ca6702] font-bold py-4 px-10 rounded-lg text-lg hover:bg-gray-100 transition-transform transform hover:scale-105 shadow-lg"
          >
            무료로 시작하고 사역의 효율을 높여보세요
          </button>
        </section>
        
        <footer className="text-center text-gray-500 py-6">
            <p>&copy; {new Date().getFullYear()} WorshipFlow.ai. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
};

export default LandingPage;