import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Radio, RadioGroup } from '.';

const group = (props = {}) => (
  <RadioGroup label="Plan" {...props}>
    <Radio value="free" label="Free" />
    <Radio value="pro" label="Pro" description="Everything in Free, plus…" />
    <Radio value="team" label="Team" />
  </RadioGroup>
);

describe('Radio', () => {
  // The native element is the whole point: form participation, :checked in
  // CSS, correct announcement and roving focus all come for free.
  it('renders a real radio input', () => {
    render(<Radio label="Free" value="free" />);
    const input = screen.getByRole('radio', { name: 'Free' });
    expect(input.tagName).toBe('INPUT');
    expect(input).toHaveAttribute('type', 'radio');
  });

  it('associates the label and the description with the input', () => {
    render(<Radio label="Pro" description="Best value" value="pro" />);
    const input = screen.getByRole('radio', { name: 'Pro' });
    expect(input).toHaveAccessibleDescription('Best value');
  });

  // Validity belongs to the question, not to one of its answers: `radio` does
  // not support aria-invalid, so the styling is local and the semantics sit on
  // the group.
  it('styles an invalid radio without claiming the input is invalid', () => {
    render(<Radio label="Free" value="free" invalid />);
    const input = screen.getByRole('radio');
    expect(input).not.toHaveAttribute('aria-invalid');
    expect(input.className).toContain('border-error-base');
  });
});

describe('RadioGroup', () => {
  it('is a named radiogroup', () => {
    render(group());
    expect(
      screen.getByRole('radiogroup', { name: 'Plan' }),
    ).toBeInTheDocument();
  });

  it('reports the value the user picked', async () => {
    const onValueChange = vi.fn();
    render(group({ onValueChange }));
    await userEvent.click(screen.getByRole('radio', { name: 'Pro' }));
    expect(onValueChange).toHaveBeenCalledWith('pro');
  });

  it('works uncontrolled', async () => {
    render(group({ defaultValue: 'free' }));
    expect(screen.getByRole('radio', { name: 'Free' })).toBeChecked();
    await userEvent.click(screen.getByRole('radio', { name: 'Team' }));
    expect(screen.getByRole('radio', { name: 'Team' })).toBeChecked();
    expect(screen.getByRole('radio', { name: 'Free' })).not.toBeChecked();
  });

  it('respects a controlled value', async () => {
    render(group({ value: 'pro' }));
    expect(screen.getByRole('radio', { name: 'Pro' })).toBeChecked();
    await userEvent.click(screen.getByRole('radio', { name: 'Team' }));
    expect(screen.getByRole('radio', { name: 'Pro' })).toBeChecked();
  });

  // Two groups without distinct names are one group as far as the browser is
  // concerned, so selecting in the second silently clears the first.
  it('gives every group its own name', () => {
    render(
      <>
        {group()}
        {group()}
      </>,
    );
    const names = screen
      .getAllByRole('radio')
      .map((input) => input.getAttribute('name'));
    expect(new Set(names).size).toBe(2);
  });

  it('marks the group invalid', () => {
    render(group({ invalid: true }));
    expect(screen.getByRole('radiogroup')).toHaveAttribute(
      'aria-invalid',
      'true',
    );
  });

  it('disables every radio at once', () => {
    render(group({ disabled: true }));
    screen
      .getAllByRole('radio')
      .forEach((input) => expect(input).toBeDisabled());
  });

  // Browsers move between radios of one name with the arrow keys. Rebuilding
  // that by hand is where hand-rolled radios usually go wrong.
  it("keeps the browser's roving focus behaviour", async () => {
    render(group({ defaultValue: 'free' }));
    await userEvent.tab();
    expect(screen.getByRole('radio', { name: 'Free' })).toHaveFocus();
    await userEvent.keyboard('{ArrowDown}');
    expect(screen.getByRole('radio', { name: 'Pro' })).toBeChecked();
  });
});
