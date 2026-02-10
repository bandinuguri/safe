
import React, { useState, memo } from 'react';
import { Case, CaseType, CaseImage } from '../types';
import { Calendar, AlertCircle, CheckCircle2, Lightbulb, AlignLeft, Image as ImageIcon, Camera, Loader2, X, ZoomIn } from 'lucide-react';

interface CaseCardProps {
  caseData: Case;
  highlight?: string;
}

const CaseCard: React.FC<CaseCardProps> = ({ caseData, highlight = '' }) => {
  const [imgErrors, setImgErrors] = useState<Record<string, boolean>>({});
  const [imgLoaded, setImgLoaded] = useState<Record<string, boolean>>({});
  const [zoomedImage, setZoomedImage] = useState<string | null>(null);
  const isExcellence = caseData.type === CaseType.EXCELLENCE;

  const handleImgError = (url: string) => {
    setImgErrors(prev => ({ ...prev, [url]: true }));
  };

  const handleImgLoad = (url: string) => {
    setImgLoaded(prev => ({ ...prev, [url]: true }));
  };

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

  const displayId = isExcellence ? `예방-${caseData.id}` : `사례-${caseData.id - 100}`;
  const detailImages = caseData.images || (caseData.imageUrl ? [{ url: caseData.imageUrl }] : []);

  const renderImageBlock = (img: CaseImage, idx: number) => (
    <div key={`${img.url}-${idx}`} className="group space-y-2.5">
      <div
        onClick={() => !imgErrors[img.url] && setZoomedImage(img.url)}
        className={`relative rounded-[20px] overflow-hidden border border-slate-100 shadow-sm bg-slate-50 flex items-center justify-center min-h-[160px] transition-all group-hover:border-blue-200 group-hover:shadow-md cursor-zoom-in active:scale-[0.98]`}
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
    </div>
  );

  return (
    <div className={`bg-white rounded-[32px] shadow-sm border overflow-hidden transition-all hover:shadow-xl hover:-translate-y-1 animate-fade-in ${isExcellence ? 'border-emerald-100' : 'border-slate-200'}`}>
      {/* 카드 헤더 */}
      <div className={`px-6 py-4 flex items-center justify-between ${isExcellence ? 'bg-emerald-100/60' : 'bg-slate-100/80 border-b border-slate-200/50'}`}>
        <div className="flex items-center gap-3">
          <span className={`text-[10px] font-black px-2.5 py-1 rounded-lg shadow-sm tracking-tighter ${isExcellence ? 'bg-emerald-500 text-white' : 'bg-slate-800 text-white'}`}>
            {displayId}
          </span>
          <span className={`text-[15px] font-bold tracking-tight ${isExcellence ? 'text-emerald-900' : 'text-slate-800'}`}>
            {shortAirport} · {displayCompany}
          </span>
        </div>
        <div className="flex items-center gap-1.5 text-[12px] font-bold text-slate-400 bg-white/70 px-2.5 py-1.5 rounded-full border border-slate-200/50 shadow-inner">
          <Calendar className="w-3.5 h-3.5" />
          {caseData.date}
        </div>
      </div>

      <div className="p-7">
        <h4 className="text-[20px] font-extrabold text-slate-900 mb-5 leading-[1.45] break-keep tracking-tight">
          {highlightText(caseData.title, highlight)}
        </h4>

        <div className="space-y-5">
          {/* 상세 내용 섹션 */}
          <div className="space-y-2.5">
            <h5 className={`text-[15px] font-black flex items-center gap-2 uppercase tracking-wide ${isExcellence ? 'text-emerald-700' : 'text-slate-800'}`}>
              <AlignLeft className={`w-4 h-4 ${isExcellence ? 'text-emerald-500' : 'text-blue-500'}`} />
              {isExcellence ? '예방 활동 및 성과' : '사고 발생 경위'}
            </h5>
            <div className="bg-slate-50/40 p-6 rounded-[24px] border border-slate-100/80 shadow-inner-sm">
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

          {/* 원인 분석 섹션 */}
          <div className="space-y-2.5">
            <h5 className={`text-[15px] font-black flex items-center gap-2 uppercase tracking-wide ${isExcellence ? 'text-emerald-700' : 'text-slate-800'}`}>
              <span className={`w-1 h-4 rounded-full ${isExcellence ? 'bg-emerald-500' : 'bg-red-500'}`}></span>
              핵심 원인 분석
            </h5>
            <div className="grid grid-cols-1 gap-3.5">
              {caseData.cause.map((c, i) => (
                <div key={i} className="flex items-start gap-4 bg-white p-4 rounded-2xl border border-slate-100 shadow-sm transition-colors hover:border-slate-200">
                  <span className={`mt-0.5 w-6 h-6 flex items-center justify-center rounded-lg text-[12px] font-black shrink-0 ${isExcellence ? 'bg-emerald-100 text-emerald-600' : 'bg-red-50 text-red-500'}`}>
                    {i + 1}
                  </span>
                  <span className="text-[15px] text-slate-700 leading-snug font-semibold pt-0.5">{c}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 대책 섹션 */}
          <div className={`pt-7 border-t-2 border-dashed ${isExcellence ? 'border-emerald-100' : 'border-blue-100'} space-y-4`}>
            <h5 className={`text-[15px] font-black flex items-center gap-2 uppercase tracking-wide ${isExcellence ? 'text-emerald-700' : 'text-blue-600'}`}>
              <Lightbulb className="w-5 h-5" />
              재발방지 대책 및 시사점
            </h5>
            <div className={`p-6 rounded-[28px] shadow-sm border-2 ${isExcellence ? 'bg-emerald-50/40 border-emerald-100/30' : 'bg-blue-50/40 border-blue-100/30'}`}>
              <ul className="space-y-4">
                {caseData.countermeasure.map((m, i) => (
                  <li key={i} className={`text-[15px] leading-relaxed flex items-start gap-3.5 ${isExcellence ? 'text-emerald-900' : 'text-blue-900'} font-bold`}>
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

      {/* 이미지 확대 모달 */}
      {zoomedImage && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/90 backdrop-blur-sm animate-in fade-in duration-300"
          onClick={() => setZoomedImage(null)}
        >
          <button
            className="absolute top-6 right-6 p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors"
            onClick={() => setZoomedImage(null)}
          >
            <X className="w-6 h-6" />
          </button>

          <div className="relative max-w-5xl w-full max-h-[90vh] flex items-center justify-center overflow-hidden rounded-2xl shadow-2xl animate-in zoom-in-95 duration-300">
            <img
              src={zoomedImage}
              alt="확대보기"
              className="max-w-full max-h-[90vh] object-contain"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default memo(CaseCard);
