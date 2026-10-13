'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { useMessages } from '@/lib/i18n/useMessages';
import ReactMarkdown from 'react-markdown';

export interface NewsItem {
    date: string;
    content: string;
}

interface NewsProps {
    items: NewsItem[];
    title?: string;
}

function formatNewsDate(date: string) {
    const match = /^(\d{4})-(\d{2})$/.exec(date);

    if (!match) {
        return date;
    }

    return `${match[1]}.${match[2]}`;
}

export default function News({ items, title }: NewsProps) {
    const messages = useMessages();
    const resolvedTitle = title || messages.home.news;
    const [showAll, setShowAll] = useState(false);
    const visibleItems = showAll ? items : items.slice(0, 5);

    return (
        <motion.section
            id="news"
            className="scroll-mt-24"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
        >
            <h2 className="mb-3 text-[22px] font-bold text-primary">
                {resolvedTitle}
            </h2>
            <ul id="news-items" className="ml-0 list-none">
                {visibleItems.map((item, index) => (
                    <li
                        key={`${item.date}-${index}`}
                        className="flex items-baseline gap-3.5 border-b border-neutral-200/60 py-[9px] last:border-b-0"
                    >
                        <time
                            dateTime={item.date}
                            className="w-[72px] shrink-0 rounded-full bg-[#eaf2fb] py-[2px] text-center text-[11.5px] font-bold leading-[1.5] tracking-[0.02em] text-[#1772d0] tabular-nums dark:bg-accent/15 dark:text-accent"
                        >
                            {formatNewsDate(item.date)}
                        </time>
                        <div className="min-w-0 text-[14px] font-normal leading-[1.5] text-primary dark:text-neutral-700">
                            <ReactMarkdown
                                components={{
                                    p: ({ children }) => <>{children}</>,
                                    a: ({ ...props }) => (
                                        <a {...props} className="text-accent underline-offset-4 hover:underline" />
                                    ),
                                    strong: ({ children }) => (
                                        <strong className="font-bold">{children}</strong>
                                    ),
                                }}
                            >
                                {item.content}
                            </ReactMarkdown>
                        </div>
                    </li>
                ))}
            </ul>
            {items.length > 5 && (
                <div className="pt-2 pl-[86px]">
                    <button
                        type="button"
                        onClick={() => setShowAll((current) => !current)}
                        aria-expanded={showAll}
                        aria-controls="news-items"
                        className="inline-flex w-fit items-center gap-1 text-sm font-semibold text-accent underline-offset-4 transition-colors hover:text-accent-dark hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
                    >
                        {showAll ? 'Show Less' : 'Show All News'}
                        <ChevronDownIcon aria-hidden="true" className={`h-4 w-4 ${showAll ? 'rotate-180' : ''}`} />
                    </button>
                </div>
            )}
        </motion.section>
    );
}
