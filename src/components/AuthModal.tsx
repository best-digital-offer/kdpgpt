import React, { useState } from 'react';
import { 
  X, 
  Mail, 
  Lock, 
  User, 
  CheckCircle2, 
  ArrowRight, 
  ShieldCheck, 
  Sparkles,
  RefreshCw,
  LogOut,
  Building
} from 'lucide-react';
import { UserProfile } from '../types';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: UserProfile;
  onAuthSuccess: (user: Partial<UserProfile>) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  onAuthSuccess,
}) => {
  const [tab, setTab] = useState<'login' | 'signup' | 'reset' | 'profile'>('login');
  
  // Login / Signup Form State
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [penName, setPenName] = useState(currentUser.name || '');
  const [authorBio, setAuthorBio] = useState('Bestselling indie author specializing in coloring and activity books on Amazon KDP.');
  const [resetSent, setResetSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    // Simulate authentication call
    setTimeout(() => {
      setLoading(false);
      const userDisplay = name || email.split('@')[0] || 'KDP Publisher';
      onAuthSuccess({
        id: `user_${Date.now()}`,
        email: email || 'author@kdpgpt.com',
        name: userDisplay,
        avatarUrl: `https://api.dicebear.com/7.x/bottts/svg?seed=${userDisplay}`,
      });
      setMessage(`Welcome back, ${userDisplay}!`);
      setTimeout(() => {
        onClose();
      }, 800);
    }, 600);
  };

  const handleGoogleLogin = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onAuthSuccess({
        id: 'user_google_99',
        email: 'creator.google@gmail.com',
        name: 'Google Author',
        avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
      });
      setMessage('Successfully authenticated with Google!');
      setTimeout(() => {
        onClose();
      }, 700);
    }, 500);
  };

  const handlePasswordReset = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setResetSent(true);
    }, 600);
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    onAuthSuccess({
      name: penName,
    });
    setMessage('Profile imprint preferences saved!');
    setTimeout(() => setMessage(null), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-slate-200 dark:border-slate-800 relative animate-in zoom-in-95">
        
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-slate-400 hover:text-slate-600 dark:hover:text-white rounded-full transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Tab Headers */}
        <div className="flex items-center space-x-1 border-b border-slate-100 dark:border-slate-800 pb-3 mb-6">
          <button
            onClick={() => { setTab('login'); setMessage(null); }}
            className={`pb-1 px-2.5 text-xs font-bold transition border-b-2 ${
              tab === 'login'
                ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400'
                : 'border-transparent text-slate-500 hover:text-slate-700'
            }`}
          >
            Sign In
          </button>
          <button
            onClick={() => { setTab('signup'); setMessage(null); }}
            className={`pb-1 px-2.5 text-xs font-bold transition border-b-2 ${
              tab === 'signup'
                ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400'
                : 'border-transparent text-slate-500 hover:text-slate-700'
            }`}
          >
            Create Account
          </button>
          <button
            onClick={() => { setTab('profile'); setMessage(null); }}
            className={`pb-1 px-2.5 text-xs font-bold transition border-b-2 ${
              tab === 'profile'
                ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400'
                : 'border-transparent text-slate-500 hover:text-slate-700'
            }`}
          >
            User Profile
          </button>
        </div>

        {message && (
          <div className="mb-4 p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 text-xs flex items-center space-x-2">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>{message}</span>
          </div>
        )}

        {/* TAB 1: LOGIN */}
        {tab === 'login' && (
          <div className="space-y-4">
            <div className="space-y-1">
              <h3 className="font-display font-bold text-xl text-slate-900 dark:text-white">
                Welcome to KDP GPT
              </h3>
              <p className="text-xs text-slate-500">Sign in to sync your Amazon KDP books and projects at kdpgpt.com.</p>
            </div>

            {/* Google Sign-in */}
            <button
              onClick={handleGoogleLogin}
              disabled={loading}
              className="w-full py-2.5 px-4 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-xs font-bold flex items-center justify-center space-x-2 transition"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
              </svg>
              <span>Continue with Google</span>
            </button>

            <div className="flex items-center my-3">
              <div className="flex-1 border-t border-slate-200 dark:border-slate-800" />
              <span className="px-3 text-[10px] uppercase font-bold text-slate-400">or with email</span>
              <div className="flex-1 border-t border-slate-200 dark:border-slate-800" />
            </div>

            <form onSubmit={handleEmailAuth} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Email</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="author@kdp.com"
                    className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Password</label>
                  <button
                    type="button"
                    onClick={() => setTab('reset')}
                    className="text-[11px] text-indigo-600 dark:text-indigo-400 hover:underline font-medium"
                  >
                    Forgot Password?
                  </button>
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition flex items-center justify-center space-x-1.5 shadow-sm"
              >
                {loading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <span>Sign In to KDP GPT</span>}
              </button>
            </form>
          </div>
        )}

        {/* TAB 2: SIGN UP */}
        {tab === 'signup' && (
          <div className="space-y-4">
            <div className="space-y-1">
              <h3 className="font-display font-bold text-xl text-slate-900 dark:text-white">
                Create Publisher Account
              </h3>
              <p className="text-xs text-slate-500">Free starter includes 3 book generations per day.</p>
            </div>

            <form onSubmit={handleEmailAuth} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Full Name</label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Sarah Jenkins"
                    className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Email</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="sarah@author.com"
                    className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Password</label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="At least 8 characters"
                    className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition flex items-center justify-center space-x-1.5 shadow-sm"
              >
                {loading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <span>Start Creating Books Free</span>}
              </button>
            </form>
          </div>
        )}

        {/* TAB 3: RESET PASSWORD */}
        {tab === 'reset' && (
          <div className="space-y-4">
            <div className="space-y-1">
              <h3 className="font-display font-bold text-xl text-slate-900 dark:text-white">
                Reset Password
              </h3>
              <p className="text-xs text-slate-500">We'll email you a secure link to reset your credentials.</p>
            </div>

            {resetSent ? (
              <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 text-center space-y-2">
                <CheckCircle2 className="w-8 h-8 text-emerald-500 mx-auto" />
                <h4 className="font-bold text-xs text-emerald-800 dark:text-emerald-200">Reset Link Sent!</h4>
                <p className="text-[11px] text-slate-500">Check your inbox for instructions to set a new password.</p>
                <button
                  onClick={() => { setTab('login'); setResetSent(false); }}
                  className="mt-2 text-xs font-bold text-indigo-600 hover:underline"
                >
                  Return to Sign In
                </button>
              </div>
            ) : (
              <form onSubmit={handlePasswordReset} className="space-y-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Email</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your-email@kdp.com"
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white"
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition flex items-center justify-center space-x-1.5"
                >
                  {loading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <span>Send Reset Instructions</span>}
                </button>
              </form>
            )}
          </div>
        )}

        {/* TAB 4: USER PROFILE & IMPRINT */}
        {tab === 'profile' && (
          <div className="space-y-4">
            <div className="space-y-1">
              <h3 className="font-display font-bold text-xl text-slate-900 dark:text-white">
                Author & Imprint Profile
              </h3>
              <p className="text-xs text-slate-500">Configure default pen names and imprint details for KDP covers.</p>
            </div>

            <form onSubmit={handleSaveProfile} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Primary Pen Name / Imprint
                </label>
                <input
                  type="text"
                  value={penName}
                  onChange={(e) => setPenName(e.target.value)}
                  placeholder="e.g. Aura Bloom Publishing"
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Amazon Author Bio
                </label>
                <textarea
                  rows={3}
                  value={authorBio}
                  onChange={(e) => setAuthorBio(e.target.value)}
                  className="w-full p-2.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white"
                />
              </div>

              <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 text-xs flex items-center justify-between">
                <div>
                  <div className="font-bold text-slate-900 dark:text-white">Daily Generative Quota</div>
                  <div className="text-[11px] text-slate-400">
                    {currentUser.plan === 'free' ? `${currentUser.dailyGenerationsLeft} of 3 free credits left` : 'Unlimited Pro Access'}
                  </div>
                </div>
                <span className="capitalize font-bold text-indigo-600 dark:text-indigo-400 text-xs">
                  {currentUser.plan}
                </span>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition shadow-sm"
              >
                Save Author Settings
              </button>
            </form>
          </div>
        )}

      </div>
    </div>
  );
};
