import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import { blogPosts } from "@/utils/blogData";

export const metadata: Metadata = {
  title: "Memory Math Match Blog – Educational Resources for Math & Memory",
  description: "Explore our educational blog full of guides, scientific insights, and classroom strategies to improve memory training, early childhood numeracy, and brain exercises.",
  alternates: {
    canonical: "https://memory-math-match.vercel.app/blog",
  },
  openGraph: {
    title: "Memory Math Match Blog",
    description: "Educational insights on math learning, cognitive sciences, and memory games.",
    url: "https://memory-math-match.vercel.app/blog",
    type: "website",
  },
};

export default function BlogHome() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 p-6 md:p-12 max-w-5xl mx-auto">
      {/* Skip Link for Keyboard Accessibility */}
      <a href="#blog-list" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-blue-600 text-white px-4 py-2 rounded-md z-50">
        Skip to blog posts
      </a>

      {/* Breadcrumbs Navigation */}
      <nav aria-label="Breadcrumb" className="text-slate-400 text-sm mb-8">
        <ol className="flex space-x-2">
          <li>
            <Link href="/" className="hover:text-blue-400 transition-colors">
              Home
            </Link>
          </li>
          <li className="before:content-['/'] before:mr-2 before:text-slate-600">
            <span aria-current="page" className="text-slate-200 font-semibold">
              Blog
            </span>
          </li>
        </ol>
      </nav>

      {/* Hero section */}
      <header className="mb-12 text-center md:text-left">
        <h1 className="text-4xl md:text-6xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 mb-4">
          Memory Math Match Blog
        </h1>
        <p className="text-slate-400 text-lg md:text-xl max-w-3xl leading-relaxed">
          Educational resources, training tutorials, classroom setup guides, and scientific updates focused on building working memory and math fluency for learners of all ages.
        </p>
      </header>

      {/* Blog Cards Grid */}
      <section id="blog-list" aria-label="Educational Blog Posts" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogPosts.map((post) => (
          <article
            key={post.slug}
            className="bg-slate-900 border border-slate-800 rounded-2xl p-6 hover:border-slate-700 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center gap-2 mb-3 text-xs text-blue-400 font-bold uppercase tracking-wider">
                <span>{post.category}</span>
                <span>•</span>
                <span>{post.readTime}</span>
              </div>
              <h2 className="text-xl font-bold text-slate-100 hover:text-blue-400 transition-colors mb-3 leading-snug">
                <Link href={`/blog/${post.slug}`}>{post.title}</Link>
              </h2>
              <p className="text-slate-400 text-sm leading-relaxed mb-6">
                {post.description}
              </p>
            </div>
            
            <div className="flex flex-col gap-3 mt-auto">
              <div className="flex flex-wrap gap-1.5">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded-full font-medium"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
              <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-500">
                <span>By {post.author.split(",")[0]}</span>
                <time dateTime={post.publishDate}>
                  {new Date(post.publishDate).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </time>
              </div>
            </div>
          </article>
        ))}
      </section>

      {/* Footer Nav Link */}
      <footer className="mt-16 text-center border-t border-slate-900 pt-8">
        <Link
          href="/"
          className="inline-flex items-center text-blue-400 hover:text-blue-300 font-bold transition-all"
        >
          ← Back to Game Lobby
        </Link>
      </footer>
    </main>
  );
}
