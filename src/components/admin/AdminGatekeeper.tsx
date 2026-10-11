import React, { useState } from 'react';
import { useClinical } from '../../context/ClinicalContext';
import { 
  ShieldCheck, 
  Lock, 
  Eye, 
  EyeOff, 
  ArrowLeft, 
  AlertCircle, 
  CheckCircle2, 
  KeyRound,
  Building2,
  Terminal
} from 'lucide-react';

export const AdminGatekeeper: React.FC = () => {
  const { verifyAdminPassword, navigateToPublic } = useClinical();
  
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!password) {
      setErrorMsg('Please enter your administrator master security clearance code.');
      return;
    }

    setIsVerifying(true);

    setTimeout(() => {
      const isValid = verifyAdminPassword(password);
      setIsVerifying(false);

      if (isValid) {
        setIsSuccess(true);
      } else {
        setErrorMsg('Access Denied. Invalid clearance key. Refer to the security hint below.');
      }
    }, 400);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between p-4 sm:p-8 font-sans relative overflow-hidden">
      
      {/* Background Ambient Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-cyan-600/10 rounded-full blur-3xl pointer-events-none"></div>

      {/* Top Bar with Return to Public Site */}
      <div className="max-w-6xl mx-auto w-full flex items-center justify-between z-10">
        <button
          onClick={navigateToPublic}
          className="flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors px-3 py-2 rounded-lg hover:bg-slate-900 border border-transparent hover:border-slate-800 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Exit to Public Hospital Website</span>
        </button>

        <div className="flex items-center gap-2 text-[11px] font-mono text-slate-500">
          <Terminal className="w-3.5 h-3.5 text-teal-400" />
          <span>SECURE PROTOCOL /admin</span>
        </div>
      </div>

      {/* Center Security Vault Card */}
      <div className="max-w-md mx-auto w-full my-auto z-10 py-10">
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl shadow-2xl p-6 sm:p-8 backdrop-blur-xl space-y-6">
          
          {/* Header Badge */}
          <div className="text-center space-y-3">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-teal-950 border border-teal-500/30 flex items-center justify-center text-teal-400 shadow-inner">
              <Lock className="w-7 h-7" />
            </div>

            <div>
              <div className="text-[11px] font-mono font-bold text-teal-400 uppercase tracking-widest flex items-center justify-center gap-1.5 mb-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Hospital Command Gateway</span>
              </div>
              <h1 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
                David & Shannon Clinic
              </h1>
              <p className="text-xs text-slate-400 mt-1">
                Restricted portal for digital hospital operations, patient case triage, physician assignment, prescriptions, and billing dispatch.
              </p>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center justify-between">
                <span>Master Security Key</span>
                <span className="text-[10px] text-slate-500 font-mono">Encrypted input</span>
              </label>

              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                  <KeyRound className="w-4 h-4" />
                </div>

                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (errorMsg) setErrorMsg('');
                  }}
                  placeholder="Enter Clearance Code"
                  autoFocus
                  autoComplete="current-password"
                  className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-slate-950 border border-slate-700/80 focus:border-teal-500 focus:ring-1 focus:ring-teal-500 text-sm font-mono tracking-widest text-white placeholder:text-slate-600 focus:outline-none transition-all"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-500 hover:text-slate-300 transition-colors focus:outline-none cursor-pointer"
                  title={showPassword ? "Mask password" : "Show password"}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Error Message */}
            {errorMsg && (
              <div className="p-3 rounded-xl bg-red-950/60 border border-red-800/80 text-xs text-red-300 flex items-start gap-2.5 animate-in fade-in duration-200">
                <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* Success Message */}
            {isSuccess && (
              <div className="p-3 rounded-xl bg-teal-950/60 border border-teal-800/80 text-xs text-teal-300 flex items-start gap-2.5 animate-in fade-in duration-200">
                <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                <span>Clearance Verified. Decrypting hospital console...</span>
              </div>
            )}

            {/* Hint Box (Prominently displaying ARCHITECT) */}
            <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 text-xs space-y-1.5">
              <div className="flex items-center justify-between text-[11px] font-bold">
                <span className="text-slate-400 flex items-center gap-1.5">
                  <Terminal className="w-3 h-3 text-teal-400" />
                  <span>Security Hint:</span>
                </span>
                <span className="font-mono bg-teal-950 text-teal-300 border border-teal-800/50 px-2 py-0.5 rounded text-[11px] font-bold tracking-wider">
                  ARCHITECT
                </span>
              </div>
              <p className="text-[11px] text-slate-500 leading-relaxed">
                Clearance credentials are coded for hospital architects and directors. Password: <span className="font-mono text-slate-400">007</span>.
              </p>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isVerifying}
              className="w-full py-3 px-4 rounded-xl bg-teal-600 hover:bg-teal-500 active:bg-teal-700 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-teal-900/30 transition-all cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isVerifying ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>Verifying Clearance...</span>
                </>
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4" />
                  <span>Authorize Administrator Access</span>
                </>
              )}
            </button>
          </form>

          {/* Quick Demo Pre-fill for reviewers */}
          <div className="text-center pt-2 border-t border-slate-800">
            <button
              type="button"
              onClick={() => {
                setPassword('007');
                setErrorMsg('');
              }}
              className="text-[11px] text-teal-400 hover:text-teal-300 hover:underline cursor-pointer font-mono"
            >
              [Auto-Fill Code 007]
            </button>
          </div>

        </div>
      </div>

      {/* Footer Audit Information */}
      <div className="max-w-6xl mx-auto w-full flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-500 z-10 pt-4 border-t border-slate-900">
        <div className="flex items-center gap-2">
          <Building2 className="w-3.5 h-3.5 text-slate-600" />
          <span>David & Shannon Clinic Hospital Command · System Build 2.4.0</span>
        </div>
        <div>
          Protected by End-to-End Encryption & Audit Logging
        </div>
      </div>

    </div>
  );
};
