import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Dropdown } from '.';

const options = [
  { value: 'ir', label: 'Iran' },
  { value: 'de', label: 'Germany' },
  { value: 'jp', label: 'Japan', disabled: true },
];

describe('Dropdown', () => {
  it('is a labelled combobox', () => {
    render(<Dropdown options={options} label="Country" />);
    const trigger = screen.getByRole('combobox', { name: 'Country' });
    expect(trigger).toHaveAttribute('aria-expanded', 'false');
    expect(trigger).toHaveAttribute('aria-haspopup', 'listbox');
  });

  it('opens and selects with the mouse', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<Dropdown options={options} label="Country" onChange={onChange} />);
    await user.click(screen.getByRole('combobox'));
    await user.click(screen.getByRole('option', { name: 'Germany' }));
    expect(onChange).toHaveBeenCalledWith('de');
  });

  // Rich item content is the only reason not to use a native <select>, so the
  // keyboard contract has to be rebuilt to match.
  it('opens and commits with the keyboard', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<Dropdown options={options} label="Country" onChange={onChange} />);
    screen.getByRole('combobox').focus();
    await user.keyboard('{ArrowDown}');
    expect(screen.getByRole('combobox')).toHaveAttribute(
      'aria-expanded',
      'true',
    );
    await user.keyboard('{ArrowDown}{Enter}');
    expect(onChange).toHaveBeenCalledWith('de');
  });

  it('skips disabled options when moving the cursor', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<Dropdown options={options} label="Country" onChange={onChange} />);
    screen.getByRole('combobox').focus();
    await user.keyboard('{ArrowDown}{ArrowDown}{ArrowDown}{Enter}');
    expect(onChange).not.toHaveBeenCalledWith('jp');
  });

  it('closes on Escape', async () => {
    const user = userEvent.setup();
    render(<Dropdown options={options} label="Country" />);
    await user.click(screen.getByRole('combobox'));
    await user.keyboard('{Escape}');
    expect(screen.getByRole('combobox')).toHaveAttribute(
      'aria-expanded',
      'false',
    );
  });

  it('filters when searchable', async () => {
    const user = userEvent.setup();
    render(
      <Dropdown
        searchable
        options={options}
        label="Country"
        searchPlaceholder="Search"
      />,
    );
    await user.click(screen.getByRole('combobox'));
    await user.type(screen.getByPlaceholderText('Search'), 'ger');
    expect(screen.getByRole('option', { name: /Germany/ })).toBeInTheDocument();
    expect(screen.queryByRole('option', { name: /Iran/ })).toBeNull();
  });

  it('shows the empty message when nothing matches', async () => {
    const user = userEvent.setup();
    render(
      <Dropdown
        searchable
        options={options}
        label="Country"
        searchPlaceholder="Search"
        emptyMessage="No results"
      />,
    );
    await user.click(screen.getByRole('combobox'));
    await user.type(screen.getByPlaceholderText('Search'), 'zzz');
    expect(screen.getByText('No results')).toBeInTheDocument();
  });

  it('marks the selected option', async () => {
    const user = userEvent.setup();
    render(<Dropdown options={options} label="Country" defaultValue="ir" />);
    await user.click(screen.getByRole('combobox'));
    expect(screen.getByRole('option', { name: /Iran/ })).toHaveAttribute(
      'aria-selected',
      'true',
    );
  });
});
