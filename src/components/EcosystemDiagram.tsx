import React, { useState } from 'react';
import { UserCheck, Search, Trophy, Award, ShieldCheck, ArrowRight, Zap, RefreshCw, CheckCircle2 } from 'lucide-react';

export const EcosystemDiagram: React.FC = () => {
  const [activePath, setActivePath] = useState<'all' | 'athlete' | 'scout' | 'club' | 'scorer'>('all');

  return (
    <div className="bg-white rounded-3xl border border-[#E2E8F0] p-6 sm:p-10 space-y-8 shadow-sm relative overflow-hidden text-[#0F172A]">
      
      {/* Background Subtle Accent */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-[#EA580C]/5 rounded-full blur-3xl pointer-events-none"></div>

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10 border-b border-[#E2E8F0] pb-6">
        <div>
          <div className="flex items-center space-x-2 mb-1">
            <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-full bg-[#EA580C]/10 text-[#EA580C] border border-[#EA580C]/25 uppercase tracking-wide">
              ECOSYSTEM NETWORK ARCHITECTURE
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold font-oswald text-[#0F172A] uppercase tracking-tight">
            How The Sportzicon Network Connects
          </h2>
          <p className="text-[#475569] text-xs sm:text-sm mt-1 max-w-2xl">
            Interactive visual flow: Click any stakeholder path to trace how data, verification, and recruitment contracts circulate in real time.
          </p>
        </div>

        {/* Path Filter Buttons */}
        <div className="flex flex-wrap items-center gap-2 bg-[#F8FAFC] p-1.5 rounded-2xl border border-[#E2E8F0]">
          <button
            onClick={() => setActivePath('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activePath === 'all'
                ? 'bg-[#0F172A] text-white shadow-sm'
                : 'text-[#475569] hover:text-[#0F172A]'
            }`}
          >
            Full Network
          </button>
          <button
            onClick={() => setActivePath('athlete')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activePath === 'athlete'
                ? 'bg-[#EA580C] text-white shadow-sm'
                : 'text-[#475569] hover:text-[#0F172A]'
            }`}
          >
            1. Athletes
          </button>
          <button
            onClick={() => setActivePath('club')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activePath === 'club'
                ? 'bg-[#D97706] text-white shadow-sm'
                : 'text-[#475569] hover:text-[#0F172A]'
            }`}
          >
            2. Academies
          </button>
          <button
            onClick={() => setActivePath('scout')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activePath === 'scout'
                ? 'bg-[#0F172A] text-white shadow-sm'
                : 'text-[#475569] hover:text-[#0F172A]'
            }`}
          >
            3. Scouts
          </button>
          <button
            onClick={() => setActivePath('scorer')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activePath === 'scorer'
                ? 'bg-[#059669] text-white shadow-sm'
                : 'text-[#475569] hover:text-[#0F172A]'
            }`}
          >
            4. Organizers
          </button>
        </div>
      </div>

      {/* Visual Interactive Diagram Stage */}
      <div className="relative bg-[#F8FAFC] rounded-2xl border border-[#E2E8F0] p-6 sm:p-8 space-y-8">
        
        {/* SVG Animated Connector Rays */}
        <div className="hidden lg:block absolute inset-0 pointer-events-none z-0">
          <svg className="w-full h-full" viewBox="0 0 1000 400" fill="none">
            {/* Center Hub Lines */}
            <path
              d="M 220 120 L 500 200 M 780 120 L 500 200 M 220 280 L 500 200 M 780 280 L 500 200"
              stroke="#CBD5E1"
              strokeWidth="2"
              strokeDasharray="6 6"
            />
            {/* Active Path Highlight Glow */}
            {(activePath === 'all' || activePath === 'athlete') && (
              <path
                d="M 220 120 L 500 200"
                stroke="#EA580C"
                strokeWidth="3.5"
                className="animate-pulse"
              />
            )}
            {(activePath === 'all' || activePath === 'club') && (
              <path
                d="M 220 280 L 500 200"
                stroke="#D97706"
                strokeWidth="3.5"
                className="animate-pulse"
              />
            )}
            {(activePath === 'all' || activePath === 'scout') && (
              <path
                d="M 780 120 L 500 200"
                stroke="#0F172A"
                strokeWidth="3.5"
                className="animate-pulse"
              />
            )}
            {(activePath === 'all' || activePath === 'scorer') && (
              <path
                d="M 780 280 L 500 200"
                stroke="#059669"
                strokeWidth="3.5"
                className="animate-pulse"
              />
            )}
          </svg>
        </div>

        {/* 4 Outer Nodes Grid + Central Verification Hub */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10 items-center">
          
          {/* NODE 1: Athlete CV Node */}
          <div
            onClick={() => setActivePath('athlete')}
            className={`p-5 rounded-2xl border transition-all cursor-pointer space-y-3 ${
              activePath === 'athlete' || activePath === 'all'
                ? 'bg-white border-[#EA580C] shadow-md ring-1 ring-[#EA580C]/30'
                : 'bg-white/80 border-[#E2E8F0] opacity-70 hover:opacity-100'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-xl bg-[#FFF7ED] border border-[#FFEDD5] text-[#EA580C] flex items-center justify-center font-bold">
                <UserCheck className="w-5 h-5 text-[#EA580C]" />
              </div>
              <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-[#EA580C] text-white">
                1. ATHLETES
              </span>
            </div>
            <div>
              <h3 className="font-bold font-oswald text-[#0F172A] text-lg uppercase">
                Talent & Exposure
              </h3>
              <p className="text-xs text-[#1E293B] font-medium mt-1 leading-relaxed">
                Showcase talent with a verified cricket profile, highlight videos, match stats, and grab trial & contract opportunities.
              </p>
            </div>
            <div className="text-[11px] font-mono text-[#EA580C] font-bold flex items-center gap-1 pt-1 border-t border-[#F1F5F9]">
              <span>Apply & Get Discovered</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* CENTRAL NODE: Sportzicon Verification Core */}
          <div className="bg-gradient-to-b from-white to-[#FFFBF7] text-[#0F172A] p-6 rounded-3xl border-2 border-[#EA580C] shadow-lg text-center space-y-3 lg:col-span-1 my-2 md:my-0 relative overflow-hidden">
            <div className="w-12 h-12 rounded-2xl bg-[#EA580C] mx-auto flex items-center justify-center text-white shadow-md">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <div>
              <span className="text-[10px] font-mono text-[#EA580C] font-extrabold tracking-widest uppercase block">
                CRICKET NETWORK ENGINE
              </span>
              <h3 className="font-extrabold font-oswald text-2xl uppercase text-[#0F172A] mt-0.5">
                Sportzicon Trust Hub
              </h3>
            </div>
            <p className="text-xs text-[#1E293B] font-medium leading-relaxed font-sans">
              Maintains verified player profiles, tournament match records, academy rosters, and scout endorsements.
            </p>
            <div className="inline-flex items-center space-x-1 px-3.5 py-1 rounded-full bg-[#EA580C]/10 text-[#EA580C] border border-[#EA580C]/30 font-mono text-[10px] font-bold">
              <Zap className="w-3.5 h-3.5 text-[#EA580C]" />
              <span>Verified Cricket Network</span>
            </div>
          </div>

          {/* NODE 2: Academies Node */}
          <div
            onClick={() => setActivePath('club')}
            className={`p-5 rounded-2xl border transition-all cursor-pointer space-y-3 ${
              activePath === 'club' || activePath === 'all'
                ? 'bg-white border-[#D97706] shadow-md ring-1 ring-[#D97706]/30'
                : 'bg-white/80 border-[#E2E8F0] opacity-70 hover:opacity-100'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-xl bg-[#FEF3C7] border border-[#FDE68A] text-[#D97706] flex items-center justify-center font-bold">
                <Trophy className="w-5 h-5 text-[#D97706]" />
              </div>
              <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-[#D97706] text-white">
                2. ACADEMIES
              </span>
            </div>
            <div>
              <h3 className="font-bold font-oswald text-[#0F172A] text-lg uppercase">
                Roster & Trials Hub
              </h3>
              <p className="text-sm text-[#1E293B] font-medium mt-1 leading-relaxed">
                Release announcements, post trials, post job openings, manage player data, and register for major tournaments.
              </p>
            </div>
            <div className="text-xs font-mono text-[#D97706] font-bold flex items-center gap-1 pt-1.5 border-t border-[#F1F5F9]">
              <span>Manage Roster & Trials</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* NODE 3: Scouts Search Node */}
          <div
            onClick={() => setActivePath('scout')}
            className={`p-5 rounded-2xl border transition-all cursor-pointer space-y-3 ${
              activePath === 'scout' || activePath === 'all'
                ? 'bg-white border-[#0F172A] shadow-md ring-1 ring-[#0F172A]/30'
                : 'bg-white/80 border-[#E2E8F0] opacity-70 hover:opacity-100'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-xl bg-[#F1F5F9] border border-[#CBD5E1] text-[#0F172A] flex items-center justify-center font-bold">
                <Search className="w-5 h-5 text-[#0F172A]" />
              </div>
              <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-[#0F172A] text-white">
                3. SCOUTS
              </span>
            </div>
            <div>
              <h3 className="font-bold font-oswald text-[#0F172A] text-lg uppercase">
                Talent Identification
              </h3>
              <p className="text-sm text-[#1E293B] font-medium mt-1 leading-relaxed">
                Find talent, review complete career histories and match performance scorelogs, and log official scout evaluations.
              </p>
            </div>
            <div className="text-xs font-mono text-[#0F172A] font-bold flex items-center gap-1 pt-1.5 border-t border-[#F1F5F9]">
              <span>Scout & Endorse Talent</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* NODE 4: Organizers Node */}
          <div
            onClick={() => setActivePath('scorer')}
            className={`p-5 rounded-2xl border transition-all cursor-pointer space-y-3 ${
              activePath === 'scorer' || activePath === 'all'
                ? 'bg-white border-[#059669] shadow-md ring-1 ring-[#059669]/30'
                : 'bg-white/80 border-[#E2E8F0] opacity-70 hover:opacity-100'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-xl bg-[#D1FAE5] border border-[#A7F3D0] text-[#059669] flex items-center justify-center font-bold">
                <Award className="w-5 h-5 text-[#059669]" />
              </div>
              <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-[#059669] text-white">
                4. ORGANIZERS
              </span>
            </div>
            <div>
              <h3 className="font-bold font-oswald text-[#0F172A] text-lg uppercase">
                Match & Tournament Ops
              </h3>
              <p className="text-sm text-[#1E293B] font-medium mt-1 leading-relaxed">
                Organize tournaments or matches, manage fixtures, and log live match scores that update player career records.
              </p>
            </div>
            <div className="text-xs font-mono text-[#059669] font-bold flex items-center gap-1 pt-1.5 border-t border-[#F1F5F9]">
              <span>Host & Score Tournaments</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>

        </div>

        {/* Active Path Description Callout */}
        <div className="bg-white p-4.5 rounded-xl border border-[#CBD5E1] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-sm font-sans">
          <div className="flex items-center space-x-2.5 text-[#0F172A]">
            <CheckCircle2 className="w-5 h-5 text-[#FA4D14] shrink-0" />
            <span className="font-semibold text-slate-800 leading-snug">
              {activePath === 'all' && 'Full Ecosystem Sync: All 4 stakeholder portals communicate seamlessly via Sportzicon verification.'}
              {activePath === 'athlete' && 'Athlete Flow: Profile Creation → Speed Sensor Verification → Video Reel Indexing → Public Scouting Card.'}
              {activePath === 'scout' && 'Scout Path: Filter Discovery → Radar Spec Assessment → Video Reel Review → Endorsement Logging.'}
              {activePath === 'club' && 'Club Trial: Opening Publication → 1-Click Candidate Intake → Shortlisting → Contract Award.'}
              {activePath === 'scorer' && 'Live Scorer: Official Ball-by-ball Entry → Speed Recording → Real-time Profile Stat Refresh.'}
            </span>
          </div>

          <button
            onClick={() => setActivePath('all')}
            className="text-xs text-[#FA4D14] hover:underline font-bold flex items-center gap-1 shrink-0 ml-2 font-mono"
          >
            <RefreshCw className="w-3 h-3" /> Reset Diagram
          </button>
        </div>

      </div>

    </div>
  );
};
