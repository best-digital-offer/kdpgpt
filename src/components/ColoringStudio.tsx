import React, { useState } from 'react';
import { 
  Palette, 
  Sparkles, 
  Download, 
  Copy, 
  Check, 
  ZoomIn, 
  Maximize2, 
  Sliders, 
  Layers,
  FileCode,
  Brush
} from 'lucide-react';
import { COLORING_PRESETS, ColoringStylePreset } from '../lib/coloringPresets';

export const ColoringStudio: React.FC = () => {
  const [selectedPreset, setSelectedPreset] = useState<ColoringStylePreset>(COLORING_PRESETS[0]);
  const [customPrompt, setCustomPrompt] = useState(
    'Intricate sacred geometry lotus flower with blooming petals and stars, 300 DPI vector line art, adult coloring book page, crisp outlines, pure white background'
  );
  const [copiedPrompt, setCopiedPrompt] = useState(false);
  const [invertCanvas, setInvertCanvas] = useState(false);
  const [strokeWidth, setStrokeWidth] = useState(2.5);

  const handleCopyPrompt = () => {
    navigator.clipboard.writeText(customPrompt);
    setCopiedPrompt(true);
    setTimeout(() => setCopiedPrompt(false), 2000);
  };

  const handleDownloadSvg = () => {
    const blob = new Blob([selectedPreset.sampleSvg], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${selectedPreset.id}_coloring_page.svg`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-6">
        <div>
          <div className="flex items-center space-x-2 text-indigo-600 dark:text-indigo-400 font-bold text-xs uppercase tracking-wider mb-1">
            <Palette className="w-4 h-4" />
            <span>KDP Coloring Book Vector Engine</span>
          </div>
          <h1 className="font-display text-3xl font-extrabold text-slate-900 dark:text-white">
            Coloring Page Studio
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Generate 300 DPI print-ready black and white line art vector pages for adult and children coloring books.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={handleDownloadSvg}
            className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition flex items-center space-x-2 shadow-sm"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download Vector SVG</span>
          </button>
        </div>
      </div>

      {/* Main Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Style Presets & AI Prompt Column */}
        <div className="space-y-6">
          
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm space-y-4">
            <h3 className="font-display font-bold text-base text-slate-900 dark:text-white flex items-center space-x-2">
              <Brush className="w-4 h-4 text-indigo-500" />
              <span>Coloring Style Presets</span>
            </h3>

            <div className="space-y-2.5">
              {COLORING_PRESETS.map((preset) => {
                const isSelected = selectedPreset.id === preset.id;
                return (
                  <div
                    key={preset.id}
                    onClick={() => {
                      setSelectedPreset(preset);
                      setCustomPrompt(`${preset.name}, ${preset.description}, ${preset.promptSuffix}`);
                    }}
                    className={`p-3.5 rounded-xl border-2 cursor-pointer transition ${
                      isSelected
                        ? 'border-indigo-600 bg-indigo-50/60 dark:bg-indigo-950/40 shadow-xs'
                        : 'border-slate-200 dark:border-slate-700 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-xs text-slate-900 dark:text-white">{preset.name}</span>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300">
                        {preset.category}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">{preset.description}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* AI Image Generation Prompt Card for Flux/SD */}
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-display font-bold text-xs uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center space-x-1.5">
                <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
                <span>Flux & SD Master Prompt</span>
              </span>
              <button
                onClick={handleCopyPrompt}
                className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 flex items-center space-x-1"
              >
                {copiedPrompt ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedPrompt ? 'Copied' : 'Copy'}</span>
              </button>
            </div>

            <textarea
              rows={4}
              value={customPrompt}
              onChange={(e) => setCustomPrompt(e.target.value)}
              className="w-full p-3 font-mono-code text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-200 leading-relaxed"
            />
            <p className="text-[10px] text-slate-400">
              Engineered with negative weights: no grayscale, no photorealism, no shaded gradients.
            </p>
          </div>

        </div>

        {/* Live Vector Artwork Canvas */}
        <div className="lg:col-span-2 p-6 sm:p-8 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm flex flex-col items-center justify-between space-y-6">
          
          <div className="w-full flex items-center justify-between border-b border-slate-100 dark:border-slate-700 pb-3">
            <div>
              <h3 className="font-display font-bold text-lg text-slate-900 dark:text-white">
                {selectedPreset.name}
              </h3>
              <p className="text-xs text-slate-400">Vector SVG Canvas • KDP 300 DPI Ready</p>
            </div>

            <div className="flex items-center space-x-3 text-xs">
              <label className="flex items-center space-x-1 text-slate-600 dark:text-slate-400 cursor-pointer">
                <input
                  type="checkbox"
                  checked={invertCanvas}
                  onChange={(e) => setInvertCanvas(e.target.checked)}
                  className="accent-indigo-600 rounded"
                />
                <span>Dark Slate Mode</span>
              </label>
            </div>
          </div>

          {/* SVG Frame */}
          <div 
            className={`w-full max-w-md p-6 rounded-2xl border-2 border-dashed transition-all flex items-center justify-center ${
              invertCanvas 
                ? 'bg-slate-950 border-slate-800' 
                : 'bg-white border-slate-200 shadow-lg'
            }`}
          >
            <div 
              className="w-full"
              dangerouslySetInnerHTML={{ __html: selectedPreset.sampleSvg }}
            />
          </div>

          {/* Footer info */}
          <div className="w-full flex items-center justify-between text-xs text-slate-400 pt-3 border-t border-slate-100 dark:border-slate-700">
            <span>Trim safe margins: 0.375" applied</span>
            <span>Single-sided dark backing sheet ready</span>
          </div>

        </div>

      </div>
    </div>
  );
};
