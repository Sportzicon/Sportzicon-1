import React from 'react';
import { AUDIT_SCORES, CRITICAL_FRICTION_POINTS } from '../data/auditData';
import { ViewTab } from '../types';
import { ShieldAlert, CheckCircle2, AlertTriangle, ArrowRight, Sparkles, Activity, Target, Zap, ShieldCheck } from 'lucide-react';

interface AuditOverviewProps {
  setActiveTab: (tab: ViewTab) => void;
}

export const AuditOverview: React.FC<AuditOverviewProps> = ({ setActiveTab }) => {
  const averageScore = Math.round(
    AUDIT_SCORES.reduce((acc, item) => acc + item.score, 0) / AUDIT_SCORES.length
  );

  return (
    <div className="space-y-8 animate-fade-in">
      
      {/* Executive Hero Banner - Executive Black & Orange Card on Cream */}
      <div className="relative overflow-hidden rounded-3xl bg-[#111827] text-white border border-[#2D3748] p-6 sm:p-8 shadow-xl">
        <div className="absolute top-0 right-0 -mt-8 -mr-8 w-64 h-64 rounded-full bg-[#FA4D14]/20 blur-3xl pointer-events-none"></div>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
          
          <div className="lg:col-span-7 space-y-4">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-[#FA4D14]/20 border border-[#FA4D14]/40 text-[#FA4D14] text-xs font-bold uppercase tracking-wider font-mono">
              <ShieldCheck className="w-4 h-4 text-[#FA4D14]" />
              <span>UX Diagnostics & Verification Audit</span>
            </div>
            
            <h1 className="text-3xl sm:text-4xl font-black font-oswald text-white uppercase tracking-tight leading-tight">
              Sportzicon (<span className="text-[#FA4D14]">sportzicon.com</span>) UI/UX Evaluation
            </h1>
            
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Analysis of Sportzicon's digital sports recruitment network. Evaluating user journeys across <strong className="text-white">Emerging Athletes</strong>, <strong className="text-white">Youth Guardians</strong>, <strong className="text-white">Club Scouts</strong>, and <strong className="text-white">Tournament Directors</strong> to unlock conversion and engagement potential.
            </p>

            <div className="flex flex-wrap gap-3 pt-2">
              <button
                onClick={() => setActiveTab('home')}
                className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-[#FA4D14] hover:bg-orange-600 text-white font-bold text-sm shadow-md transition-all group cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-white group-hover:rotate-12 transition-transform" />
                <span>Launch Interactive Redesign Prototype</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* Overall UX Health Score Dial */}
          <div className="lg:col-span-5 bg-[#1F2937] rounded-2xl border border-[#374151] p-6 flex flex-col items-center justify-center text-center shadow-inner">
            <span className="text-xs uppercase font-mono tracking-wider text-slate-400 mb-1 font-bold">
              Overall UX Health Score
            </span>
            <div className="relative my-2 flex items-center justify-center">
              <div className="text-5xl sm:text-6xl font-bold font-oswald text-white">
                {averageScore}<span className="text-2xl text-slate-400">/100</span>
              </div>
            </div>
            
            <div className="w-full bg-[#111827] h-3 rounded-full overflow-hidden my-3 border border-[#374151]">
              <div 
                className="bg-gradient-to-r from-amber-500 via-orange-500 to-[#FA4D14] h-full rounded-full transition-all duration-1000"
                style={{ width: `${averageScore}%` }}
              ></div>
            </div>

            <div className="grid grid-cols-2 gap-4 w-full mt-2 pt-3 border-t border-[#374151] text-xs font-mono">
              <div>
                <span className="text-slate-400 block">Status:</span>
                <span className="font-bold text-amber-400">Moderate Friction</span>
              </div>
              <div>
                <span className="text-slate-400 block">Primary Target:</span>
                <span className="font-bold text-[#FA4D14]">Onboarding & Search</span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Detailed Scores List */}
      <div className="bg-white rounded-3xl border border-[#E5DFD5] p-6 sm:p-8 shadow-sm space-y-4 text-[#111827]">
        <div className="flex items-center justify-between border-b border-[#E5DFD5] pb-4">
          <h3 className="text-xl font-bold font-oswald text-[#111827] uppercase tracking-wide flex items-center gap-2">
            <Target className="w-5 h-5 text-[#FA4D14]" />
            Category Score Breakdown
          </h3>
          <span className="text-xs text-[#6B7280] font-mono">6 Key Evaluation Pillars</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {AUDIT_SCORES.map((scoreItem, idx) => (
            <div key={idx} className="bg-[#FAF7F2] rounded-2xl p-4 border border-[#E5DFD5] space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-sm text-[#111827]">{scoreItem.category}</span>
                <span className={`text-[10px] font-bold font-mono px-2 py-0.5 rounded-full uppercase ${
                  scoreItem.status === 'critical' ? 'bg-red-100 text-red-800 border border-red-200' :
                  scoreItem.status === 'needs-improvement' ? 'bg-amber-100 text-amber-900 border border-amber-200' :
                  'bg-emerald-100 text-emerald-900 border border-emerald-200'
                }`}>
                  {scoreItem.status.replace('-', ' ')}
                </span>
              </div>

              <div className="w-full bg-white h-2.5 rounded-full overflow-hidden border border-[#E5DFD5]">
                <div
                  className={`h-full rounded-full ${
                    scoreItem.score < 60 ? 'bg-red-500' :
                    scoreItem.score < 75 ? 'bg-amber-500' :
                    'bg-[#FA4D14]'
                  }`}
                  style={{ width: `${scoreItem.score}%` }}
                ></div>
              </div>

              <p className="text-xs text-[#4B5563] leading-snug">
                {scoreItem.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Critical UX Friction Points */}
      <div className="bg-white rounded-3xl border border-[#E5DFD5] p-6 sm:p-8 shadow-sm text-[#111827] space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E5DFD5] pb-4">
          <div>
            <div className="flex items-center space-x-2 text-[#FA4D14] mb-1">
              <ShieldAlert className="w-5 h-5" />
              <span className="font-mono text-xs font-bold uppercase tracking-wider">Priority Diagnostics</span>
            </div>
            <h3 className="text-2xl font-bold font-oswald text-[#111827] uppercase tracking-wide">
              Top 5 High-Impact UX Friction Points
            </h3>
            <p className="text-xs text-[#6B7280] mt-1">
              Key blockers currently impacting user conversion, scout engagement, and youth athlete retention on Sportzicon.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {CRITICAL_FRICTION_POINTS.map((item) => (
            <div key={item.id} className="bg-[#FAF7F2] rounded-2xl p-5 border border-[#E5DFD5] flex flex-col justify-between space-y-4 shadow-sm">
              
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-lg bg-white border border-[#E5DFD5] text-[#111827]">
                    {item.pageSection}
                  </span>
                  <span className={`text-[10px] font-bold font-mono px-2 py-0.5 rounded-full uppercase ${
                    item.severity === 'high' ? 'bg-red-100 text-red-800 border border-red-200' : 'bg-amber-100 text-amber-800 border border-amber-200'
                  }`}>
                    {item.severity} Severity
                  </span>
                </div>

                <h4 className="text-base font-bold text-[#111827] font-oswald tracking-wide mb-1">
                  {item.title}
                </h4>

                <p className="text-xs text-red-900 bg-red-50 p-3 rounded-xl border border-red-200 mb-3 leading-relaxed">
                  <strong className="text-red-950 font-bold">Current Issue:</strong> {item.currentDesignIssue}
                </p>

                <p className="text-xs text-emerald-900 bg-emerald-50 p-3 rounded-xl border border-emerald-200 leading-relaxed">
                  <strong className="text-emerald-950 font-bold">Recommended Fix:</strong> {item.recommendation}
                </p>
              </div>

              <div className="pt-2 border-t border-[#E5DFD5] flex items-center justify-between text-[11px] text-[#6B7280] font-mono">
                <span>UX Principle:</span>
                <span className="text-[#FA4D14] font-bold">{item.uxPrincipleViolated}</span>
              </div>

            </div>
          ))}
        </div>

      </div>

    </div>
  );
};
