import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Tooltip } from '.';

const trigger = (props = {}) => (
  <Tooltip content="Copies the invoice number" delay={0} {...props}>
    <button type="button">Copy</button>
  </Tooltip>
);

describe('Tooltip', () => {
  it('stays closed until something asks for it', () => {
    render(trigger());
    expect(screen.queryByRole('tooltip')).toBeNull();
  });

  it('opens on hover', async () => {
    render(trigger());
    await userEvent.hover(screen.getByRole('button'));
    await waitFor(() =>
      expect(screen.getByRole('tooltip')).toHaveTextContent(
        'Copies the invoice number',
      ),
    );
  });

  // A tooltip that only opens on mouseenter does not exist for a keyboard
  // user — the most common way this component is built wrong.
  it('opens on focus', async () => {
    render(trigger());
    await userEvent.tab();
    expect(screen.getByRole('button')).toHaveFocus();
    await waitFor(() =>
      expect(screen.getByRole('tooltip')).toBeInTheDocument(),
    );
  });

  it('closes on Escape without moving focus', async () => {
    render(trigger());
    await userEvent.tab();
    await waitFor(() =>
      expect(screen.getByRole('tooltip')).toBeInTheDocument(),
    );
    await userEvent.keyboard('{Escape}');
    expect(screen.queryByRole('tooltip')).toBeNull();
    expect(screen.getByRole('button')).toHaveFocus();
  });

  it('closes when the pointer leaves', async () => {
    render(trigger());
    const button = screen.getByRole('button');
    await userEvent.hover(button);
    await waitFor(() =>
      expect(screen.getByRole('tooltip')).toBeInTheDocument(),
    );
    await userEvent.unhover(button);
    expect(screen.queryByRole('tooltip')).toBeNull();
  });

  // It describes, it does not name: an icon-only button still needs its own
  // aria-label, because a description is announced later or not at all.
  it('describes the trigger rather than naming it', async () => {
    render(trigger());
    const button = screen.getByRole('button');
    await userEvent.hover(button);
    await waitFor(() =>
      expect(button).toHaveAccessibleDescription('Copies the invoice number'),
    );
    expect(button).toHaveAccessibleName('Copy');
  });

  it('drops aria-describedby again once closed', async () => {
    render(trigger());
    const button = screen.getByRole('button');
    await userEvent.hover(button);
    await waitFor(() =>
      expect(screen.getByRole('tooltip')).toBeInTheDocument(),
    );
    await userEvent.unhover(button);
    expect(button).not.toHaveAttribute('aria-describedby');
  });

  it('keeps the trigger own handlers working', async () => {
    const onClick = vi.fn();
    render(
      <Tooltip content="Copies it" delay={0}>
        <button type="button" onClick={onClick}>
          Copy
        </button>
      </Tooltip>,
    );
    await userEvent.click(screen.getByRole('button'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('can be controlled', () => {
    render(trigger({ open: true }));
    expect(screen.getByRole('tooltip')).toBeInTheDocument();
  });

  it('stays quiet while disabled', async () => {
    render(trigger({ disabled: true }));
    await userEvent.hover(screen.getByRole('button'));
    expect(screen.queryByRole('tooltip')).toBeNull();
  });
});
