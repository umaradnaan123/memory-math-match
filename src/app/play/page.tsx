'use client';

import React, { Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useGameSettings } from '@/context/GameSettingsContext';
import GameView from '@/components/GameView';
import { Difficulty } from '@/utils/mathEngine';
import { addLeaderboardEntry, saveLocalStats, getLocalAchievements, GameStats } from '@/utils/gameData';

function PlayGameContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const settings = useGameSettings();

  const mode = (searchParams.get('mode') || 'practice') as 'levels' | 'practice' | 'time' | 'endless' | 'daily' | 'speed' | 'zen';
  const difficulty = (searchParams.get('difficulty') || 'easy') as Difficulty;
  const levelNumber = searchParams.get('level') ? parseInt(searchParams.get('level')!) : 1;

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
      coins: settings.stats.coins + 25,
      xp: settings.stats.xp + 50,
      unlockedLevel: mode === 'levels' && levelNumber === settings.stats.unlockedLevel ? settings.stats.unlockedLevel + 1 : settings.stats.unlockedLevel,
      averageAccuracy: Math.round((settings.stats.averageAccuracy * settings.stats.gamesPlayed + accuracy) / nextPlayed),
    };

    saveLocalStats(updated);
    settings.setStats(updated);
    settings.setAchievements(getLocalAchievements(updated));

    const name = prompt('Enter your name for the scoreboard:', 'Player') || 'Player';
    addLeaderboardEntry({ name, score, time: timeSpent, accuracy, date: new Date().toLocaleDateString() });
    
    router.push('/');
  };

  const handleGameLose = () => {
    alert('Game Over! Try again!');
    router.push('/');
  };

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 p-4 md:p-8">
      <GameView
        mode={mode}
        levelNumber={levelNumber}
        difficulty={difficulty}
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

export default function PlayPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center">Loading match...</div>}>
      <PlayGameContent />
    </Suspense>
  );
}
