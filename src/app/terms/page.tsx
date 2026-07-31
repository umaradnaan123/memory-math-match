import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { FaChevronLeft, FaFileContract } from 'react-icons/fa';

export const metadata: Metadata = {
  title: "Terms of Service - Memory Math Match",
  description: "Review the terms and conditions for using the Memory Math Match educational brain training application.",
  alternates: {
    canonical: "https://memory-math-match.vercel.app/terms"
  }
};

export default function TermsPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": "https://memory-math-match.vercel.app/terms#webpage",
    "url": "https://memory-math-match.vercel.app/terms",
    "name": "Terms of Service - Memory Math Match",
    "description": "Review the terms and conditions for using the Memory Math Match educational brain training application."
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
            <FaFileContract className="text-orange-400" />
            <span>Terms of Service</span>
          </h1>
          <div className="w-10" />
        </div>

        <div className="space-y-4 text-slate-350 text-sm md:text-base leading-relaxed">
          <p>
            By accessing or playing Memory Math Match, you agree to these simple terms of service:
          </p>
          <h2 className="text-lg font-bold text-white mt-6">Use of Service</h2>
          <p>
            Memory Math Match is provided free of charge for educational, non-commercial purposes. We make no warranty that the site will be available uninterrupted or completely error-free.
          </p>
          <h2 className="text-lg font-bold text-white mt-6">Intellectual Property</h2>
          <p>
            All custom graphics, source code, game mechanics, and audio synthesizers are assets of the Memory Math Match project. Modified derivatives must respect original licenses.
          </p>
        </div>
      </div>
    </main>
  );
}
