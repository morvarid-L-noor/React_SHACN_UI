import Spinner from '@/components/loadings/spinner';
import ChangePasswordModal from '@/components/modals/ChangePasswordModal';
import PageHeader from '@/components/page_header';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { formatDate } from '@/lib/utils';
import { privatePaths } from '@/routes/client-paths';
import { useGetProfileQuery } from '@/services/dataServices/profile';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';

const ProfilePage = () => {
  const { t } = useTranslation();
  const [isChangePasswordModalOpen, setIsChangePasswordModalOpen] = useState<boolean>(false);
  const onToggleChangePasswordModal = () => {
    setIsChangePasswordModalOpen((s) => !s);
  };
  const { data, error, isPending } = useGetProfileQuery();
  if (error) {
    toast.error(error.message);
  }
  return (
    <>
      <PageHeader description={t('profile.page_description')} />
      {isPending || !data ? (
        <Spinner />
      ) : (
        <Card>
          <CardHeader>
            <div className="flex flex-wrap justify-between space-y-3">
              <div className="flex items-center gap-5">
                <div className="rounded-full border-2 border-primary p-1">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={data?.profilepic} alt="avatar" />
                    <AvatarFallback>
                      {data?.firstName?.[0]}
                      {data?.lastName?.[0]}
                    </AvatarFallback>
                  </Avatar>
                </div>
                <div className="flex flex-col gap-2">
                  <p className="text-2xl">{data?.firstName + ' ' + data?.lastName}</p>
                  <p>No Data</p>
                </div>
              </div>
              <div className="flex flex-col justify-between space-y-3">
                <div className="space-x-2">
                  <Link to={privatePaths.editProfile}>
                    <Button variant="secondary" size="sm">
                      {t('buttons.edit')}
                    </Button>
                  </Link>
                  <Button variant="secondary" size="sm" onClick={onToggleChangePasswordModal}>
                    {t('profile.change_password')}
                  </Button>
                </div>
                <p className="text-sm text-subtitle">
                  Created Date : {formatDate(data?.createdAt, 'DD MMM YYYY | HH:mm')}
                </p>
              </div>
            </div>
          </CardHeader>
          <Separator />
          <CardContent className="flex flex-wrap pt-5">
            <div className="w-full space-y-3 lg:w-1/2">
              <div>
                <p className="text-gray-400">Email</p>
                <p>{data?.email}</p>
              </div>
              <div>
                <p className="text-gray-400">Date of birth</p>
                <p>{formatDate('08/01/1991')}</p>
              </div>
              <div>
                <p className="text-gray-400">Mobile number</p>
                <p>(581) 418-5566</p>
              </div>
              <div>
                <p className="text-gray-400">Street name</p>
                <p>No Data</p>
              </div>
              <div className="flex gap-5">
                <div>
                  <p className="text-gray-400">Zip code</p>
                  <p>No Data</p>
                </div>
                <div>
                  <p className="text-gray-400">City name</p>
                  <p>No Data</p>
                </div>
              </div>
            </div>
            <div className="w-full space-y-3 lg:w-1/2">
              <p className="text-lg font-medium">Preferences</p>
              <div className="text-sm">
                <p className="text-gray-400">TimeZone</p>
                <p>(GMT+5:30) New Delhi</p>
              </div>
              <div className="text-sm">
                <p className="text-gray-400">Logout Timeout</p>
                <p>15 Minutes</p>
              </div>
              <p className="text-lg font-medium">My Organization</p>
              <div className="flex flex-wrap gap-10">
                <div className="text-sm">
                  <p className="text-gray-400">Name</p>
                  <p>{data?.corporateId?.name ?? 'Not Defined Yet'}</p>
                </div>
                <div className="text-sm">
                  <p className="text-gray-400">Legal Name</p>
                  <p>{data?.corporateId?.legalName ?? 'Not Defined Yet'}</p>
                </div>
              </div>

              <div className="text-sm">
                <p className="text-gray-400">Website</p>
                <p>{data?.corporateId?.websiteURL ?? 'Not Defined Yet'}</p>
              </div>
              <div className="text-sm">
                <p className="text-gray-400">Address</p>
                <p>{data?.corporateId?.entityAddress ?? 'Not Defined Yet'}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
      <ChangePasswordModal open={isChangePasswordModalOpen} toggle={onToggleChangePasswordModal} />
    </>
  );
};

export default ProfilePage;
