import { LogoSVG } from '@/assets/svg';
import { ThemeToggle } from '@/components/theme_toggle';
import { Link } from 'react-router-dom';
import AvatarMenu from './AvatarMenu';
import MobileMenu from './MobileMenu';

const Header = () => {
  return (
    <header className="flex justify-between py-4 sm:container max-sm:px-4 xl:max-w-full xl:px-24">
      <Link to="/">
        <LogoSVG className="max-sm:w-32" />
      </Link>
      <div className="flex items-center gap-5 align-middle">
        <ThemeToggle />
        <div className="hidden sm:inline">
          <AvatarMenu />
        </div>
        <MobileMenu />
      </div>
    </header>
  );
};

export default Header;
