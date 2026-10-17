import React, { useState } from 'react';
import { ViewTab, UserRoleMode, Athlete } from '../types';
import { EcosystemDiagram } from './EcosystemDiagram';
import { Search, ShieldCheck, Sparkles, ArrowRight, UserCheck, Award, Trophy } from 'lucide-react';

interface HeroBannerProps {
  setActiveTab: (tab: ViewTab) => void;
  setUserRole: (role: UserRoleMode) => void;
  featuredAthletes: Athlete[];
  onSelectAthlete: (athlete: Athlete) => void;
  onSearchQuery: (query: string) => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  setActiveTab,
  setUserRole,
  featuredAthletes,
  onSelectAthlete,
  onSearchQuery,
}) => {
  const [quickQuery, setQuickQuery] = useState('');

  const handleQuickSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearchQuery(quickQuery);
    setActiveTab('search');
  };

  return (
    <div className="space-y-16 animate-fade-in text-left">
      
      {/* Main Hero Banner - Dark Navy Slate Executive Banner */}
      <div className="relative rounded-3xl bg-[#0F172A] text-white border border-[#1E293B] p-6 sm:p-12 overflow-hidden shadow-xl">
        
        {/* Subtle Background Accent */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#FA4D14]/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>

        <div className="relative z-10 max-w-4xl space-y-6">
          
          {/* Eyebrow Label & Display Heading */}
          <div className="space-y-3">
            <div className="text-overline text-[#FA4D14] flex items-center space-x-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>The Global Sports Ecosystem</span>
            </div>

            <h1 className="text-display text-white tracking-tight">
              Where talent gets seen. <br className="hidden sm:inline" />
              <span className="text-slate-300">An ecosystem where everything gets built.</span>
            </h1>
          </div>

          {/* Subhead Paragraph */}
          <p className="text-body-lg text-slate-300 max-w-[65ch]">
            Sportzicon is where athletic talent is discovered — a complete sports ecosystem connecting every individual, athlete, academy, scout, organizer, and fan directly to their sport.
          </p>

          {/* Primary & Secondary Action CTAs */}
          <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            <button
              onClick={() => {
                setUserRole('athlete');
                setActiveTab('search');
              }}
              className="px-6 py-3.5 rounded-xl bg-[#FA4D14] hover:bg-[#E03A00] text-white font-semibold text-[15px] tracking-[0.01em] transition-all shadow-md flex items-center justify-center space-x-2 cursor-pointer"
            >
              <span>Create your profile</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => {
                setUserRole('scout');
                setActiveTab('opportunities');
              }}
              className="px-6 py-3.5 rounded-xl bg-[#1E293B] hover:bg-[#334155] text-slate-200 border border-[#334155] font-semibold text-[15px] tracking-[0.01em] transition-all flex items-center justify-center cursor-pointer"
            >
              <span>For clubs & scouts</span>
            </button>
          </div>

          {/* Verified Feature Trust Strip */}
          <div className="pt-4 flex flex-wrap items-center gap-6 text-xs font-semibold text-slate-300 border-t border-[#1E293B]">
            <div className="flex items-center space-x-1.5">
              <span className="text-[#FA4D14] font-bold">✓</span>
              <span>Verified player</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <span className="text-[#FA4D14] font-bold">✓</span>
              <span>Verified club</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <span className="text-[#FA4D14] font-bold">✓</span>
              <span>Verified stats</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <span className="text-[#FA4D14] font-bold">✓</span>
              <span>Verified scout</span>
            </div>
          </div>

          {/* Interactive Network Search Bar */}
          <form onSubmit={handleQuickSearchSubmit} className="pt-2 flex flex-col sm:flex-row items-stretch gap-3 max-w-2xl">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-3.5 w-5 h-5 text-slate-400" />
              <input
                type="text"
                value={quickQuery}
                onChange={(e) => setQuickQuery(e.target.value)}
                placeholder="Search cricketers, state associations, or academies..."
                className="w-full pl-12 pr-4 py-3 rounded-xl bg-[#1E293B] border border-[#334155] text-white placeholder-slate-400 text-base focus:outline-none focus:border-[#FA4D14] transition-all"
              />
            </div>
            <button
              type="submit"
              className="px-6 py-3 rounded-xl bg-[#FA4D14] hover:bg-[#E03A00] text-white font-semibold text-[15px] tracking-[0.01em] transition-all shadow-md flex items-center justify-center space-x-2 cursor-pointer shrink-0"
            >
              <span>Explore network</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Ecosystem Metrics Ticker - High Contrast Tabular Numerals */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-[#1E293B]">
            <div className="bg-[#1E293B] p-4 rounded-xl border border-[#334155]">
              <span className="text-2xl sm:text-3xl font-bold text-white block tabular-nums">12,480+</span>
              <span className="text-slate-400 text-xs font-medium mt-1 block">Verified Athletes</span>
            </div>
            <div className="bg-[#1E293B] p-4 rounded-xl border border-[#334155]">
              <span className="text-2xl sm:text-3xl font-bold text-white block tabular-nums">890+</span>
              <span className="text-slate-400 text-xs font-medium mt-1 block">Associations & Clubs</span>
            </div>
            <div className="bg-[#1E293B] p-4 rounded-xl border border-[#334155]">
              <span className="text-2xl sm:text-3xl font-bold text-white block tabular-nums">340+</span>
              <span className="text-slate-400 text-xs font-medium mt-1 block">Certified Scouts</span>
            </div>
            <div className="bg-[#1E293B] p-4 rounded-xl border border-[#334155]">
              <span className="text-2xl sm:text-3xl font-bold text-[#FA4D14] block tabular-nums">4,200+</span>
              <span className="text-slate-400 text-xs font-medium mt-1 block">Network Connections</span>
            </div>
          </div>

        </div>
      </div>

      {/* Interactive Connected Network Diagram */}
      <EcosystemDiagram />

      {/* The 4 Pillars of Sportzicon Ecosystem - Elegant Cards */}
      <div className="space-y-6">
        <div>
          <div className="text-overline text-[#FA4D14] mb-1">Core Architecture</div>
          <h2 className="text-h2 text-[#0F172A] flex items-center gap-2">
            <ShieldCheck className="w-6 h-6 text-[#FA4D14]" />
            The 4 Pillars of Sportzicon Ecosystem
          </h2>
          <p className="text-body text-[#64748B] mt-1 max-w-[65ch]">
            Built specifically for structured athletic evaluation and verified recruitment.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          
          {/* Athlete Gateway */}
          <div
            onClick={() => {
              setUserRole('athlete');
              setActiveTab('search');
            }}
            className="bg-white rounded-2xl border border-[#CBD5E1] p-6 space-y-3 hover:border-[#FA4D14] hover:shadow-md transition-all cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-[#F8FAFC] border border-[#CBD5E1] flex items-center justify-center text-[#0F172A] group-hover:bg-[#FA4D14] group-hover:text-white transition-colors">
              <UserCheck className="w-5 h-5" />
            </div>
            <h3 className="text-h3 text-[#0F172A] group-hover:text-[#FA4D14] transition-colors">
              1. Structured Profiles
            </h3>
            <p className="text-small text-[#64748B] leading-relaxed">
              Verified performance metrics, ball speeds, video highlight reels, and radar charts in one structured CV.
            </p>
            <div className="pt-2 text-xs font-semibold text-[#FA4D14] flex items-center gap-1">
              <span>View profile engine</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Scout Gateway */}
          <div
            onClick={() => {
              setUserRole('scout');
              setActiveTab('search');
            }}
            className="bg-white rounded-2xl border border-[#CBD5E1] p-6 space-y-3 hover:border-[#FA4D14] hover:shadow-md transition-all cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-[#F8FAFC] border border-[#CBD5E1] flex items-center justify-center text-[#0F172A] group-hover:bg-[#FA4D14] group-hover:text-white transition-colors">
              <Search className="w-5 h-5" />
            </div>
            <h3 className="text-h3 text-[#0F172A] group-hover:text-[#FA4D14] transition-colors">
              2. Talent Search
            </h3>
            <p className="text-small text-[#64748B] leading-relaxed">
              Filter by ball speed, sprint timing, age group, strike rate, and scout notes without noise.
            </p>
            <div className="pt-2 text-xs font-semibold text-[#FA4D14] flex items-center gap-1">
              <span>Launch talent search</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Club Gateway */}
          <div
            onClick={() => {
              setUserRole('club');
              setActiveTab('opportunities');
            }}
            className="bg-white rounded-2xl border border-[#CBD5E1] p-6 space-y-3 hover:border-[#FA4D14] hover:shadow-md transition-all cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-[#F8FAFC] border border-[#CBD5E1] flex items-center justify-center text-[#0F172A] group-hover:bg-[#FA4D14] group-hover:text-white transition-colors">
              <Trophy className="w-5 h-5" />
            </div>
            <h3 className="text-h3 text-[#0F172A] group-hover:text-[#FA4D14] transition-colors">
              3. Recruitment Workflows
            </h3>
            <p className="text-small text-[#64748B] leading-relaxed">
              Post academy trials, receive structured candidate applications, review video reels, and issue contracts.
            </p>
            <div className="pt-2 text-xs font-semibold text-[#FA4D14] flex items-center gap-1">
              <span>Browse openings</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Tournament Official Gateway */}
          <div
            onClick={() => {
              setUserRole('scorer');
              setActiveTab('livescores');
            }}
            className="bg-white rounded-2xl border border-[#CBD5E1] p-6 space-y-3 hover:border-[#FA4D14] hover:shadow-md transition-all cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-[#F8FAFC] border border-[#CBD5E1] flex items-center justify-center text-[#0F172A] group-hover:bg-[#FA4D14] group-hover:text-white transition-colors">
              <Award className="w-5 h-5" />
            </div>
            <h3 className="text-h3 text-[#0F172A] group-hover:text-[#FA4D14] transition-colors">
              4. Live Scoring Engine
            </h3>
            <p className="text-small text-[#64748B] leading-relaxed">
              Ball-by-ball tournament scoring that automatically feeds verified statistics directly into candidate profiles.
            </p>
            <div className="pt-2 text-xs font-semibold text-[#FA4D14] flex items-center gap-1">
              <span>Open live scorer</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>

        </div>
      </div>

      {/* Featured Verified Prospects Section */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="text-overline text-[#FA4D14] mb-1">Featured Athletes</div>
            <h2 className="text-h2 text-[#0F172A] flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-[#FA4D14]" />
              Featured Verified Prospects
            </h2>
            <p className="text-body text-[#64748B] mt-1 max-w-[65ch]">
              Top-rated talent endorsed by certified scouts in the Sportzicon network.
            </p>
          </div>
          <button
            onClick={() => setActiveTab('search')}
            className="self-start sm:self-auto px-4 py-2 rounded-xl bg-[#0F172A] hover:bg-[#1E293B] text-white border border-[#334155] text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer shrink-0"
          >
            <span>View all athletes</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#FA4D14]" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredAthletes.map((athlete) => (
            <div
              key={athlete.id}
              onClick={() => onSelectAthlete(athlete)}
              className="bg-white rounded-2xl border border-[#CBD5E1] p-6 space-y-4 hover:border-[#FA4D14] hover:shadow-md transition-all cursor-pointer group relative"
            >
              {/* Card Header Row */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center space-x-3 min-w-0">
                  <img
                    src={athlete.avatar}
                    alt={athlete.name}
                    className="w-12 h-12 rounded-xl object-cover border border-[#CBD5E1] shrink-0"
                  />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center space-x-2">
                      <span className="text-overline text-[#64748B]">
                        {athlete.sport || 'Cricket'}
                      </span>
                      <span className="text-xs text-[#64748B] tabular-nums">· Age {athlete.age}</span>
                    </div>
                    <h3 className="text-h3 text-[#0F172A] group-hover:text-[#FA4D14] transition-colors truncate">
                      {athlete.name}
                    </h3>
                    <p className="text-small text-[#64748B] truncate">
                      {athlete.primaryRole}
                    </p>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <div className="flex items-center justify-end space-x-1 text-[#0F172A] font-semibold text-xs tabular-nums">
                    <span className="text-amber-500">★</span>
                    <span>{athlete.rating}</span>
                  </div>
                  <span className="text-xs text-[#64748B] block mt-0.5">{athlete.location}</span>
                </div>
              </div>

              {/* Club / Academy & Top Benchmark Box */}
              <div className="bg-[#F8FAFC] p-3.5 rounded-xl border border-[#CBD5E1] space-y-2 text-xs">
                <div className="flex justify-between items-center gap-2">
                  <span className="text-[#64748B]">Club / Academy:</span>
                  <span className="font-semibold text-[#0F172A] text-right truncate">{athlete.currentClubOrAcademy}</span>
                </div>
                <div className="flex justify-between items-center border-t border-[#CBD5E1] pt-2 gap-2">
                  <span className="text-[#64748B]">Top Benchmark:</span>
                  <span className="font-semibold text-[#0F172A] text-right tabular-nums truncate">{athlete.topBenchmark || athlete.topSpeedOrMetric}</span>
                </div>
              </div>

              {/* Bio Quote */}
              <p className="text-small italic text-[#475569] line-clamp-2 leading-relaxed">
                "{athlete.bio}"
              </p>

              {/* Match Form & Skill Index Bar */}
              <div className="space-y-1.5 pt-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[#64748B] font-medium">Match Form & Skill Index</span>
                  <span className="font-semibold text-[#0F172A] tabular-nums">{athlete.performanceIndex || 92} / 100</span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-[#E2E8F0] overflow-hidden">
                  <div
                    className="h-full bg-[#FA4D14] rounded-full transition-all duration-500"
                    style={{ width: `${athlete.performanceIndex || 92}%` }}
                  ></div>
                </div>
              </div>

              {/* Card Footer Row */}
              <div className="flex items-center justify-between text-xs pt-3 border-t border-[#CBD5E1]">
                <div className="flex items-center space-x-1.5 text-[#0F172A] font-medium tabular-nums">
                  <ShieldCheck className="w-4 h-4 text-[#FA4D14]" />
                  <span>{athlete.scoutEndorsements} Scout Notes</span>
                </div>

                <div className="text-[#FA4D14] font-semibold flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                  <span>View profile</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>

            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
