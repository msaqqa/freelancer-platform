'use client';

import { useEffect } from 'react';
import { useUserStore } from '@/stores/user-store';
import { zodResolver } from '@hookform/resolvers/zod';
import { RiCheckboxCircleFill, RiErrorWarningFill } from '@remixicon/react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Plus, Trash2 } from 'lucide-react';
import { useFieldArray, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';
import { z } from 'zod';
import { saveFreelancerLanguages } from '@/services/freelancer/profile';
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
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Spinner } from '@/components/ui/spinners';

export const LanguagesDialog = ({ open, closeDialog }) => {
  const { user, setUser } = useUserStore();
  const { t } = useTranslation('freelancerProfile');
  const fp = (key) => t(`languages.${key}`);

  // get languages data from api
  const { data: langData, isLoading: langLoading } = useQuery({
    queryKey: ['languages'],
    queryFn: getLanguages,
  });
  const languagesOptions = langData?.data ?? [];

  // get language levels data from api
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
      languageFields: [{ language_id: '1', level: '1' }],
    },
    mode: 'onSubmit',
  });

  // Reset form values when dialog is opened
  useEffect(() => {
    const langFormat = user?.languages?.map((item) => ({
      language_id: item.id,
      level: item.level,
    }));
    console.log('langFormat', langFormat);
    if (open) {
      form.reset({
        languageFields: langFormat || [],
      });
    }
  }, [form, open, user]);

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
  const mutation = useMutation({
    mutationFn: saveFreelancerLanguages,
    onSuccess: (data) => {
      toast.custom(
        () => (
          <Alert variant="mono" icon="success">
            <AlertIcon>
              <RiCheckboxCircleFill />
            </AlertIcon>
            <AlertTitle>{data.message}</AlertTitle>
          </Alert>
        ),
        {
          position: 'top-center',
        },
      );
      setUser(data);
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
    const updateValues = { languages: values.languageFields };
    console.log('updateValues', updateValues);
    mutation.mutate(updateValues);
  };

  return (
    <Dialog open={open} onOpenChange={closeDialog}>
      <DialogContent
        className="mx-auto grow w-full max-w-xl p-0 gap-0"
        variant="fullscreen"
      >
        <DialogHeader className="py-5 px-6 border-b border-border">
          <DialogTitle>{fp('languagesTitle')}</DialogTitle>
        </DialogHeader>
        <ScrollArea className="py-0 mb-5 ps-6 pe-3 me-3">
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
                            <FormLabel>{fp('languageLabel')}</FormLabel>
                            <FormControl>
                              <Select
                                value={field.value}
                                onValueChange={field.onChange}
                              >
                                <SelectTrigger>
                                  <SelectValue
                                    placeholder={fp('languageHolder')}
                                  />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectGroup>
                                    {languagesOptions.map((language) => (
                                      <SelectItem
                                        key={language.id}
                                        value={language.id.toString()}
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
                            <FormLabel>{fp('levelLabel')}</FormLabel>
                            <FormControl>
                              <Select
                                value={field.value}
                                onValueChange={field.onChange}
                              >
                                <SelectTrigger>
                                  <SelectValue
                                    placeholder={fp('levelHolder')}
                                  />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectGroup>
                                    {levelOptions.map((level) => (
                                      <SelectItem
                                        key={level.key}
                                        value={level.key.toString()}
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
                      className="ms-2"
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
                {fp('addBtn')}
              </Button>

              <DialogFooter>
                <Button type="button" variant="outline" onClick={closeDialog}>
                  {t('cancelBtn')}
                </Button>
                <Button
                  type="submit"
                  disabled={isLoading || !form.formState.isDirty}
                >
                  {isLoading && <Spinner className="animate-spin" />}
                  {t('saveBtn')}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};
