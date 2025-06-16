'use client';

import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { RiCheckboxCircleFill, RiErrorWarningFill } from '@remixicon/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Trash2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
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
  const [languageFields, setLanguageFields] = useState([
    { id: 0, language: '', level: '' },
  ]);

  const form = useForm({
    defaultValues: {
      languageFields: [{ id: 0, language: '', level: '' }],
    },
  });

  const handleAddField = () => {
    const newField = { id: languageFields.length };
    setLanguageFields([...languageFields, newField]);

    form.setValue('languageFields', [...languageFields, newField]);
  };

  const handleRemoveField = (id) => {
    if (id !== 0) {
      const updatedFields = languageFields.filter((field) => field.id !== id);
      setLanguageFields(updatedFields);
      form.setValue('languageFields', updatedFields);
    }
  };

  // Form initialization
  // const form = useForm({
  //   resolver: zodResolver(),
  //   defaultValues: { language: '', level: '' },
  //   mode: 'onSubmit',
  // });

  // Reset form values when dialog is opened
  // useEffect(() => {
  //   if (open) {
  //     form.reset({
  //       language: languages?.language || '',
  //       level: languages?.level ?? '',
  //     });
  //   }
  // }, [form, open, languages]);

  const editFreelancerLanguages = () => {};
  // Mutation for creating/updating languages
  const mutation = useMutation({
    mutationFn: editFreelancerLanguages,
    onSuccess: () => {
      const isEdit = !!languages?.id;
      const message = isEdit
        ? 'languages updated successfully'
        : 'languages added successfully';

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

  // Derive the loading state from the mutation status
  const isLoading = mutation.status === 'pending';

  // Handle form submission
  const handleSubmit = (values) => {
    mutation.mutate(values);
  };

  const languagesData = [
    {
      code: 'en',
      name: 'English',
      shortName: 'EN',
      direction: 'ltr',
      flag: '/media/flags/united-states.svg',
    },
    {
      code: 'ar',
      name: 'Arabic',
      shortName: 'AR',
      direction: 'rtl',
      flag: '/media/flags/saudi-arabia.svg',
    },
  ];

  const languagesLevel = [
    { id: '1', name: 'Fluent' },
    { id: '2', name: 'Intermediate' },
    { id: '3', name: 'Native' },
  ];

  return (
    <Dialog open={open} onOpenChange={closeDialog}>
      <DialogContent close={false}>
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
            {languageFields.map((field, index) => (
              <div key={field.id} className="flex items-end gap-2.5 mb-4">
                {/* Language */}
                <div className="flex-1">
                  <FormField
                    control={form.control}
                    name={`languageFields[${index}].language`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Language</FormLabel>
                        <FormControl>
                          <Select
                            value={field.value}
                            onValueChange={(value) => field.onChange(value)}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select language" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                {languagesData.map((language) => (
                                  <SelectItem
                                    key={language.code}
                                    value={language.code}
                                  >
                                    <span className="flex w-full items-center justify-between gap-2.5">
                                      <img
                                        src={language.flag}
                                        alt={`${language.name} flag`}
                                        className="w-6 h-6 rounded-full"
                                      />
                                      <span className="grow">
                                        {language.name}
                                      </span>
                                    </span>
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
                            onValueChange={(value) => field.onChange(value)}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select Level" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                {languagesLevel.map((level) => (
                                  <SelectItem key={level.id} value={level.id}>
                                    {level.name}
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

                {/* Remove button for fields after the first one */}
                {index !== 0 && (
                  <Button
                    variant="ghost"
                    onClick={() => handleRemoveField(field.id)}
                  >
                    <Trash2 />
                  </Button>
                )}
              </div>
            ))}

            {/* Add button */}
            <Button
              type="button"
              onClick={handleAddField}
              className="bg-blue-500 text-white hover:bg-blue-600 mt-4"
            >
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
                Save Settings
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
