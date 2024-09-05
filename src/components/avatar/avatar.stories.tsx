import { StoryFn, Meta } from '@storybook/react';
import { Avatar } from './avatar';
import { backgroundColors, sizeMap } from './avatar.styles';

const meta: Meta<typeof Avatar> = {
  title: 'Components/Avatar',
  component: Avatar,
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
      description: 'Top status icon on the avatar.',
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
      description: 'Bottom status icon on the avatar.',
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
  imageSrc: 'https://storage.evrimagaci.org/old/mi_media/afcae823e61eefb077e1f223594b1e7f.jpeg',
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
