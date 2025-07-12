'use client';

import React, { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { getCategories, getSkills } from '@/services/general';
import { Checkbox } from '@/components/ui/checkbox';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import MultiSelect from '@/components/common/multi-select';

export const ProjectOverview = () => {
  const [categoryId, setCategoryId] = useState(null);
  const { t: fs } = useTranslation('services');
  const { t: tv } = useTranslation('validation');
  // const fs = (key) => t(`services.${key}`);
  const form = useFormContext();

  // get categoriesData data from api
  const { data: categoriesData, isLoading: categoriesLoading } = useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
  });
  const categories = categoriesData?.data ?? [];

  // get subcategoriesData data from api
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

  const skillOptions = skills.map((skill) => ({
    id: skill.id,
    name: skill.name,
  }));

  const handleCategoryChange = (val) => {
    setCategoryId(val);
    form.setValue('subcategory', '');
    form.trigger('category');
  };

  const { fields } = useFieldArray({
    name: 'attributes',
  });

  const dynamicAttributes = [
    { id: 1, name: 'test-1' },
    { id: 2, name: 'test-2' },
    { id: 3, name: 'test-3' },
  ];

  useEffect(() => {
    form.setValue(
      'attributes',
      dynamicAttributes.map((attr) => ({
        id: attr.id,
        value: false,
      })),
    );
  }, []);

  const attributes = form.watch('attributes');

  return (
    <>
      <p className="text-md text-foreground font-semibold mb-5">
        Project overview
      </p>
      {/* Title Field */}
      <FormField
        control={form.control}
        name="title"
        render={({ field }) => (
          <FormItem className="w-full mb-5">
            <FormLabel>{fs('title')}</FormLabel>
            <FormControl>
              <Input
                placeholder="Project name or short description"
                value={field.value}
                onChange={(e) => {
                  field.onChange(e);
                }}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      {/* Industry Field */}
      <FormField
        control={form.control}
        name="category"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{fs('industry')}</FormLabel>
            <FormControl>
              <Select
                value={field.value}
                onValueChange={(val) => {
                  field.onChange(val);
                  handleCategoryChange(val);
                }}
                onOpenChange={(isOpen) => {
                  if (!isOpen) {
                    form.trigger('category');
                  }
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="industryHolder" />
                </SelectTrigger>
                <SelectContent>
                  {categoriesLoading && (
                    <SelectItem>{fs('loading')}</SelectItem>
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
          </FormItem>
        )}
      />
      {/* Subcategory Field */}
      <FormField
        control={form.control}
        name="subcategory"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{fs('specialty')}</FormLabel>
            <div className="flex flex-col flex-grow">
              <FormControl>
                <Select
                  value={field.value}
                  onValueChange={(val) => {
                    field.onChange(val);
                    form.trigger('subcategory');
                  }}
                  onOpenChange={(isOpen) => {
                    if (!isOpen) {
                      form.trigger('subcategory');
                    }
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder={fs('specialtyHolder')} />
                  </SelectTrigger>
                  <SelectContent>
                    {subcategoriesLoading && (
                      <SelectItem>{fs('loading')}</SelectItem>
                    )}
                    {subcategories.map((subcat) => (
                      <SelectItem key={subcat.id} value={subcat.id.toString()}>
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

      {/* Service Attributes Field */}
      <div className="flex flex-col gap-2.5">
        <FormLabel className="mb-2">Attributes</FormLabel>
        <div className="flex items-center flex-wrap space-x-3">
          {fields.map((field, index) => (
            <div key={field.id} className="flex items-center space-x-2">
              <FormField
                control={form.control}
                name={`attributes.${index}.value`}
                render={({ field }) => (
                  <>
                    <Checkbox
                      id={`attribute-${index}`}
                      checked={field.value}
                      onCheckedChange={(checked) => field.onChange(!!checked)}
                    />
                    <FormLabel
                      htmlFor={`attribute-${index}`}
                      className="text-sm leading-none text-foreground"
                    >
                      {
                        dynamicAttributes.find(
                          (a) => a.id === attributes[index]?.id,
                        )?.name
                      }
                    </FormLabel>
                  </>
                )}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Tags Field */}
      <FormField
        control={form.control}
        name="tags"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{fs('tags')}</FormLabel>
            <div className="flex flex-col flex-grow">
              <FormControl>
                <MultiSelect
                  options={skillOptions}
                  value={field.value}
                  onChange={field.onChange}
                  getOptionLabel={(e) => e.name}
                  getOptionValue={(e) => e.id}
                  placeholder={fs('tagsHolder')}
                  className=" min-h-[100px]"
                />
              </FormControl>
              <FormMessage className="mt-1" />
            </div>
          </FormItem>
        )}
      />
    </>
  );
};
