import { forwardRef, type ComponentPropsWithoutRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/cn';

/** Figma → Password Strength [1.0]: Empty | Weak | Moderate | Strong. */
export const passwordStrengthVariants = cva(
  'h-1 flex-1 rounded-full transition-colors',
  {
    variants: {
      filled: {
        true: '',
        false: 'bg-soft-200',
      },
      strength: {
        empty: '',
        weak: '',
        moderate: '',
        strong: '',
      },
    },
    compoundVariants: [
      { filled: true, strength: 'weak', class: 'bg-error-base' },
      { filled: true, strength: 'moderate', class: 'bg-warning-base' },
      { filled: true, strength: 'strong', class: 'bg-success-base' },
    ],
    defaultVariants: { filled: false, strength: 'empty' },
  },
);

type StrengthVariantProps = VariantProps<typeof passwordStrengthVariants>;
export type PasswordStrengthLevel = NonNullable<
  StrengthVariantProps['strength']
>;

const SEGMENTS: Record<PasswordStrengthLevel, number> = {
  empty: 0,
  weak: 1,
  moderate: 2,
  strong: 3,
};

export interface PasswordStrengthProps extends Omit<
  ComponentPropsWithoutRef<'div'>,
  'children'
> {
  strength?: PasswordStrengthLevel;
  /** Visible text beside the meter, e.g. "Strong password". */
  label?: string;
}

/**
 * Three-segment strength meter.
 *
 * The bars are `aria-hidden` and the meaning is carried by a `role="status"`
 * text label — colour alone fails both colour-blind users and screen readers,
 * and red/amber/green is the worst possible palette for the former.
 */
export const PasswordStrength = forwardRef<
  HTMLDivElement,
  PasswordStrengthProps
>(function PasswordStrength(
  { strength = 'empty', label, className, ...rest },
  ref,
) {
  const filled = SEGMENTS[strength];
  return (
    <div ref={ref} className={cn('flex flex-col gap-1.5', className)} {...rest}>
      <div aria-hidden className="flex items-center gap-1">
        {[0, 1, 2].map((index) => (
          <span
            key={index}
            className={passwordStrengthVariants({
              filled: index < filled,
              strength,
            })}
          />
        ))}
      </div>
      {label && (
        <span role="status" className="text-[12px] leading-4 text-sub-600">
          {label}
        </span>
      )}
    </div>
  );
});
