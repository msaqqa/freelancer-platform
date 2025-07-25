'use client';

import { useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { RiCheckboxCircleFill, RiErrorWarningFill } from '@remixicon/react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';
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
import { SkillsSchema } from './forms';

export const SkillsDialog = ({ open, closeDialog, skills, categoryId }) => {
  const queryClient = useQueryClient();
  const { t } = useTranslation('freelancerProfile');
  const fp = (key) => t(`skills.${key}`);

  // get skills data from api
  const { data: skillsData } = useQuery({
    queryKey: ['skills', categoryId],
    queryFn: () => getSkills(categoryId),
    enabled: !!categoryId,
  });
  const skillsSelect = skillsData?.data ?? [];

  const skillOptions = skillsSelect.map((skill) => ({
    id: skill.id,
    name: skill.name,
  }));

  // Form initialization
  const form = useForm({
    resolver: zodResolver(SkillsSchema()),
    mode: 'onSubmit',
  });

  // Reset form values when dialog is opened
  useEffect(() => {
    const skillsFormat = skills.map((item) => ({
      id: item.id,
      name: item.name,
    }));
    if (open) {
      form.reset({
        skills: skillsFormat || [],
      });
    }
  }, [form, open, skills]);

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
      queryClient.invalidateQueries({ queryKey: ['user-profile'] });
      queryClient.invalidateQueries({
        queryKey: ['freelancer-profile-complete'],
      });
      closeDialog();
    },
  });

  // Derive the loading state from the mutation status
  const submitLoading = mutation.status === 'pending';

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
        <DialogHeader className="pb-6 border-b border-border">
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
                  <FormLabel>{fp('skillsTitle')}</FormLabel>
                  <div className="flex flex-col flex-grow">
                    <FormControl>
                      <MultiSelect
                        options={skillOptions}
                        value={field.value}
                        onChange={field.onChange}
                        getOptionLabel={(e) => e.name}
                        getOptionValue={(e) => e.id}
                        placeholder={fp('skillsHolder')}
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
                disabled={submitLoading || !form.formState.isDirty}
              >
                {submitLoading && <Spinner className="animate-spin" />}
                {t('saveBtn')}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
