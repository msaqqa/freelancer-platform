'use client';

import { useState } from 'react';
import { useUserStore } from '@/stores/user-store';
import { SquarePen } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import { EmptyState } from '@/components/common/empty-state';
import { LanguagesDialog } from '../dialogs';

const Languages = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const { user } = useUserStore();
  const languages = user?.languages || [];
  const { t } = useTranslation('freelancerProfile');
  const fp = (key) => t(`languages.${key}`);

  const renderTable = (item) => {
    return (
      <TableRow key={item.id} className="border-0">
        <TableCell className="text-sm text-secondary-foreground py-2">
          {item.name}
        </TableCell>
        <TableCell className="text-sm text-mono py-2">{item.level}</TableCell>
      </TableRow>
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{fp('languagesTitle')}</CardTitle>
        {languages.length > 0 && (
          <Button
            variant="ghost"
            mode="icon"
            onClick={() => setOpenDialog(true)}
          >
            <SquarePen size={16} className="text-blue-500" />
          </Button>
        )}
      </CardHeader>
      <CardContent>
        {languages.length ? (
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
