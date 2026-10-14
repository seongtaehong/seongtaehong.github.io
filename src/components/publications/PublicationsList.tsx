'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { Publication } from '@/types/publication';
import { PublicationPageConfig } from '@/types/page';
import { cn } from '@/lib/utils';
import { matchesFilterValue, matchesPublicationSource, toggleFilterValue } from '@/lib/publicationFilters';
import { useMessages } from '@/lib/i18n/useMessages';
import FormattedBibTeXText from './FormattedBibTeXText';
import VenueBadge, { getVenueFilterLabel, getVenueLabel } from './VenueBadge';

interface PublicationsListProps {
    config: PublicationPageConfig;
    publications: Publication[];
    embedded?: boolean;
    researchTopic?: { label: string; paperIds: string[] };
    onAllPublications?: () => void;
}

const filterButtonClass = 'shrink-0 whitespace-nowrap rounded-md px-1 py-1.5 text-[11px] leading-4 focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2';

export default function PublicationsList({ config, publications, embedded = false, researchTopic, onAllPublications }: PublicationsListProps) {
    const messages = useMessages();
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedYears, setSelectedYears] = useState<number[]>([]);
    const [selectedVenues, setSelectedVenues] = useState<string[]>([]);
    const [includeArxiv, setIncludeArxiv] = useState(true);

    // Extract unique years and types for filters
    const years = useMemo(() => {
        const uniqueYears = Array.from(new Set(publications.map(p => p.year)));
        return uniqueYears.sort((a, b) => b - a);
    }, [publications]);

    const venues = useMemo(() => {
        const uniqueVenues = Array.from(new Set(publications.map(getVenueFilterLabel)));
        return uniqueVenues.sort();
    }, [publications]);

    // Filter publications
    const filteredPublications = useMemo(() => {
        return publications.filter(pub => {
            if (researchTopic) return researchTopic.paperIds.includes(pub.id);
            const matchesSearch =
                pub.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                pub.authors.some(author => author.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
                pub.journal?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                pub.conference?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                pub.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                getVenueLabel(pub).toLowerCase().includes(searchQuery.toLowerCase());

            const matchesYear = matchesFilterValue(selectedYears, pub.year);
            const matchesVenue = matchesPublicationSource(selectedVenues, getVenueFilterLabel(pub), includeArxiv);

            return matchesSearch && matchesYear && matchesVenue;
        });
    }, [publications, searchQuery, selectedYears, selectedVenues, includeArxiv, researchTopic]);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
        >
            <div className="mb-3 flex flex-col gap-3">
                <div>
                    <h1 id={onAllPublications ? "home-publications-title" : undefined} tabIndex={onAllPublications ? -1 : undefined} className={`${embedded ? 'text-[22px]' : 'text-4xl'} font-serif font-bold text-primary scroll-mt-24`}>
                        {config.title}
                    </h1>
                    {config.description && (
                        <p className="mt-2 max-w-2xl text-sm text-neutral-600">{config.description}</p>
                    )}
                </div>
                {!researchTopic && <div className="relative w-full">
                    <MagnifyingGlassIcon aria-hidden="true" className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-500" />
                    <input
                        type="search"
                        aria-label={messages.publications.searchPlaceholder}
                        placeholder={messages.publications.searchPlaceholder}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full rounded-lg border border-neutral-200 bg-background py-2 pr-3 pl-9 text-sm text-primary placeholder:text-neutral-500 focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2"
                    />
                </div>}
                {researchTopic && <div className="flex items-baseline justify-between gap-4 text-sm">
                    <p role="status" className="rounded-full bg-[#427aa8] px-3 py-0.5 font-bold text-white">{researchTopic.label} · {filteredPublications.length} publications</p>
                    <button type="button" className="text-accent hover:underline focus-visible:outline-2 focus-visible:outline-accent" onClick={() => {
                        setSearchQuery(''); setSelectedYears([]); setSelectedVenues([]); setIncludeArxiv(true);
                        onAllPublications?.();
                        document.getElementById('home-publications-title')?.focus({ preventScroll: true });
                    }}>All publications</button>
                </div>}
            </div>

            {!researchTopic && <div className="mb-5 flex flex-col gap-3 border-b border-neutral-200 pb-4 min-[900px]:flex-row min-[900px]:items-center min-[900px]:gap-4">
                <div role="group" aria-label={messages.publications.year} className="flex shrink-0 items-center gap-2">
                    <span className="text-xs font-bold text-primary">{messages.publications.year}</span>
                    <div className="flex gap-0.5">
                        <button
                            type="button"
                            onClick={() => setSelectedYears([])}
                            aria-pressed={selectedYears.length === 0}
                            className={cn(filterButtonClass, selectedYears.length === 0 ? 'bg-accent/10 font-semibold text-accent' : 'text-neutral-600 hover:bg-neutral-100')}
                        >
                            {messages.common.all}
                        </button>
                        {years.map(year => (
                            <button
                                type="button"
                                key={year}
                                onClick={() => setSelectedYears((current) => toggleFilterValue(current, year))}
                                aria-pressed={selectedYears.includes(year)}
                                className={cn(filterButtonClass, selectedYears.includes(year) ? 'bg-accent/10 font-semibold text-accent' : 'text-neutral-600 hover:bg-neutral-100')}
                            >
                                {year}
                            </button>
                        ))}
                    </div>
                </div>
                <div role="group" aria-label="Venue" className="flex min-w-0 items-center gap-2 min-[900px]:flex-1 min-[900px]:border-l min-[900px]:border-neutral-200 min-[900px]:pl-4">
                    <span className="shrink-0 text-xs font-bold text-primary">Venue</span>
                    <div className="flex flex-wrap gap-0.5 min-[900px]:flex-1 min-[900px]:flex-nowrap min-[900px]:justify-between">
                        <button
                            type="button"
                            onClick={() => setSelectedVenues([])}
                            aria-pressed={selectedVenues.length === 0}
                            className={cn(filterButtonClass, selectedVenues.length === 0 ? 'bg-accent/10 font-semibold text-accent' : 'text-neutral-600 hover:bg-neutral-100')}
                        >
                            {messages.common.all}
                        </button>
                        {venues.filter(venue => venue !== 'arXiv').map(venue => (
                            <button
                                type="button"
                                key={venue}
                                onClick={() => setSelectedVenues((current) => toggleFilterValue(current, venue))}
                                aria-pressed={selectedVenues.includes(venue)}
                                className={cn(filterButtonClass, selectedVenues.includes(venue) ? 'bg-accent/10 font-semibold text-accent' : 'text-neutral-600 hover:bg-neutral-100')}
                            >
                                {venue}
                            </button>
                        ))}
                    </div>
                </div>
                {venues.includes('arXiv') && (
                    <div role="group" aria-label="Preprints" className="flex shrink-0 items-center min-[900px]:border-l min-[900px]:border-neutral-200 min-[900px]:pl-4">
                        <button
                            type="button"
                            onClick={() => setIncludeArxiv((current) => !current)}
                            aria-pressed={includeArxiv}
                            aria-label="Include Arxiv papers"
                            className={cn(filterButtonClass, includeArxiv ? 'bg-accent/10 font-semibold text-accent' : 'text-neutral-600 hover:bg-neutral-100')}
                        >
                            Arxiv
                        </button>
                    </div>
                )}
            </div>}

            {/* Publications Grid */}
            <div className="space-y-4">
                {filteredPublications.length === 0 ? (
                    <div className="text-center py-12 text-neutral-500">
                        {messages.publications.noResults}
                    </div>
                ) : (
                    filteredPublications.map((pub, index) => (
                      <div key={pub.id} className="space-y-3">
                        {(index === 0 || filteredPublications[index - 1].year !== pub.year) && (
                          <div className={cn('flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1', index > 0 && 'pt-3')}>
                            <h2 className="text-lg font-medium text-primary">{pub.year}</h2>
                            {index === 0 && (
                                <p className="text-[11px] text-neutral-500">
                                    * denotes equal contribution · † denotes corresponding author.
                                </p>
                            )}
                          </div>
                        )}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: 0.1 * index }}
                            className={embedded ? 'py-2' : 'bg-white dark:bg-neutral-900 px-4 py-2 rounded-xl shadow-sm border border-neutral-200 dark:border-neutral-800 hover:shadow-md transition-all duration-200'}
                        >
                            <div className={cn('grid grid-cols-1 items-start gap-4', !embedded && 'sm:grid-cols-[180px_minmax(0,1fr)]')}>
                                {!embedded && pub.preview && (
                                    <Link href={`/publications/${pub.id}`} className="w-full sm:w-[180px] flex-shrink-0">
                                        <div className="aspect-video sm:aspect-auto sm:h-[108px] relative rounded-lg overflow-hidden bg-neutral-100 dark:bg-neutral-800">
                                            <Image
                                                src={`/papers/${pub.preview}`}
                                                alt={`${pub.title} representative figure`}
                                                fill
                                                className="object-cover"
                                                sizes="(max-width: 639px) 100vw, 180px"
                                            />
                                        </div>
                                    </Link>
                                )}
                                <div className={cn('flex min-w-0 flex-col items-start', embedded ? 'gap-[5px]' : 'gap-1.5 sm:col-start-2 sm:row-start-1')}>
                                    <h3 className={`${embedded ? "text-base" : "text-lg"} font-semibold text-primary leading-snug`}>
                                        <Link href={`/publications/${pub.id}`} className="hover:text-accent transition-colors">
                                            <FormattedBibTeXText nodes={pub.titleNodes} fallback={pub.title} />
                                        </Link>
                                    </h3>
                                    <p className="text-[10pt] leading-relaxed text-[#555555] dark:text-[#cccccc]">
                                        {pub.authors.map((author, idx) => (
                                            <span key={idx}>
                                                <span className="whitespace-nowrap">
                                                  <span className={author.isHighlighted ? 'font-semibold text-[#3976a3] dark:text-[#80b9df] underline underline-offset-2' : ''}>{author.name}</span>
                                                  {author.isCoAuthor && (
                                                      <sup>*</sup>
                                                  )}
                                                  {author.isCorresponding && (
                                                      <sup>†</sup>
                                                  )}
                                                </span>
                                                {idx < pub.authors.length - 1 && ', '}
                                            </span>
                                        ))}
                                    </p>
                                    <div className="flex items-center">
                                        <VenueBadge publication={pub} />
                                    </div>

                                </div>
                            </div>
                        </motion.div>
                      </div>
                    ))
                )}
            </div>
        </motion.div>
    );
}
