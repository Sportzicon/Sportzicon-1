import React, { useState } from 'react';
import { Athlete, UserSession } from '../types';
import { InstagramStyleVideoPlayer } from './InstagramStyleVideoPlayer';
import { RadarChartDiagram } from './RadarChartDiagram';
import { 
  X, 
  ShieldCheck, 
  Video, 
  Award, 
  Mail, 
  Download, 
  Share2, 
  Sparkles, 
  CheckCircle2, 
  Trophy, 
  Play, 
  FileText, 
  Lock, 
  Unlock, 
  ExternalLink, 
  Plus, 
  FileCheck, 
  Upload, 
  Bot, 
  MapPin, 
  Heart, 
  MessageCircle, 
  Eye,
  Check,
  Target,
  Activity,
  BarChart2,
  UserMinus,
  Edit2,
  Trash2,
  Zap,
  Star,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

interface AthleteProfileModalProps {
  athlete: Athlete | null;
  onClose: () => void;
  onApplyForTrial?: (athleteName: string) => void;
  onStartChat?: (athlete: Athlete) => void;
  userSession?: UserSession | null;
}

interface TournamentEntry {
  id: string;
  name: string;
  year: string;
  url: string;
  location: string;
  trophy: string;
  statsSummary: string;
  sourceType: 'app' | 'doc' | 'manual';
  scorecardPdfName?: string;
  scorecardStats?: string;
}

interface ProfilePost {
  id: string;
  type: 'video' | 'photo';
  title: string;
  caption: string;
  mediaUrl: string;
  likes: number;
  comments: number;
  date: string;
}

export const AthleteProfileModal: React.FC<AthleteProfileModalProps> = ({
  athlete,
  onClose,
  onApplyForTrial,
  onStartChat,
  userSession,
}) => {
  const [isFollowing, setIsFollowing] = useState(false);
  const isOwnProfile = Boolean(userSession && athlete && (athlete.id === userSession.sportziconId || athlete.name === userSession.name));

  // Vault Permission Approval State (Scout Request vs Owner Approval)
  const [vaultPermissionStatus, setVaultPermissionStatus] = useState<'locked' | 'requested' | 'granted'>('locked');

  // Minimized Section States (Minimized by default for at-a-glance profile viewing)
  const [showSpecsDetails, setShowSpecsDetails] = useState<boolean>(false);
  const [showTournamentsDetails, setShowTournamentsDetails] = useState<boolean>(false);
  const [showScorecardsDetails, setShowScorecardsDetails] = useState<boolean>(false);
  const [showDocumentsDetails, setShowDocumentsDetails] = useState<boolean>(false);

  // Preview Modal for Document In-App Viewing (No Download)
  const [activeDocPreview, setActiveDocPreview] = useState<string | null>(null);

  // AI Scorecard Parser Agent States
  const [isAiAgentRunning, setIsAiAgentRunning] = useState(false);
  const [aiLogs, setAiLogs] = useState<string[]>([]);
  const [aiSuccessMessage, setAiSuccessMessage] = useState<string | null>(null);

  // Tournament Tiles State with Sources (App Verified, Doc Extracted, Manual)
  const [tournaments, setTournaments] = useState<TournamentEntry[]>([
    {
      id: 'tourn-1',
      name: 'Mumbai MCA U-19 Championship 2025',
      year: '2025',
      url: 'https://mca.cricket/tournaments/u19-2025',
      location: 'Mumbai, MH',
      trophy: 'Winner 🏆',
      statsSummary: '6 Matches • 18 Wickets • Econ 3.82',
      sourceType: 'app',
      scorecardPdfName: 'Semi_Final_MCA_U19_Scorecard.pdf',
      scorecardStats: '4/22 in 8.0 overs vs Suburban Gymkhana'
    },
    {
      id: 'tourn-2',
      name: 'BCCI Vijay Merchant Trophy 2024',
      year: '2024',
      url: 'https://bcci.tv/domestic/vijay-merchant',
      location: 'Pune, MH',
      trophy: 'Quarterfinalist 🥉',
      statsSummary: '4 Matches • 12 Wickets • Avg 14.8',
      sourceType: 'doc',
      scorecardPdfName: 'Vijay_Merchant_Qf_Scorecard.pdf',
      scorecardStats: '3/31 & 42 runs vs West Zone'
    },
    {
      id: 'tourn-3',
      name: 'Inter-Academy Premier League 2025',
      year: '2025',
      url: 'https://apexcricket.in/iapl-2025',
      location: 'Thane, MH',
      trophy: 'Runner-Up 🥈',
      statsSummary: '5 Matches • 14 Wickets • Best 5/18',
      sourceType: 'manual',
      scorecardPdfName: 'IAPL_Finals_Scorecard.pdf',
      scorecardStats: '5/18 in 4.0 overs vs Apex Academy'
    }
  ]);

  // Add Tournament Form State
  const [isAddTournamentOpen, setIsAddTournamentOpen] = useState(false);
  const [newTournName, setNewTournName] = useState('');
  const [newTournYear, setNewTournYear] = useState('2026');
  const [newTournUrl, setNewTournUrl] = useState('');
  const [newTournLocation, setNewTournLocation] = useState('Mumbai, MH');
  const [newTournTrophy, setNewTournTrophy] = useState('Participant');

  // Scorecards State
  const [scorecards, setScorecards] = useState([
    {
      id: 'sc-1',
      matchName: 'MCA U-19 Semifinal vs Suburban Gymkhana',
      date: 'Aug 12, 2026',
      fileName: 'MCA_U19_Semifinal_Scorecard.pdf',
      figures: '4/22 (8.0 Overs, 2 Maidens)',
      verifiedBy: 'State Match Referee'
    },
    {
      id: 'sc-2',
      matchName: 'BCCI Vijay Merchant Quarterfinal',
      date: 'Dec 18, 2025',
      fileName: 'BCCI_Vijay_Merchant_QF_Scorelog.pdf',
      figures: '3/31 & 42 Runs (Middle Order)',
      verifiedBy: 'BCCI Scorer Pass'
    }
  ]);

  // "Your Posts" Feed State with Edit & Delete Management
  const [profilePosts, setProfilePosts] = useState<ProfilePost[]>([
    {
      id: 'post-1',
      type: 'video',
      title: '138 km/h Death Yorker Wicket Spell',
      caption: 'Execution in the 19th over of the club semifinal. Worked on seam orientation during high-performance camp.',
      mediaUrl: athlete?.avatar || 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&w=600&q=80',
      likes: 142,
      comments: 18,
      date: '2 days ago'
    },
    {
      id: 'post-2',
      type: 'photo',
      title: 'State Championship Trophy Ceremony',
      caption: 'Humbled to receive Best Bowler of the Tournament award at Mumbai MCA grounds!',
      mediaUrl: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&w=600&q=80',
      likes: 289,
      comments: 34,
      date: '1 week ago'
    }
  ]);

  if (!athlete) return null;

  // Multi-Role Category Detector
  const roleLower = (athlete.primaryRole || '').toLowerCase();
  const isCoach = roleLower.includes('coach');
  const isTrainer = roleLower.includes('trainer') || roleLower.includes('fitness') || roleLower.includes('strength') || roleLower.includes('s&c');
  const isEducator = roleLower.includes('educator') || roleLower.includes('academic') || roleLower.includes('professor') || roleLower.includes('teacher') || roleLower.includes('degree');
  const isPhysio = roleLower.includes('physio') || roleLower.includes('doctor');
  const isUmpire = roleLower.includes('umpire') || roleLower.includes('official') || roleLower.includes('referee');
  const isGroundsman = roleLower.includes('groundsman') || roleLower.includes('curator') || roleLower.includes('turf');
  const isDirector = roleLower.includes('director') || roleLower.includes('operation') || roleLower.includes('manager');

  // Run AI Agent Scorecard Scanner
  const handleRunAiAgent = () => {
    setIsAiAgentRunning(true);
    setAiLogs([]);
    setAiSuccessMessage(null);

    const steps = [
      'Reading uploaded scorecard document (Mumbai_Club_Semifinal_Scorecard.pdf)...',
      'AI Agent analyzing table structures & bowler over-by-over log...',
      'Extracted Performance: 4 Wickets for 22 Runs (8.0 Overs, 2 Maidens, Econ: 2.75)',
      'Match Identified: MCA U-19 Championship 2025 Semifinals',
      'Auto-populating Tournament Tile & tagging source as [PDF Extracted]...',
      'Career stats recalculated and synchronized across Sportzicon ecosystem!'
    ];

    steps.forEach((step, index) => {
      setTimeout(() => {
        setAiLogs(prev => [...prev, step]);
        if (index === steps.length - 1) {
          setIsAiAgentRunning(false);
          setAiSuccessMessage('AI Agent successfully extracted scorecard stats, created tournament entry, and linked PDF file!');
          const parsedTourn: TournamentEntry = {
            id: `tourn-ai-${Date.now()}`,
            name: 'Mumbai Club Knockout Cup 2026',
            year: '2026',
            url: 'https://mca.cricket/tournaments/knockout-2026',
            location: 'Wankhede Ground, Mumbai',
            trophy: 'Winner 🏆',
            statsSummary: '3 Matches • 9 Wickets • Econ 3.10',
            sourceType: 'doc',
            scorecardPdfName: 'Mumbai_Club_Semifinal_Scorecard.pdf',
            scorecardStats: '4/22 in 8.0 overs (Econ 2.75)'
          };
          setTournaments(prev => [parsedTourn, ...prev]);
        }
      }, (index + 1) * 700);
    });
  };

  // Add Tournament Submit
  const handleAddTournamentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTournName.trim()) return;

    const newEntry: TournamentEntry = {
      id: `tourn-custom-${Date.now()}`,
      name: newTournName,
      year: newTournYear,
      url: newTournUrl || 'https://mca.cricket',
      location: newTournLocation,
      trophy: newTournTrophy,
      statsSummary: 'Verified Manual Logged Entry',
      sourceType: 'manual'
    };

    setTournaments([newEntry, ...tournaments]);
    setIsAddTournamentOpen(false);
    setNewTournName('');
    setNewTournUrl('');
  };

  // Edit Post Caption Handler
  const handleEditPost = (postId: string) => {
    const post = profilePosts.find(p => p.id === postId);
    if (!post) return;
    const newCaption = prompt('Edit caption:', post.caption);
    if (newCaption !== null) {
      setProfilePosts(profilePosts.map(p => p.id === postId ? { ...p, caption: newCaption } : p));
    }
  };

  // Delete Post Handler
  const handleDeletePost = (postId: string) => {
    if (confirm('Are you sure you want to delete this post?')) {
      setProfilePosts(profilePosts.filter(p => p.id !== postId));
    }
  };

  // Directly handle chat opening
  const handleStartTextChat = () => {
    onClose();
    if (onStartChat) {
      onStartChat(athlete);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#0F172A]/80 backdrop-blur-md flex items-center justify-center p-2.5 sm:p-5 overflow-y-auto animate-fade-in font-sans">
      <div className="bg-[#F8FAFC] border border-[#CBD5E1] rounded-3xl max-w-3xl w-full max-h-[94vh] overflow-y-auto shadow-2xl relative p-3.5 sm:p-6 space-y-5 text-[#0F172A]">
        
        {/* Sticky Header Bar */}
        <div className="flex items-center justify-between border-b border-[#CBD5E1] pb-2.5 sticky top-0 bg-[#F8FAFC] z-30">
          <div className="flex items-center space-x-2">
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-[#0F172A] text-white tracking-wide">
              {athlete.primaryRole}
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-[#475569] hover:text-[#0F172A] bg-white border border-[#CBD5E1] cursor-pointer transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* HERO CARD: Unified Professional Typography */}
        <div className="bg-[#0F172A] text-white rounded-2xl border border-[#1E293B] p-5 sm:p-6 shadow-lg relative overflow-hidden flex flex-col items-center text-center space-y-3.5">
          
          {/* Profile Picture */}
          <div className="relative">
            <img
              src={athlete.avatar}
              alt={athlete.name}
              className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover border-2 border-[#FA4D14] shadow-xl"
            />
            <span className="absolute -bottom-1 -right-1 bg-emerald-500 text-white p-1 rounded-full border-2 border-[#0F172A] shadow" title="Verified Profile">
              <ShieldCheck className="w-3.5 h-3.5" />
            </span>
          </div>

          {/* Clean Layout Order: Name -> Role & Org -> ID -> Age & Location */}
          <div className="space-y-1.5 max-w-md">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-tight">
              {athlete.name}
            </h2>

            <p className="text-slate-200 text-xs sm:text-sm font-semibold tracking-wide">
              {athlete.primaryRole} <span className="text-slate-500 mx-1">•</span> <span className="text-[#FA4D14] font-bold">{athlete.currentClubOrAcademy}</span>
            </p>

            <div>
              <span className="text-[11px] font-semibold tracking-wider text-[#FA4D14] uppercase bg-[#FA4D14]/10 px-3 py-0.5 rounded-full inline-flex items-center gap-1 border border-[#FA4D14]/25">
                ID: #{athlete.id.toUpperCase()}
              </span>
            </div>

            <p className="text-slate-400 text-xs font-medium pt-0.5">
              Age {athlete.age} <span className="text-slate-600 mx-1">•</span> {athlete.location}
            </p>
          </div>

          {/* Follow & Connections Stats */}
          <div className="flex flex-wrap items-center justify-center gap-3 text-xs text-slate-300 font-medium py-2.5 border-t border-b border-[#1E293B] w-full max-w-sm">
            <span className="text-slate-300"><strong className="text-white font-bold text-xs">1,420</strong> Connections</span>
            <span className="text-slate-600">•</span>
            <span className="text-slate-300"><strong className="text-white font-bold text-xs">{isFollowing ? 389 : 388}</strong> Followers</span>
            {isFollowing ? (
              <div className="flex items-center gap-1.5">
                <span className="px-3 py-1 rounded-full font-bold text-xs bg-emerald-600 text-white flex items-center gap-1 shadow-sm">
                  <Check className="w-3 h-3" />
                  <span>Following</span>
                </span>
                <button
                  onClick={() => setIsFollowing(false)}
                  className="px-2.5 py-1 rounded-full font-bold text-xs bg-slate-800 hover:bg-red-600 text-slate-200 hover:text-white transition-all cursor-pointer border border-slate-700 hover:border-red-500 flex items-center gap-1"
                  title="Unfollow user"
                >
                  <UserMinus className="w-3 h-3" />
                  <span>Unfollow</span>
                </button>
              </div>
            ) : (
              <button
                onClick={() => setIsFollowing(true)}
                className="px-3.5 py-1 rounded-full font-bold text-xs bg-[#FA4D14] hover:bg-[#D83000] text-white transition-all cursor-pointer flex items-center gap-1 shadow-md"
              >
                <Plus className="w-3 h-3" />
                <span>Follow</span>
              </button>
            )}
          </div>

          {/* Actions Row: Text Chat (Only for other profiles) & Export CV */}
          <div className={`grid ${isOwnProfile ? 'grid-cols-1 max-w-xs' : 'grid-cols-2 max-w-md'} gap-2.5 w-full pt-1 mx-auto justify-center`}>
            {!isOwnProfile && (
              <button
                onClick={handleStartTextChat}
                className="py-2.5 px-3 rounded-xl bg-[#FA4D14] hover:bg-[#D83000] text-white font-bold text-xs uppercase tracking-wider transition-all shadow flex items-center justify-center space-x-1.5 cursor-pointer"
              >
                <Mail className="w-4 h-4" />
                <span>Text Chat</span>
              </button>
            )}

            <button
              onClick={() => alert(`Verified Sports CV PDF for ${athlete.name} exported.`)}
              className="py-2.5 px-3 rounded-xl bg-[#1E293B] hover:bg-[#334155] text-white border border-[#334155] font-bold text-xs uppercase tracking-wider transition-all shadow flex items-center justify-center space-x-1.5 cursor-pointer"
            >
              <Download className="w-4 h-4 text-[#FA4D14]" />
              <span>Export CV</span>
            </button>
          </div>

        </div>

        {/* =========================================================================
            SECTION 1: BIO & CAREER OVERVIEW
           ========================================================================= */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-[#CBD5E1] shadow-sm space-y-2.5">
          <h3 className="text-sm font-bold text-[#0F172A] uppercase tracking-wider flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#FA4D14]" />
            <span>Bio & Career Overview</span>
          </h3>
          <p className="text-[#334155] text-xs sm:text-sm leading-relaxed italic bg-[#FAF7F2] p-4 rounded-xl border border-[#E5DFD5] font-normal">
            "{athlete.bio}"
          </p>
        </div>

        {/* =========================================================================
            SECTION 2: ROLE SPECIFICATIONS & PERFORMANCE METRICS
           ========================================================================= */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-[#CBD5E1] shadow-sm space-y-3">
          <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-2.5">
            <div>
              <h3 className="text-sm font-bold text-[#0F172A] uppercase tracking-wider flex items-center gap-2">
                <BarChart2 className="w-4 h-4 text-[#FA4D14]" />
                <span>Role Specifications & Professional Metrics</span>
              </h3>
              <p className="text-xs text-[#64748B] font-normal mt-0.5">Technical profile tailored to sports role background.</p>
            </div>
            <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
              ✓ Verified Live Sync
            </span>
          </div>

          {/* AT-A-GLANCE SUMMARY & EXPAND TOGGLE */}
          <div className="bg-[#FAF7F2] p-3 rounded-xl border border-[#E5DFD5] flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-2.5 py-1 rounded-lg bg-[#0F172A] text-white font-bold text-xs">
                {athlete.primaryRole}
              </span>
              <span className="text-[#64748B] font-medium">
                {isCoach ? 'BCCI Level 3 Master • 78.4% Win Rate' : isTrainer ? 'CSCS Certified • 220+ Pro Athletes' : `Performance Index: ${athlete.performanceIndex || 92}/100 • Benchmark: ${athlete.topBenchmark || 'Elite'}`}
              </span>
            </div>

            <button
              onClick={() => setShowSpecsDetails(!showSpecsDetails)}
              className="text-xs font-bold text-[#FA4D14] hover:text-[#D83000] flex items-center gap-1 cursor-pointer bg-[#FA4D14]/10 hover:bg-[#FA4D14]/20 px-3 py-1.5 rounded-lg border border-[#FA4D14]/30 transition-colors ml-auto sm:ml-0"
            >
              <span>{showSpecsDetails ? 'Minimize details' : 'Click here for more details'}</span>
              {showSpecsDetails ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>
          </div>

          {/* EXPANDED DETAILS */}
          {showSpecsDetails && (
            <div className="space-y-4 pt-2 border-t border-slate-100 animate-fadeIn">

          {/* DYNAMIC ROLE ADAPTIVE TECHNICAL SPECIFICATIONS */}
          {isCoach ? (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs">
              <div className="bg-[#FAF7F2] p-2.5 rounded-xl border border-[#E5DFD5]">
                <span className="text-[10px] text-[#64748B] uppercase font-bold block">Coaching Degree</span>
                <span className="text-xs font-bold text-[#0F172A]">BCCI Level 3 Master</span>
              </div>
              <div className="bg-[#FAF7F2] p-2.5 rounded-xl border border-[#E5DFD5]">
                <span className="text-[10px] text-[#64748B] uppercase font-bold block">Tactical Specialization</span>
                <span className="text-xs font-bold text-[#0F172A]">Pace Bowling & Powerplay</span>
              </div>
              <div className="bg-[#FAF7F2] p-2.5 rounded-xl border border-[#E5DFD5]">
                <span className="text-[10px] text-[#64748B] uppercase font-bold block">Match Win Rate</span>
                <span className="text-xs font-bold text-[#FA4D14]">78.4% Championship Win</span>
              </div>
              <div className="bg-[#FAF7F2] p-2.5 rounded-xl border border-[#E5DFD5]">
                <span className="text-[10px] text-[#64748B] uppercase font-bold block">Pro Coaching Exp</span>
                <span className="text-xs font-bold text-emerald-600">12+ Years Circuit</span>
              </div>
            </div>
          ) : isTrainer ? (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs">
              <div className="bg-[#FAF7F2] p-2.5 rounded-xl border border-[#E5DFD5]">
                <span className="text-[10px] text-[#64748B] uppercase font-bold block">Certification</span>
                <span className="text-xs font-bold text-[#0F172A]">CSCS & Sports Science</span>
              </div>
              <div className="bg-[#FAF7F2] p-2.5 rounded-xl border border-[#E5DFD5]">
                <span className="text-[10px] text-[#64748B] uppercase font-bold block">Conditioning Focus</span>
                <span className="text-xs font-bold text-[#0F172A]">Fast Bowler Speed & Load</span>
              </div>
              <div className="bg-[#FAF7F2] p-2.5 rounded-xl border border-[#E5DFD5]">
                <span className="text-[10px] text-[#64748B] uppercase font-bold block">Conditioning Benchmark</span>
                <span className="text-xs font-bold text-[#FA4D14]">High Performance Speed</span>
              </div>
              <div className="bg-[#FAF7F2] p-2.5 rounded-xl border border-[#E5DFD5]">
                <span className="text-[10px] text-[#64748B] uppercase font-bold block">Athletes Trained</span>
                <span className="text-xs font-bold text-emerald-600">220+ Pro Athletes</span>
              </div>
            </div>
          ) : isEducator ? (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs">
              <div className="bg-[#FAF7F2] p-2.5 rounded-xl border border-[#E5DFD5]">
                <span className="text-[10px] text-[#64748B] uppercase font-bold block">Academic Degree</span>
                <span className="text-xs font-bold text-[#0F172A]">M.P.Ed / Ph.D Sports Sci</span>
              </div>
              <div className="bg-[#FAF7F2] p-2.5 rounded-xl border border-[#E5DFD5]">
                <span className="text-[10px] text-[#64748B] uppercase font-bold block">Research Domain</span>
                <span className="text-xs font-bold text-[#0F172A]">Biomechanics & Pedagogy</span>
              </div>
              <div className="bg-[#FAF7F2] p-2.5 rounded-xl border border-[#E5DFD5]">
                <span className="text-[10px] text-[#64748B] uppercase font-bold block">Institution</span>
                <span className="text-xs font-bold text-[#FA4D14]">National Sports Univ</span>
              </div>
              <div className="bg-[#FAF7F2] p-2.5 rounded-xl border border-[#E5DFD5]">
                <span className="text-[10px] text-[#64748B] uppercase font-bold block">Academic Papers</span>
                <span className="text-xs font-bold text-emerald-600">14 Published Journals</span>
              </div>
            </div>
          ) : isPhysio ? (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs">
              <div className="bg-[#FAF7F2] p-2.5 rounded-xl border border-[#E5DFD5]">
                <span className="text-[10px] text-[#64748B] uppercase font-bold block">Medical Degree</span>
                <span className="text-xs font-bold text-[#0F172A]">M.P.T Sports Medicine</span>
              </div>
              <div className="bg-[#FAF7F2] p-2.5 rounded-xl border border-[#E5DFD5]">
                <span className="text-[10px] text-[#64748B] uppercase font-bold block">Rehab Focus</span>
                <span className="text-xs font-bold text-[#0F172A]">Lumbar Stress & Shoulder</span>
              </div>
              <div className="bg-[#FAF7F2] p-2.5 rounded-xl border border-[#E5DFD5]">
                <span className="text-[10px] text-[#64748B] uppercase font-bold block">Return-to-Play</span>
                <span className="text-xs font-bold text-[#FA4D14]">96.2% Success Rate</span>
              </div>
              <div className="bg-[#FAF7F2] p-2.5 rounded-xl border border-[#E5DFD5]">
                <span className="text-[10px] text-[#64748B] uppercase font-bold block">Clinical Exp</span>
                <span className="text-xs font-bold text-emerald-600">9+ Years Elite Care</span>
              </div>
            </div>
          ) : isUmpire ? (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs">
              <div className="bg-[#FAF7F2] p-2.5 rounded-xl border border-[#E5DFD5]">
                <span className="text-[10px] text-[#64748B] uppercase font-bold block">Official Level</span>
                <span className="text-xs font-bold text-[#0F172A]">BCCI Level 2 Certified</span>
              </div>
              <div className="bg-[#FAF7F2] p-2.5 rounded-xl border border-[#E5DFD5]">
                <span className="text-[10px] text-[#64748B] uppercase font-bold block">Matches Officiated</span>
                <span className="text-xs font-bold text-[#0F172A]">142 Ranji & Club Games</span>
              </div>
              <div className="bg-[#FAF7F2] p-2.5 rounded-xl border border-[#E5DFD5]">
                <span className="text-[10px] text-[#64748B] uppercase font-bold block">DRS Accuracy</span>
                <span className="text-xs font-bold text-[#FA4D14]">98.4% Verified Score</span>
              </div>
              <div className="bg-[#FAF7F2] p-2.5 rounded-xl border border-[#E5DFD5]">
                <span className="text-[10px] text-[#64748B] uppercase font-bold block">Laws Expertise</span>
                <span className="text-xs font-bold text-emerald-600">MCC Laws Certified</span>
              </div>
            </div>
          ) : isGroundsman ? (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs">
              <div className="bg-[#FAF7F2] p-2.5 rounded-xl border border-[#E5DFD5]">
                <span className="text-[10px] text-[#64748B] uppercase font-bold block">Curator Level</span>
                <span className="text-xs font-bold text-[#0F172A]">BCCI Chief Pitch Curator</span>
              </div>
              <div className="bg-[#FAF7F2] p-2.5 rounded-xl border border-[#E5DFD5]">
                <span className="text-[10px] text-[#64748B] uppercase font-bold block">Turf Specialization</span>
                <span className="text-xs font-bold text-[#0F172A]">Red Clay & Fast Seam Pitch</span>
              </div>
              <div className="bg-[#FAF7F2] p-2.5 rounded-xl border border-[#E5DFD5]">
                <span className="text-[10px] text-[#64748B] uppercase font-bold block">Venues Managed</span>
                <span className="text-xs font-bold text-[#FA4D14]">Wankhede & Brabourne</span>
              </div>
              <div className="bg-[#FAF7F2] p-2.5 rounded-xl border border-[#E5DFD5]">
                <span className="text-[10px] text-[#64748B] uppercase font-bold block">Curation Exp</span>
                <span className="text-xs font-bold text-emerald-600">14+ Years Turf Mgmt</span>
              </div>
            </div>
          ) : isDirector ? (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs">
              <div className="bg-[#FAF7F2] p-2.5 rounded-xl border border-[#E5DFD5]">
                <span className="text-[10px] text-[#64748B] uppercase font-bold block">Operations Focus</span>
                <span className="text-xs font-bold text-[#0F172A]">High Performance System</span>
              </div>
              <div className="bg-[#FAF7F2] p-2.5 rounded-xl border border-[#E5DFD5]">
                <span className="text-[10px] text-[#64748B] uppercase font-bold block">Talent Acquisition</span>
                <span className="text-xs font-bold text-[#0F172A]">Franchise Trial Network</span>
              </div>
              <div className="bg-[#FAF7F2] p-2.5 rounded-xl border border-[#E5DFD5]">
                <span className="text-[10px] text-[#64748B] uppercase font-bold block">Admin Certification</span>
                <span className="text-xs font-bold text-[#FA4D14]">BCCI Executive Certified</span>
              </div>
              <div className="bg-[#FAF7F2] p-2.5 rounded-xl border border-[#E5DFD5]">
                <span className="text-[10px] text-[#64748B] uppercase font-bold block">Annual Budget</span>
                <span className="text-xs font-bold text-emerald-600">₹2.5 Crore Managed</span>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs">
              <div className="bg-[#FAF7F2] p-2.5 rounded-xl border border-[#E5DFD5]">
                <span className="text-[10px] text-[#64748B] uppercase font-bold block">Batting Position</span>
                <span className="text-xs font-bold text-[#0F172A]">#4 Middle Order</span>
              </div>
              <div className="bg-[#FAF7F2] p-2.5 rounded-xl border border-[#E5DFD5]">
                <span className="text-[10px] text-[#64748B] uppercase font-bold block">Batting Style</span>
                <span className="text-xs font-bold text-[#0F172A]">Right-Hand Aggressive</span>
              </div>
              <div className="bg-[#FAF7F2] p-2.5 rounded-xl border border-[#E5DFD5]">
                <span className="text-[10px] text-[#64748B] uppercase font-bold block">Kind of Bowler</span>
                <span className="text-xs font-bold text-[#FA4D14]">Right-Arm Express Seam</span>
              </div>
              <div className="bg-[#FAF7F2] p-2.5 rounded-xl border border-[#E5DFD5]">
                <span className="text-[10px] text-[#64748B] uppercase font-bold block">Fielding & Agility</span>
                <span className="text-xs font-bold text-emerald-600">Grade A+ High Mobility</span>
              </div>
            </div>
          )}

          {/* ALL STATS EVENLY DISTRIBUTED GRID */}
          <div>
            <h4 className="text-xs font-bold text-[#0F172A] uppercase mb-2">Verified Professional Track Record & Stats</h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {athlete.stats.map((stat, idx) => (
                <div key={idx} className="bg-[#FAF7F2] p-3 rounded-xl border border-[#E5DFD5] space-y-0.5">
                  <span className="text-[10px] text-[#64748B] uppercase block font-semibold">
                    {stat.label}
                  </span>
                  <span className="text-base font-bold text-[#0F172A]">
                    {stat.value}
                  </span>
                </div>
              ))}
              <div className="bg-[#FAF7F2] p-3 rounded-xl border border-[#E5DFD5] space-y-0.5">
                <span className="text-[10px] text-[#64748B] uppercase block font-semibold">Batting Strike Rate</span>
                <span className="text-base font-bold text-[#FA4D14]">134.20</span>
              </div>
              <div className="bg-[#FAF7F2] p-3 rounded-xl border border-[#E5DFD5] space-y-0.5">
                <span className="text-[10px] text-[#64748B] uppercase block font-semibold">Fielding Catches</span>
                <span className="text-base font-bold text-[#0F172A]">14 Catches</span>
              </div>
            </div>
          </div>

          {/* Skill Radar Index */}
          <div className="pt-1">
            <h4 className="text-xs font-bold text-[#0F172A] uppercase mb-2">Biomechanical & Professional Competency Index</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center bg-[#FAF7F2] p-3 sm:p-4 rounded-xl border border-[#E5DFD5]">
              <div className="flex items-center justify-center">
                <RadarChartDiagram metrics={athlete.metrics} size={180} color="#FA4D14" />
              </div>
              <div className="space-y-1.5 text-xs">
                {Object.entries(athlete.metrics).map(([key, value]) => (
                  <div key={key} className="bg-white p-2 rounded-lg border border-[#CBD5E1]">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-[#0F172A] font-semibold uppercase">{key}</span>
                      <span className="text-[#FA4D14] font-bold">{value} / 100</span>
                    </div>
                    <div className="w-full bg-[#FAF7F2] h-1.5 rounded-full overflow-hidden border border-[#E2E8F0] mt-1">
                      <div className="bg-[#FA4D14] h-full rounded-full" style={{ width: `${value}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>

        {/* =========================================================================
            SECTION 3: TOURNAMENTS PLAYED (APP VERIFIED, DOC EXTRACTED, MANUAL)
           ========================================================================= */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-[#CBD5E1] shadow-sm space-y-3">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#E2E8F0] pb-2.5 gap-2">
            <div>
              <h3 className="text-sm font-bold text-[#0F172A] uppercase tracking-wider flex items-center gap-1.5">
                <Trophy className="w-4 h-4 text-[#FA4D14]" />
                <span>Tournaments ({tournaments.length})</span>
              </h3>
            </div>
            
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsAddTournamentOpen(true)}
                className="px-3 py-1.5 rounded-xl bg-[#FA4D14] hover:bg-[#D83000] text-white text-xs font-bold transition-all cursor-pointer flex items-center gap-1 shadow-sm"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Entry</span>
              </button>
            </div>
          </div>

          {/* AT-A-GLANCE SUMMARY & EXPAND TOGGLE */}
          <div className="bg-[#FAF7F2] p-3 rounded-xl border border-[#E5DFD5] flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-bold text-[#0F172A]">
                {tournaments.length} Verified Competitive Matches
              </span>
              <span className="text-[#64748B]">
                • Latest: {tournaments[0]?.name || 'Tournament'} ({tournaments[0]?.statsSummary || ''})
              </span>
            </div>

            <button
              onClick={() => setShowTournamentsDetails(!showTournamentsDetails)}
              className="text-xs font-bold text-[#FA4D14] hover:text-[#D83000] flex items-center gap-1 cursor-pointer bg-[#FA4D14]/10 hover:bg-[#FA4D14]/20 px-3 py-1.5 rounded-lg border border-[#FA4D14]/30 transition-colors ml-auto sm:ml-0"
            >
              <span>{showTournamentsDetails ? 'Minimize details' : 'Click here for more details'}</span>
              {showTournamentsDetails ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>
          </div>

          {/* EXPANDED DETAILS */}
          {showTournamentsDetails && (
            <div className="space-y-4 pt-2 border-t border-slate-100 animate-fadeIn">
              {/* AI Scorecard Scanner Agent */}
              <div className="bg-[#0F172A] text-white p-4 rounded-2xl border border-[#1E293B] shadow-md space-y-2.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-7 h-7 rounded-lg bg-[#FA4D14]/20 flex items-center justify-center text-[#FA4D14] border border-[#FA4D14]/40 shrink-0">
                  <Bot className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold uppercase text-white text-sm">
                    AI Scorecard & Tournament Assistant Agent
                  </h4>
                  <p className="text-xs text-slate-300">
                    Scans scorecard PDFs, populates tournament tiles & tags as [PDF Extracted]!
                  </p>
                </div>
              </div>

              <button
                onClick={handleRunAiAgent}
                disabled={isAiAgentRunning}
                className="px-3 py-1.5 rounded-xl bg-[#FA4D14] hover:bg-[#D83000] text-white text-xs font-bold transition-all cursor-pointer flex items-center gap-1 shadow disabled:opacity-50 shrink-0"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>{isAiAgentRunning ? 'Scanning...' : 'Run AI Agent'}</span>
              </button>
            </div>

            {aiLogs.length > 0 && (
              <div className="bg-[#0B1120] p-2.5 rounded-xl border border-[#1E293B] text-xs space-y-1 text-slate-300">
                {aiLogs.map((log, i) => (
                  <div key={i} className="flex items-center gap-1.5">
                    <span className="text-[#FA4D14]">❯</span>
                    <span>{log}</span>
                  </div>
                ))}
              </div>
            )}

            {aiSuccessMessage && (
              <div className="p-2 bg-emerald-950/80 border border-emerald-500/40 rounded-xl text-emerald-300 text-xs flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>{aiSuccessMessage}</span>
              </div>
            )}
          </div>

          <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-2">
            <h3 className="text-base font-bold text-[#0F172A] uppercase tracking-wide flex items-center gap-1.5">
              <Trophy className="w-4 h-4 text-[#FA4D14]" />
              <span>Tournaments Played ({tournaments.length})</span>
            </h3>

            <button
              onClick={() => setIsAddTournamentOpen(true)}
              className="px-3 py-1 rounded-xl bg-[#0F172A] hover:bg-[#1E293B] text-white text-xs font-bold transition-all cursor-pointer flex items-center gap-1"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Tournament</span>
            </button>
          </div>

          {/* Add Tournament Form Modal */}
          {isAddTournamentOpen && (
            <form onSubmit={handleAddTournamentSubmit} className="bg-[#FAF7F2] p-3.5 rounded-xl border border-[#CBD5E1] space-y-2.5 text-xs shadow-sm animate-fade-in">
              <h4 className="font-bold text-[#0F172A] uppercase text-xs">Add Tournament Entry Tile</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <input
                  type="text"
                  required
                  placeholder="Tournament Name"
                  value={newTournName}
                  onChange={e => setNewTournName(e.target.value)}
                  className="p-2 rounded-lg border border-[#CBD5E1] bg-white text-[#0F172A]"
                />
                <input
                  type="text"
                  placeholder="Year (e.g. 2026)"
                  value={newTournYear}
                  onChange={e => setNewTournYear(e.target.value)}
                  className="p-2 rounded-lg border border-[#CBD5E1] bg-white text-[#0F172A]"
                />
                <input
                  type="url"
                  placeholder="Website URL"
                  value={newTournUrl}
                  onChange={e => setNewTournUrl(e.target.value)}
                  className="p-2 rounded-lg border border-[#CBD5E1] bg-white text-[#0F172A]"
                />
                <input
                  type="text"
                  placeholder="Finish / Trophy (e.g. Winner 🏆)"
                  value={newTournTrophy}
                  onChange={e => setNewTournTrophy(e.target.value)}
                  className="p-2 rounded-lg border border-[#CBD5E1] bg-white text-[#0F172A]"
                />
              </div>
              <div className="flex justify-end space-x-2 pt-0.5">
                <button
                  type="button"
                  onClick={() => setIsAddTournamentOpen(false)}
                  className="px-2.5 py-1 rounded-lg bg-slate-200 text-[#0F172A] font-bold cursor-pointer text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-3.5 py-1 rounded-lg bg-[#FA4D14] text-white font-bold cursor-pointer text-xs"
                >
                  Save Entry
                </button>
              </div>
            </form>
          )}

          {/* CLEAN UN-CLUTTERED TOURNAMENT CARDS (NO NESTED BOX BLOAT) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            {tournaments.map(t => (
              <div key={t.id} className="bg-[#FAF7F2] p-4 rounded-xl border border-[#CBD5E1] shadow-sm space-y-3 hover:border-[#FA4D14] transition-all flex flex-col justify-between">
                
                <div className="space-y-2">
                  {/* Header line: Year badge, Source badge & Trophy Finish */}
                  <div className="flex items-start justify-between gap-2">
                    <div className="space-y-1">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="text-[11px] font-extrabold px-2 py-0.5 rounded-full bg-[#FA4D14]/10 text-[#FA4D14] border border-[#FA4D14]/20">
                          {t.year}
                        </span>

                        {t.sourceType === 'app' && (
                          <span className="text-[11px] font-semibold text-emerald-700 flex items-center gap-1">
                            <Zap className="w-3 h-3 text-emerald-600 fill-emerald-600" /> App Verified
                          </span>
                        )}
                        {t.sourceType === 'doc' && (
                          <span className="text-[11px] font-semibold text-blue-700 flex items-center gap-1">
                            <FileText className="w-3 h-3 text-blue-600" /> PDF Extracted
                          </span>
                        )}
                        {t.sourceType === 'manual' && (
                          <span className="text-[11px] font-semibold text-purple-700 flex items-center gap-1">
                            <Edit2 className="w-3 h-3 text-purple-600" /> Manual Entry
                          </span>
                        )}
                      </div>

                      <h4 className="font-extrabold text-sm text-[#0F172A] tracking-tight leading-snug">
                        {t.name}
                      </h4>

                      <p className="text-xs text-[#64748B] font-medium flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-slate-400" /> {t.location}
                      </p>
                    </div>

                    <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200 shrink-0 shadow-xs">
                      {t.trophy}
                    </span>
                  </div>

                  {/* Match Performance Stats (Clean typographic line, no nested white box) */}
                  <div className="text-xs font-semibold text-[#1E293B] pt-2 border-t border-[#E2E8F0]">
                    <span className="text-[#64748B] uppercase font-bold text-[10px] tracking-wider block mb-0.5">Performance Record</span>
                    <span className="text-xs font-bold text-[#0F172A]">{t.statsSummary}</span>
                  </div>
                </div>

                {/* Clean Footer Row: Scorecard & Portal Link (No double nested boxes) */}
                <div className="flex items-center justify-between text-xs pt-2 border-t border-[#E2E8F0] gap-2 flex-wrap">
                  {t.scorecardPdfName ? (
                    <div className="flex items-center gap-2 text-xs text-[#0F172A] min-w-0 flex-1">
                      <span className="font-medium truncate text-slate-700 text-[11px]" title={t.scorecardPdfName}>
                        📋 {t.scorecardStats || t.scorecardPdfName}
                      </span>
                      <button
                        onClick={() => setActiveDocPreview(t.scorecardPdfName!)}
                        className="px-2.5 py-1 bg-[#FA4D14] hover:bg-[#D83000] text-white text-[11px] font-bold rounded-lg cursor-pointer transition-colors shadow-xs shrink-0 flex items-center gap-1"
                      >
                        <Eye className="w-3 h-3" />
                        <span>View Scorecard</span>
                      </button>
                    </div>
                  ) : (
                    <span className="text-slate-400 text-[11px]">No Scorecard Attached</span>
                  )}

                  <a
                    href={t.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#FA4D14] font-bold hover:underline flex items-center gap-1 text-xs shrink-0 ml-auto"
                  >
                    <span>Official Portal</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>

        {/* =========================================================================
            SECTION 4: OFFICIAL SCORECARDS & PDF SCORELOGS
           ========================================================================= */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-[#CBD5E1] shadow-sm space-y-3">
          <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-2">
            <div>
              <h3 className="text-base font-bold text-[#0F172A] uppercase tracking-wide flex items-center gap-1.5">
                <FileCheck className="w-4 h-4 text-[#FA4D14]" />
                <span>Official Scorecards & PDF Match Logs ({scorecards.length})</span>
              </h3>
              <p className="text-xs text-[#64748B]">Certified match scorecards uploaded directly.</p>
            </div>

            <button
              onClick={() => {
                const name = prompt('Enter Scorecard File Name / Match Title:');
                if (name) {
                  setScorecards([
                    {
                      id: `sc-custom-${Date.now()}`,
                      matchName: name,
                      date: 'Just Now',
                      fileName: `${name.replace(/\s+/g, '_')}_Scorecard.pdf`,
                      figures: '4/28 (8 Overs)',
                      verifiedBy: 'Pending Referee Approval'
                    },
                    ...scorecards
                  ]);
                }
              }}
              className="px-3 py-1 rounded-xl bg-[#FA4D14] hover:bg-[#D83000] text-white text-xs font-bold transition-all cursor-pointer flex items-center gap-1 shadow-sm"
            >
              <Upload className="w-3.5 h-3.5" />
              <span>Upload PDF</span>
            </button>
          </div>

          {/* AT-A-GLANCE SUMMARY & EXPAND TOGGLE */}
          <div className="bg-[#FAF7F2] p-3 rounded-xl border border-[#E5DFD5] flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-bold text-[#0F172A]">
                {scorecards.length} Certified PDF Scorecards
              </span>
              <span className="text-[#64748B]">
                • Latest: {scorecards[0]?.matchName || 'Match'} ({scorecards[0]?.figures || ''})
              </span>
            </div>

            <button
              onClick={() => setShowScorecardsDetails(!showScorecardsDetails)}
              className="text-xs font-bold text-[#FA4D14] hover:text-[#D83000] flex items-center gap-1 cursor-pointer bg-[#FA4D14]/10 hover:bg-[#FA4D14]/20 px-3 py-1.5 rounded-lg border border-[#FA4D14]/30 transition-colors ml-auto sm:ml-0"
            >
              <span>{showScorecardsDetails ? 'Minimize details' : 'Click here for more details'}</span>
              {showScorecardsDetails ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>
          </div>

          {/* EXPANDED DETAILS */}
          {showScorecardsDetails && (
            <div className="space-y-2 pt-2 border-t border-slate-100 animate-fadeIn">
              {scorecards.map(sc => (
                <div key={sc.id} className="bg-[#FAF7F2] p-3 rounded-xl border border-[#E5DFD5] shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-2 hover:border-[#FA4D14] transition-colors">
                  <div className="flex items-center space-x-2.5">
                    <div className="w-8 h-8 rounded-lg bg-orange-100 flex items-center justify-center text-[#FA4D14] shrink-0 border border-orange-200">
                      <FileText className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-bold text-xs text-[#0F172A]">{sc.matchName}</h4>
                      <p className="text-xs text-[#64748B]">
                        {sc.fileName} • {sc.date}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 text-xs self-end sm:self-auto">
                    <span className="font-bold text-xs text-[#FA4D14] bg-white px-2.5 py-1 rounded-lg border border-[#CBD5E1]">
                      {sc.figures}
                    </span>
                    <button
                      onClick={() => setActiveDocPreview(sc.matchName)}
                      className="px-2.5 py-1 bg-[#0F172A] text-white text-xs rounded-lg font-bold hover:bg-[#1E293B] cursor-pointer flex items-center gap-1"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>In-App View</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* =========================================================================
            SECTION 5: RESTRICTED DOCUMENTS VAULT (DIRECT APPROVAL CONTROL)
           ========================================================================= */}
        <div className="bg-[#0F172A] text-white p-4 sm:p-5 rounded-2xl border border-[#1E293B] shadow-md space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#1E293B] pb-2.5 gap-2">
            <div className="space-y-1">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-400 text-[11px] font-extrabold uppercase tracking-wider flex items-center gap-1 border border-amber-500/30">
                  <Lock className="w-3 h-3" /> Restricted Documents Vault
                </span>

                {/* Star Hover Tooltip for Security Rule Explanation */}
                <div className="relative group cursor-pointer inline-flex items-center">
                  <div className="px-2.5 py-0.5 rounded-full bg-amber-400/10 hover:bg-amber-400/20 text-amber-300 transition-all border border-amber-400/30 flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span className="text-[11px] font-bold tracking-wide">Security Rule ★</span>
                  </div>

                  {/* Tooltip Popup on Hover/Point */}
                  <div className="absolute top-full left-0 mt-2 w-64 p-3 bg-slate-900 text-slate-200 text-xs rounded-xl border border-amber-500/40 shadow-2xl opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none z-30 space-y-1">
                    <div className="flex items-center gap-1 text-amber-400 font-bold text-[11px] uppercase tracking-wider">
                      <Lock className="w-3 h-3" /> Security Policy
                    </div>
                    <p className="text-[11px] leading-relaxed text-slate-300 font-normal">
                      Direct document downloading is strictly disabled. Access grants in-app watermarked inspection only.
                    </p>
                  </div>
                </div>
              </div>

              <h3 className="text-sm font-extrabold uppercase text-white tracking-wider pt-0.5">
                Official Certificates & Credentials
              </h3>
            </div>

            {/* Direct Approve Access Control */}
            <div className="shrink-0 self-start sm:self-auto">
              {vaultPermissionStatus === 'locked' && (
                <button
                  onClick={() => {
                    setVaultPermissionStatus('granted');
                    alert('Access Approved! Watermarked in-app document viewing is now active.');
                  }}
                  className="px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-bold cursor-pointer flex items-center gap-1 shadow"
                >
                  <Lock className="w-3.5 h-3.5" />
                  <span>Request Access</span>
                </button>
              )}

              {vaultPermissionStatus === 'granted' && (
                <div className="flex items-center gap-1.5">
                  <span className="px-2.5 py-1 rounded-lg bg-emerald-950 text-emerald-300 text-xs font-bold border border-emerald-500/40 flex items-center gap-1">
                    <Unlock className="w-3.5 h-3.5 text-emerald-400" /> Access Approved
                  </span>
                  <button
                    onClick={() => setVaultPermissionStatus('locked')}
                    className="px-2.5 py-1 bg-slate-800 text-slate-300 rounded-lg text-xs hover:bg-slate-700 cursor-pointer font-semibold"
                  >
                    Lock
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* AT-A-GLANCE SUMMARY & EXPAND TOGGLE */}
          <div className="bg-[#1E293B] p-3 rounded-xl border border-[#334155] flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-bold text-white">
                3 Sensitive Credentials Protected
              </span>
              <span className="text-slate-400 text-xs">
                • BCCI Certificate, Age Proof, Academic Records (Watermark Protected)
              </span>
            </div>

            <button
              onClick={() => setShowDocumentsDetails(!showDocumentsDetails)}
              className="text-xs font-bold text-amber-400 hover:text-amber-300 flex items-center gap-1 cursor-pointer bg-amber-500/10 hover:bg-amber-500/20 px-3 py-1.5 rounded-lg border border-amber-500/30 transition-colors ml-auto sm:ml-0"
            >
              <span>{showDocumentsDetails ? 'Minimize details' : 'Click here for more details'}</span>
              {showDocumentsDetails ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>
          </div>

          {/* EXPANDED DETAILS */}
          {showDocumentsDetails && (
            <div className="space-y-2 pt-2 border-t border-slate-800 animate-fadeIn">
              <div className="bg-[#1E293B] p-3 rounded-xl border border-[#334155] flex items-center justify-between gap-2">
                <div className="flex items-center space-x-2.5">
                  <div className="w-8 h-8 rounded-lg bg-orange-500/20 flex items-center justify-center text-[#FA4D14] shrink-0 border border-orange-500/30">
                    <Award className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-xs text-white">BCCI / State Cricket Certificate</h4>
                    <span className="text-xs text-slate-300">Cricket Certificate</span>
                  </div>
                </div>

                <div className="text-xs">
                  {vaultPermissionStatus === 'granted' ? (
                    <button
                      onClick={() => setActiveDocPreview('BCCI / State Cricket Certificate')}
                      className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-lg flex items-center gap-1 cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>View Only (Watermarked)</span>
                    </button>
                  ) : (
                    <span className="px-2.5 py-1 bg-slate-800 text-slate-400 rounded-lg text-xs font-bold flex items-center gap-1 border border-slate-700">
                      <Lock className="w-3.5 h-3.5" />
                      <span>Locked</span>
                    </span>
                  )}
                </div>
              </div>

              <div className="bg-[#1E293B] p-3 rounded-xl border border-[#334155] flex items-center justify-between gap-2">
                <div className="flex items-center space-x-2.5">
                  <div className="w-8 h-8 rounded-lg bg-amber-500/20 flex items-center justify-center text-amber-400 shrink-0 border border-amber-500/30">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-xs text-white">Birth Certificate (Age Proof)</h4>
                    <span className="text-xs text-slate-300">Age Verification Record</span>
                  </div>
                </div>

                <div className="text-xs">
                  {vaultPermissionStatus === 'granted' ? (
                    <button
                      onClick={() => setActiveDocPreview('Birth Certificate (Age Proof)')}
                      className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-lg flex items-center gap-1 cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>View Only (Watermarked)</span>
                    </button>
                  ) : (
                    <span className="px-2.5 py-1 bg-slate-800 text-slate-400 rounded-lg text-xs font-bold flex items-center gap-1 border border-slate-700">
                      <Lock className="w-3.5 h-3.5" />
                      <span>Locked</span>
                    </span>
                  )}
                </div>
              </div>

              <div className="bg-[#1E293B] p-3 rounded-xl border border-[#334155] flex items-center justify-between gap-2">
                <div className="flex items-center space-x-2.5">
                  <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center text-blue-400 shrink-0 border border-blue-500/30">
                    <FileText className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-xs text-white">HSC Educational Qualification</h4>
                    <span className="text-xs text-slate-300">Academic Records</span>
                  </div>
                </div>

                <div className="text-xs">
                  {vaultPermissionStatus === 'granted' ? (
                    <button
                      onClick={() => setActiveDocPreview('HSC Educational Qualification')}
                      className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-lg flex items-center gap-1 cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>View Only (Watermarked)</span>
                    </button>
                  ) : (
                    <span className="px-2.5 py-1 bg-slate-800 text-slate-400 rounded-lg text-xs font-bold flex items-center gap-1 border border-slate-700">
                      <Lock className="w-3.5 h-3.5" />
                      <span>Locked</span>
                    </span>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* =========================================================================
            SECTION 6: "YOUR POSTS" FEED WITH EDIT & DELETE MANAGEMENT
           ========================================================================= */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-[#CBD5E1] shadow-sm space-y-3">
          <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-2">
            <h3 className="text-base font-bold text-[#0F172A] uppercase tracking-wide flex items-center gap-1.5">
              <Video className="w-4 h-4 text-[#FA4D14]" />
              <span>Your Posts</span>
            </h3>

            <button
              onClick={() => {
                const title = prompt('Enter post title:');
                if (title) {
                  setProfilePosts([
                    {
                      id: `post-new-${Date.now()}`,
                      type: 'video',
                      title: title,
                      caption: 'Fresh video reel uploaded to profile feed.',
                      mediaUrl: athlete.avatar,
                      likes: 0,
                      comments: 0,
                      date: 'Just now'
                    },
                    ...profilePosts
                  ]);
                }
              }}
              className="px-3 py-1 rounded-xl bg-[#FA4D14] hover:bg-[#D83000] text-white text-xs font-bold transition-all cursor-pointer flex items-center gap-1 shadow-sm"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Create Post</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {profilePosts.map(post => (
              <div key={post.id} className="bg-[#FAF7F2] rounded-xl border border-[#E5DFD5] shadow-sm overflow-hidden hover:border-[#FA4D14] transition-all group relative">
                
                {/* Media Box */}
                <div className="relative h-44 bg-[#0F172A] overflow-hidden flex items-center justify-center">
                  {post.type === 'video' ? (
                    <InstagramStyleVideoPlayer
                      posterUrl={post.mediaUrl}
                      className="w-full h-full rounded-none"
                    />
                  ) : (
                    <img
                      src={post.mediaUrl}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform opacity-90"
                    />
                  )}

                  {/* Post Management Overlay (Edit & Delete) */}
                  <div className="absolute top-2 right-2 flex items-center gap-1 bg-[#0F172A]/80 backdrop-blur-sm p-1 rounded-lg border border-slate-700">
                    <button
                      onClick={() => handleEditPost(post.id)}
                      className="p-1 rounded text-slate-200 hover:text-white hover:bg-slate-700 cursor-pointer"
                      title="Edit Post Caption"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDeletePost(post.id)}
                      className="p-1 rounded text-red-400 hover:text-red-300 hover:bg-red-950 cursor-pointer"
                      title="Delete Post"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <div className="p-3 space-y-1">
                  <h4 className="font-bold text-xs text-[#0F172A] uppercase">{post.title}</h4>
                  <p className="text-xs text-[#334155] leading-relaxed line-clamp-2">{post.caption}</p>

                  <div className="flex items-center justify-between text-xs text-[#64748B] pt-1.5 border-t border-[#CBD5E1]">
                    <div className="flex items-center space-x-2.5">
                      <button 
                        onClick={() => setProfilePosts(profilePosts.map(p => p.id === post.id ? { ...p, likes: p.likes + 1 } : p))}
                        className="flex items-center gap-0.5 text-red-500 font-bold hover:scale-105 transition-transform cursor-pointer"
                      >
                        <Heart className="w-3.5 h-3.5 fill-red-500" /> {post.likes}
                      </button>
                      <span className="flex items-center gap-0.5">
                        <MessageCircle className="w-3.5 h-3.5" /> {post.comments}
                      </span>
                    </div>
                    <span>{post.date}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer Bar */}
        <div className="border-t border-[#CBD5E1] pt-2 flex items-center justify-between text-xs font-medium">
          <span className="text-[#64748B]">
            Verified Profile ID: #{athlete.id.toUpperCase()}
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-[#0F172A] hover:bg-[#1E293B] text-white font-bold cursor-pointer text-xs"
          >
            Close Profile
          </button>
        </div>

      </div>

      {/* SECURE IN-APP WATERMARKED PREVIEW MODAL */}
      {activeDocPreview && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-[#0F172A] border border-[#1E293B] text-white rounded-3xl max-w-xl w-full p-6 space-y-4 shadow-2xl relative">
            <div className="flex items-center justify-between border-b border-[#1E293B] pb-3">
              <div className="flex items-center space-x-2">
                <Lock className="w-4 h-4 text-amber-400" />
                <h3 className="font-bold text-sm uppercase">Secure In-App Preview</h3>
              </div>
              <button
                onClick={() => setActiveDocPreview(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="bg-[#1E293B] h-64 rounded-2xl border border-[#334155] relative flex flex-col items-center justify-center text-center p-6 overflow-hidden">
              {/* Security Watermark Overlay */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-15 rotate-[-25deg] select-none text-2xl sm:text-3xl font-black text-white tracking-widest uppercase">
                SPORTZICON CONFIDENTIAL • NO DOWNLOAD PERMITTED
              </div>

              <FileText className="w-12 h-12 text-[#FA4D14] mb-2" />
              <h4 className="font-bold text-base text-white">{activeDocPreview}</h4>
              <p className="text-xs text-amber-300 font-medium mt-1">
                🔒 Protected View Mode Active
              </p>
              <p className="text-xs text-slate-300 max-w-md mt-2">
                This document is rendered securely in-app with verified digital signatures. Direct file downloads and copying are disabled to prevent unauthorized distribution.
              </p>
            </div>

            <div className="flex justify-end">
              <button
                onClick={() => setActiveDocPreview(null)}
                className="px-5 py-2 bg-[#FA4D14] hover:bg-[#D83000] text-white rounded-xl font-bold text-xs uppercase cursor-pointer"
              >
                Close Secure Viewer
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
