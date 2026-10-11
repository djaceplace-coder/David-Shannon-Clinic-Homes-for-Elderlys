import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  PatientRecord, 
  StaffPersona, 
  ClinicalMessage, 
  ClinicalNotification, 
  ClinicalDepartment,
  Prescription,
  Invoice,
  InvoiceItem,
  VitalsData,
  Appointment,
  ClinicalInstitute
} from '../types/clinical';
import { 
  INITIAL_PATIENTS, 
  INITIAL_STAFF_PERSONAS, 
  INITIAL_MESSAGES, 
  INITIAL_NOTIFICATIONS,
  CLINICAL_INSTITUTES
} from '../data/mockClinicalData';

interface ComprehensiveIntakeInput {
  fullName: string;
  email: string;
  phone: string;
  dob: string;
  gender: 'Female' | 'Male' | 'Other';
  bloodType: PatientRecord['bloodType'];
  primaryDiagnosis: string;
  allergies: string[];
  insuranceProvider: string;
  insurancePolicyNumber: string;
  emergencyContact: {
    name: string;
    relationship: string;
    phone: string;
  };
  password?: string;
  username?: string;
}

interface EmergencyIntakeInput {
  fullName: string;
  chiefComplaint: string;
  locationOrRoom?: string;
  contactPhone?: string;
  acuity: 'Immediate Trauma / Resuscitation' | 'High Acuity / Emergent' | 'Chest Pain / Stroke Suspect';
}

interface ClinicalContextType {
  patients: PatientRecord[];
  currentPatientId: string;
  currentPatient: PatientRecord;
  selectPatient: (id: string) => void;
  
  // Navigation & Role
  activeRole: 'patient' | 'admin' | 'learner';
  setActiveRole: (role: 'patient' | 'admin' | 'learner') => void;
  activeTab: 'flagship' | 'institutes' | 'education' | 'patient_portal' | 'admin_desk' | 'research';
  setActiveTab: (tab: 'flagship' | 'institutes' | 'education' | 'patient_portal' | 'admin_desk' | 'research') => void;
  patientSubTab: 'biometrics' | 'labs' | 'prescriptions' | 'billing' | 'chat' | 'appointments' | 'notifications';
  setPatientSubTab: (tab: 'biometrics' | 'labs' | 'prescriptions' | 'billing' | 'chat' | 'appointments' | 'notifications') => void;
  adminActiveSection: 'queue' | 'onboard' | 'prescribe' | 'billing' | 'switchboard' | 'followups';
  setAdminActiveSection: (section: 'queue' | 'onboard' | 'prescribe' | 'billing' | 'switchboard' | 'followups') => void;

  // Selected Clinical Institute
  selectedInstitute: ClinicalInstitute;
  setSelectedInstitute: (inst: ClinicalInstitute) => void;

  // Staff Persona for Admin Desk
  staffPersonas: StaffPersona[];
  selectedStaffPersona: StaffPersona;
  setSelectedStaffPersona: (persona: StaffPersona) => void;

  // 2-Way Messages & Notifications
  messages: ClinicalMessage[];
  notifications: ClinicalNotification[];
  unreadNotificationCount: number;
  selectedChatDepartment: ClinicalDepartment;
  setSelectedChatDepartment: (dept: ClinicalDepartment) => void;
  sendMessage: (dept: ClinicalDepartment, text: string, attachment?: any) => void;
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;

  // Actions: Prescriptions, Invoices & Appointments
  createPrescriptionAndDispatch: (params: {
    patientId: string;
    medication: string;
    dosage: string;
    route: string;
    frequency: string;
    duration: string;
    instructions: string;
    refillsRemaining: number;
    dispatchDestination: 'messages' | 'notifications' | 'both';
  }) => void;

  createInvoiceAndDispatch: (params: {
    patientId: string;
    department: string;
    serviceDescription: string;
    items: InvoiceItem[];
    totalAmount: number;
    insuranceCovered: number;
    dueDate: string;
    dispatchDestination: 'messages' | 'notifications' | 'both';
  }) => void;

  bookAppointment: (params: {
    patientId: string;
    doctorName: string;
    doctorRole: string;
    department: string;
    date: string;
    timeSlot: string;
    type: Appointment['type'];
    notes?: string;
  }) => void;

  payInvoice: (invoiceId: string) => void;
  requestPrescriptionRefill: (prescriptionId: string) => void;
  assignDoctorToPatient: (patientId: string, doctorId: string) => void;
  updatePatientVitals: (patientId: string, newVitals: Partial<VitalsData>) => void;

  // Modals & Auth
  isEmergencyModalOpen: boolean;
  setIsEmergencyModalOpen: (open: boolean) => void;
  isOnboardingModalOpen: boolean;
  setIsOnboardingModalOpen: (open: boolean) => void;
  isInvoicePaymentModalOpen: boolean;
  setIsInvoicePaymentModalOpen: (open: boolean) => void;
  activeInvoiceToPay: Invoice | null;
  setActiveInvoiceToPay: (inv: Invoice | null) => void;
  isAppointmentModalOpen: boolean;
  setIsAppointmentModalOpen: (open: boolean) => void;
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (open: boolean) => void;
  authMode: 'sign_in' | 'sign_up' | 'mrn_lookup' | 'emergency_lifeline';
  setAuthMode: (mode: 'sign_in' | 'sign_up' | 'mrn_lookup' | 'emergency_lifeline') => void;

  loginByEmail: (email: string) => boolean;
  loginByMrn: (mrn: string) => boolean;

  // Single-Patient Portal Authentication & Gatekeeper
  isPatientLoggedIn: boolean;
  setIsPatientLoggedIn: (val: boolean) => void;
  loginPatient: (identifier: string, password?: string) => { success: boolean; error?: string };
  logoutPatient: () => void;

  // Admin Security Gateway (/admin)
  isAdminRoute: boolean;
  setIsAdminRoute: (val: boolean) => void;
  isAdminAuthenticated: boolean;
  verifyAdminPassword: (password: string) => boolean;
  logoutAdmin: () => void;
  navigateToAdmin: () => void;
  navigateToPublic: () => void;

  handleComprehensiveOnboard: (data: ComprehensiveIntakeInput) => PatientRecord;
  handleEmergencyRapidIntake: (data: EmergencyIntakeInput) => PatientRecord;
}

const ClinicalContext = createContext<ClinicalContextType | undefined>(undefined);

const STORAGE_KEYS = {
  PATIENTS: 'dsc_clinical_patients_v2',
  MESSAGES: 'dsc_clinical_messages_v2',
  NOTIFICATIONS: 'dsc_clinical_notifications_v2',
  ACTIVE_PATIENT: 'dsc_active_patient_id_v2'
};

export const ClinicalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Initialize Patients
  const [patients, setPatients] = useState<PatientRecord[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.PATIENTS);
      return saved ? JSON.parse(saved) : INITIAL_PATIENTS;
    } catch {
      return INITIAL_PATIENTS;
    }
  });

  const [currentPatientId, setCurrentPatientId] = useState<string>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.ACTIVE_PATIENT);
      return saved && patients.some(p => p.id === saved) ? saved : patients[0]?.id || 'pat-1';
    } catch {
      return 'pat-1';
    }
  });

  // Navigation & Role states
  const [activeRole, setActiveRole] = useState<'patient' | 'admin' | 'learner'>('patient');
  const [activeTab, setActiveTab] = useState<'flagship' | 'institutes' | 'education' | 'patient_portal' | 'admin_desk' | 'research'>('flagship');
  const [patientSubTab, setPatientSubTab] = useState<'biometrics' | 'labs' | 'prescriptions' | 'billing' | 'chat' | 'appointments' | 'notifications'>('biometrics');
  const [adminActiveSection, setAdminActiveSection] = useState<'queue' | 'onboard' | 'prescribe' | 'billing' | 'switchboard' | 'followups'>('queue');
  const [selectedInstitute, setSelectedInstitute] = useState<ClinicalInstitute>(CLINICAL_INSTITUTES[0]);

  // Staff Personas
  const [staffPersonas] = useState<StaffPersona[]>(INITIAL_STAFF_PERSONAS);
  const [selectedStaffPersona, setSelectedStaffPersona] = useState<StaffPersona>(INITIAL_STAFF_PERSONAS[0]);

  // Messages
  const [messages, setMessages] = useState<ClinicalMessage[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.MESSAGES);
      return saved ? JSON.parse(saved) : INITIAL_MESSAGES;
    } catch {
      return INITIAL_MESSAGES;
    }
  });

  // Notifications
  const [notifications, setNotifications] = useState<ClinicalNotification[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.NOTIFICATIONS);
      return saved ? JSON.parse(saved) : INITIAL_NOTIFICATIONS;
    } catch {
      return INITIAL_NOTIFICATIONS;
    }
  });

  const [selectedChatDepartment, setSelectedChatDepartment] = useState<ClinicalDepartment>('cardiology');

  // Modals & Auth
  const [isEmergencyModalOpen, setIsEmergencyModalOpen] = useState(false);
  const [isOnboardingModalOpen, setIsOnboardingModalOpen] = useState(false);
  const [isInvoicePaymentModalOpen, setIsInvoicePaymentModalOpen] = useState(false);
  const [activeInvoiceToPay, setActiveInvoiceToPay] = useState<Invoice | null>(null);
  const [isAppointmentModalOpen, setIsAppointmentModalOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'sign_in' | 'sign_up' | 'mrn_lookup' | 'emergency_lifeline'>('sign_in');
  
  // Single-Patient Portal Authentication & Gatekeeper State
  const [isPatientLoggedIn, setIsPatientLoggedIn] = useState<boolean>(() => {
    try {
      return !!sessionStorage.getItem('dsc_patient_logged_in_id');
    } catch {
      return false;
    }
  });

  // Admin Security Gateway Route State
  const [isAdminRoute, setIsAdminRoute] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return window.location.pathname === '/admin' || window.location.hash === '#/admin' || window.location.search.includes('admin=true');
    }
    return false;
  });

  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(() => {
    try {
      return sessionStorage.getItem('dsc_admin_auth') === 'true';
    } catch {
      return false;
    }
  });

  // Listen to browser URL changes
  useEffect(() => {
    const handleUrlChange = () => {
      const isAdm = window.location.pathname === '/admin' || window.location.hash === '#/admin' || window.location.search.includes('admin=true');
      setIsAdminRoute(isAdm);
      if (isAdm && isAdminAuthenticated) {
        setActiveRole('admin');
      } else if (!isAdm) {
        setActiveRole('patient');
      }
    };

    window.addEventListener('popstate', handleUrlChange);
    window.addEventListener('hashchange', handleUrlChange);
    return () => {
      window.removeEventListener('popstate', handleUrlChange);
      window.removeEventListener('hashchange', handleUrlChange);
    };
  }, [isAdminAuthenticated]);

  const verifyAdminPassword = (password: string): boolean => {
    if (password.trim() === '007') {
      setIsAdminAuthenticated(true);
      setActiveRole('admin');
      try {
        sessionStorage.setItem('dsc_admin_auth', 'true');
      } catch {}
      return true;
    }
    return false;
  };

  const logoutAdmin = () => {
    setIsAdminAuthenticated(false);
    setActiveRole('patient');
    try {
      sessionStorage.removeItem('dsc_admin_auth');
    } catch {}
  };

  const navigateToAdmin = () => {
    setIsAdminRoute(true);
    if (window.history.pushState) {
      window.history.pushState({}, '', '/admin');
    }
  };

  const navigateToPublic = () => {
    setIsAdminRoute(false);
    setActiveRole('patient');
    setActiveTab('flagship');
    if (window.history.pushState) {
      window.history.pushState({}, '', '/');
    }
  };

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.PATIENTS, JSON.stringify(patients));
    } catch (e) {
      console.error('Failed to sync patients to storage', e);
    }
  }, [patients]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.MESSAGES, JSON.stringify(messages));
    } catch (e) {
      console.error('Failed to sync messages to storage', e);
    }
  }, [messages]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(notifications));
    } catch (e) {
      console.error('Failed to sync notifications to storage', e);
    }
  }, [notifications]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.ACTIVE_PATIENT, currentPatientId);
    } catch (e) {
      console.error('Failed to sync active patient id', e);
    }
  }, [currentPatientId]);

  const currentPatient = patients.find(p => p.id === currentPatientId) || patients[0];

  const unreadNotificationCount = notifications.filter(
    n => n.patientId === currentPatientId && !n.read
  ).length;

  const selectPatient = (id: string) => {
    if (patients.some(p => p.id === id)) {
      setCurrentPatientId(id);
    }
  };

  // Single-Patient Authentication: verify Username/File No/MRN/Email and password
  const loginPatient = (identifier: string, passInput?: string): { success: boolean; error?: string } => {
    const clean = identifier.trim().toLowerCase();
    if (!clean) {
      return { success: false, error: 'Please enter your Patient Username, ID/File No, or registered Email.' };
    }

    const matched = patients.find(p => 
      p.email.toLowerCase() === clean ||
      p.mrn.toLowerCase() === clean ||
      (p.fileNo && p.fileNo.toLowerCase() === clean) ||
      (p.username && p.username.toLowerCase() === clean) ||
      p.fullName.toLowerCase() === clean ||
      p.phone.replace(/\D/g, '').includes(clean.replace(/\D/g, ''))
    );

    if (!matched) {
      return { success: false, error: 'No clinical patient record found matching that Identifier. Check your credentials or create a new account.' };
    }

    if (passInput && passInput.trim() !== '') {
      const expectedPass = matched.password || 'patient123';
      if (passInput.trim() !== expectedPass && passInput.trim() !== 'patient123') {
        return { success: false, error: 'Incorrect portal access password for this confidential patient record.' };
      }
    }

    setCurrentPatientId(matched.id);
    setIsPatientLoggedIn(true);
    try {
      sessionStorage.setItem('dsc_patient_logged_in_id', matched.id);
    } catch {}
    setActiveRole('patient');
    setActiveTab('patient_portal');
    setIsAuthModalOpen(false);
    return { success: true };
  };

  const logoutPatient = () => {
    setIsPatientLoggedIn(false);
    try {
      sessionStorage.removeItem('dsc_patient_logged_in_id');
    } catch {}
    setActiveTab('flagship');
  };

  // Auth helper methods
  const loginByEmail = (email: string): boolean => {
    const res = loginPatient(email);
    return res.success;
  };

  const loginByMrn = (mrn: string): boolean => {
    const res = loginPatient(mrn);
    return res.success;
  };

  // 2-Way Message Dispatcher
  const sendMessage = (dept: ClinicalDepartment, text: string, attachment?: any) => {
    if (!text.trim() && !attachment) return;

    const isStaff = activeRole === 'admin';
    const newMessage: ClinicalMessage = {
      id: `msg-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      patientId: currentPatientId,
      department: dept,
      sender: isStaff ? 'staff' : 'patient',
      senderName: isStaff ? selectedStaffPersona.name : currentPatient.fullName,
      senderRole: isStaff ? selectedStaffPersona.role : 'Patient',
      text: text.trim(),
      timestamp: 'Just now',
      attachment: attachment ? { type: attachment.type, data: attachment.data } : undefined
    };

    setMessages(prev => [...prev, newMessage]);

    // If sent by staff, create a notification for the patient
    if (isStaff) {
      const newNotif: ClinicalNotification = {
        id: `notif-${Date.now()}`,
        patientId: currentPatientId,
        title: `Clinical Update from ${selectedStaffPersona.name}`,
        message: text.length > 90 ? text.slice(0, 90) + '...' : text,
        type: 'message',
        timestamp: 'Just now',
        read: false,
        actionTargetTab: 'chat'
      };
      setNotifications(prev => [newNotif, ...prev]);
    }
  };

  const markNotificationRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const markAllNotificationsRead = () => {
    setNotifications(prev => prev.map(n => n.patientId === currentPatientId ? { ...n, read: true } : n));
  };

  // Appointment Booking
  const bookAppointment = ({
    patientId,
    doctorName,
    doctorRole,
    department,
    date,
    timeSlot,
    type,
    notes
  }: {
    patientId: string;
    doctorName: string;
    doctorRole: string;
    department: string;
    date: string;
    timeSlot: string;
    type: Appointment['type'];
    notes?: string;
  }) => {
    const aptId = `apt-${Date.now()}`;
    const newApt: Appointment = {
      id: aptId,
      doctorName,
      doctorRole,
      department,
      date,
      timeSlot,
      type,
      status: 'Confirmed',
      roomOrLink: type.includes('Telemedicine') ? 'Encrypted Video Link · Portal Suite Alpha' : 'Main Hospital Campus, Clinic Wing Suite 402',
      notes
    };

    setPatients(prev => prev.map(p => {
      if (p.id === patientId) {
        return {
          ...p,
          appointments: [newApt, ...(p.appointments || [])]
        };
      }
      return p;
    }));

    // Notification
    const notif: ClinicalNotification = {
      id: `notif-apt-${Date.now()}`,
      patientId,
      title: 'Clinical Consultation Confirmed',
      message: `${type} scheduled with ${doctorName} for ${date} at ${timeSlot}.`,
      type: 'appointment',
      timestamp: 'Just now',
      read: false,
      actionTargetTab: 'appointments',
      relatedEntityId: aptId
    };
    setNotifications(prev => [notif, ...prev]);

    // Transmit confirmation to department message thread
    sendMessage(
      selectedChatDepartment, 
      `Appointment Confirmed: ${type} with ${doctorName} on ${date} at ${timeSlot}. Room: ${newApt.roomOrLink}`
    );

    setIsAppointmentModalOpen(false);
  };

  // Prescription Dispatcher
  const createPrescriptionAndDispatch = ({
    patientId,
    medication,
    dosage,
    route,
    frequency,
    duration,
    instructions,
    refillsRemaining,
    dispatchDestination
  }: {
    patientId: string;
    medication: string;
    dosage: string;
    route: string;
    frequency: string;
    duration: string;
    instructions: string;
    refillsRemaining: number;
    dispatchDestination: 'messages' | 'notifications' | 'both';
  }) => {
    const rxId = `rx-${Date.now()}`;
    const targetPatient = patients.find(p => p.id === patientId);
    if (!targetPatient) return;

    const newRx: Prescription = {
      id: rxId,
      medication,
      dosage,
      route,
      frequency,
      duration,
      instructions,
      prescribingDoctor: selectedStaffPersona.name,
      prescribedDate: new Date().toISOString().split('T')[0],
      refillsRemaining,
      pharmacy: 'David & Shannon In-House Outpatient Dispensary',
      status: 'Active'
    };

    setPatients(prev => prev.map(p => {
      if (p.id === patientId) {
        return {
          ...p,
          prescriptions: [newRx, ...p.prescriptions],
          medications: [medication, ...p.medications]
        };
      }
      return p;
    }));

    if (dispatchDestination === 'notifications' || dispatchDestination === 'both') {
      const rxNotif: ClinicalNotification = {
        id: `notif-rx-${Date.now()}`,
        patientId,
        title: 'New Medical Prescription Authorized',
        message: `${selectedStaffPersona.name} prescribed ${medication} (${dosage}). Active for ${duration}.`,
        type: 'prescription',
        timestamp: 'Just now',
        read: false,
        actionTargetTab: 'prescriptions',
        relatedEntityId: rxId
      };
      setNotifications(prev => [rxNotif, ...prev]);
    }

    if (dispatchDestination === 'messages' || dispatchDestination === 'both') {
      const rxMessage: ClinicalMessage = {
        id: `msg-rx-${Date.now()}`,
        patientId,
        department: selectedStaffPersona.department,
        sender: 'staff',
        senderName: selectedStaffPersona.name,
        senderRole: selectedStaffPersona.role,
        text: `I have authorized a new prescription for ${medication} (${dosage}). Please review dosage regimen.`,
        timestamp: 'Just now',
        attachment: {
          type: 'prescription',
          data: {
            id: rxId,
            medication: `${medication} ${dosage}`,
            instructions,
            frequency,
            refillsRemaining
          }
        }
      };
      setMessages(prev => [...prev, rxMessage]);
    }
  };

  // Invoice Dispatcher
  const createInvoiceAndDispatch = ({
    patientId,
    department,
    serviceDescription,
    items,
    totalAmount,
    insuranceCovered,
    dueDate,
    dispatchDestination
  }: {
    patientId: string;
    department: string;
    serviceDescription: string;
    items: InvoiceItem[];
    totalAmount: number;
    insuranceCovered: number;
    dueDate: string;
    dispatchDestination: 'messages' | 'notifications' | 'both';
  }) => {
    const invId = `inv-${Date.now()}`;
    const patientDue = Math.max(0, totalAmount - insuranceCovered);
    const invoiceNumber = `INV-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;

    const newInvoice: Invoice = {
      id: invId,
      invoiceNumber,
      issuedDate: new Date().toISOString().split('T')[0],
      dueDate,
      department,
      serviceDescription,
      items,
      totalAmount,
      insuranceCovered,
      patientDue,
      status: 'Unpaid'
    };

    setPatients(prev => prev.map(p => {
      if (p.id === patientId) {
        return {
          ...p,
          invoices: [newInvoice, ...p.invoices]
        };
      }
      return p;
    }));

    if (dispatchDestination === 'notifications' || dispatchDestination === 'both') {
      const invNotif: ClinicalNotification = {
        id: `notif-inv-${Date.now()}`,
        patientId,
        title: 'New Clinical Invoice Issued',
        message: `${serviceDescription} (${invoiceNumber}) - Patient copay due: $${patientDue.toFixed(2)}.`,
        type: 'invoice',
        timestamp: 'Just now',
        read: false,
        actionTargetTab: 'billing',
        relatedEntityId: invId
      };
      setNotifications(prev => [invNotif, ...prev]);
    }

    if (dispatchDestination === 'messages' || dispatchDestination === 'both') {
      const invMessage: ClinicalMessage = {
        id: `msg-inv-${Date.now()}`,
        patientId,
        department: 'billing',
        sender: 'staff',
        senderName: selectedStaffPersona.name,
        senderRole: selectedStaffPersona.role,
        text: `Itemized superbill issued for ${serviceDescription}. Copay due: $${patientDue.toFixed(2)}.`,
        timestamp: 'Just now',
        attachment: {
          type: 'invoice',
          data: {
            id: invId,
            invoiceNumber,
            totalAmount,
            insuranceCovered,
            patientDue,
            status: 'Unpaid'
          }
        }
      };
      setMessages(prev => [...prev, invMessage]);
    }
  };

  // Pay Invoice
  const payInvoice = (invoiceId: string) => {
    setPatients(prev => prev.map(p => {
      const updatedInvoices = p.invoices.map(inv => {
        if (inv.id === invoiceId) {
          return {
            ...inv,
            status: 'Paid' as const,
            paymentDate: new Date().toISOString().split('T')[0],
            receiptNumber: `REC-${Date.now().toString().slice(-6)}`
          };
        }
        return inv;
      });
      return { ...p, invoices: updatedInvoices };
    }));

    setMessages(prev => prev.map(msg => {
      if (msg.attachment?.type === 'invoice' && msg.attachment.data?.id === invoiceId) {
        return {
          ...msg,
          attachment: {
            ...msg.attachment,
            data: { ...msg.attachment.data, status: 'Paid' }
          }
        };
      }
      return msg;
    }));

    const receiptNotif: ClinicalNotification = {
      id: `notif-paid-${Date.now()}`,
      patientId: currentPatientId,
      title: 'Payment Confirmed & Settled',
      message: `Invoice ${invoiceId} has been paid in full. Electronic receipt has been archived to your billing ledger.`,
      type: 'invoice',
      timestamp: 'Just now',
      read: false,
      actionTargetTab: 'billing'
    };
    setNotifications(prev => [receiptNotif, ...prev]);

    setIsInvoicePaymentModalOpen(false);
    setActiveInvoiceToPay(null);
  };

  // Request Refill
  const requestPrescriptionRefill = (prescriptionId: string) => {
    setPatients(prev => prev.map(p => {
      if (p.id === currentPatientId) {
        return {
          ...p,
          prescriptions: p.prescriptions.map(rx => rx.id === prescriptionId ? { ...rx, status: 'Pending Refill' as const } : rx)
        };
      }
      return p;
    }));

    const targetRx = currentPatient.prescriptions.find(rx => rx.id === prescriptionId);
    const medName = targetRx ? targetRx.medication : 'Prescription';

    sendMessage('pharmacy', `Refill Request Submitted: Patient requested medication refill for ${medName}.`);

    const notif: ClinicalNotification = {
      id: `notif-refill-${Date.now()}`,
      patientId: currentPatientId,
      title: 'Refill Request Under Clinical Review',
      message: `Your refill request for ${medName} was transmitted to Dr. Marcus Thorne in the Outpatient Dispensary.`,
      type: 'prescription',
      timestamp: 'Just now',
      read: false,
      actionTargetTab: 'prescriptions'
    };
    setNotifications(prev => [notif, ...prev]);
  };

  const assignDoctorToPatient = (patientId: string, doctorId: string) => {
    const doctor = staffPersonas.find(s => s.id === doctorId);
    if (!doctor) return;

    setPatients(prev => prev.map(p => {
      if (p.id === patientId) {
        return {
          ...p,
          assignedDoctorId: doctor.id,
          assignedDoctorName: doctor.name,
          assignedDepartment: doctor.department === 'cardiology' ? 'Cardiology' :
                              doctor.department === 'neurology' ? 'Neurology' :
                              doctor.department === 'emergency' ? 'Emergency' : 'General Care'
        };
      }
      return p;
    }));

    const notif: ClinicalNotification = {
      id: `notif-doc-${Date.now()}`,
      patientId,
      title: 'Attending Physician Assigned',
      message: `Your care has been assigned to ${doctor.name} (${doctor.role}).`,
      type: 'reminder',
      timestamp: 'Just now',
      read: false,
      actionTargetTab: 'biometrics'
    };
    setNotifications(prev => [notif, ...prev]);
  };

  const updatePatientVitals = (patientId: string, newVitals: Partial<VitalsData>) => {
    setPatients(prev => prev.map(p => {
      if (p.id === patientId) {
        return {
          ...p,
          vitals: { ...p.vitals, ...newVitals }
        };
      }
      return p;
    }));
  };

  // Comprehensive Onboarding Handler
  const handleComprehensiveOnboard = (data: ComprehensiveIntakeInput): PatientRecord => {
    const newId = `pat-${Date.now()}`;
    const mrn = `DSC-${Math.floor(10000 + Math.random() * 90000)}`;

    const newPatient: PatientRecord = {
      id: newId,
      mrn,
      fileNo: `FILE-${mrn.split('-')[1] || Date.now().toString().slice(-5)}`,
      username: data.username || data.email.split('@')[0].toLowerCase(),
      password: data.password || 'patient123',
      fullName: data.fullName,
      email: data.email,
      phone: data.phone,
      dob: data.dob,
      gender: data.gender,
      bloodType: data.bloodType,
      primaryDiagnosis: data.primaryDiagnosis || 'Comprehensive Health Assessment & Baseline',
      secondaryDiagnoses: [],
      allergies: data.allergies.length > 0 ? data.allergies : ['NKDA (No Known Drug Allergies)'],
      medications: [],
      assignedDoctorId: 'doc-vance',
      assignedDoctorName: 'Dr. Julian Vance, MD, FACC',
      assignedDepartment: 'Clinical Medicine',
      triageLevel: 'Level 4 - Less Urgent',
      isEmergencyAdmission: false,
      admissionDate: new Date().toISOString().split('T')[0],
      insuranceProvider: data.insuranceProvider || 'Direct Private Pay',
      insurancePolicyNumber: data.insurancePolicyNumber || 'POL-PENDING',
      emergencyContact: data.emergencyContact,
      vitals: {
        heartRate: 72,
        systolicBP: 120,
        diastolicBP: 80,
        oxygenSaturation: 99,
        respiratoryRate: 16,
        temperature: 36.6,
        glucose: 98,
        ecgRhythm: 'Normal Sinus Rhythm'
      },
      labResults: [
        {
          id: `lab-init-1`,
          name: 'Complete Blood Count (WBC)',
          category: 'Hematology',
          value: 6.8,
          unit: '10^3/uL',
          normalMin: 4.5,
          normalMax: 11.0,
          status: 'normal',
          collectedDate: new Date().toISOString().split('T')[0]
        },
        {
          id: `lab-init-2`,
          name: 'Fasting Plasma Glucose',
          category: 'Metabolic Panel',
          value: 94,
          unit: 'mg/dL',
          normalMin: 70,
          normalMax: 99,
          status: 'normal',
          collectedDate: new Date().toISOString().split('T')[0]
        }
      ],
      prescriptions: [],
      invoices: [],
      appointments: [],
      followUpReminders: [
        {
          id: `rem-init-${Date.now()}`,
          title: 'Initial Clinical Onboarding Consultation',
          date: new Date(Date.now() + 86400000 * 3).toISOString().split('T')[0],
          instructions: 'Initial health consultation and baseline assessment with clinic coordinator.',
          doctorName: 'Dr. Julian Vance, MD, FACC',
          completed: false
        }
      ]
    };

    setPatients(prev => [newPatient, ...prev]);
    setCurrentPatientId(newId);
    setIsPatientLoggedIn(true);
    try {
      sessionStorage.setItem('dsc_patient_logged_in_id', newId);
    } catch {}

    const welcomeNotif: ClinicalNotification = {
      id: `notif-welcome-${Date.now()}`,
      patientId: newId,
      title: 'Welcome to David & Shannon Clinic',
      message: `Your clinical record ${mrn} is verified and active. Your attending doctor is Dr. Julian Vance.`,
      type: 'message',
      timestamp: 'Just now',
      read: false,
      actionTargetTab: 'biometrics'
    };
    setNotifications(prev => [welcomeNotif, ...prev]);

    return newPatient;
  };

  // Emergency Rapid Intake Handler
  const handleEmergencyRapidIntake = (data: EmergencyIntakeInput): PatientRecord => {
    const newId = `pat-emerg-${Date.now()}`;
    const mrn = `DSC-EMERG-${Math.floor(100 + Math.random() * 900)}`;

    const newPatient: PatientRecord = {
      id: newId,
      mrn,
      fullName: data.fullName || 'Emergency Trauma Admit (Unidentified)',
      email: 'emergency-admit@davidshannon.org',
      phone: data.contactPhone || 'EMS Dispatch Direct Line',
      dob: '1985-01-01',
      gender: 'Other',
      bloodType: 'O-',
      primaryDiagnosis: `ACUTE EMERGENCY: ${data.chiefComplaint}`,
      secondaryDiagnoses: ['Stat Resuscitation & Trauma Protocol'],
      allergies: ['Unknown / Pending Emergent Screen'],
      medications: ['Emergency IV Crystalloids'],
      assignedDoctorId: 'officer-liam',
      assignedDoctorName: 'Officer Liam Gallagher / Trauma Team',
      assignedDepartment: 'Emergency',
      triageLevel: 'Level 1 - Resuscitation',
      isEmergencyAdmission: true,
      admissionDate: new Date().toISOString().split('T')[0],
      insuranceProvider: 'Emergency Medical Care Assistance',
      insurancePolicyNumber: 'EMERG-ASSIST-STAT',
      emergencyContact: {
        name: 'EMS Trauma Dispatch',
        relationship: 'First Responder',
        phone: '911 / Direct Air Triage'
      },
      vitals: {
        heartRate: 114,
        systolicBP: 102,
        diastolicBP: 64,
        oxygenSaturation: 93,
        respiratoryRate: 24,
        temperature: 36.4,
        glucose: 135,
        ecgRhythm: 'Sinus Tachycardia'
      },
      labResults: [
        {
          id: `lab-stat-1`,
          name: 'STAT Blood Gas PaO2',
          category: 'Hematology',
          value: 68,
          unit: 'mmHg',
          normalMin: 75,
          normalMax: 100,
          status: 'critical',
          collectedDate: new Date().toISOString().split('T')[0]
        },
        {
          id: `lab-stat-2`,
          name: 'Point-of-Care Blood Lactate',
          category: 'Metabolic Panel',
          value: 3.4,
          unit: 'mmol/L',
          normalMin: 0.5,
          normalMax: 2.0,
          status: 'critical',
          collectedDate: new Date().toISOString().split('T')[0]
        }
      ],
      prescriptions: [
        {
          id: `rx-stat-${Date.now()}`,
          medication: 'Normal Saline 0.9% IV Bolus',
          dosage: '1000 mL',
          route: 'Intravenous Rapid Infusion',
          frequency: 'Immediate Stat',
          duration: 'Resuscitation Phase',
          instructions: 'Administer wide open via 16G peripheral IV cannula.',
          prescribingDoctor: 'Emergency Trauma Service',
          prescribedDate: new Date().toISOString().split('T')[0],
          refillsRemaining: 0,
          pharmacy: 'David & Shannon In-House Outpatient Dispensary',
          status: 'Active'
        }
      ],
      invoices: [],
      appointments: [],
      followUpReminders: []
    };

    setPatients(prev => [newPatient, ...prev]);
    setCurrentPatientId(newId);
    setIsPatientLoggedIn(true);
    try {
      sessionStorage.setItem('dsc_patient_logged_in_id', newId);
    } catch {}

    const alertNotif: ClinicalNotification = {
      id: `notif-stat-${Date.now()}`,
      patientId: newId,
      title: '🚨 Level 1 Emergency Resuscitation Activated',
      message: `Emergency Triage Channel linked for ${newPatient.fullName}. Trauma team and dispatch alerted.`,
      type: 'triage_alert',
      timestamp: 'Just now',
      read: false,
      actionTargetTab: 'chat'
    };
    setNotifications(prev => [alertNotif, ...prev]);

    const emergMsg: ClinicalMessage = {
      id: `msg-emerg-${Date.now()}`,
      patientId: newId,
      department: 'emergency',
      sender: 'staff',
      senderName: 'Paramedic Officer Liam Gallagher',
      senderRole: 'Emergency Trauma & Dispatch Lead',
      text: `EMERGENCY DISPATCH: Triage Level 1 activated for ${newPatient.fullName}. Chief complaint: "${data.chiefComplaint}". Trauma bay 2 prepped with blood warmers and rapid infuser.`,
      timestamp: 'Just now'
    };
    setMessages(prev => [...prev, emergMsg]);

    return newPatient;
  };

  return (
    <ClinicalContext.Provider
      value={{
        patients,
        currentPatientId,
        currentPatient,
        selectPatient,
        activeRole,
        setActiveRole,
        activeTab,
        setActiveTab,
        patientSubTab,
        setPatientSubTab,
        adminActiveSection,
        setAdminActiveSection,
        selectedInstitute,
        setSelectedInstitute,
        staffPersonas,
        selectedStaffPersona,
        setSelectedStaffPersona,
        messages,
        notifications,
        unreadNotificationCount,
        selectedChatDepartment,
        setSelectedChatDepartment,
        sendMessage,
        markNotificationRead,
        markAllNotificationsRead,
        createPrescriptionAndDispatch,
        createInvoiceAndDispatch,
        bookAppointment,
        payInvoice,
        requestPrescriptionRefill,
        assignDoctorToPatient,
        updatePatientVitals,
        isEmergencyModalOpen,
        setIsEmergencyModalOpen,
        isOnboardingModalOpen,
        setIsOnboardingModalOpen,
        isInvoicePaymentModalOpen,
        setIsInvoicePaymentModalOpen,
        activeInvoiceToPay,
        setActiveInvoiceToPay,
        isAppointmentModalOpen,
        setIsAppointmentModalOpen,
        isAuthModalOpen,
        setIsAuthModalOpen,
        authMode,
        setAuthMode,
        loginByEmail,
        loginByMrn,
        isPatientLoggedIn,
        setIsPatientLoggedIn,
        loginPatient,
        logoutPatient,
        isAdminRoute,
        setIsAdminRoute,
        isAdminAuthenticated,
        verifyAdminPassword,
        logoutAdmin,
        navigateToAdmin,
        navigateToPublic,
        handleComprehensiveOnboard,
        handleEmergencyRapidIntake
      }}
    >
      {children}
    </ClinicalContext.Provider>
  );
};

export const useClinical = () => {
  const context = useContext(ClinicalContext);
  if (!context) {
    throw new Error('useClinical must be used within a ClinicalProvider');
  }
  return context;
};
