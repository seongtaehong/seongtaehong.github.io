import type { Publication } from '@/types/publication';
import { getVenueLabel, isOralPresentation } from '@/lib/venueLabels';

export { getVenueFilterLabel, getVenueLabel } from '@/lib/venueLabels';

const venueBorderColors: Record<string, string> = {
  ACL: '#8CAAFF',
  EMNLP: '#A1BC99',
  COLING: '#DB7C55',
  CIKM: '#8C9C83',
  ICLR: '#A9C4F4',
  SIGIR: '#8A784F',
  AACL: '#7F9EAD',
  NeurIPS: '#7D6FB2',
  HCLT: '#778773',
  KCC: '#778773',
  arXiv: '#b71c1c',
};

export default function VenueBadge({ publication }: { publication: Publication }) {
  const label = getVenueLabel(publication);
  const [venue, ...track] = label.split(' ');
  const baseVenue = Object.keys(venueBorderColors).find((name) => label.startsWith(name));
  const borderColor = baseVenue ? venueBorderColors[baseVenue] : '#cccccc';

  return (
    <span className="inline-flex items-center gap-1">
    <span
      className="inline-block whitespace-nowrap rounded-full border-[1.5px] bg-white dark:bg-neutral-900 px-[0.6em] py-[0.15em] text-xs font-semibold tracking-[0.02em] text-[#2b2b2b] dark:text-neutral-200 align-middle"
      style={{ borderColor }}
    >
      {venue === 'arXiv' ? 'Arxiv' : `${venue} ${publication.year}${track.length > 0 ? ` ${track.join(' ')}` : ''}`}
    </span>
      {isOralPresentation(publication) && (
        <span className="whitespace-nowrap text-xs font-semibold text-accent">· Oral</span>
      )}
    </span>
  );
}
