'use client';

import { useState } from 'react';
import { AvatarInput } from '@/partials/common/avatar-input';
import { format } from 'date-fns';
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
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';

const ProfessionalDetails = () => {
  const [workField, setWorkField] = useState('');
  const [language, setLanguage] = useState('en');
  const [description, setDescription] = useState('');
  const { t } = useTranslation('requiredData');

  return (
    <Card className="pb-2.5">
      <CardHeader id="professional_details">
        <CardTitle>{t('ProfessionalTitle')}</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-5">
        <div className="w-full">
          <div className="flex items-baseline flex-wrap lg:flex-nowrap gap-2.5">
            <Label className="flex w-full items-center gap-1 max-w-56">
              {t('workField')}
            </Label>
            <Input
              type="text"
              placeholder={t('description')}
              value={workField}
              onChange={(e) => setWorkField(e.target.value)}
            />
          </div>
        </div>
        <div className="flex items-baseline flex-wrap lg:flex-nowrap gap-2.5">
          <Label className="flex w-full max-w-56">{t('workFieldHolder')}</Label>
          <Textarea
            placeholder={t('descriptionHolder')}
            className="text-sm text-secondary-foreground font-normal"
            rows={5}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="flex items-center flex-wrap gap-2.5">
          <Label className="flex w-full max-w-56">{t('language')}</Label>
          <div className="grow">
            <Select value={language} onValueChange={setLanguage}>
              <SelectTrigger>
                <SelectValue placeholder="Select Language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">{t('english')}</SelectItem>
                <SelectItem value="ar">{t('arabic')}</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="flex items-center gap-7.5">
          <Label className="flex w-full max-w-56">{t('availability')}</Label>

          <Label htmlFor="auto-update" className="text-foreground text-sm">
            {t('availabilityHolder')}
          </Label>
          <Switch defaultChecked size="sm" />
        </div>
        <div className="flex justify-end pt-2.5">
          <Button>{t('saveBtn')}</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export { ProfessionalDetails };
