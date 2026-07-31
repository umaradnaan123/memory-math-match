'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useGameSettings } from '../context/GameSettingsContext';
import ParentDashboard from '../components/ParentDashboard';
import SettingsModal from '../components/SettingsModal';
import LeaderboardModal from '../components/LeaderboardModal';
import AchievementsModal from '../components/AchievementsModal';
import Tutorial from '../components/Tutorial';
import { Category } from '../utils/mathEngine';
import { FaPlay, FaMapMarkedAlt, FaGamepad, FaCalendarDay, FaChartBar, FaTrophy, FaAward, FaCog, FaBookOpen } from 'react-icons/fa';

export default function Home() {
  const router = useRouter();
  const settings = useGameSettings();

  // Modal display overlays
  const [activeModal, setActiveModal] = useState<'settings' | 'leaderboard' | 'achievements' | null>(null);
  const [view, setView] = useState<'home' | 'parent' | 'tutorial'>('home');

  if (!settings.stats) {
    return (
      <main className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center">
        Loading Dashboard...
      </main>
    );
  }

  const toggleCategory = (cat: Category) => {
    settings.setEnabledCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };

  return (
    <main className="min-h-screen relative flex flex-col p-4 md:p-8 overflow-hidden bg-slate-950 text-slate-100">
      {/* Dynamic Background math symbols decoration */}
      <div className="absolute inset-0 pointer-events-none select-none opacity-5">
        <div className="absolute top-10 left-10 text-9xl font-bold floating-symbol">➕</div>
        <div className="absolute bottom-20 right-10 text-9xl font-bold floating-symbol">✖️</div>
        <div className="absolute bottom-10 left-1/4 text-9xl font-bold floating-symbol">➗</div>
        <div className="absolute top-1/3 right-1/4 text-9xl font-bold floating-symbol">π</div>
        <div className="absolute top-1/2 left-10 text-9xl font-bold floating-symbol">√</div>
      </div>

      {/* Main Home Screen Dashboard */}
      {view === 'home' && (
        <div className="w-full max-w-4xl mx-auto space-y-10 z-10 my-auto">
          {/* Header */}
          <div className="text-center space-y-3">
            <h1 className="text-5xl md:text-7xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400">
              {settings.t.title}
            </h1>
            <p className="text-slate-400 font-medium text-lg">{settings.t.subtitle}</p>
          </div>

          {/* Quick HUD Metrics */}
          <div className="grid grid-cols-3 gap-4 max-w-md mx-auto text-center bg-slate-900/40 p-4 rounded-2xl border border-slate-800">
            <div>
              <div className="text-slate-500 text-xs font-bold uppercase">Coins</div>
              <div className="text-xl font-black text-amber-400">{settings.stats.coins} 🪙</div>
            </div>
            <div>
              <div className="text-slate-500 text-xs font-bold uppercase">XP</div>
              <div className="text-xl font-black text-blue-400">{settings.stats.xp} ✨</div>
            </div>
            <div>
              <div className="text-slate-500 text-xs font-bold uppercase">Milestone</div>
              <div className="text-xl font-black text-purple-400">Lvl {settings.stats.unlockedLevel} 🏆</div>
            </div>
          </div>

          {/* Quick Actions grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left Col: Menu Buttons */}
            <div className="space-y-4">
              <button
                onClick={() => router.push('/play?mode=practice')}
                className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-extrabold py-4 px-6 rounded-2xl shadow-lg shadow-blue-500/20 hover:shadow-blue-500/35 transition-all flex items-center justify-between"
              >
                <div className="flex items-center space-x-4">
                  <FaPlay className="text-xl" />
                  <span className="text-left font-black">{settings.t.play}</span>
                </div>
                <span className="text-xs uppercase bg-white/20 px-2.5 py-1 rounded-md">Practice</span>
              </button>

              <button
                onClick={() => router.push('/levels')}
                className="w-full bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-600 hover:from-purple-600 hover:to-blue-700 text-white font-extrabold py-4 px-6 rounded-2xl shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/35 transition-all flex items-center space-x-4"
              >
                <FaMapMarkedAlt className="text-xl text-yellow-350" />
                <span className="font-black">Play Quest Map (1000+ Levels)</span>
              </button>

              <button
                onClick={() => router.push('/play?mode=time')}
                className="w-full bg-slate-800/80 hover:bg-slate-800 text-slate-100 font-extrabold py-4 px-6 rounded-2xl border border-slate-700 hover:border-slate-600 transition-all flex items-center space-x-4"
              >
                <FaGamepad className="text-xl text-emerald-400" />
                <span>Time Challenge</span>
              </button>

              <button
                onClick={() => router.push('/daily-challenge')}
                className="w-full bg-slate-800/80 hover:bg-slate-800 text-slate-100 font-extrabold py-4 px-6 rounded-2xl border border-slate-700 hover:border-slate-600 transition-all flex items-center space-x-4"
              >
                <FaCalendarDay className="text-xl text-orange-400" />
                <span>{settings.t.daily}</span>
              </button>
            </div>

            {/* Right Col: Menu Subsections */}
            <div className="space-y-4">
              <button
                onClick={() => setView('parent')}
                className="w-full bg-slate-800/80 hover:bg-slate-800 text-slate-100 font-extrabold py-4 px-6 rounded-2xl border border-slate-700 hover:border-slate-600 transition-all flex items-center space-x-4"
              >
                <FaChartBar className="text-xl text-cyan-400" />
                <span>{settings.t.parentDashboard}</span>
              </button>

              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => setActiveModal('leaderboard')}
                  className="bg-slate-800/50 hover:bg-slate-800 text-slate-100 py-3.5 px-4 rounded-xl border border-slate-700/60 hover:border-slate-600 flex flex-col items-center justify-center space-y-2 transition-all"
                >
                  <FaTrophy className="text-yellow-400 text-lg" />
                  <span className="text-xs font-bold">{settings.t.leaderboard}</span>
                </button>

                <button
                  onClick={() => setActiveModal('achievements')}
                  className="bg-slate-800/50 hover:bg-slate-800 text-slate-100 py-3.5 px-4 rounded-xl border border-slate-700/60 hover:border-slate-600 flex flex-col items-center justify-center space-y-2 transition-all"
                >
                  <FaAward className="text-purple-400 text-lg" />
                  <span className="text-xs font-bold">{settings.t.achievements}</span>
                </button>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => setActiveModal('settings')}
                  className="bg-slate-800/50 hover:bg-slate-800 text-slate-100 py-3.5 px-4 rounded-xl border border-slate-700/60 hover:border-slate-600 flex flex-col items-center justify-center space-y-2 transition-all"
                >
                  <FaCog className="text-slate-400 text-lg" />
                  <span className="text-xs font-bold">{settings.t.settings}</span>
                </button>

                <button
                  onClick={() => setView('tutorial')}
                  className="bg-slate-800/50 hover:bg-slate-800 text-slate-100 py-3.5 px-4 rounded-xl border border-slate-700/60 hover:border-slate-600 flex flex-col items-center justify-center space-y-2 transition-all"
                >
                  <FaBookOpen className="text-blue-400 text-lg" />
                  <span className="text-xs font-bold">{settings.t.tutorial}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Categories Toggle Panel */}
          <div className="bg-slate-900/40 p-6 rounded-3xl border border-slate-800 space-y-4">
            <h3 className="font-extrabold text-sm text-slate-300 border-l-4 border-indigo-500 pl-3">
              Configure Enabled Mathematical Categories
            </h3>
            <div className="flex flex-wrap gap-2.5">
              {(
                [
                  'addition',
                  'subtraction',
                  'multiplication',
                  'division',
                  'fractions',
                  'decimals',
                  'percentages',
                  'algebra',
                  'geometry',
                  'square',
                ] as Category[]
              ).map((cat) => {
                const isActive = settings.enabledCategories.includes(cat);
                return (
                  <button
                    key={cat}
                    onClick={() => toggleCategory(cat)}
                    className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all border ${
                      isActive
                        ? 'bg-indigo-600/20 border-indigo-500/55 text-indigo-200'
                        : 'bg-slate-800/35 border-slate-700/30 text-slate-500 hover:text-slate-350'
                    }`}
                  >
                    {cat.toUpperCase()}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Footer links drawer for crawler indexation */}
          <footer className="w-full border-t border-slate-800/80 pt-6 flex flex-col items-center gap-4 text-xs text-slate-500 font-bold">
            <div className="flex flex-wrap justify-center gap-6">
              <Link href="/about" className="hover:text-slate-300 transition-all">About Game</Link>
              <Link href="/privacy-policy" className="hover:text-slate-300 transition-all">Privacy Policy</Link>
              <Link href="/terms" className="hover:text-slate-300 transition-all">Terms of Service</Link>
              <Link href="/contact" className="hover:text-slate-300 transition-all">Contact Support</Link>
              <Link href="/faq" className="hover:text-slate-300 transition-all">Math FAQ</Link>
            </div>
            <div className="flex flex-wrap justify-center gap-6 border-t border-slate-900 pt-4 w-full">
              <Link href="/how-to-play" className="hover:text-slate-300 transition-all">How to Play</Link>
              <Link href="/benefits-of-memory-games" className="hover:text-slate-300 transition-all">Benefits of Memory Games</Link>
              <Link href="/benefits-of-mental-math" className="hover:text-slate-300 transition-all">Benefits of Mental Math</Link>
              <Link href="/daily-brain-training" className="hover:text-slate-300 transition-all">Daily Brain Training</Link>
              <Link href="/improve-concentration" className="hover:text-slate-300 transition-all">Improve Concentration</Link>
              <Link href="/boost-iq-with-games" className="hover:text-slate-300 transition-all">Boost IQ with Games</Link>
              <Link href="/memory-improvement-techniques" className="hover:text-slate-300 transition-all">Memory Improvement Techniques</Link>
            </div>
          </footer>
        </div>
      )}

      {/* Subviews */}
      {view === 'parent' && (
        <div className="z-10 py-6">
          <button
            onClick={() => setView('home')}
            className="mb-6 inline-flex items-center space-x-2 text-slate-400 hover:text-white font-bold transition-all text-sm"
          >
            <span>&larr; Back to Home</span>
          </button>
          <ParentDashboard stats={settings.stats} translations={settings.t} />
        </div>
      )}

      {view === 'tutorial' && (
        <div className="z-10 py-6">
          <Tutorial onClose={() => setView('home')} translations={settings.t} />
        </div>
      )}

      {/* Settings Modal */}
      <SettingsModal
        isOpen={activeModal === 'settings'}
        onClose={() => setActiveModal(null)}
        lang={settings.lang}
        setLang={settings.setLang}
        volume={settings.volume}
        setVolume={settings.setVolume}
        musicEnabled={settings.musicEnabled}
        setMusicEnabled={settings.setMusicEnabled}
        soundEnabled={settings.soundEnabled}
        setSoundEnabled={settings.setSoundEnabled}
        darkMode={settings.darkMode}
        setDarkMode={settings.setDarkMode}
        highContrast={settings.highContrast}
        setHighContrast={settings.setHighContrast}
        largeText={settings.largeText}
        setLargeText={settings.setLargeText}
        colorBlindMode={settings.colorBlindMode}
        setColorBlindMode={settings.setColorBlindMode}
        reducedMotion={settings.reducedMotion}
        setReducedMotion={settings.setReducedMotion}
        onReset={settings.handleResetProgress}
      />

      {/* Leaderboard Modal */}
      <LeaderboardModal
        isOpen={activeModal === 'leaderboard'}
        onClose={() => setActiveModal(null)}
        entries={settings.leaderboardEntries}
        translations={settings.t}
      />

      {/* Achievements Modal */}
      <AchievementsModal
        isOpen={activeModal === 'achievements'}
        onClose={() => setActiveModal(null)}
        achievements={settings.achievements}
        translations={settings.t}
      />
    </main>
  );
}
