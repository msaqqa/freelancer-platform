'use client';

import { Suspense } from 'react';
import { ScreenLoader } from '@/components/common/screen-loader';
import { BrandedLayout } from './layouts/branded';

export default function Layout({ children }) {
  return (
    <Suspense fallback={<ScreenLoader />}>
      <BrandedLayout>{children}</BrandedLayout>
    </Suspense>
  );
}
