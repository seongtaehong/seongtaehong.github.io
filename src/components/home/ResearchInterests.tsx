'use client';

import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';

interface ResearchInterestsProps {
    title?: string;
    content: string;
}

export default function ResearchInterests({ title, content }: ResearchInterestsProps) {
    if (!content.trim()) return null;

    return (
        <motion.section
            id="research"
            className="scroll-mt-24"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
        >
            <h2 className="mb-3 text-[22px] font-bold text-primary">
                {title || 'Research'}
            </h2>
            <div className="text-[14px] leading-[20px] text-primary dark:text-neutral-700">
                <ReactMarkdown
                    components={{
                        strong: ({ children }) => <strong className="font-semibold text-accent">{children}</strong>,
                    }}
                >
                    {content}
                </ReactMarkdown>
            </div>
        </motion.section>
    );
}
