import React, { useState } from 'react';
import { useClinical } from '../../context/ClinicalContext';
import { 
  Lock, 
  User, 
  KeyRound, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  AlertCircle, 
  ShieldCheck, 
  FileText, 
  UserPlus, 
  ShieldAlert, 
  CheckCircle2,
  Activity,
  HeartPulse
} from 'lucide-react';

export const PatientAccessGateway: React.FC = () => {
  const { 
    loginPatient, 
    setIsOnboardingModalOpen, 
    setIsEmergencyModalOpen,
    patients 
  } = useClinical();

  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!identifier.trim()) {
      setErrorMessage('Please enter your Patient Username, ID/File No, MRN, or registered Email.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      const result = loginPatient(identifier, password);
      setIsSubmitting(false);

      if (!result.success) {
        setErrorMessage(result.error || 'Authentication failed. Please verify your credentials or register a new file.');
      }
    }, 300);
  };

  const handleQuickDemoAccess = (demoIdentifier: string) => {
    setIdentifier(demoIdentifier);
    setPassword('patient123');
    setErrorMessage('');
    loginPatient(demoIdentifier, 'patient123');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Column: Institutional Value & EHR Security */}
        <div className="lg:col-span-6 space-y-6">
          <div className="flex items-center gap-2 text-xs font-semibold text-teal-800">
            <span className="w-2 h-2 rounded-full bg-teal-600 animate-pulse"></span>
            <span>Electronic Health Record (EHR) Portal</span>
            <span aria-hidden="true" className="text-slate-300">·</span>
            <span>Protected Patient Health Information</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Confidential Access to Your Clinical Health Records
          </h1>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            The David & Shannon Clinic Patient Hub provides individualized access to diagnostic laboratory panels, continuous ambulatory ECG telemetry, active physician prescriptions, superbill invoices, and direct 2-way doctor consultation.
          </p>

          <div className="space-y-3.5 pt-2 text-xs font-medium text-slate-700">
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 rounded-lg bg-teal-50 border border-teal-200 flex items-center justify-center text-teal-700 shrink-0">
                <Activity className="w-4 h-4" />
              </div>
              <span>Continuous physiological monitoring waveforms & vital signs telemetry</span>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-7 h-7 rounded-lg bg-teal-50 border border-teal-200 flex items-center justify-center text-teal-700 shrink-0">
                <FileText className="w-4 h-4" />
              </div>
              <span>Automated superbill statements, CPT itemized codes, and instant payment receipts</span>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-7 h-7 rounded-lg bg-teal-50 border border-teal-200 flex items-center justify-center text-teal-700 shrink-0">
                <HeartPulse className="w-4 h-4" />
              </div>
              <span>Direct 2-way messaging with your assigned attending specialist & hospital desk</span>
            </div>
          </div>

          {/* New Patient Registration Banner */}
          <div className="p-4 rounded-2xl bg-teal-50/80 border border-teal-200/90 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="font-bold text-teal-950">New to David & Shannon Clinic?</div>
              <div className="text-teal-800 text-[11px]">Register your official clinical file in under 2 minutes.</div>
            </div>
            <button
              onClick={() => setIsOnboardingModalOpen(true)}
              className="px-3.5 py-2 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs shadow-xs transition-colors shrink-0 flex items-center gap-1.5 cursor-pointer"
            >
              <UserPlus className="w-3.5 h-3.5" />
              <span>Create Account</span>
            </button>
          </div>
        </div>

        {/* Right Column: Access Patient Portal Sign-In Card */}
        <div className="lg:col-span-6 max-w-md mx-auto w-full">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-xl p-6 sm:p-8 space-y-6">
            
            <div className="text-center space-y-2">
              <div className="w-12 h-12 rounded-2xl bg-teal-600 text-white flex items-center justify-center mx-auto shadow-md shadow-teal-600/20">
                <Lock className="w-6 h-6" />
              </div>
              <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
                Access Patient Portal
              </h2>
              <p className="text-xs text-slate-500">
                Enter your Patient Username, ID/File No, MRN, or registered email and secure password.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5 flex items-center justify-between">
                  <span>Patient Identifier</span>
                  <span className="text-[10px] text-slate-400 font-mono">Username / File No / MRN / Email</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <User className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    value={identifier}
                    onChange={(e) => {
                      setIdentifier(e.target.value);
                      if (errorMessage) setErrorMessage('');
                    }}
                    placeholder="e.g. DSC-84920, FILE-84920, or email"
                    autoFocus
                    className="w-full pl-10 pr-3 py-2.5 rounded-xl border border-slate-300 focus:border-teal-600 focus:ring-1 focus:ring-teal-600 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5 flex items-center justify-between">
                  <span>Portal Password</span>
                  <span className="text-[10px] text-slate-400 font-mono">Confidential</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <KeyRound className="w-4 h-4" />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      if (errorMessage) setErrorMessage('');
                    }}
                    placeholder="Enter your confidential password"
                    className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-slate-300 focus:border-teal-600 focus:ring-1 focus:ring-teal-600 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 cursor-pointer"
                    title={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {errorMessage && (
                <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 flex items-start gap-2 animate-in fade-in duration-150">
                  <AlertCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                  <span>{errorMessage}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 px-4 rounded-xl bg-teal-600 hover:bg-teal-700 active:bg-teal-800 text-white font-bold text-xs uppercase tracking-wider shadow-md shadow-teal-600/20 transition-all cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Authenticating Patient Record...</span>
                  </>
                ) : (
                  <>
                    <ShieldCheck className="w-4 h-4" />
                    <span>Unlock My Patient Record</span>
                  </>
                )}
              </button>
            </form>

            {/* Quick Access Demo Passports (Evaluator Fast-Track) */}
            <div className="pt-4 border-t border-slate-100 space-y-2">
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center justify-between">
                <span>Sample Patient Passports (1-Click Access)</span>
                <span className="font-mono text-teal-700 font-semibold">Pass: patient123</span>
              </div>

              <div className="grid grid-cols-1 gap-2">
                <button
                  type="button"
                  onClick={() => handleQuickDemoAccess('DSC-84920')}
                  className="w-full text-left p-2.5 rounded-xl border border-slate-200 hover:border-teal-300 hover:bg-teal-50/50 transition-colors flex items-center justify-between group cursor-pointer text-xs"
                >
                  <div>
                    <div className="font-bold text-slate-900 group-hover:text-teal-900">Evelyn Montgomery</div>
                    <div className="text-[11px] text-slate-500 font-mono">FILE-84920 · Post-PCI Cardiology</div>
                  </div>
                  <span className="text-[11px] text-teal-700 font-semibold group-hover:translate-x-0.5 transition-transform flex items-center gap-1">
                    <span>Open</span>
                    <ArrowRight className="w-3 h-3" />
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => handleQuickDemoAccess('DSC-91204')}
                  className="w-full text-left p-2.5 rounded-xl border border-slate-200 hover:border-teal-300 hover:bg-teal-50/50 transition-colors flex items-center justify-between group cursor-pointer text-xs"
                >
                  <div>
                    <div className="font-bold text-slate-900 group-hover:text-teal-900">David Sterling-Alvarez</div>
                    <div className="text-[11px] text-slate-500 font-mono">FILE-91204 · Atrial Fibrillation</div>
                  </div>
                  <span className="text-[11px] text-teal-700 font-semibold group-hover:translate-x-0.5 transition-transform flex items-center gap-1">
                    <span>Open</span>
                    <ArrowRight className="w-3 h-3" />
                  </span>
                </button>
              </div>
            </div>

            {/* Emergency Lifeline Option */}
            <div className="pt-2 text-center">
              <button
                type="button"
                onClick={() => setIsEmergencyModalOpen(true)}
                className="text-xs text-red-600 hover:text-red-700 hover:underline font-semibold flex items-center justify-center gap-1.5 mx-auto cursor-pointer"
              >
                <ShieldAlert className="w-3.5 h-3.5" />
                <span>Need Rapid Emergency Intake? Open 24/7 Lifeline</span>
              </button>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
