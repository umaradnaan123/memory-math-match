'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { WORLDS, QuestLevel, generateQuestMapData } from '../utils/questConfig';
import { FaLock, FaStar, FaChevronLeft, FaSearchPlus, FaSearchMinus } from 'react-icons/fa';

interface QuestMapProps {
  unlockedLevel: number;
  onSelectLevel: (level: QuestLevel) => void;
  onBack: () => void;
  translations: Record<string, string>;
}

export default function QuestMap({ unlockedLevel, onSelectLevel, onBack, translations }: QuestMapProps) {
  const [selectedWorldId, setSelectedWorldId] = useState<number>(1);
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const questLevels = generateQuestMapData(unlockedLevel);
  const currentWorld = WORLDS.find((w) => w.id === selectedWorldId) || WORLDS[0];

  // Filter levels belonging to the active world selection
  const worldLevels = questLevels.filter((l) => l.worldId === selectedWorldId);

  // Auto-scroll inside world level track to show latest unlocked stage
  useEffect(() => {
    if (scrollContainerRef.current) {
      const activeBtn = scrollContainerRef.current.querySelector('.active-unlocked-level');
      if (activeBtn) {
        activeBtn.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  }, [selectedWorldId]);

  return (
    <div className="w-full max-w-5xl mx-auto p-4 space-y-6 text-white">
      {/* Map Header with HUD stats */}
      <div className="flex flex-col sm:flex-row justify-between items-center bg-slate-900/60 p-5 rounded-3xl border border-slate-700/50 gap-4">
        <button
          onClick={onBack}
          className="flex items-center space-x-2 text-slate-400 hover:text-white font-bold transition-all text-sm"
        >
          <FaChevronLeft />
          <span>{translations.home}</span>
        </button>

        <div className="text-center">
          <h2 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
            Adventure Quest Map
          </h2>
          <p className="text-xs text-slate-400">Unlock worlds and solve 1000+ mathematics stages</p>
        </div>

        {/* Zoom Controls */}
        <div className="flex space-x-2">
          <button
            onClick={() => setZoomLevel((z) => Math.max(z - 0.2, 0.8))}
            className="p-2.5 bg-slate-800 hover:bg-slate-700 rounded-xl border border-slate-700"
          >
            <FaSearchMinus />
          </button>
          <button
            onClick={() => setZoomLevel((z) => Math.min(z + 0.2, 1.6))}
            className="p-2.5 bg-slate-800 hover:bg-slate-700 rounded-xl border border-slate-700"
          >
            <FaSearchPlus />
          </button>
        </div>
      </div>

      {/* World Switcher bar */}
      <div className="flex overflow-x-auto space-x-3 py-2 px-1 scrollbar-thin scrollbar-thumb-slate-800">
        {WORLDS.map((w) => {
          const isActive = selectedWorldId === w.id;
          const isWorldUnlocked = unlockedLevel >= w.levelRange[0];

          return (
            <button
              key={w.id}
              onClick={() => isWorldUnlocked && setSelectedWorldId(w.id)}
              className={`flex-shrink-0 px-4 py-3 rounded-2xl border text-xs font-black transition-all flex items-center space-x-2 ${
                isActive
                  ? 'bg-gradient-to-r from-blue-500 to-indigo-600 border-blue-400 text-white shadow-lg'
                  : isWorldUnlocked
                  ? 'bg-slate-850 border-slate-700 text-slate-300 hover:bg-slate-800'
                  : 'bg-slate-900/60 border-slate-800/40 text-slate-600 cursor-not-allowed'
              }`}
            >
              {!isWorldUnlocked && <FaLock className="w-3 h-3" />}
              <span>{w.name}</span>
            </button>
          );
        })}
      </div>

      {/* The main Animated Path Level scroll viewer */}
      <div
        ref={scrollContainerRef}
        className="relative h-[65vh] overflow-y-auto bg-slate-950/60 rounded-3xl border border-slate-800/60 flex items-center justify-center p-6"
      >
        {/* Animated Background path */}
        <div
          className="transition-all duration-300 w-full h-full flex flex-col items-center space-y-12"
          style={{ transform: `scale(${zoomLevel})` }}
        >
          <h3 className="text-xl font-extrabold tracking-wide text-indigo-300">
            {currentWorld.name} (Lvl {currentWorld.levelRange[0]}-{currentWorld.levelRange[1]})
          </h3>

          <div className="relative w-full max-w-lg flex flex-col items-center space-y-16">
            {/* Draw Path Lines */}
            <div className="absolute top-8 bottom-8 w-1 bg-gradient-to-b from-blue-500/20 via-indigo-500 to-purple-500/20 left-1/2 -translate-x-1/2 -z-10" />

            {worldLevels.map((level, index) => {
              const isUnlocked = level.isUnlocked;
              const isCurrentUnlocked = level.levelNumber === unlockedLevel;

              // Sinewave path curve offset
              const offsetAngle = index * 0.8;
              const offsetX = Math.sin(offsetAngle) * 90; // Left-Right curvature

              return (
                <motion.div
                  key={level.levelNumber}
                  style={{ transform: `translateX(${offsetX}px)` }}
                  className="relative z-10"
                >
                  <motion.button
                    whileHover={isUnlocked ? { scale: 1.15 } : {}}
                    whileTap={isUnlocked ? { scale: 0.95 } : {}}
                    onClick={() => isUnlocked && onSelectLevel(level)}
                    className={`w-16 h-16 rounded-full flex flex-col items-center justify-center border-4 shadow-xl transition-all ${
                      isCurrentUnlocked
                        ? 'active-unlocked-level bg-gradient-to-br from-yellow-400 to-amber-500 border-yellow-300 ring-4 ring-yellow-400/40 text-slate-950 font-black animate-pulse'
                        : isUnlocked
                        ? 'bg-gradient-to-br from-blue-500 to-indigo-600 border-blue-400 text-white font-extrabold'
                        : 'bg-slate-800 border-slate-700 text-slate-500 cursor-not-allowed'
                    }`}
                  >
                    {isUnlocked ? (
                      level.badge ? (
                        <span className="text-xl">{level.badge}</span>
                      ) : (
                        <span className="text-sm font-black">{level.levelNumber}</span>
                      )
                    ) : (
                      <FaLock className="w-4 h-4" />
                    )}

                    {/* Stars HUD underneath */}
                    {isUnlocked && (
                      <div className="absolute -bottom-4 flex space-x-0.5 bg-slate-900/90 py-0.5 px-2 rounded-full border border-slate-800 text-[9px] text-yellow-400">
                        <FaStar className="w-2.5 h-2.5" />
                        <FaStar className="w-2.5 h-2.5" />
                        <FaStar className="w-2.5 h-2.5" />
                      </div>
                    )}
                  </motion.button>

                  {/* Level Details tooltip */}
                  {isUnlocked && (
                    <div className="absolute top-2 left-20 bg-slate-900/90 border border-slate-800 px-3 py-1.5 rounded-xl text-[10px] w-28 pointer-events-none shadow-md">
                      <div className="font-bold">Stage {level.levelNumber}</div>
                      <div className="text-slate-400 capitalize">{level.difficulty}</div>
                      {level.isBoss && <div className="text-red-400 font-extrabold uppercase">Boss Stage</div>}
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
