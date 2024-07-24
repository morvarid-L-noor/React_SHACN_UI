import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { privatePaths } from '@/routes/client-paths';
import { logout } from '@/services/dataServices/auth';
import { useGetProfileQuery } from '@/services/dataServices/profile';
import { ChevronDownIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const AvatarMenu = () => {
  const { data, isPending } = useGetProfileQuery();
  const { t } = useTranslation();

  if (data === undefined || isPending) {
    return <></>;
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center gap-2 p-0 font-normal outline-none">
        <div className="rounded-full border-primary p-0 sm:border-2 sm:p-1">
          <Avatar className="h-6 w-6 sm:h-10 sm:w-10">
            <AvatarImage src={data?.profilepic} alt="Profile Picture" />
            <AvatarFallback>{data?.firstName?.[0] + data?.lastName?.[0]}</AvatarFallback>
          </Avatar>
        </div>

        <div className="flex items-center gap-1">
          <span className="hidden text-sm sm:inline">{data?.firstName + ' ' + data?.lastName}</span>
          <ChevronDownIcon size={16} />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-48">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild className="cursor-pointer">
          <Link className="hover:text-primary" to={privatePaths.profile}>
            Profile
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild className="cursor-pointer">
          <Link to={privatePaths.settings}>Settings</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild className="cursor-pointer">
          <button onClick={logout} className="w-full">
            {t('buttons.logout')}
          </button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default AvatarMenu;
