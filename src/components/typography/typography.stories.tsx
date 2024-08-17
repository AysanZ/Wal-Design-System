import { StoryFn, Meta } from '@storybook/react';
import { Typography, TypographyProps, variantClasses } from '.';
import { useTranslation } from 'react-i18next';

const meta: Meta<typeof Typography> = {
  title: 'Components/Typography',
  component: Typography,
  argTypes: {
    variant: {
      control: {
        type: 'select',
      },
      options: Object.keys(variantClasses),
      description:
        'Select the typography variant (e.g., headings, labels, paragraphs).',
      defaultValue: 'paragraph-medium',
      table: {
        type: { summary: 'keyof typeof variantClasses' },
        defaultValue: { summary: 'paragraph-medium' },
      },
    },
    dir: {
      options: ['ltr', 'rtl'],
      control: { type: 'radio' },
      description:
        'Set the text direction to left-to-right (ltr) or right-to-left (rtl).',
      defaultValue: 'ltr',
      table: {
        type: { summary: "'ltr' | 'rtl'" },
        defaultValue: { summary: 'ltr' },
      },
    },
    children: {
      control: 'text',
      description:
        'The content to be rendered inside the Typography component. Accepts any ReactNode.',
      defaultValue: 'Sample text',
      table: {
        type: { summary: 'ReactNode' },
        defaultValue: { summary: 'Sample text' },
      },
    },
    className: {
      control: 'text',
      description:
        'Additional custom CSS classes for styling the Typography component.',
      table: {
        type: { summary: 'string' },
      },
    },
    as: {
      control: {
        type: 'select',
      },
      options: ['div', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'span'],
      description:
        'Specify the HTML tag to render for the Typography component.',
      defaultValue: 'div',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'div' },
      },
    },
  },
};

const Template: StoryFn<TypographyProps> = (args) => {
  const { t } = useTranslation();
  return (
    <Typography {...args}>
      {t(`core.typography.${args.variant}`) || args.children}
    </Typography>
  );
};

// Header variants
export const Heading1 = Template.bind({});
Heading1.args = {
  variant: 'h1',
  as: 'h1',
  children: 'Heading 1 - 56px, Medium',
};

export const Heading2 = Template.bind({});
Heading2.args = {
  variant: 'h2',
  as: 'h2',
  children: 'Heading 2 - 48px, Medium',
};

export const Heading3 = Template.bind({});
Heading3.args = {
  variant: 'h3',
  as: 'h3',
  children: 'Heading 3 - 40px, Medium',
};

export const Heading4 = Template.bind({});
Heading4.args = {
  variant: 'h4',
  as: 'h4',
  children: 'Heading 4 - 32px, Medium',
};

export const Heading5 = Template.bind({});
Heading5.args = {
  variant: 'h5',
  as: 'h5',
  children: 'Heading 5 - 24px, Medium',
};

export const Heading6 = Template.bind({});
Heading6.args = {
  variant: 'h6',
  as: 'h6',
  children: 'Heading 6 - 20px, Medium',
};

// Label variants
export const LabelXLarge = Template.bind({});
LabelXLarge.args = {
  variant: 'label-xlarge',
  as: 'span',
  children: 'Label X-Large - 24px, Medium',
};

export const LabelLarge = Template.bind({});
LabelLarge.args = {
  variant: 'label-large',
  as: 'span',
  children: 'Label Large - 18px, Medium',
};

export const LabelMedium = Template.bind({});
LabelMedium.args = {
  variant: 'label-medium',
  as: 'span',
  children: 'Label Medium - 16px, Medium',
};

export const LabelSmall = Template.bind({});
LabelSmall.args = {
  variant: 'label-small',
  as: 'span',
  children: 'Label Small - 14px, Medium',
};

export const LabelXSmall = Template.bind({});
LabelXSmall.args = {
  variant: 'label-xsmall',
  as: 'span',
  children: 'Label X-Small - 12px, Medium',
};

// Paragraph variants
export const ParagraphXLarge = Template.bind({});
ParagraphXLarge.args = {
  variant: 'paragraph-xlarge',
  as: 'p',
  children: 'Paragraph X-Large - 24px, Normal',
};

export const ParagraphLarge = Template.bind({});
ParagraphLarge.args = {
  variant: 'paragraph-large',
  as: 'p',
  children: 'Paragraph Large - 18px, Normal',
};

export const ParagraphMedium = Template.bind({});
ParagraphMedium.args = {
  variant: 'paragraph-medium',
  as: 'p',
  children: 'Paragraph Medium - 16px, Normal',
};

export const ParagraphSmall = Template.bind({});
ParagraphSmall.args = {
  variant: 'paragraph-small',
  as: 'p',
  children: 'Paragraph Small - 14px, Normal',
};

export const ParagraphXSmall = Template.bind({});
ParagraphXSmall.args = {
  variant: 'paragraph-xsmall',
  as: 'p',
  children: 'Paragraph X-Small - 12px, Normal',
};

// Subheading variants
export const SubheadingMedium = Template.bind({});
SubheadingMedium.args = {
  variant: 'subheading-medium',
  as: 'span',
  children: 'Subheading Medium - 16px, Medium',
};

export const SubheadingSmall = Template.bind({});
SubheadingSmall.args = {
  variant: 'subheading-small',
  as: 'span',
  children: 'Subheading Small - 14px, Medium',
};

export const SubheadingXSmall = Template.bind({});
SubheadingXSmall.args = {
  variant: 'subheading-xsmall',
  as: 'span',
  children: 'Subheading X-Small - 12px, Medium',
};

export const Subheading2XSmall = Template.bind({});
Subheading2XSmall.args = {
  variant: 'subheading-2xsmall',
  as: 'span',
  children: 'Subheading 2X-Small - 11px, Medium',
};

// Docs-specific variants
export const DocsLabel = Template.bind({});
DocsLabel.args = {
  variant: 'docs-label',
  as: 'span',
  children: 'Docs Label - 18px, Medium',
};

export const DocsParagraph = Template.bind({});
DocsParagraph.args = {
  variant: 'docs-paragraph',
  as: 'p',
  children: 'Docs Paragraph - 18px, Normal',
};

// RTL example
export const RTLExample = Template.bind({});
RTLExample.args = {
  variant: 'paragraph-medium',
  as: 'p',
  children: 'This is an example with right-to-left text direction.',
  dir: 'rtl',
};

// Custom class example
export const CustomClassName = Template.bind({});
CustomClassName.args = {
  variant: 'paragraph-medium',
  as: 'p',
  children: 'This is an example with a custom CSS class.',
  className: 'text-error-base text-3xl font-semibold',
};

export default meta;
