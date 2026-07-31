import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { FaChevronLeft, FaQuestionCircle } from 'react-icons/fa';

export const metadata: Metadata = {
  title: "Math Match FAQ - Frequently Asked Questions",
  description: "Find answers to common questions about Memory Math Match: gameplay, levels, categories, accessibility options, and offline play.",
  alternates: {
    canonical: "https://memory-math-match.vercel.app/faq"
  }
};

export default function FAQPage() {
  const faqQuestions = [
    {
      q: "Is Memory Math Match completely free?",
      a: "Yes! Memory Math Match is 100% free with no paywalls, subscriptions, or login requirements."
    },
    {
      q: "Can I play the game offline?",
      a: "Absolutely. Once loaded in your web browser, all equation synthesis, card layouts, stats tracking, and audio synthesizers run entirely locally."
    },
    {
      q: "How does the progressive difficulty map function?",
      a: "The level structure starts with easy 4x2 grids (8 cards) testing simple addition, and scales up to 8x8 grids (64 cards) introducing division, fractions, geometry, and square roots as you advance."
    },
    {
      q: "What mathematical subjects are covered?",
      a: "We currently support addition, subtraction, multiplication, division, fractions, decimals, percentages, square roots, algebra, and basic geometry."
    }
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqQuestions.map(item => ({
      "@type": "Question",
      "name": item.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.a
      }
    }))
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
            <FaQuestionCircle className="text-yellow-400" />
            <span>Math FAQ</span>
          </h1>
          <div className="w-10" />
        </div>

        <div className="space-y-6 mt-4">
          {faqQuestions.map((item, index) => (
            <div key={index} className="bg-slate-850 p-5 rounded-2xl border border-slate-800 space-y-2">
              <h3 className="font-extrabold text-white text-base md:text-lg">{item.q}</h3>
              <p className="text-slate-350 text-sm md:text-base leading-relaxed">{item.a}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
