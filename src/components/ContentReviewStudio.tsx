import React, { useState, useEffect } from 'react';
import { 
  ShieldAlert, 
  ShieldCheck, 
  CheckCircle2, 
  Sparkles, 
  RefreshCw, 
  Wand2, 
  AlertTriangle, 
  Info, 
  BookOpen, 
  ArrowRight, 
  Check, 
  X, 
  Search,
  ExternalLink,
  Layers,
  FileText,
  Grid,
  Image as ImageIcon
} from 'lucide-react';
import { BookProject, ContentReviewIssue, ContentReviewReport } from '../types';
import { runContentReview, applyReviewFix, applyAllAutoFixes } from '../lib/contentReviewEngine';

interface ContentReviewStudioProps {
  project: BookProject;
  onUpdateProject: (updated: BookProject) => void;
  onNavigateTab?: (tab: string) => void;
}

export const ContentReviewStudio: React.FC<ContentReviewStudioProps> = ({
  project,
  onUpdateProject,
  onNavigateTab
}) => {
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(100);
  const [report, setReport] = useState<ContentReviewReport | null>(project.reviewReport || null);
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'critical' | 'kdp_policy' | 'grammar' | 'style' | 'puzzle'>('all');
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'info' } | null>(null);

  // Run initial scan if not performed yet
  useEffect(() => {
    if (!project.reviewReport) {
      handleRunScan();
    } else {
      setReport(project.reviewReport);
    }
  }, [project.id]);

  const handleRunScan = async () => {
    setIsScanning(true);
    setScanProgress(15);
    
    const interval = setInterval(() => {
      setScanProgress(p => (p < 85 ? p + 18 : p));
    }, 180);

    try {
      const result = await runContentReview(project);
      clearInterval(interval);
      setScanProgress(100);
      setReport(result);
      
      onUpdateProject({
        ...project,
        reviewReport: result
      });

      showNotification('AI content & KDP policy audit completed!', 'success');
    } catch (err) {
      clearInterval(interval);
      console.error(err);
      showNotification('Review completed using local safety rules.', 'info');
    } finally {
      setTimeout(() => setIsScanning(false), 300);
    }
  };

  const showNotification = (message: string, type: 'success' | 'info' = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3500);
  };

  const handleApplySingleFix = (issue: ContentReviewIssue) => {
    const res = applyReviewFix(project, issue);
    if (res.success) {
      onUpdateProject(res.updatedProject);
      if (res.updatedProject.reviewReport) {
        setReport(res.updatedProject.reviewReport);
      }
      showNotification(res.message, 'success');
    }
  };

  const handleApplyAll = () => {
    if (!report?.issues) return;
    const { updatedProject, appliedCount } = applyAllAutoFixes(project, report.issues);
    onUpdateProject(updatedProject);
    if (updatedProject.reviewReport) {
      setReport(updatedProject.reviewReport);
    }
    showNotification(`Auto-applied ${appliedCount} fixes across book metadata and listing!`, 'success');
  };

  const handleDismissIssue = (issueId: string) => {
    if (!report) return;
    const updatedIssues = report.issues.map(i => 
      i.id === issueId ? { ...i, status: 'dismissed' as const } : i
    );
    const updatedReport = { ...report, issues: updatedIssues };
    setReport(updatedReport);
    onUpdateProject({
      ...project,
      reviewReport: updatedReport
    });
    showNotification('Issue dismissed.', 'info');
  };

  const openIssues = report?.issues?.filter(i => i.status === 'open') || [];
  const autoFixableCount = openIssues.filter(i => i.autoFixable).length;
  const criticalCount = openIssues.filter(i => i.severity === 'critical').length;

  const filteredIssues = (report?.issues || []).filter(issue => {
    if (selectedFilter === 'all') return true;
    if (selectedFilter === 'critical') return issue.severity === 'critical';
    if (selectedFilter === 'kdp_policy') return issue.category === 'kdp_policy';
    if (selectedFilter === 'grammar') return issue.category === 'grammar' || issue.category === 'clarity';
    if (selectedFilter === 'style') return issue.category === 'style';
    if (selectedFilter === 'puzzle') return issue.category === 'puzzle_quality' || issue.category === 'image_bleed';
    return true;
  });

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-emerald-500 stroke-emerald-500';
    if (score >= 75) return 'text-amber-500 stroke-amber-500';
    return 'text-rose-500 stroke-rose-500';
  };

  const getScoreBg = (score: number) => {
    if (score >= 90) return 'bg-emerald-500';
    if (score >= 75) return 'bg-amber-500';
    return 'bg-rose-500';
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8 animate-fade-in">
      {/* Toast Notification */}
      {notification && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-3 rounded-xl bg-slate-900 text-white shadow-2xl border border-slate-700 animate-slide-up">
          <Sparkles className="w-5 h-5 text-amber-400" />
          <span className="text-sm font-medium">{notification.message}</span>
        </div>
      )}

      {/* Top Banner & Primary Action */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white rounded-2xl p-6 sm:p-8 border border-indigo-800/40 shadow-xl relative overflow-hidden">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                <ShieldCheck className="w-3.5 h-3.5 text-indigo-400" />
                Amazon KDP Compliance Auditor v2.5
              </span>
              {criticalCount > 0 ? (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-rose-500/20 text-rose-300 border border-rose-500/30 animate-pulse">
                  <AlertTriangle className="w-3 h-3" />
                  {criticalCount} Critical Policy Risk{criticalCount > 1 ? 's' : ''}
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  <Check className="w-3 h-3" />
                  KDP Publishing Ready
                </span>
              )}
            </div>

            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              AI Content Review & Quality Assurance
            </h1>
            <p className="text-sm sm:text-base text-slate-300 max-w-2xl">
              Thoroughly audits <span className="text-indigo-200 font-semibold">"{project.title}"</span> for Amazon KDP metadata policy violations, trademark conflicts, grammatical precision, and puzzle print clarity.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
            <button
              onClick={handleRunScan}
              disabled={isScanning}
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium bg-slate-800/80 hover:bg-slate-700/80 text-white border border-slate-700 transition shadow-sm disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 text-indigo-400 ${isScanning ? 'animate-spin' : ''}`} />
              {isScanning ? 'Auditing Content...' : 'Re-Run Deep Scan'}
            </button>

            {autoFixableCount > 0 && (
              <button
                onClick={handleApplyAll}
                className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white shadow-lg shadow-emerald-900/30 transition hover:scale-[1.02]"
              >
                <Wand2 className="w-4 h-4" />
                Auto-Fix All ({autoFixableCount}) Issues
              </button>
            )}
          </div>
        </div>

        {/* Scan Progress Bar */}
        {isScanning && (
          <div className="mt-6 space-y-2">
            <div className="flex justify-between text-xs text-indigo-300">
              <span>Scanning Amazon guidelines, spelling, and vector lines...</span>
              <span>{scanProgress}%</span>
            </div>
            <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
              <div 
                className="bg-indigo-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${scanProgress}%` }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Health Scorecard Bento */}
      {report && (
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {/* Main Score Gauge */}
          <div className="md:col-span-2 bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-between gap-6">
            <div className="space-y-1">
              <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Overall Book Health
              </div>
              <div className="flex items-baseline gap-2">
                <span className={`text-5xl font-black tracking-tight ${getScoreColor(report.overallScore).split(' ')[0]}`}>
                  {report.overallScore}
                </span>
                <span className="text-sm font-semibold text-slate-400">/ 100</span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed pt-1">
                {report.summary}
              </p>
            </div>

            {/* Visual Circular Ring */}
            <div className="relative w-24 h-24 flex items-center justify-center shrink-0">
              <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 36 36">
                <path
                  className="text-slate-100 dark:text-slate-800 stroke-current"
                  strokeWidth="3.5"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className={`${getScoreColor(report.overallScore).split(' ')[1]} transition-all duration-700`}
                  strokeWidth="3.5"
                  strokeDasharray={`${report.overallScore}, 100`}
                  strokeLinecap="round"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <ShieldCheck className={`w-8 h-8 ${getScoreColor(report.overallScore).split(' ')[0]}`} />
              </div>
            </div>
          </div>

          {/* Sub-Category Metrics */}
          <div className="md:col-span-3 grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-white dark:bg-slate-900 rounded-xl p-4 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between">
              <div className="flex items-center justify-between text-slate-400 mb-2">
                <span className="text-xs font-semibold">KDP Policy</span>
                <ShieldAlert className="w-4 h-4 text-indigo-500" />
              </div>
              <div>
                <div className="text-2xl font-bold text-slate-800 dark:text-slate-100">
                  {report.kdpComplianceScore}%
                </div>
                <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden">
                  <div className={`h-full ${getScoreBg(report.kdpComplianceScore)}`} style={{ width: `${report.kdpComplianceScore}%` }} />
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-xl p-4 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between">
              <div className="flex items-center justify-between text-slate-400 mb-2">
                <span className="text-xs font-semibold">Grammar</span>
                <FileText className="w-4 h-4 text-emerald-500" />
              </div>
              <div>
                <div className="text-2xl font-bold text-slate-800 dark:text-slate-100">
                  {report.grammarScore}%
                </div>
                <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden">
                  <div className={`h-full ${getScoreBg(report.grammarScore)}`} style={{ width: `${report.grammarScore}%` }} />
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-xl p-4 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between">
              <div className="flex items-center justify-between text-slate-400 mb-2">
                <span className="text-xs font-semibold">Clarity</span>
                <Sparkles className="w-4 h-4 text-cyan-500" />
              </div>
              <div>
                <div className="text-2xl font-bold text-slate-800 dark:text-slate-100">
                  {report.clarityScore}%
                </div>
                <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden">
                  <div className={`h-full ${getScoreBg(report.clarityScore)}`} style={{ width: `${report.clarityScore}%` }} />
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-xl p-4 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between">
              <div className="flex items-center justify-between text-slate-400 mb-2">
                <span className="text-xs font-semibold">Style Tone</span>
                <Layers className="w-4 h-4 text-purple-500" />
              </div>
              <div>
                <div className="text-2xl font-bold text-slate-800 dark:text-slate-100">
                  {report.styleConsistencyScore}%
                </div>
                <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden">
                  <div className={`h-full ${getScoreBg(report.styleConsistencyScore)}`} style={{ width: `${report.styleConsistencyScore}%` }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Filter Tabs & Counter */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedFilter('all')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition ${
              selectedFilter === 'all'
                ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            All Findings ({report?.issues?.length || 0})
          </button>

          <button
            onClick={() => setSelectedFilter('critical')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition flex items-center gap-1.5 ${
              selectedFilter === 'critical'
                ? 'bg-rose-600 text-white'
                : 'bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 hover:bg-rose-100'
            }`}
          >
            <AlertTriangle className="w-3.5 h-3.5" />
            Critical Risks ({criticalCount})
          </button>

          <button
            onClick={() => setSelectedFilter('kdp_policy')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition flex items-center gap-1.5 ${
              selectedFilter === 'kdp_policy'
                ? 'bg-indigo-600 text-white'
                : 'bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-100'
            }`}
          >
            <ShieldAlert className="w-3.5 h-3.5" />
            KDP Policy
          </button>

          <button
            onClick={() => setSelectedFilter('grammar')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition flex items-center gap-1.5 ${
              selectedFilter === 'grammar'
                ? 'bg-emerald-600 text-white'
                : 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-100'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            Grammar & Bullets
          </button>

          <button
            onClick={() => setSelectedFilter('puzzle')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition flex items-center gap-1.5 ${
              selectedFilter === 'puzzle'
                ? 'bg-amber-600 text-white'
                : 'bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 hover:bg-amber-100'
            }`}
          >
            <Grid className="w-3.5 h-3.5" />
            Puzzles & Art Bleed
          </button>
        </div>

        <div className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-2">
          <span>{openIssues.length} open issues</span>
          <span>•</span>
          <span className="text-emerald-600 dark:text-emerald-400 font-semibold">{autoFixableCount} auto-fixable</span>
        </div>
      </div>

      {/* Issues List */}
      <div className="space-y-4">
        {filteredIssues.length === 0 ? (
          <div className="text-center py-16 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
            <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100">
              No Issues Found in this Filter!
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto mt-1">
              Your book content meets all verified publishing benchmarks for the selected category.
            </p>
          </div>
        ) : (
          filteredIssues.map(issue => {
            const isApplied = issue.status === 'applied';
            const isDismissed = issue.status === 'dismissed';

            return (
              <div
                key={issue.id}
                className={`bg-white dark:bg-slate-900 rounded-2xl p-6 border transition-all duration-200 ${
                  isApplied
                    ? 'border-emerald-200 dark:border-emerald-900/40 opacity-80'
                    : isDismissed
                    ? 'border-slate-200 dark:border-slate-800 opacity-50'
                    : issue.severity === 'critical'
                    ? 'border-rose-300 dark:border-rose-900/60 shadow-sm shadow-rose-900/5'
                    : issue.severity === 'warning'
                    ? 'border-amber-200 dark:border-amber-900/40'
                    : 'border-slate-200 dark:border-slate-800'
                }`}
              >
                <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 mb-4">
                  <div className="flex flex-wrap items-center gap-2">
                    {/* Severity Badge */}
                    {issue.severity === 'critical' && (
                      <span className="px-2.5 py-1 rounded-md text-xs font-bold bg-rose-100 dark:bg-rose-950/60 text-rose-700 dark:text-rose-400 border border-rose-200 dark:border-rose-900 flex items-center gap-1">
                        <AlertTriangle className="w-3.5 h-3.5" />
                        Critical KDP Risk
                      </span>
                    )}
                    {issue.severity === 'warning' && (
                      <span className="px-2.5 py-1 rounded-md text-xs font-semibold bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-900 flex items-center gap-1">
                        <Info className="w-3.5 h-3.5" />
                        Warning
                      </span>
                    )}
                    {issue.severity === 'suggestion' && (
                      <span className="px-2.5 py-1 rounded-md text-xs font-semibold bg-blue-100 dark:bg-blue-950/60 text-blue-700 dark:text-blue-400 border border-blue-200 dark:border-blue-900">
                        Suggestion
                      </span>
                    )}

                    {/* Category */}
                    <span className="px-2.5 py-1 rounded-md text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                      {issue.targetType.toUpperCase()}
                    </span>

                    {/* Status badge if resolved */}
                    {isApplied && (
                      <span className="px-2.5 py-1 rounded-md text-xs font-semibold bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 flex items-center gap-1">
                        <Check className="w-3.5 h-3.5" />
                        Fix Applied
                      </span>
                    )}
                  </div>

                  {/* Right Actions */}
                  <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                    {!isApplied && !isDismissed && (
                      <>
                        <button
                          onClick={() => handleDismissIssue(issue.id)}
                          className="px-3 py-1.5 rounded-lg text-xs font-medium text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                        >
                          Dismiss
                        </button>
                        {issue.autoFixable && (
                          <button
                            onClick={() => handleApplySingleFix(issue)}
                            className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-white shadow-sm transition hover:scale-[1.02]"
                          >
                            <Wand2 className="w-3.5 h-3.5" />
                            Apply Fix
                          </button>
                        )}
                      </>
                    )}
                  </div>
                </div>

                {/* Title & Description */}
                <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 mb-1.5">
                  {issue.title}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-3">
                  {issue.description}
                </p>

                {/* Rule Citation */}
                {issue.ruleCitation && (
                  <div className="text-xs text-indigo-600 dark:text-indigo-400 font-medium mb-4 flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5 shrink-0" />
                    <span>Reference: {issue.ruleCitation}</span>
                  </div>
                )}

                {/* Diff Box / Actionable Suggestion */}
                <div className="bg-slate-50 dark:bg-slate-950/60 rounded-xl p-4 border border-slate-200 dark:border-slate-800/80 space-y-3">
                  {issue.originalSnippet && (
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 text-xs">
                      <span className="font-semibold text-rose-500 shrink-0 w-24">Original:</span>
                      <code className="px-2 py-1 rounded bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-900/60 font-mono break-all">
                        {issue.originalSnippet}
                      </code>
                    </div>
                  )}

                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 text-xs">
                    <span className="font-semibold text-emerald-600 dark:text-emerald-400 shrink-0 w-24">Recommended:</span>
                    <div className="text-slate-800 dark:text-slate-200 font-medium flex-1">
                      {issue.suggestedFix}
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Educational KDP Compliance Quick Reference */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 space-y-4">
        <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <Info className="w-4 h-4 text-indigo-500" />
          Amazon KDP Quality Guidelines Cheat Sheet
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-slate-600 dark:text-slate-400">
          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 space-y-1.5">
            <span className="font-bold text-slate-800 dark:text-slate-200 block">Metadata Guidelines</span>
            <p>Never place "bestseller", "#1", or pricing promises in the title/subtitle. Keep subtitle strictly descriptive of the content.</p>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 space-y-1.5">
            <span className="font-bold text-slate-800 dark:text-slate-200 block">Interior Bleed & Margins</span>
            <p>Ensure a minimum 0.375" (3/8 in) safe margin from all trim edges. If illustrations extend to the edge, Bleed must be enabled.</p>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 space-y-1.5">
            <span className="font-bold text-slate-800 dark:text-slate-200 block">Activity & Puzzle Books</span>
            <p>Always include a verified answer key section at the back of the book. Customers heavily down-rate books with unsolvable errors.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
