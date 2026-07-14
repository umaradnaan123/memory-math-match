'use client';

import React, { useState, useEffect } from 'react';
import { getLocalStats, saveLocalStats, getLocalAchievements, getLeaderboards, addLeaderboardEntry, GameStats, Achievement } from '../utils/gameData';
import { translations, Language } from '../utils/translations';
import { startBackgroundMusic, stopBackgroundMusic } from '../utils/audioSynth';
import GameView from '../components/GameView';
import LevelMap from '../components/LevelMap';
import QuestMap from '../components/QuestMap';
import ParentDashboard from '../components/ParentDashboard';
import SettingsModal from '../components/SettingsModal';
import LeaderboardModal from '../components/LeaderboardModal';
import AchievementsModal from '../components/AchievementsModal';
import Tutorial from '../components/Tutorial';
import LegalPages from '../components/LegalPages';
import { Category, Difficulty } from '../utils/mathEngine';
import { QuestLevel } from '../utils/questConfig';
import { FaPlay, FaMapMarkedAlt, FaGamepad, FaCalendarDay, FaChartBar, FaTrophy, FaAward, FaCog, FaBookOpen } from 'react-icons/fa';

export default function Home() {
  // Application settings and configurations
  const [lang, setLang] = useState<Language>('en');
  const [darkMode, setDarkMode] = useState(true);
  const [volume, setVolume] = useState(0.5);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [musicEnabled, setMusicEnabled] = useState(true);
  const [highContrast, setHighContrast] = useState(false);
  const [largeText, setLargeText] = useState(false);
  const [colorBlindMode, setColorBlindMode] = useState<'none' | 'deuteranopia' | 'protanopia' | 'tritanopia'>('none');
  const [reducedMotion, setReducedMotion] = useState(false);

  // Modal display overlays
  const [activeModal, setActiveModal] = useState<'settings' | 'leaderboard' | 'achievements' | null>(null);

  // Active view states
  const [view, setView] = useState<'home' | 'levels' | 'quest' | 'play' | 'parent' | 'tutorial' | 'about' | 'privacy' | 'terms' | 'contact' | 'faq'>('home');
  const [activeMode, setActiveMode] = useState<'levels' | 'practice' | 'time' | 'endless' | 'daily' | 'speed' | 'zen'>('zen');
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty>('easy');
  const [selectedLevel, setSelectedLevel] = useState<number>(1);

  // Local Storage synchronizations
  const [stats, setStats] = useState<GameStats | null>(null);
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [leaderboardEntries, setLeaderboardEntries] = useState(getLeaderboards());

  // Enabled Mathematical Categories
  const [enabledCategories, setEnabledCategories] = useState<Category[]>([
    'addition',
    'subtraction',
    'multiplication',
    'division',
    'square',
  ]);

  // Load configuration from local storage on mount
  useEffect(() => {
    const local = getLocalStats();
    setStats(local);
    setAchievements(getLocalAchievements(local));
  }, []);

  // Update theme settings
  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }

    if (highContrast) {
      root.classList.add('high-contrast');
    } else {
      root.classList.remove('high-contrast');
    }
  }, [darkMode, highContrast]);

  // Ambient procedural background audio controller
  useEffect(() => {
    if (musicEnabled) {
      startBackgroundMusic('relaxing', volume);
    } else {
      stopBackgroundMusic();
    }
    return () => stopBackgroundMusic();
  }, [musicEnabled, volume]);

  const t = translations[lang] || translations.en;

  const handleLevelSelect = (lvl: number) => {
    setSelectedLevel(lvl);
    // Custom logic: Scale difficulty by levels
    if (lvl <= 40) setSelectedDifficulty('beginner');
    else if (lvl <= 80) setSelectedDifficulty('easy');
    else if (lvl <= 120) setSelectedDifficulty('medium');
    else if (lvl <= 160) setSelectedDifficulty('hard');
    else setSelectedDifficulty('expert');

    setActiveMode('levels');
    setView('play');
  };

  const handleQuestLevelSelect = (questLevel: QuestLevel) => {
    setSelectedLevel(questLevel.levelNumber);
    setSelectedDifficulty(questLevel.difficulty);
    setActiveMode('levels');
    setView('play');
  };

  const handleGameWin = (score: number, accuracy: number, timeSpent: number) => {
    if (!stats) return;

    const nextWins = stats.gamesWon + 1;
    const nextPlayed = stats.gamesPlayed + 1;
    const maxScore = Math.max(stats.highestScore, score);

    // Save statistics back to LocalStorage
    const updated: GameStats = {
      ...stats,
      gamesWon: nextWins,
      gamesPlayed: nextPlayed,
      highestScore: maxScore,
      coins: stats.coins + 25,
      xp: stats.xp + 50,
      unlockedLevel: activeMode === 'levels' && selectedLevel === stats.unlockedLevel ? stats.unlockedLevel + 1 : stats.unlockedLevel,
      averageAccuracy: Math.round((stats.averageAccuracy * stats.gamesPlayed + accuracy) / nextPlayed),
    };

    saveLocalStats(updated);
    setStats(updated);
    setAchievements(getLocalAchievements(updated));

    // Submit to leaderboard
    const name = prompt('Enter your name for the scoreboard:', 'Player') || 'Player';
    addLeaderboardEntry({ name, score, time: timeSpent, accuracy, date: new Date().toLocaleDateString() });
    setLeaderboardEntries(getLeaderboards());

    setView('home');
  };

  const handleGameLose = () => {
    alert('Game Over! Try again!');
    setView('home');
  };

  const handleResetProgress = () => {
    localStorage.removeItem('mmm_stats');
    const defaultStats = getLocalStats();
    setStats(defaultStats);
    setAchievements(getLocalAchievements(defaultStats));
    alert('Progress reset successfully.');
  };

  const toggleCategory = (cat: Category) => {
    setEnabledCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };

  if (!stats) return null;

  return (
    <main className={`min-h-screen relative flex flex-col p-4 md:p-8 overflow-hidden bg-slate-950 text-slate-100 ${
      colorBlindMode !== 'none' ? `color-blind-${colorBlindMode}` : ''
    }`}>
      {/* Dynamic Background math symbols decoration */}
      <div className="absolute inset-0 pointer-events-none select-none opacity-10">
        <div className="absolute top-10 left-10 text-9xl font-bold floating-symbol">➕</div>
        <div className="absolute bottom-20 right-10 text-9xl font-bold floating-symbol" style={{ animationDelay: '2s' }}>✖️</div>
        <div className="absolute bottom-10 left-1/4 text-9xl font-bold floating-symbol" style={{ animationDelay: '4s' }}>➗</div>
        <div className="absolute top-1/3 right-1/4 text-9xl font-bold floating-symbol" style={{ animationDelay: '1s' }}>π</div>
        <div className="absolute top-1/2 left-10 text-9xl font-bold floating-symbol" style={{ animationDelay: '3s' }}>√</div>
      </div>

      {/* Main Home Screen Dashboard */}
      {view === 'home' && (
        <div className="w-full max-w-4xl mx-auto space-y-10 z-10 my-auto">
          {/* Header */}
          <div className="text-center space-y-3">
            <h1 className="text-5xl md:text-7xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400">
              {t.title}
            </h1>
            <p className="text-slate-400 font-medium text-lg">{t.subtitle}</p>
          </div>

          {/* Quick HUD Metrics */}
          <div className="grid grid-cols-3 gap-4 max-w-md mx-auto text-center bg-slate-900/40 p-4 rounded-2xl border border-slate-800">
            <div>
              <div className="text-slate-500 text-xs font-bold uppercase">Coins</div>
              <div className="text-xl font-black text-amber-400">{stats.coins} 🪙</div>
            </div>
            <div>
              <div className="text-slate-500 text-xs font-bold uppercase">XP</div>
              <div className="text-xl font-black text-blue-400">{stats.xp} ✨</div>
            </div>
            <div>
              <div className="text-slate-500 text-xs font-bold uppercase">Milestone</div>
              <div className="text-xl font-black text-purple-400">Lvl {stats.unlockedLevel} 🏆</div>
            </div>
          </div>

          {/* Quick Actions grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left Col: Menu Buttons */}
            <div className="space-y-4">
              <button
                onClick={() => {
                  setActiveMode('practice');
                  setView('play');
                }}
                className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-extrabold py-4 px-6 rounded-2xl shadow-lg shadow-blue-500/20 hover:shadow-blue-500/35 transition-all flex items-center justify-between"
              >
                <div className="flex items-center space-x-4">
                  <FaPlay className="text-xl" />
                  <span className="text-left font-black">{t.play}</span>
                </div>
                <span className="text-xs uppercase bg-white/20 px-2.5 py-1 rounded-md">Practice</span>
              </button>

              <button
                onClick={() => setView('quest')}
                className="w-full bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-600 hover:from-purple-600 hover:to-blue-700 text-white font-extrabold py-4 px-6 rounded-2xl shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/35 transition-all flex items-center space-x-4"
              >
                <FaMapMarkedAlt className="text-xl text-yellow-350" />
                <span className="font-black">Play Quest Map (1000+ Levels)</span>
              </button>

              <button
                onClick={() => {
                  setActiveMode('time');
                  setView('play');
                }}
                className="w-full bg-slate-800/80 hover:bg-slate-800 text-slate-100 font-extrabold py-4 px-6 rounded-2xl border border-slate-700 hover:border-slate-600 transition-all flex items-center space-x-4"
              >
                <FaGamepad className="text-xl text-emerald-400" />
                <span>Time Challenge</span>
              </button>

              <button
                onClick={() => {
                  setActiveMode('daily');
                  setView('play');
                }}
                className="w-full bg-slate-800/80 hover:bg-slate-800 text-slate-100 font-extrabold py-4 px-6 rounded-2xl border border-slate-700 hover:border-slate-600 transition-all flex items-center space-x-4"
              >
                <FaCalendarDay className="text-xl text-orange-400" />
                <span>{t.daily}</span>
              </button>
            </div>

            {/* Right Col: Menu Subsections */}
            <div className="space-y-4">
              <button
                onClick={() => setView('parent')}
                className="w-full bg-slate-800/80 hover:bg-slate-800 text-slate-100 font-extrabold py-4 px-6 rounded-2xl border border-slate-700 hover:border-slate-600 transition-all flex items-center space-x-4"
              >
                <FaChartBar className="text-xl text-cyan-400" />
                <span>{t.parentDashboard}</span>
              </button>

              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => setActiveModal('leaderboard')}
                  className="bg-slate-800/50 hover:bg-slate-800 text-slate-100 py-3.5 px-4 rounded-xl border border-slate-700/60 hover:border-slate-600 flex flex-col items-center justify-center space-y-2 transition-all"
                >
                  <FaTrophy className="text-yellow-400 text-lg" />
                  <span className="text-xs font-bold">{t.leaderboard}</span>
                </button>

                <button
                  onClick={() => setActiveModal('achievements')}
                  className="bg-slate-800/50 hover:bg-slate-800 text-slate-100 py-3.5 px-4 rounded-xl border border-slate-700/60 hover:border-slate-600 flex flex-col items-center justify-center space-y-2 transition-all"
                >
                  <FaAward className="text-purple-400 text-lg" />
                  <span className="text-xs font-bold">{t.achievements}</span>
                </button>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => setActiveModal('settings')}
                  className="bg-slate-800/50 hover:bg-slate-800 text-slate-100 py-3.5 px-4 rounded-xl border border-slate-700/60 hover:border-slate-600 flex flex-col items-center justify-center space-y-2 transition-all"
                >
                  <FaCog className="text-slate-400 text-lg" />
                  <span className="text-xs font-bold">{t.settings}</span>
                </button>

                <button
                  onClick={() => setView('tutorial')}
                  className="bg-slate-800/50 hover:bg-slate-800 text-slate-100 py-3.5 px-4 rounded-xl border border-slate-700/60 hover:border-slate-600 flex flex-col items-center justify-center space-y-2 transition-all"
                >
                  <FaBookOpen className="text-blue-400 text-lg" />
                  <span className="text-xs font-bold">{t.tutorial}</span>
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
                const isActive = enabledCategories.includes(cat);
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
          <footer className="w-full border-t border-slate-800/80 pt-6 flex flex-wrap justify-center gap-6 text-xs text-slate-500 font-bold">
            <button onClick={() => setView('about')} className="hover:text-slate-300 transition-all">About Game</button>
            <button onClick={() => setView('privacy')} className="hover:text-slate-300 transition-all">Privacy Policy</button>
            <button onClick={() => setView('terms')} className="hover:text-slate-300 transition-all">Terms of Service</button>
            <button onClick={() => setView('contact')} className="hover:text-slate-300 transition-all">Contact Support</button>
            <button onClick={() => setView('faq')} className="hover:text-slate-300 transition-all">Math FAQ</button>
          </footer>
        </div>
      )}

      {/* Subviews */}
      {view === 'quest' && (
        <div className="z-10 py-6">
          <QuestMap
            unlockedLevel={stats.unlockedLevel}
            onSelectLevel={handleQuestLevelSelect}
            onBack={() => setView('home')}
            translations={t}
          />
        </div>
      )}

      {view === 'levels' && (
        <div className="z-10 py-6">
          <button
            onClick={() => setView('home')}
            className="mb-6 inline-flex items-center space-x-2 text-slate-400 hover:text-white font-bold transition-all text-sm"
          >
            <span>&larr; Back to Home</span>
          </button>
          <LevelMap
            unlockedLevel={stats.unlockedLevel}
            onSelectLevel={handleLevelSelect}
            translations={t}
          />
        </div>
      )}

      {view === 'parent' && (
        <div className="z-10 py-6">
          <button
            onClick={() => setView('home')}
            className="mb-6 inline-flex items-center space-x-2 text-slate-400 hover:text-white font-bold transition-all text-sm"
          >
            <span>&larr; Back to Home</span>
          </button>
          <ParentDashboard stats={stats} translations={t} />
        </div>
      )}

      {view === 'tutorial' && (
        <div className="z-10 py-6">
          <Tutorial onClose={() => setView('home')} translations={t} />
        </div>
      )}

      {view === 'play' && (
        <div className="z-10 py-6">
          <GameView
            mode={activeMode}
            levelNumber={selectedLevel}
            difficulty={selectedDifficulty}
            enabledCategories={enabledCategories}
            soundEnabled={soundEnabled}
            reducedMotion={reducedMotion}
            largeText={largeText}
            onBack={() => setView('home')}
            onWin={handleGameWin}
            onLose={handleGameLose}
            translations={t}
          />
        </div>
      )}

      {/* Legal Subpages */}
      {(['about', 'privacy', 'terms', 'contact', 'faq'] as const).includes(view as 'about' | 'privacy' | 'terms' | 'contact' | 'faq') && (
        <div className="z-10 py-6">
          <LegalPages
            page={view as 'about' | 'privacy' | 'terms' | 'contact' | 'faq'}
            onBack={() => setView('home')}
            translations={t}
          />
        </div>
      )}

      {/* Settings Modal */}
      <SettingsModal
        isOpen={activeModal === 'settings'}
        onClose={() => setActiveModal(null)}
        lang={lang}
        setLang={setLang}
        volume={volume}
        setVolume={setVolume}
        musicEnabled={musicEnabled}
        setMusicEnabled={setMusicEnabled}
        soundEnabled={soundEnabled}
        setSoundEnabled={setSoundEnabled}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        highContrast={highContrast}
        setHighContrast={setHighContrast}
        largeText={largeText}
        setLargeText={setLargeText}
        colorBlindMode={colorBlindMode}
        setColorBlindMode={setColorBlindMode}
        reducedMotion={reducedMotion}
        setReducedMotion={setReducedMotion}
        onReset={handleResetProgress}
      />

      {/* Leaderboard Modal */}
      <LeaderboardModal
        isOpen={activeModal === 'leaderboard'}
        onClose={() => setActiveModal(null)}
        entries={leaderboardEntries}
        translations={t}
      />

      {/* Achievements Modal */}
      <AchievementsModal
        isOpen={activeModal === 'achievements'}
        onClose={() => setActiveModal(null)}
        achievements={achievements}
        translations={t}
      />

      {/* Accessibility Deuteranopia/Protanopia/Tritanopia Color Filter Matrices */}
      <svg className="hidden">
        <defs>
          <filter id="deuteranopia-filter">
            <feColorMatrix
              type="matrix"
              values="0.625, 0.375, 0, 0, 0,
                      0.7, 0.3, 0, 0, 0,
                      0, 0.3, 0.7, 0, 0,
                      0, 0, 0, 1, 0"
            />
          </filter>
          <filter id="protanopia-filter">
            <feColorMatrix
              type="matrix"
              values="0.567, 0.433, 0, 0, 0,
                      0.558, 0.442, 0, 0, 0,
                      0, 0.242, 0.758, 0, 0,
                      0, 0, 0, 1, 0"
            />
          </filter>
          <filter id="tritanopia-filter">
            <feColorMatrix
              type="matrix"
              values="0.95, 0.05,  0, 0, 0,
                      0,  0.433, 0.567, 0, 0,
                      0,  0.475, 0.525, 0, 0,
                      0,  0,     0,     1, 0"
            />
          </filter>
        </defs>
      </svg>
    </main>
  );
}
