'use client';

import { useState } from 'react';
import { Pencil, SquarePen } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import { EmptyState } from '@/components/common/empty-state';
import { LanguagesDialog } from '../dialogs';

const Languages = ({ user, isLoading }) => {
  const [openDialog, setOpenDialog] = useState(false);
  const languages = user?.languages || [];
  const { t } = useTranslation('freelancerProfile');
  const fp = (key) => t(`languages.${key}`);

  const Loading = () => {
    return Array(2)
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

  const renderTable = (item) => {
    return (
      <TableRow key={item.id} className="border-0">
        <TableCell className="text-sm text-secondary-foreground py-2">
          {item.name}
        </TableCell>
        <TableCell className="text-sm text-mono py-2">
          {item.level_name}
        </TableCell>
      </TableRow>
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{fp('languagesTitle')}</CardTitle>
        {languages.length > 0 && (
          <Button variant="ghost" onClick={() => setOpenDialog(true)}>
            <Pencil size={16} className="text-accent-foreground" /> {t('edit')}
          </Button>
        )}
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <Loading />
        ) : languages.length ? (
          <Table>
            <TableBody>
              {languages.map((item) => {
                return renderTable(item);
              })}
            </TableBody>
          </Table>
        ) : (
          <EmptyState
            title={fp('languagesTitle')}
            description={fp('languagesDesc')}
            icon={{
              light: '/media/icons/languages-light.svg',
              dark: '/media/icons/languages-dark.svg',
            }}
            openDialog={() => setOpenDialog(true)}
          />
        )}
      </CardContent>
      <LanguagesDialog
        open={openDialog}
        closeDialog={() => setOpenDialog(false)}
        languages={languages}
      />
    </Card>
  );
};

export { Languages };
