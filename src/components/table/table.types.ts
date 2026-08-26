import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import type { TableVariantProps, TableCellVariantProps } from './table.styles';

export type TableSize = NonNullable<TableVariantProps['size']>;
export type TableAppearance = NonNullable<TableVariantProps['appearance']>;
export type TableAlign = NonNullable<TableCellVariantProps['align']>;
export type SortDirection = 'asc' | 'desc';

export interface TableProps extends ComponentPropsWithoutRef<'table'> {
  size?: TableSize;
  appearance?: TableAppearance;
  /**
   * Accessible name. A table with no name is announced as "table" and nothing
   * else, which is useless on a page with three of them.
   */
  label?: string;
  /** Visible caption, rendered above the table. Also names it. */
  caption?: ReactNode;
  /** Keeps the header visible while the body scrolls. */
  stickyHeader?: boolean;
  /**
   * Wrap in a scrollable, keyboard-focusable region. On by default: a table
   * that overflows horizontally is unreachable by keyboard otherwise.
   */
  scrollable?: boolean;
  /** Class for the scroll wrapper. Use `className` for the `<table>`. */
  scrollClassName?: string;
}

export type TableHeaderProps = ComponentPropsWithoutRef<'thead'>;
export type TableBodyProps = ComponentPropsWithoutRef<'tbody'>;
export type TableFooterProps = ComponentPropsWithoutRef<'tfoot'>;

export interface TableRowProps extends ComponentPropsWithoutRef<'tr'> {
  /** Highlights the row and adds `aria-selected`. */
  selected?: boolean;
  /**
   * Hover affordance for a row that navigates. The click target must still be
   * a real control *inside* the row — see the note in the component.
   */
  interactive?: boolean;
}

/**
 * `align` shadows the deprecated presentational HTML attribute, which is
 * *physical* (`left` / `right`) and therefore wrong in an RTL-first system.
 * Ours is logical, so the base attribute is omitted rather than merged.
 */
export interface TableHeadProps extends Omit<
  ComponentPropsWithoutRef<'th'>,
  'align'
> {
  align?: TableAlign;
  /** Renders a sort button and manages `aria-sort` on the cell. */
  sortable?: boolean;
  /** Current direction, or `null` when this column is not the sort key. */
  sortDirection?: SortDirection | null;
  onSort?: (direction: SortDirection) => void;
  /** Accessible name for the sort button, e.g. `` (col) => `مرتب‌سازی بر اساس ${col}` ``. */
  sortLabel?: string;
}

export interface TableCellProps extends Omit<
  ComponentPropsWithoutRef<'td'>,
  'align'
> {
  align?: TableAlign;
  /** Tabular figures, so a column of numbers lines up. */
  numeric?: boolean;
  /**
   * Makes the cell a row header (`<th scope="row">`). The first column of a
   * data table usually is one, and marking it lets a screen reader say which
   * row it is reading.
   */
  header?: boolean;
}
