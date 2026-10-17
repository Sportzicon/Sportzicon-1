import React, { useState, useEffect, useRef } from 'react';
import { UserSession, Athlete } from '../types';
import { InstagramStyleVideoPlayer } from './InstagramStyleVideoPlayer';
import { 
  User, 
  ShieldCheck, 
  Award, 
  Video, 
  Trophy, 
  MapPin, 
  Building2, 
  CheckCircle2, 
  Sparkles, 
  Phone, 
  Mail, 
  Share2, 
  ExternalLink,
  Download,
  Plus,
  Lock,
  LogOut,
  Unlock,
  Bot,
  FileText,
  FileCheck,
  Upload,
  Heart,
  MessageCircle,
  Play,
  Eye,
  Check,
  Target,
  BarChart2,
  UserMinus,
  Edit2,
  Trash2,
  Zap,
  Star,
  X,
  Camera,
  Globe,
  Search,
  Image as ImageIcon,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

interface UserProfileViewProps {
  userSession: UserSession | null;
  athlete?: Athlete | null;
  setActiveTab: (tab: any) => void;
  onLogout: () => void;
  onStartChat?: (userName: string) => void;
}

interface TournamentEntry {
  id: string;
  name: string;
  year: string;
  url: string;
  location: string;
  trophy?: string;
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

// PRESET OPTIONS FOR PROFILE DROPDOWNS
const PRIMARY_ROLE_OPTIONS = [
  'Right-Arm Fast Bowler',
  'Left-Arm Fast Bowler',
  'Right-Arm Fast-Medium',
  'Right-Arm Leg-Spin Bowler',
  'Right-Arm Off-Spin Bowler',
  'Left-Arm Orthodox Spinner',
  'Top-Order Opening Batter',
  'Middle-Order Wicketkeeper Batter',
  'Pace Bowling All-Rounder',
  'Spin Bowling All-Rounder',
  'Head Cricket Coach (BCCI Level 3)',
  'Strength & Conditioning Trainer',
  'High Performance Director',
  'Certified Match Umpire',
  'Sports Science Educator',
  'Chief Pitch Curator'
];

const ORGANIZATION_OPTIONS = [
  'Apex Cricket Academy',
  'Mumbai Cricket Association (MCA)',
  'Delhi & District Cricket Association (DDCA)',
  'Karnataka State Cricket Association (KSCA)',
  'Tamil Nadu Cricket Association (TNCA)',
  'National Cricket Academy (NCA Bengaluru)',
  'Suburban Gymkhana Club',
  'West Zone High Performance Center',
  'Rajasthan Royals Academy',
  'Punjab Cricket Association (PCA)'
];

const COUNTRY_CITIES_MAP: Record<string, string[]> = {
  'India': [
    'Mumbai, Maharashtra', 'Delhi NCR', 'Bengaluru, Karnataka', 'Chennai, Tamil Nadu', 
    'Kolkata, West Bengal', 'Hyderabad, Telangana', 'Ahmedabad, Gujarat', 'Pune, Maharashtra', 
    'Jaipur, Rajasthan', 'Chandigarh, Punjab', 'Lucknow, Uttar Pradesh', 'Nagpur, Maharashtra', 
    'Surat, Gujarat', 'Indore, Madhya Pradesh', 'Kochi, Kerala', 'Visakhapatnam, Andhra Pradesh', 
    'Rajkot, Gujarat', 'Bhopal, Madhya Pradesh', 'Vadodara, Gujarat', 'Coimbatore, Tamil Nadu', 
    'Ranchi, Jharkhand', 'Dehradun, Uttarakhand', 'Guwahati, Assam', 'Bhubaneswar, Odisha'
  ],
  'Australia': [
    'Sydney, NSW', 'Melbourne, Victoria', 'Brisbane, Queensland', 'Perth, WA', 
    'Adelaide, SA', 'Hobart, Tasmania', 'Canberra, ACT', 'Gold Coast, Queensland', 
    'Geelong, Victoria', 'Darwin, NT', 'Newcastle, NSW', 'Townsville, Queensland'
  ],
  'England (UK)': [
    'London', 'Birmingham', 'Manchester', 'Leeds', 'Nottingham', 'Bristol', 
    'Southampton', 'Sheffield', 'Cardiff', 'Liverpool', 'Oxford', 'Cambridge', 'Leicester'
  ],
  'South Africa': [
    'Cape Town', 'Johannesburg', 'Durban', 'Pretoria', 'Gqeberha (Port Elizabeth)', 
    'Centurion', 'Bloemfontein', 'East London', 'Kimberley'
  ],
  'New Zealand': [
    'Auckland', 'Wellington', 'Christchurch', 'Hamilton', 'Dunedin', 
    'Tauranga', 'Napier', 'Nelson', 'Palmerston North'
  ],
  'West Indies': [
    'Bridgetown (Barbados)', 'Kingston (Jamaica)', 'Port of Spain (Trinidad)', 
    'St. John\'s (Antigua)', 'Castries (St. Lucia)', 'Georgetown (Guyana)', 
    'Basseterre (St. Kitts)', 'Roseau (Dominica)'
  ],
  'United States': [
    'New York, NY', 'Los Angeles, CA', 'Dallas, TX', 'San Francisco, CA', 
    'Chicago, IL', 'Miami, FL', 'Seattle, WA', 'Houston, TX', 'Atlanta, GA', 
    'Boston, MA', 'Lauderhill, FL', 'Morrisville, NC'
  ],
  'United Arab Emirates': [
    'Dubai', 'Abu Dhabi', 'Sharjah', 'Ajman', 'Ras Al Khaimah', 'Fujairah'
  ],
  'Sri Lanka': [
    'Colombo', 'Kandy', 'Galle', 'Jaffna', 'Negombo', 'Kurunegala', 'Dambulla', 'Matara'
  ],
  'Pakistan': [
    'Lahore', 'Karachi', 'Islamabad', 'Rawalpindi', 'Peshawar', 'Multan', 'Faisalabad', 'Quetta'
  ],
  'Bangladesh': [
    'Dhaka', 'Chittagong', 'Sylhet', 'Rajshahi', 'Khulna', 'Barisal', 'Comilla'
  ],
  'Afghanistan': [
    'Kabul', 'Kandahar', 'Hirat', 'Mazar-i-Sharif', 'Jalalabad', 'Khost'
  ],
  'Canada': [
    'Toronto', 'Vancouver', 'Montreal', 'Calgary', 'Edmonton', 'Brampton'
  ],
  'Ireland': [
    'Dublin', 'Belfast', 'Cork', 'Galway', 'Malahide', 'Bready'
  ],
  'Zimbabwe': [
    'Harare', 'Bulawayo', 'Gweru', 'Mutare', 'Kwekwe'
  ],
  'Netherlands': [
    'Amsterdam', 'Rotterdam', 'The Hague', 'Utrecht', 'Amstelveen'
  ],
  'Scotland': [
    'Edinburgh', 'Glasgow', 'Aberdeen', 'Dundee', 'Grange'
  ],
  'Nepal': [
    'Kathmandu', 'Pokhara', 'Lalitpur', 'Biratnagar', 'Bhairahawa'
  ]
};

const COUNTRY_OPTIONS = Object.keys(COUNTRY_CITIES_MAP);

interface SearchableDropdownProps {
  label: string;
  value: string;
  options: string[];
  onChange: (val: string) => void;
  placeholder?: string;
  icon?: React.ReactNode;
}

const SearchableDropdown: React.FC<SearchableDropdownProps> = ({
  label,
  value,
  options,
  onChange,
  placeholder = 'Type to search...',
  icon
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [filterText, setFilterText] = useState('');
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filtered = options.filter(opt =>
    opt.toLowerCase().includes(filterText.toLowerCase())
  );

  return (
    <div className="relative" ref={wrapperRef}>
      <label className="block text-xs font-bold text-[#0F172A] uppercase tracking-wider mb-1 flex items-center gap-1">
        {icon}
        <span>{label}</span>
      </label>
      <div className="relative">
        <input
          type="text"
          value={isOpen ? filterText : value}
          onFocus={() => {
            setFilterText('');
            setIsOpen(true);
          }}
          onChange={(e) => {
            setFilterText(e.target.value);
            setIsOpen(true);
            onChange(e.target.value);
          }}
          placeholder={placeholder}
          className="w-full bg-[#FAF7F2] border border-[#CBD5E1] rounded-xl pl-8 pr-8 py-2 text-xs font-bold text-[#0F172A] focus:outline-none focus:border-[#FA4D14] focus:ring-1 focus:ring-[#FA4D14]"
        />
        <Search className="w-3.5 h-3.5 text-[#64748B] absolute left-2.5 top-2.5 pointer-events-none" />
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="absolute right-2.5 top-2.5 text-[#64748B] hover:text-[#0F172A] cursor-pointer text-[10px]"
        >
          {isOpen ? '▲' : '▼'}
        </button>
      </div>

      {isOpen && (
        <div className="absolute z-50 left-0 right-0 mt-1 max-h-52 overflow-y-auto bg-white border border-[#CBD5E1] rounded-xl shadow-xl divide-y divide-slate-100">
          {filtered.length > 0 ? (
            filtered.map((opt) => (
              <button
                key={opt}
                type="button"
                onClick={() => {
                  onChange(opt);
                  setIsOpen(false);
                }}
                className={`w-full text-left px-3 py-2 text-xs font-bold transition-colors cursor-pointer flex items-center justify-between ${
                  opt.toLowerCase() === value.toLowerCase()
                    ? 'bg-[#FA4D14]/10 text-[#FA4D14]'
                    : 'text-[#0F172A] hover:bg-[#FAF7F2]'
                }`}
              >
                <span>{opt}</span>
                {opt.toLowerCase() === value.toLowerCase() && (
                  <Check className="w-3.5 h-3.5 text-[#FA4D14]" />
                )}
              </button>
            ))
          ) : (
            <div className="p-3 text-center text-xs text-[#64748B] font-medium">
              No matching options. Type custom name...
            </div>
          )}
        </div>
      )}
    </div>
  );
};

interface CategoryStarTooltipProps {
  title?: string;
  description: string;
  dark?: boolean;
}

const CategoryStarTooltip: React.FC<CategoryStarTooltipProps> = ({ title, description, dark = false }) => {
  return (
    <div className="relative group cursor-pointer inline-flex items-center ml-1">
      <div
        className={`p-1 rounded-full transition-all flex items-center justify-center ${
          dark
            ? 'text-amber-400 hover:bg-amber-400/20'
            : 'text-amber-500 hover:text-amber-600 hover:bg-amber-50'
        }`}
        title={description}
      >
        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
      </div>

      {/* Tooltip Popup on Hover */}
      <div className="absolute top-full left-0 mt-1.5 w-64 p-2.5 bg-[#0F172A] text-white text-[11px] rounded-xl border border-slate-700 shadow-2xl opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none z-50 space-y-1">
        {title && <div className="font-bold text-amber-400 text-[11px] uppercase tracking-wider">{title}</div>}
        <p className="leading-relaxed text-slate-200 font-normal">{description}</p>
      </div>
    </div>
  );
};

const AGE_OPTIONS = ['15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25+'];

const BATTING_POSITION_OPTIONS = [
  '#1 Top Order Opener',
  '#2 Top Order Opener',
  '#3 First Down Anchor',
  '#4 Middle Order Aggressive',
  '#5 Middle Order Finisher',
  '#6 All-Rounder',
  '#7 Lower Order Striker',
  '#8 Tailender Bowler'
];

const BATTING_STYLE_OPTIONS = [
  'Right-Hand Aggressive',
  'Right-Hand Anchor',
  'Left-Hand Aggressive',
  'Left-Hand Anchor',
  'Right-Hand Classical',
  'Left-Hand Classical'
];

const BOWLING_STYLE_OPTIONS = [
  'Right-Arm Express Seam (135+ km/h)',
  'Right-Arm Fast-Medium Seam',
  'Right-Arm Leg-Break Spin',
  'Right-Arm Off-Break Spin',
  'Left-Arm Fast Seam (135+ km/h)',
  'Left-Arm Orthodox Spin',
  'Left-Arm Chinaman Wrist-Spin',
  'Wicketkeeper / Non-Bowler'
];

const FIELDING_AGILITY_OPTIONS = [
  'Grade A+ High Mobility',
  'Direct-Hit Specialist',
  'Wicketkeeper Gloves',
  'Slip Catcher Specialist',
  'Boundary Sweeper'
];

const WICKETS_OPTIONS = ['10 Wickets', '25 Wickets', '38 Wickets', '56 Wickets', '75 Wickets', '100+ Wickets'];
const BOWLING_AVG_OPTIONS = ['12.10', '14.50', '15.40', '18.20', '21.00', '24.80'];
const ECONOMY_OPTIONS = ['3.12', '3.82', '4.12', '4.60', '5.25', '6.10'];
const BEST_BOWLING_OPTIONS = ['6/15', '5/18', '4/22', '4/30', '3/18', '3/25'];
const RUNS_OPTIONS = ['250 Runs', '480 Runs', '684 Runs', '1,250 Runs', '2,400 Runs', '3,500+ Runs'];
const BATTING_AVG_OPTIONS = ['16.20', '22.50', '28.50', '34.10', '42.80', '48.00'];

const AVATAR_OPTIONS = [
  { label: 'Express Fast Bowler', url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80' },
  { label: 'Pro Batter Focus', url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80' },
  { label: 'Coach / Leader Profile', url: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80' },
  { label: 'Senior Circuit Athlete', url: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80' }
];

export const UserProfileView: React.FC<UserProfileViewProps> = ({
  userSession,
  athlete,
  setActiveTab,
  onLogout,
  onStartChat,
}) => {
  const [isFollowing, setIsFollowing] = useState(false);

  // User Profile Data State (Fully editable per block with preset dropdowns)
  const [profileData, setProfileData] = useState({
    name: userSession?.name || athlete?.name || 'Rohan Verma',
    sportziconId: userSession?.sportziconId || 'SZ-2026-8891',
    role: userSession?.role || 'athlete',
    primaryRole: userSession?.primaryRole || athlete?.primaryRole || 'Right-Arm Fast Bowler',
    organization: userSession?.organization || athlete?.currentClubOrAcademy || 'Apex Cricket Academy',
    email: userSession?.email || 'rohan.verma@sportzicon.com',
    avatar: userSession?.avatar || athlete?.avatar || 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
    country: 'India',
    city: 'Mumbai, Maharashtra',
    location: athlete?.location || 'Mumbai, Maharashtra',
    age: athlete?.age || 18,
    bio: athlete?.bio || 'Express right-arm fast bowler who clocks 138-142 km/h consistently. Represented Mumbai MCA U-19 team and trained at Apex Cricket Academy.',
    battingPosition: '#4 Middle Order Aggressive',
    battingStyle: 'Right-Hand Aggressive',
    bowlingStyle: 'Right-Arm Express Seam',
    fieldingAgility: 'Grade A+ High Mobility',
    wickets: '56 Wickets',
    bowlingAvg: '15.40',
    economy: '4.12',
    bestBowling: '5/18',
    runs: '684 Runs',
    battingAvg: '28.50'
  });

  // Edit Profile Modal & Section Focus State
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editTab, setEditTab] = useState<'basic' | 'specs' | 'stats'>('basic');
  const [draftProfile, setDraftProfile] = useState(profileData);
  const [profileSavedToast, setProfileSavedToast] = useState<string | null>(null);

  const openEditModalWithTab = (tab: 'basic' | 'specs' | 'stats') => {
    setDraftProfile({
      ...profileData,
      country: profileData.country || 'India',
      city: profileData.city || 'Mumbai, Maharashtra'
    });
    setEditTab(tab);
    setIsEditModalOpen(true);
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setProfileData(draftProfile);
    setIsEditModalOpen(false);
    setProfileSavedToast('Profile information updated successfully across all sections!');
    setTimeout(() => setProfileSavedToast(null), 4000);
  };

  // Determine if viewing user's own profile vs another user's profile
  const isOwnProfile = !athlete || (userSession && (athlete?.id === userSession.sportziconId || athlete?.name === userSession.name));

  // Vault Permission Approval State (Owner View)
  const [vaultPermissionStatus, setVaultPermissionStatus] = useState<'locked' | 'requested' | 'granted'>('granted');

  // Minimized Section States (Minimized by default for at-a-glance profile viewing)
  const [showSpecsDetails, setShowSpecsDetails] = useState<boolean>(false);
  const [showTournamentsDetails, setShowTournamentsDetails] = useState<boolean>(false);
  const [showScorecardsDetails, setShowScorecardsDetails] = useState<boolean>(false);
  const [showDocumentsDetails, setShowDocumentsDetails] = useState<boolean>(false);

  // Preview Modal for Document In-App Viewing (No Download)
  const [activeDocPreview, setActiveDocPreview] = useState<string | null>(null);

  // AI Scorecard Agent States
  const [isAiAgentRunning, setIsAiAgentRunning] = useState(false);
  const [aiLogs, setAiLogs] = useState<string[]>([]);
  const [aiSuccessMessage, setAiSuccessMessage] = useState<string | null>(null);

  // Tournament Tiles State with 3 Source Types
  const [tournaments, setTournaments] = useState<TournamentEntry[]>([
    {
      id: 'tourn-1',
      name: 'Mumbai MCA U-19 Championship 2025',
      year: '2025',
      url: 'https://mca.cricket/tournaments/u19-2025',
      location: 'Mumbai, MH',
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
      statsSummary: '5 Matches • 14 Wickets • Best 5/18',
      sourceType: 'manual',
      scorecardPdfName: 'IAPL_Finals_Scorecard.pdf',
      scorecardStats: '5/18 in 4.0 overs vs Apex Academy'
    }
  ]);

  // Edit Tournament State & Modal
  const [editingTournament, setEditingTournament] = useState<TournamentEntry | null>(null);

  // Add Tournament Form State
  const [isAddTournamentOpen, setIsAddTournamentOpen] = useState(false);
  const [newTournName, setNewTournName] = useState('');
  const [newTournYear, setNewTournYear] = useState('2026');
  const [newTournUrl, setNewTournUrl] = useState('');
  const [newTournLocation, setNewTournLocation] = useState('Mumbai, MH');
  const [newTournStatsSummary, setNewTournStatsSummary] = useState('6 Matches • 18 Wickets • Econ 3.82');

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
      mediaUrl: athlete?.avatar || userSession?.avatar || 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&w=600&q=80',
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

  const defaultUser = profileData;

  // Multi-Role Category Detector
  const roleLower = (defaultUser.primaryRole || '').toLowerCase();
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
      year: newTournYear || '2026',
      url: newTournUrl || 'https://mca.cricket',
      location: newTournLocation || 'Mumbai, MH',
      statsSummary: newTournStatsSummary || 'Verified Competition Match Record',
      sourceType: 'manual'
    };

    setTournaments([newEntry, ...tournaments]);
    setIsAddTournamentOpen(false);
    setNewTournName('');
    setNewTournYear('2026');
    setNewTournUrl('');
    setProfileSavedToast('Tournament added successfully!');
    setTimeout(() => setProfileSavedToast(null), 3000);
  };

  // Save Edited Tournament
  const handleSaveEditedTournament = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingTournament) return;
    setTournaments(tournaments.map(t => t.id === editingTournament.id ? editingTournament : t));
    setEditingTournament(null);
    setProfileSavedToast('Tournament entry updated successfully!');
    setTimeout(() => setProfileSavedToast(null), 3000);
  };

  // Delete Tournament Handler
  const handleDeleteTournament = (tournamentId: string) => {
    if (confirm('Are you sure you want to remove this tournament?')) {
      setTournaments(tournaments.filter(t => t.id !== tournamentId));
      setProfileSavedToast('Tournament entry removed.');
      setTimeout(() => setProfileSavedToast(null), 3000);
    }
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

  return (
    <div className="space-y-5 pb-20 animate-fadeIn max-w-3xl mx-auto text-[#0F172A] font-sans">
      
      {/* Toast Notification for Profile Saved */}
      {profileSavedToast && (
        <div className="bg-emerald-600 text-white px-4 py-3 rounded-2xl shadow-lg flex items-center justify-between animate-bounce">
          <div className="flex items-center space-x-2 text-xs font-bold">
            <Check className="w-4 h-4 bg-white/20 p-0.5 rounded-full" />
            <span>{profileSavedToast}</span>
          </div>
          <button
            onClick={() => setProfileSavedToast(null)}
            className="text-white/80 hover:text-white text-xs font-bold underline cursor-pointer"
          >
            Dismiss
          </button>
        </div>
      )}
      
      {/* HERO HEADER CARD: Clean Layout & Unified Professional Typography */}
      <div className="bg-[#0F172A] text-white rounded-2xl border border-[#1E293B] p-5 sm:p-6 shadow-lg relative overflow-hidden flex flex-col items-center text-center space-y-3.5">
        
        {/* Profile Picture with Interactive Photo Edit Button */}
        <div 
          onClick={() => openEditModalWithTab('basic')}
          className="relative group cursor-pointer"
          title="Click to Edit Profile Picture & Info"
        >
          <img
            src={defaultUser.avatar}
            alt={defaultUser.name}
            className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover border-2 border-[#FA4D14] shadow-xl transition-transform group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/60 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white text-[10px] font-bold space-y-1">
            <Camera className="w-5 h-5 text-[#FA4D14]" />
            <span>Edit Photo</span>
          </div>
          <span className="absolute -bottom-1 -right-1 bg-emerald-500 text-white p-1 rounded-full border-2 border-[#0F172A] shadow" title="Verified Profile">
            <ShieldCheck className="w-3.5 h-3.5" />
          </span>
        </div>

        {/* Clean Order: Name -> Role & Org -> ID -> Age & Location */}
        <div className="space-y-1.5 max-w-md">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-tight">
            {defaultUser.name}
          </h1>

          <p className="text-slate-200 text-xs sm:text-sm font-semibold tracking-wide">
            {defaultUser.primaryRole} <span className="text-slate-500 mx-1">•</span> <span className="text-[#FA4D14] font-bold">{defaultUser.organization}</span>
          </p>

          <div>
            <span className="text-[11px] font-semibold tracking-wider text-[#FA4D14] uppercase bg-[#FA4D14]/10 px-3 py-0.5 rounded-full inline-flex items-center gap-1 border border-[#FA4D14]/25">
              ID: #{defaultUser.sportziconId}
            </span>
          </div>

          <p className="text-slate-400 text-xs font-medium pt-0.5">
            Age {defaultUser.age} <span className="text-slate-600 mx-1">•</span> {defaultUser.location}
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

        {/* Actions Row: Edit Profile, Chat & Export CV */}
        <div className={`grid ${isOwnProfile ? 'grid-cols-2 max-w-sm' : 'grid-cols-3 max-w-md'} gap-2.5 w-full pt-1 mx-auto justify-center`}>
          <button
            onClick={() => openEditModalWithTab('basic')}
            className="py-2.5 px-3 rounded-xl bg-[#FA4D14] hover:bg-[#D83000] text-white font-bold text-xs uppercase tracking-wider transition-all shadow flex items-center justify-center space-x-1.5 cursor-pointer"
          >
            <Edit2 className="w-4 h-4" />
            <span>Edit Profile</span>
          </button>

          {!isOwnProfile && (
            <button
              onClick={() => {
                if (onStartChat) {
                  onStartChat(defaultUser.name);
                } else {
                  setActiveTab('messages');
                }
              }}
              className="py-2.5 px-3 rounded-xl bg-[#0F172A] hover:bg-[#1E293B] text-white font-bold text-xs uppercase tracking-wider transition-all shadow flex items-center justify-center space-x-1.5 cursor-pointer"
            >
              <Mail className="w-4 h-4" />
              <span>Chat</span>
            </button>
          )}

          <button
            onClick={() => alert(`Verified Sports CV PDF for ${defaultUser.name} exported.`)}
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
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-[#0F172A] uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-[#FA4D14]" />
            <span>Bio & Career Overview</span>
            <CategoryStarTooltip title="Bio & Overview" description="Athlete background, career milestones, tactical strengths, and professional summary." />
          </h3>
          <button
            onClick={() => openEditModalWithTab('basic')}
            className="text-xs font-bold text-[#FA4D14] hover:text-[#D83000] flex items-center gap-1 cursor-pointer bg-[#FA4D14]/10 hover:bg-[#FA4D14]/20 px-2.5 py-1 rounded-lg border border-[#FA4D14]/30 transition-colors"
          >
            <Edit2 className="w-3.5 h-3.5" />
            <span>Edit Bio</span>
          </button>
        </div>
        <p className="text-[#334155] text-xs sm:text-sm leading-relaxed italic bg-[#FAF7F2] p-4 rounded-xl border border-[#E5DFD5] font-normal">
          "{defaultUser.bio}"
        </p>
      </div>

      {/* =========================================================================
          SECTION 2: ROLE SPECIFICATIONS & PERFORMANCE METRICS
         ========================================================================= */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-[#CBD5E1] shadow-sm space-y-3">
        <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-2.5">
          <div className="flex items-center gap-1.5">
            <BarChart2 className="w-4 h-4 text-[#FA4D14]" />
            <h3 className="text-sm font-bold text-[#0F172A] uppercase tracking-wider">
              Role Specifications & Professional Metrics
            </h3>
            <CategoryStarTooltip title="Specifications & Metrics" description="Technical playing profile, batting/bowling style, fielding agility benchmarks, and verified career performance records." />
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => openEditModalWithTab('specs')}
              className="text-xs font-bold text-[#FA4D14] hover:text-[#D83000] flex items-center gap-1 cursor-pointer bg-[#FA4D14]/10 hover:bg-[#FA4D14]/20 px-2.5 py-1 rounded-lg border border-[#FA4D14]/30 transition-colors"
            >
              <Edit2 className="w-3.5 h-3.5" />
              <span>Edit Specs</span>
            </button>
            <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200 hidden sm:inline-block">
              ✓ Verified Live Sync
            </span>
          </div>
        </div>

        {/* AT-A-GLANCE SUMMARY & EXPAND TOGGLE */}
        <div className="bg-[#FAF7F2] p-3 rounded-xl border border-[#E5DFD5] flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="px-2.5 py-1 rounded-lg bg-[#0F172A] text-white font-bold text-xs">
              {profileData.primaryRole}
            </span>
            <span className="text-[#64748B] font-medium">
              {isCoach ? 'BCCI Level 3 Master • 78.4% Match Win Rate' : isTrainer ? 'CSCS Certified • 220+ Pro Athletes' : isEducator ? 'M.P.Ed / Ph.D • 14 Published Journals' : isPhysio ? 'M.P.T Sports Medicine • 96.2% Return-to-Play' : `Best: ${profileData.bestBowling} • Econ: ${profileData.economy} • Wkts: ${profileData.wickets}`}
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

        {/* TECHNICAL ROLE SPECIFICATIONS GRID */}
        {isCoach ? (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs">
            <div className="bg-[#FAF7F2] p-3 rounded-xl border border-[#E5DFD5]">
              <span className="text-[11px] text-[#64748B] uppercase font-semibold tracking-wider block mb-0.5">Coaching Degree</span>
              <span className="text-xs font-bold text-[#0F172A]">BCCI Level 3 Master</span>
            </div>
            <div className="bg-[#FAF7F2] p-3 rounded-xl border border-[#E5DFD5]">
              <span className="text-[11px] text-[#64748B] uppercase font-semibold tracking-wider block mb-0.5">Tactical Specialization</span>
              <span className="text-xs font-bold text-[#0F172A]">Pace Bowling & Powerplay</span>
            </div>
            <div className="bg-[#FAF7F2] p-3 rounded-xl border border-[#E5DFD5]">
              <span className="text-[11px] text-[#64748B] uppercase font-semibold tracking-wider block mb-0.5">Match Win Rate</span>
              <span className="text-xs font-bold text-[#FA4D14]">78.4% Championship Win</span>
            </div>
            <div className="bg-[#FAF7F2] p-3 rounded-xl border border-[#E5DFD5]">
              <span className="text-[11px] text-[#64748B] uppercase font-semibold tracking-wider block mb-0.5">Pro Coaching Exp</span>
              <span className="text-xs font-bold text-emerald-700">12+ Years Circuit</span>
            </div>
          </div>
        ) : isTrainer ? (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs">
            <div className="bg-[#FAF7F2] p-3 rounded-xl border border-[#E5DFD5]">
              <span className="text-[11px] text-[#64748B] uppercase font-semibold tracking-wider block mb-0.5">Certification</span>
              <span className="text-xs font-bold text-[#0F172A]">CSCS & Sports Science</span>
            </div>
            <div className="bg-[#FAF7F2] p-3 rounded-xl border border-[#E5DFD5]">
              <span className="text-[11px] text-[#64748B] uppercase font-semibold tracking-wider block mb-0.5">Conditioning Focus</span>
              <span className="text-xs font-bold text-[#0F172A]">Fast Bowler Speed & Load</span>
            </div>
            <div className="bg-[#FAF7F2] p-3 rounded-xl border border-[#E5DFD5]">
              <span className="text-[11px] text-[#64748B] uppercase font-semibold tracking-wider block mb-0.5">Conditioning Benchmark</span>
              <span className="text-xs font-bold text-[#FA4D14]">High Performance Speed</span>
            </div>
            <div className="bg-[#FAF7F2] p-3 rounded-xl border border-[#E5DFD5]">
              <span className="text-[11px] text-[#64748B] uppercase font-semibold tracking-wider block mb-0.5">Athletes Trained</span>
              <span className="text-xs font-bold text-emerald-700">220+ Pro Athletes</span>
            </div>
          </div>
        ) : isEducator ? (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs">
            <div className="bg-[#FAF7F2] p-3 rounded-xl border border-[#E5DFD5]">
              <span className="text-[11px] text-[#64748B] uppercase font-semibold tracking-wider block mb-0.5">Academic Degree</span>
              <span className="text-xs font-bold text-[#0F172A]">M.P.Ed / Ph.D Sports Sci</span>
            </div>
            <div className="bg-[#FAF7F2] p-3 rounded-xl border border-[#E5DFD5]">
              <span className="text-[11px] text-[#64748B] uppercase font-semibold tracking-wider block mb-0.5">Research Domain</span>
              <span className="text-xs font-bold text-[#0F172A]">Biomechanics & Pedagogy</span>
            </div>
            <div className="bg-[#FAF7F2] p-3 rounded-xl border border-[#E5DFD5]">
              <span className="text-[11px] text-[#64748B] uppercase font-semibold tracking-wider block mb-0.5">Institution</span>
              <span className="text-xs font-bold text-[#FA4D14]">National Sports Univ</span>
            </div>
            <div className="bg-[#FAF7F2] p-3 rounded-xl border border-[#E5DFD5]">
              <span className="text-[11px] text-[#64748B] uppercase font-semibold tracking-wider block mb-0.5">Academic Papers</span>
              <span className="text-xs font-bold text-emerald-700">14 Published Journals</span>
            </div>
          </div>
        ) : isPhysio ? (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs">
            <div className="bg-[#FAF7F2] p-3 rounded-xl border border-[#E5DFD5]">
              <span className="text-[11px] text-[#64748B] uppercase font-semibold tracking-wider block mb-0.5">Medical Degree</span>
              <span className="text-xs font-bold text-[#0F172A]">M.P.T Sports Medicine</span>
            </div>
            <div className="bg-[#FAF7F2] p-3 rounded-xl border border-[#E5DFD5]">
              <span className="text-[11px] text-[#64748B] uppercase font-semibold tracking-wider block mb-0.5">Rehab Focus</span>
              <span className="text-xs font-bold text-[#0F172A]">Lumbar Stress & Shoulder</span>
            </div>
            <div className="bg-[#FAF7F2] p-3 rounded-xl border border-[#E5DFD5]">
              <span className="text-[11px] text-[#64748B] uppercase font-semibold tracking-wider block mb-0.5">Return-to-Play</span>
              <span className="text-xs font-bold text-[#FA4D14]">96.2% Success Rate</span>
            </div>
            <div className="bg-[#FAF7F2] p-3 rounded-xl border border-[#E5DFD5]">
              <span className="text-[11px] text-[#64748B] uppercase font-semibold tracking-wider block mb-0.5">Clinical Exp</span>
              <span className="text-xs font-bold text-emerald-700">9+ Years Elite Care</span>
            </div>
          </div>
        ) : isUmpire ? (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs">
            <div className="bg-[#FAF7F2] p-3 rounded-xl border border-[#E5DFD5]">
              <span className="text-[11px] text-[#64748B] uppercase font-semibold tracking-wider block mb-0.5">Official Level</span>
              <span className="text-xs font-bold text-[#0F172A]">BCCI Level 2 Certified</span>
            </div>
            <div className="bg-[#FAF7F2] p-3 rounded-xl border border-[#E5DFD5]">
              <span className="text-[11px] text-[#64748B] uppercase font-semibold tracking-wider block mb-0.5">Matches Officiated</span>
              <span className="text-xs font-bold text-[#0F172A]">142 Ranji & Club Games</span>
            </div>
            <div className="bg-[#FAF7F2] p-3 rounded-xl border border-[#E5DFD5]">
              <span className="text-[11px] text-[#64748B] uppercase font-semibold tracking-wider block mb-0.5">DRS Accuracy</span>
              <span className="text-xs font-bold text-[#FA4D14]">98.4% Verified Score</span>
            </div>
            <div className="bg-[#FAF7F2] p-3 rounded-xl border border-[#E5DFD5]">
              <span className="text-[11px] text-[#64748B] uppercase font-semibold tracking-wider block mb-0.5">Laws Expertise</span>
              <span className="text-xs font-bold text-emerald-700">MCC Laws Certified</span>
            </div>
          </div>
        ) : isGroundsman ? (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs">
            <div className="bg-[#FAF7F2] p-3 rounded-xl border border-[#E5DFD5]">
              <span className="text-[11px] text-[#64748B] uppercase font-semibold tracking-wider block mb-0.5">Curator Level</span>
              <span className="text-xs font-bold text-[#0F172A]">BCCI Chief Pitch Curator</span>
            </div>
            <div className="bg-[#FAF7F2] p-3 rounded-xl border border-[#E5DFD5]">
              <span className="text-[11px] text-[#64748B] uppercase font-semibold tracking-wider block mb-0.5">Turf Specialization</span>
              <span className="text-xs font-bold text-[#0F172A]">Red Clay & Fast Seam Pitch</span>
            </div>
            <div className="bg-[#FAF7F2] p-3 rounded-xl border border-[#E5DFD5]">
              <span className="text-[11px] text-[#64748B] uppercase font-semibold tracking-wider block mb-0.5">Venues Managed</span>
              <span className="text-xs font-bold text-[#FA4D14]">Wankhede & Brabourne</span>
            </div>
            <div className="bg-[#FAF7F2] p-3 rounded-xl border border-[#E5DFD5]">
              <span className="text-[11px] text-[#64748B] uppercase font-semibold tracking-wider block mb-0.5">Curation Exp</span>
              <span className="text-xs font-bold text-emerald-700">14+ Years Turf Mgmt</span>
            </div>
          </div>
        ) : isDirector ? (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs">
            <div className="bg-[#FAF7F2] p-3 rounded-xl border border-[#E5DFD5]">
              <span className="text-[11px] text-[#64748B] uppercase font-semibold tracking-wider block mb-0.5">Operations Focus</span>
              <span className="text-xs font-bold text-[#0F172A]">High Performance System</span>
            </div>
            <div className="bg-[#FAF7F2] p-3 rounded-xl border border-[#E5DFD5]">
              <span className="text-[11px] text-[#64748B] uppercase font-semibold tracking-wider block mb-0.5">Talent Acquisition</span>
              <span className="text-xs font-bold text-[#0F172A]">Franchise Trial Network</span>
            </div>
            <div className="bg-[#FAF7F2] p-3 rounded-xl border border-[#E5DFD5]">
              <span className="text-[11px] text-[#64748B] uppercase font-semibold tracking-wider block mb-0.5">Admin Certification</span>
              <span className="text-xs font-bold text-[#FA4D14]">BCCI Executive Certified</span>
            </div>
            <div className="bg-[#FAF7F2] p-3 rounded-xl border border-[#E5DFD5]">
              <span className="text-[11px] text-[#64748B] uppercase font-semibold tracking-wider block mb-0.5">Annual Budget</span>
              <span className="text-xs font-bold text-emerald-700">₹2.5 Crore Managed</span>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs">
            <div className="bg-[#FAF7F2] p-3 rounded-xl border border-[#E5DFD5]">
              <span className="text-[11px] text-[#64748B] uppercase font-semibold tracking-wider block mb-0.5">Batting Position</span>
              <span className="text-xs font-bold text-[#0F172A]">{profileData.battingPosition}</span>
            </div>
            <div className="bg-[#FAF7F2] p-3 rounded-xl border border-[#E5DFD5]">
              <span className="text-[11px] text-[#64748B] uppercase font-semibold tracking-wider block mb-0.5">Batting Style</span>
              <span className="text-xs font-bold text-[#0F172A]">{profileData.battingStyle}</span>
            </div>
            <div className="bg-[#FAF7F2] p-3 rounded-xl border border-[#E5DFD5]">
              <span className="text-[11px] text-[#64748B] uppercase font-semibold tracking-wider block mb-0.5">Kind of Bowler</span>
              <span className="text-xs font-bold text-[#FA4D14]">{profileData.bowlingStyle}</span>
            </div>
            <div className="bg-[#FAF7F2] p-3 rounded-xl border border-[#E5DFD5]">
              <span className="text-[11px] text-[#64748B] uppercase font-semibold tracking-wider block mb-0.5">Fielding & Agility</span>
              <span className="text-xs font-bold text-emerald-700">{profileData.fieldingAgility}</span>
            </div>
          </div>
        )}

        {/* ALL STATS EVENLY DISTRIBUTED GRID */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-xs font-bold text-[#0F172A] uppercase tracking-wider">Verified Professional Track Record & Stats</h4>
            <button
              onClick={() => openEditModalWithTab('stats')}
              className="text-xs font-bold text-[#FA4D14] hover:text-[#D83000] flex items-center gap-1 cursor-pointer bg-[#FA4D14]/10 hover:bg-[#FA4D14]/20 px-2 py-0.5 rounded-md transition-colors"
            >
              <Edit2 className="w-3 h-3" />
              <span>Edit Stats</span>
            </button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
            <div className="bg-[#FAF7F2] p-3 rounded-xl border border-[#E5DFD5] space-y-0.5">
              <span className="text-[11px] text-[#64748B] uppercase font-semibold tracking-wider block">Total Wickets</span>
              <span className="text-base font-extrabold text-[#0F172A]">{profileData.wickets}</span>
            </div>
            <div className="bg-[#FAF7F2] p-3 rounded-xl border border-[#E5DFD5] space-y-0.5">
              <span className="text-[11px] text-[#64748B] uppercase font-semibold tracking-wider block">Bowling Average</span>
              <span className="text-base font-extrabold text-[#0F172A]">{profileData.bowlingAvg}</span>
            </div>
            <div className="bg-[#FAF7F2] p-3 rounded-xl border border-[#E5DFD5] space-y-0.5">
              <span className="text-[11px] text-[#64748B] uppercase font-semibold tracking-wider block">Economy Rate</span>
              <span className="text-base font-extrabold text-[#FA4D14]">{profileData.economy}</span>
            </div>
            <div className="bg-[#FAF7F2] p-3 rounded-xl border border-[#E5DFD5] space-y-0.5">
              <span className="text-[11px] text-[#64748B] uppercase font-semibold tracking-wider block">Best Bowling</span>
              <span className="text-base font-extrabold text-[#0F172A]">{profileData.bestBowling}</span>
            </div>
            <div className="bg-[#FAF7F2] p-3 rounded-xl border border-[#E5DFD5] space-y-0.5">
              <span className="text-[11px] text-[#64748B] uppercase font-semibold tracking-wider block">Total Runs Scored</span>
              <span className="text-base font-extrabold text-[#0F172A]">{profileData.runs}</span>
            </div>
            <div className="bg-[#FAF7F2] p-3 rounded-xl border border-[#E5DFD5] space-y-0.5">
              <span className="text-[11px] text-[#64748B] uppercase font-semibold tracking-wider block">Batting Average</span>
              <span className="text-base font-extrabold text-[#0F172A]">{profileData.battingAvg}</span>
            </div>
          </div>
        </div>
      </div>
    )}
  </div>

      {/* =========================================================================
          SECTION 3: TOURNAMENTS (APP VERIFIED, DOC EXTRACTED, MANUAL)
         ========================================================================= */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-[#CBD5E1] shadow-sm space-y-3">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#E2E8F0] pb-2.5 gap-2">
          <div>
            <h3 className="text-sm font-bold text-[#0F172A] uppercase tracking-wider flex items-center gap-1.5">
              <Trophy className="w-4 h-4 text-[#FA4D14]" />
              <span>Tournaments ({tournaments.length})</span>
              <CategoryStarTooltip title="Tournaments" description="Verified competitive match records, match appearances, performance records, and official scorecard portals." />
            </h3>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleRunAiAgent}
              disabled={isAiAgentRunning}
              className="px-3 py-1.5 rounded-xl bg-[#0F172A] hover:bg-[#1E293B] text-white text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 shadow-sm disabled:opacity-50"
              title="Scan scorecards with AI Agent"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#FA4D14]" />
              <span>{isAiAgentRunning ? 'Scanning...' : 'AI Auto-Scan'}</span>
            </button>

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

        {/* AI Agent Execution Feedback (Clean Notification Pill) */}
        {(aiLogs.length > 0 || isAiAgentRunning || aiSuccessMessage) && (
          <div className="bg-[#0F172A] text-white p-3.5 rounded-xl border border-[#1E293B] text-xs space-y-2 animate-fadeIn">
            <div className="flex items-center justify-between">
              <span className="font-bold text-[#FA4D14] uppercase flex items-center gap-1.5">
                <Bot className="w-4 h-4" /> AI Scorecard Assistant
              </span>
              {aiSuccessMessage && (
                <span className="text-emerald-400 font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> {aiSuccessMessage}
                </span>
              )}
            </div>
            {aiLogs.length > 0 && (
              <div className="space-y-1 text-slate-300 font-mono text-[11px] bg-[#0B1120] p-2 rounded-lg border border-[#1E293B]">
                {aiLogs.map((log, i) => (
                  <div key={i} className="flex items-center gap-1.5">
                    <span className="text-[#FA4D14]">❯</span>
                    <span>{log}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {isAddTournamentOpen && (
          <form onSubmit={handleAddTournamentSubmit} className="bg-[#FAF7F2] p-3.5 rounded-xl border border-[#CBD5E1] space-y-2.5 text-xs shadow-sm animate-fade-in">
            <h4 className="font-bold text-[#0F172A] uppercase text-xs">Add Tournament Entry</h4>
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
                type="text"
                placeholder="Location / City (e.g. Mumbai, MH)"
                value={newTournLocation}
                onChange={e => setNewTournLocation(e.target.value)}
                className="p-2 rounded-lg border border-[#CBD5E1] bg-white text-[#0F172A]"
              />
              <input
                type="text"
                placeholder="Performance (e.g. 6 Matches • 18 Wickets)"
                value={newTournStatsSummary}
                onChange={e => setNewTournStatsSummary(e.target.value)}
                className="p-2 rounded-lg border border-[#CBD5E1] bg-white text-[#0F172A]"
              />
              <input
                type="url"
                placeholder="Website Portal URL (optional)"
                value={newTournUrl}
                onChange={e => setNewTournUrl(e.target.value)}
                className="p-2 rounded-lg border border-[#CBD5E1] bg-white text-[#0F172A] sm:col-span-2"
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

        {/* CLEAN UN-CLUTTERED TOURNAMENT CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          {tournaments.map(t => (
            <div key={t.id} className="bg-[#FAF7F2] p-4 rounded-xl border border-[#CBD5E1] shadow-sm space-y-3 hover:border-[#FA4D14] transition-all flex flex-col justify-between">
              
              <div className="space-y-2">
                {/* Header line: Title on left with Source below it; Year, Location, Edit & Delete on right corner */}
                <div className="flex items-start justify-between gap-2">
                  <div className="space-y-1 min-w-0 flex-1">
                    <h4 className="font-bold text-sm text-[#0F172A] tracking-tight leading-snug">
                      {t.name}
                    </h4>

                    {/* Source tag placed below tournament title */}
                    <div className="flex items-center gap-1.5 flex-wrap">
                      {t.sourceType === 'app' && (
                        <span className="text-[10px] font-semibold text-emerald-700 flex items-center gap-1">
                          <Zap className="w-2.5 h-2.5 text-emerald-600 fill-emerald-600" /> App Verified
                        </span>
                      )}
                      {t.sourceType === 'doc' && (
                        <span className="text-[10px] font-semibold text-blue-700 flex items-center gap-1">
                          <FileText className="w-2.5 h-2.5 text-blue-600" /> PDF Extracted
                        </span>
                      )}
                      {t.sourceType === 'manual' && (
                        <span className="text-[10px] font-semibold text-purple-700 flex items-center gap-1">
                          <Edit2 className="w-2.5 h-2.5 text-purple-600" /> Manual Entry
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Right corner: Year badge, Location, Edit and Delete controls with reduced sizing */}
                  <div className="flex flex-col items-end gap-1 shrink-0">
                    <div className="flex items-center gap-1">
                      <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-[#FA4D14]/10 text-[#FA4D14] border border-[#FA4D14]/20">
                        {t.year}
                      </span>
                      <button
                        onClick={() => setEditingTournament(t)}
                        className="p-1 text-slate-400 hover:text-[#FA4D14] hover:bg-[#FA4D14]/10 rounded-md transition-colors cursor-pointer"
                        title="Edit Tournament"
                      >
                        <Edit2 className="w-3 h-3" />
                      </button>
                      <button
                        onClick={() => handleDeleteTournament(t.id)}
                        className="p-1 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors cursor-pointer"
                        title="Delete Tournament"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                    <span className="text-[11px] text-[#64748B] font-normal flex items-center gap-0.5">
                      <MapPin className="w-2.5 h-2.5 text-slate-400" /> {t.location}
                    </span>
                  </div>
                </div>

                {/* Match Performance Stats */}
                <div className="text-xs font-semibold text-[#1E293B] pt-2 border-t border-[#E2E8F0]">
                  <span className="text-[#64748B] uppercase font-bold text-[10px] tracking-wider block mb-0.5">Performance Record</span>
                  <span className="text-xs font-bold text-[#0F172A]">{t.statsSummary}</span>
                </div>
              </div>

              {/* Clean Footer Row: Scorecard & Portal Link (No notes or ellipsis symbols) */}
              <div className="flex items-center justify-between text-xs pt-2 border-t border-[#E2E8F0] gap-2 flex-wrap">
                {t.scorecardPdfName ? (
                  <button
                    onClick={() => setActiveDocPreview(t.scorecardPdfName!)}
                    className="px-3 py-1.5 bg-[#FA4D14] hover:bg-[#D83000] text-white text-xs font-bold rounded-xl cursor-pointer transition-colors shadow-xs flex items-center gap-1.5"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>View Scorecard</span>
                  </button>
                ) : (
                  <span className="text-slate-400 text-xs">No Scorecard Attached</span>
                )}

                {t.url && (
                  <a
                    href={t.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#FA4D14] font-bold hover:underline flex items-center gap-1 text-xs shrink-0 ml-auto"
                  >
                    <span>Official Portal</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    )}
  </div>

      {/* =========================================================================
          SECTION 4: SCORECARDS & PDF SCORELOGS
         ========================================================================= */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-[#CBD5E1] shadow-sm space-y-3">
        <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-2">
          <div>
            <h3 className="text-sm font-bold text-[#0F172A] uppercase tracking-wide flex items-center gap-1.5">
              <FileCheck className="w-4 h-4 text-[#FA4D14]" />
              <span>Official Scorecards & PDF Match Logs ({scorecards.length})</span>
              <CategoryStarTooltip title="Scorecards & PDF Logs" description="Certified match scorecards, bowling spells, run logs, and digital score sheets uploaded directly." />
            </h3>
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
          SECTION 5: RESTRICTED DOCUMENTS VAULT (DIRECT APPROVAL)
         ========================================================================= */}
      <div className="bg-[#0F172A] text-white p-4 sm:p-5 rounded-2xl border border-[#1E293B] shadow-md space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#1E293B] pb-2.5 gap-2">
          <div className="space-y-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-400 text-[11px] font-extrabold uppercase tracking-wider flex items-center gap-1 border border-amber-500/30">
                <Lock className="w-3 h-3" /> Restricted Documents Vault
              </span>
              <CategoryStarTooltip dark title="Security Policy" description="Protected official certifications, KYC, age verifications, and academic records. Direct downloading is strictly disabled; access grants in-app watermarked inspection only." />
            </div>

            <h3 className="text-sm font-extrabold uppercase text-white tracking-wider pt-0.5">
              Official Certificates & Sensitive Credentials
            </h3>
          </div>

          <div className="shrink-0 self-start sm:self-auto">
            {vaultPermissionStatus === 'granted' ? (
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
            ) : (
              <button
                onClick={() => {
                  setVaultPermissionStatus('granted');
                  alert('Access Approved! Watermarked in-app document viewing is now active.');
                }}
                className="px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-bold cursor-pointer flex items-center gap-1 shadow"
              >
                <Unlock className="w-3.5 h-3.5" />
                <span>Approve Access</span>
              </button>
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
          <h3 className="text-sm font-bold text-[#0F172A] uppercase tracking-wide flex items-center gap-1.5">
            <Video className="w-4 h-4 text-[#FA4D14]" />
            <span>Your Posts</span>
            <CategoryStarTooltip title="Posts & Video Media" description="High-performance match highlights, training drill videos, and media updates published to your profile feed." />
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
                    mediaUrl: defaultUser.avatar,
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

      {/* =========================================================================
          EDIT PROFILE MODAL (EVERY BLOCK EDITABLE WITH DROPDOWNS)
         ========================================================================= */}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-5 animate-fade-in overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-2xl w-full border border-[#CBD5E1] shadow-2xl overflow-hidden max-h-[92vh] flex flex-col my-auto">
            
            {/* Modal Header */}
            <div className="bg-[#0F172A] p-4 sm:p-5 text-white flex items-center justify-between border-b border-slate-800 shrink-0">
              <div className="flex items-center space-x-2.5">
                <div className="p-2 bg-[#FA4D14] rounded-xl text-white">
                  <Edit2 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-extrabold text-base sm:text-lg text-white">Edit Profile & Block Data</h3>
                  <p className="text-xs text-slate-400 font-medium">Select options from dropdown menus to update your profile blocks.</p>
                </div>
              </div>
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="p-1.5 rounded-xl bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Navigation Tabs inside Modal */}
            <div className="flex border-b border-[#E2E8F0] bg-[#FAF7F2] px-4 pt-3 gap-2 shrink-0 overflow-x-auto">
              <button
                onClick={() => setEditTab('basic')}
                className={`px-4 py-2.5 text-xs font-bold rounded-t-xl transition-all cursor-pointer flex items-center gap-1.5 border-b-2 whitespace-nowrap ${
                  editTab === 'basic'
                    ? 'bg-white text-[#FA4D14] border-[#FA4D14] shadow-sm'
                    : 'text-[#64748B] hover:text-[#0F172A] border-transparent'
                }`}
              >
                <User className="w-3.5 h-3.5" />
                <span>1. Basic Profile & Bio</span>
              </button>
              <button
                onClick={() => setEditTab('specs')}
                className={`px-4 py-2.5 text-xs font-bold rounded-t-xl transition-all cursor-pointer flex items-center gap-1.5 border-b-2 whitespace-nowrap ${
                  editTab === 'specs'
                    ? 'bg-white text-[#FA4D14] border-[#FA4D14] shadow-sm'
                    : 'text-[#64748B] hover:text-[#0F172A] border-transparent'
                }`}
              >
                <BarChart2 className="w-3.5 h-3.5" />
                <span>2. Technical Specifications</span>
              </button>
              <button
                onClick={() => setEditTab('stats')}
                className={`px-4 py-2.5 text-xs font-bold rounded-t-xl transition-all cursor-pointer flex items-center gap-1.5 border-b-2 whitespace-nowrap ${
                  editTab === 'stats'
                    ? 'bg-white text-[#FA4D14] border-[#FA4D14] shadow-sm'
                    : 'text-[#64748B] hover:text-[#0F172A] border-transparent'
                }`}
              >
                <Trophy className="w-3.5 h-3.5" />
                <span>3. Track Record & Stats</span>
              </button>
            </div>

            {/* Form Body */}
            <form onSubmit={handleSaveProfile} className="p-4 sm:p-6 overflow-y-auto space-y-4 flex-1">
              
              {/* TAB 1: BASIC INFO & BIO */}
              {editTab === 'basic' && (
                <div className="space-y-5">
                  
                  {/* PROFILE PICTURE EDITING STUDIO */}
                  <div className="bg-[#FAF7F2] p-4 rounded-2xl border border-[#E5DFD5] space-y-3">
                    <label className="block text-xs font-bold text-[#0F172A] uppercase tracking-wider flex items-center gap-1.5">
                      <Camera className="w-4 h-4 text-[#FA4D14]" />
                      <span>Profile Picture & Avatar Studio</span>
                    </label>
                    
                    <div className="flex flex-col sm:flex-row items-center gap-4">
                      {/* Live Avatar Preview */}
                      <div className="relative shrink-0">
                        <img
                          src={draftProfile.avatar}
                          alt="Avatar Preview"
                          className="w-20 h-20 rounded-2xl object-cover border-2 border-[#FA4D14] shadow-md bg-white"
                        />
                        <span className="absolute -bottom-1 -right-1 bg-[#FA4D14] text-white p-1 rounded-full text-[10px] shadow" title="Active Photo">
                          <Check className="w-3 h-3" />
                        </span>
                      </div>

                      {/* Photo Upload & URL Controls */}
                      <div className="flex-1 w-full space-y-2.5">
                        <div className="flex flex-wrap items-center gap-2">
                          <label className="flex items-center gap-1.5 px-3 py-2 bg-[#FA4D14] hover:bg-[#D83000] text-white rounded-xl text-xs font-bold cursor-pointer transition-colors shadow">
                            <Upload className="w-3.5 h-3.5" />
                            <span>Upload Photo from Device</span>
                            <input
                              type="file"
                              accept="image/*"
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                  const reader = new FileReader();
                                  reader.onloadend = () => {
                                    if (typeof reader.result === 'string') {
                                      setDraftProfile(prev => ({ ...prev, avatar: reader.result as string }));
                                    }
                                  };
                                  reader.readAsDataURL(file);
                                }
                              }}
                              className="hidden"
                            />
                          </label>
                          <span className="text-[11px] text-[#64748B] font-medium">PNG, JPG, WEBP</span>
                        </div>

                        <div>
                          <label className="block text-[11px] font-bold text-[#64748B] uppercase tracking-wider mb-1">
                            Or Enter Custom Photo URL
                          </label>
                          <input
                            type="url"
                            value={draftProfile.avatar}
                            onChange={(e) => setDraftProfile({ ...draftProfile, avatar: e.target.value })}
                            placeholder="https://example.com/photo.jpg"
                            className="w-full bg-white border border-[#CBD5E1] rounded-xl px-3 py-1.5 text-xs font-medium text-[#0F172A] focus:outline-none focus:border-[#FA4D14]"
                          />
                        </div>

                        {/* Preset Avatars Grid */}
                        <div>
                          <label className="block text-[11px] font-bold text-[#64748B] uppercase tracking-wider mb-1">
                            Or Select Preset Athlete Avatar
                          </label>
                          <div className="flex items-center gap-2 overflow-x-auto pb-1">
                            {AVATAR_OPTIONS.map((av) => (
                              <button
                                key={av.url}
                                type="button"
                                onClick={() => setDraftProfile({ ...draftProfile, avatar: av.url })}
                                className={`relative rounded-xl overflow-hidden border-2 shrink-0 cursor-pointer transition-all ${
                                  draftProfile.avatar === av.url ? 'border-[#FA4D14] scale-105 shadow-md ring-2 ring-[#FA4D14]/30' : 'border-transparent opacity-75 hover:opacity-100'
                                }`}
                                title={av.label}
                              >
                                <img src={av.url} alt={av.label} className="w-10 h-10 object-cover" />
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div>
                      <label className="block text-xs font-bold text-[#0F172A] uppercase tracking-wider mb-1">
                        Full Name
                      </label>
                      <input
                        type="text"
                        value={draftProfile.name}
                        onChange={(e) => setDraftProfile({ ...draftProfile, name: e.target.value })}
                        className="w-full bg-[#FAF7F2] border border-[#CBD5E1] rounded-xl px-3 py-2 text-xs font-bold text-[#0F172A] focus:outline-none focus:border-[#FA4D14]"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#0F172A] uppercase tracking-wider mb-1">
                        Primary Sports Role (Dropdown)
                      </label>
                      <select
                        value={draftProfile.primaryRole}
                        onChange={(e) => setDraftProfile({ ...draftProfile, primaryRole: e.target.value })}
                        className="w-full bg-[#FAF7F2] border border-[#CBD5E1] rounded-xl px-3 py-2 text-xs font-bold text-[#0F172A] focus:outline-none focus:border-[#FA4D14] cursor-pointer"
                      >
                        {PRIMARY_ROLE_OPTIONS.map((r) => (
                          <option key={r} value={r}>{r}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#0F172A] uppercase tracking-wider mb-1">
                        Academy / Sports Organization (Dropdown)
                      </label>
                      <select
                        value={draftProfile.organization}
                        onChange={(e) => setDraftProfile({ ...draftProfile, organization: e.target.value })}
                        className="w-full bg-[#FAF7F2] border border-[#CBD5E1] rounded-xl px-3 py-2 text-xs font-bold text-[#0F172A] focus:outline-none focus:border-[#FA4D14] cursor-pointer"
                      >
                        {ORGANIZATION_OPTIONS.map((org) => (
                          <option key={org} value={org}>{org}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#0F172A] uppercase tracking-wider mb-1">
                        Age Category (Dropdown)
                      </label>
                      <select
                        value={draftProfile.age}
                        onChange={(e) => setDraftProfile({ ...draftProfile, age: e.target.value })}
                        className="w-full bg-[#FAF7F2] border border-[#CBD5E1] rounded-xl px-3 py-2 text-xs font-bold text-[#0F172A] focus:outline-none focus:border-[#FA4D14] cursor-pointer"
                      >
                        {AGE_OPTIONS.map((a) => (
                          <option key={a} value={a}>Age {a}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* DEPENDENT NATION & CITY DROPDOWNS WITH TYPE-AHEAD SEARCH POPUP */}
                  <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-extrabold text-[#0F172A] uppercase tracking-wider flex items-center gap-1.5">
                        <Globe className="w-4 h-4 text-[#FA4D14]" />
                        <span>Location: Nation & Dependent City Selection</span>
                      </span>
                      <span className="text-[10px] text-[#64748B] font-semibold">Type letters to filter options</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      <SearchableDropdown
                        label="Nation / Country (Searchable)"
                        value={draftProfile.country}
                        options={COUNTRY_OPTIONS}
                        onChange={(selectedCountry) => {
                          const cities = COUNTRY_CITIES_MAP[selectedCountry] || ['Main City'];
                          const currentCityValid = cities.includes(draftProfile.city);
                          const newCity = currentCityValid ? draftProfile.city : cities[0];
                          setDraftProfile(prev => ({
                            ...prev,
                            country: selectedCountry,
                            city: newCity,
                            location: `${newCity}, ${selectedCountry}`
                          }));
                        }}
                        placeholder="Type nation (e.g. India, Australia)..."
                        icon={<Globe className="w-3.5 h-3.5 text-[#FA4D14]" />}
                      />

                      <SearchableDropdown
                        label={`City in ${draftProfile.country || 'Nation'} (Searchable)`}
                        value={draftProfile.city}
                        options={COUNTRY_CITIES_MAP[draftProfile.country] || ['Main City']}
                        onChange={(selectedCity) => {
                          setDraftProfile(prev => ({
                            ...prev,
                            city: selectedCity,
                            location: `${selectedCity}, ${draftProfile.country || 'India'}`
                          }));
                        }}
                        placeholder={`Type city in ${draftProfile.country}...`}
                        icon={<MapPin className="w-3.5 h-3.5 text-[#FA4D14]" />}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="block text-xs font-bold text-[#0F172A] uppercase tracking-wider">
                        Bio & Sports Background Overview
                      </label>
                      <div className="flex items-center gap-1.5">
                        <span className="text-[10px] text-[#64748B]">Presets:</span>
                        <button
                          type="button"
                          onClick={() => setDraftProfile({
                            ...draftProfile,
                            bio: 'Express right-arm fast bowler clocking 138-142 km/h consistently. Specializing in new ball seam movement and death overs bowling.'
                          })}
                          className="text-[10px] font-bold text-[#FA4D14] bg-[#FA4D14]/10 hover:bg-[#FA4D14]/20 px-2 py-0.5 rounded border border-[#FA4D14]/30 cursor-pointer"
                        >
                          Fast Bowler
                        </button>
                        <button
                          type="button"
                          onClick={() => setDraftProfile({
                            ...draftProfile,
                            bio: 'Top-order opening batter known for aggressive strokeplay and match-winning partnerships in MCA state tournaments.'
                          })}
                          className="text-[10px] font-bold text-[#FA4D14] bg-[#FA4D14]/10 hover:bg-[#FA4D14]/20 px-2 py-0.5 rounded border border-[#FA4D14]/30 cursor-pointer"
                        >
                          Batter
                        </button>
                        <button
                          type="button"
                          onClick={() => setDraftProfile({
                            ...draftProfile,
                            bio: 'BCCI Level 3 Certified Master Coach specializing in pace bowling biomechanics, match tactical strategy, and athlete load management.'
                          })}
                          className="text-[10px] font-bold text-[#FA4D14] bg-[#FA4D14]/10 hover:bg-[#FA4D14]/20 px-2 py-0.5 rounded border border-[#FA4D14]/30 cursor-pointer"
                        >
                          Coach
                        </button>
                      </div>
                    </div>
                    <textarea
                      value={draftProfile.bio}
                      onChange={(e) => setDraftProfile({ ...draftProfile, bio: e.target.value })}
                      rows={3}
                      className="w-full bg-[#FAF7F2] border border-[#CBD5E1] rounded-xl p-3 text-xs font-normal text-[#0F172A] focus:outline-none focus:border-[#FA4D14]"
                      placeholder="Write your sports bio or select a preset..."
                    />
                  </div>
                </div>
              )}

              {/* TAB 2: TECHNICAL ROLE SPECIFICATIONS */}
              {editTab === 'specs' && (
                <div className="space-y-4">
                  <div className="bg-amber-50 border border-amber-200 p-3 rounded-xl text-xs text-amber-800 font-medium">
                    ⚡ Select technical role parameters from the dropdown options below to customize your specifications block.
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div>
                      <label className="block text-xs font-bold text-[#0F172A] uppercase tracking-wider mb-1">
                        Batting Position (Dropdown)
                      </label>
                      <select
                        value={draftProfile.battingPosition}
                        onChange={(e) => setDraftProfile({ ...draftProfile, battingPosition: e.target.value })}
                        className="w-full bg-[#FAF7F2] border border-[#CBD5E1] rounded-xl px-3 py-2 text-xs font-bold text-[#0F172A] focus:outline-none focus:border-[#FA4D14] cursor-pointer"
                      >
                        {BATTING_POSITION_OPTIONS.map((pos) => (
                          <option key={pos} value={pos}>{pos}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#0F172A] uppercase tracking-wider mb-1">
                        Batting Style (Dropdown)
                      </label>
                      <select
                        value={draftProfile.battingStyle}
                        onChange={(e) => setDraftProfile({ ...draftProfile, battingStyle: e.target.value })}
                        className="w-full bg-[#FAF7F2] border border-[#CBD5E1] rounded-xl px-3 py-2 text-xs font-bold text-[#0F172A] focus:outline-none focus:border-[#FA4D14] cursor-pointer"
                      >
                        {BATTING_STYLE_OPTIONS.map((style) => (
                          <option key={style} value={style}>{style}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#0F172A] uppercase tracking-wider mb-1">
                        Kind of Bowler / Bowling Style (Dropdown)
                      </label>
                      <select
                        value={draftProfile.bowlingStyle}
                        onChange={(e) => setDraftProfile({ ...draftProfile, bowlingStyle: e.target.value })}
                        className="w-full bg-[#FAF7F2] border border-[#CBD5E1] rounded-xl px-3 py-2 text-xs font-bold text-[#0F172A] focus:outline-none focus:border-[#FA4D14] cursor-pointer"
                      >
                        {BOWLING_STYLE_OPTIONS.map((bowl) => (
                          <option key={bowl} value={bowl}>{bowl}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#0F172A] uppercase tracking-wider mb-1">
                        Fielding & Agility Rating (Dropdown)
                      </label>
                      <select
                        value={draftProfile.fieldingAgility}
                        onChange={(e) => setDraftProfile({ ...draftProfile, fieldingAgility: e.target.value })}
                        className="w-full bg-[#FAF7F2] border border-[#CBD5E1] rounded-xl px-3 py-2 text-xs font-bold text-[#0F172A] focus:outline-none focus:border-[#FA4D14] cursor-pointer"
                      >
                        {FIELDING_AGILITY_OPTIONS.map((f) => (
                          <option key={f} value={f}>{f}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 3: VERIFIED TRACK RECORD & STATS */}
              {editTab === 'stats' && (
                <div className="space-y-4">
                  <div className="bg-emerald-50 border border-emerald-200 p-3 rounded-xl text-xs text-emerald-800 font-medium">
                    🏆 Select official statistics from the dropdowns below to update your career stats block.
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div>
                      <label className="block text-xs font-bold text-[#0F172A] uppercase tracking-wider mb-1">
                        Total Wickets (Dropdown)
                      </label>
                      <select
                        value={draftProfile.wickets}
                        onChange={(e) => setDraftProfile({ ...draftProfile, wickets: e.target.value })}
                        className="w-full bg-[#FAF7F2] border border-[#CBD5E1] rounded-xl px-3 py-2 text-xs font-bold text-[#0F172A] focus:outline-none focus:border-[#FA4D14] cursor-pointer"
                      >
                        {WICKETS_OPTIONS.map((w) => (
                          <option key={w} value={w}>{w}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#0F172A] uppercase tracking-wider mb-1">
                        Bowling Average (Dropdown)
                      </label>
                      <select
                        value={draftProfile.bowlingAvg}
                        onChange={(e) => setDraftProfile({ ...draftProfile, bowlingAvg: e.target.value })}
                        className="w-full bg-[#FAF7F2] border border-[#CBD5E1] rounded-xl px-3 py-2 text-xs font-bold text-[#0F172A] focus:outline-none focus:border-[#FA4D14] cursor-pointer"
                      >
                        {BOWLING_AVG_OPTIONS.map((avg) => (
                          <option key={avg} value={avg}>{avg}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#0F172A] uppercase tracking-wider mb-1">
                        Economy Rate (Dropdown)
                      </label>
                      <select
                        value={draftProfile.economy}
                        onChange={(e) => setDraftProfile({ ...draftProfile, economy: e.target.value })}
                        className="w-full bg-[#FAF7F2] border border-[#CBD5E1] rounded-xl px-3 py-2 text-xs font-bold text-[#0F172A] focus:outline-none focus:border-[#FA4D14] cursor-pointer"
                      >
                        {ECONOMY_OPTIONS.map((ec) => (
                          <option key={ec} value={ec}>{ec}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#0F172A] uppercase tracking-wider mb-1">
                        Best Bowling Figures (Dropdown)
                      </label>
                      <select
                        value={draftProfile.bestBowling}
                        onChange={(e) => setDraftProfile({ ...draftProfile, bestBowling: e.target.value })}
                        className="w-full bg-[#FAF7F2] border border-[#CBD5E1] rounded-xl px-3 py-2 text-xs font-bold text-[#0F172A] focus:outline-none focus:border-[#FA4D14] cursor-pointer"
                      >
                        {BEST_BOWLING_OPTIONS.map((b) => (
                          <option key={b} value={b}>{b}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#0F172A] uppercase tracking-wider mb-1">
                        Total Runs Scored (Dropdown)
                      </label>
                      <select
                        value={draftProfile.runs}
                        onChange={(e) => setDraftProfile({ ...draftProfile, runs: e.target.value })}
                        className="w-full bg-[#FAF7F2] border border-[#CBD5E1] rounded-xl px-3 py-2 text-xs font-bold text-[#0F172A] focus:outline-none focus:border-[#FA4D14] cursor-pointer"
                      >
                        {RUNS_OPTIONS.map((r) => (
                          <option key={r} value={r}>{r}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#0F172A] uppercase tracking-wider mb-1">
                        Batting Average (Dropdown)
                      </label>
                      <select
                        value={draftProfile.battingAvg}
                        onChange={(e) => setDraftProfile({ ...draftProfile, battingAvg: e.target.value })}
                        className="w-full bg-[#FAF7F2] border border-[#CBD5E1] rounded-xl px-3 py-2 text-xs font-bold text-[#0F172A] focus:outline-none focus:border-[#FA4D14] cursor-pointer"
                      >
                        {BATTING_AVG_OPTIONS.map((bavg) => (
                          <option key={bavg} value={bavg}>{bavg}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {/* Modal Footer Actions */}
              <div className="pt-4 border-t border-[#E2E8F0] flex items-center justify-end space-x-2.5">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold text-xs uppercase transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#FA4D14] hover:bg-[#D83000] text-white rounded-xl font-bold text-xs uppercase shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <Check className="w-4 h-4" />
                  <span>Save Profile Changes</span>
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

      {/* =========================================================================
          EDIT TOURNAMENT MODAL (MODIFY ADDED TOURNAMENTS)
         ========================================================================= */}
      {editingTournament && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-lg w-full border border-[#CBD5E1] shadow-2xl overflow-hidden p-5 sm:p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <div className="flex items-center space-x-2">
                <div className="p-2 bg-[#FA4D14] rounded-xl text-white">
                  <Trophy className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-extrabold text-base text-[#0F172A]">Edit Tournament Details</h3>
                  <p className="text-xs text-slate-500">Update tournament info, location, and match records</p>
                </div>
              </div>
              <button
                onClick={() => setEditingTournament(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveEditedTournament} className="space-y-3.5 text-xs">
              <div>
                <label className="block text-xs font-bold text-[#0F172A] uppercase tracking-wider mb-1">
                  Tournament Name
                </label>
                <input
                  type="text"
                  required
                  value={editingTournament.name}
                  onChange={(e) => setEditingTournament({ ...editingTournament, name: e.target.value })}
                  className="w-full bg-[#FAF7F2] border border-[#CBD5E1] rounded-xl px-3 py-2 text-xs font-bold text-[#0F172A] focus:outline-none focus:border-[#FA4D14]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[#0F172A] uppercase tracking-wider mb-1">
                    Year
                  </label>
                  <input
                    type="text"
                    required
                    value={editingTournament.year}
                    onChange={(e) => setEditingTournament({ ...editingTournament, year: e.target.value })}
                    className="w-full bg-[#FAF7F2] border border-[#CBD5E1] rounded-xl px-3 py-2 text-xs font-bold text-[#0F172A] focus:outline-none focus:border-[#FA4D14]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#0F172A] uppercase tracking-wider mb-1">
                    Location / City
                  </label>
                  <input
                    type="text"
                    required
                    value={editingTournament.location}
                    onChange={(e) => setEditingTournament({ ...editingTournament, location: e.target.value })}
                    className="w-full bg-[#FAF7F2] border border-[#CBD5E1] rounded-xl px-3 py-2 text-xs font-bold text-[#0F172A] focus:outline-none focus:border-[#FA4D14]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#0F172A] uppercase tracking-wider mb-1">
                  Performance Record Summary
                </label>
                <input
                  type="text"
                  required
                  value={editingTournament.statsSummary}
                  onChange={(e) => setEditingTournament({ ...editingTournament, statsSummary: e.target.value })}
                  placeholder="e.g. 6 Matches • 18 Wickets • Econ 3.82"
                  className="w-full bg-[#FAF7F2] border border-[#CBD5E1] rounded-xl px-3 py-2 text-xs font-bold text-[#0F172A] focus:outline-none focus:border-[#FA4D14]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#0F172A] uppercase tracking-wider mb-1">
                  Official Portal URL (Optional)
                </label>
                <input
                  type="url"
                  value={editingTournament.url}
                  onChange={(e) => setEditingTournament({ ...editingTournament, url: e.target.value })}
                  placeholder="https://example.com"
                  className="w-full bg-[#FAF7F2] border border-[#CBD5E1] rounded-xl px-3 py-2 text-xs font-bold text-[#0F172A] focus:outline-none focus:border-[#FA4D14]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#0F172A] uppercase tracking-wider mb-1">
                  Attached Scorecard PDF Name (Optional)
                </label>
                <input
                  type="text"
                  value={editingTournament.scorecardPdfName || ''}
                  onChange={(e) => setEditingTournament({ ...editingTournament, scorecardPdfName: e.target.value })}
                  placeholder="e.g. Match_Scorecard.pdf"
                  className="w-full bg-[#FAF7F2] border border-[#CBD5E1] rounded-xl px-3 py-2 text-xs font-medium text-[#0F172A] focus:outline-none focus:border-[#FA4D14]"
                />
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => handleDeleteTournament(editingTournament.id)}
                  className="px-3 py-2 bg-red-50 hover:bg-red-100 text-red-600 font-bold rounded-xl cursor-pointer text-xs flex items-center gap-1 transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Delete</span>
                </button>

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setEditingTournament(null)}
                    className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl cursor-pointer text-xs transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-[#FA4D14] hover:bg-[#D83000] text-white font-bold rounded-xl cursor-pointer text-xs shadow-md transition-all flex items-center gap-1.5"
                  >
                    <Check className="w-3.5 h-3.5" />
                    <span>Save Changes</span>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
