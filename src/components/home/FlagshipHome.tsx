import React, { useState } from 'react';
import { useClinical } from '../../context/ClinicalContext';
import { CLINICAL_INSTITUTES, RESEARCH_PAPERS, PATIENT_TESTIMONIALS, INITIAL_STAFF_PERSONAS } from '../../data/mockClinicalData';
import { 
  Heart, 
  Brain, 
  Wind, 
  ShieldAlert, 
  Activity, 
  ArrowRight, 
  Award, 
  BookOpen, 
  Users, 
  Stethoscope, 
  Building2, 
  Sparkles, 
  CheckCircle2, 
  ChevronRight,
  Clock,
  PhoneCall,
  Globe2,
  Calendar,
  FileText,
  Search,
  Check,
  Video,
  ExternalLink,
  ShieldCheck,
  Lock,
  UserPlus
} from 'lucide-react';

export const FlagshipHome: React.FC = () => {
  const { 
    setActiveTab, 
    setActiveRole, 
    setIsEmergencyModalOpen, 
    setIsOnboardingModalOpen,
    setIsAppointmentModalOpen,
    setIsAuthModalOpen,
    setAuthMode,
    currentPatient,
    navigateToAdmin
  } = useClinical();

  // Quick symptom checker state in hero
  const [quickSymptom, setQuickSymptom] = useState('');
  const [activeInstituteIdx, setActiveInstituteIdx] = useState(0);

  // Hero interactive heart rate simulator
  const [previewHeartRate, setPreviewHeartRate] = useState(72);

  return (
    <div className="space-y-16 pb-20 bg-slate-50/50">
      
      {/* SECTION 1: 24/7 RAPID LIFELINE EMERGENCY RESPONSE MARQUEE */}
      <div className="bg-red-600 text-white px-4 py-3 shadow-sm">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-3">
            <span className="p-1.5 rounded-md bg-red-700">
              <ShieldAlert className="w-4 h-4 animate-pulse" />
            </span>
            <div>
              <span className="font-extrabold uppercase tracking-wide">
                24/7 Rapid Emergency Response Active:
              </span>
              <span className="ml-2 text-red-100 hidden md:inline">
                Level 1 Trauma Bay open · Direct Helipad Intake · Emergency physician on-call.
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <div className="hidden sm:flex items-center gap-1.5 text-red-100 font-mono text-[11px]">
              <PhoneCall className="w-3.5 h-3.5" />
              <span>Direct Lifeline: +1 (800) 911-CLINIC</span>
            </div>
            <button
              onClick={() => setIsEmergencyModalOpen(true)}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-md bg-white hover:bg-red-50 text-red-700 font-bold text-xs shadow-sm transition-all cursor-pointer"
            >
              <span>10-Second Emergency Triage</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* SECTION 2: LUMINOUS CLINICAL FLAGSHIP HERO */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          <div className="lg:col-span-7 space-y-6">
            
            {/* Architectural Trust Kicker */}
            <div className="flex items-center gap-2 text-xs font-semibold text-teal-800">
              <span className="w-2 h-2 rounded-full bg-teal-600"></span>
              <span>Academic Medical Collective</span>
              <span aria-hidden="true" className="text-slate-300">·</span>
              <span>Joint Commission International (JCI) Gold</span>
              <span aria-hidden="true" className="text-slate-300">·</span>
              <span>SingHealth & Mayo Clinical Standard</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.08]">
              Precision Medicine. <br className="hidden sm:block" />
              <span className="text-teal-700">Immersive Understanding.</span>
            </h1>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl">
              David & Shannon Clinic unites tertiary inpatient care with an open clinical education collective. We reject fragmented hospital bureaucracy in favor of real-time hemodynamic transparency, interactive patient scenarios, and direct two-way physician access.
            </p>

            {/* Quick Action Matrix */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => {
                  setActiveRole('patient');
                  setActiveTab('patient_portal');
                }}
                className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-sm shadow-clinical transition-all cursor-pointer"
              >
                <span>Access Patient Portal</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => setIsAppointmentModalOpen(true)}
                className="flex items-center gap-2 px-5 py-3.5 rounded-xl bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 font-bold text-sm shadow-xs transition-colors cursor-pointer"
              >
                <Calendar className="w-4 h-4 text-teal-600" />
                <span>Book Consultation</span>
              </button>

              <button
                onClick={() => setIsOnboardingModalOpen(true)}
                className="flex items-center gap-2 px-5 py-3.5 rounded-xl bg-teal-50 hover:bg-teal-100 text-teal-900 border border-teal-200/90 font-bold text-sm shadow-xs transition-colors cursor-pointer"
              >
                <UserPlus className="w-4 h-4 text-teal-700" />
                <span>Create Account</span>
              </button>

              <button
                onClick={() => setActiveTab('education')}
                className="flex items-center gap-2 px-4 py-3.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-sm transition-colors cursor-pointer"
              >
                <BookOpen className="w-4 h-4 text-slate-600" />
                <span>Virtual Scenarios</span>
              </button>
            </div>

            {/* Quick Consultation Search & Symptom Bar */}
            <div className="p-3 rounded-xl bg-white border border-slate-200 shadow-clinical flex flex-col sm:flex-row items-center gap-2.5">
              <div className="flex items-center gap-2 flex-1 w-full px-2 text-xs text-slate-500">
                <Search className="w-4 h-4 text-teal-700 shrink-0" />
                <input
                  type="text"
                  placeholder="Need immediate clinical advice? Type symptoms (e.g. palpitations, chest tightness)..."
                  value={quickSymptom}
                  onChange={e => setQuickSymptom(e.target.value)}
                  className="w-full text-slate-800 text-xs focus:outline-none placeholder-slate-400"
                />
              </div>
              <button
                onClick={() => {
                  if (quickSymptom.toLowerCase().includes('chest') || quickSymptom.toLowerCase().includes('heart')) {
                    setActiveTab('institutes');
                  } else {
                    setIsAppointmentModalOpen(true);
                  }
                }}
                className="w-full sm:w-auto px-4 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold whitespace-nowrap transition-colors cursor-pointer"
              >
                Find Specialist
              </button>
            </div>

          </div>

          {/* Right Visual: Luminous Telemetry Glass Card */}
          <div className="lg:col-span-5">
            <div className="rounded-2xl bg-white border border-slate-200 p-6 sm:p-7 shadow-clinical-lg space-y-6 relative overflow-hidden">
              
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div className="flex items-center gap-2.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-teal-600 animate-pulse"></span>
                  <span className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                    Hospital Active Telemetry Stream
                  </span>
                </div>
                <span className="text-[11px] font-mono text-teal-700 font-bold bg-teal-50 px-2 py-0.5 rounded">
                  BED ICU-04 · LIVE
                </span>
              </div>

              {/* Vector ECG Waveform */}
              <div className="rounded-xl bg-slate-900 p-3.5 relative overflow-hidden text-white bg-ecg-grid-dark shadow-inner">
                <div className="flex justify-between text-[10px] font-mono text-slate-400 mb-1">
                  <span>Lead II Continuous Cardiac Strip</span>
                  <span className="text-teal-400 font-bold font-mono">{previewHeartRate} BPM · Sinus Rhythm</span>
                </div>
                <svg viewBox="0 0 400 50" className="w-full h-14" preserveAspectRatio="none">
                  <path
                    d="M0,25 L40,25 L45,23 L48,27 L53,25 L58,25 L61,30 L64,5 L68,45 L72,25 L80,25 L88,20 L96,25 L140,25 L145,23 L148,27 L153,25 L158,25 L161,30 L164,5 L168,45 L172,25 L180,25 L188,20 L196,25 L240,25 L245,23 L248,27 L253,25 L258,25 L261,30 L264,5 L268,45 L272,25 L280,25 L288,20 L296,25 L340,25 L345,23 L348,27 L353,25 L358,25 L361,30 L364,5 L368,45 L372,25 L380,25 L388,20 L396,25 L400,25"
                    fill="none"
                    stroke="#14b8a6"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>

              {/* Live Biometric Telemetry Matrix */}
              <div className="grid grid-cols-3 gap-3 text-xs font-mono tabular-nums">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="text-[10px] text-slate-500 font-sans font-medium">Heart Rate</div>
                  <div className="text-lg font-extrabold text-slate-900">{previewHeartRate} <span className="text-xs font-normal text-slate-500">bpm</span></div>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="text-[10px] text-slate-500 font-sans font-medium">Blood Pressure</div>
                  <div className="text-lg font-extrabold text-teal-800">124/78</div>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="text-[10px] text-slate-500 font-sans font-medium">Oxygen SpO2</div>
                  <div className="text-lg font-extrabold text-sky-700">98%</div>
                </div>
              </div>

              {/* Active Clinical Patient Banner */}
              <div className="p-4 rounded-xl bg-teal-50/70 border border-teal-200/80 text-xs space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900">Active Admitted File: {currentPatient.fullName}</span>
                  <span className="text-[11px] font-mono text-teal-800 font-bold">{currentPatient.mrn}</span>
                </div>
                <p className="text-[11px] text-slate-600">
                  {currentPatient.primaryDiagnosis} · Attending: {currentPatient.assignedDoctorName}
                </p>
                <div className="pt-2 flex justify-between items-center text-[11px]">
                  <span className="text-slate-500 font-mono">Blood: {currentPatient.bloodType}</span>
                  <button
                    onClick={() => {
                      setActiveRole('patient');
                      setActiveTab('patient_portal');
                    }}
                    className="text-teal-800 font-bold hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <span>Open Electronic Health Record</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* SECTION 3: REAL-TIME HOSPITAL CLINICAL PULSE & ACUTE TELEMETRY */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl bg-white border border-slate-200 p-6 sm:p-8 shadow-clinical">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 divide-y sm:divide-y-0 sm:divide-x divide-slate-100">
            <div className="pt-2 sm:pt-0 sm:pr-4">
              <div className="text-xs text-slate-500 font-semibold uppercase tracking-wider mb-1">
                Active Hospital Capacity
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-mono tabular-nums">
                342 <span className="text-sm font-normal text-slate-500">/ 360 Beds</span>
              </div>
              <div className="text-xs text-teal-700 mt-1 font-medium flex items-center gap-1">
                <Check className="w-3.5 h-3.5" /> 95.0% Occupancy (Optimal tertiary pacing)
              </div>
            </div>

            <div className="pt-4 sm:pt-0 sm:px-4">
              <div className="text-xs text-slate-500 font-semibold uppercase tracking-wider mb-1">
                Cath Lab Door-to-Balloon
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold text-teal-800 font-mono tabular-nums">
                52 <span className="text-sm font-normal text-slate-500">Minutes</span>
              </div>
              <div className="text-xs text-slate-500 mt-1">
                AHA / ESC Standard: &lt; 90 min (38m faster)
              </div>
            </div>

            <div className="pt-4 sm:pt-0 sm:px-4">
              <div className="text-xs text-slate-500 font-semibold uppercase tracking-wider mb-1">
                Stroke Door-to-Needle
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold text-teal-800 font-mono tabular-nums">
                32 <span className="text-sm font-normal text-slate-500">Minutes</span>
              </div>
              <div className="text-xs text-slate-500 mt-1">
                AHA Target: &lt; 60 min (Tenecteplase protocol)
              </div>
            </div>

            <div className="pt-4 sm:pt-0 sm:pl-4">
              <div className="text-xs text-slate-500 font-semibold uppercase tracking-wider mb-1">
                Trauma Bay Arrival Standard
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-mono tabular-nums">
                &lt; 4 <span className="text-sm font-normal text-slate-500">Minutes</span>
              </div>
              <div className="text-xs text-slate-500 mt-1">
                Full trauma surgical cohort bedside readiness
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: THE FOUNDING COLLECTIVE ETHOS & STORY */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-slate-900 text-white p-8 sm:p-12 shadow-clinical-lg relative overflow-hidden">
          <div className="max-w-3xl space-y-5">
            <div className="text-xs font-mono font-bold text-teal-400 uppercase tracking-wider flex items-center gap-2">
              <Users className="w-4 h-4" />
              <span>The Founding Student-Physician Collective</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight">
              Bridging Future, Present, and Past: How a Cohort of Medical Students Reimagined Hospital Care
            </h2>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              When clinical students David, Shannon, and their peers conducted bedside hospital rotations, they noticed that traditional healthcare portals were built exclusively for insurance billing codes rather than patient human understanding. Patients left with anxiety, misunderstood prescriptions, and zero visibility into their own physiology.
            </p>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Together with senior clinical faculty, they established David & Shannon Clinic — a hospital where interactive biological simulations, continuous telemetry, and transparent two-way physician dialogue replace opaque medical paperwork.
            </p>

            <div className="pt-4 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-semibold">
              <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700/80 space-y-1">
                <div className="text-teal-400 font-bold">01. Total Transparency</div>
                <p className="text-slate-300 font-normal leading-relaxed">Real-time ECG waveforms, lab reference ranges, and itemized billing statements.</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700/80 space-y-1">
                <div className="text-teal-400 font-bold">02. Interactive Education</div>
                <p className="text-slate-300 font-normal leading-relaxed">Virtual patient decision scenarios for patients, students, and caregivers alike.</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700/80 space-y-1">
                <div className="text-teal-400 font-bold">03. 24/7 Lifeline Triage</div>
                <p className="text-slate-300 font-normal leading-relaxed">Immediate 10-second rapid intake connecting field EMS to attending surgeons.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5: SPECIALIZED CLINICAL INSTITUTES OF EXCELLENCE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="text-xs font-semibold text-teal-800 uppercase tracking-wider mb-1">
              Institutes & Surgical Centers
            </div>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              Tertiary Institutes of Excellence
            </h2>
          </div>

          <button
            onClick={() => setActiveTab('institutes')}
            className="text-xs text-teal-800 hover:underline font-bold flex items-center gap-1.5 cursor-pointer"
          >
            <span>View All Institutes & Procedure Fee Ledgers</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {CLINICAL_INSTITUTES.slice(0, 3).map(inst => (
            <div
              key={inst.id}
              className="rounded-2xl bg-white border border-slate-200 p-6 flex flex-col justify-between shadow-clinical hover:shadow-clinical-lg hover:border-teal-500/50 transition-all space-y-6"
            >
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-teal-50 border border-teal-200 text-teal-700 flex items-center justify-center font-bold text-sm">
                  {inst.departmentCode.slice(0, 2).toUpperCase()}
                </div>

                <h3 className="text-lg font-bold text-slate-900">
                  {inst.name}
                </h3>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {inst.tagline}
                </p>

                <div className="pt-2 border-t border-slate-100 text-xs text-slate-500">
                  <div>Director: <strong className="text-slate-800">{inst.directorName}</strong></div>
                  <div className="text-teal-700 font-mono text-[11px] mt-1 font-semibold">
                    {inst.clinicalMetrics[0].label}: {inst.clinicalMetrics[0].stat}
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <button
                  onClick={() => setIsAppointmentModalOpen(true)}
                  className="text-xs text-teal-700 hover:text-teal-900 font-bold flex items-center gap-1 cursor-pointer"
                >
                  Schedule Consult
                </button>
                <button
                  onClick={() => setActiveTab('institutes')}
                  className="text-xs text-slate-500 hover:text-slate-900 font-medium"
                >
                  Explore →
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 6: INTERACTIVE SIMULATION SANDBOX PREVIEW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-slate-900 text-white p-8 sm:p-12 shadow-clinical-lg">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-6 space-y-4">
              <div className="text-xs font-mono font-bold text-teal-400 uppercase tracking-wider flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                <span>Bedside Physiological Sandbox</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                Live Organ Hemodynamics: Cardiac Output & Stroke Volume
              </h2>

              <p className="text-sm text-slate-300 leading-relaxed">
                Interact with the clinical parameters below. Watch how chronotropic heart rate modulation changes computed cardiac output in real-time according to the Frank-Starling mechanism.
              </p>

              {/* Slider widget */}
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-300 font-semibold">Heart Rate Parameter:</span>
                  <span className="font-mono text-teal-400 font-bold tabular-nums">{previewHeartRate} BPM</span>
                </div>
                <input
                  type="range"
                  min="45"
                  max="160"
                  value={previewHeartRate}
                  onChange={e => setPreviewHeartRate(Number(e.target.value))}
                  className="w-full accent-teal-400 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                  <span>Bradycardia (45)</span>
                  <span>Resting (72)</span>
                  <span>Tachycardia (160)</span>
                </div>
                <div className="pt-2 border-t border-slate-800 flex justify-between text-xs font-mono">
                  <span className="text-slate-400">Calculated Cardiac Output:</span>
                  <span className="text-teal-300 font-bold">{((previewHeartRate * 70) / 1000).toFixed(2)} L/min</span>
                </div>
              </div>

              <button
                onClick={() => setActiveTab('education')}
                className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs transition-colors cursor-pointer"
              >
                <span>Launch Full Simulation Suite (Cardio, Pulmonary, Neuro)</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Visual Vector Heart Animation */}
            <div className="lg:col-span-6 flex flex-col items-center justify-center">
              <div className="relative w-48 h-48 flex items-center justify-center">
                <div 
                  className="absolute inset-0 rounded-full bg-teal-500/10 blur-xl transition-all"
                  style={{ transform: `scale(${1 + (previewHeartRate / 200)})` }}
                />
                <svg 
                  viewBox="0 0 100 100" 
                  className="w-40 h-40 text-teal-400 drop-shadow-[0_0_20px_rgba(20,184,166,0.3)] transition-transform"
                  style={{
                    animation: `heartbeat ${60 / previewHeartRate}s ease-in-out infinite`
                  }}
                >
                  <path
                    fill="currentColor"
                    d="M50 88.5C50 88.5 12 62.5 12 36C12 21.5 23.5 10 38 10C45.5 10 50 15 50 15C50 15 54.5 10 62 10C76.5 10 88 21.5 88 36C88 62.5 50 88.5 50 88.5Z"
                  />
                  <circle cx="36" cy="40" r="8" fill="#070d14" opacity="0.6" />
                  <circle cx="64" cy="40" r="8" fill="#070d14" opacity="0.6" />
                  <path d="M48 30 L52 30 L52 70 L48 70 Z" fill="#070d14" opacity="0.5" />
                </svg>
              </div>
              <div className="text-[11px] text-slate-400 font-mono mt-3">
                Contractile cadence synchronized to {previewHeartRate} bpm
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 7: VIRTUAL PATIENT CLINICAL SCENARIOS SPOTLIGHT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="border-b border-slate-200 pb-4 flex flex-col sm:flex-row sm:items-end justify-between gap-2">
          <div>
            <div className="text-xs font-semibold text-teal-800 uppercase tracking-wider mb-1">
              Case-Based Medical Education
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Interactive Virtual Patient Decision Trees
            </h2>
          </div>
          <button
            onClick={() => setActiveTab('education')}
            className="text-xs text-teal-800 hover:underline font-bold flex items-center gap-1"
          >
            <span>Enter Case Simulation Lab</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="rounded-2xl bg-white border border-slate-200 p-6 shadow-clinical space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-red-600 bg-red-50 px-2.5 py-1 rounded">
                ACUTE CARDIOVASCULAR CASE
              </span>
              <span className="text-xs text-slate-500">Residency Level</span>
            </div>

            <h3 className="text-lg font-bold text-slate-900">
              Acute Inferior STEMI with Right Ventricular Extension
            </h3>

            <p className="text-xs text-slate-600 leading-relaxed">
              56-year-old male with 45 minutes of crushing retrosternal pressure. Triage Lead II, III, and aVF ST-segment elevation. Navigate the crucial 90-minute door-to-balloon PCI window.
            </p>

            <div className="pt-2 flex justify-between items-center text-xs">
              <span className="font-mono text-slate-500">Initial Vitals: HR 104 · BP 158/96</span>
              <button
                onClick={() => setActiveTab('education')}
                className="px-4 py-2 rounded-lg bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs transition-colors cursor-pointer"
              >
                Triage Case →
              </button>
            </div>
          </div>

          <div className="rounded-2xl bg-white border border-slate-200 p-6 shadow-clinical space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded">
                NEURO-VASCULAR STROKE CASE
              </span>
              <span className="text-xs text-slate-500">Intermediate Acuity</span>
            </div>

            <h3 className="text-lg font-bold text-slate-900">
              Acute Ischemic Stroke within the 4.5-Hour Thrombolytic Window
            </h3>

            <p className="text-xs text-slate-600 leading-relaxed">
              69-year-old female presenting with sudden right-sided hemiparesis and expressive aphasia. Synthesize non-contrast CT results and administer Tenecteplase before irreversible penumbra death.
            </p>

            <div className="pt-2 flex justify-between items-center text-xs">
              <span className="font-mono text-slate-500">NIHSS Score: 14 · BP 172/102</span>
              <button
                onClick={() => setActiveTab('education')}
                className="px-4 py-2 rounded-lg bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs transition-colors cursor-pointer"
              >
                Triage Case →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 8: DISTINGUISHED ATTENDING CLINICIANS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-slate-200 pb-4">
          <div>
            <div className="text-xs font-semibold text-teal-800 uppercase tracking-wider mb-1">
              Physician Leadership
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              World-Class Attending Faculty
            </h2>
          </div>
          <button
            onClick={() => setIsAppointmentModalOpen(true)}
            className="text-xs text-teal-800 hover:underline font-bold"
          >
            Schedule Consultation with Faculty
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {INITIAL_STAFF_PERSONAS.slice(0, 4).map(doc => (
            <div
              key={doc.id}
              className="rounded-2xl bg-white border border-slate-200 p-5 shadow-clinical flex flex-col justify-between space-y-4 hover:border-slate-300 transition-colors"
            >
              <div className="space-y-3">
                <div className="w-14 h-14 rounded-2xl bg-teal-50 border border-teal-200 flex items-center justify-center text-teal-800 font-bold font-mono text-lg">
                  {doc.avatarInitials}
                </div>

                <div>
                  <h3 className="text-base font-bold text-slate-900 leading-tight">
                    {doc.name}
                  </h3>
                  <div className="text-xs text-teal-700 font-medium mt-0.5">
                    {doc.role}
                  </div>
                </div>

                <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                  {doc.bio}
                </p>

                <div className="text-[11px] text-slate-500 font-mono">
                  {doc.credentials.split('·')[0]}
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <button
                  onClick={() => setIsAppointmentModalOpen(true)}
                  className="text-xs text-teal-700 hover:text-teal-900 font-bold cursor-pointer"
                >
                  Book Consult
                </button>
                <span className="text-[10px] text-slate-400 font-mono">In-Clinic & Video</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 9: PEER-REVIEWED RESEARCH & CLINICAL PAPERS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="rounded-2xl bg-white border border-slate-200 p-6 sm:p-8 shadow-clinical space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-100">
            <div>
              <div className="text-xs font-semibold text-teal-800 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                <Award className="w-4 h-4 text-teal-700" />
                <span>Peer-Reviewed Clinical Science</span>
              </div>
              <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                Academic Research & Clinical Registry Publications
              </h2>
            </div>
            <span className="text-xs font-mono text-slate-500">
              Published in NEJM · Lancet · Nature Medicine
            </span>
          </div>

          <div className="space-y-4">
            {RESEARCH_PAPERS.map(paper => (
              <div key={paper.id} className="p-5 rounded-xl bg-slate-50/70 border border-slate-200 space-y-2">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <span className="text-xs font-bold text-teal-900 font-mono">{paper.journal} ({paper.year})</span>
                  <span className="text-[11px] font-mono text-slate-400">DOI: {paper.doi}</span>
                </div>

                <h3 className="text-sm font-bold text-slate-900 leading-snug">
                  {paper.title}
                </h3>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {paper.abstract}
                </p>

                <div className="pt-2 border-t border-slate-200/80 flex items-center justify-between text-xs">
                  <span className="text-slate-500 font-mono text-[11px]">Authors: {paper.authors}</span>
                  <span className="text-teal-800 font-bold font-mono text-[11px]">Impact: {paper.keyFinding}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 10: PATIENT RECOVERY CASE STUDIES & OUTCOMES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="text-xs font-semibold text-teal-800 uppercase tracking-wider mb-1">
          Evidence-Based Recovery
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Documented Patient Journeys & Measurable Outcomes
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PATIENT_TESTIMONIALS.map(test => (
            <div key={test.id} className="rounded-2xl bg-white border border-slate-200 p-6 shadow-clinical space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="text-xs font-mono font-bold text-teal-800 bg-teal-50 px-2 py-0.5 rounded inline-block">
                  {test.condition}
                </div>

                <p className="text-xs text-slate-700 leading-relaxed italic">
                  "{test.quote}"
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 text-xs space-y-1">
                <div className="font-bold text-slate-900">{test.patientName}, {test.age} yo</div>
                <div className="text-teal-800 font-medium text-[11px]">{test.recoveryOutcome}</div>
                <div className="text-slate-400 text-[10px] font-mono">Attending: {test.attendingPhysician}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 11: GLOBAL ACCREDITATION & ETHICAL CHARTER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-teal-900 text-white p-8 sm:p-12 shadow-clinical space-y-6">
          <div className="max-w-3xl space-y-3">
            <div className="text-xs font-mono font-bold text-teal-300 uppercase tracking-wider">
              Institutional Accreditation
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              International Healthcare Standards Aligned with the World's Leading Medical Centers
            </h2>
            <p className="text-sm text-teal-100 leading-relaxed">
              David & Shannon Clinic operates under strict ISO 15189 clinical laboratory accreditation, Joint Commission International (JCI) gold quality benchmarks, and the Helsinki ethical framework for clinical research.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-teal-800/80 text-xs font-semibold">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-teal-300 shrink-0" />
              <span>JCI Gold Accredited</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-teal-300 shrink-0" />
              <span>ISO 15189 Laboratories</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-teal-300 shrink-0" />
              <span>Magnet Nursing Excellence</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-teal-300 shrink-0" />
              <span>HIPAA Certified Security</span>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 12: COMPREHENSIVE INSTITUTIONAL FOOTER */}
      <footer className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 border-t border-slate-200 text-xs text-slate-500">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-md bg-teal-700 text-white font-bold font-mono text-xs flex items-center justify-center">
                DS
              </div>
              <span className="font-extrabold text-slate-900 text-sm">David & Shannon Clinic</span>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              Academic Medical Hospital, Clinical Research Center & Interactive Biological Simulation Matrix.
            </p>
            <div className="text-[11px] text-slate-400 font-mono">
              24/7 Acute Helpline: +1 (800) 911-CLINIC
            </div>
          </div>

          <div>
            <div className="font-bold text-slate-900 mb-3 uppercase tracking-wider text-[11px]">
              Specialized Institutes
            </div>
            <ul className="space-y-2 text-xs">
              <li><button onClick={() => setActiveTab('institutes')} className="hover:text-slate-900">Cardiovascular Institute & Cath Lab</button></li>
              <li><button onClick={() => setActiveTab('institutes')} className="hover:text-slate-900">Comprehensive Stroke Center</button></li>
              <li><button onClick={() => setActiveTab('institutes')} className="hover:text-slate-900">Precision Oncology & Genomics</button></li>
              <li><button onClick={() => setActiveTab('institutes')} className="hover:text-slate-900">Pulmonary & Critical Care</button></li>
              <li><button onClick={() => setActiveTab('institutes')} className="hover:text-slate-900">Level 1 Emergency Trauma</button></li>
            </ul>
          </div>

          <div>
            <div className="font-bold text-slate-900 mb-3 uppercase tracking-wider text-[11px]">
              Patient Services & Portals
            </div>
            <ul className="space-y-2 text-xs">
              <li><button onClick={() => { setActiveRole('patient'); setActiveTab('patient_portal'); }} className="hover:text-slate-900">Electronic Health Record (EHR)</button></li>
              <li><button onClick={() => setIsAppointmentModalOpen(true)} className="hover:text-slate-900">Schedule In-Clinic or Video Consult</button></li>
              <li><button onClick={() => setIsEmergencyModalOpen(true)} className="hover:text-red-600 font-semibold">24/7 Rapid Emergency Intake</button></li>
              <li><button onClick={() => { setAuthMode('sign_in'); setIsAuthModalOpen(true); }} className="hover:text-slate-900">Patient Sign In / MRN Key</button></li>
              <li><button onClick={() => setIsOnboardingModalOpen(true)} className="hover:text-slate-900">Register New Patient File</button></li>
            </ul>
          </div>

          <div>
            <div className="font-bold text-slate-900 mb-3 uppercase tracking-wider text-[11px]">
              Institutional Governance
            </div>
            <ul className="space-y-2 text-xs">
              <li><button onClick={() => setActiveTab('education')} className="hover:text-slate-900">Virtual Simulation Lab</button></li>
              <li><button onClick={() => setActiveTab('institutes')} className="hover:text-slate-900">Clinical Research Registry</button></li>
              <li><span className="text-slate-400">Institutional Ethics & Medical Board</span></li>
              <li><span className="text-slate-400">Main Campus: 400 Medical Academic Way</span></li>
              <li><span className="text-slate-400">Accredited by Joint Commission International</span></li>
            </ul>
          </div>
        </div>

        <div className="pt-6 pb-12 border-t border-slate-200 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <div>
            © {new Date().getFullYear()} David & Shannon Clinic. Dedicated to student-led clinical empowerment and evidence-based patient transparency.
          </div>
          <div className="flex items-center gap-4">
            <span className="hover:text-slate-800">Privacy & HIPAA Policy</span>
            <span aria-hidden="true">·</span>
            <span className="hover:text-slate-800">Patient Rights Charter</span>
            <span aria-hidden="true">·</span>
            <span className="hover:text-slate-800">Laboratory Quality Standards</span>
            <span aria-hidden="true">·</span>
            <button 
              onClick={() => navigateToAdmin()} 
              className="text-slate-400 hover:text-slate-700 transition-colors flex items-center gap-1 cursor-pointer"
              title="Restricted Staff Portal (/admin)"
            >
              <Lock className="w-3 h-3 text-slate-400" />
              <span>Staff (/admin)</span>
            </button>
          </div>
        </div>
      </footer>

    </div>
  );
};
