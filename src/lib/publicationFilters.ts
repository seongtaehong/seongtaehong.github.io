export function toggleFilterValue<T>(selected: T[], value: T): T[] {
  return selected.includes(value)
    ? selected.filter((item) => item !== value)
    : [...selected, value];
}

export function matchesFilterValue<T>(selected: T[], value: T): boolean {
  return selected.length === 0 || selected.includes(value);
}

export function matchesPublicationSource(selectedVenues: string[], venue: string, includeArxiv: boolean): boolean {
  return venue === 'arXiv' ? includeArxiv : matchesFilterValue(selectedVenues, venue);
}
