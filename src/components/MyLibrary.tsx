import React from 'react';
import { 
  BookOpen, 
  Sparkles, 
  FileDown, 
  Copy, 
  Trash2, 
  Edit3, 
  Calendar, 
  Zap, 
  Layers, 
  Plus,
  ShieldCheck
} from 'lucide-react';
import { BookProject, UserProfile } from '../types';
import { exportKdpPdf } from '../lib/pdfGenerator';

interface MyLibraryProps {
  projects: BookProject[];
  user: UserProfile;
  onSelectProject: (proj: BookProject) => void;
  onReviewProject?: (proj: BookProject) => void;
  onNewProject: () => void;
  onDuplicateProject: (proj: BookProject) => void;
  onDeleteProject: (id: string) => void;
  onOpenBilling: () => void;
}

export const MyLibrary: React.FC<MyLibraryProps> = ({
  projects,
  user,
  onSelectProject,
  onReviewProject,
  onNewProject,
  onDuplicateProject,
  onDeleteProject,
  onOpenBilling,
}) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      
      {/* Header with Stats */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-6">
        <div>
          <div className="flex items-center space-x-2 text-indigo-600 dark:text-indigo-400 font-bold text-xs uppercase tracking-wider mb-1">
            <BookOpen className="w-4 h-4" />
            <span>Author Workspace</span>
          </div>
          <h1 className="font-display text-3xl font-extrabold text-slate-900 dark:text-white">
            My Books & Saved Projects
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Manage your Amazon KDP catalogue, re-export PDFs, and continue editing drafts.
          </p>
        </div>

        <button
          onClick={onNewProject}
          className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition flex items-center space-x-2 shadow-sm"
        >
          <Plus className="w-4 h-4" />
          <span>New AI Book Project</span>
        </button>
      </div>

      {/* Account Usage Metrics Banner */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xs">
          <div className="text-xs text-slate-400">Total Books Created</div>
          <div className="text-2xl font-bold text-slate-900 dark:text-white mt-1">{projects.length}</div>
        </div>

        <div className="p-4 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xs">
          <div className="text-xs text-slate-400">Current Plan</div>
          <div className="text-2xl font-bold capitalize text-indigo-600 dark:text-indigo-400 mt-1">{user.plan}</div>
        </div>

        <div className="p-4 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xs">
          <div className="text-xs text-slate-400">Daily AI Limit</div>
          <div className="text-2xl font-bold text-slate-900 dark:text-white mt-1">
            {user.plan === 'free' ? `${user.dailyGenerationsLeft} / 3 left` : 'Unlimited'}
          </div>
        </div>

        <div className="p-4 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xs flex items-center justify-between">
          <div>
            <div className="text-xs text-slate-400">Need More?</div>
            <div className="text-xs font-bold text-slate-900 dark:text-white mt-1">Pro & Agency Plan</div>
          </div>
          <button
            onClick={onOpenBilling}
            className="px-3 py-1 bg-gradient-to-r from-amber-500 to-amber-600 text-white text-xs font-bold rounded-lg shadow-xs"
          >
            Upgrade
          </button>
        </div>
      </div>

      {/* Projects Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((proj) => (
          <div
            key={proj.id}
            className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/90 shadow-sm hover:shadow-md transition overflow-hidden flex flex-col justify-between"
          >
            {/* Top Preview Banner */}
            <div 
              className="h-32 p-4 flex flex-col justify-between relative text-white"
              style={{ backgroundColor: proj.primaryColor || '#312e81' }}
            >
              <div className="flex justify-between items-start">
                <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-black/30 backdrop-blur-xs">
                  {proj.bookType}
                </span>
                <span className="text-[10px] font-mono bg-white/20 px-2 py-0.5 rounded font-bold">
                  {proj.trimSize}" • {proj.pageCount}p
                </span>
              </div>
              <div>
                <h3 className="font-display font-bold text-base line-clamp-1 drop-shadow-sm">{proj.title}</h3>
                <p className="text-[11px] opacity-90 line-clamp-1">{proj.authorName}</p>
              </div>
            </div>

            {/* Body Info */}
            <div className="p-5 space-y-3 flex-1">
              <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed">
                {proj.subtitle}
              </p>

              <div className="flex items-center space-x-2 text-[11px] text-slate-400">
                <Calendar className="w-3.5 h-3.5" />
                <span>Updated: {proj.updatedAt}</span>
              </div>

              <div className="flex flex-wrap gap-1 pt-1">
                {proj.keywords?.slice(0, 3).map((k, i) => (
                  <span key={i} className="text-[10px] px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300">
                    #{k.split(' ')[0]}
                  </span>
                ))}
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="p-4 bg-slate-50 dark:bg-slate-900/60 border-t border-slate-100 dark:border-slate-700/60 flex items-center justify-between">
              <div className="flex items-center space-x-1.5">
                <button
                  onClick={() => onSelectProject(proj)}
                  className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-bold transition flex items-center space-x-1"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>Studio</span>
                </button>
                {onReviewProject && (
                  <button
                    onClick={() => onReviewProject(proj)}
                    className="px-2.5 py-1.5 bg-slate-200 dark:bg-slate-700 hover:bg-indigo-100 dark:hover:bg-indigo-900/60 text-slate-700 dark:text-slate-200 hover:text-indigo-600 rounded-lg text-xs font-semibold transition flex items-center space-x-1"
                    title="Audit Content & KDP Policy"
                  >
                    <ShieldCheck className="w-3.5 h-3.5 text-indigo-500" />
                    <span>Audit</span>
                  </button>
                )}
              </div>

              <div className="flex items-center space-x-1 text-slate-400">
                <button
                  onClick={() => exportKdpPdf(proj)}
                  className="p-1.5 hover:text-emerald-500 transition"
                  title="Download KDP PDF"
                >
                  <FileDown className="w-4 h-4" />
                </button>
                <button
                  onClick={() => onDuplicateProject(proj)}
                  className="p-1.5 hover:text-indigo-500 transition"
                  title="Duplicate Book"
                >
                  <Copy className="w-4 h-4" />
                </button>
                <button
                  onClick={() => onDeleteProject(proj.id)}
                  className="p-1.5 hover:text-rose-500 transition"
                  title="Delete Book"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
