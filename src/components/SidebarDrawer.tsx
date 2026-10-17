import React from 'react';
import { ViewTab, UserRoleMode, UserSession } from '../types';
import { SportziconIcon } from './SportziconIcon';
import { 
  X, 
  Activity, 
  Building2, 
  Trophy, 
  ShieldCheck, 
  Search, 
  Info, 
  Mail, 
  Home, 
  Rss, 
  Briefcase, 
  LogOut, 
  User, 
  ExternalLink,
  ChevronRight,
  Sparkles,
  MessageSquare
} from 'lucide-react';

interface SidebarDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  activeTab: ViewTab;
  setActiveTab: (tab: ViewTab) => void;
  userRole: UserRoleMode;
  setUserRole: (role: UserRoleMode) => void;
  userSession: UserSession | null;
  onLogout: () => void;
  onOpenReportModal: () => void;
}

export const SidebarDrawer: React.FC<SidebarDrawerProps> = ({
  isOpen,
  onClose,
  activeTab,
  setActiveTab,
  userRole,
  setUserRole,
  userSession,
  onLogout,
  onOpenReportModal,
}) => {
  if (!isOpen) return null;

  const handleNavigate = (tab: ViewTab) => {
    setActiveTab(tab);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex animate-fadeIn">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/75 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Drawer Content */}
      <div className="relative w-80 max-w-[85vw] bg-[#0F172A] text-white h-full flex flex-col shadow-2xl border-r border-[#1E293B] z-10 overflow-hidden">
        
        {/* Drawer Header - Fixed/Sticky at top so Close X is always visible */}
        <div className="p-5 border-b border-[#1E293B] flex items-center justify-between bg-[#0B1120] shrink-0 sticky top-0 z-20">
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => handleNavigate('newsfeed')}>
            <SportziconIcon size="md" showBadge={false} />
            <div className="flex flex-col">
              <span className="font-sans text-2xl font-extrabold tracking-tight text-white italic leading-none">
                sportz<span className="text-[#E04E26]">ícon</span>
              </span>
              <span className="text-[9px] font-sans font-bold tracking-[0.25em] text-slate-400 uppercase mt-0.5">
                EST. 2026
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            title="Close Drawer"
            className="p-2 rounded-xl bg-[#1E293B] hover:bg-[#FA4D14] text-slate-300 hover:text-white transition-all cursor-pointer shadow-sm"
          >
            <X className="w-5 h-5 stroke-[2.5]" />
          </button>
        </div>

        {/* Scrollable Container for Menu Items & User Session */}
        <div className="flex-1 overflow-y-auto flex flex-col justify-between">
          <div>
            {/* User Card if logged in */}
            {userSession ? (
              <div className="p-4 bg-[#1E293B]/60 border-b border-[#1E293B] flex items-center justify-between">
                <div className="flex items-center space-x-3 cursor-pointer" onClick={() => handleNavigate('profile')}>
                  <img 
                    src={userSession.avatar} 
                    alt={userSession.name} 
                    className="w-10 h-10 rounded-xl object-cover border-2 border-[#FA4D14]" 
                  />
                  <div className="min-w-0">
                    <h3 className="text-sm font-semibold text-white truncate">{userSession.name}</h3>
                    <p className="text-xs text-slate-400 font-normal">{userSession.sportziconId}</p>
                  </div>
                </div>

                <button
                  onClick={() => handleNavigate('profile')}
                  className="px-2.5 py-1 rounded-lg bg-[#FA4D14]/20 text-[#FA4D14] hover:bg-[#FA4D14] hover:text-white transition-all text-xs font-semibold"
                >
                  Profile
                </button>
              </div>
            ) : (
              <div className="p-4 bg-[#1E293B]/40 border-b border-[#1E293B]">
                <button
                  onClick={() => handleNavigate('login')}
                  className="w-full py-2.5 px-4 rounded-xl bg-[#FA4D14] hover:bg-[#E03A00] text-white font-semibold text-sm tracking-[0.01em] transition-all flex items-center justify-center space-x-2 cursor-pointer"
                >
                  <User className="w-4 h-4" />
                  <span>Sign In / Register</span>
                </button>
              </div>
            )}

            {/* Primary Ecosystem Navigation Menu */}
            <div className="p-4 space-y-6">
              
              {/* Section 1: Main Platform */}
              <div className="space-y-1">
                <span className="text-overline text-slate-400 px-3 block mb-1">
                  Main Platform
                </span>

                <button
                  onClick={() => handleNavigate('newsfeed')}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-semibold tracking-[0.01em] transition-all cursor-pointer ${
                    activeTab === 'newsfeed' ? 'bg-[#FA4D14] text-white' : 'text-slate-300 hover:bg-[#1E293B] hover:text-white'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <Rss className="w-4 h-4 text-[#FA4D14]" />
                    <span>Cricket Newsfeed</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-500" />
                </button>

                <button
                  onClick={() => handleNavigate('messages')}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-semibold tracking-[0.01em] transition-all cursor-pointer ${
                    activeTab === 'messages' ? 'bg-[#FA4D14] text-white' : 'text-slate-300 hover:bg-[#1E293B] hover:text-white'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <MessageSquare className="w-4 h-4 text-[#FA4D14]" />
                    <span>Direct Messenger & Chat</span>
                  </div>
                  <span className="px-1.5 py-0.5 rounded text-xs font-semibold tabular-nums bg-[#FA4D14] text-white">2</span>
                </button>

                <button
                  onClick={() => handleNavigate('opportunities')}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-semibold tracking-[0.01em] transition-all cursor-pointer ${
                    activeTab === 'opportunities' ? 'bg-[#FA4D14] text-white' : 'text-slate-300 hover:bg-[#1E293B] hover:text-white'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <Briefcase className="w-4 h-4 text-[#FA4D14]" />
                    <span>Trials & Opportunities</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-500" />
                </button>

                <button
                  onClick={() => handleNavigate('search')}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-semibold tracking-[0.01em] transition-all cursor-pointer ${
                    activeTab === 'search' ? 'bg-[#FA4D14] text-white' : 'text-slate-300 hover:bg-[#1E293B] hover:text-white'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <Search className="w-4 h-4 text-[#FA4D14]" />
                    <span>Talent Search</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-500" />
                </button>
              </div>

              {/* Section 2: Ecosystem Network Hubs */}
              <div className="space-y-1">
                <span className="text-overline text-slate-400 px-3 block mb-1">
                  Ecosystem Hubs
                </span>

                <button
                  onClick={() => handleNavigate('livescores')}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-semibold tracking-[0.01em] transition-all cursor-pointer ${
                    activeTab === 'livescores' ? 'bg-[#FA4D14] text-white' : 'text-slate-300 hover:bg-[#1E293B] hover:text-white'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <Activity className="w-4 h-4 text-[#FA4D14]" />
                    <span>Live Scoring Engine</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-500" />
                </button>

                <button
                  onClick={() => handleNavigate('ecosystem_hub')}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-semibold tracking-[0.01em] transition-all cursor-pointer ${
                    activeTab === 'ecosystem_hub' ? 'bg-[#FA4D14] text-white' : 'text-slate-300 hover:bg-[#1E293B] hover:text-white'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <Building2 className="w-4 h-4 text-[#FA4D14]" />
                    <span>Associations & Academies</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-500" />
                </button>

                <button
                  onClick={() => handleNavigate('ecosystem_hub')}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    activeTab === 'ecosystem_hub' ? 'bg-[#FA4D14] text-white' : 'text-slate-300 hover:bg-[#1E293B] hover:text-white'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <Trophy className="w-4 h-4 text-[#FA4D14]" />
                    <span>Tournaments & State Cups</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-500" />
                </button>

                <button
                  onClick={() => handleNavigate('ecosystem_hub')}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    activeTab === 'ecosystem_hub' ? 'bg-[#FA4D14] text-white' : 'text-slate-300 hover:bg-[#1E293B] hover:text-white'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <ShieldCheck className="w-4 h-4 text-[#FA4D14]" />
                    <span>Registered Clubs</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-500" />
                </button>
              </div>

              {/* Section 3: Diagnostic & Tools */}
              <div className="space-y-1">
                <span className="text-[10px] font-sans font-bold text-slate-400 uppercase tracking-widest px-3 block">
                  Design & Support
                </span>

                <button
                  onClick={() => handleNavigate('about')}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    activeTab === 'about' ? 'bg-[#FA4D14] text-white' : 'text-slate-300 hover:bg-[#1E293B] hover:text-white'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <Info className="w-4 h-4 text-[#FA4D14]" />
                    <span>About Sportzicon</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-500" />
                </button>

                <button
                  onClick={() => handleNavigate('contact')}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    activeTab === 'contact' ? 'bg-[#FA4D14] text-white' : 'text-slate-300 hover:bg-[#1E293B] hover:text-white'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <Mail className="w-4 h-4 text-[#FA4D14]" />
                    <span>Contact Us</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-500" />
                </button>

                {/* Log Out option positioned right below Contact Us */}
                {userSession && (
                  <button
                    onClick={() => {
                      onLogout();
                      onClose();
                      setActiveTab('login');
                    }}
                    className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer text-red-400 hover:bg-red-950/40 hover:text-red-300"
                  >
                    <div className="flex items-center space-x-3">
                      <LogOut className="w-4 h-4 text-red-400" />
                      <span>Log Out Account</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-red-400/50" />
                  </button>
                )}
              </div>

            </div>
          </div>

          {/* Footer info inside Drawer */}
          <div className="p-4 border-t border-[#1E293B] bg-[#0B1120] text-xs space-y-3 shrink-0">
            <a
              href="https://sportzicon.com"
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-between p-2.5 rounded-xl bg-[#1E293B] text-[#FA4D14] font-bold hover:bg-[#334155] transition-colors"
            >
              <span>Visit sportzicon.com</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>

        </div>

      </div>
    </div>
  );
};
