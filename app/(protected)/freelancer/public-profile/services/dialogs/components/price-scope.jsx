'use client';

import React, { useEffect } from 'react';
import { Plus } from 'lucide-react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { MONTH as months } from '@/config/dateConfig';
import { toAbsoluteUrl } from '@/lib/helpers';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input, InputWrapper } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const PriceScope = () => {
  const form = useFormContext();

  const { fields } = useFieldArray({
    name: 'addOns',
  });

  const dynamicAddOns = [
    { id: 1, name: 'Content Upload', price: '', days: '' },
    { id: 2, name: 'Additional Revision', price: '' },
    { id: 3, name: 'Responsive Design', price: '', days: '' },
  ];

  useEffect(() => {
    form.setValue(
      'addOns',
      dynamicAddOns.map((attr) => ({
        id: attr.id,
        value: false,
        price: attr.price ?? '',
        days: attr.days ?? '',
      })),
    );
  }, []);

  const addOns = form.watch('addOns');

  const {
    fields: customFields,
    append: appendCustom,
    remove: removeCustom,
  } = useFieldArray({
    name: 'customAddOns',
  });

  return (
    <>
      <p className="text-md text-foreground font-semibold mb-5">
        Price & scope
      </p>

      <div className="flex flex-col md:flex-row gap-2.5">
        {/* Delivery Days */}
        <FormField
          control={form.control}
          name="delivery-Days"
          render={({ field }) => (
            <FormItem className="flex-1 w-full">
              <FormLabel className="inline-block mb-2">Delivery Days</FormLabel>
              <FormControl>
                <Input
                  placeholder="How many days to deliver the service?"
                  {...field}
                />
              </FormControl>
              <FormMessage className="mt-1" />
            </FormItem>
          )}
        />

        {/* Revisions */}
        <FormField
          control={form.control}
          name="revisions"
          render={({ field }) => (
            <FormItem className="flex-1 w-full">
              <FormLabel className="inline-block mb-2">Revisions</FormLabel>
              <FormControl>
                <Select
                  value={field.value}
                  onValueChange={(val) => {
                    field.onChange(val);
                    form.trigger('startMonth');
                  }}
                  onOpenChange={(isOpen) => {
                    if (!isOpen) {
                      form.trigger('startMonth');
                    }
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Set included revisions (e.g. 1, 2, or unlimited)" />
                  </SelectTrigger>
                  <SelectContent className="max-h-50 overflow-y">
                    {months.map((item) => (
                      <SelectItem key={item.id} value={item.id.toString()}>
                        {item.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage className="mt-1" />
            </FormItem>
          )}
        />
      </div>

      {/* Project price */}
      <FormField
        control={form.control}
        name="Project price"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Project price</FormLabel>
            <FormControl>
              <InputWrapper>
                <Input
                  type="text"
                  id="Project price"
                  placeholder="0.00"
                  className="focus-visible:ring-0"
                  {...field}
                />
                <img
                  src={toAbsoluteUrl('/media/icons/dollar-light.svg')}
                  className="h-[20px]"
                  alt="image"
                />
              </InputWrapper>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Add Ons Field */}
      <div className="flex flex-col gap-2.5">
        <FormLabel className="mb-2">
          Choose add-ons{' '}
          <small className="text-muted-foreground">(optional)</small>
        </FormLabel>
        <div className="flex flex-col space-y-3">
          {fields.map((field, index) => {
            const config = dynamicAddOns.find(
              (a) => a.id === addOns[index]?.id,
            );
            const isChecked = addOns[index]?.value;
            return (
              <div key={field.id} className="flex items-center w-full gap-x-4">
                <div className="flex items-center gap-2 w-1/4">
                  <FormField
                    control={form.control}
                    name={`addOns.${index}.value`}
                    render={({ field }) => (
                      <>
                        <Checkbox
                          id={`addOn-${index}`}
                          checked={field.value}
                          onCheckedChange={(checked) =>
                            field.onChange(!!checked)
                          }
                        />
                        <FormLabel
                          htmlFor={`addOn-${index}`}
                          className="text-sm leading-none text-foreground"
                        >
                          {
                            dynamicAddOns.find(
                              (a) => a.id === addOns[index]?.id,
                            )?.name
                          }
                        </FormLabel>
                      </>
                    )}
                  />
                </div>
                <div className="flex gap-x-4 w-3/4">
                  {/* Price Field */}
                  <div className="w-1/2">
                    {'price' in config && isChecked && (
                      <FormField
                        control={form.control}
                        name={`addOns.${index}.price`}
                        render={({ field }) => (
                          <FormItem className="flex-row items-center">
                            <FormLabel>For an extra</FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                type="number"
                                placeholder="0.0"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    )}
                  </div>
                  {/* Days Field */}
                  <div className="w-1/2">
                    {'days' in config && isChecked && (
                      <FormField
                        control={form.control}
                        name={`addOns.${index}.days`}
                        render={({ field }) => (
                          <FormItem className="flex-row items-center">
                            <FormLabel>Additional days</FormLabel>
                            <FormControl>
                              <Input {...field} type="number" placeholder="0" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* custom add-ons */}
      {customFields.map((field, index) => (
        <div key={field.id} className="flex flex-col gap-2.5">
          {/* Title Field */}
          <FormField
            control={form.control}
            name={`customAddOns.${index}.title`}
            render={({ field }) => (
              <FormItem className="w-full mb-5">
                <div className="flex justify-between items-center">
                  <FormLabel>Title</FormLabel>
                  <Button
                    type="button"
                    variant="destructive"
                    onClick={() => removeCustom(index)}
                  >
                    Remove
                  </Button>
                </div>
                <FormControl>
                  <Input
                    placeholder="Project name or short description"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex flex-col md:flex-row gap-2.5">
            {/* Price Field */}
            <FormField
              control={form.control}
              name={`customAddOns.${index}.price`}
              render={({ field }) => (
                <FormItem className="w-full mb-5">
                  <FormLabel>For an extra</FormLabel>
                  <FormControl>
                    <Input {...field} type="number" placeholder="0.0" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Days Field */}
            <FormField
              control={form.control}
              name={`customAddOns.${index}.days`}
              render={({ field }) => (
                <FormItem className="w-full mb-5">
                  <FormLabel>
                    Additional days{' '}
                    <small className="text-muted-foreground">(optional)</small>
                  </FormLabel>
                  <FormControl>
                    <Input {...field} type="number" placeholder="0" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
      ))}

      <Button
        mode="link"
        onClick={() => appendCustom({ title: '', price: '', days: '' })}
      >
        <span className="p-px border border-primary rounded-md">
          <Plus size={16} />
        </span>
        Create custom add-on
      </Button>
    </>
  );
};

export { PriceScope };
