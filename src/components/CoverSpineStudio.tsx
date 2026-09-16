import React, { useState } from 'react';
import { 
  Layers, 
  RotateCw, 
  Sparkles, 
  Check, 
  Download, 
  Eye, 
  Sliders, 
  BookOpen, 
  Maximize2 
} from 'lucide-react';
import { calculateKdpDimensions, TRIM_DIMENSIONS } from '../lib/kdpCalculator';
import { TrimSize, PaperType } from '../types';

export const CoverSpineStudio: React.FC = () => {
  const [trimSize, setTrimSize] = useState<TrimSize>('8.5x11');
  const [paperType, setPaperType] = useState<PaperType>('white');
  const [pageCount, setPageCount] = useState<number>(80);
  const [title, setTitle] = useState('MINDFUL MANDALAS & SACRED BLOOMS');
  const [subtitle, setSubtitle] = useState('50 Relaxing Floral Geometric Patterns for Stress Relief');
  const [authorName, setAuthorName] = useState('Aura Bloom Publishing');
  const [primaryColor, setPrimaryColor] = useState('#312e81');
  const [textColor, setTextColor] = useState('#ffffff');
  const [blurb, setBlurb] = useState(
    'Unwind your mind and restore inner balance with 50 intricately designed botanical mandalas. Carefully engineered for colored pencils, gel pens, and fine-line markers with zero bleed-through.'
  );
  const [viewMode, setViewMode] = useState<'wrap' | '3d'>('wrap');

  const dims = calculateKdpDimensions(trimSize, paperType, pageCount, true);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-6">
        <div>
          <div className="flex items-center space-x-2 text-indigo-600 dark:text-indigo-400 font-bold text-xs uppercase tracking-wider mb-1">
            <Layers className="w-4 h-4" />
            <span>KDP Cover & Spine Mathematics</span>
          </div>
          <h1 className="font-display text-3xl font-extrabold text-slate-900 dark:text-white">
            Cover & Spine Designer
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Exact Amazon KDP wrap cover dimensions with spine calculation, bleed rules, and 3D preview.
          </p>
        </div>

        {/* View Mode Toggle */}
        <div className="flex items-center p-1.5 bg-slate-100 dark:bg-slate-800 rounded-xl">
          <button
            onClick={() => setViewMode('wrap')}
            className={`px-3 py-1.5 text-xs font-bold rounded-lg transition ${
              viewMode === 'wrap' ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-white shadow-xs' : 'text-slate-600 dark:text-slate-300'
            }`}
          >
            Flat Wrap Spec
          </button>
          <button
            onClick={() => setViewMode('3d')}
            className={`px-3 py-1.5 text-xs font-bold rounded-lg transition ${
              viewMode === '3d' ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-white shadow-xs' : 'text-slate-600 dark:text-slate-300'
            }`}
          >
            3D Realistic Mockup
          </button>
        </div>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Controls Column */}
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm space-y-5">
          <h3 className="font-display font-bold text-base text-slate-900 dark:text-white">
            Cover Dimensions & Text
          </h3>

          {/* Trim size */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
              Trim Size
            </label>
            <select
              value={trimSize}
              onChange={(e: any) => setTrimSize(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white"
            >
              {(Object.keys(TRIM_DIMENSIONS) as TrimSize[]).map((t) => (
                <option key={t} value={t}>{t}" - {TRIM_DIMENSIONS[t].label.split('(')[1]?.replace(')', '')}</option>
              ))}
            </select>
          </div>

          {/* Paper Type */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
              Paper Stock
            </label>
            <div className="grid grid-cols-3 gap-1.5">
              {(['white', 'cream', 'color'] as PaperType[]).map((p) => (
                <button
                  key={p}
                  onClick={() => setPaperType(p)}
                  className={`py-1.5 text-xs font-bold capitalize rounded-lg border transition ${
                    paperType === p
                      ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 border-transparent'
                      : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400'
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          {/* Page count slider */}
          <div>
            <div className="flex justify-between items-center text-xs mb-1">
              <span className="font-bold text-slate-700 dark:text-slate-300 uppercase">Page Count</span>
              <span className="font-bold text-indigo-600">{pageCount} pages</span>
            </div>
            <input
              type="range"
              min={24}
              max={200}
              step={2}
              value={pageCount}
              onChange={(e) => setPageCount(Number(e.target.value))}
              className="w-full accent-indigo-600"
            />
          </div>

          {/* Spine width readout */}
          <div className="p-3 bg-indigo-50 dark:bg-indigo-950/40 rounded-xl border border-indigo-200/60 dark:border-indigo-900 text-xs flex justify-between items-center">
            <span className="text-slate-600 dark:text-slate-300 font-medium">Calculated Spine:</span>
            <span className="font-mono font-bold text-indigo-600 dark:text-indigo-400 text-sm">
              {dims.spineWidth}" ({ (dims.spineWidth * 25.4).toFixed(2) } mm)
            </span>
          </div>

          {/* Typography Inputs */}
          <div className="space-y-3 pt-2">
            <div>
              <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 uppercase mb-1">Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3 py-2 text-xs font-bold rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 uppercase mb-1">Subtitle</label>
              <input
                type="text"
                value={subtitle}
                onChange={(e) => setSubtitle(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 uppercase mb-1">Author Name</label>
              <input
                type="text"
                value={authorName}
                onChange={(e) => setAuthorName(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 uppercase mb-1">Theme Color</label>
              <div className="flex items-center space-x-2">
                <input
                  type="color"
                  value={primaryColor}
                  onChange={(e) => setPrimaryColor(e.target.value)}
                  className="w-10 h-8 rounded cursor-pointer"
                />
                <span className="font-mono text-xs text-slate-600 dark:text-slate-400">{primaryColor}</span>
              </div>
            </div>
          </div>

        </div>

        {/* Visual Preview Canvas */}
        <div className="lg:col-span-2 p-6 sm:p-8 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm flex flex-col items-center justify-center min-h-[460px]">
          
          {viewMode === 'wrap' ? (
            <div className="w-full space-y-4">
              <div className="flex justify-between items-center text-xs text-slate-400">
                <span>Wrap Width: {dims.totalCoverWidth}"</span>
                <span className="text-rose-500 font-semibold">• Pink Dashes = 0.125" Bleed Edge</span>
                <span>Wrap Height: {dims.totalCoverHeight}"</span>
              </div>

              {/* The Full Wrap Container */}
              <div
                className="w-full rounded-xl shadow-2xl overflow-hidden border-2 border-dashed border-rose-400 relative flex"
                style={{
                  backgroundColor: primaryColor,
                  minHeight: '380px',
                  color: textColor,
                }}
              >
                {/* Back Cover */}
                <div className="flex-1 p-6 flex flex-col justify-between border-r border-white/20">
                  <div className="space-y-3">
                    <span className="text-[9px] uppercase tracking-widest bg-white/20 px-2 py-0.5 rounded font-bold">
                      Back Cover
                    </span>
                    <p className="text-xs leading-relaxed opacity-90 line-clamp-6">
                      {blurb}
                    </p>
                  </div>

                  {/* KDP Barcode Box */}
                  <div className="self-end bg-white text-slate-900 p-2 rounded shadow text-center w-28 border border-slate-300">
                    <div className="h-8 bg-slate-900/10 flex items-center justify-center space-x-0.5 px-1">
                      <div className="w-1 h-6 bg-slate-800" />
                      <div className="w-0.5 h-6 bg-slate-800" />
                      <div className="w-1.5 h-6 bg-slate-800" />
                      <div className="w-0.5 h-6 bg-slate-800" />
                      <div className="w-2 h-6 bg-slate-800" />
                    </div>
                    <div className="text-[9px] font-mono font-bold mt-1 text-slate-600">ISBN-13 Barcode</div>
                  </div>
                </div>

                {/* Spine */}
                <div 
                  className="w-12 bg-black/25 border-x border-white/25 flex items-center justify-center overflow-hidden"
                  style={{ minWidth: '32px' }}
                >
                  <div className="rotate-90 whitespace-nowrap text-[10px] font-bold tracking-widest uppercase font-display">
                    {title} • {authorName}
                  </div>
                </div>

                {/* Front Cover */}
                <div className="flex-1 p-6 flex flex-col justify-between">
                  <div className="space-y-3">
                    <span className="text-[9px] uppercase tracking-widest bg-white/20 px-2 py-0.5 rounded font-bold">
                      Front Cover
                    </span>
                    <h2 className="font-display font-black text-2xl sm:text-3xl leading-tight">
                      {title}
                    </h2>
                    <p className="text-xs sm:text-sm font-medium opacity-90">
                      {subtitle}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-white/20 text-xs font-semibold uppercase tracking-wider">
                    By {authorName}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* 3D Realistic Mockup Presentation */
            <div className="flex items-center justify-center py-8">
              <div 
                className="w-64 sm:w-72 rounded-r-2xl shadow-2xl p-6 sm:p-8 flex flex-col justify-between text-white transform -rotate-3 hover:rotate-0 transition-transform duration-300 relative border-l-8 border-l-black/40"
                style={{
                  backgroundColor: primaryColor,
                  minHeight: '380px',
                  boxShadow: '20px 20px 50px rgba(0,0,0,0.35)',
                }}
              >
                <div className="space-y-4">
                  <div className="w-8 h-1 bg-white/40 rounded-full" />
                  <h3 className="font-display font-black text-2xl leading-tight">
                    {title}
                  </h3>
                  <p className="text-xs opacity-90 line-clamp-3">
                    {subtitle}
                  </p>
                </div>

                <div className="pt-6 border-t border-white/20 flex justify-between items-center text-xs">
                  <span className="font-bold">{authorName}</span>
                  <span className="text-[10px] px-2 py-0.5 bg-white/20 rounded">KDP Ready</span>
                </div>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
