'use client';

import { Container } from '@/components/common/container';
import { SearchResultsListContent } from '@/app/(protected)/client/store-client/search-results-list/content';

export default function SearchResultsListPage() {
  return (
    <Container>
      <SearchResultsListContent />
    </Container>
  );
}
