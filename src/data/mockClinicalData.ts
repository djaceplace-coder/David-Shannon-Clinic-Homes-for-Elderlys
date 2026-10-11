import { 
  PatientRecord, 
  StaffPersona, 
  VirtualPatientScenario, 
  ClinicalMessage, 
  ClinicalNotification,
  ClinicalInstitute,
  ClinicalResearchPaper,
  PatientTestimonial
} from '../types/clinical';

export const CLINICAL_INSTITUTES: ClinicalInstitute[] = [
  {
    id: 'cardiology',
    name: 'Cardiovascular Institute & Interventional Cath Lab',
    tagline: 'Precision coronary intervention, electrophysiology mapping, and structural heart hemodynamics.',
    summary: 'Our Cardiovascular Institute operates three high-definition biplane catheterization laboratories, providing 24/7 primary PCI for acute coronary syndromes, complex bifurcation stenting, and catheter-directed thrombectomy.',
    directorName: 'Dr. Julian Vance, MD, FACC',
    directorRole: 'Director of Clinical Cardiology & Catheterization Laboratories',
    departmentCode: 'cardiology',
    keyServices: [
      'Primary Percutaneous Coronary Intervention (PCI)',
      '3D Carto-Guided Radiofrequency Arrhythmia Ablation',
      'Transcatheter Aortic Valve Replacement (TAVR)',
      'Subcutaneous & Leadless Pacemaker Implantation',
      'Advanced Heart Failure Hemodynamic Optimization'
    ],
    clinicalMetrics: [
      { stat: '52 min', label: 'Door-to-Balloon Time (Benchmark < 90 min)' },
      { stat: '99.4%', label: 'Radial Access Hemostasis Rate' },
      { stat: '2,840', label: 'Annual Interventional Procedures' }
    ],
    commonProcedures: [
      { code: 'CPT-92928', name: 'PCI Single Major Coronary Vessel with DES', avgCost: 8450.00, recoveryTime: '24–48 Hours Inpatient' },
      { code: 'CPT-93458', name: 'Left Heart Catheterization with Coronary Angiogram', avgCost: 3200.00, recoveryTime: 'Same-day Observation' },
      { code: 'CPT-93306', name: 'Transthoracic Echocardiogram with Doppler Flow', avgCost: 1850.00, recoveryTime: 'Outpatient Non-invasive' }
    ]
  },
  {
    id: 'neurology',
    name: 'Comprehensive Stroke & Neuro-Vascular Center',
    tagline: 'Rapid micro-catheter thrombectomy, intravenous thrombolysis, and stroke recovery.',
    summary: 'A JCI-accredited Comprehensive Stroke Center equipped with dedicated neuro-intensive care, biplane endovascular suites, and multi-modal perfusion CT/MRI providing rapid penumbra salvage.',
    directorName: 'Dr. Alistair Chen, MD, PhD',
    directorRole: 'Chief of Neuro-Interventional Surgery & Acute Stroke Care',
    departmentCode: 'neurology',
    keyServices: [
      'Emergent Mechanical Thrombectomy (Solitaire / Trevo)',
      'Intravenous Thrombolytic Therapy (Tenecteplase Protocol)',
      'Cerebral Aneurysm Endovascular Coiling & Flow Diversion',
      'Continuous 64-Channel Video EEG Neuromonitoring',
      'Intracranial Pressure (ICP) Targeted Intensive Care'
    ],
    clinicalMetrics: [
      { stat: '32 min', label: 'Door-to-Needle Thrombolytic Window' },
      { stat: '87.6%', label: 'TICI 2b/3 Revascularization Rate' },
      { stat: '1,420', label: 'Acute Stroke Activations Evaluated' }
    ],
    commonProcedures: [
      { code: 'CPT-61645', name: 'Mechanical Thrombectomy Intracranial Vessel', avgCost: 14200.00, recoveryTime: '72 Hours Neuro-ICU' },
      { code: 'CPT-70450', name: 'Head CT Scan without Contrast (Stat Stroke Protocol)', avgCost: 1100.00, recoveryTime: 'Immediate Outpatient' },
      { code: 'CPT-95816', name: 'Diagnostic Electroencephalogram (EEG) 40-Minute', avgCost: 890.00, recoveryTime: 'Outpatient Non-invasive' }
    ]
  },
  {
    id: 'oncology',
    name: 'Precision Oncology & Cellular Genomics',
    tagline: 'Targeted immunotherapy, next-generation genomic sequencing, and day-infusion suites.',
    summary: 'Translating cutting-edge tumor genetics into personalized therapies. Features multidisciplinary tumor boards, cellular therapy clean-rooms, and comprehensive supportive care.',
    directorName: 'Dr. Sophia Al-Mansoor, MD, PhD',
    directorRole: 'Head of Molecular Oncology & Genomic Medicine',
    departmentCode: 'oncology',
    keyServices: [
      'Comprehensive Liquid Biopsy Genomic Profiling',
      'CAR-T Cellular Immunotherapy Protocols',
      'Targeted Tyrosine Kinase & Monoclonal Antibody Therapy',
      'Stereotactic Body Radiation Therapy (SBRT)',
      'Integrative Supportive Oncology & Nutrition Counseling'
    ],
    clinicalMetrics: [
      { stat: '98.2%', label: 'Next-Gen Sequencing Diagnostic Concordance' },
      { stat: '48 hrs', label: 'Tumor Board Review Turnaround' },
      { stat: '3,100', label: 'Patients Receiving Targeted Regimens' }
    ],
    commonProcedures: [
      { code: 'CPT-81455', name: 'Targeted Genomic Next-Generation Sequencing Panel', avgCost: 3400.00, recoveryTime: 'Outpatient Specimen' },
      { code: 'CPT-96413', name: 'Chemotherapy / Immunotherapy Intravenous Infusion', avgCost: 2150.00, recoveryTime: 'Day Infusion Suite' }
    ]
  },
  {
    id: 'pulmonary',
    name: 'Pulmonary Critical Care & Mechanical Gas Exchange',
    tagline: 'ARDS management, advanced ECMO life support, and thoracic physiology.',
    summary: 'Our Respiratory Intensive Care Unit features state-of-the-art dual-mode mechanical ventilation, closed-circuit capnography, and veno-venous extracorporeal membrane oxygenation (VV-ECMO).',
    directorName: 'Dr. Shannon Thorne, MD, FCCP',
    directorRole: 'Director of Pulmonary Medicine & Intensive Care',
    departmentCode: 'pulmonary',
    keyServices: [
      'Extracorporeal Membrane Oxygenation (VV-ECMO & VA-ECMO)',
      'High-Frequency Oscillatory & Prone Position Ventilation',
      'Endobronchial Ultrasound (EBUS) Diagnostic Biopsy',
      'Cardiopulmonary Exercise Physiology Testing (CPET)',
      'Negative-Pressure Airborne Isolation Intensive Care'
    ],
    clinicalMetrics: [
      { stat: '+41%', label: 'Severe ARDS Survival vs Tertiary Baseline' },
      { stat: '< 3.2 days', label: 'Median Ventilator Weaning Time' },
      { stat: '42 Beds', label: 'Negative-Pressure Acute Critical Capacity' }
    ],
    commonProcedures: [
      { code: 'CPT-31622', name: 'Diagnostic Flexible Fiberoptic Bronchoscopy', avgCost: 2400.00, recoveryTime: 'Same-Day Sedated Observation' },
      { code: 'CPT-94010', name: 'Complete Spirometry and Plethysmography Lung Volumes', avgCost: 650.00, recoveryTime: 'Outpatient Testing' }
    ]
  },
  {
    id: 'surgery',
    name: 'Advanced Minimally Invasive & Robotic Surgery',
    tagline: 'Da Vinci Xi robotic platforms, laparoscopic micro-reconstruction, and rapid recovery.',
    summary: 'Harnessing multi-arm robotic surgical suites for precision oncologic resections, micro-vascular reconstructions, and complex gastrointestinal interventions with minimal tissue trauma.',
    directorName: 'Dr. Marcus Sterling, MD, FACS',
    directorRole: 'Chief of Robotic & Minimally Invasive Surgery',
    departmentCode: 'surgery',
    keyServices: [
      'Da Vinci Xi Multi-Quadrant Robotic Resections',
      'Laparoscopic Gastrointestinal & Hepato-Biliary Surgery',
      'Micro-Vascular Free Flap Reconstructive Surgery',
      'Enhanced Recovery After Surgery (ERAS) Pathway Protocols',
      'Same-Day Robotic Ambulatory Hernia Reconstruction'
    ],
    clinicalMetrics: [
      { stat: '0.4%', label: 'Robotic Surgical Site Infection Rate' },
      { stat: '-46%', label: 'Hospital Length of Stay Reduction (ERAS)' },
      { stat: '1,950', label: 'Robotic Interventions Completed' }
    ],
    commonProcedures: [
      { code: 'CPT-47562', name: 'Laparoscopic Cholecystectomy with Cholangiography', avgCost: 7800.00, recoveryTime: 'Outpatient / 24-hr Stay' },
      { code: 'CPT-49650', name: 'Robotic Inguinal Hernia Repair with Mesh', avgCost: 6400.00, recoveryTime: 'Same-day Discharge' }
    ]
  },
  {
    id: 'emergency',
    name: 'Level 1 Emergency Trauma & Air Lifeline Dispatch',
    tagline: 'Continuous 24/7 resuscitation, direct helipad intake, and acute shock management.',
    summary: 'Standing ready around the clock with dual trauma bays, immediate uncrossmatched O-negative blood warmers, and continuous telemetry dispatch connecting field ambulances directly to attending trauma surgeons.',
    directorName: 'Officer Liam Gallagher / Dr. Elena Kim, MD',
    directorRole: 'Chief of Emergency Trauma Operations & Disaster Preparedness',
    departmentCode: 'emergency',
    keyServices: [
      'Immediate Resuscitation & Massive Transfusion Protocol',
      'Rapid Sequence Intubation (RSI) with Video Laryngoscopy',
      'Emergency Thoracotomy & Resuscitative Endovascular Balloon Occlusion (REBOA)',
      'Point-of-Care Ultrasound (POCUS / eFAST Exam)',
      'Direct-to-CT High-Speed Polytrauma Imaging'
    ],
    clinicalMetrics: [
      { stat: '< 4 min', label: 'Trauma Team Bedside Arrival Standard' },
      { stat: '100%', label: 'In-House Attending Coverage 24/7' },
      { stat: '18,500', label: 'Emergency Admissions Managed Annually' }
    ],
    commonProcedures: [
      { code: 'CPT-99285', name: 'Emergency Department Visit (Level 5 High Acuity)', avgCost: 1950.00, recoveryTime: 'Immediate Stabilization' },
      { code: 'CPT-31500', name: 'Emergency Endotracheal Intubation Stat', avgCost: 820.00, recoveryTime: 'Critical Care ICU' }
    ]
  }
];

export const INITIAL_STAFF_PERSONAS: StaffPersona[] = [
  {
    id: 'doc-vance',
    name: 'Dr. Julian Vance, MD, FACC',
    role: 'Director of Clinical Cardiology',
    credentials: 'Harvard Medical School · Mass General Cardiology Fellow · 18 Years Faculty',
    department: 'cardiology',
    avatarInitials: 'JV',
    bio: 'Pioneer in complex radial coronary interventions and structural heart repairs. Lead investigator on acute myocardial infarction clinical registries.',
    availableDays: ['Monday', 'Wednesday', 'Thursday', 'Friday']
  },
  {
    id: 'doc-chen',
    name: 'Dr. Alistair Chen, MD, PhD',
    role: 'Attending Neurologist & Stroke Lead',
    credentials: 'Johns Hopkins University · UCSF Stroke Fellow · NIH Research Scholar',
    department: 'neurology',
    avatarInitials: 'AC',
    bio: 'Specializes in hyper-acute ischemic stroke intervention, mechanical thrombectomy, and intracranial hemodynamic modeling.',
    availableDays: ['Tuesday', 'Wednesday', 'Thursday']
  },
  {
    id: 'doc-almansoor',
    name: 'Dr. Sophia Al-Mansoor, MD, PhD',
    role: 'Head of Molecular Oncology',
    credentials: 'Karolinska Institute · MD Anderson Cancer Center Fellow',
    department: 'oncology',
    avatarInitials: 'SA',
    bio: 'Leader in liquid biopsy genomic diagnostics and personalized immunotherapeutic design.',
    availableDays: ['Monday', 'Tuesday', 'Friday']
  },
  {
    id: 'doc-thorne',
    name: 'Dr. Shannon Thorne, MD, FCCP',
    role: 'Director of Pulmonary & Critical Care',
    credentials: 'Oxford University Medical Sciences · SingHealth Critical Care Fellow',
    department: 'pulmonary',
    avatarInitials: 'ST',
    bio: 'Expert in mechanical ventilation physiology, ARDS gas diffusion kinetics, and clinical student mentorship.',
    availableDays: ['Monday', 'Wednesday', 'Friday']
  },
  {
    id: 'officer-liam',
    name: 'Paramedic Officer Liam Gallagher',
    role: 'Emergency Trauma & Dispatch Lead',
    credentials: 'Flight Paramedic Certified (FP-C) · Critical Care Trauma Lead',
    department: 'emergency',
    avatarInitials: 'LG',
    bio: 'Directs 24/7 rapid emergency dispatch and telemedicine pre-hospital triage protocols.',
    availableDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
  },
  {
    id: 'desk-shannon',
    name: 'Shannon Sterling, RN',
    role: 'Senior Clinical Coordinator & Front Desk',
    credentials: 'BSN, RN · Certified Healthcare Access Manager (CHAM)',
    department: 'front_desk',
    avatarInitials: 'SS',
    bio: 'Coordinates patient journey, doctor referrals, multidisciplinary consults, and admission pathways.',
    availableDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']
  },
  {
    id: 'billing-elena',
    name: 'Elena Rostova, CHC',
    role: 'Patient Accounts & Billing Supervisor',
    credentials: 'Certified Healthcare Financial Professional (CHFP) · CPMA',
    department: 'billing',
    avatarInitials: 'ER',
    bio: 'Dedicated to transparent itemized hospital billing, insurance pre-authorization, and financial patient advocacy.',
    availableDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']
  },
  {
    id: 'pharm-marcus',
    name: 'Dr. Marcus Thorne, PharmD',
    role: 'Chief Clinical Pharmacist',
    credentials: 'Board Certified Pharmacotherapy Specialist (BCPS)',
    department: 'pharmacy',
    avatarInitials: 'MT',
    bio: 'Manages clinical inpatient dispensaries, drug interaction screening, and prescription titration protocols.',
    availableDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  }
];

export const RESEARCH_PAPERS: ClinicalResearchPaper[] = [
  {
    id: 'paper-1',
    title: 'Door-to-Balloon Optimization via Pre-Hospital Digital Telemetry: A 5-Year Single-Center Registry',
    journal: 'New England Journal of Medicine (NEJM Clinical)',
    year: 2025,
    authors: 'Vance J., Sterling S., Chen A., et al.',
    doi: '10.1056/NEJMoa2501982',
    abstract: 'Pre-hospital 12-lead ECG transmission paired with continuous arterial hemodynamic monitoring reduced total ischemic time by 38.4 minutes in acute STEMI cohorts.',
    keyFinding: 'Demonstrated 42% reduction in 30-day post-infarct heart failure admissions using automated telemetry.'
  },
  {
    id: 'paper-2',
    title: 'Dynamic Interactive Hemodynamic Modeling in Patient Health Literacy: Outcomes from a Student-Led Trial',
    journal: 'The Lancet Digital Health',
    year: 2026,
    authors: 'David & Shannon Medical Student Collective, Thorne S., et al.',
    doi: '10.1016/S2589-7500(26)00112-X',
    abstract: 'Patients engaging with interactive biological simulations showed a 78% increase in medication adherence and a statistically significant reduction in 90-day readmissions.',
    keyFinding: 'Proved visual, tactile medical education directly drives physiological compliance and clinical stability.'
  },
  {
    id: 'paper-3',
    title: 'Ultra-Early Tenecteplase Administration in Acute Large Vessel Occlusion Ischemic Stroke',
    journal: 'Nature Medicine',
    year: 2025,
    authors: 'Chen A., Gallagher L., Al-Mansoor S., et al.',
    doi: '10.1038/s41591-025-03102-1',
    abstract: 'Mobile stroke triage protocols demonstrated a door-to-needle time of 28.5 minutes, tripling the rate of early functional neurological independence.',
    keyFinding: 'Validated the critical efficacy of combined telemedicine triage and direct-to-CT imaging pipelines.'
  }
];

export const PATIENT_TESTIMONIALS: PatientTestimonial[] = [
  {
    id: 'test-1',
    patientName: 'Evelyn Montgomery',
    age: 52,
    condition: 'Acute STEMI & LAD Drug-Eluting Stent',
    quote: 'When my chest tightens, panic used to take over. At David & Shannon Clinic, seeing the interactive model of my stent and talking directly to Dr. Vance gave me back my life and peace of mind.',
    recoveryOutcome: 'Full ventricular ejection recovery to 58% at 90 days',
    attendingPhysician: 'Dr. Julian Vance, MD, FACC'
  },
  {
    id: 'test-2',
    patientName: 'Marcus Sterling-Alvarez',
    age: 44,
    condition: 'Paroxysmal Atrial Fibrillation',
    quote: 'The hospital portal actually treats me like an intelligent human. I can see my exact ECG strip, track my potassium and troponin assays, and message my cardiology desk with zero friction.',
    recoveryOutcome: 'Sinus rhythm stabilized with targeted oral anticoagulation',
    attendingPhysician: 'Dr. Julian Vance, MD, FACC'
  },
  {
    id: 'test-3',
    patientName: 'Kaelen O\'Connor',
    age: 35,
    condition: 'Level 1 Polytrauma & Hemothorax',
    quote: 'The 24/7 Lifeline button got my telemetry to trauma dispatch in seconds before the ambulance even pulled up. The speed and calm coordination of the team saved my life.',
    recoveryOutcome: 'Complete resolution of pleural collection; discharged in 6 days',
    attendingPhysician: 'Officer Liam Gallagher / Trauma Team'
  }
];

export const INITIAL_PATIENTS: PatientRecord[] = [
  {
    id: 'pat-1',
    mrn: 'DSC-84920',
    fileNo: 'FILE-84920',
    username: 'evelyn.montgomery',
    password: 'patient123',
    fullName: 'Evelyn Montgomery',
    email: 'evelyn.montgomery@healthreach.org',
    phone: '+1 (555) 382-9014',
    dob: '1974-06-18',
    gender: 'Female',
    bloodType: 'A+',
    primaryDiagnosis: 'Coronary Artery Disease post-PCI (DES in LAD)',
    secondaryDiagnoses: ['Essential Hypertension (Stage II)', 'Dyslipidemia'],
    allergies: ['Penicillin (Anaphylactoid)', 'ACE Inhibitors (Angioedema)'],
    medications: ['Aspirin 81mg PO Daily', 'Ticagrelor 90mg PO BID', 'Atorvastatin 80mg PO QHS', 'Metoprolol Succinate 50mg PO Daily'],
    assignedDoctorId: 'doc-vance',
    assignedDoctorName: 'Dr. Julian Vance, MD, FACC',
    assignedDepartment: 'Cardiology',
    triageLevel: 'Level 2 - Emergent',
    isEmergencyAdmission: false,
    admissionDate: '2026-09-28',
    insuranceProvider: 'Blue Cross Premier Healthcare Plus',
    insurancePolicyNumber: 'BC-992014-X',
    emergencyContact: {
      name: 'Arthur Montgomery',
      relationship: 'Spouse',
      phone: '+1 (555) 382-9015'
    },
    vitals: {
      heartRate: 72,
      systolicBP: 124,
      diastolicBP: 78,
      oxygenSaturation: 98,
      respiratoryRate: 15,
      temperature: 36.8,
      glucose: 104,
      ecgRhythm: 'Normal Sinus Rhythm'
    },
    labResults: [
      {
        id: 'lab-1',
        name: 'High-Sensitivity Cardiac Troponin T',
        category: 'Cardiac Biomarkers',
        value: 12,
        unit: 'ng/L',
        normalMin: 0,
        normalMax: 14,
        status: 'normal',
        collectedDate: '2026-10-02'
      },
      {
        id: 'lab-2',
        name: 'Serum Potassium (K+)',
        category: 'Metabolic Panel',
        value: 4.4,
        unit: 'mmol/L',
        normalMin: 3.5,
        normalMax: 5.0,
        status: 'normal',
        collectedDate: '2026-10-02'
      },
      {
        id: 'lab-3',
        name: 'Low-Density Lipoprotein (LDL-C)',
        category: 'Lipid Panel',
        value: 68,
        unit: 'mg/dL',
        normalMin: 40,
        normalMax: 70,
        status: 'normal',
        collectedDate: '2026-10-02'
      },
      {
        id: 'lab-4',
        name: 'Serum Creatinine',
        category: 'Metabolic Panel',
        value: 0.95,
        unit: 'mg/dL',
        normalMin: 0.6,
        normalMax: 1.2,
        status: 'normal',
        collectedDate: '2026-10-02'
      },
      {
        id: 'lab-5',
        name: 'Hemoglobin (Hb)',
        category: 'Hematology',
        value: 13.8,
        unit: 'g/dL',
        normalMin: 12.0,
        normalMax: 16.0,
        status: 'normal',
        collectedDate: '2026-10-02'
      }
    ],
    prescriptions: [
      {
        id: 'rx-101',
        medication: 'Ticagrelor (Brilinta)',
        dosage: '90 mg',
        route: 'Oral Tablet',
        frequency: 'Twice daily with meals',
        duration: '12 Months (Dual Antiplatelet Therapy)',
        instructions: 'Take 1 tablet every 12 hours. Do not miss doses. Monitor for spontaneous bruising or dark stools.',
        prescribingDoctor: 'Dr. Julian Vance, MD, FACC',
        prescribedDate: '2026-09-28',
        refillsRemaining: 3,
        pharmacy: 'David & Shannon In-House Outpatient Dispensary',
        status: 'Active'
      },
      {
        id: 'rx-102',
        medication: 'Atorvastatin Calcium',
        dosage: '80 mg',
        route: 'Oral Tablet',
        frequency: 'Once daily at bedtime',
        duration: 'Long-term maintenance',
        instructions: 'Take in the evening. Report any unexplained muscle soreness or weakness promptly.',
        prescribingDoctor: 'Dr. Julian Vance, MD, FACC',
        prescribedDate: '2026-09-28',
        refillsRemaining: 5,
        pharmacy: 'David & Shannon In-House Outpatient Dispensary',
        status: 'Active'
      }
    ],
    invoices: [
      {
        id: 'inv-801',
        invoiceNumber: 'INV-2026-8019',
        issuedDate: '2026-09-29',
        dueDate: '2026-10-29',
        department: 'Interventional Cardiology & Cath Lab',
        serviceDescription: 'Percutaneous Coronary Intervention with Drug-Eluting Stent (LAD) + Telemetry Observation',
        items: [
          { id: 'item-1', code: 'CPT-92928', description: 'PCI Single Major Coronary Vessel with DES Placement', charge: 8450.00 },
          { id: 'item-2', code: 'CPT-93458', description: 'Left Heart Catheterization with Coronary Angiography', charge: 3200.00 },
          { id: 'item-3', code: 'CPT-99233', description: 'Subsequent Inpatient Hospital Care (Level 3 Intensive)', charge: 850.00 }
        ],
        totalAmount: 12500.00,
        insuranceCovered: 11875.00,
        patientDue: 625.00,
        status: 'Unpaid'
      }
    ],
    appointments: [
      {
        id: 'apt-101',
        doctorName: 'Dr. Julian Vance, MD, FACC',
        doctorRole: 'Director of Clinical Cardiology',
        department: 'Cardiovascular Institute',
        date: '2026-10-12',
        timeSlot: '10:30 AM',
        type: 'In-Clinic Consultation',
        status: 'Confirmed',
        roomOrLink: 'Cardiology Clinic Bay 4, Suite 300',
        notes: 'Radial sheath access site assessment and resting 12-lead ECG review.'
      }
    ],
    followUpReminders: [
      {
        id: 'rem-1',
        title: 'Post-PCI 14-Day Radial Access Site & Hemodynamic Check',
        date: '2026-10-12',
        instructions: 'In-clinic evaluation of right radial puncture site, arterial pulse check, and ambulatory 12-lead ECG review.',
        doctorName: 'Dr. Julian Vance, MD, FACC',
        completed: false
      }
    ]
  },
  {
    id: 'pat-2',
    mrn: 'DSC-91204',
    fileNo: 'FILE-91204',
    username: 'david.sterling',
    password: 'patient123',
    fullName: 'David Sterling-Alvarez',
    email: 'd.sterling@alvarezbio.com',
    phone: '+1 (555) 749-2180',
    dob: '1982-11-04',
    gender: 'Male',
    bloodType: 'O+',
    primaryDiagnosis: 'Paroxysmal Atrial Fibrillation with Rapid Ventricular Response',
    secondaryDiagnoses: ['Mild Obstructive Sleep Apnea'],
    allergies: ['Sulfa drugs (Cutaneous rash)'],
    medications: ['Apixaban 5mg PO BID', 'Diltiazem CD 180mg PO Daily'],
    assignedDoctorId: 'doc-vance',
    assignedDoctorName: 'Dr. Julian Vance, MD, FACC',
    assignedDepartment: 'Cardiology',
    triageLevel: 'Level 2 - Emergent',
    isEmergencyAdmission: false,
    admissionDate: '2026-10-01',
    insuranceProvider: 'Cigna Global Health Premium',
    insurancePolicyNumber: 'CG-88192-K',
    emergencyContact: {
      name: 'Maria Alvarez',
      relationship: 'Sister',
      phone: '+1 (555) 749-2189'
    },
    vitals: {
      heartRate: 118,
      systolicBP: 136,
      diastolicBP: 86,
      oxygenSaturation: 97,
      respiratoryRate: 18,
      temperature: 37.1,
      glucose: 112,
      ecgRhythm: 'Atrial Fibrillation'
    },
    labResults: [
      {
        id: 'lab-201',
        name: 'Thyroid Stimulating Hormone (TSH)',
        category: 'Endocrine',
        value: 2.1,
        unit: 'mIU/L',
        normalMin: 0.4,
        normalMax: 4.0,
        status: 'normal',
        collectedDate: '2026-10-01'
      },
      {
        id: 'lab-202',
        name: 'Serum Magnesium',
        category: 'Metabolic Panel',
        value: 1.6,
        unit: 'mg/dL',
        normalMin: 1.8,
        normalMax: 2.4,
        status: 'borderline',
        collectedDate: '2026-10-01'
      }
    ],
    prescriptions: [
      {
        id: 'rx-201',
        medication: 'Apixaban (Eliquis)',
        dosage: '5 mg',
        route: 'Oral Tablet',
        frequency: 'Twice daily',
        duration: 'Continuous Stroke Prophylaxis',
        instructions: 'Take 1 tablet every 12 hours with or without food. Never stop without consulting cardiologist.',
        prescribingDoctor: 'Dr. Julian Vance, MD, FACC',
        prescribedDate: '2026-10-01',
        refillsRemaining: 5,
        pharmacy: 'David & Shannon In-House Outpatient Dispensary',
        status: 'Active'
      }
    ],
    invoices: [
      {
        id: 'inv-802',
        invoiceNumber: 'INV-2026-8024',
        issuedDate: '2026-10-02',
        dueDate: '2026-11-02',
        department: 'Electrophysiology & Arrhythmia Clinic',
        serviceDescription: 'Transthoracic Echocardiogram (TTE) + Holter Monitor 7-day Telemetry Provision',
        items: [
          { id: 'item-1', code: 'CPT-93306', description: 'Complete Transthoracic Echocardiography with Doppler', charge: 1850.00 },
          { id: 'item-2', code: 'CPT-93224', description: 'External ECG Continuous Recording up to 7 Days', charge: 620.00 }
        ],
        totalAmount: 2470.00,
        insuranceCovered: 2223.00,
        patientDue: 247.00,
        status: 'Unpaid'
      }
    ],
    appointments: [],
    followUpReminders: [
      {
        id: 'rem-2',
        title: 'Electrophysiology Rhythm Re-assessment',
        date: '2026-10-20',
        instructions: 'Review continuous telemetry rhythm strip to assess response to rate control.',
        doctorName: 'Dr. Julian Vance, MD, FACC',
        completed: false
      }
    ]
  },
  {
    id: 'pat-3',
    mrn: 'DSC-EMERG-001',
    fileNo: 'FILE-10945',
    username: 'kaelen.oconnor',
    password: 'patient123',
    fullName: 'Kaelen O\'Connor',
    email: 'k.oconnor@urbanlogistics.net',
    phone: '+1 (555) 912-4411',
    dob: '1991-03-22',
    gender: 'Male',
    bloodType: 'O-',
    primaryDiagnosis: 'Traumatic Hemothorax & Multiple Rib Contusions',
    secondaryDiagnoses: ['Acute Blood Loss Anemia'],
    allergies: ['No Known Drug Allergies (NKDA)'],
    medications: ['Cefazolin 2g IV Q8H', 'Morphine Sulfate IV PRN Severe Pain'],
    assignedDoctorId: 'officer-liam',
    assignedDoctorName: 'Officer Liam Gallagher / Trauma Team',
    assignedDepartment: 'Emergency',
    triageLevel: 'Level 1 - Resuscitation',
    isEmergencyAdmission: true,
    admissionDate: '2026-10-04',
    insuranceProvider: 'State First Medical Assistance',
    insurancePolicyNumber: 'SF-10492-T',
    emergencyContact: {
      name: 'Nora O\'Connor',
      relationship: 'Mother',
      phone: '+1 (555) 912-4412'
    },
    vitals: {
      heartRate: 122,
      systolicBP: 92,
      diastolicBP: 58,
      oxygenSaturation: 91,
      respiratoryRate: 26,
      temperature: 36.2,
      glucose: 142,
      ecgRhythm: 'Sinus Tachycardia'
    },
    labResults: [
      {
        id: 'lab-301',
        name: 'Arterial Blood Gas: PaO2',
        category: 'Hematology',
        value: 64,
        unit: 'mmHg',
        normalMin: 75,
        normalMax: 100,
        status: 'critical',
        collectedDate: '2026-10-04'
      },
      {
        id: 'lab-302',
        name: 'Serum Lactate',
        category: 'Metabolic Panel',
        value: 3.8,
        unit: 'mmol/L',
        normalMin: 0.5,
        normalMax: 2.0,
        status: 'critical',
        collectedDate: '2026-10-04'
      }
    ],
    prescriptions: [
      {
        id: 'rx-301',
        medication: 'Tranexamic Acid (TXA)',
        dosage: '1000 mg',
        route: 'Intravenous Infusion',
        frequency: 'Stat over 10 min, then 1g over 8 hours',
        duration: 'Emergency Trauma Protocol',
        instructions: 'Initiated during acute trauma resuscitation.',
        prescribingDoctor: 'Trauma Surgery Service',
        prescribedDate: '2026-10-04',
        refillsRemaining: 0,
        pharmacy: 'David & Shannon In-House Outpatient Dispensary',
        status: 'Active'
      }
    ],
    invoices: [],
    appointments: [],
    followUpReminders: []
  }
];

export const INITIAL_MESSAGES: ClinicalMessage[] = [
  {
    id: 'msg-1',
    patientId: 'pat-1',
    department: 'cardiology',
    sender: 'staff',
    senderName: 'Dr. Julian Vance, MD, FACC',
    senderRole: 'Director of Clinical Cardiology',
    text: 'Good morning Evelyn. We completed the 48-hour post-PCI review. Your high-sensitivity troponin has stabilized down to 12 ng/L (nominal baseline), and your radial puncture site exhibits excellent hemostasis. How are you feeling this morning?',
    timestamp: 'Yesterday at 09:15 AM'
  },
  {
    id: 'msg-2',
    patientId: 'pat-1',
    department: 'cardiology',
    sender: 'patient',
    senderName: 'Evelyn Montgomery',
    senderRole: 'Patient',
    text: 'Thank you Dr. Vance! The pressure sensation in my chest has completely resolved. I noticed a small dark bruise on my right forearm near the wrist, but no active tenderness or swelling.',
    timestamp: 'Yesterday at 11:30 AM'
  },
  {
    id: 'msg-3',
    patientId: 'pat-1',
    department: 'cardiology',
    sender: 'staff',
    senderName: 'Dr. Julian Vance, MD, FACC',
    senderRole: 'Director of Clinical Cardiology',
    text: 'That minor ecchymosis is common with Ticagrelor dual antiplatelet therapy and radial sheath access. I have dispatched your updated 12-month Ticagrelor prescription along with your itemized hospital superbill.',
    timestamp: 'Yesterday at 02:45 PM',
    attachment: {
      type: 'prescription',
      data: {
        id: 'rx-101',
        medication: 'Ticagrelor (Brilinta) 90 mg',
        instructions: 'Take 1 tablet every 12 hours with food.',
        refillsRemaining: 3
      }
    }
  },
  {
    id: 'msg-4',
    patientId: 'pat-1',
    department: 'billing',
    sender: 'staff',
    senderName: 'Elena Rostova, CHC',
    senderRole: 'Patient Accounts & Billing Supervisor',
    text: 'Hello Evelyn. Your inpatient stay and Cath Lab procedures have been pre-processed with Blue Cross Premier. Your total copay balance is $625.00, which you may review or settle online securely here.',
    timestamp: 'Today at 08:30 AM',
    attachment: {
      type: 'invoice',
      data: {
        id: 'inv-801',
        invoiceNumber: 'INV-2026-8019',
        totalAmount: 12500.00,
        insuranceCovered: 11875.00,
        patientDue: 625.00,
        status: 'Unpaid'
      }
    }
  }
];

export const INITIAL_NOTIFICATIONS: ClinicalNotification[] = [
  {
    id: 'notif-1',
    patientId: 'pat-1',
    title: 'New Medication Prescription Issued',
    message: 'Dr. Julian Vance has authorized Ticagrelor (Brilinta) 90 mg for 12 months maintenance.',
    type: 'prescription',
    timestamp: 'Yesterday at 02:45 PM',
    read: false,
    actionTargetTab: 'prescriptions',
    relatedEntityId: 'rx-101'
  },
  {
    id: 'notif-2',
    patientId: 'pat-1',
    title: 'Itemized Hospital Statement Ready',
    message: 'Invoice INV-2026-8019 for Interventional Cardiology Care ($625.00 copay) is available for online review.',
    type: 'invoice',
    timestamp: 'Today at 08:30 AM',
    read: false,
    actionTargetTab: 'billing',
    relatedEntityId: 'inv-801'
  },
  {
    id: 'notif-3',
    patientId: 'pat-1',
    title: 'Automated Follow-Up Reminder',
    message: 'Post-PCI 14-Day Radial Access Site check is scheduled for October 12, 2026 with Dr. Julian Vance.',
    type: 'reminder',
    timestamp: 'Today at 07:00 AM',
    read: true,
    actionTargetTab: 'biometrics'
  }
];

export const VIRTUAL_SCENARIOS: VirtualPatientScenario[] = [
  {
    id: 'scenario-stemi',
    title: 'Acute Coronary Syndrome (STEMI vs NSTEMI)',
    category: 'Cardiovascular',
    difficulty: 'Advanced Residency',
    patientProfile: {
      age: 56,
      gender: 'Male (Robert Daniels)',
      chiefComplaint: 'Crushing substernal chest pressure radiating to left mandible, onset 45 minutes ago while shoveling snow.',
      history: '25-pack-year smoking history, untreated hypertension, family history of premature CAD.'
    },
    initialVitals: {
      heartRate: 104,
      systolicBP: 158,
      diastolicBP: 96,
      oxygenSaturation: 94,
      respiratoryRate: 22,
      temperature: 37.0,
      glucose: 148,
      ecgRhythm: 'ST Elevation'
    },
    steps: [
      {
        stepNumber: 1,
        stageTitle: 'Immediate Emergency Triage & Diagnostic Assessment',
        clinicalPresentation: 'Patient is diaphoretic, clutching his chest, reporting 9/10 severity pain. Pale conjunctiva and cool extremities.',
        currentVitals: {
          heartRate: 104,
          systolicBP: 158,
          diastolicBP: 96,
          oxygenSaturation: 94,
          respiratoryRate: 22,
          temperature: 37.0,
          glucose: 148,
          ecgRhythm: 'ST Elevation'
        },
        diagnosticClues: [
          'ECG Lead II, III, aVF show 3.5mm convex ST-segment elevation with reciprocal ST depression in leads I and aVL (Acute Inferior STEMI).',
          'Right ventricular involvement must be evaluated via Lead V4R before administering nitrates.'
        ],
        options: [
          {
            id: 'opt-1a',
            label: 'Order stat Chewable Aspirin 325mg, Oxygen titration to >92%, and activate Cardiac Cath Lab for primary PCI',
            clinicalRationale: 'Gold standard: Early antiplatelet loading + rapid reperfusion protocol within the 90-minute door-to-balloon window.',
            impactOnVitals: { heartRate: 92, systolicBP: 142, oxygenSaturation: 97 },
            isOptimal: true,
            feedback: 'Exemplary clinical decision. Door-to-balloon countdown initiated; Cath Lab team mobilized.'
          },
          {
            id: 'opt-1b',
            label: 'Administer high-dose IV Morphine and wait for serum troponin results before Cath Lab activation',
            clinicalRationale: 'Troponin markers take 3-4 hours to rise. Delaying STEMI reperfusion causes irreversible myocardial necrosis.',
            impactOnVitals: { heartRate: 115, systolicBP: 120, oxygenSaturation: 93 },
            isOptimal: false,
            feedback: 'Hazardous delay. In acute STEMI with diagnostic ST elevation, one must never delay reperfusion for blood enzyme results.'
          }
        ]
      },
      {
        stepNumber: 2,
        stageTitle: 'Cath Lab Intervention & Hemodynamic Stabilization',
        clinicalPresentation: 'Coronary angiography reveals a 99% thrombotic occlusion of the proximal Right Coronary Artery (RCA).',
        currentVitals: {
          heartRate: 92,
          systolicBP: 138,
          diastolicBP: 84,
          oxygenSaturation: 98,
          respiratoryRate: 16,
          temperature: 36.9,
          glucose: 130,
          ecgRhythm: 'Normal Sinus Rhythm'
        },
        diagnosticClues: [
          'TIMI flow grade 0 pre-intervention.',
          'Post-balloon aspiration and Drug-Eluting Stent (DES) deployment restores TIMI 3 flow.',
          'Reperfusion ventricular ectopy noted briefly, self-terminating.'
        ],
        options: [
          {
            id: 'opt-2a',
            label: 'Initiate weight-adjusted Unfractionated Heparin infusion + Ticagrelor 180mg loading dose + High-intensity Statin',
            clinicalRationale: 'Essential secondary prevention and stent thrombosis prevention regimen.',
            impactOnVitals: { heartRate: 74, systolicBP: 122, oxygenSaturation: 99 },
            isOptimal: true,
            feedback: 'Optimal therapy established. Myocardial salvage maximized with excellent coronary perfusion.'
          },
          {
            id: 'opt-2b',
            label: 'Discontinue antiplatelet agents immediately to prevent hematoma at radial sheath access',
            clinicalRationale: 'Premature antiplatelet cessation within hours of stent placement causes acute catastrophic stent thrombosis.',
            impactOnVitals: { heartRate: 120, systolicBP: 90, oxygenSaturation: 92 },
            isOptimal: false,
            feedback: 'Critical error. Acute stent thrombosis risk exceeds 80% without dual antiplatelet protection.'
          }
        ]
      }
    ],
    learningObjectives: [
      'Master the distinction between STEMI and NSTEMI clinical triage protocols.',
      'Understand the 90-minute door-to-balloon PCI timeline imperative.',
      'Manage dual antiplatelet pharmacotherapy (DAPT) alongside anticoagulation.',
      'Anticipate and recognize reperfusion arrhythmias.'
    ]
  },
  {
    id: 'scenario-stroke',
    title: 'Acute Ischemic Stroke — Thrombolytic Window',
    category: 'Neurology & Stroke',
    difficulty: 'Intermediate',
    patientProfile: {
      age: 69,
      gender: 'Female (Clara Hughes)',
      chiefComplaint: 'Sudden onset right-sided facial droop and expressive aphasia, last known well 75 minutes ago.',
      history: 'Non-valvular Atrial Fibrillation (non-adherent with anticoagulation), Type 2 Diabetes.'
    },
    initialVitals: {
      heartRate: 88,
      systolicBP: 172,
      diastolicBP: 102,
      oxygenSaturation: 97,
      respiratoryRate: 16,
      temperature: 36.7,
      glucose: 128,
      ecgRhythm: 'Atrial Fibrillation'
    },
    steps: [
      {
        stepNumber: 1,
        stageTitle: 'Immediate Neuro-Vascular Triage & Non-Contrast Head CT',
        clinicalPresentation: 'NIH Stroke Scale (NIHSS) score: 14. Severe expressive speech deficit, right hemiparesis (arm 3/5, leg 4/5).',
        currentVitals: {
          heartRate: 88,
          systolicBP: 172,
          diastolicBP: 102,
          oxygenSaturation: 97,
          respiratoryRate: 16,
          temperature: 36.7,
          glucose: 128,
          ecgRhythm: 'Atrial Fibrillation'
        },
        diagnosticClues: [
          'Non-contrast Head CT reveals NO intracranial hemorrhage; subtle early ischemic changes in left MCA territory.',
          'Blood glucose is 128 mg/dL (hypoglycemia excluded as mimic).',
          'Blood pressure is 172/102 mmHg (within eligible threshold for IV thrombolysis < 185/110).'
        ],
        options: [
          {
            id: 'opt-stroke-1a',
            label: 'Administer IV Tenecteplase (or Alteplase) immediately within the 4.5-hour window, followed by CTA to check for large vessel occlusion (LVO)',
            clinicalRationale: 'Rapid intravenous thrombolysis recanalizes ischemic penumbra before irreversible infarction occurs.',
            impactOnVitals: { heartRate: 80, systolicBP: 154, oxygenSaturation: 98 },
            isOptimal: true,
            feedback: 'Brilliant timing. Thrombolysis commenced at door-to-needle time of 32 minutes.'
          },
          {
            id: 'opt-stroke-1b',
            label: 'Wait 12 hours for follow-up MRI to confirm the exact size of the ischemic penumbra',
            clinicalRationale: 'Every minute of untreated large vessel ischemia destroys 1.9 million neurons ("Time is Brain").',
            impactOnVitals: { heartRate: 98, systolicBP: 195, oxygenSaturation: 95 },
            isOptimal: false,
            feedback: 'Catastrophic delay. Missing the 4.5-hour thrombolysis window results in permanent dense hemiplegia.'
          }
        ]
      }
    ],
    learningObjectives: [
      'Apply the NIH Stroke Scale (NIHSS) under time-critical emergency conditions.',
      'Differentiate hemorrhagic from ischemic strokes using emergent non-contrast CT.',
      'Safely navigate IV thrombolytic eligibility, blood pressure guardrails, and mechanical thrombectomy criteria.'
    ]
  }
];
