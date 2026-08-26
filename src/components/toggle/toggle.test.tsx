import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Toggle, ToggleGroup } from '.';

describe('Toggle', () => {
  // "Pressed" and "on" are different sentences: one is an action with memory,
  // the other is a setting.
  it('announces itself as pressed, not as a switch', () => {
    render(<Toggle defaultPressed>Bold</Toggle>);
    const button = screen.getByRole('button', { name: 'Bold' });
    expect(button).toHaveAttribute('aria-pressed', 'true');
    expect(screen.queryByRole('switch')).toBeNull();
  });

  it('works uncontrolled', async () => {
    render(<Toggle>Bold</Toggle>);
    const button = screen.getByRole('button', { name: 'Bold' });
    expect(button).toHaveAttribute('aria-pressed', 'false');
    await userEvent.click(button);
    expect(button).toHaveAttribute('aria-pressed', 'true');
  });

  it('respects a controlled pressed prop', async () => {
    const onPressedChange = vi.fn();
    render(
      <Toggle pressed={false} onPressedChange={onPressedChange}>
        Bold
      </Toggle>,
    );
    await userEvent.click(screen.getByRole('button'));
    expect(onPressedChange).toHaveBeenCalledWith(true);
    expect(screen.getByRole('button')).toHaveAttribute('aria-pressed', 'false');
  });

  it('does not fire while disabled', async () => {
    const onPressedChange = vi.fn();
    render(
      <Toggle disabled onPressedChange={onPressedChange}>
        Bold
      </Toggle>,
    );
    await userEvent.click(screen.getByRole('button'));
    expect(onPressedChange).not.toHaveBeenCalled();
  });
});

describe('ToggleGroup', () => {
  const group = (props = {}) => (
    <ToggleGroup label="View" {...props}>
      <Toggle value="list">List</Toggle>
      <Toggle value="grid">Grid</Toggle>
      <Toggle value="board">Board</Toggle>
    </ToggleGroup>
  );

  it('is a named group', () => {
    render(group());
    expect(screen.getByRole('group', { name: 'View' })).toBeInTheDocument();
  });

  it('keeps one pressed in single mode', async () => {
    render(group({ defaultValue: 'list' }));
    await userEvent.click(screen.getByRole('button', { name: 'Grid' }));
    expect(screen.getByRole('button', { name: 'Grid' })).toHaveAttribute(
      'aria-pressed',
      'true',
    );
    expect(screen.getByRole('button', { name: 'List' })).toHaveAttribute(
      'aria-pressed',
      'false',
    );
  });

  // A view switcher with no view chosen is a state most screens cannot render.
  it('refuses to un-press the last one unless collapsible', async () => {
    const onValueChange = vi.fn();
    const { rerender } = render(group({ value: 'list', onValueChange }));
    await userEvent.click(screen.getByRole('button', { name: 'List' }));
    expect(onValueChange).not.toHaveBeenCalled();

    rerender(group({ value: 'list', onValueChange, collapsible: true }));
    await userEvent.click(screen.getByRole('button', { name: 'List' }));
    expect(onValueChange).toHaveBeenCalledWith('');
  });

  it('holds several values in multiple mode', async () => {
    const onValueChange = vi.fn();
    render(group({ type: 'multiple', value: ['list'], onValueChange }));
    await userEvent.click(screen.getByRole('button', { name: 'Grid' }));
    expect(onValueChange).toHaveBeenCalledWith(['list', 'grid']);
  });

  it('disables every toggle at once', () => {
    render(group({ disabled: true }));
    screen
      .getAllByRole('button')
      .forEach((button) => expect(button).toBeDisabled());
  });

  // Tabs use roving focus; a toolbar of toggles is a set of individual
  // actions, so each keeps its own tab stop.
  it('gives every toggle its own tab stop', async () => {
    render(group({ defaultValue: 'list' }));
    await userEvent.tab();
    expect(screen.getByRole('button', { name: 'List' })).toHaveFocus();
    await userEvent.tab();
    expect(screen.getByRole('button', { name: 'Grid' })).toHaveFocus();
  });
});
