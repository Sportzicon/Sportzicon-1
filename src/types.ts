export interface Athlete {
  id: string;
  name: string;
  avatar: string;
  sport: string;
  primaryRole: string; // e.g. "Right-Arm Fast Bowler", "Top-Order Aggressive Batsman", "All-Rounder", "Wicketkeeper Batsman"
  age: number;
  location: string;
  currentClubOrAcademy: string;
  verified: boolean;
  topBenchmark: string; // e.g. "38 Wickets • Avg 14.2" or "1,240 Runs • SR 142.8"
  topSpeedOrMetric?: string; // backwards compatibility alias for topBenchmark
  rating: number; // e.g. 4.9
  scoutEndorsements: number;
  videoCount: number;
  featured: boolean;
  performanceIndex: number; // e.g. 92 / 100 Match Form & Skill Index
  metrics: {
    battingOrBowlingAvg: number;
    accuracyOrControl: number;
    temperament: number;
    tacticalIQ: number;
    fitness: number;
    fielding: number;
    [key: string]: number;
  };
  stats: {
    label: string;
    value: string;
  }[];
  recentMatchScores?: {
    matchName: string;
    date: string;
    performance: string; // e.g. "4/22 (8.0 ov)" or "74* (42b)"
    result: string;
  }[];
  bio: string;
  scoutNotes?: string[];
}

export interface RecruitmentOpening {
  id: string;
  title: string;
  organization: string; // e.g. "Apex Cricket Academy" or "Mumbai Cricket Association"
  type: 'trial' | 'job' | 'tournament_entry'; // Player trials, Academy job opportunities, or Tournament entries
  sport: string;
  location: string;
  deadline: string;
  stipendOrGrant: string;
  vacancies: number;
  description: string;
  requirements: string[];
  appliedStatus?: 'not-applied' | 'applied' | 'shortlisted' | 'trial-scheduled';
  applicationMethod?: 'one-click' | 'manual-upload' | 'google-form' | 'both';
  externalFormUrl?: string; // e.g., "https://forms.google.com/..." or "https://drive.google.com/..."
  allowResumeUpload?: boolean;
  submittedResumeName?: string;
  submittedFormDetails?: {
    fullName: string;
    email: string;
    phone: string;
    role: string;
    experienceYears: string;
    googleDriveLink?: string;
    notes?: string;
    resumeFileName?: string;
  };
}

export interface TournamentItem {
  id: string;
  title: string;
  organizerName: string; // e.g. "Maharashtra Cricket Association"
  location: string;
  dates: string;
  category: string; // e.g. "State U-19 Championship", "Premier Club T20 Cup"
  participatingAcademies: number;
  maxAcademies: number;
  status: 'upcoming' | 'ongoing' | 'completed';
  entryFee: string;
  prizePool: string;
  registeredAcademies?: string[];
}

export interface LiveMatchBall {
  overNumber: number;
  ballInOver: number;
  runsScored: number;
  isWicket: boolean;
  isBoundary: boolean;
  bowlerName: string;
  batsmanName: string;
  speedKmH?: number;
  commentary: string;
  extraType?: 'none' | 'wide' | 'no-ball' | 'bye' | 'leg-bye' | 'penalty';
  extraRuns?: number;
  wicketType?: 'bowled' | 'caught' | 'lbw' | 'run-out' | 'stumped' | 'hit-wicket' | 'retired-hurt' | 'obstructing';
  fielderName?: string;
  dismissedBatsman?: string;
  pitchLength?: 'yorker' | 'full' | 'good' | 'back-of-length' | 'short';
  pitchLine?: 'outside-off' | 'channel' | 'middle' | 'leg' | 'down-leg';
  shotSector?: 'fine-leg' | 'square-leg' | 'mid-wicket' | 'long-on' | 'long-off' | 'extra-cover' | 'point' | 'third-man';
  shotType?: string;
  isFreeHit?: boolean;
  scorerName?: string;
  scorerRole?: string;
  timestamp?: string;
}

export interface AuditScore {
  category: string;
  score: number; // 0 - 100
  benchmark: string;
  status: 'critical' | 'needs-improvement' | 'good' | 'excellent';
  description: string;
}

export interface FrictionPoint {
  id: string;
  title: string;
  pageSection: string;
  severity: 'high' | 'medium' | 'low';
  impact: string;
  currentDesignIssue: string;
  recommendation: string;
  uxPrincipleViolated: string;
}

export interface PersonaAnalysis {
  id: string;
  role: string;
  avatar: string;
  tagline: string;
  primaryGoal: string;
  keyFriction: string;
  conversionDriver: string;
  journeySteps: {
    stepName: string;
    action: string;
    currentPainPoint: string;
    proposedFix: string;
    sentimentScore: number; // 1-5
  }[];
}

export interface DetailedSectionAudit {
  id: string;
  title: string;
  subtitle: string;
  iconName: string;
  overallHealthScore: number;
  currentShortcomings: string[];
  strategicWins: string[];
  proposedFeatures: {
    featureName: string;
    benefit: string;
    visualPattern: string;
  }[];
  wireframeComparison: {
    currentLayoutDescription: string;
    proposedLayoutDescription: string;
    keyChanges: string[];
  };
}

export interface RecommendationItem {
  id: string;
  title: string;
  category: 'onboarding' | 'scorecard' | 'opportunities' | 'live-scoring' | 'trust-safety';
  effort: 'low' | 'medium' | 'high';
  impact: 'low' | 'medium' | 'high';
  timeframe: 'Immediate (Quick Win)' | 'Medium-Term (1-3 mos)' | 'Long-Term Vision';
  description: string;
  expectedMetricImpact: string;
}

export type UserRoleMode = 'athlete' | 'academy' | 'scout' | 'organizer' | 'club' | 'scorer';
export type ViewTab = 
  | 'home' 
  | 'newsfeed' 
  | 'search' 
  | 'opportunities' 
  | 'ecosystem_hub' 
  | 'livescores' 
  | 'audit' 
  | 'sample_displays' 
  | 'login'
  | 'notifications'
  | 'messages'
  | 'profile'
  | 'about'
  | 'contact';

export interface ChatMessage {
  id: string;
  senderId: string;
  senderName: string;
  senderAvatar: string;
  text: string;
  timestamp: string;
  isMe: boolean;
  attachedPost?: {
    id: string;
    authorName: string;
    content: string;
  };
}

export interface ChatConversation {
  id: string;
  participantName: string;
  participantAvatar: string;
  participantRole: string;
  participantType: 'association' | 'athlete' | 'academy' | 'scout' | 'club' | 'organizer';
  isVerified: boolean;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  messages: ChatMessage[];
}
export type PrototypeMode = 'current' | 'redesigned';

export interface UserSession {
  id: string;
  name: string;
  email: string;
  role: UserRoleMode;
  avatar: string;
  organization?: string;
  sportziconId: string;
  verified: boolean;
  phone?: string;
  primaryRole?: string;
}
export type PrototypeScreen = 'hero' | 'scorecard' | 'opportunities' | 'livescores';

export interface FeedPost {
  id: string;
  authorName: string;
  authorAvatar: string;
  authorRole: string; // e.g., "State Cricket Association", "Right-Arm Fast Bowler", "Senior Regional Scout", "Club Manager"
  authorType: 'association' | 'athlete' | 'academy' | 'scout' | 'club' | 'organizer';
  isVerified: boolean;
  timeAgo: string;
  postType?: 'video' | 'article' | 'post' | 'scorelog' | 'opportunity';
  content: string;
  videoUrl?: string;
  videoThumbnail?: string;
  videoDuration?: string;
  videoSpeedMetric?: string; // e.g. "142.4 km/h seam delivery"
  articleTitle?: string;
  articleReadTime?: string;
  matchScorelog?: {
    matchName: string;
    performance: string;
    result: string;
  };
  opportunityLink?: {
    title: string;
    type: 'trial' | 'tournament' | 'camp' | 'job';
    actionText: string;
  };
  endorsementsCount: number;
  commentsCount: number;
  sharesCount: number;
  isEndorsed?: boolean;
}


