'use client';

import { Suspense } from 'react';
import { BrandedLayout } from './layouts/branded';

export default function Layout({ children }) {
  return (
    <BrandedLayout>
      <Suspense>{children}</Suspense>
    </BrandedLayout>
  );
}
