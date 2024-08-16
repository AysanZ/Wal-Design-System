import { Typography } from './typography';
import { TypographyProps } from './typography.types';
import { variantClasses } from './typography.styles';

import type { Meta, StoryFn } from '@storybook/react';

export default {
  title: 'components/typography',
  component: Typography,
  argTypes: {
    variant: {
      control: {
        type: 'select',
        options: [
          'h1',
          'h2',
          'h3',
          'h4',
          'h5',
          'h6',
          'label-xlarge',
          'label-large',
          'label-medium',
          'label-small',
          'label-xsmall',
          'paragraph-xlarge',
          'paragraph-large',
          'paragraph-medium',
          'paragraph-small',
          'paragraph-xsmall',
          'subheading-medium',
          'subheading-small',
          'subheading-xsmall',
          'subheading-2xsmall',
          'docs-label',
          'docs-paragraph',
        ],
      },
      defaultValue: 'paragraph-medium',
    },
    color: {
      control: 'color',
      defaultValue: '#000000',
    },
    align: {
      control: {
        type: 'select',
        options: ['left', 'center', 'right', 'justify'],
      },
      defaultValue: 'left',
    },
    lineHeight: {
      control: 'text',
      defaultValue: 'normal',
    },
    dir: {
      control: { type: 'select', options: ['ltr', 'rtl'] },
      defaultValue: 'ltr',
    },
  },
} as Meta<typeof Typography>;

const Template: StoryFn<TypographyProps> = (args) => <Typography {...args} />;

export const Default = Template.bind({});
Default.args = {
  variant: 'paragraph-medium',
  color: '#000000',
  align: 'left',
  lineHeight: 'normal',
  dir: 'ltr',
  children: 'This is a paragraph with medium font size.',
};

export const Variants: StoryFn = () => (
  <div>
    {Object.keys(variantClasses).map((variant) => (
      <div key={variant} style={{ marginBottom: '20px' }}>
        <Typography variant={variant as TypographyProps['variant']}>
          {variant} Example
        </Typography>
      </div>
    ))}
  </div>
);

export const Customizations: StoryFn = () => (
  <div>
    <Typography variant="h1" color="#FF6347" lineHeight="72px">
      Customized H1 Title
    </Typography>
    <Typography variant="paragraph-large" align="center" dir="rtl">
      Customized Paragraph Large
    </Typography>
    <Typography variant="subheading-small" color="#4682B4">
      Customized Subheading Small
    </Typography>
  </div>
);
