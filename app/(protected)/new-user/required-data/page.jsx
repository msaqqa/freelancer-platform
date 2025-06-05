'use client';

import { Container } from '@/components/common/container';
import { AccountSettingsSidebarContent } from './content';

export default function RequiredData() {
  return (
    <div className="flex flex-col items-center" style={{ flexGrow: '1' }}>
      <Container className="pt-13">
        <AccountSettingsSidebarContent />
      </Container>
    </div>
  );
}
