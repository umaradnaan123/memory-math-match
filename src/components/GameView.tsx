'use client';

import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { MathCard, generateMathPairs, Category, Difficulty } from '../utils/mathEngine';
import { playSound } from '../utils/audioSynth';
import Card from './Card';
import OutOfHeartsModal from './OutOfHeartsModal';
import { FaClock, FaHeart, FaChevronLeft, FaLightbulb, FaSnowflake } from 'react-icons/fa';

interface GameViewProps {
  mode: 'levels' | 'practice' | 'time' | 'endless' | 'daily' | 'speed' | 'zen';
  levelNumber?: number;
  difficulty: Difficulty;
  enabledCategories: Category[];
  soundEnabled: boolean;
  reducedMotion: boolean;
  largeText: boolean;
  colorBlindMode: 'none' | 'deuteranopia' | 'protanopia' | 'tritanopia';
  onBack: () => void;
  onWin: (score: number, accuracy: number, timeSpent: number) => void;
  onLose: () => void;
  translations: Record<string, string>;
}

export default function GameView({
  mode,
  levelNumber,
  difficulty,
  enabledCategories,
  soundEnabled,
  reducedMotion,
  largeText,
  onBack,
  onWin,
  onLose,
  translations,
}: GameViewProps) {
  // Game Setup variables based on difficulty & mode & progressive levels
  let pairCount = 4; // Levels 1-10 start with 4 pairs (8 cards, 4x2 grid)
  let initTime = 9999; // Default timer
  let gridStyle = "grid-cols-4"; // 4 columns layout default for 4x2, 4x3, 4x4

  if (mode === 'levels' && levelNumber) {
    if (levelNumber <= 10) {
      pairCount = 4; // 8 cards (4x2)
      initTime = 9999; // No timer for first 10 levels
    } else if (levelNumber <= 20) {
      pairCount = 6; // 12 cards (4x3)
      initTime = 180;
      gridStyle = "grid-cols-4";
    } else if (levelNumber <= 40) {
      pairCount = 8; // 16 cards (4x4)
      initTime = 200;
      gridStyle = "grid-cols-4";
    } else if (levelNumber <= 70) {
      pairCount = 10; // 20 cards (5x4)
      initTime = 220;
      gridStyle = "grid-cols-5";
    } else if (levelNumber <= 120) {
      pairCount = 12; // 24 cards (6x4)
      initTime = 240;
      gridStyle = "grid-cols-6";
    } else if (levelNumber <= 180) {
      pairCount = 15; // 30 cards (6x5)
      initTime = 280;
      gridStyle = "grid-cols-6";
    } else if (levelNumber <= 250) {
      pairCount = 18; // 36 cards (6x6)
      initTime = 300;
      gridStyle = "grid-cols-6";
    } else if (levelNumber <= 400) {
      pairCount = 21; // 42 cards (7x6)
      initTime = 320;
      gridStyle = "grid-cols-7";
    } else if (levelNumber <= 600) {
      pairCount = 24; // 48 cards (8x6)
      initTime = 360;
      gridStyle = "grid-cols-8";
    } else if (levelNumber <= 800) {
      pairCount = 28; // 56 cards (8x7)
      initTime = 400;
      gridStyle = "grid-cols-8";
    } else {
      pairCount = 32; // 64 cards (8x8)
      initTime = 450;
      gridStyle = "grid-cols-8";
    }
  } else {
    // Falls back to generic mode parameters
    if (difficulty === 'beginner') {
      pairCount = 4;
      initTime = 9999;
      gridStyle = "grid-cols-4";
    } else if (difficulty === 'easy') {
      pairCount = 8;
      initTime = 180;
      gridStyle = "grid-cols-4";
    } else if (difficulty === 'medium') {
      pairCount = 12;
      initTime = 240;
      gridStyle = "grid-cols-6";
    } else if (difficulty === 'hard') {
      pairCount = 18;
      initTime = 300;
      gridStyle = "grid-cols-6";
    } else if (difficulty === 'expert') {
      pairCount = 32;
      initTime = 450;
      gridStyle = "grid-cols-8";
    }
  }

  // Zen / Practice override
  if (mode === 'zen' || mode === 'practice') {
    initTime = 9999;
  }

  // Speed Match Override
  if (mode === 'speed') {
    initTime = 60;
  }

  const [cards, setCards] = useState<MathCard[]>([]);
  const [flippedIds, setFlippedIds] = useState<string[]>([]);
  const [matchedValues, setMatchedValues] = useState<string[]>([]);
  
  // Hearts System: Initialized to 4 Hearts, max 6, stored locally
  const [lives, setLives] = useState<number>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('mmm_current_hearts');
      return stored ? parseInt(stored) : 4;
    }
    return 4;
  });

  const [timeLeft, setTimeLeft] = useState(initTime);
  const [timerActive, setTimerActive] = useState(true);
  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(1);
  const [correctCount, setCorrectCount] = useState(0);
  const [totalAttempts, setTotalAttempts] = useState(0);

  // Out of Hearts Dialog UI states
  const [showHeartsModal, setShowHeartsModal] = useState(false);
  const [adInProgress, setAdInProgress] = useState(false);

  // Power Ups
  const [freezeActive, setFreezeActive] = useState(false);
  const [hintsLeft, setHintsLeft] = useState(3);

  // Sync Hearts to Local Storage
  const updateLives = (newLives: number) => {
    const capped = Math.min(newLives, 6);
    setLives(capped);
    if (typeof window !== 'undefined') {
      localStorage.setItem('mmm_current_hearts', capped.toString());
    }
  };

  // Initialize Game Cards
  useEffect(() => {
    const activeCats = enabledCategories.length > 0 ? enabledCategories : (['mixed'] as Category[]);
    const newCards = generateMathPairs(difficulty, activeCats, pairCount);
    setCards(newCards);
    setTimeLeft(mode === 'practice' || mode === 'zen' ? 9999 : initTime);
  }, [difficulty, enabledCategories, pairCount, mode, initTime]);

  // Game Countdown Timer loop
  useEffect(() => {
    if (mode === 'practice' || mode === 'zen') return;
    if (timeLeft <= 0) {
      if (soundEnabled) playSound('gameover');
      onLose();
      return;
    }
    if (!timerActive || freezeActive) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 11 && soundEnabled) {
          playSound('countdown');
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, timerActive, freezeActive, mode, soundEnabled, onLose]);

  // Matching Logic
  const handleCardClick = (id: string) => {
    // Prevent clicking matched/flipped cards
    const card = cards.find((c) => c.id === id);
    if (!card || flippedIds.includes(id) || matchedValues.includes(card.matchValue) || showHeartsModal) return;

    if (soundEnabled) playSound('flip');
    const newFlipped = [...flippedIds, id];
    setFlippedIds(newFlipped);

    if (newFlipped.length === 2) {
      setTotalAttempts((prev) => prev + 1);
      const firstCard = cards.find((c) => c.id === newFlipped[0]);
      const secondCard = cards.find((c) => c.id === newFlipped[1]);

      if (firstCard && secondCard && firstCard.matchValue === secondCard.matchValue) {
        // Success Match
        if (soundEnabled) playSound('correct');
        setMatchedValues((prev) => [...prev, firstCard.matchValue]);
        setFlippedIds([]);
        setScore((prev) => prev + 100 * combo);
        setCombo((prev) => (prev < 10 ? prev + 1 : prev));
        setCorrectCount((prev) => {
          const nextCount = prev + 1;
          if (nextCount === pairCount) {
            triggerVictory();
          }
          return nextCount;
        });
      } else {
        // Fail Match
        setTimeout(() => {
          if (soundEnabled) playSound('wrong');
          setFlippedIds([]);
          setCombo(1);
          if (mode !== 'zen' && mode !== 'practice') {
            const nextLives = lives - 1;
            updateLives(nextLives);
            if (nextLives <= 0) {
              setTimerActive(false);
              setShowHeartsModal(true);
            }
          }
        }, 1000);
      }
    }
  };

  // Securely simulate a rewarded ad validation flow
  const handleWatchAd = () => {
    if (adInProgress) return;
    setAdInProgress(true);

    // Open ad target in a new window/tab safely
    const adUrl = "https://www.effectivecpmnetwork.com/cy6kqza0?key=da63ef5ed9dd1f39cf2d3a87de42e253";
    window.open(adUrl, '_blank', 'noopener,noreferrer');

    // Simulate 3 seconds provider load validation verification delay
    setTimeout(() => {
      // Reward validation confirmed by mock ad server
      updateLives(lives + 2); // Add +2 hearts (maximum capped to 6)
      setAdInProgress(false);
      setShowHeartsModal(false);
      setTimerActive(true); // Resume countdown timer
      
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.8 }
      });
    }, 3000);
  };

  const handleRestartLevel = () => {
    setShowHeartsModal(false);
    updateLives(4); // Reset back to default 4 lives
    setScore(0);
    setCombo(1);
    setCorrectCount(0);
    setTotalAttempts(0);
    setFlippedIds([]);
    setMatchedValues([]);
    setTimeLeft(mode === 'practice' || mode === 'zen' ? 9999 : initTime);
    setTimerActive(true);

    // Regenerate layout cards
    const activeCats = enabledCategories.length > 0 ? enabledCategories : (['mixed'] as Category[]);
    setCards(generateMathPairs(difficulty, activeCats, pairCount));
  };

  // Victory Celebration Setup
  const triggerVictory = () => {
    setTimerActive(false);
    confetti({
      particleCount: 150,
      spread: 80,
      origin: { y: 0.6 },
    });
    if (soundEnabled) playSound('victory');
    const accuracy = totalAttempts > 0 ? Math.round((pairCount / totalAttempts) * 100) : 100;
    setTimeout(() => {
      onWin(score, accuracy, initTime - timeLeft);
    }, 2000);
  };

  // Hint Power Up: Reveals two matching cards
  const triggerHint = () => {
    if (hintsLeft <= 0 || flippedIds.length > 0) return;
    setHintsLeft((prev) => prev - 1);

    // Find first unmatched pair
    const unmatched = cards.filter((c) => !matchedValues.includes(c.matchValue));
    if (unmatched.length === 0) return;

    const first = unmatched[0];
    const match = unmatched.find((c) => c.matchValue === first.matchValue && c.id !== first.id);

    if (match) {
      setFlippedIds([first.id, match.id]);
      setTimeout(() => {
        setFlippedIds([]);
      }, 2000);
    }
  };

  // Freeze Power Up
  const triggerFreeze = () => {
    setFreezeActive(true);
    setTimeout(() => setFreezeActive(false), 8000);
  };

  // Calculate Progress percentage
  const progressPct = pairCount > 0 ? (correctCount / pairCount) * 100 : 0;

  return (
    <div className="w-full max-w-5xl mx-auto p-4 space-y-6">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row justify-between items-center bg-slate-900/60 p-4 rounded-2xl border border-slate-700/50 gap-4">
        <button
          onClick={onBack}
          className="flex items-center space-x-2 text-slate-400 hover:text-white font-bold transition-all text-sm self-start sm:self-center"
        >
          <FaChevronLeft />
          <span>{translations.home}</span>
        </button>

        {/* Level & Difficulty info summary */}
        <div className="text-center sm:text-left">
          <div className="text-xs text-slate-400 font-extrabold tracking-wider uppercase">
            {mode === 'levels' ? `Level ${levelNumber}` : `${mode.toUpperCase()} MODE`}
          </div>
          <div className="text-sm font-black text-indigo-300">
            {pairCount} Pairs ({pairCount * 2} Cards) • <span className="capitalize">{difficulty}</span>
          </div>
        </div>

        {/* HUD Statistics */}
        <div className="flex flex-wrap items-center gap-6 text-sm">
          <div 
            className="flex items-center space-x-2 bg-slate-800 px-4 py-2 rounded-xl border border-slate-700"
            aria-label={(mode === 'practice' || mode === 'zen' || timeLeft >= 9999) ? "Unlimited Time" : `${timeLeft} seconds remaining`}
          >
            <FaClock className={(mode !== 'practice' && mode !== 'zen' && timeLeft < 15 && timeLeft < 9999) ? 'text-red-500 animate-pulse' : 'text-blue-400'} />
            <span className={`font-black text-lg ${(mode !== 'practice' && mode !== 'zen' && timeLeft < 15 && timeLeft < 9999) ? 'text-red-400' : 'text-slate-100'}`}>
              {(mode === 'practice' || mode === 'zen' || timeLeft >= 9999) ? '∞' : `${timeLeft}s`}
            </span>
          </div>

          {mode !== 'practice' && mode !== 'zen' && (
            <div className="flex items-center space-x-2 bg-slate-800 px-4 py-2 rounded-xl border border-slate-700">
              <FaHeart className="text-red-500" />
              <span className="font-black text-lg text-slate-100">{lives}</span>
            </div>
          )}

          <div className="flex items-center space-x-2 bg-slate-800 px-4 py-2 rounded-xl border border-slate-700">
            <span className="text-yellow-400 font-bold">SCORE:</span>
            <span className="font-black text-lg text-slate-100">{score}</span>
          </div>

          <div className="flex items-center space-x-2 bg-slate-800 px-4 py-2 rounded-xl border border-slate-700">
            <span className="text-purple-400 font-bold">COMBO:</span>
            <span className="font-black text-lg text-purple-200">{combo}x</span>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-slate-800 rounded-full h-3.5 overflow-hidden border border-slate-700">
        <div
          className="bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 h-full rounded-full transition-all duration-300"
          style={{ width: `${progressPct}%` }}
        />
      </div>

      {/* Main Grid of cards */}
      <div className={`grid ${gridStyle} gap-4 py-4 max-w-4xl mx-auto justify-center`}>
        {cards.map((card) => (
          <Card
            key={card.id}
            card={card}
            isFlipped={flippedIds.includes(card.id)}
            isMatched={matchedValues.includes(card.matchValue)}
            isSelected={flippedIds.includes(card.id)}
            onClick={() => handleCardClick(card.id)}
            reducedMotion={reducedMotion}
            largeText={largeText}
          />
        ))}
      </div>

      {/* Power Ups Drawer */}
      <div className="flex justify-center space-x-4 bg-slate-900/40 p-4 rounded-2xl border border-slate-800">
        <button
          onClick={triggerHint}
          disabled={hintsLeft <= 0}
          className="flex items-center space-x-2 bg-blue-600/20 border border-blue-500/30 text-blue-300 py-2.5 px-5 rounded-xl font-bold hover:bg-blue-600/30 transition-all text-sm disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <FaLightbulb />
          <span>Hint ({hintsLeft})</span>
        </button>

        {mode !== 'zen' && mode !== 'practice' && (
          <button
            onClick={triggerFreeze}
            disabled={freezeActive}
            className="flex items-center space-x-2 bg-cyan-600/20 border border-cyan-500/30 text-cyan-300 py-2.5 px-5 rounded-xl font-bold hover:bg-cyan-600/30 transition-all text-sm disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <FaSnowflake className={freezeActive ? 'animate-spin' : ''} />
            <span>Freeze Time</span>
          </button>
        )}
      </div>

      <OutOfHeartsModal
        isOpen={showHeartsModal}
        adInProgress={adInProgress}
        onWatchAd={handleWatchAd}
        onRestart={handleRestartLevel}
        onBackToMap={onBack}
      />
    </div>
  );
}
