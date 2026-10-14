'use client';

import Profile from '@/components/home/Profile';
import About from '@/components/home/About';
import News, { NewsItem } from '@/components/home/News';
import ResearchFlow from '@/components/home/ResearchFlow';
import { useState } from 'react';
import { researchTopics } from '@/lib/researchTopics';
import Models, { type ModelItem } from '@/components/home/Models';
import PublicationsList from '@/components/publications/PublicationsList';
import TextPage from '@/components/pages/TextPage';
import CardPage from '@/components/pages/CardPage';
import type { SiteConfig } from '@/lib/config';
import { Publication } from '@/types/publication';
import { CardPageConfig, PublicationPageConfig, TextPageConfig } from '@/types/page';
import { useLocaleStore } from '@/lib/stores/localeStore';

interface SectionConfig {
  id: string;
  type: 'markdown' | 'publications' | 'list' | 'interests' | 'models';
  title?: string;
  source?: string;
  filter?: string;
  limit?: number;
  content?: string;
  publications?: Publication[];
  items?: NewsItem[];
  models?: ModelItem[];
}

type PageData =
  | { type: 'about'; id: string; sections: SectionConfig[] }
  | { type: 'publication'; id: string; config: PublicationPageConfig; publications: Publication[] }
  | { type: 'text'; id: string; config: TextPageConfig; content: string }
  | { type: 'card'; id: string; config: CardPageConfig };

export interface HomePageLocaleData {
  author: SiteConfig['author'];
  social: SiteConfig['social'];
  features: SiteConfig['features'];
  enableOnePageMode?: boolean;
  bio?: string;
  pagesToShow: PageData[];
}

interface HomePageClientProps {
  dataByLocale: Record<string, HomePageLocaleData>;
  defaultLocale: string;
}

export default function HomePageClient({ dataByLocale, defaultLocale }: HomePageClientProps) {
  const [researchTopicId, setResearchTopicId] = useState<string | null>(null);
  const locale = useLocaleStore((state) => state.locale);
  const fallback = dataByLocale[defaultLocale] || Object.values(dataByLocale)[0];
  const data = dataByLocale[locale] || fallback;

  if (!data) {
    return null;
  }

  const allPublications = data.pagesToShow.flatMap(page => page.type === 'publication' ? page.publications : page.type === 'about' ? page.sections.flatMap(section => section.publications || []) : []);
  const researchTopic = researchTopics.find(topic => topic.id === researchTopicId);
  const showRelated = (topicId: string) => {
    setResearchTopicId(topicId);
    requestAnimationFrame(() => {
      const heading = document.getElementById('home-publications-title');
      heading?.focus({ preventScroll: true });
      heading?.scrollIntoView({ block: 'start' });
    });
  };

  return (
    <div className="max-w-[800px] mx-auto px-5 sm:px-8 pb-8 bg-background min-h-screen">
      <Profile
        author={data.author}
        social={data.social}
        features={data.features}
        bio={data.bio}
      />

      <div className="border-t border-neutral-200 dark:border-neutral-800 mt-3 pt-8">
        <div className="space-y-10">
          {data.pagesToShow.map((page) => (
            <section key={page.id} id={page.id} className="scroll-mt-24 space-y-12 sm:space-y-14">
              {page.type === 'about' && page.sections.map((section: SectionConfig) => {
                switch (section.type) {
                  case 'markdown':
                    return (
                      <About
                        key={section.id}
                        content={section.content || ''}
                        title={section.title}
                      />
                    );
                  case 'publications':
                    return (
                      <div key={section.id} id={section.id} className="scroll-mt-24">
                        <PublicationsList
                          config={{
                            type: 'publication',
                            title: section.title || 'Publications',
                            source: 'publications.bib',
                          }}
                          publications={section.publications || []}
                          embedded={true}
                          researchTopic={researchTopic}
                          onAllPublications={() => setResearchTopicId(null)}
                        />
                      </div>
                    );
                  case 'list':
                    return (
                      <News
                        key={section.id}
                        items={section.items || []}
                        title={section.title}
                      />
                    );
                  case 'interests':
                    return (
                      <ResearchFlow
                        key={section.id}
                        title={section.title}
                        content={section.content || ''}
                        publications={allPublications}
                        onRelated={showRelated}
                      />
                    );
                  case 'models':
                    return (
                      <Models
                        key={section.id}
                        title={section.title}
                        items={section.models || []}
                      />
                    );
                  default:
                    return null;
                }
              })}
              {page.type === 'publication' && (
                <PublicationsList
                  config={page.config}
                  publications={page.publications}
                  embedded={true}
                  researchTopic={researchTopic}
                  onAllPublications={() => setResearchTopicId(null)}
                />
              )}
              {page.type === 'text' && (
                <TextPage
                  config={page.config}
                  content={page.content}
                  embedded={true}
                />
              )}
              {page.type === 'card' && (
                <CardPage
                  config={page.config}
                  embedded={true}
                />
              )}
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
