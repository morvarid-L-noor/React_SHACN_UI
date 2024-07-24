import { cn } from '@/lib/utils';
import Step from './Step';

export type StepItem = {
  stepLabel: string;
  stepNumber: number;
};
type Props = {
  items: Array<StepItem>;
  currentStep: number;
  className?: string;
};

const Steps = ({ currentStep, items, className, ...props }: Props) => {
  return (
    <div className={cn('flex flex-col gap-2', className)} {...props}>
      {items.map((item) => (
        <Step
          key={item.stepNumber}
          stepLabel={item.stepLabel}
          stepNumber={item.stepNumber}
          status={currentStep === item.stepNumber ? 'process' : currentStep > item.stepNumber ? 'finish' : 'wait'}
        />
      ))}
    </div>
  );
};

export default Steps;
