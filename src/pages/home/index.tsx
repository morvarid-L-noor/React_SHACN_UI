import Header from '@/layout/private/Header';
import { Footer } from 'react-day-picker';
import { Outlet } from 'react-router-dom';

const Dashboard = () => {
  return (
    <div>
      <div className="flex h-screen flex-col">
        <Header />
        <main className="flex flex-1 overflow-auto text-foreground xl:px-24">
          <div className="hidden sm:inline sm:pl-5 xl:pl-0"></div>
          <div className="mx-auto overflow-auto pb-5 sm:container max-sm:px-3">
            <Outlet />
          </div>
        </main>
        <Footer />
        {/* <LayoutBackground className="absolute bottom-7 right-0 z-[-1]" /> */}
      </div>
    </div>
  );
};
export default Dashboard;
