'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FaLock, FaStar } from 'react-icons/fa';

interface LevelMapProps {
  unlockedLevel: number;
  onSelectLevel: (level: number) => void;
  lang: string;
  translations: Record<string, string>;
}

export default function LevelMap({ unlockedLevel, onSelectLevel, lang, translations }: LevelMapProps) {
  // Generate 200 Levels grouped into categories/topics
  const categories = [
    { name: 'Addition & Subtraction', start: 1, end: 40 },
    { name: 'Multiplication & Division', start: 41, end: 80 },
    { name: 'Fractions & Decimals', start: 81, end: 120 },
    { name: 'Algebra & Equations', start: 121, end: 160 },
    { name: 'Mixed Master Class', start: 161, end: 200 },
  ];

  return (
    <div className="w-full max-w-4xl mx-auto p-4 md:p-6 bg-slate-900/40 rounded-3xl backdrop-blur-xl border border-slate-700/50">
      <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 text-center mb-6">
        {translations.levels}
      </h2>

      <div className="space-y-12 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
        {categories.map((cat, catIdx) => (
          <div key={catIdx} className="space-y-4">
            <h3 className="text-xl font-bold text-slate-300 border-l-4 border-blue-500 pl-3">
              {cat.name}
            </h3>

            <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-4">
              {Array.from({ length: cat.end - cat.start + 1 }, (_, i) => {
                const lvlNum = cat.start + i;
                const isUnlocked = lvlNum <= unlockedLevel;

                return (
                  <motion.button
                    key={lvlNum}
                    whileHover={isUnlocked ? { scale: 1.1 } : {}}
                    whileTap={isUnlocked ? { scale: 0.95 } : {}}
                    onClick={() => isUnlocked && onSelectLevel(lvlNum)}
                    className={`relative aspect-square flex flex-col items-center justify-center rounded-2xl border transition-all ${
                      isUnlocked
                        ? 'bg-gradient-to-br from-blue-500/20 to-purple-500/20 border-blue-500/50 text-white cursor-pointer hover:shadow-lg hover:shadow-blue-500/20'
                        : 'bg-slate-800/40 border-slate-700/40 text-slate-600 cursor-not-allowed'
                    }`}
                  >
                    <span className="font-extrabold text-lg">{lvlNum}</span>

                    <div className="absolute bottom-2 flex space-x-0.5 text-xs text-yellow-400">
                      {isUnlocked ? (
                        <>
                          <FaStar className="w-3 h-3" />
                          <FaStar className="w-3 h-3" />
                          <FaStar className="w-3 h-3" />
                        </>
                      ) : (
                        <FaLock className="w-3 h-3 text-slate-500" />
                      )}
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
