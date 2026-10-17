import React, { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX, Play, Pause } from 'lucide-react';

interface InstagramStyleVideoPlayerProps {
  videoUrl?: string;
  posterUrl: string;
  className?: string;
}

export const InstagramStyleVideoPlayer: React.FC<InstagramStyleVideoPlayerProps> = ({
  videoUrl,
  posterUrl,
  className = '',
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [showPlayPauseIcon, setShowPlayPauseIcon] = useState(false);
  const [progress, setProgress] = useState(0);

  // Default high-quality cricket footage preview loop
  const src =
    videoUrl ||
    'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4';

  // IntersectionObserver: Automatically play when scrolled into view (like Instagram & LinkedIn)
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (videoRef.current) {
            if (entry.isIntersecting) {
              const playPromise = videoRef.current.play();
              if (playPromise !== undefined) {
                playPromise
                  .then(() => {
                    setIsPlaying(true);
                  })
                  .catch(() => {
                    // Autoplay prevented by browser, remain paused until interaction
                    setIsPlaying(false);
                  });
              }
            } else {
              videoRef.current.pause();
              setIsPlaying(false);
            }
          }
        });
      },
      { threshold: 0.4 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleTimeUpdate = () => {
    if (videoRef.current && videoRef.current.duration) {
      const current = videoRef.current.currentTime;
      const total = videoRef.current.duration;
      setProgress((current / total) * 100);
    }
  };

  const togglePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play();
        setIsPlaying(true);
      }
      setShowPlayPauseIcon(true);
      setTimeout(() => setShowPlayPauseIcon(false), 800);
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <div
      ref={containerRef}
      onClick={togglePlayPause}
      className={`relative rounded-2xl overflow-hidden bg-black group cursor-pointer shadow-md border border-[#CBD5E1] select-none ${className}`}
    >
      <video
        ref={videoRef}
        src={src}
        poster={posterUrl}
        loop
        muted={isMuted}
        playsInline
        onTimeUpdate={handleTimeUpdate}
        className="w-full h-64 sm:h-80 md:h-96 object-cover"
      />

      {/* Instagram / LinkedIn Style Minimal Overlay Controls */}
      <div className="absolute inset-0 bg-black/5 group-hover:bg-black/15 transition-all flex flex-col justify-between p-3">
        
        {/* Top Right: Minimal Mute/Unmute Button */}
        <div className="flex justify-end">
          <button
            onClick={toggleMute}
            className="p-2 rounded-full bg-black/60 hover:bg-black/80 text-white backdrop-blur-md transition-all shadow-md cursor-pointer border border-white/20"
            title={isMuted ? 'Tap to Unmute' : 'Tap to Mute'}
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-[#FA4D14]" />}
          </button>
        </div>

        {/* Center: Tap Play/Pause Feedback Animation */}
        <div className="flex items-center justify-center">
          {showPlayPauseIcon && (
            <div className="w-14 h-14 rounded-full bg-black/75 text-white flex items-center justify-center backdrop-blur-md shadow-2xl animate-ping opacity-90">
              {isPlaying ? (
                <Pause className="w-7 h-7 fill-white" />
              ) : (
                <Play className="w-7 h-7 fill-white ml-1" />
              )}
            </div>
          )}
          {!isPlaying && !showPlayPauseIcon && (
            <div className="w-12 h-12 rounded-full bg-black/60 text-white flex items-center justify-center backdrop-blur-md shadow-lg group-hover:scale-110 transition-transform">
              <Play className="w-6 h-6 fill-white ml-0.5" />
            </div>
          )}
        </div>

        {/* Bottom Progress Bar */}
        <div className="w-full bg-white/30 h-1 rounded-full overflow-hidden backdrop-blur-sm">
          <div
            className="bg-[#FA4D14] h-full transition-all duration-200"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
};
