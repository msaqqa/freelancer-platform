'use client';

import { useState } from 'react';
import { useUserStore } from '@/stores/user-store';
import { ShieldCheck, SquarePen } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import { AboutDialog } from '../dialogs';

const About = () => {
  const { user } = useUserStore();
  const [openDialog, setOpenDialog] = useState(false);
  const { t } = useTranslation('freelancerProfile');
  const fp = (key) => t(`about.${key}`);

  const tables = [
    {
      status: `${fp('readyWork')}:`,
      info: (
        <Badge
          variant={user.available_hire ? 'success' : 'destructive'}
          appearance="outline"
        >
          {fp('available')}
        </Badge>
      ),
    },
    { status: `${fp('readyWork')}:`, info: '$20.0/hr' },
    { status: fp('totalJobs'), info: '10' },
    {
      status: fp('id'),
      info: (
        <span className="flex items-center gap-px">
          {fp('verified')} <ShieldCheck size={16} />
        </span>
      ),
    },
    { status: fp('joined'), info: '02 Jun, 2025' },
  ];

  const renderTable = (table, index) => {
    return (
      <TableRow key={index} className="border-0">
        <TableCell className="text-sm text-secondary-foreground py-2">
          {table.status}
        </TableCell>
        <TableCell className="text-sm text-mono py-2">{table.info}</TableCell>
      </TableRow>
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{fp('aboutTitle')}</CardTitle>
        <Button variant="ghost" mode="icon" onClick={() => setOpenDialog(true)}>
          <SquarePen size={16} className="text-blue-500" />
        </Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableBody>
            {tables.map((table, index) => {
              return renderTable(table, index);
            })}
          </TableBody>
        </Table>
      </CardContent>
      <AboutDialog open={openDialog} closeDialog={() => setOpenDialog(false)} />
    </Card>
  );
};

export { About };
