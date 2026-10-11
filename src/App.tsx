import React from 'react';
import { ClinicalProvider, useClinical } from './context/ClinicalContext';
import { Navbar } from './components/Navbar';
import { FlagshipHome } from './components/home/FlagshipHome';
import { InstitutesDirectory } from './components/services/InstitutesDirectory';
import { MedicalEducationSuite } from './components/education/MedicalEducationSuite';
import { PatientPortal } from './components/patient/PatientPortal';
import { AdminCommandConsole } from './components/admin/AdminCommandConsole';
import { EmergencyIntakeModal } from './components/modals/EmergencyIntakeModal';
import { ComprehensiveOnboardingModal } from './components/modals/ComprehensiveOnboardingModal';
import { InvoicePaymentModal } from './components/modals/InvoicePaymentModal';
import { AppointmentBookingModal } from './components/modals/AppointmentBookingModal';
import { AuthModal } from './components/auth/AuthModal';

import { AdminGatekeeper } from './components/admin/AdminGatekeeper';

import { PatientAccessGateway } from './components/patient/PatientAccessGateway';

const AppContent: React.FC = () => {
  const { activeTab, isAdminRoute, isAdminAuthenticated, isPatientLoggedIn } = useClinical();

  // If visiting /admin route, display the restricted admin domain
  if (isAdminRoute) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
        {isAdminAuthenticated ? (
          <AdminCommandConsole />
        ) : (
          <AdminGatekeeper />
        )}
      </div>
    );
  }

  // Purely public client-facing experience (zero admin traces)
  return (
    <div className="min-h-screen bg-slate-50/60 text-slate-900 flex flex-col selection:bg-teal-100 selection:text-teal-900 font-sans">
      <Navbar />

      <main className="flex-1">
        {activeTab === 'flagship' && <FlagshipHome />}
        {activeTab === 'institutes' && <InstitutesDirectory />}
        {activeTab === 'education' && <MedicalEducationSuite />}
        {activeTab === 'patient_portal' && (
          isPatientLoggedIn ? <PatientPortal /> : <PatientAccessGateway />
        )}
        {/* If user lands on admin_desk in public mode, default safely to flagship */}
        {activeTab === 'admin_desk' && <FlagshipHome />}
      </main>

      {/* Global Interactive Modals */}
      <EmergencyIntakeModal />
      <ComprehensiveOnboardingModal />
      <InvoicePaymentModal />
      <AppointmentBookingModal />
      <AuthModal />
    </div>
  );
};

export default function App() {
  return (
    <ClinicalProvider>
      <AppContent />
    </ClinicalProvider>
  );
}
