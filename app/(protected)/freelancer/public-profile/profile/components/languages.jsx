'use client';

import { useState } from 'react';
import { SquarePen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import { LanguagesDialog } from '../dialogs/languages-dialog';
import { EmptyState } from './empty-state';

const Languages = () => {
  const [openDialog, setOpenDialog] = useState(false);

  const tables = [
    // { status: 'English', info: 'Fluent' },
    // { status: 'Arabic', info: 'Native' },
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
      <CardHeader className="ps-8">
        <CardTitle>Languages</CardTitle>
        {tables.length > 0 && (
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
        {tables.length ? (
          <Table>
            <TableBody>
              {tables.map((table, index) => {
                return renderTable(table, index);
              })}
            </TableBody>
          </Table>
        ) : (
          <EmptyState
            title="Languages"
            description="Add the languages you speak and your fluency level."
            icon="/media/icons/languages-icon.svg"
            openDialog={() => setOpenDialog(true)}
          />
        )}
      </CardContent>
      <LanguagesDialog
        open={openDialog}
        closeDialog={() => setOpenDialog(false)}
      />
    </Card>
  );
};

export { Languages };
