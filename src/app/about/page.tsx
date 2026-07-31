import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { FaChevronLeft, FaBook } from 'react-icons/fa';

export const metadata: Metadata = {
  title: "About Memory Math Match - Scientific Brain Training",
  description: "Learn about the mission, features, and educational pedagogy behind Memory Math Match, the ultimate memory math game.",
  alternates: {
    canonical: "https://memory-math-match.vercel.app/about"
  }
};

export default function AboutPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": "https://memory-math-match.vercel.app/about#webpage",
    "url": "https://memory-math-match.vercel.app/about",
    "name": "About Memory Math Match",
    "description": "Learn about the mission, features, and educational pedagogy behind Memory Math Match, the ultimate memory math game."
  };

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 p-4 md:p-8 flex flex-col items-center">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="w-full max-w-3xl bg-slate-900/60 rounded-3xl backdrop-blur-xl border border-slate-700/50 p-6 md:p-10 space-y-6">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <Link
            href="/"
            className="flex items-center space-x-2 text-slate-400 hover:text-white font-bold transition-all text-sm"
          >
            <FaChevronLeft />
            <span>Back to Home</span>
          </Link>
          <h1 className="text-2xl md:text-3xl font-black bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent flex items-center space-x-2">
            <FaBook className="text-blue-400" />
            <span>About Us</span>
          </h1>
          <div className="w-10" />
        </div>

        <div className="space-y-6 text-slate-300 text-sm md:text-base leading-relaxed">
          <p className="text-lg text-slate-200 font-semibold">
            Memory Math Match is a cutting-edge, browser-based brain training game that blends memory enhancement with core mathematical arithmetic.
          </p>
          <p>
            Our core mission is to make math practice fun, engaging, and accessible to everyone. By utilizing the classic memory card matching formula combined with dynamic equation solving, users train their working memory while building rapid calculation reflex.
          </p>
          <h2 className="text-xl font-bold text-white mt-8">Key Features</h2>
          <ul className="list-disc pl-5 space-y-2 text-slate-350">
            <li><strong>Adaptive Progression:</strong> Play through hundreds of handcrafted levels that adapt grid sizes and math complexity.</li>
            <li><strong>Offline-First:</strong> Play anytime, anywhere. Once loaded, the game works entirely offline inside your browser.</li>
            <li><strong>Multiple game modes:</strong> Practice mode, Time challenge, and Daily challenge modes to match your mood.</li>
            <li><strong>Accessibility Built-in:</strong> Designed with high contrast, large text, reduced motion, and color-blind friendly options.</li>
          </ul>
        </div>
      </div>
    </main>
  );
}
