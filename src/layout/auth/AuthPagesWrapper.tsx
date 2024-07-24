// import { AuthPagesLayoutBG1, AuthPagesLayoutBG2 } from '@/assets/svg';

function AuthPagesWrapper() {
  return (
    <div className="relative flex h-full flex-col items-center">
      <div className="space-y-8 pt-32">
        <p className="w-64 text-5xl font-medium">
          {/* Driving the <span className="text-primary">Future of Money</span> */}
        </p>
        <p className="w-72 text-primary">
          {/* Issue, manage and invest in assets on the Stablecoin Network from an intuitive platform in a single, seamless
          experience. */}
        </p>
      </div>
      {/* <AuthPagesLayoutBG1 className="absolute right-7 top-7 z-[-1]" />
      <AuthPagesLayoutBG2 className="absolute bottom-7 left-7 z-[-1]" /> */}
    </div>
  );
}

export default AuthPagesWrapper;
