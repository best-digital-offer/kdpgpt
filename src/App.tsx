import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { StudioWizard } from './components/StudioWizard';
import { NicheKeywordLab } from './components/NicheKeywordLab';
import { PuzzleStudio } from './components/PuzzleStudio';
import { ColoringStudio } from './components/ColoringStudio';
import { CoverSpineStudio } from './components/CoverSpineStudio';
import { AmazonOptimizer } from './components/AmazonOptimizer';
import { ContentReviewStudio } from './components/ContentReviewStudio';
import { MyLibrary } from './components/MyLibrary';
import { MarketingHub } from './components/MarketingHub';
import { AdminPanel } from './components/AdminPanel';
import { AuthModal } from './components/AuthModal';
import { BillingModal } from './components/BillingModal';
import { BookProject, UserProfile, SubscriptionTier } from './types';
import { INITIAL_USER, INITIAL_PROJECTS } from './lib/mockData';

export default function App() {
  const [currentTab, setCurrentTab] = useState<string>('studio');
  const [user, setUser] = useState<UserProfile>(INITIAL_USER);
  const [projects, setProjects] = useState<BookProject[]>(INITIAL_PROJECTS);
  const [currentProject, setCurrentProject] = useState<BookProject>(INITIAL_PROJECTS[0]);
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [authModalOpen, setAuthModalOpen] = useState<boolean>(false);
  const [billingModalOpen, setBillingModalOpen] = useState<boolean>(false);

  // Sync dark mode class with root html element
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Project management handlers
  const handleUpdateProject = (updated: BookProject) => {
    setCurrentProject(updated);
    setProjects(prev => prev.map(p => (p.id === updated.id ? updated : p)));
  };

  const handleSaveProject = (saved: BookProject) => {
    const exists = projects.some(p => p.id === saved.id);
    if (exists) {
      setProjects(prev => prev.map(p => (p.id === saved.id ? saved : p)));
    } else {
      setProjects(prev => [saved, ...prev]);
    }
    setCurrentProject(saved);
  };

  const handleNewProject = () => {
    const newBook: BookProject = {
      id: `proj_${Date.now()}`,
      title: 'Untamed Wildlife Coloring Book',
      subtitle: '45 Relaxing Realistic Safari and Jungle Animal Patterns',
      targetNiche: 'Animal Coloring Book for Adults',
      targetAudience: 'Adults, teens, nature lovers, relaxation',
      bookType: 'coloring',
      trimSize: '8.5x11',
      paperType: 'white',
      hasBleed: true,
      pageCount: 50,
      authorName: user.name || 'Bestselling Author',
      primaryColor: '#047857',
      accentColor: '#10b981',
      spineWidthInches: 0.113,
      coverWidthInches: 17.363,
      coverHeightInches: 11.25,
      backCoverBlurb: 'Immerse yourself in nature with 45 intricately rendered safari and jungle patterns.',
      createdAt: new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0],
      keywords: ['wildlife coloring book', 'safari animals line art', 'stress relief adults'],
      amazonBackendKeywords: [
        'wildlife coloring book safari animals',
        'stress relief art therapy adult creative',
        'thick paper single sided no bleed pens',
        'gift ideas for nature lovers birthday present',
        'large print relaxing mindfulness hobby',
        'calm evening routine screen free quiet',
        'detailed realistic safari animal illustrations'
      ],
      pages: [
        {
          id: 'p_cover',
          pageNumber: 1,
          type: 'title',
          title: 'Untamed Wildlife Coloring Book',
          subtitle: '45 Relaxing Realistic Safari and Jungle Animal Patterns',
          content: 'By ' + (user.name || 'Bestselling Author'),
        },
        {
          id: 'p_cr',
          pageNumber: 2,
          type: 'copyright',
          title: 'Copyright Notice',
          content: `Copyright © ${new Date().getFullYear()} by ${user.name}. All rights reserved.`,
        },
        {
          id: 'p_c1',
          pageNumber: 3,
          type: 'coloring',
          title: 'Majestic Serengeti Lion',
          content: 'Crisp 300 DPI vector line art.',
        }
      ],
      listing: {
        optimizedTitle: 'Untamed Wildlife Coloring Book: 45 Relaxing Realistic Safari Patterns',
        optimizedSubtitle: 'Adult Coloring Book for Mindfulness and Stress Relief',
        bulletPoints: [
          '45 HAND-CRAFTED VECTORS: Detailed lion, elephant, tiger, and owl line art.',
          'SINGLE SIDED: Dark textured backings on every page to prevent bleed-through.',
          'LARGE 8.5 x 11" CANVAS: Spacious format ideal for markers and colored pencils.'
        ],
        htmlDescription: '<p>Immerse yourself in nature with untamed wildlife illustrations.</p>',
        suggestedCategories: ['Books > Crafts & Hobbies > Coloring Books > Animals'],
        suggestedPriceUSD: 8.99,
        estimatedRoyaltyUSD: 3.84,
        sevenBackendKeywords: ['animal coloring book adult relaxation mindfulness']
      },
      adsKeywords: [
        { keyword: 'wildlife coloring book', matchType: 'Broad', suggestedBidUSD: 0.42, searchVolume: 'High', relevanceScore: 96 }
      ],
      aplusModules: [
        {
          id: 'aplus_1',
          type: 'header_image_text',
          headline: 'Intricate Wildlife Line Art',
          bodyText: 'High resolution 300 DPI vector lines engineered for standard KDP print paper.'
        }
      ]
    };

    setProjects(prev => [newBook, ...prev]);
    setCurrentProject(newBook);
    setCurrentTab('studio');
  };

  const handleDuplicateProject = (proj: BookProject) => {
    const clone: BookProject = {
      ...proj,
      id: `proj_${Date.now()}`,
      title: `${proj.title} (Copy)`,
      updatedAt: new Date().toISOString().split('T')[0],
    };
    setProjects(prev => [clone, ...prev]);
  };

  const handleDeleteProject = (id: string) => {
    setProjects(prev => prev.filter(p => p.id !== id));
    if (currentProject.id === id && projects.length > 1) {
      setCurrentProject(projects.find(p => p.id !== id)!);
    }
  };

  const handleUpgradePlan = (tier: SubscriptionTier) => {
    setUser(prev => ({
      ...prev,
      plan: tier,
      dailyGenerationsLeft: tier === 'free' ? 3 : 99999,
    }));
  };

  const handleAuthSuccess = (updatedUser: Partial<UserProfile>) => {
    setUser(prev => ({
      ...prev,
      ...updatedUser,
    }));
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans transition-colors selection:bg-indigo-500 selection:text-white">
      
      {/* Primary Navigation Bar */}
      <Navbar
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        user={user}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        onOpenBilling={() => setBillingModalOpen(true)}
        onOpenAuth={() => setAuthModalOpen(true)}
      />

      {/* Main Dynamic View Router */}
      <main className="flex-1 w-full pb-16">
        {currentTab === 'studio' && (
          <StudioWizard
            currentProject={currentProject}
            onUpdateProject={handleUpdateProject}
            onSaveProject={handleSaveProject}
            onOpenBilling={() => setBillingModalOpen(true)}
            dailyGenerationsLeft={user.dailyGenerationsLeft}
          />
        )}

        {currentTab === 'niches' && (
          <NicheKeywordLab />
        )}

        {currentTab === 'puzzles' && (
          <PuzzleStudio />
        )}

        {currentTab === 'coloring' && (
          <ColoringStudio />
        )}

        {currentTab === 'covers' && (
          <CoverSpineStudio />
        )}

        {currentTab === 'amazon' && (
          <AmazonOptimizer />
        )}

        {currentTab === 'review' && (
          <ContentReviewStudio
            project={currentProject}
            onUpdateProject={handleUpdateProject}
            onNavigateTab={setCurrentTab}
          />
        )}

        {currentTab === 'library' && (
          <MyLibrary
            projects={projects}
            user={user}
            onSelectProject={(proj) => {
              setCurrentProject(proj);
              setCurrentTab('studio');
            }}
            onReviewProject={(proj) => {
              setCurrentProject(proj);
              setCurrentTab('review');
            }}
            onNewProject={handleNewProject}
            onDuplicateProject={handleDuplicateProject}
            onDeleteProject={handleDeleteProject}
            onOpenBilling={() => setBillingModalOpen(true)}
          />
        )}

        {currentTab === 'marketing' && (
          <MarketingHub user={user} />
        )}

        {currentTab === 'admin' && (
          <AdminPanel currentUser={user} />
        )}
      </main>

      {/* Authentication Modal (Email, Google, Reset, Profile) */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        currentUser={user}
        onAuthSuccess={handleAuthSuccess}
      />

      {/* Subscription & Billing Modal (Free vs Pro vs Agency, Stripe & PayPal, Coupons) */}
      <BillingModal
        isOpen={billingModalOpen}
        onClose={() => setBillingModalOpen(false)}
        user={user}
        onUpgradePlan={handleUpgradePlan}
      />

      {/* Subtle Footer */}
      <footer className="border-t border-slate-200 dark:border-slate-800 bg-white/60 dark:bg-slate-900/60 py-6 px-4 text-center text-xs text-slate-500 dark:text-slate-400">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-2">
            <span className="font-bold text-slate-900 dark:text-white">KDP GPT</span>
            <span className="px-1.5 py-0.5 rounded bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 font-semibold text-[10px]">kdpgpt.com</span>
            <span>• AI Tools for KDP Publishers • Coloring, Puzzles, Covers & Listings</span>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-emerald-600 dark:text-emerald-400 font-semibold flex items-center space-x-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block animate-pulse" />
              <span>Gemini 2.5 Flash Server Active</span>
            </span>
            <span>Free: 3 books/day • Pro: Unlimited</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
