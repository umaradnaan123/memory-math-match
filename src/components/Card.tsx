'use client';

import { motion } from 'framer-motion';
import { MathCard } from '../utils/mathEngine';

interface CardProps {
  card: MathCard;
  isFlipped: boolean;
  isMatched: boolean;
  isSelected: boolean;
  onClick: () => void;
  reducedMotion: boolean;
  largeText: boolean;
}

export default function Card({
  card,
  isFlipped,
  isMatched,
  isSelected,
  onClick,
  reducedMotion,
  largeText,
}: CardProps) {
  // Determine text sizes based on preferences
  const textSize = largeText ? 'text-2xl md:text-3xl' : 'text-lg md:text-xl';
  const showFront = isFlipped || isMatched;

  // Animation variants
  const flipVariants = {
    back: { rotateY: 0 },
    front: { rotateY: 180 },
  };

  return (
    <div
      onClick={!isMatched ? onClick : undefined}
      className={`relative w-full aspect-square cursor-pointer perspective-1000 select-none ${
        isMatched ? 'opacity-60 cursor-default' : ''
      }`}
      role="button"
      aria-label={`Card showing ${showFront ? card.content : 'Question Mark'}`}
      aria-pressed={isSelected}
    >
      <motion.div
        className="w-full h-full duration-500 preserve-3d relative rounded-2xl shadow-xl transition-all"
        animate={reducedMotion ? {} : (showFront ? 'front' : 'back')}
        variants={reducedMotion ? undefined : flipVariants}
        style={{ transform: reducedMotion ? 'none' : undefined }}
      >
        {/* Front Side (Expression/Value) */}
        <div
          className={`absolute inset-0 w-full h-full rounded-2xl glass-panel flex flex-col items-center justify-center p-3 text-center border-2 backface-hidden bg-gradient-to-br ${
            card.color
          } ${reducedMotion ? '' : 'rotate-y-180'} ${
            isSelected ? 'ring-4 ring-yellow-400 border-yellow-300 shadow-yellow-500/50' : ''
          } ${isMatched ? 'border-emerald-400 shadow-emerald-500/40' : ''}`}
        >
          <span className="text-3xl mb-2">{card.icon}</span>
          <span className={`font-bold leading-tight ${textSize} break-words text-white`}>
            {card.content}
          </span>
        </div>

        {/* Back Side (Question Mark) */}
        <div
          className={`absolute inset-0 w-full h-full rounded-2xl glass-panel flex items-center justify-center border-2 border-slate-700/50 backface-hidden bg-gradient-to-br from-slate-800 to-slate-900 ${
            isSelected ? 'ring-4 ring-yellow-400 border-yellow-300' : ''
          }`}
        >
          <motion.div
            className="text-5xl font-black text-slate-400/80"
            animate={isSelected ? { scale: [1, 1.2, 1] } : {}}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            ?
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
