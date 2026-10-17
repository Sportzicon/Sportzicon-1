import React from 'react';
import { X, Download, Printer, ShieldCheck, CheckCircle2, FileText, Sparkles } from 'lucide-react';
import { AUDIT_SCORES, CRITICAL_FRICTION_POINTS, RECOMMENDATIONS_MATRIX } from '../data/auditData';

interface AuditReportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuditReportModal: React.FC<AuditReportModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 overflow-y-auto animate-fade-in">
      <div className="bg-white border border-slate-200 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative p-6 sm:p-8 space-y-6 text-slate-900">
        
        {/* Sticky Header */}
        <div className="flex items-center justify-between border-b border-slate-200 pb-4 sticky top-0 bg-white z-10">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold font-oswald text-lg shadow-xs">
              S
            </div>
            <div>
              <h2 className="font-oswald font-bold text-xl text-slate-900 uppercase tracking-wide">
                Sportzicon Executive UI/UX Audit Report
              </h2>
              <p className="text-xs text-slate-500 font-mono">
                Target Domain: sportzicon.com • Date: August 2026
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={handlePrint}
              className="px-3.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 text-xs font-bold flex items-center space-x-1 cursor-pointer transition-colors"
            >
              <Printer className="w-3.5 h-3.5 text-slate-500" />
              <span>Print / Save PDF</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-900 hover:bg-slate-100 cursor-pointer transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Executive Report Document Content */}
        <div className="space-y-6 text-xs sm:text-sm leading-relaxed">
          
          {/* Executive Overview */}
          <section className="space-y-2 bg-slate-50 p-5 rounded-xl border border-slate-200">
            <h3 className="text-base font-bold font-oswald text-blue-600 uppercase tracking-wider">
              1. Executive Overview & Platform Diagnostics
            </h3>
            <p className="text-slate-700">
              Sportzicon (<a href="https://sportzicon.com" target="_blank" rel="noreferrer" className="text-blue-600 underline font-medium">sportzicon.com</a>) presents a robust athletic data and scoring foundation for sports recruitment, cricket tournaments, and athlete scorecards. However, its current web platform suffers from user onboarding friction, competing CTA hierarchy, and plain tabular statistics that reduce engagement among scouts, young athletes, and parents.
            </p>
            <p className="text-slate-700">
              The overall UI/UX Health Score is calculated at <strong className="text-slate-900 font-bold">66/100</strong>. Implementing the strategic recommendations outlined in this report will significantly increase user conversion and platform adoption.
            </p>
          </section>

          {/* Key Metric Scores Table */}
          <section className="space-y-3">
            <h3 className="text-base font-bold font-oswald text-slate-900 uppercase tracking-wider">
              2. UX Pillar Scorecard Breakdown
            </h3>
            <div className="bg-slate-50 rounded-xl border border-slate-200 overflow-x-auto p-4">
              <table className="w-full text-left border-collapse font-mono text-xs">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-500 font-bold">
                    <th className="py-2">Evaluation Pillar</th>
                    <th className="py-2">Score</th>
                    <th className="py-2">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {AUDIT_SCORES.map((s, idx) => (
                    <tr key={idx}>
                      <td className="py-2.5 font-sans font-bold text-slate-900">{s.category}</td>
                      <td className="py-2.5 font-bold text-blue-700">{s.score} / 100</td>
                      <td className="py-2.5 uppercase font-bold text-slate-600">{s.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Critical Friction Points */}
          <section className="space-y-3">
            <h3 className="text-base font-bold font-oswald text-slate-900 uppercase tracking-wider">
              3. Priority UX Friction Points
            </h3>
            <div className="space-y-3">
              {CRITICAL_FRICTION_POINTS.map((f, i) => (
                <div key={i} className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                  <div className="flex justify-between font-mono text-xs font-bold text-blue-700">
                    <span>{f.title}</span>
                    <span>[{f.pageSection}]</span>
                  </div>
                  <p className="text-slate-700 text-xs"><strong>Issue:</strong> {f.currentDesignIssue}</p>
                  <p className="text-emerald-800 text-xs font-medium"><strong>Fix:</strong> {f.recommendation}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Strategic Action Matrix */}
          <section className="space-y-3">
            <h3 className="text-base font-bold font-oswald text-slate-900 uppercase tracking-wider">
              4. Immediate & Strategic Action Roadmap
            </h3>
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
              {RECOMMENDATIONS_MATRIX.map((rec, i) => (
                <div key={i} className="flex items-start space-x-2 py-1.5 border-b border-slate-200/80 last:border-0 text-xs">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-slate-900">{rec.title}</span> ({rec.timeframe}) — <span className="text-blue-700 font-mono font-bold">{rec.expectedMetricImpact}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

        </div>

        {/* Modal Footer */}
        <div className="border-t border-slate-200 pt-4 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs cursor-pointer shadow-xs"
          >
            Close Report
          </button>
        </div>

      </div>
    </div>
  );
};
