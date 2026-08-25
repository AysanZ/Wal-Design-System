/**
 * Colour maths for the picker. No dependency: the conversions are ~40 lines
 * and a design system's runtime deps are inherited by every consumer.
 */

export interface Hsv {
  h: number; // 0-360
  s: number; // 0-100
  v: number; // 0-100
}

export interface Rgb {
  r: number;
  g: number;
  b: number;
}

const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value));

export function hsvToRgb({ h, s, v }: Hsv): Rgb {
  const sat = s / 100;
  const val = v / 100;
  const c = val * sat;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = val - c;
  const [r, g, b] =
    h < 60
      ? [c, x, 0]
      : h < 120
        ? [x, c, 0]
        : h < 180
          ? [0, c, x]
          : h < 240
            ? [0, x, c]
            : h < 300
              ? [x, 0, c]
              : [c, 0, x];
  return {
    r: Math.round((r + m) * 255),
    g: Math.round((g + m) * 255),
    b: Math.round((b + m) * 255),
  };
}

export function rgbToHsv({ r, g, b }: Rgb): Hsv {
  const rn = r / 255;
  const gn = g / 255;
  const bn = b / 255;
  const max = Math.max(rn, gn, bn);
  const min = Math.min(rn, gn, bn);
  const d = max - min;

  let h = 0;
  if (d !== 0) {
    if (max === rn) h = 60 * (((gn - bn) / d) % 6);
    else if (max === gn) h = 60 * ((bn - rn) / d + 2);
    else h = 60 * ((rn - gn) / d + 4);
  }
  if (h < 0) h += 360;

  return {
    h: Math.round(h),
    s: Math.round((max === 0 ? 0 : d / max) * 100),
    v: Math.round(max * 100),
  };
}

export function rgbToHex({ r, g, b }: Rgb, alpha = 1): string {
  const part = (n: number) =>
    clamp(Math.round(n), 0, 255).toString(16).padStart(2, '0');
  const base = `#${part(r)}${part(g)}${part(b)}`;
  return alpha >= 1 ? base : `${base}${part(alpha * 255)}`;
}

/** Accepts `#rgb`, `#rgba`, `#rrggbb`, `#rrggbbaa`. Returns null when invalid. */
export function hexToRgb(hex: string): (Rgb & { a: number }) | null {
  const value = hex.trim().replace(/^#/, '');
  const expand = (s: string) =>
    s
      .split('')
      .map((c) => c + c)
      .join('');
  const normalized =
    value.length === 3 || value.length === 4 ? expand(value) : value;

  if (!/^[0-9a-fA-F]{6}([0-9a-fA-F]{2})?$/.test(normalized)) return null;

  return {
    r: parseInt(normalized.slice(0, 2), 16),
    g: parseInt(normalized.slice(2, 4), 16),
    b: parseInt(normalized.slice(4, 6), 16),
    a: normalized.length === 8 ? parseInt(normalized.slice(6, 8), 16) / 255 : 1,
  };
}

export function rgbToCss({ r, g, b }: Rgb, alpha = 1): string {
  return alpha >= 1 ? `rgb(${r} ${g} ${b})` : `rgb(${r} ${g} ${b} / ${alpha})`;
}

/**
 * Relative luminance per WCAG, used to pick a legible marker colour against
 * the current swatch. A white cursor on a pale yellow is invisible.
 */
export function luminance({ r, g, b }: Rgb): number {
  const channel = (v: number) => {
    const s = v / 255;
    return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
  };
  return 0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b);
}

export const isLight = (rgb: Rgb): boolean => luminance(rgb) > 0.45;
