import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { FaChevronLeft, FaBookOpen } from 'react-icons/fa';

export const metadata: Metadata = {
  title: "How to Play Memory Math Match - Step-by-Step Guide",
  description: "Learn the rules, master gameplay mechanics, and discover top strategies to win in Memory Math Match. Elevate your mental calculation speeds.",
  alternates: {
    canonical: "https://memory-math-match.vercel.app/how-to-play"
  }
};

export default function HowToPlayPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": "How to Play Memory Math Match - Step-by-Step Guide",
    "description": "Learn the rules, master gameplay mechanics, and discover top strategies to win in Memory Math Match. Elevate your mental calculation speeds.",
    "url": "https://memory-math-match.vercel.app/how-to-play",
    "datePublished": "2026-07-31T19:47:39Z",
    "author": {
      "@type": "Organization",
      "name": "Memory Math Match"
    }
  };

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 p-4 md:p-8 flex flex-col items-center">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="w-full max-w-4xl bg-slate-900/60 rounded-3xl backdrop-blur-xl border border-slate-700/50 p-6 md:p-10 space-y-8">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <Link
            href="/"
            className="flex items-center space-x-2 text-slate-400 hover:text-white font-bold transition-all text-sm"
          >
            <FaChevronLeft />
            <span>Back to Home</span>
          </Link>
          <h1 className="text-2xl md:text-3xl font-black bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent flex items-center space-x-2">
            <FaBookOpen className="text-blue-455" />
            <span>How to Play</span>
          </h1>
          <div className="w-10" />
        </div>

        <article className="prose prose-invert max-w-none space-y-6 text-slate-300 text-sm md:text-base leading-relaxed">
          <section className="space-y-4">
            <h2 className="text-xl md:text-2xl font-bold text-white">Introduction to Memory Math Match</h2>
            <p>
              Welcome to <strong>Memory Math Match</strong>, an innovative educational puzzle game designed to sharpen your cognitive abilities and accelerate your mathematical calculation speed. By combining the beloved mechanics of a classic card-matching memory game with algebra, arithmetic, geometry, and mental math puzzles, this application offers an engaging brain-workout for users of all ages.
            </p>
            <p>
              Unlike standard memory games where you match identical pictures (such as matching a picture of a cat to another picture of a cat), Memory Math Match challenges you to match a **mathematical expression** (e.g., <code>5 + 7</code>) with its **correct evaluation** (e.g., <code>12</code>). This forces your brain to load arithmetic problems into working memory, compute the answer, remember the card&apos;s location, and scan for its match.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl md:text-2xl font-bold text-white">Step-by-Step Gameplay Rules</h2>
            <p>
              The core mechanics are intuitive but offer deep progressive challenge. Follow these simple steps to start playing:
            </p>
            <ol className="list-decimal pl-5 space-y-3 text-slate-350">
              <li>
                <strong>Start the Game:</strong> Choose your mode from the main dashboard (Practice, Level Map, Time Challenge, or Daily Challenge) and select your starting level or difficulty setting.
              </li>
              <li>
                <strong>Observe the Card Grid:</strong> You will be presented with a face-down grid of neon cards. Depending on your level, the grid size scales from 4x2 (8 cards, 4 pairs) up to a massive 8x8 (64 cards, 32 pairs).
              </li>
              <li>
                <strong>Flip the First Card:</strong> Click on any card to reveal its contents. The card will flip to show either a mathematical formula (like <code>3 x 4</code>) or a numeric answer (like <code>12</code>).
              </li>
              <li>
                <strong>Solve and Search for the Match:</strong> Once you see the first card, calculate its value. Then, select a second card to flip. If the two cards represent equal mathematical values, they will flash green, lock open, and award you score points.
              </li>
              <li>
                <strong>Handle Incorrect Matches:</strong> If the cards do not match, they will flash red and turn face-down again after a brief 1-second delay. Remember what was on those cards and their positions for future moves!
              </li>
              <li>
                <strong>Manage Lives and Time:</strong> In standard levels and time challenges, you have a limited amount of hearts (lives) and a countdown timer. Every mismatched pair costs 1 heart. If you run out of hearts or time, the game ends.
              </li>
            </ol>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl md:text-2xl font-bold text-white">Understanding Game Modes</h2>
            <p>
              Memory Math Match features several gameplay environments tailored to different learning speeds and goals:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-slate-350">
              <li>
                <strong>Quest Map:</strong> A series of over 1000 progressive stages. As you climb higher, the equations become harder (moving from simple sums to square roots, decimals, and algebra) and the grid size grows.
              </li>
              <li>
                <strong>Practice Mode:</strong> A relaxed mode with no timer and unlimited lives. Perfect for warming up, trying new categories, or stress-free study.
              </li>
              <li>
                <strong>Time Challenge:</strong> A fast-paced race against the clock. Matches give you small time bonuses, testing your speed and agility.
              </li>
              <li>
                <strong>Daily Challenge:</strong> A unique daily configuration of math arithmetic. Play and compete with players worldwide for a spot on the leaderboard.
              </li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl md:text-2xl font-bold text-white">Top Strategies to Score High</h2>
            <p>
              To dominate the leaderboard and beat the expert levels, utilize these professional strategies:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-slate-350">
              <li>
                <strong>Build Combo Multipliers:</strong> Making consecutive correct matches builds your combo counter (up to 10x). A high combo multiplies the score you receive, which is essential for high scores.
              </li>
              <li>
                <strong>Leverage Power-Ups:</strong> Use your <em>Hint</em> power-up to reveal a matching pair when you get stuck. Use the <em>Freeze Time</em> power-up to temporarily stop the countdown timer, giving you extra thinking space.
              </li>
              <li>
                <strong>Say It Out Loud:</strong> Research shows that whispering or subvocalizing the cards you flip (e.g. &quot;top left is 15, bottom right is 3 times 5&quot;) helps transfer the locations from sensory registers to your short-term phonological loop.
              </li>
              <li>
                <strong>Focus on Categories:</strong> Toggle the mathematical operations on the home screen. If you struggle with division or algebra, isolate those operations in practice mode to build confidence before returning to the main Quest Map.
              </li>
            </ul>
          </section>
        </article>
      </div>
    </main>
  );
}
