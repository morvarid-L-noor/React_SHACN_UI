import { LogoSVG } from '@/assets/svg';
import { useRouteError } from 'react-router-dom';

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div className="flex h-screen flex-col items-center justify-center gap-2">
      <LogoSVG />
      <p className="text-3xl font-bold">Oops!</p>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        {/* @ts-expect-error error is of type unknown */}
        <i>{error.statusText || error.message || ''}</i>
      </p>
    </div>
  );
}
