
import React, { useState, memo } from 'react';
import { Case, CaseType, CaseImage } from '../types';
import { Calendar, AlertCircle, CheckCircle2, Lightbulb, AlignLeft, Loader2, ZoomIn, MapPin } from 'lucide-react';

interface CaseCardProps {
  caseData: Case;
  highlight?: string;
  onImageZoom: (url: string) => void;
}

const CaseCard: React.FC<CaseCardProps> = ({ caseData, highlight = '', onImageZoom }) => {
  const [imgErrors, setImgErrors] = useState<Record<string, boolean>>({});
  const [imgLoaded, setImgLoaded] = useState<Record<string, boolean>>({});
  const isExcellence = caseData.type === CaseType.EXCELLENCE;
  const isAccident25 = caseData.type === CaseType.ACCIDENT25;

  const handleImgError = (url: string) => setImgErrors(prev => ({ ...prev, [url]: true }));
  const handleImgLoad = (url: string) => setImgLoaded(prev => ({ ...prev, [url]: true }));

  const highlightText = (text: string, query: string) => {
    if (!query.trim()) return text;
    const parts = text.split(new RegExp(`(${query})`, 'gi'));
    return (
      <>
        {parts.map((part, i) =>
          part.toLowerCase() === query.toLowerCase() ? (
            <mark key={i} className="bg-yellow-200 text-slate-900 rounded-sm px-0.5">{part}</mark>
          ) : (
            part
          )
        )}
      </>
    );
  };

  const shortAirport = caseData.airport.replace('공항', '');
  const displayCompany = caseData.company.length > 8
    ? `${caseData.company.substring(0, 8)}..`
    : caseData.company;

  let displayId: string;
  if (isExcellence) displayId = `예방-${caseData.id}`;
  else if (isAccident25) displayId = `'25-${caseData.id}`;
  else displayId = `사례-${caseData.id - 100}`;

  const detailImages = caseData.images || (caseData.imageUrl ? [{ url: caseData.imageUrl }] : []);
  const 피해목록 = caseData.피해상황 || caseData.countermeasure || [];

  const renderImageBlock = (img: CaseImage, idx: number) => (
    <div key={`${img.url}-${idx}`} className="group space-y-2.5">
      <div
        onClick={() => !imgErrors[img.url] && onImageZoom(img.url)}
        className="relative rounded-[20px] overflow-hidden border border-slate-100 shadow-sm bg-slate-50 flex items-center justify-center min-h-[160px] transition-all group-hover:border-blue-200 group-hover:shadow-md cursor-zoom-in active:scale-[0.98]"
      >
        {!imgErrors[img.url] && (
          <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/5 transition-colors z-10 flex items-center justify-center opacity-0 group-hover:opacity-100">
            <div className="bg-white/90 p-2 rounded-full shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-transform">
              <ZoomIn className="w-5 h-5 text-slate-700" />
            </div>
          </div>
        )}
        {!imgErrors[img.url] ? (
          <>
            {!imgLoaded[img.url] && (
              <div className="absolute inset-0 flex items-center justify-center bg-slate-50 z-10">
                <Loader2 className="w-6 h-6 text-slate-300 animate-spin" />
              </div>
            )}
            <img
              src={img.url}
              alt={img.label || `이미지 ${idx + 1}`}
              className={`w-full h-auto object-contain block max-h-[600px] transition-opacity duration-500 ${imgLoaded[img.url] ? 'opacity-100' : 'opacity-0'}`}
              loading="lazy"
              onLoad={() => handleImgLoad(img.url)}
              onError={() => handleImgError(img.url)}
            />
          </>
        ) : (
          <div className="py-16 text-center flex flex-col items-center gap-3 w-full bg-slate-50">
            <AlertCircle className="w-10 h-10 text-slate-200" />
            <div className="space-y-1">
              <p className="text-[12px] text-slate-400 font-bold">이미지를 불러올 수 없습니다.</p>
              <p className="text-[10px] text-slate-300 font-medium">네트워크 환경을 확인해주세요.</p>
            </div>
          </div>
        )}
      </div>
      {img.label && (
        <p className="text-center text-[12px] text-slate-400 font-medium">{img.label}</p>
      )}
    </div>
  );

  // 스타일 변수
  const cardBorder = isExcellence ? 'border-emerald-100' : isAccident25 ? 'border-red-100' : 'border-slate-200';
  const headerBg = isExcellence ? 'bg-emerald-100/60' : isAccident25 ? 'bg-red-50/80 border-b border-red-100/50' : 'bg-slate-100/80 border-b border-slate-200/50';
  const badgeBg = isExcellence ? 'bg-emerald-500 text-white' : isAccident25 ? 'bg-red-600 text-white' : 'bg-slate-800 text-white';
  const titleColor = isExcellence ? 'text-emerald-900' : isAccident25 ? 'text-red-900' : 'text-slate-800';
  const sectionLabelColor = isExcellence ? 'text-emerald-700' : isAccident25 ? 'text-red-700' : 'text-slate-800';
  const sectionIconColor = isExcellence ? 'text-emerald-500' : isAccident25 ? 'text-red-400' : 'text-blue-500';
  const causeBarColor = isExcellence ? 'bg-emerald-500' : 'bg-red-500';
  const causeNumBg = isExcellence ? 'bg-emerald-100 text-emerald-600' : 'bg-red-50 text-red-500';
  const bottomBorder = isExcellence ? 'border-emerald-100' : isAccident25 ? 'border-red-100' : 'border-blue-100';
  const bottomTitleColor = isExcellence ? 'text-emerald-700' : isAccident25 ? 'text-red-600' : 'text-blue-600';
  const bottomTextColor = isExcellence ? 'text-emerald-900' : isAccident25 ? 'text-red-900' : 'text-blue-900';

  return (
    <div className={`bg-white rounded-[32px] shadow-sm border overflow-hidden transition-all hover:shadow-xl hover:-translate-y-1 animate-fade-in ${cardBorder}`}>
      {/* 카드 헤더 */}
      <div className={`px-6 py-4 flex items-center justify-between ${headerBg}`}>
        <div className="flex items-center gap-3">
          <span className={`text-[10px] font-black px-2.5 py-1 rounded-lg shadow-sm tracking-tighter ${badgeBg}`}>
            {displayId}
          </span>
          <span className={`text-[15px] font-bold tracking-tight ${titleColor}`}>
            {shortAirport} · {displayCompany}
          </span>
        </div>
        <div className="flex items-center gap-1.5 text-[12px] font-bold text-slate-400 bg-white/70 px-2.5 py-1.5 rounded-full border border-slate-200/50 shadow-inner">
          <Calendar className="w-3.5 h-3.5" />
          {caseData.date}
        </div>
      </div>

      <div className="px-5 py-7">
        <h4 className="text-[20px] font-extrabold text-slate-900 mb-5 leading-[1.45] break-keep tracking-tight">
          {highlightText(caseData.title, highlight)}
        </h4>

        {/* 발생장소 (ACCIDENT25) */}
        {isAccident25 && caseData.location && (
          <div className="inline-flex items-center gap-2 mb-5 text-[13px] font-bold text-red-500 bg-red-50 px-3.5 py-2 rounded-xl">
            <MapPin className="w-3.5 h-3.5 shrink-0" />
            <span>{caseData.location}</span>
          </div>
        )}

        <div className="space-y-5">
          {/* 사고 경위 */}
          <div className="space-y-2.5">
            <h5 className={`text-[15px] font-black flex items-center gap-2 uppercase tracking-wide ${sectionLabelColor}`}>
              <AlignLeft className={`w-4 h-4 ${sectionIconColor}`} />
              {isExcellence ? '예방 활동 및 성과' : '사고 발생 경위'}
            </h5>
            <div className="px-1">
              <p className={`text-[16px] text-slate-600 leading-[1.8] text-justify break-keep font-medium ${detailImages.length > 0 ? 'mb-5' : 'mb-0'}`}>
                {highlightText(caseData.content, highlight)}
              </p>
              {detailImages.length > 0 && (
                <div className="mt-5 space-y-6">
                  {detailImages.map((img, idx) => renderImageBlock(img, idx))}
                </div>
              )}
            </div>
          </div>

          {/* 원인 분석 */}
          <div className="space-y-2.5">
            <h5 className={`text-[15px] font-black flex items-center gap-2 uppercase tracking-wide ${sectionLabelColor}`}>
              <span className={`w-1 h-4 rounded-full ${causeBarColor}`}></span>
              {isAccident25 ? '사고 원인' : '핵심 원인 분석'}
            </h5>
            <div className="grid grid-cols-1 gap-3.5">
              {caseData.cause.map((c, i) => (
                <div key={i} className="flex items-start gap-4 bg-white p-4 rounded-2xl border border-slate-100 shadow-sm transition-colors hover:border-slate-200">
                  <span className={`mt-0.5 w-6 h-6 flex items-center justify-center rounded-lg text-[12px] font-black shrink-0 ${causeNumBg}`}>
                    {i + 1}
                  </span>
                  <span className="text-[15px] text-slate-700 leading-snug font-semibold pt-0.5">{c}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 피해현황 / 재발방지 대책 */}
          <div className={`pt-7 border-t-2 border-dashed ${bottomBorder} space-y-4`}>
            <h5 className={`text-[15px] font-black flex items-center gap-2 uppercase tracking-wide ${bottomTitleColor}`}>
              <Lightbulb className="w-5 h-5" />
              {isAccident25 ? '피해 현황' : '재발방지 대책 및 시사점'}
            </h5>
            <div className="px-1">
              <ul className="space-y-4">
                {피해목록.map((m, i) => (
                  <li key={i} className={`text-[15px] leading-relaxed flex items-start gap-3.5 ${bottomTextColor} font-bold`}>
                    <CheckCircle2 className="w-5 h-5 mt-0.5 shrink-0 opacity-40" />
                    <span className="break-keep">{m}</span>
                  </li>
                ))}
              </ul>

              {caseData.effect && (
                <div className={`mt-6 pt-5 border-t ${isExcellence ? 'border-emerald-200/40 text-emerald-900' : 'border-blue-200/40 text-blue-900'} text-[13px] font-extrabold flex items-center gap-3`}>
                  <span className="px-2.5 py-1 bg-white rounded-lg border-2 border-current shadow-sm text-[11px] uppercase tracking-tighter shrink-0">Key Effect</span>
                  <span className="flex-1 opacity-90">{caseData.effect}</span>
                </div>
              )}
            </div>

            {caseData.footerImages && caseData.footerImages.length > 0 && (
              <div className="mt-8 space-y-6 bg-slate-50/60 p-5 rounded-[24px] border border-slate-100">
                {caseData.footerImages.map((img, idx) => renderImageBlock(img, idx))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(CaseCard);
