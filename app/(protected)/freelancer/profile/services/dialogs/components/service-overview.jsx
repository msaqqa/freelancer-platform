'use client';

import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { getCategories, getSkills } from '@/services/general';
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

export const ServiceOverview = () => {
  const [categoryId, setCategoryId] = useState(null);
  const { t: fs } = useTranslation('services');
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

  return (
    <>
      <p className="text-md text-foreground font-semibold mb-5">
        Service Overview
      </p>
      {/* Name Field */}
      <FormField
        control={form.control}
        name="service"
        render={({ field }) => (
          <FormItem className="w-full mb-5">
            <FormLabel>{fs('name')}</FormLabel>
            <FormControl>
              <Input
                placeholder="Service name or short description"
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
      {/* Specialty Field */}
      <FormField
        control={form.control}
        name="specialty"
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
      {/* Skills Field */}
      <FormField
        control={form.control}
        name="skills"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{fs('skills')}</FormLabel>
            <div className="flex flex-col flex-grow">
              <FormControl>
                <MultiSelect
                  options={skillOptions}
                  value={field.value}
                  onChange={field.onChange}
                  getOptionLabel={(e) => e.name}
                  getOptionValue={(e) => e.id}
                  placeholder={fs('skillsHolder')}
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
