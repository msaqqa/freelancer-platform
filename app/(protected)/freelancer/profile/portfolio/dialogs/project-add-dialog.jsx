'use client';

import { useEffect, useRef, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { Popover } from '@radix-ui/react-popover';
import { RiCheckboxCircleFill } from '@remixicon/react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Trash2, X } from 'lucide-react';
import { useFieldArray, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';
import { toAbsoluteUrl } from '@/lib/helpers';
import { cn } from '@/lib/utils';
import {
  addFreelancerPortfolio,
  getFreelancerPortfolioById,
  updateFreelancerPortfolio,
} from '@/services/freelancer/portfolio';
import { getSkills } from '@/services/general';
import { Alert, AlertIcon, AlertTitle } from '@/components/ui/alert';
import { Badge, BadgeButton } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandCheck,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
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
import { Input, InputWrapper } from '@/components/ui/input';
import { PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Spinner } from '@/components/ui/spinners';
import { MediaButton } from '@/app/components/partials/common/media-button';
import { ProjectFieldsSchema } from './forms';

const ProjectAddDialog = ({ open, closeDialog, portfolioId }) => {
  const { t } = useTranslation('portfolio');
  const { t: tv } = useTranslation('validation');
  const [step, setStep] = useState(1);
  const [coverImage, setCoverImage] = useState(null);
  const queryClient = useQueryClient();
  const [selectedSkills, setSelectedSkills] = useState([]);
  const projectCoverRef = useRef(null);

  // Skill options come from the `skills` table.
  const { data: skillsData } = useQuery({
    queryKey: ['skills'],
    queryFn: () => getSkills(),
  });
  const skillsList = skillsData?.data ?? [];

  // Step 1: content blocks (mandatory first text + image, + optional extras).
  // Step 2: cover / title / skills.
  const handleContinue = async () => {
    if (step === 1) {
      const valid = await form.trigger('projectFields');
      if (!valid) return;

      // Carry the first text into the title as an editable default.
      const firstText = form.getValues('projectFields')?.[0]?.value;
      if (firstText && !form.getValues('title')) {
        form.setValue('title', firstText);
      }
      setStep(2);
      return;
    }
    form.handleSubmit(handleSubmit)();
  };

  const handleBackStep = () => {
    setStep(step - 1);
  };

  // get getFreelancerPortfolioById data from api
  const { data: portfolioData } = useQuery({
    queryKey: ['portfolioId', portfolioId],
    queryFn: () => getFreelancerPortfolioById(portfolioId),
    enabled: !!portfolioId && open,
  });
  const portfolio = portfolioData?.data ?? {};

  // Form initialization with React Hook Form
  const form = useForm({
    resolver: zodResolver(ProjectFieldsSchema(tv)),
    defaultValues: {
      projectFields: [
        { type: 'text', value: '' },
        { type: 'image', file: '' },
      ],
      title: '',
      skills: [],
      projectCover: null,
    },
    mode: 'onSubmit',
  });

  // Prefill the form in edit mode once the portfolio has loaded. Image blocks
  // keep their existing URL in `file` (the service re-saves URL strings as-is).
  useEffect(() => {
    if (!open || !portfolioId || !portfolio?.id) return;

    const blocks = (portfolio.content_blocks ?? []).map((b) =>
      b.type === 'image'
        ? { type: 'image', file: b.url }
        : { type: 'text', value: b.value },
    );
    const skillIds = (portfolio.skills ?? []).map((s) => s.id);

    form.reset({
      projectFields: blocks.length
        ? blocks
        : [
            { type: 'text', value: '' },
            { type: 'image', file: '' },
          ],
      title: portfolio.title ?? '',
      skills: skillIds,
      projectCover: portfolio.cover_url ?? null,
    });
    setSelectedSkills(skillIds);
    if (portfolio.cover_url) setCoverImage(portfolio.cover_url);
  }, [form, open, portfolioId, portfolio?.id]);

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'projectFields',
  });

  // Handle adding new field
  const handleAddField = (type) => {
    if (type === 'image') {
      append({ type, file: '' });
    } else {
      append({ type, value: '' });
    }
  };

  // Handle removing field
  const handleRemoveField = (index) => {
    remove(index);
  };

  const handleSubmit = (values) => {
    mutation.mutate(values);
  };

  // Create / update the portfolio. The service handles image uploads and maps
  // the form values onto the `portfolios` table.
  const mutation = useMutation({
    mutationFn: async (values) =>
      portfolioId
        ? await updateFreelancerPortfolio(portfolioId, values)
        : await addFreelancerPortfolio(values),
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

      queryClient.invalidateQueries({ queryKey: ['user-projects'] }); // Refetch projects list
      if (portfolioId) {
        // Drop the stale edit cache so reopening shows the saved values.
        queryClient.invalidateQueries({
          queryKey: ['portfolioId', portfolioId],
        });
      }
      setStep(1);
      setCoverImage(null);
      setSelectedSkills([]);
      form.reset();
      closeDialog();
    },
  });

  const toggleSkillSelection = (skillId) => {
    setSelectedSkills((prev) => {
      const next = prev.includes(skillId)
        ? prev.filter((id) => id !== skillId)
        : [...prev, skillId];
      form.setValue('skills', next);
      return next;
    });
  };

  const handleSetProjectCover = async (file) => {
    if (file instanceof File) {
      setCoverImage(URL.createObjectURL(file));
      form.setValue('projectCover', file);
    } else if (typeof file === 'string' && file) {
      // Existing stored URL (edit mode).
      setCoverImage(file);
      form.setValue('projectCover', file);
    } else {
      setCoverImage(null);
      form.setValue('projectCover', null);
    }
  };

  const stepStatus = step === 1;

  return (
    <Dialog open={open} onOpenChange={closeDialog}>
      <DialogContent
        variant="fullscreen"
        className="w-full max-w-[800px] mx-auto"
      >
        <DialogHeader className="pb-5 border-b border-border">
          <DialogTitle>
            {portfolioId ? t('add.editTitle') : t('add.addTitle')}
          </DialogTitle>
        </DialogHeader>
        <ScrollArea className="grow pe-3 -me-3">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="space-y-6"
            >
              {stepStatus && (
                <>
                  {step === 1 && (
                    <p className="text-md text-foreground font-semibold text-center mb-5">
                      {t('add.intro')}
                    </p>
                  )}
                  {/* Render fields */}
                  {fields.map((item, index) => (
                    <div key={item.id} className="relative mb-5">
                      {item.type === 'text' ? (
                        <FormField
                          control={form.control}
                          name={`projectFields[${index}].value`}
                          render={({ field, fieldState }) => (
                            <FormItem>
                              <FormControl>
                                <InputWrapper>
                                  <Input
                                    placeholder={t('add.textHolder')}
                                    value={field.value}
                                    onChange={(e) => {
                                      field.onChange(e);
                                      if (fieldState.error) {
                                        form.trigger(
                                          `projectFields.${index}.value`,
                                        );
                                      }
                                    }}
                                  />
                                  {index !== 0 && (
                                    <Button
                                      type="button"
                                      variant="dim"
                                      className="p-0"
                                      onClick={() => handleRemoveField(index)}
                                    >
                                      <Trash2 />
                                    </Button>
                                  )}
                                </InputWrapper>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      ) : (
                        <>
                          <FormField
                            control={form.control}
                            name={`projectFields[${index}].file`}
                            render={({ field, fieldState }) => (
                              <FormItem>
                                <FormControl>
                                  <MediaButton
                                    title={t('add.dropTitle')}
                                    invalid={!!fieldState.error}
                                    description={
                                      index === 1
                                        ? t('add.coverDesc')
                                        : null
                                    }
                                    instructions={
                                      index === 1
                                        ? [
                                            t('add.instructionResolution'),
                                            t('add.instructionRights'),
                                          ]
                                        : null
                                    }
                                    variant={index === 1 ? 'primary' : 'mono'}
                                    value={field.value}
                                    onChange={(val) => {
                                      field.onChange(val);
                                      index === 1 && handleSetProjectCover(val);
                                      if (fieldState.error) {
                                        form.trigger(
                                          `projectFields.${index}.file`,
                                        );
                                      }
                                    }}
                                  />
                                </FormControl>
                                <FormMessage className="mt-1" />
                              </FormItem>
                            )}
                          />
                          {index !== 1 && (
                            <Button
                              type="button"
                              variant="ghost"
                              mode="icon"
                              className="w-6.5 h-6.5 rounded-full absolute top-2 right-2"
                              onClick={() => handleRemoveField(index)}
                            >
                              <Trash2 />
                            </Button>
                          )}
                        </>
                      )}
                    </div>
                  ))}
                  {/* Add button */}
                  {step === 1 && (
                    <div className="flex justify-center items-center gap-2.5">
                      <div className="flex items-center space-x-px">
                        <div className="flex flex-col justify-center">
                          <img
                            src={toAbsoluteUrl('/media/icons/image-icon.svg')}
                            className="dark:hidden max-h-[34px]"
                            alt="image"
                          />

                          <img
                            src={toAbsoluteUrl('/media/icons/image-icon.svg')}
                            className="light:hidden max-h-[34px]"
                            alt="image"
                          />
                        </div>
                        <Button
                          type="button"
                          variant="dim"
                          onClick={() => handleAddField('image')}
                          className="text-secondary-foreground hover:text-foreground"
                        >
                          <span>{t('add.addImage')}</span>
                        </Button>
                      </div>
                      <div className="flex items-center spaace-x-px">
                        <div className="flex flex-col justify-center">
                          <img
                            src={toAbsoluteUrl('/media/icons/text-icon.svg')}
                            className="dark:hidden max-h-[34px]"
                            alt="image"
                          />

                          <img
                            src={toAbsoluteUrl('/media/icons/text-icon.svg')}
                            className="light:hidden max-h-[34px]"
                            alt="image"
                          />
                        </div>
                        <Button
                          type="button"
                          variant="dim"
                          onClick={() => handleAddField('text')}
                          className="text-secondary-foreground hover:text-foreground"
                        >
                          <span>{t('add.addText')}</span>
                        </Button>
                      </div>
                    </div>
                  )}
                </>
              )}
              {step === 2 && (
                <div className="flex flex-wrap md:flex-nowrap gap-6 md:gap-10">
                  <div className="w-[40%]">
                    {/* Project Cover */}
                    <FormField
                      control={form.control}
                      name="projectCover"
                      render={() => (
                        <FormItem>
                          <FormLabel>{t('add.thumbnail')}</FormLabel>
                          <div className="w-full md:w-[300px] h-[200] overflow-hidden shrink-0">
                            <img
                              src={coverImage || ''}
                              alt="Cover Image"
                              className="bg-muted w-full h-full object-cover rounded-lg"
                            />
                          </div>
                          <div className="flex items-center gap-5">
                            <FormControl className="my-1.5">
                              <div className="flex flex-col space-y-2">
                                <div className="flex space-x-2">
                                  <Button
                                    mode="link"
                                    variant="foreground"
                                    underlined="solid"
                                    type="button"
                                    onClick={() =>
                                      projectCoverRef.current?.click()
                                    }
                                  >
                                    {t('add.changeCover')}
                                  </Button>
                                </div>
                                <input
                                  ref={projectCoverRef}
                                  type="file"
                                  accept="image/*"
                                  className="hidden"
                                  onChange={(e) => {
                                    handleSetProjectCover(e?.target?.files[0]);
                                  }}
                                />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </div>
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="w-full flex flex-col items-start gap-3">
                    <FormField
                      control={form.control}
                      name="title"
                      render={({ field }) => (
                        <FormItem className="w-full mb-5">
                          <FormLabel>{t('add.titleLabel')}</FormLabel>
                          <FormControl>
                            <Input
                              placeholder={t('add.titleHolder')}
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
                    <FormField
                      control={form.control}
                      name="skills"
                      render={() => (
                        <FormItem className="w-full">
                          <FormLabel>{t('add.skillsLabel')}</FormLabel>
                          <div className="flex flex-wrap gap-1.5 text-2sm text-muted-foreground border border-input rounded-md px-3 py-3 min-h-[100px]">
                            {selectedSkills.length > 0 ? (
                              selectedSkills.map((skillId) => {
                                const skill = skillsList?.find(
                                  (s) => s.id === skillId,
                                );
                                return (
                                  <Badge key={skillId} variant="secondary">
                                    {skill?.name}
                                    <BadgeButton
                                      onClick={() =>
                                        toggleSkillSelection(skillId)
                                      }
                                    >
                                      <X />
                                    </BadgeButton>
                                  </Badge>
                                );
                              })
                            ) : (
                              <span className="text-sm text-muted-foreground">
                                {t('add.skillsEmpty')}
                              </span>
                            )}
                          </div>
                          <div className="space-y-0 pt-1">
                            <FormControl>
                              <Popover>
                                <PopoverTrigger asChild>
                                  <Button variant="outline" role="combobox">
                                    {t('add.addSkills')}
                                  </Button>
                                </PopoverTrigger>
                                <PopoverContent
                                  className="w-[200px] p-0 m-0"
                                  align="start"
                                  side="bottom"
                                >
                                  <Command>
                                    <CommandInput placeholder={t('add.skillsSearchHolder')} />
                                    <CommandList>
                                      <CommandEmpty>
                                        {t('add.skillsNotFound')}
                                      </CommandEmpty>
                                      <CommandGroup>
                                        <ScrollArea className="h-[200px]">
                                          {skillsList?.map((skill) => (
                                            <CommandItem
                                              key={skill.id}
                                              onSelect={() =>
                                                toggleSkillSelection(skill.id)
                                              }
                                            >
                                              <span className="grow">
                                                {skill.name}
                                              </span>
                                              <CommandCheck
                                                className={cn(
                                                  selectedSkills.includes(
                                                    skill.id,
                                                  )
                                                    ? 'opacity-100'
                                                    : 'opacity-0',
                                                )}
                                              />
                                            </CommandItem>
                                          ))}
                                        </ScrollArea>
                                      </CommandGroup>
                                    </CommandList>
                                  </Command>
                                </PopoverContent>
                              </Popover>
                            </FormControl>
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              )}
            </form>
          </Form>
        </ScrollArea>
        <DialogFooter>
          {step === 1 ? (
            <Button variant="outline" onClick={closeDialog}>
              {t('cancelBtn')}
            </Button>
          ) : (
            <Button variant="outline" onClick={handleBackStep}>
              {t('add.backBtn')}
            </Button>
          )}
          <Button
            type="button"
            onClick={handleContinue}
            disabled={mutation.status === 'pending'}
          >
            {mutation.status === 'pending' && (
              <Spinner className="animate-spin" />
            )}
            {step === 2 ? t('add.submitBtn') : t('add.continueBtn')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ProjectAddDialog;
