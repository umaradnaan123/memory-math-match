import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { blogPosts } from "@/utils/blogData";
import { Metadata } from "next";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const post = blogPosts.find((p) => p.slug === resolvedParams.slug);
  if (!post) return {};

  return {
    title: `${post.title} | Memory Math Match Blog`,
    description: post.description,
    alternates: {
      canonical: `https://memory-math-match.vercel.app/blog/${post.slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.description,
      url: `https://memory-math-match.vercel.app/blog/${post.slug}`,
      type: "article",
      publishedTime: post.publishDate,
      authors: [post.author],
      tags: post.tags,
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const resolvedParams = await params;
  const post = blogPosts.find((p) => p.slug === resolvedParams.slug);

  if (!post) {
    notFound();
  }

  // Schema markup
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.description,
    "datePublished": post.publishDate,
    "author": {
      "@type": "Person",
      "name": post.author,
    },
    "publisher": {
      "@type": "Organization",
      "name": "Memory Math Match",
      "logo": {
        "@type": "ImageObject",
        "url": "https://memory-math-match.vercel.app/icon-512x512.png",
      },
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://memory-math-match.vercel.app/blog/${post.slug}`,
    },
  };

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 p-6 md:p-12 max-w-4xl mx-auto">
      {/* Skip Link */}
      <a href="#article-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-blue-600 text-white px-4 py-2 rounded-md z-50">
        Skip to article content
      </a>

      {/* Structured Breadcrumbs */}
      <nav aria-label="Breadcrumb" className="text-slate-400 text-sm mb-8">
        <ol className="flex space-x-2">
          <li>
            <Link href="/" className="hover:text-blue-400 transition-colors">
              Home
            </Link>
          </li>
          <li className="before:content-['/'] before:mr-2 before:text-slate-600">
            <Link href="/blog" className="hover:text-blue-400 transition-colors">
              Blog
            </Link>
          </li>
          <li className="before:content-['/'] before:mr-2 before:text-slate-600">
            <span aria-current="page" className="text-slate-200 font-semibold truncate max-w-[200px] md:max-w-xs inline-block">
              {post.title}
            </span>
          </li>
        </ol>
      </nav>

      {/* JSON-LD Schema injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <article className="space-y-6">
        <header className="space-y-4 pb-6 border-b border-slate-900">
          <div className="flex items-center gap-2 text-sm text-blue-400 font-bold uppercase tracking-wider">
            <span>{post.category}</span>
            <span>•</span>
            <span>{post.readTime}</span>
          </div>
          
          <h1 className="text-3xl md:text-5xl font-black leading-tight text-slate-100">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center justify-between gap-4 pt-2 text-slate-400 text-sm">
            <div>
              <span className="text-slate-500">Written by:</span>{" "}
              <strong className="text-slate-300 font-semibold">{post.author}</strong>
            </div>
            <div>
              <span className="text-slate-500">Published:</span>{" "}
              <time dateTime={post.publishDate}>
                {new Date(post.publishDate).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </time>
            </div>
          </div>
        </header>

        {/* Article Body */}
        <section
          id="article-content"
          className="prose prose-invert max-w-none prose-headings:text-slate-200 prose-p:text-slate-350 prose-a:text-blue-400 hover:prose-a:text-blue-350 prose-strong:text-slate-200 prose-ul:list-disc prose-ol:list-decimal leading-relaxed space-y-6 text-slate-300"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* Footer/Share section */}
        <footer className="mt-12 pt-8 border-t border-slate-900 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs bg-slate-900 text-slate-400 border border-slate-800 px-3 py-1 rounded-full font-medium"
              >
                #{tag}
              </span>
            ))}
          </div>

          <div className="flex gap-4">
            <Link
              href="/blog"
              className="text-blue-400 hover:text-blue-300 font-bold transition-all text-sm"
            >
              ← Back to Blog list
            </Link>
            <span className="text-slate-700">|</span>
            <Link
              href="/"
              className="text-indigo-400 hover:text-indigo-300 font-bold transition-all text-sm"
            >
              Play Game Lobby
            </Link>
          </div>
        </footer>
      </article>
    </main>
  );
}
