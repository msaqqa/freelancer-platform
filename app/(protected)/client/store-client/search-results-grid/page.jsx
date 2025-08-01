'use client';

import { Container } from '@/components/common/container';
import { SearchResultsGridContent } from '@/app/(protected)/client/store-client/search-results-grid/content';

export default function SearchResultsGridPage() {
  return (
    <Container>
      <SearchResultsGridContent />
    </Container>
  );
}
