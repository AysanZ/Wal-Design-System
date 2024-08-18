import { Meta, StoryFn } from '@storybook/react';
import { Icon, IconProps } from '.';
import { IconCategoryDisplay, IconNames } from './utils/iconCategoryHelpers';

const meta: Meta<typeof Icon> = {
  title: 'Components/Icon',
  component: Icon,
  argTypes: {
    name: {
      control: {
        type: 'select',
      },
      options: IconNames,
      description: 'Icon name from the defined enums.',
    },
    size: {
      control: 'number',
      description: 'Size of the icon.',
      defaultValue: 24,
    },
    color: {
      control: 'color',
      description: 'Color of the icon.',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes for the icon.',
    },
  },
};

const ArrowIconTemplate: StoryFn<IconProps> = () => (
  <IconCategoryDisplay category="Arrow" />
);
export const ArrowIcons = ArrowIconTemplate.bind({});

const BuildingIconTemplate: StoryFn<IconProps> = () => (
  <IconCategoryDisplay category="Building" />
);
export const BuildingIcons = BuildingIconTemplate.bind({});

const BusinessIconTemplate: StoryFn<IconProps> = () => (
  <IconCategoryDisplay category="Business" />
);
export const BusinessIcons = BusinessIconTemplate.bind({});

const CommunicationIconTemplate: StoryFn<IconProps> = () => (
  <IconCategoryDisplay category="Communication" />
);
export const CommunicationIcons = CommunicationIconTemplate.bind({});

const DesignIconTemplate: StoryFn<IconProps> = () => (
  <IconCategoryDisplay category="Design" />
);
export const DesignIcons = DesignIconTemplate.bind({});

const DevelopmentIconTemplate: StoryFn<IconProps> = () => (
  <IconCategoryDisplay category="Development" />
);
export const DevelopmentIcons = DevelopmentIconTemplate.bind({});

const DeviceIconTemplate: StoryFn<IconProps> = () => (
  <IconCategoryDisplay category="Device" />
);
export const DeviceIcons = DeviceIconTemplate.bind({});

const DocumentIconTemplate: StoryFn<IconProps> = () => (
  <IconCategoryDisplay category="Document" />
);
export const DocumentIcons = DocumentIconTemplate.bind({});

const EditorIconTemplate: StoryFn<IconProps> = () => (
  <IconCategoryDisplay category="Editor" />
);
export const EditorIcons = EditorIconTemplate.bind({});

const FinanceIconTemplate: StoryFn<IconProps> = () => (
  <IconCategoryDisplay category="Finance" />
);
export const FinanceIcons = FinanceIconTemplate.bind({});

const FoodIconTemplate: StoryFn<IconProps> = () => (
  <IconCategoryDisplay category="Food" />
);
export const FoodIcons = FoodIconTemplate.bind({});

const HealthMedicalIconTemplate: StoryFn<IconProps> = () => (
  <IconCategoryDisplay category="Health&Medical" />
);
export const HealthMedicalIcons = HealthMedicalIconTemplate.bind({});

const LogoIconTemplate: StoryFn<IconProps> = () => (
  <IconCategoryDisplay category="Logo" />
);
export const LogoIcons = LogoIconTemplate.bind({});

const MapIconTemplate: StoryFn<IconProps> = () => (
  <IconCategoryDisplay category="Map" />
);
export const MapIcons = MapIconTemplate.bind({});

const MediaIconTemplate: StoryFn<IconProps> = () => (
  <IconCategoryDisplay category="Media" />
);
export const MediaIcons = MediaIconTemplate.bind({});

const MiscellaneousIconTemplate: StoryFn<IconProps> = () => (
  <IconCategoryDisplay category="Miscellaneous" />
);
export const MiscellaneousIcons = MiscellaneousIconTemplate.bind({});

const SystemIconTemplate: StoryFn<IconProps> = () => (
  <IconCategoryDisplay category="System" />
);
export const SystemIcons = SystemIconTemplate.bind({});

const UserAndFacesIconTemplate: StoryFn<IconProps> = () => (
  <IconCategoryDisplay category="UserAndFaces" />
);
export const UserAndFacesIcons = UserAndFacesIconTemplate.bind({});

const WeatherIconTemplate: StoryFn<IconProps> = () => (
  <IconCategoryDisplay category="Weather" />
);
export const WeatherIcons = WeatherIconTemplate.bind({});

export default meta;
