import React, { useState } from 'react';
import { useClinical } from '../../context/ClinicalContext';
import { 
  Heart, 
  Activity, 
  FlaskConical, 
  Pill, 
  FileText, 
  MessageSquare, 
  Bell, 
  CreditCard, 
  CheckCircle2, 
  Clock, 
  Send, 
  User, 
  AlertTriangle,
  Stethoscope,
  ShieldCheck,
  RotateCw,
  ExternalLink,
  PhoneCall,
  Calendar,
  Video,
  LogOut
} from 'lucide-react';
import { ClinicalDepartment } from '../../types/clinical';

export const PatientPortal: React.FC = () => {
  const { 
    currentPatient, 
    patientSubTab, 
    setPatientSubTab,
    selectedChatDepartment,
    setSelectedChatDepartment,
    messages,
    sendMessage,
    requestPrescriptionRefill,
    setActiveInvoiceToPay,
    setIsInvoicePaymentModalOpen,
    setIsAppointmentModalOpen,
    notifications,
    markNotificationRead,
    markAllNotificationsRead,
    unreadNotificationCount,
    setIsOnboardingModalOpen,
    logoutPatient
  } = useClinical();

  const [chatInputText, setChatInputText] = useState('');

  const filteredMessages = messages.filter(
    m => m.patientId === currentPatient.id && m.department === selectedChatDepartment
  );

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInputText.trim()) return;
    sendMessage(selectedChatDepartment, chatInputText);
    setChatInputText('');
  };

  const handleQuickAttachVitals = () => {
    const text = `Biometric Vitals Transmitted: HR ${currentPatient.vitals.heartRate} bpm · BP ${currentPatient.vitals.systolicBP}/${currentPatient.vitals.diastolicBP} mmHg · SpO2 ${currentPatient.vitals.oxygenSaturation}%.`;
    sendMessage(selectedChatDepartment, text);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 bg-slate-50/40">
      
      {/* Patient Header Card (Luminous Clinical Architecture) */}
      <div className="rounded-2xl bg-white border border-slate-200 p-6 sm:p-7 shadow-clinical relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-2xl bg-teal-50 border border-teal-200 flex items-center justify-center text-teal-800 font-bold text-lg font-mono shrink-0">
              {currentPatient.fullName.split(' ').map(n => n[0]).join('').slice(0, 2)}
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-3 flex-wrap">
                <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                  {currentPatient.fullName}
                </h1>
                <span className="text-xs font-mono font-bold text-teal-800 bg-teal-50 px-2 py-0.5 rounded tabular-nums">
                  MRN: {currentPatient.mrn}
                </span>
                <span className="text-xs text-slate-400">·</span>
                <span className="text-xs font-mono text-slate-600">
                  DOB: {currentPatient.dob}
                </span>
                <span className="text-xs text-slate-400">·</span>
                <span className="text-xs font-mono font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded">
                  Blood: {currentPatient.bloodType}
                </span>
              </div>

              <div className="text-xs text-slate-700">
                Primary Diagnosis: <span className="text-slate-900 font-semibold">{currentPatient.primaryDiagnosis}</span>
              </div>

              {/* Unboxed Metadata Row */}
              <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 pt-1">
                <span>Attending: <strong className="text-slate-800 font-medium">{currentPatient.assignedDoctorName}</strong></span>
                <span aria-hidden="true">·</span>
                <span>Payer: <strong className="text-slate-800 font-medium">{currentPatient.insuranceProvider}</strong></span>
                <span aria-hidden="true">·</span>
                <span>Triage Acuity: <strong className="text-teal-800 font-medium">{currentPatient.triageLevel}</strong></span>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex items-center gap-2.5 shrink-0">
            <button
              onClick={() => setIsAppointmentModalOpen(true)}
              className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-lg bg-teal-600 hover:bg-teal-700 text-white shadow-xs transition-colors cursor-pointer"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Book Appointment</span>
            </button>
            <button
              onClick={() => {
                setPatientSubTab('chat');
                setSelectedChatDepartment('cardiology');
              }}
              className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-lg border border-slate-300 bg-white hover:bg-slate-50 text-slate-800 transition-colors cursor-pointer"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Message Team</span>
            </button>
            <button
              onClick={logoutPatient}
              className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg border border-red-200 bg-red-50/50 hover:bg-red-100 text-red-700 transition-colors cursor-pointer"
              title="Sign out and return to public website"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          </div>

        </div>

        {/* Allergy Warning Strip */}
        <div className="mt-4 pt-4 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0" />
            <span>Documented Allergies:</span>
            <span className="text-amber-800 font-semibold bg-amber-50 px-2 py-0.5 rounded">{currentPatient.allergies.join(', ')}</span>
          </div>
          <div className="text-[11px] font-mono text-slate-400">
            Emergency Proxy: {currentPatient.emergencyContact.name} ({currentPatient.emergencyContact.relationship}) · {currentPatient.emergencyContact.phone}
          </div>
        </div>
      </div>

      {/* Sub-Navigation Tabs */}
      <div className="flex items-center gap-1.5 p-1 rounded-xl bg-white border border-slate-200 text-xs overflow-x-auto shadow-xs">
        {[
          { id: 'biometrics', label: 'Biometrics & Telemetry', icon: Activity },
          { id: 'labs', label: 'Diagnostic Lab Panels', icon: FlaskConical },
          { id: 'prescriptions', label: 'Prescriptions & Regimen', icon: Pill },
          { id: 'billing', label: 'Itemized Superbills', icon: FileText },
          { id: 'appointments', label: 'Scheduled Consultations', icon: Calendar },
          { id: 'chat', label: '2-Way Consultation Desk', icon: MessageSquare },
          { id: 'notifications', label: 'Activity & Alerts', icon: Bell }
        ].map(tab => {
          const Icon = tab.icon;
          const isActive = patientSubTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setPatientSubTab(tab.id as any)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg font-medium whitespace-nowrap transition-colors cursor-pointer ${
                isActive
                  ? 'bg-teal-600 text-white font-bold shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
              {tab.id === 'notifications' && unreadNotificationCount > 0 && (
                <span className="w-2 h-2 rounded-full bg-teal-400"></span>
              )}
            </button>
          );
        })}
      </div>

      {/* SUB-TAB 1: BIOMETRICS & CONTINUOUS TELEMETRY */}
      {patientSubTab === 'biometrics' && (
        <div className="space-y-6">
          
          {/* Continuous ECG Monitor */}
          <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6 shadow-clinical-lg text-white bg-ecg-grid-dark relative overflow-hidden">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-4">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-teal-400 animate-pulse"></span>
                <span className="text-xs font-bold uppercase tracking-wider text-white">
                  Real-Time Lead II ECG Rhythm Strip & Continuous Telemetry
                </span>
              </div>
              <div className="text-[11px] font-mono text-teal-400 tabular-nums">
                SWEEP: 25 mm/s · GAIN: 10 mm/mV · {currentPatient.vitals.ecgRhythm}
              </div>
            </div>

            {/* Live Waveform */}
            <div className="w-full h-28 relative overflow-hidden">
              <svg viewBox="0 0 800 80" className="w-full h-full preserve-3d" preserveAspectRatio="none">
                <path
                  d="M0,40 L80,40 L90,38 L95,43 L105,40 L115,40 L120,50 L126,8 L134,68 L140,40 L155,40 L168,32 L185,40 L260,40 L270,38 L275,43 L285,40 L295,40 L300,50 L306,8 L314,68 L320,40 L335,40 L348,32 L365,40 L440,40 L450,38 L455,43 L465,40 L475,40 L480,50 L486,8 L494,68 L500,40 L515,40 L528,32 L545,40 L620,40 L630,38 L635,43 L645,40 L655,40 L660,50 L666,8 L674,68 L680,40 L695,40 L708,32 L725,40 L800,40"
                  fill="none"
                  stroke="#14b8a6"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>

          {/* Vitals Telemetry Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { label: 'Heart Rate', value: currentPatient.vitals.heartRate, unit: 'bpm', normal: '60–100', status: 'normal' },
              { label: 'Blood Pressure', value: `${currentPatient.vitals.systolicBP}/${currentPatient.vitals.diastolicBP}`, unit: 'mmHg', normal: '<130/80', status: 'normal' },
              { label: 'SpO2 Oxygen', value: currentPatient.vitals.oxygenSaturation, unit: '%', normal: '95–100%', status: 'normal' },
              { label: 'Respiratory Rate', value: currentPatient.vitals.respiratoryRate, unit: 'breaths/min', normal: '12–20', status: 'normal' },
              { label: 'Core Temp', value: currentPatient.vitals.temperature, unit: '°C', normal: '36.5–37.5', status: 'normal' },
              { label: 'Serum Glucose', value: currentPatient.vitals.glucose, unit: 'mg/dL', normal: '70–140', status: 'normal' }
            ].map((v, i) => (
              <div key={i} className="p-4 rounded-xl bg-white border border-slate-200 shadow-clinical space-y-1">
                <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  {v.label}
                </div>
                <div className="text-xl font-extrabold font-mono text-slate-900 tabular-nums flex items-baseline gap-1">
                  <span>{v.value}</span>
                  <span className="text-xs font-normal text-slate-500">{v.unit}</span>
                </div>
                <div className="text-[10px] text-slate-400 font-mono">
                  Ref: {v.normal}
                </div>
              </div>
            ))}
          </div>

          {/* Follow-up Reminders */}
          <div className="rounded-2xl bg-white border border-slate-200 p-6 shadow-clinical">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4 flex items-center gap-2">
              <Clock className="w-4 h-4 text-teal-700" />
              <span>Automated Clinical Follow-up Protocols</span>
            </h3>

            {currentPatient.followUpReminders.length === 0 ? (
              <div className="text-xs text-slate-500 py-4">No pending follow-up protocols.</div>
            ) : (
              <div className="space-y-3">
                {currentPatient.followUpReminders.map(rem => (
                  <div key={rem.id} className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                    <div>
                      <div className="font-bold text-slate-900">{rem.title}</div>
                      <div className="text-slate-600 text-[11px] mt-0.5">{rem.instructions}</div>
                      <div className="text-[10px] font-mono text-teal-800 mt-1 font-semibold">
                        Ordering Physician: {rem.doctorName}
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <div className="font-mono text-slate-900 font-bold">{rem.date}</div>
                      <div className="text-[10px] text-teal-700 font-semibold">Scheduled In-Clinic</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>
      )}

      {/* SUB-TAB 2: DIAGNOSTIC LAB ASSAYS */}
      {patientSubTab === 'labs' && (
        <div className="rounded-2xl bg-white border border-slate-200 p-6 shadow-clinical space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-100">
            <div>
              <h3 className="text-base font-bold text-slate-900">Diagnostic Laboratory Assays & Panels</h3>
              <p className="text-xs text-slate-500">Specimens analyzed under ISO 15189 accreditation standards</p>
            </div>
            <div className="text-xs font-mono text-slate-500">
              Last Assayed: {currentPatient.labResults[0]?.collectedDate || 'Today'}
            </div>
          </div>

          <div className="space-y-4">
            {currentPatient.labResults.map(lab => {
              const rangeWidth = lab.normalMax - lab.normalMin;
              const relativeVal = lab.value - lab.normalMin;
              const percent = Math.min(100, Math.max(0, (relativeVal / rangeWidth) * 100));

              return (
                <div key={lab.id} className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs gap-1">
                    <div>
                      <span className="font-bold text-slate-900">{lab.name}</span>
                      <span className="text-slate-500 ml-2 font-mono">({lab.category})</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="font-mono font-extrabold text-slate-900 tabular-nums text-sm">
                        {lab.value} <span className="text-xs font-normal text-slate-500">{lab.unit}</span>
                      </span>
                      <span className={`text-[10px] uppercase font-bold font-mono px-2 py-0.5 rounded ${
                        lab.status === 'normal' ? 'bg-teal-100 text-teal-800' :
                        lab.status === 'borderline' ? 'bg-amber-100 text-amber-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {lab.status}
                      </span>
                    </div>
                  </div>

                  {/* Range visual bar */}
                  <div className="space-y-1">
                    <div className="h-2 rounded-full bg-slate-200 relative overflow-hidden">
                      <div className="absolute inset-y-0 left-1/4 right-1/4 bg-teal-200"></div>
                      <div 
                        className={`absolute top-0 bottom-0 w-2.5 rounded-full ${
                          lab.status === 'normal' ? 'bg-teal-600' : 'bg-red-600'
                        }`}
                        style={{ left: `${Math.min(96, Math.max(4, percent))}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between text-[10px] font-mono text-slate-500">
                      <span>Low: {lab.normalMin} {lab.unit}</span>
                      <span>Target Reference Interval</span>
                      <span>High: {lab.normalMax} {lab.unit}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* SUB-TAB 3: PRESCRIPTIONS & REGIMEN */}
      {patientSubTab === 'prescriptions' && (
        <div className="rounded-2xl bg-white border border-slate-200 p-6 shadow-clinical space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-100">
            <div>
              <h3 className="text-base font-bold text-slate-900">Active Pharmacotherapy Regimen</h3>
              <p className="text-xs text-slate-500">Electronic Prescriptions linked to David & Shannon Outpatient Dispensary</p>
            </div>
            <button
              onClick={() => {
                setPatientSubTab('chat');
                setSelectedChatDepartment('pharmacy');
              }}
              className="text-xs text-teal-700 hover:underline font-bold flex items-center gap-1 cursor-pointer"
            >
              Consult Clinical Pharmacist
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {currentPatient.prescriptions.map(rx => (
              <div key={rx.id} className="p-5 rounded-xl bg-slate-50 border border-slate-200 flex flex-col justify-between space-y-3">
                <div className="space-y-1.5">
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="text-sm font-bold text-slate-900">{rx.medication}</h4>
                    <span className="text-[10px] font-mono text-teal-800 bg-teal-100 px-2 py-0.5 rounded font-bold">
                      {rx.status}
                    </span>
                  </div>
                  <div className="text-xs text-slate-700 font-mono">
                    Dosage: <strong className="text-teal-800">{rx.dosage}</strong> · Route: {rx.route}
                  </div>
                  <div className="text-xs text-slate-600">
                    Frequency: {rx.frequency} · Duration: {rx.duration}
                  </div>
                  <p className="text-[11px] text-slate-600 pt-1 leading-relaxed border-t border-slate-200">
                    {rx.instructions}
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-200 flex items-center justify-between text-xs">
                  <div className="text-[10px] text-slate-500 font-mono">
                    Refills Remaining: {rx.refillsRemaining} · Dr. {rx.prescribingDoctor.split(',')[0]}
                  </div>

                  <button
                    onClick={() => requestPrescriptionRefill(rx.id)}
                    disabled={rx.status === 'Pending Refill'}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-teal-600 hover:bg-teal-700 text-white transition-colors disabled:opacity-50 cursor-pointer"
                  >
                    <RotateCw className="w-3 h-3" />
                    <span>{rx.status === 'Pending Refill' ? 'Refill Pending' : 'Request Refill'}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SUB-TAB 4: ITEMIZED BILLING & INVOICES */}
      {patientSubTab === 'billing' && (
        <div className="rounded-2xl bg-white border border-slate-200 p-6 shadow-clinical space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-100">
            <div>
              <h3 className="text-base font-bold text-slate-900">Itemized Hospital Superbills & Financial Statements</h3>
              <p className="text-xs text-slate-500">Transparent charges, verified CPT codes, and online settlement</p>
            </div>
            <button
              onClick={() => {
                setPatientSubTab('chat');
                setSelectedChatDepartment('billing');
              }}
              className="text-xs text-teal-700 hover:underline font-bold flex items-center gap-1 cursor-pointer"
            >
              Contact Patient Financial Advocate
            </button>
          </div>

          {currentPatient.invoices.length === 0 ? (
            <div className="py-8 text-center text-xs text-slate-400">
              No outstanding or past hospital statements recorded.
            </div>
          ) : (
            <div className="space-y-4">
              {currentPatient.invoices.map(inv => (
                <div key={inv.id} className="p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-900 text-sm">{inv.serviceDescription}</span>
                        <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold ${
                          inv.status === 'Paid' ? 'bg-teal-100 text-teal-800' : 'bg-amber-100 text-amber-800'
                        }`}>
                          {inv.status}
                        </span>
                      </div>
                      <div className="text-xs text-slate-500 mt-0.5 font-mono">
                        {inv.invoiceNumber} · {inv.department} · Due: {inv.dueDate}
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="text-base font-extrabold font-mono text-slate-900 tabular-nums">
                        ${inv.patientDue.toFixed(2)}
                      </div>
                      <div className="text-[10px] text-slate-500">
                        Patient Copay (Total: ${inv.totalAmount.toFixed(2)})
                      </div>
                    </div>
                  </div>

                  {/* Line Items */}
                  {inv.items && inv.items.length > 0 && (
                    <div className="divide-y divide-slate-200 border-t border-b border-slate-200 py-2 text-xs">
                      {inv.items.map(item => (
                        <div key={item.id} className="py-1.5 flex items-center justify-between text-slate-600">
                          <span>
                            <strong className="text-slate-800 font-mono">{item.code}</strong>: {item.description}
                          </span>
                          <span className="font-mono text-slate-900 font-semibold tabular-nums">
                            ${item.charge.toFixed(2)}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex items-center justify-between text-xs pt-1">
                    <div className="text-[11px] text-slate-500">
                      Insurance Subsidized: <span className="text-teal-800 font-mono font-bold">${inv.insuranceCovered.toFixed(2)}</span>
                    </div>

                    {inv.status !== 'Paid' ? (
                      <button
                        onClick={() => {
                          setActiveInvoiceToPay(inv);
                          setIsInvoicePaymentModalOpen(true);
                        }}
                        className="flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-lg bg-teal-600 hover:bg-teal-700 text-white shadow-xs transition-all cursor-pointer"
                      >
                        <CreditCard className="w-3.5 h-3.5" />
                        <span>Settle Balance (${inv.patientDue.toFixed(2)})</span>
                      </button>
                    ) : (
                      <div className="flex items-center gap-1.5 text-teal-800 font-bold">
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Paid & Archived · Receipt: {inv.receiptNumber || 'REC-CONFIRMED'}</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* SUB-TAB 5: SCHEDULED CONSULTATIONS & APPOINTMENTS */}
      {patientSubTab === 'appointments' && (
        <div className="rounded-2xl bg-white border border-slate-200 p-6 shadow-clinical space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-100">
            <div>
              <h3 className="text-base font-bold text-slate-900">Scheduled Clinical Consultations</h3>
              <p className="text-xs text-slate-500">In-clinic physician bays & encrypted telemedicine tele-consults</p>
            </div>
            <button
              onClick={() => setIsAppointmentModalOpen(true)}
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold shadow-xs cursor-pointer"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Schedule New Consultation</span>
            </button>
          </div>

          {!currentPatient.appointments || currentPatient.appointments.length === 0 ? (
            <div className="py-8 text-center text-xs text-slate-400">
              No appointments scheduled. Click above to book an appointment with our clinical faculty.
            </div>
          ) : (
            <div className="space-y-3">
              {currentPatient.appointments.map(apt => (
                <div key={apt.id} className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900 text-sm">{apt.type}</span>
                      <span className="text-[10px] font-mono font-bold text-teal-800 bg-teal-100 px-2 py-0.5 rounded">
                        {apt.status}
                      </span>
                    </div>
                    <div className="text-xs text-slate-700">
                      With <strong className="text-slate-900">{apt.doctorName}</strong> ({apt.doctorRole})
                    </div>
                    <div className="text-[11px] text-slate-500">
                      Location / Connection: <span className="font-mono text-slate-700">{apt.roomOrLink}</span>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <div className="text-sm font-extrabold font-mono text-slate-900 tabular-nums">
                      {apt.date} · {apt.timeSlot}
                    </div>
                    <button
                      onClick={() => {
                        setPatientSubTab('chat');
                        setSelectedChatDepartment('cardiology');
                      }}
                      className="text-xs text-teal-700 hover:underline font-semibold mt-1 inline-block"
                    >
                      Message Doctor Bay →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* SUB-TAB 6: CLINICAL CONSULTATION DESK & 2-WAY CHAT */}
      {patientSubTab === 'chat' && (
        <div className="rounded-2xl bg-white border border-slate-200 overflow-hidden shadow-clinical flex flex-col md:flex-row h-[520px] sm:h-[620px]">
          
          {/* Left Column: Department Channels */}
          <div className="w-full md:w-68 border-b md:border-b-0 md:border-r border-slate-200 bg-slate-50 p-3 sm:p-3.5 space-y-1.5 shrink-0 max-h-48 md:max-h-none overflow-y-auto">
            <div className="px-2.5 py-1 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              Hospital Communication Channels
            </div>

            {[
              { id: 'cardiology', name: 'Clinical Cardiology', subtitle: 'Dr. Julian Vance', icon: Heart },
              { id: 'neurology', name: 'Neurology & Stroke', subtitle: 'Dr. Alistair Chen', icon: Activity },
              { id: 'emergency', name: 'Emergency Dispatch', subtitle: 'Officer Liam (Trauma)', icon: PhoneCall },
              { id: 'front_desk', name: 'Hospital Front Desk', subtitle: 'Shannon Sterling, RN', icon: User },
              { id: 'billing', name: 'Billing & Claims', subtitle: 'Elena Rostova, CHC', icon: FileText },
              { id: 'pharmacy', name: 'Outpatient Pharmacy', subtitle: 'Dr. Marcus Thorne', icon: Pill }
            ].map(channel => {
              const Icon = channel.icon;
              const isSelected = selectedChatDepartment === channel.id;
              return (
                <button
                  key={channel.id}
                  onClick={() => setSelectedChatDepartment(channel.id as ClinicalDepartment)}
                  className={`w-full text-left p-2.5 rounded-xl text-xs transition-colors flex items-start gap-2.5 cursor-pointer ${
                    isSelected
                      ? 'bg-teal-600 text-white font-semibold shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <Icon className={`w-4 h-4 mt-0.5 shrink-0 ${isSelected ? 'text-white' : 'text-slate-400'}`} />
                  <div className="truncate">
                    <div className="font-bold truncate">{channel.name}</div>
                    <div className={`text-[10px] truncate ${isSelected ? 'text-teal-100' : 'text-slate-400'}`}>{channel.subtitle}</div>
                  </div>
                </button>
              );
            })}

            <div className="pt-4 mt-4 border-t border-slate-200">
              <button
                onClick={handleQuickAttachVitals}
                className="w-full py-2 px-2.5 text-[11px] font-bold rounded-lg bg-teal-50 hover:bg-teal-100 text-teal-800 border border-teal-200 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Activity className="w-3.5 h-3.5" />
                <span>Transmit Current Telemetry</span>
              </button>
            </div>
          </div>

          {/* Right Column: 2-Way Message Stream */}
          <div className="flex-1 flex flex-col justify-between bg-white">
            
            {/* Thread Header */}
            <div className="px-6 py-3.5 border-b border-slate-200 bg-slate-50/70 flex items-center justify-between">
              <div>
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  Secure Communication · {selectedChatDepartment.toUpperCase()}
                </h4>
                <div className="text-[11px] text-slate-500">
                  Medical Record: {currentPatient.mrn} · Patient: {currentPatient.fullName}
                </div>
              </div>

              <div className="text-[10px] font-mono text-teal-800 flex items-center gap-1 font-semibold">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>HIPAA Encrypted Protocol</span>
              </div>
            </div>

            {/* Messages Body */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {filteredMessages.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center text-xs text-slate-400 space-y-2">
                  <Stethoscope className="w-8 h-8 text-slate-300" />
                  <p>Channel opened with {selectedChatDepartment}.</p>
                  <p className="text-[11px] text-slate-500">Send an inquiry or transmit current vitals to your attending care team.</p>
                </div>
              ) : (
                filteredMessages.map(msg => {
                  const isPatient = msg.sender === 'patient';
                  return (
                    <div
                      key={msg.id}
                      className={`flex flex-col ${isPatient ? 'items-end' : 'items-start'}`}
                    >
                      <div className="flex items-center gap-2 mb-1 text-[11px]">
                        <span className="font-bold text-slate-800">{msg.senderName}</span>
                        <span className="text-[10px] text-slate-400 font-mono">({msg.senderRole})</span>
                        <span className="text-[10px] font-mono text-slate-400">{msg.timestamp}</span>
                      </div>

                      <div
                        className={`p-4 rounded-2xl max-w-lg text-xs leading-relaxed space-y-2.5 ${
                          isPatient
                            ? 'bg-teal-600 text-white rounded-br-none shadow-xs'
                            : 'bg-slate-100 border border-slate-200 text-slate-800 rounded-bl-none shadow-xs'
                        }`}
                      >
                        <p>{msg.text}</p>

                        {/* Prescription Card */}
                        {msg.attachment?.type === 'prescription' && (
                          <div className="p-3 rounded-xl bg-white border border-slate-200 text-slate-800 text-xs space-y-1 shadow-xs">
                            <div className="flex items-center justify-between text-teal-800 font-bold">
                              <span className="flex items-center gap-1.5">
                                <Pill className="w-3.5 h-3.5" />
                                <span>{msg.attachment.data.medication}</span>
                              </span>
                              <span className="text-[10px] font-mono text-slate-500">
                                Refills: {msg.attachment.data.refillsRemaining}
                              </span>
                            </div>
                            <div className="text-[11px] text-slate-600">
                              {msg.attachment.data.instructions}
                            </div>
                          </div>
                        )}

                        {/* Invoice Card */}
                        {msg.attachment?.type === 'invoice' && (
                          <div className="p-3 rounded-xl bg-white border border-slate-200 text-slate-800 text-xs space-y-2 shadow-xs">
                            <div className="flex items-center justify-between">
                              <span className="font-mono font-bold text-slate-900">
                                {msg.attachment.data.invoiceNumber}
                              </span>
                              <span className="text-teal-800 font-extrabold font-mono">
                                Copay Due: ${msg.attachment.data.patientDue.toFixed(2)}
                              </span>
                            </div>
                            {msg.attachment.data.status !== 'Paid' ? (
                              <button
                                onClick={() => {
                                  const targetInv = currentPatient.invoices.find(i => i.id === msg.attachment?.data.id);
                                  if (targetInv) {
                                    setActiveInvoiceToPay(targetInv);
                                    setIsInvoicePaymentModalOpen(true);
                                  }
                                }}
                                className="w-full py-1.5 text-center rounded-lg bg-teal-600 hover:bg-teal-700 text-white font-bold text-[11px] transition-colors cursor-pointer"
                              >
                                Settle Hospital Invoice Online
                              </button>
                            ) : (
                              <div className="text-teal-800 text-[11px] font-bold flex items-center gap-1">
                                <CheckCircle2 className="w-3.5 h-3.5" /> Settled in Full
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Input Bar */}
            <form onSubmit={handleSendMessage} className="p-3.5 border-t border-slate-200 bg-slate-50 flex items-center gap-2">
              <input
                type="text"
                value={chatInputText}
                onChange={e => setChatInputText(e.target.value)}
                placeholder={`Type message to ${selectedChatDepartment}...`}
                className="flex-1 px-3.5 py-2.5 text-xs rounded-xl bg-white border border-slate-300 text-slate-900 placeholder-slate-400 focus:border-teal-600 focus:outline-none shadow-xs"
              />
              <button
                type="submit"
                disabled={!chatInputText.trim()}
                className="px-4 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 disabled:opacity-50 text-white font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
              >
                <span>Send</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>

          </div>

        </div>
      )}

      {/* SUB-TAB 7: NOTIFICATIONS & ACTIVITY STREAM */}
      {patientSubTab === 'notifications' && (
        <div className="rounded-2xl bg-white border border-slate-200 p-6 shadow-clinical space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h3 className="text-base font-bold text-slate-900">Clinical Directives & Alerts Feed</h3>
            {unreadNotificationCount > 0 && (
              <button
                onClick={markAllNotificationsRead}
                className="text-xs text-teal-700 hover:underline font-semibold cursor-pointer"
              >
                Mark all as read
              </button>
            )}
          </div>

          <div className="space-y-2.5">
            {notifications.filter(n => n.patientId === currentPatient.id).map(n => (
              <div
                key={n.id}
                onClick={() => {
                  markNotificationRead(n.id);
                  if (n.actionTargetTab) setPatientSubTab(n.actionTargetTab);
                }}
                className={`p-4 rounded-xl border transition-colors cursor-pointer flex items-start justify-between gap-4 ${
                  !n.read 
                    ? 'border-teal-300 bg-teal-50/60 hover:bg-teal-50' 
                    : 'border-slate-200 bg-slate-50/60 hover:bg-slate-50'
                }`}
              >
                <div>
                  <div className="text-xs font-bold text-slate-900 flex items-center gap-2">
                    <span>{n.title}</span>
                    {!n.read && <span className="w-2 h-2 rounded-full bg-teal-600"></span>}
                  </div>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">{n.message}</p>
                  <div className="text-[10px] font-mono text-slate-400 mt-1">
                    {n.timestamp}
                  </div>
                </div>

                <div className="text-teal-700 text-xs font-bold shrink-0 flex items-center gap-1">
                  <span>Open</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
