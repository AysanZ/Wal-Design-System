import { StoryFn, Meta } from '@storybook/react';
import { backgroundColors, sizeMap, Avatar } from '.';

const meta: Meta<typeof Avatar> = {
  title: 'Components/Avatar',
  component: Avatar,
  parameters: {
    docs: {
      description: {
        component: `The **Avatar** component serves as a versatile and customizable element within the design system, designed to represent users or entities visually. This component supports various display options, including images, initials, custom icons, and more. It provides flexibility in styling and content, allowing developers to choose between different sizes, background colors, and placeholder options for cases where an image is not available or fails to load.

Key Features:
- **Top and Bottom Status Indicators**: Easily add top and bottom status indicators to convey states like "online" or "away," or feature indicators such as "pin" or "remove."
- **Content Options**: Display an image, text (such as initials), a custom icon, or a fallback icon when no image is provided.
- **Error Handling**: Automatically switches to fallback content (like initials or icons) if the provided image fails to load, improving reliability.
- **Size Variations**: Supports multiple sizes, allowing it to be used in various contexts within your design.
- **Customization**: Developers can pass in custom icons, text, colors, and other styles to tailor the avatar to specific design needs.

This component is ideal for displaying user profiles, entities, or features that require visual indicators, enhancing the personalization and versatility of your application.`,
      },
    },
  },

  argTypes: {
    firstName: {
      control: 'text',
      description: 'The persona name to be displayed or used as fallback text.',
      defaultValue: 'James Brown',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'James Brown' },
      },
    },
    lastName: {
      control: 'text',
      description: 'The persona name to be displayed or used as fallback text.',
      defaultValue: 'James Brown',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'James Brown' },
      },
    },
    size: {
      control: {
        type: 'select',
      },
      options: Object.keys(sizeMap),
      description: 'Avatar size in pixels.',
      defaultValue: 80,
    },
    bgColor: {
      control: {
        type: 'select',
      },
      options: Object.keys(backgroundColors),
      description: 'Avatar background color.',
      defaultValue: 80,
    },
    imageSrc: {
      control: 'text',
      description: 'The image source URL for the avatar.',
      defaultValue: '',
      table: {
        type: { summary: 'string' },
      },
    },
    text: {
      control: 'text',
      description: 'Set text-based avatar content.',
      defaultValue: '',
      table: {
        type: { summary: 'string' },
      },
    },
    icon: {
      control: 'boolean',
      description: 'A React node for rendering an icon avatar.',
      table: {
        type: { summary: 'ReactNode' },
      },
    },
    topStatus: {
      control: {
        type: 'select',
      },
      options: [
        false,
        'verified',
        'pin',
        'favorite',
        'add',
        'remove',
        'notification',
      ],
      description:
        'Top status icon on the avatar. Only available for sizes larger than medium.',
      defaultValue: false,
    },
    bottomStatus: {
      control: {
        type: 'select',
      },
      options: [
        false,
        'online',
        'offline',
        'busy',
        'away',
        'placeholder-company',
      ],
      description:
        'Bottom status icon on the avatar. Only available for sizes larger than medium.',
      defaultValue: false,
    },
    onImageError: {
      action: 'image error',
      description: 'Callback function when the image fails to load.',
      table: {
        type: { summary: '() => void' },
      },
    },
  },
};

const Template: StoryFn<typeof Avatar> = (args) => <Avatar {...args} />;

export const DefaultAvatar = Template.bind({});
DefaultAvatar.args = {
  firstName: 'James',
  lastName: 'Brown',
  size: 'xxxlarge',
};

export const ImageAvatar = Template.bind({});
ImageAvatar.args = {
  firstName: 'James',
  size: 'medium',
  imageSrc:
    'https://storage.evrimagaci.org/old/mi_media/afcae823e61eefb077e1f223594b1e7f.jpeg',
};

export const TextAvatar = Template.bind({});
TextAvatar.args = {
  firstName: 'James Brown',
  size: 'small',
  text: 'JB',
};

export const IconAvatar = Template.bind({});
IconAvatar.args = {
  firstName: 'James Brown',
  size: 'xxxlarge',
  bgColor: 'red',
  icon: true,
};

export const WithTopStatus = Template.bind({});
WithTopStatus.args = {
  firstName: 'Jame',
  lastName: 'b',
  bgColor: 'green',
  size: 'xxxlarge',
  imageSrc: 'https://example.com/avatar.jpg',
  topStatus: 'verified',
};

export const WithBottomStatus = Template.bind({});
WithBottomStatus.args = {
  firstName: 'James Brown',
  size: 'xxxlarge',
  imageSrc: 'https://example.com/avatar.jpg',
  bottomStatus: 'online',
};

export const WithBothStatus = Template.bind({});
WithBothStatus.args = {
  firstName: 'James Brown',
  size: 'medium',
  imageSrc: 'https://example.com/avatar.jpg',
  topStatus: 'favorite',
  bottomStatus: 'busy',
};

export default meta;
