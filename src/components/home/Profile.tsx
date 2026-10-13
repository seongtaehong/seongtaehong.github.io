'use client';

import Image from 'next/image';
import ReactMarkdown from 'react-markdown';
import type { SiteConfig } from '@/lib/config';

interface ProfileProps {
  author: SiteConfig['author'];
  social: SiteConfig['social'];
  features: SiteConfig['features'];
  bio?: string;
}

const linkClass = 'text-accent underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2';

export default function Profile({ author, social, bio }: ProfileProps) {
  return (
    <header className="flex flex-col items-center gap-7 py-6 sm:flex-row sm:items-start sm:gap-10">
      <div className="w-full flex-shrink-0 text-center sm:w-48">
        <div className="relative mx-auto h-36 w-36 overflow-hidden rounded-full border border-neutral-200 shadow-sm dark:border-neutral-800 sm:h-40 sm:w-40">
          <Image
            src={author.avatar}
            alt={author.name}
            fill
            className="object-cover"
            sizes="160px"
            priority
          />
        </div>
        <h1 className="mt-3 text-xl font-bold text-primary">{author.name}</h1>
      </div>

      <div className="flex-1 pt-1 text-left">
        {bio && (
          <div className="mb-5 max-w-3xl text-[14px] leading-[20px] text-primary dark:text-neutral-700">
            <ReactMarkdown
              components={{
                p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
                strong: ({ children }) => <strong className="font-semibold text-primary">{children}</strong>,
                a: ({ ...props }) => (
                  <a
                    {...props}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-accent hover:underline underline-offset-2"
                  />
                ),
              }}
            >
              {bio}
            </ReactMarkdown>
          </div>
        )}

        <div className="flex flex-wrap justify-center gap-x-2 gap-y-1 text-sm sm:justify-start">
          {[
            { label: 'Email', href: typeof social.email === 'string' && social.email ? `mailto:${social.email}` : '' },
            { label: 'Scholar', href: social.google_scholar },
            { label: 'ACL Anthology', href: social.acl_anthology },
            { label: 'LinkedIn', href: social.linkedin },
            { label: 'Hugging Face', href: social.huggingface },
          ].filter((link): link is { label: string; href: string } => typeof link.href === 'string' && link.href.length > 0).map((link, index) => (
            <span key={link.label} className="inline-flex items-baseline gap-2">
              {index > 0 && <span aria-hidden="true" className="text-neutral-500">/</span>}
              <a href={link.href} target={link.label === 'Email' ? undefined : '_blank'} rel="noopener noreferrer" className={linkClass}>
                {link.label}
              </a>
            </span>
          ))}
        </div>
        {social.location && <p className="mt-2 text-xs text-neutral-500 text-center sm:text-left">{social.location}</p>}
      </div>
    </header>
  );
}
