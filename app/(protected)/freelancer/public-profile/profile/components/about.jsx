'use client';

import { useState } from 'react';
import { Pencil, ShieldCheck } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import { AboutDialog } from '../dialogs';

const About = ({ user, isLoading }) => {
  const [openDialog, setOpenDialog] = useState(false);
  const { t } = useTranslation('freelancerProfile');
  const fp = (key) => t(`about.${key}`);

  const Loading = () => {
    return Array(5)
      .fill(0)
      .map((_, idx) => {
        return (
          <div key={idx} className="flex items-center space-x-4 space-y-2">
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        );
      });
  };

  const tables = [
    {
      status: `${fp('readyWork')}:`,
      info: (
        <Badge
          variant={user?.available_hire ? 'success' : 'destructive'}
          appearance="outline"
        >
          {user?.available_hire ? fp('available') : fp('notAvailable')}
        </Badge>
      ),
    },
    {
      status: `${fp('hourlyRate')}:`,
      info: `$${user?.hourly_rate}/${fp('hr')}`,
    },
    { status: fp('totalJobs'), info: user?.total_jobs || 0 },
    {
      status: fp('id'),
      info: (
        <span className="flex items-center gap-px">
          {user?.id_verified?.label}
          {user?.id_verified?.status === 2 && <ShieldCheck size={16} />}
        </span>
      ),
    },
    { status: fp('joined'), info: user?.joined_date },
  ];

  const renderTable = (table, index) => {
    return (
      <TableRow key={index} className="border-0">
        <TableCell className="w-1/2 text-sm text-secondary-foreground py-2">
          {table.status}
        </TableCell>
        <TableCell className="w-1/2 text-sm text-mono py-2">
          {table.info}
        </TableCell>
      </TableRow>
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{fp('aboutTitle')}</CardTitle>
        <Button variant="ghost" onClick={() => setOpenDialog(true)}>
          <Pencil size={16} className="text-accent-foreground" /> {t('edit')}
        </Button>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <Loading />
        ) : (
          <Table>
            <TableBody>
              {tables.map((table, index) => {
                return renderTable(table, index);
              })}
            </TableBody>
          </Table>
        )}
      </CardContent>
      <AboutDialog
        open={openDialog}
        closeDialog={() => setOpenDialog(false)}
        user={user}
      />
    </Card>
  );
};

export { About };
