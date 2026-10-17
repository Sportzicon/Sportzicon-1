import React from 'react';
import { ViewTab, UserRoleMode, UserSession } from '../types';
import { SportziconIcon } from './SportziconIcon';
import { 
  Download, 
  Rss, 
  LogIn, 
  Menu, 
  Bell,
  Activity,
  Radio
} from 'lucide-react';

interface HeaderProps {
  activeTab: ViewTab;
  setActiveTab: (tab: ViewTab) => void;
  userRole: UserRoleMode;
  setUserRole: (role: UserRoleMode) => void;
  onOpenReportModal: () => void;
  userSession?: UserSession | null;
  onLogout?: () => void;
  onOpenSidebarDrawer?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  userRole,
  setUserRole,
  onOpenReportModal,
  userSession,
  onLogout,
  onOpenSidebarDrawer,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-[#0F172A] border-b border-[#1E293B] shadow-md transition-all text-white font-sans">
      <div className="max-w-7xl mx-auto px-2.5 sm:px-6 lg:px-8">
        
        {/* Top Header Row: 3-Lines Hamburger Menu + Authentic ICC Cup Flame Logo + Actions */}
        <div className="flex items-center justify-between py-2.5 sm:py-3 gap-1.5 sm:gap-3">
          
          <div className="flex items-center space-x-2 sm:space-x-3 shrink-0">
            {/* 3 Lines Hamburger Menu Button */}
            <button
              onClick={onOpenSidebarDrawer}
              title="Open Navigation Drawer"
              className="p-1.5 sm:p-2 rounded-xl bg-[#1E293B] hover:bg-[#FA4D14] text-slate-200 hover:text-white border border-[#334155] transition-all cursor-pointer flex items-center justify-center shadow-sm"
            >
              <Menu className="w-5 h-5 stroke-[2.5]" />
            </button>

            {/* Brand Logo with Sportzicon Olympic Torch Icon */}
            <div
              className="flex items-center space-x-2 sm:space-x-2.5 cursor-pointer group shrink-0"
              onClick={() => setActiveTab('newsfeed')}
            >
              <SportziconIcon size="md" showBadge={false} />
              <div className="flex flex-col">
                <span className="text-xl sm:text-2xl font-extrabold tracking-tight text-white italic leading-none font-sans">
                  sportz<span className="text-[#E04E26]">ícon</span>
                </span>
                <span className="text-[8px] sm:text-[9px] font-sans font-bold tracking-[0.25em] text-slate-400 uppercase mt-0.5">
                  EST. 2026
                </span>
              </div>
            </div>
          </div>

          {/* Stakeholder Role Switcher Pill Bar */}
          <div className="hidden lg:flex items-center bg-[#1E293B] p-1 rounded-xl border border-[#334155]">
            <span className="text-xs text-slate-300 font-bold uppercase tracking-wider px-2.5">
              Role:
            </span>
            <button
              onClick={() => setUserRole('athlete')}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                userRole === 'athlete'
                  ? 'bg-[#FA4D14] text-white shadow-sm'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              Athlete
            </button>
            <button
              onClick={() => setUserRole('academy')}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                userRole === 'academy' || userRole === 'club'
                  ? 'bg-[#FA4D14] text-white shadow-sm'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              Academy / Coach
            </button>
            <button
              onClick={() => setUserRole('scout')}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                userRole === 'scout'
                  ? 'bg-[#FA4D14] text-white shadow-sm'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              Scout
            </button>
            <button
              onClick={() => setUserRole('scorer')}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                userRole === 'scorer'
                  ? 'bg-[#FA4D14] text-white shadow-sm'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              Scorer / Official
            </button>
          </div>

          {/* Action CTAs & TOP RIGHT NOTIFICATIONS & LIVE SCORING CTA */}
          <div className="flex items-center space-x-1.5 sm:space-x-2.5 shrink-0">
            
            {/* Live Scoring Fast CTA Button (Available to ALL users) */}
            <button
              onClick={() => setActiveTab('livescores')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl font-semibold text-xs sm:text-sm tracking-[0.01em] transition-all cursor-pointer border ${
                activeTab === 'livescores'
                  ? 'bg-[#FA4D14] text-white border-[#FA4D14] shadow-md'
                  : 'bg-[#1E293B] hover:bg-[#FA4D14] text-slate-200 hover:text-white border-[#334155]'
              }`}
              title="Open Universal Live Scoring Engine"
            >
              <Radio className="w-3.5 h-3.5 text-red-500 animate-pulse" />
              <span className="hidden xs:inline sm:inline">Live Scorer</span>
            </button>

            {/* Top Header Notifications Bell Button */}
            <button
              onClick={() => setActiveTab('notifications')}
              className={`relative p-2 rounded-xl bg-[#1E293B] hover:bg-[#334155] border border-[#334155] transition-all cursor-pointer shadow-sm ${
                activeTab === 'notifications' ? 'text-[#FA4D14] border-[#FA4D14]' : 'text-slate-300 hover:text-white'
              }`}
              title="Notifications"
            >
              <Bell className="w-5 h-5 stroke-[2.2]" />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#FA4D14] text-white text-[10px] font-semibold tabular-nums rounded-full flex items-center justify-center border border-[#0F172A]">
                3
              </span>
            </button>

            {!userSession && (
              <button
                onClick={() => setActiveTab('login')}
                className="flex items-center space-x-1.5 bg-[#FA4D14] hover:bg-[#E03A00] text-white px-3 py-1.5 rounded-xl font-semibold text-xs sm:text-sm tracking-[0.01em] transition-all shadow-md hover:shadow-lg cursor-pointer border border-[#FA4D14]/30 shrink-0"
              >
                <LogIn className="w-3.5 h-3.5 shrink-0 text-white" />
                <span>Sign In</span>
              </button>
            )}

            <button
              onClick={onOpenReportModal}
              className="hidden sm:flex items-center space-x-1.5 px-3 py-2 rounded-xl bg-[#1E293B] hover:bg-[#334155] text-slate-200 border border-[#334155] font-semibold text-xs sm:text-sm tracking-[0.01em] transition-all cursor-pointer whitespace-nowrap"
            >
              <Download className="w-4 h-4 text-[#FA4D14]" />
              <span>Audit Report</span>
            </button>
          </div>

        </div>

        {/* Subheader Banner (Clean single line tagline) */}
        <div className="border-t border-[#1E293B] py-1.5 text-xs font-semibold tracking-[0.08em] text-slate-400 uppercase flex items-center justify-between">
          <span className="truncate">Where talent gets seen · Where sports ecosystem gets built</span>
          <span className="hidden md:inline text-xs text-[#FA4D14] font-semibold tracking-normal normal-case">
            Connecting every individual to sport
          </span>
        </div>

      </div>
    </header>
  );
};
