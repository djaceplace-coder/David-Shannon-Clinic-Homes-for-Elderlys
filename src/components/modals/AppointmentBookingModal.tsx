import React, { useState } from 'react';
import { useClinical } from '../../context/ClinicalContext';
import { X, Calendar, Clock, Stethoscope, Video, CheckCircle2, User, UserPlus, ArrowRight } from 'lucide-react';
import { Appointment } from '../../types/clinical';

export const AppointmentBookingModal: React.FC = () => {
  const { 
    isAppointmentModalOpen, 
    setIsAppointmentModalOpen, 
    currentPatient, 
    staffPersonas,
    bookAppointment,
    setPatientSubTab,
    setActiveTab,
    setActiveRole,
    isPatientLoggedIn,
    setIsOnboardingModalOpen
  } = useClinical();

  const [selectedDoctorId, setSelectedDoctorId] = useState(staffPersonas[0]?.id || 'doc-vance');
  const [aptType, setAptType] = useState<Appointment['type']>('In-Clinic Consultation');
  const [date, setDate] = useState('2026-10-18');
  const [timeSlot, setTimeSlot] = useState('11:00 AM');
  const [guestName, setGuestName] = useState('');
  const [guestContact, setGuestContact] = useState('');
  const [notes, setNotes] = useState('');
  const [bookingSuccess, setBookingSuccess] = useState(false);

  if (!isAppointmentModalOpen) return null;

  const selectedDoctor = staffPersonas.find(s => s.id === selectedDoctorId) || staffPersonas[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    bookAppointment({
      patientId: currentPatient.id,
      doctorName: selectedDoctor.name,
      doctorRole: selectedDoctor.role,
      department: selectedDoctor.department.toUpperCase(),
      date,
      timeSlot,
      type: aptType,
      notes: notes || (guestName ? `Booked for visitor: ${guestName} (${guestContact})` : '')
    });

    setBookingSuccess(true);
    if (isPatientLoggedIn) {
      setTimeout(() => {
        setBookingSuccess(false);
        setActiveRole('patient');
        setActiveTab('patient_portal');
        setPatientSubTab('appointments');
      }, 1500);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-150">
      <div className="w-full max-w-lg rounded-2xl bg-white border border-slate-200 shadow-2xl overflow-hidden text-slate-900">
        
        {/* Header */}
        <div className="bg-slate-50 px-6 py-4 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="p-2 rounded-lg bg-teal-50 text-teal-700 border border-teal-200">
              <Calendar className="w-5 h-5" />
            </span>
            <div>
              <h3 className="text-base font-bold text-slate-900 tracking-tight">
                Schedule Clinical Consultation
              </h3>
              <div className="text-xs text-slate-500">
                {isPatientLoggedIn 
                  ? `Patient Record: ${currentPatient.fullName} (${currentPatient.mrn})`
                  : 'Outpatient & Specialist Appointment Booking'}
              </div>
            </div>
          </div>

          <button 
            onClick={() => {
              setIsAppointmentModalOpen(false);
              setBookingSuccess(false);
            }}
            className="p-1.5 rounded-md text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {bookingSuccess ? (
          <div className="p-8 text-center space-y-4">
            <CheckCircle2 className="w-12 h-12 text-teal-600 mx-auto animate-bounce" />
            <div className="space-y-1">
              <div className="text-lg font-bold text-slate-900">Consultation Scheduled!</div>
              <p className="text-xs text-slate-600 max-w-md mx-auto">
                Your appointment with <strong>{selectedDoctor.name}</strong> has been logged for {date} at {timeSlot}.
              </p>
            </div>

            {/* If visitor is not yet signed up: direct Create Account button */}
            {!isPatientLoggedIn && (
              <div className="p-4 rounded-xl bg-teal-50 border border-teal-200 text-left space-y-2.5 mt-4">
                <div className="flex items-center gap-2 text-xs font-bold text-teal-950">
                  <UserPlus className="w-4 h-4 text-teal-700" />
                  <span>Create Account to Track This Consultation</span>
                </div>
                <p className="text-xs text-teal-800 leading-relaxed">
                  Register your official David & Shannon Clinic patient file to view visit preparation notes, telehealth video links, diagnostic lab orders, and prescriptions.
                </p>
                <div className="flex items-center gap-2 pt-1">
                  <button
                    onClick={() => {
                      setIsAppointmentModalOpen(false);
                      setBookingSuccess(false);
                      setIsOnboardingModalOpen(true);
                    }}
                    className="px-4 py-2 rounded-lg bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>Create Patient Account</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => {
                      setIsAppointmentModalOpen(false);
                      setBookingSuccess(false);
                    }}
                    className="px-3 py-2 rounded-lg border border-slate-300 text-xs font-semibold text-slate-700 hover:bg-slate-100 cursor-pointer"
                  >
                    Close
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[calc(90vh-8rem)] overflow-y-auto">
            
            {/* Quick Create Account Banner for Visitors */}
            {!isPatientLoggedIn && (
              <div className="p-3 rounded-xl bg-teal-50 border border-teal-200 flex items-center justify-between gap-3 text-xs">
                <div>
                  <span className="font-bold text-teal-950">First time visitor? </span>
                  <span className="text-teal-800">You can also create an official patient record directly.</span>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setIsAppointmentModalOpen(false);
                    setIsOnboardingModalOpen(true);
                  }}
                  className="px-2.5 py-1 text-xs font-bold rounded-lg bg-teal-700 text-white shrink-0 hover:bg-teal-800 cursor-pointer"
                >
                  Create Account
                </button>
              </div>
            )}

            {/* Doctor Picker */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Select Attending Physician or Specialist
              </label>
              <select
                value={selectedDoctorId}
                onChange={e => setSelectedDoctorId(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 text-slate-900 focus:border-teal-600 focus:ring-1 focus:ring-teal-600 focus:outline-none"
              >
                {staffPersonas.map(sp => (
                  <option key={sp.id} value={sp.id}>
                    {sp.name} — {sp.role} ({sp.department.toUpperCase()})
                  </option>
                ))}
              </select>
            </div>

            {/* Visitor Contact Info if unauthenticated */}
            {!isPatientLoggedIn && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Your Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={guestName}
                    onChange={e => setGuestName(e.target.value)}
                    placeholder="e.g. Dr. Arthur Vance"
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 text-slate-900 focus:border-teal-600 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Phone / Email Contact
                  </label>
                  <input
                    type="text"
                    required
                    value={guestContact}
                    onChange={e => setGuestContact(e.target.value)}
                    placeholder="e.g. +1 (555) 000-1234"
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 text-slate-900 focus:border-teal-600 focus:outline-none"
                  />
                </div>
              </div>
            )}

            {/* Consultation Type */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Consultation Modality
              </label>
              <div className="grid grid-cols-2 gap-2 text-xs">
                {[
                  { id: 'In-Clinic Consultation', label: 'In-Clinic Hospital Visit', icon: Stethoscope },
                  { id: 'Telemedicine Tele-Consult', label: 'Secure Video Telehealth', icon: Video },
                  { id: 'Pre-Operative Clearance', label: 'Pre-Operative Workup', icon: Clock },
                  { id: 'Lab Follow-Up', label: 'Diagnostic Lab Review', icon: Calendar }
                ].map(type => {
                  const Icon = type.icon;
                  const isSel = aptType === type.id;
                  return (
                    <button
                      type="button"
                      key={type.id}
                      onClick={() => setAptType(type.id as any)}
                      className={`p-2.5 rounded-lg border text-left flex items-center gap-2 transition-all cursor-pointer ${
                        isSel
                          ? 'border-teal-600 bg-teal-50/70 text-teal-900 font-bold'
                          : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                      }`}
                    >
                      <Icon className="w-4 h-4 text-teal-700 shrink-0" />
                      <span className="truncate text-[11px]">{type.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Date & Time */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Requested Date
                </label>
                <input
                  type="date"
                  value={date}
                  onChange={e => setDate(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 text-slate-900 focus:border-teal-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Time Window
                </label>
                <select
                  value={timeSlot}
                  onChange={e => setTimeSlot(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 text-slate-900 focus:border-teal-600 focus:outline-none"
                >
                  <option value="09:00 AM">09:00 AM — Morning Slot</option>
                  <option value="11:00 AM">11:00 AM — Late Morning</option>
                  <option value="02:00 PM">02:00 PM — Early Afternoon</option>
                  <option value="04:30 PM">04:30 PM — Late Afternoon</option>
                </select>
              </div>
            </div>

            {/* Reason */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Clinical Reason & Symptoms
              </label>
              <textarea
                rows={2}
                placeholder="Describe current symptoms, recent laboratory questions, or requested follow-up..."
                value={notes}
                onChange={e => setNotes(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 text-slate-900 focus:border-teal-600 focus:outline-none"
              />
            </div>

            {/* Actions */}
            <div className="pt-3 border-t border-slate-200 flex items-center justify-between">
              {!isPatientLoggedIn ? (
                <button
                  type="button"
                  onClick={() => {
                    setIsAppointmentModalOpen(false);
                    setIsOnboardingModalOpen(true);
                  }}
                  className="text-xs text-teal-700 font-bold hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <UserPlus className="w-3.5 h-3.5" />
                  <span>Create Account instead</span>
                </button>
              ) : <div></div>}

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setIsAppointmentModalOpen(false)}
                  className="px-4 py-2 text-xs font-medium text-slate-600 hover:text-slate-900 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-lg bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs shadow-md transition-all cursor-pointer"
                >
                  Confirm Consultation
                </button>
              </div>
            </div>

          </form>
        )}

      </div>
    </div>
  );
};
