import React, { useState } from 'react';
import { RecruitmentOpening, UserSession } from '../types';
import { ApplyManualModal } from './ApplyManualModal';
import { Briefcase, ShieldCheck, CheckCircle2, Clock, Plus, ArrowRight, UserCheck, Trophy, Filter, ChevronLeft, ChevronRight, FileText, ExternalLink, Link as LinkIcon, Paperclip, ChevronDown, ChevronUp } from 'lucide-react';
import { useHorizontalScroll } from '../hooks/useHorizontalScroll';

interface RecruitmentWorkflowProps {
  openings: RecruitmentOpening[];
  onApplyOpening: (id: string) => void;
  onPostNewOpening: (opening: RecruitmentOpening) => void;
  userSession?: UserSession | null;
  onSelectAthlete?: (athlete: any) => void;
}

export const RecruitmentWorkflow: React.FC<RecruitmentWorkflowProps> = ({
  openings,
  onApplyOpening,
  onPostNewOpening,
  userSession,
  onSelectAthlete,
}) => {
  const [showPostModal, setShowPostModal] = useState<boolean>(false);
  const [manualApplyOpening, setManualApplyOpening] = useState<RecruitmentOpening | null>(null);
  const [newTitle, setNewTitle] = useState('');
  const [newOrg, setNewOrg] = useState('');
  const [newSport, setNewSport] = useState('Cricket');
  const [newLocation, setNewLocation] = useState('');
  const [newStipend, setNewStipend] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newType, setNewType] = useState<'trial' | 'job' | 'tournament_entry'>('trial');
  const [newExternalFormUrl, setNewExternalFormUrl] = useState('');
  const [newAppMethod, setNewAppMethod] = useState<'both' | 'one-click' | 'manual-upload' | 'google-form'>('both');
  const [activeCategory, setActiveCategory] = useState<'all' | 'trial' | 'job' | 'tournament_entry'>('all');
  const [expandedOpportunityIds, setExpandedOpportunityIds] = useState<Record<string, boolean>>({});

  // Requirement 2: Smooth touch & sideways drag horizontal scrolling on category options
  const {
    scrollRef: categoryScrollRef,
    canScrollLeft: canCategoryScrollLeft,
    canScrollRight: canCategoryScrollRight,
    scrollByDirection: scrollCategoryByDirection,
  } = useHorizontalScroll();

  const filteredOpenings = activeCategory === 'all'
    ? openings
    : openings.filter(op => op.type === activeCategory);

  const handlePostSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newOrg) return;

    const created: RecruitmentOpening = {
      id: `op-${Date.now()}`,
      title: newTitle,
      organization: newOrg,
      type: newType,
      sport: newSport,
      location: newLocation || 'Regional Center',
      deadline: 'In 30 Days',
      stipendOrGrant: newStipend || 'Full Academy Sponsorship',
      vacancies: 5,
      description: newDesc || 'Verified athletic candidates required with structured performance history.',
      requirements: ['Submission of Official Resume / CV', 'Verified Sportzicon Profile scorecard or video reel'],
      appliedStatus: 'not-applied',
      applicationMethod: newAppMethod,
      externalFormUrl: newExternalFormUrl || undefined,
      allowResumeUpload: true,
    };

    onPostNewOpening(created);
    setShowPostModal(false);
    setNewTitle('');
    setNewOrg('');
    setNewDesc('');
    setNewExternalFormUrl('');
  };

  return (
    <div className="space-y-8 animate-fade-in text-left">
      
      {/* Screen Title & Overline - Single Clear H1 for Recruitment Opportunities */}
      <div className="space-y-1">
        <div className="text-overline text-[#FA4D14]">Recruitment & Trials</div>
        <h1 className="text-h1 text-[#0F172A]">Sports Recruitment & Trial Opportunities</h1>
        <p className="text-body text-[#64748B] max-w-[65ch]">
          Structured trial postings, 1-click verified CV submission, and transparent candidate status tracking.
        </p>
      </div>

      {/* Header Banner (Hidden when logged in) */}
      {!userSession && (
        <>
          <div className="bg-[#0F172A] text-white rounded-3xl border border-[#1E293B] p-6 sm:p-8 space-y-4 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden">
            <div className="relative z-10">
              <div className="flex items-center space-x-2 mb-1">
                <span className="text-overline text-[#FA4D14] px-2.5 py-0.5 rounded-full bg-[#FA4D14]/20 border border-[#FA4D14]/30">
                  Recruitment Pipeline
                </span>
              </div>
              <h2 className="text-h2 text-white">
                How Sport Actually Hires: Verified Recruitment
              </h2>
              <p className="text-body text-slate-300 max-w-[65ch]">
                Structured trial postings, 1-click verified CV submission, and transparent candidate status tracking.
              </p>
            </div>

            <button
              onClick={() => setShowPostModal(true)}
              className="px-6 py-3 rounded-2xl bg-[#FA4D14] hover:bg-[#E03A00] text-white font-semibold text-sm tracking-[0.01em] transition-all shadow-md flex items-center justify-center space-x-2 cursor-pointer shrink-0 relative z-10"
            >
              <Plus className="w-5 h-5" />
              <span>Post Club Opportunity</span>
            </button>
          </div>

          {/* Visual Recruitment Funnel Diagram */}
          <div className="bg-white rounded-3xl border border-[#CBD5E1] p-6 sm:p-8 space-y-6 shadow-sm">
            <div className="border-b border-[#CBD5E1] pb-4">
              <div className="text-overline text-[#FA4D14] mb-0.5">Pipeline</div>
              <h3 className="text-h3 text-[#0F172A] flex items-center gap-2">
                <Filter className="w-5 h-5 text-[#FA4D14]" />
                Recruitment Conversion Funnel Architecture
              </h3>
              <p className="text-small text-[#64748B] mt-0.5">
                Visual progression of candidate filtration from raw discovery to signed roster contracts.
              </p>
            </div>

            {/* Funnel Visual Diagram - Unified Slate & Terracotta Theme */}
            <div className="relative bg-[#F8FAFC] p-6 rounded-2xl border border-[#E2E8F0] flex flex-col items-center justify-center space-y-4">
              
              <div className="w-full max-w-3xl space-y-3">
                {/* Funnel Stage 1 */}
                <div className="bg-[#0F172A] text-white p-4 rounded-2xl border-l-8 border-[#EA580C] flex items-center justify-between shadow-sm">
                  <div className="flex items-center space-x-3">
                    <span className="w-7 h-7 rounded-lg bg-[#EA580C] text-white font-mono font-bold text-xs flex items-center justify-center">1</span>
                    <div>
                      <h4 className="font-bold font-oswald uppercase text-sm text-white">12,480+ Candidate Discovery</h4>
                      <p className="text-[11px] text-slate-300">Scouts filter candidate age, role, ball speed & location</p>
                    </div>
                  </div>
                  <span className="text-xs font-mono font-bold text-white bg-[#1E293B] px-3 py-1 rounded-full border border-[#334155]">100% Talent Pool</span>
                </div>

                {/* Funnel Stage 2 */}
                <div className="bg-white text-[#0F172A] p-4 rounded-2xl border-l-8 border-[#334155] border border-[#E2E8F0] flex items-center justify-between shadow-sm ml-4 mr-4">
                  <div className="flex items-center space-x-3">
                    <span className="w-7 h-7 rounded-lg bg-[#1E293B] text-white font-mono font-bold text-xs flex items-center justify-center">2</span>
                    <div>
                      <h4 className="font-bold font-oswald uppercase text-sm text-[#0F172A]">3,850+ Sensor & Video Reel Reviews</h4>
                      <p className="text-[11px] text-[#475569]">Radar skill match & verified frame rate video inspection</p>
                    </div>
                  </div>
                  <span className="text-xs font-mono font-bold text-[#0F172A] bg-[#F1F5F9] px-3 py-1 rounded-full border border-[#CBD5E1]">30.8% Shortlisted</span>
                </div>

                {/* Funnel Stage 3 */}
                <div className="bg-white text-[#0F172A] p-4 rounded-2xl border-l-8 border-[#334155] border border-[#E2E8F0] flex items-center justify-between shadow-sm ml-8 mr-8">
                  <div className="flex items-center space-x-3">
                    <span className="w-7 h-7 rounded-lg bg-[#1E293B] text-white font-mono font-bold text-xs flex items-center justify-center">3</span>
                    <div>
                      <h4 className="font-bold font-oswald uppercase text-sm text-[#0F172A]">1,240+ Ground Trial Invitations</h4>
                      <p className="text-[11px] text-[#475569]">Direct digital invitation dispatched with QR check-in</p>
                    </div>
                  </div>
                  <span className="text-xs font-mono font-bold text-[#0F172A] bg-[#F1F5F9] px-3 py-1 rounded-full border border-[#CBD5E1]">9.9% Invited</span>
                </div>

                {/* Funnel Stage 4 */}
                <div className="bg-[#0F172A] text-white p-4 rounded-2xl border-l-8 border-[#EA580C] flex items-center justify-between shadow-md ml-12 mr-12">
                  <div className="flex items-center space-x-3">
                    <span className="w-7 h-7 rounded-lg bg-[#EA580C] text-white font-mono font-bold text-xs flex items-center justify-center">4</span>
                    <div>
                      <h4 className="font-bold font-oswald uppercase text-sm text-white">4,200+ Signed Academy Contracts</h4>
                      <p className="text-[11px] text-slate-300">Verified roster placement and scholarship award</p>
                    </div>
                  </div>
                  <span className="text-xs font-mono font-bold text-[#EA580C] bg-[#1E293B] px-3 py-1 rounded-full border border-[#334155]">3.3% Roster Contracts</span>
                </div>

              </div>

            </div>
          </div>
        </>
      )}

      {/* Openings Opportunities List */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <h2 className="text-xl font-bold font-oswald text-[#0F172A] uppercase tracking-wide flex items-center gap-2">
            <Briefcase className="w-5 h-5 text-[#EA580C]" />
            Active Scouting, Jobs & Trial Opportunities
          </h2>

          <button
            onClick={() => setShowPostModal(true)}
            className="px-3.5 py-1.5 rounded-lg bg-[#EA580C] hover:bg-orange-600 text-white font-bold text-xs uppercase tracking-wide transition-all shadow-sm flex items-center gap-1.5 self-start sm:self-auto cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Post Opportunity</span>
          </button>
        </div>

        {/* Category Filter Tabs Bar with Touch & Drag Horizontal Scrolling */}
        <div className="relative bg-white rounded-2xl border border-[#E2E8F0] shadow-sm p-1.5 flex items-center">
          {canCategoryScrollLeft && (
            <button
              type="button"
              onClick={() => scrollCategoryByDirection('left', 220)}
              className="absolute left-1.5 z-10 w-7 h-7 rounded-full bg-white/95 shadow-md border border-[#CBD5E1] flex items-center justify-center text-[#0F172A] hover:bg-slate-100 transition-all cursor-pointer"
              title="Scroll left"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
          )}

          <div
            ref={categoryScrollRef}
            className="flex items-center space-x-1.5 overflow-x-auto touch-pan-x overscroll-x-contain scroll-smooth no-scrollbar py-1 px-1 flex-1 cursor-grab active:cursor-grabbing select-none"
            style={{ WebkitOverflowScrolling: 'touch', touchAction: 'pan-x' }}
          >
            <button
              onClick={() => setActiveCategory('all')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                activeCategory === 'all'
                  ? 'bg-[#0F172A] text-white shadow-md'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              All Opportunities
            </button>
            
            <button
              onClick={() => setActiveCategory('trial')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                activeCategory === 'trial'
                  ? 'bg-[#0F172A] text-white shadow-md'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              Trials & Selection Camps
            </button>

            <button
              onClick={() => setActiveCategory('job')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                activeCategory === 'job'
                  ? 'bg-[#0F172A] text-white shadow-md'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              Jobs & Vacancies
            </button>

            <button
              onClick={() => setActiveCategory('tournament_entry')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                activeCategory === 'tournament_entry'
                  ? 'bg-[#0F172A] text-white shadow-md'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              Tournament Entries
            </button>
          </div>

          {canCategoryScrollRight && (
            <button
              type="button"
              onClick={() => scrollCategoryByDirection('right', 220)}
              className="absolute right-1.5 sm:right-28 z-10 w-7 h-7 rounded-full bg-white/95 shadow-md border border-[#CBD5E1] flex items-center justify-center text-[#0F172A] hover:bg-slate-100 transition-all cursor-pointer"
              title="Scroll right"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          )}

          <span className="text-xs font-mono font-bold text-slate-400 hidden md:inline px-3 shrink-0">
            {filteredOpenings.length} Active Listings
          </span>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {filteredOpenings.map((op) => {
            const isExpanded = Boolean(expandedOpportunityIds[op.id]);
            return (
              <div
                key={op.id}
                className="bg-white rounded-2xl border border-[#E2E8F0] p-4 sm:p-5 space-y-3 shadow-xs hover:border-[#EA580C] transition-all"
              >
                {/* MANDATORY ROW: Title, Organization, Sport, Location, Deadline & Primary Action */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2 flex-wrap gap-y-1">
                      <span className="text-[11px] font-sans font-semibold px-2 py-0.5 rounded bg-[#0F172A] text-white">
                        {op.sport}
                      </span>
                      <span className="text-xs font-sans font-medium text-[#64748B]">📍 {op.location}</span>
                      <span className="text-[#94A3B8] text-xs">•</span>
                      <span className="text-xs font-medium text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
                        Deadline: {op.deadline}
                      </span>
                    </div>

                    <h3 className="text-h3 text-[#0F172A] truncate">
                      {op.title}
                    </h3>

                    <p className="text-xs text-[#475569] font-sans font-medium flex items-center gap-1">
                      <span className="text-[#64748B]">Club/Academy:</span>
                      <button
                        type="button"
                        onClick={() => {
                          if (onSelectAthlete) {
                            onSelectAthlete({
                              id: `org-${Date.now()}`,
                              name: op.organization,
                              avatar: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&w=400&q=80',
                              sport: op.sport || 'Cricket',
                              primaryRole: 'High Performance Academy & Club',
                              age: 2026,
                              location: op.location,
                              currentClubOrAcademy: op.organization,
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
                              bio: `Official profile for ${op.organization}. Leading high-performance sports education, coaching, and athlete recruitment hub.`,
                              scoutNotes: [`Verified Organization Profile on Sportzicon Network.`]
                            });
                          }
                        }}
                        className="text-[#EA580C] hover:underline font-bold cursor-pointer transition-colors"
                        title={`Click to view ${op.organization}'s profile`}
                      >
                        {op.organization}
                      </button>
                    </p>
                  </div>

                  {/* MANDATORY ACTIONS & MORE OPTIONS TRIGGER */}
                  <div className="flex items-center space-x-2 shrink-0 flex-wrap gap-y-2">
                    {op.appliedStatus === 'applied' ? (
                      <span className="px-3.5 py-2 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs sm:text-sm font-semibold flex items-center gap-1.5 shadow-xs">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Applied</span>
                      </span>
                    ) : (
                      <button
                        type="button"
                        onClick={() => onApplyOpening(op.id)}
                        className="px-4 py-2 rounded-xl bg-[#FA4D14] hover:bg-[#E03A00] text-white font-semibold text-xs sm:text-sm tracking-[0.01em] transition-all shadow-xs flex items-center gap-1.5 cursor-pointer"
                        title="1-Click Fast Apply"
                      >
                        <UserCheck className="w-3.5 h-3.5" />
                        <span>1-Click Apply</span>
                      </button>
                    )}

                    {/* CLICK HERE FOR MORE OPTIONS TOGGLE */}
                    <button
                      type="button"
                      onClick={() => setExpandedOpportunityIds(prev => ({ ...prev, [op.id]: !prev[op.id] }))}
                      className="px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold text-[#FA4D14] hover:text-white bg-[#FA4D14]/10 hover:bg-[#FA4D14] border border-[#FA4D14]/30 tracking-[0.01em] transition-all flex items-center gap-1.5 cursor-pointer"
                    >
                      <span>{isExpanded ? 'Minimize options' : 'Click here for more options'}</span>
                      {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>

                {/* EXPANDED DETAILS & ADDITIONAL OPTIONS (WHEN REQUESTED BY USER) */}
                {isExpanded && (
                  <div className="pt-3 border-t border-[#F1F5F9] space-y-3.5 animate-fadeIn">
                    <p className="text-xs text-[#334155] leading-relaxed bg-[#F8FAFC] p-3.5 rounded-xl border border-[#E2E8F0] italic">
                      "{op.description}"
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs font-sans">
                      <div className="bg-[#F8FAFC] p-2.5 rounded-xl border border-[#E2E8F0]">
                        <span className="text-[#64748B] block text-[10px] uppercase font-semibold">Stipend / Grant</span>
                        <span className="text-[#0F172A] font-bold">{op.stipendOrGrant}</span>
                      </div>
                      <div className="bg-[#F8FAFC] p-2.5 rounded-xl border border-[#E2E8F0]">
                        <span className="text-[#64748B] block text-[10px] uppercase font-semibold">Trial Deadline</span>
                        <span className="text-[#0F172A] font-bold">{op.deadline}</span>
                      </div>
                      <div className="bg-[#F8FAFC] p-2.5 rounded-xl border border-[#E2E8F0]">
                        <span className="text-[#64748B] block text-[10px] uppercase font-semibold">Roster Vacancies</span>
                        <span className="text-[#EA580C] font-bold">{op.vacancies} Spots Open</span>
                      </div>
                    </div>

                    {/* Requirements Checklist */}
                    <div className="space-y-1.5">
                      <span className="text-[11px] font-sans font-bold text-[#475569] uppercase">
                        Candidate Requirements:
                      </span>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs text-[#334155] font-sans">
                        {op.requirements.map((req, idx) => (
                          <li key={idx} className="flex items-center gap-1.5">
                            <ShieldCheck className="w-3.5 h-3.5 text-[#EA580C]" />
                            <span>{req}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Additional Alternate Application Options */}
                    <div className="pt-2 border-t border-[#F1F5F9] flex flex-wrap items-center gap-2">
                      <span className="text-xs text-[#64748B] font-medium mr-1">Other Application Options:</span>
                      <button
                        type="button"
                        onClick={() => setManualApplyOpening(op)}
                        className="px-3 py-1.5 rounded-lg bg-[#0F172A] hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wide transition-all shadow-xs flex items-center gap-1.5 cursor-pointer"
                        title="Fill details manually & upload Resume/CV PDF"
                      >
                        <Paperclip className="w-3 h-3 text-[#EA580C]" />
                        <span>Fill Details & Upload Resume</span>
                      </button>

                      {op.externalFormUrl && (
                        <a
                          href={op.externalFormUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3 py-1.5 rounded-lg bg-white border border-[#CBD5E1] text-[#0F172A] font-bold text-xs hover:border-[#EA580C] transition-all flex items-center gap-1.5 shadow-xs cursor-pointer"
                          title="Open external Google Form or Drive folder"
                        >
                          <LinkIcon className="w-3 h-3 text-blue-600" />
                          <span>Google Form / Drive</span>
                          <ExternalLink className="w-2.5 h-2.5 text-[#64748B]" />
                        </a>
                      )}
                    </div>
                  </div>
                )}

              </div>
            );
          })}
        </div>
      </div>

      {/* Post Opportunity Modal */}
      {showPostModal && (
        <div className="fixed inset-0 z-50 bg-[#111827]/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto animate-fade-in">
          <div className="bg-[#FAF7F2] border border-[#E5DFD5] rounded-3xl max-w-lg w-full p-6 space-y-6 shadow-2xl relative text-[#111827]">
            <div className="flex justify-between items-center border-b border-[#E5DFD5] pb-3">
              <h3 className="text-xl font-bold font-oswald text-[#111827] uppercase">
                Post New Academy Trial / Opening
              </h3>
              <button
                onClick={() => setShowPostModal(false)}
                className="text-[#4B5563] hover:text-[#111827] text-lg font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handlePostSubmit} className="space-y-4 text-xs font-mono">
              <div>
                <label className="block text-[#374151] mb-1 font-bold">Trial Title:</label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. U-19 Fast Bowlers State Trial"
                  className="w-full bg-white border border-[#E5DFD5] rounded-xl p-3 text-[#111827] focus:outline-none focus:border-[#FA4D14]"
                />
              </div>

              <div>
                <label className="block text-[#374151] mb-1 font-bold">Club / Academy Name:</label>
                <input
                  type="text"
                  required
                  value={newOrg}
                  onChange={(e) => setNewOrg(e.target.value)}
                  placeholder="e.g. Apex Sports Academy"
                  className="w-full bg-white border border-[#E5DFD5] rounded-xl p-3 text-[#111827] focus:outline-none focus:border-[#FA4D14]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[#374151] mb-1 font-bold">Sport:</label>
                  <select
                    value={newSport}
                    onChange={(e) => setNewSport(e.target.value)}
                    className="w-full bg-white border border-[#E5DFD5] rounded-xl p-3 text-[#111827] focus:outline-none focus:border-[#FA4D14]"
                  >
                    <option value="Cricket">Cricket</option>
                    <option value="Football">Football</option>
                    <option value="Basketball">Basketball</option>
                    <option value="Athletics">Athletics</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[#374151] mb-1 font-bold">Location:</label>
                  <input
                    type="text"
                    value={newLocation}
                    onChange={(e) => setNewLocation(e.target.value)}
                    placeholder="e.g. Mumbai, MH"
                    className="w-full bg-white border border-[#E5DFD5] rounded-xl p-3 text-[#111827] focus:outline-none focus:border-[#FA4D14]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[#374151] mb-1 font-bold">Stipend / Grant Details:</label>
                <input
                  type="text"
                  value={newStipend}
                  onChange={(e) => setNewStipend(e.target.value)}
                  placeholder="e.g. ₹35,000 / month stipend + lodging"
                  className="w-full bg-white border border-[#E5DFD5] rounded-xl p-3 text-[#111827] focus:outline-none focus:border-[#FA4D14]"
                />
              </div>

              <div>
                <label className="block text-[#374151] mb-1 font-bold">Description & Requirements:</label>
                <textarea
                  rows={3}
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  placeholder="Specify candidate requirements..."
                  className="w-full bg-white border border-[#E5DFD5] rounded-xl p-3 text-[#111827] focus:outline-none focus:border-[#FA4D14]"
                />
              </div>

              <div>
                <label className="block text-[#374151] mb-1 font-bold flex items-center gap-1">
                  <LinkIcon className="w-3.5 h-3.5 text-blue-600" />
                  <span>Google Form or Drive Link (Optional):</span>
                </label>
                <input
                  type="url"
                  value={newExternalFormUrl}
                  onChange={(e) => setNewExternalFormUrl(e.target.value)}
                  placeholder="e.g. https://forms.google.com/d/e/... or Drive Folder Link"
                  className="w-full bg-white border border-[#E5DFD5] rounded-xl p-3 text-[#111827] focus:outline-none focus:border-[#FA4D14]"
                />
                <span className="text-[10px] text-[#64748B] mt-0.5 block">
                  Candidates can directly click this Google Form/Drive link to register.
                </span>
              </div>

              <div className="flex justify-end space-x-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowPostModal(false)}
                  className="px-4 py-2.5 rounded-xl bg-white border border-[#E5DFD5] text-[#374151] hover:text-[#111827]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-[#FA4D14] text-white font-bold uppercase cursor-pointer"
                >
                  Publish Trial Opportunity
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Apply Manual Modal */}
      {manualApplyOpening && (
        <ApplyManualModal
          opening={manualApplyOpening}
          userSession={userSession}
          onClose={() => setManualApplyOpening(null)}
          onSubmitSuccess={(openingId) => {
            onApplyOpening(openingId);
          }}
        />
      )}

    </div>
  );
};
