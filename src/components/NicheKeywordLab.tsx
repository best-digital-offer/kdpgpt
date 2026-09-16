import React, { useState } from 'react';
import { 
  Compass, 
  Search, 
  Sparkles, 
  TrendingUp, 
  Copy, 
  CheckCircle2, 
  BarChart3, 
  AlertCircle, 
  Flame, 
  Check, 
  ArrowUpRight 
} from 'lucide-react';
import { NicheAnalysis } from '../types';
import { INITIAL_NICHES } from '../lib/mockData';

export const NicheKeywordLab: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('Adult Coloring Book Stress Relief');
  const [analyzing, setAnalyzing] = useState(false);
  const [currentAnalysis, setCurrentAnalysis] = useState<NicheAnalysis>(INITIAL_NICHES[0]);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const [backendBoxes, setBackendBoxes] = useState<string[]>([
    'stress relief anxiety calm mindfulness relaxation',
    'large print easy to read senior adults gift ideas',
    'screen free evening routine art therapy creative',
    'self care wellness hobby weekend holiday present',
    'thick paper no bleed single sided designs quality',
    'stocking stuffer birthday coworker friend women men',
    'daily practice focus peace tranquility balance joy',
  ]);

  const handleRunAnalysis = async () => {
    if (!searchQuery.trim()) return;
    setAnalyzing(true);
    try {
      const res = await fetch('/api/ai/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'niche_research',
          payload: { niche: searchQuery },
        }),
      });
      const data = await res.json();
      if (data.success && data.data) {
        setCurrentAnalysis(data.data);
      }

      // Also generate 7 backend boxes
      const kwRes = await fetch('/api/ai/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'kdp_keywords',
          payload: { niche: searchQuery, title: searchQuery },
        }),
      });
      const kwData = await kwRes.json();
      if (kwData.success && kwData.data?.sevenBackendKeywords) {
        setBackendBoxes(kwData.data.sevenBackendKeywords);
      }
    } catch (err) {
      console.error('Niche analysis error:', err);
    } finally {
      setAnalyzing(false);
    }
  };

  const copyToClipboard = (text: string, keyName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(keyName);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-6">
        <div>
          <div className="flex items-center space-x-2 text-indigo-600 dark:text-indigo-400 font-bold text-xs uppercase tracking-wider mb-1">
            <Compass className="w-4 h-4" />
            <span>KDP Market Intelligence</span>
          </div>
          <h1 className="font-display text-3xl font-extrabold text-slate-900 dark:text-white">
            Niche Profitability & 7-Box Keyword Lab
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Validate Amazon Best Seller Rank (BSR), competition difficulty, buyer personas, and 50-character backend keywords.
          </p>
        </div>

        {/* Search Bar */}
        <div className="flex items-center space-x-2 w-full md:w-96">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleRunAnalysis()}
              placeholder="Enter niche (e.g. Sudoku for Seniors)..."
              className="w-full pl-9 pr-4 py-2.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>
          <button
            onClick={handleRunAnalysis}
            disabled={analyzing}
            className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition flex items-center space-x-1.5 shadow-sm disabled:opacity-50"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>{analyzing ? 'Scanning...' : 'Analyze'}</span>
          </button>
        </div>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/80 shadow-xs">
          <div className="flex items-center justify-between text-slate-400 text-xs font-medium">
            <span>Avg Best Seller Rank</span>
            <TrendingUp className="w-4 h-4 text-indigo-500" />
          </div>
          <div className="font-display font-black text-2xl text-slate-900 dark:text-white mt-2">
            #{currentAnalysis.bsrScore.toLocaleString()}
          </div>
          <div className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold mt-1">
            Top 1% of Amazon Books
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/80 shadow-xs">
          <div className="flex items-center justify-between text-slate-400 text-xs font-medium">
            <span>Est. Monthly Sales</span>
            <BarChart3 className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="font-display font-black text-2xl text-slate-900 dark:text-white mt-2">
            ~{currentAnalysis.estimatedMonthlySales.toLocaleString()} copies
          </div>
          <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
            Avg ${(currentAnalysis.estimatedMonthlySales * 4.2).toLocaleString()}/mo Royalties
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/80 shadow-xs">
          <div className="flex items-center justify-between text-slate-400 text-xs font-medium">
            <span>Competition Difficulty</span>
            <AlertCircle className="w-4 h-4 text-amber-500" />
          </div>
          <div className="font-display font-black text-2xl text-slate-900 dark:text-white mt-2">
            {currentAnalysis.competitionScore} / 100
          </div>
          <div className="w-full bg-slate-100 dark:bg-slate-700 h-1.5 rounded-full mt-2 overflow-hidden">
            <div 
              className="bg-amber-500 h-full rounded-full" 
              style={{ width: `${currentAnalysis.competitionScore}%` }} 
            />
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/80 shadow-xs">
          <div className="flex items-center justify-between text-slate-400 text-xs font-medium">
            <span>Profit Opportunity</span>
            <Flame className="w-4 h-4 text-rose-500" />
          </div>
          <div className="font-display font-black text-2xl text-emerald-600 dark:text-emerald-400 mt-2">
            {currentAnalysis.profitPotential}
          </div>
          <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
            Avg Retail: ${currentAnalysis.averagePriceUSD}
          </div>
        </div>

      </div>

      {/* Main Analysis Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Left: 7 Amazon Backend Keyword Boxes */}
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-700 pb-3">
            <div>
              <h3 className="font-display font-bold text-lg text-slate-900 dark:text-white">
                Amazon 7 Backend Keyword Boxes
              </h3>
              <p className="text-xs text-slate-500">Max 50 characters per box • No commas • No repeats</p>
            </div>
            <button
              onClick={() => copyToClipboard(backendBoxes.join('\n'), 'all-boxes')}
              className="px-3 py-1.5 bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 rounded-lg text-xs font-bold flex items-center space-x-1"
            >
              {copiedKey === 'all-boxes' ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
              <span>Copy All 7</span>
            </button>
          </div>

          <div className="space-y-2.5">
            {backendBoxes.map((boxText, idx) => {
              const len = boxText.length;
              const isOver = len > 50;
              return (
                <div key={idx} className="flex items-center space-x-2">
                  <span className="w-6 text-xs font-bold text-slate-400 text-center">#{idx + 1}</span>
                  <div className="flex-1 relative">
                    <input
                      type="text"
                      value={boxText}
                      onChange={(e) => {
                        const copy = [...backendBoxes];
                        copy[idx] = e.target.value;
                        setBackendBoxes(copy);
                      }}
                      className={`w-full px-3 py-2 text-xs rounded-lg border font-mono bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white pr-14 ${
                        isOver ? 'border-rose-500 text-rose-500' : 'border-slate-200 dark:border-slate-700'
                      }`}
                    />
                    <span className={`absolute right-2.5 top-2.5 text-[10px] font-mono font-bold ${isOver ? 'text-rose-500' : 'text-slate-400'}`}>
                      {len}/50
                    </span>
                  </div>
                  <button
                    onClick={() => copyToClipboard(boxText, `box-${idx}`)}
                    className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-white"
                    title="Copy Box"
                  >
                    {copiedKey === `box-${idx}` ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              );
            })}
          </div>

          <div className="p-3 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/40 rounded-xl text-[11px] text-amber-800 dark:text-amber-300">
            <b>Amazon KDP Pro-Tip:</b> Never repeat keywords that are already in your Title or Subtitle. Amazon indexes both automatically!
          </div>
        </div>

        {/* Right: Sub-niches & Buyer Personas */}
        <div className="space-y-6">
          
          {/* Sub-Niches */}
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm space-y-3">
            <h3 className="font-display font-bold text-base text-slate-900 dark:text-white flex items-center space-x-2">
              <Sparkles className="w-4 h-4 text-indigo-500" />
              <span>High-Opportunity Sub-Niches</span>
            </h3>
            <div className="space-y-2">
              {currentAnalysis.suggestedSubNiches?.map((sub, i) => (
                <div
                  key={i}
                  onClick={() => { setSearchQuery(sub); handleRunAnalysis(); }}
                  className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-700/60 hover:border-indigo-500 cursor-pointer flex items-center justify-between text-xs font-semibold text-slate-800 dark:text-slate-200 transition"
                >
                  <span>{sub}</span>
                  <ArrowUpRight className="w-4 h-4 text-slate-400" />
                </div>
              ))}
            </div>
          </div>

          {/* Buyer Personas & Seasonality */}
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm space-y-4">
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Target Buyer Personas</h4>
              <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
                {currentAnalysis.targetBuyerPersonas?.map((p, i) => (
                  <li key={i} className="flex items-start space-x-2">
                    <span className="text-indigo-500 font-bold">•</span>
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-3 border-t border-slate-100 dark:border-slate-700">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">Seasonality & Advice</h4>
              <p className="text-xs text-slate-600 dark:text-slate-300">{currentAnalysis.seasonality}</p>
              <p className="text-xs text-indigo-600 dark:text-indigo-400 mt-2 font-medium bg-indigo-50/50 dark:bg-indigo-950/30 p-2.5 rounded-lg border border-indigo-100 dark:border-indigo-900/40">
                {currentAnalysis.adviceNotes}
              </p>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
