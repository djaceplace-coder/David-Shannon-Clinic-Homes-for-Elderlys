import React, { useState } from 'react';
import { useClinical } from '../../context/ClinicalContext';
import { ShieldAlert, X, AlertTriangle, ArrowRight, Ambulance } from 'lucide-react';

export const EmergencyIntakeModal: React.FC = () => {
  const { 
    isEmergencyModalOpen, 
    setIsEmergencyModalOpen, 
    handleEmergencyRapidIntake,
    setActiveRole,
    setActiveTab,
    setPatientSubTab,
    setSelectedChatDepartment
  } = useClinical();

  const [fullName, setFullName] = useState('');
  const [chiefComplaint, setChiefComplaint] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [acuity, setAcuity] = useState<'Immediate Trauma / Resuscitation' | 'High Acuity / Emergent' | 'Chest Pain / Stroke Suspect'>('Immediate Trauma / Resuscitation');

  if (!isEmergencyModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chiefComplaint.trim()) return;

    handleEmergencyRapidIntake({
      fullName: fullName.trim() || 'Emergency Patient (Stat)',
      chiefComplaint: chiefComplaint.trim(),
      contactPhone: contactPhone.trim(),
      acuity
    });

    setIsEmergencyModalOpen(false);
    setActiveRole('patient');
    setActiveTab('patient_portal');
    setPatientSubTab('chat');
    setSelectedChatDepartment('emergency');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="w-full max-w-lg rounded-xl bg-slate-900 border-2 border-red-500/80 shadow-2xl shadow-red-950/60 overflow-hidden text-slate-100">
        
        {/* Header */}
        <div className="bg-red-600 px-6 py-4 flex items-center justify-between text-white">
          <div className="flex items-center gap-3">
            <span className="p-2 rounded bg-red-700/80">
              <Ambulance className="w-6 h-6 animate-pulse" />
            </span>
            <div>
              <h2 className="text-base font-bold tracking-tight uppercase">
                Rapid Emergency Lifeline Intake
              </h2>
              <p className="text-xs text-red-100">
                Level 1 Trauma Triage & Immediate Resuscitation Link
              </p>
            </div>
          </div>
          <button 
            onClick={() => setIsEmergencyModalOpen(false)}
            className="p-1 rounded text-red-100 hover:text-white hover:bg-red-700/80 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="p-3 rounded bg-red-950/40 border border-red-800/40 flex items-start gap-2.5 text-xs text-red-200">
            <AlertTriangle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
            <span>
              This pathway bypasses standard paperwork for immediate life-safety triage. An Emergency MRN is generated instantly and transmitted to Dispatch.
            </span>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Patient Full Name or Identifier (Optional if Unconscious)
            </label>
            <input
              type="text"
              placeholder="e.g. John Doe / Trauma Admit Alpha"
              value={fullName}
              onChange={e => setFullName(e.target.value)}
              className="w-full px-3 py-2 text-sm rounded bg-slate-950 border border-slate-700 focus:border-red-500 focus:outline-none text-white placeholder-slate-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Immediate Chief Complaint & Symptoms <span className="text-red-400">*</span>
            </label>
            <textarea
              required
              rows={3}
              placeholder="Describe acute emergency: e.g. severe crushing chest pain, dyspnea, arterial hemorrhage, unresponsive..."
              value={chiefComplaint}
              onChange={e => setChiefComplaint(e.target.value)}
              className="w-full px-3 py-2 text-sm rounded bg-slate-950 border border-slate-700 focus:border-red-500 focus:outline-none text-white placeholder-slate-500"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Triage Clinical Acuity
              </label>
              <select
                value={acuity}
                onChange={e => setAcuity(e.target.value as any)}
                className="w-full px-3 py-2 text-xs rounded bg-slate-950 border border-slate-700 focus:border-red-500 focus:outline-none text-white"
              >
                <option value="Immediate Trauma / Resuscitation">Immediate Trauma / Resuscitation</option>
                <option value="High Acuity / Emergent">High Acuity / Emergent</option>
                <option value="Chest Pain / Stroke Suspect">Chest Pain / Stroke Suspect</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                EMS / Caller Contact Line
              </label>
              <input
                type="text"
                placeholder="+1 (555) 000-0000"
                value={contactPhone}
                onChange={e => setContactPhone(e.target.value)}
                className="w-full px-3 py-2 text-sm rounded bg-slate-950 border border-slate-700 focus:border-red-500 focus:outline-none text-white placeholder-slate-500"
              />
            </div>
          </div>

          {/* Quick preset selector */}
          <div className="pt-2">
            <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
              Rapid Clinical Presets
            </div>
            <div className="flex flex-wrap gap-2">
              {[
                { label: 'Chest Pressure / STEMI', complaint: 'Crushing retrosternal chest pain radiating to left arm with diaphoresis' },
                { label: 'Acute Stroke Symptoms', complaint: 'Sudden left-sided hemiparesis and facial droop onset < 60 min' },
                { label: 'Trauma & Blood Loss', complaint: 'High-speed motor vehicle collision with blunt thoracic impact and hypotension' }
              ].map((preset, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    setChiefComplaint(preset.complaint);
                  }}
                  className="px-2.5 py-1 text-[11px] rounded bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 border border-slate-700/60 transition-colors"
                >
                  {preset.label}
                </button>
              ))}
            </div>
          </div>

          {/* Submit Action */}
          <div className="pt-4 flex items-center justify-end gap-3 border-t border-slate-800">
            <button
              type="button"
              onClick={() => setIsEmergencyModalOpen(false)}
              className="px-4 py-2 text-xs font-medium text-slate-400 hover:text-white transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex items-center gap-2 px-5 py-2.5 text-xs font-bold rounded bg-red-600 hover:bg-red-500 text-white shadow-lg shadow-red-900/50 transition-all cursor-pointer"
            >
              <ShieldAlert className="w-4 h-4" />
              <span>Admit & Link Emergency Dispatch</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
