'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { getLocalStats, getLocalAchievements, getLeaderboards, Achievement, GameStats } from '../utils/gameData';
import { translations, Language } from '../utils/translations';
import { startBackgroundMusic, stopBackgroundMusic } from '../utils/audioSynth';
import { Category } from '../utils/mathEngine';

interface GameSettingsContextProps {
  lang: Language;
  setLang: (lang: Language) => void;
  darkMode: boolean;
  setDarkMode: (b: boolean) => void;
  volume: number;
  setVolume: (v: number) => void;
  soundEnabled: boolean;
  setSoundEnabled: (b: boolean) => void;
  musicEnabled: boolean;
  setMusicEnabled: (b: boolean) => void;
  highContrast: boolean;
  setHighContrast: (b: boolean) => void;
  largeText: boolean;
  setLargeText: (b: boolean) => void;
  colorBlindMode: 'none' | 'deuteranopia' | 'protanopia' | 'tritanopia';
  setColorBlindMode: (mode: 'none' | 'deuteranopia' | 'protanopia' | 'tritanopia') => void;
  reducedMotion: boolean;
  setReducedMotion: (b: boolean) => void;
  stats: GameStats | null;
  setStats: React.Dispatch<React.SetStateAction<GameStats | null>>;
  achievements: Achievement[];
  setAchievements: React.Dispatch<React.SetStateAction<Achievement[]>>;
  leaderboardEntries: ReturnType<typeof getLeaderboards>;
  setLeaderboardEntries: React.Dispatch<React.SetStateAction<ReturnType<typeof getLeaderboards>>>;
  enabledCategories: Category[];
  setEnabledCategories: React.Dispatch<React.SetStateAction<Category[]>>;
  t: Record<string, string>;
  handleResetProgress: () => void;
}

const GameSettingsContext = createContext<GameSettingsContextProps | undefined>(undefined);

export function GameSettingsProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Language>('en');
  const [darkMode, setDarkMode] = useState(true);
  const [volume, setVolume] = useState(0.5);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [musicEnabled, setMusicEnabled] = useState(true);
  const [highContrast, setHighContrast] = useState(false);
  const [largeText, setLargeText] = useState(false);
  const [colorBlindMode, setColorBlindMode] = useState<'none' | 'deuteranopia' | 'protanopia' | 'tritanopia'>('none');
  const [reducedMotion, setReducedMotion] = useState(false);

  const [stats, setStats] = useState<GameStats | null>(null);
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [leaderboardEntries, setLeaderboardEntries] = useState<ReturnType<typeof getLeaderboards>>({ daily: [], weekly: [], allTime: [] });
  const [enabledCategories, setEnabledCategories] = useState<Category[]>([
    'addition',
    'subtraction',
    'multiplication',
    'division',
    'square',
  ]);

  // Load from local storage
  useEffect(() => {
    const local = getLocalStats();
    setStats(local);
    setAchievements(getLocalAchievements(local));
    setLeaderboardEntries(getLeaderboards());
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

  // Background Music
  useEffect(() => {
    if (musicEnabled) {
      startBackgroundMusic('relaxing', volume);
    } else {
      stopBackgroundMusic();
    }
    return () => stopBackgroundMusic();
  }, [musicEnabled, volume]);

  const t = translations[lang] || translations.en;

  const handleResetProgress = () => {
    localStorage.removeItem('mmm_stats');
    const defaultStats = getLocalStats();
    setStats(defaultStats);
    setAchievements(getLocalAchievements(defaultStats));
    alert('Progress reset successfully.');
  };

  return (
    <GameSettingsContext.Provider
      value={{
        lang,
        setLang,
        darkMode,
        setDarkMode,
        volume,
        setVolume,
        soundEnabled,
        setSoundEnabled,
        musicEnabled,
        setMusicEnabled,
        highContrast,
        setHighContrast,
        largeText,
        setLargeText,
        colorBlindMode,
        setColorBlindMode,
        reducedMotion,
        setReducedMotion,
        stats,
        setStats,
        achievements,
        setAchievements,
        leaderboardEntries,
        setLeaderboardEntries,
        enabledCategories,
        setEnabledCategories,
        t,
        handleResetProgress,
      }}
    >
      <div className={colorBlindMode !== 'none' ? `color-blind-${colorBlindMode}` : ''}>
        {children}
      </div>
    </GameSettingsContext.Provider>
  );
}

export function useGameSettings() {
  const context = useContext(GameSettingsContext);
  if (!context) {
    throw new Error('useGameSettings must be used within a GameSettingsProvider');
  }
  return context;
}
