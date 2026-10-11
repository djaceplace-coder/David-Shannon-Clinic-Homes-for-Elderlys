import React, { useState } from 'react';
import { Stethoscope, User, Users, HeartPulse, Sparkles, Image as ImageIcon } from 'lucide-react';

export type ClinicalImageType = 'team' | 'director' | 'nurse' | 'facility' | 'general';

interface ClinicalImageProps {
  src: string;
  alt: string;
  type?: ClinicalImageType;
  className?: string;
  containerClassName?: string;
  showBadge?: boolean;
  badgeLabel?: string;
  priority?: boolean;
}

export const ClinicalImage: React.FC<ClinicalImageProps> = ({
  src,
  alt,
  type = 'general',
  className = 'w-full h-full object-cover',
  containerClassName = 'relative overflow-hidden rounded-2xl bg-slate-100',
  showBadge = false,
  badgeLabel,
}) => {
  const [loadFailed, setLoadFailed] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // SVG Fallback representations matching the 3 uploaded images
  const renderFallbackSvg = () => {
    switch (type) {
      case 'team':
        // Multidisciplinary medical doctor cohort (Chandigarh ECG testing / clinical team)
        return (
          <div className="w-full h-full min-h-[220px] flex flex-col items-center justify-center p-6 bg-gradient-to-br from-slate-900 via-teal-950 to-slate-900 text-white relative overflow-hidden select-none">
            {/* Background ECG & bokeh glow */}
            <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#14b8a6_1px,transparent_1px)] [background-size:16px_16px]"></div>
            <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full bg-teal-500/20 blur-2xl"></div>
            <div className="absolute -bottom-12 -left-12 w-48 h-48 rounded-full bg-emerald-500/20 blur-2xl"></div>

            {/* Doctors cohort graphic */}
            <div className="relative z-10 flex items-center justify-center -space-x-3 sm:-space-x-4 mb-4">
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-slate-800/90 border-2 border-teal-400/80 flex items-center justify-center shadow-lg text-teal-300">
                <User className="w-6 h-6 sm:w-7 sm:h-7" />
              </div>
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-teal-800/90 border-2 border-teal-300 flex items-center justify-center shadow-xl text-white transform -translate-y-1">
                <Stethoscope className="w-7 h-7 sm:w-8 sm:h-8" />
              </div>
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-slate-800/90 border-2 border-teal-400 flex items-center justify-center shadow-2xl text-teal-200 transform -translate-y-2 z-10">
                <Users className="w-8 h-8 sm:w-10 sm:h-10 text-teal-300" />
              </div>
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-teal-800/90 border-2 border-teal-300 flex items-center justify-center shadow-xl text-white transform -translate-y-1">
                <HeartPulse className="w-7 h-7 sm:w-8 sm:h-8 text-teal-300" />
              </div>
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-slate-800/90 border-2 border-teal-400/80 flex items-center justify-center shadow-lg text-teal-300">
                <User className="w-6 h-6 sm:w-7 sm:h-7" />
              </div>
            </div>

            <div className="relative z-10 text-center space-y-1">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-500/20 border border-teal-400/30 text-teal-200 text-xs font-semibold tracking-wide">
                <Sparkles className="w-3.5 h-3.5 text-teal-300" />
                <span>Multidisciplinary Medical Care Team</span>
              </div>
              <div className="text-sm sm:text-base font-bold text-white tracking-tight">
                Academic Physician Collective & Advanced Diagnostic Center
              </div>
              <div className="text-[11px] text-teal-200/80 max-w-sm font-mono">
                5 Board-Certified Specialists · Cardiology · Geriatrics · Critical Care
              </div>
            </div>
          </div>
        );

      case 'director':
        // Senior Medical Director (Dr. Julian Vance / Senior Geriatrician with spectacles & clipboard)
        return (
          <div className="w-full h-full min-h-[180px] flex flex-col items-center justify-center p-5 bg-gradient-to-b from-slate-100 via-teal-50/50 to-slate-100 text-slate-800 relative overflow-hidden select-none border border-teal-200/50">
            <div className="w-20 h-20 rounded-full bg-teal-700 text-white flex items-center justify-center shadow-md mb-3 border-2 border-teal-500/30">
              <Stethoscope className="w-10 h-10 text-teal-100" />
            </div>
            <div className="text-center space-y-0.5">
              <div className="text-xs font-mono font-bold text-teal-800 uppercase tracking-wider">
                Chief Medical Director
              </div>
              <div className="text-sm font-extrabold text-slate-900">
                Dr. Julian Vance, MD, FACC
              </div>
              <div className="text-[11px] text-slate-500 font-medium">
                Senior Geriatrician & Clinical Faculty
              </div>
            </div>
          </div>
        );

      case 'nurse':
        // Head Nurse & Senior Care Specialist (Shannon Sterling, RN in surgical scrubs & scrub cap)
        return (
          <div className="w-full h-full min-h-[180px] flex flex-col items-center justify-center p-5 bg-gradient-to-b from-teal-50 via-sky-50/50 to-teal-50 text-slate-800 relative overflow-hidden select-none border border-teal-200/60">
            <div className="w-20 h-20 rounded-full bg-teal-600 text-white flex items-center justify-center shadow-md mb-3 border-2 border-teal-400">
              <HeartPulse className="w-10 h-10 text-teal-50" />
            </div>
            <div className="text-center space-y-0.5">
              <div className="text-xs font-mono font-bold text-teal-800 uppercase tracking-wider">
                Head of Senior Clinical Care
              </div>
              <div className="text-sm font-extrabold text-slate-900">
                Shannon Sterling, RN
              </div>
              <div className="text-[11px] text-slate-600 font-medium">
                24/7 Bedside & Post-Op Recovery
              </div>
            </div>
          </div>
        );

      default:
        return (
          <div className="w-full h-full min-h-[160px] flex flex-col items-center justify-center p-4 bg-slate-100 text-slate-500">
            <ImageIcon className="w-8 h-8 text-slate-400 mb-1" />
            <div className="text-xs font-medium text-slate-600">{alt}</div>
          </div>
        );
    }
  };

  return (
    <div className={containerClassName}>
      {!loadFailed ? (
        <img
          src={src}
          alt={alt}
          referrerPolicy="no-referrer"
          className={`${className} transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-90'}`}
          onLoad={() => setIsLoaded(true)}
          onError={() => setLoadFailed(true)}
        />
      ) : (
        renderFallbackSvg()
      )}

      {showBadge && (
        <div className="absolute top-3 left-3 z-10">
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-slate-900/80 backdrop-blur-md text-white border border-white/20 shadow-sm">
            <Sparkles className="w-3 h-3 text-teal-400" />
            <span>{badgeLabel || 'Verified Hospital Staff'}</span>
          </span>
        </div>
      )}
    </div>
  );
};
