
import React from 'react';
import { Plane, ShieldAlert, BarChart3, CheckCircle2 } from 'lucide-react';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'stats', name: '통계분석', icon: BarChart3 },
    { id: 'excellence', name: '예방사례', icon: CheckCircle2 },
    { id: 'general', name: '사고사례', icon: ShieldAlert },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
      {/* 본문 폭과 일치시키고 여백 조정 */}
      <div className="max-w-xl mx-auto px-1">
        {/* 타이틀 영역: 기존 py-3에서 pt-5 pb-4로 상하 간격 확대 */}
        <div className="flex items-center justify-between pt-5 pb-4">
          <div className="flex items-center gap-2">
            <div className="bg-blue-600 p-1.5 rounded-lg shadow-sm shadow-blue-200 shrink-0">
              <Plane className="text-white w-4.5 h-4.5" />
            </div>
            <div className="flex items-baseline gap-1.5">
              {/* 폰트 크기: text-[22px]에서 text-[20px]로 한 단계 축소 */}
              <h1 className="text-[20px] font-black text-slate-900 tracking-tighter">지상안전사고 사례</h1>
              <span className="text-[11px] font-bold text-slate-400">('19~'24)</span>
            </div>
          </div>
        </div>

        {/* 메뉴 영역: 상단 마진 mt-1 추가 및 하단 여백 pb-3으로 확대 */}
        <nav className="flex mt-1 pb-3 gap-1">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center justify-center gap-1.5 flex-1 py-2.5 rounded-xl text-[13px] font-bold transition-all ${isActive
                    ? 'bg-blue-50 text-blue-600 shadow-sm ring-1 ring-blue-100'
                    : 'text-slate-500 hover:bg-slate-50'
                  }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-blue-600' : 'text-slate-400'}`} />
                <span>{tab.name}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
};

export default Header;
