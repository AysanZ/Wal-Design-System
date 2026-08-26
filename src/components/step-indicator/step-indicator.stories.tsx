import { useState } from 'react';
import { StoryFn, Meta } from '@storybook/react';
import { useTranslation } from 'react-i18next';
import { StepIndicator, Step } from '.';
import type { StepIndicatorLabels } from '.';
import { Button } from '@components/button';

const meta: Meta<typeof StepIndicator> = {
  title: 'Components/Step Indicator',
  component: StepIndicator,
  parameters: {
    docs: {
      description: {
        component: `The **Step Indicator** shows where the user is in a multi-step flow. Generated from the Figma "❖ Step Indicator" page.

**Key Features:**
- **3 Types**: \`number\`, \`dot\`, \`bar\`
- **2 Orientations**: horizontal and vertical
- **State per step** — complete · current · upcoming · error
- **\`onSelect\`** turns a step into a real button, for a wizard you can walk back through

**State *is* a prop here** — unlike hover or focus elsewhere in this system. A step's state is a fact about where the user is, not a pointer interaction. Three of the four are derived from \`value\` and the position; \`status\` overrides that, which is how you mark an \`error\`.

**Quantity is not a prop.** The step count is however many children you pass.

**Accessibility**

A named \`<nav>\` around an ordered list, with \`aria-current="step"\` on the one in progress. Each step also carries a visually hidden state word — "completed", "current", "upcoming" — because otherwise the three are told apart by a tick and two shades of one colour, which is nothing at all to a screen reader and very little to a colour-blind user. The current marker also carries a ring, so it is not colour alone on screen either. Connectors are decorative and hidden.

A step is inert text unless \`onSelect\` is passed — a step that looks clickable and does nothing is worse than one that plainly is not.

**RTL**

The flow runs right-to-left in Persian for free: connectors are flex children, so the row reverses with the direction and the ticks land on the steps behind the user rather than ahead. Step numbers come from \`Intl\`. Switch the Locale toolbar to فارسی.`,
      },
    },
  },
  argTypes: {
    value: { control: { type: 'number', min: 0, max: 3 } },
    orientation: {
      control: { type: 'inline-radio' },
      options: ['horizontal', 'vertical'],
      table: { defaultValue: { summary: 'horizontal' } },
    },
    type: {
      control: { type: 'inline-radio' },
      options: ['number', 'dot', 'bar'],
      table: { defaultValue: { summary: 'number' } },
    },
    size: {
      control: { type: 'inline-radio' },
      options: ['sm', 'md'],
      table: { defaultValue: { summary: 'md' } },
    },
    labels: {
      control: false,
      table: { type: { summary: 'StepIndicatorLabels' } },
    },
  },
};

/** Strings are props, so the docs surface is what translates — not the library. */
function useLabels(): StepIndicatorLabels {
  const { t } = useTranslation();
  return {
    root: t('stepIndicator.label'),
    step: (index, total) => t('stepIndicator.step', { index, total }),
    complete: t('stepIndicator.complete'),
    current: t('stepIndicator.current'),
    upcoming: t('stepIndicator.upcoming'),
    error: t('stepIndicator.error'),
  };
}

const Template: StoryFn<typeof StepIndicator> = (args) => {
  const { t } = useTranslation();
  const labels = useLabels();
  return (
    <div className="w-[560px]">
      <StepIndicator {...args} labels={labels}>
        <Step
          label={t('stepIndicator.accountTitle')}
          description={t('stepIndicator.accountDescription')}
        />
        <Step
          label={t('stepIndicator.shippingTitle')}
          description={t('stepIndicator.shippingDescription')}
        />
        <Step
          label={t('stepIndicator.paymentTitle')}
          description={t('stepIndicator.paymentDescription')}
        />
        <Step
          label={t('stepIndicator.reviewTitle')}
          description={t('stepIndicator.reviewDescription')}
        />
      </StepIndicator>
    </div>
  );
};

// ====================== Basic Stories ======================

export const Default = Template.bind({});
Default.args = { value: 1, type: 'number' };

export const Dots = Template.bind({});
Dots.args = { value: 1, type: 'dot' };

export const Bars = Template.bind({});
Bars.args = { value: 1, type: 'bar' };

export const Vertical = Template.bind({});
Vertical.args = { value: 1, orientation: 'vertical' };

export const Small = Template.bind({});
Small.args = { value: 2, size: 'sm' };

// ====================== States ======================

/** `status` overrides the derived state — this is what `error` is for. */
export const WithError = () => {
  const { t } = useTranslation();
  const labels = useLabels();
  return (
    <div className="w-[560px]">
      <StepIndicator value={2} labels={labels}>
        <Step label={t('stepIndicator.accountTitle')} />
        <Step label={t('stepIndicator.shippingTitle')} />
        <Step label={t('stepIndicator.paymentTitle')} status="error" />
        <Step label={t('stepIndicator.reviewTitle')} />
      </StepIndicator>
    </div>
  );
};

/** Labels are optional; markers alone work for a compact header. */
export const MarkersOnly = () => {
  const labels = useLabels();
  return (
    <div className="w-[280px]">
      <StepIndicator value={2} type="dot" labels={labels}>
        <Step />
        <Step />
        <Step />
        <Step />
      </StepIndicator>
    </div>
  );
};

// ====================== Interactive wizard ======================

/** `onSelect` makes the finished steps real buttons you can go back to. */
export const Wizard = () => {
  const { t } = useTranslation();
  const labels = useLabels();
  const [step, setStep] = useState(1);
  const titles = [
    'accountTitle',
    'shippingTitle',
    'paymentTitle',
    'reviewTitle',
  ];

  return (
    <div className="flex w-[560px] flex-col gap-6">
      <StepIndicator value={step} labels={labels}>
        {titles.map((title, index) => (
          <Step
            key={title}
            label={t(`stepIndicator.${title}`)}
            onSelect={index <= step ? () => setStep(index) : undefined}
          />
        ))}
      </StepIndicator>

      <div className="flex items-center justify-between gap-2">
        <Button
          appearance="stroke"
          disabled={step === 0}
          onClick={() => setStep((current) => Math.max(0, current - 1))}
        >
          {t('stepIndicator.back')}
        </Button>
        <Button
          disabled={step === titles.length - 1}
          onClick={() =>
            setStep((current) => Math.min(titles.length - 1, current + 1))
          }
        >
          {t('stepIndicator.next')}
        </Button>
      </div>
    </div>
  );
};

export default meta;
