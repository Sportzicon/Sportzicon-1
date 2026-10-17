import React, { useState } from 'react';
import { FeedPost, Athlete, UserRoleMode, ViewTab, UserSession } from '../types';
import { InstagramStyleVideoPlayer } from './InstagramStyleVideoPlayer';
import { useHorizontalScroll } from '../hooks/useHorizontalScroll';
import { 
  ShieldCheck, 
  MessageSquare, 
  Share2, 
  Award, 
  UserPlus, 
  Building2, 
  CheckCircle, 
  PlusCircle, 
  Search, 
  TrendingUp, 
  Users, 
  Briefcase, 
  Trophy,
  ThumbsUp,
  Send,
  Video,
  FileText,
  Filter,
  Sparkles,
  Play,
  Edit3,
  Trash2,
  ExternalLink,
  Check,
  X,
  MoreHorizontal,
  Bookmark,
  BookmarkCheck,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Radio,
  Activity,
  Flame
} from 'lucide-react';

interface CricketNewsfeedProps {
  athletes: Athlete[];
  userRole: UserRoleMode;
  onSelectAthlete: (athlete: Athlete) => void;
  setActiveTab: (tab: ViewTab) => void;
  userSession?: UserSession | null;
  onShareToDirectMessage?: (post: FeedPost) => void;
  onStartChatWithUser?: (userName: string) => void;
}

const INITIAL_POSTS: FeedPost[] = [
  {
    id: 'post-video-1',
    authorName: 'Rohan Verma',
    authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
    authorRole: 'Right-Arm Fast Bowler • Apex Cricket Academy',
    authorType: 'athlete',
    isVerified: true,
    timeAgo: '30 mins ago',
    postType: 'video',
    content: '📹 Match spell footage from today’s Maharashtra Club Championship quarterfinal! Clocked 142.4 km/h with late seam movement into the right-hander.',
    videoThumbnail: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&q=80&w=800',
    videoDuration: '0:48',
    videoSpeedMetric: '142.4 km/h • High Seam Release',
    endorsementsCount: 294,
    commentsCount: 42,
    sharesCount: 38,
    isEndorsed: true
  },
  {
    id: 'post-1',
    authorName: 'Mumbai Cricket Association (MCA)',
    authorAvatar: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&q=80&w=200',
    authorRole: 'State Association • Official Governing Body',
    authorType: 'association',
    isVerified: true,
    timeAgo: '2 hours ago',
    postType: 'opportunity',
    content: '📢 OFFICIAL SELECTION ANNOUNCEMENT: Registration is now open for the upcoming Maharashtra State U-19 Championship Selection Trials! Affiliated club & academy players can apply directly with their verified Sportzicon profile.',
    opportunityLink: {
      title: 'Maharashtra State U-19 Selection Trials 2026',
      type: 'trial',
      actionText: 'Apply via Verified Profile'
    },
    endorsementsCount: 342,
    commentsCount: 48,
    sharesCount: 89,
    isEndorsed: false
  },
  {
    id: 'post-article-1',
    authorName: 'Coach Ramesh Pawar',
    authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
    authorRole: 'Senior High-Performance Coach • West Zone',
    authorType: 'academy',
    isVerified: true,
    timeAgo: '4 hours ago',
    postType: 'article',
    articleTitle: 'Mastering the Inswing Yorker on Red Soil Pitches',
    articleReadTime: '3 min read',
    content: 'Technical Breakdown: On bouncy red soil surfaces, bowling the yorker requires adjusting your wrist position at release by 5-10 degrees. The seam position must stay upright until release, creating aero-swing in the final 3 meters before pitch impact.',
    endorsementsCount: 412,
    commentsCount: 63,
    sharesCount: 95,
    isEndorsed: false
  },
  {
    id: 'post-job-1',
    authorName: 'Delhi Colts Cricket Club',
    authorAvatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=200',
    authorRole: 'Premier Division Club • Delhi',
    authorType: 'club',
    isVerified: true,
    timeAgo: '6 hours ago',
    postType: 'opportunity',
    content: '💼 VACANCY ANNOUNCEMENT: Delhi Colts CC is inviting applications for Head Fast Bowling Coach & Video Analyst for the upcoming DDCA League season.',
    opportunityLink: {
      title: 'Head Fast Bowling Coach (Salary: ₹65,000 / mo)',
      type: 'job',
      actionText: 'View Job Details & Apply'
    },
    endorsementsCount: 178,
    commentsCount: 22,
    sharesCount: 41,
    isEndorsed: false
  },
  {
    id: 'post-2',
    authorName: 'Rohan Verma',
    authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
    authorRole: 'Right-Arm Fast Bowler • Apex Cricket Academy',
    authorType: 'athlete',
    isVerified: true,
    timeAgo: '8 hours ago',
    postType: 'scorelog',
    content: 'Pleased to share my match performance scorelog from today’s semifinal against DY Patil Sports Academy! Bowled 8 tight overs with seam movement and 2 maidens. Grateful to coach Vikram for the tactical bowling plan.',
    matchScorelog: {
      matchName: 'Mumbai Club League Semifinal vs DY Patil Sports Academy',
      performance: '4/22 (8.0 ov) • 2 Maidens',
      result: 'Apex Cricket Academy won by 46 runs'
    },
    endorsementsCount: 184,
    commentsCount: 29,
    sharesCount: 14,
    isEndorsed: true
  },
  {
    id: 'post-3',
    authorName: 'Sunil Joshi',
    authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
    authorRole: 'Senior Scout • West Zone Talent Identification',
    authorType: 'scout',
    isVerified: true,
    timeAgo: '1 day ago',
    postType: 'post',
    content: 'High quality match temperaments witnessed at Pune Stadium during the Inter-Academy T20s. We are actively tracking top-order left-handed openers with strong strike rates in powerplay overs for state talent camps.',
    endorsementsCount: 215,
    commentsCount: 37,
    sharesCount: 22,
    isEndorsed: false
  },
  {
    id: 'post-video-2',
    authorName: 'Arjun Mehta',
    authorAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200',
    authorRole: 'Middle-Order Batter • MCA U-19 Squad',
    authorType: 'athlete',
    isVerified: true,
    timeAgo: '1 day ago',
    postType: 'video',
    content: '📹 Power-hitting practice session against left-arm spin! Focusing on extension through point and over mid-wicket.',
    videoThumbnail: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&q=80&w=800',
    videoDuration: '0:35',
    videoSpeedMetric: 'Exit Velocity: 138 km/h • High Loft',
    endorsementsCount: 198,
    commentsCount: 24,
    sharesCount: 19,
    isEndorsed: false
  },
  {
    id: 'post-4',
    authorName: 'Karnataka State Cricket Assoc (KSCA)',
    authorAvatar: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&q=80&w=200',
    authorRole: 'State Association • Official Governing Body',
    authorType: 'association',
    isVerified: true,
    timeAgo: '2 days ago',
    postType: 'opportunity',
    content: '🏆 TOURNAMENT ANNOUNCEMENT: Applications are officially open for the KSCA State Invitational League 2026. Verified clubs and registered academies can submit their team rosters.',
    opportunityLink: {
      title: 'KSCA State Invitational League 2026',
      type: 'trial',
      actionText: 'Register Roster'
    },
    endorsementsCount: 389,
    commentsCount: 51,
    sharesCount: 67,
    isEndorsed: false
  },
  {
    id: 'post-video-3',
    authorName: 'Ananya Sharma',
    authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
    authorRole: 'Leg-Spin Specialist • Senior Women’s Division',
    authorType: 'athlete',
    isVerified: true,
    timeAgo: '2 days ago',
    postType: 'video',
    content: '📹 Match spell breakdown: 3 wickets in 4 overs using flight and dip. Happy with the googly variations today!',
    videoThumbnail: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&q=80&w=800',
    videoDuration: '0:52',
    videoSpeedMetric: 'Rev Rate: 2,400 RPM • Sharp Turn',
    endorsementsCount: 312,
    commentsCount: 45,
    sharesCount: 33,
    isEndorsed: true
  },
  {
    id: 'post-5',
    authorName: 'Vikramaditya Roy',
    authorAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200',
    authorRole: 'Head Scout • Regional Talent Identification',
    authorType: 'scout',
    isVerified: true,
    timeAgo: '3 days ago',
    postType: 'post',
    content: 'Evaluating fast bowlers at the National High Performance Camp. Look for consistency in length, seam presentation, and recovery speed during second spells.',
    endorsementsCount: 267,
    commentsCount: 31,
    sharesCount: 28,
    isEndorsed: false
  },
  {
    id: 'post-6',
    authorName: 'National Sports Institute & Hub',
    authorAvatar: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&q=80&w=200',
    authorRole: 'Elite Athletics & High Performance Center',
    authorType: 'academy',
    isVerified: true,
    timeAgo: '3 days ago',
    postType: 'article',
    articleTitle: 'Biomechanics & Injury Prevention for Fast Bowlers',
    articleReadTime: '4 min read',
    content: 'Key research insights from our biomechanics laboratory on shoulder rotation torque and front-knee lock during ball release.',
    endorsementsCount: 430,
    commentsCount: 58,
    sharesCount: 82,
    isEndorsed: false
  },
  {
    id: 'post-7',
    authorName: 'Tamil Nadu Cricket Association (TNCA)',
    authorAvatar: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&q=80&w=200',
    authorRole: 'State Sports Governing Body',
    authorType: 'association',
    isVerified: true,
    timeAgo: '4 days ago',
    postType: 'opportunity',
    content: '📢 TNCA Senior Division Selection Trials registration is now live for all affiliated district players.',
    opportunityLink: {
      title: 'TNCA Senior Division Selection Trials',
      type: 'trial',
      actionText: 'Apply Now'
    },
    endorsementsCount: 298,
    commentsCount: 39,
    sharesCount: 45,
    isEndorsed: false
  }
];

export interface NetworkSuggestion {
  id: string;
  name: string;
  role: string;
  category: 'Player' | 'Academy' | 'Scout' | 'Organization';
  avatar: string;
  location: string;
  mutuals: string;
}

const NETWORK_SUGGESTIONS: NetworkSuggestion[] = [
  {
    id: 'sug-1',
    name: 'Arjun Mehta',
    role: 'All-Rounder • MCA U-19 Squad',
    category: 'Player',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200',
    location: 'Mumbai, MH',
    mutuals: '14 mutual connections'
  },
  {
    id: 'sug-2',
    name: 'Apex High-Performance Academy',
    role: 'Premier Cricket & Multisport Facility',
    category: 'Academy',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=200',
    location: 'Pune, MH',
    mutuals: 'Official Partner Academy'
  },
  {
    id: 'sug-3',
    name: 'Sunil Joshi',
    role: 'Senior Talent Scout • West Zone',
    category: 'Scout',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
    location: 'Bengaluru, KA',
    mutuals: 'Scouted 42+ State Players'
  },
  {
    id: 'sug-4',
    name: 'Karnataka State Cricket Assoc',
    role: 'Official State Governing Body',
    category: 'Organization',
    avatar: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&q=80&w=200',
    location: 'Bengaluru, KA',
    mutuals: '39.5K Ecosystem Members'
  },
  {
    id: 'sug-5',
    name: 'Ananya Sharma',
    role: 'Leg-Spin Specialist • Senior Women’s',
    category: 'Player',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
    location: 'Delhi, DL',
    mutuals: '8 mutual connections'
  },
  {
    id: 'sug-6',
    name: 'National Sports Institute & Hub',
    role: 'Elite High Performance Center',
    category: 'Academy',
    avatar: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&q=80&w=200',
    location: 'Patiala, PB',
    mutuals: 'Verified Training Hub'
  },
  {
    id: 'sug-7',
    name: 'Vikramaditya Roy',
    role: 'Franchise Talent Scout',
    category: 'Scout',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200',
    location: 'Mumbai, MH',
    mutuals: 'Head Scout • Regional Pool'
  },
  {
    id: 'sug-8',
    name: 'Tamil Nadu Cricket Association',
    role: 'State Sports Governing Body',
    category: 'Organization',
    avatar: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&q=80&w=200',
    location: 'Chennai, TN',
    mutuals: '28.1K Ecosystem Members'
  },
  {
    id: 'sug-9',
    name: 'Devansh Patel',
    role: 'Wicketkeeper Batter • U-23 State Squad',
    category: 'Player',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=200',
    location: 'Ahmedabad, GJ',
    mutuals: '19 mutual connections'
  },
  {
    id: 'sug-10',
    name: 'Chennai Super Cricket Center',
    role: 'High Performance & Spin Lab',
    category: 'Academy',
    avatar: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&q=80&w=200',
    location: 'Chennai, TN',
    mutuals: '4.8★ Elite Rated Hub'
  },
  {
    id: 'sug-11',
    name: 'Rajesh Nair',
    role: 'Pace Bowling Evaluator & Scout',
    category: 'Scout',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=200',
    location: 'Kochi, KL',
    mutuals: 'Certified BCCI Level 2'
  },
  {
    id: 'sug-12',
    name: 'Mumbai Cricket Association (MCA)',
    role: 'Official Governing Body',
    category: 'Organization',
    avatar: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&q=80&w=200',
    location: 'Mumbai, MH',
    mutuals: '48.2K Ecosystem Members'
  }
];

const ASSOCIATIONS_DIRECTORY = [
  {
    id: 'assoc-1',
    name: 'Mumbai Cricket Association (MCA)',
    type: 'State Association',
    followers: '48.2K members',
    logo: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&q=80&w=100',
    isFollowing: true
  },
  {
    id: 'assoc-2',
    name: 'Karnataka State Cricket Assoc (KSCA)',
    type: 'State Association',
    followers: '39.5K members',
    logo: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&q=80&w=100',
    isFollowing: false
  },
  {
    id: 'assoc-3',
    name: 'Apex High-Performance Academy',
    type: 'Premier Academy',
    followers: '12.8K members',
    logo: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=100',
    isFollowing: true
  },
  {
    id: 'assoc-4',
    name: 'National Cricket Academy (NCA Hub)',
    type: 'National Training Body',
    followers: '92.1K members',
    logo: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&q=80&w=100',
    isFollowing: false
  }
];

export interface LiveMatchItem {
  id: string;
  tournament: string;
  stage: string;
  venue: string;
  status: 'live' | 'completed' | 'upcoming';
  inningsStatus: string;
  teamA: {
    name: string;
    score: string;
    overs?: string;
    isBatting?: boolean;
  };
  teamB: {
    name: string;
    score: string;
    overs?: string;
    isBatting?: boolean;
  };
  matchSituation: string;
  summaryNote: string;
  actionText: string;
}

const TOP_LIVE_MATCHES: LiveMatchItem[] = [
  {
    id: 'match-1',
    tournament: 'All India Club T20 Cup',
    stage: 'Finals · Innings 2',
    venue: 'Wankhede Stadium, Mumbai',
    status: 'live',
    inningsStatus: 'LIVE',
    teamA: {
      name: 'Delhi Colts CC',
      score: '209/7',
      overs: '20.0 ov',
      isBatting: false
    },
    teamB: {
      name: 'Apex Cricket Academy',
      score: '182/4',
      overs: '14.5/20 ov',
      isBatting: true
    },
    matchSituation: 'Need 28 Runs in 31 Balls',
    summaryNote: 'Target: 210 · CRR: 12.30 · RRR: 5.42',
    actionText: 'Live Ball-by-Ball'
  },
  {
    id: 'match-2',
    tournament: 'State U-19 Championship',
    stage: 'Semifinal 1 · Innings 1',
    venue: 'BKC Ground, Mumbai',
    status: 'live',
    inningsStatus: 'LIVE',
    teamA: {
      name: 'Maharashtra State U-19',
      score: '148/3',
      overs: '16.2 ov',
      isBatting: true
    },
    teamB: {
      name: 'Vidarbha Academy XI',
      score: 'Yet to bat',
      overs: '',
      isBatting: false
    },
    matchSituation: 'Yashvardhan 58* (34b) · Devraj 41 (28b)',
    summaryNote: 'Partnership: 72 runs (44b) · CRR: 9.06',
    actionText: 'Scout Telemetry'
  },
  {
    id: 'match-3',
    tournament: 'Monsoon Premier Cup',
    stage: 'Grand Final · Completed',
    venue: 'Gymkhana Club Ground',
    status: 'completed',
    inningsStatus: 'RESULT',
    teamA: {
      name: 'Apex Cricket XI',
      score: '194/6',
      overs: '20.0 ov',
      isBatting: false
    },
    teamB: {
      name: 'Suburban Gymkhana',
      score: '168 all out',
      overs: '18.4 ov',
      isBatting: false
    },
    matchSituation: 'Apex Cricket XI won by 26 runs 🏆',
    summaryNote: 'Player of Match: Rohan Verma (4/22)',
    actionText: 'Full Scorecard'
  },
  {
    id: 'match-4',
    tournament: 'West Zone Inter-Academy Trophy',
    stage: 'Round Robin · Match 14',
    venue: 'Pune Stadium, MH',
    status: 'upcoming',
    inningsStatus: 'STARTS 15:30',
    teamA: {
      name: 'North Zone High Performance',
      score: 'Lineups Confirmed',
      overs: '',
      isBatting: false
    },
    teamB: {
      name: 'Deccan Warriors CC',
      score: 'Lineups Confirmed',
      overs: '',
      isBatting: false
    },
    matchSituation: 'Toss scheduled at 15:00 IST · Pitch: Dry Grass',
    summaryNote: 'Scouts attending: Sunil Joshi & Ramesh Pawar',
    actionText: 'Preview Match'
  }
];

// Touch-scrollable Scorecard Carousel for Multiple Simultaneous Matches
const LiveMatchScorecardsCarousel: React.FC<{ onOpenScorer: () => void }> = ({ onOpenScorer }) => {
  const {
    scrollRef,
    canScrollLeft,
    canScrollRight,
    scrollByDirection,
  } = useHorizontalScroll();

  return (
    <div className="bg-gradient-to-r from-[#0F172A] via-[#1E293B] to-[#0F172A] rounded-2xl border border-[#FA4D14]/50 p-4 sm:p-5 shadow-lg text-white space-y-3 relative overflow-hidden">
      {/* Top Header of Match Center */}
      <div className="flex items-center justify-between gap-2 flex-wrap">
        <div className="flex items-center space-x-2">
          <span className="flex h-2.5 w-2.5 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500"></span>
          </span>
          <span className="text-overline text-[#FA4D14]">
            Live Tournament Match Center · {TOP_LIVE_MATCHES.length} Matches Active
          </span>
          <span className="text-[11px] text-slate-400 hidden sm:inline">
            (Swipe sideways ← → with touch)
          </span>
        </div>

        {/* Scroll Controls */}
        <div className="flex items-center space-x-1.5">
          <button
            type="button"
            onClick={() => scrollByDirection('left', 340)}
            className={`p-1.5 rounded-lg border transition-all cursor-pointer ${
              canScrollLeft
                ? 'bg-slate-800 border-[#FA4D14] text-white hover:bg-[#FA4D14]'
                : 'bg-slate-800/60 border-slate-700 text-slate-500 opacity-60'
            }`}
            title="Scroll Previous Match"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => scrollByDirection('right', 340)}
            className={`p-1.5 rounded-lg border transition-all cursor-pointer ${
              canScrollRight
                ? 'bg-slate-800 border-[#FA4D14] text-white hover:bg-[#FA4D14]'
                : 'bg-slate-800/60 border-slate-700 text-slate-500 opacity-60'
            }`}
            title="Scroll Next Match"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={onOpenScorer}
            className="px-3 py-1.5 rounded-xl bg-[#FA4D14] hover:bg-[#D83000] text-white text-xs font-semibold transition-all shadow-md flex items-center gap-1.5 cursor-pointer ml-1"
          >
            <Radio className="w-3.5 h-3.5 animate-pulse" />
            <span className="hidden sm:inline">Live Console</span>
          </button>
        </div>
      </div>

      {/* Horizontal Multiple Scorecards Stream with Touch & Mouse Drag */}
      <div
        ref={scrollRef}
        className="flex items-stretch gap-3 overflow-x-auto touch-pan-x overscroll-x-contain scroll-smooth no-scrollbar py-1 cursor-grab active:cursor-grabbing select-none"
        style={{ WebkitOverflowScrolling: 'touch', touchAction: 'pan-x' }}
      >
        {TOP_LIVE_MATCHES.map((match) => (
          <div
            key={match.id}
            onClick={onOpenScorer}
            className="w-[300px] sm:w-[350px] shrink-0 snap-start bg-[#111827]/90 hover:bg-[#111827] rounded-xl border border-slate-800 hover:border-[#FA4D14]/80 p-3.5 flex flex-col justify-between space-y-2.5 transition-all cursor-pointer group shadow-md"
          >
            {/* Header info */}
            <div className="flex items-center justify-between text-xs text-slate-400 border-b border-slate-800/80 pb-1.5">
              <span className="font-semibold text-slate-300 truncate max-w-[190px]">
                {match.tournament}
              </span>
              <span className={`text-[10px] px-2 py-0.5 rounded font-bold ${
                match.status === 'live'
                  ? 'bg-red-500/20 text-red-400 border border-red-500/30 animate-pulse'
                  : match.status === 'completed'
                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                  : 'bg-slate-700 text-slate-300'
              }`}>
                {match.inningsStatus}
              </span>
            </div>

            {/* Teams & Scores */}
            <div className="space-y-1.5 text-xs sm:text-sm">
              <div className="flex items-center justify-between gap-2">
                <span className={`truncate ${match.teamA.isBatting ? 'font-bold text-white' : 'font-medium text-slate-300'}`}>
                  {match.teamA.name}
                </span>
                <span className="tabular-nums font-semibold text-slate-200 shrink-0">
                  {match.teamA.score} {match.teamA.overs && <span className="text-[11px] text-slate-400 font-normal">({match.teamA.overs})</span>}
                </span>
              </div>

              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-1.5 min-w-0">
                  <span className={`truncate ${match.teamB.isBatting ? 'font-bold text-white' : 'font-medium text-slate-300'}`}>
                    {match.teamB.name}
                  </span>
                  {match.teamB.isBatting && (
                    <span className="text-[9px] px-1 py-0.2 rounded bg-[#FA4D14]/20 text-[#FA4D14] font-semibold border border-[#FA4D14]/40 shrink-0">
                      Bat
                    </span>
                  )}
                </div>
                <span className="tabular-nums font-semibold text-[#FA4D14] shrink-0">
                  {match.teamB.score} {match.teamB.overs && <span className="text-[11px] text-[#FA4D14]/80 font-normal">({match.teamB.overs})</span>}
                </span>
              </div>
            </div>

            {/* Match Situation / Summary Note */}
            <div className="pt-1.5 border-t border-slate-800/80 text-[11px] flex flex-col space-y-0.5">
              <span className="text-amber-400 font-medium flex items-center gap-1 truncate">
                <Activity className="w-3.5 h-3.5 text-[#FA4D14] shrink-0" />
                <span className="truncate">{match.matchSituation}</span>
              </span>
              <span className="text-slate-400 text-[10px] truncate">{match.summaryNote}</span>
            </div>

            {/* Footer Venue & Action */}
            <div className="flex items-center justify-between pt-1 text-[10px] text-slate-400">
              <span className="truncate max-w-[170px]">📍 {match.venue}</span>
              <span className="text-[#FA4D14] font-semibold group-hover:underline flex items-center gap-0.5 shrink-0">
                {match.actionText} →
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Touch-scrollable Profile Suggestions Carousel for Network Growth
const SuggestionsCarousel: React.FC<{
  suggestions: NetworkSuggestion[];
  connectedProfileIds: Set<string>;
  onToggleConnect: (id: string, name: string, category: string) => void;
  onExploreAll: () => void;
}> = ({ suggestions, connectedProfileIds, onToggleConnect, onExploreAll }) => {
  const {
    scrollRef,
    canScrollLeft,
    canScrollRight,
    scrollByDirection,
  } = useHorizontalScroll();

  return (
    <div className="bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#0F172A] rounded-2xl border border-[#FA4D14]/40 p-4 sm:p-5 shadow-xl text-white space-y-4 my-6 overflow-hidden relative">
      <div className="flex items-center justify-between border-b border-[#334155] pb-3 gap-2">
        <div className="flex items-center space-x-2.5 min-w-0">
          <span className="p-2 rounded-xl bg-[#FA4D14]/20 border border-[#FA4D14]/40 text-[#FA4D14] shrink-0">
            <UserPlus className="w-5 h-5" />
          </span>
          <div className="min-w-0">
            <div className="flex items-center space-x-2 flex-wrap gap-y-1">
              <h3 className="text-base sm:text-lg font-semibold text-white truncate">
                Recommended to Grow Your Network
              </h3>
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-[#FA4D14] text-white shrink-0">
                Ecosystem Matches
              </span>
            </div>
            <p className="text-xs text-slate-300 truncate">
              Swipe sideways ← → with touch to connect with athletes, academies & scouts
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-1.5 shrink-0">
          <button
            type="button"
            onClick={() => scrollByDirection('left', 260)}
            className={`p-1.5 rounded-lg border transition-all cursor-pointer ${
              canScrollLeft
                ? 'bg-[#1E293B] border-[#FA4D14] text-white hover:bg-[#FA4D14]'
                : 'bg-[#1E293B]/60 border-[#334155] text-slate-500 opacity-60'
            }`}
            title="Scroll Left"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => scrollByDirection('right', 260)}
            className={`p-1.5 rounded-lg border transition-all cursor-pointer ${
              canScrollRight
                ? 'bg-[#1E293B] border-[#FA4D14] text-white hover:bg-[#FA4D14]'
                : 'bg-[#1E293B]/60 border-[#334155] text-slate-500 opacity-60'
            }`}
            title="Scroll Right"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
          <button 
            type="button"
            onClick={onExploreAll}
            className="text-xs font-sans font-bold text-[#FA4D14] hover:text-white flex items-center gap-1 transition-colors hidden sm:flex cursor-pointer ml-1"
          >
            <span>Explore All</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Horizontal Sideways Carousel with Touch & Mouse Drag */}
      <div 
        ref={scrollRef}
        className="flex items-stretch gap-3 overflow-x-auto pb-2 pt-1 px-0.5 no-scrollbar snap-x snap-mandatory scroll-smooth touch-pan-x overscroll-x-contain cursor-grab active:cursor-grabbing select-none"
        style={{ WebkitOverflowScrolling: 'touch', touchAction: 'pan-x' }}
      >
        {suggestions.map((sug) => {
          const isConnected = connectedProfileIds.has(sug.id);
          return (
            <div 
              key={sug.id} 
              className="w-[210px] sm:w-[230px] shrink-0 snap-start bg-[#1E293B] hover:bg-[#253348] rounded-xl border border-[#334155] hover:border-[#FA4D14]/80 p-3.5 flex flex-col justify-between space-y-3 transition-all duration-200 group shadow-md"
            >
              <div className="space-y-2">
                <div className="flex items-center space-x-2.5">
                  <img 
                    src={sug.avatar} 
                    alt={sug.name} 
                    className="w-11 h-11 rounded-full object-cover border-2 border-[#FA4D14] shrink-0 shadow-sm pointer-events-none" 
                  />
                  <div className="min-w-0 flex-1">
                    <h4 className="text-xs font-bold font-oswald text-white uppercase truncate group-hover:text-[#FA4D14] transition-colors">
                      {sug.name}
                    </h4>
                    <p className="text-[10px] text-slate-300 font-sans truncate">{sug.role}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-2 pt-2 border-t border-[#334155]">
                <div className="flex items-center justify-between text-[9px] font-sans text-slate-400">
                  <span className="px-1.5 py-0.5 rounded bg-[#0F172A] text-[#FA4D14] font-bold border border-[#FA4D14]/30 uppercase">
                    {sug.category}
                  </span>
                  <span className="truncate max-w-[95px] text-slate-300">{sug.location}</span>
                </div>
                
                <button
                  type="button"
                  onClick={() => onToggleConnect(sug.id, sug.name, sug.category)}
                  className={`w-full py-1.5 px-2.5 rounded-lg text-xs font-bold font-sans uppercase tracking-wider transition-all flex items-center justify-center space-x-1.5 cursor-pointer ${
                    isConnected
                      ? 'bg-emerald-600 text-white shadow-sm'
                      : 'bg-[#FA4D14] hover:bg-orange-600 text-white shadow-md'
                  }`}
                >
                  {isConnected ? (
                    <>
                      <CheckCircle className="w-3.5 h-3.5" />
                      <span>{sug.category === 'Academy' || sug.category === 'Organization' ? 'Following' : 'Connected'}</span>
                    </>
                  ) : (
                    <>
                      <UserPlus className="w-3.5 h-3.5" />
                      <span>{sug.category === 'Academy' || sug.category === 'Organization' ? '+ Follow' : '+ Connect'}</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export const CricketNewsfeed: React.FC<CricketNewsfeedProps> = ({
  athletes,
  userRole,
  onSelectAthlete,
  setActiveTab,
  userSession,
  onShareToDirectMessage,
  onStartChatWithUser
}) => {
  const [posts, setPosts] = useState<FeedPost[]>(INITIAL_POSTS);

  const scrollCarousel = (containerId: string, direction: 'left' | 'right') => {
    const el = document.getElementById(containerId);
    if (el) {
      el.scrollBy({ left: direction === 'left' ? -280 : 280, behavior: 'smooth' });
    }
  };
  const [activeFilter, setActiveFilter] = useState<'all' | 'associations' | 'athletes' | 'trials'>('all');
  const [newPostText, setNewPostText] = useState('');
  const [followingState, setFollowingState] = useState<Record<string, boolean>>({
    'assoc-1': true,
    'assoc-2': false,
    'assoc-3': true,
    'assoc-4': false
  });

  // Edit / Delete & 3-Dots Post Options States
  const [editingPostId, setEditingPostId] = useState<string | null>(null);
  const [editingText, setEditingText] = useState<string>('');
  const [openOptionsMenuId, setOpenOptionsMenuId] = useState<string | null>(null);

  // Saved Posts / Bookmarks State
  const [savedPostIds, setSavedPostIds] = useState<Set<string>>(new Set());

  // Comment & Share UI States
  const [openCommentsPostId, setOpenCommentsPostId] = useState<string | null>(null);
  const [openShareMenuId, setOpenShareMenuId] = useState<string | null>(null);
  const [newCommentInput, setNewCommentInput] = useState<string>('');
  const [commentsMap, setCommentsMap] = useState<Record<string, Array<{ id: string; author: string; text: string; time: string }>>>({
    'post-video-1': [
      { id: 'c1', author: 'Coach Ramesh Pawar', text: 'Terrific seam release Rohan! Excellent wrist position.', time: '20 mins ago' }
    ]
  });
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Connected Suggestions State
  const [connectedProfileIds, setConnectedProfileIds] = useState<Set<string>>(new Set(['sug-1']));

  const handleToggleConnectSuggestion = (id: string, name: string, category: string) => {
    setConnectedProfileIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
        showToast(`Disconnected from ${name}`);
      } else {
        next.add(id);
        const verb = category === 'Academy' || category === 'Organization' ? 'Following' : 'Connected with';
        showToast(`Successfully ${verb} ${name}! Network updated.`);
      }
      return next;
    });
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleToggleSavePost = (postId: string) => {
    setSavedPostIds(prev => {
      const next = new Set(prev);
      if (next.has(postId)) {
        next.delete(postId);
        showToast('Post removed from saved bookmarks');
      } else {
        next.add(postId);
        showToast('Post saved to your bookmarks!');
      }
      return next;
    });
  };

  const handleLikePost = (postId: string) => {
    setPosts(prev => prev.map(p => {
      if (p.id === postId) {
        const isEndorsed = !p.isEndorsed;
        return {
          ...p,
          isEndorsed,
          endorsementsCount: isEndorsed ? p.endorsementsCount + 1 : p.endorsementsCount - 1
        };
      }
      return p;
    }));
  };

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPostText.trim()) return;

    const newPost: FeedPost = {
      id: `post-${Date.now()}`,
      authorName: userSession?.name || 'Rohan Verma',
      authorAvatar: userSession?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
      authorRole: 'Right-Arm Fast Bowler • Apex Cricket Academy',
      authorType: 'athlete',
      isVerified: true,
      timeAgo: 'Just now',
      content: newPostText,
      endorsementsCount: 0,
      commentsCount: 0,
      sharesCount: 0,
      isEndorsed: false
    };

    setPosts([newPost, ...posts]);
    setNewPostText('');
    showToast('Post published to Cricket Newsfeed!');
  };

  const handleStartEdit = (post: FeedPost) => {
    setEditingPostId(post.id);
    setEditingText(post.content);
  };

  const handleSaveEdit = (postId: string) => {
    if (!editingText.trim()) return;
    setPosts(prev => prev.map(p => p.id === postId ? { ...p, content: editingText } : p));
    setEditingPostId(null);
    setEditingText('');
    showToast('Post updated successfully!');
  };

  const handleDeletePost = (postId: string) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      setPosts(prev => prev.filter(p => p.id !== postId));
      showToast('Post deleted from feed');
    }
  };

  const handleInternalShare = (postId: string) => {
    setPosts(prev => prev.map(p => {
      if (p.id === postId) {
        return { ...p, sharesCount: p.sharesCount + 1 };
      }
      return p;
    }));
    setOpenShareMenuId(null);
    showToast('Post re-shared to your internal network feed!');
  };

  const handleExternalShare = (postId: string) => {
    const shareUrl = `${window.location.origin}?post=${postId}`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(shareUrl);
      showToast('Shareable link copied to clipboard!');
    } else {
      showToast('Post link: ' + shareUrl);
    }
    setOpenShareMenuId(null);
  };

  const handleAddComment = (postId: string) => {
    if (!newCommentInput.trim()) return;
    const newComment = {
      id: `comment-${Date.now()}`,
      author: userSession?.name || 'Rohan Verma',
      text: newCommentInput,
      time: 'Just now'
    };

    setCommentsMap(prev => ({
      ...prev,
      [postId]: [...(prev[postId] || []), newComment]
    }));

    setPosts(prev => prev.map(p => p.id === postId ? { ...p, commentsCount: p.commentsCount + 1 } : p));
    setNewCommentInput('');
  };

  const toggleFollowAssociation = (assocId: string) => {
    setFollowingState(prev => ({
      ...prev,
      [assocId]: !prev[assocId]
    }));
  };

  const handleAuthorClick = (authorName: string) => {
    const matched = athletes.find(a => a.name.toLowerCase() === authorName.toLowerCase()) ||
      athletes.find(a => a.name.toLowerCase().includes('rohan')) || athletes[0];
    if (matched) {
      onSelectAthlete(matched);
    }
  };

  const filteredPosts = posts;

  return (
    <div className="space-y-6 animate-fade-in text-[#0F172A] relative text-left">
      
      {/* Toast Notification Banner */}
      {toastMessage && (
        <div className="fixed bottom-20 right-6 z-50 bg-[#0F172A] text-white px-4 py-3 rounded-2xl border border-[#FA4D14] shadow-2xl flex items-center gap-2 text-xs tabular-nums animate-bounce">
          <Sparkles className="w-4 h-4 text-[#FA4D14]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Screen Title & Overline - Single Clear H1 for the Newsfeed Screen */}
      <div className="space-y-1">
        <div className="text-overline text-[#FA4D14]">Sports Network Feed</div>
        <h1 className="text-h1 text-[#0F172A]">Cricket & Sports Newsfeed</h1>
        <p className="text-body text-[#64748B] max-w-[65ch]">
          Real-time match highlights, selection trial announcements, and verified network updates.
        </p>
      </div>
      
      {/* Top Banner: Professional Cricket Network Header (Hidden when user is logged in) */}
      {!userSession && (
        <div className="bg-[#0F172A] text-white rounded-3xl border border-[#1E293B] p-6 sm:p-8 shadow-md relative overflow-hidden">
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <div className="flex items-center space-x-2">
                <span className="text-overline text-[#FA4D14] px-2.5 py-0.5 rounded-full bg-[#FA4D14]/20 border border-[#FA4D14]/30">
                  Sports Talent Ecosystem
                </span>
                <span className="text-overline text-slate-300 px-2.5 py-0.5 rounded-full bg-[#1E293B] border border-[#334155]">
                  Where Everything Gets Built
                </span>
              </div>
              <h2 className="text-h2 text-white">
                Global Sports Feed & <span className="text-[#FA4D14]">Talent Network</span>
              </h2>
              <p className="text-body text-slate-300 max-w-[65ch]">
                Connect with sports associations, verified athletes, premier academies, and certified scouts across all sports. Share performance videos, selection updates, and recruitment opportunities in real time.
              </p>
            </div>

            {/* Quick Stats Pill */}
            <div className="flex items-center gap-4 bg-[#1E293B] p-4 rounded-2xl border border-[#334155] shrink-0 text-xs sm:text-sm">
              <div>
                <span className="text-xl sm:text-2xl font-bold text-white block tabular-nums">12,480+</span>
                <span className="text-slate-400 font-medium text-xs">Connected Athletes</span>
              </div>
              <div className="h-8 w-px bg-[#334155]"></div>
              <div>
                <span className="text-xl sm:text-2xl font-bold text-[#FA4D14] block tabular-nums">890+</span>
                <span className="text-slate-400 font-medium text-xs">State Bodies & Clubs</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Layout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* MAIN COLUMN: Posts Feed & Update Creation */}
        <div className="lg:col-span-8 space-y-5">
          
          {/* LIVE MATCH RADAR & DIRECT SCORING ACCESS (Available to ALL users) */}
          <div 
            onClick={() => setActiveTab('livescores')}
            className="bg-gradient-to-r from-[#0F172A] via-[#1E293B] to-[#0F172A] rounded-2xl border border-[#FA4D14]/50 p-4 sm:p-5 shadow-lg text-white space-y-3 cursor-pointer hover:border-[#FA4D14] transition-all group relative overflow-hidden"
          >
            <div className="flex items-center justify-between gap-2 flex-wrap">
              <div className="flex items-center space-x-2">
                <span className="flex h-2.5 w-2.5 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500"></span>
                </span>
                <span className="text-overline text-[#FA4D14]">
                  Live Tournament Match Center · Innings 2
                </span>
              </div>
              <span className="text-xs text-slate-300 bg-white/10 px-2.5 py-0.5 rounded-full">
                Finals · Wankhede Stadium
              </span>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex-1 space-y-1.5 bg-[#111827]/70 p-3 rounded-xl border border-slate-800">
                <div className="flex items-center justify-between gap-3 text-xs sm:text-sm">
                  <span className="font-medium text-slate-300 truncate whitespace-nowrap">Delhi Colts CC</span>
                  <span className="tabular-nums font-semibold text-slate-300 shrink-0 text-right">209/7 (20.0 ov)</span>
                </div>
                <div className="flex items-center justify-between gap-3 text-xs sm:text-sm">
                  <div className="flex items-center gap-1.5 min-w-0">
                    <span className="font-semibold text-white truncate whitespace-nowrap">Apex Cricket Academy</span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#FA4D14]/20 text-[#FA4D14] font-semibold border border-[#FA4D14]/40 shrink-0">
                      Batting
                    </span>
                  </div>
                  <div className="tabular-nums font-semibold text-[#FA4D14] shrink-0 text-right text-xs sm:text-sm">
                    182/4 (14.5/20 ov)
                  </div>
                </div>
                <div className="text-xs text-amber-400 font-medium pt-1.5 border-t border-slate-800/80 flex items-center justify-between flex-wrap gap-1">
                  <span className="flex items-center gap-1">
                    <Activity className="w-3.5 h-3.5 text-[#FA4D14]" />
                    <span>Need 28 Runs in 31 Balls</span>
                  </span>
                  <span className="text-slate-400 text-xs tabular-nums">Target: 210 · CRR: 12.30 · RRR: 5.42</span>
                </div>
              </div>

              <div className="flex items-center space-x-2 shrink-0">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveTab('livescores');
                  }}
                  className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-[#FA4D14] hover:bg-[#D83000] text-white text-xs sm:text-sm font-semibold tracking-[0.01em] transition-all shadow-md group-hover:scale-105 flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Radio className="w-3.5 h-3.5 animate-pulse" />
                  <span>Open Live Scorer Console</span>
                </button>
              </div>
            </div>
          </div>

          {/* Post Creation Card */}
          <div className="bg-white rounded-2xl border border-[#CBD5E1] p-4 shadow-sm space-y-3">
            <div className="flex items-center space-x-3">
              <button
                type="button"
                onClick={() => handleAuthorClick(userSession?.name || 'Rohan Verma')}
                className="group flex items-center space-x-2 text-left cursor-pointer focus:outline-none shrink-0"
                title="View your verified profile"
              >
                <img 
                  src={userSession?.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200"} 
                  alt="Avatar"
                  className="w-10 h-10 rounded-full object-cover border border-[#EA580C] group-hover:ring-2 group-hover:ring-[#EA580C] transition-all"
                />
              </button>
              <input 
                type="text"
                value={newPostText}
                onChange={(e) => setNewPostText(e.target.value)}
                placeholder="Share a match scorelog, trial announcement, or cricket post..."
                className="w-full bg-[#F8FAFC] border border-[#CBD5E1] rounded-xl px-4 py-2.5 text-sm text-[#0F172A] placeholder-[#64748B] focus:outline-none focus:border-[#EA580C]"
              />
            </div>
            
            <div className="flex items-center justify-between pt-2 border-t border-[#E2E8F0] font-sans text-xs">
              <div className="flex items-center space-x-2 text-[#334155]">
                <button 
                  onClick={() => setNewPostText(prev => prev + ' 🏏 Match Performance Scorelog: 4/22 (8.0 ov)')}
                  className="px-2.5 py-1 rounded-lg bg-[#F8FAFC] border border-[#CBD5E1] hover:bg-[#E2E8F0] flex items-center gap-1 cursor-pointer font-bold"
                >
                  <Trophy className="w-3.5 h-3.5 text-[#EA580C]" />
                  <span>Scorelog</span>
                </button>
                <button 
                  onClick={() => setNewPostText(prev => prev + ' 📹 Video Highlight: Seam bowling spell against DY Patil')}
                  className="px-2.5 py-1 rounded-lg bg-[#F8FAFC] border border-[#CBD5E1] hover:bg-[#E2E8F0] flex items-center gap-1 cursor-pointer font-bold"
                >
                  <Video className="w-3.5 h-3.5 text-blue-600" />
                  <span>Video</span>
                </button>
              </div>

              <button
                onClick={handleCreatePost}
                className="px-4 py-1.5 rounded-xl bg-[#EA580C] hover:bg-orange-600 text-white font-bold cursor-pointer flex items-center gap-1 shadow-sm"
              >
                <span>Post</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Posts Feed Stream */}
          <div className="space-y-4">
            {filteredPosts.map((post, index) => {
              const isAuthor = post.authorName.toLowerCase() === (userSession?.name || 'Rohan Verma').toLowerCase() || post.authorName.toLowerCase().includes('rohan');

              return (
                <React.Fragment key={post.id}>
                  <div className="bg-white rounded-2xl border border-[#CBD5E1] p-5 shadow-sm space-y-4">
                  
                  {/* Author Info Header (Clickable Profile Link & Owner Actions) */}
                  <div className="flex items-start justify-between">
                    <button 
                      type="button"
                      onClick={() => handleAuthorClick(post.authorName)}
                      className="flex items-center space-x-3 text-left group cursor-pointer focus:outline-none"
                      title={`Click to view ${post.authorName}'s profile`}
                    >
                      <img 
                        src={post.authorAvatar} 
                        alt={post.authorName} 
                        className="w-11 h-11 rounded-full object-cover border border-[#CBD5E1] group-hover:border-[#EA580C] group-hover:ring-2 group-hover:ring-[#EA580C]/20 transition-all"
                      />
                      <div>
                        <div className="flex items-center space-x-1.5">
                          <h3 className="font-semibold text-[#0F172A] text-base group-hover:text-[#FA4D14] transition-colors truncate">
                            {post.authorName}
                          </h3>
                          {post.isVerified && <ShieldCheck className="w-4 h-4 text-[#FA4D14]" />}
                          <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full capitalize ${
                            post.authorType === 'association' 
                              ? 'bg-amber-100 text-amber-800 border border-amber-300' 
                              : post.authorType === 'scout'
                              ? 'bg-slate-100 text-slate-800 border border-slate-300'
                              : 'bg-orange-100 text-orange-800 border border-orange-200'
                          }`}>
                            {post.authorType}
                          </span>
                        </div>
                        <p className="text-xs text-[#64748B] font-medium">{post.authorRole}</p>
                        <span className="text-[11px] text-[#94A3B8] font-normal">{post.timeAgo}</span>
                      </div>
                    </button>

                    {/* Top Right 3-Dots Options Menu */}
                    <div className="relative font-sans text-xs">
                      <button
                        type="button"
                        onClick={() => setOpenOptionsMenuId(openOptionsMenuId === post.id ? null : post.id)}
                        className="p-1.5 rounded-xl text-[#64748B] hover:text-[#0F172A] hover:bg-[#F1F5F9] transition-all cursor-pointer"
                        title="More post options"
                      >
                        <MoreHorizontal className="w-5 h-5" />
                      </button>

                      {/* 3-Dots Dropdown Options Popup */}
                      {openOptionsMenuId === post.id && (
                        <>
                          <div 
                            className="fixed inset-0 z-20"
                            onClick={() => setOpenOptionsMenuId(null)}
                          />
                          <div className="absolute right-0 top-full mt-1 z-30 w-48 bg-white border border-[#CBD5E1] rounded-2xl shadow-xl overflow-hidden py-1 divide-y divide-[#E2E8F0] text-xs font-sans">
                            {/* Author Actions: Edit and Delete */}
                            {isAuthor && (
                              <div className="py-1">
                                <button
                                  type="button"
                                  onClick={() => {
                                    handleStartEdit(post);
                                    setOpenOptionsMenuId(null);
                                  }}
                                  className="w-full px-3.5 py-2 text-left font-bold text-[#0F172A] hover:bg-[#FAF7F2] hover:text-[#EA580C] flex items-center gap-2 cursor-pointer transition-colors"
                                >
                                  <Edit3 className="w-4 h-4 text-[#EA580C]" />
                                  <span>Edit Post</span>
                                </button>
                                <button
                                  type="button"
                                  onClick={() => {
                                    handleDeletePost(post.id);
                                    setOpenOptionsMenuId(null);
                                  }}
                                  className="w-full px-3.5 py-2 text-left font-bold text-red-600 hover:bg-red-50 flex items-center gap-2 cursor-pointer transition-colors"
                                >
                                  <Trash2 className="w-4 h-4 text-red-600" />
                                  <span>Delete Post</span>
                                </button>
                              </div>
                            )}

                            {/* Save / Bookmark Option */}
                            <div className="py-1">
                              <button
                                type="button"
                                onClick={() => {
                                  handleToggleSavePost(post.id);
                                  setOpenOptionsMenuId(null);
                                }}
                                className="w-full px-3.5 py-2 text-left font-bold text-[#0F172A] hover:bg-[#FAF7F2] hover:text-[#EA580C] flex items-center gap-2 cursor-pointer transition-colors"
                              >
                                {savedPostIds.has(post.id) ? (
                                  <>
                                    <BookmarkCheck className="w-4 h-4 text-[#EA580C]" />
                                    <span>Remove Bookmark</span>
                                  </>
                                ) : (
                                  <>
                                    <Bookmark className="w-4 h-4 text-[#64748B]" />
                                    <span>Save Post</span>
                                  </>
                                )}
                              </button>

                              {!isAuthor && (
                                <button
                                  type="button"
                                  onClick={() => {
                                    if (onStartChatWithUser) {
                                      onStartChatWithUser(post.authorName);
                                    } else {
                                      setActiveTab('messages');
                                    }
                                    setOpenOptionsMenuId(null);
                                  }}
                                  className="w-full px-3.5 py-2 text-left font-bold text-[#0F172A] hover:bg-[#FAF7F2] hover:text-[#EA580C] flex items-center gap-2 cursor-pointer transition-colors"
                                >
                                  <MessageSquare className="w-4 h-4 text-[#EA580C]" />
                                  <span>Message Author</span>
                                </button>
                              )}

                              <button
                                type="button"
                                onClick={() => {
                                  handleExternalShare(post.id);
                                  setOpenOptionsMenuId(null);
                                }}
                                className="w-full px-3.5 py-2 text-left font-bold text-[#0F172A] hover:bg-[#FAF7F2] hover:text-[#EA580C] flex items-center gap-2 cursor-pointer transition-colors"
                              >
                                <Share2 className="w-4 h-4 text-[#64748B]" />
                                <span>Copy Post Link</span>
                              </button>
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Post Body Content or Inline Edit */}
                  {editingPostId === post.id ? (
                    <div className="space-y-2 bg-[#FAF7F2] p-3 rounded-xl border border-[#EA580C]/40">
                      <textarea
                        value={editingText}
                        onChange={(e) => setEditingText(e.target.value)}
                        rows={3}
                        className="w-full bg-white border border-[#CBD5E1] rounded-lg p-2.5 text-sm text-[#0F172A] focus:outline-none focus:border-[#EA580C]"
                      />
                      <div className="flex justify-end space-x-2 font-mono text-xs">
                        <button
                          type="button"
                          onClick={() => setEditingPostId(null)}
                          className="px-3 py-1.5 rounded-lg bg-[#E2E8F0] text-[#334155] font-bold hover:bg-slate-300 transition-all cursor-pointer"
                        >
                          Cancel
                        </button>
                        <button
                          type="button"
                          onClick={() => handleSaveEdit(post.id)}
                          className="px-3 py-1.5 rounded-lg bg-[#EA580C] text-white font-bold hover:bg-orange-600 transition-all cursor-pointer flex items-center gap-1"
                        >
                          <Check className="w-3.5 h-3.5" />
                          <span>Save Changes</span>
                        </button>
                      </div>
                    </div>
                  ) : (
                    <p className="text-sm text-[#1E293B] font-normal leading-relaxed">
                      {post.content}
                    </p>
                  )}

                  {/* Article Header Embed if present */}
                  {post.articleTitle && (
                    <div className="bg-[#FAF7F2] border border-[#E5DFD5] rounded-2xl p-4 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-sans font-bold text-[#FA4D14] uppercase tracking-wider flex items-center gap-1">
                          <FileText className="w-3.5 h-3.5" /> Technical Article • {post.articleReadTime || '3 min read'}
                        </span>
                        <span className="px-2 py-0.5 rounded bg-[#0F172A] text-white text-[10px] font-sans font-bold">
                          SCOUT APPROVED
                        </span>
                      </div>
                      <h3 className="text-base font-bold text-[#0F172A] font-oswald tracking-wide">
                        {post.articleTitle}
                      </h3>
                    </div>
                  )}

                  {/* Clean Instagram / LinkedIn Style Autoplay Video Reel */}
                  {post.videoThumbnail && (
                    <InstagramStyleVideoPlayer
                      videoUrl={post.videoUrl}
                      posterUrl={post.videoThumbnail}
                    />
                  )}

                  {/* Match Scorelog Embed if present */}
                  {post.matchScorelog && (
                    <div className="bg-[#FFF7ED] border border-[#FFEDD5] rounded-xl p-4 space-y-1 text-xs">
                      <div className="flex justify-between items-center font-sans">
                        <span className="font-bold text-[#0F172A]">{post.matchScorelog.matchName}</span>
                        <span className="px-2 py-0.5 rounded bg-[#EA580C] text-white font-bold text-[10px]">
                          VERIFIED MATCH SCORE
                        </span>
                      </div>
                      <p className="text-base font-extrabold text-[#EA580C] font-oswald">
                        {post.matchScorelog.performance}
                      </p>
                      <p className="text-[11px] text-[#475569] font-sans">{post.matchScorelog.result}</p>
                    </div>
                  )}

                  {/* Trial / Opportunity Link Embed if present */}
                  {post.opportunityLink && (
                    <div className="bg-[#F8FAFC] border border-[#CBD5E1] rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div className="space-y-1">
                        <span className="text-[10px] font-sans font-bold text-[#EA580C] uppercase tracking-wider block">
                          Official Association Opening
                        </span>
                        <h5 className="font-bold text-[#0F172A] text-sm">{post.opportunityLink.title}</h5>
                      </div>
                      <button 
                        onClick={() => setActiveTab('opportunities')}
                        className="px-4 py-2 rounded-xl bg-[#09090B] hover:bg-[#18181B] text-white font-sans text-xs font-bold transition-all cursor-pointer shrink-0"
                      >
                        {post.opportunityLink.actionText}
                      </button>
                    </div>
                  )}

                  {/* Clean Equally Distributed Symbols Action Row */}
                  <div className="flex items-center justify-between sm:justify-around px-2 sm:px-6 pt-3 border-t border-[#E2E8F0] text-xs font-sans">
                    
                    {/* Likes Symbol */}
                    <button
                      type="button"
                      onClick={() => handleLikePost(post.id)}
                      className={`flex items-center space-x-1.5 hover:text-[#EA580C] transition-colors cursor-pointer ${
                        post.isEndorsed ? 'text-[#EA580C] font-bold' : 'text-[#64748B]'
                      }`}
                      title="Like post"
                    >
                      <ThumbsUp className={`w-5 h-5 ${post.isEndorsed ? 'fill-[#EA580C] text-[#EA580C]' : ''}`} />
                      <span>{post.endorsementsCount}</span>
                    </button>

                    {/* Comments Symbol */}
                    <button
                      type="button"
                      onClick={() => setOpenCommentsPostId(openCommentsPostId === post.id ? null : post.id)}
                      className="flex items-center space-x-1.5 text-[#64748B] hover:text-[#EA580C] transition-colors cursor-pointer"
                      title="Comments"
                    >
                      <MessageSquare className="w-5 h-5" />
                      <span>{post.commentsCount}</span>
                    </button>

                    {/* Shares Symbol with Dropdown */}
                    <div className="relative">
                      <button
                        type="button"
                        onClick={() => setOpenShareMenuId(openShareMenuId === post.id ? null : post.id)}
                        className="flex items-center space-x-1.5 text-[#64748B] hover:text-[#EA580C] transition-colors cursor-pointer"
                        title="Share post"
                      >
                        <Share2 className="w-5 h-5" />
                        <span>{post.sharesCount}</span>
                      </button>

                      {/* Dropdown Options for Share */}
                      {openShareMenuId === post.id && (
                        <div className="absolute left-0 bottom-full mb-2 w-56 bg-white rounded-2xl border border-[#CBD5E1] shadow-xl p-2 z-30 space-y-1 text-xs">
                          <button
                            type="button"
                            onClick={() => handleInternalShare(post.id)}
                            className="w-full text-left px-3 py-2 rounded-xl hover:bg-[#FAF7F2] font-semibold text-[#0F172A] flex items-center gap-2 cursor-pointer"
                          >
                            <Share2 className="w-4 h-4 text-[#EA580C]" />
                            <span>Share to Internal Feed</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              if (onShareToDirectMessage) {
                                onShareToDirectMessage(post);
                              } else {
                                setActiveTab('messages');
                              }
                              setOpenShareMenuId(null);
                            }}
                            className="w-full text-left px-3 py-2 rounded-xl hover:bg-[#FAF7F2] font-semibold text-[#0F172A] flex items-center gap-2 cursor-pointer"
                          >
                            <MessageSquare className="w-4 h-4 text-[#EA580C]" />
                            <span>Send via Direct Message</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => handleExternalShare(post.id)}
                            className="w-full text-left px-3 py-2 rounded-xl hover:bg-[#FAF7F2] font-semibold text-[#0F172A] flex items-center gap-2 cursor-pointer"
                          >
                            <ExternalLink className="w-4 h-4 text-blue-600" />
                            <span>Copy Link (External Share)</span>
                          </button>
                        </div>
                      )}
                    </div>

                    {/* Save Symbol (Beside Share) */}
                    <button
                      type="button"
                      onClick={() => handleToggleSavePost(post.id)}
                      className={`flex items-center space-x-1.5 hover:text-[#EA580C] transition-colors cursor-pointer ${
                        savedPostIds.has(post.id) ? 'text-[#EA580C] font-bold' : 'text-[#64748B]'
                      }`}
                      title={savedPostIds.has(post.id) ? 'Remove bookmark' : 'Save post'}
                    >
                      {savedPostIds.has(post.id) ? (
                        <BookmarkCheck className="w-5 h-5 fill-[#EA580C] text-[#EA580C]" />
                      ) : (
                        <Bookmark className="w-5 h-5" />
                      )}
                    </button>

                  </div>

                  {/* Expanded Comments Section */}
                  {openCommentsPostId === post.id && (
                    <div className="pt-3 border-t border-[#E2E8F0] space-y-3 font-mono text-xs">
                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          value={newCommentInput}
                          onChange={(e) => setNewCommentInput(e.target.value)}
                          placeholder="Write a comment or scout feedback..."
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') handleAddComment(post.id);
                          }}
                          className="w-full bg-[#F8FAFC] border border-[#CBD5E1] rounded-xl px-3.5 py-2 text-xs text-[#0F172A] focus:outline-none focus:border-[#EA580C]"
                        />
                        <button
                          type="button"
                          onClick={() => handleAddComment(post.id)}
                          className="px-3.5 py-2 rounded-xl bg-[#EA580C] hover:bg-orange-600 text-white font-bold cursor-pointer shrink-0"
                        >
                          Send
                        </button>
                      </div>

                      {/* Comments List */}
                      {(commentsMap[post.id] && commentsMap[post.id].length > 0) ? (
                        <div className="space-y-2 pt-1">
                          {commentsMap[post.id].map(comm => (
                            <div key={comm.id} className="bg-[#FAF7F2] p-2.5 rounded-xl border border-[#E5DFD5] space-y-0.5">
                              <div className="flex justify-between items-center text-[10px] text-[#64748B]">
                                <span className="font-bold text-[#0F172A]">{comm.author}</span>
                                <span>{comm.time}</span>
                              </div>
                              <p className="text-xs text-[#334155] font-sans">{comm.text}</p>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-[11px] text-[#64748B] italic">No comments yet. Be the first to reply!</p>
                      )}
                    </div>
                  )}

                </div>

                {/* Network Suggestions Block after every 5 reels / posts - Horizontal Sideways Carousel */}
                {(index + 1) % 5 === 0 && (
                  <div className="bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#0F172A] rounded-2xl border border-[#FA4D14]/40 p-4 sm:p-5 shadow-xl text-white space-y-4 my-6 overflow-hidden">
                    <div className="flex items-center justify-between border-b border-[#334155] pb-3 gap-2">
                      <div className="flex items-center space-x-2.5 min-w-0">
                        <span className="p-2 rounded-xl bg-[#FA4D14]/20 border border-[#FA4D14]/40 text-[#FA4D14] shrink-0">
                          <UserPlus className="w-5 h-5" />
                        </span>
                        <div className="min-w-0">
                          <div className="flex items-center space-x-2 flex-wrap gap-y-1">
                            <h3 className="text-base sm:text-lg font-semibold text-white truncate">
                              Recommended to Grow Your Network
                            </h3>
                            <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-[#FA4D14] text-white shrink-0">
                              Ecosystem Matches
                            </span>
                          </div>
                          <p className="text-xs text-slate-300 truncate">
                            Swipe sideways ← → to connect with players, academies, scouts & organizations
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-1.5 shrink-0">
                        <button
                          type="button"
                          onClick={() => scrollCarousel(`sug-carousel-${index}`, 'left')}
                          className="p-1.5 rounded-lg bg-[#1E293B] border border-[#334155] hover:border-[#FA4D14] text-slate-300 hover:text-white transition-all cursor-pointer"
                          title="Scroll Left"
                        >
                          <ChevronLeft className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => scrollCarousel(`sug-carousel-${index}`, 'right')}
                          className="p-1.5 rounded-lg bg-[#1E293B] border border-[#334155] hover:border-[#FA4D14] text-slate-300 hover:text-white transition-all cursor-pointer"
                          title="Scroll Right"
                        >
                          <ChevronRight className="w-4 h-4" />
                        </button>
                        <button 
                          type="button"
                          onClick={() => setActiveTab('search')}
                          className="text-xs font-sans font-bold text-[#FA4D14] hover:text-white flex items-center gap-1 transition-colors hidden sm:flex cursor-pointer ml-1"
                        >
                          <span>Explore All</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    {/* Horizontal Sideways Carousel */}
                    <div 
                      id={`sug-carousel-${index}`}
                      className="flex items-stretch gap-3 overflow-x-auto pb-2 pt-1 px-0.5 scrollbar-thin scrollbar-thumb-[#FA4D14]/50 scrollbar-track-slate-800/40 snap-x snap-mandatory scroll-smooth"
                    >
                      {NETWORK_SUGGESTIONS.map((sug) => {
                        const isConnected = connectedProfileIds.has(sug.id);
                        return (
                          <div 
                            key={sug.id} 
                            className="w-[210px] sm:w-[230px] shrink-0 snap-start bg-[#1E293B] hover:bg-[#253348] rounded-xl border border-[#334155] hover:border-[#FA4D14]/80 p-3.5 flex flex-col justify-between space-y-3 transition-all duration-200 group shadow-md"
                          >
                            <div className="space-y-2">
                              <div className="flex items-center space-x-2.5">
                                <img 
                                  src={sug.avatar} 
                                  alt={sug.name} 
                                  className="w-11 h-11 rounded-full object-cover border-2 border-[#FA4D14] shrink-0 shadow-sm" 
                                />
                                <div className="min-w-0 flex-1">
                                  <h4 className="text-xs font-bold font-oswald text-white uppercase truncate group-hover:text-[#FA4D14] transition-colors">
                                    {sug.name}
                                  </h4>
                                  <p className="text-[10px] text-slate-300 font-sans truncate">{sug.role}</p>
                                </div>
                              </div>
                            </div>

                            <div className="space-y-2 pt-2 border-t border-[#334155]">
                              <div className="flex items-center justify-between text-[9px] font-sans text-slate-400">
                                <span className="px-1.5 py-0.5 rounded bg-[#0F172A] text-[#FA4D14] font-bold border border-[#FA4D14]/30 uppercase">
                                  {sug.category}
                                </span>
                                <span className="truncate max-w-[95px] text-slate-300">{sug.location}</span>
                              </div>
                              
                              <button
                                type="button"
                                onClick={() => handleToggleConnectSuggestion(sug.id, sug.name, sug.category)}
                                className={`w-full py-1.5 px-2.5 rounded-lg text-xs font-bold font-sans uppercase tracking-wider transition-all flex items-center justify-center space-x-1.5 cursor-pointer ${
                                  isConnected
                                    ? 'bg-emerald-600 text-white shadow-sm'
                                    : 'bg-[#FA4D14] hover:bg-orange-600 text-white shadow-md'
                                }`}
                              >
                                {isConnected ? (
                                  <>
                                    <CheckCircle className="w-3.5 h-3.5" />
                                    <span>{sug.category === 'Academy' || sug.category === 'Organization' ? 'Following' : 'Connected'}</span>
                                  </>
                                ) : (
                                  <>
                                    <UserPlus className="w-3.5 h-3.5" />
                                    <span>{sug.category === 'Academy' || sug.category === 'Organization' ? '+ Follow' : '+ Connect'}</span>
                                  </>
                                )}
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </React.Fragment>
            );
          })}
          </div>

        </div>

        {/* RIGHT COLUMN: Associations Directory & Network Recommendations */}
        <div className="lg:col-span-4 space-y-5">
          
          {/* Associations Directory */}
          <div className="bg-white rounded-2xl border border-[#CBD5E1] p-5 shadow-sm space-y-4">
            <div className="pb-2 border-b border-[#E2E8F0]">
              <div className="text-overline text-[#FA4D14] mb-0.5">Directory</div>
              <h2 className="text-h3 text-[#0F172A] flex items-center gap-1.5">
                <Building2 className="w-4 h-4 text-[#FA4D14]" />
                State Associations & Academies
              </h2>
            </div>

            <div className="space-y-3">
              {ASSOCIATIONS_DIRECTORY.map((assoc) => {
                const isFollowing = followingState[assoc.id];
                return (
                  <div key={assoc.id} className="flex items-center justify-between gap-2 p-2 rounded-xl hover:bg-[#F8FAFC] transition-colors">
                    <div className="flex items-center space-x-2.5 overflow-hidden">
                      <img 
                        src={assoc.logo} 
                        alt={assoc.name} 
                        className="w-9 h-9 rounded-xl object-cover shrink-0 border border-[#CBD5E1]"
                      />
                      <div className="truncate">
                        <h3 className="font-semibold text-xs text-[#0F172A] truncate">{assoc.name}</h3>
                        <span className="text-[11px] text-[#64748B] block tabular-nums">{assoc.followers}</span>
                      </div>
                    </div>

                    <button
                      onClick={() => toggleFollowAssociation(assoc.id)}
                      className={`px-3 py-1 rounded-lg text-xs font-semibold tracking-[0.01em] transition-all cursor-pointer shrink-0 ${
                        isFollowing
                          ? 'bg-[#F8FAFC] text-[#334155] border border-[#CBD5E1]'
                          : 'bg-[#FA4D14] text-white hover:bg-orange-600'
                      }`}
                    >
                      {isFollowing ? 'Connected' : '+ Connect'}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Network Opportunities Spotlight */}
          <div className="bg-[#0F172A] text-white rounded-2xl border border-[#1E293B] p-5 shadow-sm space-y-3 text-xs">
            <span className="text-overline text-[#FA4D14] block">
              Active Network Opportunities
            </span>
            <h3 className="font-semibold text-base text-white">
              Maharashtra State League Trials
            </h3>
            <p className="text-slate-300 text-xs leading-relaxed max-w-[65ch]">
              Open for bowlers with 30+ wickets in state tournaments. Direct verified evaluation by West Zone scouts.
            </p>
            <button 
              onClick={() => setActiveTab('opportunities')}
              className="w-full py-2.5 rounded-xl bg-[#FA4D14] hover:bg-orange-600 text-white font-semibold text-xs tracking-[0.01em] transition-all cursor-pointer text-center"
            >
              Browse Network Trials
            </button>
          </div>

        </div>

      </div>

    </div>
  );
};
