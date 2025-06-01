'use client';

import { Container } from '@/components/common/container';
import { ProductDetailsContent } from '@/app/(protected)/client/store-client/product-details/content';

export default function ProductDetailsPage() {
  return (
    <Container>
      <ProductDetailsContent />
    </Container>
  );
}
