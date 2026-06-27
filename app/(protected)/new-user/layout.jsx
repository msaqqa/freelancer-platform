'use client';

import { MinimalHeader } from '@/components/layouts/minimal-header';
import { MinimalFooter } from '@/components/layouts/minimal-footer';

// UI shell only (header + footer). Auth routing for the onboarding flow is
// governed by the parent (protected) layout, so this layout adds no auth logic.
export default function NewUserLayout({ children }) {
  return (
    <div className="flex flex-col min-h-screen">
      <MinimalHeader />
      <main className="flex-grow">{children}</main>
      <MinimalFooter />
    </div>
  );
}
