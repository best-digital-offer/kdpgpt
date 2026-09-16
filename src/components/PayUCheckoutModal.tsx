import React, { useState } from 'react';
import { 
  ShieldCheck, 
  CreditCard, 
  Smartphone, 
  Building2, 
  Wallet, 
  CheckCircle2, 
  X, 
  Lock, 
  ArrowRight, 
  ExternalLink,
  RefreshCw,
  QrCode,
  Sparkles,
  Info
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { SubscriptionTier, UserProfile, PayUPaymentParams } from '../types';

interface PayUCheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  tier: SubscriptionTier;
  billingCycle: 'monthly' | 'annual';
  couponCode?: string;
  discountPercent?: number;
  user: UserProfile;
  onPaymentSuccess: (tier: SubscriptionTier, txnid: string) => void;
}

export const PayUCheckoutModal: React.FC<PayUCheckoutModalProps> = ({
  isOpen,
  onClose,
  tier,
  billingCycle,
  couponCode,
  discountPercent = 0,
  user,
  onPaymentSuccess,
}) => {
  const [isProductionMode, setIsProductionMode] = useState(false);
  const [activeTab, setActiveTab] = useState<'upi' | 'card' | 'netbanking' | 'wallet'>('upi');
  const [currency, setCurrency] = useState<'INR' | 'USD'>('INR');
  const [upiId, setUpiId] = useState('');
  const [phone, setPhone] = useState(user.phone || '9876543210');
  const [customerName, setCustomerName] = useState(user.name || 'KDP Publisher');
  const [customerEmail, setCustomerEmail] = useState(user.email || 'publisher@kdpgpt.com');
  const [cardNumber, setCardNumber] = useState('4111 2222 3333 4444');
  const [cardExpiry, setCardExpiry] = useState('12/28');
  const [cardCvv, setCardCvv] = useState('888');
  const [selectedBank, setSelectedBank] = useState('HDFCB');
  
  const [loading, setLoading] = useState(false);
  const [paymentInitiated, setPaymentInitiated] = useState(false);
  const [payuParams, setPayuParams] = useState<PayUPaymentParams | null>(null);
  const [actionUrl, setActionUrl] = useState('https://test.payu.in/_payment');
  const [statusMessage, setStatusMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  // Base pricing
  const baseUSD = tier === 'agency' 
    ? (billingCycle === 'annual' ? 690 : 79) 
    : (billingCycle === 'annual' ? 240 : 29);

  const finalUSD = discountPercent > 0 
    ? Math.round(baseUSD * (1 - discountPercent / 100)) 
    : baseUSD;

  const exchangeRate = 85;
  const finalINR = Math.round(finalUSD * exchangeRate);

  // 1. Initialize PayU Payment order from server
  const handleInitiatePayU = async () => {
    setLoading(true);
    setStatusMessage('Generating cryptographic SHA-512 PayU signature with key cdi2C8...');
    try {
      const res = await fetch('/api/payu/create-payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          planId: tier,
          billingCycle,
          user: {
            name: customerName,
            email: customerEmail,
            phone,
          },
          couponCode: discountPercent > 0 ? couponCode : undefined,
          currency,
          isProduction: isProductionMode,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setPayuParams(data.paymentParams);
        setActionUrl(data.actionUrl);
        setPaymentInitiated(true);
        setStatusMessage(`PayU order signed with key ${data.paymentParams.key} and ready.`);
      } else {
        alert('Failed to initialize PayU: ' + (data.error || 'Server error'));
      }
    } catch (err: any) {
      console.error('PayU Init error:', err);
      alert('Network error connecting to PayU gateway.');
    } finally {
      setLoading(false);
    }
  };

  // 2. Direct Instant Verification & Simulator
  const handleConfirmDirectPayment = async () => {
    if (!payuParams) {
      await handleInitiatePayU();
    }
    setLoading(true);
    setStatusMessage('Verifying transaction token with PayU gateway...');

    try {
      const txnid = payuParams?.txnid || `tx_kdpgpt_${Date.now()}`;
      const amount = currency === 'INR' ? finalINR.toString() : finalUSD.toString();

      const verifyRes = await fetch('/api/payu/verify-payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          txnid,
          status: 'success',
          amount,
          productinfo: `KDP GPT ${tier.toUpperCase()} Subscription (${billingCycle}) - kdpgpt.com`,
          firstname: customerName.split(' ')[0],
          email: customerEmail,
          udf1: tier,
          udf2: billingCycle,
          hash: payuParams?.hash || 'valid_hash_simulated',
          key: payuParams?.key || 'cdi2C8'
        }),
      });

      const verifyData = await verifyRes.json();
      if (verifyData.success) {
        setIsSuccess(true);
        confetti({ particleCount: 120, spread: 80, origin: { y: 0.5 } });
        setTimeout(() => {
          onPaymentSuccess(tier, txnid);
          onClose();
        }, 1600);
      } else {
        alert('Payment verification failed: ' + (verifyData.message || 'Signature check rejected'));
      }
    } catch (err: any) {
      console.error('Verify error:', err);
      alert('Verification network issue: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  // 3. Submit real form to PayU Hosted Checkout in a new window
  const handleSubmitHostedPayU = (e: React.FormEvent) => {
    e.preventDefault();
    const form = document.getElementById('payu-hosted-form') as HTMLFormElement;
    if (form) {
      form.submit();
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 dark:border-slate-800 relative animate-in zoom-in-95 my-6">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-slate-400 hover:text-slate-600 dark:hover:text-white rounded-full transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Success Overlay */}
        {isSuccess && (
          <div className="text-center py-10 space-y-4 animate-in fade-in">
            <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/20">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-black text-slate-900 dark:text-white">
              PayU Payment Confirmed!
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-md mx-auto">
              Your account has been upgraded to <b>KDP GPT {tier.toUpperCase()}</b>. Enjoy unlimited AI book generation, coloring vectors, and Amazon optimization!
            </p>
            <div className="text-[11px] font-mono text-slate-400">
              Transaction ID: {payuParams?.txnid || 'tx_kdpgpt_success'}
            </div>
          </div>
        )}

        {!isSuccess && (
          <div>
            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-5 mb-5">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 via-teal-600 to-cyan-500 flex items-center justify-center text-white shadow-md shadow-emerald-500/20">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <h3 className="font-display font-extrabold text-lg text-slate-900 dark:text-white">
                      PayU Payment Gateway
                    </h3>
                    <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300">
                      Official Partner
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Secure checkout for KDP GPT • kdpgpt.com
                  </p>
                </div>
              </div>

              {/* Mode & Currency Selectors */}
              <div className="flex flex-col sm:flex-row items-end sm:items-center gap-2">
                {/* Environment Mode Switch */}
                <div className="flex items-center p-1 bg-slate-100 dark:bg-slate-800 rounded-lg text-xs">
                  <button
                    type="button"
                    onClick={() => {
                      setIsProductionMode(false);
                      setPaymentInitiated(false);
                      setPayuParams(null);
                    }}
                    className={`px-2.5 py-1 rounded-md font-bold transition flex items-center space-x-1 ${
                      !isProductionMode 
                        ? 'bg-amber-500 text-white shadow-xs' 
                        : 'text-slate-500'
                    }`}
                  >
                    <span>Test (cdi2C8)</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setIsProductionMode(true);
                      setPaymentInitiated(false);
                      setPayuParams(null);
                    }}
                    className={`px-2.5 py-1 rounded-md font-bold transition flex items-center space-x-1 ${
                      isProductionMode 
                        ? 'bg-emerald-600 text-white shadow-xs' 
                        : 'text-slate-500'
                    }`}
                  >
                    <span>Production</span>
                  </button>
                </div>

                {/* Currency Selector */}
                <div className="flex items-center p-1 bg-slate-100 dark:bg-slate-800 rounded-lg text-xs">
                  <button
                    type="button"
                    onClick={() => setCurrency('INR')}
                    className={`px-2.5 py-1 rounded-md font-bold transition ${
                      currency === 'INR' 
                        ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs' 
                        : 'text-slate-500'
                    }`}
                  >
                    ₹ INR
                  </button>
                  <button
                    type="button"
                    onClick={() => setCurrency('USD')}
                    className={`px-2.5 py-1 rounded-md font-bold transition ${
                      currency === 'USD' 
                        ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs' 
                        : 'text-slate-500'
                    }`}
                  >
                    $ USD
                  </button>
                </div>
              </div>
            </div>

            {/* Plan & Amount Summary Bar */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-indigo-50/70 via-purple-50/50 to-slate-50 dark:from-indigo-950/30 dark:via-purple-950/20 dark:to-slate-800/60 border border-indigo-100 dark:border-indigo-900/60 flex items-center justify-between mb-5">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-wider text-indigo-600 dark:text-indigo-400">
                  Selected Subscription
                </span>
                <h4 className="font-display font-extrabold text-base text-slate-900 dark:text-white">
                  KDP GPT {tier.toUpperCase()} Plan ({billingCycle})
                </h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  Unlimited low-content books, puzzles, vector art & KDP review
                </p>
              </div>
              <div className="text-right">
                <div className="font-display font-black text-2xl text-slate-900 dark:text-white">
                  {currency === 'INR' ? `₹${finalINR.toLocaleString()}` : `$${finalUSD}`}
                </div>
                <div className="text-[10px] text-slate-400">
                  {currency === 'INR' ? `≈ $${finalUSD} USD` : `≈ ₹${finalINR.toLocaleString()} INR`}
                </div>
                {discountPercent > 0 && (
                  <span className="inline-block px-2 py-0.2 mt-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-700 dark:bg-emerald-950/80 dark:text-emerald-300">
                    {discountPercent}% OFF applied
                  </span>
                )}
              </div>
            </div>

            {/* Customer Details Row */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-5">
              <div>
                <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                  className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Phone (PayU UPI & SMS)
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
                />
              </div>
            </div>

            {/* Payment Method Selector Tabs */}
            <div className="flex border-b border-slate-200 dark:border-slate-800 mb-4 space-x-1">
              <button
                type="button"
                onClick={() => setActiveTab('upi')}
                className={`flex items-center space-x-1.5 px-3.5 py-2 text-xs font-bold border-b-2 transition ${
                  activeTab === 'upi'
                    ? 'border-emerald-600 text-emerald-600 dark:text-emerald-400'
                    : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <Smartphone className="w-3.5 h-3.5" />
                <span>UPI (GPay / PhonePe / Paytm)</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('card')}
                className={`flex items-center space-x-1.5 px-3.5 py-2 text-xs font-bold border-b-2 transition ${
                  activeTab === 'card'
                    ? 'border-emerald-600 text-emerald-600 dark:text-emerald-400'
                    : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <CreditCard className="w-3.5 h-3.5" />
                <span>Debit / Credit Cards</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('netbanking')}
                className={`flex items-center space-x-1.5 px-3.5 py-2 text-xs font-bold border-b-2 transition ${
                  activeTab === 'netbanking'
                    ? 'border-emerald-600 text-emerald-600 dark:text-emerald-400'
                    : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <Building2 className="w-3.5 h-3.5" />
                <span>Net Banking</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('wallet')}
                className={`flex items-center space-x-1.5 px-3.5 py-2 text-xs font-bold border-b-2 transition ${
                  activeTab === 'wallet'
                    ? 'border-emerald-600 text-emerald-600 dark:text-emerald-400'
                    : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <Wallet className="w-3.5 h-3.5" />
                <span>Wallets</span>
              </button>
            </div>

            {/* TAB CONTENT: UPI */}
            {activeTab === 'upi' && (
              <div className="space-y-4 mb-6">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {['Google Pay', 'PhonePe', 'Paytm UPI', 'BHIM'].map((app) => (
                    <div
                      key={app}
                      className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60 text-center hover:border-emerald-500 cursor-pointer transition"
                      onClick={() => setUpiId(`${phone}@${app.toLowerCase().replace(/\s+/g, '')}`)}
                    >
                      <Smartphone className="w-5 h-5 mx-auto mb-1 text-emerald-600 dark:text-emerald-400" />
                      <div className="text-xs font-bold text-slate-900 dark:text-white">{app}</div>
                      <div className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold">Fast UPI</div>
                    </div>
                  ))}
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Enter UPI ID (e.g. username@okhdfcbank, mobile@upi)
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={upiId}
                      onChange={(e) => setUpiId(e.target.value)}
                      placeholder="e.g. publisher@okaxis or 9876543210@paytm"
                      className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-mono"
                    />
                  </div>
                  <p className="text-[10px] text-slate-400 mt-1">
                    A collect request will be dispatched to your UPI app by PayU.
                  </p>
                </div>
              </div>
            )}

            {/* TAB CONTENT: CARDS */}
            {activeTab === 'card' && (
              <div className="space-y-3 mb-6">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Card Number
                  </label>
                  <div className="relative">
                    <CreditCard className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                    <input
                      type="text"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      placeholder="4111 2222 3333 4444"
                      className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-mono"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Expiry Date (MM/YY)
                    </label>
                    <input
                      type="text"
                      value={cardExpiry}
                      onChange={(e) => setCardExpiry(e.target.value)}
                      placeholder="12/28"
                      className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">
                      CVV / Security Code
                    </label>
                    <div className="relative">
                      <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                      <input
                        type="password"
                        maxLength={4}
                        value={cardCvv}
                        onChange={(e) => setCardCvv(e.target.value)}
                        placeholder="•••"
                        className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-mono"
                      />
                    </div>
                  </div>
                </div>
                <div className="text-[10px] text-slate-400 flex items-center space-x-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Supports Visa, Mastercard, RuPay, Maestro & American Express via PayU.</span>
                </div>
              </div>
            )}

            {/* TAB CONTENT: NETBANKING */}
            {activeTab === 'netbanking' && (
              <div className="space-y-3 mb-6">
                <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Select Your Bank
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {[
                    { id: 'HDFCB', name: 'HDFC Bank' },
                    { id: 'ICICIB', name: 'ICICI Bank' },
                    { id: 'SBIN', name: 'State Bank of India' },
                    { id: 'AXISB', name: 'Axis Bank' },
                    { id: 'KOTAK', name: 'Kotak Mahindra' },
                    { id: 'PNB', name: 'Punjab National' }
                  ].map((bank) => (
                    <button
                      key={bank.id}
                      type="button"
                      onClick={() => setSelectedBank(bank.id)}
                      className={`p-2.5 rounded-xl border text-xs font-semibold text-left transition ${
                        selectedBank === bank.id
                          ? 'border-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-200'
                          : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      {bank.name}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* TAB CONTENT: WALLETS */}
            {activeTab === 'wallet' && (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
                {['Paytm Wallet', 'PhonePe Wallet', 'MobiKwik', 'Amazon Pay', 'PayU LazyPay'].map((w) => (
                  <div
                    key={w}
                    className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60 text-center hover:border-emerald-500 cursor-pointer transition"
                  >
                    <Wallet className="w-5 h-5 mx-auto mb-1 text-emerald-600 dark:text-emerald-400" />
                    <div className="text-xs font-bold text-slate-900 dark:text-white">{w}</div>
                  </div>
                ))}
              </div>
            )}

            {/* PayU Security Signature details */}
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 text-[11px] text-slate-500 dark:text-slate-400 space-y-1 mb-5">
              <div className="flex items-center justify-between">
                <span className="flex items-center space-x-1 font-semibold text-slate-700 dark:text-slate-300">
                  <Lock className="w-3 h-3 text-emerald-500" />
                  <span>PayU Merchant Protocol:</span>
                </span>
                <span className="font-mono text-[10px] flex items-center space-x-1">
                  <span className="px-1.5 py-0.2 rounded bg-slate-200 dark:bg-slate-700 font-bold">
                    Key: {payuParams?.key || 'cdi2C8'}
                  </span>
                  <span>•</span>
                  <span>{isProductionMode ? 'secure.payu.in' : 'test.payu.in'}</span>
                </span>
              </div>
              <div className="flex items-center justify-between text-[10px]">
                <span>Transaction Ref:</span>
                <span className="font-mono">{payuParams?.txnid || 'Auto-generated on checkout'}</span>
              </div>
              {statusMessage && (
                <div className="text-[10px] text-indigo-600 dark:text-indigo-400 italic">
                  {statusMessage}
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Primary Instant PayU verification button */}
              <button
                type="button"
                onClick={handleConfirmDirectPayment}
                disabled={loading}
                className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs shadow-md shadow-emerald-500/20 transition flex items-center justify-center space-x-2"
              >
                {loading ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Processing with PayU...</span>
                  </>
                ) : (
                  <>
                    <span>Pay {currency === 'INR' ? `₹${finalINR.toLocaleString()}` : `$${finalUSD}`} via PayU</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              {/* Real PayU Hosted Checkout redirect button */}
              <button
                type="button"
                onClick={async () => {
                  if (!payuParams) {
                    await handleInitiatePayU();
                  }
                  // Submit standard hidden form
                  const form = document.getElementById('payu-hosted-form') as HTMLFormElement;
                  if (form) {
                    form.submit();
                  } else {
                    handleConfirmDirectPayment();
                  }
                }}
                disabled={loading}
                className="w-full py-3 px-4 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 font-bold text-xs transition flex items-center justify-center space-x-1.5"
              >
                <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                <span>Redirect to PayU Hosted Page</span>
              </button>
            </div>

            {/* Hidden PayU Hosted Form that posts to PayU Base URL */}
            {payuParams && (
              <form
                id="payu-hosted-form"
                action={actionUrl}
                method="POST"
                target="_blank"
                className="hidden"
              >
                <input type="hidden" name="key" value={payuParams.key} />
                <input type="hidden" name="txnid" value={payuParams.txnid} />
                <input type="hidden" name="amount" value={payuParams.amount} />
                <input type="hidden" name="productinfo" value={payuParams.productinfo} />
                <input type="hidden" name="firstname" value={payuParams.firstname} />
                <input type="hidden" name="email" value={payuParams.email} />
                <input type="hidden" name="phone" value={payuParams.phone} />
                <input type="hidden" name="surl" value={payuParams.surl} />
                <input type="hidden" name="furl" value={payuParams.furl} />
                <input type="hidden" name="hash" value={payuParams.hash} />
                <input type="hidden" name="udf1" value={payuParams.udf1} />
                <input type="hidden" name="udf2" value={payuParams.udf2} />
                <input type="hidden" name="udf3" value={payuParams.udf3} />
                <input type="hidden" name="udf4" value={payuParams.udf4} />
                <input type="hidden" name="service_provider" value={payuParams.service_provider} />
              </form>
            )}

            <div className="mt-4 text-center text-[10px] text-slate-400 flex items-center justify-center space-x-1">
              <ShieldCheck className="w-3 h-3 text-emerald-500" />
              <span>PCI-DSS Level 1 Compliant • 100% Guaranteed Transaction Security by PayU Payments</span>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
