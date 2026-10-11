import React, { useState } from 'react';
import { useClinical } from '../../context/ClinicalContext';
import { 
  X, 
  Check, 
  ArrowRight, 
  ArrowLeft, 
  User, 
  HeartPulse, 
  ShieldCheck, 
  PhoneCall, 
  FileCheck2 
} from 'lucide-react';
import { BloodType } from '../../types/clinical';

export const ComprehensiveOnboardingModal: React.FC = () => {
  const { 
    isOnboardingModalOpen, 
    setIsOnboardingModalOpen, 
    handleComprehensiveOnboard,
    setActiveRole,
    setActiveTab,
    setPatientSubTab
  } = useClinical();

  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  // Form Fields
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [dob, setDob] = useState('1988-04-12');
  const [gender, setGender] = useState<'Female' | 'Male' | 'Other'>('Female');
  const [bloodType, setBloodType] = useState<BloodType>('O+');

  const [primaryDiagnosis, setPrimaryDiagnosis] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('patient123');
  const [allergiesText, setAllergiesText] = useState('NKDA (No Known Drug Allergies)');
  const [insuranceProvider, setInsuranceProvider] = useState('Aetna Signature National');
  const [insurancePolicyNumber, setInsurancePolicyNumber] = useState('AET-99201-P');

  const [contactName, setContactName] = useState('');
  const [contactRel, setContactRel] = useState('Spouse');
  const [contactPhone, setContactPhone] = useState('');

  if (!isOnboardingModalOpen) return null;

  const handleNext = () => {
    if (step < 4) {
      setStep((step + 1) as any);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep((step - 1) as any);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !email.trim()) return;

    const allergiesList = allergiesText
      .split(',')
      .map(s => s.trim())
      .filter(Boolean);

    handleComprehensiveOnboard({
      fullName: fullName.trim(),
      email: email.trim(),
      phone: phone.trim() || '+1 (555) 234-5678',
      dob,
      gender,
      bloodType,
      username: username.trim() || email.split('@')[0],
      password: password.trim() || 'patient123',
      primaryDiagnosis: primaryDiagnosis.trim() || 'Comprehensive Baseline Health Evaluation',
      allergies: allergiesList.length > 0 ? allergiesList : ['NKDA'],
      insuranceProvider: insuranceProvider.trim() || 'Private Direct Pay',
      insurancePolicyNumber: insurancePolicyNumber.trim() || 'POL-DEFAULT',
      emergencyContact: {
        name: contactName.trim() || 'Primary Contact',
        relationship: contactRel,
        phone: contactPhone.trim() || phone.trim()
      }
    });

    setIsOnboardingModalOpen(false);
    setActiveRole('patient');
    setActiveTab('patient_portal');
    setPatientSubTab('biometrics');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="w-full max-w-2xl rounded-xl bg-slate-900 border border-slate-800 shadow-2xl overflow-hidden text-slate-100">
        
        {/* Modal Top Bar */}
        <div className="bg-slate-950 px-6 py-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="p-2 rounded bg-teal-500/10 text-teal-400 border border-teal-500/20">
              <FileCheck2 className="w-5 h-5" />
            </span>
            <div>
              <h2 className="text-base font-bold text-white tracking-tight">
                David & Shannon Electronic Health Intake
              </h2>
              <div className="text-xs text-slate-400 flex items-center gap-1.5 mt-0.5">
                <span>Stage {step} of 4</span>
                <span aria-hidden="true">·</span>
                <span>
                  {step === 1 && 'Patient Identity & Verified Contact'}
                  {step === 2 && 'Clinical Baseline & Allergies'}
                  {step === 3 && 'Insurance & Coverage Payer'}
                  {step === 4 && 'Emergency Proxy & Activation'}
                </span>
              </div>
            </div>
          </div>
          <button 
            onClick={() => setIsOnboardingModalOpen(false)}
            className="p-1 rounded text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Progress Indicators (Zero-pill clean layout) */}
        <div className="grid grid-cols-4 border-b border-slate-800/80 bg-slate-950/50 text-[11px] font-medium text-center">
          <div className={`py-2 px-1 border-b-2 transition-colors ${step === 1 ? 'border-teal-400 text-teal-300 bg-teal-950/20' : 'border-transparent text-slate-500'}`}>
            1. Identity
          </div>
          <div className={`py-2 px-1 border-b-2 transition-colors ${step === 2 ? 'border-teal-400 text-teal-300 bg-teal-950/20' : 'border-transparent text-slate-500'}`}>
            2. Medical
          </div>
          <div className={`py-2 px-1 border-b-2 transition-colors ${step === 3 ? 'border-teal-400 text-teal-300 bg-teal-950/20' : 'border-transparent text-slate-500'}`}>
            3. Insurance
          </div>
          <div className={`py-2 px-1 border-b-2 transition-colors ${step === 4 ? 'border-teal-400 text-teal-300 bg-teal-950/20' : 'border-transparent text-slate-500'}`}>
            4. Emergency
          </div>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6">
          
          {/* Step 1: Identity */}
          {step === 1 && (
            <div className="space-y-4 animate-in fade-in duration-100">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Full Legal Name <span className="text-teal-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Julianna Mercer"
                    value={fullName}
                    onChange={e => setFullName(e.target.value)}
                    className="w-full px-3 py-2 text-sm rounded bg-slate-950 border border-slate-700 focus:border-teal-500 focus:outline-none text-white placeholder-slate-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Verified Email Address <span className="text-teal-400">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. julianna.mercer@oxford.edu"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="w-full px-3 py-2 text-sm rounded bg-slate-950 border border-slate-700 focus:border-teal-500 focus:outline-none text-white placeholder-slate-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    placeholder="+1 (555) 492-1092"
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    className="w-full px-3 py-2 text-sm rounded bg-slate-950 border border-slate-700 focus:border-teal-500 focus:outline-none text-white placeholder-slate-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Date of Birth
                  </label>
                  <input
                    type="date"
                    value={dob}
                    onChange={e => setDob(e.target.value)}
                    className="w-full px-3 py-2 text-sm rounded bg-slate-950 border border-slate-700 focus:border-teal-500 focus:outline-none text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Blood Group
                  </label>
                  <select
                    value={bloodType}
                    onChange={e => setBloodType(e.target.value as BloodType)}
                    className="w-full px-3 py-2 text-sm rounded bg-slate-950 border border-slate-700 focus:border-teal-500 focus:outline-none text-white font-mono"
                  >
                    <option value="A+">A Positive (A+)</option>
                    <option value="A-">A Negative (A-)</option>
                    <option value="B+">B Positive (B+)</option>
                    <option value="B-">B Negative (B-)</option>
                    <option value="AB+">AB Positive (AB+)</option>
                    <option value="AB-">AB Negative (AB-)</option>
                    <option value="O+">O Positive (O+)</option>
                    <option value="O-">O Negative (O-)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Biological Sex
                </label>
                <div className="flex gap-4 text-xs text-slate-300">
                  {(['Female', 'Male', 'Other'] as const).map(g => (
                    <label key={g} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="gender"
                        checked={gender === g}
                        onChange={() => setGender(g)}
                        className="text-teal-500 focus:ring-teal-400"
                      />
                      <span>{g}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Portal Security Setup */}
              <div className="pt-2 border-t border-slate-800 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Portal Username (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. j.mercer"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                    className="w-full px-3 py-2 text-sm rounded bg-slate-950 border border-slate-700 focus:border-teal-500 focus:outline-none text-white placeholder-slate-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1 flex items-center justify-between">
                    <span>Portal Password</span>
                    <span className="text-[10px] text-teal-400 font-mono">Confidential</span>
                  </label>
                  <input
                    type="password"
                    placeholder="Set secret password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    className="w-full px-3 py-2 text-sm rounded bg-slate-950 border border-slate-700 focus:border-teal-500 focus:outline-none text-white placeholder-slate-500"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Medical Baseline */}
          {step === 2 && (
            <div className="space-y-4 animate-in fade-in duration-100">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Chief Medical Reason / Primary Diagnosis
                </label>
                <input
                  type="text"
                  placeholder="e.g. Chronic Hypertension Management, Annual Executive Checkup, Post-surgical follow-up"
                  value={primaryDiagnosis}
                  onChange={e => setPrimaryDiagnosis(e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded bg-slate-950 border border-slate-700 focus:border-teal-500 focus:outline-none text-white placeholder-slate-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Known Drug & Environmental Allergies (comma separated)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Penicillin, Sulfa drugs, Latex (or type NKDA)"
                  value={allergiesText}
                  onChange={e => setAllergiesText(e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded bg-slate-950 border border-slate-700 focus:border-teal-500 focus:outline-none text-white placeholder-slate-500"
                />
                <span className="text-[11px] text-slate-500 mt-1 block">
                  Allergies are flagged across all hospital order entry systems and clinical pharmacy dispensaries.
                </span>
              </div>
            </div>
          )}

          {/* Step 3: Insurance */}
          {step === 3 && (
            <div className="space-y-4 animate-in fade-in duration-100">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Healthcare Insurance Provider
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Blue Cross Blue Shield, United Healthcare, Bupa Global"
                    value={insuranceProvider}
                    onChange={e => setInsuranceProvider(e.target.value)}
                    className="w-full px-3 py-2 text-sm rounded bg-slate-950 border border-slate-700 focus:border-teal-500 focus:outline-none text-white placeholder-slate-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Policy / Member ID Number
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. BC-88192-A"
                    value={insurancePolicyNumber}
                    onChange={e => setInsurancePolicyNumber(e.target.value)}
                    className="w-full px-3 py-2 text-sm rounded bg-slate-950 border border-slate-700 focus:border-teal-500 focus:outline-none text-white font-mono placeholder-slate-500"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Emergency Contact */}
          {step === 4 && (
            <div className="space-y-4 animate-in fade-in duration-100">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Emergency Contact Name
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Robert Mercer"
                    value={contactName}
                    onChange={e => setContactName(e.target.value)}
                    className="w-full px-3 py-2 text-sm rounded bg-slate-950 border border-slate-700 focus:border-teal-500 focus:outline-none text-white placeholder-slate-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Relationship
                  </label>
                  <select
                    value={contactRel}
                    onChange={e => setContactRel(e.target.value)}
                    className="w-full px-3 py-2 text-sm rounded bg-slate-950 border border-slate-700 focus:border-teal-500 focus:outline-none text-white"
                  >
                    <option value="Spouse">Spouse</option>
                    <option value="Parent">Parent</option>
                    <option value="Sibling">Sibling</option>
                    <option value="Child">Child</option>
                    <option value="Legal Guardian">Legal Guardian</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Emergency Phone Line
                  </label>
                  <input
                    type="tel"
                    placeholder="+1 (555) 091-2384"
                    value={contactPhone}
                    onChange={e => setContactPhone(e.target.value)}
                    className="w-full px-3 py-2 text-sm rounded bg-slate-950 border border-slate-700 focus:border-teal-500 focus:outline-none text-white placeholder-slate-500"
                  />
                </div>
              </div>

              {/* Review card */}
              <div className="p-3 rounded bg-slate-950 border border-slate-800 text-xs text-slate-300 space-y-1">
                <div className="font-semibold text-white">Intake Summary Verification</div>
                <div className="text-slate-400">
                  Name: <span className="text-slate-200">{fullName || 'Not provided'}</span> · Email: <span className="text-slate-200">{email || 'Not provided'}</span> · Blood: <span className="text-teal-400 font-mono">{bloodType}</span>
                </div>
                <div className="text-slate-400">
                  Primary Payer: <span className="text-slate-200">{insuranceProvider}</span> · Allergies: <span className="text-amber-300">{allergiesText}</span>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Controls */}
          <div className="pt-6 mt-6 border-t border-slate-800 flex items-center justify-between">
            {step > 1 ? (
              <button
                type="button"
                onClick={handleBack}
                className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-400 hover:text-white transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> Back
              </button>
            ) : (
              <button
                type="button"
                onClick={() => setIsOnboardingModalOpen(false)}
                className="px-3 py-2 text-xs font-medium text-slate-400 hover:text-white transition-colors"
              >
                Cancel
              </button>
            )}

            {step < 4 ? (
              <button
                type="button"
                onClick={handleNext}
                disabled={step === 1 && (!fullName.trim() || !email.trim())}
                className="flex items-center gap-1.5 px-5 py-2 text-xs font-semibold rounded bg-teal-500 hover:bg-teal-400 disabled:opacity-50 text-slate-950 shadow-md transition-colors cursor-pointer"
              >
                Continue <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                type="submit"
                className="flex items-center gap-2 px-6 py-2.5 text-xs font-bold rounded bg-teal-500 hover:bg-teal-400 text-slate-950 shadow-lg shadow-teal-950/50 transition-all cursor-pointer"
              >
                <Check className="w-4 h-4" />
                <span>Issue MRN & Activate Portal</span>
              </button>
            )}
          </div>

        </form>

      </div>
    </div>
  );
};
