import { StoryFn, Meta } from '@storybook/react';
import { AvatarGroupProps, AvatarGroup } from '.';

const meta: Meta<typeof AvatarGroup> = {
  title: 'Components/AvatarGroup',
  component: AvatarGroup,
  parameters: {
    docs: {
      description: {
        component: `The **AvatarGroup** component allows for grouping multiple avatars in a compact and visually appealing way, ideal for representing a collection of user profiles, team members, or other entities. This component supports various display options and includes an indicator for additional avatars when the number of avatars exceeds a specified limit.

Key Features:
- **Avatar Collection Display**: Effortlessly arrange multiple avatars together, providing a clean representation of a group or team.
- **Show More Indicator**: If the number of avatars exceeds the display limit, an indicator with a "+number" label appears, indicating the count of extra avatars.
- **Customizable Avatars**: Each avatar can be personalized with properties such as background color, image, initials, or icons, adapting to different contexts within your application.
- **Responsive Layout**: Ensures a consistent and visually appealing layout across various screen sizes.

The **AvatarGroup** component enhances the visual presentation of groups, making it an ideal choice for user profile displays, teams, or any scenario where multiple avatars need to be represented compactly.`,
      },
    },
  },
  argTypes: {
    size: {
      control: {
        type: 'select',
        options: [
          'xxxsmall',
          'xxsmall',
          'xsmall',
          'small',
          'medium',
          'large',
          'xxxlarge',
          'xxlarge',
          'xlarge',
        ],
      },
      description: 'Size of each avatar in the group.',
      defaultValue: 'medium',
      table: {
        type: { summary: 'string' },
      },
    },
    editNumber: {
      control: { type: 'number' },
      description: 'Number indicating the extra avatars not shown.',
      defaultValue: 0,
      table: {
        type: { summary: 'number' },
      },
    },
    showMore: {
      control: { type: 'boolean' },
      description: 'Flag to show additional avatars as a +number.',
      defaultValue: true,
    },
    avatarData: {
      description:
        'Array of avatar data for displaying each avatar in the group. Each item should contain information like `firstName`, `lastName`, `bgColor`, `imageSrc`, `icon`, and more.',
      table: {
        type: {
          summary:
            'Array<{ firstName: string; lastName: string; imageSrc?: string; icon?: ReactNode; bgColor?: string; customIcon?: ReactNode; onImageError?: () => void; className?: string }>',
        },
      },
    },
    className: {
      control: { type: 'text' },
      description: 'Custom class names for additional styling.',
    },
  },
};

const Template: StoryFn<AvatarGroupProps> = (args) => <AvatarGroup {...args} />;

export const Default = Template.bind({});
Default.args = {
  size: 'medium',
  editNumber: 3,
  showMore: true,
  avatarData: [
    {
      firstName: 'John',
      lastName: 'Doe',
      imageSrc:
        'https://img.freepik.com/free-photo/handsome-sensitive-red-head-man-smiling_23-2149509800.jpg?t=st=1731285314~exp=1731288914~hmac=0696caaf06579ab24662b72a6873da8231ca6dc405cef9ecd04d2de0dcf27c36&w=740',
    },
    {
      firstName: 'Jane',
      lastName: 'Smith',
      bgColor: 'bg-red-500',
      imageSrc:
        'https://img.freepik.com/free-photo/thoughtful-young-woman-pondering-how-solve-problem_176420-16295.jpg?t=st=1731285485~exp=1731289085~hmac=dac169a8746db24a31f8de18c078438ca8277b17ce87aa5da26490db4c62ad7e&w=1380',
    },
    {
      firstName: 'Alex',
      lastName: 'Brown',
      icon: true,
      imageSrc:
        'https://img.freepik.com/free-photo/portrait-man-looking-front-him_23-2148422271.jpg?t=st=1731285547~exp=1731289147~hmac=191779ec6eef5f5739c1e69e9ec18bfe4b539f9c9cfd0d4eabe4419fc1fec53c&w=1380',
    },
  ],
};

export const LargeAvatars = Template.bind({});
LargeAvatars.args = {
  ...Default.args,
  size: 'xxxlarge',
};

export const SmallAvatars = Template.bind({});
SmallAvatars.args = {
  ...Default.args,
  size: 'medium',
  showMore: true,
  editNumber: 5,
};

export const CustomAvatars = Template.bind({});
CustomAvatars.args = {
  ...Default.args,
  size: 'large',
  avatarData: [
    {
      firstName: 'Alice',
      lastName: 'Wonderland',
      bgColor: 'bg-blue-500',
    },
    {
      firstName: 'Charlie',
      lastName: 'Chaplin',
      imageSrc:
        'https://img.freepik.com/free-photo/handsome-sensitive-red-head-man-smiling_23-2149509800.jpg?t=st=1731285314~exp=1731288914~hmac=0696caaf06579ab24662b72a6873da8231ca6dc405cef9ecd04d2de0dcf27c36&w=740',
    },
  ],
};

export const WithoutShowMore = Template.bind({});
WithoutShowMore.args = {
  ...Default.args,
  showMore: false,
};

export const AvatarGroupWithCustomClassName = Template.bind({});
AvatarGroupWithCustomClassName.args = {
  ...Default.args,
  className: 'border-red-600 border-3 bg-yellow-400',
};

export default meta;
