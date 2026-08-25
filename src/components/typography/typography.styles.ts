import { cva, type VariantProps } from 'class-variance-authority';

/**
 * NOTE: every `tracking` class here previously read `tracking[-0.01em]` —
 * missing the hyphen — so Tailwind emitted nothing and the entire type scale
 * shipped with default letter-spacing. Fixed to `tracking-[…]`.
 */
export const typographyVariants = cva('text-strong-950', {
  variants: {
    variant: {
      h1: 'text-[56px] font-medium leading-[64px] tracking-[-0.01em]',
      h2: 'text-[48px] font-medium leading-[56px] tracking-[-0.01em]',
      h3: 'text-[40px] font-medium leading-[48px] tracking-[-0.01em]',
      h4: 'text-[32px] font-medium leading-[40px] tracking-[-0.005em]',
      h5: 'text-[24px] font-medium leading-[32px]',
      h6: 'text-[20px] font-medium leading-[28px]',

      'label-xlarge':
        'text-[24px] font-medium leading-[32px] tracking-[-0.015em]',
      'label-large':
        'text-[18px] font-medium leading-[24px] tracking-[-0.015em]',
      'label-medium':
        'text-[16px] font-medium leading-[24px] tracking-[-0.011em]',
      'label-small':
        'text-[14px] font-medium leading-[20px] tracking-[-0.006em]',
      'label-xsmall': 'text-[12px] font-medium leading-[16px]',

      'paragraph-xlarge':
        'text-[24px] font-normal leading-[32px] tracking-[-0.015em]',
      'paragraph-large':
        'text-[18px] font-normal leading-[24px] tracking-[-0.015em]',
      'paragraph-medium':
        'text-[16px] font-normal leading-[24px] tracking-[-0.011em]',
      'paragraph-small':
        'text-[14px] font-normal leading-[20px] tracking-[-0.006em]',
      'paragraph-xsmall': 'text-[12px] font-normal leading-[16px]',

      'subheading-medium':
        'text-[16px] font-medium leading-[24px] tracking-[0.06em]',
      'subheading-small':
        'text-[14px] font-medium leading-[20px] tracking-[0.06em]',
      'subheading-xsmall':
        'text-[12px] font-medium leading-[16px] tracking-[0.04em]',
      'subheading-2xsmall':
        'text-[11px] font-medium leading-[12px] tracking-[0.02em]',

      'docs-label':
        'text-[18px] font-medium leading-[32px] tracking-[-0.015em]',
      'docs-paragraph':
        'text-[18px] font-normal leading-[32px] tracking-[-0.015em]',
    },
  },
  defaultVariants: {
    variant: 'paragraph-medium',
  },
});

export type TypographyVariantProps = VariantProps<typeof typographyVariants>;
export type TypographyVariant = NonNullable<TypographyVariantProps['variant']>;

/** The element each variant renders as when `as` is not supplied. */
export const defaultElementForVariant: Record<TypographyVariant, string> = {
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  h5: 'h5',
  h6: 'h6',
  'label-xlarge': 'span',
  'label-large': 'span',
  'label-medium': 'span',
  'label-small': 'span',
  'label-xsmall': 'span',
  'paragraph-xlarge': 'p',
  'paragraph-large': 'p',
  'paragraph-medium': 'p',
  'paragraph-small': 'p',
  'paragraph-xsmall': 'p',
  'subheading-medium': 'span',
  'subheading-small': 'span',
  'subheading-xsmall': 'span',
  'subheading-2xsmall': 'span',
  'docs-label': 'span',
  'docs-paragraph': 'p',
};
