'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaAward } from 'react-icons/fa';
import { Achievement } from '../utils/gameData';

interface AchievementsModalProps {
  isOpen: boolean;
  onClose: () => void;
  achievements: Achievement[];
  translations: Record<string, string>;
}

export default function AchievementsModal({ isOpen, onClose, achievements, translations }: AchievementsModalProps) {
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

            <h2 className="text-2xl font-black mb-6 bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent flex items-center space-x-2">
              <FaAward className="text-purple-400" />
              <span>{translations.achievements}</span>
            </h2>

            {/* List */}
            <div className="space-y-4 max-h-[50vh] overflow-y-auto pr-2 custom-scrollbar">
              {achievements.map((ach) => (
                <div
                  key={ach.id}
                  className={`flex items-center space-x-4 p-4 rounded-2xl border transition-all ${
                    ach.unlocked
                      ? 'bg-gradient-to-br from-purple-900/20 to-pink-900/20 border-purple-500/30'
                      : 'bg-slate-800/30 border-slate-700/30 opacity-60'
                  }`}
                >
                  <span className="text-4xl">{ach.badge}</span>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-extrabold text-sm text-slate-100 flex items-center justify-between">
                      <span>{ach.title}</span>
                      <span className="text-xs text-purple-400 font-bold">
                        {ach.current} / {ach.target}
                      </span>
                    </h3>
                    <p className="text-xs text-slate-400 mt-1 line-clamp-2">{ach.desc}</p>

                    {/* Progress Bar */}
                    <div className="w-full bg-slate-800 rounded-full h-1.5 mt-2.5 overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-purple-500 to-pink-500 h-full rounded-full transition-all duration-300"
                        style={{ width: `${(ach.current / ach.target) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
