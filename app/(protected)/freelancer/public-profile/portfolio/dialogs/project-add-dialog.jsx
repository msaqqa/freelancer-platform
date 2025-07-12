'use client';

import { useEffect, useRef, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { Popover } from '@radix-ui/react-popover';
import { RiCheckboxCircleFill, RiErrorWarningFill } from '@remixicon/react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Trash2, X } from 'lucide-react';
import { useFieldArray, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { toAbsoluteUrl } from '@/lib/helpers';
import { cn } from '@/lib/utils';
import {
  addFreelancerPortfolio,
  getFreelancerPortfolioById,
  updateFreelancerPortfolio,
} from '@/services/freelancer/portfolio';
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

const ProjectAddDialog = ({ open, closeDialog, portfolioId }) => {
  const [step, setStep] = useState(1);
  const [coverImage, setCoverImage] = useState(null);
  const queryClient = useQueryClient();
  const [selectedTags, setSelectedTags] = useState([]);
  const projectCoverRef = useRef(null);
  const tagsList = [
    { id: 1, slug: 'test1' },
    { id: 2, slug: 'test2' },
    { id: 3, slug: 'test3' },
  ];

  const handleNextStep = () => {
    if (step < 3) {
      setStep(step + 1);
    }
  };

  const handleBackStep = () => {
    setStep(step - 1);
  };

  // get getFreelancerPortfolioById data from api
  const { data: portfolioData, isLoading: portfolioLoading } = useQuery({
    queryKey: ['portfolioId', portfolioId],
    queryFn: () => getFreelancerPortfolioById(portfolioId),
  });
  const portfolio = portfolioData?.data ?? {};

  // Form initialization with React Hook Form
  const form = useForm({
    // resolver: zodResolver(),
    defaultValues: {
      projectFields: [
        { type: 'text', value: '' },
        { type: 'image', file: '' },
      ],
      title: '',
      tags: [],
      projectCover: null,
    },
    mode: 'onSubmit',
  });

  // Reset form values when dialog is opened
  // useEffect(() => {
  //   if (open) {
  //     form.reset({
  //       title: portfolio?.title,
  //       projectFields: portfolio?.content_blocks,
  //       tags: portfolio?.tags,
  //       projectCover: portfolio?.main_image,
  //     });
  //   }
  // }, [form, open, portfolio]);

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
    const updateValues = {
      ...values,
      main_image: values.projectCover,
    };
    console.log('updateValues', values);
    mutation.mutate(values);
  };

  // Define the mutation for deleting the project
  const mutation = useMutation({
    mutationFn: async (values) => {
      const formData = new FormData();
      Object.keys(values).forEach((key) => {
        if (key === 'projectFields' && Array.isArray(values.projectFields)) {
          formData.append('content_blocks', values.projectFields);
        } else if (key !== 'projectFields') {
          formData.append(key, values[key]);
        }
      });

      let response;
      portfolioId
        ? (response = await updateFreelancerPortfolio(portfolioId, formData))
        : (response = await addFreelancerPortfolio(formData));
      return response;
    },
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

  const toggletagselection = (permissionId) => {
    setSelectedTags((prev) =>
      prev.includes(permissionId)
        ? prev.filter((id) => id !== permissionId)
        : [...prev, permissionId],
    );
  };

  const handleSetProjectCover = async (file) => {
    const pathImage = URL.createObjectURL(file);
    setCoverImage(pathImage);
    form.setValue('projectCover', file);
  };

  const stepStatus = step === 1 || step === 2;

  return (
    <Dialog open={open} onOpenChange={closeDialog}>
      <DialogContent
        variant="fullscreen"
        className="w-full max-w-[800px] mx-auto"
      >
        <DialogHeader className="pb-5 border-b border-border">
          <DialogTitle>
            {portfolioId ? 'Edit Portfolio' : 'Add Portfolio'}
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
                      Tell us more about your project
                    </p>
                  )}
                  {/* Render fields */}
                  {fields.map((item, index) => (
                    <div key={item.id} className="relative mb-5">
                      {item.type === 'text' ? (
                        <FormField
                          control={form.control}
                          name={`projectFields[${index}].value`}
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <InputWrapper>
                                  <Input
                                    placeholder={`Enter Text URL`}
                                    value={field.value}
                                    onChange={(e) => {
                                      field.onChange(e);
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
                            render={({ field }) => (
                              <FormItem>
                                <FormControl>
                                  <MediaButton
                                    title="Drop Your Files Here"
                                    description={
                                      index === 1
                                        ? 'Minimum 1600px width recommended. Max 10MB each'
                                        : null
                                    }
                                    instructions={
                                      index === 1
                                        ? [
                                            'High resolution images (png, jpg, gif)',
                                            'Only upload media you own the rights to',
                                          ]
                                        : null
                                    }
                                    variant={index === 1 ? 'primary' : 'mono'}
                                    data={item?.value}
                                    onChange={(val) => {
                                      field.onChange(val);
                                      index === 1 && handleSetProjectCover(val);
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
                  {step === 2 && (
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
                          <span>Add Image</span>
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
                          <span>Add Text</span>
                        </Button>
                      </div>
                    </div>
                  )}
                </>
              )}
              {step === 3 && (
                <div className="flex flex-wrap md:flex-nowrap gap-6 md:gap-10">
                  <div className="w-[40%]">
                    {/* Project Cover */}
                    <FormField
                      control={form.control}
                      name="projectCover"
                      render={() => (
                        <FormItem>
                          <FormLabel>Thumbnail preview</FormLabel>
                          <div className="w-full md:w-[300px] h-[200] overflow-hidden shrink-0">
                            <img
                              src={toAbsoluteUrl(coverImage)}
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
                                    Change the cover
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
                          <FormLabel>Title</FormLabel>
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
                    <FormField
                      control={form.control}
                      name="tags"
                      render={() => (
                        <FormItem className="w-full">
                          <FormLabel>Tags</FormLabel>
                          <div className="flex flex-wrap gap-1.5 text-2sm text-muted-foreground border border-input rounded-md px-3 py-3 min-h-[100px]">
                            {selectedTags.length > 0 ? (
                              selectedTags.map((permissionId) => {
                                const permission = tagsList?.find(
                                  (p) => p.id === permissionId,
                                );
                                return (
                                  <Badge key={permissionId} variant="secondary">
                                    {permission?.slug}
                                    <BadgeButton
                                      onClick={() =>
                                        toggletagselection(permissionId)
                                      }
                                    >
                                      <X />
                                    </BadgeButton>
                                  </Badge>
                                );
                              })
                            ) : (
                              <span className="text-sm text-muted-foreground">
                                Help clients find your project.
                              </span>
                            )}
                          </div>
                          <div className="space-y-0 pt-1">
                            <FormControl>
                              <Popover>
                                <PopoverTrigger asChild>
                                  <Button variant="outline" role="combobox">
                                    Add tags
                                  </Button>
                                </PopoverTrigger>
                                <PopoverContent
                                  className="w-[200px] p-0 m-0"
                                  align="start"
                                  side="bottom"
                                >
                                  <Command>
                                    <CommandInput placeholder="Search tags..." />
                                    <CommandList>
                                      <CommandEmpty>
                                        No tags found.
                                      </CommandEmpty>
                                      <CommandGroup>
                                        <ScrollArea className="h-[200px]">
                                          {tagsList?.map((permission) => (
                                            <CommandItem
                                              key={permission.id}
                                              onSelect={() =>
                                                toggletagselection(
                                                  permission.id,
                                                )
                                              }
                                            >
                                              <span className="grow">
                                                {permission.slug}
                                              </span>
                                              <CommandCheck
                                                className={cn(
                                                  selectedTags.includes(
                                                    permission.id,
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

              {/* <div className="flex justify-end">
                <Button
                  disabled={mutation.status === 'pending'}
                  className="text-end"
                >
                  {mutation.status === 'pending' && (
                    <Spinner className="animate-spin" />
                  )}
                  Continue
                </Button>
              </div> */}
            </form>
          </Form>
        </ScrollArea>
        <DialogFooter>
          {step === 1 ? (
            <Button variant="outline" onClick={closeDialog}>
              Cancel
            </Button>
          ) : (
            <Button variant="outline" onClick={handleBackStep}>
              Back
            </Button>
          )}
          <Button type="submit" onClick={handleNextStep}>
            Continue
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ProjectAddDialog;
