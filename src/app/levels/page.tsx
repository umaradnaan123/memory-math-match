'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useGameSettings } from '@/context/GameSettingsContext';
import LevelMap from '@/components/LevelMap';
import QuestMap from '@/components/QuestMap';
import { QuestLevel } from '@/utils/questConfig';
import { GameStats } from '@/utils/gameData';
import { FaChevronLeft, FaMapMarkedAlt, FaGamepad } from 'react-icons/fa';

export default function LevelsPage() {
  const router = useRouter();
  const settings = useGameSettings();
  const [subView, setSubView] = useState<'levels' | 'quest'>('levels');

  // Use fallback stats during SSR or before hydration completes
  const stats: GameStats = settings.stats || {
    gamesPlayed: 0,
    gamesWon: 0,
    highestScore: 0,
    bestTime: 9999,
    averageAccuracy: 0,
    fastestMatch: 999,
    currentStreak: 0,
    longestStreak: 0,
    perfectGames: 0,
    coins: 50,
    xp: 0,
    stars: 0,
    diamonds: 5,
    unlockedLevel: 1,
    unlockedThemes: ['classic'],
    unlockedAvatars: ['avatar1'],
    unlockedCardStyles: ['neon'],
    unlockedBackgrounds: ['space'],
    accuracyByTopic: {},
  };

  const handleLevelSelect = (lvl: number) => {
    let diff = 'easy';
    if (lvl <= 40) diff = 'beginner';
    else if (lvl <= 80) diff = 'easy';
    else if (lvl <= 120) diff = 'medium';
    else if (lvl <= 160) diff = 'hard';
    else diff = 'expert';

    router.push(`/play?mode=levels&level=${lvl}&difficulty=${diff}`);
  };

  const handleQuestLevelSelect = (questLevel: QuestLevel) => {
    router.push(`/play?mode=levels&level=${questLevel.levelNumber}&difficulty=${questLevel.difficulty}`);
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": "https://memory-math-match.vercel.app/levels#webpage",
    "url": "https://memory-math-match.vercel.app/levels",
    "name": "Memory Math Match Levels and Quest Maps",
    "description": "Choose your level or start a quest mapping challenge in Memory Math Match. Over 1000 developmental levels."
  };

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 p-4 md:p-8 space-y-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="max-w-5xl mx-auto flex items-center justify-between">
        <button
          onClick={() => router.push('/')}
          className="flex items-center space-x-2 text-slate-400 hover:text-white font-bold transition-all text-sm"
        >
          <FaChevronLeft />
          <span>Back to Home</span>
        </button>

        <div className="flex space-x-2">
          <button
            onClick={() => setSubView('levels')}
            className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all border flex items-center space-x-2 ${
              subView === 'levels'
                ? 'bg-blue-600 border-blue-500 text-white'
                : 'bg-slate-800 border-slate-700 text-slate-450 hover:text-slate-300'
            }`}
          >
            <FaGamepad />
            <span>Classic Levels</span>
          </button>
          <button
            onClick={() => setSubView('quest')}
            className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all border flex items-center space-x-2 ${
              subView === 'quest'
                ? 'bg-purple-600 border-purple-500 text-white'
                : 'bg-slate-800 border-slate-700 text-slate-450 hover:text-slate-300'
            }`}
          >
            <FaMapMarkedAlt />
            <span>Adventure Quest</span>
          </button>
        </div>
      </div>

      <div className="z-10 py-2">
        {subView === 'levels' ? (
          <LevelMap
            unlockedLevel={stats.unlockedLevel}
            onSelectLevel={handleLevelSelect}
            translations={settings.t}
          />
        ) : (
          <QuestMap
            unlockedLevel={stats.unlockedLevel}
            onSelectLevel={handleQuestLevelSelect}
            onBack={() => router.push('/')}
            translations={settings.t}
          />
        )}
      </div>
    </main>
  );
}
