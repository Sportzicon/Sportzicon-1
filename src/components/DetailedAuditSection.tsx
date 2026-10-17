import React, { useState } from 'react';
import { DETAILED_SECTION_AUDITS } from '../data/auditData';
import { ViewTab, DetailedSectionAudit } from '../types';
import { Layout, Award, Briefcase, Activity, CheckCircle2, XCircle, ArrowRight, Sparkles, Layers, ShieldCheck } from 'lucide-react';

interface DetailedAuditSectionProps {
  setActiveTab: (tab: ViewTab) => void;
}

export const DetailedAuditSection: React.FC<DetailedAuditSectionProps> = ({ setActiveTab }) => {
  const [selectedSectionId, setSelectedSectionId] = useState<string>('section-hero');

  const selectedAudit = DETAILED_SECTION_AUDITS.find(s => s.id === selectedSectionId) || DETAILED_SECTION_AUDITS[0];

  const getSectionIcon = (iconName: string) => {
    switch (iconName) {
      case 'Layout': return <Layout className="w-5 h-5 text-blue-600" />;
      case 'Award': return <Award className="w-5 h-5 text-blue-600" />;
      case 'Briefcase': return <Briefcase className="w-5 h-5 text-blue-600" />;
      case 'Activity': return <Activity className="w-5 h-5 text-blue-600" />;
      default: return <Layers className="w-5 h-5 text-blue-600" />;
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      
      {/* Header Banner */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm text-slate-900">
        <div className="flex items-center space-x-3 mb-2">
          <div className="p-2.5 rounded-xl bg-blue-50 border border-blue-200 text-blue-600">
            <Layers className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold font-oswald text-slate-900 uppercase tracking-tight">
              Page-by-Page UI/UX Deep Dives
            </h2>
            <p className="text-slate-500 text-xs sm:text-sm">
              Granular visual and functional assessment across Sportzicon's four primary user interface modules.
            </p>
          </div>
        </div>

        {/* Section Navigation Tabs */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6">
          {DETAILED_SECTION_AUDITS.map((sec) => {
            const isSelected = sec.id === selectedSectionId;
            return (
              <button
                key={sec.id}
                onClick={() => setSelectedSectionId(sec.id)}
                className={`p-3.5 rounded-xl border text-left transition-all flex items-center space-x-3 cursor-pointer ${
                  isSelected
                    ? 'bg-blue-50/80 border-blue-600 ring-1 ring-blue-600/30 shadow-xs'
                    : 'bg-slate-50 border-slate-200 hover:border-slate-300 hover:bg-slate-100'
                }`}
              >
                <div className="p-2 rounded-lg bg-white border border-slate-200 shadow-2xs">
                  {getSectionIcon(sec.iconName)}
                </div>
                <div>
                  <h3 className={`font-oswald font-bold text-sm tracking-wide ${isSelected ? 'text-blue-900' : 'text-slate-800'}`}>
                    {sec.title.split(' ')[0]} {sec.title.split(' ')[1] || ''}
                  </h3>
                  <span className="text-[11px] font-mono text-slate-500 block font-semibold">
                    Health Score: <strong className="text-slate-900">{sec.overallHealthScore}%</strong>
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Section Audit Card */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-8 shadow-sm text-slate-900">
        
        {/* Title & Health Meter */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-slate-100">
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                Module Analysis
              </span>
              <span className="text-xs text-slate-400 font-mono">
                ID: {selectedAudit.id}
              </span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold font-oswald text-slate-900 uppercase tracking-wide">
              {selectedAudit.title}
            </h3>
            <p className="text-xs sm:text-sm text-slate-600">
              {selectedAudit.subtitle}
            </p>
          </div>

          <div className="flex items-center space-x-4 bg-slate-50 p-4 rounded-xl border border-slate-200">
            <div>
              <span className="text-xs text-slate-500 block font-mono">Module Health Score</span>
              <span className="text-2xl font-bold font-oswald text-slate-900">
                {selectedAudit.overallHealthScore}<span className="text-sm text-slate-400">/100</span>
              </span>
            </div>
            <button
              onClick={() => setActiveTab('prototype')}
              className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-sm transition-all flex items-center space-x-1.5 cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-blue-100" />
              <span>Test Prototype</span>
            </button>
          </div>
        </div>

        {/* Current Shortcomings vs Strategic Wins */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          <div className="bg-red-50/70 rounded-xl p-5 border border-red-200 space-y-3">
            <h4 className="text-sm font-bold font-oswald text-red-800 uppercase tracking-wider flex items-center gap-2">
              <XCircle className="w-4 h-4 text-red-600" />
              Current Design Deficiencies
            </h4>
            <ul className="space-y-2 text-xs text-red-900/90 font-medium">
              {selectedAudit.currentShortcomings.map((item, i) => (
                <li key={i} className="flex items-start space-x-2">
                  <span className="text-red-600 font-bold">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-emerald-50/70 rounded-xl p-5 border border-emerald-200 space-y-3">
            <h4 className="text-sm font-bold font-oswald text-emerald-800 uppercase tracking-wider flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              Existing Foundation & Strengths
            </h4>
            <ul className="space-y-2 text-xs text-emerald-900/90 font-medium">
              {selectedAudit.strategicWins.map((item, i) => (
                <li key={i} className="flex items-start space-x-2">
                  <span className="text-emerald-600 font-bold">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Proposed Visual Features */}
        <div className="space-y-4">
          <h4 className="text-lg font-bold font-oswald text-slate-900 uppercase tracking-wide flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-blue-600" />
            Proposed UX Enhancements & Components
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {selectedAudit.proposedFeatures.map((feat, i) => (
              <div key={i} className="bg-slate-50 rounded-xl p-4 border border-slate-200 space-y-2 hover:border-slate-300 transition-colors shadow-2xs">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 border border-blue-200 font-bold">
                  {feat.visualPattern}
                </span>
                <h5 className="font-oswald font-bold text-base text-slate-900 tracking-wide">
                  {feat.featureName}
                </h5>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {feat.benefit}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Layout Wireframe Breakdown */}
        <div className="bg-slate-50 rounded-xl p-6 border border-slate-200 space-y-4">
          <h4 className="text-base font-bold font-oswald text-slate-900 uppercase tracking-wide flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-blue-600" />
            Structural Layout Transformation
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <span className="text-xs font-mono text-red-700 font-bold uppercase block">
                [ Current Architecture ]
              </span>
              <div className="p-4 rounded-xl bg-white border border-slate-200 text-xs text-slate-700 leading-relaxed min-h-[100px] shadow-2xs">
                {selectedAudit.wireframeComparison.currentLayoutDescription}
              </div>
            </div>

            <div className="space-y-2">
              <span className="text-xs font-mono text-emerald-700 font-bold uppercase block">
                [ Proposed Redesigned Architecture ]
              </span>
              <div className="p-4 rounded-xl bg-blue-50/80 border border-blue-200 text-xs text-blue-900 leading-relaxed min-h-[100px] shadow-2xs">
                {selectedAudit.wireframeComparison.proposedLayoutDescription}
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-200">
            <span className="text-xs text-slate-500 font-mono block mb-2 font-bold">
              Key Structural Modifications:
            </span>
            <div className="flex flex-wrap gap-2">
              {selectedAudit.wireframeComparison.keyChanges.map((change, idx) => (
                <span key={idx} className="inline-flex items-center space-x-1 text-xs px-3 py-1 rounded-full bg-white text-slate-800 border border-slate-200 font-medium shadow-2xs">
                  <ArrowRight className="w-3 h-3 text-blue-600" />
                  <span>{change}</span>
                </span>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
