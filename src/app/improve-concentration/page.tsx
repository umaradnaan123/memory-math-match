import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { FaChevronLeft, FaBookOpen } from 'react-icons/fa';

export const metadata: Metadata = {
  title: "How to Improve Concentration - Science-Backed Focus Strategies",
  description: "Learn practical techniques to enhance focus, eliminate distractions, and use cognitive math games to build concentration muscles.",
  alternates: {
    canonical: "https://memory-math-match.vercel.app/improve-concentration"
  }
};

export default function ImproveConcentrationPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": "How to Improve Concentration - Science-Backed Focus Strategies",
    "description": "Learn practical techniques to enhance focus, eliminate distractions, and use cognitive math games to build concentration muscles.",
    "url": "https://memory-math-match.vercel.app/improve-concentration",
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
            <FaBookOpen className="text-blue-450" />
            <span>Improve Concentration</span>
          </h1>
          <div className="w-10" />
        </div>

        <article className="prose prose-invert max-w-none space-y-6 text-slate-300 text-sm md:text-base leading-relaxed">
          <section className="space-y-4">
            <h2 className="text-xl md:text-2xl font-bold text-white">Understanding the Attention Crisis</h2>
            <p>
              In our hyper-connected world, attention spans are declining. Push notifications, short-form media loops, and constant multitasking keep our brains in a perpetual state of hyper-arousal, reducing our capacity for deep, sustained focus. Fortunately, attention is a trainable skill. Just as physical exercise strengthens muscles, targeted cognitive games can rebuild focus and improve concentration.
            </p>
            <p>
              When playing Memory Math Match, players must pay undivided attention to the card positions and arithmetic values. A single distraction can cause you to lose track of a card, costing a heart and ending the game. This immediate accountability builds rapid feedback loops that sharpen concentration.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl md:text-2xl font-bold text-white">4 Actionable Steps to Build Deep Focus</h2>
            <ul className="list-disc pl-5 space-y-3 text-slate-350">
              <li>
                <strong>Practice Monotasking:</strong> Multitasking is an illusion. When you try to do multiple things at once, your brain goes through a costly &quot;context switch.&quot; Commit to one task at a time.
              </li>
              <li>
                <strong>Engage in Structured Brain Play:</strong> Dedicate 10 minutes to interactive games. The combination of visual tracking, calculations, and short-term memory retrieval required by Memory Math Match acts as a gym workout for your focus muscles.
              </li>
              <li>
                <strong>Reduce Digital Noise:</strong> Turn off all non-essential notifications on your devices before starting study sessions or work.
              </li>
              <li>
                <strong>Use the Pomodoro Technique:</strong> Work intensely for 25 minutes, then reward yourself with a 5-minute break. A quick game of Memory Math Match during your break can keep your mind active and ready for the next session.
              </li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl md:text-2xl font-bold text-white">Summary</h2>
            <p>
              Improving concentration is not a one-time event, but a practice. By challenging your working memory and calculations skills regularly, you will build the mental stamina required for school, work, and creative pursuits.
            </p>
          </section>
        </article>
      </div>
    </main>
  );
}
