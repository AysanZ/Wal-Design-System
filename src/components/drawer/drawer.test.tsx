import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Drawer } from '.';

const setup = (props = {}) =>
  render(
    <>
      <button type="button">outside</button>
      <Drawer
        open
        onOpenChange={vi.fn()}
        title="Settings"
        closeLabel="Close"
        {...props}
      >
        <button type="button">inside</button>
      </Drawer>
    </>,
  );

describe('Drawer', () => {
  it('is a labelled modal dialog', () => {
    setup();
    const dialog = screen.getByRole('dialog');
    expect(dialog).toHaveAttribute('aria-modal', 'true');
    expect(dialog).toHaveAccessibleName('Settings');
  });

  it('closes on Escape', async () => {
    const user = userEvent.setup();
    const onOpenChange = vi.fn();
    setup({ onOpenChange });
    await user.keyboard('{Escape}');
    expect(onOpenChange).toHaveBeenCalledWith(false);
  });

  it('closes from the close button', async () => {
    const user = userEvent.setup();
    const onOpenChange = vi.fn();
    setup({ onOpenChange });
    await user.click(screen.getByRole('button', { name: 'Close' }));
    expect(onOpenChange).toHaveBeenCalledWith(false);
  });

  // Without this, the page behind scrolls under the panel on mobile.
  it('locks background scroll while open', () => {
    setup();
    expect(document.body.style.overflow).toBe('hidden');
  });

  it('moves focus into the panel', () => {
    setup();
    expect(screen.getByRole('dialog').contains(document.activeElement)).toBe(
      true,
    );
  });

  it('renders nothing when closed', () => {
    render(<Drawer open={false} onOpenChange={vi.fn()} title="Settings" />);
    expect(screen.queryByRole('dialog')).toBeNull();
  });

  // A drawer that enters from the right and exits to the left is worse than
  // one that never animates.
  it('uses logical sides so the transform flips in RTL', () => {
    setup({ side: 'end' });
    const className = screen.getByRole('dialog').className;
    expect(className).toContain('end-0');
    expect(className).toContain('rtl:data-[state=closed]:-translate-x-full');
  });
});
