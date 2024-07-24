import { LogoutIcon } from '@/assets/svg';
import { logout } from '@/services/dataServices/auth';
import { useTranslation } from 'react-i18next';
import { BottomNavLinks, MiddleNavLinks, TopNavLinks } from './NavLinks';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

function SideMenu() {
  const { t } = useTranslation();
  return (
    <div className="space-y-2 text-nowrap">
      <div className="space-y-1 rounded-md bg-card p-1 text-sm">
        <TopNavLinks />
      </div>
      <div className="space-y-1 rounded-md bg-card p-1 text-sm">
        <MiddleNavLinks />
      </div>
      <div className="space-y-1 rounded-md bg-card p-1 text-sm">
        <BottomNavLinks />
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              className="flex w-full cursor-pointer items-center gap-2 rounded-md px-7 py-4 transition-colors duration-300 hover:bg-muted hover:text-primary"
              onClick={logout}
            >
              <LogoutIcon className="max-h-7 max-w-7 text-primary" />
              <span className="hidden md:inline">{t('buttons.logout')}</span>
            </button>
          </TooltipTrigger>
          <TooltipContent side="right" sideOffset={5}>
            {t('buttons.logout')}
          </TooltipContent>
        </Tooltip>
      </div>
    </div>
  );
}

export default SideMenu;
