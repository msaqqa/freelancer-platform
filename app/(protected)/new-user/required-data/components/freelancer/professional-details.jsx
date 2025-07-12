'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { toAbsoluteUrl } from '@/lib/helpers';
import { getCategories, getSkills, getSubcategories } from '@/services/general';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input, InputWrapper } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Spinner } from '@/components/ui/spinners';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import MultiSelect from '@/components/common/multi-select';

const ProfessionalDetails = ({ isProcessing }) => {
  const [bioChar, setBioCahr] = useState(0);

  const handleBioChange = (e) => {
    const val = e.target.value;
    const charLength = val.length;
    setBioCahr(charLength);
  };

  const [categoryId, setCategoryId] = useState(null);
  const { t } = useTranslation('requiredData');
  const { control, setValue, trigger } = useFormContext();

  const { data: categoriesData, isLoading: categoriesLoading } = useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
  });
  const categories = categoriesData?.data ?? [];

  const { data: subcategoriesData, isLoading: subcategoriesLoading } = useQuery(
    {
      queryKey: ['subcategories', categoryId],
      queryFn: () => getSubcategories(categoryId),
      enabled: !!categoryId,
    },
  );
  const subcategories = subcategoriesData?.data ?? [];

  const { data: skillsData, isLoading: skillsLoading } = useQuery({
    queryKey: ['skills', categoryId],
    queryFn: () => getSkills(Number(categoryId)),
    enabled: !!categoryId,
  });
  const skills = skillsData?.data ?? [];

  const handleCategoryChange = (val) => {
    setCategoryId(val);
    setValue('subcategory', null);
    setValue('skills', []);
    trigger('category');
  };

  const skillOptions = skills.map((skill) => ({
    id: skill.id,
    name: skill.name,
  }));

  return (
    <Card className="pb-2.5">
      <CardHeader id="professional_details">
        <CardTitle>{t('professionalTitle')}</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-5">
        {/* Category Select */}
        <FormField
          control={control}
          name="category"
          render={({ field }) => (
            <FormItem className="w-full flex flex-row items-baseline flex-wrap lg:flex-nowrap gap-2.5">
              <FormLabel className="flex w-full items-center gap-1 max-w-56">
                {t('category')}
              </FormLabel>
              <div className="flex flex-col flex-grow">
                <FormControl>
                  <Select
                    value={field.value}
                    onValueChange={(val) => {
                      field.onChange(val);
                      handleCategoryChange(val);
                    }}
                    onOpenChange={(isOpen) => {
                      if (!isOpen) {
                        trigger('category');
                      }
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder={t('categoryHolder')} />
                    </SelectTrigger>
                    <SelectContent>
                      {categoriesLoading && (
                        <SelectItem>{t('loading')}</SelectItem>
                      )}
                      {categories.map((cat) => (
                        <SelectItem key={cat.id} value={cat.id.toString()}>
                          {cat.name}
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

        {/* Subcategory Select */}
        <FormField
          control={control}
          name="subcategory"
          render={({ field }) => (
            <FormItem className="w-full flex flex-row items-baseline flex-wrap lg:flex-nowrap gap-2.5">
              <FormLabel className="flex w-full items-center gap-1 max-w-56">
                {t('subcategory')}
              </FormLabel>
              <div className="flex flex-col flex-grow">
                <FormControl>
                  <Select
                    value={field.value}
                    onValueChange={(val) => {
                      field.onChange(val);
                      trigger('subcategory');
                    }}
                    onOpenChange={(isOpen) => {
                      if (!isOpen) {
                        trigger('subcategory');
                      }
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder={t('subcategoryHolder')} />
                    </SelectTrigger>
                    <SelectContent>
                      {subcategoriesLoading && (
                        <SelectItem>{t('loading')}</SelectItem>
                      )}
                      {subcategories.map((subcat) => (
                        <SelectItem
                          key={subcat.id}
                          value={subcat.id.toString()}
                        >
                          {subcat.name}
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

        {/* Skills Select */}
        <FormField
          control={control}
          name="skills"
          render={({ field }) => (
            <FormItem className="w-full flex flex-row items-baseline flex-wrap lg:flex-nowrap gap-2.5">
              <FormLabel className="flex w-full items-center gap-1 max-w-56">
                {t('skills')}
              </FormLabel>
              <div className="flex flex-col flex-grow">
                <FormControl>
                  <MultiSelect
                    options={skillOptions}
                    value={field.value}
                    onChange={field.onChange}
                    getOptionLabel={(e) => e.name}
                    getOptionValue={(e) => e.id}
                    placeholder={t('skillsHolder')}
                    isLoading={skillsLoading}
                    className="bg-background border border-input rounded-md shadow-xs shadow-black/5 transition-shadow text-sm text-foreground text-[0.8125rem]"
                  />
                </FormControl>
                <FormMessage className="mt-1" />
              </div>
            </FormItem>
          )}
        />

        {/* Description (bio) */}
        <FormField
          control={control}
          name="bio"
          render={({ field }) => (
            <FormItem className="w-full flex flex-row items-baseline flex-wrap lg:flex-nowrap gap-2.5">
              <FormLabel className="flex w-full items-center gap-1 max-w-56">
                {t('bio')}
              </FormLabel>
              <div className="flex flex-col flex-grow">
                <div className="relative">
                  <FormControl>
                    <Textarea
                      id="bio"
                      rows={5}
                      className="focus-visible:ring-0"
                      value={field.value}
                      onChange={(val) => {
                        field.onChange(val);
                        handleBioChange(val);
                      }}
                      placeholder={t('descriptionHolder')}
                    />
                  </FormControl>
                  <span className="absolute right-3 bottom-3 text-sm text-muted-foreground/80">
                    {bioChar}/4000
                  </span>
                </div>
                <FormMessage className="mt-1" />
              </div>
            </FormItem>
          )}
        />

        {/* hourly Rate */}
        <FormField
          control={control}
          name="hourlyRate"
          render={({ field }) => (
            <FormItem className="w-full flex flex-row items-baseline flex-wrap lg:flex-nowrap gap-2.5">
              <FormLabel className="flex w-full items-center gap-1 max-w-56">
                {t('hourlyRate')}
              </FormLabel>
              <div className="flex flex-col flex-grow">
                <FormControl>
                  <InputWrapper>
                    <Input
                      type="text"
                      id="hourlyRate"
                      placeholder={t('hourlyRateHolder')}
                      className="focus-visible:ring-0"
                      {...field}
                    />
                    <img
                      src={toAbsoluteUrl('/media/icons/dollar-light.svg')}
                      className="h-[20px]"
                    />
                  </InputWrapper>
                </FormControl>
                <FormMessage className="mt-1" />
              </div>
            </FormItem>
          )}
        />

        {/* Availability */}
        <FormField
          control={control}
          name="availability"
          render={({ field }) => (
            <FormItem className="w-full flex flex-row items-baseline flex-wrap lg:flex-nowrap gap-2.5">
              <FormLabel className="flex w-full items-center gap-1 max-w-56">
                {t('availability')}
              </FormLabel>
              <FormControl>
                <div className="flex items-center gap-2">
                  <Label
                    htmlFor="auto-update"
                    className="text-foreground text-sm"
                  >
                    {t('availabilityHolder')}
                  </Label>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    size="sm"
                  />
                </div>
              </FormControl>
              <FormMessage className="mt-1" />
            </FormItem>
          )}
        />

        <div className="flex justify-end pt-2.5">
          <Button type="submit" disabled={isProcessing}>
            {isProcessing && <Spinner className="animate-spin" />}
            {t('saveBtn')}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export { ProfessionalDetails };
