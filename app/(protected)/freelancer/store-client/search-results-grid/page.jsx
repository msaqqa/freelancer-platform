'use client';

import { Container } from '@/components/common/container';
import { SearchResultsGridContent } from '@/app/(protected)/freelancer/store-client/search-results-grid/content';

export default function SearchResultsGridPage() {
  return (
    <Container>
      <SearchResultsGridContent />
    </Container>
  );
}
