import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Alert } from '.';

describe('Alert', () => {
  // The previous version rendered a bare <div>: an alert after a failed
  // submit was completely silent for screen-reader users.
  it('announces errors assertively', () => {
    render(<Alert status="error" title="Could not save" />);
    const alert = screen.getByRole('alert');
    expect(alert).toHaveAttribute('aria-live', 'assertive');
  });

  it('announces success politely', () => {
    render(<Alert status="success" title="Saved" />);
    expect(screen.getByRole('status')).toHaveAttribute('aria-live', 'polite');
  });

  it('can be silenced for alerts present on first paint', () => {
    render(<Alert status="info" title="Static notice" urgency="off" />);
    expect(screen.getByRole('status')).toHaveAttribute('aria-live', 'off');
  });

  it('gives the close button an accessible name', async () => {
    const user = userEvent.setup();
    const onDismiss = vi.fn();
    render(
      <Alert
        status="info"
        title="Notice"
        dismissible
        dismissLabel="بستن"
        onDismiss={onDismiss}
      />,
    );

    await user.click(screen.getByRole('button', { name: 'بستن' }));
    expect(onDismiss).toHaveBeenCalledOnce();
  });

  it('renders actions as buttons or links', () => {
    render(
      <Alert
        status="error"
        title="Failed"
        actions={[{ label: 'Retry' }, { label: 'Docs', href: '/docs' }]}
      />,
    );

    expect(screen.getByRole('button', { name: 'Retry' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Docs' })).toHaveAttribute(
      'href',
      '/docs',
    );
  });
});
