import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { FaChevronLeft, FaShieldAlt } from 'react-icons/fa';

export const metadata: Metadata = {
  title: "Privacy Policy - Memory Math Match",
  description: "Read our privacy policy. Memory Math Match does not store or share personal data; all progress is saved locally on your device.",
  alternates: {
    canonical: "https://memory-math-match.vercel.app/privacy-policy"
  }
};

export default function PrivacyPolicyPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": "https://memory-math-match.vercel.app/privacy-policy#webpage",
    "url": "https://memory-math-match.vercel.app/privacy-policy",
    "name": "Privacy Policy - Memory Math Match",
    "description": "Read our privacy policy. Memory Math Match does not store or share personal data; all progress is saved locally on your device."
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
            <FaShieldAlt className="text-emerald-400" />
            <span>Privacy Policy</span>
          </h1>
          <div className="w-10" />
        </div>

        <div className="space-y-4 text-slate-350 text-sm md:text-base leading-relaxed">
          <p>
            Your privacy is of utmost importance to us. Memory Math Match operates entirely inside your web browser. We do not transmit, collect, or store any personal data on remote servers.
          </p>
          <h2 className="text-lg font-bold text-white mt-6">Local Storage Usage</h2>
          <p>
            All game stats, achievements, custom settings, unlocked levels, and high scores are saved directly on your local device using standard HTML5 Local Storage. No data is sent to our servers or third parties.
          </p>
          <h2 className="text-lg font-bold text-white mt-6">Cookies & Tracking</h2>
          <p>
            We do not use tracking cookies, analytics pixels, or online tracking techniques. The game is fully offline-capable once loaded, ensuring a safe, distraction-free environment for kids and students.
          </p>
        </div>
      </div>
    </main>
  );
}
