'use client';

import { useSearchParams } from 'next/navigation';
import { Container } from '@/components/common/container';
import { AccountSettingsSidebarContent } from './content';

export default function RequiredData() {
  const searchParams = useSearchParams();
  const accountType = searchParams.get('accountType');

  return (
    <div className="flex flex-col items-center" style={{ flexGrow: '1' }}>
      <Container className="pt-13">
        <AccountSettingsSidebarContent accountType={accountType} />
      </Container>
    </div>
  );
}
