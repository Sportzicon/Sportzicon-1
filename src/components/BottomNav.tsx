import React from 'react';
import { ViewTab, UserSession } from '../types';
import { Rss, Briefcase, Search, Bell, User, MessageSquare } from 'lucide-react';

interface BottomNavProps {
  activeTab: ViewTab;
  setActiveTab: (tab: ViewTab) => void;
  onOpenCreatePost: () => void;
  userSession: UserSession | null;
  unreadNotificationsCount?: number;
  unreadMessagesCount?: number;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  activeTab,
  setActiveTab,
  onOpenCreatePost,
  userSession,
  unreadNotificationsCount = 3,
  unreadMessagesCount = 2
}) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-[#0F172A]/95 backdrop-blur-md border-t border-[#1E293B] px-3 py-2 shadow-2xl">
      <div className="max-w-md mx-auto flex items-center justify-between relative">
        
        {/* 1. Feed */}
        <button
          onClick={() => setActiveTab('newsfeed')}
          className={`flex flex-col items-center justify-center flex-1 py-1 px-1 rounded-xl transition-all cursor-pointer ${
            activeTab === 'newsfeed'
              ? 'text-[#FA4D14] font-bold'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Rss className={`w-5 h-5 ${activeTab === 'newsfeed' ? 'stroke-[2.5]' : ''}`} />
          <span className="text-[10px] font-medium tracking-tight mt-1">Feed</span>
        </button>

        {/* 2. Opportunities */}
        <button
          onClick={() => setActiveTab('opportunities')}
          className={`flex flex-col items-center justify-center flex-1 py-1 px-1 rounded-xl transition-all cursor-pointer ${
            activeTab === 'opportunities'
              ? 'text-[#FA4D14] font-bold'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Briefcase className={`w-5 h-5 ${activeTab === 'opportunities' ? 'stroke-[2.5]' : ''}`} />
          <span className="text-[10px] font-medium tracking-tight mt-1">Opportunities</span>
        </button>

        {/* 3. Center Search Network Button */}
        <div className="flex-1 flex justify-center -mt-5">
          <button
            onClick={() => setActiveTab('search')}
            title="Search Athletes, Academies, Scouts & Organizations"
            className={`w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all cursor-pointer border-2 border-[#0F172A] ${
              activeTab === 'search'
                ? 'bg-[#FA4D14] text-white shadow-[#FA4D14]/50 scale-105'
                : 'bg-gradient-to-tr from-[#FA4D14] to-[#FF7043] text-white shadow-[#FA4D14]/40 hover:scale-105 active:scale-95'
            }`}
          >
            <Search className="w-5 h-5 stroke-[2.5]" />
          </button>
        </div>

        {/* 4. Chat */}
        <button
          onClick={() => setActiveTab('messages')}
          className={`flex flex-col items-center justify-center flex-1 py-1 px-1 rounded-xl transition-all cursor-pointer relative ${
            activeTab === 'messages'
              ? 'text-[#FA4D14] font-bold'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <div className="relative">
            <MessageSquare className={`w-5 h-5 ${activeTab === 'messages' ? 'stroke-[2.5]' : ''}`} />
            {unreadMessagesCount > 0 && (
              <span className="absolute -top-1 -right-1.5 w-4 h-4 bg-[#FA4D14] text-white text-[10px] font-semibold tabular-nums rounded-full flex items-center justify-center border border-[#0F172A]">
                {unreadMessagesCount}
              </span>
            )}
          </div>
          <span className="text-[10px] font-medium tracking-tight mt-1">Chat</span>
        </button>

        {/* 5. Profile */}
        <button
          onClick={() => setActiveTab(userSession ? 'profile' : 'login')}
          className={`flex flex-col items-center justify-center flex-1 py-1 px-1 rounded-xl transition-all cursor-pointer relative ${
            activeTab === 'profile' || activeTab === 'login'
              ? 'text-[#FA4D14] font-bold'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <User className={`w-5 h-5 ${activeTab === 'profile' || activeTab === 'login' ? 'stroke-[2.5]' : ''}`} />
          <span className="text-[10px] font-medium tracking-tight mt-1">Profile</span>
        </button>

      </div>
    </div>
  );
};
