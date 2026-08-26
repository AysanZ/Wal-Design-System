import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Rating } from '.';
import { DirectionProvider } from '../../providers/direction';

describe('Rating', () => {
  it('is a radiogroup of real radios when interactive', () => {
    render(<Rating defaultValue={3} />);
    expect(
      screen.getByRole('radiogroup', { name: 'Rating' }),
    ).toBeInTheDocument();
    expect(screen.getAllByRole('radio')).toHaveLength(5);
  });

  it('reports the score the user gave', async () => {
    const onValueChange = vi.fn();
    render(<Rating value={0} onValueChange={onValueChange} />);
    await userEvent.click(screen.getByRole('radio', { name: '4 stars' }));
    expect(onValueChange).toHaveBeenCalledWith(4);
  });

  it('works uncontrolled', async () => {
    render(<Rating defaultValue={0} />);
    await userEvent.click(screen.getByRole('radio', { name: '2 stars' }));
    expect(screen.getByRole('radio', { name: '2 stars' })).toBeChecked();
  });

  // A review average is content, not a question: one role="img" a screen
  // reader reads once, rather than five "not selected" radios.
  it('is a single labelled image when read only', () => {
    render(<Rating value={4.5} readOnly />);
    expect(
      screen.getByRole('img', { name: '4.5 out of 5' }),
    ).toBeInTheDocument();
    expect(screen.queryAllByRole('radio')).toHaveLength(0);
  });

  it('honours max', () => {
    render(<Rating defaultValue={0} max={10} />);
    expect(screen.getAllByRole('radio')).toHaveLength(10);
  });

  it('does not fire while disabled', async () => {
    const onValueChange = vi.fn();
    render(<Rating value={0} disabled onValueChange={onValueChange} />);
    await userEvent.click(screen.getByRole('radio', { name: '3 stars' }));
    expect(onValueChange).not.toHaveBeenCalled();
  });

  it('localizes the readout and the summary', () => {
    render(
      <DirectionProvider locale="fa" attributeTarget="self">
        <Rating value={4.5} readOnly showValue />
      </DirectionProvider>,
    );
    expect(screen.getByText('۴٫۵')).toBeInTheDocument();
    expect(
      screen.getByRole('img', { name: '۴٫۵ out of ۵' }),
    ).toBeInTheDocument();
  });

  it('lets the caller replace the readout', () => {
    render(<Rating value={4.5} readOnly valueLabel="4.5 (128 reviews)" />);
    expect(screen.getByText('4.5 (128 reviews)')).toBeInTheDocument();
  });

  // A mouse crossing the row must not rate anything on the way past.
  it('does not commit a hover preview', async () => {
    const onValueChange = vi.fn();
    render(<Rating value={1} onValueChange={onValueChange} />);
    await userEvent.hover(screen.getByRole('radio', { name: '5 stars' }));
    expect(onValueChange).not.toHaveBeenCalled();
  });
});
