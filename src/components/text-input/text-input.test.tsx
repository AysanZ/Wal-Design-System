import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TextInput } from '.';

describe('TextInput', () => {
  it('ties the label to the input', () => {
    render(<TextInput label="Email" />);
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
  });

  it('describes the input with its hint', () => {
    render(<TextInput label="Email" hint="We will never share it" />);
    expect(screen.getByLabelText('Email')).toHaveAccessibleDescription(
      'We will never share it',
    );
  });

  // A red border with no message, or a message beside a field that still
  // looks fine, cannot happen: `error` drives both.
  it('marks the field invalid whenever there is an error', () => {
    render(<TextInput label="Email" error="Enter a valid email address" />);
    const input = screen.getByLabelText('Email');
    expect(input).toHaveAttribute('aria-invalid', 'true');
    expect(input).toHaveAccessibleDescription('Enter a valid email address');
  });

  // A validation message that appears after submit is silent otherwise — the
  // single most common accessibility bug in forms.
  it('announces the error', () => {
    render(<TextInput label="Email" error="Enter a valid email address" />);
    expect(screen.getByRole('alert')).toHaveTextContent(
      'Enter a valid email address',
    );
  });

  it('shows the error instead of the hint when both are given', () => {
    render(<TextInput label="Email" hint="Optional" error="Required" />);
    expect(screen.getByText('Required')).toBeInTheDocument();
    expect(screen.queryByText('Optional')).toBeNull();
  });

  // The asterisk is a visual convention. Requiredness is carried by the
  // input's own attribute, and "Email star" helps nobody.
  it('keeps the required asterisk out of the accessible name', () => {
    render(<TextInput label="Email" required />);
    const input = screen.getByRole('textbox', { name: 'Email' });
    expect(input).toBeRequired();
  });

  it('types', async () => {
    render(<TextInput label="Email" />);
    await userEvent.type(screen.getByLabelText('Email'), 'a@b.co');
    expect(screen.getByLabelText('Email')).toHaveValue('a@b.co');
  });

  // A URL rendered RTL has its slashes and dots migrate to the wrong end.
  it('pins a latin field to LTR', () => {
    render(<TextInput label="Website" latin />);
    expect(screen.getByLabelText('Website')).toHaveAttribute('dir', 'ltr');
  });

  it('renders adornments and affixes without breaking the label link', () => {
    render(
      <TextInput
        label="Website"
        startAffix="https://"
        endAffix=".com"
        startIcon={<span data-testid="icon" />}
      />,
    );
    expect(screen.getByLabelText('Website')).toBeInTheDocument();
    expect(screen.getByText('https://')).toBeInTheDocument();
    expect(screen.getByTestId('icon')).toBeInTheDocument();
  });

  it('does not type while disabled', async () => {
    render(<TextInput label="Email" disabled />);
    const input = screen.getByLabelText('Email');
    await userEvent.type(input, 'x');
    expect(input).toHaveValue('');
  });
});
