import React, { useState } from 'react';
import { PrototypeMode, PrototypeScreen } from '../types';
import { ApplyManualModal } from './ApplyManualModal';
import { Sparkles, RefreshCw, Search, Briefcase, Award, Activity, Play, CheckCircle2, ShieldCheck, Share2, Eye, Filter, ArrowRight, UserPlus, FileText, ChevronRight, X, Heart, Star, Send, Paperclip, ExternalLink, Link as LinkIcon, ChevronDown, ChevronUp } from 'lucide-react';
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';

export const InteractivePrototype: React.FC = () => {
  const [mode, setMode] = useState<PrototypeMode>('redesigned');
  const [screen, setScreen] = useState<PrototypeScreen>('hero');

  // Hero Screen Interactive States
  const [selectedRole, setSelectedRole] = useState<'athlete' | 'club' | 'scout'>('athlete');
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Scorecard Interactive States
  const [selectedVideoUrl, setSelectedVideoUrl] = useState<string | null>(null);
  const [isScoutInquirySent, setIsScoutInquirySent] = useState<boolean>(false);

  // Opportunity Marketplace Interactive States
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [activeApplyingOpportunity, setActiveApplyingOpportunity] = useState<any | null>(null);
  const [manualModalOpp, setManualModalOpp] = useState<any | null>(null);
  const [isApplied, setIsApplied] = useState<boolean>(false);
  const [expandedProtoOppIds, setExpandedProtoOppIds] = useState<Record<string, boolean>>({});

  // Live Scoring Interactive States
  const [liveScoreFilter, setLiveScoreFilter] = useState<'cricket' | 'football'>('cricket');

  // Sample Data for Prototype
  const athleteStatsRadar = [
    { subject: 'Speed/Pace', A: 88 },
    { subject: 'Consistency', A: 92 },
    { subject: 'Match Form', A: 85 },
    { subject: 'Power/Hitting', A: 90 },
    { subject: 'Fielding/Agility', A: 87 },
  ];

  const opportunitiesList = [
    {
      id: 'opp-1',
      title: 'Under-21 Premier Cricket Trial',
      organization: 'Apex Cricket Academy & Club',
      location: 'London, UK (Relocation Offered)',
      type: 'Pro Club Contract',
      sport: 'Cricket',
      stipend: '£2,500 / month + Match Fees',
      deadline: 'In 5 Days',
      badge: 'Official Trial',
    },
    {
      id: 'opp-2',
      title: 'Youth Fast Bowler NIL Sponsorship',
      organization: 'Titan Performance Apparel',
      location: 'Remote / Global',
      type: 'NIL Deal',
      sport: 'Cricket',
      stipend: '$1,200 / month + Equipment',
      deadline: 'In 12 Days',
      badge: 'NIL Opportunity',
    },
    {
      id: 'opp-3',
      title: 'Academy Striker Recruitment 2026',
      organization: 'Metro FC Youth Academy',
      location: 'Manchester, UK',
      type: 'Trial',
      sport: 'Soccer',
      stipend: 'Full Scholarship & Training',
      deadline: 'In 2 Weeks',
      badge: 'Verified Academy',
    },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      
      {/* Prototype Control Bar */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-6 flex flex-col md:flex-row items-center justify-between gap-4 sticky top-20 z-30 shadow-sm backdrop-blur-md text-slate-900">
        
        {/* Screen Switcher Tabs */}
        <div className="flex items-center space-x-1.5 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 no-scrollbar">
          <button
            onClick={() => setScreen('hero')}
            className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap flex items-center space-x-1.5 cursor-pointer ${
              screen === 'hero'
                ? 'bg-blue-600 text-white font-bold shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Sparkles className="w-4 h-4 text-blue-200" />
            <span>1. Hero & Onboarding</span>
          </button>

          <button
            onClick={() => setScreen('scorecard')}
            className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap flex items-center space-x-1.5 cursor-pointer ${
              screen === 'scorecard'
                ? 'bg-blue-600 text-white font-bold shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Award className="w-4 h-4 text-blue-200" />
            <span>2. Athlete Scorecard</span>
          </button>

          <button
            onClick={() => setScreen('opportunities')}
            className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap flex items-center space-x-1.5 cursor-pointer ${
              screen === 'opportunities'
                ? 'bg-blue-600 text-white font-bold shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Briefcase className="w-4 h-4 text-blue-200" />
            <span>3. Opportunities</span>
          </button>

          <button
            onClick={() => setScreen('livescores')}
            className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap flex items-center space-x-1.5 cursor-pointer ${
              screen === 'livescores'
                ? 'bg-blue-600 text-white font-bold shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Activity className="w-4 h-4 text-blue-200" />
            <span>4. Live Scoring</span>
          </button>
        </div>

        {/* Mode Toggle Switch (Current vs Redesigned) */}
        <div className="flex items-center space-x-2 bg-slate-100 p-1.5 rounded-xl border border-slate-200 w-full md:w-auto justify-center shadow-2xs">
          <button
            onClick={() => setMode('current')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              mode === 'current'
                ? 'bg-slate-800 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Current (Original)
          </button>

          <button
            onClick={() => setMode('redesigned')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center space-x-1.5 ${
              mode === 'redesigned'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-blue-200" />
            <span>Redesigned UI</span>
            <span className="px-1.5 py-0.2 rounded-full text-[9px] bg-green-500 text-white font-bold uppercase">Enhanced</span>
          </button>
        </div>

      </div>

      {/* PROTOTYPE CANVAS FRAME */}
      <div className="bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden shadow-2xl relative min-h-[600px]">
        
        {/* Prototype Watermark Header */}
        <div className="bg-slate-900/80 px-4 py-2 border-b border-slate-800 flex items-center justify-between text-xs text-slate-400 font-mono">
          <div className="flex items-center space-x-2">
            <span className={`w-2.5 h-2.5 rounded-full ${mode === 'redesigned' ? 'bg-[#FA4D14] animate-ping' : 'bg-slate-500'}`}></span>
            <span>VIEWING: <strong className="text-white uppercase">{mode} MODE</strong></span>
            <span>— {screen.toUpperCase()} SCREEN</span>
          </div>
          <span className="hidden sm:inline text-slate-500">Interactive Canvas Simulation</span>
        </div>

        {/* ======================================================================= */}
        {/* SCREEN 1: HERO & ONBOARDING */}
        {/* ======================================================================= */}
        {screen === 'hero' && (
          mode === 'current' ? (
            /* CURRENT SPORTZICON HERO */
            <div className="p-8 sm:p-12 text-center space-y-6 max-w-3xl mx-auto py-16">
              <span className="text-xs font-mono text-slate-500 uppercase tracking-widest bg-slate-900 px-3 py-1 rounded-full border border-slate-800">
                Current Sportzicon Landing Layout
              </span>
              <h1 className="text-4xl sm:text-5xl font-bold font-oswald text-white uppercase tracking-tight">
                The verified sports recruitment network
              </h1>
              <p className="text-slate-400 text-sm leading-relaxed">
                Connect athletes, clubs, and sports scouts worldwide. Build digital scorecards, manage tournaments, and apply to opportunities.
              </p>

              {/* Competing dual buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                <button className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#FA4D14] text-white font-bold text-sm shadow-md">
                  For Athletes
                </button>
                <button className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#FA4D14] text-white font-bold text-sm shadow-md">
                  For Clubs
                </button>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 text-xs text-slate-400 text-left mt-8">
                <p className="font-semibold text-slate-300 mb-1">UX Assessment Note:</p>
                Equal weight buttons cause decision confusion. Lacks live stats proof, role personalization, or instant search.
              </div>
            </div>
          ) : (
            /* REDESIGNED HERO WITH ROLE SWITCHER & OMNI SEARCH */
            <div className="p-6 sm:p-10 space-y-8">
              
              {/* Role Switcher Pill Bar */}
              <div className="flex items-center justify-between flex-wrap gap-4 border-b border-slate-800/80 pb-4">
                <div className="inline-flex p-1 rounded-xl bg-slate-900 border border-slate-800">
                  <button
                    onClick={() => setSelectedRole('athlete')}
                    className={`px-4 py-2 rounded-lg text-xs font-bold font-oswald tracking-wide transition-all cursor-pointer ${
                      selectedRole === 'athlete'
                        ? 'bg-[#FA4D14] text-white shadow-md'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    ⚡ FOR ATHLETES
                  </button>

                  <button
                    onClick={() => setSelectedRole('club')}
                    className={`px-4 py-2 rounded-lg text-xs font-bold font-oswald tracking-wide transition-all cursor-pointer ${
                      selectedRole === 'club'
                        ? 'bg-[#FA4D14] text-white shadow-md'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    🏆 FOR CLUBS & ACADEMIES
                  </button>

                  <button
                    onClick={() => setSelectedRole('scout')}
                    className={`px-4 py-2 rounded-lg text-xs font-bold font-oswald tracking-wide transition-all cursor-pointer ${
                      selectedRole === 'scout'
                        ? 'bg-[#FA4D14] text-white shadow-md'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    🔍 FOR SCOUTS & AGENTS
                  </button>
                </div>

                {/* Omni Search Trigger */}
                <button
                  onClick={() => setIsSearchOpen(true)}
                  className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-slate-400 hover:text-slate-200 text-xs transition-all cursor-pointer"
                >
                  <Search className="w-4 h-4 text-[#FA4D14]" />
                  <span>Search players, trials, clubs...</span>
                  <kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-[10px] font-mono text-slate-300 border border-slate-700">⌘K</kbd>
                </button>
              </div>

              {/* Dynamic Hero Layout */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                
                <div className="lg:col-span-7 space-y-5">
                  <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-[#FA4D14]/15 border border-[#FA4D14]/30 text-[#FA4D14] text-xs font-semibold">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>The Verified Sports Talent Ecosystem</span>
                  </span>

                  <h1 className="text-3xl sm:text-5xl font-bold font-oswald text-white uppercase tracking-tight leading-tight">
                    {selectedRole === 'athlete' && <>Get Discovered with <span className="text-[#FA4D14]">Verified Digital Scorecards</span></>}
                    {selectedRole === 'club' && <>Scout Top Athletic Talent with <span className="text-[#FA4D14]">Verified Performance Logs</span></>}
                    {selectedRole === 'scout' && <>Access Official Document Records & <span className="text-[#FA4D14]">Direct Player Inquiries</span></>}
                  </h1>

                  <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                    {selectedRole === 'athlete' && 'Build a recruiter-ready scorecard with match stats, video reels, and 1-click trial applications.'}
                    {selectedRole === 'club' && 'Post trials, verify player stats from official tournaments, and recruit promising athletes.'}
                    {selectedRole === 'scout' && 'Request passport & medical records securely, review radar stat charts, and contact player guardians directly.'}
                  </p>

                  <div className="flex flex-wrap items-center gap-3 pt-2">
                    <button className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#FA4D14] to-orange-600 hover:from-orange-500 hover:to-orange-700 text-white font-bold text-sm shadow-lg shadow-[#FA4D14]/30 flex items-center space-x-2 cursor-pointer">
                      <span>{selectedRole === 'athlete' ? 'Create Free Scorecard' : selectedRole === 'club' ? 'Post Trial Opportunity' : 'Request Scout Access'}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => setScreen('scorecard')}
                      className="px-4 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white font-medium text-sm border border-slate-800 cursor-pointer"
                    >
                      View Sample Scorecard
                    </button>
                  </div>
                </div>

                {/* Live Scorecard Preview Card */}
                <div className="lg:col-span-5 bg-gradient-to-b from-slate-900 to-slate-950 p-6 rounded-2xl border border-slate-800 shadow-xl space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
                      <span className="text-xs font-mono text-slate-400 uppercase">Live Athlete Spotlight</span>
                    </div>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 uppercase">
                      VERIFIED
                    </span>
                  </div>

                  <div className="flex items-center space-x-4">
                    <img
                      src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150"
                      alt="Athlete"
                      className="w-14 h-14 rounded-full object-cover border-2 border-[#FA4D14]"
                    />
                    <div>
                      <h3 className="font-oswald text-lg font-bold text-white">Aria Sharma</h3>
                      <p className="text-xs text-slate-400">Right-Arm Fast Bowler • Under-19</p>
                      <p className="text-[11px] font-mono text-[#FA4D14]">Avg: 18.4 • Strike Rate: 14.2</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2 bg-slate-950 p-3 rounded-xl border border-slate-800/80 text-center text-xs">
                    <div>
                      <span className="text-slate-500 block text-[10px] font-mono">MATCHES</span>
                      <span className="font-bold text-white font-mono">34</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block text-[10px] font-mono">WICKETS</span>
                      <span className="font-bold text-orange-400 font-mono">52</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block text-[10px] font-mono">ECONOMY</span>
                      <span className="font-bold text-emerald-400 font-mono">4.12</span>
                    </div>
                  </div>

                  <button
                    onClick={() => setScreen('scorecard')}
                    className="w-full py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs transition-colors flex items-center justify-center space-x-1 cursor-pointer"
                  >
                    <span>Inspect Full Scorecard</span>
                    <ChevronRight className="w-4 h-4 text-[#FA4D14]" />
                  </button>
                </div>

              </div>

              {/* Social Proof Stats Bar */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t border-slate-800/80 text-center">
                <div>
                  <span className="text-2xl font-bold font-oswald text-white">14,200+</span>
                  <span className="text-xs text-slate-400 block font-mono">Verified Athletes</span>
                </div>
                <div>
                  <span className="text-2xl font-bold font-oswald text-[#FA4D14]">480+</span>
                  <span className="text-xs text-slate-400 block font-mono">Clubs & Academies</span>
                </div>
                <div>
                  <span className="text-2xl font-bold font-oswald text-emerald-400">1,850+</span>
                  <span className="text-xs text-slate-400 block font-mono">Trials & NIL Deals</span>
                </div>
                <div>
                  <span className="text-2xl font-bold font-oswald text-sky-400">99.4%</span>
                  <span className="text-xs text-slate-400 block font-mono">Verified Stats Accuracy</span>
                </div>
              </div>

            </div>
          )
        )}

        {/* ======================================================================= */}
        {/* SCREEN 2: ATHLETE SCORECARD */}
        {/* ======================================================================= */}
        {screen === 'scorecard' && (
          mode === 'current' ? (
            /* CURRENT SCORECARD LAYOUT */
            <div className="p-8 space-y-6 max-w-4xl mx-auto">
              <span className="text-xs font-mono text-slate-500 uppercase tracking-widest bg-slate-900 px-3 py-1 rounded-full border border-slate-800">
                Current Tabular Scorecard Layout
              </span>

              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center font-bold text-xl text-white">
                  AS
                </div>
                <div>
                  <h2 className="text-2xl font-bold font-oswald text-white">Aria Sharma</h2>
                  <p className="text-xs text-slate-400">Cricket • Fast Bowler</p>
                </div>
              </div>

              {/* Plain Stat Tables */}
              <div className="bg-slate-900 rounded-xl border border-slate-800 p-4">
                <h4 className="text-sm font-bold text-slate-300 mb-3">Bowling Statistics Table</h4>
                <div className="overflow-x-auto text-xs text-slate-300 font-mono">
                  <table className="w-full text-left">
                    <thead className="border-b border-slate-800 text-slate-500">
                      <tr>
                        <th className="py-2">Matches</th>
                        <th className="py-2">Overs</th>
                        <th className="py-2">Wickets</th>
                        <th className="py-2">Average</th>
                        <th className="py-2">Economy</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="py-2">34</td>
                        <td className="py-2">128.4</td>
                        <td className="py-2">52</td>
                        <td className="py-2">18.40</td>
                        <td className="py-2">4.12</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 text-xs text-slate-400">
                <p className="font-semibold text-slate-300 mb-1">UX Assessment Note:</p>
                Plain text tables don't showcase player radar strengths, video highlights, or quick scout contact sheets.
              </div>
            </div>
          ) : (
            /* REDESIGNED VISUAL SCORECARD WITH RADAR & HIGHLIGHTS */
            <div className="p-6 sm:p-8 space-y-6">
              
              {/* Profile Top Bar */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <img
                      src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200"
                      alt="Athlete"
                      className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border-2 border-[#FA4D14] shadow-lg"
                    />
                    <span className="absolute -bottom-1 -right-1 p-1 bg-emerald-500 text-slate-950 rounded-full border-2 border-slate-950">
                      <CheckCircle2 className="w-4 h-4" />
                    </span>
                  </div>

                  <div>
                    <div className="flex items-center space-x-2">
                      <h2 className="text-2xl sm:text-3xl font-bold font-oswald text-white uppercase tracking-tight">
                        Aria Sharma
                      </h2>
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#FA4D14]/20 text-[#FA4D14] border border-[#FA4D14]/30">
                        SPORTZICON VERIFIED
                      </span>
                    </div>

                    <p className="text-xs text-slate-300">
                      Cricket • Right-Arm Fast Bowler • Under-19 State Team
                    </p>
                    <p className="text-xs text-slate-400 font-mono mt-0.5">
                      📍 London, UK • Available for Pro Trials & NIL
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <button className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 text-xs font-semibold flex items-center space-x-1 cursor-pointer">
                    <Share2 className="w-3.5 h-3.5" />
                    <span>Share Scorecard Link</span>
                  </button>

                  <button
                    onClick={() => setIsScoutInquirySent(true)}
                    className="px-4 py-2 rounded-xl bg-[#FA4D14] hover:bg-orange-600 text-white font-semibold text-xs shadow-md shadow-[#FA4D14]/20 flex items-center space-x-1 cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>{isScoutInquirySent ? 'Inquiry Sent ✓' : 'Send Scout Inquiry'}</span>
                  </button>
                </div>
              </div>

              {/* Athletic Radar & Highlights Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                
                {/* Athletic Attributes Radar Chart */}
                <div className="lg:col-span-5 bg-slate-900 rounded-2xl border border-slate-800 p-5 space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="font-oswald font-bold text-base text-white uppercase tracking-wide flex items-center gap-2">
                      <Award className="w-4 h-4 text-amber-400" />
                      Athletic Attribute Radar
                    </h3>
                    <span className="text-[10px] font-mono text-slate-400">Scout Evaluated</span>
                  </div>

                  <div className="h-56 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <RadarChart cx="50%" cy="50%" outerRadius="70%" data={athleteStatsRadar}>
                        <PolarGrid stroke="#334155" />
                        <PolarAngleAxis dataKey="subject" stroke="#94a3b8" tick={{ fill: '#94a3b8', fontSize: 10 }} />
                        <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#475569" />
                        <Radar name="Aria Sharma" dataKey="A" stroke="#FA4D14" fill="#FA4D14" fillOpacity={0.5} />
                      </RadarChart>
                    </ResponsiveContainer>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs pt-2 border-t border-slate-800">
                    <div className="bg-slate-950 p-2 rounded-lg border border-slate-800 text-center">
                      <span className="text-slate-500 text-[10px] block font-mono">TOP SPEED</span>
                      <span className="font-bold text-orange-400 font-mono">134.2 km/h</span>
                    </div>
                    <div className="bg-slate-950 p-2 rounded-lg border border-slate-800 text-center">
                      <span className="text-slate-500 text-[10px] block font-mono">DOT BALL %</span>
                      <span className="font-bold text-emerald-400 font-mono">68.4%</span>
                    </div>
                  </div>
                </div>

                {/* Video Highlights Reel Showcase */}
                <div className="lg:col-span-7 bg-slate-900 rounded-2xl border border-slate-800 p-5 space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-oswald font-bold text-base text-white uppercase tracking-wide flex items-center gap-2">
                      <Play className="w-4 h-4 text-[#FA4D14]" />
                      Verified Match Reels & Highlights
                    </h3>
                    <span className="text-xs text-slate-400 font-mono">3 Clips Attached</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div
                      onClick={() => setSelectedVideoUrl('Wicket Haul Reel')}
                      className="relative rounded-xl overflow-hidden group cursor-pointer border border-slate-800 hover:border-[#FA4D14] transition-all bg-slate-950"
                    >
                      <img
                        src="https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&q=80&w=400"
                        alt="Match clip"
                        className="w-full h-32 object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent p-3 flex flex-col justify-end">
                        <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-[#FA4D14] text-white w-max mb-1">
                          5-WICKET HAUL
                        </span>
                        <h4 className="font-bold text-xs text-white">vs Northern Academies 2026</h4>
                        <span className="text-[10px] text-slate-300 font-mono">Duration: 1m 45s</span>
                      </div>
                      <div className="absolute top-2 right-2 p-1.5 rounded-full bg-slate-900/80 text-white group-hover:scale-110 transition-transform">
                        <Play className="w-3.5 h-3.5 fill-white" />
                      </div>
                    </div>

                    <div
                      onClick={() => setSelectedVideoUrl('Bouncer & Pace Reel')}
                      className="relative rounded-xl overflow-hidden group cursor-pointer border border-slate-800 hover:border-[#FA4D14] transition-all bg-slate-950"
                    >
                      <img
                        src="https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&q=80&w=400"
                        alt="Match clip 2"
                        className="w-full h-32 object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent p-3 flex flex-col justify-end">
                        <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-sky-500 text-white w-max mb-1">
                          PACE ANALYSIS
                        </span>
                        <h4 className="font-bold text-xs text-white">Outswing Bowling Delivery Reel</h4>
                        <span className="text-[10px] text-slate-300 font-mono">Duration: 2m 10s</span>
                      </div>
                      <div className="absolute top-2 right-2 p-1.5 rounded-full bg-slate-900/80 text-white group-hover:scale-110 transition-transform">
                        <Play className="w-3.5 h-3.5 fill-white" />
                      </div>
                    </div>
                  </div>

                  {/* Scout Document Access Bar */}
                  <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between text-xs">
                    <div className="flex items-center space-x-2">
                      <ShieldCheck className="w-4 h-4 text-emerald-400" />
                      <span className="text-slate-300">Verified Medical & Passport Records</span>
                    </div>
                    <button className="text-xs font-semibold text-[#FA4D14] hover:underline cursor-pointer">
                      Request Access Token →
                    </button>
                  </div>

                </div>

              </div>

            </div>
          )
        )}

        {/* ======================================================================= */}
        {/* SCREEN 3: OPPORTUNITY MARKETPLACE */}
        {/* ======================================================================= */}
        {screen === 'opportunities' && (
          mode === 'current' ? (
            /* CURRENT OPPORTUNITY LIST */
            <div className="p-8 space-y-6 max-w-4xl mx-auto">
              <span className="text-xs font-mono text-slate-500 uppercase tracking-widest bg-slate-900 px-3 py-1 rounded-full border border-slate-800">
                Current Opportunity Cards
              </span>

              <div className="space-y-4">
                {opportunitiesList.map(opp => (
                  <div key={opp.id} className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                    <h3 className="font-bold text-white text-base">{opp.title}</h3>
                    <p className="text-xs text-slate-400">{opp.organization} • {opp.location}</p>
                    <button className="px-4 py-2 rounded-lg bg-[#FA4D14] text-white text-xs font-bold">
                      Apply Now
                    </button>
                  </div>
                ))}
              </div>

              <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 text-xs text-slate-400">
                <p className="font-semibold text-slate-300 mb-1">UX Assessment Note:</p>
                Clicking apply triggers a multi-step form instead of auto-attaching the verified Sportzicon Scorecard.
              </div>
            </div>
          ) : (
            /* REDESIGNED MARKETPLACE WITH QUICK FILTER PILLS & 1-CLICK APPLY DRAWER */
            <div className="p-6 sm:p-8 space-y-6">
              
              {/* Filter Pills Bar */}
              <div className="flex items-center justify-between flex-wrap gap-3 pb-4 border-b border-slate-800">
                <div className="flex items-center space-x-2 overflow-x-auto no-scrollbar">
                  <span className="text-xs text-slate-400 font-mono flex items-center gap-1">
                    <Filter className="w-3.5 h-3.5 text-[#FA4D14]" /> Quick Filters:
                  </span>
                  
                  {['all', 'Cricket', 'Soccer', 'NIL Deal', 'Trials'].map(f => (
                    <button
                      key={f}
                      onClick={() => setSelectedFilter(f)}
                      className={`px-3 py-1 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                        selectedFilter === f
                          ? 'bg-[#FA4D14] text-white font-bold shadow'
                          : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
                      }`}
                    >
                      {f === 'all' ? 'All Opportunities' : f}
                    </button>
                  ))}
                </div>

                <span className="text-xs text-slate-400 font-mono">
                  Showing 3 Verified Offers
                </span>
              </div>

              {/* Opportunities Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {opportunitiesList
                  .filter(o => selectedFilter === 'all' || o.sport === selectedFilter || o.type.includes(selectedFilter))
                  .map(opp => {
                    const isExpanded = Boolean(expandedProtoOppIds[opp.id]);
                    return (
                      <div key={opp.id} className="bg-slate-900 rounded-2xl border border-slate-800 p-4 space-y-3 flex flex-col justify-between hover:border-slate-700 transition-all">
                        <div className="space-y-1.5">
                          <div className="flex items-center justify-between">
                            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-400 border border-amber-500/30">
                              {opp.badge}
                            </span>
                            <span className="text-[11px] font-mono text-slate-400">Deadline: {opp.deadline}</span>
                          </div>

                          <h3 className="font-bold text-sm sm:text-base text-white font-oswald tracking-wide">
                            {opp.title}
                          </h3>

                          <p className="text-xs text-slate-300 font-medium">
                            {opp.organization}
                          </p>

                          <p className="text-xs text-slate-400 font-mono">
                            📍 {opp.location}
                          </p>

                          {/* EXPANDABLE DETAILS */}
                          {isExpanded && (
                            <div className="pt-2 border-t border-slate-800 space-y-2 animate-fadeIn">
                              <div className="p-2 rounded-xl bg-slate-950 border border-slate-800/80 text-xs">
                                <span className="text-slate-500 text-[10px] block font-mono">COMPENSATION / BENEFIT</span>
                                <span className="font-bold text-emerald-400 font-mono">{opp.stipend}</span>
                              </div>

                              <button
                                onClick={() => {
                                  setManualModalOpp({
                                    ...opp,
                                    requirements: ['Manual CV Upload', 'Verified Sportzicon Profile'],
                                  });
                                }}
                                className="w-full py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs transition-colors flex items-center justify-center space-x-1.5 cursor-pointer border border-slate-700"
                              >
                                <Paperclip className="w-3 h-3 text-[#FA4D14]" />
                                <span>Fill Details & Upload Resume</span>
                              </button>
                            </div>
                          )}
                        </div>

                        {/* MANDATORY ACTIONS & MORE OPTIONS BUTTON */}
                        <div className="space-y-2 pt-2 border-t border-slate-800/60">
                          <button
                            onClick={() => {
                              setActiveApplyingOpportunity(opp);
                              setIsApplied(false);
                            }}
                            className="w-full py-2 rounded-xl bg-[#FA4D14] hover:bg-orange-600 text-white font-bold text-xs shadow-md shadow-[#FA4D14]/20 transition-colors flex items-center justify-center space-x-1.5 cursor-pointer"
                          >
                            <Briefcase className="w-3.5 h-3.5" />
                            <span>1-Click Auto-Apply</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => setExpandedProtoOppIds(prev => ({ ...prev, [opp.id]: !prev[opp.id] }))}
                            className="w-full py-1.5 rounded-xl text-xs font-bold text-slate-300 hover:text-white bg-slate-800/60 hover:bg-slate-800 transition-all flex items-center justify-center gap-1 cursor-pointer border border-slate-700/60"
                          >
                            <span>{isExpanded ? 'Minimize options' : 'Click here for more options'}</span>
                            {isExpanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                          </button>
                        </div>
                      </div>
                    );
                  })}
              </div>

              {/* Slide-over Apply Drawer Modal */}
              {activeApplyingOpportunity && (
                <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
                  <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6 max-w-lg w-full space-y-5 relative shadow-2xl">
                    <button
                      onClick={() => setActiveApplyingOpportunity(null)}
                      className="absolute top-4 right-4 p-1 rounded-lg text-slate-400 hover:text-white bg-slate-800"
                    >
                      <X className="w-5 h-5" />
                    </button>

                    <div className="space-y-1">
                      <span className="text-xs font-mono text-[#FA4D14] uppercase">1-Click Fast Application</span>
                      <h3 className="text-xl font-bold font-oswald text-white">
                        {activeApplyingOpportunity.title}
                      </h3>
                      <p className="text-xs text-slate-400">
                        Offered by {activeApplyingOpportunity.organization}
                      </p>
                    </div>

                    <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
                      <span className="text-xs text-slate-400 block font-semibold">
                        Auto-Attached Scorecard Artifacts:
                      </span>
                      <div className="flex items-center space-x-3 text-xs text-slate-200">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                        <span>Aria Sharma's Verified Sportzicon Scorecard (34 Matches)</span>
                      </div>
                      <div className="flex items-center space-x-3 text-xs text-slate-200">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                        <span>2 Video Highlight Clips Attached</span>
                      </div>
                    </div>

                    {isApplied ? (
                      <div className="p-4 rounded-xl bg-emerald-950/50 border border-emerald-800 text-center space-y-2">
                        <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
                        <h4 className="font-bold text-white text-sm">Application Successfully Submitted!</h4>
                        <p className="text-xs text-emerald-200/80">
                          The recruitment scout has been notified and can inspect your verified scorecard.
                        </p>
                      </div>
                    ) : (
                      <button
                        onClick={() => setIsApplied(true)}
                        className="w-full py-3 rounded-xl bg-gradient-to-r from-[#FA4D14] to-orange-600 text-white font-bold text-sm shadow-lg shadow-[#FA4D14]/30 cursor-pointer"
                      >
                        Confirm 1-Click Submission
                      </button>
                    )}
                  </div>
                </div>
              )}

              {/* Manual Resume Upload Modal */}
              {manualModalOpp && (
                <ApplyManualModal
                  opening={manualModalOpp}
                  onClose={() => setManualModalOpp(null)}
                  onSubmitSuccess={() => {
                    setIsApplied(true);
                  }}
                />
              )}

            </div>
          )
        )}

        {/* ======================================================================= */}
        {/* SCREEN 4: LIVE SCORING */}
        {/* ======================================================================= */}
        {screen === 'livescores' && (
          mode === 'current' ? (
            /* CURRENT LIVE SCOREBOARD */
            <div className="p-8 space-y-6 max-w-4xl mx-auto">
              <span className="text-xs font-mono text-slate-500 uppercase tracking-widest bg-slate-900 px-3 py-1 rounded-full border border-slate-800">
                Current Live Match Engine
              </span>

              <div className="p-6 rounded-xl bg-slate-900 border border-slate-800 space-y-3">
                <h3 className="font-bold text-white text-lg">London XI vs Surrey Strikers</h3>
                <p className="text-xs text-slate-400">Over 14.2 • London XI 142/3</p>
                <div className="text-xs text-slate-300 font-mono">Batter: S. Smith 54* (32b)</div>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 text-xs text-slate-400">
                <p className="font-semibold text-slate-300 mb-1">UX Assessment Note:</p>
                Lacks stadium-optimized high-contrast digital fonts and color-coded ball-by-ball timeline wheels.
              </div>
            </div>
          ) : (
            /* REDESIGNED STADIUM-HIGH-CONTRAST LIVE SCOREBOARD */
            <div className="p-6 sm:p-8 space-y-6">
              
              {/* High Contrast Digital Score Header */}
              <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-slate-950 p-6 rounded-2xl border border-slate-800 space-y-6 shadow-xl">
                
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div className="flex items-center space-x-2">
                    <span className="w-3 h-3 rounded-full bg-red-500 animate-ping"></span>
                    <span className="font-mono text-xs font-bold text-red-400 uppercase">LIVE • INNINGS 1</span>
                  </div>
                  <span className="text-xs font-mono text-slate-400">UK Premier League Cup 2026</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                  
                  <div className="space-y-1">
                    <h2 className="text-xl font-bold font-oswald text-slate-300 uppercase">
                      London Cricket Academy
                    </h2>
                    <div className="text-4xl sm:text-5xl font-bold font-mono text-white tracking-wider">
                      168<span className="text-2xl text-[#FA4D14]">/4</span>
                    </div>
                    <p className="text-xs text-slate-400 font-mono">
                      Overs: 16.4 / 20.0 • Run Rate: <strong className="text-emerald-400">10.08</strong>
                    </p>
                  </div>

                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-800/80 space-y-3 text-xs">
                    <div className="flex justify-between text-slate-300 font-mono">
                      <span>BATTER: <strong>S. Smith*</strong></span>
                      <span className="text-orange-400">62* (34b) • 6x4, 3x6</span>
                    </div>
                    <div className="flex justify-between text-slate-300 font-mono">
                      <span>BOWLER: <strong>A. Sharma</strong></span>
                      <span className="text-emerald-400">3.4 overs • 2/28</span>
                    </div>
                  </div>

                </div>

                {/* Over Ball-by-Ball Timeline Wheel */}
                <div className="space-y-2 pt-2 border-t border-slate-800">
                  <span className="text-[11px] font-mono text-slate-400 block uppercase">
                    CURRENT OVER (16th):
                  </span>
                  <div className="flex items-center space-x-2">
                    {['1', '4', '0', 'W', '6', '1'].map((ball, idx) => (
                      <div
                        key={idx}
                        className={`w-9 h-9 rounded-full flex items-center justify-center font-mono text-xs font-bold shadow ${
                          ball === 'W'
                            ? 'bg-red-500 text-white'
                            : ball === '6'
                            ? 'bg-[#FA4D14] text-white'
                            : ball === '4'
                            ? 'bg-emerald-500 text-white'
                            : 'bg-slate-800 text-slate-300 border border-slate-700'
                        }`}
                      >
                        {ball}
                      </div>
                    ))}
                    <span className="text-xs text-slate-400 font-mono pl-2">= 12 Runs</span>
                  </div>
                </div>

              </div>

            </div>
          )
        )}

      </div>

      {/* Video Reel Preview Modal */}
      {selectedVideoUrl && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6 max-w-md w-full space-y-4 relative shadow-2xl">
            <button
              onClick={() => setSelectedVideoUrl(null)}
              className="absolute top-4 right-4 p-1 rounded-lg text-slate-400 hover:text-white bg-slate-800"
            >
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-lg font-bold font-oswald text-white">
              Video Reel: {selectedVideoUrl}
            </h3>
            <div className="bg-slate-950 rounded-xl h-48 flex items-center justify-center border border-slate-800 text-slate-400 text-xs">
              <Play className="w-10 h-10 text-[#FA4D14] animate-bounce" />
            </div>
            <p className="text-xs text-slate-400">
              Verified match clip attached to Sportzicon official tournament log ID #92018.
            </p>
          </div>
        </div>
      )}

      {/* Omni Command-K Search Modal */}
      {isSearchOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-start justify-center pt-20 p-4">
          <div className="bg-slate-900 rounded-2xl border border-slate-800 p-4 max-w-xl w-full space-y-4 shadow-2xl relative">
            <div className="flex items-center space-x-3 bg-slate-950 px-3.5 py-2.5 rounded-xl border border-slate-800">
              <Search className="w-5 h-5 text-[#FA4D14]" />
              <input
                type="text"
                placeholder="Search athletes, clubs, trials, live matches..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent text-sm text-white focus:outline-none"
                autoFocus
              />
              <button onClick={() => setIsSearchOpen(false)} className="text-xs text-slate-500 hover:text-white">
                ESC
              </button>
            </div>

            <div className="space-y-2 text-xs">
              <span className="text-slate-500 font-mono text-[10px] block">SUGGESTED RESULTS</span>
              <div className="p-2.5 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 flex justify-between items-center cursor-pointer">
                <div>
                  <span className="font-bold text-white block">Aria Sharma (Under-19 Fast Bowler)</span>
                  <span className="text-slate-400">Verified Athlete • London, UK</span>
                </div>
                <span className="text-[#FA4D14] font-mono">Scorecard →</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 flex justify-between items-center cursor-pointer">
                <div>
                  <span className="font-bold text-white block">Apex Cricket Academy & Club</span>
                  <span className="text-slate-400">Pro Club • Open Trials Available</span>
                </div>
                <span className="text-[#FA4D14] font-mono">View Club →</span>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
