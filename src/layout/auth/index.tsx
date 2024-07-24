import { ThemeToggle } from '@/components/theme_toggle';
import { Outlet } from 'react-router-dom';
import AuthPagesWrapper from './AuthPagesWrapper';

function AuthPagesLayout() {
  return (
    <div className="relative flex min-h-screen flex-col">
      <main className="grid flex-1 grid-cols-12 text-foreground">
        <div className="col-span-5 hidden lg:block">
          <AuthPagesWrapper />
        </div>
        <div className="relative -z-[-2] col-span-12 flex flex-col gap-1 bg-white pb-5 md:container dark:bg-background max-sm:px-2 lg:col-span-7">
          <div className="flex-1">
            <div className="flex justify-end py-3">
              <ThemeToggle />
            </div>
            <Outlet />
          </div>
          <span className="self-start max-lg:self-center">
            © 2024
            <span className="ml-1 text-primary">Your Project Name</span>
          </span>
        </div>
      </main>
    </div>
  );
}

export default AuthPagesLayout;
