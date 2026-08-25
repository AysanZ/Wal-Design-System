import { useState } from 'react';
import { StoryFn, Meta } from '@storybook/react';
import { useTranslation } from 'react-i18next';
import { Alert } from '.';
import { Button } from '@components/button';

const meta: Meta<typeof Alert> = {
  title: 'Components/Alert',
  component: Alert,
  parameters: {
    docs: {
      description: {
        component: `The **Alert** component surfaces an inline status message: a result, a warning, a piece of context the user needs before continuing.

**Key Features:**
- **5 Statuses**: Error, Warning, Success, Info, Feature
- **4 Appearances**: Filled, Light, Lighter, Stroke
- **3 Sizes**: X-Small, Small, Large
- **Actions**: up to two inline links or buttons
- **Dismissible**: optional close button with a required accessible name

**Accessibility — the important change**

The previous version rendered a plain \`<div>\`, which meant an alert appearing after a failed form submit was completely silent for screen-reader users. That is the single most consequential thing an alert has to get right.

This version sets \`role="alert"\` / \`role="status"\` with a matching \`aria-live\`, derived from \`status\`:

| status | default urgency | behaviour |
| --- | --- | --- |
| error, warning | \`assertive\` | interrupts immediately |
| success, info, feature | \`polite\` | waits for a pause |

Override with \`urgency\`. Use **\`urgency="off"\`** for alerts that are already on screen at first paint — otherwise every page load shouts at the user.

**Other changes**
- \`style\` → **\`appearance\`** (it shadowed React's \`style\` prop).
- \`linkButton\` / \`doubleLink\` / \`dismissIcon\` were declared but never rendered anything. Replaced by a working \`actions\` array and \`dismissible\`.
- The 5-deep nested ternary that built the class list is now a \`cva\` matrix. It was hiding a real bug: the info + light cell resolved to the \`information-dark\` token instead of \`information-light-dark\`.`,
      },
    },
  },

  argTypes: {
    status: {
      control: { type: 'select' },
      options: ['error', 'warning', 'success', 'info', 'feature'],
      description: 'Semantic status. Also picks the default icon and urgency.',
      table: { defaultValue: { summary: 'info' } },
    },
    appearance: {
      control: { type: 'select' },
      options: ['filled', 'light', 'lighter', 'stroke'],
      description: 'Visual treatment.',
      table: { defaultValue: { summary: 'filled' } },
    },
    size: {
      control: { type: 'select' },
      options: ['x-small', 'small', 'large'],
      table: { defaultValue: { summary: 'small' } },
    },
    urgency: {
      control: { type: 'select' },
      options: ['assertive', 'polite', 'off'],
      description:
        'How assistive tech announces the alert. Defaults from `status`. Use `off` for alerts present on page load.',
    },
    title: { control: 'text', description: 'Alert heading. Required.' },
    description: { control: 'text', description: 'Optional supporting copy.' },
    icon: {
      control: 'boolean',
      description: 'Show the default status glyph. Pass a node to override it.',
      table: { defaultValue: { summary: 'true' } },
    },
    dismissible: {
      control: 'boolean',
      table: { defaultValue: { summary: 'false' } },
    },
    dismissLabel: {
      control: 'text',
      description: 'Accessible name for the close button.',
    },
    actions: { control: false, table: { type: { summary: 'AlertAction[]' } } },
  },
};

const Template: StoryFn<typeof Alert> = (args) => <Alert {...args} />;

// ====================== Basic Stories ======================

export const Default = Template.bind({});
Default.args = {
  status: 'info',
  appearance: 'filled',
  size: 'small',
  title: 'Insert your alert title here!',
};

export const WithDescription = Template.bind({});
WithDescription.args = {
  status: 'success',
  appearance: 'light',
  size: 'large',
  title: 'Your changes were saved',
  description: 'Everything on this page is up to date.',
};

// ====================== Status Variations ======================

const STATUSES = ['error', 'warning', 'success', 'info', 'feature'] as const;

export const AllStatuses = () => (
  <div className="flex w-full max-w-xl flex-col gap-3">
    {STATUSES.map((status) => (
      <Alert
        key={status}
        status={status}
        appearance="light"
        size="large"
        urgency="off"
        title={`This is a ${status} alert`}
        description="Insert the alert description here. It would look better as two lines of text."
      />
    ))}
  </div>
);

export const AllAppearances = () => (
  <div className="flex w-full max-w-xl flex-col gap-3">
    {(['filled', 'light', 'lighter', 'stroke'] as const).map((appearance) => (
      <Alert
        key={appearance}
        status="info"
        appearance={appearance}
        size="large"
        urgency="off"
        title={`Appearance: ${appearance}`}
        description="Flip the theme toolbar — every appearance stays legible in dark mode."
      />
    ))}
  </div>
);

// ====================== Sizes ======================

export const Sizes = () => (
  <div className="flex w-full max-w-xl flex-col gap-3">
    {(['x-small', 'small', 'large'] as const).map((size) => (
      <Alert
        key={size}
        status="warning"
        appearance="light"
        size={size}
        urgency="off"
        title={`Size: ${size}`}
      />
    ))}
  </div>
);

// ====================== Actions & Dismiss ======================

export const WithActions = Template.bind({});
WithActions.args = {
  status: 'error',
  appearance: 'light',
  size: 'large',
  title: 'We could not save your changes',
  description: 'Check your connection and try again.',
  actions: [{ label: 'Try again' }, { label: 'Learn more', href: '#' }],
};

/** Dismissing is real state — the alert actually unmounts. */
export const Dismissible = () => {
  const [visible, setVisible] = useState(true);
  return (
    <div className="flex w-full max-w-xl flex-col items-start gap-3">
      {visible ? (
        <Alert
          status="feature"
          appearance="light"
          size="large"
          dismissible
          dismissLabel="Dismiss"
          onDismiss={() => setVisible(false)}
          title="A new version is available"
          description="Reload the page to get the latest features."
        />
      ) : (
        <Button
          size="sm"
          appearance="stroke"
          color="neutral"
          onClick={() => setVisible(true)}
        >
          Bring it back
        </Button>
      )}
    </div>
  );
};

// ====================== Localized ======================

export const Localized = () => {
  const { t } = useTranslation();
  return (
    <div className="flex w-full max-w-xl flex-col gap-3">
      <Alert
        status="success"
        appearance="light"
        size="large"
        urgency="off"
        title={t('alert.successTitle')}
        description={t('alert.successDescription')}
      />
      <Alert
        status="error"
        appearance="light"
        size="large"
        urgency="off"
        title={t('alert.errorTitle')}
        description={t('alert.errorDescription')}
        actions={[
          { label: t('alert.retry') },
          { label: t('alert.learnMore'), href: '#' },
        ]}
      />
      <Alert
        status="feature"
        appearance="lighter"
        size="large"
        urgency="off"
        dismissible
        dismissLabel={t('alert.dismiss')}
        title={t('alert.infoTitle')}
        description={t('alert.infoDescription')}
      />
    </div>
  );
};

export default meta;
