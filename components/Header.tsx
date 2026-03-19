
import React from 'react';
import { Plane, ShieldAlert, BarChart3, CheckCircle2, AlertTriangle, BookOpen } from 'lucide-react';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'overview', name: '개념정의', icon: BookOpen },
    { id: 'stats', name: '사고 현황', icon: BarChart3 },
    { id: 'accident25', name: "'25년 사고", icon: AlertTriangle },
    { id: 'general', name: '주요사고', icon: ShieldAlert },
    { id: 'excellence', name: '예방사례', icon: CheckCircle2 },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
      <div className="px-2">
        <div className="flex items-center justify-between pt-5 pb-4">
          <div className="flex items-center gap-2">
            <div className="bg-blue-600 p-1.5 rounded-lg shadow-sm shadow-blue-200 shrink-0">
              <Plane className="text-white w-4.5 h-4.5" />
            </div>
            <div className="flex items-baseline gap-2">
              <h1 className="text-[20px] font-black text-slate-900 tracking-tighter">공항 지상안전사고 예방</h1>
              <a
                href="/safe/pc.html"
                className="text-[11px] font-bold text-blue-500 border border-blue-200 bg-blue-50 px-2 py-0.5 rounded-md hover:bg-blue-100 transition-colors whitespace-nowrap"
              >
                수정페이지
              </a>
            </div>
          </div>
        </div>

        <nav className="flex mt-1 pb-3 gap-1">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            const isAccident25 = tab.id === 'accident25';
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center justify-center gap-1 flex-1 py-2.5 rounded-xl text-[12px] font-bold transition-all ${
                  isActive
                    ? isAccident25
                      ? 'bg-red-50 text-red-600 shadow-sm ring-1 ring-red-100'
                      : 'bg-blue-50 text-blue-600 shadow-sm ring-1 ring-blue-100'
                    : 'text-slate-500 hover:bg-slate-50'
                }`}
              >
                <Icon className={`w-3 h-3 shrink-0 ${isActive ? (isAccident25 ? 'text-red-600' : 'text-blue-600') : 'text-slate-400'}`} />
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
