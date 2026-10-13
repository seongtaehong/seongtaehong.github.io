import test from 'node:test';
import assert from 'node:assert/strict';
// Node's type-stripping runner requires the extension; Next's TypeScript config disallows it.
// @ts-expect-error TS5097
import { matchesFilterValue, matchesPublicationSource, toggleFilterValue } from '../src/lib/publicationFilters.ts';

test('toggles all preprints independently of selected conferences', () => {
  for (const selected of [[], ['ACL'], ['ACL', 'EMNLP']]) {
    assert.equal(matchesPublicationSource(selected, 'arXiv', true), true);
    assert.equal(matchesPublicationSource(selected, 'arXiv', false), false);
    assert.equal(matchesPublicationSource(selected, 'ACL', true), true);
    assert.equal(matchesPublicationSource(selected, 'ACL', false), true);
  }
  assert.equal(matchesPublicationSource(['ACL'], 'CIKM', true), false);
  assert.equal(matchesPublicationSource(['ACL'], 'CIKM', false), false);
});

test('adds and removes values without mutating the current selection', () => {
  const selected = [2026];

  assert.deepEqual(toggleFilterValue(selected, 2025), [2026, 2025]);
  assert.deepEqual(toggleFilterValue(selected, 2026), []);
  assert.deepEqual(selected, [2026]);
});

test('supports venue selections', () => {
  assert.deepEqual(toggleFilterValue(['ACL'], 'EMNLP'), ['ACL', 'EMNLP']);
});

test('matches all values when empty and any selected value when active', () => {
  assert.equal(matchesFilterValue([], 2026), true);
  assert.equal(matchesFilterValue([2025, 2026], 2025), true);
  assert.equal(matchesFilterValue([2025, 2026], 2024), false);
});
