import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from '.';

const table = (props = {}) => (
  <Table label="Invoices" {...props}>
    <TableHeader>
      <TableRow>
        <TableHead>Customer</TableHead>
        <TableHead
          sortable
          sortDirection="asc"
          sortLabel="Sort by amount"
          align="end"
        >
          Amount
        </TableHead>
        <TableHead sortable sortLabel="Sort by status">
          Status
        </TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      <TableRow>
        <TableCell header>Acme</TableCell>
        <TableCell align="end" numeric>
          1,200
        </TableCell>
        <TableCell>Paid</TableCell>
      </TableRow>
    </TableBody>
  </Table>
);

describe('Table', () => {
  it('is a real, named table', () => {
    render(table());
    expect(screen.getByRole('table', { name: 'Invoices' })).toBeInTheDocument();
  });

  it('takes its name from a visible caption when there is one', () => {
    render(table({ caption: 'Last 30 days', label: undefined }));
    expect(
      screen.getByRole('table', { name: 'Last 30 days' }),
    ).toBeInTheDocument();
  });

  // Column headers scope down the column, the first cell of a row scopes
  // across it — that is what lets a screen reader say which row it is in.
  it('scopes its headers', () => {
    render(table());
    expect(
      screen.getByRole('columnheader', { name: 'Customer' }),
    ).toHaveAttribute('scope', 'col');
    expect(screen.getByRole('rowheader', { name: 'Acme' })).toHaveAttribute(
      'scope',
      'row',
    );
  });

  // aria-sort belongs on the cell, and only on the column actually sorted —
  // announcing "none" on the other six is noise.
  it('reports the sorted column and only that one', () => {
    render(table());
    const sorted = screen.getByRole('columnheader', { name: /Amount/ });
    const unsorted = screen.getByRole('columnheader', { name: /Status/ });
    expect(sorted).toHaveAttribute('aria-sort', 'ascending');
    expect(unsorted).not.toHaveAttribute('aria-sort');
  });

  it('flips the direction on click', async () => {
    const onSort = vi.fn();
    render(
      <Table label="Invoices">
        <TableHeader>
          <TableRow>
            <TableHead sortable sortDirection="asc" onSort={onSort}>
              Amount
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>1</TableCell>
          </TableRow>
        </TableBody>
      </Table>,
    );
    await userEvent.click(screen.getByRole('button'));
    expect(onSort).toHaveBeenCalledWith('desc');
  });

  it('sorts from the keyboard', async () => {
    const onSort = vi.fn();
    render(
      <Table label="Invoices">
        <TableHeader>
          <TableRow>
            <TableHead sortable onSort={onSort}>
              Amount
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>1</TableCell>
          </TableRow>
        </TableBody>
      </Table>,
    );
    screen.getByRole('button').focus();
    await userEvent.keyboard('{Enter}');
    expect(onSort).toHaveBeenCalledWith('asc');
  });

  // A region that scrolls but cannot take focus is unreachable by keyboard,
  // so the right-hand columns of a wide table simply do not exist.
  it('wraps the table in a focusable, named scroll region', () => {
    render(table());
    const region = screen.getByRole('region', { name: 'Invoices' });
    expect(region).toHaveAttribute('tabindex', '0');
  });

  it('can render without the scroll wrapper', () => {
    render(table({ scrollable: false }));
    expect(screen.queryByRole('region')).toBeNull();
  });

  it('marks a selected row', () => {
    render(
      <Table label="Invoices">
        <TableBody>
          <TableRow selected>
            <TableCell>Acme</TableCell>
          </TableRow>
        </TableBody>
      </Table>,
    );
    expect(screen.getByRole('row')).toHaveAttribute('aria-selected', 'true');
  });
});
