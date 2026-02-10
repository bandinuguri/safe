
import React, { useState, useMemo, useEffect, useCallback } from 'react';
import Header from './components/Header';
import StatsDashboard from './components/StatsDashboard';
import CaseCard from './components/CaseCard';
import { CASES } from './constants';
import { CaseType } from './types';
import { Search, ChevronDown, ChevronUp } from 'lucide-react';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('stats');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAirport, setSelectedAirport] = useState('전체');
  const [selectedCompany, setSelectedCompany] = useState('전체');
  const [showTopBtn, setShowTopBtn] = useState(false);

  // 스크롤 감지 (Top 버튼 노출)
  useEffect(() => {
    const handleScroll = () => {
      setShowTopBtn(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // 공항 및 조업사 목록 추출 최적화
  const airports = useMemo(() => ['전체', '인천', '김포', '김해', '제주', '대구', '광주', '청주'], []);
  const companies = useMemo(() => {
    const list = Array.from(new Set(CASES.map(c => c.company)));
    return ['전체', ...list.sort()];
  }, []);

  // 필터링 로직 최적화
  const filteredCases = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();

    return CASES.filter((c) => {
      const matchesTab =
        (activeTab === 'excellence' && c.type === CaseType.EXCELLENCE) ||
        (activeTab === 'general' && c.type === CaseType.GENERAL);

      const matchesAirport =
        selectedAirport === '전체' || c.airport.startsWith(selectedAirport);

      const matchesCompany =
        selectedCompany === '전체' || c.company === selectedCompany;

      const matchesSearch =
        query === '' ||
        c.title.toLowerCase().includes(query) ||
        c.content.toLowerCase().includes(query) ||
        c.company.toLowerCase().includes(query) ||
        c.airport.toLowerCase().includes(query);

      return matchesTab && matchesAirport && matchesCompany && matchesSearch;
    }).sort((a, b) => a.id - b.id);
  }, [activeTab, searchQuery, selectedAirport, selectedCompany]);

  // 탭 변경 시 스크롤 상단 이동
  const handleTabChange = useCallback((tab: string) => {
    setActiveTab(tab);
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col overflow-x-hidden">
      <Header activeTab={activeTab} setActiveTab={handleTabChange} />

      <main className="flex-1 max-w-xl mx-auto px-4 py-4 w-full">
        {activeTab === 'stats' && <StatsDashboard />}

        {(activeTab === 'excellence' || activeTab === 'general') && (
          <div className="space-y-5 animate-in fade-in slide-in-from-bottom-4 duration-500">

            {/* 필터 섹션 */}
            <div className="grid grid-cols-2 gap-3">
              <div className="group space-y-1.5">
                <label className="text-[11px] font-extrabold text-slate-400 ml-1 transition-colors group-focus-within:text-blue-500">공항 필터</label>
                <div className="relative">
                  <select
                    value={selectedAirport}
                    onChange={(e) => setSelectedAirport(e.target.value)}
                    className="w-full appearance-none bg-white border border-slate-200 rounded-2xl px-4 py-3 text-[14px] font-bold text-slate-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none shadow-sm cursor-pointer transition-all"
                  >
                    {airports.map(a => <option key={a} value={a}>{a}</option>)}
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                </div>
              </div>

              <div className="group space-y-1.5">
                <label className="text-[11px] font-extrabold text-slate-400 ml-1 transition-colors group-focus-within:text-blue-500">조업사 필터</label>
                <div className="relative">
                  <select
                    value={selectedCompany}
                    onChange={(e) => setSelectedCompany(e.target.value)}
                    className="w-full appearance-none bg-white border border-slate-200 rounded-2xl px-4 py-3 text-[14px] font-bold text-slate-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none shadow-sm cursor-pointer transition-all"
                  >
                    {companies.map(c => (
                      <option key={c} value={c}>
                        {c.length > 10 ? `${c.substring(0, 10)}..` : c}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* 검색 바 */}
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 transition-colors group-focus-within:text-blue-500" />
              <input
                type="text"
                placeholder="검색어를 입력하세요 (제목, 내용, 업체명)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-3.5 bg-white border border-slate-200 rounded-2xl text-[14px] focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none shadow-sm transition-all"
              />
            </div>

            {/* 목록 영역 */}
            <div className="space-y-4 pt-1 pb-16">
              {filteredCases.map((c) => (
                <CaseCard key={c.id} caseData={c} highlight={searchQuery.trim()} />
              ))}

              {filteredCases.length === 0 && (
                <div className="py-24 text-center bg-white rounded-[32px] border border-dashed border-slate-200 shadow-inner">
                  <div className="bg-slate-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Search className="w-6 h-6 text-slate-300" />
                  </div>
                  <p className="text-slate-500 font-bold text-[15px]">검색 결과가 없습니다.</p>
                  <button
                    onClick={() => { setSearchQuery(''); setSelectedAirport('전체'); setSelectedCompany('전체'); }}
                    className="mt-4 text-blue-500 font-bold text-[13px] hover:underline"
                  >
                    필터 초기화
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </main>

      {/* Top 버튼 */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-8 right-6 w-12 h-12 bg-slate-900 text-white rounded-full shadow-xl flex items-center justify-center transition-all z-[60] active:scale-95 ${showTopBtn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}`}
        aria-label="맨 위로"
      >
        <ChevronUp className="w-6 h-6" />
      </button>

      <footer className="bg-white py-10 border-t border-slate-100 safe-bottom">
        <div className="max-w-xl mx-auto px-6 text-center">
          <div className="flex justify-center mb-4">
            <div className="h-[2px] w-8 bg-slate-200 rounded-full"></div>
          </div>
          <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.25em] mb-2">Government Portal Service</p>
          <h4 className="text-[18px] font-extrabold text-slate-800">국토교통부 공항운영과</h4>
          <p className="text-[13px] text-slate-400 mt-1.5 leading-relaxed font-semibold">지상조업 안전문화 정착을 위해 앞장섭니다.</p>
          <p className="text-[11px] text-slate-300 mt-6">© 2025 MOLIT. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;
