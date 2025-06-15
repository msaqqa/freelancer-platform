'use client';

import { Container } from '@/components/common/container';
import { AccountSettingsSidebarContent } from './content';

export default function RequiredData() {
  return (
    <div className="w-full h-screen min-h-fit flex justify-center py-8 lg:py-10">
      <Container>
        <AccountSettingsSidebarContent />
      </Container>
    </div>
  );
}
