import React, { useState } from 'react';
import { UserSession } from '../types';
import { 
  Bell, 
  CheckCircle2, 
  Award, 
  Briefcase, 
  ShieldCheck, 
  Sparkles, 
  Clock, 
  ChevronRight, 
  UserCheck, 
  Trophy,
  Filter
} from 'lucide-react';

interface NotificationsViewProps {
  userSession: UserSession | null;
  setActiveTab: (tab: any) => void;
}

export const NotificationsView: React.FC<NotificationsViewProps> = ({
  userSession,
  setActiveTab,
}) => {
  const [filter, setFilter] = useState<'all' | 'trials' | 'jobs' | 'endorsements' | 'tournaments'>('all');

  const NOTIFICATIONS = [
    {
      id: 'notif-1',
      title: 'Scout Marcus Vance Endorsed Your Bowling Reel',
      category: 'endorsements',
      time: '12 mins ago',
      read: false,
      icon: Award,
      color: 'bg-[#FA4D14]/10 text-[#FA4D14]',
      description: 'Senior Scout Marcus Vance added an official note: "Lethal inswinging yorker at death. National pool candidate."',
      actionTab: 'newsfeed',
      actionText: 'View Endorsement Feed',
    },
    {
      id: 'notif-job-1',
      title: 'Delhi Colts CC Posted Head Bowling Coach Position',
      category: 'jobs',
      time: '30 mins ago',
      read: false,
      icon: Briefcase,
      color: 'bg-indigo-500/10 text-indigo-600',
      description: 'Delhi Colts Cricket Club published a new coaching job: Head Fast Bowling Coach & Performance Analyst (Salary ₹65,000 / mo).',
      actionTab: 'opportunities',
      actionText: 'View Job Details',
    },
    {
      id: 'notif-2',
      title: 'Apex Cricket Academy Invited You for State Trials',
      category: 'trials',
      time: '1 hour ago',
      read: false,
      icon: Briefcase,
      color: 'bg-emerald-500/10 text-emerald-600',
      description: 'Your application for Senior Fast Bowling Trial was shortlisted! Trial Date: Aug 24, 2026 at MCA Ground.',
      actionTab: 'opportunities',
      actionText: 'View Trial Slot & Location',
    },
    {
      id: 'notif-job-2',
      title: 'Match Scorer & Video Analyst Slot Open at MCA',
      category: 'jobs',
      time: '2 hours ago',
      read: false,
      icon: Sparkles,
      color: 'bg-sky-500/10 text-sky-600',
      description: 'Mumbai Cricket Association is accepting applications for Official Match Analyst & Video Scorer (₹4,500 / match).',
      actionTab: 'opportunities',
      actionText: 'Apply for Scorer Job',
    },
    {
      id: 'notif-3',
      title: 'State U-19 Championship Tournament Registration Live',
      category: 'tournaments',
      time: '3 hours ago',
      read: false,
      icon: Trophy,
      color: 'bg-amber-500/10 text-amber-600',
      description: 'Maharashtra Cricket Association published new U-19 State Cup slots for registered academy players.',
      actionTab: 'ecosystem_hub',
      actionText: 'Register Team / View Fixtures',
    },
    {
      id: 'notif-4',
      title: 'Sportzicon Verified Profile Badge Renewed',
      category: 'endorsements',
      time: '1 day ago',
      read: true,
      icon: ShieldCheck,
      color: 'bg-blue-500/10 text-blue-600',
      description: 'Your Performance Index score was updated to 92/100 based on your 4/22 match spell vs Delhi Colts.',
      actionTab: 'profile',
      actionText: 'Check Verified Index Score',
    },
    {
      id: 'notif-5',
      title: 'Direct Chat Request from National Scout Vikram Malhotra',
      category: 'endorsements',
      time: '2 days ago',
      read: true,
      icon: UserCheck,
      color: 'bg-purple-500/10 text-purple-600',
      description: 'Scout Vikram Malhotra started a recruitment inquiry regarding your availability for North Zone trials.',
      actionTab: 'newsfeed',
      actionText: 'Open Scout Communication',
    },
  ];

  const filteredNotifs = filter === 'all' 
    ? NOTIFICATIONS 
    : NOTIFICATIONS.filter((n) => n.category === filter);

  return (
    <div className="space-y-6 pb-16 animate-fadeIn max-w-4xl mx-auto text-left">
      
      {/* Screen Title & Overline - Single Clear H1 for Notifications */}
      <div className="space-y-1">
        <div className="text-overline text-[#FA4D14]">Recruitment Radar</div>
        <h1 className="text-h1 text-[#0F172A]">Notifications & Scout Alerts</h1>
        <p className="text-body text-[#64748B] max-w-[65ch]">
          Stay updated on state trial invitations, scout endorsements, tournament deadlines, and performance badge updates.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center justify-between gap-2 bg-white p-2.5 rounded-2xl border border-[#CBD5E1] shadow-sm overflow-x-auto no-scrollbar">
        <div className="flex items-center space-x-1">
          <button
            onClick={() => setFilter('all')}
            className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold tracking-[0.01em] transition-all cursor-pointer ${
              filter === 'all'
                ? 'bg-[#0F172A] text-white shadow-md'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            All Alerts
          </button>
          
          <button
            onClick={() => setFilter('trials')}
            className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold tracking-[0.01em] transition-all cursor-pointer whitespace-nowrap ${
              filter === 'trials'
                ? 'bg-[#0F172A] text-white shadow-md'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            Trials & Invites
          </button>

          <button
            onClick={() => setFilter('jobs')}
            className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold tracking-[0.01em] transition-all cursor-pointer whitespace-nowrap ${
              filter === 'jobs'
                ? 'bg-[#0F172A] text-white shadow-md'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            Jobs & Vacancies
          </button>

          <button
            onClick={() => setFilter('endorsements')}
            className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold tracking-[0.01em] transition-all cursor-pointer ${
              filter === 'endorsements'
                ? 'bg-[#0F172A] text-white shadow-md'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            Scout Endorsements
          </button>

          <button
            onClick={() => setFilter('tournaments')}
            className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold tracking-[0.01em] transition-all cursor-pointer ${
              filter === 'tournaments'
                ? 'bg-[#0F172A] text-white shadow-md'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            Tournaments
          </button>
        </div>

        <span className="text-xs font-semibold text-slate-500 hidden sm:inline px-2 tabular-nums">
          {filteredNotifs.length} Items
        </span>
      </div>

      {/* Notification Cards List */}
      <div className="space-y-3">
        {filteredNotifs.map((item) => {
          const IconComp = item.icon;
          return (
            <div
              key={item.id}
              className={`p-5 rounded-2xl border transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
                !item.read 
                  ? 'bg-white border-[#FA4D14]/40 shadow-sm ring-1 ring-[#FA4D14]/20' 
                  : 'bg-[#FAF7F2] border-[#CBD5E1] text-slate-700'
              }`}
            >
              <div className="flex items-start space-x-4 min-w-0">
                <div className={`p-3 rounded-xl shrink-0 ${item.color}`}>
                  <IconComp className="w-5 h-5" />
                </div>

                <div className="space-y-1 min-w-0">
                  <div className="flex items-center space-x-2">
                    <h3 className="text-h3 text-[#0F172A] truncate">
                      {item.title}
                    </h3>
                    {!item.read && (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#FA4D14] text-white">
                        New
                      </span>
                    )}
                  </div>
                  <p className="text-small text-[#64748B] leading-relaxed max-w-[65ch]">
                    {item.description}
                  </p>
                  <span className="text-xs text-[#94A3B8] flex items-center gap-1 tabular-nums">
                    <Clock className="w-3 h-3" /> {item.time}
                  </span>
                </div>
              </div>

              <button
                onClick={() => setActiveTab(item.actionTab)}
                className="self-end sm:self-center px-4 py-2 rounded-xl bg-[#0F172A] hover:bg-[#1E293B] text-white text-xs sm:text-sm font-semibold tracking-[0.01em] transition-all cursor-pointer flex items-center space-x-1 shrink-0 shadow-sm"
              >
                <span>{item.actionText}</span>
                <ChevronRight className="w-3.5 h-3.5 text-[#FA4D14]" />
              </button>
            </div>
          );
        })}
      </div>

    </div>
  );
};
