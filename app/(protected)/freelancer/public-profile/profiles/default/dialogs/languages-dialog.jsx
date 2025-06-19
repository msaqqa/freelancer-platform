'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { RiCheckboxCircleFill, RiErrorWarningFill } from '@remixicon/react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Plus, Trash2 } from 'lucide-react';
import { useFieldArray, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { getLanguageLevels, getLanguages } from '@/services/general';
import { Alert, AlertIcon, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Spinner } from '@/components/ui/spinners';

export const LanguagesDialog = ({ open, closeDialog, languages }) => {
  const queryClient = useQueryClient();

  // get languages data from api
  const { data: langData, isLoading: langLoading } = useQuery({
    queryKey: ['languages'],
    queryFn: getLanguages,
  });
  const languagesOptions = langData?.data ?? [];

  // get languages level data from api
  const { data: levelData, isLoading: levelLoading } = useQuery({
    queryKey: ['languagesLevels'],
    queryFn: getLanguageLevels,
  });
  const levelOptions = levelData?.data ?? [];

  // Zod validation schema for the form
  const LanguagesSchema = z.object({
    languageFields: z
      .array(
        z.object({
          language_id: z.string().min(1, {
            message: 'Language is required',
          }),
          level: z.string().min(1, { message: 'Level is required' }),
        }),
      )
      .min(1, { message: 'At least one language is required' }),
  });

  // Form initialization with React Hook Form
  const form = useForm({
    resolver: zodResolver(LanguagesSchema),
    defaultValues: {
      languageFields: [{ language_id: '', level: '' }],
    },
    mode: 'onSubmit',
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'languageFields',
  });

  // Handle adding new language fields
  const handleAddField = () => {
    append({ language_id: '', level: '' });
  };

  // Handle removing language fields
  const handleRemoveField = (index) => {
    remove(index);
  };

  // Mutation for creating/updating languages
  const editFreelancerLanguages = () => {};
  const mutation = useMutation({
    mutationFn: editFreelancerLanguages,
    onSuccess: () => {
      toast.custom(
        () => (
          <Alert variant="mono" icon="success">
            <AlertIcon>
              <RiCheckboxCircleFill />
            </AlertIcon>
            <AlertTitle>{message}</AlertTitle>
          </Alert>
        ),
        {
          position: 'top-center',
        },
      );

      queryClient.invalidateQueries({ queryKey: ['user-languagess'] });
      closeDialog();
    },
    onError: (error) => {
      const message = error.message;
      toast.custom(
        () => (
          <Alert variant="mono" icon="destructive">
            <AlertIcon>
              <RiErrorWarningFill />
            </AlertIcon>
            <AlertTitle>{message}</AlertTitle>
          </Alert>
        ),
        {
          position: 'top-center',
        },
      );
    },
  });

  const isLoading = mutation.status === 'pending';

  const handleSubmit = (values) => {
    console.log('values', values);
    // mutation.mutate(values);
  };

  return (
    <Dialog open={open} onOpenChange={closeDialog}>
      <DialogContent>
        <DialogHeader className="pb-4 border-b border-border">
          <DialogTitle>
            {languages ? 'Edit languages' : 'Add languages'}
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-6"
          >
            {/* Render language fields */}
            {fields.map((field, index) => (
              <div key={field.id} className="flex items-end mb-4">
                <div className="flex items-baseline gap-2.5 w-[90%]">
                  {/* Language */}
                  <div className="flex-1">
                    <FormField
                      control={form.control}
                      name={`languageFields[${index}].language_id`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Language</FormLabel>
                          <FormControl>
                            <Select
                              value={field.value}
                              onValueChange={field.onChange}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select language" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectGroup>
                                  {languagesOptions.map((language) => (
                                    <SelectItem
                                      key={language.id}
                                      value={language.id}
                                    >
                                      {language?.name?.en}
                                    </SelectItem>
                                  ))}
                                </SelectGroup>
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Level */}
                  <div className="flex-1">
                    <FormField
                      control={form.control}
                      name={`languageFields[${index}].level`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Level</FormLabel>
                          <FormControl>
                            <Select
                              value={field.value}
                              onValueChange={field.onChange}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select Level" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectGroup>
                                  {levelOptions.map((level) => (
                                    <SelectItem
                                      key={level.key}
                                      value={level.label}
                                    >
                                      {level.label}
                                    </SelectItem>
                                  ))}
                                </SelectGroup>
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                {/* Remove button for fields after the first one */}
                {index !== 0 && (
                  <Button
                    type="button"
                    variant="ghost"
                    className="w-[8%] ms-[2%]"
                    onClick={() => handleRemoveField(index)}
                  >
                    <Trash2 />
                  </Button>
                )}
              </div>
            ))}

            {/* Add button */}
            <Button
              className="text-blue-500 hover:text-blue-600"
              type="button"
              variant="dim"
              onClick={handleAddField}
            >
              <span className="p-px border border-blue-500 group-hover:border-blue-600 rounded-md">
                <Plus size={16} />
              </span>
              Add New Language
            </Button>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={closeDialog}>
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isLoading || !form.formState.isDirty}
              >
                {isLoading && <Spinner className="animate-spin" />}
                Save
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
