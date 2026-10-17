import React, { useState } from 'react';
import { UserSession } from '../types';
import { 
  X, 
  Video, 
  UploadCloud, 
  FileText, 
  Sparkles, 
  CheckCircle2, 
  Trophy, 
  ShieldCheck, 
  Tag, 
  Play, 
  AlertCircle 
} from 'lucide-react';

interface CreatePostModalProps {
  isOpen: boolean;
  onClose: () => void;
  userSession: UserSession | null;
  onPostSuccess: (newPost: any) => void;
}

export const CreatePostModal: React.FC<CreatePostModalProps> = ({
  isOpen,
  onClose,
  userSession,
  onPostSuccess,
}) => {
  const [postType, setPostType] = useState<'video' | 'post' | 'scorelog'>('video');
  const [content, setContent] = useState('');
  const [videoTitle, setVideoTitle] = useState('');
  const [matchName, setMatchName] = useState('');
  const [performanceStats, setPerformanceStats] = useState('');
  const [matchResult, setMatchResult] = useState('');
  
  // File upload simulation state
  const [uploadedFileName, setUploadedFileName] = useState('');
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [isPublished, setIsPublished] = useState(false);

  if (!isOpen) return null;

  const handleSimulateFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedFileName(file.name);
      setIsUploading(true);
      setUploadProgress(0);

      const interval = setInterval(() => {
        setUploadProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setIsUploading(false);
            return 100;
          }
          return prev + 25;
        });
      }, 250);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content && !videoTitle && !uploadedFileName) return;

    const newPost = {
      id: 'post-' + Date.now(),
      authorName: userSession?.name || 'Verified Athlete',
      authorAvatar: userSession?.avatar || 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
      authorRole: userSession?.primaryRole || 'Right-Arm Fast Bowler',
      authorType: userSession?.role || 'athlete',
      isVerified: true,
      timeAgo: 'Just now',
      content: content || videoTitle,
      matchScorelog: postType === 'scorelog' ? {
        matchName: matchName || 'State League T20 Match',
        performance: performanceStats || '4/18 (4.0 ov)',
        result: matchResult || 'Won by 24 runs',
      } : undefined,
      endorsementsCount: 1,
      commentsCount: 0,
      sharesCount: 0,
      isEndorsed: false,
    };

    setIsPublished(true);
    setTimeout(() => {
      onPostSuccess(newPost);
      setIsPublished(false);
      setContent('');
      setVideoTitle('');
      setUploadedFileName('');
      onClose();
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 animate-fadeIn">
      <div className="bg-white rounded-3xl border border-slate-200 max-w-xl w-full p-6 relative shadow-2xl overflow-hidden space-y-5 animate-scaleUp">
        
        {/* Modal Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1.5 rounded-full hover:bg-slate-100 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Title */}
        <div className="flex items-center space-x-3">
          <div className="p-3 bg-[#FA4D14]/10 text-[#FA4D14] rounded-2xl">
            <Video className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-[#0F172A] font-oswald tracking-tight">
              Post to Sportzicon Network
            </h2>
            <p className="text-xs text-slate-500 font-medium">
              Upload video footage, match scorelogs, or recruitment updates for certified scouts.
            </p>
          </div>
        </div>

        {/* Post Category Selector */}
        <div className="grid grid-cols-3 gap-2 p-1 bg-[#FAF7F2] rounded-2xl border border-slate-200">
          <button
            type="button"
            onClick={() => setPostType('video')}
            className={`py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center space-x-1.5 cursor-pointer ${
              postType === 'video'
                ? 'bg-[#0F172A] text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Video className="w-3.5 h-3.5 text-[#FA4D14]" />
            <span>Trial Video</span>
          </button>

          <button
            type="button"
            onClick={() => setPostType('scorelog')}
            className={`py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center space-x-1.5 cursor-pointer ${
              postType === 'scorelog'
                ? 'bg-[#0F172A] text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Trophy className="w-3.5 h-3.5 text-[#FA4D14]" />
            <span>Match Scorelog</span>
          </button>

          <button
            type="button"
            onClick={() => setPostType('post')}
            className={`py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center space-x-1.5 cursor-pointer ${
              postType === 'post'
                ? 'bg-[#0F172A] text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <FileText className="w-3.5 h-3.5 text-[#FA4D14]" />
            <span>Text Post</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Post Content Input */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700">Update Caption / Description</label>
            <textarea
              rows={3}
              required
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Describe your recent performance, bowling speed, match context, or trial request..."
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:border-[#FA4D14] focus:ring-1 focus:ring-[#FA4D14] text-xs font-medium text-slate-900 bg-white"
            />
          </div>

          {/* Video Upload Dropzone */}
          {postType === 'video' && (
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700">Upload Match Footage / Bowling Reel</label>
              
              <div className="border-2 border-dashed border-slate-300 hover:border-[#FA4D14] rounded-2xl p-4 text-center bg-[#FAF7F2] transition-colors relative cursor-pointer">
                <input
                  type="file"
                  accept="video/*"
                  onChange={handleSimulateFileUpload}
                  className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                />
                
                <UploadCloud className="w-8 h-8 text-[#FA4D14] mx-auto mb-1" />
                <span className="text-xs font-bold text-slate-800 block">
                  {uploadedFileName ? uploadedFileName : 'Click or Drag MP4 / MOV Video Footage Here'}
                </span>
                <span className="text-[10px] text-slate-500 font-mono block mt-0.5">
                  High Definition (1080p) • Up to 500MB • Auto HD Compression
                </span>

                {isUploading && (
                  <div className="mt-3 space-y-1">
                    <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                      <div 
                        className="bg-[#FA4D14] h-full transition-all duration-300"
                        style={{ width: `${uploadProgress}%` }}
                      />
                    </div>
                    <span className="text-[10px] font-mono font-bold text-[#FA4D14]">
                      Uploading Video... {uploadProgress}%
                    </span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Scorelog Inputs */}
          {postType === 'scorelog' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-[#FAF7F2] p-3 rounded-2xl border border-slate-200">
              <div className="space-y-1 sm:col-span-2">
                <label className="text-[11px] font-bold text-slate-700">Tournament or Match Name</label>
                <input
                  type="text"
                  value={matchName}
                  onChange={(e) => setMatchName(e.target.value)}
                  placeholder="e.g. State U-19 Quarter Finals vs Baroda CC"
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-medium"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-bold text-slate-700">Your Individual Performance</label>
                <input
                  type="text"
                  value={performanceStats}
                  onChange={(e) => setPerformanceStats(e.target.value)}
                  placeholder="e.g. 5/18 (8.0 overs) or 84* (48b)"
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-medium"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-bold text-slate-700">Match Result</label>
                <input
                  type="text"
                  value={matchResult}
                  onChange={(e) => setMatchResult(e.target.value)}
                  placeholder="e.g. Won by 32 runs"
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-medium"
                />
              </div>
            </div>
          )}

        {/* Action Footer */}
        <div className="pt-3 flex items-center justify-between border-t border-slate-200">
          <span className="text-[11px] font-mono font-bold text-slate-500 flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> Auto-Verified Post
          </span>

          <div className="flex items-center space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-3.5 py-1.5 rounded-lg border border-slate-300 text-xs font-semibold text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
            >
              Cancel
            </button>
            
            <button
              type="submit"
              disabled={isPublished}
              className="px-4 py-1.5 rounded-lg bg-[#FA4D14] hover:bg-[#D83000] text-white text-xs font-bold uppercase tracking-wider transition-all flex items-center space-x-1.5 cursor-pointer shadow-sm disabled:opacity-50"
            >
              {isPublished ? (
                <span className="flex items-center space-x-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Published!</span>
                </span>
              ) : (
                <>
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Publish Update</span>
                </>
              )}
            </button>
          </div>
        </div>

        </form>

      </div>
    </div>
  );
};
