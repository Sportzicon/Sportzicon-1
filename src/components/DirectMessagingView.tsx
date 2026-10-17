import React, { useState } from 'react';
import { ChatConversation, ChatMessage, UserSession, Athlete, ViewTab } from '../types';
import { 
  Send, 
  Search, 
  ShieldCheck, 
  Plus, 
  ArrowLeft, 
  CheckCheck, 
  MessageSquare, 
  User, 
  Building2, 
  Share2, 
  Sparkles,
  FileText,
  MoreVertical,
  ExternalLink
} from 'lucide-react';

interface DirectMessagingViewProps {
  userSession: UserSession | null;
  athletes: Athlete[];
  onSelectAthlete?: (athlete: Athlete) => void;
  setActiveTab: (tab: ViewTab) => void;
  initialSelectedRecipient?: string | null;
  initialAttachedPost?: { id: string; authorName: string; content: string } | null;
}

const INITIAL_CONVERSATIONS: ChatConversation[] = [
  {
    id: 'conv-mca',
    participantName: 'Mumbai Cricket Association (MCA)',
    participantAvatar: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&q=80&w=200',
    participantRole: 'State Governing Body • Selection Committee',
    participantType: 'association',
    isVerified: true,
    lastMessage: 'Your verified video reel has been logged for U-19 state trials.',
    lastMessageTime: '10 mins ago',
    unreadCount: 1,
    messages: [
      {
        id: 'm1',
        senderId: 'mca',
        senderName: 'Mumbai Cricket Association (MCA)',
        senderAvatar: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&q=80&w=200',
        text: 'Greetings Rohan! We reviewed your 4/22 match performance scorelog from the club semifinal.',
        timestamp: '10:15 AM',
        isMe: false
      },
      {
        id: 'm2',
        senderId: 'mca',
        senderName: 'Mumbai Cricket Association (MCA)',
        senderAvatar: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&q=80&w=200',
        text: 'Your verified video reel has been logged for U-19 state trials.',
        timestamp: '10:18 AM',
        isMe: false
      }
    ]
  },
  {
    id: 'conv-coach',
    participantName: 'Coach Ramesh Pawar',
    participantAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
    participantRole: 'Senior High-Performance Coach • West Zone',
    participantType: 'academy',
    isVerified: true,
    lastMessage: 'Keep working on that inswing release wrist angle.',
    lastMessageTime: '1 hour ago',
    unreadCount: 0,
    messages: [
      {
        id: 'm3',
        senderId: 'me',
        senderName: 'Rohan Verma',
        senderAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
        text: 'Coach Pawar, shared my latest match spell video from the quarterfinal!',
        timestamp: '9:00 AM',
        isMe: true
      },
      {
        id: 'm4',
        senderId: 'coach',
        senderName: 'Coach Ramesh Pawar',
        senderAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
        text: 'Great seam position! Keep working on that inswing release wrist angle.',
        timestamp: '9:45 AM',
        isMe: false
      }
    ]
  },
  {
    id: 'conv-scout',
    participantName: 'Sunil Joshi',
    participantAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
    participantRole: 'Senior Talent Scout • IPL Franchise Identifier',
    participantType: 'scout',
    isVerified: true,
    lastMessage: 'Are you available for the Pune Zonal trial match next Tuesday?',
    lastMessageTime: 'Yesterday',
    unreadCount: 2,
    messages: [
      {
        id: 'm5',
        senderId: 'scout',
        senderName: 'Sunil Joshi',
        senderAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
        text: 'Are you available for the Pune Zonal trial match next Tuesday?',
        timestamp: 'Yesterday 4:30 PM',
        isMe: false
      }
    ]
  }
];

export const DirectMessagingView: React.FC<DirectMessagingViewProps> = ({
  userSession,
  athletes,
  onSelectAthlete,
  setActiveTab,
  initialSelectedRecipient,
  initialAttachedPost
}) => {
  const [conversations, setConversations] = useState<ChatConversation[]>(INITIAL_CONVERSATIONS);
  const [selectedConvId, setSelectedConvId] = useState<string>(INITIAL_CONVERSATIONS[0].id);
  const [searchQuery, setSearchQuery] = useState('');
  const [inputMessage, setInputMessage] = useState('');
  const [isNewChatModalOpen, setIsNewChatModalOpen] = useState(false);
  const [attachedPost, setAttachedPost] = useState<{ id: string; authorName: string; content: string } | null>(initialAttachedPost || null);
  
  // Mobile View Switcher State: 'list' (shows contacts) vs 'chat' (shows active thread)
  const [mobileView, setMobileView] = useState<'list' | 'chat'>('list');

  // 3-Dots Chat Options Menu State
  const [isChatOptionsOpen, setIsChatOptionsOpen] = useState(false);
  const chatTopRef = React.useRef<HTMLDivElement>(null);

  // Requirement 1: When clicking at chat, always go to the top of the chat page
  React.useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    chatTopRef.current?.scrollIntoView({ behavior: 'instant', block: 'start' });
  }, []);

  React.useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, [selectedConvId, mobileView]);

  // Handle initial selected recipient if passed from props
  React.useEffect(() => {
    if (initialSelectedRecipient) {
      const existing = conversations.find(c => 
        c.participantName.toLowerCase().includes(initialSelectedRecipient.toLowerCase())
      );
      if (existing) {
        setSelectedConvId(existing.id);
        setMobileView('chat');
      } else {
        const matchedAthlete = athletes.find(a => 
          a.name.toLowerCase().includes(initialSelectedRecipient.toLowerCase())
        );
        if (matchedAthlete) {
          startNewConversationWithAthlete(matchedAthlete);
          setMobileView('chat');
        }
      }
    }
  }, [initialSelectedRecipient]);

  const currentConv = conversations.find(c => c.id === selectedConvId) || conversations[0];

  const handleSendMessage = () => {
    if (!inputMessage.trim() && !attachedPost) return;

    const newMessage: ChatMessage = {
      id: `msg-${Date.now()}`,
      senderId: userSession?.id || 'me',
      senderName: userSession?.name || 'Rohan Verma',
      senderAvatar: userSession?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
      text: inputMessage,
      timestamp: 'Just now',
      isMe: true,
      attachedPost: attachedPost || undefined
    };

    setConversations(prev => prev.map(c => {
      if (c.id === selectedConvId) {
        return {
          ...c,
          lastMessage: inputMessage || (attachedPost ? `Shared post by ${attachedPost.authorName}` : 'Shared update'),
          lastMessageTime: 'Just now',
          messages: [...c.messages, newMessage]
        };
      }
      return c;
    }));

    setInputMessage('');
    setAttachedPost(null);
  };

  const startNewConversationWithAthlete = (ath: Athlete) => {
    const existing = conversations.find(c => c.participantName.toLowerCase() === ath.name.toLowerCase());
    if (existing) {
      setSelectedConvId(existing.id);
    } else {
      const newConv: ChatConversation = {
        id: `conv-${Date.now()}`,
        participantName: ath.name,
        participantAvatar: ath.avatar,
        participantRole: `${ath.primaryRole} • ${ath.currentClubOrAcademy}`,
        participantType: 'athlete',
        isVerified: ath.verified,
        lastMessage: 'Conversation started',
        lastMessageTime: 'Just now',
        unreadCount: 0,
        messages: [
          {
            id: `msg-start-${Date.now()}`,
            senderId: 'system',
            senderName: 'Sportzicon Network',
            senderAvatar: ath.avatar,
            text: `Connected with ${ath.name} on Verified Sportzicon Direct Messaging.`,
            timestamp: 'Just now',
            isMe: false
          }
        ]
      };
      setConversations([newConv, ...conversations]);
      setSelectedConvId(newConv.id);
    }
    setIsNewChatModalOpen(false);
  };

  const filteredConversations = conversations.filter(c => 
    c.participantName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.participantRole.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleViewProfile = () => {
    if (!currentConv) return;
    const matched = athletes.find(a => a.name.toLowerCase() === currentConv.participantName.toLowerCase());
    if (matched && onSelectAthlete) {
      onSelectAthlete(matched);
    } else {
      alert(`Viewing complete verified profile of ${currentConv.participantName}`);
    }
  };

  return (
    <div className="space-y-4 font-sans text-[#0F172A] animate-fade-in">
      <div ref={chatTopRef} className="h-0 w-0 pointer-events-none" />
      
      {/* Top Dark Header Card - Clean & Well Arranged */}
      <div className="bg-[#0F172A] text-white p-5 sm:p-6 rounded-3xl border border-[#1E293B] shadow-md flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-left">
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <span className="text-overline text-[#FA4D14]">
              Verified Messaging Network
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-[#1E293B] text-slate-300 text-xs border border-[#334155] tabular-nums">
              {conversations.length} Active Conversations
            </span>
          </div>
          <h1 className="text-h1 text-white flex items-center gap-2">
            <MessageSquare className="w-6 h-6 text-[#FA4D14]" />
            <span>Cricket Direct Messenger</span>
          </h1>
          <p className="text-body text-slate-300 max-w-[65ch]">
            Connect directly with scouts, state associations, academy coaches, and athletes across the network.
          </p>
        </div>

        <button
          onClick={() => setIsNewChatModalOpen(true)}
          className="px-4 py-2.5 rounded-xl bg-[#FA4D14] hover:bg-[#E03A00] text-white text-xs sm:text-sm font-semibold tracking-[0.01em] transition-all cursor-pointer flex items-center justify-center gap-1.5 shadow-md shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>New Message</span>
        </button>
      </div>

      {/* Main Messenger Layout: Sidebar + Chat Window */}
      <div className="bg-white rounded-3xl border border-[#CBD5E1] shadow-sm overflow-hidden grid grid-cols-1 md:grid-cols-12 min-h-[560px]">
        
        {/* Left List of Conversations */}
        <div className={`md:col-span-5 lg:col-span-4 border-r border-[#CBD5E1] flex flex-col bg-[#FAF7F2] ${
          mobileView === 'chat' ? 'hidden md:flex' : 'flex'
        }`}>
          
          {/* Search Contacts Bar */}
          <div className="p-3.5 border-b border-[#E5DFD5] bg-white flex items-center justify-between gap-2">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-[#64748B] absolute left-3 top-2.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search contacts..."
                className="w-full pl-9 pr-3 py-2 bg-[#F8FAFC] border border-[#CBD5E1] rounded-xl text-xs text-[#0F172A] focus:outline-none focus:border-[#EA580C]"
              />
            </div>
            <button
              onClick={() => setIsNewChatModalOpen(true)}
              className="p-2 rounded-xl bg-[#EA580C] text-white hover:bg-orange-600 transition-colors cursor-pointer shrink-0"
              title="Start New Chat"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>

          {/* Conversation Cards List */}
          <div className="flex-1 overflow-y-auto divide-y divide-[#E5DFD5]">
            {filteredConversations.map(conv => {
              const isSelected = conv.id === selectedConvId;

              return (
                <button
                  key={conv.id}
                  onClick={() => {
                    setSelectedConvId(conv.id);
                    setMobileView('chat');
                    // Clear unread
                    setConversations(prev => prev.map(c => c.id === conv.id ? { ...c, unreadCount: 0 } : c));
                  }}
                  className={`w-full text-left p-3.5 transition-all cursor-pointer flex items-start space-x-3 ${
                    isSelected 
                      ? 'bg-white border-l-4 border-l-[#EA580C] shadow-sm ring-1 ring-[#EA580C]/20' 
                      : 'hover:bg-white/60'
                  }`}
                >
                  <div className="relative shrink-0">
                    <img
                      src={conv.participantAvatar}
                      alt={conv.participantName}
                      className="w-11 h-11 rounded-full object-cover border border-[#CBD5E1]"
                    />
                    {conv.unreadCount > 0 && (
                      <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#EA580C] text-white text-[9px] font-bold font-mono rounded-full flex items-center justify-center border border-white">
                        {conv.unreadCount}
                      </span>
                    )}
                  </div>

                  <div className="flex-1 min-w-0 space-y-0.5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-1 truncate pr-1">
                        <h4 className={`text-xs font-oswald uppercase truncate ${isSelected ? 'font-extrabold text-[#EA580C]' : 'font-bold text-[#0F172A]'}`}>
                          {conv.participantName}
                        </h4>
                        {conv.isVerified && <ShieldCheck className="w-3.5 h-3.5 text-[#EA580C] shrink-0" />}
                      </div>
                      <span className="text-[10px] text-[#64748B] font-mono shrink-0">{conv.lastMessageTime}</span>
                    </div>

                    <p className="text-[11px] text-[#475569] font-medium truncate">{conv.participantRole}</p>
                    <p className="text-xs text-[#334155] truncate">{conv.lastMessage}</p>
                  </div>
                </button>
              );
            })}
          </div>

        </div>

        {/* Right Selected Chat Window */}
        <div className={`md:col-span-7 lg:col-span-8 flex flex-col bg-white ${
          mobileView === 'list' ? 'hidden md:flex' : 'flex'
        }`}>
          
          {/* Chat Window Top Bar - Single Line Layout */}
          <div className="px-3 py-2.5 border-b border-[#CBD5E1] bg-white flex items-center justify-between gap-2 relative">
            
            {/* Left Group: Back Button */}
            <button
              onClick={() => setMobileView('list')}
              className="p-1.5 rounded-xl bg-[#FAF7F2] hover:bg-[#E5DFD5] text-[#0F172A] border border-[#CBD5E1] transition-all cursor-pointer flex items-center shrink-0"
              title="Back to All Messages"
            >
              <ArrowLeft className="w-4 h-4 text-[#EA580C]" />
            </button>

            {/* Clickable Recipient Info: Click avatar or name to view complete profile */}
            <button
              onClick={handleViewProfile}
              className="flex items-center space-x-2.5 min-w-0 flex-1 hover:opacity-85 transition-all text-left cursor-pointer group py-0.5 rounded-lg px-1 -ml-1 hover:bg-[#FAF7F2]"
              title={`Click to view complete profile of ${currentConv.participantName}`}
            >
              {/* Avatar */}
              <div className="relative shrink-0">
                <img
                  src={currentConv.participantAvatar}
                  alt={currentConv.participantName}
                  className="w-8 h-8 sm:w-9 sm:h-9 rounded-full object-cover border border-[#EA580C] group-hover:border-orange-600 transition-colors"
                />
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-white rounded-full"></span>
              </div>

              {/* Participant Name & Role in a Single Line / Truncated Container */}
              <div className="min-w-0 flex-1">
                <div className="flex items-center space-x-1 min-w-0">
                  <h3 className="font-bold text-[#0F172A] group-hover:text-[#EA580C] text-xs sm:text-sm font-oswald uppercase truncate whitespace-nowrap transition-colors">
                    {currentConv.participantName}
                  </h3>
                  {currentConv.isVerified && <ShieldCheck className="w-3.5 h-3.5 text-[#EA580C] shrink-0" />}
                </div>
                <p className="text-[10px] sm:text-xs text-[#64748B] font-mono truncate whitespace-nowrap">
                  {currentConv.participantRole}
                </p>
              </div>
            </button>

            {/* Right Group: 3-Dots Menu Button */}
            <div className="flex items-center shrink-0 font-mono text-xs relative">
              <div className="relative shrink-0">
                <button
                  onClick={() => setIsChatOptionsOpen(!isChatOptionsOpen)}
                  className="p-2 rounded-xl bg-[#FAF7F2] hover:bg-[#E5DFD5] text-[#0F172A] border border-[#CBD5E1] transition-all cursor-pointer flex items-center justify-center shrink-0"
                  title="More Options"
                >
                  <MoreVertical className="w-4 h-4 text-[#0F172A]" />
                </button>

                {/* 3 Dots Dropdown Menu */}
                {isChatOptionsOpen && (
                  <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-2xl border border-[#CBD5E1] shadow-2xl p-2 z-30 space-y-1 text-xs animate-fade-in">
                    <button
                      onClick={() => {
                        setIsChatOptionsOpen(false);
                        handleViewProfile();
                      }}
                      className="w-full text-left px-3 py-2 rounded-xl hover:bg-[#FAF7F2] font-semibold text-[#0F172A] flex items-center gap-2 cursor-pointer"
                    >
                      <User className="w-4 h-4 text-[#EA580C]" />
                      <span>View Complete Profile</span>
                    </button>

                    <button
                      onClick={() => {
                        setIsChatOptionsOpen(false);
                        navigator.clipboard?.writeText(window.location.href);
                        alert('Profile connection link copied to clipboard!');
                      }}
                      className="w-full text-left px-3 py-2 rounded-xl hover:bg-[#FAF7F2] font-semibold text-[#0F172A] flex items-center gap-2 cursor-pointer"
                    >
                      <ExternalLink className="w-4 h-4 text-slate-600" />
                      <span>Copy Profile Link</span>
                    </button>

                    <div className="border-t border-[#E2E8F0] my-1"></div>

                    <button
                      onClick={() => {
                        setIsChatOptionsOpen(false);
                        if (confirm('Are you sure you want to clear this message history?')) {
                          setConversations(prev => prev.map(c => c.id === currentConv.id ? { ...c, messages: [] } : c));
                        }
                      }}
                      className="w-full text-left px-3 py-2 rounded-xl hover:bg-red-50 text-red-600 font-semibold flex items-center gap-2 cursor-pointer"
                    >
                      <span>Clear Chat History</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Messages Thread Stream */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-[#FAF7F2]/40 min-h-[380px]">
            {currentConv.messages.map(msg => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.isMe ? 'items-end' : 'items-start'}`}
              >
                <div className="flex items-end space-x-2 max-w-[85%] sm:max-w-[75%]">
                  {!msg.isMe && (
                    <img
                      src={msg.senderAvatar}
                      alt={msg.senderName}
                      className="w-7 h-7 rounded-full object-cover border border-[#CBD5E1] mb-1"
                    />
                  )}

                  <div
                    className={`p-3.5 rounded-2xl text-xs space-y-2 shadow-sm ${
                      msg.isMe
                        ? 'bg-[#EA580C] text-white rounded-br-none'
                        : 'bg-white text-[#0F172A] border border-[#CBD5E1] rounded-bl-none'
                    }`}
                  >
                    {!msg.isMe && (
                      <span className="font-bold text-[10px] font-mono opacity-80 block">
                        {msg.senderName}
                      </span>
                    )}

                    {/* Render Attached Feed Post Preview if available */}
                    {msg.attachedPost && (
                      <div className={`p-2.5 rounded-xl border font-mono text-[11px] ${
                        msg.isMe ? 'bg-orange-700/60 border-orange-400/50 text-white' : 'bg-[#FAF7F2] border-[#CBD5E1] text-[#0F172A]'
                      }`}>
                        <div className="flex items-center gap-1 font-bold text-[10px] uppercase mb-1">
                          <Share2 className="w-3 h-3 text-[#EA580C]" />
                          <span>Shared Network Post • {msg.attachedPost.authorName}</span>
                        </div>
                        <p className="line-clamp-2 italic font-sans">{msg.attachedPost.content}</p>
                      </div>
                    )}

                    <p className="text-sm font-sans leading-relaxed">{msg.text}</p>

                    <span className={`text-[9px] font-mono block text-right ${msg.isMe ? 'text-orange-100' : 'text-[#64748B]'}`}>
                      {msg.timestamp}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Response Action Chips */}
          <div className="p-2 bg-[#FAF7F2] border-t border-[#E5DFD5] flex items-center space-x-2 overflow-x-auto no-scrollbar font-mono text-[11px]">
            <span className="text-[#64748B] font-bold uppercase shrink-0 px-1">Quick:</span>
            <button
              onClick={() => setInputMessage('Interested in trial opportunities.')}
              className="px-2.5 py-1 rounded-lg bg-white border border-[#CBD5E1] hover:bg-[#EA580C] hover:text-white transition-colors shrink-0 font-semibold cursor-pointer"
            >
              🏏 Trial Interest
            </button>
            <button
              onClick={() => setInputMessage('Sharing my verified bowling scorelog.')}
              className="px-2.5 py-1 rounded-lg bg-white border border-[#CBD5E1] hover:bg-[#EA580C] hover:text-white transition-colors shrink-0 font-semibold cursor-pointer"
            >
              📊 Share Scorelog
            </button>
            <button
              onClick={() => setInputMessage('Available for video reel review.')}
              className="px-2.5 py-1 rounded-lg bg-white border border-[#CBD5E1] hover:bg-[#EA580C] hover:text-white transition-colors shrink-0 font-semibold cursor-pointer"
            >
              📹 Video Review
            </button>
          </div>

          {/* Attached Post Bar if preparing to send attached post */}
          {attachedPost && (
            <div className="p-2.5 bg-amber-50 border-t border-amber-200 flex items-center justify-between text-xs font-mono">
              <div className="flex items-center space-x-2 text-amber-900 truncate">
                <Share2 className="w-4 h-4 text-[#EA580C] shrink-0" />
                <span className="font-bold truncate">Attached Post by {attachedPost.authorName}: "{attachedPost.content}"</span>
              </div>
              <button
                onClick={() => setAttachedPost(null)}
                className="text-amber-800 font-bold hover:text-red-600 px-2 cursor-pointer"
              >
                ✕
              </button>
            </div>
          )}

          {/* Message Input Controls */}
          <div className="p-3 border-t border-[#CBD5E1] bg-white flex items-center space-x-2">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSendMessage();
              }}
              placeholder={`Message ${currentConv.participantName}...`}
              className="flex-1 bg-[#F8FAFC] border border-[#CBD5E1] rounded-2xl px-4 py-2.5 text-sm text-[#0F172A] placeholder-[#64748B] focus:outline-none focus:border-[#EA580C]"
            />
            <button
              onClick={handleSendMessage}
              className="px-5 py-2.5 rounded-2xl bg-[#EA580C] hover:bg-orange-600 text-white font-mono text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 shadow-md shrink-0"
            >
              <span>Send</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>

      </div>

      {/* New Message Dialog Modal */}
      {isNewChatModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl border border-[#CBD5E1] max-w-md w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-[#E2E8F0]">
              <h3 className="font-extrabold text-[#0F172A] text-lg font-oswald uppercase flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-[#EA580C]" />
                <span>Start Direct Message</span>
              </h3>
              <button
                onClick={() => setIsNewChatModalOpen(false)}
                className="p-1 rounded-lg text-[#64748B] hover:text-[#0F172A] cursor-pointer"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-[#475569]">
              Choose an athlete, scout, or state association from the network to start a direct conversation:
            </p>

            <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
              {athletes.map(ath => (
                <button
                  key={ath.id}
                  onClick={() => startNewConversationWithAthlete(ath)}
                  className="w-full text-left p-3 rounded-2xl bg-[#FAF7F2] hover:bg-[#E5DFD5] border border-[#E5DFD5] transition-all cursor-pointer flex items-center space-x-3"
                >
                  <img
                    src={ath.avatar}
                    alt={ath.name}
                    className="w-10 h-10 rounded-full object-cover border border-[#EA580C]"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-1">
                      <h4 className="font-bold text-[#0F172A] text-xs font-oswald uppercase truncate">
                        {ath.name}
                      </h4>
                      {ath.verified && <ShieldCheck className="w-3.5 h-3.5 text-[#EA580C]" />}
                    </div>
                    <p className="text-[11px] text-[#475569] font-mono truncate">{ath.primaryRole}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
