type VenuePublication = {
  journal?: string;
  conference?: string;
  description?: string;
  type: string;
};

export function isOralPresentation(publication: VenuePublication): boolean {
  return /\boral\b/i.test(`${publication.journal || ''} ${publication.conference || ''} ${publication.description || ''}`);
}

export function getVenueLabel(publication: VenuePublication): string {
  const venue = `${publication.journal || ''} ${publication.conference || ''} ${publication.description || ''}`;
  const normalized = venue.toLowerCase();

  if (normalized.includes('cikm') || normalized.includes('conference on information and knowledge management')) return 'CIKM';

  if (normalized.includes('aacl') || normalized.includes('asia-pacific chapter')) return normalized.includes('findings') ? 'AACL Findings' : 'AACL';
  if (normalized.includes('neural information processing systems') || normalized.includes('neurips')) {
    return normalized.includes('evaluations and datasets') || normalized.includes('evaluations & datasets') || normalized.includes('e&d') ? 'NeurIPS E&D' : 'NeurIPS';
  }
  if (normalized.includes('empirical methods in natural language processing')) {
    if (normalized.includes('findings')) return 'EMNLP Findings';
    if (normalized.includes('industry')) return 'EMNLP Industry';
    return 'EMNLP';
  }
  if (normalized.includes('emnlp')) {
    if (normalized.includes('findings')) return 'EMNLP Findings';
    return 'EMNLP';
  }
  if (normalized.includes('international conference on computational linguistics') || normalized.includes('coling')) return 'COLING';
  if (normalized.includes('computational linguistics') || normalized.includes('acl ')) {
    if (normalized.includes('findings')) return 'ACL Findings';
    if (normalized.includes('industry')) return 'ACL Industry';
    if (normalized.includes('workshop')) return 'ACL Workshop';
    return 'ACL';
  }
  if (normalized.includes('multilinguality in the era') || normalized.includes('mellm')) return 'ACL Workshop';
  if (normalized.includes('sigir') || normalized.includes('information retrieval')) return 'SIGIR';
  if (normalized.includes('learning representations') || normalized.includes('iclr')) return 'ICLR';
  if (normalized.includes('human and language technology')) return 'HCLT';
  if (normalized.includes('한국정보과학회')) return 'KCC';
  if (normalized.includes('arxiv') || normalized.includes('working paper') || normalized.includes('preprint') || publication.type === 'preprint') return 'arXiv';
  return publication.type === 'conference' ? 'Conference' : publication.type.replace('-', ' ');
}

export function getVenueFilterLabel(publication: VenuePublication): string {
  const label = getVenueLabel(publication);
  if (label.startsWith('AACL')) return 'AACL';
  if (label.startsWith('ACL')) return 'ACL';
  if (label.startsWith('EMNLP')) return 'EMNLP';
  if (label.startsWith('NeurIPS')) return 'NeurIPS';
  return label;
}
