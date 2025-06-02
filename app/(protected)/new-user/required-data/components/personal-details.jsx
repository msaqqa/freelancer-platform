'use client';

import { useState } from 'react';
import { AvatarInput } from '@/partials/common/avatar-input';
import { useMutation } from '@tanstack/react-query';
import { format } from 'date-fns';
import { CalendarDays } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { cn } from '@/lib/utils';
import { selecttUserType } from '@/services/required-data';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
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

const PersonalDetails = () => {
  const [date, setDate] = useState();
  const [nameInput, setNameInput] = useState('');
  const [country, setCountry] = useState('1');
  const [city, setCity] = useState('');
  const { t } = useTranslation('requiredData');

  const form = useForm({
    // resolver: zodResolver(getSigninSchema(t)),
    defaultValues: {
      date: new Date(1984, 0, 20),
      nameInput: 'Jason Tatum',
      country: '',
      country: '1',
      city: '',
    },
  });

  const mutation = useMutation({
    mutationFn: selecttUserType,
    onSuccess: ({ data }) => {
      // router.push('/');
    },
    onError: (error) => {
      console.error('error', error);
      throw error?.response?.data?.message || error.message;
    },
  });

  const onSubmit = (values) => {
    mutation.mutate(values);
  };

  return (
    <Card className="pb-2.5">
      <CardHeader id="personal_details">
        <CardTitle>{t('')}</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-5">
        {/* <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="block w-full space-y-5"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-baseline flex-wrap lg:flex-nowrap gap-2.5"></div>
                  <FormLabel>email</FormLabel>
                  <Input placeholder="lllll" {...field} />
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form> */}
        <div className="flex items-center flex-wrap gap-2.5">
          <Label className="flex w-full max-w-56">Photo</Label>
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
              {t('name')}
            </Label>
            <Input
              type="text"
              defaultValue={nameInput}
              onChange={(e) => setNameInput(e.target.value)}
            />
          </div>
        </div>
        <div className="w-full">
          <div className="flex items-baseline flex-wrap lg:flex-nowrap gap-2.5">
            <Label className="flex w-full items-center gap-1 max-w-56">
              {t('birthDate')}
            </Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  mode="input"
                  variant="outline"
                  id="date"
                  className={cn(
                    'w-full data-[state=open]:border-primary',
                    !date && 'text-muted-foreground',
                  )}
                >
                  <CalendarDays className="-ms-0.5" />
                  {date ? (
                    format(date, 'LLL dd, y')
                  ) : (
                    <span>{t('dateHolder')}</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  initialFocus
                  mode="single" // Single date selection
                  defaultMonth={date}
                  selected={date}
                  onSelect={setDate}
                  numberOfMonths={1}
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>
        <div className="flex items-center flex-wrap gap-2.5">
          <Label className="flex w-full max-w-56">{t('gender')}</Label>
          <div className="grow">
            <Select defaultValue="1">
              <SelectTrigger>
                <SelectValue placeholder="Select Gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="m">{t('male')}</SelectItem>
                <SelectItem value="f">{t('female')}</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="flex items-baseline flex-wrap lg:flex-nowrap gap-2.5">
          <Label className="flex w-full max-w-56">{t('country')}</Label>
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
          <Label className="flex w-full max-w-56">{t('city')}</Label>
          <Input
            id="city"
            type="text"
            placeholder="Barcelona"
            defaultValue={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </div>
        <div className="flex justify-end pt-2.5">
          <Button>{t('saveBtn')}</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export { PersonalDetails };
