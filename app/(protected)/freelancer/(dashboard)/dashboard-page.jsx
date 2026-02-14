import { Fragment } from 'react';
import { Container } from '@/components/common/container';
import { DashboardContent } from './dashboard-content';

export function DashboardPage() {
  return (
    <Fragment>
      <Container>
        <DashboardContent />
      </Container>
    </Fragment>
  );
}
