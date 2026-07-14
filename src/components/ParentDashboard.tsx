'use client';

import React from 'react';
import { GameStats } from '../utils/gameData';
import { FaPrint, FaAward, FaChartLine, FaCheckCircle } from 'react-icons/fa';

interface ParentDashboardProps {
  stats: GameStats;
  translations: Record<string, string>;
}

export default function ParentDashboard({ stats, translations }: ParentDashboardProps) {
  const handlePrint = () => {
    window.print();
  };

  // Pre-calculate topics
  const topics = Object.entries(stats.accuracyByTopic || {});

  return (
    <div className="w-full max-w-4xl mx-auto p-6 space-y-8 bg-slate-900/60 rounded-3xl backdrop-blur-xl border border-slate-700/50">
      <div className="flex items-center justify-between border-b border-slate-700 pb-4">
        <div>
          <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">
            {translations.parentDashboard}
          </h2>
          <p className="text-slate-400 text-sm mt-1">Track learning progress, accuracy by topic, and milestones.</p>
        </div>
        <button
          onClick={handlePrint}
          className="flex items-center space-x-2 bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-2.5 px-4 rounded-xl shadow-lg shadow-emerald-500/20 transition-all text-sm"
        >
          <FaPrint />
          <span>Print Certificate</span>
        </button>
      </div>

      {/* Analytics Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="p-5 rounded-2xl bg-slate-800/40 border border-slate-700/40 flex items-center space-x-4">
          <div className="p-3 bg-blue-500/20 text-blue-400 rounded-xl">
            <FaChartLine className="w-6 h-6" />
          </div>
          <div>
            <div className="text-slate-400 text-xs">Total Challenges</div>
            <div className="text-2xl font-extrabold text-white">{stats.gamesPlayed}</div>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-800/40 border border-slate-700/40 flex items-center space-x-4">
          <div className="p-3 bg-emerald-500/20 text-emerald-400 rounded-xl">
            <FaCheckCircle className="w-6 h-6" />
          </div>
          <div>
            <div className="text-slate-400 text-xs">Overall Accuracy</div>
            <div className="text-2xl font-extrabold text-white">{stats.averageAccuracy.toFixed(1)}%</div>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-800/40 border border-slate-700/40 flex items-center space-x-4">
          <div className="p-3 bg-purple-500/20 text-purple-400 rounded-xl">
            <FaAward className="w-6 h-6" />
          </div>
          <div>
            <div className="text-slate-400 text-xs">Milestone Level</div>
            <div className="text-2xl font-extrabold text-white">Lvl {stats.unlockedLevel}</div>
          </div>
        </div>
      </div>

      {/* Accuracy By Topic Graph */}
      <div className="p-6 rounded-2xl bg-slate-800/20 border border-slate-700/30">
        <h3 className="text-lg font-bold text-slate-200 mb-4">Accuracy by Mathematical Topic</h3>
        {topics.length === 0 ? (
          <p className="text-slate-500 text-sm text-center py-6">No data recorded yet. Start playing levels to view insights!</p>
        ) : (
          <div className="space-y-4">
            {topics.map(([topic, data]) => {
              const pct = data.total > 0 ? (data.correct / data.total) * 100 : 0;
              return (
                <div key={topic} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="capitalize text-slate-300 font-semibold">{topic}</span>
                    <span className="text-slate-400">{pct.toFixed(0)}% accuracy ({data.correct}/{data.total})</span>
                  </div>
                  <div className="w-full bg-slate-800 rounded-full h-3 overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-emerald-500 to-teal-400 h-full rounded-full transition-all duration-500"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Printable Certificate Structure */}
      <div className="hidden print:block p-8 border-8 border-double border-yellow-600 bg-white text-slate-900 rounded-lg text-center max-w-2xl mx-auto space-y-6">
        <h1 className="text-4xl font-serif font-black text-yellow-700">Certificate of Achievement</h1>
        <p className="text-lg italic font-semibold">This certifies that the Math Memory Match player has mastered math skills</p>
        <div className="py-4 border-b-2 border-slate-300">
          <p className="text-3xl font-extrabold tracking-wide uppercase">Excellent Scholar</p>
        </div>
        <p className="text-base text-slate-700">
          Successfully solved {stats.gamesWon} math challenges with an average accuracy of{' '}
          {stats.averageAccuracy.toFixed(1)}%.
        </p>
        <div className="flex justify-around pt-6 text-sm text-slate-500">
          <div>
            <div className="font-bold border-t border-slate-300 pt-1 px-4">Instructor / Parent Signature</div>
          </div>
          <div>
            <div className="font-bold border-t border-slate-300 pt-1 px-4">Date</div>
          </div>
        </div>
      </div>
    </div>
  );
}
