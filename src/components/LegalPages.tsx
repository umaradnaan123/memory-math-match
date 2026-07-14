'use client';

import React from 'react';
import { FaChevronLeft, FaBook, FaShieldAlt, FaQuestionCircle, FaEnvelope, FaFileContract } from 'react-icons/fa';

interface LegalPagesProps {
  page: 'about' | 'privacy' | 'terms' | 'contact' | 'faq';
  onBack: () => void;
  translations: Record<string, string>;
}

export default function LegalPages({ page, onBack, translations }: LegalPagesProps) {
  return (
    <div className="w-full max-w-3xl mx-auto p-6 bg-slate-900/60 rounded-3xl backdrop-blur-xl border border-slate-700/50 space-y-6 text-white">
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <button
          onClick={onBack}
          className="flex items-center space-x-2 text-slate-400 hover:text-white font-bold transition-all text-sm"
        >
          <FaChevronLeft />
          <span>{translations.home || 'Back to Home'}</span>
        </button>
        <h2 className="text-2xl font-black bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent capitalize flex items-center space-x-2">
          {page === 'about' && <FaBook className="text-blue-400" />}
          {page === 'privacy' && <FaShieldAlt className="text-emerald-400" />}
          {page === 'terms' && <FaFileContract className="text-orange-400" />}
          {page === 'contact' && <FaEnvelope className="text-cyan-400" />}
          {page === 'faq' && <FaQuestionCircle className="text-yellow-400" />}
          <span>{page} Page</span>
        </h2>
        <div className="w-10" />
      </div>

      <div className="space-y-4 text-slate-300 text-sm leading-relaxed">
        {page === 'about' && (
          <>
            <p><strong>Memory Math Match</strong> is an online brain-training game that combines memory card flipping with interactive mathematics problems.</p>
            <p>Our mission is to make math practice fun, accessible, and completely offline-capable for kids, students, parents, and schools. We offer modular level maps spanning addition, subtraction, division, geometry, algebra, and calculus topics.</p>
          </>
        )}

        {page === 'privacy' && (
          <>
            <p>Your privacy is important to us. Memory Math Match operates entirely in your web browser. We do not transmit or collect personal data to remote servers.</p>
            <p><strong>Local Storage:</strong> All scores, unlocked levels, custom themes, and category achievements are stored locally on your device. We do not use tracking cookies or sell your analytics info.</p>
          </>
        )}

        {page === 'terms' && (
          <>
            <p>By playing Memory Math Match, you agree to these simplified terms of service:</p>
            <p>Our educational game is provided free of charge, with no guarantees of uninterrupted service. Code modifications, custom designs, and logos are assets of the project and protected under copy laws.</p>
          </>
        )}

        {page === 'contact' && (
          <>
            <p>If you have suggestions, feature requests, or custom math category suggestions, please reach out to us:</p>
            <p>📧 Email Support: <a href="mailto:support@memory-math-match.vercel.app" className="text-blue-400 underline">support@memory-math-match.vercel.app</a></p>
            <p>We welcome school licensing questions and classroom feedback.</p>
          </>
        )}

        {page === 'faq' && (
          <div className="space-y-4">
            <div>
              <h4 className="font-extrabold text-white text-base">Is this game free to play?</h4>
              <p className="text-slate-450 mt-1">Yes, Memory Math Match is 100% free and does not require paid signups or subscriptions.</p>
            </div>
            <div>
              <h4 className="font-extrabold text-white text-base">Can I play the game offline?</h4>
              <p className="text-slate-450 mt-1">Absolutely. Once the site is loaded, all card layouts, sound synthesizers, and statistics run locally offline in your browser.</p>
            </div>
            <div>
              <h4 className="font-extrabold text-white text-base">How does the progressive difficulty work?</h4>
              <p className="text-slate-450 mt-1">The board scales from a simple 4x2 grid (8 cards) up to a challenging 8x8 grid (64 cards) based on the current level, introducing advanced equations as you level up.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
