'use client';

import Image from 'next/image';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import type { Publication } from '@/types/publication';
import FormattedBibTeXText from './FormattedBibTeXText';

interface PublicationDetailProps {
  publication: Publication;
  motivation: string;
}

export default function PublicationDetail({ publication, motivation }: PublicationDetailProps) {
  return (
    <article className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <Link href="/#publications" className="inline-flex text-sm font-medium text-accent hover:text-accent-dark mb-8">
        ← Back to publications
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8 items-start">
        {publication.preview && (
          <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-neutral-100 dark:bg-neutral-800 shadow-sm border border-neutral-200 dark:border-neutral-800">
            <Image
              src={`/papers/${publication.preview}`}
              alt={`${publication.title} representative figure`}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 280px"
              priority
            />
          </div>
        )}

        <header>
          <p className="text-sm font-semibold uppercase tracking-wider text-accent mb-3">
            {publication.year} · {publication.type.replace('-', ' ')}
          </p>
          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-primary leading-tight mb-5">
            <FormattedBibTeXText nodes={publication.titleNodes} fallback={publication.title} />
          </h1>
          <p className="text-[#555555] dark:text-[#cccccc] leading-relaxed mb-4">
            {publication.authors.map((author, index) => (
              <span key={`${author.name}-${index}`}>
                <span className="whitespace-nowrap">
                  <span className={author.isHighlighted ? 'font-semibold text-[#3976a3] dark:text-[#80b9df] underline underline-offset-2' : ''}>{author.name}</span>
                  {author.isCoAuthor && (
                    <sup>*</sup>
                  )}
                  {author.isCorresponding && (
                    <sup>†</sup>
                  )}
                </span>
                {index < publication.authors.length - 1 && ', '}
              </span>
            ))}
          </p>
          <p className="font-medium text-neutral-700 dark:text-neutral-500 mb-5">
            {publication.journal || publication.conference}
          </p>
          <div className="flex flex-wrap gap-3">
            {publication.url && (
              <a href={publication.url} target="_blank" rel="noopener noreferrer" className="px-4 py-2 rounded-lg bg-accent text-white text-sm font-medium hover:bg-accent-dark transition-colors">
                Paper page ↗
              </a>
            )}
            {publication.scholarUrl && (
              <a href={publication.scholarUrl} target="_blank" rel="noopener noreferrer" className="px-4 py-2 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 text-sm font-medium hover:text-accent transition-colors">
                Google Scholar ↗
              </a>
            )}
          </div>
        </header>
      </div>

      {publication.abstract && (
        <section className="mt-12">
          <h2 className="text-2xl font-serif font-bold text-primary mb-4">Abstract</h2>
          <p className="text-neutral-700 dark:text-neutral-500 leading-relaxed">{publication.abstract}</p>
        </section>
      )}

      <section className="mt-12 prose-section">
        <ReactMarkdown
          components={{
            h2: ({ children }) => <h2 className="text-2xl font-serif font-bold text-primary mt-10 mb-4 border-b border-neutral-200 dark:border-neutral-800 pb-2">{children}</h2>,
            h3: ({ children }) => <h3 className="text-xl font-semibold text-primary mt-8 mb-3">{children}</h3>,
            p: ({ children }) => <p className="text-neutral-700 dark:text-neutral-500 leading-relaxed mb-4">{children}</p>,
            a: (props) => <a {...props} target="_blank" rel="noopener noreferrer" className="text-accent hover:text-accent-dark" />,
            ul: ({ children }) => <ul className="list-disc ml-6 space-y-2 text-neutral-700 dark:text-neutral-500 mb-4">{children}</ul>,
          }}
        >
          {motivation}
        </ReactMarkdown>
      </section>

      {publication.bibtex && (
        <section className="mt-12">
          <h2 className="text-2xl font-serif font-bold text-primary mb-4">BibTeX</h2>
          <pre className="text-xs sm:text-sm bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl p-5 overflow-x-auto whitespace-pre-wrap text-neutral-700 dark:text-neutral-400">
            {publication.bibtex}
          </pre>
        </section>
      )}
    </article>
  );
}
