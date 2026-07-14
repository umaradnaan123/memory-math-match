'use client';

import { FaGraduationCap, FaChevronLeft } from 'react-icons/fa';

interface TutorialProps {
  onClose: () => void;
  translations: Record<string, string>;
}

export default function Tutorial({ onClose, translations }: TutorialProps) {
  return (
    <div className="w-full max-w-2xl mx-auto p-6 bg-slate-900/60 rounded-3xl backdrop-blur-xl border border-slate-700/50 space-y-6 text-white text-center">
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <button
          onClick={onClose}
          className="flex items-center space-x-2 text-slate-400 hover:text-white transition-all text-sm font-bold"
        >
          <FaChevronLeft />
          <span>{translations.home}</span>
        </button>
        <h2 className="text-2xl font-black bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent flex items-center space-x-2">
          <FaGraduationCap className="text-blue-400" />
          <span>{translations.tutorial}</span>
        </h2>
        <div className="w-10" /> {/* Spacer */}
      </div>

      <div className="space-y-6 text-left py-4">
        <div className="flex items-start space-x-4">
          <div className="p-3 bg-blue-500/20 text-blue-400 rounded-xl font-bold">1</div>
          <div>
            <h3 className="font-extrabold text-slate-100">Find the Pairs</h3>
            <p className="text-slate-400 text-sm mt-1">
              Select two matching cards. One card contains a mathematical equation (e.g. <span className="font-bold text-blue-400">8 × 6</span>), and the other card contains the correct solved value (e.g. <span className="font-bold text-purple-400">48</span>).
            </p>
          </div>
        </div>

        <div className="flex items-start space-x-4">
          <div className="p-3 bg-purple-500/20 text-purple-400 rounded-xl font-bold">2</div>
          <div>
            <h3 className="font-extrabold text-slate-100">Match & Combo</h3>
            <p className="text-slate-400 text-sm mt-1">
              Match cards quickly to earn point combos! Combos multiply your score by up to 10x. But be careful, wrong flips reset your combo.
            </p>
          </div>
        </div>

        <div className="flex items-start space-x-4">
          <div className="p-3 bg-emerald-500/20 text-emerald-400 rounded-xl font-bold">3</div>
          <div>
            <h3 className="font-extrabold text-slate-100">Unlock Levels</h3>
            <p className="text-slate-400 text-sm mt-1">
              Advance through 200 levels spanning Addition, Subtraction, Multiplication, Division, Fractions, Exponents, Roots, Algebra, and Geometry!
            </p>
          </div>
        </div>
      </div>

      <button
        onClick={onClose}
        className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-blue-500/20 transition-all"
      >
        Let&apos;s Practice!
      </button>
    </div>
  );
}
