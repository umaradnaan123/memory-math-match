'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaTrophy, FaCalendarCheck, FaGlobe } from 'react-icons/fa';
import { LeaderboardEntry } from '../utils/gameData';

interface LeaderboardModalProps {
  isOpen: boolean;
  onClose: () => void;
  entries: Record<'daily' | 'weekly' | 'allTime', LeaderboardEntry[]>;
  translations: Record<string, string>;
}

export default function LeaderboardModal({ isOpen, onClose, entries, translations }: LeaderboardModalProps) {
  const [tab, setTab] = React.useState<'daily' | 'weekly' | 'allTime'>('allTime');

  const currentList = entries[tab] || [];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
          />

          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="relative w-full max-w-lg bg-slate-900 border border-slate-700/80 rounded-3xl p-6 shadow-2xl text-white z-10"
          >
            <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-white transition-all">
              <FaTimes className="w-5 h-5" />
            </button>

            <h2 className="text-2xl font-black mb-6 bg-gradient-to-r from-yellow-400 to-amber-500 bg-clip-text text-transparent flex items-center space-x-2">
              <FaTrophy className="text-yellow-400" />
              <span>{translations.leaderboard}</span>
            </h2>

            {/* Tabs */}
            <div className="flex space-x-2 bg-slate-800 p-1.5 rounded-xl mb-6">
              {(['daily', 'weekly', 'allTime'] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  className={`flex-1 py-2 text-xs font-bold rounded-lg uppercase tracking-wider transition-all ${
                    tab === t ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>

            {/* List */}
            <div className="space-y-3 max-h-[40vh] overflow-y-auto pr-2 custom-scrollbar">
              {currentList.length === 0 ? (
                <p className="text-slate-500 text-sm text-center py-8">No leaderboard records yet. Play a game to submit your high score!</p>
              ) : (
                currentList.map((entry, idx) => (
                  <div
                    key={idx}
                    className="flex justify-between items-center p-3.5 bg-slate-800/40 rounded-xl border border-slate-700/50 hover:bg-slate-800/80 transition-all"
                  >
                    <div className="flex items-center space-x-3">
                      <span className={`w-6 h-6 flex items-center justify-center font-extrabold text-sm rounded-full ${
                        idx === 0
                          ? 'bg-yellow-500 text-slate-950'
                          : idx === 1
                          ? 'bg-slate-350 text-slate-900'
                          : idx === 2
                          ? 'bg-amber-600 text-slate-100'
                          : 'text-slate-400'
                      }`}>
                        {idx + 1}
                      </span>
                      <span className="font-semibold text-slate-200">{entry.name}</span>
                    </div>

                    <div className="text-right">
                      <div className="font-extrabold text-sm text-blue-400">{entry.score} pts</div>
                      <div className="text-xs text-slate-400">{entry.time}s • {entry.accuracy}% acc</div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
