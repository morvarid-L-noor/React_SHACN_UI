import { CheckIcon, PolygonSVG } from '@/assets/svg';
import { cn } from '@/lib/utils';

type Props = {
  status: 'process' | 'finish' | 'error' | 'wait';
  stepNumber?: number;
  stepLabel?: string;
};
function Step({ status, stepLabel = 'Title', stepNumber }: Readonly<Props>) {
  return (
    <div className="group flex flex-col items-center justify-center gap-2">
      <div className="relative flex items-center justify-center">
        <PolygonSVG
          className={cn({
            'text-[#8A8A8A]': status === 'process',
            'text-primary': status === 'finish',
            'text-red-500': status === 'error',
            'text-[#D1D3D4]': status === 'wait'
          })}
        />
        {status === 'finish' ? (
          <CheckIcon
            className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 text-background"
            width={15}
            height={15}
          />
        ) : (
          <span className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 text-background">
            {stepNumber}
          </span>
        )}
      </div>
      <p
        className={cn(
          {
            'text-[#8A8A8A]': status === 'process',
            'text-primary': status === 'finish',
            'text-red-500': status === 'error',
            'text-[#D1D3D4]': status === 'wait'
          },
          'text-sm font-medium'
        )}
      >
        {stepLabel}
      </p>
      <span className="h-6 w-[2px] -translate-x-1/2 bg-gray-300 group-last:hidden" />
    </div>
  );
}

export default Step;
