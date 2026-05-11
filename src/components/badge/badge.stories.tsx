import { StoryFn, Meta } from '@storybook/react';
import { Badge } from '.';
import { Icon } from '@components/icon';

const meta: Meta<typeof Badge> = {
  title: 'Components/Badge',
  component: Badge,
  parameters: {
    docs: {
      description: {
        component: `The **Badge** component is a versatile and compact visual indicator used to display status, labels, counts, or tags. It supports multiple styles, colors, sizes, and content types (text, number, icon, dot).

**Key Features:**
- **4 Types**: Basic, Start Icon, End Icon, With Dot
- **4 Styles**: Filled, Light, Lighter, Stroke
- **10 Colors**: Gray, Red, Blue, Orange, Green, Yellow, Purple, Sky, Pink, Teal
- **2 Sizes**: Medium, Small
- **Number Mode**: For displaying counts (e.g. notifications)
- **Disabled State**: Automatic styling for disabled badges
- **Fully Customizable**: Icons, labels, and colors

This component is ideal for notifications, status indicators, tags, filters, and count badges.`,
      },
    },
  },

  argTypes: {
    type: {
      control: { type: 'select' },
      options: ['basic', 'start-icon', 'end-icon', 'with-dot'],
      description: 'Type of badge content',
      defaultValue: 'basic',
    },
    style: {
      control: { type: 'select' },
      options: ['filled', 'light', 'lighter', 'stroke'],
      description: 'Visual style of the badge',
      defaultValue: 'filled',
    },
    color: {
      control: { type: 'select' },
      options: [
        'gray',
        'red',
        'blue',
        'orange',
        'green',
        'yellow',
        'purple',
        'sky',
        'pink',
        'teal',
      ],
      description: 'Badge color theme',
      defaultValue: 'gray',
    },
    size: {
      control: { type: 'select' },
      options: ['medium', 'small'],
      description: 'Badge size',
      defaultValue: 'medium',
    },
    number: {
      control: 'boolean',
      description: 'Show number instead of label',
      defaultValue: false,
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state',
      defaultValue: false,
    },
    label: {
      control: 'text',
      description: 'Text content (when number = false)',
      defaultValue: 'Active',
    },
    number_label: {
      control: 'number',
      description: 'Number to display (when number = true)',
      defaultValue: 12,
    },
    icon: {
      control: false, // Better to show in specific stories
      description: 'React Node for icon',
    },
  },
};

const Template: StoryFn<typeof Badge> = (args) => <Badge {...args} />;

// ====================== Basic Stories ======================

export const Default = Template.bind({});
Default.args = {
  type: 'basic',
  style: 'filled',
  color: 'gray',
  size: 'medium',
  label: 'Badge',
};

export const NumberBadge = Template.bind({});
NumberBadge.args = {
  type: 'basic',
  style: 'filled',
  color: 'red',
  size: 'medium',
  number: true,
  number_label: 99,
};

// ====================== Style Variations ======================

export const FilledStyle = Template.bind({});
FilledStyle.args = {
  type: 'basic',
  style: 'filled',
  color: 'blue',
  label: 'Filled',
};

export const LightStyle = Template.bind({});
LightStyle.args = {
  type: 'basic',
  style: 'light',
  color: 'green',
  label: 'Light',
};

export const LighterStyle = Template.bind({});
LighterStyle.args = {
  type: 'basic',
  style: 'lighter',
  color: 'purple',
  label: 'Lighter',
};

export const StrokeStyle = Template.bind({});
StrokeStyle.args = {
  type: 'basic',
  style: 'stroke',
  color: 'orange',
  label: 'Stroke',
};

// ====================== Type Variations ======================

export const WithStartIcon = Template.bind({});
WithStartIcon.args = {
  type: 'start-icon',
  style: 'filled',
  color: 'sky',
  label: 'Verified',
  icon: <Icon name="flashlight-fill" />,
};

export const WithEndIcon = Template.bind({});
WithEndIcon.args = {
  type: 'end-icon',
  style: 'filled',
  color: 'red',
  label: 'Close',
  icon: <Icon name="flashlight-fill" />,
};

export const WithDot = Template.bind({});
WithDot.args = {
  type: 'with-dot',
  style: 'filled',
  color: 'green',
  label: 'Online',
};

// ====================== Color Examples ======================

export const AllColors = () => (
  <div className="flex flex-wrap gap-3">
    {(
      [
        'gray',
        'red',
        'blue',
        'orange',
        'green',
        'yellow',
        'purple',
        'sky',
        'pink',
        'teal',
      ] as const
    ).map((color) => (
      <Badge
        key={color}
        type="basic"
        style="filled"
        size="small"
        color={color}
        label={color}
      />
    ))}
  </div>
);

// ====================== Disabled ======================

export const Disabled = Template.bind({});
Disabled.args = {
  type: 'basic',
  style: 'filled',
  color: 'gray',
  label: 'Disabled',
  disabled: true,
};

export default meta;
