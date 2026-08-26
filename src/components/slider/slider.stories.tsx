import { useState } from 'react';
import { StoryFn, Meta } from '@storybook/react';
import { useTranslation } from 'react-i18next';
import { Slider } from '.';
import type { SliderValue } from '.';

const meta: Meta<typeof Slider> = {
  title: 'Components/Slider',
  component: Slider,
  parameters: {
    docs: {
      description: {
        component: `The **Slider** picks a value, or a range. Generated from the Figma "❖ Slider" page.

**Key Features:**
- **Single or range** — a \`number\` renders one thumb, a \`[number, number]\` renders two
- **2 Sizes**, 6 colours, \`min\` / \`max\` / \`step\`
- **\`marks\`** for ticks, with optional labels
- **\`minStepsBetweenThumbs\`** to keep a range from collapsing
- **\`onValueChange\` + \`onValueCommit\`**

**Type is not a variant.** Figma models Single and Range separately; here it follows from the shape of the value, so a range slider cannot be handed a single number by accident and a single slider cannot silently grow a second thumb.

**Two callbacks, on purpose.** \`onValueChange\` fires on every step, \`onValueCommit\` once on release. A slider wired straight to a network request sends one per pixel of drag, which is the usual way one takes a server down.

**RTL**

The pointer ratio is mirrored under \`dir="rtl"\`, or dragging towards the high end would lower the value. The fill and thumbs are placed with \`inset-inline-start\` and offset with \`margin-inline-start\`, so nothing needs a physical \`left\`. Arrow keys follow the same rule — \`ArrowRight\` raises the value in English and lowers it in Persian, which is what WAI-ARIA specifies and what the user's hand expects — while Up and Down always mean more and less. Switch the Locale toolbar to فارسی and try both.

**Keyboard**

Arrows step, <kbd>Shift</kbd> is not needed because <kbd>PageUp</kbd>/<kbd>PageDown</kbd> move ten steps, and <kbd>Home</kbd>/<kbd>End</kbd> jump to the ends. \`aria-valuetext\` carries the localized string, because \`aria-valuenow\` is a number and a Persian screen reader would otherwise read Latin digits.`,
      },
    },
  },
  argTypes: {
    min: { control: 'number', table: { defaultValue: { summary: '0' } } },
    max: { control: 'number', table: { defaultValue: { summary: '100' } } },
    step: { control: 'number', table: { defaultValue: { summary: '1' } } },
    size: {
      control: { type: 'inline-radio' },
      options: ['sm', 'md'],
      table: { defaultValue: { summary: 'md' } },
    },
    color: {
      control: { type: 'select' },
      options: ['primary', 'success', 'warning', 'error', 'feature', 'neutral'],
      table: { defaultValue: { summary: 'primary' } },
    },
    disabled: { control: 'boolean' },
    showValue: { control: 'boolean' },
    marks: { control: 'boolean' },
    label: { control: 'text' },
    onValueChange: { action: 'value changed' },
    onValueCommit: { action: 'value committed' },
  },
};

const Template: StoryFn<typeof Slider> = (args) => {
  const { t } = useTranslation();
  const [value, setValue] = useState<SliderValue>(args.value ?? 40);
  return (
    <div className="w-80">
      <Slider
        {...args}
        value={value}
        onValueChange={setValue}
        label={args.label ?? t('slider.volume')}
      />
    </div>
  );
};

// ====================== Basic Stories ======================

export const Default = Template.bind({});
Default.args = { value: 40, showValue: true };

export const Range = Template.bind({});
Range.args = { value: [20, 60], showValue: true };

export const Stepped = Template.bind({});
Stepped.args = { value: 40, step: 10, marks: true, showValue: true };

export const Disabled = Template.bind({});
Disabled.args = { value: 40, disabled: true, showValue: true };

// ====================== Sizes & Colors ======================

export const AllSizes = () => {
  const { t } = useTranslation();
  return (
    <div className="flex w-80 flex-col gap-6">
      {(['sm', 'md'] as const).map((size) => (
        <Slider
          key={size}
          size={size}
          defaultValue={60}
          label={`${t('slider.volume')} — ${size}`}
          showValue
        />
      ))}
    </div>
  );
};

export const AllColors = () => (
  <div className="flex w-80 flex-col gap-6">
    {(
      ['primary', 'success', 'warning', 'error', 'feature', 'neutral'] as const
    ).map((color) => (
      <Slider
        key={color}
        color={color}
        defaultValue={65}
        thumbLabels={[color]}
        aria-label={color}
      />
    ))}
  </div>
);

// ====================== Marks ======================

/** Labelled ticks. `marks={true}` derives them from `step`. */
export const LabelledMarks = () => {
  const { t } = useTranslation();
  const [value, setValue] = useState<SliderValue>(50);
  return (
    <div className="w-80">
      <Slider
        value={value}
        onValueChange={setValue}
        step={50}
        label={t('slider.quality')}
        marks={[
          { value: 0, label: t('slider.low') },
          { value: 50, label: t('slider.medium') },
          { value: 100, label: t('slider.high') },
        ]}
      />
    </div>
  );
};

// ====================== Range in context ======================

/** A price filter: a minimum gap keeps the range from collapsing to nothing. */
export const PriceRange = () => {
  const { t } = useTranslation();
  const [value, setValue] = useState<SliderValue>([200, 800]);
  return (
    <div className="w-80">
      <Slider
        value={value}
        onValueChange={setValue}
        min={0}
        max={1000}
        step={10}
        minStepsBetweenThumbs={5}
        label={t('slider.price')}
        showValue
        thumbLabels={[t('slider.min'), t('slider.max')]}
        formatValue={(input) => `$${input}`}
      />
    </div>
  );
};

/** `onValueCommit` fires once, on release — wire the expensive work to it. */
export const CommitOnRelease = () => {
  const { t } = useTranslation();
  const [committed, setCommitted] = useState<SliderValue>(40);
  return (
    <div className="flex w-80 flex-col gap-2">
      <Slider
        defaultValue={40}
        label={t('slider.brightness')}
        showValue
        onValueCommit={setCommitted}
      />
      <span className="text-[12px] leading-4 text-sub-600">
        committed: {String(committed)}
      </span>
    </div>
  );
};

export default meta;
