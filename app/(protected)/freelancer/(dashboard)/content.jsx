import { VerifyBadge } from '@/app/(protected)/freelancer/profile/profile/components/verify-badge';
import { PendingActions, StatsCards, WelcomeHeader } from './components';

export function DashboardContent() {
  return (
    <div className="grid gap-5 lg:gap-7.5">
      <WelcomeHeader />
      <StatsCards />
      <VerifyBadge />
      <PendingActions />
    </div>
  );
}
