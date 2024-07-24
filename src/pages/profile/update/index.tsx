import PageHeader from '@/components/page_header';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import type { TProfileUpdateParameters } from '@/lib/schemas/profile';
import { ProfileUpdateFormSchema } from '@/lib/schemas/profile';
import { apiRoutes } from '@/routes/api';
import { privatePaths } from '@/routes/client-paths';
import { updateProfileRequest, uploadProfilePicToS3Request, useGetProfileQuery } from '@/services/dataServices/profile';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const ProfileUpdatePage = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { t } = useTranslation();
  const [updateProfilePicToastId, setUpdateProfilePicToastId] = useState<string | number>('' as string | number);
  // Load Initial Profile Data
  const { data, isPending: isProfileDataPending } = useGetProfileQuery();
  const { mutate: updateProfilePic, isPending: isProfilePicPending } = useMutation({
    mutationFn: uploadProfilePicToS3Request,
    onSuccess: ({ profilePicURL }) => {
      if (!profilePicURL) return;
      toast.success('Profile picture updated successfully', { id: updateProfilePicToastId });
      queryClient.invalidateQueries({ queryKey: [apiRoutes.profile.GET] }).catch(console.error);
    },
    onError: (error) => {
      toast.error(error.message);
    }
  });
  // Form Initialization
  const form = useForm<TProfileUpdateParameters>({
    resolver: zodResolver(ProfileUpdateFormSchema),
    defaultValues: {
      firstName: data?.firstName,
      lastName: data?.lastName,
      email: data?.email,
      roleId: data?.role,
      timezone: 'GMT',
      logoutTimeout: '1000',
      organizationName: data?.corporateId?.name,
      legalName: data?.corporateId?.legalName,
      websiteURL: data?.corporateId?.websiteURL,
      entityAddress: data?.corporateId?.entityAddress
    }
  });

  // Upload Profile Picture
  const onSelectProfilePicFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const maxSize = 300 * 1024; // 300kb
    if (file.size > maxSize) {
      toast.error('File is too large, please select a file smaller than 300KB.');
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      const updateProfilePicToastId = toast.loading('Uploading profile picture...');
      setUpdateProfilePicToastId(updateProfilePicToastId);
      updateProfilePic({ profilepic: base64String });
    };
    reader.readAsDataURL(file);
  };
  // Update Profile
  const { mutate: updateProfile, isPending: isUpdatePending } = useMutation({
    mutationFn: updateProfileRequest,
    onSuccess: (data) => {
      console.log(data);
      toast.success('Profile updated successfully');
      navigate(privatePaths.profile);
    },
    onError: () => {
      // toast.error(t(`errors.${error.message}`));
    }
  });
  const onFormSubmit = (formValues: TProfileUpdateParameters) => {
    updateProfile(formValues);
  };
  const onCancelButtonClick = () => {
    navigate(privatePaths.profile);
  };
  if (isProfileDataPending || !data) {
    return <Skeleton className="h-full"></Skeleton>;
  }
  return (
    <>
      <PageHeader description={t('edit_profile.page_description')} />
      <Card>
        <CardHeader>
          <div className="flex flex-wrap justify-between gap-5">
            <div className="flex items-center gap-5">
              <div className="rounded-full border-2 border-primary p-1">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={data?.profilepic} alt="Profile Picture" />
                  <AvatarFallback>{data.firstName?.[0] + data.lastName?.[0]}</AvatarFallback>
                </Avatar>
              </div>
              <Label
                htmlFor="profilepic"
                className="flex h-10 cursor-pointer items-center rounded-full border-2 border-primary px-3 py-2 text-base text-primary transition-colors duration-300 hover:bg-primary/20"
              >
                Update profile photo
              </Label>
              <Input
                accept="image/jpg,image/png"
                type="file"
                id="profilepic"
                className="hidden"
                disabled={isProfilePicPending}
                onChange={onSelectProfilePicFile}
              />
            </div>
            <div className="flex flex-col items-start justify-between sm:items-end">
              <Badge className="inline" variant="success">
                Verified
              </Badge>
              <p className="text-gray-400">Created Date : 2024</p>
            </div>
          </div>
        </CardHeader>
        <Separator />
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onFormSubmit)} className="">
            <CardContent className="grid grid-cols-12 gap-x-5 pt-5">
              <FormField
                defaultValue={data?.firstName}
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem className="relative col-span-12 pb-6 sm:col-span-6">
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your first name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                defaultValue={data?.lastName}
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem className="relative col-span-12 pb-6 sm:col-span-6">
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your last name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                defaultValue={data?.email}
                name="email"
                render={({ field }) => (
                  <FormItem className="relative col-span-12 pb-6 sm:col-span-9">
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input disabled placeholder="Enter your email address" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="roleId"
                defaultValue={data.role}
                render={({ field }) => (
                  <FormItem className="relative col-span-12 pb-6 sm:col-span-3">
                    <FormLabel>Role</FormLabel>
                    <Select value={field.value} disabled={true}>
                      <FormControl>
                        <SelectTrigger value={field.value}>
                          <SelectValue placeholder="Select a Role" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value={data.role}>{data.role}</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <Separator className="col-span-12" />
            <CardContent className="grid grid-cols-12 gap-x-5 pt-5">
              <FormField
                name="timezone"
                defaultValue="GMT"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="relative col-span-12 pb-6 sm:col-span-6">
                    <FormLabel>Timezone Preference</FormLabel>
                    <Select value={field.value} disabled={true}>
                      <FormControl>
                        <SelectTrigger value={field.value}>
                          <SelectValue placeholder="Select a Time Zone" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value={field.value}>GMT</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              ></FormField>
              <FormField
                name="logoutTimeout"
                control={form.control}
                defaultValue="1000"
                render={({ field }) => (
                  <FormItem className="relative col-span-12 pb-6 sm:col-span-6">
                    <FormLabel>Logout Timeout Preference</FormLabel>
                    <Select value={field.value} disabled={true}>
                      <FormControl>
                        <SelectTrigger value={field.value}>
                          <SelectValue placeholder="Select a logout option" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value={field.value}>15 min</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              ></FormField>
            </CardContent>
            <Separator className="col-span-12" />
            <CardContent className="grid grid-cols-12 gap-x-5 pt-5">
              <FormField
                defaultValue={data?.corporateId?.name}
                control={form.control}
                name="organizationName"
                render={({ field }) => (
                  <FormItem className="relative col-span-12 pb-6 sm:col-span-6">
                    <FormLabel>Organization Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your organization name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                defaultValue={data?.corporateId?.legalName}
                control={form.control}
                name="legalName"
                render={({ field }) => (
                  <FormItem className="relative col-span-12 pb-6 sm:col-span-6">
                    <FormLabel>Legal Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your organization legal name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                defaultValue={data?.corporateId?.websiteURL}
                control={form.control}
                name="websiteURL"
                render={({ field }) => (
                  <FormItem className="relative col-span-12 pb-6">
                    <FormLabel>Website URL</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your website URL" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                defaultValue={data?.corporateId?.entityAddress}
                control={form.control}
                name="entityAddress"
                render={({ field }) => (
                  <FormItem className="relative col-span-12 pb-6">
                    <FormLabel>Organization Address</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your organization address" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardContent className="col-span-12 flex justify-end gap-3">
              <Button type="submit" variant="primary" disabled={!form.formState.isDirty} loading={isUpdatePending}>
                {t('buttons.update')}
              </Button>
              <Button type="button" variant="secondary" onClick={onCancelButtonClick}>
                {t('buttons.cancel')}
              </Button>
            </CardContent>
          </form>
        </Form>
      </Card>
    </>
  );
};

export default ProfileUpdatePage;
