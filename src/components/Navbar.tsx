import React, { useState } from 'react';
import { useClinical } from '../context/ClinicalContext';
import { 
  Bell, 
  ShieldAlert, 
  Menu, 
  X, 
  ChevronDown, 
  LogIn, 
  LogOut,
  User, 
  UserPlus,
  Calendar, 
  ArrowRight,
  ShieldCheck
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const { 
    activeTab, 
    setActiveTab, 
    unreadNotificationCount, 
    notifications,
    markNotificationRead,
    markAllNotificationsRead,
    setPatientSubTab,
    setIsEmergencyModalOpen,
    setIsOnboardingModalOpen,
    setIsAppointmentModalOpen,
    currentPatient,
    isPatientLoggedIn,
    logoutPatient
  } = useClinical();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const patientNotifs = isPatientLoggedIn
    ? notifications.filter(n => n.patientId === currentPatient.id)
    : [];

  const navItems = [
    { id: 'flagship', label: 'Overview' },
    { id: 'institutes', label: 'Institutes' },
    { id: 'education', label: 'Virtual Scenarios' },
    { id: 'patient_portal', label: isPatientLoggedIn ? 'My Patient EHR' : 'Patient Hub' },
  ];

  const handleNavClick = (tabId: string) => {
    setActiveTab(tabId as any);
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-white border-b border-slate-200/90 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-2 sm:gap-4">
          
          {/* Zone 1: Single-line Wordmark */}
          <div className="flex items-center gap-3 shrink-0">
            <button 
              onClick={() => handleNavClick('flagship')} 
              className="text-left flex items-center gap-2 group cursor-pointer focus:outline-none"
            >
              <div className="w-8 h-8 rounded-lg bg-teal-600 text-white flex items-center justify-center font-extrabold font-mono text-xs shadow-xs shrink-0">
                DS
              </div>
              <div className="whitespace-nowrap">
                <span className="text-sm sm:text-base font-extrabold tracking-tight text-slate-900 group-hover:text-teal-700 transition-colors">
                  David & Shannon Clinic
                </span>
              </div>
            </button>

            {/* If Authenticated Patient: Single Patient Badge (No multi-patient switcher for visitors) */}
            {isPatientLoggedIn && (
              <div className="relative hidden xl:block">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center gap-1.5 px-2.5 py-1 text-xs rounded-lg border border-teal-200 bg-teal-50/80 hover:bg-teal-100 text-teal-900 transition-colors whitespace-nowrap cursor-pointer"
                >
                  <span className="w-2 h-2 rounded-full bg-teal-600 shrink-0"></span>
                  <span className="truncate max-w-[120px] font-semibold">{currentPatient.fullName.split(' ')[0]}</span>
                  <span className="text-[10px] font-mono text-teal-700 tabular-nums">({currentPatient.mrn})</span>
                  <ChevronDown className="w-3 h-3 text-teal-600" />
                </button>

                {isUserMenuOpen && (
                  <div 
                    className="absolute left-0 mt-1.5 w-56 rounded-xl bg-white border border-slate-200 shadow-xl p-2 z-50 animate-in fade-in zoom-in-95 duration-100"
                    onClick={() => setIsUserMenuOpen(false)}
                  >
                    <div className="px-2.5 py-1.5 border-b border-slate-100">
                      <div className="text-xs font-bold text-slate-900 truncate">{currentPatient.fullName}</div>
                      <div className="text-[10px] font-mono text-slate-500">File No: {currentPatient.fileNo || currentPatient.mrn}</div>
                    </div>
                    <div className="pt-1.5 space-y-1">
                      <button
                        onClick={() => {
                          setActiveTab('patient_portal');
                          setIsUserMenuOpen(false);
                        }}
                        className="w-full text-left px-2.5 py-1.5 text-xs rounded-lg hover:bg-slate-50 text-slate-700 font-medium flex items-center justify-between"
                      >
                        <span>View EHR Records</span>
                        <ArrowRight className="w-3 h-3 text-slate-400" />
                      </button>
                      <button
                        onClick={() => {
                          logoutPatient();
                          setIsUserMenuOpen(false);
                        }}
                        className="w-full text-left px-2.5 py-1.5 text-xs rounded-lg hover:bg-red-50 text-red-700 font-semibold flex items-center gap-1.5"
                      >
                        <LogOut className="w-3.5 h-3.5" />
                        <span>Sign Out of Patient File</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Zone 2: Desktop Navigation Links (single-line, clean) */}
          <nav className="hidden lg:flex items-center gap-1 sm:gap-2 text-xs font-semibold text-slate-600">
            {navItems.map(item => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                    isActive
                      ? 'text-teal-700 bg-teal-50/80 font-bold'
                      : 'hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: Actions Cluster */}
          <div className="flex items-center gap-1.5 sm:gap-2.5">
            
            {/* Crimson Emergency Lifeline Pill */}
            <button
              onClick={() => setIsEmergencyModalOpen(true)}
              className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 text-xs font-bold rounded-lg bg-red-600 hover:bg-red-700 text-white shadow-xs transition-all cursor-pointer whitespace-nowrap active:scale-95"
              title="Rapid Emergency Lifeline Intake"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping"></span>
              <ShieldAlert className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">24/7 Lifeline</span>
              <span className="sm:hidden">Emergency</span>
            </button>

            {/* Desktop Quick Action: Book Consultation */}
            <button
              onClick={() => setIsAppointmentModalOpen(true)}
              className="hidden md:flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-800 transition-colors cursor-pointer"
            >
              <Calendar className="w-3.5 h-3.5 text-teal-700" />
              <span>Book Visit</span>
            </button>

            {/* Desktop Quick Action: Create Account (Prominently placed after Book Visit for new people) */}
            <button
              onClick={() => setIsOnboardingModalOpen(true)}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-lg bg-teal-50 hover:bg-teal-100 text-teal-800 border border-teal-200/90 transition-colors cursor-pointer"
              title="Register a new official patient file"
            >
              <UserPlus className="w-3.5 h-3.5 text-teal-700" />
              <span>Create Account</span>
            </button>

            {/* Authentication / Sign In or Patient Menu */}
            {!isPatientLoggedIn ? (
              <button
                onClick={() => {
                  setActiveTab('patient_portal');
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-lg bg-teal-600 hover:bg-teal-700 text-white shadow-xs transition-colors cursor-pointer"
                title="Sign in to your patient portal"
              >
                <LogIn className="w-3.5 h-3.5" />
                <span>Sign In</span>
              </button>
            ) : (
              /* Notifications Dropdown (Active only for authenticated patient) */
              <div className="relative">
                <button
                  onClick={() => setIsNotifOpen(!isNotifOpen)}
                  className="relative p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors focus:outline-none cursor-pointer"
                  title="Clinical Notifications"
                >
                  <Bell className="w-4 h-4" />
                  {unreadNotificationCount > 0 && (
                    <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-teal-600 text-white text-[10px] font-bold flex items-center justify-center tabular-nums">
                      {unreadNotificationCount}
                    </span>
                  )}
                </button>

                {isNotifOpen && (
                  <div className="absolute right-0 mt-2 w-76 sm:w-88 rounded-xl bg-white border border-slate-200 shadow-2xl p-2 z-50 animate-in fade-in zoom-in-95 duration-100">
                    <div className="flex items-center justify-between pb-2 border-b border-slate-100 px-2">
                      <div className="text-xs font-bold text-slate-900">
                        Clinical Alerts ({currentPatient.fullName.split(' ')[0]})
                      </div>
                      {unreadNotificationCount > 0 && (
                        <button
                          onClick={markAllNotificationsRead}
                          className="text-[11px] text-teal-700 hover:underline font-semibold cursor-pointer"
                        >
                          Mark all read
                        </button>
                      )}
                    </div>

                    <div className="max-h-72 overflow-y-auto divide-y divide-slate-100 my-1">
                      {patientNotifs.length === 0 ? (
                        <div className="py-6 text-center text-xs text-slate-400">
                          No pending notifications.
                        </div>
                      ) : (
                        patientNotifs.map(n => (
                          <div
                            key={n.id}
                            onClick={() => {
                              markNotificationRead(n.id);
                              if (n.actionTargetTab) {
                                setActiveTab('patient_portal');
                                setPatientSubTab(n.actionTargetTab);
                              }
                              setIsNotifOpen(false);
                            }}
                            className={`p-2.5 text-xs rounded-lg transition-colors cursor-pointer hover:bg-slate-50 ${
                              !n.read ? 'bg-teal-50/60' : ''
                            }`}
                          >
                            <div className="font-bold text-slate-900 truncate">{n.title}</div>
                            <p className="text-slate-600 text-[11px] mt-0.5 line-clamp-2">{n.message}</p>
                            <span className="text-[10px] text-slate-400 font-mono mt-1 block">{n.timestamp}</span>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Mobile Menu Hamburger Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-slate-700 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

          </div>

        </div>
      </header>

      {/* MOBILE DRAWER OVERLAY */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-16 z-30 bg-white/98 backdrop-blur-xl border-b border-slate-200 shadow-2xl p-4 animate-in slide-in-from-top-4 duration-150 max-h-[calc(100vh-4rem)] overflow-y-auto">
          <div className="space-y-4">
            
            {/* Authenticated Patient vs Visitor Card */}
            {isPatientLoggedIn ? (
              <div className="p-3.5 rounded-xl bg-teal-50/80 border border-teal-200 flex items-center justify-between">
                <div>
                  <div className="text-[10px] font-bold text-teal-800 uppercase tracking-wider">Signed-In Patient File</div>
                  <div className="text-sm font-bold text-slate-900">{currentPatient.fullName}</div>
                  <div className="text-xs font-mono text-teal-700 font-semibold">{currentPatient.mrn} · {currentPatient.bloodType}</div>
                </div>
                <button
                  onClick={() => {
                    logoutPatient();
                    setIsMobileMenuOpen(false);
                  }}
                  className="px-2.5 py-1 text-xs rounded-lg border border-red-200 bg-white font-semibold text-red-700 hover:bg-red-50"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-slate-900">Access Patient Portal</div>
                  <div className="text-[11px] text-slate-500">Sign in with your confidential credentials</div>
                </div>
                <button
                  onClick={() => {
                    setActiveTab('patient_portal');
                    setIsMobileMenuOpen(false);
                  }}
                  className="px-3 py-1.5 text-xs rounded-lg bg-teal-600 hover:bg-teal-700 font-bold text-white shadow-xs"
                >
                  Sign In
                </button>
              </div>
            )}

            {/* Navigation Links */}
            <div className="space-y-1 pt-1 border-t border-slate-100">
              {navItems.map(item => {
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`w-full text-left px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-colors flex items-center justify-between cursor-pointer ${
                      isActive 
                        ? 'bg-teal-50 text-teal-900 font-bold' 
                        : 'text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <span>{item.label}</span>
                    <ArrowRight className="w-4 h-4 text-slate-400" />
                  </button>
                );
              })}
            </div>

            {/* Quick Actions in Drawer */}
            <div className="pt-3 border-t border-slate-100 space-y-2">
              <button
                onClick={() => {
                  setIsAppointmentModalOpen(true);
                  setIsMobileMenuOpen(false);
                }}
                className="w-full py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <Calendar className="w-4 h-4" />
                <span>Book Clinical Consultation</span>
              </button>

              <button
                onClick={() => {
                  setIsOnboardingModalOpen(true);
                  setIsMobileMenuOpen(false);
                }}
                className="w-full py-2.5 rounded-xl bg-teal-50 hover:bg-teal-100 text-teal-800 border border-teal-200 font-bold text-xs shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <UserPlus className="w-4 h-4 text-teal-700" />
                <span>Create Patient Account</span>
              </button>

              <button
                onClick={() => {
                  setIsEmergencyModalOpen(true);
                  setIsMobileMenuOpen(false);
                }}
                className="w-full py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <ShieldAlert className="w-4 h-4" />
                <span>24/7 Rapid Emergency Lifeline</span>
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  );
};
