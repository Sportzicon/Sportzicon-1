import React, { useState } from 'react';
import { UserRoleMode, UserSession } from '../types';
import { SportziconIcon } from './SportziconIcon';
import { 
  Lock, 
  Mail, 
  User, 
  Building2, 
  Phone, 
  ShieldCheck, 
  ArrowRight, 
  CheckCircle2, 
  Eye, 
  EyeOff, 
  Sparkles, 
  KeyRound, 
  Award, 
  UserCheck, 
  Search, 
  ChevronRight,
  AlertCircle,
  X
} from 'lucide-react';

interface LoginPageProps {
  userSession: UserSession | null;
  onLoginSuccess: (session: UserSession) => void;
  onLogout: () => void;
  setActiveTab: (tab: any) => void;
  userRole: UserRoleMode;
  setUserRole: (role: UserRoleMode) => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({
  userSession,
  onLoginSuccess,
  onLogout,
  setActiveTab,
  userRole,
  setUserRole,
}) => {
  const [authMode, setAuthMode] = useState<'signin' | 'signup' | 'otp'>('signin');
  const [selectedRole, setSelectedRole] = useState<UserRoleMode>(userRole || 'athlete');
  
  // Form fields
  const [emailOrId, setEmailOrId] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  
  // Signup extra fields
  const [fullName, setFullName] = useState('');
  const [organization, setOrganization] = useState('');
  const [phone, setPhone] = useState('');
  
  // OTP flow state
  const [otpSent, setOtpSent] = useState(false);
  const [otpCode, setOtpCode] = useState(['', '', '', '', '', '']);
  const [otpTimer, setOtpTimer] = useState(45);
  
  // UI messaging
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [forgotPasswordModalOpen, setForgotPasswordModalOpen] = useState(false);
  const [resetEmailSent, setResetEmailSent] = useState(false);
  const [resetEmailInput, setResetEmailInput] = useState('');

  // Demo Accounts Preset
  const DEMO_ACCOUNTS = [
    {
      role: 'athlete' as UserRoleMode,
      name: 'Rohan Verma',
      email: 'rohan.verma@sportzicon.com',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
      sportziconId: 'SZ-2026-8891',
      primaryRole: 'Right-Arm Fast Bowler',
      organization: 'Apex Cricket Academy',
      phone: '+91 98765 43210',
      verified: true,
      tag: 'Verified Athlete (Bowler)',
    },
    {
      role: 'academy' as UserRoleMode,
      name: 'Apex Cricket Academy',
      email: 'recruitment@apexcricket.org',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
      sportziconId: 'SZ-ACAD-042',
      primaryRole: 'Academy Recruiter & Head Coach',
      organization: 'Apex Sports Infrastructure',
      phone: '+91 91234 56789',
      verified: true,
      tag: 'Verified Academy Director',
    },
    {
      role: 'scout' as UserRoleMode,
      name: 'Marcus Vance',
      email: 'marcus.vance@scoutnet.org',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
      sportziconId: 'SZ-SCT-901',
      primaryRole: 'Certified Senior Selector',
      organization: 'Indian Talent Identification Board',
      phone: '+91 99887 76655',
      verified: true,
      tag: 'IPL & Domestic Scout',
    },
    {
      role: 'organizer' as UserRoleMode,
      name: 'Maharashtra Cricket Assoc.',
      email: 'tournaments@mca-cricket.org',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
      sportziconId: 'SZ-ORG-108',
      primaryRole: 'State Tournament Director',
      organization: 'Maharashtra Cricket Association',
      phone: '+91 97654 32100',
      verified: true,
      tag: 'Official State Board',
    },
  ];

  const handleDemoSignIn = (account: typeof DEMO_ACCOUNTS[0]) => {
    setLoading(true);
    setErrorMessage('');
    setTimeout(() => {
      const newSession: UserSession = {
        id: account.sportziconId,
        name: account.name,
        email: account.email,
        role: account.role,
        avatar: account.avatar,
        organization: account.organization,
        sportziconId: account.sportziconId,
        verified: account.verified,
        phone: account.phone,
        primaryRole: account.primaryRole,
      };
      setUserRole(account.role);
      onLoginSuccess(newSession);
      setLoading(false);
      setActiveTab('home');
    }, 600);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (authMode === 'signin') {
      if (!emailOrId) {
        setErrorMessage('Please enter your Sportzicon ID or Email');
        return;
      }
      if (!password) {
        setErrorMessage('Please enter your account password');
        return;
      }

      setLoading(true);
      setTimeout(() => {
        // Create session based on inputs
        const isEmail = emailOrId.includes('@');
        const defaultName = isEmail 
          ? emailOrId.split('@')[0].replace('.', ' ').replace(/^./, str => str.toUpperCase())
          : 'Verified Sportzicon User';

        const newSession: UserSession = {
          id: 'sz-usr-' + Math.floor(100000 + Math.random() * 900000),
          name: defaultName,
          email: isEmail ? emailOrId : `${emailOrId.toLowerCase()}@sportzicon.com`,
          role: selectedRole,
          avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=400&q=80',
          organization: selectedRole === 'athlete' ? 'Registered State Athlete' : 'Sportzicon Network Member',
          sportziconId: emailOrId.startsWith('SZ-') ? emailOrId : `SZ-2026-${Math.floor(1000 + Math.random() * 9000)}`,
          verified: true,
          phone: '+91 98765 00000',
          primaryRole: selectedRole === 'athlete' ? 'Verified Talent' : selectedRole === 'academy' ? 'Academy Administrator' : selectedRole === 'scout' ? 'Talent Evaluator' : 'Tournament Official',
        };

        setUserRole(selectedRole);
        onLoginSuccess(newSession);
        setLoading(false);
        setActiveTab('home');
      }, 700);

    } else if (authMode === 'signup') {
      if (!fullName) {
        setErrorMessage('Please enter your full name');
        return;
      }
      if (!emailOrId) {
        setErrorMessage('Please enter a valid email address');
        return;
      }
      if (!password || password.length < 6) {
        setErrorMessage('Password must be at least 6 characters');
        return;
      }

      setLoading(true);
      setTimeout(() => {
        const newSession: UserSession = {
          id: 'sz-usr-' + Math.floor(100000 + Math.random() * 900000),
          name: fullName,
          email: emailOrId,
          role: selectedRole,
          avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=400&q=80',
          organization: organization || (selectedRole === 'athlete' ? 'Independent Athlete' : 'Sportzicon Network'),
          sportziconId: `SZ-2026-${Math.floor(1000 + Math.random() * 9000)}`,
          verified: true,
          phone: phone || '+91 90000 00000',
          primaryRole: selectedRole === 'athlete' ? 'Registered Athlete' : selectedRole === 'academy' ? 'Academy Member' : selectedRole === 'scout' ? 'Regional Scout' : 'Tournament Official',
        };

        setUserRole(selectedRole);
        onLoginSuccess(newSession);
        setLoading(false);
        setActiveTab('home');
      }, 800);

    } else if (authMode === 'otp') {
      if (!otpSent) {
        if (!phone || phone.length < 10) {
          setErrorMessage('Please enter a valid 10-digit mobile number');
          return;
        }
        setLoading(true);
        setTimeout(() => {
          setOtpSent(true);
          setLoading(false);
        }, 600);
      } else {
        const code = otpCode.join('');
        if (code.length < 6) {
          setErrorMessage('Please enter the full 6-digit verification code sent to your phone');
          return;
        }
        setLoading(true);
        setTimeout(() => {
          const newSession: UserSession = {
            id: 'sz-otp-' + Math.floor(100000 + Math.random() * 900000),
            name: 'Mobile Verified Athlete',
            email: `user.${phone.slice(-4)}@sportzicon.com`,
            role: selectedRole,
            avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
            organization: 'Verified Mobile User',
            sportziconId: `SZ-MOB-${phone.slice(-4)}`,
            verified: true,
            phone: phone.startsWith('+91') ? phone : `+91 ${phone}`,
            primaryRole: 'OTP Verified Member',
          };
          setUserRole(selectedRole);
          onLoginSuccess(newSession);
          setLoading(false);
          setActiveTab('home');
        }, 700);
      }
    }
  };

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) value = value.slice(-1);
    const newCode = [...otpCode];
    newCode[index] = value;
    setOtpCode(newCode);

    // Auto-advance
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-input-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  const handleSendResetLink = (e: React.FormEvent) => {
    e.preventDefault();
    if (!resetEmailInput) return;
    setResetEmailSent(true);
    setTimeout(() => {
      setForgotPasswordModalOpen(false);
      setResetEmailSent(false);
      setResetEmailInput('');
      alert('Password reset link sent to ' + resetEmailInput);
    }, 1200);
  };

  return (
    <div className="min-h-[85vh] flex flex-col justify-center py-6 px-2 sm:px-4 lg:px-8 text-left">
      
      {/* Top Welcome Title Header */}
      <div className="max-w-md w-full mx-auto text-center space-y-3 mb-6">
        <div className="inline-flex items-center space-x-3 bg-[#0F172A] px-4 py-2 rounded-2xl border border-[#1E293B] shadow-md">
          <SportziconIcon size="md" showBadge={false} />
          <div className="flex flex-col text-left">
            <span className="font-heading text-2xl font-extrabold tracking-tight text-white italic leading-none">
              sportz<span className="text-[#E04E26]">ícon</span>
            </span>
            <span className="text-overline text-slate-400 mt-0.5">
              EST. 2026
            </span>
          </div>
        </div>

        <div>
          <div className="text-overline text-[#FA4D14] mb-1">Ecosystem Authentication</div>
          <h1 className="text-h1 text-[#0F172A]">
            {userSession ? 'Your Sportzicon Account' : authMode === 'signin' ? 'Sign In to Your Account' : authMode === 'signup' ? 'Create Your Verified Profile' : 'Mobile OTP Authentication'}
          </h1>
        </div>
        <p className="text-body text-[#64748B] max-w-[65ch] mx-auto">
          {userSession 
            ? 'You are currently authenticated in the Sportzicon Ecosystem.' 
            : 'Sportzicon is a place where talent can be seen — an ecosystem connecting every individual directly to their sport.'}
        </p>
      </div>

      {/* If Already Logged In Card */}
      {userSession ? (
        <div className="max-w-xl w-full mx-auto bg-white rounded-3xl border border-[#E2E8F0] shadow-xl p-6 sm:p-8 space-y-6">
          <div className="flex items-center space-x-4 bg-[#0F172A] text-white p-5 rounded-2xl border border-[#1E293B]">
            <img 
              src={userSession.avatar} 
              alt={userSession.name} 
              className="w-16 h-16 rounded-2xl object-cover border-2 border-[#FA4D14]" 
            />
            <div className="space-y-1 flex-1">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold text-white font-oswald">{userSession.name}</h2>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-[#FA4D14] text-white uppercase">
                  {userSession.role}
                </span>
              </div>
              <p className="text-xs text-slate-300 font-mono">{userSession.email}</p>
              <p className="text-xs text-[#FA4D14] font-semibold flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" /> ID: {userSession.sportziconId} • {userSession.primaryRole}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="bg-[#FAF7F2] p-3.5 rounded-xl border border-[#E2E8F0]">
              <span className="text-slate-500 font-mono text-[10px] uppercase block">Organization / Club</span>
              <span className="font-bold text-[#0F172A]">{userSession.organization || 'Verified Sportzicon Pool'}</span>
            </div>
            <div className="bg-[#FAF7F2] p-3.5 rounded-xl border border-[#E2E8F0]">
              <span className="text-slate-500 font-mono text-[10px] uppercase block">Verification Status</span>
              <span className="font-bold text-emerald-600 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> Verified Ecosystem Pass
              </span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button
              onClick={() => setActiveTab('home')}
              className="flex-1 py-3 px-4 rounded-xl bg-[#FA4D14] hover:bg-[#D83000] text-white font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center space-x-2 cursor-pointer shadow-md"
            >
              <span>Go to Ecosystem Dashboard</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={onLogout}
              className="py-3 px-5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs uppercase tracking-wider transition-all border border-slate-300 cursor-pointer"
            >
              Sign Out
            </button>
          </div>
        </div>
      ) : (
        /* Main Login / Register Auth Card */
        <div className="max-w-xl w-full mx-auto bg-white rounded-3xl border border-[#E2E8F0] shadow-2xl overflow-hidden">
          
          {/* Auth Navigation Mode Tabs */}
          <div className="bg-[#0F172A] p-2 flex items-center justify-between border-b border-[#1E293B]">
            <div className="grid grid-cols-3 w-full gap-1 p-1 bg-[#1E293B] rounded-2xl">
              <button
                type="button"
                onClick={() => { setAuthMode('signin'); setErrorMessage(''); }}
                className={`py-2 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center space-x-1.5 ${
                  authMode === 'signin'
                    ? 'bg-[#FA4D14] text-white shadow-md'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                <KeyRound className="w-3.5 h-3.5" />
                <span>Sign In</span>
              </button>

              <button
                type="button"
                onClick={() => { setAuthMode('signup'); setErrorMessage(''); }}
                className={`py-2 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center space-x-1.5 ${
                  authMode === 'signup'
                    ? 'bg-[#FA4D14] text-white shadow-md'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Register</span>
              </button>

              <button
                type="button"
                onClick={() => { setAuthMode('otp'); setErrorMessage(''); }}
                className={`py-2 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center space-x-1.5 ${
                  authMode === 'otp'
                    ? 'bg-[#FA4D14] text-white shadow-md'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Phone OTP</span>
              </button>
            </div>
          </div>

          <div className="p-6 sm:p-8 space-y-6">

            {/* Role Mode Selector Pill Bar */}
            <div className="space-y-2">
              <label className="text-xs font-mono font-bold text-slate-700 uppercase tracking-wider block">
                Select Stakeholder Account Type:
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedRole('athlete')}
                  className={`p-2.5 rounded-xl text-xs font-bold border transition-all flex flex-col items-center justify-center space-y-1 cursor-pointer ${
                    selectedRole === 'athlete'
                      ? 'bg-[#0F172A] text-white border-[#FA4D14] shadow-sm'
                      : 'bg-[#FAF7F2] text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <Award className="w-4 h-4 text-[#FA4D14]" />
                  <span>Athlete</span>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedRole('academy')}
                  className={`p-2.5 rounded-xl text-xs font-bold border transition-all flex flex-col items-center justify-center space-y-1 cursor-pointer ${
                    selectedRole === 'academy' || selectedRole === 'club'
                      ? 'bg-[#0F172A] text-white border-[#FA4D14] shadow-sm'
                      : 'bg-[#FAF7F2] text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <Building2 className="w-4 h-4 text-[#FA4D14]" />
                  <span>Academy</span>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedRole('scout')}
                  className={`p-2.5 rounded-xl text-xs font-bold border transition-all flex flex-col items-center justify-center space-y-1 cursor-pointer ${
                    selectedRole === 'scout'
                      ? 'bg-[#0F172A] text-white border-[#FA4D14] shadow-sm'
                      : 'bg-[#FAF7F2] text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <Search className="w-4 h-4 text-[#FA4D14]" />
                  <span>Scout</span>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedRole('organizer')}
                  className={`p-2.5 rounded-xl text-xs font-bold border transition-all flex flex-col items-center justify-center space-y-1 cursor-pointer ${
                    selectedRole === 'organizer' || selectedRole === 'scorer'
                      ? 'bg-[#0F172A] text-white border-[#FA4D14] shadow-sm'
                      : 'bg-[#FAF7F2] text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <UserCheck className="w-4 h-4 text-[#FA4D14]" />
                  <span>Organizer</span>
                </button>
              </div>
            </div>

            {/* Error Banner */}
            {errorMessage && (
              <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-semibold flex items-center space-x-2 animate-fadeIn">
                <AlertCircle className="w-4 h-4 text-red-500 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* AUTH FORM */}
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Full Name for Signup */}
              {authMode === 'signup' && (
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 flex items-center space-x-1">
                    <User className="w-3.5 h-3.5 text-slate-500" />
                    <span>Full Name</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Rohan Verma"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:border-[#FA4D14] focus:ring-1 focus:ring-[#FA4D14] text-xs font-medium text-slate-900 bg-white"
                  />
                </div>
              )}

              {/* Email or Sportzicon ID */}
              {authMode !== 'otp' && (
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 flex items-center space-x-1">
                    <Mail className="w-3.5 h-3.5 text-slate-500" />
                    <span>{authMode === 'signin' ? 'Sportzicon ID or Email Address' : 'Official Email Address'}</span>
                  </label>
                  <input
                    type={authMode === 'signin' ? 'text' : 'email'}
                    required
                    value={emailOrId}
                    onChange={(e) => setEmailOrId(e.target.value)}
                    placeholder={authMode === 'signin' ? 'SZ-2026-8891 or athlete@sportzicon.com' : 'you@example.com'}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:border-[#FA4D14] focus:ring-1 focus:ring-[#FA4D14] text-xs font-medium text-slate-900 bg-white"
                  />
                </div>
              )}

              {/* Organization / Club for Signup */}
              {authMode === 'signup' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700 flex items-center space-x-1">
                      <Building2 className="w-3.5 h-3.5 text-slate-500" />
                      <span>Academy / Club / State</span>
                    </label>
                    <input
                      type="text"
                      value={organization}
                      onChange={(e) => setOrganization(e.target.value)}
                      placeholder="e.g. Apex Cricket Academy"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:border-[#FA4D14] focus:ring-1 focus:ring-[#FA4D14] text-xs font-medium text-slate-900 bg-white"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700 flex items-center space-x-1">
                      <Phone className="w-3.5 h-3.5 text-slate-500" />
                      <span>Mobile Number (+91)</span>
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 98765 43210"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:border-[#FA4D14] focus:ring-1 focus:ring-[#FA4D14] text-xs font-medium text-slate-900 bg-white"
                    />
                  </div>
                </div>
              )}

              {/* Password Field */}
              {authMode !== 'otp' && (
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-slate-700 flex items-center space-x-1">
                      <Lock className="w-3.5 h-3.5 text-slate-500" />
                      <span>Password</span>
                    </label>
                    {authMode === 'signin' && (
                      <button
                        type="button"
                        onClick={() => setForgotPasswordModalOpen(true)}
                        className="text-xs font-bold text-[#FA4D14] hover:underline cursor-pointer"
                      >
                        Forgot Password?
                      </button>
                    )}
                  </div>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••••••"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:border-[#FA4D14] focus:ring-1 focus:ring-[#FA4D14] text-xs font-medium text-slate-900 bg-white pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              )}

              {/* OTP FLOW */}
              {authMode === 'otp' && (
                <div className="space-y-4">
                  {!otpSent ? (
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-700 flex items-center space-x-1">
                        <Phone className="w-3.5 h-3.5 text-slate-500" />
                        <span>Registered Mobile Number (+91)</span>
                      </label>
                      <div className="flex space-x-2">
                        <span className="px-3 py-2.5 bg-slate-100 border border-slate-300 rounded-xl text-xs font-mono font-bold text-slate-700">
                          +91
                        </span>
                        <input
                          type="tel"
                          required
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="98765 43210"
                          className="flex-1 px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:border-[#FA4D14] text-xs font-medium text-slate-900"
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-3 bg-[#FAF7F2] p-4 rounded-2xl border border-slate-200">
                      <div className="flex items-center justify-between text-xs font-bold text-slate-700">
                        <span>Enter 6-digit OTP code sent to +91 {phone}</span>
                        <button
                          type="button"
                          onClick={() => setOtpSent(false)}
                          className="text-[#FA4D14] hover:underline"
                        >
                          Change Number
                        </button>
                      </div>

                      <div className="flex justify-between gap-2">
                        {otpCode.map((digit, idx) => (
                          <input
                            key={idx}
                            id={`otp-input-${idx}`}
                            type="text"
                            maxLength={1}
                            value={digit}
                            onChange={(e) => handleOtpChange(idx, e.target.value)}
                            className="w-10 h-12 text-center text-lg font-mono font-bold rounded-xl border border-slate-300 focus:border-[#FA4D14] focus:ring-1 focus:ring-[#FA4D14] bg-white text-slate-900"
                          />
                        ))}
                      </div>

                      <div className="text-center text-[11px] text-slate-500 font-mono">
                        Resend OTP in <span className="font-bold text-[#FA4D14]">00:{otpTimer < 10 ? `0${otpTimer}` : otpTimer}</span>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Checkboxes & Remember Me */}
              {authMode === 'signin' && (
                <div className="flex items-center justify-between text-xs">
                  <label className="flex items-center space-x-2 cursor-pointer text-slate-600 font-medium">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="rounded text-[#FA4D14] focus:ring-[#FA4D14]"
                    />
                    <span>Remember my pass on this device</span>
                  </label>
                </div>
              )}

              {/* Submit CTA Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 px-4 rounded-xl bg-[#FA4D14] hover:bg-[#D83000] text-white font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center space-x-2 cursor-pointer shadow-lg hover:shadow-xl disabled:opacity-50"
              >
                {loading ? (
                  <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                ) : (
                  <>
                    <span>
                      {authMode === 'signin' 
                        ? 'Sign In to Sportzicon' 
                        : authMode === 'signup' 
                        ? 'Create Verified Account' 
                        : !otpSent ? 'Send OTP Code' : 'Verify & Sign In'}
                    </span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

            </form>

            {/* Social Logins Divider */}
            <div className="relative py-2">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200"></div>
              </div>
              <div className="relative flex justify-center text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 bg-white px-3">
                Or Quick Demo Accounts
              </div>
            </div>

            {/* Demo Quick Fill Accounts Selector */}
            <div className="space-y-2">
              <span className="text-[11px] font-bold text-slate-600 block text-center">
                Instant 1-Click Ecosystem Test Profiles:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {DEMO_ACCOUNTS.map((acc, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleDemoSignIn(acc)}
                    className="p-2.5 rounded-xl border border-slate-200 bg-[#FAF7F2] hover:bg-white hover:border-[#FA4D14] transition-all flex items-center space-x-3 text-left cursor-pointer group shadow-sm"
                  >
                    <img 
                      src={acc.avatar} 
                      alt={acc.name} 
                      className="w-9 h-9 rounded-lg object-cover border border-slate-300 shrink-0" 
                    />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-[#0F172A] truncate group-hover:text-[#FA4D14]">
                          {acc.name}
                        </span>
                        <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#FA4D14] group-hover:translate-x-0.5 transition-transform" />
                      </div>
                      <span className="text-[10px] text-slate-500 font-mono block truncate">
                        {acc.tag}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Security Guarantee Footnote */}
            <div className="pt-2 flex items-center justify-center space-x-2 text-[11px] text-slate-500 font-medium">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Official Sportzicon Sports Recruitment & Verification Gateway</span>
            </div>

          </div>
        </div>
      )}

      {/* Forgot Password Modal */}
      {forgotPasswordModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl border border-slate-200 max-w-md w-full p-6 space-y-4 relative shadow-2xl animate-scaleUp">
            <button
              onClick={() => setForgotPasswordModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1 rounded-full hover:bg-slate-100 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center space-x-3">
              <div className="p-3 bg-[#FA4D14]/10 text-[#FA4D14] rounded-2xl">
                <KeyRound className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-[#0F172A] font-oswald">Reset Your Password</h3>
                <p className="text-xs text-slate-500 font-medium">Enter your email address to receive a secure recovery link.</p>
              </div>
            </div>

            <form onSubmit={handleSendResetLink} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Official Email</label>
                <input
                  type="email"
                  required
                  value={resetEmailInput}
                  onChange={(e) => setResetEmailInput(e.target.value)}
                  placeholder="athlete@mca-cricket.org"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:border-[#FA4D14] text-xs font-medium"
                />
              </div>

              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setForgotPasswordModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-slate-300 text-xs font-bold text-slate-700 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-[#FA4D14] hover:bg-[#D83000] text-white text-xs font-bold uppercase tracking-wider"
                >
                  Send Recovery Link
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
