import { describe, it, expect } from 'vitest';
import {
  toPersianDigits,
  toLatinDigits,
  formatNumber,
  parseLocalizedNumber,
} from './numerals';

describe('numerals', () => {
  it('converts digits in both directions', () => {
    expect(toPersianDigits('1402/07/15')).toBe('۱۴۰۲/۰۷/۱۵');
    expect(toLatinDigits('۱۴۰۲/۰۷/۱۵')).toBe('1402/07/15');
    expect(toLatinDigits('١٤٠٢')).toBe('1402');
  });

  it('leaves non-digits untouched', () => {
    expect(toPersianDigits('IR12 3456')).toBe('IR۱۲ ۳۴۵۶');
  });

  it('formats with the locale separator, not just the glyphs', () => {
    expect(formatNumber(1234567, { locale: 'en-US' })).toBe('1,234,567');
    const fa = formatNumber(1234567, { locale: 'fa-IR' });
    expect(fa).toContain('۱');
    expect(fa).not.toContain(',');
  });

  it('parses user input back to a number', () => {
    expect(parseLocalizedNumber('۱٬۲۳۴٬۵۶۷')).toBe(1234567);
    expect(parseLocalizedNumber('1,234.5')).toBe(1234.5);
  });
});
