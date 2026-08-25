import { describe, it, expect, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useControllableState } from './use-controllable-state';

describe('useControllableState', () => {
  it('manages its own state when uncontrolled', () => {
    const { result } = renderHook(() =>
      useControllableState({ defaultValue: false }),
    );
    expect(result.current[0]).toBe(false);
    act(() => result.current[1](true));
    expect(result.current[0]).toBe(true);
  });

  it('never writes to internal state when controlled', () => {
    const onChange = vi.fn();
    const { result } = renderHook(() =>
      useControllableState({ value: false, defaultValue: false, onChange }),
    );

    act(() => result.current[1](true));
    expect(onChange).toHaveBeenCalledWith(true);
    // Still false: only the parent can change a controlled value.
    expect(result.current[0]).toBe(false);
  });

  it('supports the updater form while controlled', () => {
    const onChange = vi.fn();
    renderHook(() =>
      useControllableState<string[]>({
        value: ['a'],
        defaultValue: [],
        onChange,
      }),
    ).result.current[1]((prev) => [...prev, 'b']);

    expect(onChange).toHaveBeenCalledWith(['a', 'b']);
  });

  it('does not fire onChange for a no-op update', () => {
    const onChange = vi.fn();
    const { result } = renderHook(() =>
      useControllableState({ defaultValue: false, onChange }),
    );
    act(() => result.current[1](false));
    expect(onChange).not.toHaveBeenCalled();
  });
});
