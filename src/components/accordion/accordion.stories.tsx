import { StoryFn, Meta } from '@storybook/react';
import { Accordion, AccordionProps } from '.';
import { Icon } from '@components/icon';
import { useTranslation } from 'react-i18next';

const meta: Meta<typeof Accordion> = {
  title: 'Components/Accordion',
  component: Accordion,
  argTypes: {
    flipIcon: {
      control: { type: 'boolean' },
      description: 'Controls the position of the expand/collapse icon.',
      defaultValue: false,
    },
    hasIcon: {
      control: { type: 'boolean' },
      description: 'Determines if an icon should be displayed at the start.',
      defaultValue: false,
    },
    icon: {
      description: 'Icon to display when hasIcon is true.',
      table: {
        type: { summary: 'ReactNode' },
      },
    },
    title: {
      control: 'text',
      description: 'Title of the accordion.',
      table: {
        type: { summary: 'string' },
      },
    },
    content: {
      control: 'text',
      description: 'Description of the accordion.',
      table: {
        type: { summary: 'string' },
      },
    },
    isOpen: {
      control: { type: 'boolean' },
      description: 'Controls whether the accordion is expanded or collapsed.',
      defaultValue: false,
    },
    onToggle: {
      action: 'toggled',
      description:
        'Callback function that is called when the accordion is toggled.',
    },
    className: {
      control: 'text',
      description:
        'Additional custom CSS classes for styling the Accordion component.',
      table: {
        type: { summary: 'string' },
      },
    },
    customCollapseIcon: {
      description: 'Icon to display as collapse icon',
      table: {
        type: { summary: 'ReactNode' },
      },
    },
    customExpandIcon: {
      description: 'Icon to display as expand icon',
      table: {
        type: { summary: 'ReactNode' },
      },
    },
  },
};

const Template: StoryFn<AccordionProps> = (args) => {
  const { t } = useTranslation();
  return (
    <Accordion
      {...args}
      title={t(`accordion.${args.title || 'title'}`)}
      content={t(`accordion.${args.content || 'content'}`)}
    />
  );
};

export const Default = Template.bind({});
Default.args = {
  flipIcon: false,
  hasIcon: true,
  icon: (
    <Icon
      name="account-circle-line"
      className="text-sub-600 dark:text-sub-600-dark"
    />
  ),
  isOpen: false,
};

export const Open = Template.bind({});
Open.args = {
  ...Default.args,
  isOpen: true,
};

export const WithIcon = Template.bind({});
WithIcon.args = {
  ...Default.args,
  hasIcon: true,
  icon: (
    <Icon name="lock-line" className="text-sub-600 dark:text-sub-600-dark" />
  ),
};

export const FlippedIcon = Template.bind({});
FlippedIcon.args = {
  ...Default.args,
  flipIcon: true,
  hasIcon: false,
};

export const CustomContent = Template.bind({});
CustomContent.args = {
  ...Default.args,
  title: 'customTitle',
  content: 'customContent',
};

export const CustomCollapseAndExpandIcon = Template.bind({});
CustomCollapseAndExpandIcon.args = {
  ...Default.args,
  customCollapseIcon: 'arrow-up-s-line',
  customExpandIcon: 'arrow-down-s-line',
};

export const CustomClassName = Template.bind({});
CustomClassName.args = {
  ...Default.args,
  className: 'bg-gray-200 border border-gray-300 rounded-lg shadow-md',
};

export default meta;
