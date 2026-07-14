import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://memory-math-match.vercel.app';
  const routes = [
    '',
    '/play',
    '/levels',
    '/daily-challenge',
    '/practice',
    '/leaderboard',
    '/achievements',
    '/about',
    '/privacy-policy',
    '/terms',
    '/contact',
    '/faq',
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: route === '' ? 1.0 : 0.8,
  }));
}
