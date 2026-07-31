'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useGameSettings } from '@/context/GameSettingsContext';
import GameView from '@/components/GameView';
import { addLeaderboardEntry, saveLocalStats, getLocalAchievements, GameStats } from '@/utils/gameData';

export default function DailyChallengePage() {
  const router = useRouter();
  const settings = useGameSettings();

  if (!settings.stats) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center">
        Loading challenge...
      </div>
    );
  }

  const handleGameWin = (score: number, accuracy: number, timeSpent: number) => {
    if (!settings.stats) return;

    const nextWins = settings.stats.gamesWon + 1;
    const nextPlayed = settings.stats.gamesPlayed + 1;
    const maxScore = Math.max(settings.stats.highestScore, score);

    const updated: GameStats = {
      ...settings.stats,
      gamesWon: nextWins,
      gamesPlayed: nextPlayed,
      highestScore: maxScore,
      coins: settings.stats.coins + 50, // Extra reward for daily
      xp: settings.stats.xp + 100,
      averageAccuracy: Math.round((settings.stats.averageAccuracy * settings.stats.gamesPlayed + accuracy) / nextPlayed),
    };

    saveLocalStats(updated);
    settings.setStats(updated);
    settings.setAchievements(getLocalAchievements(updated));

    const name = prompt('Enter your name for the daily leaderboard:', 'Player') || 'Player';
    addLeaderboardEntry({ name, score, time: timeSpent, accuracy, date: new Date().toLocaleDateString() });
    
    router.push('/');
  };

  const handleGameLose = () => {
    alert('Game Over! Try again tomorrow!');
    router.push('/');
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": "https://memory-math-match.vercel.app/daily-challenge#webpage",
    "url": "https://memory-math-match.vercel.app/daily-challenge",
    "name": "Memory Math Match Daily Challenge",
    "description": "Play the unique daily challenge to earn extra rewards and compare accuracy speeds on the leaderboards."
  };

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 p-4 md:p-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <GameView
        mode="daily"
        levelNumber={1}
        difficulty="medium"
        enabledCategories={settings.enabledCategories}
        soundEnabled={settings.soundEnabled}
        reducedMotion={settings.reducedMotion}
        largeText={settings.largeText}
        onBack={() => router.push('/')}
        onWin={handleGameWin}
        onLose={handleGameLose}
        translations={settings.t}
      />
    </main>
  );
}
