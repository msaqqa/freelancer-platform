'use client';

import { useEffect, useState } from 'react';
import { AvatarInput } from '@/partials/common/avatar-input';
import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import { CalendarDays } from 'lucide-react';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { cn } from '@/lib/utils';
import { getCountries } from '@/services/general';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { DatePickerComponent } from '@/components/common/date-picker';

const PersonalDetails = ({ setActiveSection }) => {
  const [selectedCountry, setSelectedCountry] = useState(null);
  const { t } = useTranslation('requiredData');
  const {
    control,
    formState: { errors },
    trigger,
  } = useFormContext();

  const { data, isLoading } = useQuery({
    queryKey: ['countries'],
    queryFn: getCountries,
  });
  const countries = data?.data ?? [];

  useEffect(() => {
    handleCountryChange(1);
  }, [countries]);

  const handleCountryChange = (countryId) => {
    const country = countries.find((c) => c.id === Number(countryId));
    setSelectedCountry(country);
  };

  const handleClickBtn = async () => {
    const isValid = await trigger([
      'photo',
      'name',
      'birthDate',
      'gender',
      'country',
      'mobile',
    ]);
    if (isValid) {
      setActiveSection('professional_details');
    }
  };

  return (
    <Card className="pb-2.5">
      <CardHeader id="personal_details">
        <CardTitle>{t('personalDetailsTitle')}</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-5">
        {/* Photo */}
        <FormField
          control={control}
          name="photo"
          render={({ field }) => (
            <FormItem className="flex flex-row items-baseline flex-wrap gap-2.5">
              <FormLabel className="flex w-full max-w-56">
                {t('photo')}
              </FormLabel>
              <div className="flex justify-between items-center flex-wrap grow gap-2.5">
                <span className="text-sm text-secondary-foreground">
                  800x800px JPG or PNG
                </span>
                <div className="flex justify-between items-center gap-2.5">
                  <FormControl>
                    <AvatarInput
                      {...field}
                      onChange={(val) => {
                        field.onChange(val);
                        trigger('photo');
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </div>
              </div>
            </FormItem>
          )}
        />

        {/* Name */}
        <FormField
          control={control}
          name="name"
          render={({ field }) => (
            <FormItem className="w-full flex flex-row items-baseline flex-wrap lg:flex-nowrap gap-2.5">
              <FormLabel className="flex w-full items-center gap-1 max-w-56">
                {t('name')}
              </FormLabel>
              <div className="flex flex-col flex-grow">
                <FormControl>
                  <Input
                    type="text"
                    id="name"
                    placeholder={t('nameHolder')}
                    className="focus-visible:ring-0"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="mt-1" />
              </div>
            </FormItem>
          )}
        />

        {/* Birth Date */}
        <FormField
          control={control}
          name="birthDate"
          render={({ field }) => {
            const date = field.value;
            const onChange = field.onChange;
            return (
              <FormItem className="w-full flex flex-row items-baseline flex-wrap lg:flex-nowrap gap-2.5">
                <FormLabel className="flex w-full items-center gap-1 max-w-56">
                  {t('birthDate')}
                </FormLabel>
                <div className="flex flex-col flex-grow">
                  <FormControl>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          mode="input"
                          variant="outline"
                          className={cn(
                            'w-full data-[state=open]:border-input',
                            !date && 'text-muted-foreground',
                          )}
                        >
                          <CalendarDays className="-ms-0.5" />
                          {date ? (
                            format(new Date(date), 'LLL dd, y')
                          ) : (
                            <span>{t('dateHolder')}</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent
                        className="w-auto p-0"
                        align="start"
                        onBlur={() => trigger('birthDate')}
                      >
                        <DatePickerComponent
                          selected={date ? new Date(date) : undefined}
                          onChange={(selectedDate) => {
                            onChange(selectedDate?.toISOString());
                            trigger('birthDate');
                          }}
                          minDate={new Date(1900, 0, 20)}
                          maxDate={new Date()}
                        />
                      </PopoverContent>
                    </Popover>
                  </FormControl>
                  <FormMessage className="mt-1" />
                </div>
              </FormItem>
            );
          }}
        />

        {/* Gender Select */}
        <FormField
          control={control}
          name="gender"
          render={({ field }) => (
            <FormItem className="w-full flex flex-row items-center flex-wrap lg:flex-nowrap gap-2.5">
              <FormLabel className="flex w-full items-center gap-1 max-w-56">
                {t('gender')}
              </FormLabel>
              <div className="flex flex-col flex-grow">
                <FormControl>
                  <RadioGroup
                    value={field.value}
                    onValueChange={field.onChange}
                    className="flex items-center gap-5"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="male" id="male" />
                      <FormLabel
                        htmlFor="male"
                        className="text-foreground text-sm font-normal"
                      >
                        {t('male')}
                      </FormLabel>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="female" id="female" />
                      <FormLabel
                        htmlFor="female"
                        className="text-foreground text-sm font-normal"
                      >
                        {t('female')}
                      </FormLabel>
                    </div>
                  </RadioGroup>
                </FormControl>
                <FormMessage className="mt-1" />
              </div>
            </FormItem>
          )}
        />

        {/* Gender Select */}
        {/* <FormField
          control={control}
          name="gender"
          render={({ field }) => (
            <FormItem className="w-full flex flex-row items-baseline flex-wrap lg:flex-nowrap gap-2.5">
              <FormLabel className="flex w-full items-center gap-1 max-w-56">
                {t('gender')}
              </FormLabel>
              <div className="flex flex-col flex-grow">
                <FormControl>
                  <Select
                    {...field}
                    defaultValue={field.value}
                    onValueChange={(val) => {
                      field.onChange(val);
                      trigger('gender');
                    }}
                    onOpenChange={(isOpen) => {
                      if (!isOpen) {
                        trigger('gender');
                      }
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder={t('genderHolder')} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">{t('male')}</SelectItem>
                      <SelectItem value="female">{t('female')}</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage className="mt-1" />
              </div>
            </FormItem>
          )}
        /> */}

        {/* Country Select */}
        <FormField
          control={control}
          name="country"
          render={({ field }) => (
            <FormItem className="w-full flex flex-row items-baseline flex-wrap lg:flex-nowrap gap-2.5">
              <FormLabel className="flex w-full items-center gap-1 max-w-56">
                {t('country')}
              </FormLabel>
              <div className="flex flex-col flex-grow">
                <FormControl>
                  <Select
                    value={field?.value}
                    onValueChange={(val) => {
                      field.onChange(val);
                      trigger('country');
                      handleCountryChange(val);
                    }}
                    onOpenChange={(isOpen) => {
                      if (!isOpen) {
                        trigger('country');
                      }
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder={t('countryHolder')} />
                    </SelectTrigger>
                    <SelectContent>
                      {isLoading && <SelectItem>{t('loading')}</SelectItem>}
                      {countries.length &&
                        countries.map((country) => (
                          <SelectItem
                            key={country.id}
                            value={country.id.toString()}
                          >
                            {country.name}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage className="mt-1" />
              </div>
            </FormItem>
          )}
        />

        {/* Phone Number */}
        <FormField
          control={control}
          name="mobile"
          render={({ field }) => (
            <FormItem className="w-full flex flex-row items-baseline flex-wrap lg:flex-nowrap gap-2.5">
              <FormLabel className="flex w-full items-center gap-1 max-w-56">
                {t('mobile')}
              </FormLabel>
              <div className="flex flex-col flex-grow">
                <FormControl>
                  <div
                    className={`flex items-center gap-2 border rounded-md ${errors.mobile ? 'border-destructive focus:border-destructive ring-destructive' : 'border-input'} `}
                  >
                    {/* Country Code and Flag inside the input */}
                    {selectedCountry && (
                      <div className="flex items-center gap-1 px-3 h-8.5 bg-transparent">
                        <span className="text-sm">
                          {selectedCountry.number_code}
                        </span>
                        <img
                          src={selectedCountry.flag}
                          alt="Country Flag"
                          className="w-6 h-4"
                        />
                      </div>
                    )}
                    {/* Phone Number Input */}
                    <Input
                      type="tel"
                      maxLength="15"
                      {...field}
                      className="ps-0 border-0 focus-visible:outline-none focus-visible:ring-0"
                    />
                  </div>
                </FormControl>
                <FormMessage className="mt-1" />
              </div>
            </FormItem>
          )}
        />

        <div className="flex justify-end pt-2.5">
          <Button type="button" onClick={handleClickBtn}>
            {t('saveBtn')}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export { PersonalDetails };
