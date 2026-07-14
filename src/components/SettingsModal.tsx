'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Language, translations } from '../utils/translations';
import { FaTimes, FaGlobe, FaVolumeUp, FaPalette, FaTrashAlt } from 'react-icons/fa';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
  setLang: (lang: Language) => void;
  volume: number;
  setVolume: (v: number) => void;
  musicEnabled: boolean;
  setMusicEnabled: (b: boolean) => void;
  soundEnabled: boolean;
  setSoundEnabled: (b: boolean) => void;
  darkMode: boolean;
  setDarkMode: (b: boolean) => void;
  highContrast: boolean;
  setHighContrast: (b: boolean) => void;
  largeText: boolean;
  setLargeText: (b: boolean) => void;
  colorBlindMode: 'none' | 'deuteranopia' | 'protanopia' | 'tritanopia';
  setColorBlindMode: (mode: 'none' | 'deuteranopia' | 'protanopia' | 'tritanopia') => void;
  reducedMotion: boolean;
  setReducedMotion: (b: boolean) => void;
  onReset: () => void;
}

export default function SettingsModal({
  isOpen,
  onClose,
  lang,
  setLang,
  volume,
  setVolume,
  musicEnabled,
  setMusicEnabled,
  soundEnabled,
  setSoundEnabled,
  darkMode,
  setDarkMode,
  highContrast,
  setHighContrast,
  largeText,
  setLargeText,
  colorBlindMode,
  setColorBlindMode,
  reducedMotion,
  setReducedMotion,
  onReset,
}: SettingsModalProps) {
  const t = translations[lang] || translations.en;

  const languagesList: { code: Language; label: string }[] = [
    { code: 'en', label: 'English' },
    { code: 'hi', label: 'Hindi (हिंदी)' },
    { code: 'te', label: 'Telugu (తెలుగు)' },
    { code: 'ta', label: 'Tamil (தமிழ்)' },
    { code: 'kn', label: 'Kannada (ಕನ್ನಡ)' },
    { code: 'ml', label: 'Malayalam (മലയാളം)' },
    { code: 'ur', label: 'Urdu (اردو)' },
    { code: 'es', label: 'Español' },
    { code: 'fr', label: 'Français' },
    { code: 'de', label: 'Deutsch' },
    { code: 'ar', label: 'Arabic (العربية)' },
    { code: 'zh', label: 'Chinese (中文)' },
    { code: 'ja', label: 'Japanese (日本語)' },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
          />

          {/* Modal box */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="relative w-full max-w-lg overflow-y-auto max-h-[85vh] bg-slate-900 border border-slate-700/80 rounded-3xl p-6 shadow-2xl text-white z-10 custom-scrollbar"
          >
            <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-white transition-all">
              <FaTimes className="w-5 h-5" />
            </button>

            <h2 className="text-2xl font-black mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              {t.settingsTitle}
            </h2>

            <div className="space-y-6">
              {/* Localization Language */}
              <div className="space-y-2">
                <label className="flex items-center space-x-2 text-slate-300 font-bold text-sm">
                  <FaGlobe />
                  <span>{t.language}</span>
                </label>
                <select
                  value={lang}
                  onChange={(e) => setLang(e.target.value as Language)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-slate-100 outline-none focus:border-blue-500"
                >
                  {languagesList.map((l) => (
                    <option key={l.code} value={l.code}>
                      {l.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Sound and Music Controls */}
              <div className="space-y-4 bg-slate-800/40 p-4 rounded-2xl border border-slate-700/30">
                <h3 className="font-bold text-sm text-slate-300 flex items-center space-x-2">
                  <FaVolumeUp />
                  <span>Audio Tones & Levels</span>
                </h3>
                <div className="flex justify-between items-center text-sm">
                  <span>{t.soundEffects}</span>
                  <input
                    type="checkbox"
                    checked={soundEnabled}
                    onChange={(e) => setSoundEnabled(e.target.checked)}
                    className="w-5 h-5 accent-blue-500"
                  />
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span>{t.music}</span>
                  <input
                    type="checkbox"
                    checked={musicEnabled}
                    onChange={(e) => setMusicEnabled(e.target.checked)}
                    className="w-5 h-5 accent-blue-500"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs text-slate-400">Master Volume</label>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.1"
                    value={volume}
                    onChange={(e) => setVolume(parseFloat(e.target.value))}
                    className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
                  />
                </div>
              </div>

              {/* Accessibility Settings */}
              <div className="space-y-4 bg-slate-800/40 p-4 rounded-2xl border border-slate-700/30">
                <h3 className="font-bold text-sm text-slate-300 flex items-center space-x-2">
                  <FaPalette />
                  <span>{t.accessibility}</span>
                </h3>
                <div className="flex justify-between items-center text-sm">
                  <span>{t.highContrast}</span>
                  <input
                    type="checkbox"
                    checked={highContrast}
                    onChange={(e) => setHighContrast(e.target.checked)}
                    className="w-5 h-5 accent-blue-500"
                  />
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span>{t.largeText}</span>
                  <input
                    type="checkbox"
                    checked={largeText}
                    onChange={(e) => setLargeText(e.target.checked)}
                    className="w-5 h-5 accent-blue-500"
                  />
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span>{t.reducedMotion}</span>
                  <input
                    type="checkbox"
                    checked={reducedMotion}
                    onChange={(e) => setReducedMotion(e.target.checked)}
                    className="w-5 h-5 accent-blue-500"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs text-slate-400">{t.colorBlind}</label>
                  <select
                    value={colorBlindMode}
                    onChange={(e) =>
                      setColorBlindMode(e.target.value as 'none' | 'deuteranopia' | 'protanopia' | 'tritanopia')
                    }
                    className="w-full bg-slate-850 border border-slate-750 rounded-lg px-3 py-2 text-xs text-slate-200"
                  >
                    <option value="none">Normal Color Palette</option>
                    <option value="deuteranopia">Deuteranopia Mode</option>
                    <option value="protanopia">Protanopia Mode</option>
                    <option value="tritanopia">Tritanopia Mode</option>
                  </select>
                </div>
              </div>

              {/* Theme Selector */}
              <div className="flex justify-between items-center text-sm">
                <span>{t.darkMode}</span>
                <input
                  type="checkbox"
                  checked={darkMode}
                  onChange={(e) => setDarkMode(e.target.checked)}
                  className="w-5 h-5 accent-blue-500"
                />
              </div>

              {/* Reset Data */}
              <button
                onClick={() => {
                  if (confirm(t.confirmReset)) {
                    onReset();
                  }
                }}
                className="w-full flex items-center justify-center space-x-2 border border-red-500/50 hover:bg-red-500/10 text-red-400 py-3 rounded-xl transition-all font-bold text-sm mt-4"
              >
                <FaTrashAlt />
                <span>{t.resetProgress}</span>
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
