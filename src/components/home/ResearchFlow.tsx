'use client';

import { useState } from 'react';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import { researchTopics } from '@/lib/researchTopics';
import { getVenueLabel, isOralPresentation } from '@/lib/venueLabels';
import type { Publication } from '@/types/publication';
import './ResearchFlow.css';

interface ResearchFlowProps {
  title?: string;
  content: string;
  publications: Publication[];
  onRelated: (topicId: string) => void;
}

export default function ResearchFlow({ title, content, publications, onRelated }: ResearchFlowProps) {
  const [selected, setSelected] = useState(0);
  const topic = researchTopics[selected];
  const papers = topic.paperIds.flatMap(id => {
    const paper = publications.find(p => p.id === id);
    return paper ? [paper] : [];
  });
  const tab = (index: number) => {
    const item = researchTopics[index];
    return <button key={item.id} id={`research-tab-${item.id}`} type="button" role="tab"
      className={index < 3 ? 'research-tab' : 'research-related-tab'}
      aria-selected={selected === index} aria-controls="research-panel" tabIndex={selected === index ? 0 : -1}
      onClick={() => setSelected(index)} onKeyDown={event => {
        const next = event.key === 'ArrowRight' ? (index + 1) % researchTopics.length
          : event.key === 'ArrowLeft' ? (index + researchTopics.length - 1) % researchTopics.length
          : event.key === 'Home' ? 0 : event.key === 'End' ? researchTopics.length - 1 : undefined;
        if (next === undefined) return;
        event.preventDefault();
        setSelected(next);
        document.getElementById(`research-tab-${researchTopics[next].id}`)?.focus();
      }}>
      {index < 3 ? <><span className="research-dot" aria-hidden="true" /><span className="research-tab-name">{item.label}</span><span className="research-tab-caption">{item.caption}</span></> : item.label}
    </button>;
  };
  return <section id="research" className="research-flow scroll-mt-24" aria-labelledby="research-title">
    <h2 id="research-title">{title || 'Research'}</h2>
    <div className="research-philosophy">
      <ReactMarkdown components={{ strong: ({ children }) => <strong className="font-semibold text-accent">{children}</strong> }}>{content}</ReactMarkdown>
    </div>
    <div className="research-path" role="tablist" aria-label="Research directions">
      <svg className="research-connector" viewBox="0 0 720 100" preserveAspectRatio="none" aria-hidden="true"><path d="M120 55 C220 55 240 32 360 32 S500 55 600 55" /></svg>
      <div className="research-tabs">{[0, 1, 2].map(tab)}</div>
      <div className="research-related">{[3, 4, 5].map(tab)}</div>
    </div>
    <div id="research-panel" className="research-panel" role="tabpanel" aria-labelledby={`research-tab-${topic.id}`} tabIndex={0}>
      <div className="research-question"><h4>{topic.question}</h4><p>{topic.description}</p><p className="research-connection">{topic.connection}</p></div>
      <div className="research-work"><h4>Representative work</h4><ul>
        {papers.slice(0, 2).map(paper => <li key={paper.id}><Link className="research-paper-title" href={`/publications/${paper.id}`}>{paper.title}</Link><span className="research-paper-meta">{paper.year} · {getVenueLabel(paper)}{isOralPresentation(paper) && ' · Oral'}</span></li>)}
      </ul><a href="#publications" className="research-papers-toggle" onClick={event => { event.preventDefault(); onRelated(topic.id); }}>View {papers.length} related publications →</a></div>
    </div>
  </section>;
}
