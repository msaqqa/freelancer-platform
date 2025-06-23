'use client';

import { useState } from 'react';
import { ShieldCheck, SquarePen } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import { AboutDialog } from '../dialogs/about-dialog';

const About = () => {
  const [openDialog, setOpenDialog] = useState(false);

  const tables = [
    {
      status: 'Ready To Work?:',
      info: (
        <Badge variant="success" appearance="outline">
          Available
        </Badge>
      ),
    },
    { status: 'Hourly rate:', info: '$20.0/hr' },
    { status: 'Total Jobs:', info: '10' },
    {
      status: 'ID:',
      info: (
        <span className="flex items-center gap-px">
          Verified <ShieldCheck size={16} />
        </span>
      ),
    },
    { status: 'Joined:', info: '02 Jun, 2025' },
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
        <CardTitle>About</CardTitle>
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
