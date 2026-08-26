import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Switch } from '.';

describe('Switch', () => {
  // role="switch" on a checkbox keeps form participation, :checked in CSS and
  // Space to toggle, and changes only the announcement — "on" instead of
  // "checked".
  it('is a real checkbox announced as a switch', () => {
    render(<Switch label="Notifications" />);
    const input = screen.getByRole('switch', { name: 'Notifications' });
    expect(input.tagName).toBe('INPUT');
    expect(input).toHaveAttribute('type', 'checkbox');
  });

  it('reports the new state', async () => {
    const onCheckedChange = vi.fn();
    render(<Switch label="Notifications" onCheckedChange={onCheckedChange} />);
    await userEvent.click(screen.getByRole('switch'));
    expect(onCheckedChange).toHaveBeenCalledWith(true);
  });

  it('toggles with the keyboard', async () => {
    render(<Switch label="Notifications" />);
    const input = screen.getByRole('switch');
    input.focus();
    await userEvent.keyboard(' ');
    expect(input).toBeChecked();
  });

  it('works uncontrolled through the native input', async () => {
    render(<Switch label="Notifications" defaultChecked />);
    const input = screen.getByRole('switch');
    expect(input).toBeChecked();
    await userEvent.click(input);
    expect(input).not.toBeChecked();
  });

  it('respects a controlled checked prop', async () => {
    const onCheckedChange = vi.fn();
    render(
      <Switch
        label="Notifications"
        checked={false}
        onCheckedChange={onCheckedChange}
      />,
    );
    await userEvent.click(screen.getByRole('switch'));
    expect(onCheckedChange).toHaveBeenCalledWith(true);
    expect(screen.getByRole('switch')).not.toBeChecked();
  });

  it('associates the description with the input', () => {
    render(
      <Switch label="Notifications" description="Sent once a day at most" />,
    );
    expect(screen.getByRole('switch')).toHaveAccessibleDescription(
      'Sent once a day at most',
    );
  });

  it('does not fire while disabled', async () => {
    const onCheckedChange = vi.fn();
    render(
      <Switch
        label="Notifications"
        disabled
        onCheckedChange={onCheckedChange}
      />,
    );
    await userEvent.click(screen.getByRole('switch'));
    expect(onCheckedChange).not.toHaveBeenCalled();
  });

  it('still exposes the raw change event when asked', async () => {
    const onInputChange = vi.fn();
    render(<Switch label="Notifications" onInputChange={onInputChange} />);
    await userEvent.click(screen.getByRole('switch'));
    expect(onInputChange).toHaveBeenCalledTimes(1);
  });
});
