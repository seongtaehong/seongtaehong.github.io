import type { MetadataRoute } from 'next';
import { getConfig } from '@/lib/config';
import { getBibtexContent } from '@/lib/content';
import { parseBibTeX } from '@/lib/bibtexParser';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const config = getConfig();
  const publications = parseBibTeX(getBibtexContent('publications.bib'));
  return [
    { url: `${config.site.url}/` },
    ...publications.map(publication => ({ url: `${config.site.url}/publications/${publication.id}/` })),
  ];
}
