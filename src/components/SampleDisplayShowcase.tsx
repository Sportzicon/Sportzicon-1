import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Search, 
  Trophy, 
  Activity, 
  Award, 
  Sparkles, 
  Building2, 
  ArrowRight, 
  Filter, 
  UserCheck, 
  TrendingUp, 
  Zap, 
  Layers, 
  Eye, 
  ChevronRight,
  ExternalLink,
  MessageSquare,
  Share2,
  CheckCircle2,
  ListFilter
} from 'lucide-react';
import { Athlete } from '../types';

interface SampleDisplayShowcaseProps {
  athletes: Athlete[];
  onSelectAthlete: (athlete: Athlete) => void;
  setActiveTab: (tab: any) => void;
}

export const SampleDisplayShowcase: React.FC<SampleDisplayShowcaseProps> = ({
  athletes,
  onSelectAthlete,
  setActiveTab,
}) => {
  const [activeSample, setActiveSample] = useState<'network' | 'scouting' | 'tournament'>('network');

  return (
    <div className="space-y-8 animate-fade-in text-[#0F172A]">
      
      {/* Sample UI/UX Display Mode Bar */}
      <div className="bg-[#0F172A] text-white rounded-3xl p-6 sm:p-8 border border-[#1E293B] shadow-lg space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <span className="px-3 py-1 rounded-full bg-[#FA4D14] text-white text-xs font-mono font-bold uppercase tracking-wider">
                UI/UX SAMPLE DISPLAY SHOWCASE
              </span>
              <span className="px-3 py-1 rounded-full bg-[#1E293B] text-slate-200 border border-[#334155] text-xs font-mono font-bold">
                Interactive Layout Explorer
              </span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold font-oswald uppercase tracking-tight text-white">
              Alternative <span className="text-[#FA4D14]">UI/UX Layout Displays</span>
            </h1>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl">
              Compare 3 distinct UI/UX design patterns tailored for different stakeholders in the Sportzicon Cricket Ecosystem. Click a sample style below to preview:
            </p>
          </div>

          {/* Style Selector Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 bg-[#1E293B] p-2 rounded-2xl border border-[#334155] shrink-0 font-mono text-xs">
            <button
              onClick={() => setActiveSample('network')}
              className={`px-4 py-3 rounded-xl font-bold transition-all cursor-pointer flex items-center justify-center space-x-2 ${
                activeSample === 'network'
                  ? 'bg-[#FA4D14] text-white shadow-md'
                  : 'text-slate-300 hover:text-white hover:bg-[#334155]'
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>1. Cricket Network Stream</span>
            </button>

            <button
              onClick={() => setActiveSample('scouting')}
              className={`px-4 py-3 rounded-xl font-bold transition-all cursor-pointer flex items-center justify-center space-x-2 ${
                activeSample === 'scouting'
                  ? 'bg-[#FA4D14] text-white shadow-md'
                  : 'text-slate-300 hover:text-white hover:bg-[#334155]'
              }`}
            >
              <Search className="w-4 h-4" />
              <span>2. Bento Scouting Matrix</span>
            </button>

            <button
              onClick={() => setActiveSample('tournament')}
              className={`px-4 py-3 rounded-xl font-bold transition-all cursor-pointer flex items-center justify-center space-x-2 ${
                activeSample === 'tournament'
                  ? 'bg-[#FA4D14] text-white shadow-md'
                  : 'text-slate-300 hover:text-white hover:bg-[#334155]'
              }`}
            >
              <Activity className="w-4 h-4" />
              <span>3. Live Match Scoreboard</span>
            </button>
          </div>
        </div>
      </div>

      {/* SAMPLE DISPLAY 1: Cricket Network Stream (LinkedIn Style) */}
      {activeSample === 'network' && (
        <div className="space-y-6">
          <div className="bg-[#FAF7F2] rounded-2xl border border-[#CBD5E1] p-4 flex items-center justify-between text-xs font-mono">
            <div className="flex items-center space-x-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#FA4D14]"></span>
              <span className="font-bold text-[#0F172A] uppercase">Display Style 1: Modern Cream Editorial Stream</span>
            </div>
            <span className="text-[#64748B] hidden sm:inline">Optimized for social engagement, trial posts, and state association announcements.</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Left Column: Association Hub */}
            <div className="lg:col-span-4 space-y-5">
              <div className="bg-white rounded-2xl border border-[#CBD5E1] p-5 space-y-4 shadow-sm">
                <div className="flex items-center justify-between pb-3 border-b border-[#E2E8F0]">
                  <h3 className="font-bold text-[#0F172A] text-sm font-oswald uppercase flex items-center gap-2">
                    <Building2 className="w-4.5 h-4.5 text-[#FA4D14]" />
                    State Governing Bodies
                  </h3>
                  <span className="text-xs font-mono font-bold text-[#FA4D14]">Official</span>
                </div>

                <div className="space-y-3">
                  <div className="p-3 rounded-xl bg-[#FAF7F2] border border-[#E2E8F0] space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-sm text-[#0F172A]">Mumbai Cricket Association</span>
                      <ShieldCheck className="w-4 h-4 text-[#FA4D14]" />
                    </div>
                    <p className="text-xs text-[#334155]">14 Official Trials Active • 12,400 Followers</p>
                    <button 
                      onClick={() => setActiveTab('newsfeed')}
                      className="w-full py-1.5 rounded-lg bg-[#0F172A] text-white font-mono text-xs font-bold hover:bg-[#1E293B]"
                    >
                      Connect with MCA
                    </button>
                  </div>

                  <div className="p-3 rounded-xl bg-[#FAF7F2] border border-[#E2E8F0] space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-sm text-[#0F172A]">Karnataka State CA</span>
                      <ShieldCheck className="w-4 h-4 text-[#FA4D14]" />
                    </div>
                    <p className="text-xs text-[#334155]">8 Selection Camps • 9,800 Followers</p>
                    <button 
                      onClick={() => setActiveTab('newsfeed')}
                      className="w-full py-1.5 rounded-lg bg-[#0F172A] text-white font-mono text-xs font-bold hover:bg-[#1E293B]"
                    >
                      Connect with KSCA
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Feed Stream */}
            <div className="lg:col-span-8 space-y-5">
              <div className="bg-white rounded-2xl border border-[#CBD5E1] p-6 space-y-4 shadow-sm">
                <div className="flex items-center space-x-3 pb-3 border-b border-[#E2E8F0]">
                  <div className="w-10 h-10 rounded-full bg-[#FA4D14] text-white font-bold flex items-center justify-center font-oswald">
                    MCA
                  </div>
                  <div>
                    <h4 className="font-bold text-[#0F172A] text-base font-oswald uppercase">Mumbai Cricket Association</h4>
                    <span className="text-xs text-[#64748B]">State Governing Body • 2h ago</span>
                  </div>
                </div>

                <p className="text-sm text-[#1E293B] leading-relaxed">
                  📢 Official Announcement: Maharashtra State U-19 Championship Selection Trials registration is now active. All affiliated club bowlers with certified speeds over 130 km/h can submit candidate cards.
                </p>

                <div className="bg-[#FFF7ED] border border-[#FFEDD5] rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 font-mono text-xs">
                  <div>
                    <span className="font-bold text-[#0F172A] text-sm block">U-19 Selection Trials 2026</span>
                    <span className="text-[#64748B]">Venue: Wankhede Stadium Practice Nets</span>
                  </div>
                  <button 
                    onClick={() => setActiveTab('opportunities')}
                    className="px-4 py-2 rounded-xl bg-[#FA4D14] text-white font-bold hover:bg-orange-600 shrink-0"
                  >
                    Apply via Sportzicon Profile
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* SAMPLE DISPLAY 2: Bento Scouting Matrix */}
      {activeSample === 'scouting' && (
        <div className="space-y-6">
          <div className="bg-[#FAF7F2] rounded-2xl border border-[#CBD5E1] p-4 flex items-center justify-between text-xs font-mono">
            <div className="flex items-center space-x-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#0F172A]"></span>
              <span className="font-bold text-[#0F172A] uppercase">Display Style 2: High-Density Bento Matrix</span>
            </div>
            <span className="text-[#64748B] hidden sm:inline">Optimized for franchise analysts, speed metrics, radar charts, and scout reviews.</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Bento Card 1: Top Prospect */}
            <div className="bg-white rounded-3xl border border-[#CBD5E1] p-6 space-y-4 shadow-sm hover:border-[#FA4D14] transition-all">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full bg-[#FA4D14] text-white text-xs font-mono font-bold">
                  RANK #1 PROSPECT
                </span>
                <span className="text-xs font-mono font-bold text-[#0F172A]">138.5 km/h</span>
              </div>

              <div>
                <h3 className="font-bold font-oswald text-xl uppercase text-[#0F172A]">Rohan Verma</h3>
                <p className="text-xs text-[#334155] font-semibold">Right-Arm Fast Bowler • Age 19</p>
              </div>

              <div className="grid grid-cols-2 gap-2 font-mono text-xs bg-[#FAF7F2] p-3 rounded-xl border border-[#E2E8F0]">
                <div>
                  <span className="text-[#64748B] block text-[11px]">Best Spell</span>
                  <span className="font-bold text-[#0F172A]">5/18 (7.0 ov)</span>
                </div>
                <div>
                  <span className="text-[#64748B] block text-[11px]">Bowling Avg</span>
                  <span className="font-bold text-[#FA4D14]">14.20</span>
                </div>
              </div>

              <button 
                onClick={() => onSelectAthlete(athletes[0])}
                className="w-full py-2.5 rounded-xl bg-[#0F172A] hover:bg-[#1E293B] text-white font-mono text-xs font-bold transition-all"
              >
                Inspect Full Profile & Radar
              </button>
            </div>

            {/* Bento Card 2: Scout Assessment Notes */}
            <div className="bg-white rounded-3xl border border-[#CBD5E1] p-6 space-y-4 shadow-sm hover:border-[#FA4D14] transition-all">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full bg-[#0F172A] text-white text-xs font-mono font-bold">
                  SCOUT REPORT
                </span>
                <ShieldCheck className="w-5 h-5 text-[#FA4D14]" />
              </div>

              <div>
                <h3 className="font-bold font-oswald text-xl uppercase text-[#0F172A]">Sunil Joshi (Senior Scout)</h3>
                <p className="text-xs text-[#334155] font-semibold">West Zone Talent Identification</p>
              </div>

              <p className="text-xs text-[#1E293B] leading-relaxed italic bg-[#FAF7F2] p-3 rounded-xl border border-[#E2E8F0]">
                "Generates sharp bounce off good length. Clean seam position with late outswing. Prime candidate for state transition camps."
              </p>

              <button 
                onClick={() => setActiveTab('search')}
                className="w-full py-2.5 rounded-xl bg-[#FA4D14] hover:bg-orange-600 text-white font-mono text-xs font-bold transition-all"
              >
                Browse Scout Evaluation Pool
              </button>
            </div>

            {/* Bento Card 3: Video Reel Showcase */}
            <div className="bg-white rounded-3xl border border-[#CBD5E1] p-6 space-y-4 shadow-sm hover:border-[#FA4D14] transition-all">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full bg-[#059669] text-white text-xs font-mono font-bold">
                  VERIFIED REEL
                </span>
                <span className="text-xs font-mono font-bold text-[#059669]">HD 1080p</span>
              </div>

              <div>
                <h3 className="font-bold font-oswald text-xl uppercase text-[#0F172A]">Fast Bowling Spell Reel</h3>
                <p className="text-xs text-[#334155] font-semibold">DY Patil Semifinal Highlight Clip</p>
              </div>

              <div className="relative h-28 rounded-xl bg-[#0F172A] flex items-center justify-center text-white overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                <div className="relative z-10 text-center space-y-1">
                  <div className="w-10 h-10 rounded-full bg-[#FA4D14] flex items-center justify-center mx-auto text-white shadow-lg">
                    ▶
                  </div>
                  <span className="text-[11px] font-mono font-bold block">4 Wickets • Outswing Deliveries</span>
                </div>
              </div>

              <button 
                onClick={() => onSelectAthlete(athletes[0])}
                className="w-full py-2.5 rounded-xl bg-[#0F172A] hover:bg-[#1E293B] text-white font-mono text-xs font-bold transition-all"
              >
                Watch Highlight Reel
              </button>
            </div>

          </div>
        </div>
      )}

      {/* SAMPLE DISPLAY 3: Live Tournament Board */}
      {activeSample === 'tournament' && (
        <div className="space-y-6">
          <div className="bg-[#FAF7F2] rounded-2xl border border-[#CBD5E1] p-4 flex items-center justify-between text-xs font-mono">
            <div className="flex items-center space-x-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#059669]"></span>
              <span className="font-bold text-[#0F172A] uppercase">Display Style 3: Live Tournament Scoring Hub</span>
            </div>
            <span className="text-[#64748B] hidden sm:inline">Optimized for match scorers, real-time ball-by-ball updates, and fixture boards.</span>
          </div>

          <div className="bg-white rounded-3xl border border-[#CBD5E1] p-6 sm:p-8 space-y-6 shadow-sm">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E2E8F0]">
              <div>
                <span className="px-3 py-1 rounded-full bg-red-100 text-red-700 text-xs font-mono font-bold uppercase inline-flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-red-600 animate-ping"></span>
                  LIVE MATCH • OVER 14.2
                </span>
                <h3 className="text-2xl font-bold font-oswald text-[#0F172A] uppercase mt-2">
                  Apex Cricket Academy vs DY Patil Sports Club
                </h3>
              </div>

              <div className="text-right font-mono">
                <span className="text-3xl font-extrabold text-[#0F172A] block font-oswald">142/4 (14.2 ov)</span>
                <span className="text-xs text-[#64748B]">CRR: 9.91 • Target: 185</span>
              </div>
            </div>

            {/* Ball timeline */}
            <div className="space-y-2">
              <span className="text-xs font-mono font-bold text-[#334155] uppercase block">This Over (Over 15):</span>
              <div className="flex items-center space-x-2 font-mono text-sm">
                <span className="w-8 h-8 rounded-xl bg-[#F8FAFC] border border-[#CBD5E1] flex items-center justify-center font-bold text-[#0F172A]">1</span>
                <span className="w-8 h-8 rounded-xl bg-[#F8FAFC] border border-[#CBD5E1] flex items-center justify-center font-bold text-[#0F172A]">4</span>
                <span className="w-8 h-8 rounded-xl bg-[#FA4D14] text-white flex items-center justify-center font-bold shadow-sm">W</span>
                <span className="w-8 h-8 rounded-xl bg-[#FEF3C7] border border-[#FDE68A] text-[#D97706] flex items-center justify-center font-bold">6</span>
                <span className="w-8 h-8 rounded-xl bg-[#F8FAFC] border border-[#CBD5E1] flex items-center justify-center font-bold text-[#0F172A]">0</span>
                <span className="w-8 h-8 rounded-xl bg-[#F8FAFC] border border-[#CBD5E1] flex items-center justify-center font-bold text-[#0F172A]">2</span>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button 
                onClick={() => setActiveTab('livescores')}
                className="px-5 py-2.5 rounded-xl bg-[#FA4D14] hover:bg-orange-600 text-white font-mono text-xs font-bold transition-all flex items-center space-x-2"
              >
                <span>Launch Full Live Scoring Engine</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
