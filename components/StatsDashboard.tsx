
import React from 'react';
import {
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ComposedChart,
  Line,
  Bar,
  Cell,
  PieChart,
  Pie,
  XAxis,
  YAxis,
  LabelList,
  Legend
} from 'recharts';
import { YEARLY_STATS, AIRPORT_STATS } from '../constants';
import {
  TrendingUp,
  Info,
  EyeOff,
  Octagon,
  Zap,
  Siren,
  Target
} from 'lucide-react';

const StatsDashboard: React.FC = () => {
  const renderCustomLabel = (props: any) => {
    const { cx, cy, midAngle, outerRadius, name, count, percentage } = props;
    const RADIAN = Math.PI / 180;
    const radius = outerRadius + 22;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="#475569"
        textAnchor={x > cx ? 'start' : 'end'}
        dominantBaseline="central"
        className="text-[11px] font-bold"
      >
        <tspan x={x} dy="-0.2em">{name}</tspan>
        <tspan x={x} dy="1.2em" fill="#3b82f6" fontSize="10px">{`${count}건(${percentage}%)`}</tspan>
      </text>
    );
  };

  const renderLegendText = (value: string) => {
    if (value === '환산건수') {
      return (
        <span className="text-slate-800">
          {value} <span className="text-slate-400 font-normal ml-0.5">(운항 1만건당)</span>
        </span>
      );
    }
    return <span className="text-slate-800">{value}</span>;
  };

  // '25년 목표 달성 현황 데이터
  const overallGoals = [
    { label: '항공기간 접촉', target: 0, actual: 0, count: 0 },
    { label: '항공기-장비·차량과 접촉', target: 0.004, actual: 0, count: 0 },
    { label: '항공기-장비·차량과 접촉', target: 0.036, actual: 0, count: 0 },
    { label: '차량·차량·장비·시설간 접촉', target: 0.248, actual: 0.175, count: 16 },
    { label: '조업자 상해', target: 0.064, actual: 0.055, count: 5 },
  ];

  const airportGoals = [
    {
      name: '한국공항공사',
      flights: '486,984',
      rows: [
        { label: '항공기간 접촉', target: 0, actual: 0, count: 0 },
        { label: '항공기-장비·차량과 접촉', target: 0, actual: 0, count: 0 },
        { label: '항공기-장비·차량과 접촉', target: 0, actual: 0, count: 0 },
        { label: '차량·차량·장비·시설간 접촉', target: 0.291, actual: 0.164, count: 8 },
        { label: '조업자 상해', target: 0.027, actual: 0.021, count: 1 },
      ],
      totalActual: 0.185,
      totalCount: 9,
    },
    {
      name: '인천공항공사',
      flights: '425,760',
      rows: [
        { label: '항공기간 접촉', target: 0, actual: 0, count: 0 },
        { label: '항공기-장비·차량과 접촉', target: 0.008, actual: 0, count: 0 },
        { label: '항공기-장비·차량과 접촉', target: 0.068, actual: 0, count: 0 },
        { label: '차량·차량·장비·시설간 접촉', target: 0.179, actual: 0.188, count: 8, over: true },
        { label: '조업자 상해', target: 0.139, actual: 0.094, count: 4 },
      ],
      totalActual: 0.282,
      totalCount: 12,
    },
  ];

  return (
    <div className="space-y-5 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-10 px-0.5">

      {/* 1. 지상안전사고 현황 */}
      <section className="bg-white p-5 rounded-3xl shadow-sm border border-slate-200">
        <div className="flex items-center gap-1.5 mb-2">
          <TrendingUp className="w-4 h-4 text-blue-600" />
          <h3 className="text-[15px] font-bold text-slate-800">지상안전사고 발생 현황</h3>
        </div>

        <div className="h-[300px] w-full mb-4">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={YEARLY_STATS} margin={{ top: 25, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis
                dataKey="year"
                axisLine={false}
                tickLine={false}
                tick={(props) => {
                  const { x, y, payload } = props;
                  const is25 = payload.value === "'25*";
                  return (
                    <text x={x} y={y} dy={10} textAnchor="middle" fill={is25 ? '#ef4444' : '#64748b'} fontSize={12} fontWeight={700}>
                      {payload.value}
                    </text>
                  );
                }}
              />
              <YAxis yAxisId="left" hide />
              <YAxis yAxisId="right" orientation="right" hide />
              <Tooltip
                contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}
              />
              <Legend
                verticalAlign="top"
                align="right"
                iconType="circle"
                formatter={renderLegendText}
                wrapperStyle={{
                  fontSize: '11px',
                  fontWeight: 'bold',
                  paddingBottom: '35px',
                  paddingTop: '0px'
                }}
              />
              <Bar yAxisId="left" dataKey="flights" name="운항횟수" barSize={32} radius={[4, 4, 0, 0]}>
                {YEARLY_STATS.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.year === "'25*" ? '#fecaca' : '#e2e8f0'} />
                ))}
              </Bar>
              <Line yAxisId="right" type="monotone" dataKey="accidents" name="발생건수" stroke="#ef4444" strokeWidth={2} dot={{ r: 4, fill: '#ef4444', strokeWidth: 1, stroke: '#fff' }}>
                <LabelList dataKey="accidents" position="top" offset={12} style={{ fill: '#ef4444', fontSize: 13, fontWeight: 900 }} />
              </Line>
              <Line yAxisId="right" type="monotone" dataKey="rate" name="환산건수" stroke="#f97316" strokeWidth={2} dot={{ r: 3, fill: '#f97316', strokeWidth: 1, stroke: '#fff' }}>
                <LabelList dataKey="rate" position="top" offset={10} style={{ fill: '#f97316', fontSize: 11, fontWeight: 700 }} />
              </Line>
            </ComposedChart>
          </ResponsiveContainer>
        </div>

        <div className="space-y-2">
          <p className="text-[13px] font-bold text-slate-700 ml-1">최근 3개년 사고 추이</p>
          <div className="grid grid-cols-3 gap-2">
            {YEARLY_STATS.slice(-3).map(s => (
              <div key={s.year} className={`p-3.5 rounded-2xl border text-center ${s.year === "'25*" ? 'bg-red-50 border-red-100' : 'bg-slate-50 border-slate-100'}`}>
                <p className={`text-[12px] font-bold mb-1 ${s.year === "'25*" ? 'text-red-400' : 'text-slate-400'}`}>{s.year}년</p>
                <p className={`text-[17px] font-black leading-none ${s.year === "'25*" ? 'text-red-600' : 'text-slate-800'}`}>{s.accidents}건</p>
                <p className={`text-[10px] font-bold mt-1.5 ${s.year === "'25*" ? 'text-red-400' : 'text-orange-500'}`}>{s.rate.toFixed(3)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 2. '25년 목표 달성 현황 */}
      <section className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="bg-slate-800 py-3 px-4 flex items-center gap-2">
          <Target className="w-4 h-4 text-orange-400" />
          <h2 className="text-[14px] font-bold text-white">'25년 지상안전사고 예방 목표 달성 현황</h2>
        </div>

        {/* 전사 종합 */}
        <div className="px-4 pt-4 pb-2">
          <p className="text-[12px] font-bold text-slate-500 mb-2">▪ 전사 종합 <span className="text-slate-400 font-normal">(운항횟수: 912,744)</span></p>
          <div className="rounded-2xl overflow-hidden border border-slate-100">
            <table className="w-full text-center text-[12px]">
              <thead>
                <tr className="bg-orange-50">
                  <th className="py-2 px-2 font-bold text-slate-600 text-left">세부지표</th>
                  <th className="py-2 px-2 font-bold text-orange-500">안전목표</th>
                  <th className="py-2 px-2 font-bold text-orange-500">실적</th>
                  <th className="py-2 px-2 font-bold text-orange-500">사고건수</th>
                </tr>
              </thead>
              <tbody>
                {overallGoals.map((row, i) => (
                  <tr key={i} className="border-t border-slate-100">
                    <td className="py-2 px-2 text-left text-slate-600">{row.label}</td>
                    <td className="py-2 px-2 text-slate-500">{row.target === 0 ? '0' : row.target.toFixed(3)}</td>
                    <td className="py-2 px-2 text-slate-700 font-bold">{row.actual === 0 ? '0' : row.actual.toFixed(3)}</td>
                    <td className="py-2 px-2 text-slate-700 font-bold">{row.count}</td>
                  </tr>
                ))}
                <tr className="border-t-2 border-slate-200 bg-slate-50">
                  <td className="py-2 px-2 text-left font-black text-slate-800">전사 합계</td>
                  <td className="py-2 px-2 text-slate-400 font-bold">-</td>
                  <td className="py-2 px-2 font-black text-slate-800">0.230</td>
                  <td className="py-2 px-2 font-black text-slate-800">21</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* 공사별 현황 */}
        <div className="px-4 pt-3 pb-4 space-y-4">
          {airportGoals.map((airport, ai) => (
            <div key={ai}>
              <p className="text-[12px] font-bold text-slate-500 mb-2">
                ▪ {airport.name} <span className="text-slate-400 font-normal">(운항횟수: {airport.flights})</span>
              </p>
              <div className="rounded-2xl overflow-hidden border border-slate-100">
                <table className="w-full text-center text-[12px]">
                  <thead>
                    <tr className="bg-orange-50">
                      <th className="py-2 px-2 font-bold text-slate-600 text-left">세부지표</th>
                      <th className="py-2 px-2 font-bold text-orange-500">안전목표</th>
                      <th className="py-2 px-2 font-bold text-orange-500">실적</th>
                      <th className="py-2 px-2 font-bold text-orange-500">사고건수</th>
                    </tr>
                  </thead>
                  <tbody>
                    {airport.rows.map((row, i) => (
                      <tr key={i} className="border-t border-slate-100">
                        <td className="py-2 px-2 text-left text-slate-600">{row.label}</td>
                        <td className="py-2 px-2 text-slate-500">{row.target === 0 ? '0' : row.target.toFixed(3)}</td>
                        <td className={`py-2 px-2 font-bold ${'over' in row && row.over ? 'text-red-500 bg-red-50' : 'text-slate-700'}`}>
                          {row.actual === 0 ? '0' : row.actual.toFixed(3)}
                        </td>
                        <td className="py-2 px-2 text-slate-700 font-bold">{row.count}</td>
                      </tr>
                    ))}
                    <tr className="border-t-2 border-slate-200 bg-slate-50">
                      <td className="py-2 px-2 text-left font-black text-slate-800">소계</td>
                      <td className="py-2 px-2 text-slate-400 font-bold">-</td>
                      <td className="py-2 px-2 font-black text-slate-800">{airport.totalActual.toFixed(3)}</td>
                      <td className="py-2 px-2 font-black text-slate-800">{airport.totalCount}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. 사고의 주요 유형 및 원인 분석 */}
      <section className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="bg-slate-800 py-3.5 px-4 text-center">
          <h2 className="text-[16px] font-bold text-white tracking-tight">사고 주요 유형 및 원인 분석</h2>
        </div>

        <div className="p-5 space-y-6">
          <div className="space-y-3">
            <div className="flex items-center gap-2 mb-1">
              <span className="w-1 h-4 bg-orange-500 rounded-full"></span>
              <h3 className="text-[15px] font-bold text-slate-800">주요 사고 유형</h3>
            </div>

            <div className="grid grid-cols-1 gap-2">
              <div className="flex items-center gap-4 p-3.5 bg-slate-50 rounded-2xl border border-slate-100">
                <Zap className="w-5 h-5 text-orange-600 shrink-0" />
                <div>
                  <p className="text-[15px] font-bold text-slate-800">접촉 및 충돌</p>
                  <p className="text-[12px] text-slate-500">차량 간 추돌, 주기장 내 시설물 충돌</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-3.5 bg-slate-50 rounded-2xl border border-slate-100">
                <Siren className="w-5 h-5 text-red-600 shrink-0" />
                <div>
                  <p className="text-[15px] font-bold text-slate-800">항공기-장비 간 접촉</p>
                  <p className="text-[12px] text-slate-500">견인/급유 중 항공기 날개 및 동체 손상</p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-2 mb-1">
              <span className="w-1 h-4 bg-blue-500 rounded-full"></span>
              <h3 className="text-[15px] font-bold text-slate-800">핵심 원인</h3>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div className="p-3.5 bg-blue-50/50 rounded-2xl border border-blue-100/50 flex flex-col items-center text-center gap-1.5">
                <EyeOff className="w-4 h-4 text-blue-600" />
                <p className="text-[12px] font-bold text-slate-700">사주경계 미흡</p>
              </div>
              <div className="p-3.5 bg-blue-50/50 rounded-2xl border border-blue-100/50 flex flex-col items-center text-center gap-1.5">
                <Octagon className="w-4 h-4 text-red-500" />
                <p className="text-[12px] font-bold text-slate-700">안전수칙 미준수</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. 공항별 사고 현황 */}
      <section className="bg-white p-5 rounded-3xl shadow-sm border border-slate-200">
        <div className="flex items-center gap-1.5 mb-2">
          <Info className="w-4 h-4 text-emerald-600" />
          <h3 className="text-[15px] font-bold text-slate-800">공항별 지상안전사고 발생현황 <span className="text-slate-400 font-normal text-[12px]">('19~'25)</span></h3>
        </div>
        <div className="h-[220px] w-full relative mb-4 pb-2">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={AIRPORT_STATS} cx="50%" cy="50%" innerRadius={55} outerRadius={70} paddingAngle={5} dataKey="count" nameKey="name" stroke="none" label={renderCustomLabel}>
                {AIRPORT_STATS.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={['#3b82f6','#10b981','#f59e0b','#ef4444','#8b5cf6','#6366f1','#ec4899','#14b8a6','#f97316','#84cc16'][index % 10]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none">
            <p className="text-[11px] font-bold text-slate-400 mb-0.5">전체 건수</p>
            <p className="text-2xl font-black text-slate-800">99건</p>
          </div>
        </div>

        {/* 연도별 표 */}
        <div className="border-t border-slate-100 pt-4 overflow-x-auto -mx-1">
          <table className="w-full text-center text-[11px] min-w-[380px]">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="py-2 px-1.5 font-bold text-slate-600 text-left">구분</th>
                {['2019','2020','2021','2022','2023','2024'].map(y => (
                  <th key={y} className="py-2 px-1 font-bold text-slate-500">{y.slice(2)}년</th>
                ))}
                <th className="py-2 px-1 font-bold text-red-500">'25년</th>
                <th className="py-2 px-1.5 font-bold text-slate-700">합계</th>
              </tr>
            </thead>
            <tbody>
              {AIRPORT_STATS.map((row, i) => (
                <tr key={i} className={`border-b border-slate-100 ${i % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'}`}>
                  <td className="py-2 px-1.5 font-bold text-slate-700 text-left">{row.name}</td>
                  {[row.y2019,row.y2020,row.y2021,row.y2022,row.y2023,row.y2024].map((v,j) => (
                    <td key={j} className="py-2 px-1 text-slate-500">{v ? v : '-'}</td>
                  ))}
                  <td className="py-2 px-1 font-bold text-red-500">{row.y2025 ? row.y2025 : '-'}</td>
                  <td className="py-2 px-1.5 font-black text-slate-800">{row.total}</td>
                </tr>
              ))}
              <tr className="border-t-2 border-slate-300 bg-slate-100">
                <td className="py-2 px-1.5 font-black text-slate-800 text-left">합계</td>
                {[7,5,10,15,17,24].map((v,i) => (
                  <td key={i} className="py-2 px-1 font-bold text-slate-600">{v}</td>
                ))}
                <td className="py-2 px-1 font-black text-red-500">21</td>
                <td className="py-2 px-1.5 font-black text-slate-800">99</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default StatsDashboard;
