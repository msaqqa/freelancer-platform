'use client';

import { useEffect } from 'react';
import { useUserStore } from '@/stores/user-store';
import { zodResolver } from '@hookform/resolvers/zod';
import { RiCheckboxCircleFill, RiErrorWarningFill } from '@remixicon/react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';
import { z } from 'zod';
import { saveFreelancerSkills } from '@/services/freelancer/profile';
import { getSkills } from '@/services/general';
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
import { Spinner } from '@/components/ui/spinners';
import MultiSelect from '@/components/common/multi-select';

export const SkillsDialog = ({ open, closeDialog }) => {
  const { user, setUser } = useUserStore();
  const { t } = useTranslation('freelancerProfile');
  const fp = (key) => t(`skills.${key}`);

  // get skills data from api
  const { data: skillsData, isLoading: skillsLoading } = useQuery({
    queryKey: ['skills'],
    queryFn: getSkills,
  });
  const skillsSelect = skillsData?.data ?? [];

  const skillOptions = skillsSelect.map((skill) => ({
    id: skill.id,
    name: skill.name,
  }));

  const SkillsSchema = z.object({
    skills: z
      .array(
        z.object({
          id: z.number(),
          name: z.string(),
        }),
      )
      .optional(),
  });

  // Form initialization
  const form = useForm({
    resolver: zodResolver(SkillsSchema),
    mode: 'onSubmit',
  });

  // Reset form values when dialog is opened
  useEffect(() => {
    const skillsFormat = user?.skills?.map((item) => ({
      id: item.id,
      name: item.name,
    }));
    if (open) {
      form.reset({
        skills: skillsFormat || [],
      });
    }
  }, [form, open, user]);

  // Mutation for creating/updating skills
  const mutation = useMutation({
    mutationFn: saveFreelancerSkills,
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

  // Derive the loading state from the mutation status
  const isLoading = mutation.status === 'pending';

  // Handle form submission
  const handleSubmit = (values) => {
    const newSkills = values.skills.map((item) => item.id);
    const updateValues = { skills: newSkills };
    console.log('values', updateValues);
    mutation.mutate(updateValues);
  };

  return (
    <Dialog open={open} onOpenChange={closeDialog}>
      <DialogContent>
        <DialogHeader className="pb-4 border-b border-border">
          <DialogTitle>{fp('skillsTitle')}</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-6"
          >
            {/* Skills Select */}
            <FormField
              control={form.control}
              name="skills"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{fp('skills')}</FormLabel>
                  <div className="flex flex-col flex-grow">
                    <FormControl>
                      <MultiSelect
                        options={skillOptions}
                        value={field.value}
                        onChange={field.onChange}
                        getOptionLabel={(e) => e.name}
                        getOptionValue={(e) => e.id}
                        placeholder={'skillsHolder'}
                        className=" min-h-[100px]"
                      />
                    </FormControl>
                    <FormMessage className="mt-1" />
                  </div>
                </FormItem>
              )}
            />

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
      </DialogContent>
    </Dialog>
  );
};
