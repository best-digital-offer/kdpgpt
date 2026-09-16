import React, { useState } from 'react';
import { 
  BookOpen, 
  Sparkles, 
  Compass, 
  Puzzle, 
  Palette, 
  Layers, 
  ShoppingCart, 
  FolderGit2, 
  TrendingUp, 
  ShieldCheck, 
  Sun, 
  Moon, 
  Zap, 
  User, 
  LogOut, 
  Crown,
  ChevronDown
} from 'lucide-react';
import { UserProfile, SubscriptionTier } from '../types';

interface NavbarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  user: UserProfile;
  darkMode: boolean;
  setDarkMode: (val: boolean) => void;
  onOpenBilling: () => void;
  onOpenAuth: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  setCurrentTab,
  user,
  darkMode,
  setDarkMode,
  onOpenBilling,
  onOpenAuth,
}) => {
  const [profileOpen, setProfileOpen] = useState(false);

  const navItems = [
    { id: 'studio', label: 'Studio Wizard', icon: Sparkles },
    { id: 'niches', label: 'Niche & Keywords', icon: Compass },
    { id: 'puzzles', label: 'Puzzle Lab', icon: Puzzle },
    { id: 'coloring', label: 'Coloring Studio', icon: Palette },
    { id: 'covers', label: 'Cover & Spine', icon: Layers },
    { id: 'amazon', label: 'Amazon Optimizer', icon: ShoppingCart },
    { id: 'review', label: 'Content Review', icon: ShieldCheck },
    { id: 'library', label: 'My Books', icon: BookOpen },
    { id: 'marketing', label: 'Affiliates', icon: TrendingUp },
    { id: 'admin', label: 'Admin', icon: ShieldCheck },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
        
        {/* Brand Logo */}
        <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setCurrentTab('studio')}>
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-purple-500 flex items-center justify-center text-white shadow-md shadow-indigo-500/20">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center space-x-1.5">
              <span className="font-display font-extrabold text-xl tracking-tight text-slate-900 dark:text-white">
                KDP <span className="text-indigo-600 dark:text-indigo-400">GPT</span>
              </span>
              <span className="px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-indigo-100 text-indigo-700 dark:bg-indigo-950/80 dark:text-indigo-300 rounded">
                kdpgpt.com
              </span>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 hidden sm:block font-medium">
              AI Tools for KDP Publishers
            </p>
          </div>
        </div>

        {/* Center Nav Items */}
        <nav className="hidden lg:flex items-center space-x-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = currentTab === item.id;
            return (
              <button
                key={item.id}
                id={`nav-tab-${item.id}`}
                onClick={() => setCurrentTab(item.id)}
                className={`flex items-center space-x-1.5 px-3 py-2 text-xs font-semibold rounded-lg transition-all ${
                  active
                    ? 'bg-indigo-50 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300 shadow-sm'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${active ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-400'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Right Actions: Plan, Dark mode, Profile */}
        <div className="flex items-center space-x-2.5 sm:space-x-3">
          
          {/* Credits / Plan Status Pill */}
          <button
            id="btn-plan-status"
            onClick={onOpenBilling}
            className={`flex items-center space-x-1.5 px-2.5 py-1.5 rounded-full text-xs font-medium border transition-colors ${
              user.plan === 'free'
                ? 'bg-amber-50 text-amber-800 border-amber-200 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-800/60'
                : 'bg-emerald-50 text-emerald-800 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800/60'
            }`}
          >
            {user.plan === 'free' ? (
              <>
                <Zap className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                <span>{user.dailyGenerationsLeft}/3 left today</span>
                <span className="hidden sm:inline text-indigo-600 dark:text-indigo-400 font-bold ml-1 hover:underline">
                  Upgrade
                </span>
              </>
            ) : (
              <>
                <Crown className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                <span className="capitalize">{user.plan} Plan • Unlimited</span>
              </>
            )}
          </button>

          {/* Dark / Light Mode Toggle */}
          <button
            id="btn-theme-toggle"
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-lg text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            title="Toggle Theme"
          >
            {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-600" />}
          </button>

          {/* User Profile Dropdown */}
          <div className="relative">
            <button
              id="btn-user-avatar"
              onClick={() => setProfileOpen(!profileOpen)}
              className="flex items-center space-x-2 p-1 rounded-full hover:ring-2 hover:ring-indigo-400 transition"
            >
              <img
                src={user.avatarUrl}
                alt={user.name}
                className="w-8 h-8 rounded-full object-cover border border-slate-200 dark:border-slate-700"
              />
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden sm:block" />
            </button>

            {profileOpen && (
              <div 
                id="user-dropdown-menu"
                className="absolute right-0 mt-2 w-56 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-slate-200 dark:border-slate-700 py-2 z-50 animate-in fade-in slide-in-from-top-2"
                onMouseLeave={() => setProfileOpen(false)}
              >
                <div className="px-4 py-2 border-b border-slate-100 dark:border-slate-700/60">
                  <p className="text-xs font-semibold text-slate-900 dark:text-white truncate">{user.name}</p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">{user.email}</p>
                </div>
                <div className="py-1">
                  <button
                    onClick={() => { setCurrentTab('library'); setProfileOpen(false); }}
                    className="w-full text-left px-4 py-2 text-xs text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700/50 flex items-center space-x-2"
                  >
                    <BookOpen className="w-3.5 h-3.5 text-slate-400" />
                    <span>My Books ({user.totalBooksCreated})</span>
                  </button>
                  <button
                    onClick={() => { onOpenBilling(); setProfileOpen(false); }}
                    className="w-full text-left px-4 py-2 text-xs text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700/50 flex items-center space-x-2"
                  >
                    <Crown className="w-3.5 h-3.5 text-amber-500" />
                    <span>Subscription & Billing</span>
                  </button>
                  <button
                    onClick={() => { setCurrentTab('marketing'); setProfileOpen(false); }}
                    className="w-full text-left px-4 py-2 text-xs text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700/50 flex items-center space-x-2"
                  >
                    <TrendingUp className="w-3.5 h-3.5 text-emerald-500" />
                    <span>Affiliate Hub (${user.affiliateEarningsUSD.toFixed(2)})</span>
                  </button>
                  <button
                    onClick={() => { onOpenAuth(); setProfileOpen(false); }}
                    className="w-full text-left px-4 py-2 text-xs text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700/50 flex items-center space-x-2"
                  >
                    <User className="w-3.5 h-3.5 text-indigo-500" />
                    <span>Switch Account / Sign In</span>
                  </button>
                </div>
                <div className="pt-1 border-t border-slate-100 dark:border-slate-700/60">
                  <button
                    onClick={() => { onOpenAuth(); setProfileOpen(false); }}
                    className="w-full text-left px-4 py-2 text-xs text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 flex items-center space-x-2"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Sign Out</span>
                  </button>
                </div>
              </div>
            )}
          </div>

        </div>

      </div>

      {/* Mobile Navigation Scroll Row */}
      <div className="lg:hidden flex items-center space-x-2 px-4 py-2 overflow-x-auto border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = currentTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setCurrentTab(item.id)}
              className={`flex items-center space-x-1 px-2.5 py-1 text-xs font-medium rounded-md whitespace-nowrap ${
                active
                  ? 'bg-indigo-600 text-white'
                  : 'text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800'
              }`}
            >
              <Icon className="w-3 h-3" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>
    </header>
  );
};
