import * as React from 'react';
import type { VariantProps } from 'class-variance-authority';
import { cva } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const InputVariants = cva(
  'flex w-full rounded-md border border-primary bg-baseColor px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      variant: {
        default: '',
        rounded: 'rounded-full border-none shadow-md px-4'
      },
      variantSize: {
        default: 'h-12',
        sm: 'h-8',
        lg: 'h-14'
      }
    },
    defaultVariants: {
      variant: 'default',
      variantSize: 'default'
    }
  }
);

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement>, VariantProps<typeof InputVariants> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, variant, variantSize, type, ...props }, ref) => {
    return (
      <input type={type} className={cn(InputVariants({ variant, variantSize, className }))} ref={ref} {...props} />
    );
  }
);
Input.displayName = 'Input';

export { Input, InputVariants };
