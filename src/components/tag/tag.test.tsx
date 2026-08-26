import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Tag, TagGroup } from '.';

describe('Tag', () => {
  it('is plain text until it is given something to do', () => {
    render(<Tag>Design</Tag>);
    expect(screen.getByText('Design')).toBeInTheDocument();
    expect(screen.queryAllByRole('button')).toHaveLength(0);
  });

  it('removes itself', async () => {
    const onDismiss = vi.fn();
    render(
      <Tag onDismiss={onDismiss} dismissLabel="Remove design">
        Design
      </Tag>,
    );
    await userEvent.click(
      screen.getByRole('button', { name: 'Remove design' }),
    );
    expect(onDismiss).toHaveBeenCalledTimes(1);
  });

  it('toggles when selectable', async () => {
    const onSelect = vi.fn();
    render(
      <Tag onSelect={onSelect} selected>
        Design
      </Tag>,
    );
    const button = screen.getByRole('button', { name: 'Design' });
    expect(button).toHaveAttribute('aria-pressed', 'true');
    await userEvent.click(button);
    expect(onSelect).toHaveBeenCalledTimes(1);
  });

  // Nesting is invalid HTML and browsers resolve it by dropping the inner
  // element, so the remove target silently stops working.
  it('keeps the label and the remove button as siblings', () => {
    const { container } = render(
      <Tag
        onSelect={() => {}}
        onDismiss={() => {}}
        dismissLabel="Remove design"
      >
        Design
      </Tag>,
    );
    expect(screen.getAllByRole('button')).toHaveLength(2);
    expect(container.querySelector('button button')).toBeNull();
  });

  it('disables both controls at once', async () => {
    const onSelect = vi.fn();
    const onDismiss = vi.fn();
    render(
      <Tag
        disabled
        onSelect={onSelect}
        onDismiss={onDismiss}
        dismissLabel="Remove design"
      >
        Design
      </Tag>,
    );
    await userEvent.click(screen.getByRole('button', { name: 'Design' }));
    await userEvent.click(
      screen.getByRole('button', { name: 'Remove design' }),
    );
    expect(onSelect).not.toHaveBeenCalled();
    expect(onDismiss).not.toHaveBeenCalled();
  });

  it('keeps the leading adornment decorative', () => {
    const { container } = render(
      <Tag startAdornment={<span data-testid="dot" />}>Design</Tag>,
    );
    expect(screen.getByTestId('dot')).toBeInTheDocument();
    expect(container.querySelector('[aria-hidden="true"]')).not.toBeNull();
  });
});

describe('TagGroup', () => {
  it('is a named group', () => {
    render(
      <TagGroup label="Labels">
        <Tag>Design</Tag>
        <Tag>Research</Tag>
      </TagGroup>,
    );
    expect(screen.getByRole('group', { name: 'Labels' })).toBeInTheDocument();
  });
});
