import test from 'node:test';
import assert from 'node:assert/strict';
// Node's type-stripping runner requires the extension; Next's TypeScript config disallows it.
// @ts-expect-error TS5097
import { getVenueFilterLabel, getVenueLabel, isOralPresentation } from '../src/lib/venueLabels.ts';

test('recognizes CIKM full names and abbreviations', () => {
  for (const conference of ['CIKM 2026', 'Proceedings of the 35th ACM International Conference on Information and Knowledge Management']) {
    const publication = { conference, type: 'conference' };
    assert.equal(getVenueLabel(publication), 'CIKM');
    assert.equal(getVenueFilterLabel(publication), 'CIKM');
  }
});

test('unifies preprints and working papers under arXiv', () => {
  for (const publication of [
    { journal: 'arXiv preprint arXiv:2607.22042', type: 'preprint' },
    { journal: 'Working paper', type: 'journal' },
    { journal: 'Preprint', type: 'journal' },
    { type: 'preprint' },
  ]) {
    assert.equal(getVenueLabel(publication), 'arXiv');
    assert.equal(getVenueFilterLabel(publication), 'arXiv');
  }
  assert.equal(getVenueLabel({ conference: 'EMNLP 2026 Findings', type: 'preprint' }), 'EMNLP Findings');
});

test('labels EMNLP oral papers while keeping the EMNLP filter', () => {
  const publication = {
    conference: 'Proceedings of the 2026 Conference on Empirical Methods in Natural Language Processing',
    description: 'Oral Presentation',
    type: 'conference',
  };

  assert.equal(getVenueLabel(publication), 'EMNLP');
  assert.equal(isOralPresentation(publication), true);
  assert.equal(getVenueFilterLabel(publication), 'EMNLP');
});

test('detects Oral separately without confusing words such as temporal', () => {
  assert.equal(isOralPresentation({ conference: 'ACL 2026 Oral', type: 'conference' }), true);
  assert.equal(isOralPresentation({ conference: 'EMNLP 2026', description: 'Temporal reasoning', type: 'conference' }), false);
  const findings = { conference: 'EMNLP 2026 Findings', description: 'Oral Presentation', type: 'conference' };
  assert.equal(getVenueLabel(findings), 'EMNLP Findings');
  assert.equal(isOralPresentation(findings), true);
  assert.equal(isOralPresentation({ type: 'conference' }), false);
});

test('labels AACL findings while keeping the AACL filter', () => {
  const publication = {
    conference: 'Findings of the Association for Computational Linguistics: AACL-IJCNLP 2026',
    type: 'conference',
  };

  assert.equal(getVenueLabel(publication), 'AACL Findings');
  assert.equal(getVenueFilterLabel(publication), 'AACL');
});

test('preserves Findings in full and abbreviated venue names', () => {
  for (const [conference, venue] of [
    ['Findings of the Association for Computational Linguistics: ACL 2024', 'ACL'],
    ['ACL 2026 Findings', 'ACL'],
    ['Findings of the Association for Computational Linguistics: EMNLP 2026', 'EMNLP'],
    ['Findings of the Conference on Empirical Methods in Natural Language Processing', 'EMNLP'],
    ['AACL Findings', 'AACL'],
  ]) {
    const publication = { conference, type: 'conference' };
    assert.equal(getVenueLabel(publication), `${venue} Findings`);
    assert.equal(getVenueFilterLabel(publication), venue);
  }
});

test('keeps main papers distinct from Findings', () => {
  for (const venue of ['ACL', 'EMNLP', 'AACL']) {
    const publication = { conference: `${venue} 2026`, type: 'conference' };
    assert.equal(getVenueLabel(publication), venue);
    assert.equal(getVenueFilterLabel(publication), venue);
  }
});

test('labels NeurIPS E&D papers while keeping the NeurIPS filter', () => {
  const publication = {
    conference: 'The Fortieth Annual Conference on Neural Information Processing Systems, Evaluations & Datasets Track',
    type: 'conference',
  };

  assert.equal(getVenueLabel(publication), 'NeurIPS E&D');
  assert.equal(getVenueFilterLabel(publication), 'NeurIPS');
});
