import React, { useState } from 'react';
import { 
  Shield, 
  Users, 
  DollarSign, 
  BarChart3, 
  Activity, 
  CheckCircle2, 
  AlertTriangle, 
  Search, 
  Filter,
  CreditCard,
  Zap,
  TrendingUp,
  Server
} from 'lucide-react';
import { UserProfile } from '../types';

interface AdminPanelProps {
  currentUser: UserProfile;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({ currentUser }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'users' | 'revenue'>('overview');
  const [searchFilter, setSearchFilter] = useState('');

  // Sample Admin State
  const [usersList, setUsersList] = useState([
    { id: 'u_1', email: 'elena.rostova@gmail.com', name: 'Elena Rostova', plan: 'pro', booksCount: 14, joined: '2026-03-01', status: 'Active' },
    { id: 'u_2', email: 'marcus.vance@pubstudio.co', name: 'Marcus Vance', plan: 'agency', booksCount: 48, joined: '2026-02-14', status: 'Active' },
    { id: 'u_3', email: 'chloe.kdp@outlook.com', name: 'Chloe Davies', plan: 'free', booksCount: 3, joined: '2026-03-12', status: 'Active' },
    { id: 'u_4', email: 'david.bestseller@gmail.com', name: 'David Lee', plan: 'pro', booksCount: 22, joined: '2026-01-20', status: 'Active' },
    { id: 'u_5', email: 'sophia.coloring@yahoo.com', name: 'Sophia Miller', plan: 'free', booksCount: 2, joined: '2026-03-15', status: 'Active' },
  ]);

  const filteredUsers = usersList.filter(
    (u) => u.name.toLowerCase().includes(searchFilter.toLowerCase()) || u.email.toLowerCase().includes(searchFilter.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-6">
        <div>
          <div className="flex items-center space-x-2 text-rose-600 dark:text-rose-400 font-bold text-xs uppercase tracking-wider mb-1">
            <Shield className="w-4 h-4" />
            <span>Platform Operations & Administration</span>
          </div>
          <h1 className="font-display text-3xl font-extrabold text-slate-900 dark:text-white">
            Admin Management Console
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Monitor platform MRR, subscriber churn, user accounts, and AI generation throughput.
          </p>
        </div>

        {/* Tab Toggle */}
        <div className="flex items-center p-1.5 bg-slate-100 dark:bg-slate-800 rounded-xl">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-3 py-1.5 text-xs font-bold rounded-lg transition ${
              activeTab === 'overview' ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-white shadow-xs' : 'text-slate-600 dark:text-slate-300'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab('users')}
            className={`px-3 py-1.5 text-xs font-bold rounded-lg transition ${
              activeTab === 'users' ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-white shadow-xs' : 'text-slate-600 dark:text-slate-300'
            }`}
          >
            User Accounts ({usersList.length})
          </button>
          <button
            onClick={() => setActiveTab('revenue')}
            className={`px-3 py-1.5 text-xs font-bold rounded-lg transition ${
              activeTab === 'revenue' ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-white shadow-xs' : 'text-slate-600 dark:text-slate-300'
            }`}
          >
            Stripe & PayPal Revenue
          </button>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xs">
          <div className="flex items-center justify-between text-slate-400 text-xs font-medium">
            <span>Monthly Recurring Revenue</span>
            <DollarSign className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="font-display font-black text-2xl text-slate-900 dark:text-white mt-2">$14,820</div>
          <div className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold mt-1 flex items-center space-x-1">
            <TrendingUp className="w-3 h-3" />
            <span>+24.5% vs last month</span>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xs">
          <div className="flex items-center justify-between text-slate-400 text-xs font-medium">
            <span>Active Subscribers</span>
            <Users className="w-4 h-4 text-indigo-500" />
          </div>
          <div className="font-display font-black text-2xl text-slate-900 dark:text-white mt-2">418</div>
          <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">364 Pro • 54 Agency</div>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xs">
          <div className="flex items-center justify-between text-slate-400 text-xs font-medium">
            <span>Books Generated (30d)</span>
            <BarChart3 className="w-4 h-4 text-amber-500" />
          </div>
          <div className="font-display font-black text-2xl text-slate-900 dark:text-white mt-2">3,492</div>
          <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">99.4% PDF compilation rate</div>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xs">
          <div className="flex items-center justify-between text-slate-400 text-xs font-medium">
            <span>AI Server Health</span>
            <Activity className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="font-display font-black text-2xl text-emerald-600 dark:text-emerald-400 mt-2">100% OK</div>
          <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">Gemini 2.5 Flash operational</div>
        </div>
      </div>

      {/* TAB: OVERVIEW */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* System Services Status */}
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm space-y-4">
            <h3 className="font-display font-bold text-base text-slate-900 dark:text-white flex items-center space-x-2">
              <Server className="w-4 h-4 text-indigo-500" />
              <span>Core Infrastructure Status</span>
            </h3>

            <div className="space-y-3">
              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-slate-900 dark:text-white">Gemini AI Model Proxy</div>
                  <div className="text-[11px] text-slate-400">Response latency ~420ms • Server-side secure</div>
                </div>
                <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center space-x-1">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>Healthy</span>
                </span>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-slate-900 dark:text-white">jsPDF Vector Compiler</div>
                  <div className="text-[11px] text-slate-400">Client-side 300 DPI engine • 0 server load</div>
                </div>
                <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center space-x-1">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>Optimal</span>
                </span>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-slate-900 dark:text-white">Stripe & PayPal Webhooks</div>
                  <div className="text-[11px] text-slate-400">Instant subscription provisioning listener</div>
                </div>
                <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center space-x-1">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>Connected</span>
                </span>
              </div>
            </div>
          </div>

          {/* Book Type Popularity */}
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm space-y-4">
            <h3 className="font-display font-bold text-base text-slate-900 dark:text-white flex items-center space-x-2">
              <BarChart3 className="w-4 h-4 text-indigo-500" />
              <span>Generation Breakdown by Niche</span>
            </h3>

            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-xs font-medium mb-1 text-slate-700 dark:text-slate-300">
                  <span>Adult & Children Coloring Books</span>
                  <span className="font-bold">44%</span>
                </div>
                <div className="w-full bg-slate-100 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
                  <div className="bg-indigo-600 h-full rounded-full" style={{ width: '44%' }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-medium mb-1 text-slate-700 dark:text-slate-300">
                  <span>Word Search & Sudoku Activity Books</span>
                  <span className="font-bold">28%</span>
                </div>
                <div className="w-full bg-slate-100 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
                  <div className="bg-emerald-500 h-full rounded-full" style={{ width: '28%' }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-medium mb-1 text-slate-700 dark:text-slate-300">
                  <span>Guided Journals & Gratitude Planners</span>
                  <span className="font-bold">16%</span>
                </div>
                <div className="w-full bg-slate-100 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
                  <div className="bg-amber-500 h-full rounded-full" style={{ width: '16%' }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-medium mb-1 text-slate-700 dark:text-slate-300">
                  <span>Children's Storybooks & Devotionals</span>
                  <span className="font-bold">12%</span>
                </div>
                <div className="w-full bg-slate-100 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
                  <div className="bg-rose-500 h-full rounded-full" style={{ width: '12%' }} />
                </div>
              </div>
            </div>
          </div>

        </div>
      )}

      {/* TAB: USERS */}
      {activeTab === 'users' && (
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="text"
                value={searchFilter}
                onChange={(e) => setSearchFilter(e.target.value)}
                placeholder="Search user by name or email..."
                className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 dark:bg-slate-900/60 text-slate-500 uppercase tracking-wider border-b border-slate-200 dark:border-slate-700">
                <tr>
                  <th className="py-3 px-4">User</th>
                  <th className="py-3 px-4">Current Plan</th>
                  <th className="py-3 px-4">Books Created</th>
                  <th className="py-3 px-4">Joined Date</th>
                  <th className="py-3 px-4">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-800 dark:text-slate-200">
                {filteredUsers.map((u) => (
                  <tr key={u.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/40 transition">
                    <td className="py-3 px-4">
                      <div className="font-bold">{u.name}</div>
                      <div className="text-[11px] text-slate-400">{u.email}</div>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                        u.plan === 'agency' ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300' :
                        u.plan === 'pro' ? 'bg-indigo-100 text-indigo-800 dark:bg-indigo-950 dark:text-indigo-300' :
                        'bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-300'
                      }`}>
                        {u.plan}
                      </span>
                    </td>
                    <td className="py-3 px-4 font-mono font-bold">{u.booksCount}</td>
                    <td className="py-3 px-4 text-slate-400">{u.joined}</td>
                    <td className="py-3 px-4">
                      <button
                        onClick={() => {
                          const nextPlan = u.plan === 'pro' ? 'agency' : u.plan === 'free' ? 'pro' : 'free';
                          setUsersList(usersList.map(item => item.id === u.id ? { ...item, plan: nextPlan } : item));
                        }}
                        className="text-xs text-indigo-600 dark:text-indigo-400 font-semibold hover:underline"
                      >
                        Cycle Plan
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB: REVENUE */}
      {activeTab === 'revenue' && (
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="font-display font-bold text-base text-slate-900 dark:text-white">
              Gateway Breakdown
            </h3>
            <span className="text-xs text-slate-400">Payout Period: Bi-weekly</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-xs text-indigo-600 dark:text-indigo-400">Stripe Connected</span>
                <CreditCard className="w-4 h-4 text-slate-400" />
              </div>
              <div className="font-display font-black text-2xl text-slate-900 dark:text-white">$10,480</div>
              <div className="text-[11px] text-slate-500">70.7% of all transaction volume</div>
            </div>

            <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-xs text-blue-600 dark:text-blue-400">PayPal Express</span>
                <DollarSign className="w-4 h-4 text-slate-400" />
              </div>
              <div className="font-display font-black text-2xl text-slate-900 dark:text-white">$4,340</div>
              <div className="text-[11px] text-slate-500">29.3% of all transaction volume</div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
