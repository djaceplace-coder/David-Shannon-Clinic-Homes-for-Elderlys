/**
 * Clinical Data Types for David & Shannon Clinic
 * Scaled for Human-Grade Hospital & Academic Platform
 */

export type BloodType = 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';

export type TriageLevel = 
  | 'Level 1 - Resuscitation'
  | 'Level 2 - Emergent'
  | 'Level 3 - Urgent'
  | 'Level 4 - Less Urgent'
  | 'Level 5 - Non-urgent';

export interface VitalsData {
  heartRate: number; // bpm
  systolicBP: number; // mmHg
  diastolicBP: number; // mmHg
  oxygenSaturation: number; // %
  respiratoryRate: number; // breaths/min
  temperature: number; // °C
  glucose: number; // mg/dL
  ecgRhythm: 'Normal Sinus Rhythm' | 'Sinus Tachycardia' | 'Atrial Fibrillation' | 'ST Elevation' | 'Ventricular Premature Beats';
}

export interface LabResult {
  id: string;
  name: string;
  category: 'Hematology' | 'Metabolic Panel' | 'Cardiac Biomarkers' | 'Lipid Panel' | 'Endocrine' | 'Genomics';
  value: number;
  unit: string;
  normalMin: number;
  normalMax: number;
  status: 'normal' | 'borderline' | 'critical';
  collectedDate: string;
}

export interface Prescription {
  id: string;
  medication: string;
  dosage: string;
  route: string;
  frequency: string;
  duration: string;
  instructions: string;
  prescribingDoctor: string;
  prescribedDate: string;
  refillsRemaining: number;
  pharmacy: string;
  status: 'Active' | 'Pending Refill' | 'Completed' | 'Discontinued';
}

export interface InvoiceItem {
  id: string;
  code: string;
  description: string;
  charge: number;
}

export interface Invoice {
  id: string;
  invoiceNumber: string;
  issuedDate: string;
  dueDate: string;
  department: string;
  serviceDescription: string;
  items: InvoiceItem[];
  totalAmount: number;
  insuranceCovered: number;
  patientDue: number;
  status: 'Unpaid' | 'Paid' | 'Processing Insurance' | 'Overdue';
  paymentDate?: string;
  receiptNumber?: string;
}

export interface EmergencyContact {
  name: string;
  relationship: string;
  phone: string;
}

export interface Appointment {
  id: string;
  doctorName: string;
  doctorRole: string;
  department: string;
  date: string;
  timeSlot: string;
  type: 'In-Clinic Consultation' | 'Telemedicine Tele-Consult' | 'Pre-Operative Clearance' | 'Lab Follow-Up';
  status: 'Confirmed' | 'Completed' | 'Rescheduled' | 'Cancelled';
  roomOrLink: string;
  notes?: string;
}

export interface PatientRecord {
  id: string;
  mrn: string; // Medical Record Number
  fileNo?: string; // Hospital File Number
  username?: string; // Patient Portal Username
  password?: string; // Masked access password
  fullName: string;
  email: string;
  phone: string;
  dob: string;
  gender: 'Female' | 'Male' | 'Other';
  bloodType: BloodType;
  primaryDiagnosis: string;
  secondaryDiagnoses: string[];
  allergies: string[];
  medications: string[];
  assignedDoctorId: string;
  assignedDoctorName: string;
  assignedDepartment: string;
  triageLevel: TriageLevel;
  isEmergencyAdmission: boolean;
  admissionDate: string;
  insuranceProvider: string;
  insurancePolicyNumber: string;
  emergencyContact: EmergencyContact;
  vitals: VitalsData;
  labResults: LabResult[];
  prescriptions: Prescription[];
  invoices: Invoice[];
  appointments: Appointment[];
  followUpReminders: FollowUpReminder[];
}

export type ClinicalDepartment = 
  | 'cardiology'
  | 'neurology'
  | 'oncology'
  | 'pulmonary'
  | 'surgery'
  | 'emergency'
  | 'front_desk'
  | 'billing'
  | 'pharmacy';

export interface ClinicalAttachment {
  type: 'prescription' | 'invoice' | 'vitals_telemetry' | 'lab_report' | 'appointment';
  data: any;
}

export interface ClinicalMessage {
  id: string;
  patientId: string;
  department: ClinicalDepartment;
  sender: 'patient' | 'staff';
  senderName: string;
  senderRole: string;
  text: string;
  timestamp: string;
  attachment?: ClinicalAttachment;
}

export interface ClinicalNotification {
  id: string;
  patientId: string;
  title: string;
  message: string;
  type: 'prescription' | 'invoice' | 'reminder' | 'message' | 'triage_alert' | 'appointment';
  timestamp: string;
  read: boolean;
  actionTargetTab?: 'biometrics' | 'labs' | 'prescriptions' | 'billing' | 'chat' | 'appointments';
  relatedEntityId?: string;
}

export interface FollowUpReminder {
  id: string;
  title: string;
  date: string;
  instructions: string;
  doctorName: string;
  completed: boolean;
}

export interface StaffPersona {
  id: string;
  name: string;
  role: string;
  credentials: string;
  department: ClinicalDepartment;
  avatarInitials: string;
  bio: string;
  availableDays: string[];
  imageUrl?: string;
  imageType?: 'team' | 'director' | 'nurse' | 'facility' | 'general';
}

// Institutional Directory Types
export interface ClinicalInstitute {
  id: string;
  name: string;
  tagline: string;
  summary: string;
  directorName: string;
  directorRole: string;
  departmentCode: ClinicalDepartment;
  imageUrl?: string;
  imageType?: 'team' | 'director' | 'nurse' | 'facility' | 'general';
  keyServices: string[];
  clinicalMetrics: {
    stat: string;
    label: string;
  }[];
  commonProcedures: {
    code: string;
    name: string;
    avgCost: number;
    recoveryTime: string;
  }[];
}

export interface ClinicalResearchPaper {
  id: string;
  title: string;
  journal: string;
  year: number;
  authors: string;
  doi: string;
  abstract: string;
  keyFinding: string;
}

export interface PatientTestimonial {
  id: string;
  patientName: string;
  age: number;
  condition: string;
  quote: string;
  recoveryOutcome: string;
  attendingPhysician: string;
}

// Virtual Medical Scenario Types
export interface ScenarioDecisionOption {
  id: string;
  label: string;
  clinicalRationale: string;
  impactOnVitals: Partial<VitalsData>;
  isOptimal: boolean;
  feedback: string;
}

export interface ScenarioStep {
  stepNumber: number;
  stageTitle: string;
  clinicalPresentation: string;
  currentVitals: VitalsData;
  diagnosticClues: string[];
  options: ScenarioDecisionOption[];
}

export interface VirtualPatientScenario {
  id: string;
  title: string;
  category: 'Cardiovascular' | 'Neurology & Stroke' | 'Metabolic & Endocrine' | 'Pulmonary Critical Care';
  difficulty: 'Foundation' | 'Intermediate' | 'Advanced Residency';
  patientProfile: {
    age: number;
    gender: string;
    chiefComplaint: string;
    history: string;
  };
  initialVitals: VitalsData;
  steps: ScenarioStep[];
  learningObjectives: string[];
}
