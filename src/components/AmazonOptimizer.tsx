import React, { useState } from 'react';
import { 
  ShoppingCart, 
  Sparkles, 
  Copy, 
  Check, 
  ExternalLink, 
  Layers, 
  DollarSign, 
  Star, 
  ShieldCheck, 
  Tag,
  BarChart,
  Eye
} from 'lucide-react';
import { AmazonListing, AmazonAdKeyword, APlusModule } from '../types';

export const AmazonOptimizer: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'listing' | 'ads' | 'aplus'>('listing');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const [listing, setListing] = useState<AmazonListing>({
    optimizedTitle: 'Mindful Mandalas & Sacred Blooms: 50 Relaxing Floral Geometric Patterns for Stress Relief and Anxiety Calm',
    optimizedSubtitle: 'Adult Coloring Book with Beautiful Botanical Designs for Mindfulness and Meditation',
    bulletPoints: [
      '50 UNIQUE HAND-CRAFTED DESIGNS: Gorgeous circular mandalas blending botanical blooms, sacred geometry, and soothing zen patterns.',
      'SINGLE-SIDED PRINTING: Every illustration is backed by a dark textured sheet to prevent marker bleed-through on Amazon paper.',
      'PERFECT 8.5 x 11" TRIM SIZE: Large canvas format ensures spacious, satisfying coloring whether using markers, pencils, or gel pens.',
      'PROVEN STRESS RELIEF: Promotes deep diaphragmatic breathing, lowers cortisol, and unlocks meditative creative focus.'
    ],
    htmlDescription: `<h2>Escape the Chaos and Awaken Your Inner Serenity</h2>
<p>Are you feeling overwhelmed by daily screens, deadlines, and anxiety? <b>Mindful Mandalas & Sacred Blooms</b> was specially designed to help you detach from digital fatigue and enter a tranquil state of meditative flow.</p>
<h3>Inside this Amazon Best-Selling Collection:</h3>
<ul>
  <li><b>50 Harmonious Patterns:</b> From gentle beginner mandalas to intricate floral labyrinths.</li>
  <li><b>Stress-Melting Geometric Symmetry:</b> Scientifically structured to center attention and dissolve stress.</li>
  <li><b>Thick Crisp Line Art:</b> Flawlessly formatted at 300 DPI for effortless coloring without gray borders.</li>
</ul>
<p><b>Scroll up and click 'Buy Now' to gift yourself or a loved one hours of pure relaxation!</b></p>`,
    suggestedCategories: [
      'Books > Crafts, Hobbies & Home > Coloring Books for Grown-Ups > Mandalas & Patterns',
      'Books > Health, Fitness & Dieting > Mental Health > Stress Management'
    ],
    suggestedPriceUSD: 9.99,
    estimatedRoyaltyUSD: 4.34,
    sevenBackendKeywords: [
      'mindfulness meditation art therapy anti anxiety',
      'sacred geometry lotus flower botanical patterns',
      'relaxation gifts for women self care routine',
      'large print calming zen designs intricate lines',
      'colored pencil adult activities mental wellness',
      'stress relief hobbies creative outlet weekend',
      'gift for mom sister teacher birthday holiday'
    ]
  });

  const [adsKeywords, setAdsKeywords] = useState<AmazonAdKeyword[]>([
    { keyword: 'adult coloring book', matchType: 'Broad', suggestedBidUSD: 0.45, searchVolume: 'High', relevanceScore: 98 },
    { keyword: 'mandala coloring book for adults', matchType: 'Phrase', suggestedBidUSD: 0.62, searchVolume: 'High', relevanceScore: 95 },
    { keyword: 'stress relief gifts for women', matchType: 'Broad', suggestedBidUSD: 0.38, searchVolume: 'Medium', relevanceScore: 88 },
    { keyword: 'anxiety relief coloring book', matchType: 'Exact', suggestedBidUSD: 0.75, searchVolume: 'Medium', relevanceScore: 92 },
    { keyword: 'mindfulness gifts under 10 dollars', matchType: 'Phrase', suggestedBidUSD: 0.32, searchVolume: 'Low', relevanceScore: 84 },
    { keyword: 'large print coloring for seniors', matchType: 'Exact', suggestedBidUSD: 0.58, searchVolume: 'Medium', relevanceScore: 90 },
  ]);

  const [aplusModules, setAplusModules] = useState<APlusModule[]>([
    {
      id: 'aplus_hero',
      type: 'header_image_text',
      headline: 'Awaken Your Inner Calm with Every Stroke',
      bodyText: 'Every pattern in this edition was drawn by hand to foster deep contemplation and creative tranquility. Say goodbye to digital burnout and hello to grounded serenity.',
    },
    {
      id: 'aplus_triad',
      type: 'standard_3_images',
      headline: 'The Mindful Mandalas Quality Difference',
      bodyText: 'Engineered specifically to avoid the common issues found in cheap AI-generated books on Amazon.',
      points: [
        'Single-Sided Pages with Black Backing (No Bleed)',
        '300 DPI Ultra-Crisp Ink Lines',
        'Large 8.5 x 11" Format with Wide Color Margins'
      ]
    }
  ]);

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
            <ShoppingCart className="w-4 h-4" />
            <span>KDP Listing & Ads Engine</span>
          </div>
          <h1 className="font-display text-3xl font-extrabold text-slate-900 dark:text-white">
            Amazon Listing, Ads & A+ Content
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Generate high-converting Amazon HTML descriptions, Amazon Sponsored Ads keywords with bids, and A+ visual modules.
          </p>
        </div>

        {/* Sub-tab selection */}
        <div className="flex items-center p-1.5 bg-slate-100 dark:bg-slate-800 rounded-xl">
          <button
            onClick={() => setActiveTab('listing')}
            className={`px-3 py-1.5 text-xs font-bold rounded-lg transition ${
              activeTab === 'listing' ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-white shadow-xs' : 'text-slate-600 dark:text-slate-300'
            }`}
          >
            Listing & HTML Description
          </button>
          <button
            onClick={() => setActiveTab('ads')}
            className={`px-3 py-1.5 text-xs font-bold rounded-lg transition ${
              activeTab === 'ads' ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-white shadow-xs' : 'text-slate-600 dark:text-slate-300'
            }`}
          >
            Amazon Ads PPC Harvester
          </button>
          <button
            onClick={() => setActiveTab('aplus')}
            className={`px-3 py-1.5 text-xs font-bold rounded-lg transition ${
              activeTab === 'aplus' ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-white shadow-xs' : 'text-slate-600 dark:text-slate-300'
            }`}
          >
            A+ Content Modules
          </button>
        </div>
      </div>

      {/* TAB 1: LISTING & LIVE AMAZON MOCKUP */}
      {activeTab === 'listing' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Left: Listing Inputs & Raw HTML */}
          <div className="space-y-6">
            <div className="p-6 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-display font-bold text-base text-slate-900 dark:text-white">
                  Amazon Product Details
                </h3>
                <button
                  onClick={() => copyToClipboard(listing.htmlDescription, 'html-desc')}
                  className="px-3 py-1.5 bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 rounded-lg text-xs font-bold flex items-center space-x-1"
                >
                  {copiedKey === 'html-desc' ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>Copy HTML Code</span>
                </button>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1">
                  Amazon Title
                </label>
                <input
                  type="text"
                  value={listing.optimizedTitle}
                  onChange={(e) => setListing({ ...listing, optimizedTitle: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1">
                  Bullet Points (Feature Highlights)
                </label>
                <div className="space-y-2">
                  {listing.bulletPoints.map((bp, i) => (
                    <input
                      key={i}
                      type="text"
                      value={bp}
                      onChange={(e) => {
                        const copy = [...listing.bulletPoints];
                        copy[i] = e.target.value;
                        setListing({ ...listing, bulletPoints: copy });
                      }}
                      className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white"
                    />
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1">
                  HTML Formatted Description
                </label>
                <textarea
                  rows={8}
                  value={listing.htmlDescription}
                  onChange={(e) => setListing({ ...listing, htmlDescription: e.target.value })}
                  className="w-full p-3 font-mono-code text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1">
                  Recommended Amazon Categories
                </label>
                <div className="space-y-1">
                  {listing.suggestedCategories.map((c, i) => (
                    <div key={i} className="text-xs text-slate-600 dark:text-slate-300 font-mono bg-slate-50 dark:bg-slate-900 p-2 rounded border border-slate-200 dark:border-slate-700">
                      {c}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right: Live Amazon Product Page Mockup */}
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 shadow-md space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800 text-xs">
              <span className="font-bold text-amber-600 flex items-center space-x-1">
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Amazon.com Product Preview</span>
              </span>
              <span className="text-slate-400 font-mono">ASIN: B0F9X28KL</span>
            </div>

            {/* Title & Review Stars */}
            <div className="space-y-2">
              <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white leading-snug">
                {listing.optimizedTitle}
              </h2>
              <p className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline cursor-pointer">
                Visit the Aura Bloom Publishing Store
              </p>

              <div className="flex items-center space-x-2 text-xs">
                <div className="flex text-amber-400">
                  <Star className="w-4 h-4 fill-amber-400" />
                  <Star className="w-4 h-4 fill-amber-400" />
                  <Star className="w-4 h-4 fill-amber-400" />
                  <Star className="w-4 h-4 fill-amber-400" />
                  <Star className="w-4 h-4 fill-amber-400 text-slate-300" />
                </div>
                <span className="text-slate-700 dark:text-slate-300 font-bold">4.8 out of 5</span>
                <span className="text-slate-400">• 128 global ratings</span>
              </div>
            </div>

            {/* Price & Buy Box */}
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-between">
              <div>
                <div className="text-[10px] uppercase font-bold text-slate-400">Paperback Price</div>
                <div className="text-2xl font-black text-slate-900 dark:text-white">${listing.suggestedPriceUSD}</div>
                <div className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold flex items-center space-x-1">
                  <Check className="w-3 h-3" />
                  <span>Prime One-Day Delivery</span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-[10px] uppercase font-bold text-slate-400">Author Royalty</div>
                <div className="text-lg font-bold text-emerald-600 dark:text-emerald-400">+${listing.estimatedRoyaltyUSD}</div>
                <div className="text-[10px] text-slate-400">per copy sold</div>
              </div>
            </div>

            {/* Live Rendered HTML Description */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                Live Description Preview
              </h4>
              <div 
                className="prose prose-sm dark:prose-invert max-w-none text-xs text-slate-700 dark:text-slate-300 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700/60 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: listing.htmlDescription }}
              />
            </div>

          </div>

        </div>
      )}

      {/* TAB 2: AMAZON ADS PPC HARVESTER */}
      {activeTab === 'ads' && (
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-700 pb-4">
            <div>
              <h3 className="font-display font-bold text-lg text-slate-900 dark:text-white">
                Amazon Sponsored Products PPC Keywords
              </h3>
              <p className="text-xs text-slate-500">Suggested CPC bids based on historical Amazon Advertising auction data.</p>
            </div>
            <button
              onClick={() => copyToClipboard(adsKeywords.map(k => `${k.keyword}\t${k.matchType}\t${k.suggestedBidUSD}`).join('\n'), 'all-ads')}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold flex items-center space-x-1.5 shadow-sm"
            >
              {copiedKey === 'all-ads' ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
              <span>Export CSV for Amazon Ads</span>
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 dark:bg-slate-900/60 text-slate-500 uppercase tracking-wider border-b border-slate-200 dark:border-slate-700">
                <tr>
                  <th className="py-3 px-4">Search Keyword</th>
                  <th className="py-3 px-4">Match Type</th>
                  <th className="py-3 px-4">Suggested CPC Bid</th>
                  <th className="py-3 px-4">Search Volume</th>
                  <th className="py-3 px-4">Relevance</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-800 dark:text-slate-200">
                {adsKeywords.map((ad, idx) => (
                  <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-slate-700/40 transition">
                    <td className="py-3 px-4 font-semibold">{ad.keyword}</td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400">
                        {ad.matchType}
                      </span>
                    </td>
                    <td className="py-3 px-4 font-mono font-bold text-emerald-600 dark:text-emerald-400">
                      ${ad.suggestedBidUSD.toFixed(2)}
                    </td>
                    <td className="py-3 px-4">
                      <span className={`text-[10px] font-bold uppercase ${ad.searchVolume === 'High' ? 'text-emerald-500' : 'text-amber-500'}`}>
                        {ad.searchVolume}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center space-x-2">
                        <div className="w-16 bg-slate-200 dark:bg-slate-700 h-1.5 rounded-full overflow-hidden">
                          <div className="bg-indigo-600 h-full rounded-full" style={{ width: `${ad.relevanceScore}%` }} />
                        </div>
                        <span className="text-[10px] text-slate-400">{ad.relevanceScore}%</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: A+ CONTENT MODULES */}
      {activeTab === 'aplus' && (
        <div className="space-y-6">
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm space-y-6">
            <div>
              <h3 className="font-display font-bold text-lg text-slate-900 dark:text-white">
                Amazon A+ Enhanced Brand Content
              </h3>
              <p className="text-xs text-slate-500">Books with A+ Content experience a 10-15% increase in conversion rates on mobile.</p>
            </div>

            <div className="space-y-6">
              {aplusModules.map((mod) => (
                <div key={mod.id} className="p-5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/60 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                      Module: {mod.type.replace(/_/g, ' ')}
                    </span>
                    <button
                      onClick={() => copyToClipboard(`${mod.headline}\n${mod.bodyText}`, mod.id)}
                      className="text-xs text-slate-400 hover:text-slate-600 dark:hover:text-white flex items-center space-x-1"
                    >
                      {copiedKey === mod.id ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
                      <span>Copy</span>
                    </button>
                  </div>

                  <h4 className="font-display font-bold text-base text-slate-900 dark:text-white">{mod.headline}</h4>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">{mod.bodyText}</p>

                  {mod.points && (
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                      {mod.points.map((pt, i) => (
                        <div key={i} className="p-3 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 text-xs text-slate-700 dark:text-slate-300 font-medium">
                          ✓ {pt}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
