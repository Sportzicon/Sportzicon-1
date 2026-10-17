import React from 'react';

interface SportziconIconProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showBadge?: boolean;
}

export const SportziconIcon: React.FC<SportziconIconProps> = ({
  className = '',
  size = 'md',
  showBadge = false,
}) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-11 h-11',
    lg: 'w-16 h-16',
    xl: 'w-24 h-24',
  };

  const svgSizes = {
    sm: 32,
    md: 44,
    lg: 64,
    xl: 96,
  };

  const px = svgSizes[size];

  return (
    <div className={`relative inline-flex items-center justify-center shrink-0 ${sizeClasses[size]} ${className}`}>
      {/* Exact Sportzicon Torch Logo from Image */}
      <svg
        width={px}
        height={px}
        viewBox="0 0 100 110"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="transition-transform hover:scale-105 filter drop-shadow-[0_2px_8px_rgba(224,78,38,0.25)]"
      >
        {/* 1. VIBRANT ORANGE FLAME TEARDROP */}
        <path
          d="M 32 46 C 22 36 26 20 44 10 C 54 4 62 2 65 2 C 64 8 68 13 74 18 C 82 25 80 38 72 46 Z"
          fill="#E04E26"
        />

        {/* 2. WHITE RUNNING ATHLETE SILHOUETTE INSIDE FLAME */}
        {/* Head */}
        <circle cx="60" cy="17" r="3.8" fill="#FFFFFF" />

        {/* Forward Leaning Torso */}
        <path
          d="M 56 22 L 46 32"
          stroke="#FFFFFF"
          strokeWidth="3.2"
          strokeLinecap="round"
        />

        {/* Pumping Arms */}
        {/* Front Arm */}
        <path
          d="M 53 25 L 63 23 L 67 28"
          stroke="#FFFFFF"
          strokeWidth="2.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Back Arm */}
        <path
          d="M 48 29 L 40 26 L 35 31"
          stroke="#FFFFFF"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Dynamic Running Legs */}
        {/* Front Leg */}
        <path
          d="M 46 32 L 54 38 L 62 40"
          stroke="#FFFFFF"
          strokeWidth="3.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Back Leg */}
        <path
          d="M 46 32 L 37 37 L 30 35"
          stroke="#FFFFFF"
          strokeWidth="2.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* 3. TORCH CAULDRON BOWL (Solid Dark with White Highlight Rims) */}
        {/* Bowl Shape */}
        <path
          d="M 20 46 C 20 46 22 60 50 60 C 78 60 80 46 80 46 Z"
          fill="#111111"
        />
        {/* Top Rim Flat Lip */}
        <path
          d="M 18 46 H 82 V 49 H 18 Z"
          fill="#111111"
        />
        {/* Top White Highlight Ring */}
        <path
          d="M 22 47.5 H 78"
          stroke="#FFFFFF"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
        {/* Secondary White Highlight Ring */}
        <path
          d="M 26 51.5 H 74"
          stroke="#FFFFFF"
          strokeWidth="1.2"
          strokeLinecap="round"
          opacity="0.85"
        />

        {/* 4. SLEEK S-CURVED TWISTED TORCH STEM & PEDESTAL BASE */}
        {/* S-Ribbon Torch Stem (Solid Black) */}
        <path
          d="M 32 60 C 44 60 68 62 68 70 C 68 78 40 76 38 84 C 36 90 56 92 68 94 L 66 98 C 50 98 28 92 30 82 C 32 74 60 72 58 66 C 56 62 42 60 32 60 Z"
          fill="#111111"
        />

        {/* Flared Pedestal Base Stand */}
        <path
          d="M 26 96 C 26 96 32 94 50 94 C 68 94 74 96 74 96 L 76 104 C 76 106 70 108 50 108 C 30 108 24 106 24 104 Z"
          fill="#111111"
        />

        {/* Base Highlight Lines */}
        <ellipse cx="50" cy="96" rx="20" ry="1.5" fill="#FFFFFF" opacity="0.6" />
        <ellipse cx="50" cy="104" rx="22" ry="1.8" fill="#FFFFFF" opacity="0.4" />
      </svg>

      {/* Optional Notification Badge */}
      {showBadge && (
        <span className="absolute -top-1 -right-1 flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FA4D14] opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-[#FA4D14] border-2 border-white"></span>
        </span>
      )}
    </div>
  );
};

interface SportziconFullLogoProps {
  className?: string;
  theme?: 'dark' | 'light';
  size?: 'sm' | 'md' | 'lg';
  showSubtitle?: boolean;
}

export const SportziconFullLogo: React.FC<SportziconFullLogoProps> = ({
  className = '',
  theme = 'dark',
  size = 'md',
  showSubtitle = true,
}) => {
  const iconSizes = {
    sm: 'sm' as const,
    md: 'md' as const,
    lg: 'lg' as const,
  };

  const textSizes = {
    sm: 'text-xl sm:text-2xl',
    md: 'text-2xl sm:text-3xl',
    lg: 'text-4xl sm:text-5xl',
  };

  const subtitleSizes = {
    sm: 'text-[9px] tracking-[0.25em]',
    md: 'text-[10px] sm:text-[11px] tracking-[0.3em]',
    lg: 'text-xs sm:text-sm tracking-[0.35em]',
  };

  const textColor = theme === 'dark' ? 'text-white' : 'text-[#111111]';
  const subtitleColor = theme === 'dark' ? 'text-slate-400' : 'text-[#64748B]';

  return (
    <div className={`inline-flex items-center space-x-3 select-none ${className}`}>
      {/* Torch Icon */}
      <SportziconIcon size={iconSizes[size]} />

      {/* Wordmark & Subtitle */}
      <div className="flex flex-col">
        <div className={`font-sans italic font-extrabold tracking-tight ${textSizes[size]} ${textColor} leading-none flex items-center`}>
          <span>sportz</span>
          <span className="text-[#E04E26] relative ml-0.5">
            ícon
          </span>
        </div>
        {showSubtitle && (
          <span className={`font-sans font-bold uppercase ${subtitleColor} ${subtitleSizes[size]} mt-1`}>
            EST. 2026
          </span>
        )}
      </div>
    </div>
  );
};

