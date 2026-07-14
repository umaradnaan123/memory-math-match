'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { FaHeart, FaVideo, FaRedo, FaMap } from 'react-icons/fa';

interface OutOfHeartsModalProps {
  isOpen: boolean;
  onWatchAd: () => void;
  onRestart: () => void;
  onBackToMap: () => void;
  adInProgress: boolean;
}

export default function OutOfHeartsModal({
  isOpen,
  onWatchAd,
  onRestart,
  onBackToMap,
  adInProgress,
}: OutOfHeartsModalProps) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-slate-950/85 backdrop-blur-md"
        />

        {/* Modal Window Container */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 30 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 30 }}
          className="relative w-full max-w-md bg-slate-900 border border-slate-700/80 rounded-3xl p-6 shadow-2xl text-white text-center z-10 space-y-6"
        >
          {/* Header Icons */}
          <div className="flex justify-center">
            <motion.div
              animate={{ scale: [1, 1.25, 1] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="p-5 bg-red-500/10 text-red-500 rounded-full border border-red-500/30"
            >
              <FaHeart className="w-12 h-12" />
            </motion.div>
          </div>

          <div className="space-y-2">
            <h2 className="text-3xl font-black bg-gradient-to-r from-red-400 to-rose-500 bg-clip-text text-transparent">
              Out of Hearts!
            </h2>
            <p className="text-sm text-slate-400">
              You ran out of lives for this challenge. Keep going to protect your math streak!
            </p>
          </div>

          {/* Action buttons drawer */}
          <div className="space-y-3">
            <button
              onClick={onWatchAd}
              disabled={adInProgress}
              className="w-full flex items-center justify-center space-x-3 bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-500 hover:to-amber-600 text-slate-950 font-black py-4 px-6 rounded-2xl shadow-lg shadow-yellow-500/20 hover:shadow-yellow-500/30 transition-all disabled:opacity-40"
            >
              <FaVideo />
              <span>{adInProgress ? 'Ad in progress...' : 'Watch Ad (+2 Hearts)'}</span>
            </button>

            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={onRestart}
                className="flex items-center justify-center space-x-2 bg-slate-800 hover:bg-slate-700 text-white font-bold py-3.5 px-4 rounded-xl border border-slate-700 transition-all text-sm"
              >
                <FaRedo />
                <span>Restart Level</span>
              </button>

              <button
                onClick={onBackToMap}
                className="flex items-center justify-center space-x-2 bg-slate-800 hover:bg-slate-700 text-white font-bold py-3.5 px-4 rounded-xl border border-slate-700 transition-all text-sm"
              >
                <FaMap />
                <span>Quest Map</span>
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
