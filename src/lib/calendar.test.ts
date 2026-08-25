import { describe, it, expect } from 'vitest';
import {
  toParts,
  fromParts,
  daysInMonth,
  isLeapYear,
  addMonths,
  getMonthGrid,
  weekStartsOn,
  getWeekdayNames,
} from './calendar';

describe('jalali conversion', () => {
  // Anchor dates verified against the Iranian civil calendar.
  const cases: Array<[string, [number, number, number]]> = [
    ['2024-03-20', [1403, 1, 1]], // Nowruz 1403
    ['2025-03-21', [1404, 1, 1]], // Nowruz 1404
    ['2024-09-22', [1403, 7, 1]], // 1 Mehr 1403
    ['2021-03-21', [1400, 1, 1]],
    ['1979-02-11', [1357, 11, 22]], // 22 Bahman 1357
  ];

  it.each(cases)('converts %s both ways', (iso, [year, month, day]) => {
    const [y, m, d] = iso.split('-').map(Number);
    const date = new Date(y, m - 1, d);
    expect(toParts(date, 'jalali')).toEqual({ year, month, day });
    expect(fromParts({ year, month, day }, 'jalali').getTime()).toBe(
      date.getTime(),
    );
  });

  it('round-trips every day of a leap year', () => {
    const start = fromParts({ year: 1403, month: 1, day: 1 }, 'jalali');
    for (let i = 0; i < 366; i += 1) {
      const date = new Date(start);
      date.setDate(start.getDate() + i);
      const parts = toParts(date, 'jalali');
      expect(fromParts(parts, 'jalali').getTime()).toBe(date.getTime());
    }
  });
});

describe('month lengths', () => {
  it('gives 31 days to the first six Jalali months', () => {
    for (let m = 1; m <= 6; m += 1)
      expect(daysInMonth(1403, m, 'jalali')).toBe(31);
  });

  it('gives 30 days to months seven through eleven', () => {
    for (let m = 7; m <= 11; m += 1)
      expect(daysInMonth(1403, m, 'jalali')).toBe(30);
  });

  // Esfand is the only variable month, so it is the one that breaks grids.
  it('varies Esfand with the leap year', () => {
    expect(isLeapYear(1403, 'jalali')).toBe(true);
    expect(daysInMonth(1403, 12, 'jalali')).toBe(30);
    expect(isLeapYear(1404, 'jalali')).toBe(false);
    expect(daysInMonth(1404, 12, 'jalali')).toBe(29);
  });

  it('handles Gregorian February', () => {
    expect(daysInMonth(2024, 2, 'gregorian')).toBe(29);
    expect(daysInMonth(2023, 2, 'gregorian')).toBe(28);
  });
});

describe('addMonths', () => {
  // 31 Farvardin + 6 months must clamp to 30 Mehr, not spill into Aban.
  it('clamps instead of overflowing', () => {
    expect(addMonths({ year: 1403, month: 1, day: 31 }, 6, 'jalali')).toEqual({
      year: 1403,
      month: 7,
      day: 30,
    });
  });

  it('rolls across the year boundary', () => {
    expect(addMonths({ year: 1403, month: 12, day: 1 }, 1, 'jalali')).toEqual({
      year: 1404,
      month: 1,
      day: 1,
    });
  });
});

describe('grid', () => {
  it('is always six full weeks', () => {
    expect(getMonthGrid(1403, 1, 'jalali', 'fa')).toHaveLength(42);
    expect(getMonthGrid(2024, 2, 'gregorian', 'en')).toHaveLength(42);
  });

  it('starts the Jalali week on Saturday', () => {
    expect(weekStartsOn('jalali', 'fa')).toBe(6);
    const grid = getMonthGrid(1403, 1, 'jalali', 'fa');
    expect(grid[0].date.getDay()).toBe(6);
  });

  it('starts the Gregorian week per locale', () => {
    expect(weekStartsOn('gregorian', 'en-US')).toBe(0);
    expect(weekStartsOn('gregorian', 'en-GB')).toBe(1);
  });

  it('marks out-of-month padding days', () => {
    const grid = getMonthGrid(1403, 1, 'jalali', 'fa');
    expect(grid.filter((cell) => cell.inMonth)).toHaveLength(31);
  });

  it('orders weekday names from the calendar start day', () => {
    expect(getWeekdayNames('jalali', 'fa')).toHaveLength(7);
    expect(getWeekdayNames('gregorian', 'en-US')[0]).toMatch(/sun/i);
  });
});
