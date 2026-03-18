
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
              <YAxis yAxisId="left" hide domain={[300000, 1000000]} />
              <YAxis yAxisId="right" orientation="right" hide domain={[0, 55]} />
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
              <Bar yAxisId="left" dataKey="flights" name="운항횟수" barSize={32} radius={[4, 4, 0, 0]} legendType="rect">
                {YEARLY_STATS.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.year === "'25*" ? '#fecaca' : '#e2e8f0'} />
                ))}
              </Bar>
              <Line yAxisId="right" type="monotone" dataKey="accidents" name="발생건수" stroke="#ef4444" strokeWidth={2} dot={{ r: 4, fill: '#ef4444', strokeWidth: 1, stroke: '#fff' }} legendType="circle">
                <LabelList dataKey="accidents" position="top" offset={12} style={{ fill: '#ef4444', fontSize: 13, fontWeight: 900 }} />
              </Line>
              <Line yAxisId="right" type="monotone" dataKey="rate" name="환산건수" stroke="#f97316" strokeWidth={2} dot={{ r: 3, fill: '#f97316', strokeWidth: 1, stroke: '#fff' }} legendType="circle">
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
            <table className="w-full text-center text-[11.5px]">
              <thead>
                <tr className="bg-orange-50">
                  <th className="py-2 px-1.5 font-bold text-slate-600 text-left w-[38%]">세부지표</th>
                  <th className="py-2 px-1 font-bold text-orange-500 w-[18%]">안전목표</th>
                  <th className="py-2 px-1 font-bold text-orange-500 w-[28%]">실적</th>
                  <th className="py-2 px-1 font-bold text-orange-500 w-[16%]">사고건수</th>
                </tr>
              </thead>
              <tbody>
                {overallGoals.map((row, i) => {
                  const rate = row.actual > 0 && row.target > 0 ? (row.actual / row.target * 100).toFixed(1) : null;
                  return (
                    <tr key={i} className="border-t border-slate-100">
                      <td className="py-2 px-1.5 text-left text-slate-600">{row.label}</td>
                      <td className="py-2 px-1 text-slate-500">{row.target === 0 ? '0' : row.target.toFixed(3)}</td>
                      <td className="py-2 px-1 text-slate-700">
                        {row.actual === 0 ? '0' : row.actual.toFixed(3)}
                        {rate && <span className="text-slate-400 ml-0.5">({rate}%)</span>}
                      </td>
                      <td className="py-2 px-1 text-slate-700">{row.count}</td>
                    </tr>
                  );
                })}
                <tr className="border-t-2 border-slate-200 bg-slate-50">
                  <td className="py-2 px-1.5 text-left font-black text-slate-800">전사 합계</td>
                  <td className="py-2 px-1 text-slate-400">-</td>
                  <td className="py-2 px-1 font-black text-slate-800">0.230</td>
                  <td className="py-2 px-1 font-black text-slate-800">21</td>
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
                <table className="w-full text-center text-[11.5px]">
                  <thead>
                    <tr className="bg-orange-50">
                      <th className="py-2 px-1.5 font-bold text-slate-600 text-left w-[38%]">세부지표</th>
                      <th className="py-2 px-1 font-bold text-orange-500 w-[18%]">안전목표</th>
                      <th className="py-2 px-1 font-bold text-orange-500 w-[28%]">실적</th>
                      <th className="py-2 px-1 font-bold text-orange-500 w-[16%]">사고건수</th>
                    </tr>
                  </thead>
                  <tbody>
                    {airport.rows.map((row, i) => {
                      const rate = row.actual > 0 && row.target > 0 ? (row.actual / row.target * 100).toFixed(1) : null;
                      const isOver = 'over' in row && row.over;
                      return (
                        <tr key={i} className="border-t border-slate-100">
                          <td className="py-2 px-1.5 text-left text-slate-600">{row.label}</td>
                          <td className="py-2 px-1 text-slate-500">{row.target === 0 ? '0' : row.target.toFixed(3)}</td>
                          <td className={`py-2 px-1 ${isOver ? 'text-red-500 bg-red-50' : 'text-slate-700'}`}>
                            {row.actual === 0 ? '0' : row.actual.toFixed(3)}
                            {rate && <span className={`ml-0.5 ${isOver ? 'text-red-400' : 'text-slate-400'}`}>({rate}%)</span>}
                          </td>
                          <td className="py-2 px-1 text-slate-700">{row.count}</td>
                        </tr>
                      );
                    })}
                    <tr className="border-t-2 border-slate-200 bg-slate-50">
                      <td className="py-2 px-1.5 text-left font-black text-slate-800">소계</td>
                      <td className="py-2 px-1 text-slate-400">-</td>
                      <td className="py-2 px-1 font-black text-slate-800">{airport.totalActual.toFixed(3)}</td>
                      <td className="py-2 px-1 font-black text-slate-800">{airport.totalCount}</td>
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
                <p className="text-[14px] font-bold text-slate-700">작업자 부주의</p>
              </div>
              <div className="p-3.5 bg-blue-50/50 rounded-2xl border border-blue-100/50 flex flex-col items-center text-center gap-1.5">
                <Octagon className="w-4 h-4 text-red-500" />
                <p className="text-[14px] font-bold text-slate-700">안전수칙 미준수</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. 공항별 사고 현황 */}
      <section className="bg-white p-5 rounded-3xl shadow-sm border border-slate-200">
        <div className="flex items-center gap-1.5 mb-2">
          <Info className="w-4 h-4 text-emerald-600" />
          <h3 className="text-[15px] font-bold text-slate-800">공항별 지상안전사고 발생현황 <span className="text-slate-400 font-normal text-[12px]">('20~'25)</span></h3>
        </div>
        <div className="h-[220px] w-full relative mb-4 pb-2">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={AIRPORT_STATS} cx="50%" cy="50%" innerRadius={55} outerRadius={70} paddingAngle={5} dataKey="count" nameKey="name" stroke="none" label={(props) => {
                const { cx, cy, midAngle, outerRadius, name, count, percentage } = props;
                const RADIAN = Math.PI / 180;
                const radius = outerRadius + 22;
                const x = cx + radius * Math.cos(-midAngle * RADIAN);
                const y = cy + radius * Math.sin(-midAngle * RADIAN);
                const major = ['김포','인천','김해','제주'].includes(name);
                return (
                  <text x={x} y={y} fill="#475569" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
                    <tspan x={x} dy="-0.2em" fontSize={major ? 13 : 11} fontWeight="700">{name}</tspan>
                    <tspan x={x} dy="1.2em" fill="#3b82f6" fontSize={major ? 11 : 10}>{`${count}건(${percentage}%)`}</tspan>
                  </text>
                );
              }}>
                {AIRPORT_STATS.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={['#3b82f6','#10b981','#f59e0b','#ef4444','#8b5cf6','#6366f1','#ec4899','#14b8a6','#f97316','#84cc16'][index % 10]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none">
            <p className="text-2xl font-black text-slate-800">139건</p>
          </div>
        </div>

        {/* 연도별 표 */}
        <div className="border-t border-slate-100 pt-4 overflow-x-auto -mx-1">
          <table className="w-full text-center text-[12px] min-w-[360px]">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="py-2 px-1.5 font-bold text-slate-600 text-left">구분</th>
                {['2020','2021','2022','2023','2024'].map(y => (
                  <th key={y} className="py-2 px-1 font-bold text-slate-500">{y.slice(2)}년</th>
                ))}
                <th className="py-2 px-1 font-bold text-red-500">'25년</th>
                <th className="py-2 px-1.5 font-bold text-slate-700">합계</th>
              </tr>
            </thead>
            <tbody>
              {[...AIRPORT_STATS.filter(r => r.total! > 0)].sort((a,b) => (b.total||0)-(a.total||0)).map((row, i) => (
                <tr key={i} className={`border-b border-slate-100 ${i % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'}`}>
                  <td className="py-2 px-1.5 font-bold text-slate-700 text-left">{row.name}</td>
                  {[row.y2020,row.y2021,row.y2022,row.y2023,row.y2024].map((v,j) => (
                    <td key={j} className="py-2 px-1 text-slate-500">{v ? v : '-'}</td>
                  ))}
                  <td className="py-2 px-1 font-bold text-red-500">{row.y2025 ? row.y2025 : '-'}</td>
                  <td className="py-2 px-1.5 font-black text-slate-800">{row.total}</td>
                </tr>
              ))}
              <tr className="border-t-2 border-slate-300 bg-slate-100">
                <td className="py-2 px-1.5 font-black text-slate-800 text-left">합계</td>
                {[14,17,22,29,34].map((v,i) => (
                  <td key={i} className="py-2 px-1 font-bold text-slate-600">{v}</td>
                ))}
                <td className="py-2 px-1 font-black text-red-500">21</td>
                <td className="py-2 px-1.5 font-black text-slate-800">139</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* 사고 분석 요약 */}
        <div className="space-y-10 mt-6">
          <div>
            <h4 className="text-[14px] font-black text-slate-900 flex items-center gap-2 mb-4">
              <span className="w-1 h-4 bg-blue-600 rounded-full"></span>
              사고 주요 유형
            </h4>
            <p className="text-[15.5px] text-slate-600 mb-4 leading-relaxed font-semibold">
              사고는 크게 차량/장비 간 접촉, 항공기 접촉, 조업자 상해로 나뉩니다.
            </p>
            <div className="space-y-4">
              {[
                { title: "차량 및 시설물 접촉", desc: "차량 간 추돌이나 주기장 내 시설물과의 충돌입니다. 특히 탑승교(PBB) 하단부 통과 시 높이 제한을 인지하지 못해 발생하는 충돌 사례가 빈번합니다." },
                { title: "항공기 접촉", desc: "견인 중인 장비(달리 등)의 결박 해제, 급유차 후진 중 날개 접촉, 토잉(Towing) 중 탑승교와의 접촉 등으로 인해 항공기 엔진이나 기체가 손상되는 경우입니다." },
                { title: "조업자 인적 상해", desc: "작업 중 발생하는 부상 사고입니다.", sub: ["낙상: 로더(Loader)나 사다리 작업 중 발을 헛딛어 지면으로 추락.", "끼임/충돌: 터그카 운전자가 주변 조업자를 보지 못하고 출발하여 달리 사이에 끼거나, 주행 중인 버스가 작업 중인 윙 가드(Wing Guard)와 접촉."] },
                { title: "아차 사고", desc: "강풍으로 장비가 밀려 항공기에 접근하거나, Push-back 중 타 항공기 침범을 발견하여 멈추는 사고 등" }
              ].map((item, i) => (
                <div key={i} className="bg-slate-50/70 p-4 rounded-2xl border border-slate-100 flex flex-col gap-1.5">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-slate-300 rounded-full"></span>
                    <span className="text-[16px] font-bold text-slate-800 tracking-tight">{item.title}</span>
                  </div>
                  <p className="text-[15px] text-slate-500 leading-relaxed font-medium pl-3.5">{item.desc}</p>
                  {item.sub && (
                    <div className="mt-1 pl-3.5 space-y-1.5">
                      {item.sub.map((s, j) => (
                        <div key={j} className="flex items-start gap-2">
                          <span className="text-slate-300 mt-0.5">•</span>
                          <span className="text-[14.5px] text-slate-500/80 font-medium leading-relaxed">{s}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-[14px] font-black text-slate-900 flex items-center gap-2 mb-4">
              <span className="w-1 h-4 bg-orange-500 rounded-full"></span>
              사고 발생 원인
            </h4>
            <p className="text-[15.5px] text-slate-600 mb-4 leading-relaxed font-semibold">
              지상안전사고의 대부분은 인적 요인에 의해 발생하며, 특히 2024년 발생한 24건은 모두 운전자 부주의로 인한 차량 사고였습니다.
            </p>
            <div className="grid grid-cols-1 gap-2.5">
              {[
                { title: "운전자 부주의 및 집중력 저하", desc: "운전 미숙, 전방 주시 태만, 안일함 등이 주요 원인입니다." },
                { title: "사주경계 및 지적확인 미흡", desc: "출발 전 주변 확인을 소홀히 하거나, 교차로 및 유도로 진입 전 일단정지 규정을 준수하지 않는 경우입니다." },
                { title: "안전 수칙 및 절차 미준수", desc: "고소장비의 통과 높이 제한 무시, 안전거리 미확보, 유도자 없이 후진 접현을 시도하는 등의 행위가 사고를 유발합니다." },
                { title: "조급한 작업 수행", desc: "항공기 지연이나 스케줄 압박으로 인해 서둘러 조업하다가 발생하는 사고가 많습니다." },
                { title: "환경적 요인", desc: "강풍으로 인해 결박되지 않은 비동력 장비가 이동하거나, 빗물로 인해 미끄러운 바닥 노면이 원인이 되기도 합니다." }
              ].map((item, i) => (
                <div key={i} className="flex flex-col gap-1 p-3 bg-white border border-slate-100 rounded-xl shadow-sm">
                  <span className="text-[15.5px] font-bold text-slate-800">• {item.title}</span>
                  <p className="text-[15px] text-slate-500 pl-3 leading-relaxed font-medium">{item.desc}</p>
                </div>
              ))}
            </div>
            <p className="mt-8 pt-6 border-t border-slate-100 text-[15.5px] text-slate-600 leading-relaxed font-bold text-center italic bg-slate-50/50 p-4 rounded-2xl">
              "이러한 사고 분석을 바탕으로 각 공항에서는 사례 전파 교육, 지적확인 캠페인, 시설물 경고 장치 강화 등의 개선 대책을 시행하고 있습니다."
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default StatsDashboard;
