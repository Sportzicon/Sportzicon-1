import React, { useState } from 'react';
import { LiveMatchBall, UserSession, UserRoleMode } from '../types';
import { 
  Radio, 
  RotateCcw, 
  CheckCircle2, 
  Share2, 
  Download, 
  RefreshCw, 
  Users, 
  Award, 
  ShieldCheck, 
  Sliders, 
  X, 
  Plus, 
  Clock, 
  Flame, 
  Sparkles,
  ChevronRight,
  Info,
  Layers,
  FileText,
  MessageSquare,
  AlertCircle,
  Activity,
  Zap,
  ChevronDown,
  ChevronUp,
  Target
} from 'lucide-react';

interface LiveScoringEngineProps {
  initialBalls?: LiveMatchBall[];
  userSession?: UserSession | null;
  userRole?: UserRoleMode;
  onSelectAthlete?: (athleteId: string) => void;
  onClose?: () => void;
}

interface BatsmanStats {
  id: string;
  name: string;
  runs: number;
  balls: number;
  fours: number;
  sixes: number;
  isOut: boolean;
  dismissal?: string;
  onStrike?: boolean;
}

interface BowlerStats {
  id: string;
  name: string;
  overs: number;
  maidens: number;
  runsConceded: number;
  wickets: number;
  dots: number;
  wides: number;
  noBalls: number;
  isBowlingNow?: boolean;
  topSpeed: number;
}

interface FallOfWicket {
  wicketNum: number;
  runs: number;
  overs: number;
  batsmanName: string;
}

export const LiveScoringEngine: React.FC<LiveScoringEngineProps> = ({
  initialBalls = [],
  userSession,
  userRole = 'athlete',
}) => {
  // Cricbuzz Sub-Tabs
  const [activeTab, setActiveTab] = useState<'commentary' | 'scorer' | 'scorecard' | 'squads' | 'overs' | 'info'>('commentary');

  // Match State
  const matchTitle = "Apex Cricket Academy vs Delhi Colts CC, Final";
  const tournamentName = "National Youth Trophy 2026";
  const venue = "Wankhede Stadium, Mumbai";
  const tossInfo = "Apex Cricket Academy won the toss and elected to bowl";
  const team1Name = "Delhi Colts CC";
  const team1Score = "209/7 (20.0 Ov)";
  const team2Name = "Apex Cricket Academy";

  // Score state (Apex chasing 210)
  const [totalRuns, setTotalRuns] = useState<number>(182);
  const [wickets, setWickets] = useState<number>(4);
  const [completedOvers, setCompletedOvers] = useState<number>(14);
  const [ballsInCurrentOver, setBallsInCurrentOver] = useState<number>(5);
  const [targetRuns, setTargetRuns] = useState<number>(210);
  const [maxOvers, setMaxOvers] = useState<number>(20);
  const [isFreeHit, setIsFreeHit] = useState<boolean>(false);

  // Active Players
  const [strikerId, setStrikerId] = useState<string>('bat-1');
  const [nonStrikerId, setNonStrikerId] = useState<string>('bat-2');
  const [currentBowlerId, setCurrentBowlerId] = useState<string>('bowl-1');
  const [bowlerSpeed, setBowlerSpeed] = useState<number>(138.4);

  // Advanced delivery tags (optional detail for scorer)
  const [showAdvancedTags, setShowAdvancedTags] = useState<boolean>(false);
  const [pitchLength, setPitchLength] = useState<'yorker' | 'full' | 'good' | 'short'>('good');
  const [pitchLine, setPitchLine] = useState<'outside_off' | 'middle' | 'leg'>('outside_off');
  const [shotSector, setShotSector] = useState<'cover' | 'point' | 'straight' | 'mid_wicket' | 'fine_leg' | 'third_man'>('cover');

  // Batting Lineup
  const [battingLineup, setBattingLineup] = useState<BatsmanStats[]>([
    { id: 'bat-1', name: 'Aarav Sharma', runs: 74, balls: 42, fours: 8, sixes: 3, isOut: false, onStrike: true },
    { id: 'bat-2', name: 'Devansh Patel', runs: 18, balls: 12, fours: 2, sixes: 0, isOut: false, onStrike: false },
    { id: 'bat-3', name: 'Karan Mehra', runs: 34, balls: 21, fours: 4, sixes: 1, isOut: true, dismissal: 'c Rahul Dravid Jr. b Rohan Verma' },
    { id: 'bat-4', name: 'Pranav Nair', runs: 28, balls: 16, fours: 3, sixes: 1, isOut: true, dismissal: 'b Rohan Verma' },
    { id: 'bat-5', name: 'Samarth Rao', runs: 12, balls: 9, fours: 1, sixes: 0, isOut: true, dismissal: 'lbw b Sameer Khan' },
    { id: 'bat-6', name: 'Yash Vardhan', runs: 0, balls: 0, fours: 0, sixes: 0, isOut: false },
    { id: 'bat-7', name: 'Aditya Birla', runs: 0, balls: 0, fours: 0, sixes: 0, isOut: false },
    { id: 'bat-8', name: 'Kabir Singhania (WK)', runs: 0, balls: 0, fours: 0, sixes: 0, isOut: false },
    { id: 'bat-9', name: 'Varun Dhawan', runs: 0, balls: 0, fours: 0, sixes: 0, isOut: false },
    { id: 'bat-10', name: 'Ishaan Kishan Jr.', runs: 0, balls: 0, fours: 0, sixes: 0, isOut: false },
    { id: 'bat-11', name: 'Arjun Tendulkar Jr.', runs: 0, balls: 0, fours: 0, sixes: 0, isOut: false }
  ]);

  // Bowling Attack
  const [bowlingAttack, setBowlingAttack] = useState<BowlerStats[]>([
    { id: 'bowl-1', name: 'Rohan Verma', overs: 3.5, maidens: 1, runsConceded: 22, wickets: 3, dots: 14, wides: 1, noBalls: 0, isBowlingNow: true, topSpeed: 142.4 },
    { id: 'bowl-2', name: 'Sameer Khan', overs: 4.0, maidens: 0, runsConceded: 38, wickets: 1, dots: 9, wides: 2, noBalls: 1, isBowlingNow: false, topSpeed: 98.2 },
    { id: 'bowl-3', name: 'Vikram Malhotra', overs: 3.0, maidens: 0, runsConceded: 41, wickets: 0, dots: 5, wides: 3, noBalls: 0, isBowlingNow: false, topSpeed: 136.2 },
    { id: 'bowl-4', name: 'Rahul Dravid Jr.', overs: 4.0, maidens: 0, runsConceded: 46, wickets: 0, dots: 8, wides: 2, noBalls: 1, isBowlingNow: false, topSpeed: 131.5 }
  ]);

  // Fall of Wickets
  const [fallOfWickets, setFallOfWickets] = useState<FallOfWicket[]>([
    { wicketNum: 1, runs: 46, overs: 4.2, batsmanName: 'Samarth Rao' },
    { wicketNum: 2, runs: 94, overs: 8.5, batsmanName: 'Karan Mehra' },
    { wicketNum: 3, runs: 142, overs: 12.1, batsmanName: 'Pranav Nair' },
    { wicketNum: 4, runs: 168, overs: 13.4, batsmanName: 'Devansh Patel' }
  ]);

  // Extras breakdown
  const [extras, setExtras] = useState({ wides: 8, noBalls: 2, byes: 2, legByes: 4, penalty: 0 });

  // Scorecard View Selection
  const [scorecardInnings, setScorecardInnings] = useState<'innings2' | 'innings1'>('innings2');

  // Commentary List
  const [balls, setBalls] = useState<LiveMatchBall[]>(() => {
    if (initialBalls && initialBalls.length > 0) return initialBalls;
    return [
      {
        overNumber: 14.5,
        ballInOver: 5,
        runsScored: 1,
        isWicket: false,
        isBoundary: false,
        bowlerName: 'Rohan Verma',
        batsmanName: 'Aarav Sharma',
        speedKmH: 138.4,
        commentary: 'Verma to Aarav Sharma, 1 run, back of a length delivery outside off, steered away down to deep backward point to keep the strike rotating.',
        scorerName: userSession?.name || 'Scorer',
        scorerRole: userSession?.role || 'scorer'
      },
      {
        overNumber: 14.4,
        ballInOver: 4,
        runsScored: 4,
        isWicket: false,
        isBoundary: true,
        bowlerName: 'Rohan Verma',
        batsmanName: 'Aarav Sharma',
        speedKmH: 141.2,
        commentary: 'FOUR! Verma to Aarav Sharma, full and slightly wide outside off stump, Sharma leans in gracefully and punches it on the up through extra cover for a cracking boundary!',
        scorerName: userSession?.name || 'Scorer',
        scorerRole: userSession?.role || 'scorer'
      },
      {
        overNumber: 14.3,
        ballInOver: 3,
        runsScored: 0,
        isWicket: false,
        isBoundary: false,
        bowlerName: 'Rohan Verma',
        batsmanName: 'Aarav Sharma',
        speedKmH: 142.4,
        commentary: 'Verma to Aarav Sharma, no run, fast searing yorker targeting the base of middle stump, dug out safely back to the bowler.',
        scorerName: userSession?.name || 'Scorer',
        scorerRole: userSession?.role || 'scorer'
      },
      {
        overNumber: 14.2,
        ballInOver: 2,
        runsScored: 1,
        isWicket: false,
        isBoundary: false,
        bowlerName: 'Rohan Verma',
        batsmanName: 'Devansh Patel',
        speedKmH: 136.8,
        commentary: 'Verma to Devansh Patel, 1 run, good length ball angling into the pads, turned around the corner to fine leg for one.',
        scorerName: userSession?.name || 'Scorer',
        scorerRole: userSession?.role || 'scorer'
      },
      {
        overNumber: 14.1,
        ballInOver: 1,
        runsScored: 6,
        isWicket: false,
        isBoundary: true,
        bowlerName: 'Rohan Verma',
        batsmanName: 'Devansh Patel',
        speedKmH: 135.0,
        commentary: 'SIX! Verma to Devansh Patel, pitched right in the slot, Patel clears his front leg and hoicks it high and handsome over long-on for a huge 86-meter maximum!',
        scorerName: userSession?.name || 'Scorer',
        scorerRole: userSession?.role || 'scorer'
      }
    ];
  });

  // Modal States
  const [isWicketModalOpen, setIsWicketModalOpen] = useState<boolean>(false);
  const [wicketDismissalType, setWicketDismissalType] = useState<'bowled' | 'caught' | 'lbw' | 'run-out' | 'stumped' | 'hit-wicket' | 'retired'>('caught');
  const [wicketFielderName, setWicketFielderName] = useState<string>('Rahul Dravid Jr.');
  const [runOutBatsmanEnd, setRunOutBatsmanEnd] = useState<'striker' | 'non-striker'>('striker');
  const [runOutRunsCompleted, setRunOutRunsCompleted] = useState<number>(0);
  const [nextIncomingBatsmanId, setNextIncomingBatsmanId] = useState<string>('bat-6');
  
  const [isChangeBowlerModalOpen, setIsChangeBowlerModalOpen] = useState<boolean>(false);
  const [isCustomRunsModalOpen, setIsCustomRunsModalOpen] = useState<boolean>(false);
  const [customRunsValue, setCustomRunsValue] = useState<number>(5);
  const [customRunsExtraType, setCustomRunsExtraType] = useState<'none' | 'wide' | 'no-ball' | 'bye' | 'leg-bye' | 'penalty'>('none');
  
  const [customCommentary, setCustomCommentary] = useState<string>('');
  const [notification, setNotification] = useState<string | null>(null);

  // Current active players
  const striker = battingLineup.find(b => b.id === strikerId) || battingLineup[0];
  const nonStriker = battingLineup.find(b => b.id === nonStrikerId) || battingLineup[1];
  const currentBowler = bowlingAttack.find(b => b.id === currentBowlerId) || bowlingAttack[0];

  // Derived Match Calculations
  const currentOverDisplay = `${completedOvers}.${ballsInCurrentOver}`;
  const totalBallsBowled = completedOvers * 6 + ballsInCurrentOver;
  const currentRunRate = totalBallsBowled > 0 ? ((totalRuns / totalBallsBowled) * 6).toFixed(2) : '0.00';
  const remainingRuns = Math.max(0, targetRuns - totalRuns);
  const remainingBalls = Math.max(0, maxOvers * 6 - totalBallsBowled);
  const requiredRunRate = remainingBalls > 0 ? ((remainingRuns / remainingBalls) * 6).toFixed(2) : '0.00';
  const totalExtrasCount = extras.wides + extras.noBalls + extras.byes + extras.legByes + extras.penalty;

  const showToast = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3500);
  };

  // Strike Rotation
  const rotateStrike = () => {
    const nextStrikerId = nonStrikerId;
    const nextNonStrikerId = strikerId;
    setStrikerId(nextStrikerId);
    setNonStrikerId(nextNonStrikerId);
    setBattingLineup(prev => prev.map(b => {
      if (b.id === nextStrikerId) return { ...b, onStrike: true };
      if (b.id === nextNonStrikerId) return { ...b, onStrike: false };
      return b;
    }));
    showToast(`Strike rotated. ${nonStriker.name} is now on strike.`);
  };

  // Primary Ball Recording Engine
  const handleScoreBall = (
    runs: number, 
    isWkt: boolean = false, 
    extraType: 'none' | 'wide' | 'no-ball' | 'bye' | 'leg-bye' | 'penalty' = 'none',
    extraRunsVal: number = 0,
    dismissalOverride?: string,
    wktType?: string
  ) => {
    const isLegal = extraType !== 'wide' && extraType !== 'no-ball';
    const isNoBall = extraType === 'no-ball';
    const isWide = extraType === 'wide';
    const isPenalty = extraType === 'penalty';

    // Base added runs calculation
    let totalAddedRuns = runs + (isWide || isNoBall ? 1 : 0) + extraRunsVal;
    if (isPenalty) totalAddedRuns = 5;

    let nextBallsInOver = ballsInCurrentOver;
    let nextCompletedOvers = completedOvers;

    if (isLegal && !isPenalty) {
      if (ballsInCurrentOver >= 5) {
        nextBallsInOver = 0;
        nextCompletedOvers = completedOvers + 1;
      } else {
        nextBallsInOver = ballsInCurrentOver + 1;
      }
    }

    // Free Hit state calculation
    if (isNoBall) {
      setIsFreeHit(true);
    } else if (isLegal) {
      setIsFreeHit(false);
    }

    const recordedSpeed = +(134 + Math.random() * 8).toFixed(1);
    setBowlerSpeed(recordedSpeed);

    // Build Commentary Text
    let text = customCommentary.trim();
    if (!text) {
      if (isWkt) {
        const type = wktType || wicketDismissalType;
        if (type === 'bowled') {
          text = `OUT! CLEAN BOWLED! ${currentBowler.name} to ${striker.name}, bowled! Searing yorker sneaks under the blade and crashes into the middle stump!`;
        } else if (type === 'caught') {
          text = `OUT! CAUGHT! ${currentBowler.name} to ${striker.name}, OUT! Caught by ${wicketFielderName}! Skied in the air and safely taken.`;
        } else if (type === 'lbw') {
          text = `OUT! LBW! ${currentBowler.name} to ${striker.name}, OUT! Trapped right in front of middle stump! Umpire raises the finger!`;
        } else if (type === 'run-out') {
          text = `OUT! RUN OUT! Direct hit! Misjudged single and the batter is well short of the crease!`;
        } else if (type === 'stumped') {
          text = `OUT! STUMPED! Dragged out of the crease, keeper whips off the bails in a flash!`;
        } else {
          text = `OUT! ${currentBowler.name} to ${striker.name}, WICKET falls! (${type})`;
        }
      } else if (isWide) {
        text = extraRunsVal > 0 
          ? `WIDE + ${extraRunsVal} RUNS! ${currentBowler.name} sprays it down leg, slips past the keeper for extra runs.`
          : `WIDE! ${currentBowler.name} to ${striker.name}, wide ball called outside off/leg.`;
      } else if (isNoBall) {
        text = runs > 0
          ? `NO BALL + ${runs} RUNS! ${currentBowler.name} oversteps the crease. Free Hit on the next delivery!`
          : `NO BALL! ${currentBowler.name} to ${striker.name}, front foot no-ball. Free Hit next!`;
      } else if (extraType === 'bye') {
        text = `BYES! ${extraRunsVal || runs} Bye${(extraRunsVal || runs) > 1 ? 's' : ''} taken by ${striker.name} and ${nonStriker.name}.`;
      } else if (extraType === 'leg-bye') {
        text = `LEG BYES! ${extraRunsVal || runs} Leg Bye${(extraRunsVal || runs) > 1 ? 's' : ''} deflected off the pads.`;
      } else if (runs === 6) {
        text = `SIX! ${currentBowler.name} to ${striker.name}, MAXIMUM! Length ball hammered way back into the stands for a huge six!`;
      } else if (runs === 4) {
        text = `FOUR! ${currentBowler.name} to ${striker.name}, FOUR runs! Beautifully timed through the gap for a boundary!`;
      } else if (runs === 0) {
        text = `${currentBowler.name} to ${striker.name}, no run, defended solidly towards the covers.`;
      } else {
        text = `${currentBowler.name} to ${striker.name}, ${runs} run${runs > 1 ? 's' : ''}, pushed into the gap for a single/two.`;
      }
    }

    const newBall: LiveMatchBall = {
      overNumber: +(completedOvers + ((ballsInCurrentOver + (isLegal ? 1 : 0)) / 10)).toFixed(1),
      ballInOver: isLegal ? ballsInCurrentOver + 1 : ballsInCurrentOver,
      runsScored: runs,
      isWicket: isWkt,
      isBoundary: runs === 4 || runs === 6,
      bowlerName: currentBowler.name,
      batsmanName: striker.name,
      speedKmH: recordedSpeed,
      commentary: text,
      extraType,
      extraRuns: extraRunsVal,
      wicketType: isWkt ? (wktType || wicketDismissalType) : undefined,
      scorerName: userSession?.name || 'Scorer',
      scorerRole: userSession?.role || 'scorer'
    };

    // Update Totals
    setTotalRuns(prev => prev + totalAddedRuns);
    if (isWkt) {
      setWickets(prev => prev + 1);
      setFallOfWickets(prev => [
        ...prev,
        {
          wicketNum: wickets + 1,
          runs: totalRuns + totalAddedRuns,
          overs: +(nextCompletedOvers + (nextBallsInOver / 10)).toFixed(1),
          batsmanName: striker.name
        }
      ]);
    }
    setCompletedOvers(nextCompletedOvers);
    setBallsInCurrentOver(nextBallsInOver);
    setBalls([newBall, ...balls]);
    setCustomCommentary('');

    // Update Batting Stats
    setBattingLineup(prev => prev.map(b => {
      if (b.id === strikerId) {
        const runsCreditedToBatsman = (extraType === 'bye' || extraType === 'leg-bye' || isWide || isPenalty) ? 0 : runs;
        return {
          ...b,
          runs: b.runs + runsCreditedToBatsman,
          balls: (isLegal && !isPenalty) ? b.balls + 1 : b.balls,
          fours: runs === 4 ? b.fours + 1 : b.fours,
          sixes: runs === 6 ? b.sixes + 1 : b.sixes,
          isOut: isWkt ? true : b.isOut,
          dismissal: isWkt ? (dismissalOverride || `${wicketDismissalType === 'caught' ? `c ${wicketFielderName} ` : ''}b ${currentBowler.name}`) : b.dismissal
        };
      }
      return b;
    }));

    // Update Bowling Stats
    setBowlingAttack(prev => prev.map(bw => {
      if (bw.id === currentBowlerId) {
        const bowlingRunsConceded = (extraType === 'bye' || extraType === 'leg-bye' || isPenalty) ? 0 : totalAddedRuns;
        return {
          ...bw,
          runsConceded: bw.runsConceded + bowlingRunsConceded,
          wickets: isWkt && wktType !== 'run-out' ? bw.wickets + 1 : bw.wickets,
          dots: runs === 0 && extraType === 'none' ? bw.dots + 1 : bw.dots,
          wides: isWide ? bw.wides + 1 + extraRunsVal : bw.wides,
          noBalls: isNoBall ? bw.noBalls + 1 : bw.noBalls,
          overs: +(Math.floor((bw.overs * 6 + (isLegal ? 1 : 0)) / 6) + (((bw.overs * 6 + (isLegal ? 1 : 0)) % 6) / 10)).toFixed(1),
          topSpeed: Math.max(bw.topSpeed, recordedSpeed)
        };
      }
      return bw;
    }));

    // Update Extras
    if (isWide) setExtras(p => ({ ...p, wides: p.wides + 1 + extraRunsVal }));
    if (isNoBall) setExtras(p => ({ ...p, noBalls: p.noBalls + 1 + extraRunsVal }));
    if (extraType === 'bye') setExtras(p => ({ ...p, byes: p.byes + (extraRunsVal || runs) }));
    if (extraType === 'leg-bye') setExtras(p => ({ ...p, legByes: p.legByes + (extraRunsVal || runs) }));
    if (isPenalty) setExtras(p => ({ ...p, penalty: p.penalty + 5 }));

    // Strike Rotation for odd runs
    if ((runs % 2 !== 0 || extraRunsVal % 2 !== 0) && !isWkt) {
      rotateStrike();
    }

    // End of over check
    if (isLegal && nextBallsInOver === 0) {
      rotateStrike();
      showToast(`Over ${nextCompletedOvers} completed. Score: ${totalRuns + totalAddedRuns}/${isWkt ? wickets + 1 : wickets}`);
      setIsChangeBowlerModalOpen(true);
    }

    // Win check
    if (totalRuns + totalAddedRuns >= targetRuns) {
      showToast(`🏆 ${team2Name} WON BY ${10 - (isWkt ? wickets + 1 : wickets)} WICKETS!`);
    }
  };

  // Undo Last Ball
  const handleUndo = () => {
    if (balls.length === 0) return;
    const [last, ...rest] = balls;
    setBalls(rest);
    const added = last.runsScored + (last.extraType === 'wide' || last.extraType === 'no-ball' ? 1 : 0) + (last.extraRuns || 0);
    setTotalRuns(p => Math.max(0, p - added));
    if (last.isWicket) {
      setWickets(p => Math.max(0, p - 1));
      setFallOfWickets(p => p.slice(0, -1));
    }
    if (last.extraType !== 'wide' && last.extraType !== 'no-ball') {
      if (ballsInCurrentOver === 0) {
        setCompletedOvers(p => Math.max(0, p - 1));
        setBallsInCurrentOver(5);
      } else {
        setBallsInCurrentOver(p => Math.max(0, p - 1));
      }
    }
    showToast('Last delivery successfully undone.');
  };

  return (
    <div className="max-w-5xl mx-auto space-y-5 font-sans pb-16 text-left">
      
      {/* Screen Title & Overline - Single Clear H1 for Live Scoring Screen */}
      <div className="space-y-1">
        <div className="text-overline text-[#FA4D14]">Match Center & Scoring</div>
        <h1 className="text-h1 text-[#0F172A]">Live Tournament Scoring Engine</h1>
        <p className="text-body text-[#64748B] max-w-[65ch]">
          Real-time ball-by-ball scoring, interactive commentary, and automated profile stat verification.
        </p>
      </div>

      {/* =========================================================================
          1. CLEAN CRICBUZZ-STYLE MATCH HEADER (UNCLUTTERED & SPATIAL)
         ========================================================================= */}
      <div className="bg-[#0F172A] text-white rounded-2xl shadow-xl overflow-hidden border border-[#334155]">
        
        {/* Top Info Bar */}
        <div className="px-4 py-2.5 bg-[#1E293B] border-b border-[#334155] flex flex-wrap items-center justify-between text-xs gap-2">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="px-2 py-0.5 rounded-full bg-[#FA4D14] text-white text-[10px] font-black uppercase tracking-wider flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
              LIVE
            </span>
            <span className="font-bold text-white text-xs sm:text-sm">{matchTitle}</span>
            <span className="text-slate-400 hidden sm:inline">•</span>
            <span className="text-slate-300 hidden sm:inline text-xs">{tournamentName}</span>
          </div>
          <div className="text-slate-300 text-xs flex items-center gap-1.5">
            <span className="text-slate-400">{venue}</span>
          </div>
        </div>

        {/* Core Scoreboard Display */}
        <div className="p-4 sm:p-5 space-y-3">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center justify-between">
            
            {/* Team Scores Card */}
            <div className="space-y-1.5 w-full bg-[#111827]/70 p-3 rounded-xl border border-slate-800">
              {/* 1st Inning (Delhi Colts CC) */}
              <div className="flex items-center justify-between gap-3 text-xs sm:text-sm">
                <span className="font-medium text-slate-300 truncate whitespace-nowrap">{team1Name}</span>
                <span className="font-mono font-bold text-slate-300 shrink-0 text-right">{team1Score}</span>
              </div>

              {/* 2nd Inning Chasing (Apex Cricket Academy) */}
              <div className="flex items-center justify-between gap-3 text-xs sm:text-sm">
                <div className="flex items-center gap-1.5 min-w-0">
                  <span className="font-bold text-white truncate whitespace-nowrap">{team2Name}</span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#FA4D14]/20 text-[#FA4D14] font-bold border border-[#FA4D14]/40 shrink-0">
                    Batting
                  </span>
                  {isFreeHit && (
                    <span className="px-1.5 py-0.5 rounded bg-red-600 text-white font-black text-[9px] uppercase tracking-wider animate-bounce shrink-0">
                      ⚡ FREE HIT
                    </span>
                  )}
                </div>
                <div className="flex items-baseline gap-1 font-mono shrink-0 text-right">
                  <span className="font-black text-sm sm:text-base text-white">
                    {totalRuns}/{wickets}
                  </span>
                  <span className="text-[11px] sm:text-xs font-semibold text-slate-300">
                    ({currentOverDisplay}/{maxOvers} ov)
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Scorer Controls & Actions */}
            <div className="flex flex-wrap items-center justify-start md:justify-end gap-2 border-t md:border-t-0 pt-3 md:pt-0 border-slate-700/60">
              <button
                onClick={rotateStrike}
                className="px-3 py-1.5 rounded-xl bg-[#1E293B] hover:bg-[#334155] text-slate-200 text-xs font-bold border border-[#334155] transition-all cursor-pointer flex items-center gap-1.5"
                title="Rotate Strike"
              >
                <RefreshCw className="w-3.5 h-3.5 text-[#FA4D14]" />
                <span>Swap Strike</span>
              </button>

              <button
                onClick={handleUndo}
                disabled={balls.length === 0}
                className="px-3 py-1.5 rounded-xl bg-[#1E293B] hover:bg-[#334155] text-slate-200 text-xs font-bold border border-[#334155] transition-all cursor-pointer flex items-center gap-1.5 disabled:opacity-40"
                title="Undo last delivery"
              >
                <RotateCcw className="w-3.5 h-3.5 text-amber-400" />
                <span>Undo Ball</span>
              </button>

              <button
                onClick={() => setActiveTab(activeTab === 'scorer' ? 'commentary' : 'scorer')}
                className={`px-3 py-1.5 rounded-xl text-xs font-extrabold transition-all cursor-pointer flex items-center gap-1.5 ${
                  activeTab === 'scorer'
                    ? 'bg-[#FA4D14] text-white shadow-md'
                    : 'bg-[#FA4D14]/20 hover:bg-[#FA4D14]/30 text-[#FA4D14] border border-[#FA4D14]/50'
                }`}
              >
                <Award className="w-3.5 h-3.5" />
                <span>{activeTab === 'scorer' ? 'Viewing Scorer Console' : 'Open Scorer Pad'}</span>
              </button>
            </div>

          </div>

          {/* Match Status & Equation Banner */}
          <div className="bg-[#1E293B]/80 p-2.5 rounded-xl border border-slate-700 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
            <div className="font-extrabold text-amber-400 flex items-center gap-1.5">
              <span>🎯</span>
              <span>
                {totalRuns >= targetRuns 
                  ? `🏆 ${team2Name} won by ${10 - wickets} wickets!`
                  : `Need ${remainingRuns} runs in ${remainingBalls} balls`}
              </span>
              <span className="text-slate-400 font-normal">|</span>
              <span className="text-slate-300 font-medium">RRR: <strong className="text-white">{requiredRunRate}</strong></span>
              <span className="text-slate-400 font-normal">|</span>
              <span className="text-slate-300 font-medium">CRR: <strong className="text-white">{currentRunRate}</strong></span>
            </div>

            <div className="text-slate-400 text-[11px] flex items-center gap-1">
              <span>Toss: {tossInfo}</span>
            </div>
          </div>

        </div>

        {/* Clean Sub-Navigation Tabs */}
        <div className="flex items-center space-x-1 px-3 bg-[#111827] overflow-x-auto no-scrollbar text-xs font-bold border-t border-[#334155]">
          <button
            onClick={() => setActiveTab('commentary')}
            className={`px-4 py-3 border-b-2 transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'commentary'
                ? 'border-[#FA4D14] text-[#FA4D14] font-extrabold'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Commentary</span>
          </button>
          
          <button
            onClick={() => setActiveTab('scorer')}
            className={`px-4 py-3 border-b-2 transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'scorer'
                ? 'border-[#FA4D14] text-[#FA4D14] font-extrabold'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            <Award className="w-3.5 h-3.5 text-[#FA4D14]" />
            <span>Scorer Console</span>
          </button>

          <button
            onClick={() => setActiveTab('scorecard')}
            className={`px-4 py-3 border-b-2 transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'scorecard'
                ? 'border-[#FA4D14] text-[#FA4D14] font-extrabold'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Scorecard</span>
          </button>

          <button
            onClick={() => setActiveTab('squads')}
            className={`px-4 py-3 border-b-2 transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'squads'
                ? 'border-[#FA4D14] text-[#FA4D14] font-extrabold'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>Squads</span>
          </button>

          <button
            onClick={() => setActiveTab('overs')}
            className={`px-4 py-3 border-b-2 transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'overs'
                ? 'border-[#FA4D14] text-[#FA4D14] font-extrabold'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            <Activity className="w-3.5 h-3.5" />
            <span>Highlights / Overs</span>
          </button>

          <button
            onClick={() => setActiveTab('info')}
            className={`px-4 py-3 border-b-2 transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'info'
                ? 'border-[#FA4D14] text-[#FA4D14] font-extrabold'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            <Info className="w-3.5 h-3.5" />
            <span>Match Info</span>
          </button>
        </div>

      </div>

      {/* Toast Notification */}
      {notification && (
        <div className="bg-[#0F172A] border-2 border-[#FA4D14] text-white px-4 py-2.5 rounded-xl shadow-lg flex items-center justify-between text-xs font-bold animate-fadeIn">
          <div className="flex items-center space-x-2">
            <CheckCircle2 className="w-4 h-4 text-[#FA4D14]" />
            <span>{notification}</span>
          </div>
          <button onClick={() => setNotification(null)} className="text-slate-400 hover:text-white cursor-pointer">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* =========================================================================
          2. TAB CONTENT: COMMENTARY (WITH COMPACT 1-TAP SCORING BAR)
         ========================================================================= */}
      {activeTab === 'commentary' && (
        <div className="space-y-4">
          
          {/* Cricbuzz Live Mini-Scorecard Table */}
          <div className="bg-white rounded-xl border border-[#CBD5E1] shadow-xs overflow-hidden text-xs">
            
            <div className="overflow-x-auto no-scrollbar">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#F1F5F9] text-[#475569] font-bold text-[11px] uppercase border-b border-[#CBD5E1]">
                    <th className="py-2.5 px-3">Batter</th>
                    <th className="py-2.5 px-2 text-right">R</th>
                    <th className="py-2.5 px-2 text-right">B</th>
                    <th className="py-2.5 px-2 text-right">4s</th>
                    <th className="py-2.5 px-2 text-right">6s</th>
                    <th className="py-2.5 px-3 text-right">SR</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E2E8F0] font-medium text-[#0F172A]">
                  <tr className="hover:bg-slate-50">
                    <td className="py-2.5 px-3 font-bold flex items-center gap-1.5 text-[#FA4D14]">
                      <span>{striker.name}</span>
                      <span className="text-[#FA4D14] font-black">*</span>
                    </td>
                    <td className="py-2.5 px-2 text-right font-bold">{striker.runs}</td>
                    <td className="py-2.5 px-2 text-right text-slate-600">{striker.balls}</td>
                    <td className="py-2.5 px-2 text-right text-slate-600">{striker.fours}</td>
                    <td className="py-2.5 px-2 text-right text-slate-600">{striker.sixes}</td>
                    <td className="py-2.5 px-3 text-right text-slate-600">
                      {striker.balls > 0 ? ((striker.runs / striker.balls) * 100).toFixed(1) : '0.0'}
                    </td>
                  </tr>
                  <tr className="hover:bg-slate-50">
                    <td className="py-2.5 px-3 font-semibold text-slate-800">
                      {nonStriker.name}
                    </td>
                    <td className="py-2.5 px-2 text-right font-bold">{nonStriker.runs}</td>
                    <td className="py-2.5 px-2 text-right text-slate-600">{nonStriker.balls}</td>
                    <td className="py-2.5 px-2 text-right text-slate-600">{nonStriker.fours}</td>
                    <td className="py-2.5 px-2 text-right text-slate-600">{nonStriker.sixes}</td>
                    <td className="py-2.5 px-3 text-right text-slate-600">
                      {nonStriker.balls > 0 ? ((nonStriker.runs / nonStriker.balls) * 100).toFixed(1) : '0.0'}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="overflow-x-auto no-scrollbar border-t border-[#CBD5E1]">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#F1F5F9] text-[#475569] font-bold text-[11px] uppercase border-b border-[#CBD5E1]">
                    <th className="py-2.5 px-3">Bowler</th>
                    <th className="py-2.5 px-2 text-right">O</th>
                    <th className="py-2.5 px-2 text-right">M</th>
                    <th className="py-2.5 px-2 text-right">R</th>
                    <th className="py-2.5 px-2 text-right">W</th>
                    <th className="py-2.5 px-3 text-right">ECO</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E2E8F0] font-medium text-[#0F172A]">
                  <tr className="hover:bg-slate-50">
                    <td className="py-2.5 px-3 font-bold text-[#0F172A] flex items-center gap-1.5">
                      <span>{currentBowler.name}</span>
                      <span className="text-[10px] font-mono text-[#FA4D14] bg-orange-50 px-1 rounded border border-orange-200">
                        {bowlerSpeed} km/h
                      </span>
                    </td>
                    <td className="py-2.5 px-2 text-right font-bold">{currentBowler.overs}</td>
                    <td className="py-2.5 px-2 text-right text-slate-600">{currentBowler.maidens}</td>
                    <td className="py-2.5 px-2 text-right text-slate-600">{currentBowler.runsConceded}</td>
                    <td className="py-2.5 px-2 text-right font-bold text-red-600">{currentBowler.wickets}</td>
                    <td className="py-2.5 px-3 text-right text-slate-600">
                      {currentBowler.overs > 0 ? ((currentBowler.runsConceded / currentBowler.overs)).toFixed(2) : '0.00'}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Quick Summary Info Row */}
            <div className="px-3 py-2 bg-[#FAF7F2] border-t border-[#CBD5E1] flex flex-wrap items-center justify-between gap-2 text-[11px] text-[#475569]">
              <div>
                <span className="font-bold text-[#0F172A]">Recent: </span>
                <span className="font-mono font-bold text-[#FA4D14]">
                  {balls.slice(0, 6).reverse().map(b => b.isWicket ? 'W ' : b.extraType === 'wide' ? 'wd ' : b.extraType === 'no-ball' ? 'nb ' : `${b.runsScored} `)}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span>Partnership: <strong className="text-[#0F172A]">38 (24)</strong></span>
                <span>•</span>
                <span>Last Wicket: <strong className="text-[#0F172A]">Devansh Patel 18(12)</strong></span>
              </div>
            </div>

          </div>

          {/* Quick 1-Tap Scoring Bar (Lightweight & Uncluttered) */}
          <div className="bg-white p-3 sm:p-4 rounded-xl border border-[#CBD5E1] shadow-xs flex flex-col md:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-2 shrink-0">
              <span className="w-2 h-2 rounded-full bg-[#FA4D14]" />
              <span className="text-xs font-bold uppercase text-[#0F172A]">Quick Score (Ball {currentOverDisplay})</span>
            </div>

            <div className="flex items-center gap-1.5 flex-wrap justify-center">
              <button
                onClick={() => handleScoreBall(0)}
                className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 font-black text-xs border border-slate-300 cursor-pointer flex items-center justify-center transition-all"
                title="Dot Ball"
              >
                0
              </button>
              <button
                onClick={() => handleScoreBall(1)}
                className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 font-black text-xs border border-slate-300 cursor-pointer flex items-center justify-center transition-all"
                title="Single"
              >
                1
              </button>
              <button
                onClick={() => handleScoreBall(2)}
                className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 font-black text-xs border border-slate-300 cursor-pointer flex items-center justify-center transition-all"
                title="Two Runs"
              >
                2
              </button>
              <button
                onClick={() => handleScoreBall(3)}
                className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 font-black text-xs border border-slate-300 cursor-pointer flex items-center justify-center transition-all"
                title="Three Runs"
              >
                3
              </button>
              <button
                onClick={() => handleScoreBall(4)}
                className="w-8 h-8 rounded-lg bg-[#FA4D14] hover:bg-[#D83000] text-white font-black text-xs cursor-pointer flex items-center justify-center shadow-xs transition-all"
                title="Boundary Four"
              >
                4
              </button>
              <button
                onClick={() => handleScoreBall(6)}
                className="w-8 h-8 rounded-lg bg-purple-700 hover:bg-purple-800 text-white font-black text-xs cursor-pointer flex items-center justify-center shadow-xs transition-all"
                title="Maximum Six"
              >
                6
              </button>
              <button
                onClick={() => setIsWicketModalOpen(true)}
                className="px-2.5 h-8 rounded-lg bg-red-600 hover:bg-red-700 text-white font-extrabold text-xs cursor-pointer flex items-center justify-center shadow-xs transition-all"
                title="Wicket Dismissal"
              >
                OUT
              </button>
              <button
                onClick={() => handleScoreBall(0, false, 'wide')}
                className="px-2 h-8 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-900 font-bold text-xs border border-amber-300 cursor-pointer flex items-center justify-center transition-all"
                title="Wide (+1)"
              >
                Wd
              </button>
              <button
                onClick={() => handleScoreBall(0, false, 'no-ball')}
                className="px-2 h-8 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-900 font-bold text-xs border border-amber-300 cursor-pointer flex items-center justify-center transition-all"
                title="No Ball (+1)"
              >
                Nb
              </button>
              <button
                onClick={() => setActiveTab('scorer')}
                className="px-2.5 h-8 rounded-lg bg-slate-800 hover:bg-slate-900 text-white font-bold text-xs cursor-pointer flex items-center gap-1 transition-all"
                title="Open Complete Scoring Console"
              >
                <span>Full Pad</span>
                <ChevronRight className="w-3 h-3" />
              </button>
            </div>
          </div>

          {/* Cricbuzz Ball-by-Ball Feed */}
          <div className="bg-white rounded-xl border border-[#CBD5E1] shadow-xs overflow-hidden divide-y divide-[#E2E8F0]">
            
            <div className="bg-[#F8FAFC] px-4 py-2.5 border-b border-[#CBD5E1] flex items-center justify-between">
              <span className="text-xs font-bold uppercase text-[#475569] tracking-wider">
                Live Ball by Ball Commentary
              </span>
              <span className="text-[11px] text-[#64748B] flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                Live Feed
              </span>
            </div>

            {balls.map((b, idx) => {
              return (
                <div key={idx} className="p-3 sm:p-4 hover:bg-slate-50 transition-colors">
                  <div className="flex items-start space-x-3">
                    {/* Over Number Badge */}
                    <div className="shrink-0">
                      <span className="font-mono font-black text-xs text-[#0F172A] bg-slate-100 px-2 py-1 rounded border border-slate-200">
                        {b.overNumber}
                      </span>
                    </div>

                    {/* Commentary Body */}
                    <div className="flex-1 space-y-1">
                      <div className="text-xs text-[#0F172A] leading-relaxed">
                        {b.commentary.startsWith('FOUR') ? (
                          <>
                            <span className="font-black text-[#FA4D14] mr-1.5 px-1.5 py-0.5 bg-orange-50 rounded border border-orange-200">
                              FOUR
                            </span>
                            <span>{b.commentary.replace('FOUR! ', '')}</span>
                          </>
                        ) : b.commentary.startsWith('SIX') ? (
                          <>
                            <span className="font-black text-purple-700 mr-1.5 px-1.5 py-0.5 bg-purple-50 rounded border border-purple-200">
                              SIX
                            </span>
                            <span>{b.commentary.replace('SIX! ', '')}</span>
                          </>
                        ) : b.commentary.startsWith('OUT') ? (
                          <>
                            <span className="font-black text-red-600 mr-1.5 px-1.5 py-0.5 bg-red-50 rounded border border-red-200">
                              WICKET
                            </span>
                            <span className="font-semibold text-red-950">{b.commentary}</span>
                          </>
                        ) : (
                          <span>{b.commentary}</span>
                        )}
                      </div>

                      <div className="flex items-center space-x-2 text-[10px] text-slate-400">
                        {b.speedKmH && <span>Speed: {b.speedKmH} km/h</span>}
                        <span>•</span>
                        <span>Logged by {b.scorerName || 'Scorer'} ({b.scorerRole || 'official'})</span>
                      </div>
                    </div>
                  </div>

                  {/* Over Summary Separator if Over Completed */}
                  {b.ballInOver === 6 && (
                    <div className="mt-3 pt-2 border-t border-dashed border-[#CBD5E1] bg-slate-50/70 p-2 rounded text-[11px] text-slate-700 flex items-center justify-between">
                      <span className="font-bold text-[#FA4D14]">
                        End of Over {Math.floor(b.overNumber)}
                      </span>
                      <span className="font-medium text-slate-600">
                        Score: {team2Name} {totalRuns}/{wickets}
                      </span>
                    </div>
                  )}
                </div>
              );
            })}

          </div>

        </div>
      )}

      {/* =========================================================================
          3. TAB CONTENT: FULL SCORER CONSOLE (DEDICATED & EASY TO UNDERSTAND)
         ========================================================================= */}
      {activeTab === 'scorer' && (
        <div className="space-y-4">
          
          <div className="bg-white p-4 sm:p-5 rounded-2xl border border-[#CBD5E1] shadow-sm space-y-4">
            
            {/* Console Header */}
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#E2E8F0] pb-3">
              <div className="flex items-center space-x-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#FA4D14]" />
                <span className="text-xs font-extrabold uppercase text-[#0F172A] tracking-wider">
                  Live Delivery Pad • Over {currentOverDisplay}
                </span>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setShowAdvancedTags(!showAdvancedTags)}
                  className="text-[11px] font-bold text-[#FA4D14] hover:underline flex items-center gap-1 cursor-pointer bg-orange-50 px-2.5 py-1 rounded-lg border border-orange-200"
                >
                  <Sliders className="w-3 h-3" />
                  <span>{showAdvancedTags ? 'Hide Pitch Tags' : 'Pitch & Line Tags'}</span>
                </button>

                <button
                  onClick={() => setIsCustomRunsModalOpen(true)}
                  className="text-[11px] font-bold text-slate-700 hover:underline flex items-center gap-1 cursor-pointer bg-slate-100 px-2.5 py-1 rounded-lg border border-[#CBD5E1]"
                >
                  <Plus className="w-3 h-3" />
                  <span>Custom / Penalty Runs</span>
                </button>
              </div>
            </div>

            {/* Active Batsmen & Bowler Status Bar */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              
              {/* Striker */}
              <div className="bg-[#FAF7F2] p-3 rounded-xl border-2 border-[#FA4D14] flex items-center justify-between">
                <div>
                  <div className="text-[10px] font-extrabold text-[#FA4D14] uppercase">Striker (*)</div>
                  <div className="font-extrabold text-xs text-[#0F172A]">{striker.name} *</div>
                  <div className="text-[11px] text-slate-600 font-medium">{striker.runs} ({striker.balls}) • {striker.fours}x4, {striker.sixes}x6</div>
                </div>
                <button
                  onClick={rotateStrike}
                  className="p-1.5 bg-white rounded-lg border border-[#CBD5E1] text-[#FA4D14] hover:bg-orange-50 cursor-pointer"
                  title="Rotate Strike"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Non-Striker */}
              <div className="bg-[#FAF7F2] p-3 rounded-xl border border-[#CBD5E1] flex items-center justify-between">
                <div>
                  <div className="text-[10px] font-bold text-slate-500 uppercase">Non-Striker</div>
                  <div className="font-bold text-xs text-[#0F172A]">{nonStriker.name}</div>
                  <div className="text-[11px] text-slate-600 font-medium">{nonStriker.runs} ({nonStriker.balls})</div>
                </div>
                <button
                  onClick={rotateStrike}
                  className="text-[10px] font-bold text-slate-600 hover:text-[#FA4D14] cursor-pointer"
                >
                  Make Striker
                </button>
              </div>

              {/* Bowler */}
              <div className="bg-[#FAF7F2] p-3 rounded-xl border border-[#CBD5E1] flex items-center justify-between">
                <div>
                  <div className="text-[10px] font-bold text-slate-500 uppercase">Bowler ({bowlerSpeed} km/h)</div>
                  <div className="font-bold text-xs text-[#0F172A]">{currentBowler.name}</div>
                  <div className="text-[11px] text-slate-600 font-medium">{currentBowler.overs} ov • {currentBowler.runsConceded}R • {currentBowler.wickets}W</div>
                </div>
                <button
                  onClick={() => setIsChangeBowlerModalOpen(true)}
                  className="text-[10px] font-bold text-[#FA4D14] hover:underline cursor-pointer"
                >
                  Change
                </button>
              </div>

            </div>

            {/* 1. PRIMARY RUN BUTTONS */}
            <div>
              <div className="text-[11px] font-bold text-slate-500 uppercase mb-1.5">Standard Batting Runs</div>
              <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
                <button
                  onClick={() => handleScoreBall(0)}
                  className="py-3 bg-[#FAF7F2] hover:bg-slate-200 text-[#0F172A] rounded-xl text-base font-black border border-[#CBD5E1] transition-all cursor-pointer flex flex-col items-center justify-center shadow-xs"
                >
                  <span>0</span>
                  <span className="text-[9px] font-bold text-slate-500 uppercase">Dot</span>
                </button>

                <button
                  onClick={() => handleScoreBall(1)}
                  className="py-3 bg-[#FAF7F2] hover:bg-slate-200 text-[#0F172A] rounded-xl text-base font-black border border-[#CBD5E1] transition-all cursor-pointer flex flex-col items-center justify-center shadow-xs"
                >
                  <span>1</span>
                  <span className="text-[9px] font-bold text-slate-500 uppercase">Single</span>
                </button>

                <button
                  onClick={() => handleScoreBall(2)}
                  className="py-3 bg-[#FAF7F2] hover:bg-slate-200 text-[#0F172A] rounded-xl text-base font-black border border-[#CBD5E1] transition-all cursor-pointer flex flex-col items-center justify-center shadow-xs"
                >
                  <span>2</span>
                  <span className="text-[9px] font-bold text-slate-500 uppercase">Two</span>
                </button>

                <button
                  onClick={() => handleScoreBall(3)}
                  className="py-3 bg-[#FAF7F2] hover:bg-slate-200 text-[#0F172A] rounded-xl text-base font-black border border-[#CBD5E1] transition-all cursor-pointer flex flex-col items-center justify-center shadow-xs"
                >
                  <span>3</span>
                  <span className="text-[9px] font-bold text-slate-500 uppercase">Three</span>
                </button>

                <button
                  onClick={() => handleScoreBall(4)}
                  className="py-3 bg-[#FA4D14] hover:bg-[#D83000] text-white rounded-xl text-base font-black transition-all cursor-pointer flex flex-col items-center justify-center shadow-md"
                >
                  <span>4</span>
                  <span className="text-[9px] font-extrabold text-white/90 uppercase">FOUR</span>
                </button>

                <button
                  onClick={() => handleScoreBall(5)}
                  className="py-3 bg-amber-500 hover:bg-amber-600 text-white rounded-xl text-base font-black transition-all cursor-pointer flex flex-col items-center justify-center shadow-xs"
                >
                  <span>5</span>
                  <span className="text-[9px] font-bold text-white/90 uppercase">Overthrow</span>
                </button>

                <button
                  onClick={() => handleScoreBall(6)}
                  className="py-3 bg-purple-700 hover:bg-purple-800 text-white rounded-xl text-base font-black transition-all cursor-pointer flex flex-col items-center justify-center shadow-md"
                >
                  <span>6</span>
                  <span className="text-[9px] font-extrabold text-purple-200 uppercase">SIX</span>
                </button>

                <button
                  onClick={() => setIsWicketModalOpen(true)}
                  className="py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl text-base font-black transition-all cursor-pointer flex flex-col items-center justify-center shadow-md"
                >
                  <span>OUT</span>
                  <span className="text-[9px] font-extrabold text-red-200 uppercase">Wicket</span>
                </button>
              </div>
            </div>

            {/* 2. EXTRAS ROW */}
            <div>
              <div className="text-[11px] font-bold text-slate-500 uppercase mb-1.5">Extras & Irregular Deliveries</div>
              <div className="grid grid-cols-2 sm:grid-cols-6 gap-2">
                <button
                  onClick={() => handleScoreBall(0, false, 'wide')}
                  className="py-2.5 px-3 bg-[#FAF7F2] hover:bg-amber-100 text-[#0F172A] rounded-xl text-xs font-bold border border-[#CBD5E1] transition-all cursor-pointer flex items-center justify-center gap-1"
                >
                  <span>Wide (wd +1)</span>
                </button>

                <button
                  onClick={() => handleScoreBall(0, false, 'wide', 4)}
                  className="py-2.5 px-3 bg-[#FAF7F2] hover:bg-amber-100 text-[#0F172A] rounded-xl text-xs font-bold border border-[#CBD5E1] transition-all cursor-pointer flex items-center justify-center gap-1"
                  title="Wide + Boundary Four (5 runs)"
                >
                  <span>Wide + 4 (5wd)</span>
                </button>

                <button
                  onClick={() => handleScoreBall(0, false, 'no-ball')}
                  className="py-2.5 px-3 bg-[#FAF7F2] hover:bg-amber-100 text-[#0F172A] rounded-xl text-xs font-bold border border-[#CBD5E1] transition-all cursor-pointer flex items-center justify-center gap-1"
                >
                  <span>No Ball (nb +1)</span>
                </button>

                <button
                  onClick={() => handleScoreBall(4, false, 'no-ball')}
                  className="py-2.5 px-3 bg-[#FAF7F2] hover:bg-amber-100 text-[#0F172A] rounded-xl text-xs font-bold border border-[#CBD5E1] transition-all cursor-pointer flex items-center justify-center gap-1"
                  title="No Ball + Bat Four (5 runs)"
                >
                  <span>Nb + 4 Runs</span>
                </button>

                <button
                  onClick={() => handleScoreBall(0, false, 'bye', 1)}
                  className="py-2.5 px-3 bg-[#FAF7F2] hover:bg-slate-200 text-[#0F172A] rounded-xl text-xs font-bold border border-[#CBD5E1] transition-all cursor-pointer flex items-center justify-center gap-1"
                >
                  <span>1 Bye (1b)</span>
                </button>

                <button
                  onClick={() => handleScoreBall(0, false, 'leg-bye', 1)}
                  className="py-2.5 px-3 bg-[#FAF7F2] hover:bg-slate-200 text-[#0F172A] rounded-xl text-xs font-bold border border-[#CBD5E1] transition-all cursor-pointer flex items-center justify-center gap-1"
                >
                  <span>1 Leg Bye (1lb)</span>
                </button>
              </div>
            </div>

            {/* 3. OPTIONAL ADVANCED PITCH LENGTH & SHOT SECTOR EXPANDER */}
            {showAdvancedTags && (
              <div className="p-3 bg-[#FAF7F2] rounded-xl border border-[#CBD5E1] space-y-3 animate-fadeIn">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Pitch Length</label>
                    <div className="grid grid-cols-4 gap-1">
                      {(['yorker', 'full', 'good', 'short'] as const).map(l => (
                        <button
                          key={l}
                          onClick={() => setPitchLength(l)}
                          className={`py-1 rounded text-[10px] font-bold uppercase transition-all cursor-pointer ${
                            pitchLength === l ? 'bg-[#FA4D14] text-white' : 'bg-white text-slate-700 border border-[#CBD5E1]'
                          }`}
                        >
                          {l}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Pitch Line</label>
                    <div className="grid grid-cols-3 gap-1">
                      {(['outside_off', 'middle', 'leg'] as const).map(ln => (
                        <button
                          key={ln}
                          onClick={() => setPitchLine(ln)}
                          className={`py-1 rounded text-[10px] font-bold uppercase transition-all cursor-pointer ${
                            pitchLine === ln ? 'bg-[#FA4D14] text-white' : 'bg-white text-slate-700 border border-[#CBD5E1]'
                          }`}
                        >
                          {ln.replace('_', ' ')}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Shot Sector</label>
                    <select
                      value={shotSector}
                      onChange={(e) => setShotSector(e.target.value as any)}
                      className="w-full bg-white border border-[#CBD5E1] rounded-lg px-2 py-1 text-xs font-bold text-[#0F172A]"
                    >
                      <option value="cover">Extra Cover / Off</option>
                      <option value="point">Point / Backward Point</option>
                      <option value="straight">Straight Down Ground</option>
                      <option value="mid_wicket">Mid-Wicket / Cow Corner</option>
                      <option value="fine_leg">Fine Leg / Square Leg</option>
                      <option value="third_man">Third Man / Deep Gully</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

          </div>

        </div>
      )}

      {/* =========================================================================
          4. TAB CONTENT: FULL SCORECARD (CLASSIC ICC FORMAT IN BRAND PALETTE)
         ========================================================================= */}
      {activeTab === 'scorecard' && (
        <div className="space-y-4">
          
          {/* Innings Selector Tabs */}
          <div className="flex items-center space-x-2 border-b border-[#CBD5E1] pb-2">
            <button
              onClick={() => setScorecardInnings('innings2')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                scorecardInnings === 'innings2'
                  ? 'bg-[#FA4D14] text-white shadow-xs'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-[#CBD5E1]'
              }`}
            >
              {team2Name} Innings ({totalRuns}/{wickets})
            </button>
            <button
              onClick={() => setScorecardInnings('innings1')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                scorecardInnings === 'innings1'
                  ? 'bg-[#FA4D14] text-white shadow-xs'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-[#CBD5E1]'
              }`}
            >
              {team1Name} Innings (209/7)
            </button>
          </div>

          {scorecardInnings === 'innings2' ? (
            <div className="bg-white rounded-xl border border-[#CBD5E1] shadow-xs overflow-hidden text-xs">
              
              <div className="bg-[#F8FAFC] px-4 py-2.5 border-b border-[#CBD5E1] font-bold text-[#0F172A] flex items-center justify-between text-xs sm:text-sm">
                <span className="truncate whitespace-nowrap">{team2Name} Batting</span>
                <span className="font-mono text-[#FA4D14] font-bold shrink-0 text-right">{totalRuns}/{wickets} ({currentOverDisplay} Ov)</span>
              </div>

              {/* Batting Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-[#F1F5F9] text-[#475569] font-bold text-[11px] uppercase border-b border-[#CBD5E1]">
                      <th className="py-2.5 px-4">Batter</th>
                      <th className="py-2.5 px-2">Dismissal</th>
                      <th className="py-2.5 px-2 text-right">R</th>
                      <th className="py-2.5 px-2 text-right">B</th>
                      <th className="py-2.5 px-2 text-right">4s</th>
                      <th className="py-2.5 px-2 text-right">6s</th>
                      <th className="py-2.5 px-4 text-right">SR</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E2E8F0]">
                    {battingLineup.map((b) => (
                      <tr key={b.id} className="hover:bg-slate-50">
                        <td className="py-2.5 px-4 font-bold text-[#0F172A]">
                          {b.name} {!b.isOut && (b.id === strikerId || b.id === nonStrikerId) ? '*' : ''}
                        </td>
                        <td className="py-2.5 px-2 text-slate-600 text-[11px]">
                          {b.isOut ? (b.dismissal || 'c & b') : (b.id === strikerId || b.id === nonStrikerId ? 'batting' : 'yet to bat')}
                        </td>
                        <td className="py-2.5 px-2 text-right font-bold text-[#0F172A]">{b.runs}</td>
                        <td className="py-2.5 px-2 text-right text-slate-600">{b.balls}</td>
                        <td className="py-2.5 px-2 text-right text-slate-600">{b.fours}</td>
                        <td className="py-2.5 px-2 text-right text-slate-600">{b.sixes}</td>
                        <td className="py-2.5 px-4 text-right text-slate-600">
                          {b.balls > 0 ? ((b.runs / b.balls) * 100).toFixed(1) : '0.0'}
                        </td>
                      </tr>
                    ))}

                    {/* Extras Row */}
                    <tr className="bg-[#FAF7F2] font-semibold text-slate-700">
                      <td className="py-2.5 px-4 font-bold">Extras</td>
                      <td colSpan={5} className="py-2.5 px-2 text-[11px] text-slate-600">
                        (b {extras.byes}, lb {extras.legByes}, w {extras.wides}, nb {extras.noBalls}, p {extras.penalty})
                      </td>
                      <td className="py-2.5 px-4 text-right font-bold text-[#0F172A]">{totalExtrasCount}</td>
                    </tr>

                    {/* Total Row */}
                    <tr className="bg-[#F1F5F9] font-black text-[#0F172A] border-t border-[#CBD5E1]">
                      <td className="py-2.5 px-4 font-extrabold">Total</td>
                      <td colSpan={5} className="py-2.5 px-2 text-[11px] text-slate-600 font-bold">
                        ({wickets} wickets, {currentOverDisplay} overs)
                      </td>
                      <td className="py-2.5 px-4 text-right font-black text-base text-[#FA4D14]">{totalRuns}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Fall of Wickets */}
              <div className="p-4 bg-[#FAF7F2] border-t border-[#CBD5E1] text-[11px] space-y-1">
                <span className="font-bold text-[#0F172A] uppercase">Fall of Wickets: </span>
                <span className="text-slate-700">
                  {fallOfWickets.map(f => `${f.runs}-${f.wicketNum} (${f.batsmanName}, ${f.overs} ov)`).join(', ')}
                </span>
              </div>

              {/* Bowling Table */}
              <div className="bg-[#F8FAFC] px-4 py-2 border-t border-[#CBD5E1] font-bold text-[#0F172A]">
                {team1Name} Bowling
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-[#F1F5F9] text-[#475569] font-bold text-[11px] uppercase border-b border-[#CBD5E1]">
                      <th className="py-2.5 px-4">Bowler</th>
                      <th className="py-2.5 px-2 text-right">O</th>
                      <th className="py-2.5 px-2 text-right">M</th>
                      <th className="py-2.5 px-2 text-right">R</th>
                      <th className="py-2.5 px-2 text-right">W</th>
                      <th className="py-2.5 px-2 text-right">NB</th>
                      <th className="py-2.5 px-2 text-right">WD</th>
                      <th className="py-2.5 px-4 text-right">ECO</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E2E8F0]">
                    {bowlingAttack.map((bw) => (
                      <tr key={bw.id} className="hover:bg-slate-50">
                        <td className="py-2.5 px-4 font-bold text-[#0F172A]">{bw.name}</td>
                        <td className="py-2.5 px-2 text-right font-semibold">{bw.overs}</td>
                        <td className="py-2.5 px-2 text-right text-slate-600">{bw.maidens}</td>
                        <td className="py-2.5 px-2 text-right text-slate-600">{bw.runsConceded}</td>
                        <td className="py-2.5 px-2 text-right font-bold text-red-600">{bw.wickets}</td>
                        <td className="py-2.5 px-2 text-right text-slate-600">{bw.noBalls}</td>
                        <td className="py-2.5 px-2 text-right text-slate-600">{bw.wides}</td>
                        <td className="py-2.5 px-4 text-right text-slate-600 font-semibold">
                          {bw.overs > 0 ? ((bw.runsConceded / bw.overs)).toFixed(2) : '0.00'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

            </div>
          ) : (
            <div className="bg-white rounded-xl border border-[#CBD5E1] shadow-xs overflow-hidden text-xs">
              <div className="bg-[#F8FAFC] px-4 py-2.5 border-b border-[#CBD5E1] font-bold text-[#0F172A] flex items-center justify-between text-xs sm:text-sm">
                <span className="truncate whitespace-nowrap">{team1Name} Batting</span>
                <span className="font-mono text-slate-700 font-bold shrink-0 text-right">{team1Score}</span>
              </div>
              <div className="p-4 text-slate-600 text-xs">
                <span>Rohit Verma 82 (44), Yashasvi J. 54 (32) | Samarth Rao 2/34, Devansh Patel 3/42</span>
              </div>
            </div>
          )}

        </div>
      )}

      {/* =========================================================================
          5. TAB CONTENT: SQUADS (PLAYING XI)
         ========================================================================= */}
      {activeTab === 'squads' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          
          <div className="bg-white rounded-xl border border-[#CBD5E1] overflow-hidden shadow-xs">
            <div className="bg-[#FA4D14] text-white px-4 py-2.5 font-bold flex items-center justify-between">
              <span>{team2Name} (Playing XI)</span>
            </div>
            <div className="divide-y divide-[#E2E8F0]">
              {battingLineup.map((p, i) => (
                <div key={p.id} className="px-4 py-2.5 flex items-center justify-between hover:bg-slate-50">
                  <div className="flex items-center space-x-2">
                    <span className="font-mono text-slate-400 font-bold">{i + 1}.</span>
                    <span className="font-bold text-[#0F172A]">{p.name}</span>
                  </div>
                  <span className="text-[11px] text-slate-500 font-medium">
                    {i === 0 ? 'Captain • Top Order' : i === 7 ? 'Wicketkeeper' : 'Batsman / All-Rounder'}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl border border-[#CBD5E1] overflow-hidden shadow-xs">
            <div className="bg-[#0F172A] text-white px-4 py-2.5 font-bold flex items-center justify-between">
              <span>{team1Name} (Playing XI)</span>
            </div>
            <div className="divide-y divide-[#E2E8F0]">
              {['Rohit Verma (C)', 'Yashasvi J. (WK)', 'Rohan Verma', 'Sameer Khan', 'Vikram Malhotra', 'Rahul Dravid Jr.', 'Kunal Pandya', 'Navdeep Saini Jr.', 'Mayank Markande Jr.', 'Akash Deep Jr.', 'Mukesh Kumar Jr.'].map((name, i) => (
                <div key={i} className="px-4 py-2.5 flex items-center justify-between hover:bg-slate-50">
                  <div className="flex items-center space-x-2">
                    <span className="font-mono text-slate-400 font-bold">{i + 1}.</span>
                    <span className="font-bold text-[#0F172A]">{name}</span>
                  </div>
                  <span className="text-[11px] text-slate-500 font-medium">Player</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

      {/* =========================================================================
          6. TAB CONTENT: OVERS & HIGHLIGHTS
         ========================================================================= */}
      {activeTab === 'overs' && (
        <div className="space-y-3 text-xs">
          {[
            { over: 14, runs: 12, wickets: 1, bowler: 'Rohan Verma', summary: '1 4 0 1 6 W', scoreAtEnd: '182/4' },
            { over: 13, runs: 16, wickets: 0, bowler: 'Rahul Dravid Jr.', summary: '4 1 1 4 0 6', scoreAtEnd: '170/3' },
            { over: 12, runs: 9, wickets: 1, bowler: 'Sameer Khan', summary: '1 W 1 1 2 4', scoreAtEnd: '154/3' },
            { over: 11, runs: 14, wickets: 0, bowler: 'Vikram Malhotra', summary: '6 1 0 1 2 4', scoreAtEnd: '145/2' },
            { over: 10, runs: 8, wickets: 0, bowler: 'Rahul Dravid Jr.', summary: '1 1 2 1 1 2', scoreAtEnd: '131/2' },
            { over: 9, runs: 11, wickets: 1, bowler: 'Sameer Khan', summary: '4 1 W 0 4 2', scoreAtEnd: '123/2' },
          ].map((ov) => (
            <div key={ov.over} className="bg-white rounded-xl border border-[#CBD5E1] p-3.5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-2 hover:bg-slate-50">
              <div>
                <div className="flex items-center space-x-2">
                  <span className="font-bold text-sm text-[#0F172A]">Over {ov.over}</span>
                  <span className="text-slate-500">•</span>
                  <span className="font-medium text-slate-700">{ov.bowler}</span>
                </div>
                <div className="text-[11px] font-mono text-[#FA4D14] font-bold mt-1 tracking-wider">
                  Deliveries: {ov.summary}
                </div>
              </div>
              <div className="text-left sm:text-right">
                <div className="font-black text-sm text-[#0F172A]">{ov.runs} Runs {ov.wickets > 0 ? `• ${ov.wickets} Wkt` : ''}</div>
                <div className="text-[11px] text-slate-500 font-medium">Score: {team2Name} {ov.scoreAtEnd}</div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* =========================================================================
          7. TAB CONTENT: MATCH INFO
         ========================================================================= */}
      {activeTab === 'info' && (
        <div className="bg-white rounded-xl border border-[#CBD5E1] p-5 shadow-xs text-xs space-y-3">
          <h3 className="font-bold text-sm text-[#0F172A] uppercase border-b border-[#E2E8F0] pb-2">
            Match Information
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-slate-700">
            <div><strong>Match:</strong> {matchTitle}</div>
            <div><strong>Series:</strong> {tournamentName}</div>
            <div><strong>Toss:</strong> {tossInfo}</div>
            <div><strong>Venue:</strong> {venue}</div>
            <div><strong>Umpires:</strong> Anil Chaudhary, K.N. Ananthapadmanabhan</div>
            <div><strong>Match Referee:</strong> Javagal Srinath</div>
            <div><strong>Scorer Operator:</strong> {userSession?.name || 'Verified Scorer'} ({userRole})</div>
          </div>
        </div>
      )}

      {/* =========================================================================
          MODAL: WICKET DISMISSAL WIZARD (ALL ICC LAW DISMISSALS)
         ========================================================================= */}
      {isWicketModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-5 space-y-4 shadow-2xl border border-[#CBD5E1]">
            <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-2">
              <span className="font-extrabold text-sm text-red-600 uppercase flex items-center gap-1.5">
                <AlertCircle className="w-4 h-4" /> Wicket Dismissal Wizard
              </span>
              <button onClick={() => setIsWicketModalOpen(false)} className="text-slate-400 hover:text-slate-700 cursor-pointer">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-[#0F172A] mb-1">Dismissal Type</label>
                <select
                  value={wicketDismissalType}
                  onChange={(e) => setWicketDismissalType(e.target.value as any)}
                  className="w-full bg-[#FAF7F2] border border-[#CBD5E1] rounded-xl px-3 py-2 font-bold text-[#0F172A]"
                >
                  <option value="bowled">Bowled</option>
                  <option value="caught">Caught (Fielder / Keeper / C&B)</option>
                  <option value="lbw">LBW (Leg Before Wicket)</option>
                  <option value="run-out">Run Out</option>
                  <option value="stumped">Stumped (Wicketkeeper)</option>
                  <option value="hit-wicket">Hit Wicket</option>
                  <option value="retired">Retired Hurt / Out</option>
                </select>
              </div>

              {wicketDismissalType === 'caught' && (
                <div>
                  <label className="block font-bold text-[#0F172A] mb-1">Fielder Name</label>
                  <input
                    type="text"
                    value={wicketFielderName}
                    onChange={(e) => setWicketFielderName(e.target.value)}
                    placeholder="e.g. Rahul Dravid Jr. or Slip"
                    className="w-full bg-[#FAF7F2] border border-[#CBD5E1] rounded-xl px-3 py-2 font-bold text-[#0F172A]"
                  />
                </div>
              )}

              {wicketDismissalType === 'run-out' && (
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block font-bold text-[#0F172A] mb-1">Who is Out?</label>
                    <select
                      value={runOutBatsmanEnd}
                      onChange={(e) => setRunOutBatsmanEnd(e.target.value as any)}
                      className="w-full bg-[#FAF7F2] border border-[#CBD5E1] rounded-xl px-2 py-2 font-bold text-[#0F172A]"
                    >
                      <option value="striker">Striker ({striker.name})</option>
                      <option value="non-striker">Non-Striker ({nonStriker.name})</option>
                    </select>
                  </div>
                  <div>
                    <label className="block font-bold text-[#0F172A] mb-1">Runs Completed</label>
                    <select
                      value={runOutRunsCompleted}
                      onChange={(e) => setRunOutRunsCompleted(Number(e.target.value))}
                      className="w-full bg-[#FAF7F2] border border-[#CBD5E1] rounded-xl px-2 py-2 font-bold text-[#0F172A]"
                    >
                      <option value={0}>0 Runs</option>
                      <option value={1}>1 Run</option>
                      <option value={2}>2 Runs</option>
                    </select>
                  </div>
                </div>
              )}

              <div>
                <label className="block font-bold text-[#0F172A] mb-1">Next Incoming Batter</label>
                <select
                  value={nextIncomingBatsmanId}
                  onChange={(e) => setNextIncomingBatsmanId(e.target.value)}
                  className="w-full bg-[#FAF7F2] border border-[#CBD5E1] rounded-xl px-3 py-2 font-bold text-[#0F172A]"
                >
                  {battingLineup.filter(b => !b.isOut && b.id !== strikerId && b.id !== nonStrikerId).map(b => (
                    <option key={b.id} value={b.id}>{b.name}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex justify-end space-x-2 pt-2 border-t border-[#E2E8F0]">
              <button
                onClick={() => setIsWicketModalOpen(false)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setIsWicketModalOpen(false);
                  const isRunOut = wicketDismissalType === 'run-out';
                  const outBatsmanId = isRunOut && runOutBatsmanEnd === 'non-striker' ? nonStrikerId : strikerId;
                  
                  let dismissalText = '';
                  if (wicketDismissalType === 'bowled') dismissalText = `b ${currentBowler.name}`;
                  else if (wicketDismissalType === 'caught') dismissalText = `c ${wicketFielderName} b ${currentBowler.name}`;
                  else if (wicketDismissalType === 'lbw') dismissalText = `lbw b ${currentBowler.name}`;
                  else if (wicketDismissalType === 'stumped') dismissalText = `st (WK) b ${currentBowler.name}`;
                  else if (wicketDismissalType === 'run-out') dismissalText = `run out (${wicketFielderName})`;
                  else dismissalText = `out (${wicketDismissalType})`;

                  handleScoreBall(isRunOut ? runOutRunsCompleted : 0, true, 'none', 0, dismissalText, wicketDismissalType);
                  
                  if (outBatsmanId === strikerId) {
                    setStrikerId(nextIncomingBatsmanId);
                  } else {
                    setNonStrikerId(nextIncomingBatsmanId);
                  }
                  showToast(`Wicket registered! Next batter ${battingLineup.find(b => b.id === nextIncomingBatsmanId)?.name} is in.`);
                }}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-extrabold rounded-xl text-xs cursor-pointer"
              >
                Confirm Wicket
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          MODAL: CUSTOM RUNS & PENALTY
         ========================================================================= */}
      {isCustomRunsModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-5 space-y-4 shadow-2xl border border-[#CBD5E1]">
            <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-2">
              <span className="font-extrabold text-sm text-[#0F172A] uppercase">
                Custom Runs / Penalty
              </span>
              <button onClick={() => setIsCustomRunsModalOpen(false)} className="text-slate-400 hover:text-slate-700 cursor-pointer">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-[#0F172A] mb-1">Runs Count</label>
                <input
                  type="number"
                  min={1}
                  max={20}
                  value={customRunsValue}
                  onChange={(e) => setCustomRunsValue(Number(e.target.value))}
                  className="w-full bg-[#FAF7F2] border border-[#CBD5E1] rounded-xl px-3 py-2 font-bold text-[#0F172A]"
                />
              </div>

              <div>
                <label className="block font-bold text-[#0F172A] mb-1">Extra Category</label>
                <select
                  value={customRunsExtraType}
                  onChange={(e) => setCustomRunsExtraType(e.target.value as any)}
                  className="w-full bg-[#FAF7F2] border border-[#CBD5E1] rounded-xl px-3 py-2 font-bold text-[#0F172A]"
                >
                  <option value="none">Standard Batting / Overthrow Runs</option>
                  <option value="wide">Wide Ball (+ Extra runs)</option>
                  <option value="no-ball">No Ball (+ Extra runs)</option>
                  <option value="bye">Byes</option>
                  <option value="leg-bye">Leg Byes</option>
                  <option value="penalty">Penalty Runs (+5 to batting team)</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end space-x-2 pt-2 border-t border-[#E2E8F0]">
              <button
                onClick={() => setIsCustomRunsModalOpen(false)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setIsCustomRunsModalOpen(false);
                  handleScoreBall(customRunsValue, false, customRunsExtraType, customRunsValue);
                  showToast(`Added ${customRunsValue} runs (${customRunsExtraType}).`);
                }}
                className="px-4 py-2 bg-[#FA4D14] hover:bg-[#D83000] text-white font-extrabold rounded-xl text-xs cursor-pointer"
              >
                Apply Runs
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          MODAL: CHANGE BOWLER
         ========================================================================= */}
      {isChangeBowlerModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-5 space-y-4 shadow-2xl border border-[#CBD5E1]">
            <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-2">
              <span className="font-extrabold text-sm text-[#0F172A] uppercase">
                Select Next Bowler
              </span>
              <button onClick={() => setIsChangeBowlerModalOpen(false)} className="text-slate-400 hover:text-slate-700 cursor-pointer">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-2 text-xs">
              {bowlingAttack.map(bw => (
                <button
                  key={bw.id}
                  onClick={() => {
                    setCurrentBowlerId(bw.id);
                    setIsChangeBowlerModalOpen(false);
                    showToast(`Active bowler set to ${bw.name}`);
                  }}
                  className={`w-full p-3 rounded-xl border text-left font-bold transition-all cursor-pointer flex items-center justify-between ${
                    currentBowlerId === bw.id
                      ? 'bg-orange-50 border-[#FA4D14] text-[#FA4D14]'
                      : 'bg-[#FAF7F2] border-[#CBD5E1] text-[#0F172A] hover:bg-slate-100'
                  }`}
                >
                  <div>
                    <span className="block">{bw.name}</span>
                    <span className="text-[11px] font-medium text-slate-500">{bw.overs} ov • {bw.runsConceded} runs • {bw.wickets} wkts</span>
                  </div>
                  {currentBowlerId === bw.id && <CheckCircle2 className="w-4 h-4 text-[#FA4D14]" />}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
