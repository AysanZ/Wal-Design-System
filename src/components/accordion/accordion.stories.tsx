import { useState } from 'react';
import { StoryFn, Meta } from '@storybook/react';
import { useTranslation } from 'react-i18next';
import { RiQuestionLine, RiArrowDownSLine } from '@remixicon/react';
import { Accordion, AccordionGroup } from '.';
import { Icon } from '@components/icon';
import { Button } from '@components/button';

const meta: Meta<typeof Accordion> = {
  title: 'Components/Accordion',
  component: Accordion,
  parameters: {
    docs: {
      description: {
        component: `The **Accordion** component organises content in a space-efficient way, letting users expand or collapse sections as needed. Common in FAQs, product descriptions and content-heavy pages.

**Key Features:**
- **Controlled or uncontrolled**: \`open\` + \`onOpenChange\`, or \`defaultOpen\`
- **Grouping**: wrap in \`<AccordionGroup type="single">\` for exclusive open state
- **Indicator**: default ＋/－ crossfade, \`indicatorPosition\`, or a fully custom node
- **CSS-only height animation**, with \`prefers-reduced-motion\` respected

**Accessibility — the important change**

The previous version put \`onClick\` on a \`<section>\`. That element is not focusable, does not respond to Enter or Space, and exposes no state — so the accordion was completely unusable by keyboard and invisible to screen readers. It also nested the panel inside \`<header>\`, putting a landmark in the middle of the content.

Now:
- The trigger is a real \`<button>\` — focusable, Enter/Space work, it appears in the tab order.
- \`aria-expanded\` reflects open state; \`aria-controls\` points at the panel.
- The panel is a \`<section role="region">\` labelled by the trigger, so it shows up in screen-reader landmark navigation with the right name.

**The controlled-state bug**

\`isOpen\` used to be passed straight into \`useState\` as an *initial* value, so a parent could set the starting state and then never change it again — the prop looked controlled but silently was not. \`open\` / \`defaultOpen\` now go through \`useControllableState\`, which handles both modes on one code path.

**Renamed props:** \`isOpen\` → \`open\` / \`defaultOpen\` · \`onToggle\` → \`onOpenChange\` · \`flipIcon\` → \`indicatorPosition\` · \`hasIcon\` + \`icon\` → \`startAdornment\` · \`customExpandIcon\`/\`customCollapseIcon\` → \`indicator\`.`,
      },
    },
  },

  argTypes: {
    title: { control: 'text', description: 'Trigger label. Required.' },
    content: {
      control: 'text',
      description: 'Panel content. `children` works too and takes precedence.',
    },
    open: {
      control: 'boolean',
      description: 'Controlled open state. Pair with `onOpenChange`.',
    },
    defaultOpen: {
      control: 'boolean',
      description: 'Uncontrolled initial state.',
      table: { defaultValue: { summary: 'false' } },
    },
    onOpenChange: {
      action: 'openChange',
      description: 'Fires with the next open state.',
    },
    disabled: {
      control: 'boolean',
      table: { defaultValue: { summary: 'false' } },
    },
    indicatorPosition: {
      control: { type: 'radio' },
      options: ['start', 'end'],
      description:
        'Which side the ＋/－ sits on. Follows reading direction, so `end` is right in LTR and left in RTL.',
      table: { defaultValue: { summary: 'end' } },
    },
    indicator: { control: false, table: { type: { summary: 'ReactNode' } } },
    startAdornment: {
      control: false,
      table: { type: { summary: 'ReactNode' } },
    },
    className: { control: 'text' },
  },
};

const Template: StoryFn<typeof Accordion> = (args) => (
  <div className="w-full max-w-xl">
    <Accordion {...args} />
  </div>
);

// ====================== Basic Stories ======================

export const Default = Template.bind({});
Default.args = {
  title: 'Insert your accordion title here',
  content:
    'Insert the accordion description here. It would look better as two lines of text.',
};

export const OpenByDefault = Template.bind({});
OpenByDefault.args = {
  title: 'This one starts open',
  content: 'Uncontrolled, via `defaultOpen`. The parent never has to track it.',
  defaultOpen: true,
};

export const Disabled = Template.bind({});
Disabled.args = {
  title: 'This accordion is disabled',
  content:
    'You should not be able to reach this text — not by click, not by Tab.',
  disabled: true,
};

// ====================== Indicator Variations ======================

export const IndicatorAtStart = Template.bind({});
IndicatorAtStart.args = {
  title: 'Indicator on the leading edge',
  content:
    'Switch the Locale toolbar to فارسی — `start` moves to the right, because it is a logical position, not a physical one.',
  indicatorPosition: 'start',
};

export const CustomIndicator = Template.bind({});
CustomIndicator.args = {
  title: 'A chevron instead of ＋/－',
  content: 'Any node works as the indicator.',
  indicator: <Icon icon={RiArrowDownSLine} size={20} />,
};

export const WithStartAdornment = Template.bind({});
WithStartAdornment.args = {
  title: 'With a leading icon',
  content: 'The adornment is decorative and stays out of the accessible name.',
  startAdornment: (
    <Icon icon={RiQuestionLine} size={20} className="text-sub-600" />
  ),
};

// ====================== Controlled ======================

/**
 * Fully controlled from the outside — the case that was silently broken
 * before. The external button and the trigger stay in sync because `open`
 * is honoured on every render, not just the first.
 */
export const Controlled = () => {
  const [open, setOpen] = useState(false);
  return (
    <div className="flex w-full max-w-xl flex-col items-start gap-3">
      <Button
        size="sm"
        appearance="stroke"
        color="neutral"
        onClick={() => setOpen((v) => !v)}
      >
        {open ? 'Close from outside' : 'Open from outside'}
      </Button>
      <Accordion
        open={open}
        onOpenChange={setOpen}
        title="Controlled accordion"
        content="The parent owns this state. Toggling either control moves both."
      />
    </div>
  );
};

// ====================== Grouped ======================

/** `type="single"` closes the others; `type="multiple"` leaves them alone. */
export const SingleOpenGroup = () => (
  <AccordionGroup
    type="single"
    className="w-full max-w-xl"
    defaultValue={['a']}
  >
    <Accordion
      id="a"
      title="First section"
      content="Opening another section closes this one."
    />
    <Accordion
      id="b"
      title="Second section"
      content="Only one panel can be open at a time."
    />
    <Accordion
      id="c"
      title="Third section"
      content="Set `collapsible={false}` to force one open."
    />
  </AccordionGroup>
);

export const MultipleOpenGroup = () => (
  <AccordionGroup type="multiple" className="w-full max-w-xl">
    <Accordion id="m1" title="First section" content="These are independent." />
    <Accordion
      id="m2"
      title="Second section"
      content="Open as many as you like."
    />
    <Accordion
      id="m3"
      title="Third section"
      content="Nothing closes automatically."
    />
  </AccordionGroup>
);

// ====================== Localized ======================

export const Localized = () => {
  const { t } = useTranslation();
  return (
    <AccordionGroup type="single" className="w-full max-w-xl">
      <Accordion
        id="faq-shipping"
        title={t('accordion.shipping')}
        content={t('accordion.shippingAnswer')}
        startAdornment={
          <Icon icon={RiQuestionLine} size={20} className="text-sub-600" />
        }
      />
      <Accordion
        id="faq-returns"
        title={t('accordion.returns')}
        content={t('accordion.returnsAnswer')}
        startAdornment={
          <Icon icon={RiQuestionLine} size={20} className="text-sub-600" />
        }
      />
      <Accordion
        id="faq-support"
        title={t('accordion.support')}
        content={t('accordion.supportAnswer')}
        startAdornment={
          <Icon icon={RiQuestionLine} size={20} className="text-sub-600" />
        }
      />
    </AccordionGroup>
  );
};

export default meta;
