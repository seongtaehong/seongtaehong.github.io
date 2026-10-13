import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getBibtexContent, getMarkdownContent } from '@/lib/content';
import { parseBibTeX } from '@/lib/bibtexParser';
import PublicationDetail from '@/components/publications/PublicationDetail';

function getPublications() {
  return parseBibTeX(getBibtexContent('publications.bib'));
}

export const dynamicParams = false;

export function generateStaticParams() {
  return getPublications().map((publication) => ({ id: publication.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const publication = getPublications().find((item) => item.id === id);
  if (!publication) return {};

  return {
    title: publication.title,
    description: publication.abstract || `${publication.title} by Seongtae Hong`,
  };
}

export default async function PublicationPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const publication = getPublications().find((item) => item.id === id);
  if (!publication) notFound();

  const motivation = getMarkdownContent(`publications/${id}.md`);
  return <PublicationDetail publication={publication} motivation={motivation} />;
}
