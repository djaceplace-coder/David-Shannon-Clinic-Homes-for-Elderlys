import React, { useState } from 'react';
import { X, Image as ImageIcon, Users, Stethoscope, HeartPulse, Sparkles, CheckCircle2, ExternalLink, ShieldCheck } from 'lucide-react';
import { ClinicalImage } from '../common/ClinicalImage';

interface ClinicMediaGalleryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ClinicMediaGalleryModal: React.FC<ClinicMediaGalleryModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [activeImageIdx, setActiveImageIdx] = useState(0);

  if (!isOpen) return null;

  const mediaItems = [
    {
      id: 'team-ecg',
      title: 'Multidisciplinary Clinical Care & Diagnostic Team',
      filename: 'Best ECG Testing Centre in Chandigarh for Accurate Results.jpg',
      src: '/images/Best ECG Testing Centre in Chandigarh for Accurate Results.jpg',
      type: 'team' as const,
      category: 'Medical Faculty & ECG Diagnostic Centre',
      role: 'Founding Collective & Senior Attending Physicians',
      description: 'A 5-physician multidisciplinary team in pristine clinical white coats with stethoscopes and badges, leading collaborative patient rounds across cardiology, neurology, and senior inpatient care.',
      utilizationAreas: [
        'Flagship Home: Hero Section & Founding Physician Collective',
        'Cardiovascular Institute: High-Precision 12-Lead ECG & Telemetry Center',
        'Outpatient Consultation & Emergency Triage Gateway'
      ],
      icon: Users
    },
    {
      id: 'director-vance',
      title: 'Chief Medical Director & Senior Geriatrician',
      filename: 'download (4).jpg',
      src: '/images/download (4).jpg',
      type: 'director' as const,
      category: 'Physician Leadership & Clinical Direction',
      role: 'Dr. Julian Vance, MD, FACC — Director of Clinical Medicine',
      description: 'Distinguished senior physician with wireframe spectacles and white lab coat holding patient medical charts, guiding evidence-based care protocols and patient consultations.',
      utilizationAreas: [
        'Flagship Home: Attending Faculty Leadership Board',
        'Patient Portal: Attending Physician on Electronic Health Record',
        'Specialist Consultation Booking Selector'
      ],
      icon: Stethoscope
    },
    {
      id: 'head-nurse-shannon',
      title: 'Head of Senior Nursing & Compassionate Caregiver',
      filename: 'Nurse in surgical scrub_Nursing inspiration & healthcare career.jpg',
      src: '/images/Nurse in surgical scrub_Nursing inspiration & healthcare career.jpg',
      type: 'nurse' as const,
      category: 'Nursing Excellence & Bedside Care',
      role: 'Shannon Sterling, RN — Senior Clinical Care Lead',
      description: 'Compassionate registered nurse in surgical scrub uniform and bouffant cap with stethoscope, leading 24/7 acute bedside care, postoperative recovery, and elderly resident support.',
      utilizationAreas: [
        'Flagship Home: Nursing Excellence & Senior Care Spotlight',
        'Patient Portal: 24/7 Hospital Front Desk & Nursing Channel',
        'Emergency Rapid Lifeline Intake Assistance'
      ],
      icon: HeartPulse
    }
  ];

  const currentItem = mediaItems[activeImageIdx];
  const CurrentIcon = currentItem.icon;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-150">
      <div className="w-full max-w-4xl max-h-[90vh] rounded-3xl bg-white border border-slate-200 shadow-2xl flex flex-col overflow-hidden text-slate-900">
        
        {/* Modal Header */}
        <div className="bg-slate-50 px-6 py-4 border-b border-slate-200 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <span className="p-2 rounded-xl bg-teal-50 text-teal-700 border border-teal-200">
              <ImageIcon className="w-5 h-5" />
            </span>
            <div>
              <h3 className="text-base font-bold text-slate-900 tracking-tight flex items-center gap-2">
                <span>Hospital Clinical Media & Photography Showcase</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-teal-100 text-teal-800">
                  3 Verified Assets
                </span>
              </h3>
              <p className="text-xs text-slate-500">
                Photography deployed across David & Shannon Clinic and Elderly Living facilities
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          
          {/* Top Selector Tabs */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {mediaItems.map((item, idx) => {
              const Icon = item.icon;
              const isSelected = activeImageIdx === idx;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveImageIdx(idx)}
                  className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer flex items-start gap-3 ${
                    isSelected
                      ? 'bg-teal-50/70 border-teal-500 ring-2 ring-teal-500/20 shadow-sm'
                      : 'bg-slate-50 border-slate-200 hover:bg-slate-100 text-slate-700'
                  }`}
                >
                  <div className={`p-2 rounded-xl shrink-0 ${isSelected ? 'bg-teal-600 text-white' : 'bg-white text-slate-500 border border-slate-200'}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-[11px] font-bold uppercase tracking-wider text-teal-800 truncate">
                      {item.category}
                    </div>
                    <div className="text-xs font-extrabold text-slate-900 truncate">
                      {item.title}
                    </div>
                    <div className="text-[10px] text-slate-500 font-mono truncate mt-0.5">
                      {item.filename}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Image Showcase Box */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center rounded-2xl bg-slate-50 border border-slate-200 p-6">
            
            {/* Visual Canvas */}
            <div className="lg:col-span-6">
              <div className="rounded-2xl overflow-hidden shadow-lg border border-slate-200 bg-white aspect-4/3 relative flex items-center justify-center">
                <ClinicalImage
                  src={currentItem.src}
                  alt={currentItem.title}
                  type={currentItem.type}
                  className="w-full h-full object-cover"
                  showBadge={true}
                  badgeLabel="Active Clinical Asset"
                />
              </div>
            </div>

            {/* Metadata & Deployment Locations */}
            <div className="lg:col-span-6 space-y-4">
              <div className="space-y-1">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-[11px] font-mono font-bold bg-teal-100 text-teal-800">
                  <CurrentIcon className="w-3.5 h-3.5" />
                  <span>{currentItem.category}</span>
                </div>
                <h4 className="text-xl font-extrabold text-slate-900 tracking-tight">
                  {currentItem.title}
                </h4>
                <div className="text-xs font-semibold text-teal-700">
                  {currentItem.role}
                </div>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">
                {currentItem.description}
              </p>

              <div className="space-y-2 pt-2 border-t border-slate-200">
                <div className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">
                  Active Deployment Locations on Platform:
                </div>
                <ul className="space-y-1.5 text-xs text-slate-600">
                  {currentItem.utilizationAreas.map((area, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
                      <span>{area}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-3 rounded-xl bg-white border border-slate-200 text-[11px] text-slate-500 font-mono flex items-center justify-between">
                <span>Source File: {currentItem.filename}</span>
                <span className="text-teal-700 font-bold">100% Integrated</span>
              </div>
            </div>

          </div>

        </div>

        {/* Modal Footer */}
        <div className="bg-slate-50 px-6 py-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <ShieldCheck className="w-4 h-4 text-teal-700" />
            <span>Assets are optimized for high-resolution displays and mobile responsiveness</span>
          </div>

          <button
            onClick={onClose}
            className="w-full sm:w-auto px-5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-colors cursor-pointer"
          >
            Done Viewing
          </button>
        </div>

      </div>
    </div>
  );
};
