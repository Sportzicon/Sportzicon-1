import React, { useState } from 'react';
import { Athlete, RecruitmentOpening, TournamentItem } from '../types';
import { ApplyManualModal } from './ApplyManualModal';
import {
  Trophy,
  Users,
  Search,
  Plus,
  Briefcase,
  Award,
  CheckCircle2,
  Megaphone,
  ShieldCheck,
  Calendar,
  FileText,
  UserPlus,
  ArrowRight,
  TrendingUp,
  MapPin,
  Paperclip,
  ExternalLink,
  Link as LinkIcon
} from 'lucide-react';

interface EcosystemHubProps {
  athletes: Athlete[];
  openings: RecruitmentOpening[];
  tournaments: TournamentItem[];
  onSelectAthlete: (athlete: Athlete) => void;
  onApplyOpening: (id: string) => void;
  onPostOpening: (opening: RecruitmentOpening) => void;
  onRegisterTournament: (tournamentId: string) => void;
  onPostTournament: (tournament: TournamentItem) => void;
}

export const EcosystemHub: React.FC<EcosystemHubProps> = ({
  athletes,
  openings,
  tournaments,
  onSelectAthlete,
  onApplyOpening,
  onPostOpening,
  onRegisterTournament,
  onPostTournament,
}) => {
  const [activeTab, setActiveTab] = useState<'academy' | 'athlete' | 'scout' | 'organizer'>('academy');
  const [manualModalOpening, setManualModalOpening] = useState<RecruitmentOpening | null>(null);

  // Profile Lookup Handler for Clickable Profile Names
  const handleOpenProfileByName = (profileName: string) => {
    const matched = athletes.find(a => a.name.toLowerCase() === profileName.toLowerCase()) ||
      athletes.find(a => a.name.toLowerCase().includes(profileName.toLowerCase())) || {
        id: `org-${Date.now()}`,
        name: profileName,
        avatar: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&w=400&q=80',
        sport: 'Cricket',
        primaryRole: 'High Performance Academy & Club',
        age: 2026,
        location: 'Mumbai, MH',
        currentClubOrAcademy: profileName,
        verified: true,
        topBenchmark: 'State Accredited Academy',
        topSpeedOrMetric: 'State Accredited Academy',
        rating: 4.9,
        scoutEndorsements: 28,
        videoCount: 15,
        featured: true,
        performanceIndex: 95,
        metrics: {
          battingOrBowlingAvg: 92,
          accuracyOrControl: 94,
          temperament: 96,
          tacticalIQ: 95,
          fitness: 90,
          fielding: 88,
        },
        stats: [
          { label: 'Athletes Enrolled', value: '320+' },
          { label: 'Pro Contracts', value: '18' },
          { label: 'State Titles', value: '6' }
        ],
        recentMatchScores: [
          { matchName: 'Monsoon Premier Cup Finals', date: 'Aug 2026', performance: 'Academy XI Winner 🏆', result: 'Defeated Suburban Gymkhana' }
        ],
        bio: `Official profile for ${profileName}. Leading high-performance sports education, coaching, and athlete recruitment hub.`,
        scoutNotes: [`Verified Organization Profile on Sportzicon Network.`]
      };
    onSelectAthlete(matched as Athlete);
  };

  // Academy Form Modal States
  const [showPostTrialModal, setShowPostTrialModal] = useState(false);
  const [showPostJobModal, setShowPostJobModal] = useState(false);
  const [showAnnounceModal, setShowAnnounceModal] = useState(false);

  // Organizer Form Modal State
  const [showPostTournamentModal, setShowPostTournamentModal] = useState(false);

  // Announcement List State
  const [announcements, setAnnouncements] = useState([
    {
      id: 'ann-1',
      academy: 'Apex Cricket Academy',
      title: 'Monsoon High-Performance Camp Registration Open',
      date: 'Aug 10, 2026',
      content: 'Apex Academy opens applications for 20 best u-19 batters and fast bowlers for 6-week elite intensive camp under Coach Ramesh Rao.',
    },
    {
      id: 'ann-2',
      academy: 'Vanguard Sports Hub',
      title: 'Senior State Championship Selection Trials',
      date: 'Aug 08, 2026',
      content: 'Open trials scheduled for Aug 25th at Vanguard Ground. All players with Sportzicon Verified Profiles eligible for direct entry.',
    },
  ]);

  // Form Fields
  const [trialTitle, setTrialTitle] = useState('');
  const [trialAcademy, setTrialAcademy] = useState('');
  const [trialLocation, setTrialLocation] = useState('');
  const [trialStipend, setTrialStipend] = useState('');
  const [trialDesc, setTrialDesc] = useState('');

  const [annTitle, setAnnTitle] = useState('');
  const [annAcademy, setAnnAcademy] = useState('');
  const [annContent, setAnnContent] = useState('');

  const [tournTitle, setTournTitle] = useState('');
  const [tournOrganizer, setTournOrganizer] = useState('');
  const [tournDates, setTournDates] = useState('');
  const [tournLocation, setTournLocation] = useState('');
  const [tournTeams, setTournTeams] = useState(16);
  const [tournPrize, setTournPrize] = useState('');

  const handleCreateTrial = (e: React.FormEvent) => {
    e.preventDefault();
    if (!trialTitle || !trialAcademy) return;

    const created: RecruitmentOpening = {
      id: `op-${Date.now()}`,
      title: trialTitle,
      organization: trialAcademy,
      type: 'trial',
      sport: 'Cricket',
      location: trialLocation || 'State Cricket Academy',
      deadline: 'In 21 Days',
      stipendOrGrant: trialStipend || 'Full Academy Sponsorship',
      vacancies: 6,
      description: trialDesc || 'Verified athletic candidates required with structured performance history.',
      requirements: ['Sportzicon Verified Profile', 'Submission of Recent Match Scorelog'],
      appliedStatus: 'not-applied',
    };

    onPostOpening(created);
    setShowPostTrialModal(false);
    setTrialTitle('');
    setTrialAcademy('');
    setTrialDesc('');
  };

  const handleCreateAnnouncement = (e: React.FormEvent) => {
    e.preventDefault();
    if (!annTitle || !annAcademy) return;

    setAnnouncements([
      {
        id: `ann-${Date.now()}`,
        academy: annAcademy,
        title: annTitle,
        date: 'Just Now',
        content: annContent || 'Official academy announcement released on Sportzicon Ecosystem.',
      },
      ...announcements,
    ]);

    setShowAnnounceModal(false);
    setAnnTitle('');
    setAnnAcademy('');
    setAnnContent('');
  };

  const handleCreateTournament = (e: React.FormEvent) => {
    e.preventDefault();
    if (!tournTitle || !tournOrganizer) return;

    const created: TournamentItem = {
      id: `tourn-${Date.now()}`,
      title: tournTitle,
      organizerName: tournOrganizer,
      location: tournLocation || 'National Cricket Stadium',
      dates: tournDates || 'Sep 15 - Oct 05, 2026',
      category: 'Premier Club T20 Cup',
      participatingAcademies: 1,
      maxAcademies: Number(tournTeams) || 16,
      prizePool: tournPrize || '₹ 5,00,000 + Trophy',
      entryFee: '₹15,000',
      status: 'upcoming',
      registeredAcademies: [tournOrganizer],
    };

    onPostTournament(created);
    setShowPostTournamentModal(false);
    setTournTitle('');
    setTournOrganizer('');
    setTournPrize('');
  };

  return (
    <div className="space-y-8 animate-fade-in text-[#0F172A]">
      
      {/* Ecosystem Hub Header Banner */}
      <div className="bg-[#0F172A] text-white rounded-3xl border border-[#1E293B] p-6 sm:p-10 space-y-4 shadow-xl relative overflow-hidden text-left">
        <div className="relative z-10 space-y-2">
          <div className="flex items-center space-x-2">
            <span className="text-overline text-[#FA4D14] px-2.5 py-0.5 rounded-full bg-[#FA4D14]/20 border border-[#FA4D14]/30">
              Sportzicon Cricket Network
            </span>
            <span className="text-xs text-slate-400">4 Core Stakeholder Ecosystem</span>
          </div>
          <h1 className="text-h1 text-white">
            Complete Cricket Ecosystem Hub
          </h1>
          <p className="text-body text-slate-300 max-w-[65ch] leading-relaxed">
            Connecting Athletes, Academies, Certified Scouts, and Tournament Organizers in one unified professional platform.
          </p>
        </div>

        {/* Stakeholder Selector Tabs */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-4 border-t border-[#1F2937] relative z-10 font-sans text-xs">
          <button
            onClick={() => setActiveTab('athlete')}
            className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
              activeTab === 'athlete'
                ? 'bg-[#EA580C] text-white border-[#EA580C] font-bold shadow-md'
                : 'bg-[#1F2937] text-slate-300 border-[#374151] hover:text-white'
            }`}
          >
            <span className="text-[10px] uppercase block font-semibold opacity-80">1. Athletes</span>
            <span className="font-bold text-sm block mt-0.5">Exposure & Opportunities</span>
          </button>

          <button
            onClick={() => setActiveTab('academy')}
            className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
              activeTab === 'academy'
                ? 'bg-[#D97706] text-white border-[#D97706] font-bold shadow-md'
                : 'bg-[#1F2937] text-slate-300 border-[#374151] hover:text-white'
            }`}
          >
            <span className="text-[10px] uppercase block font-semibold opacity-80">2. Academies</span>
            <span className="font-bold text-sm block mt-0.5">Trials, Roster & Jobs</span>
          </button>

          <button
            onClick={() => setActiveTab('scout')}
            className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
              activeTab === 'scout'
                ? 'bg-[#475569] text-white border-[#475569] font-bold shadow-md'
                : 'bg-[#1F2937] text-slate-300 border-[#374151] hover:text-white'
            }`}
          >
            <span className="text-[10px] uppercase block font-semibold opacity-80">3. Scouts</span>
            <span className="font-bold text-sm block mt-0.5">Talent Discovery & History</span>
          </button>

          <button
            onClick={() => setActiveTab('organizer')}
            className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
              activeTab === 'organizer'
                ? 'bg-[#059669] text-white border-[#059669] font-bold shadow-md'
                : 'bg-[#1F2937] text-slate-300 border-[#374151] hover:text-white'
            }`}
          >
            <span className="text-[10px] uppercase block font-semibold opacity-80">4. Organizers</span>
            <span className="font-bold text-sm block mt-0.5">Tournaments & Scorelogs</span>
          </button>
        </div>
      </div>

      {/* ==================== TAB 1: ATHLETES HUB ==================== */}
      {activeTab === 'athlete' && (
        <div className="space-y-6 animate-fade-in">
          <div className="bg-white rounded-3xl border border-[#E2E8F0] p-6 sm:p-8 space-y-4 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E2E8F0] pb-4">
              <div>
                <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded bg-[#0F172A] text-white">
                  FOR ATHLETES
                </span>
                <h2 className="text-2xl font-bold font-oswald text-[#0F172A] uppercase tracking-wide mt-1">
                  Get Exposure & Grab Opportunities
                </h2>
                <p className="text-xs text-[#475569] font-sans">
                  Maintain your verified cricket profile, showcase match performance scorelogs, and apply directly for academy trials and contracts.
                </p>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => onSelectAthlete(athletes[0])}
                  className="px-5 py-2.5 bg-[#EA580C] text-white rounded-xl text-xs font-bold uppercase tracking-wider font-mono cursor-pointer hover:bg-orange-600 shadow-sm"
                >
                  View My Public Profile
                </button>
              </div>
            </div>

            {/* Featured Athletes Grid */}
            <div className="space-y-3 pt-2">
              <h3 className="text-sm font-mono font-bold uppercase text-[#0F172A]">
                Top Verified Prospect Profiles
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {athletes.slice(0, 3).map((ath) => (
                  <div
                    key={ath.id}
                    onClick={() => onSelectAthlete(ath)}
                    className="bg-[#F8FAFC] p-4 rounded-2xl border border-[#E2E8F0] space-y-3 hover:border-[#EA580C] cursor-pointer transition-all"
                  >
                    <div className="flex items-center space-x-3">
                      <img src={ath.avatar} alt={ath.name} className="w-12 h-12 rounded-xl object-cover border border-[#E2E8F0]" />
                      <div>
                        <h4 className="font-bold text-sm text-[#0F172A] font-oswald uppercase">{ath.name}</h4>
                        <p className="text-xs text-[#64748B] font-mono">{ath.primaryRole}</p>
                      </div>
                    </div>
                    <div className="text-xs font-mono bg-white p-2.5 rounded-xl border border-[#E2E8F0] flex justify-between">
                      <span className="text-[#64748B]">Match Form:</span>
                      <span className="font-bold text-[#EA580C]">{ath.performanceIndex || 92} / 100</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ==================== TAB 2: ACADEMIES HUB ==================== */}
      {activeTab === 'academy' && (
        <div className="space-y-8 animate-fade-in">
          
          {/* Action Control Panel */}
          <div className="bg-white rounded-3xl border border-[#E2E8F0] p-6 sm:p-8 space-y-6 shadow-sm">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#E2E8F0] pb-6">
              <div>
                <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded bg-[#0F172A] text-white">
                  ACADEMY & CLUB MANAGEMENT
                </span>
                <h2 className="text-2xl font-bold font-oswald text-[#0F172A] uppercase tracking-wide mt-1">
                  Academies & Clubs Operations Hub
                </h2>
                <p className="text-xs text-[#475569] mt-1 font-sans max-w-2xl">
                  Release announcements, post trials and job openings, manage roster data, and register for tournaments hosted by other clubs.
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setShowPostTrialModal(true)}
                  className="px-4 py-2.5 rounded-xl bg-[#EA580C] hover:bg-orange-600 text-white font-bold text-xs font-mono uppercase tracking-wide transition-all shadow-sm flex items-center gap-1.5 cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Post Trial</span>
                </button>

                <button
                  onClick={() => setShowPostJobModal(true)}
                  className="px-4 py-2.5 rounded-xl bg-[#0F172A] hover:bg-[#1E293B] text-white font-bold text-xs font-mono uppercase tracking-wide transition-all shadow-sm flex items-center gap-1.5 cursor-pointer"
                >
                  <Briefcase className="w-4 h-4 text-[#EA580C]" />
                  <span>Post Job Opening</span>
                </button>

                <button
                  onClick={() => setShowAnnounceModal(true)}
                  className="px-4 py-2.5 rounded-xl bg-white hover:bg-[#F8FAFC] text-[#0F172A] border border-[#CBD5E1] font-bold text-xs font-mono uppercase tracking-wide transition-all shadow-sm flex items-center gap-1.5 cursor-pointer"
                >
                  <Megaphone className="w-4 h-4 text-[#EA580C]" />
                  <span>Release Info</span>
                </button>
              </div>
            </div>

            {/* SECTION 1: Released Announcements */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold font-oswald text-[#0F172A] uppercase tracking-wide flex items-center gap-2">
                <Megaphone className="w-5 h-5 text-[#EA580C]" />
                Official Academy Releases & Announcements
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {announcements.map((ann) => (
                  <div key={ann.id} className="bg-[#F8FAFC] p-5 rounded-2xl border border-[#E2E8F0] space-y-2">
                    <div className="flex justify-between items-center text-xs font-mono">
                      <button
                        type="button"
                        onClick={() => handleOpenProfileByName(ann.academy)}
                        className="font-bold text-[#EA580C] uppercase hover:underline cursor-pointer transition-all flex items-center gap-1 text-left"
                        title={`Click to view ${ann.academy}'s profile info & previous posts`}
                      >
                        <span>{ann.academy}</span>
                      </button>
                      <span className="text-[#64748B]">{ann.date}</span>
                    </div>
                    <h4 className="font-bold text-sm text-[#0F172A]">{ann.title}</h4>
                    <p className="text-xs text-[#475569] leading-relaxed">{ann.content}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* SECTION 2: Posted Trials & Jobs */}
            <div className="space-y-4 pt-4 border-t border-[#E2E8F0]">
              <h3 className="text-lg font-bold font-oswald text-[#0F172A] uppercase tracking-wide flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-[#EA580C]" />
                Active Trials & Academy Job Opportunities
              </h3>

              <div className="grid grid-cols-1 gap-4">
                {openings.map((op) => (
                  <div key={op.id} className="bg-white p-5 rounded-2xl border border-[#E2E8F0] space-y-3 hover:border-[#EA580C] transition-all">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-[#0F172A] text-white">{op.sport}</span>
                          <span className="text-xs font-mono text-[#64748B]">{op.location}</span>
                        </div>
                        <h4 className="text-lg font-bold font-oswald uppercase text-[#0F172A] mt-1">{op.title}</h4>
                        <p className="text-xs font-mono text-[#475569] flex items-center gap-1">
                          <span>Posted by:</span>
                          <button
                            type="button"
                            onClick={() => handleOpenProfileByName(op.organization)}
                            className="font-bold text-[#EA580C] hover:underline cursor-pointer transition-colors"
                            title={`Click to view ${op.organization}'s profile info & previous posts`}
                          >
                            {op.organization}
                          </button>
                        </p>
                      </div>

                      <div className="flex flex-wrap items-center gap-2 shrink-0">
                        {op.appliedStatus === 'applied' ? (
                          <span className="px-3.5 py-1.5 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold font-mono flex items-center gap-1">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Applied ✓
                          </span>
                        ) : (
                          <>
                            <button
                              type="button"
                              onClick={() => onApplyOpening(op.id)}
                              className="px-3.5 py-2 bg-[#EA580C] text-white font-mono font-bold text-xs rounded-xl hover:bg-orange-600 transition-colors cursor-pointer shadow-sm"
                            >
                              1-Click Apply
                            </button>
                            <button
                              type="button"
                              onClick={() => setManualModalOpening(op)}
                              className="px-3.5 py-2 bg-[#0F172A] text-white font-mono font-bold text-xs rounded-xl hover:bg-slate-800 transition-colors cursor-pointer shadow-sm flex items-center gap-1"
                            >
                              <Paperclip className="w-3 h-3 text-[#EA580C]" />
                              <span>Upload Resume</span>
                            </button>
                            {op.externalFormUrl && (
                              <a
                                href={op.externalFormUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-3 py-2 bg-white border border-[#CBD5E1] text-[#0F172A] font-mono font-bold text-xs rounded-xl hover:border-[#EA580C] transition-colors cursor-pointer shadow-sm flex items-center gap-1"
                              >
                                <LinkIcon className="w-3 h-3 text-blue-600" />
                                <span>Google Form / Drive</span>
                                <ExternalLink className="w-3 h-3 text-[#64748B]" />
                              </a>
                            )}
                          </>
                        )}
                      </div>
                    </div>

                    <p className="text-xs text-[#334155] italic bg-[#F8FAFC] p-3 rounded-xl border border-[#E2E8F0]">"{op.description}"</p>
                  </div>
                ))}
              </div>
            </div>

            {/* SECTION 3: Participate in External Tournaments */}
            <div className="space-y-4 pt-4 border-t border-[#E2E8F0]">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-bold font-oswald text-[#0F172A] uppercase tracking-wide flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-[#EA580C]" />
                  Register Academy Team for External Tournaments
                </h3>
                <span className="text-xs font-mono text-[#64748B]">Tournaments Hosted by Clubs & Associations</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {tournaments.map((t) => (
                  <div key={t.id} className="bg-[#F8FAFC] p-5 rounded-2xl border border-[#E2E8F0] space-y-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-[#EA580C] text-white uppercase">{t.status}</span>
                        <h4 className="font-bold font-oswald text-lg text-[#0F172A] uppercase mt-1">{t.title}</h4>
                        <p className="text-xs text-[#64748B] font-mono">Organizer: {t.organizer}</p>
                      </div>

                      <div className="text-right font-mono">
                        <span className="text-[10px] text-[#64748B] uppercase block">Prize Pool</span>
                        <span className="text-xs font-extrabold text-[#0F172A]">{t.prizePool}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-xs font-mono text-[#475569] pt-2 border-t border-[#E2E8F0]">
                      <span>{t.dates} • {t.location}</span>
                      {t.isRegistered ? (
                        <span className="text-emerald-600 font-bold flex items-center gap-1">
                          <CheckCircle2 className="w-4 h-4" /> Academy Team Registered
                        </span>
                      ) : (
                        <button
                          onClick={() => onRegisterTournament(t.id)}
                          className="px-3.5 py-1.5 bg-[#0F172A] text-white font-bold rounded-lg hover:bg-[#1E293B] cursor-pointer"
                        >
                          Register Team
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      )}

      {/* ==================== TAB 3: SCOUTS HUB ==================== */}
      {activeTab === 'scout' && (
        <div className="space-y-6 animate-fade-in">
          <div className="bg-white rounded-3xl border border-[#E2E8F0] p-6 sm:p-8 space-y-6 shadow-sm">
            <div className="border-b border-[#E2E8F0] pb-4">
              <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded bg-[#0F172A] text-white">
                FOR CERTIFIED SCOUTS
              </span>
              <h2 className="text-2xl font-bold font-oswald text-[#0F172A] uppercase tracking-wide mt-1">
                Find Talent & Review Complete Career History
              </h2>
              <p className="text-xs text-[#475569] font-sans">
                Access verified match statistics, video reel analysis, and record official scout notes.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {athletes.map((ath) => (
                <div key={ath.id} className="bg-[#F8FAFC] p-5 rounded-2xl border border-[#E2E8F0] space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <img src={ath.avatar} alt={ath.name} className="w-12 h-12 rounded-xl object-cover border border-[#E2E8F0]" />
                      <div>
                        <h4 className="font-bold text-[#0F172A] font-oswald uppercase">{ath.name}</h4>
                        <p className="text-xs text-[#64748B] font-mono">{ath.primaryRole} • Age {ath.age}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => onSelectAthlete(ath)}
                      className="px-3.5 py-2 bg-[#0F172A] text-white text-xs font-mono font-bold rounded-xl hover:bg-[#1E293B] cursor-pointer"
                    >
                      Scout History →
                    </button>
                  </div>

                  <div className="bg-white p-3 rounded-xl border border-[#E2E8F0] text-xs font-mono flex justify-between">
                    <span className="text-[#64748B]">Benchmark: {ath.topBenchmark || ath.topSpeedOrMetric}</span>
                    <span className="text-[#EA580C] font-bold">{ath.scoutEndorsements} Scout Notes</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ==================== TAB 4: ORGANIZERS HUB ==================== */}
      {activeTab === 'organizer' && (
        <div className="space-y-6 animate-fade-in">
          <div className="bg-white rounded-3xl border border-[#E2E8F0] p-6 sm:p-8 space-y-6 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E2E8F0] pb-4">
              <div>
                <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded bg-[#0F172A] text-white">
                  TOURNAMENT ORGANIZERS
                </span>
                <h2 className="text-2xl font-bold font-oswald text-[#0F172A] uppercase tracking-wide mt-1">
                  Organize Matches & Log Live Scores
                </h2>
                <p className="text-xs text-[#475569] font-sans">
                  Create tournaments, manage team entries, and log ball-by-ball match scores that sync directly to player profiles.
                </p>
              </div>

              <button
                onClick={() => setShowPostTournamentModal(true)}
                className="px-5 py-2.5 bg-[#EA580C] hover:bg-orange-600 text-white font-mono font-bold text-xs uppercase rounded-xl transition-all shadow-sm flex items-center gap-2 shrink-0 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Organize New Tournament</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {tournaments.map((t) => (
                <div key={t.id} className="bg-[#F8FAFC] p-5 rounded-2xl border border-[#E2E8F0] space-y-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-[#0F172A] text-white uppercase">{t.status}</span>
                      <h4 className="font-bold font-oswald text-lg text-[#0F172A] uppercase mt-1">{t.title}</h4>
                      <p className="text-xs text-[#64748B] font-mono">Organized by: {t.organizer}</p>
                    </div>
                  </div>

                  <div className="bg-white p-3 rounded-xl border border-[#E2E8F0] text-xs font-mono flex justify-between">
                    <span className="text-[#64748B]">Teams: {t.registeredTeamsCount} / {t.totalTeams}</span>
                    <span className="text-[#0F172A] font-bold">Prize: {t.prizePool}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ==================== MODALS FOR FORMS ==================== */}

      {/* Post Trial Modal */}
      {showPostTrialModal && (
        <div className="fixed inset-0 z-50 bg-[#0F172A]/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl border border-[#E2E8F0] max-w-lg w-full p-6 space-y-4 shadow-2xl relative">
            <div className="flex justify-between items-center border-b border-[#E2E8F0] pb-3">
              <h3 className="text-lg font-bold font-oswald uppercase text-[#0F172A]">Post Academy Trial Opportunity</h3>
              <button onClick={() => setShowPostTrialModal(false)} className="text-[#64748B] font-bold text-lg">✕</button>
            </div>
            <form onSubmit={handleCreateTrial} className="space-y-3 text-xs font-mono">
              <div>
                <label className="block text-[#0F172A] font-bold mb-1">Trial Title:</label>
                <input
                  required
                  type="text"
                  value={trialTitle}
                  onChange={(e) => setTrialTitle(e.target.value)}
                  placeholder="e.g. U-19 Fast Bowlers Talent Trial"
                  className="w-full p-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl text-[#0F172A]"
                />
              </div>
              <div>
                <label className="block text-[#0F172A] font-bold mb-1">Academy / Club Name:</label>
                <input
                  required
                  type="text"
                  value={trialAcademy}
                  onChange={(e) => setTrialAcademy(e.target.value)}
                  placeholder="e.g. Apex Cricket Academy"
                  className="w-full p-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl text-[#0F172A]"
                />
              </div>
              <div>
                <label className="block text-[#0F172A] font-bold mb-1">Location:</label>
                <input
                  type="text"
                  value={trialLocation}
                  onChange={(e) => setTrialLocation(e.target.value)}
                  placeholder="e.g. Mumbai, Maharashtra"
                  className="w-full p-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl text-[#0F172A]"
                />
              </div>
              <div>
                <label className="block text-[#0F172A] font-bold mb-1">Description:</label>
                <textarea
                  rows={2}
                  value={trialDesc}
                  onChange={(e) => setTrialDesc(e.target.value)}
                  placeholder="Details regarding trial requirements..."
                  className="w-full p-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl text-[#0F172A]"
                />
              </div>
              <div className="flex justify-end space-x-2 pt-2">
                <button type="button" onClick={() => setShowPostTrialModal(false)} className="px-4 py-2 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl text-[#64748B]">Cancel</button>
                <button type="submit" className="px-5 py-2 bg-[#EA580C] text-white font-bold rounded-xl">Publish Trial</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Post Job Opening Modal */}
      {showPostJobModal && (
        <div className="fixed inset-0 z-50 bg-[#0F172A]/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl border border-[#E2E8F0] max-w-lg w-full p-6 space-y-4 shadow-2xl relative">
            <div className="flex justify-between items-center border-b border-[#E2E8F0] pb-3">
              <h3 className="text-lg font-bold font-oswald uppercase text-[#0F172A]">Post Academy Job Opening</h3>
              <button onClick={() => setShowPostJobModal(false)} className="text-[#64748B] font-bold text-lg">✕</button>
            </div>
            <form onSubmit={handleCreateTrial} className="space-y-3 text-xs font-mono">
              <div>
                <label className="block text-[#0F172A] font-bold mb-1">Job Role Title:</label>
                <input
                  required
                  type="text"
                  placeholder="e.g. Head Fast Bowling Coach / Video Analyst"
                  className="w-full p-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl text-[#0F172A]"
                />
              </div>
              <div>
                <label className="block text-[#0F172A] font-bold mb-1">Organization:</label>
                <input
                  required
                  type="text"
                  placeholder="e.g. Vanguard Cricket Academy"
                  className="w-full p-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl text-[#0F172A]"
                />
              </div>
              <div className="flex justify-end space-x-2 pt-2">
                <button type="button" onClick={() => setShowPostJobModal(false)} className="px-4 py-2 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl text-[#64748B]">Cancel</button>
                <button type="submit" className="px-5 py-2 bg-[#0F172A] text-white font-bold rounded-xl">Publish Job</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Release Announcement Modal */}
      {showAnnounceModal && (
        <div className="fixed inset-0 z-50 bg-[#0F172A]/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl border border-[#E2E8F0] max-w-lg w-full p-6 space-y-4 shadow-2xl relative">
            <div className="flex justify-between items-center border-b border-[#E2E8F0] pb-3">
              <h3 className="text-lg font-bold font-oswald uppercase text-[#0F172A]">Release Academy Information / Announcement</h3>
              <button onClick={() => setShowAnnounceModal(false)} className="text-[#64748B] font-bold text-lg">✕</button>
            </div>
            <form onSubmit={handleCreateAnnouncement} className="space-y-3 text-xs font-mono">
              <div>
                <label className="block text-[#0F172A] font-bold mb-1">Academy Name:</label>
                <input
                  required
                  type="text"
                  value={annAcademy}
                  onChange={(e) => setAnnAcademy(e.target.value)}
                  placeholder="e.g. Apex Sports Academy"
                  className="w-full p-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl text-[#0F172A]"
                />
              </div>
              <div>
                <label className="block text-[#0F172A] font-bold mb-1">Announcement Headline:</label>
                <input
                  required
                  type="text"
                  value={annTitle}
                  onChange={(e) => setAnnTitle(e.target.value)}
                  placeholder="e.g. High Performance Camp Selection Results"
                  className="w-full p-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl text-[#0F172A]"
                />
              </div>
              <div>
                <label className="block text-[#0F172A] font-bold mb-1">Content Release:</label>
                <textarea
                  rows={3}
                  value={annContent}
                  onChange={(e) => setAnnContent(e.target.value)}
                  placeholder="Official announcement text for athletes and parents..."
                  className="w-full p-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl text-[#0F172A]"
                />
              </div>
              <div className="flex justify-end space-x-2 pt-2">
                <button type="button" onClick={() => setShowAnnounceModal(false)} className="px-4 py-2 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl text-[#64748B]">Cancel</button>
                <button type="submit" className="px-5 py-2 bg-[#EA580C] text-white font-bold rounded-xl">Release Announcement</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Organize Tournament Modal */}
      {showPostTournamentModal && (
        <div className="fixed inset-0 z-50 bg-[#0F172A]/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl border border-[#E2E8F0] max-w-lg w-full p-6 space-y-4 shadow-2xl relative">
            <div className="flex justify-between items-center border-b border-[#E2E8F0] pb-3">
              <h3 className="text-lg font-bold font-oswald uppercase text-[#0F172A]">Organize Tournament / Match</h3>
              <button onClick={() => setShowPostTournamentModal(false)} className="text-[#64748B] font-bold text-lg">✕</button>
            </div>
            <form onSubmit={handleCreateTournament} className="space-y-3 text-xs font-mono">
              <div>
                <label className="block text-[#0F172A] font-bold mb-1">Tournament Title:</label>
                <input
                  required
                  type="text"
                  value={tournTitle}
                  onChange={(e) => setTournTitle(e.target.value)}
                  placeholder="e.g. All-India Club Premier Trophy 2026"
                  className="w-full p-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl text-[#0F172A]"
                />
              </div>
              <div>
                <label className="block text-[#0F172A] font-bold mb-1">Organizer Association / Club:</label>
                <input
                  required
                  type="text"
                  value={tournOrganizer}
                  onChange={(e) => setTournOrganizer(e.target.value)}
                  placeholder="e.g. Mumbai Cricket Council"
                  className="w-full p-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl text-[#0F172A]"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[#0F172A] font-bold mb-1">Dates:</label>
                  <input
                    type="text"
                    value={tournDates}
                    onChange={(e) => setTournDates(e.target.value)}
                    placeholder="e.g. Sep 15 - Oct 05"
                    className="w-full p-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl text-[#0F172A]"
                  />
                </div>
                <div>
                  <label className="block text-[#0F172A] font-bold mb-1">Prize Pool:</label>
                  <input
                    type="text"
                    value={tournPrize}
                    onChange={(e) => setTournPrize(e.target.value)}
                    placeholder="e.g. ₹ 5,00,000"
                    className="w-full p-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl text-[#0F172A]"
                  />
                </div>
              </div>
              <div className="flex justify-end space-x-2 pt-2">
                <button type="button" onClick={() => setShowPostTournamentModal(false)} className="px-4 py-2 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl text-[#64748B]">Cancel</button>
                <button type="submit" className="px-5 py-2 bg-[#EA580C] text-white font-bold rounded-xl">Publish Tournament</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Manual Resume Upload Modal */}
      {manualModalOpening && (
        <ApplyManualModal
          opening={manualModalOpening}
          onClose={() => setManualModalOpening(null)}
          onSubmitSuccess={(openingId) => {
            onApplyOpening(openingId);
          }}
        />
      )}

    </div>
  );
};
