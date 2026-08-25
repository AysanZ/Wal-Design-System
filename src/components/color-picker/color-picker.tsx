import {
  forwardRef,
  useCallback,
  useMemo,
  useRef,
  type PointerEvent as ReactPointerEvent,
  type KeyboardEvent as ReactKeyboardEvent,
} from 'react';
import { cn } from '../../lib/cn';
import { useId } from '../../hooks/use-id';
import { useControllableState } from '../../hooks/use-controllable-state';
import { useDirection } from '../../providers/direction';
import {
  hsvToRgb,
  rgbToHsv,
  rgbToHex,
  hexToRgb,
  rgbToCss,
  isLight,
} from '../../lib/color';
import {
  colorPickerVariants,
  colorSpectrumVariants,
  colorSliderVariants,
  colorThumbVariants,
  colorSpectrumThumbVariants,
  colorDotVariants,
} from './color-picker.styles';
import type {
  ColorDotProps,
  ColorSpectrumProps,
  ColorSliderProps,
  ColorPickerProps,
} from './color-picker.types';

const clamp = (n: number, min = 0, max = 100) =>
  Math.min(max, Math.max(min, n));

/** A single palette swatch. */
export const ColorDot = forwardRef<HTMLButtonElement, ColorDotProps>(
  function ColorDot(
    { color, value, selected = false, className, style, type, ...rest },
    ref,
  ) {
    return (
      <button
        ref={ref}
        type={type ?? 'button'}
        data-selected={selected}
        aria-pressed={selected}
        className={cn(
          colorDotVariants({ color: value ? undefined : color }),
          className,
        )}
        style={value ? { ...style, backgroundColor: value } : style}
        {...rest}
      />
    );
  },
);

/**
 * Saturation / brightness area.
 *
 * Keyboard support is not decoration here: a pointer-only colour area is
 * unusable without a mouse, and "pick a colour" is a common form field. Arrow
 * keys move by 1%, Shift+Arrow by 10%.
 */
export const ColorSpectrum = forwardRef<HTMLDivElement, ColorSpectrumProps>(
  function ColorSpectrum(
    {
      hue,
      saturation,
      brightness,
      onChange,
      label = 'Saturation and brightness',
      className,
      ...rest
    },
    ref,
  ) {
    const areaRef = useRef<HTMLDivElement>(null);

    const apply = useCallback(
      (event: ReactPointerEvent<HTMLDivElement>) => {
        const box = areaRef.current?.getBoundingClientRect();
        if (!box) return;
        onChange({
          saturation: clamp(((event.clientX - box.left) / box.width) * 100),
          brightness: clamp(
            100 - ((event.clientY - box.top) / box.height) * 100,
          ),
        });
      },
      [onChange],
    );

    const onKeyDown = (event: ReactKeyboardEvent<HTMLDivElement>) => {
      const step = event.shiftKey ? 10 : 1;
      const moves: Record<string, [number, number]> = {
        ArrowLeft: [-step, 0],
        ArrowRight: [step, 0],
        ArrowUp: [0, step],
        ArrowDown: [0, -step],
      };
      const move = moves[event.key];
      if (!move) return;
      event.preventDefault();
      onChange({
        saturation: clamp(saturation + move[0]),
        brightness: clamp(brightness + move[1]),
      });
    };

    const rgb = hsvToRgb({ h: hue, s: saturation, v: brightness });

    return (
      <div
        ref={(node) => {
          (areaRef as { current: HTMLDivElement | null }).current = node;
          if (typeof ref === 'function') ref(node);
          else if (ref)
            (ref as { current: HTMLDivElement | null }).current = node;
        }}
        role="slider"
        tabIndex={0}
        aria-label={label}
        aria-valuetext={`${Math.round(saturation)}%, ${Math.round(brightness)}%`}
        aria-valuenow={Math.round(saturation)}
        aria-valuemin={0}
        aria-valuemax={100}
        onPointerDown={(event) => {
          event.currentTarget.setPointerCapture(event.pointerId);
          apply(event);
        }}
        onPointerMove={(event) => {
          if (event.currentTarget.hasPointerCapture(event.pointerId))
            apply(event);
        }}
        onKeyDown={onKeyDown}
        className={cn(colorSpectrumVariants(), className)}
        style={{
          backgroundImage: `linear-gradient(to top, #000, transparent), linear-gradient(to right, #fff, hsl(${hue} 100% 50%))`,
        }}
        {...rest}
      >
        <span
          className={colorSpectrumThumbVariants()}
          style={{
            left: `${saturation}%`,
            top: `${100 - brightness}%`,
            backgroundColor: rgbToCss(rgb),
            borderColor: isLight(rgb) ? '#0E121B' : '#FFFFFF',
          }}
        />
      </div>
    );
  },
);

/** Hue or opacity track. */
export const ColorSlider = forwardRef<HTMLDivElement, ColorSliderProps>(
  function ColorSlider(
    {
      type = 'hue',
      value,
      onChange,
      baseColor = '#000',
      label,
      className,
      style,
      ...rest
    },
    ref,
  ) {
    const trackRef = useRef<HTMLDivElement>(null);
    const { dir } = useDirection();
    const max = type === 'hue' ? 360 : 100;

    const apply = useCallback(
      (event: ReactPointerEvent<HTMLDivElement>) => {
        const box = trackRef.current?.getBoundingClientRect();
        if (!box) return;
        const raw = (event.clientX - box.left) / box.width;
        // In RTL the track is mirrored, so the pointer ratio must be too —
        // otherwise dragging right lowers the value.
        const ratio = dir === 'rtl' ? 1 - raw : raw;
        onChange(Math.round(clamp(ratio, 0, 1) * max));
      },
      [dir, max, onChange],
    );

    const percent = (value / max) * 100;

    return (
      <div
        ref={(node) => {
          (trackRef as { current: HTMLDivElement | null }).current = node;
          if (typeof ref === 'function') ref(node);
          else if (ref)
            (ref as { current: HTMLDivElement | null }).current = node;
        }}
        role="slider"
        tabIndex={0}
        aria-label={label ?? type}
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={max}
        onPointerDown={(event) => {
          event.currentTarget.setPointerCapture(event.pointerId);
          apply(event);
        }}
        onPointerMove={(event) => {
          if (event.currentTarget.hasPointerCapture(event.pointerId))
            apply(event);
        }}
        onKeyDown={(event) => {
          const step = event.shiftKey ? 10 : 1;
          if (event.key === 'ArrowRight' || event.key === 'ArrowUp') {
            event.preventDefault();
            onChange(Math.min(max, value + step));
          } else if (event.key === 'ArrowLeft' || event.key === 'ArrowDown') {
            event.preventDefault();
            onChange(Math.max(0, value - step));
          }
        }}
        className={cn(colorSliderVariants({ type }), className)}
        style={style}
        {...rest}
      >
        {type === 'opacity' && (
          <span
            aria-hidden
            className="absolute inset-0 rounded-full"
            style={{
              backgroundImage: `linear-gradient(to right, transparent, ${baseColor})`,
            }}
          />
        )}
        <span
          className={colorThumbVariants()}
          style={{ insetInlineStart: `calc(${percent}% - 0.5rem)` }}
        />
      </div>
    );
  },
);

/**
 * Composite picker: spectrum, hue, optional opacity, a hex field and swatches.
 *
 * Controlled or uncontrolled through the same `useControllableState` path as
 * every other stateful component here.
 */
export const ColorPicker = forwardRef<HTMLDivElement, ColorPickerProps>(
  function ColorPicker(
    {
      value,
      defaultValue = '#335CFF',
      onChange,
      withOpacity = false,
      swatches,
      footer,
      labels,
      className,
      ...rest
    },
    ref,
  ) {
    const [hex, setHex] = useControllableState<string>({
      value,
      defaultValue,
      onChange,
    });
    const hexId = useId();

    const parsed = useMemo(
      () => hexToRgb(hex) ?? { r: 51, g: 92, b: 255, a: 1 },
      [hex],
    );
    const hsv = useMemo(
      () => rgbToHsv({ r: parsed.r, g: parsed.g, b: parsed.b }),
      [parsed],
    );

    const commit = (next: Partial<typeof hsv> & { a?: number }) => {
      const merged = { ...hsv, ...next };
      const alpha = next.a ?? parsed.a;
      setHex(rgbToHex(hsvToRgb(merged), withOpacity ? alpha : 1));
    };

    return (
      <div ref={ref} className={cn(colorPickerVariants(), className)} {...rest}>
        <ColorSpectrum
          hue={hsv.h}
          saturation={hsv.s}
          brightness={hsv.v}
          label={labels?.spectrum}
          onChange={({ saturation, brightness }) =>
            commit({ s: saturation, v: brightness })
          }
        />

        <div className="flex items-center gap-3">
          <span
            aria-hidden
            className="size-8 shrink-0 rounded-full border border-soft-200"
            style={{ backgroundColor: hex }}
          />
          <div className="flex flex-1 flex-col gap-2">
            <ColorSlider
              type="hue"
              value={hsv.h}
              label={labels?.hue}
              onChange={(h) => commit({ h })}
            />
            {withOpacity && (
              <ColorSlider
                type="opacity"
                value={Math.round(parsed.a * 100)}
                baseColor={rgbToHex({ r: parsed.r, g: parsed.g, b: parsed.b })}
                label={labels?.opacity}
                onChange={(a) => commit({ a: a / 100 })}
              />
            )}
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <label
            htmlFor={hexId}
            className="text-[12px] font-medium leading-4 text-sub-600"
          >
            {labels?.hex ?? 'Hex'}
          </label>
          <input
            id={hexId}
            value={hex.toUpperCase()}
            spellCheck={false}
            // Hex codes are Latin even in Persian UI, so the field is pinned LTR.
            dir="ltr"
            onChange={(event) => {
              const next = event.target.value;
              setHex(next.startsWith('#') ? next : `#${next}`);
            }}
            className="h-9 rounded-lg border border-soft-200 bg-white-0 px-2.5 font-mono text-[14px] text-strong-950 outline-none focus-visible:border-primary-base"
          />
        </div>

        {swatches && swatches.length > 0 && (
          <div
            role="group"
            aria-label={labels?.swatches}
            className="flex flex-wrap gap-2"
          >
            {swatches.map((swatch) => (
              <ColorDot
                key={swatch}
                value={swatch}
                aria-label={swatch}
                selected={swatch.toLowerCase() === hex.toLowerCase()}
                onClick={() => setHex(swatch)}
              />
            ))}
          </div>
        )}

        {footer}
      </div>
    );
  },
);
