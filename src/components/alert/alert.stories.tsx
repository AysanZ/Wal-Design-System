import { StoryFn, Meta } from '@storybook/react';
import Alert from './alert';
import { AlertProps } from './alert.types';

const meta: Meta<typeof Alert> = {
  title: 'Components/Alert',
  component: Alert,
  argTypes: {
    status: {
      control: {
        type: 'select',
      },
      options: ['error', 'warning', 'success', 'info', 'feature'],
      description: 'Select the alert status.',
      defaultValue: 'error',
      table: {
        type: { summary: 'AlertStatus' },
        defaultValue: { summary: 'error' },
      },
    },
    style: {
      control: {
        type: 'select',
      },
      options: ['filled', 'stroke', 'light', 'lighter'],
      description: 'Select the alert style.',
      defaultValue: 'filled',
      table: {
        type: { summary: 'AlertStyle' },
        defaultValue: { summary: 'filled' },
      },
    },
    size: {
      control: {
        type: 'select',
      },
      options: ['x-small', 'small', 'large'],
      description: 'Select the alert size.',
      defaultValue: 'medium',
      table: {
        type: { summary: 'AlertSize' },
        defaultValue: { summary: 'medium' },
      },
    },
    icon: {
      control: 'boolean',
      description: 'Toggle the visibility of the left icon.',
      defaultValue: true,
    },
    iconName: {
      control: {
        type: 'select',
      },

      description: 'Select the left icon.',
      defaultValue: <></>,
      table: {
        type: { summary: 'IconType' },
        defaultValue: { summary: 'FaExclamationCircle' },
      },
    },
    linkButton: {
      control: 'boolean',
      description: 'Toggle the visibility of the link button.',
      defaultValue: false,
    },
    doubleLink: {
      control: 'boolean',
      description: 'Toggle the visibility of the double link.',
      defaultValue: false,
    },
    dismissIcon: {
      control: 'boolean',
      description: 'Toggle the visibility of the dismiss icon.',
      defaultValue: false,
    },
    title: {
      control: 'text',
      description: 'The title text of the alert.',
      defaultValue: 'Insert your alert title here!',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'Insert your alert title here!' },
      },
    },
    description: {
      control: 'text',
      description: 'The description text of the alert.',
      defaultValue:
        'Insert the alert description here. It would look better as two lines of text.',
      table: {
        type: { summary: 'string' },
        defaultValue: {
          summary:
            'Insert the alert description here. It would look better as two lines of text.',
        },
      },
    },
  },
};

const Template: StoryFn<AlertProps> = (args) => <Alert {...args} />;

// Status variations
export const ErrorAlert = Template.bind({});
ErrorAlert.args = {
  status: 'error',
  title: 'Error Alert',
  description: 'This is an error alert with some description.',
};

export const WarningAlert = Template.bind({});
WarningAlert.args = {
  status: 'warning',
  title: 'Warning Alert',
  description: 'This is a warning alert with some description.',
};

export const SuccessAlert = Template.bind({});
SuccessAlert.args = {
  status: 'success',
  title: 'Success Alert',
  description: 'This is a success alert with some description.',
};

export const InfoAlert = Template.bind({});
InfoAlert.args = {
  status: 'info',
  title: 'Info Alert',
  description: 'This is an informational alert with some description.',
};

export const FeatureAlert = Template.bind({});
FeatureAlert.args = {
  status: 'feature',
  title: 'Feature Alert',
  description: 'This is a feature alert with some description.',
};

// Style variations
export const FilledAlert = Template.bind({});
FilledAlert.args = {
  status: 'error',
  style: 'filled',
  title: 'Filled Alert',
  description: 'This is a filled alert with some description.',
};

export const StrokeAlert = Template.bind({});
StrokeAlert.args = {
  status: 'warning',
  style: 'stroke',
  title: 'Stroke Alert',
  description: 'This is a stroke alert with some description.',
};

export const LightAlert = Template.bind({});
LightAlert.args = {
  status: 'success',
  style: 'light',
  title: 'Light Alert',
  description: 'This is a light alert with some description.',
};

export const LighterAlert = Template.bind({});
LighterAlert.args = {
  status: 'info',
  style: 'lighter',
  title: 'Lighter Alert',
  description: 'This is a lighter alert with some description.',
};

// Size variations
export const SmallAlert = Template.bind({});
SmallAlert.args = {
  size: 'small',
  title: 'Small Alert',
  description: 'This is a small alert with some description.',
};

export const LargeAlert = Template.bind({});
LargeAlert.args = {
  size: 'large',
  title: 'Medium Alert',
  description: 'This is a medium alert with some description.',
};

export const XSmallAlert = Template.bind({});
XSmallAlert.args = {
  size: 'x-small',
  title: 'X-Small Alert',
  description: 'This is an x-small alert with some description.',
};

// Custom options
export const WithIconAndLinks = Template.bind({});
WithIconAndLinks.args = {
  status: 'feature',
  icon: true,
  linkButton: true,
  doubleLink: true,
  dismissIcon: true,
  title: 'Custom Alert with Icon and Links',
  description:
    'This alert includes an icon, link button, double link, and dismiss icon.',
};

export default meta;
