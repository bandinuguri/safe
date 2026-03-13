
import React from 'react';
import { Plane, ShieldAlert, BarChart3, CheckCircle2, AlertTriangle } from 'lucide-react';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'stats', name: '통계분석', icon: BarChart3 },
    { id: 'excellence', name: '예방사례', icon: CheckCircle2 },
    { id: 'general', name: '사고사례', icon: ShieldAlert },
    { id: 'accident25', name: "'25년 사고", icon: AlertTriangle },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-xl mx-auto px-1">
        <div className="flex items-center justify-between pt-5 pb-4">
          <div className="flex items-center gap-2">
            <div className="bg-blue-600 p-1.5 rounded-lg shadow-sm shadow-blue-200 shrink-0">
              <Plane className="text-white w-4.5 h-4.5" />
            </div>
            <div className="flex items-baseline gap-1.5">
              <h1 className="text-[20px] font-black text-slate-900 tracking-tighter">지상안전사고 사례</h1>
              <span className="text-[11px] font-bold text-slate-400">('19~'25)</span>
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
                className={`flex items-center justify-center gap-1.5 flex-1 py-2.5 rounded-xl text-[13px] font-bold transition-all ${
                  isActive
                    ? isAccident25
                      ? 'bg-red-50 text-red-600 shadow-sm ring-1 ring-red-100'
                      : 'bg-blue-50 text-blue-600 shadow-sm ring-1 ring-blue-100'
                    : 'text-slate-500 hover:bg-slate-50'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? (isAccident25 ? 'text-red-600' : 'text-blue-600') : 'text-slate-400'}`} />
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
