'use client';

import { motion } from 'framer-motion';

export interface ModelItem {
    name: string;
    repository: string;
    url: string;
    task: string;
    description: string;
    parameters: string;
    languages: string;
    license: string;
    tags: string[];
}

interface ModelsProps {
    title?: string;
    items: ModelItem[];
}

export default function Models({ title, items }: ModelsProps) {
    if (items.length === 0) return null;

    return (
        <motion.section
            id="models"
            className="scroll-mt-24"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
        >
            <div className="mb-4 flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between sm:gap-6">
                <h2 className="flex items-center gap-2 text-[22px] font-bold text-primary">
                    <span className="text-xl leading-none" aria-hidden="true">🤗</span>
                    {title || 'Models'}
                </h2>
                <a
                    href="https://huggingface.co/nlpai-lab/models"
                    target="_blank"
                    rel="noreferrer"
                    className="w-fit text-sm font-semibold text-accent underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
                >
                    View all on Hugging Face
                </a>
            </div>

            <div className="grid gap-3 md:grid-cols-2">
                {items.map((model) => (
                    <a
                        key={model.repository}
                        href={model.url}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={`Open ${model.repository} on Hugging Face`}
                        className="group flex min-h-full flex-col rounded-xl border border-neutral-200 bg-white px-4 py-4 transition-colors hover:border-accent hover:bg-accent/[0.035] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 dark:border-neutral-700 dark:bg-neutral-900/55 dark:hover:border-accent dark:hover:bg-accent/[0.08]"
                    >
                        <div className="mb-2 flex items-start justify-between gap-3">
                            <div className="min-w-0">
                                <p className="break-words text-[13px] font-medium text-neutral-500 dark:text-neutral-400">
                                    {model.repository}
                                </p>
                                <h3 className="mt-0.5 text-base font-bold leading-snug text-primary transition-colors group-hover:text-accent">
                                    {model.name}
                                </h3>
                            </div>
                            <span className="shrink-0 rounded-full bg-accent/10 px-2.5 py-1 text-[11px] font-bold text-accent dark:bg-accent/15">
                                {model.task}
                            </span>
                        </div>

                        <p className="mb-3 text-[13px] leading-5 text-neutral-600 dark:text-neutral-400">
                            {model.description}
                        </p>

                        <div className="mt-auto">
                            <p className="mb-2 text-xs font-medium text-neutral-500 dark:text-neutral-400">
                                {model.parameters} · {model.languages} · {model.license}
                            </p>
                            <div className="flex flex-wrap gap-1.5" aria-label="Model tags">
                                {model.tags.map((tag) => (
                                    <span
                                        key={tag}
                                        className="rounded-md bg-neutral-100 px-2 py-1 text-[11px] font-medium text-neutral-600 dark:bg-neutral-800 dark:text-neutral-300"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </a>
                ))}
            </div>
        </motion.section>
    );
}
