'use client';

import { useQuery } from '@tanstack/react-query';
import { Controller, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import MultiSelect from 'react-select';
import { getCategories, getSkills, getSubcategories } from '@/services/general';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
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

const ProfessionalDetails = ({ isProcessing }) => {
  const { t } = useTranslation('requiredData');
  const {
    register,
    control,
    formState: { errors },
    trigger,
  } = useFormContext();

  const { data: categoriesData } = useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
  });
  const categories = categoriesData?.data ?? [];

  const { data: subcategoriesData } = useQuery({
    queryKey: ['subcategories'],
    queryFn: getSubcategories,
  });
  const subcategories = subcategoriesData?.data ?? [];

  const { data: skillsData } = useQuery({
    queryKey: ['skills'],
    queryFn: getSkills,
  });
  const skills = skillsData?.data ?? [];

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
        <div className="w-full">
          <div className="flex items-baseline flex-wrap lg:flex-nowrap gap-2.5">
            <Label className="flex w-full max-w-56">{t('category')}</Label>
            <div className="flex flex-col flex-grow">
              <Controller
                control={control}
                name="category"
                defaultValue=""
                render={({ field }) => (
                  <Select
                    value={field.value}
                    onValueChange={(val) => {
                      field.onChange(val);
                      trigger('category');
                    }}
                    onOpenChange={(isOpen) => {
                      if (!isOpen) {
                        trigger('category');
                      }
                    }}
                  >
                    <SelectTrigger
                      aria-invalid={errors.category ? 'true' : 'false'}
                      className={
                        errors.category
                          ? 'border-destructive focus:border-destructive'
                          : ''
                      }
                    >
                      <SelectValue placeholder={t('categoryHolder')} />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((cat) => (
                        <SelectItem key={cat.id} value={cat.id.toString()}>
                          {cat.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.category && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.category.message}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Subcategory Select */}
        <div className="w-full">
          <div className="flex items-baseline flex-wrap lg:flex-nowrap gap-2.5">
            <Label className="flex w-full max-w-56">{t('subcategory')}</Label>
            <div className="flex flex-col flex-grow">
              <Controller
                control={control}
                name="subcategory"
                defaultValue=""
                render={({ field }) => (
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
                    <SelectTrigger
                      aria-invalid={errors.subcategory ? 'true' : 'false'}
                      className={
                        errors.subcategory
                          ? 'border-destructive focus:border-destructive'
                          : ''
                      }
                    >
                      <SelectValue placeholder={t('subcategoryHolder')} />
                    </SelectTrigger>
                    <SelectContent>
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
                )}
              />
              {errors.subcategory && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.subcategory.message}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Skills Select */}
        <div className="w-full">
          <div className="flex items-baseline flex-wrap lg:flex-nowrap gap-2.5">
            <Label className="flex w-full max-w-56">{t('skills')}</Label>
            <div className="flex flex-col flex-grow">
              <Controller
                control={control}
                name="skills"
                defaultValue={[]}
                render={({ field }) => (
                  <MultiSelect
                    isMulti
                    options={skillOptions}
                    value={field.value}
                    onChange={field.onChange}
                    getOptionLabel={(e) => e.name}
                    getOptionValue={(e) => e.id}
                    placeholder={t('skillsHolder')}
                    className="border-1 rounded-md border-input text-sm h-8.5"
                    styles={{
                      menu: (base) => ({
                        ...base,
                        padding: '5px',
                      }),
                      option: (base, state) => ({
                        ...base,
                        paddingLeft: '20px',
                        backgroundColor: state.isSelected
                          ? '#4CAF50'
                          : state.isFocused
                            ? '#f6f3f4'
                            : 'transparent',
                      }),
                    }}
                  />
                )}
              />
              {errors.skills && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.skills.message}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Description (bio) */}
        <div className="flex items-baseline flex-wrap lg:flex-nowrap gap-2.5">
          <Label className="flex w-full max-w-56">{t('description')}</Label>
          <div className="flex flex-col flex-grow">
            <textarea
              placeholder={t('descriptionHolder')}
              className="text-sm text-secondary-foreground font-normal rounded-md border border-input px-3 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
              rows={5}
              {...register('bio')}
              aria-invalid={errors.bio ? 'true' : 'false'}
            />
            {errors.bio && (
              <p className="text-red-500 text-sm mt-1">{errors.bio.message}</p>
            )}
          </div>
        </div>

        {/* hourly Rate */}
        <div className="w-full">
          <div className="flex items-baseline flex-wrap lg:flex-nowrap gap-2.5">
            <Label className="flex w-full items-center gap-1 max-w-56">
              {t('hourlyRate')}
            </Label>
            <div className="flex flex-col flex-grow">
              <Input
                type="number"
                step="0.01"
                min="0"
                {...register('hourlyRate', { valueAsNumber: true })}
                aria-invalid={errors.hourlyRate ? 'true' : 'false'}
                placeholder="0.00"
              />
              {errors.hourlyRate && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.hourlyRate.message}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Availability */}
        <div className="flex items-center gap-7.5">
          <Label className="flex w-full max-w-56">{t('availability')}</Label>

          <Controller
            control={control}
            name="availability"
            defaultValue={false}
            render={({ field }) => (
              <>
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
              </>
            )}
          />
        </div>

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
