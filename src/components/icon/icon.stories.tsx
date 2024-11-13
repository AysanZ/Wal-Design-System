import { Meta, StoryFn } from '@storybook/react';
import { IconCategoryDisplay, Icon, IconProps, IconNames } from '.';

const meta: Meta<typeof Icon> = {
  title: 'Components/Icon',
  component: Icon,
  parameters: {
    docs: {
      description: {
        component: `The **Icon** component is an integral part of the design system, offering a simple and efficient way to incorporate visual symbols across the application. By leveraging the RemixIcon library, this component provides access to a vast collection of over 2700 icons, organized into intuitive categories and available in both line and filled styles, which enables greater design flexibility and adaptability.

Key Features:
- **Extensive Icon Library**: Built on the RemixIcon collection, it includes thousands of icons crafted by Jimmy Cheung and Wendy Gao, allowing you to find the perfect icon for any use case.
- **Customizable Appearance**: Supports customization options such as size, color, and additional classes to seamlessly blend with various design themes.
- **Lazy Loading with Suspense**: Uses React’s \`Suspense\` for lazy loading, which means icons are loaded only when needed. This optimizes performance, especially in applications with numerous icons.
- **Reliable Fallback**: If the specified icon is not available, a fallback is provided to ensure the component doesn't break or display empty content.

### Usage
To use the **Icon** component, simply specify the icon name, along with optional size, color, and class name parameters:
\`\`\`jsx
<Icon name="home" size={32} color="#000" />
\`\`\`

### Ideal Use Cases
The **Icon** component is perfect for:
- Creating visually appealing navigation elements.
- Representing actions, states, or items in a compact form.
- Enhancing user experience by providing recognizable visual cues without relying on text.

This component, licensed under the Apache License, is suitable for both commercial and non-commercial projects, making it a versatile choice for your UI toolkit.`,
      },
    },
  },

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
