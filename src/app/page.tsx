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
import {
  FaPlay,
  FaMapMarkedAlt,
  FaGamepad,
  FaCalendarDay,
  FaChartBar,
  FaTrophy,
  FaAward,
  FaCog,
  FaBookOpen,
  FaCheckCircle,
  FaUsers,
  FaChalkboardTeacher,
  FaGraduationCap,
  FaShieldAlt,
  FaMobileAlt,
  FaPlus,
  FaQuestionCircle
} from 'react-icons/fa';

export default function Home() {
  const router = useRouter();
  const settings = useGameSettings();

  // Modal display overlays
  const [activeModal, setActiveModal] = useState<'settings' | 'leaderboard' | 'achievements' | null>(null);
  const [view, setView] = useState<'home' | 'parent' | 'tutorial'>('home');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  if (!settings.stats) {
    return (
      <main className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-slate-400 font-bold">Loading Dashboard...</p>
        </div>
      </main>
    );
  }

  const toggleCategory = (cat: Category) => {
    settings.setEnabledCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };

  const faqs = [
    {
      q: "How do the game mechanics work?",
      a: "Players flip cards on an adaptive grid to match mathematical expressions (like '3 x 4') with their correct numerical solutions (like '12'). Matches clear the cards from the board, rewarding coins and XP points."
    },
    {
      q: "What are the cognitive benefits of combining math and memory?",
      a: "Dual-task training engages the working memory (prefrontal cortex) and visual-spatial tracking simultaneously. By practicing recall alongside calculations, students move mathematical facts into automatic long-term memory, improving processing speed and focus."
    },
    {
      q: "Can I play Memory Math Match offline?",
      a: "Yes! The application functions as a fully offline Progressive Web App (PWA). Once loaded, you can practice calculations, complete quest levels, and check local progress statistics without any internet connection."
    },
    {
      q: "Is the platform safe and ad-free for kids?",
      a: "Absolutely. Memory Math Match is 100% ad-free, respects absolute privacy, requires no account creation, and collects no personal data, making it completely COPPA compliant and safe for young learners."
    },
    {
      q: "How do teachers use it in their classrooms?",
      a: "Educators use the game as a 5-minute math warmup on smartboards, a small-group rotation station on tablets, or as a gamified homework tool. Custom categories allow teachers to align gameplay directly with weekly curriculum topics."
    },
    {
      q: "How does the level progression adapt to the player?",
      a: "The Quest Map progresses through over 1000 levels. Grid sizes scale dynamically from simple 3x4 grids (basic addition/subtraction) to comprehensive 6x6 layouts featuring fractions, decimals, squares, and algebraic equations."
    }
  ];

  return (
    <main className="min-h-screen relative flex flex-col overflow-x-hidden bg-slate-950 text-slate-100 selection:bg-indigo-500 selection:text-white">
      {/* Floating Math Symbol Background */}
      <div className="absolute inset-0 pointer-events-none select-none opacity-5 z-0">
        <div className="absolute top-12 left-10 text-9xl font-bold floating-symbol">➕</div>
        <div className="absolute bottom-24 right-12 text-9xl font-bold floating-symbol">✖️</div>
        <div className="absolute bottom-16 left-1/4 text-9xl font-bold floating-symbol">➗</div>
        <div className="absolute top-1/4 right-1/4 text-9xl font-bold floating-symbol">π</div>
        <div className="absolute top-1/2 left-8 text-9xl font-bold floating-symbol">√</div>
      </div>

      {/* Main Home Screen Dashboard & Landing Page */}
      {view === 'home' && (
        <div className="w-full space-y-16 pb-20">
          
          {/* Immersive Hero Section */}
          <section className="relative w-full max-w-6xl mx-auto px-4 pt-16 md:pt-24 text-center space-y-8 z-10">
            <span className="inline-flex items-center gap-2 bg-indigo-550/20 text-indigo-300 px-4 py-1.5 rounded-full text-xs font-bold border border-indigo-500/30 uppercase tracking-widest animate-pulse">
              ✨ Free & Fully Offline Brain Training
            </span>
            <div className="space-y-4">
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight leading-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400">
                {settings.t.title}
              </h1>
              <p className="text-slate-450 font-medium text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
                Elevate mental agility with the ultimate math-memory matching game. Designed to boost working memory, focus, and core arithmetic skills through gamified level progression.
              </p>
            </div>

            {/* Hero Quick Statistics HUD */}
            <div className="grid grid-cols-3 gap-3 md:gap-6 max-w-lg mx-auto text-center bg-slate-900/50 p-4 rounded-2xl border border-slate-800 backdrop-blur-sm">
              <div>
                <div className="text-slate-500 text-xs font-bold uppercase tracking-wider">Coins</div>
                <div className="text-xl md:text-2xl font-black text-amber-400">{settings.stats.coins} 🪙</div>
              </div>
              <div>
                <div className="text-slate-500 text-xs font-bold uppercase tracking-wider">XP</div>
                <div className="text-xl md:text-2xl font-black text-blue-400">{settings.stats.xp} ✨</div>
              </div>
              <div>
                <div className="text-slate-500 text-xs font-bold uppercase tracking-wider">Quest Level</div>
                <div className="text-xl md:text-2xl font-black text-purple-400">Lvl {settings.stats.unlockedLevel} 🏆</div>
              </div>
            </div>

            {/* Multiple Play Call-To-Actions (CTAs) */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-2xl mx-auto pt-4">
              <button
                onClick={() => router.push('/levels')}
                className="w-full sm:w-auto bg-gradient-to-r from-purple-500 via-indigo-550 to-blue-600 hover:from-purple-650 hover:to-blue-700 text-white font-extrabold py-4 px-8 rounded-2xl shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/35 transition-all duration-300 flex items-center justify-center gap-3 cursor-pointer"
              >
                <FaMapMarkedAlt className="text-xl text-yellow-300 animate-bounce" />
                <span className="text-lg">Play Quest Map (1000+ Levels)</span>
              </button>

              <button
                onClick={() => router.push('/play?mode=practice')}
                className="w-full sm:w-auto bg-slate-900/80 hover:bg-slate-900 text-slate-100 font-extrabold py-4 px-8 rounded-2xl border border-slate-700 hover:border-slate-600 transition-all duration-200 flex items-center justify-center gap-3 cursor-pointer"
              >
                <FaPlay className="text-blue-400" />
                <span className="text-lg">Quick Practice</span>
              </button>
            </div>
          </section>

          {/* Interactive Play Lobby Zone */}
          <section className="w-full max-w-5xl mx-auto px-4 z-10 relative">
            <div className="bg-slate-900/40 rounded-3xl border border-slate-800 p-6 md:p-10 backdrop-blur-md space-y-8">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-slate-800 pb-6">
                <div>
                  <h2 className="text-2xl font-black text-slate-100">Play Control Center</h2>
                  <p className="text-slate-400 text-sm">Select a game mode or configure your math operations below.</p>
                </div>
                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={() => setView('parent')}
                    className="bg-slate-800/80 hover:bg-slate-800 text-slate-100 text-sm font-bold py-2.5 px-4 rounded-xl border border-slate-700 hover:border-slate-650 transition-all flex items-center gap-2 cursor-pointer"
                  >
                    <FaChartBar className="text-cyan-400" />
                    <span>Parent Dashboard</span>
                  </button>
                  <button
                    onClick={() => setActiveModal('settings')}
                    className="bg-slate-800/80 hover:bg-slate-800 text-slate-100 text-sm font-bold py-2.5 px-3 rounded-xl border border-slate-700 hover:border-slate-650 transition-all cursor-pointer"
                    title="Settings"
                  >
                    <FaCog className="text-slate-400" />
                  </button>
                </div>
              </div>

              {/* Game Modes Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-slate-950/60 p-5 rounded-2xl border border-slate-800/80 hover:border-indigo-500/40 transition-all duration-300 space-y-4 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-400">
                      <FaMapMarkedAlt className="text-lg" />
                    </div>
                    <h3 className="font-extrabold text-lg text-slate-200">Campaign Quest</h3>
                    <p className="text-slate-450 text-xs leading-relaxed">Solve math quests, travel through unique maps, and conquer 1,000+ levels.</p>
                  </div>
                  <button
                    onClick={() => router.push('/levels')}
                    className="w-full py-2.5 bg-purple-650/15 hover:bg-purple-650/25 border border-purple-550/30 text-purple-300 text-xs font-bold rounded-xl transition-all cursor-pointer"
                  >
                    Launch Campaign
                  </button>
                </div>

                <div className="bg-slate-950/60 p-5 rounded-2xl border border-slate-800/80 hover:border-indigo-500/40 transition-all duration-300 space-y-4 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400">
                      <FaPlay className="text-lg" />
                    </div>
                    <h3 className="font-extrabold text-lg text-slate-200">Quick Practice</h3>
                    <p className="text-slate-450 text-xs leading-relaxed">Relaxed mode to practice specific math equations at your own custom pace.</p>
                  </div>
                  <button
                    onClick={() => router.push('/play?mode=practice')}
                    className="w-full py-2.5 bg-blue-650/15 hover:bg-blue-650/25 border border-blue-550/30 text-blue-300 text-xs font-bold rounded-xl transition-all cursor-pointer"
                  >
                    Start Training
                  </button>
                </div>

                <div className="bg-slate-950/60 p-5 rounded-2xl border border-slate-800/80 hover:border-indigo-500/40 transition-all duration-300 space-y-4 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400">
                      <FaGamepad className="text-lg" />
                    </div>
                    <h3 className="font-extrabold text-lg text-slate-200">Time Challenge</h3>
                    <p className="text-slate-450 text-xs leading-relaxed">Race against the countdown timer. Test calculations under high speed pressure.</p>
                  </div>
                  <button
                    onClick={() => router.push('/play?mode=time')}
                    className="w-full py-2.5 bg-emerald-650/15 hover:bg-emerald-650/25 border border-emerald-550/30 text-emerald-300 text-xs font-bold rounded-xl transition-all cursor-pointer"
                  >
                    Race Clock
                  </button>
                </div>

                <div className="bg-slate-950/60 p-5 rounded-2xl border border-slate-800/80 hover:border-indigo-500/40 transition-all duration-300 space-y-4 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-400">
                      <FaCalendarDay className="text-lg" />
                    </div>
                    <h3 className="font-extrabold text-lg text-slate-200">Daily Challenge</h3>
                    <p className="text-slate-450 text-xs leading-relaxed">Complete a new, unique board setup every single day for special item rewards.</p>
                  </div>
                  <button
                    onClick={() => router.push('/daily-challenge')}
                    className="w-full py-2.5 bg-orange-650/15 hover:bg-orange-650/25 border border-orange-550/30 text-orange-300 text-xs font-bold rounded-xl transition-all cursor-pointer"
                  >
                    Play Daily Board
                  </button>
                </div>
              </div>

              {/* Interactive Modals Trigger Row */}
              <div className="grid grid-cols-3 gap-3">
                <button
                  onClick={() => setActiveModal('leaderboard')}
                  className="bg-slate-900/60 hover:bg-slate-850 p-4 rounded-xl border border-slate-850 hover:border-slate-700 flex flex-col items-center justify-center gap-1.5 transition-all cursor-pointer"
                >
                  <FaTrophy className="text-yellow-400 text-lg" />
                  <span className="text-[10px] sm:text-xs font-bold text-slate-300 uppercase tracking-wider">Leaderboard</span>
                </button>
                <button
                  onClick={() => setActiveModal('achievements')}
                  className="bg-slate-900/60 hover:bg-slate-850 p-4 rounded-xl border border-slate-850 hover:border-slate-700 flex flex-col items-center justify-center gap-1.5 transition-all cursor-pointer"
                >
                  <FaAward className="text-purple-400 text-lg" />
                  <span className="text-[10px] sm:text-xs font-bold text-slate-300 uppercase tracking-wider">Achievements</span>
                </button>
                <button
                  onClick={() => setView('tutorial')}
                  className="bg-slate-900/60 hover:bg-slate-850 p-4 rounded-xl border border-slate-850 hover:border-slate-700 flex flex-col items-center justify-center gap-1.5 transition-all cursor-pointer"
                >
                  <FaBookOpen className="text-blue-400 text-lg" />
                  <span className="text-[10px] sm:text-xs font-bold text-slate-300 uppercase tracking-wider">How to Play</span>
                </button>
              </div>

              {/* Math Categories Selector Panel */}
              <div className="bg-slate-950/40 p-5 md:p-6 rounded-2xl border border-slate-850 space-y-4">
                <div className="border-l-4 border-indigo-500 pl-3">
                  <h3 className="font-extrabold text-sm text-slate-200">
                    Configure Active Mathematical Operations
                  </h3>
                  <p className="text-[11px] text-slate-450 mt-0.5">Toggle arithmetic categories to include in your practice sessions.</p>
                </div>
                <div className="flex flex-wrap gap-2">
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
                        className={`px-3 py-1.5 rounded-lg text-[11px] font-extrabold transition-all border cursor-pointer ${
                          isActive
                            ? 'bg-indigo-650/20 border-indigo-500/50 text-indigo-300'
                            : 'bg-slate-900/35 border-slate-800/60 text-slate-500 hover:text-slate-350'
                        }`}
                      >
                        {cat.toUpperCase()}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </section>

          {/* Game Mechanics & How The Grid Board Works */}
          <section className="w-full max-w-5xl mx-auto px-4 space-y-8 py-4">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <h2 className="text-3xl font-black tracking-tight text-slate-100">How the Game Works</h2>
              <p className="text-slate-450 text-sm">A cognitive loop designed to convert calculations into instant reflexes.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-slate-900/20 border border-slate-850 p-6 rounded-2xl space-y-3">
                <div className="w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-400 font-black text-sm">1</div>
                <h3 className="font-bold text-lg text-slate-200">Flip & Inspect</h3>
                <p className="text-slate-400 text-xs leading-relaxed">Flip a card to reveal a math problem (e.g., <em>3 x 8</em>) or a plain integer (e.g., <em>24</em>). The layout matches equation expressions to their direct value answers.</p>
              </div>
              <div className="bg-slate-900/20 border border-slate-850 p-6 rounded-2xl space-y-3">
                <div className="w-8 h-8 rounded-full bg-purple-500/10 flex items-center justify-center text-purple-400 font-black text-sm">2</div>
                <h3 className="font-bold text-lg text-slate-200">Compute & Match</h3>
                <p className="text-slate-400 text-xs leading-relaxed">Mentally calculate the equation&apos;s sum, then locate the card containing the matching value. Flipped mismatch cards will return face-down.</p>
              </div>
              <div className="bg-slate-900/20 border border-slate-850 p-6 rounded-2xl space-y-3">
                <div className="w-8 h-8 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-400 font-black text-sm">3</div>
                <h3 className="font-bold text-lg text-slate-200">Clear & Level Up</h3>
                <p className="text-slate-400 text-xs leading-relaxed">Matching pairs clears them from the board. Collect gold coins and XP points to advance through campaign stages, unlocking new tiles and configurations.</p>
              </div>
            </div>
          </section>

          {/* Adaptive Difficulty & Grid Progression */}
          <section className="w-full max-w-5xl mx-auto px-4 py-4 bg-gradient-to-b from-slate-900/10 to-transparent rounded-3xl border border-slate-900/50 p-6 md:p-10 space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="max-w-xl space-y-2">
                <h2 className="text-3xl font-black tracking-tight text-slate-100">Adaptive Grid Progression</h2>
                <p className="text-slate-405 text-sm leading-relaxed">
                  Our adaptive math engine scales difficulty automatically to keep learners engaged in their optimal learning zone. Board sizes expand, introducing multi-step math operators.
                </p>
              </div>
              <div className="bg-indigo-650/10 text-indigo-300 font-bold px-4 py-2 rounded-xl border border-indigo-500/30 text-xs uppercase tracking-wider text-center">
                📊 Dynamically Scales
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="bg-slate-950/60 p-6 rounded-2xl border border-slate-850 space-y-3">
                <span className="text-xs font-bold text-blue-400 uppercase tracking-widest">Stage 1</span>
                <h3 className="font-bold text-lg text-slate-200">3 x 4 Grid (Starter)</h3>
                <p className="text-slate-450 text-xs">Features 12 cards focusing on simple addition and subtraction equations. Designed for early learners to build foundational layouts.</p>
              </div>
              <div className="bg-slate-950/60 p-6 rounded-2xl border border-slate-850 space-y-3">
                <span className="text-xs font-bold text-purple-400 uppercase tracking-widest">Stage 2</span>
                <h3 className="font-bold text-lg text-slate-200">4 x 4 & 4 x 5 Grid</h3>
                <p className="text-slate-450 text-xs">Incorporates multiplication, division, and basic fractions. Introduces timer limits and requires active grid position charting.</p>
              </div>
              <div className="bg-slate-950/60 p-6 rounded-2xl border border-slate-850 space-y-3">
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest">Stage 3</span>
                <h3 className="font-bold text-lg text-slate-200">6 x 6 Grid (Champion)</h3>
                <p className="text-slate-450 text-xs">36 total cards containing advanced algebra, geometry formulas, decimals, and square root operations. Requires highly disciplined working memory.</p>
              </div>
            </div>
          </section>

          {/* Targeted Profiles: Parents, Teachers, Students */}
          <section className="w-full max-w-5xl mx-auto px-4 py-4 space-y-8">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <h2 className="text-3xl font-black tracking-tight text-slate-100">Tailored for Every Learner</h2>
              <p className="text-slate-450 text-sm">Integrated tools built specifically to support study goals in the classroom and at home.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* For Parents */}
              <div className="bg-slate-900/30 border border-slate-850 p-6 rounded-2xl space-y-4 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="w-10 h-10 rounded-xl bg-cyan-500/10 flex items-center justify-center text-cyan-400">
                    <FaUsers className="text-lg" />
                  </div>
                  <h3 className="font-bold text-xl text-slate-200">For Parents</h3>
                  <p className="text-slate-450 text-xs leading-relaxed">
                    Monitor your child&apos;s progress with absolute accuracy. Check operational efficiency metrics, track memory improvement curves, and configure training schedules to match school workloads.
                  </p>
                </div>
                <button
                  onClick={() => setView('parent')}
                  className="w-full py-2 bg-cyan-600/10 hover:bg-cyan-600/20 border border-cyan-500/30 text-cyan-300 text-xs font-bold rounded-lg transition-all cursor-pointer"
                >
                  Open Dashboard
                </button>
              </div>

              {/* For Teachers */}
              <div className="bg-slate-900/30 border border-slate-850 p-6 rounded-2xl space-y-4 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-400">
                    <FaChalkboardTeacher className="text-lg" />
                  </div>
                  <h3 className="font-bold text-xl text-slate-200">For Teachers</h3>
                  <p className="text-slate-450 text-xs leading-relaxed">
                    Deploy interactive classroom warmups or small-group stations. Toggle operation categories to match current lesson plans. Simple, lightweight design runs smoothly on school tablets and smartboards.
                  </p>
                </div>
                <button
                  onClick={() => setView('tutorial')}
                  className="w-full py-2 bg-orange-650/10 hover:bg-orange-650/20 border border-orange-550/30 text-orange-300 text-xs font-bold rounded-lg transition-all cursor-pointer"
                >
                  View Lesson Setup
                </button>
              </div>

              {/* For Students */}
              <div className="bg-slate-900/30 border border-slate-850 p-6 rounded-2xl space-y-4 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-400">
                    <FaGraduationCap className="text-lg" />
                  </div>
                  <h3 className="font-bold text-xl text-slate-200">For Students</h3>
                  <p className="text-slate-450 text-xs leading-relaxed">
                    Earn gold coins and XP, unlock trophies, and compete on the classroom leaderboard. Level up through unique maps, conquer memory challenges, and build confidence while playing.
                  </p>
                </div>
                <button
                  onClick={() => setActiveModal('achievements')}
                  className="w-full py-2 bg-purple-650/10 hover:bg-purple-650/20 border border-purple-550/30 text-purple-300 text-xs font-bold rounded-lg transition-all cursor-pointer"
                >
                  View My Trophies
                </button>
              </div>
            </div>
          </section>

          {/* User Reviews and Social Proof Panel */}
          <section className="w-full max-w-5xl mx-auto px-4 py-4 space-y-8">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <h2 className="text-3xl font-black tracking-tight text-slate-100">Loved by Educators & Parents</h2>
              <p className="text-slate-450 text-sm">Hear from real people using our tools to transform math practice.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-slate-900/20 border border-slate-850 p-6 rounded-2xl space-y-4">
                <div className="flex text-amber-400 gap-1 text-sm">⭐⭐⭐⭐⭐</div>
                <p className="text-slate-350 text-xs leading-relaxed">
                  &ldquo;My students absolutely look forward to our morning math matches. It takes exactly five minutes to load on the whiteboard, and their arithmetic speed has improved by leaps and bounds.&rdquo;
                </p>
                <div className="text-slate-400 text-[10px] font-bold">
                  — Mrs. Clara Ross, 4th Grade Teacher
                </div>
              </div>
              <div className="bg-slate-900/20 border border-slate-850 p-6 rounded-2xl space-y-4">
                <div className="flex text-amber-400 gap-1 text-sm">⭐⭐⭐⭐⭐</div>
                <p className="text-slate-350 text-xs leading-relaxed">
                  &ldquo;The fact that it runs completely offline is a lifesaver. We practice addition and multiplication tables on our road trips, and my daughter is genuinely excited about leveling up her profile.&rdquo;
                </p>
                <div className="text-slate-400 text-[10px] font-bold">
                  — David L., Homeschooling Parent
                </div>
              </div>
              <div className="bg-slate-900/20 border border-slate-850 p-6 rounded-2xl space-y-4">
                <div className="flex text-amber-400 gap-1 text-sm">⭐⭐⭐⭐⭐</div>
                <p className="text-slate-350 text-xs leading-relaxed">
                  &ldquo;We use this application during our math rotation stations. It aligns perfectly with our curriculum because we can toggle exactly the operations we want our students to focus on.&rdquo;
                </p>
                <div className="text-slate-400 text-[10px] font-bold">
                  — Marcus V., Middle School Specialist
                </div>
              </div>
            </div>
          </section>

          {/* Educational Blog Topic Cluster Links Preview */}
          <section className="w-full max-w-5xl mx-auto px-4 py-4 space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-3xl font-black tracking-tight text-slate-100">Educational Resources</h2>
                <p className="text-slate-450 text-sm">Explore our in-depth scientific blog posts on child development, brain training, and gamification.</p>
              </div>
              <Link
                href="/blog"
                className="inline-flex items-center text-sm text-indigo-400 hover:text-indigo-300 font-bold transition-all"
              >
                Browse All Articles &rarr;
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              <div className="bg-slate-900/30 border border-slate-850 rounded-2xl p-6 flex flex-col justify-between hover:border-slate-750 transition-all">
                <div className="space-y-3">
                  <span className="text-[10px] text-indigo-400 font-bold uppercase tracking-wider">Cognitive Development</span>
                  <h3 className="font-bold text-base text-slate-200 hover:text-indigo-400 transition-colors">
                    <Link href="/blog/best-memory-games-for-kids-cognitive-benefits-rules">Best Memory Games for Kids: Cognitive Benefits & Rules</Link>
                  </h3>
                  <p className="text-slate-450 text-[11px] leading-relaxed">Explore the ultimate list of the best memory games for kids. Learn the scientific cognitive benefits, detailed gameplay rules, and how visual matching transforms working memory.</p>
                </div>
                <Link href="/blog/best-memory-games-for-kids-cognitive-benefits-rules" className="text-xs text-indigo-400 font-bold hover:underline pt-4 inline-block">Read Article</Link>
              </div>

              <div className="bg-slate-900/30 border border-slate-850 rounded-2xl p-6 flex flex-col justify-between hover:border-slate-750 transition-all">
                <div className="space-y-3">
                  <span className="text-[10px] text-indigo-400 font-bold uppercase tracking-wider">Classroom Tech</span>
                  <h3 className="font-bold text-base text-slate-200 hover:text-indigo-400 transition-colors">
                    <Link href="/blog/how-memory-games-improve-learning-focus-classrooms">How Memory Games Improve Learning and Focus in Classrooms</Link>
                  </h3>
                  <p className="text-slate-450 text-[11px] leading-relaxed">Discover how memory matching and visual recall games dramatically enhance student engagement, focus, and classroom dynamics. A teacher&apos;s guide to gamified education.</p>
                </div>
                <Link href="/blog/how-memory-games-improve-learning-focus-classrooms" className="text-xs text-indigo-400 font-bold hover:underline pt-4 inline-block">Read Article</Link>
              </div>

              <div className="bg-slate-900/30 border border-slate-850 rounded-2xl p-6 flex flex-col justify-between hover:border-slate-750 transition-all">
                <div className="space-y-3">
                  <span className="text-[10px] text-indigo-400 font-bold uppercase tracking-wider">Modern Pedagogy</span>
                  <h3 className="font-bold text-base text-slate-200 hover:text-indigo-400 transition-colors">
                    <Link href="/blog/fun-ways-to-learn-mathematics-gamification-pedagogy">Fun Ways to Learn Mathematics: Gamification in Modern Pedagogy</Link>
                  </h3>
                  <p className="text-slate-450 text-[11px] leading-relaxed">Learn how to make math fun using gamification principles. Explore the pedagogy behind educational game design and active learning mechanics.</p>
                </div>
                <Link href="/blog/fun-ways-to-learn-mathematics-gamification-pedagogy" className="text-xs text-indigo-400 font-bold hover:underline pt-4 inline-block">Read Article</Link>
              </div>
            </div>
          </section>

          {/* Core Features Summary grid */}
          <section className="w-full max-w-5xl mx-auto px-4 py-4 space-y-8">
            <div className="bg-slate-900/20 border border-slate-850 rounded-3xl p-6 md:p-10">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-450">
                    <FaShieldAlt className="text-xl" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-200">105% Safe & Secure</h3>
                    <p className="text-slate-450 text-xs mt-1">Zero trackers, cookies, or ads. No account creation needed. COPPA and privacy compliant.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-blue-500/10 text-blue-400">
                    <FaMobileAlt className="text-xl" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-200">Responsive & PWA Ready</h3>
                    <p className="text-slate-450 text-xs mt-1">Designed for cell phones, tablets, smartboards, and desktop. Save to homescreen for offline use.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-purple-500/10 text-purple-400">
                    <FaCheckCircle className="text-xl" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-200">Adaptive Math Engine</h3>
                    <p className="text-slate-450 text-xs mt-1">Allows custom operational configurations. Ranges from early kindergarten math to algebra.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Rich FAQ Section */}
          <section className="w-full max-w-4xl mx-auto px-4 py-4 space-y-8">
            <div className="text-center space-y-2">
              <h2 className="text-3xl font-black tracking-tight text-slate-100">Frequently Asked Questions</h2>
              <p className="text-slate-455 text-sm">Everything you need to know about the game, benefits, and safety.</p>
            </div>

            <div className="space-y-4">
              {faqs.map((faq, index) => {
                const isOpen = openFaqIndex === index;
                return (
                  <div
                    key={index}
                    className="border border-slate-850 bg-slate-900/10 rounded-xl overflow-hidden transition-all duration-200"
                  >
                    <button
                      onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                      className="w-full flex items-center justify-between p-5 text-left font-bold text-slate-200 hover:text-slate-100 hover:bg-slate-900/30 transition-all cursor-pointer"
                    >
                      <span className="text-sm md:text-base flex items-center gap-3">
                        <FaQuestionCircle className="text-indigo-400" />
                        {faq.q}
                      </span>
                      <FaPlus className={`text-xs text-slate-500 transition-transform duration-200 ${isOpen ? 'rotate-45' : ''}`} />
                    </button>
                    {isOpen && (
                      <div className="p-5 border-t border-slate-850/60 text-slate-400 text-xs md:text-sm leading-relaxed bg-slate-950/40">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>

          {/* Footer drawer for indexing */}
          <footer className="w-full border-t border-slate-900 pt-10 flex flex-col items-center gap-6 text-xs text-slate-550 font-bold max-w-5xl mx-auto px-4">
            <div className="flex flex-wrap justify-center gap-6">
              <Link href="/about" className="hover:text-slate-350 transition-all">About Game</Link>
              <Link href="/privacy-policy" className="hover:text-slate-350 transition-all">Privacy Policy</Link>
              <Link href="/terms" className="hover:text-slate-350 transition-all">Terms of Service</Link>
              <Link href="/contact" className="hover:text-slate-350 transition-all">Contact Support</Link>
              <Link href="/faq" className="hover:text-slate-350 transition-all">Math FAQ</Link>
              <Link href="/blog" className="hover:text-slate-350 transition-all">Educational Blog</Link>
            </div>
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-3 border-t border-slate-950 pt-6 w-full text-center">
              <Link href="/how-to-play" className="hover:text-slate-350 transition-all">How to Play</Link>
              <Link href="/benefits-of-memory-games" className="hover:text-slate-350 transition-all">Benefits of Memory Games</Link>
              <Link href="/benefits-of-mental-math" className="hover:text-slate-350 transition-all">Benefits of Mental Math</Link>
              <Link href="/daily-brain-training" className="hover:text-slate-350 transition-all">Daily Brain Training</Link>
              <Link href="/improve-concentration" className="hover:text-slate-350 transition-all">Improve Concentration</Link>
              <Link href="/boost-iq-with-games" className="hover:text-slate-350 transition-all">Boost IQ with Games</Link>
              <Link href="/memory-improvement-techniques" className="hover:text-slate-350 transition-all">Memory Improvement Techniques</Link>
            </div>
            <p className="text-[10px] text-slate-600 mt-2">© {new Date().getFullYear()} Memory Math Match. Built with love for curious brains everywhere.</p>
          </footer>
        </div>
      )}

      {/* Subviews */}
      {view === 'parent' && (
        <div className="z-10 py-6 w-full max-w-5xl mx-auto px-4">
          <button
            onClick={() => setView('home')}
            className="mb-6 inline-flex items-center space-x-2 text-slate-400 hover:text-white font-bold transition-all text-sm cursor-pointer"
          >
            <span>&larr; Back to Home</span>
          </button>
          <ParentDashboard stats={settings.stats} translations={settings.t} />
        </div>
      )}

      {view === 'tutorial' && (
        <div className="z-10 py-6 w-full max-w-5xl mx-auto px-4">
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
