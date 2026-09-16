import React, { useState } from 'react';
import { 
  Crown, 
  Check, 
  Zap, 
  ShieldCheck, 
  CreditCard, 
  X, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight,
  Gift,
  Smartphone,
  Lock
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { SubscriptionTier, UserProfile, PaymentGateway } from '../types';
import { PayUCheckoutModal } from './PayUCheckoutModal';

interface BillingModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: UserProfile;
  onUpgradePlan: (tier: SubscriptionTier) => void;
}

export const BillingModal: React.FC<BillingModalProps> = ({
  isOpen,
  onClose,
  user,
  onUpgradePlan,
}) => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');
  const [couponCode, setCouponCode] = useState('');
  const [couponApplied, setCouponApplied] = useState(false);
  const [discountPercent, setDiscountPercent] = useState(0);
  const [checkoutGateway, setCheckoutGateway] = useState<PaymentGateway>('payu');
  const [isProcessing, setIsProcessing] = useState(false);
  
  // PayU Modal state
  const [payuModalOpen, setPayuModalOpen] = useState(false);
  const [selectedTierForPayU, setSelectedTierForPayU] = useState<SubscriptionTier>('pro');

  if (!isOpen) return null;

  const handleApplyCoupon = () => {
    if (couponCode.toUpperCase() === 'KDP50') {
      setCouponApplied(true);
      setDiscountPercent(50);
    } else if (couponCode.toUpperCase() === 'LAUNCH2026') {
      setCouponApplied(true);
      setDiscountPercent(30);
    } else {
      alert('Invalid coupon code. Try "KDP50" for 50% off!');
    }
  };

  const handleCheckout = async (tier: SubscriptionTier) => {
    if (tier === 'free') {
      onUpgradePlan('free');
      onClose();
      return;
    }

    if (checkoutGateway === 'payu') {
      setSelectedTierForPayU(tier);
      setPayuModalOpen(true);
      return;
    }

    setIsProcessing(true);
    try {
      const res = await fetch('/api/billing/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          plan: tier,
          gateway: checkoutGateway,
          billingCycle,
          coupon: couponApplied ? couponCode : undefined,
        }),
      });
      const data = await res.json();
      if (data.success) {
        onUpgradePlan(tier);
        confetti({ particleCount: 100, spread: 80, origin: { y: 0.5 } });
        onClose();
      }
    } catch (err) {
      console.error('Checkout error:', err);
    } finally {
      setIsProcessing(false);
    }
  };

  const handlePayUSuccess = (tier: SubscriptionTier, txnid: string) => {
    onUpgradePlan(tier);
    onClose();
  };

  const plans = [
    {
      tier: 'free' as SubscriptionTier,
      name: 'Free Starter',
      badge: 'Starter',
      priceMonthly: 0,
      priceAnnual: 0,
      desc: 'Ideal for testing KDP concepts and learning the publisher workflow.',
      features: [
        'Generate up to 3 books per day',
        'Standard Trim Sizes (8.5x11 & 6x9)',
        'Basic Word Search & Sudoku Engine',
        'Standard KDP Interior PDF Export',
        'Community Support',
      ],
      cta: 'Current Plan',
      highlighted: false,
    },
    {
      tier: 'pro' as SubscriptionTier,
      name: 'Pro Author',
      badge: 'Most Popular',
      priceMonthly: discountPercent ? Math.round(29 * (1 - discountPercent / 100)) : 29,
      priceAnnual: discountPercent ? Math.round(240 * (1 - discountPercent / 100)) : 240,
      desc: 'For serious self-publishers scaling an active Amazon KDP catalog.',
      features: [
        'Unlimited Book Generations (No Daily Caps)',
        'All Puzzle Engines (Word Search, Sudoku, Mazes, Crosswords)',
        '300 DPI Vector Coloring Studio with SVG Export',
        'Full Wrap Cover & KDP Spine Calculator',
        'Amazon Listing Optimizer & HTML Description',
        'Amazon Ads PPC Keyword Harvester',
        'AI Content & KDP Policy Review Auditor',
        '100% Commercial Use & Full Copyright Rights',
        'Priority Server-Side Gemini 2.5 Flash Queue',
      ],
      cta: 'Upgrade to Pro',
      highlighted: true,
    },
    {
      tier: 'agency' as SubscriptionTier,
      name: 'Agency & Studio',
      badge: 'Scale',
      priceMonthly: discountPercent ? Math.round(79 * (1 - discountPercent / 100)) : 79,
      priceAnnual: discountPercent ? Math.round(690 * (1 - discountPercent / 100)) : 690,
      desc: 'Built for publishing agencies, ghostwriters, and high-volume teams.',
      features: [
        'Everything in Pro, plus:',
        '5 Multi-User Team Seats',
        'A+ Content Visual Modules & Templates',
        'Bulk Batch PDF Interior Exporter',
        'Dedicated KDP BSR Audit & Consultation',
        'Dedicated VIP Slack/Discord Channel',
        'Automated ISBN & Barcode Inserter',
      ],
      cta: 'Upgrade to Agency',
      highlighted: false,
    },
  ];

  return (
    <>
      <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
        <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-5xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 dark:border-slate-800 relative animate-in zoom-in-95 my-8">
          
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 text-slate-400 hover:text-slate-600 dark:hover:text-white rounded-full transition"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Title & Billing Toggle */}
          <div className="text-center space-y-3 max-w-xl mx-auto mb-8">
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 text-xs font-bold uppercase tracking-wider">
              <Crown className="w-3.5 h-3.5" />
              <span>KDP GPT Plans & Pricing</span>
            </div>
            <h2 className="font-display font-black text-3xl text-slate-900 dark:text-white">
              AI Tools for KDP Publishers
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              Publish profitable Amazon KDP books faster at <b>kdpgpt.com</b>. Upgrade for unlimited generations, all puzzle engines, and PayU instant checkout.
            </p>

            {/* Monthly / Annual Toggle */}
            <div className="inline-flex items-center p-1 bg-slate-100 dark:bg-slate-800 rounded-xl mt-2">
              <button
                onClick={() => setBillingCycle('monthly')}
                className={`px-4 py-1.5 text-xs font-bold rounded-lg transition ${
                  billingCycle === 'monthly'
                    ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                    : 'text-slate-500'
                }`}
              >
                Monthly Billing
              </button>
              <button
                onClick={() => setBillingCycle('annual')}
                className={`px-4 py-1.5 text-xs font-bold rounded-lg transition flex items-center space-x-1 ${
                  billingCycle === 'annual'
                    ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                    : 'text-slate-500'
                }`}
              >
                <span>Annual (Save 30%)</span>
                <span className="bg-emerald-500 text-white text-[9px] px-1.5 py-0.2 rounded-full font-bold">2 Mos Free</span>
              </button>
            </div>
          </div>

          {/* Plans Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {plans.map((p) => {
              const isCurrent = user.plan === p.tier;
              const price = billingCycle === 'annual' ? p.priceAnnual : p.priceMonthly;
              return (
                <div
                  key={p.tier}
                  className={`rounded-2xl p-6 flex flex-col justify-between transition-all relative ${
                    p.highlighted
                      ? 'border-2 border-indigo-600 bg-gradient-to-b from-indigo-50/50 to-white dark:from-indigo-950/40 dark:to-slate-800 shadow-xl'
                      : 'border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800/80 shadow-xs'
                  }`}
                >
                  {p.highlighted && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 px-3 py-0.5 bg-indigo-600 text-white text-[10px] font-extrabold uppercase tracking-widest rounded-full shadow-md">
                      {p.badge}
                    </div>
                  )}

                  <div className="space-y-4">
                    <div>
                      <h3 className="font-display font-bold text-lg text-slate-900 dark:text-white">{p.name}</h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">{p.desc}</p>
                    </div>

                    <div className="flex items-baseline space-x-1">
                      <span className="font-display font-black text-3xl text-slate-900 dark:text-white">${price}</span>
                      <span className="text-xs text-slate-400 font-medium">/{billingCycle === 'annual' ? 'year' : 'month'}</span>
                    </div>

                    <div className="border-t border-slate-100 dark:border-slate-700/60 pt-4 space-y-2.5">
                      {p.features.map((f, i) => (
                        <div key={i} className="flex items-start space-x-2 text-xs text-slate-700 dark:text-slate-300">
                          <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                          <span>{f}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-6 mt-6 border-t border-slate-100 dark:border-slate-700/60">
                    <button
                      onClick={() => handleCheckout(p.tier)}
                      disabled={isCurrent || isProcessing}
                      className={`w-full py-2.5 rounded-xl text-xs font-bold transition flex items-center justify-center space-x-1.5 shadow-sm ${
                        isCurrent
                          ? 'bg-slate-100 dark:bg-slate-700 text-slate-400 cursor-default'
                          : p.highlighted
                          ? 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-500/25'
                          : 'bg-slate-900 hover:bg-black dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-900'
                      }`}
                    >
                      <span>{isCurrent ? 'Current Plan' : (checkoutGateway === 'payu' && p.tier !== 'free' ? `Pay with PayU` : p.cta)}</span>
                      {!isCurrent && <ArrowRight className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Footer: Coupon Code & Gateway Selection */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 flex flex-col lg:flex-row items-center justify-between gap-4 text-xs">
            {/* Coupon */}
            <div className="flex items-center space-x-2 w-full lg:w-auto">
              <Gift className="w-4 h-4 text-amber-500 shrink-0" />
              <input
                type="text"
                placeholder="Coupon code (e.g. KDP50)"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-mono uppercase"
              />
              <button
                onClick={handleApplyCoupon}
                className="px-3 py-1.5 bg-slate-900 dark:bg-slate-700 text-white rounded-lg font-bold"
              >
                Apply
              </button>
              {couponApplied && (
                <span className="text-emerald-600 dark:text-emerald-400 font-bold whitespace-nowrap">
                  {discountPercent}% OFF applied!
                </span>
              )}
            </div>

            {/* Payment Gateway Toggle */}
            <div className="flex flex-wrap items-center gap-2 text-slate-500">
              <span className="font-semibold text-[11px]">Payment Gateway:</span>
              <div className="flex items-center space-x-1.5">
                {/* PayU Option */}
                <button
                  onClick={() => setCheckoutGateway('payu')}
                  className={`px-3 py-1.5 rounded-lg border font-bold text-xs transition flex items-center space-x-1.5 ${
                    checkoutGateway === 'payu' 
                      ? 'bg-emerald-600 text-white border-transparent shadow-sm' 
                      : 'border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-200" />
                  <span>PayU (UPI / NetBanking / Cards)</span>
                  <span className="text-[9px] bg-emerald-700 px-1 py-0.2 rounded text-emerald-100 font-semibold">Recommended</span>
                </button>

                {/* Stripe Option */}
                <button
                  onClick={() => setCheckoutGateway('stripe')}
                  className={`px-3 py-1.5 rounded-lg border font-bold text-xs transition ${
                    checkoutGateway === 'stripe' 
                      ? 'bg-indigo-600 text-white border-transparent shadow-sm' 
                      : 'border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  Stripe
                </button>

                {/* PayPal Option */}
                <button
                  onClick={() => setCheckoutGateway('paypal')}
                  className={`px-3 py-1.5 rounded-lg border font-bold text-xs transition ${
                    checkoutGateway === 'paypal' 
                      ? 'bg-blue-600 text-white border-transparent shadow-sm' 
                      : 'border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  PayPal
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Dedicated PayU Checkout Drawer / Modal */}
      <PayUCheckoutModal
        isOpen={payuModalOpen}
        onClose={() => setPayuModalOpen(false)}
        tier={selectedTierForPayU}
        billingCycle={billingCycle}
        couponCode={couponCode}
        discountPercent={couponApplied ? discountPercent : 0}
        user={user}
        onPaymentSuccess={handlePayUSuccess}
      />
    </>
  );
};

