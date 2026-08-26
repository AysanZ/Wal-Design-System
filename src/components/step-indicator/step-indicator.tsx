import {
  Children,
  createContext,
  forwardRef,
  isValidElement,
  useContext,
} from 'react';
import { RiCheckLine, RiCloseLine } from '@remixicon/react';
import { cn } from '../../lib/cn';
import { useDirection } from '../../providers/direction';
import { formatNumber } from '../../lib/numerals';
import { Icon } from '../icon';
import {
  stepIndicatorVariants,
  stepItemVariants,
  stepMarkerVariants,
  stepConnectorVariants,
  stepLabelVariants,
  stepDescriptionVariants,
} from './step-indicator.styles';
import type {
  StepIndicatorProps,
  StepProps,
  StepIndicatorLabels,
  StepStatus,
} from './step-indicator.types';

interface StepContextValue {
  index: number;
  total: number;
  value: number;
  orientation: NonNullable<StepIndicatorProps['orientation']>;
  type: NonNullable<StepIndicatorProps['type']>;
  size: NonNullable<StepIndicatorProps['size']>;
  locale: string;
  labels: Required<StepIndicatorLabels>;
}

const StepContext = createContext<StepContextValue | null>(null);

const DEFAULT_LABELS: Required<StepIndicatorLabels> = {
  root: 'Progress',
  step: (index, total) => `Step ${index} of ${total}`,
  complete: 'completed',
  current: 'current',
  upcoming: 'upcoming',
  error: 'error',
};

function statusFor(index: number, value: number): StepStatus {
  if (index < value) return 'complete';
  if (index === value) return 'current';
  return 'upcoming';
}

/**
 * Where the user is in a multi-step flow.
 *
 * ## Semantics
 *
 * A named `<nav>` around an ordered list, because the order carries meaning,
 * with `aria-current="step"` on the one in progress. Each step also carries a
 * visually hidden state word — "completed", "current", "upcoming" — since the
 * three are otherwise told apart by a tick and two shades of the same colour,
 * which is nothing at all to a screen reader and very little to a colour-blind
 * user. The connectors are decorative and hidden.
 *
 * ## RTL
 *
 * The flow runs right-to-left in Persian for free: the connectors are flex
 * children, so the row reverses with the direction and the tick still lands on
 * the steps behind the user rather than ahead of them. Step numbers are
 * formatted through `Intl`.
 */
export const StepIndicator = forwardRef<HTMLElement, StepIndicatorProps>(
  function StepIndicator(
    {
      children,
      value = 0,
      orientation = 'horizontal',
      type = 'number',
      size = 'md',
      locale: localeProp,
      labels,
      className,
      ...rest
    },
    ref,
  ) {
    const { locale: ambientLocale } = useDirection();
    const locale = localeProp ?? ambientLocale;
    const text = { ...DEFAULT_LABELS, ...labels };

    const steps = Children.toArray(children).filter(isValidElement);

    return (
      <nav ref={ref} aria-label={text.root} className={className} {...rest}>
        <ol className={stepIndicatorVariants({ orientation })}>
          {steps.map((step, index) => (
            <StepContext.Provider
              key={index}
              value={{
                index,
                total: steps.length,
                value,
                orientation,
                type,
                size,
                locale,
                labels: text,
              }}
            >
              {step}
            </StepContext.Provider>
          ))}
        </ol>
      </nav>
    );
  },
);

/**
 * One step.
 *
 * `onSelect` turns it into a real `<button>`, for a wizard whose earlier steps
 * can be revisited. Without it the step is inert text rather than a control
 * that looks clickable and does nothing.
 */
export const Step = forwardRef<HTMLLIElement, StepProps>(function Step(
  {
    label,
    description,
    status: statusProp,
    icon,
    onSelect,
    className,
    children,
    type: buttonType,
    disabled,
    ...rest
  },
  ref,
) {
  const context = useContext(StepContext);
  if (!context) {
    throw new Error('<Step> must be rendered inside <StepIndicator>.');
  }

  const { index, total, value, orientation, type, size, locale, labels } =
    context;
  const status = statusProp ?? statusFor(index, value);
  const isLast = index === total - 1;
  const format = (input: number) => formatNumber(input, { locale });

  const marker = (
    <span className={stepMarkerVariants({ type, size, status })}>
      {type === 'number' &&
        (icon ??
          (status === 'complete' ? (
            <Icon icon={RiCheckLine} />
          ) : status === 'error' ? (
            <Icon icon={RiCloseLine} />
          ) : (
            format(index + 1)
          )))}
    </span>
  );

  const body = (label != null || description != null || children != null) && (
    <span className="flex min-w-0 flex-col gap-0.5">
      {label != null && (
        <span className={stepLabelVariants({ size, status })}>{label}</span>
      )}
      {description != null && (
        <span className={stepDescriptionVariants()}>{description}</span>
      )}
      {children}
    </span>
  );

  // Not a tick and two shades of one colour: the state is also a word, hidden
  // from the layout and read aloud.
  const announcement = (
    <span className="sr-only">
      {`${labels.step(format(index + 1), format(total))}, ${labels[status]}`}
    </span>
  );

  const content =
    orientation === 'horizontal' ? (
      <>
        <span className="flex w-full items-center gap-2">
          {/* Half-width connectors either side keep the marker centred over
              its label, so the row does not drift as labels change length. */}
          <span
            aria-hidden
            className={cn(
              stepConnectorVariants({
                orientation,
                complete: index <= value,
              }),
              index === 0 && 'invisible',
            )}
          />
          {marker}
          <span
            aria-hidden
            className={cn(
              stepConnectorVariants({
                orientation,
                complete: index < value,
              }),
              isLast && 'invisible',
            )}
          />
        </span>
        {body}
      </>
    ) : (
      <>
        <span className="flex flex-col items-center gap-1.5">
          {marker}
          {!isLast && (
            <span
              aria-hidden
              className={stepConnectorVariants({
                orientation,
                complete: index < value,
              })}
            />
          )}
        </span>
        <span className={cn('flex flex-col gap-0.5', !isLast && 'pb-6')}>
          {body}
        </span>
      </>
    );

  const inner = (
    <>
      {announcement}
      {content}
    </>
  );

  return (
    <li
      ref={ref}
      aria-current={status === 'current' ? 'step' : undefined}
      className={cn(
        stepItemVariants({ orientation, interactive: Boolean(onSelect) }),
        className,
      )}
    >
      {onSelect ? (
        <button
          type={buttonType ?? 'button'}
          onClick={onSelect}
          disabled={disabled}
          className={cn(
            'flex w-full rounded-lg text-inherit',
            orientation === 'horizontal'
              ? 'flex-col items-center gap-2'
              : 'flex-row items-stretch gap-3 text-start',
            'cursor-pointer transition-opacity duration-150 hover:opacity-80',
            'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-base',
            'disabled:pointer-events-none disabled:opacity-60',
          )}
          {...rest}
        >
          {inner}
        </button>
      ) : (
        inner
      )}
    </li>
  );
});
