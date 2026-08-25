import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { FilterBar, FilterChip, FilterList, FilterListItem } from '.';

describe('FilterBar', () => {
  it('is a named group', () => {
    render(
      <FilterBar label="Table filters">
        <FilterChip>Status</FilterChip>
      </FilterBar>,
    );
    expect(
      screen.getByRole('group', { name: 'Table filters' }),
    ).toBeInTheDocument();
  });
});

describe('FilterChip', () => {
  // A blue-tinted chip communicates nothing to a screen reader.
  it('announces the active state', () => {
    render(<FilterChip active>Status</FilterChip>);
    expect(screen.getByRole('button', { name: /Status/ })).toHaveAttribute(
      'aria-pressed',
      'true',
    );
  });

  // <button> inside <button> is invalid; browsers drop the inner one and the
  // clear target silently stops working.
  it('renders clear as a sibling button, not a nested one', async () => {
    const user = userEvent.setup();
    const onClear = vi.fn();
    render(
      <FilterChip active value="Active" onClear={onClear} clearLabel="Clear">
        Status
      </FilterChip>,
    );
    const clear = screen.getByRole('button', { name: 'Clear' });
    expect(clear.closest('button')).toBe(clear);
    await user.click(clear);
    expect(onClear).toHaveBeenCalledOnce();
  });

  it('hides clear when no value is set', () => {
    render(
      <FilterChip onClear={vi.fn()} clearLabel="Clear">
        Status
      </FilterChip>,
    );
    expect(screen.queryByRole('button', { name: 'Clear' })).toBeNull();
  });
});

describe('FilterListItem', () => {
  it('announces the active state and reports clicks', async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(
      <FilterList label="Status">
        <FilterListItem active count={42} onClick={onClick}>
          Active
        </FilterListItem>
      </FilterList>,
    );
    const item = screen.getByRole('button', { name: /Active/ });
    expect(item).toHaveAttribute('aria-pressed', 'true');
    await user.click(item);
    expect(onClick).toHaveBeenCalledOnce();
  });
});
