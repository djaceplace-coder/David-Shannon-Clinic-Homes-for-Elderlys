import React, { useState } from 'react';
import { useClinical } from '../../context/ClinicalContext';
import { 
  X, 
  ShieldAlert, 
  Lock, 
  Mail, 
  FileText, 
  ArrowRight, 
  CheckCircle2, 
  UserPlus, 
  AlertCircle,
  Stethoscope
} from 'lucide-react';

export const AuthModal: React.FC = () => {
  const { 
    isAuthModalOpen, 
    setIsAuthModalOpen, 
    authMode, 
    setAuthMode,
    loginByEmail,
    loginByMrn,
    setIsEmergencyModalOpen,
    setIsOnboardingModalOpen,
    patients
  } = useClinical();

  const [emailInput, setEmailInput] = useState('');
  const [mrnInput, setMrnInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('••••••••••••');
  const [errorMessage, setErrorMessage] = useState('');

  if (!isAuthModalOpen) return null;

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (authMode === 'sign_in') {
      const success = loginByEmail(emailInput);
      if (!success) {
        setErrorMessage('No clinical patient record found matching this email address. Please check your credentials or use MRN Lookup.');
      }
    } else if (authMode === 'mrn_lookup') {
      const success = loginByMrn(mrnInput);
      if (!success) {
        setErrorMessage('Invalid Medical Record Number (MRN). Ensure format resembles DSC-84920.');
      }
    }
  };

  const handleQuickDemoFill = (patientEmail: string) => {
    setEmailInput(patientEmail);
    loginByEmail(patientEmail);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-150">
      <div className="w-full max-w-md rounded-2xl bg-white border border-slate-200 shadow-2xl overflow-hidden text-slate-900">
        
        {/* Modal Top Header */}
        <div className="bg-slate-50 px-6 py-4 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="p-2 rounded-lg bg-teal-50 text-teal-700 border border-teal-200">
              <Lock className="w-4 h-4" />
            </span>
            <div>
              <h3 className="text-sm font-bold text-slate-900 tracking-tight">
                David & Shannon Patient Access
              </h3>
              <div className="text-[11px] text-slate-500 font-mono">
                HIPAA Compliant · 256-Bit SSL Gateway
              </div>
            </div>
          </div>

          <button 
            onClick={() => setIsAuthModalOpen(false)}
            className="p-1.5 rounded-md text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab Mode Selector */}
        <div className="grid grid-cols-3 border-b border-slate-200 bg-slate-100/60 text-xs font-semibold text-center">
          <button
            onClick={() => { setAuthMode('sign_in'); setErrorMessage(''); }}
            className={`py-2.5 transition-colors cursor-pointer border-b-2 ${
              authMode === 'sign_in' ? 'border-teal-600 text-teal-800 bg-white font-bold' : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            Email Login
          </button>
          <button
            onClick={() => { setAuthMode('mrn_lookup'); setErrorMessage(''); }}
            className={`py-2.5 transition-colors cursor-pointer border-b-2 ${
              authMode === 'mrn_lookup' ? 'border-teal-600 text-teal-800 bg-white font-bold' : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            MRN Portal Key
          </button>
          <button
            onClick={() => { setAuthMode('emergency_lifeline'); setErrorMessage(''); }}
            className={`py-2.5 transition-colors cursor-pointer border-b-2 text-red-600 font-bold ${
              authMode === 'emergency_lifeline' ? 'border-red-600 bg-red-50' : 'border-transparent hover:text-red-700'
            }`}
          >
            24/7 Lifeline
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6">
          
          {errorMessage && (
            <div className="mb-4 p-3 rounded-lg bg-red-50 border border-red-200 text-xs text-red-700 flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Mode 1 & 2: Email or MRN Login */}
          {(authMode === 'sign_in' || authMode === 'mrn_lookup') && (
            <form onSubmit={handleSignIn} className="space-y-4">
              
              {authMode === 'sign_in' ? (
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Registered Patient Email Address
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      required
                      placeholder="e.g. evelyn.montgomery@healthreach.org"
                      value={emailInput}
                      onChange={e => setEmailInput(e.target.value)}
                      className="w-full px-3 py-2 pl-9 text-xs rounded-lg border border-slate-300 text-slate-900 focus:border-teal-600 focus:ring-1 focus:ring-teal-600 focus:outline-none"
                    />
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  </div>
                </div>
              ) : (
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Hospital Medical Record Number (MRN)
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      placeholder="e.g. DSC-84920"
                      value={mrnInput}
                      onChange={e => setMrnInput(e.target.value)}
                      className="w-full px-3 py-2 pl-9 text-xs rounded-lg border border-slate-300 text-slate-900 font-mono focus:border-teal-600 focus:ring-1 focus:ring-teal-600 focus:outline-none"
                    />
                    <FileText className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Access Pin / Password
                </label>
                <div className="relative">
                  <input
                    type="password"
                    value={passwordInput}
                    onChange={e => setPasswordInput(e.target.value)}
                    className="w-full px-3 py-2 pl-9 text-xs rounded-lg border border-slate-300 text-slate-900 focus:border-teal-600 focus:ring-1 focus:ring-teal-600 focus:outline-none"
                  />
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-lg bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs shadow-md transition-all cursor-pointer flex items-center justify-center gap-1.5"
              >
                <span>Access Clinical Record</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              {/* Demo Quick-Login Shortcuts */}
              <div className="pt-3 border-t border-slate-100">
                <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-2">
                  Sample Evaluator Patient Accounts (1-Click Login):
                </div>
                <div className="space-y-1.5">
                  {patients.slice(0, 2).map(p => (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => handleQuickDemoFill(p.email)}
                      className="w-full text-left p-2 rounded-lg bg-slate-50 hover:bg-teal-50 border border-slate-200 hover:border-teal-300 transition-colors flex items-center justify-between text-xs cursor-pointer"
                    >
                      <div>
                        <div className="font-semibold text-slate-800">{p.fullName}</div>
                        <div className="text-[10px] text-slate-500 font-mono">{p.primaryDiagnosis.slice(0, 35)}...</div>
                      </div>
                      <span className="text-[10px] font-mono text-teal-700 font-bold">{p.mrn}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* New Patient Registration Link */}
              <div className="text-center pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setIsAuthModalOpen(false);
                    setIsOnboardingModalOpen(true);
                  }}
                  className="text-xs text-teal-700 hover:underline font-semibold"
                >
                  New Patient? Register with Comprehensive Health Intake →
                </button>
              </div>

            </form>
          )}

          {/* Mode 3: 24/7 Lifeline Emergency Rapid Login Bypass */}
          {authMode === 'emergency_lifeline' && (
            <div className="space-y-4 text-center">
              <div className="w-14 h-14 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto border-2 border-red-200">
                <ShieldAlert className="w-8 h-8 animate-pulse" />
              </div>

              <div className="space-y-1">
                <h4 className="text-base font-bold text-slate-900">
                  Emergency Lifeline Fast-Track
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  In acute medical situations, never wait for password retrieval or registration forms.
                </p>
              </div>

              <div className="p-3.5 rounded-lg bg-red-50 border border-red-200 text-left text-xs text-red-800 space-y-1">
                <div className="font-bold flex items-center gap-1.5">
                  <span>🚨 Level 1 Trauma Protocol:</span>
                </div>
                <p className="text-[11px] leading-relaxed">
                  Clicking below opens our 10-second rapid intake, auto-generates an emergency trauma MRN, and directly establishes two-way communication with the emergency room.
                </p>
              </div>

              <button
                type="button"
                onClick={() => {
                  setIsAuthModalOpen(false);
                  setIsEmergencyModalOpen(true);
                }}
                className="w-full py-3 rounded-lg bg-red-600 hover:bg-red-700 text-white font-bold text-xs shadow-lg shadow-red-900/20 transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <ShieldAlert className="w-4 h-4" />
                <span>Launch 10-Second Emergency Lifeline</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
