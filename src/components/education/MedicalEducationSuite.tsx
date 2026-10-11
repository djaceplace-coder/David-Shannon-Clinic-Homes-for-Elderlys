import React, { useState } from 'react';
import { VIRTUAL_SCENARIOS } from '../../data/mockClinicalData';
import { VirtualPatientScenario, ScenarioStep } from '../../types/clinical';
import { 
  Heart, 
  Wind, 
  Brain, 
  Activity, 
  CheckCircle2, 
  AlertCircle, 
  RotateCcw, 
  ArrowRight, 
  Award,
  Sparkles,
  Zap,
  BookOpen
} from 'lucide-react';

export const MedicalEducationSuite: React.FC = () => {
  const [activeSystem, setActiveSystem] = useState<'cardio' | 'pulmonary' | 'neuro'>('cardio');

  // Cardiovascular Modulators
  const [heartRate, setHeartRate] = useState(75);
  const [strokeVolume, setStrokeVolume] = useState(70);
  const [arterialPressure, setArterialPressure] = useState(90);

  // Pulmonary Modulators
  const [fiO2, setFiO2] = useState(21);
  const [respRate, setRespRate] = useState(16);
  const [tidalVolume, setTidalVolume] = useState(500);

  // Neuro Modulators
  const [icp, setIcp] = useState(12); // mmHg
  const [map, setMap] = useState(90); // mmHg

  // Virtual Scenario State
  const [selectedScenario, setSelectedScenario] = useState<VirtualPatientScenario>(VIRTUAL_SCENARIOS[0]);
  const [scenarioStepIdx, setScenarioStepIdx] = useState(0);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [scenarioCompleted, setScenarioCompleted] = useState(false);
  const [scoreHistory, setScoreHistory] = useState<boolean[]>([]);

  // Computed hemodynamics
  const cardiacOutput = ((heartRate * strokeVolume) / 1000).toFixed(2); // L/min
  const cardiacIndex = (parseFloat(cardiacOutput) / 1.8).toFixed(2); // L/min/m2
  const minuteVentilation = ((respRate * tidalVolume) / 1000).toFixed(1); // L/min
  const cpp = map - icp; // Cerebral Perfusion Pressure

  const handleScenarioChange = (sc: VirtualPatientScenario) => {
    setSelectedScenario(sc);
    setScenarioStepIdx(0);
    setSelectedOptionId(null);
    setScenarioCompleted(false);
    setScoreHistory([]);
  };

  const currentStep: ScenarioStep | undefined = selectedScenario.steps[scenarioStepIdx];
  const chosenOption = currentStep?.options.find(o => o.id === selectedOptionId);

  const handleDecision = (optId: string) => {
    if (selectedOptionId) return;
    setSelectedOptionId(optId);
    const opt = currentStep?.options.find(o => o.id === optId);
    if (opt) {
      setScoreHistory(prev => [...prev, opt.isOptimal]);
    }
  };

  const handleNextStep = () => {
    if (scenarioStepIdx + 1 < selectedScenario.steps.length) {
      setScenarioStepIdx(prev => prev + 1);
      setSelectedOptionId(null);
    } else {
      setScenarioCompleted(true);
    }
  };

  const handleRestartScenario = () => {
    setScenarioStepIdx(0);
    setSelectedOptionId(null);
    setScenarioCompleted(false);
    setScoreHistory([]);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12 bg-slate-50/40">
      
      {/* Editorial Title Section */}
      <div className="border-b border-slate-200 pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="text-xs font-semibold text-teal-800 uppercase tracking-wider mb-1 flex items-center gap-1.5">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Academic Medical Collective · Interactive Physiology Sandbox</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Human Physiology & Virtual Patient Decision Trees
          </h1>
          <p className="text-sm text-slate-600 mt-1 max-w-3xl">
            Modulate live organ hemodynamics with vector simulation, or triage acute clinical emergencies through branching decision trees calibrated to global hospital guidelines.
          </p>
        </div>

        {/* System Tab Selector */}
        <div className="flex items-center p-1 rounded-xl bg-white border border-slate-200 text-xs shadow-xs">
          <button
            onClick={() => setActiveSystem('cardio')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg font-medium transition-colors cursor-pointer ${
              activeSystem === 'cardio' ? 'bg-teal-600 text-white font-bold' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Heart className="w-3.5 h-3.5" />
            <span>Cardiovascular</span>
          </button>
          <button
            onClick={() => setActiveSystem('pulmonary')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg font-medium transition-colors cursor-pointer ${
              activeSystem === 'pulmonary' ? 'bg-teal-600 text-white font-bold' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Wind className="w-3.5 h-3.5" />
            <span>Pulmonary</span>
          </button>
          <button
            onClick={() => setActiveSystem('neuro')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg font-medium transition-colors cursor-pointer ${
              activeSystem === 'neuro' ? 'bg-teal-600 text-white font-bold' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Brain className="w-3.5 h-3.5" />
            <span>Neurological</span>
          </button>
        </div>
      </div>

      {/* SECTION 1: INTERACTIVE PHYSIOLOGICAL STAGE (Two-Zone Layout) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Zone: Live Visual Stage & Telemetry Waveform */}
        <div className="lg:col-span-7 rounded-2xl bg-white border border-slate-200 p-6 flex flex-col justify-between shadow-clinical relative overflow-hidden bg-grid-clinical-light">
          
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-teal-600 animate-pulse"></span>
              <span className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                {activeSystem === 'cardio' && 'Myocardial Hemodynamic Engine'}
                {activeSystem === 'pulmonary' && 'Alveolar-Capillary Gas Diffusion Matrix'}
                {activeSystem === 'neuro' && 'Cerebrovascular Autoregulation Mesh'}
              </span>
            </div>
            <div className="text-[11px] font-mono text-teal-800 font-bold tabular-nums">
              LIVE SIMULATION · 60 FPS
            </div>
          </div>

          {/* Central Interactive Graphic Canvas */}
          <div className="my-8 flex items-center justify-center">
            
            {activeSystem === 'cardio' && (
              <div className="flex flex-col items-center gap-6 w-full">
                {/* Vector Heart Animation */}
                <div className="relative w-44 h-44 flex items-center justify-center">
                  <div 
                    className="absolute inset-0 rounded-full bg-teal-100 blur-xl transition-all"
                    style={{
                      transform: `scale(${1 + (heartRate / 200)})`,
                      opacity: heartRate > 100 ? 0.9 : 0.4
                    }}
                  />
                  <svg 
                    viewBox="0 0 100 100" 
                    className="w-36 h-36 text-teal-600 drop-shadow-[0_0_15px_rgba(13,148,136,0.3)] transition-transform"
                    style={{
                      animation: `heartbeat ${60 / heartRate}s ease-in-out infinite`
                    }}
                  >
                    <path
                      fill="currentColor"
                      d="M50 88.5C50 88.5 12 62.5 12 36C12 21.5 23.5 10 38 10C45.5 10 50 15 50 15C50 15 54.5 10 62 10C76.5 10 88 21.5 88 36C88 62.5 50 88.5 50 88.5Z"
                    />
                    <circle cx="36" cy="40" r="8" fill="#ffffff" opacity="0.6" />
                    <circle cx="64" cy="40" r="8" fill="#ffffff" opacity="0.6" />
                    <path d="M48 30 L52 30 L52 70 L48 70 Z" fill="#ffffff" opacity="0.5" />
                  </svg>
                </div>

                {/* Animated ECG Rhythm Strip */}
                <div className="w-full h-20 rounded-xl bg-slate-900 border border-slate-800 p-2 relative overflow-hidden bg-ecg-grid-dark shadow-inner">
                  <div className="absolute top-1 left-2 text-[10px] font-mono text-teal-400">
                    Lead II Telemetry · {heartRate} bpm · Sinus Rhythm
                  </div>
                  <svg viewBox="0 0 500 60" className="w-full h-full preserve-3d" preserveAspectRatio="none">
                    <path
                      d="M0,30 L60,30 L70,28 L75,32 L85,30 L95,30 L100,38 L105,4 L112,54 L118,30 L130,30 L140,24 L155,30 L220,30 L230,28 L235,32 L245,30 L255,30 L260,38 L265,4 L272,54 L278,30 L290,30 L300,24 L315,30 L380,30 L390,28 L395,32 L405,30 L415,30 L420,38 L425,4 L432,54 L438,30 L450,30 L460,24 L475,30 L500,30"
                      fill="none"
                      stroke="#14b8a6"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>
            )}

            {activeSystem === 'pulmonary' && (
              <div className="flex flex-col items-center gap-6 w-full">
                <div className="relative w-44 h-44 flex items-center justify-center">
                  <div 
                    className="absolute inset-0 rounded-full bg-sky-100 blur-xl transition-all"
                    style={{ transform: `scale(${1 + (respRate / 40)})` }}
                  />
                  <svg 
                    viewBox="0 0 100 100" 
                    className="w-36 h-36 text-sky-600 transition-transform"
                    style={{
                      animation: `breathe ${60 / respRate}s ease-in-out infinite`
                    }}
                  >
                    <path
                      fill="currentColor"
                      d="M32 20 C22 24, 15 36, 15 52 C15 70, 26 84, 38 84 C42 84, 46 80, 48 72 L48 24 C44 21, 38 20, 32 20 Z"
                    />
                    <path
                      fill="currentColor"
                      d="M68 20 C78 24, 85 36, 85 52 C85 70, 74 84, 62 84 C58 84, 54 80, 52 72 L52 24 C56 21, 62 20, 68 20 Z"
                    />
                    <rect x="47" y="10" width="6" height="24" rx="2" fill="currentColor" />
                  </svg>
                </div>

                <div className="w-full p-3 rounded-xl bg-sky-50 border border-sky-100 text-xs flex items-center justify-between font-mono">
                  <span className="text-slate-600">Calculated Minute Ventilation:</span>
                  <span className="text-sky-800 font-bold tabular-nums">{minuteVentilation} L/min</span>
                </div>
              </div>
            )}

            {activeSystem === 'neuro' && (
              <div className="flex flex-col items-center gap-6 w-full">
                <div className="relative w-44 h-44 flex items-center justify-center">
                  <div 
                    className="absolute inset-0 rounded-full bg-indigo-100 blur-xl transition-all"
                    style={{ opacity: cpp < 60 ? 0.9 : 0.3 }}
                  />
                  <svg viewBox="0 0 100 100" className="w-36 h-36 text-indigo-600">
                    <circle cx="50" cy="50" r="38" fill="none" stroke="currentColor" strokeWidth="3" opacity="0.4" />
                    <path
                      fill="currentColor"
                      d="M30 45 C30 35, 40 25, 50 25 C60 25, 70 35, 70 45 C70 58, 62 70, 50 75 C38 70, 30 58, 30 45 Z"
                    />
                    <circle cx="42" cy="42" r="4" fill="#ffffff" />
                    <circle cx="58" cy="42" r="4" fill="#ffffff" />
                  </svg>
                </div>

                <div className="w-full p-3 rounded-xl bg-indigo-50 border border-indigo-100 text-xs flex items-center justify-between font-mono">
                  <span className="text-slate-600">Cerebral Perfusion Pressure (CPP):</span>
                  <span className={`font-bold tabular-nums ${cpp >= 60 && cpp <= 100 ? 'text-teal-800' : 'text-amber-800'}`}>
                    {cpp} mmHg ({cpp >= 60 ? 'Adequate Perfusion' : 'Ischemia Risk'})
                  </span>
                </div>
              </div>
            )}

          </div>

          {/* Bottom Telemetry Gauges */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-slate-100">
            {activeSystem === 'cardio' && (
              <>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="text-[10px] uppercase font-bold text-slate-500">Cardiac Output</div>
                  <div className="text-base font-extrabold text-teal-800 font-mono tabular-nums">{cardiacOutput} <span className="text-[11px] font-normal text-slate-500">L/min</span></div>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="text-[10px] uppercase font-bold text-slate-500">Cardiac Index</div>
                  <div className="text-base font-extrabold text-teal-800 font-mono tabular-nums">{cardiacIndex} <span className="text-[11px] font-normal text-slate-500">L/m²</span></div>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="text-[10px] uppercase font-bold text-slate-500">Stroke Volume</div>
                  <div className="text-base font-extrabold text-teal-800 font-mono tabular-nums">{strokeVolume} <span className="text-[11px] font-normal text-slate-500">mL</span></div>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="text-[10px] uppercase font-bold text-slate-500">Mean Arterial</div>
                  <div className="text-base font-extrabold text-teal-800 font-mono tabular-nums">{arterialPressure} <span className="text-[11px] font-normal text-slate-500">mmHg</span></div>
                </div>
              </>
            )}

            {activeSystem === 'pulmonary' && (
              <>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="text-[10px] uppercase font-bold text-slate-500">FiO2 Fraction</div>
                  <div className="text-base font-extrabold text-sky-800 font-mono tabular-nums">{fiO2}%</div>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="text-[10px] uppercase font-bold text-slate-500">Resp Rate</div>
                  <div className="text-base font-extrabold text-sky-800 font-mono tabular-nums">{respRate} <span className="text-[11px] font-normal text-slate-500">bpm</span></div>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="text-[10px] uppercase font-bold text-slate-500">Tidal Volume</div>
                  <div className="text-base font-extrabold text-sky-800 font-mono tabular-nums">{tidalVolume} <span className="text-[11px] font-normal text-slate-500">mL</span></div>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="text-[10px] uppercase font-bold text-slate-500">Estimated PaO2</div>
                  <div className="text-base font-extrabold text-sky-800 font-mono tabular-nums">{Math.round(fiO2 * 4.5)} <span className="text-[11px] font-normal text-slate-500">mmHg</span></div>
                </div>
              </>
            )}

            {activeSystem === 'neuro' && (
              <>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="text-[10px] uppercase font-bold text-slate-500">Mean Arterial</div>
                  <div className="text-base font-extrabold text-indigo-800 font-mono tabular-nums">{map} <span className="text-[11px] font-normal text-slate-500">mmHg</span></div>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="text-[10px] uppercase font-bold text-slate-500">Intracranial (ICP)</div>
                  <div className="text-base font-extrabold text-indigo-800 font-mono tabular-nums">{icp} <span className="text-[11px] font-normal text-slate-500">mmHg</span></div>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="text-[10px] uppercase font-bold text-slate-500">CPP Perfusion</div>
                  <div className="text-base font-extrabold text-indigo-800 font-mono tabular-nums">{cpp} <span className="text-[11px] font-normal text-slate-500">mmHg</span></div>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="text-[10px] uppercase font-bold text-slate-500">Cerebral Status</div>
                  <div className="text-xs font-bold text-teal-800 font-mono truncate">{icp > 20 ? 'Intracranial HTN' : 'Nominal'}</div>
                </div>
              </>
            )}
          </div>

        </div>

        {/* Right Zone: Control Deck */}
        <div className="lg:col-span-5 rounded-2xl bg-white border border-slate-200 p-6 flex flex-col justify-between shadow-clinical">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
              Physiological Parameter Controls
            </div>
            <div className="text-sm font-bold text-slate-900 mb-6">
              Adjust variables to simulate cardiovascular stress or compensation
            </div>

            {activeSystem === 'cardio' && (
              <div className="space-y-6">
                <div>
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span className="text-slate-700 font-semibold">Heart Rate (Chronotropy)</span>
                    <span className="font-mono text-teal-700 tabular-nums font-bold">{heartRate} bpm</span>
                  </div>
                  <input
                    type="range"
                    min="45"
                    max="180"
                    value={heartRate}
                    onChange={e => setHeartRate(Number(e.target.value))}
                    className="w-full accent-teal-600 cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span className="text-slate-700 font-semibold">Stroke Volume (Inotropy)</span>
                    <span className="font-mono text-teal-700 tabular-nums font-bold">{strokeVolume} mL</span>
                  </div>
                  <input
                    type="range"
                    min="30"
                    max="130"
                    value={strokeVolume}
                    onChange={e => setStrokeVolume(Number(e.target.value))}
                    className="w-full accent-teal-600 cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span className="text-slate-700 font-semibold">Mean Arterial Pressure (Afterload)</span>
                    <span className="font-mono text-teal-700 tabular-nums font-bold">{arterialPressure} mmHg</span>
                  </div>
                  <input
                    type="range"
                    min="55"
                    max="150"
                    value={arterialPressure}
                    onChange={e => setArterialPressure(Number(e.target.value))}
                    className="w-full accent-teal-600 cursor-pointer"
                  />
                </div>
              </div>
            )}

            {activeSystem === 'pulmonary' && (
              <div className="space-y-6">
                <div>
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span className="text-slate-700 font-semibold">Inspired Oxygen Fraction (FiO2)</span>
                    <span className="font-mono text-sky-700 tabular-nums font-bold">{fiO2}%</span>
                  </div>
                  <input
                    type="range"
                    min="21"
                    max="100"
                    value={fiO2}
                    onChange={e => setFiO2(Number(e.target.value))}
                    className="w-full accent-sky-600 cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span className="text-slate-700 font-semibold">Respiratory Rate</span>
                    <span className="font-mono text-sky-700 tabular-nums font-bold">{respRate} breaths/min</span>
                  </div>
                  <input
                    type="range"
                    min="8"
                    max="38"
                    value={respRate}
                    onChange={e => setRespRate(Number(e.target.value))}
                    className="w-full accent-sky-600 cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span className="text-slate-700 font-semibold">Tidal Volume (VT)</span>
                    <span className="font-mono text-sky-700 tabular-nums font-bold">{tidalVolume} mL</span>
                  </div>
                  <input
                    type="range"
                    min="300"
                    max="750"
                    value={tidalVolume}
                    onChange={e => setTidalVolume(Number(e.target.value))}
                    className="w-full accent-sky-600 cursor-pointer"
                  />
                </div>
              </div>
            )}

            {activeSystem === 'neuro' && (
              <div className="space-y-6">
                <div>
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span className="text-slate-700 font-semibold">Intracranial Pressure (ICP)</span>
                    <span className="font-mono text-indigo-700 tabular-nums font-bold">{icp} mmHg</span>
                  </div>
                  <input
                    type="range"
                    min="5"
                    max="35"
                    value={icp}
                    onChange={e => setIcp(Number(e.target.value))}
                    className="w-full accent-indigo-600 cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span className="text-slate-700 font-semibold">Systemic Mean Arterial Pressure (MAP)</span>
                    <span className="font-mono text-indigo-700 tabular-nums font-bold">{map} mmHg</span>
                  </div>
                  <input
                    type="range"
                    min="50"
                    max="140"
                    value={map}
                    onChange={e => setMap(Number(e.target.value))}
                    className="w-full accent-indigo-600 cursor-pointer"
                  />
                </div>
              </div>
            )}
          </div>

          <div className="mt-8 p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 space-y-1">
            <div className="font-bold text-slate-900 flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-teal-700" />
              <span>Core Clinical Principle</span>
            </div>
            <p className="text-[11px] leading-relaxed">
              {activeSystem === 'cardio' && 'Cardiac Output is determined by heart rate multiplied by stroke volume. Tachycardia above 140 bpm impairs ventricular diastolic filling time, reducing stroke volume.'}
              {activeSystem === 'pulmonary' && 'Alveolar oxygen diffusion follows Fick\'s law. In severe ARDS, shunt fraction impairs gas exchange even with 100% inspired oxygen.'}
              {activeSystem === 'neuro' && 'The Monro-Kellie doctrine states the cranium is a closed box. When brain edema elevates ICP above 20 mmHg, cerebral perfusion pressure fails without aggressive intervention.'}
            </p>
          </div>

        </div>

      </div>

      {/* SECTION 2: VIRTUAL PATIENT CLINICAL DECISION SCENARIOS */}
      <div className="rounded-2xl bg-white border border-slate-200 p-6 sm:p-8 shadow-clinical">
        
        {/* Scenario Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
          <div>
            <div className="text-xs font-semibold text-teal-700 uppercase tracking-wider mb-1 flex items-center gap-1.5">
              <Award className="w-4 h-4" />
              <span>Interactive Clinical Decision Scenario</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
              {selectedScenario.title}
            </h2>
            <div className="text-xs text-slate-500 mt-1 flex items-center gap-2">
              <span>Acuity Level: {selectedScenario.difficulty}</span>
              <span aria-hidden="true">·</span>
              <span>Category: {selectedScenario.category}</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {VIRTUAL_SCENARIOS.map(sc => (
              <button
                key={sc.id}
                onClick={() => handleScenarioChange(sc)}
                className={`px-3 py-1.5 text-xs rounded-lg border transition-colors cursor-pointer ${
                  selectedScenario.id === sc.id
                    ? 'border-teal-600 bg-teal-50 text-teal-900 font-bold'
                    : 'border-slate-200 bg-white text-slate-600 hover:text-slate-900'
                }`}
              >
                {sc.category}
              </button>
            ))}
          </div>
        </div>

        {scenarioCompleted ? (
          <div className="py-12 text-center space-y-4 max-w-xl mx-auto">
            <div className="w-16 h-16 rounded-full bg-teal-50 border border-teal-200 text-teal-700 flex items-center justify-center mx-auto">
              <Award className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">Clinical Scenario Successfully Resolved</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              You synthesized emergency bedside presentation, reviewed ECG and radiological evidence, and administered guideline-directed medical therapy.
            </p>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-left space-y-2">
              <div className="text-xs font-bold text-slate-900">Learning Competencies Verified:</div>
              <ul className="text-xs text-slate-600 space-y-1 list-disc list-inside">
                {selectedScenario.learningObjectives.map((obj, i) => (
                  <li key={i}>{obj}</li>
                ))}
              </ul>
            </div>

            <button
              onClick={handleRestartScenario}
              className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-bold rounded-lg bg-teal-600 hover:bg-teal-700 text-white transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Restart Clinical Scenario</span>
            </button>
          </div>
        ) : (
          <div className="py-6 space-y-6">
            
            {/* Patient Vignette Banner */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs">
              <div className="space-y-1">
                <div className="font-bold text-slate-900">
                  Patient Vignette: {selectedScenario.patientProfile.gender}, {selectedScenario.patientProfile.age} yo
                </div>
                <div className="text-slate-600">
                  <span className="text-slate-800 font-semibold">Chief Complaint:</span> "{selectedScenario.patientProfile.chiefComplaint}"
                </div>
                <div className="text-slate-500">
                  Medical History: {selectedScenario.patientProfile.history}
                </div>
              </div>

              <div className="flex items-center gap-4 text-xs font-mono tabular-nums text-slate-700 shrink-0">
                <div>HR: <strong className="text-teal-700">{currentStep?.currentVitals.heartRate}</strong> bpm</div>
                <div>BP: <strong className="text-teal-700">{currentStep?.currentVitals.systolicBP}/{currentStep?.currentVitals.diastolicBP}</strong></div>
                <div>SpO2: <strong className="text-teal-700">{currentStep?.currentVitals.oxygenSaturation}%</strong></div>
              </div>
            </div>

            {/* Current Step Stage */}
            <div className="space-y-3">
              <div className="text-xs font-bold text-teal-800 uppercase tracking-wider">
                Stage {currentStep?.stepNumber} of {selectedScenario.steps.length}: {currentStep?.stageTitle}
              </div>
              <p className="text-sm text-slate-800 leading-relaxed">
                {currentStep?.clinicalPresentation}
              </p>

              {/* Diagnostic Clues */}
              <div className="p-4 rounded-xl bg-teal-50/60 border border-teal-100 text-xs space-y-1.5">
                <div className="font-bold text-teal-900">Bedside Diagnostic Findings:</div>
                {currentStep?.diagnosticClues.map((clue, idx) => (
                  <div key={idx} className="text-teal-800 flex items-start gap-2">
                    <span className="text-teal-600 font-bold">›</span>
                    <span>{clue}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Decision Options */}
            <div className="space-y-3 pt-2">
              <div className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Select Your Clinical Decision:
              </div>

              <div className="space-y-3">
                {currentStep?.options.map(option => {
                  const isSelected = selectedOptionId === option.id;
                  return (
                    <button
                      key={option.id}
                      onClick={() => handleDecision(option.id)}
                      disabled={selectedOptionId !== null}
                      className={`w-full text-left p-4 rounded-xl border transition-all cursor-pointer ${
                        isSelected
                          ? option.isOptimal
                            ? 'border-teal-600 bg-teal-50 text-slate-900'
                            : 'border-red-600 bg-red-50 text-slate-900'
                          : selectedOptionId !== null
                          ? 'border-slate-200 bg-slate-50/50 opacity-60 text-slate-500'
                          : 'border-slate-200 bg-white hover:border-slate-300 text-slate-800 hover:text-slate-900 shadow-xs'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3 text-xs sm:text-sm">
                        <div className="flex-1">
                          <span className="font-semibold">{option.label}</span>
                        </div>
                        {isSelected && (
                          <div className="shrink-0 mt-0.5">
                            {option.isOptimal ? (
                              <CheckCircle2 className="w-5 h-5 text-teal-600" />
                            ) : (
                              <AlertCircle className="w-5 h-5 text-red-600" />
                            )}
                          </div>
                        )}
                      </div>

                      {/* Rationale feedback reveal */}
                      {isSelected && (
                        <div className="mt-3 pt-3 border-t border-slate-200 text-xs space-y-1">
                          <div className={option.isOptimal ? 'text-teal-800 font-bold' : 'text-red-800 font-bold'}>
                            {option.feedback}
                          </div>
                          <div className="text-slate-600">
                            <span className="font-semibold text-slate-800">Clinical Rationale:</span> {option.clinicalRationale}
                          </div>
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Next Step Control */}
            {selectedOptionId && (
              <div className="pt-4 flex justify-end">
                <button
                  onClick={handleNextStep}
                  className="flex items-center gap-2 px-6 py-2.5 text-xs font-bold rounded-lg bg-teal-600 hover:bg-teal-700 text-white shadow-md transition-all cursor-pointer"
                >
                  <span>
                    {scenarioStepIdx + 1 < selectedScenario.steps.length ? 'Advance to Next Stage' : 'Complete Clinical Review'}
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}

          </div>
        )}

      </div>

    </div>
  );
};
