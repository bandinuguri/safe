
import React, { useState } from 'react';
import { Scale, FileText, GraduationCap, AlertOctagon, ChevronDown, ChevronUp } from 'lucide-react';

const OverviewPage: React.FC = () => {
  const [openSections, setOpenSections] = useState<boolean[]>([true, true, true, true, true]);

  const toggle = (i: number) => {
    setOpenSections(prev => prev.map((v, idx) => idx === i ? !v : v));
  };

  const penaltyRows = [
    { act: '가. 사전 승인 없이 차량 운전/장비 사용', p1: '업무정지 10일', p2: '업무정지 20일', p3: '업무정지 40일' },
    { act: '가-2. 거짓·부정한 방법으로 사전 승인', p1: '운전업무승인 취소', p2: '-', p3: '-' },
    { act: '나. 승차정원·화물적재량 초과', p1: '업무정지 1일', p2: '업무정지 2일', p3: '업무정지 4일' },
    { act: '다-1. 제한속도 10km/h 미만 초과', p1: '운전업무정지 1일', p2: '운전업무정지 2일', p3: '운전업무정지 4일' },
    { act: '다-2. 제한속도 10km/h 이상 초과', p1: '운전업무정지 2일', p2: '운전업무정지 4일', p3: '운전업무정지 8일' },
    { act: '라. 주행 중 차량 추월', p1: '운전업무정지 2일', p2: '운전업무정지 4일', p3: '운전업무정지 8일' },
    { act: '마. 이동 중 항공기 앞 가로지르기/주기 항공기 밑 운행', p1: '업무정지 5일', p2: '업무정지 7일', p3: '업무정지 15일' },
    { act: '바. 지정 구역 외 주차·정차', p1: '운전업무정지 1일', p2: '운전업무정지 2일', p3: '운전업무정지 4일' },
    { act: '사. 운행 중 전방 주시 불이행', p1: '운전업무정지 2일', p2: '운전업무정지 4일', p3: '운전업무정지 8일' },
    { act: '아. 운행 중 휴대폰 사용', p1: '운전업무정지 2일', p2: '운전업무정지 4일', p3: '운전업무정지 8일' },
    { act: '자. 교통안전 시설·표지 훼손', p1: '업무정지 1일', p2: '업무정지 3일', p3: '업무정지 7일' },
    { act: '차-1. 활주로·유도로 등에 장비·이물질 방치', p1: '업무정지 3일', p2: '업무정지 5일', p3: '업무정지 10일' },
    { act: '차-2. 지정 구역 외 위험물 보관·저장', p1: '업무정지 1일', p2: '업무정지 3일', p3: '업무정지 5일' },
    { act: '카. 사고 발생 시 즉시 신고 불이행', p1: '업무정지 5일', p2: '업무정지 10일', p3: '업무정지 20일' },
    { act: '타-1. 흡연·음주·환각제 (운전 외 업무)', p1: '업무정지 3일', p2: '업무정지 5일', p3: '업무정지 10일' },
    { act: '타-2. 흡연·음주·환각제 (운전 업무)', p1: '운전업무승인 취소', p2: '-', p3: '-' },
    { act: '파. 연료 유출 시 미신고·조치 불이행', p1: '업무정지 3일', p2: '업무정지 5일', p3: '업무정지 10일' },
    { act: '하. 차량·장비 견인 규정 미준수', p1: '운전업무정지 1일', p2: '운전업무정지 2일', p3: '운전업무정지 4일' },
    { act: '거. 통행방법 미준수', p1: '운전업무정지 1일', p2: '운전업무정지 2일', p3: '운전업무정지 4일' },
  ];

  const sections = [
    {
      icon: <Scale className="w-5 h-5 text-blue-600" />,
      title: '지상안전사고 정의 및 규정',
      color: 'blue',
      content: (
        <div className="space-y-4">
          <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100">
            <p className="text-[13px] font-bold text-slate-500 mb-1.5">정의 <span className="font-normal text-slate-400">(법 제2조 제11의3, 고시 제3조)</span></p>
            <p className="text-[16px] text-slate-600 leading-relaxed font-medium">
              "지상안전사고"란 공항 보호구역에서 사람, 시설, 차량 및 장비 등으로 인하여 <span className="font-bold text-slate-800">인명피해가 발생하거나 항공기, 시설, 차량 등에 물적피해가 발생</span>한 것을 말한다.
            </p>
            <p className="text-[13px] text-slate-400 mt-2 font-medium">※ 항공기 운항과 관련된 사고는 제외</p>
          </div>
          <div className="bg-blue-50 rounded-2xl p-4 border border-blue-100">
            <p className="text-[14px] text-slate-700 font-semibold">
              <span className="font-bold text-blue-600">관련 규정 : </span>공항시설법, 공항안전운영기준(고시)
            </p>
          </div>
        </div>
      ),
    },
    {
      icon: <FileText className="w-5 h-5 text-orange-500" />,
      title: '사고 유형',
      color: 'orange',
      content: (
        <div className="space-y-2.5">
          {[
            { num: '①', label: '항공기간 접촉', sub: '지상조업 요인' },
            { num: '②', label: '항공기-장비·차량과 접촉', sub: '항공기 이동' },
            { num: '③', label: '항공기-장비·차량과 접촉', sub: '항공기 정지' },
            { num: '④', label: '차량-차량·장비·시설간 접촉', sub: '' },
            { num: '⑤', label: '조업자 상해', sub: '장비·차량과 접촉, 낙상' },
          ].map((item, i) => (
            <div key={i} className="bg-orange-50/60 rounded-2xl p-3.5 border border-orange-100/70">
              <p className="text-[14.5px] font-bold text-slate-800">
                <span className="text-orange-500 mr-1.5">{item.num}</span>
                {item.label}{item.sub && <span className="text-slate-500 font-medium">({item.sub})</span>}
              </p>
            </div>
          ))}
        </div>
      ),
    },
    {
      icon: <AlertOctagon className="w-5 h-5 text-red-500" />,
      title: '신고 등 처리 절차',
      color: 'red',
      content: (
        <div className="space-y-3">
          <p className="text-[12.5px] text-slate-400 font-medium">법 제31조의2, 제31조의3, 고시 제65조</p>
          {[
            { role: '항공관련업무종사자', desc: '지상안전사고가 발생한 경우 국토교통부장관에게 즉시 신고' },
            { role: '항공관련업무 수행단체', desc: '지상안전사고 발생 사실을 알게 된 경우 국토교통부장관에게 즉시 신고 (종사자가 이미 신고한 경우 제외)' },
            { role: '공항운영자', desc: '계류장에서 차량·장비·시설로 인한 지상안전사고 발생 시 관할 지방항공청장에게 즉시 보고' },
          ].map((item, i) => (
            <div key={i} className="bg-red-50/50 rounded-2xl p-3.5 border border-red-100/60">
              <p className="text-[13px] font-black text-red-600 mb-1">{item.role}</p>
              <p className="text-[16px] text-slate-600 leading-relaxed font-medium">{item.desc}</p>
            </div>
          ))}
        </div>
      ),
    },
    {
      icon: <GraduationCap className="w-5 h-5 text-emerald-600" />,
      title: '사고예방 교육',
      color: 'emerald',
      content: (
        <div className="space-y-3">
          <p className="text-[12.5px] text-slate-400 font-medium">법 제31조의2 제3항, 제4항</p>
          <div className="bg-emerald-50 rounded-2xl p-4 border border-emerald-100">
            <p className="text-[16px] text-slate-700 leading-relaxed font-medium">
              항공관련업무 수행단체는 업무종사자에게 지상안전사고의 예방과 차량 및 장비의 안전운행에 필요한 <span className="font-bold text-slate-800">교육을 정기적으로 실시</span>
            </p>
          </div>
          <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100">
            <p className="text-[13px] font-bold text-slate-500 mb-1.5">※ 특별안전교육</p>
            <p className="text-[16px] text-slate-600 leading-relaxed font-medium">
              국토교통부장관은 항공관련업무 수행단체에 조업방법, 근무환경 개선 등 지상안전사고 예방대책을 마련하여 특별안전교육을 실시하도록 요청할 수 있다.
            </p>
          </div>
        </div>
      ),
    },
    {
      icon: <Scale className="w-5 h-5 text-purple-600" />,
      title: '행정처분 기준',
      color: 'purple',
      content: (
        <div>
          <p className="text-[11.5px] text-slate-400 font-medium mb-3">제19조의4 공항시설법 시행규칙 [별표 4의2]</p>
          <div className="rounded-2xl overflow-hidden border border-slate-100">
            <table className="w-full text-[11px] text-center">
              <thead>
                <tr className="bg-purple-50">
                  <th className="py-2 px-2 text-left font-bold text-slate-600 w-[40%]">위반행위</th>
                  <th className="py-2 px-1 font-bold text-purple-600">1차</th>
                  <th className="py-2 px-1 font-bold text-purple-600">2차</th>
                  <th className="py-2 px-1 font-bold text-purple-600">3차 이상</th>
                </tr>
              </thead>
              <tbody>
                {penaltyRows.map((row, i) => (
                  <tr key={i} className={`border-t border-slate-100 ${i % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'}`}>
                    <td className="py-2 px-2 text-left text-slate-600 leading-relaxed">{row.act}</td>
                    <td className="py-2 px-1 text-slate-700">{row.p1}</td>
                    <td className="py-2 px-1 text-slate-700">{row.p2}</td>
                    <td className="py-2 px-1 text-slate-700">{row.p3}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ),
    },
  ];

  const colorMap: Record<string, string> = {
    blue: 'bg-blue-50 border-blue-100',
    orange: 'bg-orange-50 border-orange-100',
    red: 'bg-red-50 border-red-100',
    emerald: 'bg-emerald-50 border-emerald-100',
    purple: 'bg-purple-50 border-purple-100',
  };

  return (
    <div className="space-y-3 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-10">
      {sections.map((sec, i) => (
        <div key={i} className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
          <button
            className="w-full flex items-center justify-between px-5 py-4 text-left"
            onClick={() => toggle(i)}
          >
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-xl border ${colorMap[sec.color]}`}>
                {sec.icon}
              </div>
              <span className="text-[15px] font-black text-slate-800">{sec.title}</span>
            </div>
            {openSections[i]
              ? <ChevronUp className="w-4 h-4 text-slate-400 shrink-0" />
              : <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
            }
          </button>
          {openSections[i] && (
            <div className="px-5 pb-5 border-t border-slate-100 pt-4">
              {sec.content}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default OverviewPage;
