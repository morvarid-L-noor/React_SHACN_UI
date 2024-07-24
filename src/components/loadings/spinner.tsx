import { SpinnerLogoSVG } from '@/assets/svg';

const Spinner = () => {
  return (
    <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 items-center justify-center md:translate-x-1/2">
      <div className="relative">
        <div className="h-24 w-24 rounded-full border-b-8 border-t-8 border-gray-300 dark:border-gray-600">
          <SpinnerLogoSVG className=" absolute left-0 top-0 h-24 w-24 translate-x-6" />
        </div>
        <div className="absolute left-0 top-0 h-24 w-24 animate-spin rounded-full border-b-8 border-t-8 border-primary"></div>
      </div>
    </div>
  );
};

export default Spinner;
