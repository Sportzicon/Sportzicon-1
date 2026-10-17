import React, { useState, useMemo } from 'react';
import { Athlete, UserSession, ViewTab } from '../types';
import { 
  Search, 
  Filter, 
  ShieldCheck, 
  Award, 
  ArrowRight, 
  X, 
  Sparkles, 
  UserCheck, 
  Building2, 
  GraduationCap, 
  Shield, 
  Trophy, 
  MessageSquare,
  MapPin,
  ExternalLink,
  Users,
  ChevronDown,
  Check
} from 'lucide-react';

export type NetworkCategory = 'all' | 'athlete' | 'scout' | 'association' | 'academy' | 'club' | 'organizer';

export interface NetworkUserEntity {
  id: string;
  name: string;
  category: NetworkCategory;
  categoryLabel: string;
  roleTitle: string;
  sport: string;
  avatar: string;
  location: string;
  verified: boolean;
  rating?: number;
  badges: string[];
  organization: string;
  primaryMetricLabel: string;
  primaryMetricValue: string;
  secondaryMetricLabel: string;
  secondaryMetricValue: string;
  bioOrDescription: string;
  athleteData?: Athlete;
}

interface TalentSearchProps {
  athletes: Athlete[];
  onSelectAthlete: (athlete: Athlete) => void;
  initialQuery?: string;
  userSession?: UserSession | null;
  setActiveTab?: (tab: ViewTab) => void;
  onStartChatWithUser?: (userName: string) => void;
}

const STATIC_NETWORK_ENTITIES: NetworkUserEntity[] = [
  // SCOUTS
  {
    id: 'scout-001',
    name: 'Marcus Vance',
    category: 'scout',
    categoryLabel: 'Scout & Selector',
    roleTitle: 'Senior IPL Talent Scout & Biomechanics Lead',
    sport: 'Cricket',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    location: 'Mumbai & West Zone',
    verified: true,
    rating: 4.9,
    badges: ['Verified IPL Scout', '142 Scout Notes', 'BCCI Level 3 Analyst'],
    organization: 'Apex Sports Intelligence',
    primaryMetricLabel: 'Athletes Scouted',
    primaryMetricValue: '142 Players',
    secondaryMetricLabel: 'Specialty Focus',
    secondaryMetricValue: 'Fast Bowling Telemetry',
    bioOrDescription: 'Over 12 years scouting youth talent across Ranji Trophy, State U-19s, and premier club leagues. Specializes in high-release biomechanics and death overs bowling.'
  },
  {
    id: 'scout-002',
    name: 'Vikram Malhotra',
    category: 'scout',
    categoryLabel: 'Scout & Selector',
    roleTitle: 'National Talent Identifier',
    sport: 'Cricket',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    location: 'Delhi & North Zone',
    verified: true,
    rating: 4.8,
    badges: ['National Scout', '98 Endorsements', 'Batting Specialist'],
    organization: 'BCCI Talent Identification Wing',
    primaryMetricLabel: 'Regional Coverage',
    primaryMetricValue: 'North & Central Zone',
    secondaryMetricLabel: 'Specialty Focus',
    secondaryMetricValue: 'Top-Order Power Hitters',
    bioOrDescription: 'Former First-Class cricketer tracking top-order batting technique, hand speed, and spin adaptability across national youth championships.'
  },
  {
    id: 'scout-003',
    name: 'Sunita Rao',
    category: 'scout',
    categoryLabel: 'Scout & Selector',
    roleTitle: 'Women\'s Cricket High-Performance Scout',
    sport: 'Cricket',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
    location: 'Bengaluru & South Zone',
    verified: true,
    rating: 4.9,
    badges: ['High Performance Scout', '64 Endorsements'],
    organization: 'National Sports Talent Cell',
    primaryMetricLabel: 'Athletes Promoted',
    primaryMetricValue: '48 Players',
    secondaryMetricLabel: 'Specialty Focus',
    secondaryMetricValue: 'Spin Variations & All-Rounders',
    bioOrDescription: 'Specializes in identifying high-temperament female all-rounders and wrist spinners for national pathway squads.'
  },

  // STATE ASSOCIATIONS
  {
    id: 'assoc-001',
    name: 'Maharashtra Cricket Association (MCA)',
    category: 'association',
    categoryLabel: 'State Governing Body',
    roleTitle: 'Official State Sports Governing Board',
    sport: 'Cricket',
    avatar: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&w=400&q=80',
    location: 'Mumbai & Pune, MH',
    verified: true,
    rating: 5.0,
    badges: ['BCCI Sanctioned', '3,400+ Athletes', '32 Academies'],
    organization: 'BCCI Official State Affiliate',
    primaryMetricLabel: 'Registered Academies',
    primaryMetricValue: '32 Accredited',
    secondaryMetricLabel: 'Annual State Leagues',
    secondaryMetricValue: '8 Tournaments',
    bioOrDescription: 'State sports governing body administering district and state level cricket, hosting official selection trials, and certifying state sports facilities.'
  },
  {
    id: 'assoc-002',
    name: 'Karnataka State Cricket Association (KSCA)',
    category: 'association',
    categoryLabel: 'State Governing Body',
    roleTitle: 'State Sports Governing Board',
    sport: 'Cricket',
    avatar: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&w=400&q=80',
    location: 'Bengaluru, KA',
    verified: true,
    rating: 4.9,
    badges: ['BCCI Sanctioned', '2,800+ Athletes', 'M. Chinnaswamy Stadium'],
    organization: 'BCCI Affiliated Board',
    primaryMetricLabel: 'Registered Athletes',
    primaryMetricValue: '2,840 Players',
    secondaryMetricLabel: 'Home Venue',
    secondaryMetricValue: 'M. Chinnaswamy, Bengaluru',
    bioOrDescription: 'Promoting grassroots development across Karnataka through state leagues, high-performance coaching centers, and televised tournaments.'
  },
  {
    id: 'assoc-003',
    name: 'Delhi & District Cricket Association (DDCA)',
    category: 'association',
    categoryLabel: 'State Governing Body',
    roleTitle: 'District & State Cricket Board',
    sport: 'Cricket',
    avatar: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=400&q=80',
    location: 'New Delhi, DL',
    verified: true,
    rating: 4.8,
    badges: ['BCCI Sanctioned', '2,100+ Athletes', '45 Clubs'],
    organization: 'BCCI Affiliated Association',
    primaryMetricLabel: 'Affiliated Clubs',
    primaryMetricValue: '45 Clubs',
    secondaryMetricLabel: 'Jurisdiction',
    secondaryMetricValue: 'Delhi NCR Region',
    bioOrDescription: 'Organizes the DDCA Division 1 League and official youth selection trials across Delhi & National Capital Region.'
  },

  // ACADEMIES
  {
    id: 'acad-001',
    name: 'Apex Cricket Academy',
    category: 'academy',
    categoryLabel: 'High-Performance Academy',
    roleTitle: 'Premier Certified Training Hub',
    sport: 'Cricket',
    avatar: 'https://images.unsplash.com/photo-1526232761682-d26e03ac148e?auto=format&fit=crop&w=400&q=80',
    location: 'Mumbai, MH',
    verified: true,
    rating: 4.9,
    badges: ['5-Star Rating', '120 Enrolled Athletes', 'Telemetry Sensors'],
    organization: 'Apex Sports Infra & Coaching',
    primaryMetricLabel: 'Head Coach',
    primaryMetricValue: 'Rajesh Kumar (Ex-Ranji)',
    secondaryMetricLabel: 'Facilities',
    secondaryMetricValue: '12 Turf Pitches, Radar Guns',
    bioOrDescription: 'State-of-the-art training center equipped with high-speed video telemetry, pitch sensors, and biomechanics tracking for fast bowlers and batsmen.'
  },
  {
    id: 'acad-002',
    name: 'South Youth Cricket Academy',
    category: 'academy',
    categoryLabel: 'High-Performance Academy',
    roleTitle: 'Regional Youth Excellence Center',
    sport: 'Cricket',
    avatar: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=400&q=80',
    location: 'Bengaluru, KA',
    verified: true,
    rating: 4.8,
    badges: ['KSCA Approved', '85 Enrolled Athletes'],
    organization: 'South Youth Sports Trust',
    primaryMetricLabel: 'Head Coach',
    primaryMetricValue: 'K. Prasanna',
    secondaryMetricLabel: 'State Caps Produced',
    secondaryMetricValue: '14 State U-19 Players',
    bioOrDescription: 'Specialized spin bowling and batting academy focused on tactical match awareness, video analysis, and athletic fitness engineering.'
  },

  // CLUBS
  {
    id: 'club-001',
    name: 'Delhi Colts Cricket Club',
    category: 'club',
    categoryLabel: 'Club & Franchise',
    roleTitle: 'Division 1 Senior Premier Club',
    sport: 'Cricket',
    avatar: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=400&q=80',
    location: 'New Delhi, DL',
    verified: true,
    rating: 4.8,
    badges: ['DDCA Division 1', '3 Titles', 'Active Recruitment'],
    organization: 'Delhi Colts Sports Club',
    primaryMetricLabel: 'Active Roster',
    primaryMetricValue: '22 Contracted Players',
    secondaryMetricLabel: 'Open Vacancies',
    secondaryMetricValue: '2 Fast Bowler Spots',
    bioOrDescription: 'Multiple-time division champions actively recruiting fast bowlers and middle-order batsmen for senior league campaigns.'
  },
  {
    id: 'club-002',
    name: 'Baroda Cricket Club',
    category: 'club',
    categoryLabel: 'Club & Franchise',
    roleTitle: 'Senior Division League Club',
    sport: 'Cricket',
    avatar: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=400&q=80',
    location: 'Vadodara, GJ',
    verified: true,
    rating: 4.7,
    badges: ['West Zone League', '18 Players'],
    organization: 'Baroda Sports League',
    primaryMetricLabel: 'Active Roster',
    primaryMetricValue: '18 Players',
    secondaryMetricLabel: 'Home Venue',
    secondaryMetricValue: 'Moti Bagh Ground',
    bioOrDescription: 'Historic West Zone club known for developing top all-rounders and offering competitive match exposure.'
  },

  // ORGANIZERS
  {
    id: 'org-001',
    name: 'National Youth Sports Federation (NYSF)',
    category: 'organizer',
    categoryLabel: 'Tournament Organizer',
    roleTitle: 'Sanctioned Tournament & League Director',
    sport: 'Cricket',
    avatar: 'https://images.unsplash.com/photo-1569517282132-25d22f4573e6?auto=format&fit=crop&w=400&q=80',
    location: 'Mumbai, MH',
    verified: true,
    rating: 5.0,
    badges: ['Official Organizer', '12 Annual Cups', 'Televised'],
    organization: 'National Sports Board',
    primaryMetricLabel: 'Total Prize Purse',
    primaryMetricValue: '₹10,000,000+',
    secondaryMetricLabel: 'Sanctioned Event',
    secondaryMetricValue: 'All India Youth Cup',
    bioOrDescription: 'Premier tournament director hosting multi-state televised championships, state selection trials, and youth league cups.'
  }
];

export const TalentSearch: React.FC<TalentSearchProps> = ({
  athletes,
  onSelectAthlete,
  initialQuery = '',
  userSession,
  setActiveTab,
  onStartChatWithUser,
}) => {
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [selectedCategory, setSelectedCategory] = useState<NetworkCategory>('all');
  const [selectedSport, setSelectedSport] = useState<string>('all');

  // Searchable Category Combobox state
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [categorySearchText, setCategorySearchText] = useState('');

  // Searchable Sport Combobox state
  const [isSportOpen, setIsSportOpen] = useState(false);
  const [sportSearchText, setSportSearchText] = useState('');

  const sportsList = ['all', 'Cricket', 'Football', 'Basketball', 'Athletics'];

  // Convert athletes into unified NetworkUserEntities
  const allEntities = useMemo<NetworkUserEntity[]>(() => {
    const athleteEntities: NetworkUserEntity[] = athletes.map((a) => ({
      id: a.id,
      name: a.name,
      category: 'athlete',
      categoryLabel: 'Athlete / Player',
      roleTitle: a.primaryRole,
      sport: a.sport,
      avatar: a.avatar,
      location: a.location,
      verified: a.verified,
      badges: [
        `${a.sport} Player`,
        `Age ${a.age}`,
        `${a.scoutEndorsements} Scout Notes`
      ],
      organization: a.currentClubOrAcademy,
      primaryMetricLabel: 'Top Benchmark',
      primaryMetricValue: a.topBenchmark || a.topSpeedOrMetric || 'N/A',
      secondaryMetricLabel: 'Skill Index',
      secondaryMetricValue: `${a.performanceIndex || 90} / 100`,
      bioOrDescription: a.bio,
      athleteData: a
    }));

    return [...athleteEntities, ...STATIC_NETWORK_ENTITIES];
  }, [athletes]);

  // Filter entities
  const filteredEntities = useMemo(() => {
    return allEntities.filter((item) => {
      // Category filter
      const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;

      // Query filter
      const q = searchQuery.toLowerCase().trim();
      const matchesQuery =
        q === '' ||
        item.name.toLowerCase().includes(q) ||
        item.roleTitle.toLowerCase().includes(q) ||
        item.location.toLowerCase().includes(q) ||
        item.organization.toLowerCase().includes(q) ||
        item.categoryLabel.toLowerCase().includes(q) ||
        item.bioOrDescription.toLowerCase().includes(q) ||
        item.badges.some((b) => b.toLowerCase().includes(q));

      // Sport filter
      const matchesSport = selectedSport === 'all' || item.sport.toLowerCase() === selectedSport.toLowerCase();

      return matchesCategory && matchesQuery && matchesSport;
    });
  }, [allEntities, selectedCategory, searchQuery, selectedSport]);

  // Counts for dropdown options
  const counts = useMemo(() => {
    const res: Record<NetworkCategory, number> = {
      all: allEntities.length,
      athlete: 0,
      scout: 0,
      association: 0,
      academy: 0,
      club: 0,
      organizer: 0,
    };
    allEntities.forEach((ent) => {
      if (res[ent.category] !== undefined) {
        res[ent.category]++;
      }
    });
    return res;
  }, [allEntities]);

  // Options for Category Combobox
  const categoryOptions = useMemo<{ id: NetworkCategory; label: string; icon: string; count: number }[]>(() => [
    { id: 'all', label: 'All User Categories', icon: '⚡', count: counts.all },
    { id: 'athlete', label: 'Athletes & Players', icon: '🏆', count: counts.athlete },
    { id: 'scout', label: 'Scouts & Selectors', icon: '🎯', count: counts.scout },
    { id: 'association', label: 'State Associations', icon: '🏛️', count: counts.association },
    { id: 'academy', label: 'Academies & Coaches', icon: '🎓', count: counts.academy },
    { id: 'club', label: 'Clubs & Franchises', icon: '🛡️', count: counts.club },
    { id: 'organizer', label: 'Tournament Organizers', icon: '🥇', count: counts.organizer },
  ], [counts]);

  const filteredCategoryOptions = useMemo(() => {
    if (!categorySearchText.trim()) return categoryOptions;
    const q = categorySearchText.toLowerCase();
    return categoryOptions.filter(
      (opt) => opt.label.toLowerCase().includes(q) || opt.id.toLowerCase().includes(q)
    );
  }, [categoryOptions, categorySearchText]);

  // Options for Sport Combobox
  const sportOptions = useMemo(() => [
    { id: 'all', label: 'All Sports', icon: '🌐' },
    { id: 'Cricket', label: 'Cricket', icon: '🏏' },
    { id: 'Football', label: 'Football', icon: '⚽' },
    { id: 'Basketball', label: 'Basketball', icon: '🏀' },
    { id: 'Athletics', label: 'Athletics', icon: '🏃' },
  ], []);

  const filteredSportOptions = useMemo(() => {
    if (!sportSearchText.trim()) return sportOptions;
    const q = sportSearchText.toLowerCase();
    return sportOptions.filter(
      (opt) => opt.label.toLowerCase().includes(q) || opt.id.toLowerCase().includes(q)
    );
  }, [sportOptions, sportSearchText]);

  const getCategoryBadgeStyle = (category: NetworkCategory) => {
    switch (category) {
      case 'athlete':
        return 'bg-emerald-500/10 text-emerald-600 border-emerald-500/30';
      case 'scout':
        return 'bg-amber-500/10 text-amber-600 border-amber-500/30';
      case 'association':
        return 'bg-purple-500/10 text-purple-600 border-purple-500/30';
      case 'academy':
        return 'bg-blue-500/10 text-blue-600 border-blue-500/30';
      case 'club':
        return 'bg-rose-500/10 text-rose-600 border-rose-500/30';
      case 'organizer':
        return 'bg-teal-500/10 text-teal-600 border-teal-500/30';
      default:
        return 'bg-slate-500/10 text-slate-600 border-slate-500/30';
    }
  };

  const getCategoryIcon = (category: NetworkCategory) => {
    switch (category) {
      case 'athlete':
        return <Users className="w-3.5 h-3.5" />;
      case 'scout':
        return <UserCheck className="w-3.5 h-3.5" />;
      case 'association':
        return <Building2 className="w-3.5 h-3.5" />;
      case 'academy':
        return <GraduationCap className="w-3.5 h-3.5" />;
      case 'club':
        return <Shield className="w-3.5 h-3.5" />;
      case 'organizer':
        return <Trophy className="w-3.5 h-3.5" />;
      default:
        return <Sparkles className="w-3.5 h-3.5" />;
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      
      {/* Search Header Banner */}
      <div className="bg-[#0F172A] text-white rounded-3xl border border-[#1E293B] p-6 sm:p-8 space-y-6 shadow-xl relative z-10">
        <div className="absolute inset-0 rounded-3xl overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#FA4D14]/15 rounded-full blur-3xl"></div>
        </div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10 text-left">
          <div>
            <div className="flex items-center space-x-2 mb-1.5">
              <span className="text-overline text-[#FA4D14] px-2.5 py-0.5 rounded-full bg-[#FA4D14]/20 border border-[#FA4D14]/30 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Sportzicon Universal Search</span>
              </span>
            </div>
            <h1 className="text-h1 text-white">
              Universal Ecosystem Search Engine
            </h1>
            <p className="text-body text-slate-300 max-w-[65ch] mt-1">
              Search and discover verified Athletes, Certified Scouts, State Governing Bodies, Academies, Clubs, and Event Directors across the Sportzicon network.
            </p>
          </div>

          <div className="flex items-center space-x-2 text-xs bg-[#1E293B] px-4 py-3 rounded-2xl border border-[#334155] shrink-0">
            <span className="text-slate-400">Total Matched:</span>
            <span className="text-xl font-bold text-[#FA4D14] tabular-nums">{filteredEntities.length} Entities</span>
          </div>
        </div>

        {/* Search Control Bar */}
        <div className="space-y-4 pt-2 relative z-10">
          <div className="relative">
            <Search className="absolute left-4 top-3.5 w-5 h-5 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name, role (Scout, Fast Bowler, State Body), location, or academy..."
              className="w-full pl-12 pr-10 py-3.5 rounded-2xl bg-[#1E293B] border border-[#334155] text-white placeholder-slate-400 text-base focus:outline-none focus:border-[#FA4D14] focus:ring-1 focus:ring-[#FA4D14]"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-3.5 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Filter Controls Row (Category Select & Sport Select Searchable Comboboxes) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
            
            {/* User Type / Category Searchable Combobox */}
            <div className="space-y-1.5 relative">
              <label className="text-xs font-mono font-bold text-slate-300 flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-[#FA4D14]" />
                  <span>User Category:</span>
                </span>
                {selectedCategory !== 'all' && (
                  <button
                    onClick={() => {
                      setSelectedCategory('all');
                      setCategorySearchText('');
                    }}
                    className="text-[10px] text-[#FA4D14] hover:underline font-mono"
                  >
                    Clear filter
                  </button>
                )}
              </label>

              <div className="relative">
                <input
                  type="text"
                  value={
                    isCategoryOpen
                      ? categorySearchText
                      : categoryOptions.find((c) => c.id === selectedCategory)?.label || ''
                  }
                  onChange={(e) => {
                    setCategorySearchText(e.target.value);
                    if (!isCategoryOpen) setIsCategoryOpen(true);
                  }}
                  onFocus={() => {
                    setIsCategoryOpen(true);
                    setCategorySearchText('');
                  }}
                  placeholder="Type to search categories (e.g., Scout, Association)..."
                  className="w-full bg-[#1E293B] border border-[#334155] text-white text-xs font-bold rounded-2xl pl-3.5 pr-9 py-2.5 focus:outline-none focus:border-[#FA4D14] focus:ring-1 focus:ring-[#FA4D14] cursor-pointer"
                />
                <ChevronDown
                  className={`absolute right-3 top-3 w-4 h-4 text-slate-400 pointer-events-none transition-transform ${
                    isCategoryOpen ? 'rotate-180 text-[#FA4D14]' : ''
                  }`}
                />

                {/* Dropdown Menu Popup */}
                {isCategoryOpen && (
                  <>
                    {/* Backdrop overlay */}
                    <div
                      className="fixed inset-0 z-40"
                      onClick={() => {
                        setIsCategoryOpen(false);
                        setCategorySearchText('');
                      }}
                    />

                    <div className="absolute left-0 right-0 top-full mt-1.5 z-50 bg-[#1E293B] border border-[#334155] rounded-2xl shadow-2xl overflow-hidden max-h-60 overflow-y-auto no-scrollbar py-1 divide-y divide-[#334155]/40">
                      {filteredCategoryOptions.length === 0 ? (
                        <div className="px-4 py-3 text-xs text-slate-400 font-mono text-center">
                          No categories matching "{categorySearchText}"
                        </div>
                      ) : (
                        filteredCategoryOptions.map((opt) => {
                          const isSelected = selectedCategory === opt.id;
                          return (
                            <button
                              key={opt.id}
                              type="button"
                              onClick={() => {
                                setSelectedCategory(opt.id);
                                setIsCategoryOpen(false);
                                setCategorySearchText('');
                              }}
                              className={`w-full px-3.5 py-2.5 text-left text-xs font-bold flex items-center justify-between transition-colors cursor-pointer ${
                                isSelected
                                  ? 'bg-[#FA4D14] text-white'
                                  : 'text-slate-200 hover:bg-[#334155] hover:text-white'
                              }`}
                            >
                              <span className="flex items-center gap-2 truncate">
                                <span>{opt.icon}</span>
                                <span>{opt.label}</span>
                              </span>
                              <span
                                className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${
                                  isSelected
                                    ? 'bg-white/20 text-white'
                                    : 'bg-[#0F172A] text-slate-300'
                                }`}
                              >
                                {opt.count}
                              </span>
                            </button>
                          );
                        })
                      )}
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Sport Select Searchable Combobox */}
            <div className="space-y-1.5 relative">
              <label className="text-xs font-mono font-bold text-slate-300 flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <Filter className="w-3.5 h-3.5 text-[#FA4D14]" />
                  <span>Sport Discipline:</span>
                </span>
                {selectedSport !== 'all' && (
                  <button
                    onClick={() => {
                      setSelectedSport('all');
                      setSportSearchText('');
                    }}
                    className="text-[10px] text-[#FA4D14] hover:underline font-mono"
                  >
                    Clear filter
                  </button>
                )}
              </label>

              <div className="relative">
                <input
                  type="text"
                  value={
                    isSportOpen
                      ? sportSearchText
                      : sportOptions.find((s) => s.id === selectedSport)?.label || ''
                  }
                  onChange={(e) => {
                    setSportSearchText(e.target.value);
                    if (!isSportOpen) setIsSportOpen(true);
                  }}
                  onFocus={() => {
                    setIsSportOpen(true);
                    setSportSearchText('');
                  }}
                  placeholder="Type to search sports (e.g., Cricket, Football)..."
                  className="w-full bg-[#1E293B] border border-[#334155] text-white text-xs font-bold rounded-2xl pl-3.5 pr-9 py-2.5 focus:outline-none focus:border-[#FA4D14] focus:ring-1 focus:ring-[#FA4D14] cursor-pointer"
                />
                <ChevronDown
                  className={`absolute right-3 top-3 w-4 h-4 text-slate-400 pointer-events-none transition-transform ${
                    isSportOpen ? 'rotate-180 text-[#FA4D14]' : ''
                  }`}
                />

                {/* Dropdown Menu Popup */}
                {isSportOpen && (
                  <>
                    {/* Backdrop overlay */}
                    <div
                      className="fixed inset-0 z-40"
                      onClick={() => {
                        setIsSportOpen(false);
                        setSportSearchText('');
                      }}
                    />

                    <div className="absolute left-0 right-0 top-full mt-1.5 z-50 bg-[#1E293B] border border-[#334155] rounded-2xl shadow-2xl overflow-hidden max-h-60 overflow-y-auto no-scrollbar py-1 divide-y divide-[#334155]/40">
                      {filteredSportOptions.length === 0 ? (
                        <div className="px-4 py-3 text-xs text-slate-400 font-mono text-center">
                          No sports matching "{sportSearchText}"
                        </div>
                      ) : (
                        filteredSportOptions.map((opt) => {
                          const isSelected = selectedSport === opt.id;
                          return (
                            <button
                              key={opt.id}
                              type="button"
                              onClick={() => {
                                setSelectedSport(opt.id);
                                setIsSportOpen(false);
                                setSportSearchText('');
                              }}
                              className={`w-full px-3.5 py-2.5 text-left text-xs font-bold flex items-center justify-between transition-colors cursor-pointer ${
                                isSelected
                                  ? 'bg-[#FA4D14] text-white'
                                  : 'text-slate-200 hover:bg-[#334155] hover:text-white'
                              }`}
                            >
                              <span className="flex items-center gap-2 truncate">
                                <span>{opt.icon}</span>
                                <span>{opt.label}</span>
                              </span>
                              {isSelected && <Check className="w-4 h-4 text-white" />}
                            </button>
                          );
                        })
                      )}
                    </div>
                  </>
                )}
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Results Grid */}
      {filteredEntities.length === 0 ? (
        <div className="bg-white rounded-3xl border border-[#E2E8F0] p-12 text-center space-y-4">
          <Search className="w-12 h-12 text-[#94A3B8] mx-auto" />
          <h3 className="text-xl font-bold font-oswald text-[#0F172A] uppercase">No Users or Entities Found</h3>
          <p className="text-xs text-[#475569] max-w-md mx-auto">
            Try adjusting your search query, switching user categories, or resetting sport filters to explore verified entities in the Sportzicon network.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('all');
              setSelectedSport('all');
            }}
            className="px-5 py-2.5 rounded-xl bg-[#FA4D14] text-white font-bold text-xs cursor-pointer shadow-sm"
          >
            Reset Search Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEntities.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-3xl border border-[#E2E8F0] p-6 space-y-4 hover:border-[#FA4D14] hover:shadow-md transition-all relative flex flex-col justify-between group"
            >
              <div className="space-y-4">
                
                {/* Header Badge & Profile Info */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className={`text-[10px] font-mono font-extrabold px-2.5 py-0.5 rounded-full border flex items-center gap-1 uppercase ${getCategoryBadgeStyle(item.category)}`}>
                      {getCategoryIcon(item.category)}
                      <span>{item.categoryLabel}</span>
                    </span>
                  </div>

                  <div className="flex items-start space-x-3">
                    <img
                      src={item.avatar}
                      alt={item.name}
                      className="w-14 h-14 rounded-2xl object-cover border border-[#E2E8F0] group-hover:scale-105 transition-transform shrink-0"
                    />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center space-x-1.5">
                        <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-[#0F172A] text-white">
                          {item.sport}
                        </span>
                        {item.verified && (
                          <span className="text-[10px] font-mono font-bold text-[#FA4D14] flex items-center gap-0.5">
                            <ShieldCheck className="w-3.5 h-3.5 fill-[#FA4D14]/20" /> Verified
                          </span>
                        )}
                      </div>

                      <h3 className="text-h3 text-[#0F172A] group-hover:text-[#FA4D14] transition-colors mt-0.5 truncate">
                        {item.name}
                      </h3>
                      
                      <p className="text-small text-[#64748B] font-medium truncate">
                        {item.roleTitle}
                      </p>
                      
                      <div className="flex items-center space-x-1 text-xs text-[#64748B] mt-0.5">
                        <MapPin className="w-3.5 h-3.5 text-[#FA4D14]" />
                        <span className="truncate">{item.location}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Organization & Key Benchmark Data Box */}
                <div className="bg-[#FAF7F2] p-3.5 rounded-2xl border border-[#E2E8F0] space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-[#64748B]">Affiliation:</span>
                    <span className="text-[#0F172A] font-semibold truncate max-w-[170px]">{item.organization}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-[#64748B]">{item.primaryMetricLabel}:</span>
                    <span className="text-[#FA4D14] font-bold tabular-nums">{item.primaryMetricValue}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-[#64748B]">{item.secondaryMetricLabel}:</span>
                    <span className="text-[#0F172A] font-semibold tabular-nums">{item.secondaryMetricValue}</span>
                  </div>
                </div>

                {/* Bio Teaser */}
                <p className="text-small text-[#475569] line-clamp-2 leading-relaxed">
                  {item.bioOrDescription}
                </p>

                {/* Badges */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {item.badges.map((badge, idx) => (
                    <span key={idx} className="text-[11px] font-medium px-2 py-0.5 rounded-lg bg-[#F1F5F9] text-[#475569] border border-[#E2E8F0] tabular-nums">
                      {badge}
                    </span>
                  ))}
                </div>

              </div>

              {/* Card Footer Actions */}
              <div className="pt-4 border-t border-[#F1F5F9] flex items-center justify-between gap-2 text-xs">
                <button
                  type="button"
                  onClick={() => {
                    if (onStartChatWithUser) {
                      onStartChatWithUser(item.name);
                    } else if (setActiveTab) {
                      setActiveTab('messages');
                    }
                  }}
                  className="px-3.5 py-1.5 rounded-xl bg-[#FA4D14]/10 hover:bg-[#FA4D14] text-[#FA4D14] hover:text-white border border-[#FA4D14]/30 font-semibold tracking-[0.01em] transition-all cursor-pointer flex items-center gap-1.5"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Chat</span>
                </button>

                {item.athleteData ? (
                  <button
                    type="button"
                    onClick={() => onSelectAthlete(item.athleteData!)}
                    className="px-3.5 py-1.5 rounded-xl bg-[#0F172A] hover:bg-[#1E293B] text-white font-semibold tracking-[0.01em] transition-all cursor-pointer flex items-center gap-1.5"
                  >
                    <span>View Athlete</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#FA4D14]" />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => {
                      if (onStartChatWithUser) {
                        onStartChatWithUser(item.name);
                      } else if (setActiveTab) {
                        setActiveTab('messages');
                      }
                    }}
                    className="px-3.5 py-1.5 rounded-xl bg-[#0F172A] hover:bg-[#1E293B] text-white font-semibold tracking-[0.01em] transition-all cursor-pointer flex items-center gap-1.5"
                  >
                    <span>View Profile</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#FA4D14]" />
                  </button>
                )}
              </div>

            </div>
          ))}
        </div>
      )}

    </div>
  );
};

