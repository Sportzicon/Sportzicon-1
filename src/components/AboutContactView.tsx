import React, { useState } from 'react';
import { SportziconIcon } from './SportziconIcon';
import { 
  Info, 
  Mail, 
  Phone, 
  MapPin, 
  ShieldCheck, 
  Award, 
  Building2, 
  CheckCircle2, 
  Send, 
  ExternalLink,
  MessageSquare
} from 'lucide-react';

interface AboutContactViewProps {
  mode: 'about' | 'contact';
  setActiveTab: (tab: any) => void;
}

export const AboutContactView: React.FC<AboutContactViewProps> = ({
  mode,
  setActiveTab,
}) => {
  const [formSent, setFormSent] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'Academy Partnerships / Trials Inquiry',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSent(true);
    setTimeout(() => {
      alert('Thank you! Your inquiry has been dispatched to the Sportzicon Ecosystem Support Team.');
      setFormSent(false);
      setFormData({ name: '', email: '', subject: 'Academy Partnerships / Trials Inquiry', message: '' });
    }, 800);
  };

  return (
    <div className="space-y-8 pb-20 animate-fadeIn max-w-4xl mx-auto text-left">
      
      {/* Header Banner */}
      <div className="bg-[#0F172A] text-white p-6 sm:p-8 rounded-3xl border border-[#1E293B] shadow-2xl space-y-4">
        <div className="flex items-center space-x-3">
          <SportziconIcon size="md" showBadge={false} />
          <div className="flex flex-col">
            <span className="font-heading text-2xl sm:text-3xl font-extrabold tracking-tight text-white italic leading-none">
              sportz<span className="text-[#E04E26]">ícon</span>
            </span>
            <span className="text-overline text-slate-400 mt-1">
              EST. 2026
            </span>
          </div>
        </div>

        <div>
          <div className="text-overline text-[#FA4D14] mb-1">
            {mode === 'about' ? 'About Platform' : 'Contact Support'}
          </div>
          <h1 className="text-h1 text-white">
            {mode === 'about' ? 'About Sportzicon Ecosystem' : 'Get in Touch with Sportzicon Network'}
          </h1>
        </div>

        <p className="text-body text-slate-300 max-w-[65ch] leading-relaxed">
          {mode === 'about'
            ? 'Sportzicon is the premier digital recruitment and scouting ecosystem designed to connect grassroots cricket athletes, state academies, certified selectors, and tournament organizers through verified match performance metrics.'
            : 'Have questions regarding academy partnerships, trial listings, scout accreditation, or state tournament registrations? Our support team is available 24/7.'}
        </p>
      </div>

      {/* Mode 1: About Us Details */}
      {mode === 'about' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white p-6 rounded-3xl border border-[#CBD5E1] shadow-sm space-y-2">
              <div className="p-3 bg-[#FA4D14]/10 text-[#FA4D14] rounded-2xl w-fit">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="text-h3 text-[#0F172A]">Verified Athlete Records</h3>
              <p className="text-small text-[#64748B] leading-relaxed">
                Eliminating fake claims with video-verified bowling speeds, ball-by-ball scorelog analysis, and certified selector notes.
              </p>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-[#CBD5E1] shadow-sm space-y-2">
              <div className="p-3 bg-emerald-500/10 text-emerald-600 rounded-2xl w-fit">
                <Building2 className="w-6 h-6" />
              </div>
              <h3 className="text-h3 text-[#0F172A]">Academy Infrastructure</h3>
              <p className="text-small text-[#64748B] leading-relaxed">
                Empowering state associations and private academies with automated trial registrations and player talent pipelines.
              </p>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-[#CBD5E1] shadow-sm space-y-2">
              <div className="p-3 bg-blue-500/10 text-blue-600 rounded-2xl w-fit">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-h3 text-[#0F172A]">Live Match Scoring</h3>
              <p className="text-small text-[#64748B] leading-relaxed">
                Ball-by-ball tournament scorecards feeding verified statistics directly into player resumes in real time.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Mode 2: Contact Form */}
      {mode === 'contact' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Contact Details Column */}
          <div className="space-y-4">
            <div className="bg-white p-6 rounded-3xl border border-[#CBD5E1] shadow-sm space-y-4">
              <h3 className="text-h3 text-[#0F172A]">Direct Channels</h3>
              
              <div className="space-y-3 text-xs">
                <div className="flex items-center space-x-3 p-3 rounded-2xl bg-[#FAF7F2] border border-[#CBD5E1]">
                  <Mail className="w-5 h-5 text-[#FA4D14] shrink-0" />
                  <div>
                    <span className="text-overline text-[#64748B] block">Official Email</span>
                    <span className="font-semibold text-[#0F172A] text-sm">support@sportzicon.com</span>
                  </div>
                </div>

                <div className="flex items-center space-x-3 p-3 rounded-2xl bg-[#FAF7F2] border border-[#CBD5E1]">
                  <Phone className="w-5 h-5 text-[#FA4D14] shrink-0" />
                  <div>
                    <span className="text-overline text-[#64748B] block">Phone Hotline</span>
                    <span className="font-semibold text-[#0F172A] text-sm tabular-nums">+91 98765 43210</span>
                  </div>
                </div>

                <div className="flex items-center space-x-3 p-3 rounded-2xl bg-[#FAF7F2] border border-[#CBD5E1]">
                  <MapPin className="w-5 h-5 text-[#FA4D14] shrink-0" />
                  <div>
                    <span className="text-overline text-[#64748B] block">Headquarters</span>
                    <span className="font-semibold text-[#0F172A] text-sm">Mumbai Sports Hub, BKC, India</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form Column */}
          <div className="md:col-span-2 bg-white p-6 sm:p-8 rounded-3xl border border-[#CBD5E1] shadow-sm space-y-4">
            <h3 className="text-h3 text-[#0F172A] flex items-center space-x-2">
              <MessageSquare className="w-5 h-5 text-[#FA4D14]" />
              <span>Send Us an Official Message</span>
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-sm font-medium text-slate-700">Your Full Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Coach Ramesh Pawar"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:border-[#FA4D14] text-base font-normal"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-sm font-medium text-slate-700">Email Address</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="you@academy.com"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:border-[#FA4D14] text-base font-normal"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-sm font-medium text-slate-700">Inquiry Topic</label>
                <select
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:border-[#FA4D14] text-base font-normal bg-white"
                >
                  <option>Academy Partnerships / Trials Inquiry</option>
                  <option>Scout Verification & Accreditation</option>
                  <option>Tournament Live Scoring Setup</option>
                  <option>General Support</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-sm font-medium text-slate-700">Message Details</label>
                <textarea
                  rows={4}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="How can our ecosystem support team assist your academy or athletes?"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:border-[#FA4D14] text-base font-normal"
                />
              </div>

              <button
                type="submit"
                disabled={formSent}
                className="w-full py-3 px-4 rounded-xl bg-[#FA4D14] hover:bg-[#E03A00] text-white font-semibold text-sm tracking-[0.01em] transition-all flex items-center justify-center space-x-2 shadow-md cursor-pointer disabled:opacity-50"
              >
                <Send className="w-4 h-4" />
                <span>{formSent ? 'Sending message...' : 'Dispatch inquiry'}</span>
              </button>
            </form>
          </div>

        </div>
      )}

    </div>
  );
};
