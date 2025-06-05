'use client';

import { useState } from 'react';
import { AvatarInput } from '@/partials/common/avatar-input';
import { CalendarDays } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

const CompanyDetails = () => {
  const [date, setDate] = useState();
  const [nameInput, setNameInput] = useState('');
  const [description, setDescription] = useState('');
  const [country, setCountry] = useState('1');
  const [city, setCity] = useState('');
  const { t } = useTranslation('requiredData');

  return (
    <Card className="pb-2.5">
      <CardHeader id="personal_details">
        <CardTitle>{t('')} Company Details</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-5">
        <div className="flex items-center flex-wrap gap-2.5">
          <Label className="flex w-full max-w-56">Business Logo</Label>
          <div className="flex items-center justify-between flex-wrap grow gap-2.5">
            <span className="text-sm text-secondary-foreground">
              150x150px JPEG, PNG
            </span>
            <AvatarInput />
          </div>
        </div>
        <div className="w-full">
          <div className="flex items-baseline flex-wrap lg:flex-nowrap gap-2.5">
            <Label className="flex w-full items-center gap-1 max-w-56">
              Business Name
            </Label>
            <Input
              type="text"
              defaultValue={nameInput}
              onChange={(e) => setNameInput(e.target.value)}
            />
          </div>
        </div>
        <div className="flex items-baseline flex-wrap lg:flex-nowrap gap-2.5">
          <Label className="flex w-full max-w-56">Business Description</Label>
          <Textarea
            placeholder={t('descriptionHolder')}
            className="text-sm text-secondary-foreground font-normal"
            rows={5}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="flex items-baseline flex-wrap lg:flex-nowrap gap-2.5">
          <Label className="flex w-full max-w-56">Business category</Label>
          <div className="grow">
            <Select value={country} onValueChange={setCountry}>
              <SelectTrigger>
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="2">Option 2</SelectItem>
                <SelectItem value="3">Option 3</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="flex items-baseline flex-wrap lg:flex-nowrap gap-2.5">
          <Label className="flex w-full max-w-56">Sub category</Label>
          <Input
            id="city"
            type="text"
            placeholder="Barcelona"
            defaultValue={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </div>
        <div className="flex items-baseline flex-wrap lg:flex-nowrap gap-2.5">
          <Label className="flex w-full items-center gap-1 max-w-56">
            Location
          </Label>
          <Input type="text" placeholder="Enter Website (optional)" />
        </div>
        <div className="flex justify-end pt-2.5">
          <Button>{t('saveBtn')}</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export { CompanyDetails };
