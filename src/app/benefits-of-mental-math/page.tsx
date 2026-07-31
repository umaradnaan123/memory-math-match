import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { FaChevronLeft, FaChartBar } from 'react-icons/fa';

export const metadata: Metadata = {
  title: "Benefits of Mental Math - Skills for Academic & Daily Success",
  description: "Discover why mental math is a crucial skill for cognitive development. Learn how rapid calculation strengthens logical reasoning and memory.",
  alternates: {
    canonical: "https://memory-math-match.vercel.app/benefits-of-mental-math"
  }
};

export default function BenefitsOfMentalMathPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": "Benefits of Mental Math - Skills for Academic & Daily Success",
    "description": "Discover why mental math is a crucial skill for cognitive development. Learn how rapid calculation strengthens logical reasoning and memory.",
    "url": "https://memory-math-match.vercel.app/benefits-of-mental-math",
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
            <FaChartBar className="text-blue-400" />
            <span>Benefits of Mental Math</span>
          </h1>
          <div className="w-10" />
        </div>

        <article className="prose prose-invert max-w-none space-y-6 text-slate-300 text-sm md:text-base leading-relaxed">
          <section className="space-y-4">
            <h2 className="text-xl md:text-2xl font-bold text-white">Why Mental Arithmetic Matters in the Modern Era</h2>
            <p>
              In a world dominated by smartphones, smartwatches, and digital calculators, many wonder: is mental math still a skill worth acquiring? Educational psychologists argue that mental arithmetic is more important than ever. It is not merely about calculating a tip at a restaurant or verifying change at a checkout counter; rather, it is a foundational cognitive exercise that develops critical thinking, logical reasoning, and number sense.
            </p>
            <p>
              When a person calculates equations mentally, their brain must manipulate numbers in real time, employing various decomposition techniques (such as breaking <code>28 + 35</code> into <code>20 + 30</code> and <code>8 + 5</code>). This active engagement constructs a deep, intuitive understanding of how numbers work.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl md:text-2xl font-bold text-white">Major Educational Benefits of Mental Math</h2>
            <ul className="list-disc pl-5 space-y-3 text-slate-350">
              <li>
                <strong>Fosters Number Sense:</strong> Number sense is the ability to understand quantities, compare values, and estimate results. Mental math teaches estimating before calculating, which prevents simple calculation errors on standardized exams.
              </li>
              <li>
                <strong>Strengthens Working Memory:</strong> Performing double-digit multiplication or multi-step addition in your head acts as a buffer memory load test. This builds working memory capacity, which directly improves performance in physics, coding, and chemistry.
              </li>
              <li>
                <strong>Saves Time during Examinations:</strong> On standardized tests (like the SAT, ACT, or GCSE), time is a scarce resource. Students who calculate basic arithmetic instantly in their head instead of typing it into a calculator save minutes that can be dedicated to complex analytical problems.
              </li>
              <li>
                <strong>Enhances Visualizing Ability:</strong> Mental math requires visualizing number scales and grids. This spatial-numerical mapping trains the parietal lobes, which are responsible for mathematical thinking and visualization.
              </li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl md:text-2xl font-bold text-white">Continuous Brain Training</h2>
            <p>
              By using Memory Math Match to practice mental arithmetic daily, you keep your brain sharp. Math matching challenges you to solve addition, subtraction, division, geometry, and square roots under dynamic constraints. The interactive audio and visual rewards reinforce correct solving habits, building a positive feedback loop that eliminates math anxiety.
            </p>
          </section>
        </article>
      </div>
    </main>
  );
}
