'use client';

import { useEffect, useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';

const Process = () => {
  const [bioChar, setBioCahr] = useState(0);
  const form = useFormContext();
  const handleBioChange = (e) => {
    const val = e.target.value;
    const charLength = val.length;
    setBioCahr(charLength);
  };

  const {
    fields: requirementsFields,
    append,
    remove,
  } = useFieldArray({
    name: 'requirements',
  });

  useEffect(() => {
    if (!form.watch('requirements')?.length) {
      append({
        requirementsDetails: '',
        allowAttachments: false,
        requireAnswer: false,
      });
    }
  }, []);

  return (
    <>
      <p className="text-md text-foreground font-semibold mb-5">
        Requirements and steps
      </p>
      <div>Info you'll need from the client</div>
      <p>
        Request any details or files you’ll need from the client to begin the
        project. Clients can respond with text or attachments. Be sure to
        include at least one requirement.
      </p>

      <div className="flex flex-col gap-6">
        {requirementsFields.map((field, index) => (
          <div key={field.id} className="relative space-y-4">
            {/* Requirements Textarea */}
            <FormField
              control={form.control}
              name={`requirements.${index}.requirementsDetails`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Requirement</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Textarea
                        {...field}
                        onChange={(val) => {
                          field.onChange(val);
                          handleBioChange(val);
                          form.trigger('bio');
                        }}
                        placeholder="Add any details or files needed to start your project"
                        className="min-h-[120px] focus-visible:ring-0"
                      />
                      <span className="absolute end-5 bottom-3 text-sm text-muted-foreground/80">
                        {bioChar}/250
                      </span>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Checkboxes */}
            <div className="flex flex-col gap-2">
              <FormField
                control={form.control}
                name={`requirements.${index}.allowAttachments`}
                render={({ field }) => (
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id={`attachments-${index}`}
                      checked={field.value}
                      onCheckedChange={(checked) => field.onChange(!!checked)}
                    />
                    <FormLabel
                      htmlFor={`attachments-${index}`}
                      className="text-sm text-muted-foreground"
                    >
                      Allow client to upload attachments (optional)
                    </FormLabel>
                  </div>
                )}
              />
              <FormField
                control={form.control}
                name={`requirements.${index}.requireAnswer`}
                render={({ field }) => (
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id={`require-${index}`}
                      checked={field.value}
                      onCheckedChange={(checked) => field.onChange(!!checked)}
                    />
                    <FormLabel
                      htmlFor={`require-${index}`}
                      className="text-sm text-muted-foreground"
                    >
                      Client needs to answer before I can start working
                    </FormLabel>
                  </div>
                )}
              />
            </div>
            {/* Delete Button */}
            {index > 0 && (
              <Button
                type="button"
                variant="ghost"
                className="absolute -top-2 end-2"
                onClick={() => remove(index)}
              >
                <Trash2 className="w-4 h-4 text-destructive" />
              </Button>
            )}
          </div>
        ))}

        {/* Add New */}
        <Button
          type="button"
          mode="link"
          onClick={() =>
            append({
              requirements: '',
              allowAttachments: false,
              requireAnswer: false,
            })
          }
          className="w-fit text-sm"
        >
          <span className="p-px border border-primary rounded-md">
            <Plus size={16} />
          </span>
          Add another requirement
        </Button>
      </div>
    </>
  );
};

export { Process };
