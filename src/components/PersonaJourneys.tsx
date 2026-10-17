import React, { useState } from 'react';
import { PERSONA_ANALYSES } from '../data/auditData';
import { Users, Frown, Smile, ArrowRight, ShieldCheck, Target, Sparkles, AlertCircle } from 'lucide-react';

export const PersonaJourneys: React.FC = () => {
  const [selectedPersonaId, setSelectedPersonaId] = useState<string>('persona-athlete');

  const selectedPersona = PERSONA_ANALYSES.find(p => p.id === selectedPersonaId) || PERSONA_ANALYSES[0];

  return (
    <div className="space-y-8 animate-fade-in">
      
      {/* Section Header */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm text-slate-900">
        <div className="flex items-center space-x-3 mb-2">
          <div className="p-2.5 rounded-xl bg-blue-50 border border-blue-200 text-blue-600">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold font-oswald text-slate-900 uppercase tracking-tight">
              User Persona & Journey Friction Mapping
            </h2>
            <p className="text-slate-500 text-xs sm:text-sm">
              Deep dive into Sportzicon's three primary audience personas, mapping their goals, emotional friction, and path to conversion.
            </p>
          </div>
        </div>

        {/* Persona Selector Tabs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          {PERSONA_ANALYSES.map((persona) => {
            const isSelected = persona.id === selectedPersonaId;
            return (
              <button
                key={persona.id}
                onClick={() => setSelectedPersonaId(persona.id)}
                className={`p-4 rounded-xl border text-left transition-all flex items-center space-x-3 cursor-pointer ${
                  isSelected
                    ? 'bg-blue-50/80 border-blue-600 ring-1 ring-blue-600/30 shadow-xs'
                    : 'bg-slate-50 border-slate-200 hover:border-slate-300 hover:bg-slate-100'
                }`}
              >
                <img
                  src={persona.avatar}
                  alt={persona.role}
                  className="w-12 h-12 rounded-full object-cover border-2 border-slate-200 shadow-2xs"
                />
                <div>
                  <h3 className={`font-oswald font-bold text-base tracking-wide ${isSelected ? 'text-blue-900' : 'text-slate-800'}`}>
                    {persona.role}
                  </h3>
                  <p className="text-xs text-slate-500 line-clamp-1 font-medium">
                    {persona.tagline}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Persona Detail View */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-sm text-slate-900">
        
        {/* Persona Header Details */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6 border-b border-slate-100">
          <div className="flex items-center space-x-4">
            <img
              src={selectedPersona.avatar}
              alt={selectedPersona.role}
              className="w-16 h-16 rounded-2xl object-cover border-2 border-blue-600 shadow-xs"
            />
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800 border border-blue-200">
                  Target Audience
                </span>
                <span className="text-xs text-slate-400 font-mono">
                  Persona ID: {selectedPersona.id}
                </span>
              </div>
              <h3 className="text-2xl font-bold font-oswald text-slate-900 uppercase tracking-wide mt-1">
                {selectedPersona.role}
              </h3>
              <p className="text-slate-600 text-xs sm:text-sm font-medium">
                "{selectedPersona.tagline}"
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full md:w-auto">
            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-xs shadow-2xs">
              <span className="text-slate-500 block mb-1 font-bold flex items-center gap-1">
                <Target className="w-3.5 h-3.5 text-blue-600" /> Primary Goal:
              </span>
              <span className="text-slate-800 font-medium">{selectedPersona.primaryGoal}</span>
            </div>
            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-xs shadow-2xs">
              <span className="text-slate-500 block mb-1 font-bold flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-emerald-600" /> Key Conversion Driver:
              </span>
              <span className="text-slate-800 font-medium">{selectedPersona.conversionDriver}</span>
            </div>
          </div>
        </div>

        {/* Step-by-Step Journey Map */}
        <div className="space-y-4">
          <h4 className="text-lg font-bold font-oswald text-slate-900 uppercase tracking-wide flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-blue-600" />
            End-to-End User Journey Analysis
          </h4>

          <div className="relative border-l-2 border-slate-200 ml-4 space-y-6 pl-6 py-2">
            {selectedPersona.journeySteps.map((step, idx) => (
              <div key={idx} className="relative group">
                
                {/* Timeline Node */}
                <div className={`absolute -left-[31px] top-1.5 w-5 h-5 rounded-full border-2 flex items-center justify-center font-mono text-[10px] font-bold ${
                  step.sentimentScore <= 2
                    ? 'bg-red-50 border-red-500 text-red-600'
                    : 'bg-emerald-50 border-emerald-500 text-emerald-600'
                }`}>
                  {idx + 1}
                </div>

                <div className="bg-slate-50 rounded-xl p-5 border border-slate-200 hover:border-slate-300 transition-all space-y-3 shadow-2xs">
                  
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <h5 className="font-oswald text-base font-bold text-slate-900 tracking-wide uppercase">
                      {step.stepName}
                    </h5>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs text-slate-500 font-medium">Current Sentiment:</span>
                      <span className={`inline-flex items-center space-x-1 text-xs font-bold px-2 py-0.5 rounded-full ${
                        step.sentimentScore <= 2
                          ? 'bg-red-100 text-red-700 border border-red-200'
                          : 'bg-emerald-100 text-emerald-700 border border-emerald-200'
                      }`}>
                        {step.sentimentScore <= 2 ? <Frown className="w-3.5 h-3.5" /> : <Smile className="w-3.5 h-3.5" />}
                        <span>{step.sentimentScore} / 5</span>
                      </span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    <strong className="text-slate-900 font-bold">User Action:</strong> {step.action}
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                    <div className="bg-red-50 border border-red-200/80 p-3 rounded-lg text-xs space-y-1">
                      <span className="font-bold text-red-900 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5 text-red-600" /> Current UX Friction:
                      </span>
                      <p className="text-red-800 leading-relaxed font-medium">
                        {step.currentPainPoint}
                      </p>
                    </div>

                    <div className="bg-emerald-50 border border-emerald-200/80 p-3 rounded-lg text-xs space-y-1">
                      <span className="font-bold text-emerald-900 flex items-center gap-1">
                        <Sparkles className="w-3.5 h-3.5 text-emerald-600" /> Proposed Redesign Fix:
                      </span>
                      <p className="text-emerald-800 leading-relaxed font-medium">
                        {step.proposedFix}
                      </p>
                    </div>
                  </div>

                </div>

              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};
