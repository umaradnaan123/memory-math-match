import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { FaChevronLeft, FaEnvelope } from 'react-icons/fa';

export const metadata: Metadata = {
  title: "Contact Us - Memory Math Match",
  description: "Get in touch with the Memory Math Match support team for suggestions, school licensing inquiries, or feedback.",
  alternates: {
    canonical: "https://memory-math-match.vercel.app/contact"
  }
};

export default function ContactPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": "https://memory-math-match.vercel.app/contact#webpage",
    "url": "https://memory-math-match.vercel.app/contact",
    "name": "Contact Memory Math Match",
    "description": "Get in touch with the Memory Math Match support team for suggestions, school licensing inquiries, or feedback."
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
            <FaEnvelope className="text-cyan-400" />
            <span>Contact Support</span>
          </h1>
          <div className="w-10" />
        </div>

        <div className="space-y-4 text-slate-350 text-sm md:text-base leading-relaxed">
          <p>
            If you have suggestions, feature requests, or custom math category suggestions, please reach out to us:
          </p>
          <div className="bg-slate-850 p-4 rounded-xl border border-slate-800 space-y-2">
            <p><strong>📧 Email:</strong> <a href="mailto:support@memory-math-match.vercel.app" className="text-blue-400 underline hover:text-blue-300">support@memory-math-match.vercel.app</a></p>
            <p><strong>🏫 Classroom Feedback:</strong> We welcome feedback from educators and schools who use this game in their math class activities.</p>
          </div>
        </div>
      </div>
    </main>
  );
}
