'use client';

import { useEffect, useState } from 'react';
import { AvatarInput } from '@/partials/common/avatar-input';
import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import { CalendarDays } from 'lucide-react';
import { Controller, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { cn } from '@/lib/utils';
import { getCountries } from '@/services/general';
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

const PersonalDetails = ({ setActiveSection }) => {
  const [selectedCountry, setSelectedCountry] = useState(null);
  const { t } = useTranslation('requiredData');
  const {
    register,
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
      'name',
      'photo',
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
        <div className="flex items-center flex-wrap gap-2.5">
          <Label className="flex w-full max-w-56">{t('photo')}</Label>
          <div className="flex items-center justify-between flex-wrap grow gap-2.5">
            <span className="text-sm text-secondary-foreground">
              800x800px JPG or PNG
            </span>
            <Controller
              name="photo"
              control={control}
              defaultValue={null}
              render={({ field }) => (
                <AvatarInput
                  value={field.value}
                  onChange={(val) => {
                    field.onChange(val);
                    trigger('photo');
                  }}
                  aria-invalid={errors.photo ? 'true' : 'false'}
                />
              )}
            />
          </div>
          {errors.photo && (
            <p className="text-red-500 text-sm mt-1">{errors.photo.message}</p>
          )}
        </div>

        {/* Name */}
        <div className="flex items-baseline flex-wrap lg:flex-nowrap gap-2.5">
          <Label className="flex w-full items-center gap-1 max-w-56">
            {t('name')}
          </Label>
          <div className="flex flex-col flex-grow">
            <Input
              type="text"
              placeholder={t('nameHolder')}
              {...register('name')}
              aria-invalid={errors.name ? 'true' : 'false'}
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>
        </div>

        {/* Birth Date */}
        <div className="flex items-baseline flex-wrap lg:flex-nowrap gap-2.5">
          <Label className="flex w-full items-center gap-1 max-w-56">
            {t('birthDate')}
          </Label>
          <div className="flex flex-col flex-grow">
            <Controller
              control={control}
              name="birthDate"
              render={({ field }) => {
                const date = field.value;
                const onChange = field.onChange;
                return (
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        mode="input"
                        variant="outline"
                        id="date"
                        onBlur={() => trigger('birthDate')}
                        className={cn(
                          'w-full data-[state=open]:border-primary',
                          !date && 'text-muted-foreground',
                          errors.birthDate &&
                            'border-destructive focus:border-destructive ring-destructive',
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
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        data-invalid={errors.birthDate ? 'true' : 'false'}
                        initialFocus
                        mode="single"
                        defaultMonth={date ? new Date(date) : undefined}
                        selected={date ? new Date(date) : undefined}
                        onSelect={(selectedDate) => {
                          onChange(selectedDate?.toISOString() || null);
                          trigger('birthDate');
                        }}
                        numberOfMonths={1}
                        disabled={{ after: new Date() }}
                      />
                    </PopoverContent>
                  </Popover>
                );
              }}
            />
            {errors.birthDate && (
              <p className="text-red-500 text-sm mt-1">
                {errors.birthDate.message}
              </p>
            )}
          </div>
        </div>

        {/* Gender Select */}
        <div className="flex items-baseline flex-wrap lg:flex-nowrap gap-2.5">
          <Label className="flex w-full max-w-56">{t('gender')}</Label>
          <div className="flex flex-col flex-grow">
            <Controller
              control={control}
              name="gender"
              defaultValue="male"
              render={({ field }) => (
                <Select
                  value={field.value}
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
                  <SelectTrigger
                    aria-invalid={errors.gender ? 'true' : 'false'}
                    className={
                      errors.gender
                        ? 'border-destructive focus:border-destructive'
                        : ''
                    }
                  >
                    <SelectValue placeholder={t('genderHolder')} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">{t('male')}</SelectItem>
                    <SelectItem value="female">{t('female')}</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
            {errors.gender && (
              <p className="text-red-500 text-sm mt-1">
                {errors.gender.message}
              </p>
            )}
          </div>
        </div>

        {/* Country Select */}
        <div className="flex items-baseline flex-wrap lg:flex-nowrap gap-2.5">
          <Label className="flex w-full max-w-56">{t('country')}</Label>
          <div className="flex flex-col flex-grow">
            <Controller
              control={control}
              name="country"
              defaultValue="1"
              render={({ field }) => (
                <Select
                  value={field.value}
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
                  <SelectTrigger
                    aria-invalid={errors.gender ? 'true' : 'false'}
                    className={
                      errors.gender
                        ? 'border-destructive focus:border-destructive'
                        : ''
                    }
                  >
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
              )}
            />
            {errors.country && (
              <p className="text-red-500 text-sm mt-1">
                {errors.country.message}
              </p>
            )}
          </div>
        </div>

        {/* Phone Number */}
        <div className="flex items-baseline flex-wrap lg:flex-nowrap gap-2.5">
          <Label className="flex w-full max-w-56">{t('mobile')}</Label>
          <div className="flex flex-col flex-grow">
            <div
              className={`flex items-center gap-2 border rounded-md ${errors.mobile ? 'border-destructive focus:border-destructive ring-destructive' : 'border-input'} `}
            >
              {/* Country Code and Flag inside the input */}
              {selectedCountry && (
                <div className="flex items-center gap-1 px-3 h-8.5 bg-transparent">
                  <span className="text-sm">{selectedCountry.number_code}</span>
                  <img
                    src={selectedCountry.flag}
                    alt="Country Flag"
                    className="w-6 h-4"
                  />
                </div>
              )}
              {/* Phone Number Input */}
              <Input
                type="text"
                aria-invalid={errors.mobile ? 'true' : 'false'}
                {...register('mobile', {
                  required: 'Phone number is required',
                })}
                className="ps-0 border-0 focus-visible:outline-none focus-visible:ring-0"
              />
            </div>
            {errors.mobile && (
              <p className="text-red-500 text-sm mt-1">
                {errors.mobile.message}
              </p>
            )}
          </div>
        </div>

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
