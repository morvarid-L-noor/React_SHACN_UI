// import { LayoutBackground } from '@/assets/svg';
import { useGetAllRoles } from '@/services/dataServices/references/role';
import { Outlet } from 'react-router-dom';
import Footer from './Footer';
import Header from './Header';
import SideMenu from './SideMenu';
import { useGetProfileQuery } from '@/services/dataServices/profile';

const Layout: React.FC = () => {
  useGetAllRoles();
  useGetProfileQuery();
  return (
    <div className="flex h-screen flex-col">
      <Header />
      <main className="flex flex-1 overflow-auto text-foreground xl:px-24">
        <div className="hidden sm:inline sm:pl-5 xl:pl-0">
          <SideMenu />
        </div>
        <div className="mx-auto overflow-auto pb-5 sm:container max-sm:px-3">
          <Outlet />
        </div>
      </main>
      <Footer />
      {/* <LayoutBackground className="absolute bottom-7 right-0 z-[-1]" /> */}
    </div>
  );
};

export default Layout;
