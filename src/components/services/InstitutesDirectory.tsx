import React, { useState } from 'react';
import { useClinical } from '../../context/ClinicalContext';
import { CLINICAL_INSTITUTES } from '../../data/mockClinicalData';
import { ClinicalInstitute } from '../../types/clinical';
import { 
  Heart, 
  Brain, 
  Wind, 
  ShieldAlert, 
  Activity, 
  ArrowRight, 
  CheckCircle2, 
  Calendar, 
  MessageSquare, 
  DollarSign, 
  Clock,
  Search,
  Sparkles
} from 'lucide-react';

export const InstitutesDirectory: React.FC = () => {
  const { 
    setSelectedInstitute, 
    setIsAppointmentModalOpen, 
    setActiveTab, 
    setActiveRole, 
    setPatientSubTab, 
    setSelectedChatDepartment 
  } = useClinical();

  const [activeInstId, setActiveInstId] = useState<string>(CLINICAL_INSTITUTES[0].id);
  const [searchTerm, setSearchTerm] = useState('');

  const activeInstitute = CLINICAL_INSTITUTES.find(i => i.id === activeInstId) || CLINICAL_INSTITUTES[0];

  const filteredInstitutes = CLINICAL_INSTITUTES.filter(inst => 
    inst.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    inst.keyServices.some(s => s.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Editorial Title & Scope */}
      <div className="border-b border-slate-200 pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="text-xs font-semibold text-teal-700 uppercase tracking-wider mb-1">
            David & Shannon Academic Medical Architecture
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Specialized Clinical Institutes & Surgical Services
          </h1>
          <p className="text-sm text-slate-600 mt-1 max-w-3xl">
            Each institute integrates inpatient clinical wards, catheterization & robotic operating theatres, and real-time hemodynamic education suites.
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <input
            type="text"
            placeholder="Search institutes, procedures..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full sm:w-72 px-3 py-2 pl-9 text-xs rounded-lg border border-slate-300 text-slate-900 bg-white focus:border-teal-600 focus:outline-none shadow-sm"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
        </div>
      </div>

      {/* Main Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Institute Selector Cards */}
        <div className="lg:col-span-4 space-y-2.5">
          <div className="text-xs font-bold text-slate-500 uppercase tracking-wider px-1">
            Clinical Centers of Excellence ({filteredInstitutes.length})
          </div>

          <div className="space-y-2">
            {filteredInstitutes.map(inst => {
              const isSelected = inst.id === activeInstId;
              return (
                <button
                  key={inst.id}
                  onClick={() => {
                    setActiveInstId(inst.id);
                    setSelectedInstitute(inst);
                  }}
                  className={`w-full text-left p-4 rounded-xl border transition-all cursor-pointer ${
                    isSelected 
                      ? 'border-teal-600 bg-teal-50/50 shadow-sm' 
                      : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/60'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <h3 className={`text-sm font-bold ${isSelected ? 'text-teal-900' : 'text-slate-900'}`}>
                      {inst.name}
                    </h3>
                    <span className="text-[10px] font-mono text-slate-400 shrink-0 uppercase">
                      {inst.departmentCode}
                    </span>
                  </div>

                  <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                    {inst.tagline}
                  </p>

                  <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px]">
                    <span className="text-slate-600 truncate max-w-[180px]">
                      Director: <strong className="text-slate-800">{inst.directorName.split(',')[0]}</strong>
                    </span>
                    <span className="text-teal-700 font-semibold font-mono">Explore →</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Column: Deep Institute Details & Procedural Ledger */}
        <div className="lg:col-span-8 space-y-6">
          <div className="rounded-2xl bg-white border border-slate-200 p-6 sm:p-8 shadow-clinical space-y-8">
            
            {/* Institute Header */}
            <div className="space-y-3 pb-6 border-b border-slate-100">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <span className="text-xs font-mono font-bold text-teal-700 bg-teal-50 px-2.5 py-1 rounded">
                  INSTITUTE CODE: {activeInstitute.departmentCode.toUpperCase()}
                </span>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsAppointmentModalOpen(true)}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs shadow-md transition-colors cursor-pointer"
                  >
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Book Consultation</span>
                  </button>

                  <button
                    onClick={() => {
                      setActiveRole('patient');
                      setActiveTab('patient_portal');
                      setPatientSubTab('chat');
                      setSelectedChatDepartment(activeInstitute.departmentCode);
                    }}
                    className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs border border-slate-200 transition-colors cursor-pointer"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>Message Desk</span>
                  </button>
                </div>
              </div>

              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                {activeInstitute.name}
              </h2>

              <p className="text-sm text-slate-600 leading-relaxed">
                {activeInstitute.summary}
              </p>

              <div className="text-xs text-slate-500 pt-2 flex items-center gap-2">
                <span>Clinical Leadership:</span>
                <strong className="text-slate-800">{activeInstitute.directorName}</strong>
                <span aria-hidden="true">·</span>
                <span>{activeInstitute.directorRole}</span>
              </div>
            </div>

            {/* Benchmark Clinical Metrics */}
            <div className="space-y-3">
              <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Audited Clinical Quality Benchmarks
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {activeInstitute.clinicalMetrics.map((m, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
                    <div className="text-xl font-bold font-mono text-teal-800 tabular-nums">
                      {m.stat}
                    </div>
                    <div className="text-xs text-slate-600">
                      {m.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Core Specialized Services */}
            <div className="space-y-3">
              <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Specialized Clinical Capabilities & Procedures
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {activeInstitute.keyServices.map((service, idx) => (
                  <div key={idx} className="p-3 rounded-lg bg-slate-50/70 border border-slate-200 flex items-start gap-2.5 text-xs text-slate-800">
                    <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                    <span className="font-medium">{service}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Itemized Common Procedures & Estimated Transparency Ledger */}
            {activeInstitute.commonProcedures && activeInstitute.commonProcedures.length > 0 && (
              <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between">
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    Procedural Transparency & Hospital Estimates
                  </div>
                  <span className="text-[11px] text-teal-700 font-mono">CPT Verified Codes</span>
                </div>

                <div className="overflow-x-auto rounded-xl border border-slate-200">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-100/80 text-slate-600 font-semibold border-b border-slate-200">
                      <tr>
                        <th className="py-2.5 px-4">CPT Code</th>
                        <th className="py-2.5 px-4">Procedure Description</th>
                        <th className="py-2.5 px-4">Typical Recovery</th>
                        <th className="py-2.5 px-4 text-right">Avg Hospital Charge</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-mono tabular-nums text-slate-800">
                      {activeInstitute.commonProcedures.map((proc, i) => (
                        <tr key={i} className="hover:bg-slate-50 transition-colors">
                          <td className="py-3 px-4 font-bold text-teal-800">{proc.code}</td>
                          <td className="py-3 px-4 font-sans font-medium text-slate-900">{proc.name}</td>
                          <td className="py-3 px-4 font-sans text-slate-500">{proc.recoveryTime}</td>
                          <td className="py-3 px-4 text-right font-bold text-slate-900">${proc.avgCost.toFixed(2)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Jump to Interactive Simulation */}
            <div className="p-4 rounded-xl bg-teal-50 border border-teal-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-0.5">
                <div className="text-xs font-bold text-teal-900 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-teal-700" />
                  <span>Interactive Educational Simulation Available</span>
                </div>
                <p className="text-xs text-teal-800">
                  Test virtual patient cases and physiological mechanics corresponding to this institute.
                </p>
              </div>

              <button
                onClick={() => setActiveTab('education')}
                className="px-4 py-2 rounded-lg bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs whitespace-nowrap transition-colors cursor-pointer"
              >
                Launch Simulation Lab →
              </button>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
};
