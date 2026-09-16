import React, { useState } from 'react';
import { 
  Megaphone, 
  Users, 
  Gift, 
  DollarSign, 
  Copy, 
  Check, 
  Share2, 
  Tag, 
  Plus, 
  TrendingUp,
  Percent
} from 'lucide-react';
import { UserProfile } from '../types';

interface MarketingHubProps {
  user: UserProfile;
}

export const MarketingHub: React.FC<MarketingHubProps> = ({ user }) => {
  const [activeTab, setActiveTab] = useState<'affiliate' | 'referrals' | 'coupons'>('affiliate');
  const [copiedLink, setCopiedLink] = useState(false);
  const [affiliateLink] = useState(`https://kdpgpt.com/?ref=${user.name.toLowerCase().replace(/\s+/g, '') || 'author'}`);

  const [coupons, setCoupons] = useState([
    { code: 'KDP50', discount: '50%', uses: 142, status: 'Active', expires: '2026-12-31' },
    { code: 'LAUNCH2026', discount: '30%', uses: 89, status: 'Active', expires: '2026-06-30' },
    { code: 'CREATOR20', discount: '20%', uses: 310, status: 'Active', expires: '2026-12-31' },
  ]);

  const [newCode, setNewCode] = useState('');
  const [newDiscount, setNewDiscount] = useState('25');

  const handleCopyAffiliate = () => {
    navigator.clipboard.writeText(affiliateLink);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleCreateCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCode.trim()) return;
    setCoupons([
      ...coupons,
      {
        code: newCode.toUpperCase().trim(),
        discount: `${newDiscount}%`,
        uses: 0,
        status: 'Active',
        expires: '2026-12-31',
      },
    ]);
    setNewCode('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-6">
        <div>
          <div className="flex items-center space-x-2 text-indigo-600 dark:text-indigo-400 font-bold text-xs uppercase tracking-wider mb-1">
            <Megaphone className="w-4 h-4" />
            <span>Growth & Monetization</span>
          </div>
          <h1 className="font-display text-3xl font-extrabold text-slate-900 dark:text-white">
            Marketing, Affiliates & Coupons
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Earn 30% monthly recurring commissions referring other KDP authors or create promotional codes.
          </p>
        </div>

        {/* Tab Selector */}
        <div className="flex items-center p-1.5 bg-slate-100 dark:bg-slate-800 rounded-xl">
          <button
            onClick={() => setActiveTab('affiliate')}
            className={`px-3 py-1.5 text-xs font-bold rounded-lg transition ${
              activeTab === 'affiliate' ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-white shadow-xs' : 'text-slate-600 dark:text-slate-300'
            }`}
          >
            Affiliate Program
          </button>
          <button
            onClick={() => setActiveTab('referrals')}
            className={`px-3 py-1.5 text-xs font-bold rounded-lg transition ${
              activeTab === 'referrals' ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-white shadow-xs' : 'text-slate-600 dark:text-slate-300'
            }`}
          >
            Refer a Friend ($10)
          </button>
          <button
            onClick={() => setActiveTab('coupons')}
            className={`px-3 py-1.5 text-xs font-bold rounded-lg transition ${
              activeTab === 'coupons' ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-white shadow-xs' : 'text-slate-600 dark:text-slate-300'
            }`}
          >
            Coupons ({coupons.length})
          </button>
        </div>
      </div>

      {/* TAB 1: AFFILIATE PROGRAM */}
      {activeTab === 'affiliate' && (
        <div className="space-y-8">
          
          {/* Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="p-5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xs">
              <div className="text-xs text-slate-400">Commission Rate</div>
              <div className="font-display font-black text-2xl text-indigo-600 dark:text-indigo-400 mt-1">30% Lifetime</div>
              <div className="text-[11px] text-slate-500 mt-1">Recurring every month</div>
            </div>

            <div className="p-5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xs">
              <div className="text-xs text-slate-400">Total Referrals</div>
              <div className="font-display font-black text-2xl text-slate-900 dark:text-white mt-1">18 Creators</div>
              <div className="text-[11px] text-emerald-500 font-semibold mt-1">12 Active Subscriptions</div>
            </div>

            <div className="p-5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xs">
              <div className="text-xs text-slate-400">Unpaid Earnings</div>
              <div className="font-display font-black text-2xl text-emerald-600 dark:text-emerald-400 mt-1">$142.80</div>
              <div className="text-[11px] text-slate-500 mt-1">Auto-payout on the 1st</div>
            </div>

            <div className="p-5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xs">
              <div className="text-xs text-slate-400">Lifetime Paid Out</div>
              <div className="font-display font-black text-2xl text-slate-900 dark:text-white mt-1">$684.00</div>
              <div className="text-[11px] text-slate-500 mt-1">Via PayPal / Wise</div>
            </div>
          </div>

          {/* Link Box */}
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm space-y-4">
            <h3 className="font-display font-bold text-base text-slate-900 dark:text-white">
              Your Unique Affiliate Tracking URL
            </h3>
            <div className="flex items-center space-x-2">
              <input
                type="text"
                readOnly
                value={affiliateLink}
                className="flex-1 px-4 py-2.5 text-xs font-mono rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-200"
              />
              <button
                onClick={handleCopyAffiliate}
                className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition flex items-center space-x-1.5 shadow-sm"
              >
                {copiedLink ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedLink ? 'Copied' : 'Copy Link'}</span>
              </button>
            </div>
            <p className="text-xs text-slate-500">
              60-day cookie attribution. When an author signs up and subscribes to Pro or Agency, you earn 30% of every invoice for life.
            </p>
          </div>

        </div>
      )}

      {/* TAB 2: REFER A FRIEND */}
      {activeTab === 'referrals' && (
        <div className="max-w-2xl mx-auto p-8 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm text-center space-y-6">
          <div className="w-16 h-16 mx-auto bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 rounded-2xl flex items-center justify-center">
            <Gift className="w-8 h-8" />
          </div>
          <div>
            <h3 className="font-display font-bold text-2xl text-slate-900 dark:text-white">
              Give $10, Get $10 Publishing Credit
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-md mx-auto">
              Invite other KDP self-publishers. They get $10 off their first month, and you receive $10 account credit as soon as they subscribe.
            </p>
          </div>

          <div className="flex items-center justify-center space-x-2 max-w-md mx-auto">
            <input
              type="email"
              placeholder="friend@author.com"
              className="flex-1 px-4 py-2.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white"
            />
            <button
              onClick={() => alert('Referral invitation sent!')}
              className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition shadow-sm"
            >
              Send Invite
            </button>
          </div>
        </div>
      )}

      {/* TAB 3: COUPONS */}
      {activeTab === 'coupons' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Coupon Generator Form */}
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm space-y-4">
            <h3 className="font-display font-bold text-base text-slate-900 dark:text-white flex items-center space-x-2">
              <Plus className="w-4 h-4 text-indigo-500" />
              <span>Create Promo Code</span>
            </h3>

            <form onSubmit={handleCreateCoupon} className="space-y-3">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1">
                  Coupon Code
                </label>
                <input
                  type="text"
                  required
                  value={newCode}
                  onChange={(e) => setNewCode(e.target.value)}
                  placeholder="e.g. SUMMER40"
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white font-mono uppercase"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1">
                  Discount Percentage
                </label>
                <select
                  value={newDiscount}
                  onChange={(e) => setNewDiscount(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white"
                >
                  <option value="15">15% Off</option>
                  <option value="25">25% Off</option>
                  <option value="30">30% Off</option>
                  <option value="50">50% Off</option>
                  <option value="100">100% Free Trial</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition shadow-sm"
              >
                Create Coupon
              </button>
            </form>
          </div>

          {/* Active Coupons List */}
          <div className="lg:col-span-2 p-6 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm space-y-4">
            <h3 className="font-display font-bold text-base text-slate-900 dark:text-white">
              Active Promotional Codes
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 dark:bg-slate-900/60 text-slate-500 uppercase tracking-wider border-b border-slate-200 dark:border-slate-700">
                  <tr>
                    <th className="py-3 px-4">Coupon Code</th>
                    <th className="py-3 px-4">Discount</th>
                    <th className="py-3 px-4">Redemptions</th>
                    <th className="py-3 px-4">Expires</th>
                    <th className="py-3 px-4">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-800 dark:text-slate-200">
                  {coupons.map((c, i) => (
                    <tr key={i}>
                      <td className="py-3 px-4 font-mono font-bold text-indigo-600 dark:text-indigo-400">{c.code}</td>
                      <td className="py-3 px-4 font-bold">{c.discount}</td>
                      <td className="py-3 px-4 font-mono">{c.uses} times</td>
                      <td className="py-3 px-4 text-slate-400">{c.expires}</td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400">
                          {c.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      )}

    </div>
  );
};
