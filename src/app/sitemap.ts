import type { MetadataRoute } from 'next';

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://lrbartenders.com.br';

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    '',
    '/sobre',
    '/servicos',
    '/cardapio',
    '/galeria',
    '/orcamento',
    '/contato',
  ];

  return routes.map((route) => ({
    url: `${BASE}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: route === '' ? 1 : 0.8,
  }));
}
