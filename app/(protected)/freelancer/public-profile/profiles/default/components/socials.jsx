'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  RiFacebookCircleLine,
  RiTwitterXLine,
  RiYoutubeLine,
} from '@remixicon/react';
import { Dribbble, SquarePen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { SocialsDialog } from '../dialogs/socials-dialog';

const Socials = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const items = [
    { logo: Dribbble, info: 'jennynft' },
    { logo: RiFacebookCircleLine, info: 'nftmania' },
    { logo: RiTwitterXLine, info: 'jennynft' },
    { logo: RiYoutubeLine, info: 'jennyklabber' },
  ];

  const renderItems = (item, index) => {
    return (
      <div key={index} className="flex items-center gap-2.5">
        <item.logo className="text-lg text-muted-foreground" size={18} />
        <Link
          href="#"
          className="text-sm leading-none text-mono hover:text-primary-active"
        >
          {item.info}
        </Link>
      </div>
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Socials</CardTitle>
        <Button variant="ghost" mode="icon" onClick={() => setOpenDialog(true)}>
          <SquarePen size={16} className="text-blue-500" />
        </Button>
      </CardHeader>
      <CardContent>
        <div className="grid gap-y-5">
          {items.map((item, index) => {
            return renderItems(item, index);
          })}
        </div>
      </CardContent>
      <SocialsDialog
        open={openDialog}
        closeDialog={() => setOpenDialog(false)}
      />
    </Card>
  );
};

export { Socials };
