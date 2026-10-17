import React, { useState } from 'react';
import { ViewTab, UserRoleMode, Athlete, RecruitmentOpening, TournamentItem, UserSession } from './types';
import { INITIAL_ATHLETES, INITIAL_OPENINGS, INITIAL_MATCH_BALLS, INITIAL_TOURNAMENTS } from './data/sportziconData';
import { Header } from './components/Header';
import { HeroBanner } from './components/HeroBanner';
import { TalentSearch } from './components/TalentSearch';
import { AthleteProfileModal } from './components/AthleteProfileModal';
import { RecruitmentWorkflow } from './components/RecruitmentWorkflow';
import { LiveScoringEngine } from './components/LiveScoringEngine';
import { EcosystemHub } from './components/EcosystemHub';
import { CricketNewsfeed } from './components/CricketNewsfeed';
import { AuditOverview } from './components/AuditOverview';
import { DetailedAuditSection } from './components/DetailedAuditSection';
import { PersonaJourneys } from './components/PersonaJourneys';
import { InteractivePrototype } from './components/InteractivePrototype';
import { RecommendationsRoadmap } from './components/RecommendationsRoadmap';
import { AuditReportModal } from './components/AuditReportModal';
import { SampleDisplayShowcase } from './components/SampleDisplayShowcase';
import { LoginPage } from './components/LoginPage';
import { BottomNav } from './components/BottomNav';
import { SidebarDrawer } from './components/SidebarDrawer';
import { CreatePostModal } from './components/CreatePostModal';
import { NotificationsView } from './components/NotificationsView';
import { UserProfileView } from './components/UserProfileView';
import { DirectMessagingView } from './components/DirectMessagingView';
import { AboutContactView } from './components/AboutContactView';
import { ExternalLink, Sparkles, ShieldCheck, Download, Heart } from 'lucide-react';
import { SportziconIcon } from './components/SportziconIcon';

export default function App() {
  const [activeTab, setActiveTab] = useState<ViewTab>('newsfeed');
  const [userRole, setUserRole] = useState<UserRoleMode>('athlete');
  const [athletes, setAthletes] = useState<Athlete[]>(INITIAL_ATHLETES);
  const [openings, setOpenings] = useState<RecruitmentOpening[]>(INITIAL_OPENINGS);
  const [tournaments, setTournaments] = useState<TournamentItem[]>(INITIAL_TOURNAMENTS);
  const [selectedAthlete, setSelectedAthlete] = useState<Athlete | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isReportModalOpen, setIsReportModalOpen] = useState<boolean>(false);

  // Drawer and Create Modal UI states
  const [isSidebarDrawerOpen, setIsSidebarDrawerOpen] = useState<boolean>(false);
  const [isCreatePostModalOpen, setIsCreatePostModalOpen] = useState<boolean>(false);

  // Authenticated User Session
  const [userSession, setUserSession] = useState<UserSession | null>({
    id: 'SZ-2026-8891',
    name: 'Rohan Verma',
    email: 'rohan.verma@sportzicon.com',
    role: 'athlete',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
    organization: 'Apex Cricket Academy',
    sportziconId: 'SZ-2026-8891',
    verified: true,
    phone: '+91 98765 43210',
    primaryRole: 'Right-Arm Fast Bowler',
  });
  
  // Active Chat Recipient for Direct Messaging Navigation
  const [activeChatRecipient, setActiveChatRecipient] = useState<string | null>(null);

  // Always scroll to top of page when changing tabs (e.g. clicking Chat)
  React.useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [activeTab]);

  // Sub-tab for Audit Diagnostic Suite
  const [auditSubTab, setAuditSubTab] = useState<'overview' | 'audit-details' | 'personas' | 'prototype' | 'roadmap'>('overview');

  const featuredAthletes = athletes.filter((a) => a.featured);

  const handleLoginSuccess = (session: UserSession) => {
    setUserSession(session);
    setUserRole(session.role);
    setActiveTab('newsfeed'); // Auto redirect to newsfeed post-login
  };

  const handleLogout = () => {
    setUserSession(null);
    setActiveTab('login');
  };

  const handleApplyOpening = (openingId: string) => {
    setOpenings((prev) =>
      prev.map((op) => (op.id === openingId ? { ...op, appliedStatus: 'applied' } : op))
    );
    alert('Application submitted! Your Sportzicon Verified Profile has been sent to the recruiting scout.');
  };

  const handlePostNewOpening = (newOp: RecruitmentOpening) => {
    setOpenings((prev) => [newOp, ...prev]);
  };

  const handleRegisterTournament = (tournamentId: string) => {
    setTournaments((prev) =>
      prev.map((t) =>
        t.id === tournamentId
          ? { ...t, isRegistered: true, registeredTeamsCount: t.registeredTeamsCount + 1 }
          : t
      )
    );
    alert('Academy team successfully registered for tournament!');
  };

  const handlePostTournament = (newTourn: TournamentItem) => {
    setTournaments((prev) => [newTourn, ...prev]);
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#0F172A] font-sans flex flex-col selection:bg-[#FA4D14] selection:text-white antialiased">
      
      {/* Top Header Navigation */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        userRole={userRole}
        setUserRole={setUserRole}
        onOpenReportModal={() => setIsReportModalOpen(true)}
        userSession={userSession}
        onLogout={handleLogout}
        onOpenSidebarDrawer={() => setIsSidebarDrawerOpen(true)}
      />

      {/* Left Hamburger Navigation Drawer */}
      <SidebarDrawer
        isOpen={isSidebarDrawerOpen}
        onClose={() => setIsSidebarDrawerOpen(false)}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        userRole={userRole}
        setUserRole={setUserRole}
        userSession={userSession}
        onLogout={handleLogout}
        onOpenReportModal={() => setIsReportModalOpen(true)}
      />

      {/* Video & Update Creation Modal */}
      <CreatePostModal
        isOpen={isCreatePostModalOpen}
        onClose={() => setIsCreatePostModalOpen(false)}
        userSession={userSession}
        onPostSuccess={(newPost) => {
          alert('Update published to Sportzicon Cricket Network Feed!');
          setActiveTab('newsfeed');
        }}
      />

      {/* Main View Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-24 space-y-8">
        
        {/* VIEW 0: Login & Sign In Page */}
        {activeTab === 'login' && (
          <LoginPage
            userSession={userSession}
            onLoginSuccess={handleLoginSuccess}
            onLogout={handleLogout}
            setActiveTab={setActiveTab}
            userRole={userRole}
            setUserRole={setUserRole}
          />
        )}
        
        {/* VIEW 1: Ecosystem Home */}
        {activeTab === 'home' && (
          <HeroBanner
            setActiveTab={setActiveTab}
            setUserRole={setUserRole}
            featuredAthletes={featuredAthletes}
            onSelectAthlete={(ath) => setSelectedAthlete(ath)}
            onSearchQuery={(q) => setSearchQuery(q)}
          />
        )}

        {/* VIEW 1.5: Professional Cricket Newsfeed & Feed */}
        {activeTab === 'newsfeed' && (
          <CricketNewsfeed
            athletes={athletes}
            userRole={userRole}
            onSelectAthlete={(ath) => setSelectedAthlete(ath)}
            setActiveTab={setActiveTab}
            userSession={userSession}
            onShareToDirectMessage={(post) => {
              setActiveTab('messages');
            }}
            onStartChatWithUser={(userName) => {
              setActiveChatRecipient(userName);
              setActiveTab('messages');
            }}
          />
        )}

        {/* VIEW 1.8: Direct Messaging & Chat */}
        {activeTab === 'messages' && (
          <DirectMessagingView
            userSession={userSession}
            athletes={athletes}
            onSelectAthlete={(ath) => setSelectedAthlete(ath)}
            setActiveTab={setActiveTab}
            initialSelectedRecipient={activeChatRecipient}
          />
        )}

        {/* VIEW 2: Notifications & Alerts Radar */}
        {activeTab === 'notifications' && (
          <NotificationsView
            userSession={userSession}
            setActiveTab={setActiveTab}
          />
        )}

        {/* VIEW 3: Verified User Profile */}
        {activeTab === 'profile' && (
          <UserProfileView
            userSession={userSession}
            athlete={selectedAthlete}
            setActiveTab={setActiveTab}
            onLogout={handleLogout}
            onStartChat={(userName) => {
              setActiveChatRecipient(userName);
              setActiveTab('messages');
            }}
          />
        )}

        {/* VIEW 4: About & Contact Us Views */}
        {(activeTab === 'about' || activeTab === 'contact') && (
          <AboutContactView
            mode={activeTab === 'about' ? 'about' : 'contact'}
            setActiveTab={setActiveTab}
          />
        )}

        {/* VIEW 5: Universal Ecosystem & User Search */}
        {activeTab === 'search' && (
          <TalentSearch
            athletes={athletes}
            onSelectAthlete={(ath) => setSelectedAthlete(ath)}
            initialQuery={searchQuery}
            userSession={userSession}
            setActiveTab={setActiveTab}
            onStartChatWithUser={(userName) => {
              setActiveTab('messages');
            }}
          />
        )}

        {/* VIEW 6: Recruitment & Opportunities Workflow */}
        {activeTab === 'opportunities' && (
          <RecruitmentWorkflow
            openings={openings}
            onApplyOpening={handleApplyOpening}
            onPostNewOpening={handlePostNewOpening}
            userSession={userSession}
            onSelectAthlete={(ath) => setSelectedAthlete(ath)}
          />
        )}

        {/* VIEW 4: Live Tournament Scoring Engine (Available to ALL users) */}
        {activeTab === 'livescores' && (
          <LiveScoringEngine 
            initialBalls={INITIAL_MATCH_BALLS}
            userSession={userSession}
            userRole={userRole}
            onSelectAthlete={(athId) => {
              const found = athletes.find(a => a.id === athId);
              if (found) setSelectedAthlete(found);
            }}
          />
        )}

        {/* VIEW 5: Cricket Ecosystem Hub */}
        {activeTab === 'ecosystem_hub' && (
          <EcosystemHub
            athletes={athletes}
            openings={openings}
            tournaments={tournaments}
            onSelectAthlete={(ath) => setSelectedAthlete(ath)}
            onApplyOpening={handleApplyOpening}
            onPostOpening={handlePostNewOpening}
            onRegisterTournament={handleRegisterTournament}
            onPostTournament={handlePostTournament}
          />
        )}

        {/* VIEW 5: UI/UX Diagnostic Suite */}
        {activeTab === 'audit' && (
          <div className="space-y-6">
            
            {/* Audit Diagnostic Sub-Tabs Bar */}
            <div className="bg-white p-2.5 rounded-2xl border border-[#E5DFD5] flex flex-wrap items-center justify-between gap-2 shadow-sm">
              <div className="flex items-center space-x-1 overflow-x-auto no-scrollbar">
                <button
                  onClick={() => setAuditSubTab('overview')}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    auditSubTab === 'overview'
                      ? 'bg-[#111827] text-white shadow-md'
                      : 'text-[#4B5563] hover:text-[#111827] hover:bg-[#FAF7F2]'
                  }`}
                >
                  Diagnostic Overview
                </button>
                <button
                  onClick={() => setAuditSubTab('audit-details')}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    auditSubTab === 'audit-details'
                      ? 'bg-[#111827] text-white shadow-md'
                      : 'text-[#4B5563] hover:text-[#111827] hover:bg-[#FAF7F2]'
                  }`}
                >
                  Page Deep Dives
                </button>
                <button
                  onClick={() => setAuditSubTab('personas')}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    auditSubTab === 'personas'
                      ? 'bg-[#111827] text-white shadow-md'
                      : 'text-[#4B5563] hover:text-[#111827] hover:bg-[#FAF7F2]'
                  }`}
                >
                  Persona Journeys
                </button>
                <button
                  onClick={() => setAuditSubTab('prototype')}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    auditSubTab === 'prototype'
                      ? 'bg-[#FA4D14] text-white shadow-md'
                      : 'text-[#4B5563] hover:text-[#111827] hover:bg-[#FAF7F2]'
                  }`}
                >
                  Redesign Prototype Benchmark
                </button>
                <button
                  onClick={() => setAuditSubTab('roadmap')}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    auditSubTab === 'roadmap'
                      ? 'bg-[#111827] text-white shadow-md'
                      : 'text-[#4B5563] hover:text-[#111827] hover:bg-[#FAF7F2]'
                  }`}
                >
                  Strategic Roadmap
                </button>
              </div>

              <button
                onClick={() => setIsReportModalOpen(true)}
                className="px-3.5 py-2 rounded-xl bg-[#FAF7F2] hover:bg-white text-[#111827] border border-[#E5DFD5] text-xs font-bold flex items-center space-x-1 cursor-pointer"
              >
                <Download className="w-3.5 h-3.5 text-[#FA4D14]" />
                <span>Print PDF Audit</span>
              </button>
            </div>

            {/* Sub-tab Content Render */}
            {auditSubTab === 'overview' && (
              <AuditOverview setActiveTab={() => setAuditSubTab('prototype')} />
            )}
            {auditSubTab === 'audit-details' && (
              <DetailedAuditSection setActiveTab={() => setAuditSubTab('prototype')} />
            )}
            {auditSubTab === 'personas' && <PersonaJourneys />}
            {auditSubTab === 'prototype' && <InteractivePrototype />}
            {auditSubTab === 'roadmap' && <RecommendationsRoadmap />}

          </div>
        )}

      </main>

      {/* Structured Athlete Profile Modal */}
      <AthleteProfileModal
        athlete={selectedAthlete}
        userSession={userSession}
        onClose={() => setSelectedAthlete(null)}
        onStartChat={(athlete) => {
          setSelectedAthlete(null);
          setActiveChatRecipient(athlete.name);
          setActiveTab('messages');
        }}
        onApplyForTrial={(name) => {
          alert(`Application started for ${name}`);
        }}
      />

      {/* Executive Audit Report Modal */}
      <AuditReportModal
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
      />

      {/* Sportzicon Application Footer */}
      <footer className="bg-[#111111] text-white border-t-2 border-[#111111] pt-10 pb-32 sm:pb-28 text-sm font-sans shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
          <div className="space-y-2">
            <div className="flex items-center justify-center sm:justify-start space-x-3">
              <SportziconIcon size="md" showBadge={false} />
              <div className="flex flex-col text-left">
                <span className="font-sans text-2xl sm:text-3xl font-extrabold tracking-tight text-white italic leading-none">
                  sportz<span className="text-[#E04E26]">ícon</span>
                </span>
                <span className="text-[10px] sm:text-[11px] font-sans font-bold tracking-[0.3em] text-slate-400 uppercase mt-1">
                  EST. 2026
                </span>
              </div>
            </div>
            <p className="text-slate-300 font-sans text-sm leading-relaxed max-w-xl">
              Professional Cricket Network & Profile Hub connecting athletes, state associations, clubs, academies, and scouts. Official platform for <a href="https://sportzicon.com" target="_blank" rel="noreferrer" className="text-[#FA4D14] hover:underline font-bold inline-flex items-center gap-1">sportzicon.com <ExternalLink className="w-4 h-4" /></a>
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 text-sm font-semibold font-sans">
            <button
              onClick={() => setActiveTab('newsfeed')}
              className="text-slate-200 hover:text-[#FA4D14] transition-colors flex items-center space-x-1.5 cursor-pointer px-3.5 py-2 rounded-xl bg-[#222222] border border-[#333333]"
            >
              <Sparkles className="w-4 h-4 text-[#FA4D14]" />
              <span>Cricket Newsfeed</span>
            </button>

            <button
              onClick={() => setActiveTab('search')}
              className="text-slate-200 hover:text-[#FA4D14] transition-colors flex items-center space-x-1.5 cursor-pointer px-3.5 py-2 rounded-xl bg-[#222222] border border-[#333333]"
            >
              <span>Search Talent Pool</span>
            </button>

            <button
              onClick={() => setIsReportModalOpen(true)}
              className="text-slate-200 hover:text-[#FA4D14] transition-colors flex items-center space-x-1.5 cursor-pointer px-3.5 py-2 rounded-xl bg-[#222222] border border-[#333333]"
            >
              <span>Audit Report</span>
            </button>
          </div>
        </div>
      </footer>

      {/* Fixed Mobile & Desktop Bottom Navigation Bar */}
      <BottomNav
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenCreatePost={() => setIsCreatePostModalOpen(true)}
        userSession={userSession}
      />

    </div>
  );
}
