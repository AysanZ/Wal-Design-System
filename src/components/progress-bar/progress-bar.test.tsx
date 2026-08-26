import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ProgressBar, ProgressCircle } from '.';
import { DirectionProvider } from '../../providers/direction';

describe('ProgressBar', () => {
  it('is a real progressbar with live values', () => {
    render(<ProgressBar value={40} aria-label="Upload" />);
    const bar = screen.getByRole('progressbar', { name: 'Upload' });
    expect(bar).toHaveAttribute('aria-valuenow', '40');
    expect(bar).toHaveAttribute('aria-valuemin', '0');
    expect(bar).toHaveAttribute('aria-valuemax', '100');
  });

  it('takes its accessible name from the visible label', () => {
    render(<ProgressBar value={40} label="Storage used" />);
    expect(
      screen.getByRole('progressbar', { name: 'Storage used' }),
    ).toBeInTheDocument();
  });

  it('clamps out-of-range values', () => {
    const { rerender } = render(<ProgressBar value={140} aria-label="a" />);
    expect(screen.getByRole('progressbar')).toHaveAttribute(
      'aria-valuenow',
      '100',
    );

    rerender(<ProgressBar value={-20} aria-label="a" />);
    expect(screen.getByRole('progressbar')).toHaveAttribute(
      'aria-valuenow',
      '0',
    );
  });

  it('honours a non-percentage max', () => {
    render(<ProgressBar value={3} max={10} showValue aria-label="Files" />);
    expect(screen.getByRole('progressbar')).toHaveAttribute(
      'aria-valuemax',
      '10',
    );
    expect(screen.getByText('30%')).toBeInTheDocument();
  });

  // A bar that reports 40% while it knows nothing is worse than one that says
  // "busy", so indeterminate drops aria-valuenow entirely.
  it('reports busy rather than a made-up value while indeterminate', () => {
    render(<ProgressBar indeterminate aria-label="Loading" />);
    const bar = screen.getByRole('progressbar');
    expect(bar).not.toHaveAttribute('aria-valuenow');
    expect(bar).toHaveAttribute('aria-busy', 'true');
  });

  it('localizes the readout and the value text', () => {
    render(
      <DirectionProvider locale="fa" attributeTarget="self">
        <ProgressBar value={63} showValue label="بارگذاری" />
      </DirectionProvider>,
    );
    expect(screen.getByRole('progressbar')).toHaveAttribute(
      'aria-valuetext',
      '۶۳٪',
    );
  });

  it('lets the caller replace the readout entirely', () => {
    render(
      <ProgressBar value={30} valueLabel="3 of 10 files" aria-label="a" />,
    );
    expect(screen.getByText('3 of 10 files')).toBeInTheDocument();
  });
});

describe('ProgressCircle', () => {
  it('exposes the same values as the linear bar', () => {
    render(<ProgressCircle value={25} aria-label="Quota" />);
    const circle = screen.getByRole('progressbar', { name: 'Quota' });
    expect(circle).toHaveAttribute('aria-valuenow', '25');
    expect(screen.getByText('25%')).toBeInTheDocument();
  });

  it('hides its own graphics from assistive technology', () => {
    const { container } = render(<ProgressCircle value={25} aria-label="a" />);
    expect(container.querySelector('svg')).toHaveAttribute(
      'aria-hidden',
      'true',
    );
  });
});
