import React, { useState } from 'react';
import { RECOMMENDATIONS_MATRIX } from '../data/auditData';
import { Map, Zap, Clock, Target, CheckCircle2, TrendingUp, Sparkles, Filter, ShieldCheck } from 'lucide-react';

export const RecommendationsRoadmap: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filteredRecs = RECOMMENDATIONS_MATRIX.filter(r => 
    selectedCategory === 'all' || r.category === selectedCategory
  );

  return (
    <div className="space-y-8 animate-fade-in">
      
      {/* Header Banner */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm text-slate-900">
        <div className="flex items-center space-x-3 mb-2">
          <div className="p-2.5 rounded-xl bg-blue-50 border border-blue-200 text-blue-600">
            <Map className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold font-oswald text-slate-900 uppercase tracking-tight">
              Actionable UX Recommendations & Strategic Roadmap
            </h2>
            <p className="text-slate-500 text-xs sm:text-sm">
              Prioritized execution matrix designed to maximize athlete conversion, scout engagement, and platform trust.
            </p>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 mt-6">
          <span className="text-xs text-slate-500 font-mono flex items-center gap-1 font-bold">
            <Filter className="w-3.5 h-3.5 text-blue-600" /> Filter Pillar:
          </span>

          {[
            { id: 'all', label: 'All Recommendations' },
            { id: 'onboarding', label: 'Onboarding & Search' },
            { id: 'scorecard', label: 'Athlete Scorecard' },
            { id: 'opportunities', label: 'Opportunity Marketplace' },
            { id: 'trust-safety', label: 'Trust & Guardian Safety' },
            { id: 'live-scoring', label: 'Live Scoring Engine' },
          ].map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-blue-600 text-white shadow-xs font-bold'
                  : 'bg-slate-100 text-slate-600 hover:text-slate-900 border border-slate-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Effort vs Impact Matrix Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRecs.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4 flex flex-col justify-between hover:border-blue-300 transition-all shadow-sm text-slate-900"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between gap-2">
                <span className={`text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full uppercase ${
                  item.timeframe.includes('Immediate')
                    ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                    : item.timeframe.includes('Medium-Term')
                    ? 'bg-amber-100 text-amber-800 border border-amber-200'
                    : 'bg-blue-100 text-blue-800 border border-blue-200'
                }`}>
                  {item.timeframe}
                </span>

                <span className="text-[10px] font-mono text-slate-400">
                  ID: {item.id}
                </span>
              </div>

              <h3 className="text-lg font-bold font-oswald text-slate-900 uppercase tracking-wide leading-snug">
                {item.title}
              </h3>

              <p className="text-xs text-slate-600 leading-relaxed">
                {item.description}
              </p>
            </div>

            <div className="space-y-3 pt-3 border-t border-slate-100">
              
              <div className="grid grid-cols-2 gap-2 text-[11px] font-mono">
                <div className="bg-slate-50 p-2 rounded-lg border border-slate-200">
                  <span className="text-slate-400 block font-bold text-[10px]">ESTIMATED EFFORT</span>
                  <span className={`font-bold uppercase ${item.effort === 'low' ? 'text-emerald-700' : 'text-amber-700'}`}>
                    {item.effort} Effort
                  </span>
                </div>

                <div className="bg-slate-50 p-2 rounded-lg border border-slate-200">
                  <span className="text-slate-400 block font-bold text-[10px]">PROJECTED IMPACT</span>
                  <span className="font-bold text-blue-700 uppercase">
                    {item.impact} Impact
                  </span>
                </div>
              </div>

              <div className="bg-blue-50 p-2.5 rounded-xl border border-blue-200 text-xs flex items-center space-x-2">
                <TrendingUp className="w-4 h-4 text-blue-600 shrink-0" />
                <span className="text-blue-900 font-mono text-[11px]">
                  <strong>Target Metric:</strong> {item.expectedMetricImpact}
                </span>
              </div>

            </div>
          </div>
        ))}
      </div>

      {/* Summary Execution Guidance */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-4 shadow-sm text-slate-900">
        <h3 className="text-xl font-bold font-oswald text-slate-900 uppercase tracking-wide flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-blue-600" />
          Executive Implementation Summary
        </h3>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          By executing these high-priority UI/UX enhancements, Sportzicon can systematically address decision friction, build trust with youth athletes and parents, increase scout inquiry conversions, and position itself as the premiere verified digital recruitment platform for sports.
        </p>
      </div>

    </div>
  );
};
