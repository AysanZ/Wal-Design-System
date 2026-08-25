import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {
  LinkButton,
  CompactButton,
  FancyButton,
  ButtonGroup,
  ButtonGroupItem,
} from '.';

describe('LinkButton', () => {
  // An <a> without href is not focusable and is not announced as actionable,
  // so it becomes a real button instead.
  it('renders a button when there is no href', () => {
    render(<LinkButton>Read</LinkButton>);
    expect(screen.getByRole('button', { name: 'Read' })).toBeInTheDocument();
  });

  it('renders a link when there is an href', () => {
    render(<LinkButton href="/docs">Read</LinkButton>);
    expect(screen.getByRole('link', { name: 'Read' })).toHaveAttribute(
      'href',
      '/docs',
    );
  });

  it('drops href and marks itself disabled when disabled', () => {
    render(
      <LinkButton href="/docs" disabled>
        Read
      </LinkButton>,
    );
    const link = screen.getByText('Read');
    expect(link).not.toHaveAttribute('href');
    expect(link).toHaveAttribute('aria-disabled', 'true');
  });

  it('inherits the container colour with color="inherit"', () => {
    render(
      <LinkButton color="inherit" href="#">
        Read
      </LinkButton>,
    );
    expect(screen.getByRole('link').className).toContain('text-inherit');
  });
});

describe('CompactButton', () => {
  it('carries the required accessible name', () => {
    render(
      <CompactButton aria-label="Close">
        <svg />
      </CompactButton>,
    );
    expect(screen.getByRole('button', { name: 'Close' })).toBeInTheDocument();
  });

  it('defaults to type="button"', () => {
    render(
      <CompactButton aria-label="Close">
        <svg />
      </CompactButton>,
    );
    expect(screen.getByRole('button')).toHaveAttribute('type', 'button');
  });
});

describe('FancyButton', () => {
  it('defaults to type="button" and honours disabled', async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(
      <FancyButton disabled onClick={onClick}>
        Go
      </FancyButton>,
    );
    const button = screen.getByRole('button', { name: 'Go' });
    expect(button).toHaveAttribute('type', 'button');
    await user.click(button);
    expect(onClick).not.toHaveBeenCalled();
  });
});

describe('ButtonGroup', () => {
  it('names the toolbar and announces the selected segment', () => {
    render(
      <ButtonGroup label="View">
        <ButtonGroupItem>Day</ButtonGroupItem>
        <ButtonGroupItem selected>Week</ButtonGroupItem>
      </ButtonGroup>,
    );
    expect(screen.getByRole('toolbar', { name: 'View' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Week' })).toHaveAttribute(
      'aria-pressed',
      'true',
    );
    expect(screen.getByRole('button', { name: 'Day' })).toHaveAttribute(
      'aria-pressed',
      'false',
    );
  });

  // Size on the group, not repeated on every item — the mismatch that produces
  // a row of buttons at two different heights.
  it('flows size down through context', () => {
    render(
      <ButtonGroup size="2xs" label="View">
        <ButtonGroupItem>Day</ButtonGroupItem>
      </ButtonGroup>,
    );
    expect(screen.getByRole('button', { name: 'Day' }).className).toContain(
      'h-6',
    );
  });

  it('collapses the shared border with a logical margin', () => {
    const { container } = render(
      <ButtonGroup label="View">
        <ButtonGroupItem>Day</ButtonGroupItem>
        <ButtonGroupItem>Week</ButtonGroupItem>
      </ButtonGroup>,
    );
    const group = container.querySelector('[role="toolbar"]')!;
    expect(group.className).toContain('-ms-px');
    expect(group.className).not.toContain('-ml-px');
  });
});
