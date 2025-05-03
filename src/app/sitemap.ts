import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://lumoraai.in';
  
  const currentDate = new Date();
  // For routes that change frequently
  const dailyDate = new Date();
  // For routes that change less frequently
  const weeklyDate = new Date();
  // For routes that rarely change
  const monthlyDate = new Date();
  
  // Define routes and their metadata
  const routes = [
    {
      route: '',
      lastModified: dailyDate,
      changeFrequency: 'daily' as const,
      priority: 1.0,
    },
    // Marketing pages
    {
      route: '/pricing',
      lastModified: weeklyDate,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      route: '/about',
      lastModified: monthlyDate,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      route: '/contact',
      lastModified: monthlyDate,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      route: '/features',
      lastModified: weeklyDate,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      route: '/testimonials',
      lastModified: weeklyDate,
      changeFrequency: 'weekly' as const,
      priority: 0.6,
    },
    {
      route: '/blog',
      lastModified: dailyDate,
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
    {
      route: '/faq',
      lastModified: weeklyDate,
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    },
    // Auth pages
    {
      route: '/auth/sign-in',
      lastModified: monthlyDate,
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
    {
      route: '/auth/sign-up',
      lastModified: monthlyDate,
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
    // Add more routes as they're created
  ];

  // Generate sitemap entries
  return routes.map(({ route, lastModified, changeFrequency, priority }) => ({
    url: `${baseUrl}${route}`,
    lastModified,
    changeFrequency,
    priority,
  }));
} 