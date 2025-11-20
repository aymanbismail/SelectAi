'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

interface FloatingInputProps extends React.ComponentProps<'input'> {
  label: string;
  isRTL?: boolean;
}

const FloatingInput = React.forwardRef<HTMLInputElement, FloatingInputProps>(
  ({ className, label, type = 'text', isRTL = false, ...props }, ref) => {
    const [isFocused, setIsFocused] = React.useState(false);
    const [hasValue, setHasValue] = React.useState(false);

    const handleFocus = () => setIsFocused(true);
    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(false);
      setHasValue(!!e.target.value);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setHasValue(!!e.target.value);
      props.onChange?.(e);
    };

    React.useEffect(() => {
      setHasValue(!!props.value || !!props.defaultValue);
    }, [props.value, props.defaultValue]);

    return (
      <div className='relative'>
        <input
          type={type}
          ref={ref}
          className={cn(
            'peer border-input bg-background w-full rounded-lg border px-4 pt-6 pb-2 text-sm placeholder-transparent transition-colors',
            'focus:border-ring focus:ring-ring/20 focus:ring-2 focus:outline-none',
            'disabled:cursor-not-allowed disabled:opacity-50',
            isRTL && 'text-right',
            className
          )}
          placeholder={label}
          dir={isRTL ? 'rtl' : 'ltr'}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChange={handleChange}
          {...props}
        />
        <label
          className={cn(
            'text-muted-foreground pointer-events-none absolute top-4 text-sm transition-all duration-200',
            'peer-placeholder-shown:text-muted-foreground peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm',
            'peer-focus:text-foreground peer-focus:top-2 peer-focus:text-xs',
            (isFocused || hasValue) && 'text-foreground top-2 text-xs',
            isRTL ? 'right-4 peer-focus:right-4' : 'left-4 peer-focus:left-4'
          )}
        >
          {label}
        </label>
      </div>
    );
  }
);

FloatingInput.displayName = 'FloatingInput';

export { FloatingInput };
