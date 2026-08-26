import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { RiAddLine } from '@remixicon/react';
import { QuickActions, QuickActionItem } from '.';
import { Icon } from '../icon';

describe('QuickActions', () => {
  it('is a named group of commands, not a list of content', () => {
    render(
      <QuickActions label="Quick actions">
        <QuickActionItem>New invoice</QuickActionItem>
      </QuickActions>,
    );
    expect(
      screen.getByRole('group', { name: 'Quick actions' }),
    ).toBeInTheDocument();
  });

  it('names the group from a visible title when there is one', () => {
    render(
      <QuickActions title="Shortcuts">
        <QuickActionItem>New invoice</QuickActionItem>
      </QuickActions>,
    );
    expect(
      screen.getByRole('group', { name: 'Shortcuts' }),
    ).toBeInTheDocument();
  });

  it('fires the action', async () => {
    const onClick = vi.fn();
    render(
      <QuickActions label="Quick actions">
        <QuickActionItem onClick={onClick}>New invoice</QuickActionItem>
      </QuickActions>,
    );
    await userEvent.click(screen.getByRole('button', { name: /New invoice/ }));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('announces the shortcut in effect', () => {
    render(<QuickActionItem active>New invoice</QuickActionItem>);
    expect(screen.getByRole('button')).toHaveAttribute('aria-pressed', 'true');
  });

  // Navigation has to be a link so it can be middle-clicked and copied; an
  // action belongs on a button. asChild renders one element, never <button><a>.
  it('renders a single element under asChild', () => {
    const { container } = render(
      <QuickActionItem asChild>
        <a href="/billing">Billing</a>
      </QuickActionItem>,
    );
    expect(screen.getByRole('link', { name: 'Billing' })).toBeInTheDocument();
    expect(container.querySelector('button')).toBeNull();
  });

  // The icon sits beside the label, so announcing it duplicates the output.
  it('keeps the icon and the shortcut hint decorative', () => {
    const { container } = render(
      <QuickActionItem icon={<Icon icon={RiAddLine} />} shortcut="⌘N">
        New invoice
      </QuickActionItem>,
    );
    const hidden = container.querySelectorAll('[aria-hidden="true"]');
    expect(hidden.length).toBeGreaterThanOrEqual(2);
    expect(
      screen.getByRole('button', { name: 'New invoice' }),
    ).toBeInTheDocument();
  });

  it('does not fire while disabled', async () => {
    const onClick = vi.fn();
    render(
      <QuickActionItem disabled onClick={onClick}>
        New invoice
      </QuickActionItem>,
    );
    await userEvent.click(screen.getByRole('button', { name: 'New invoice' }));
    expect(onClick).not.toHaveBeenCalled();
  });
});
