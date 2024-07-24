import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { logout } from '@/services/dataServices/auth';
import { LogOut, MenuIcon } from 'lucide-react';
import { MobileMenuItems } from './NavLinks';
import { useAppDispatch, useAppSelector } from '@/app/store/hooks';
import { toggleMobileMenu } from '@/app/store/uiSlice';

const MobileMenu = () => {
  const isMobileMenuOpen = useAppSelector((state) => state.ui.isMobileMenuOpen);
  const dispatch = useAppDispatch();
  const toggleMobileSideMenu = () => {
    dispatch(toggleMobileMenu());
  };
  return (
    <Sheet open={isMobileMenuOpen} onOpenChange={toggleMobileSideMenu}>
      <SheetTrigger asChild>
        <button className="shrink-0 sm:hidden">
          <MenuIcon />
          <span className="sr-only">Toggle navigation menu</span>
        </button>
      </SheetTrigger>
      <SheetContent side="left" className="flex flex-col overflow-y-auto pt-12">
        <MobileMenuItems onLinksClick={toggleMobileSideMenu} />
        <button
          className="flex w-full cursor-pointer items-center gap-2 rounded-md px-7 py-4 transition-colors duration-300 hover:bg-primary/20 hover:text-primary"
          onClick={logout}
        >
          <i className="text-primary">
            <LogOut />
          </i>
          <span className="text-sm">Logout</span>
        </button>
      </SheetContent>
    </Sheet>
  );
};

export default MobileMenu;
