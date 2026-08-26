import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import type {
  StepIndicatorVariantProps,
  StepMarkerVariantProps,
} from './step-indicator.styles';

export type StepOrientation = NonNullable<
  StepIndicatorVariantProps['orientation']
>;
export type StepType = NonNullable<StepMarkerVariantProps['type']>;
export type StepSize = NonNullable<StepMarkerVariantProps['size']>;
export type StepStatus = NonNullable<StepMarkerVariantProps['status']>;

export interface StepIndicatorLabels {
  /** Accessible name for the landmark. */
  root?: string;
  /** How a step is announced, e.g. `` (n, total) => `مرحلهٔ ${n} از ${total}` ``. */
  step?: (index: string, total: string) => string;
  /** Appended for a finished step, so "done" is not carried by a tick alone. */
  complete?: string;
  current?: string;
  upcoming?: string;
  error?: string;
}

export interface StepIndicatorProps extends Omit<
  ComponentPropsWithoutRef<'nav'>,
  'children'
> {
  children: ReactNode;
  /** Index of the current step, 0-based. */
  value?: number;
  orientation?: StepOrientation;
  type?: StepType;
  size?: StepSize;
  /**
   * BCP-47 tag driving the step numbers (`'fa'` → ۲). Defaults to the ambient
   * locale from `WalProvider`.
   */
  locale?: string;
  labels?: StepIndicatorLabels;
}

export interface StepProps extends Omit<
  ComponentPropsWithoutRef<'button'>,
  'value'
> {
  label?: ReactNode;
  description?: ReactNode;
  /**
   * Overrides the state derived from the indicator's `value`. Use it for
   * `error`; the other three come from the position for free.
   */
  status?: StepStatus;
  /** Replaces the number or the tick. */
  icon?: ReactNode;
  /**
   * Makes the step a real button — for a wizard whose earlier steps can be
   * revisited. Without it the step is inert text, which is right when the flow
   * is strictly forward.
   */
  onSelect?: () => void;
}
