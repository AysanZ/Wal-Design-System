import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useState } from 'react';
import { Accordion, AccordionGroup } from '.';

describe('Accordion', () => {
  it('exposes a real button with correct ARIA wiring', () => {
    render(<Accordion title="Shipping" content="Two to three days." />);

    const trigger = screen.getByRole('button', { name: 'Shipping' });
    expect(trigger).toHaveAttribute('aria-expanded', 'false');

    const panelId = trigger.getAttribute('aria-controls');
    expect(panelId).toBeTruthy();
    expect(document.getElementById(panelId!)).toHaveAttribute(
      'aria-labelledby',
      trigger.id,
    );
  });

  // The old <section onClick> was completely unreachable this way.
  it('opens with the keyboard', async () => {
    const user = userEvent.setup();
    render(<Accordion title="Shipping" content="Two to three days." />);
    const trigger = screen.getByRole('button', { name: 'Shipping' });

    await user.tab();
    expect(trigger).toHaveFocus();

    await user.keyboard('{Enter}');
    expect(trigger).toHaveAttribute('aria-expanded', 'true');

    await user.keyboard(' ');
    expect(trigger).toHaveAttribute('aria-expanded', 'false');
  });

  it('honours defaultOpen while staying uncontrolled', async () => {
    const user = userEvent.setup();
    render(<Accordion title="Shipping" content="Body" defaultOpen />);
    const trigger = screen.getByRole('button', { name: 'Shipping' });

    expect(trigger).toHaveAttribute('aria-expanded', 'true');
    await user.click(trigger);
    expect(trigger).toHaveAttribute('aria-expanded', 'false');
  });

  // This is the regression test for the original bug: `isOpen` was fed to
  // useState as an initial value, so later parent updates were ignored.
  it('follows the parent when controlled', async () => {
    const user = userEvent.setup();

    function Harness() {
      const [open, setOpen] = useState(false);
      return (
        <>
          <button type="button" onClick={() => setOpen(true)}>
            open externally
          </button>
          <Accordion
            open={open}
            onOpenChange={setOpen}
            title="Shipping"
            content="Body"
          />
        </>
      );
    }

    render(<Harness />);
    const trigger = screen.getByRole('button', { name: 'Shipping' });
    expect(trigger).toHaveAttribute('aria-expanded', 'false');

    await user.click(screen.getByRole('button', { name: 'open externally' }));
    expect(trigger).toHaveAttribute('aria-expanded', 'true');
  });

  it('does not respond when disabled', async () => {
    const user = userEvent.setup();
    const onOpenChange = vi.fn();
    render(
      <Accordion
        title="Shipping"
        content="Body"
        disabled
        onOpenChange={onOpenChange}
      />,
    );

    const trigger = screen.getByRole('button', { name: 'Shipping' });
    expect(trigger).toBeDisabled();
    await user.click(trigger);
    expect(onOpenChange).not.toHaveBeenCalled();
  });

  it('closes siblings in a single-type group', async () => {
    const user = userEvent.setup();
    render(
      <AccordionGroup type="single">
        <Accordion id="a" title="First" content="A" />
        <Accordion id="b" title="Second" content="B" />
      </AccordionGroup>,
    );

    const first = screen.getByRole('button', { name: 'First' });
    const second = screen.getByRole('button', { name: 'Second' });

    await user.click(first);
    expect(first).toHaveAttribute('aria-expanded', 'true');

    await user.click(second);
    expect(second).toHaveAttribute('aria-expanded', 'true');
    expect(first).toHaveAttribute('aria-expanded', 'false');
  });

  it('leaves siblings alone in a multiple-type group', async () => {
    const user = userEvent.setup();
    render(
      <AccordionGroup type="multiple">
        <Accordion id="a" title="First" content="A" />
        <Accordion id="b" title="Second" content="B" />
      </AccordionGroup>,
    );

    await user.click(screen.getByRole('button', { name: 'First' }));
    await user.click(screen.getByRole('button', { name: 'Second' }));

    expect(screen.getByRole('button', { name: 'First' })).toHaveAttribute(
      'aria-expanded',
      'true',
    );
  });
});
