import React, { useState } from 'react';
import { useClinical } from '../../context/ClinicalContext';
import { 
  Users, 
  UserPlus, 
  Pill, 
  FileText, 
  MessageSquare, 
  Clock, 
  ShieldAlert, 
  Stethoscope, 
  Send, 
  Search, 
  CheckCircle2, 
  AlertTriangle,
  ArrowRight,
  Filter,
  Check,
  Calendar,
  LogOut
} from 'lucide-react';
import { ClinicalDepartment, BloodType, InvoiceItem } from '../../types/clinical';

export const AdminCommandConsole: React.FC = () => {
  const { 
    patients, 
    currentPatient, 
    selectPatient, 
    adminActiveSection, 
    setAdminActiveSection,
    staffPersonas,
    selectedStaffPersona,
    setSelectedStaffPersona,
    assignDoctorToPatient,
    createPrescriptionAndDispatch,
    createInvoiceAndDispatch,
    messages,
    sendMessage,
    handleComprehensiveOnboard,
    setActiveRole,
    setActiveTab,
    logoutAdmin,
    navigateToPublic
  } = useClinical();

  // Search & Filter
  const [patientSearch, setPatientSearch] = useState('');
  const [acuityFilter, setAcuityFilter] = useState<string>('all');

  // Switchboard message state
  const [adminReplyText, setAdminReplyText] = useState('');
  const [switchboardDept, setSwitchboardDept] = useState<ClinicalDepartment>('cardiology');

  // Prescription Form State
  const [rxPatientId, setRxPatientId] = useState(currentPatient.id);
  const [rxMedication, setRxMedication] = useState('Metoprolol Tartrate');
  const [rxDosage, setRxDosage] = useState('25 mg');
  const [rxRoute, setRxRoute] = useState('Oral Tablet');
  const [rxFrequency, setRxFrequency] = useState('Twice daily with meals');
  const [rxDuration, setRxDuration] = useState('90 Days');
  const [rxInstructions, setRxInstructions] = useState('Take with morning and evening meal. Monitor resting pulse prior to dose.');
  const [rxRefills, setRxRefills] = useState(3);
  const [rxDispatchDest, setRxDispatchDest] = useState<'messages' | 'notifications' | 'both'>('both');
  const [rxSuccessMsg, setRxSuccessMsg] = useState(false);

  // Billing Form State
  const [invPatientId, setInvPatientId] = useState(currentPatient.id);
  const [invDepartment, setInvDepartment] = useState('Comprehensive Cardiovascular Diagnostics');
  const [invService, setInvService] = useState('Ambulatory Holter Telemetry & Echocardiogram');
  const [invItemCode, setInvItemCode] = useState('CPT-93306');
  const [invItemDesc, setInvItemDesc] = useState('Complete Transthoracic Echocardiogram with Spectral Doppler');
  const [invTotalAmount, setInvTotalAmount] = useState(1850);
  const [invInsuranceCovered, setInvInsuranceCovered] = useState(1665);
  const [invDueDate, setInvDueDate] = useState('2026-11-15');
  const [invDispatchDest, setInvDispatchDest] = useState<'messages' | 'notifications' | 'both'>('both');
  const [invSuccessMsg, setInvSuccessMsg] = useState(false);

  // Onboarding Form State (Admin side)
  const [newFullName, setNewFullName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [newDob, setNewDob] = useState('1985-05-20');
  const [newBlood, setNewBlood] = useState<BloodType>('O+');
  const [newDiagnosis, setNewDiagnosis] = useState('');
  const [newAllergies, setNewAllergies] = useState('NKDA');
  const [newInsurance, setNewInsurance] = useState('UnitedHealthcare Choice');
  const [newPolicy, setNewPolicy] = useState('UHC-99210-M');
  const [onboardSuccess, setOnboardSuccess] = useState(false);

  // Filtered Patient Queue
  const filteredPatients = patients.filter(p => {
    const matchesSearch = p.fullName.toLowerCase().includes(patientSearch.toLowerCase()) ||
                          p.mrn.toLowerCase().includes(patientSearch.toLowerCase()) ||
                          p.primaryDiagnosis.toLowerCase().includes(patientSearch.toLowerCase());
    const matchesAcuity = acuityFilter === 'all' || p.triageLevel.includes(acuityFilter);
    return matchesSearch && matchesAcuity;
  });

  // Switchboard filtered messages
  const switchboardMessages = messages.filter(
    m => m.patientId === currentPatient.id && m.department === switchboardDept
  );

  const handleAdminSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!adminReplyText.trim()) return;
    sendMessage(switchboardDept, adminReplyText);
    setAdminReplyText('');
  };

  const handlePrescribeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!rxMedication.trim() || !rxDosage.trim()) return;

    createPrescriptionAndDispatch({
      patientId: rxPatientId,
      medication: rxMedication,
      dosage: rxDosage,
      route: rxRoute,
      frequency: rxFrequency,
      duration: rxDuration,
      instructions: rxInstructions,
      refillsRemaining: rxRefills,
      dispatchDestination: rxDispatchDest
    });

    setRxSuccessMsg(true);
    setTimeout(() => setRxSuccessMsg(false), 3000);
  };

  const handleBillingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!invService.trim()) return;

    const items: InvoiceItem[] = [
      {
        id: `item-${Date.now()}`,
        code: invItemCode || 'CPT-GENERAL',
        description: invItemDesc || invService,
        charge: Number(invTotalAmount)
      }
    ];

    createInvoiceAndDispatch({
      patientId: invPatientId,
      department: invDepartment,
      serviceDescription: invService,
      items,
      totalAmount: Number(invTotalAmount),
      insuranceCovered: Number(invInsuranceCovered),
      dueDate: invDueDate,
      dispatchDestination: invDispatchDest
    });

    setInvSuccessMsg(true);
    setTimeout(() => setInvSuccessMsg(false), 3000);
  };

  const handleAdminCreatePatient = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFullName.trim() || !newEmail.trim()) return;

    handleComprehensiveOnboard({
      fullName: newFullName.trim(),
      email: newEmail.trim(),
      phone: newPhone.trim() || '+1 (555) 000-0000',
      dob: newDob,
      gender: 'Other',
      bloodType: newBlood,
      primaryDiagnosis: newDiagnosis.trim() || 'Comprehensive Inpatient Assessment',
      allergies: newAllergies.split(',').map(s => s.trim()).filter(Boolean),
      insuranceProvider: newInsurance.trim() || 'Direct Pay',
      insurancePolicyNumber: newPolicy.trim() || 'POL-DEFAULT',
      emergencyContact: {
        name: 'Hospital Intake Contact',
        relationship: 'Admitting Facility',
        phone: '+1 (555) 999-0000'
      }
    });

    setOnboardSuccess(true);
    setNewFullName('');
    setNewEmail('');
    setTimeout(() => {
      setOnboardSuccess(false);
      setAdminActiveSection('queue');
    }, 1500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 bg-slate-50/50">
      
      {/* Admin Top Console Header */}
      <div className="rounded-2xl bg-white border border-slate-200 p-6 sm:p-7 shadow-clinical space-y-5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="text-xs font-semibold text-teal-700 uppercase tracking-wider mb-1 flex items-center gap-1.5">
              <Stethoscope className="w-3.5 h-3.5" />
              <span>Digital Health Staff & Clinical Command Console</span>
            </div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
              Hospital Operations & Clinical Dispatch Desk
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Assign physicians, manage admissions, dispatch electronic prescriptions & superbills, and communicate directly across departments.
            </p>
          </div>

          {/* Actions & Persona Switcher */}
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            {/* Persona Switcher Dropdown */}
            <div className="flex items-center gap-3 bg-slate-50 p-2 rounded-xl border border-slate-200 shrink-0">
              <div className="w-8 h-8 rounded-lg bg-teal-100 text-teal-800 font-bold font-mono text-xs flex items-center justify-center">
                {selectedStaffPersona.avatarInitials}
              </div>
              <div>
                <div className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">
                  Staff Persona:
                </div>
                <select
                  value={selectedStaffPersona.id}
                  onChange={e => {
                    const persona = staffPersonas.find(p => p.id === e.target.value);
                    if (persona) {
                      setSelectedStaffPersona(persona);
                      setSwitchboardDept(persona.department);
                    }
                  }}
                  className="bg-transparent text-xs font-bold text-slate-900 focus:outline-none cursor-pointer"
                >
                  {staffPersonas.map(sp => (
                    <option key={sp.id} value={sp.id} className="bg-white text-slate-900">
                      {sp.name} ({sp.role.split(' ')[0]})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Exit Admin Portal Button */}
            <button
              onClick={() => {
                logoutAdmin();
                navigateToPublic();
              }}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-100 hover:bg-red-50 text-slate-700 hover:text-red-700 border border-slate-200 text-xs font-semibold transition-colors cursor-pointer"
              title="Sign Out of Admin Console and return to public website"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Exit Admin</span>
            </button>
          </div>
        </div>

        {/* Section Navigation Tabs */}
        <div className="flex items-center gap-1 p-1 rounded-xl bg-slate-100 border border-slate-200 text-xs overflow-x-auto">
          {[
            { id: 'queue', label: 'Patient Queue & Doctor Assignment', icon: Users },
            { id: 'onboard', label: 'Onboard Patient by Email', icon: UserPlus },
            { id: 'prescribe', label: 'Prescription Dispatcher', icon: Pill },
            { id: 'billing', label: 'Invoice & Superbill Dispatcher', icon: FileText },
            { id: 'switchboard', label: 'Multi-Department 2-Way Chat', icon: MessageSquare }
          ].map(sec => {
            const Icon = sec.icon;
            const isActive = adminActiveSection === sec.id;
            return (
              <button
                key={sec.id}
                onClick={() => setAdminActiveSection(sec.id as any)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-lg font-medium whitespace-nowrap transition-colors cursor-pointer ${
                  isActive
                    ? 'bg-teal-600 text-white font-bold shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{sec.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* SECTION 1: PATIENT QUEUE & DOCTOR REASSIGNMENT */}
      {adminActiveSection === 'queue' && (
        <div className="rounded-2xl bg-white border border-slate-200 p-6 shadow-clinical space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
            <div>
              <h3 className="text-base font-bold text-slate-900">Clinical Patient Case Roster ({filteredPatients.length})</h3>
              <p className="text-xs text-slate-500">Live triage acuity and attending doctor assignments</p>
            </div>

            {/* Search & Filter Controls */}
            <div className="flex items-center gap-3">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search name, MRN, diagnosis..."
                  value={patientSearch}
                  onChange={e => setPatientSearch(e.target.value)}
                  className="px-3 py-1.5 pl-8 text-xs rounded-lg border border-slate-300 text-slate-900 placeholder-slate-400 focus:border-teal-600 focus:outline-none w-48 sm:w-64"
                />
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2" />
              </div>

              <select
                value={acuityFilter}
                onChange={e => setAcuityFilter(e.target.value)}
                className="px-2.5 py-1.5 text-xs rounded-lg border border-slate-300 text-slate-700 focus:outline-none"
              >
                <option value="all">All Triage Levels</option>
                <option value="Level 1">Level 1 - Resuscitation</option>
                <option value="Level 2">Level 2 - Emergent</option>
                <option value="Level 3">Level 3 - Urgent</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200">
                <tr>
                  <th className="py-3 px-4">Patient & MRN</th>
                  <th className="py-3 px-4">Primary Diagnosis</th>
                  <th className="py-3 px-4">Triage Acuity</th>
                  <th className="py-3 px-4">Current Vitals</th>
                  <th className="py-3 px-4">Assigned Attending Doctor</th>
                  <th className="py-3 px-4 text-right">Quick Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-mono tabular-nums text-slate-800">
                {filteredPatients.map(p => (
                  <tr 
                    key={p.id} 
                    className={`hover:bg-slate-50 transition-colors ${
                      p.id === currentPatient.id ? 'bg-teal-50/40' : ''
                    }`}
                  >
                    <td className="py-3.5 px-4 font-sans">
                      <div className="font-bold text-slate-900">{p.fullName}</div>
                      <div className="text-[11px] text-teal-800 font-mono font-semibold">{p.mrn} · {p.bloodType}</div>
                    </td>

                    <td className="py-3.5 px-4 font-sans max-w-xs truncate">
                      <div className="truncate text-slate-800 font-medium">{p.primaryDiagnosis}</div>
                      <div className="text-[10px] text-slate-400">{p.admissionDate}</div>
                    </td>

                    <td className="py-3.5 px-4 font-sans">
                      <span className={`text-[10px] font-bold font-mono px-2 py-0.5 rounded ${
                        p.triageLevel.includes('Level 1') ? 'bg-red-100 text-red-800 border border-red-200' :
                        p.triageLevel.includes('Level 2') ? 'bg-amber-100 text-amber-800' :
                        'bg-teal-100 text-teal-800'
                      }`}>
                        {p.triageLevel}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 text-[11px]">
                      <div>HR: <strong className="text-slate-900">{p.vitals.heartRate}</strong> bpm</div>
                      <div className="text-slate-500">BP: {p.vitals.systolicBP}/{p.vitals.diastolicBP}</div>
                    </td>

                    {/* Assigned Doctor Dropdown */}
                    <td className="py-3.5 px-4 font-sans">
                      <select
                        value={p.assignedDoctorId}
                        onChange={e => assignDoctorToPatient(p.id, e.target.value)}
                        className="px-2 py-1 text-xs rounded-lg border border-slate-300 text-slate-800 bg-white focus:border-teal-600 focus:outline-none"
                      >
                        {staffPersonas.map(sp => (
                          <option key={sp.id} value={sp.id}>
                            {sp.name}
                          </option>
                        ))}
                      </select>
                    </td>

                    <td className="py-3.5 px-4 text-right font-sans space-x-2">
                      <button
                        onClick={() => {
                          selectPatient(p.id);
                          setAdminActiveSection('prescribe');
                          setRxPatientId(p.id);
                        }}
                        className="px-2.5 py-1 text-[11px] rounded-md bg-slate-100 hover:bg-slate-200 text-teal-800 font-bold transition-colors cursor-pointer"
                        title="Write Prescription"
                      >
                        Prescribe
                      </button>
                      <button
                        onClick={() => {
                          selectPatient(p.id);
                          setAdminActiveSection('billing');
                          setInvPatientId(p.id);
                        }}
                        className="px-2.5 py-1 text-[11px] rounded-md bg-slate-100 hover:bg-slate-200 text-amber-800 font-bold transition-colors cursor-pointer"
                        title="Generate Bill"
                      >
                        Bill
                      </button>
                      <button
                        onClick={() => {
                          selectPatient(p.id);
                          setActiveRole('patient');
                          setActiveTab('patient_portal');
                        }}
                        className="px-2.5 py-1 text-[11px] rounded-md bg-teal-600 hover:bg-teal-700 text-white font-bold transition-colors cursor-pointer"
                      >
                        Open Portal
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* SECTION 2: ONBOARD PATIENT BY EMAIL (ADMIN INTERFACE) */}
      {adminActiveSection === 'onboard' && (
        <div className="rounded-2xl bg-white border border-slate-200 p-6 sm:p-8 shadow-clinical space-y-6 max-w-3xl mx-auto">
          <div className="pb-4 border-b border-slate-100">
            <h3 className="text-base font-bold text-slate-900">Create & Onboard Patient Account by Email</h3>
            <p className="text-xs text-slate-500">
              Instantly provisions a patient profile, medical record number (MRN), and links them to the hospital network.
            </p>
          </div>

          {onboardSuccess ? (
            <div className="p-8 text-center space-y-3 bg-teal-50 rounded-xl border border-teal-200">
              <CheckCircle2 className="w-12 h-12 text-teal-600 mx-auto" />
              <div className="text-base font-bold text-slate-900">Patient Record Created Successfully</div>
              <p className="text-xs text-slate-600">
                MRN issued and patient added to active hospital queue. Redirecting...
              </p>
            </div>
          ) : (
            <form onSubmit={handleAdminCreatePatient} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Patient Legal Full Name <span className="text-teal-700">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Charlotte Bennett"
                    value={newFullName}
                    onChange={e => setNewFullName(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 text-slate-900 placeholder-slate-400 focus:border-teal-600 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Valid Email Address <span className="text-teal-700">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. charlotte.bennett@healthlink.org"
                    value={newEmail}
                    onChange={e => setNewEmail(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 text-slate-900 placeholder-slate-400 focus:border-teal-600 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Telephone Number
                  </label>
                  <input
                    type="text"
                    placeholder="+1 (555) 782-9011"
                    value={newPhone}
                    onChange={e => setNewPhone(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 text-slate-900 placeholder-slate-400 focus:border-teal-600 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Date of Birth
                  </label>
                  <input
                    type="date"
                    value={newDob}
                    onChange={e => setNewDob(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 text-slate-900 focus:border-teal-600 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Blood Group
                  </label>
                  <select
                    value={newBlood}
                    onChange={e => setNewBlood(e.target.value as BloodType)}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 text-slate-900 font-mono focus:border-teal-600 focus:outline-none"
                  >
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Primary Admitting Diagnosis / Assessment
                </label>
                <input
                  type="text"
                  placeholder="e.g. Post-Percutaneous Coronary Intervention / Cardiac Monitoring"
                  value={newDiagnosis}
                  onChange={e => setNewDiagnosis(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 text-slate-900 placeholder-slate-400 focus:border-teal-600 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Insurance Provider
                  </label>
                  <input
                    type="text"
                    value={newInsurance}
                    onChange={e => setNewInsurance(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 text-slate-900 focus:border-teal-600 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Insurance Member ID
                  </label>
                  <input
                    type="text"
                    value={newPolicy}
                    onChange={e => setNewPolicy(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 text-slate-900 font-mono focus:border-teal-600 focus:outline-none"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-slate-200 flex justify-end">
                <button
                  type="submit"
                  className="flex items-center gap-2 px-6 py-2.5 text-xs font-bold rounded-lg bg-teal-600 hover:bg-teal-700 text-white shadow-xs transition-all cursor-pointer"
                >
                  <UserPlus className="w-4 h-4" />
                  <span>Onboard Patient & Issue Record</span>
                </button>
              </div>
            </form>
          )}
        </div>
      )}

      {/* SECTION 3: PRESCRIPTION GENERATOR & DISPATCHER */}
      {adminActiveSection === 'prescribe' && (
        <div className="rounded-2xl bg-white border border-slate-200 p-6 sm:p-8 shadow-clinical space-y-6 max-w-3xl mx-auto">
          <div className="pb-4 border-b border-slate-100">
            <h3 className="text-base font-bold text-slate-900">Clinical Electronic Prescription Dispatcher</h3>
            <p className="text-xs text-slate-500">
              Authorize medications and dispatch interactive cards directly to patient messages and notification feeds.
            </p>
          </div>

          {rxSuccessMsg && (
            <div className="p-3.5 rounded-lg bg-teal-50 border border-teal-200 flex items-center gap-2 text-xs text-teal-800 font-semibold">
              <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
              <span>Prescription successfully authorized and dispatched to patient destination!</span>
            </div>
          )}

          <form onSubmit={handlePrescribeSubmit} className="space-y-4">
            
            {/* Target Patient */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Select Target Patient
              </label>
              <select
                value={rxPatientId}
                onChange={e => setRxPatientId(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 text-slate-900 focus:border-teal-600 focus:outline-none"
              >
                {patients.map(p => (
                  <option key={p.id} value={p.id}>
                    {p.fullName} ({p.mrn}) · {p.primaryDiagnosis}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Medication (Generic / Brand)
                </label>
                <input
                  type="text"
                  required
                  value={rxMedication}
                  onChange={e => setRxMedication(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 text-slate-900 focus:border-teal-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Dosage Strength
                </label>
                <input
                  type="text"
                  required
                  value={rxDosage}
                  onChange={e => setRxDosage(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 text-slate-900 font-mono focus:border-teal-600 focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Administration Route
                </label>
                <select
                  value={rxRoute}
                  onChange={e => setRxRoute(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 text-slate-900"
                >
                  <option value="Oral Tablet">Oral Tablet</option>
                  <option value="Oral Capsule">Oral Capsule</option>
                  <option value="Intravenous Infusion">Intravenous Infusion</option>
                  <option value="Subcutaneous Injection">Subcutaneous Injection</option>
                  <option value="Inhalation">Inhalation</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Frequency Cadence
                </label>
                <input
                  type="text"
                  value={rxFrequency}
                  onChange={e => setRxFrequency(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 text-slate-900 focus:border-teal-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Refills Permitted
                </label>
                <input
                  type="number"
                  min="0"
                  max="12"
                  value={rxRefills}
                  onChange={e => setRxRefills(Number(e.target.value))}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 text-slate-900 font-mono focus:border-teal-600 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Clinical Administration Instructions for Patient
              </label>
              <textarea
                rows={2}
                value={rxInstructions}
                onChange={e => setRxInstructions(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 text-slate-900 focus:border-teal-600 focus:outline-none"
              />
            </div>

            {/* Inbuilt Send / Dispatch Options */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <label className="block text-xs font-bold text-slate-900">
                Dispatch Target Delivery Channels
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'messages', label: 'Send to Patient Messages' },
                  { id: 'notifications', label: 'Send to Notification Inbox' },
                  { id: 'both', label: 'Send to Both (Recommended)' }
                ].map(opt => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setRxDispatchDest(opt.id as any)}
                    className={`py-2 px-3 text-xs rounded-lg border text-center transition-colors cursor-pointer ${
                      rxDispatchDest === opt.id
                        ? 'border-teal-600 bg-teal-50 text-teal-900 font-bold'
                        : 'border-slate-200 bg-white text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-200 flex justify-end">
              <button
                type="submit"
                className="flex items-center gap-2 px-6 py-2.5 text-xs font-bold rounded-lg bg-teal-600 hover:bg-teal-700 text-white shadow-xs transition-all cursor-pointer"
              >
                <Pill className="w-4 h-4" />
                <span>Authorize & Dispatch Prescription</span>
              </button>
            </div>

          </form>
        </div>
      )}

      {/* SECTION 4: INVOICE & SUPERBILL GENERATOR */}
      {adminActiveSection === 'billing' && (
        <div className="rounded-2xl bg-white border border-slate-200 p-6 sm:p-8 shadow-clinical space-y-6 max-w-3xl mx-auto">
          <div className="pb-4 border-b border-slate-100">
            <h3 className="text-base font-bold text-slate-900">Hospital Superbill & Invoice Generator</h3>
            <p className="text-xs text-slate-500">
              Generate itemized medical invoices with insurance co-pay calculation and dispatch to patient portal.
            </p>
          </div>

          {invSuccessMsg && (
            <div className="p-3.5 rounded-lg bg-teal-50 border border-teal-200 flex items-center gap-2 text-xs text-teal-800 font-semibold">
              <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
              <span>Medical invoice generated and dispatched to patient accounts!</span>
            </div>
          )}

          <form onSubmit={handleBillingSubmit} className="space-y-4">
            
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Target Patient Account
              </label>
              <select
                value={invPatientId}
                onChange={e => setInvPatientId(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 text-slate-900 focus:border-teal-600 focus:outline-none"
              >
                {patients.map(p => (
                  <option key={p.id} value={p.id}>
                    {p.fullName} ({p.mrn}) · Insured by: {p.insuranceProvider}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Hospital Clinical Department
                </label>
                <input
                  type="text"
                  required
                  value={invDepartment}
                  onChange={e => setInvDepartment(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 text-slate-900 focus:border-teal-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Service / Procedure Header
                </label>
                <input
                  type="text"
                  required
                  value={invService}
                  onChange={e => setInvService(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 text-slate-900 focus:border-teal-600 focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  CPT Procedure Code
                </label>
                <input
                  type="text"
                  value={invItemCode}
                  onChange={e => setInvItemCode(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 text-slate-900 font-mono focus:border-teal-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Procedure Line Description
                </label>
                <input
                  type="text"
                  value={invItemDesc}
                  onChange={e => setInvItemDesc(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 text-slate-900 focus:border-teal-600 focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Total Charge ($)
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={invTotalAmount}
                  onChange={e => setInvTotalAmount(Number(e.target.value))}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 text-slate-900 font-mono focus:border-teal-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Insurance Covered ($)
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={invInsuranceCovered}
                  onChange={e => setInvInsuranceCovered(Number(e.target.value))}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 text-slate-900 font-mono focus:border-teal-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Calculated Patient Due
                </label>
                <div className="px-3 py-2 text-xs rounded-lg border border-slate-200 bg-slate-50 text-teal-800 font-bold font-mono">
                  ${Math.max(0, invTotalAmount - invInsuranceCovered).toFixed(2)}
                </div>
              </div>
            </div>

            {/* Inbuilt Dispatch Destination */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <label className="block text-xs font-bold text-slate-900">
                Dispatch Invoice Channels
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'messages', label: 'Send to Patient Messages' },
                  { id: 'notifications', label: 'Send to Notification Inbox' },
                  { id: 'both', label: 'Send to Both (Recommended)' }
                ].map(opt => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setInvDispatchDest(opt.id as any)}
                    className={`py-2 px-3 text-xs rounded-lg border text-center transition-colors cursor-pointer ${
                      invDispatchDest === opt.id
                        ? 'border-teal-600 bg-teal-50 text-teal-900 font-bold'
                        : 'border-slate-200 bg-white text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-200 flex justify-end">
              <button
                type="submit"
                className="flex items-center gap-2 px-6 py-2.5 text-xs font-bold rounded-lg bg-teal-600 hover:bg-teal-700 text-white shadow-xs transition-all cursor-pointer"
              >
                <FileText className="w-4 h-4" />
                <span>Issue & Dispatch Invoice</span>
              </button>
            </div>

          </form>
        </div>
      )}

      {/* SECTION 5: MULTI-DEPARTMENT TWO-WAY CHAT SWITCHBOARD */}
      {adminActiveSection === 'switchboard' && (
        <div className="rounded-2xl bg-white border border-slate-200 overflow-hidden shadow-clinical flex flex-col md:flex-row h-[520px] sm:h-[620px]">
          
          {/* Left: Department and Patient info */}
          <div className="w-full md:w-72 border-b md:border-b-0 md:border-r border-slate-200 bg-slate-50 p-4 space-y-4 shrink-0 max-h-56 md:max-h-none overflow-y-auto">
            <div>
              <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">
                Active Patient Context
              </div>
              <div className="p-3.5 rounded-xl bg-white border border-slate-200 space-y-1 text-xs shadow-xs">
                <div className="font-bold text-slate-900">{currentPatient.fullName}</div>
                <div className="text-teal-800 font-mono text-[11px] font-semibold">{currentPatient.mrn}</div>
                <div className="text-slate-600 text-[11px]">{currentPatient.primaryDiagnosis}</div>
                <div className="text-[10px] text-slate-500 font-mono pt-1 border-t border-slate-100">
                  HR: {currentPatient.vitals.heartRate} bpm · BP: {currentPatient.vitals.systolicBP}/{currentPatient.vitals.diastolicBP}
                </div>
              </div>
            </div>

            <div>
              <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">
                Active Department Channel
              </div>
              <div className="space-y-1 text-xs">
                {[
                  { id: 'cardiology', name: 'Clinical Cardiology' },
                  { id: 'neurology', name: 'Neurology & Stroke' },
                  { id: 'emergency', name: 'Emergency Dispatch' },
                  { id: 'front_desk', name: 'Hospital Front Desk' },
                  { id: 'billing', name: 'Billing & Claims' },
                  { id: 'pharmacy', name: 'Outpatient Pharmacy' }
                ].map(ch => (
                  <button
                    key={ch.id}
                    onClick={() => setSwitchboardDept(ch.id as ClinicalDepartment)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-xs transition-colors cursor-pointer font-medium ${
                      switchboardDept === ch.id
                        ? 'bg-teal-600 text-white font-bold'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                    }`}
                  >
                    {ch.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Response Templates */}
            <div>
              <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                Quick Clinical Presets
              </div>
              <div className="space-y-1">
                {[
                  'Your recent lab assays indicate nominal recovery.',
                  'Prescription has been authorized for in-house pickup.',
                  'Trauma team standing by for immediate evaluation.'
                ].map((tpl, i) => (
                  <button
                    key={i}
                    onClick={() => setAdminReplyText(tpl)}
                    className="w-full text-left p-2 text-[11px] rounded-lg bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 transition-colors"
                  >
                    {tpl}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Message Stream */}
          <div className="flex-1 flex flex-col justify-between bg-white">
            
            {/* Header */}
            <div className="px-6 py-3.5 border-b border-slate-200 bg-slate-50/70 flex items-center justify-between">
              <div>
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  Admin Switchboard · Transmitting as {selectedStaffPersona.name}
                </h4>
                <div className="text-[10px] text-slate-500">
                  Channel: {switchboardDept.toUpperCase()} · Patient: {currentPatient.fullName}
                </div>
              </div>
              <div className="text-[10px] text-teal-800 font-mono font-semibold">
                Staff Role: {selectedStaffPersona.role}
              </div>
            </div>

            {/* Message History */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {switchboardMessages.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center text-xs text-slate-400">
                  <p>No messages in this channel yet.</p>
                  <p className="text-[11px] text-slate-500">Send an initial clinical advisory or instructions to {currentPatient.fullName}.</p>
                </div>
              ) : (
                switchboardMessages.map(msg => {
                  const isStaff = msg.sender === 'staff';
                  return (
                    <div
                      key={msg.id}
                      className={`flex flex-col ${isStaff ? 'items-end' : 'items-start'}`}
                    >
                      <div className="flex items-center gap-2 mb-1 text-[11px]">
                        <span className="font-bold text-slate-800">{msg.senderName}</span>
                        <span className="text-[10px] text-slate-400 font-mono">({msg.senderRole})</span>
                        <span className="text-[10px] font-mono text-slate-400">{msg.timestamp}</span>
                      </div>

                      <div
                        className={`p-4 rounded-2xl max-w-lg text-xs leading-relaxed space-y-2 ${
                          isStaff
                            ? 'bg-teal-600 text-white rounded-br-none shadow-xs'
                            : 'bg-slate-100 border border-slate-200 text-slate-800 rounded-bl-none shadow-xs'
                        }`}
                      >
                        <p>{msg.text}</p>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Admin Input Bar */}
            <form onSubmit={handleAdminSendMessage} className="p-3.5 border-t border-slate-200 bg-slate-50 flex items-center gap-2">
              <input
                type="text"
                value={adminReplyText}
                onChange={e => setAdminReplyText(e.target.value)}
                placeholder={`Transmitting as ${selectedStaffPersona.name} to ${currentPatient.fullName}...`}
                className="flex-1 px-3.5 py-2.5 text-xs rounded-xl bg-white border border-slate-300 text-slate-900 placeholder-slate-400 focus:border-teal-600 focus:outline-none shadow-xs"
              />
              <button
                type="submit"
                disabled={!adminReplyText.trim()}
                className="px-4 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 disabled:opacity-50 text-white font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
              >
                <span>Dispatch Response</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>

          </div>

        </div>
      )}

    </div>
  );
};
