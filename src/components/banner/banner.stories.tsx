import { useState } from 'react';
import { StoryFn, Meta } from '@storybook/react';
import { useTranslation } from 'react-i18next';
import { RiSparklingFill } from '@remixicon/react';
import { Banner } from '.';
import { Icon } from '@components/icon';
import { Button } from '@components/button';

const meta: Meta<typeof Banner> = {
  title: 'Components/Banner',
  component: Banner,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `The **Banner** component delivers crucial alerts and information prominently at the top of the screen. Generated from the Figma "❖ Banner" page.

**Key Features:**
- **5 Statuses**: Error, Warning, Success, Information, Feature
- **4 Appearances**: Filled, Light, Lighter, Stroke
- **Fixed 44px height**, full container width — no size axis, by design
- **Inline action** link and an optional dismiss button
- **\`sticky\`** pins it to the top of the viewport

**Banner vs Alert**

They share a colour matrix on purpose, but they are not interchangeable:

| | Alert | Banner |
| --- | --- | --- |
| Placement | next to the thing it describes | top of the page |
| Height | wraps, 3 sizes | one line, fixed 44px |
| Trigger | something the user just did | the whole session |
| Default urgency | \`assertive\` for errors | \`polite\` for everything |

That last row matters. A banner is usually already on screen when the page loads, so announcing it assertively interrupts a screen-reader user on **every single navigation**. Pass \`urgency="assertive"\` only when the banner appears mid-session in response to an event.

**RTL**

The dismiss button uses \`end-3\`, not \`right-3\`. Switch the Locale toolbar to فارسی — it moves to the left corner on its own, and the status icon leads from the right.`,
      },
    },
  },

  argTypes: {
    status: {
      control: { type: 'select' },
      options: ['error', 'warning', 'success', 'info', 'feature'],
      description: 'Semantic status. Also picks the default icon.',
      table: { defaultValue: { summary: 'info' } },
    },
    appearance: {
      control: { type: 'select' },
      options: ['filled', 'light', 'lighter', 'stroke'],
      description: 'Visual treatment.',
      table: { defaultValue: { summary: 'filled' } },
    },
    title: { control: 'text', description: 'Leading message. Required.' },
    description: {
      control: 'text',
      description: 'Optional detail, shown after the title separated by a `∙`.',
    },
    icon: {
      control: 'boolean',
      description: 'Show the default status glyph. Pass a node to override it.',
      table: { defaultValue: { summary: 'true' } },
    },
    action: { control: false, table: { type: { summary: 'BannerAction' } } },
    dismissible: {
      control: 'boolean',
      table: { defaultValue: { summary: 'false' } },
    },
    dismissLabel: {
      control: 'text',
      description: 'Accessible name for the close button.',
    },
    sticky: {
      control: 'boolean',
      description: 'Pin to the top of the viewport.',
      table: { defaultValue: { summary: 'false' } },
    },
    urgency: {
      control: { type: 'select' },
      options: ['assertive', 'polite', 'off'],
      description:
        'How assistive tech announces it. `polite` by default — a banner is usually already on screen at load.',
      table: { defaultValue: { summary: 'polite' } },
    },
  },
};

const Template: StoryFn<typeof Banner> = (args) => <Banner {...args} />;

// ====================== Basic Stories ======================

export const Default = Template.bind({});
Default.args = {
  status: 'error',
  appearance: 'filled',
  title: 'Insert your alert title here!',
  description: 'Insert your description here.',
  action: { label: 'Upgrade', href: '#' },
  dismissible: true,
  dismissLabel: 'Dismiss',
};

export const TitleOnly = Template.bind({});
TitleOnly.args = {
  status: 'info',
  appearance: 'light',
  title: 'Scheduled maintenance tonight from 02:00 to 04:00.',
};

export const WithoutIcon = Template.bind({});
WithoutIcon.args = {
  status: 'feature',
  appearance: 'lighter',
  title: 'New: bilingual date picker',
  description: 'Jalali and Gregorian, in one component.',
  icon: false,
  action: { label: 'See docs', href: '#' },
};

export const CustomIcon = Template.bind({});
CustomIcon.args = {
  status: 'feature',
  appearance: 'filled',
  title: 'Wal 2.0 is here',
  description: 'Tokens, theming and RTL, rebuilt.',
  icon: <Icon icon={RiSparklingFill} />,
  action: { label: "What's new", href: '#' },
};

// ====================== Full Matrix ======================

const STATUSES = ['error', 'warning', 'success', 'info', 'feature'] as const;
const APPEARANCES = ['filled', 'light', 'lighter', 'stroke'] as const;

/** The whole 4 × 5 grid. Flip to Dark Mode: every row must stay legible. */
export const AllCombinations = () => (
  <div className="flex flex-col gap-6">
    {APPEARANCES.map((appearance) => (
      <div key={appearance} className="flex flex-col gap-1">
        <span className="px-12 text-[12px] font-medium uppercase tracking-wider text-sub-600">
          {appearance}
        </span>
        {STATUSES.map((status) => (
          <Banner
            key={status}
            status={status}
            appearance={appearance}
            urgency="off"
            title={`This is a ${status} banner`}
            description="Insert your description here."
            action={{ label: 'Action', href: '#' }}
          />
        ))}
      </div>
    ))}
  </div>
);

export const AllStatuses = () => (
  <div className="flex flex-col gap-1">
    {STATUSES.map((status) => (
      <Banner
        key={status}
        status={status}
        appearance="filled"
        urgency="off"
        title={`This is a ${status} banner`}
        description="Insert your description here."
        dismissible
        dismissLabel="Dismiss"
      />
    ))}
  </div>
);

// ====================== Dismiss ======================

/** Dismissing is real state — the banner actually unmounts. */
export const Dismissible = () => {
  const [visible, setVisible] = useState(true);
  return (
    <div className="flex flex-col items-start gap-4">
      {visible ? (
        <Banner
          status="warning"
          appearance="light"
          title="Your trial ends in 3 days"
          description="Upgrade to keep your projects."
          action={{ label: 'Upgrade' }}
          dismissible
          dismissLabel="Dismiss"
          onDismiss={() => setVisible(false)}
        />
      ) : (
        <div className="p-12">
          <Button
            size="sm"
            appearance="stroke"
            color="neutral"
            onClick={() => setVisible(true)}
          >
            Bring it back
          </Button>
        </div>
      )}
    </div>
  );
};

// ====================== In context ======================

/** `sticky` keeps the banner pinned while the page scrolls beneath it. */
export const StickyInPage = () => (
  <div className="h-[420px] overflow-y-auto">
    <Banner
      sticky
      status="info"
      appearance="filled"
      urgency="off"
      title="You are viewing a demo workspace"
      description="Changes here are not saved."
      action={{ label: 'Create a real one', href: '#' }}
    />
    <div className="flex flex-col gap-4 p-12">
      {Array.from({ length: 12 }, (_, index) => (
        <p key={index} className="text-[14px] leading-6 text-sub-600">
          Scroll — the banner stays pinned to the top of the scroll container.
          Paragraph {index + 1}.
        </p>
      ))}
    </div>
  </div>
);

// ====================== Localized ======================

export const Localized = () => {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col gap-1">
      <Banner
        status="warning"
        appearance="filled"
        urgency="off"
        title={t('banner.trialTitle')}
        description={t('banner.trialDescription')}
        action={{ label: t('banner.upgrade'), href: '#' }}
        dismissible
        dismissLabel={t('banner.dismiss')}
      />
      <Banner
        status="info"
        appearance="light"
        urgency="off"
        title={t('banner.maintenanceTitle')}
        description={t('banner.maintenanceDescription')}
      />
      <Banner
        status="feature"
        appearance="lighter"
        urgency="off"
        title={t('banner.featureTitle')}
        description={t('banner.featureDescription')}
        action={{ label: t('banner.learnMore'), href: '#' }}
      />
    </div>
  );
};

export default meta;
