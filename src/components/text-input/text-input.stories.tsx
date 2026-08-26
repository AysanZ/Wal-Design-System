import { StoryFn, Meta } from '@storybook/react';
import { useTranslation } from 'react-i18next';
import { RiMailLine, RiSearchLine, RiEyeOffLine } from '@remixicon/react';
import { TextInput } from '.';
import { Icon } from '@components/icon';
import { CompactButton } from '@components/button';

const meta: Meta<typeof TextInput> = {
  title: 'Components/Text Input',
  component: TextInput,
  parameters: {
    docs: {
      description: {
        component: `The **Text Input**, from the Figma "❖ Text Input" page: three sizes, leading and trailing slots, and the full field — label, box and message.

**Key Features:**
- **3 Sizes** (md 40 · sm 36 · xs 32), matching Dropdown
- **4 slots**: \`startIcon\` / \`endIcon\` inside the box, \`startAffix\` / \`endAffix\` attached to it
- **\`error\`** drives both the styling and the message
- **\`latin\`** pins the field LTR for emails, URLs, IBANs

**State is not a prop.** Figma models Default · Hover · Focus · Filled · Disabled · Error. Hover, focus and disabled are CSS states; "Filled" is whether the field has a value, which the input already knows. Only \`invalid\` cannot be worked out from the DOM — and even that is not a prop here, because \`error\` implies it.

**Why the whole field.** The parts each app skips when it assembles its own are the ones that matter: \`htmlFor\`, \`aria-describedby\`, \`aria-invalid\`, and \`role="alert"\` on the message so a validation error that appears after submit is announced. That last one is the most common accessibility bug in forms, and it belongs to the *field*, not the input.

**Adornments are slots, not an enum.** Figma's Leading/Trailing = Icon | Text | None cannot express "an icon on one side and a unit on the other". Four slots can.

**\`latin\` is a Persian problem, not a nicety.** Email addresses, URLs, IBANs and card numbers are Latin even in a Persian UI. Rendered RTL, a URL's slashes and dots migrate to the wrong end: the value stays correct in the DOM and becomes unreadable on screen. Switch the Locale toolbar to فارسی and compare the two fields in **Latin Values**.`,
      },
    },
  },
  argTypes: {
    size: {
      control: { type: 'inline-radio' },
      options: ['md', 'sm', 'xs'],
      table: { defaultValue: { summary: 'md' } },
    },
    label: { control: 'text' },
    hint: { control: 'text' },
    error: { control: 'text' },
    required: { control: 'boolean' },
    disabled: { control: 'boolean' },
    latin: { control: 'boolean' },
    startIcon: { control: false },
    endIcon: { control: false },
  },
};

const Template: StoryFn<typeof TextInput> = (args) => {
  const { t } = useTranslation();
  return (
    <div className="w-80">
      <TextInput
        {...args}
        label={args.label ?? t('textInput.email')}
        placeholder={args.placeholder ?? t('textInput.emailPlaceholder')}
      />
    </div>
  );
};

// ====================== Basic Stories ======================

export const Default = Template.bind({});
Default.args = {};

export const WithHint = Template.bind({});
WithHint.args = { hint: 'We will never share it' };

export const WithError = Template.bind({});
WithError.args = { error: 'Enter a valid email address' };

export const Required = Template.bind({});
Required.args = { required: true };

export const Disabled = Template.bind({});
Disabled.args = { disabled: true, hint: 'Contact support to change this' };

// ====================== Sizes ======================

export const AllSizes = () => {
  const { t } = useTranslation();
  return (
    <div className="flex w-80 flex-col gap-4">
      {(['md', 'sm', 'xs'] as const).map((size) => (
        <TextInput
          key={size}
          size={size}
          label={`${t('textInput.email')} — ${size}`}
          placeholder={t('textInput.emailPlaceholder')}
        />
      ))}
    </div>
  );
};

// ====================== Slots ======================

/** Two inside the box, two attached to it — and they combine freely. */
export const Adornments = () => {
  const { t } = useTranslation();
  return (
    <div className="flex w-80 flex-col gap-4">
      <TextInput
        label={t('textInput.email')}
        placeholder={t('textInput.emailPlaceholder')}
        startIcon={<Icon icon={RiMailLine} />}
      />
      <TextInput
        label={t('textInput.search')}
        placeholder={t('textInput.searchPlaceholder')}
        startIcon={<Icon icon={RiSearchLine} />}
      />
      <TextInput
        label={t('textInput.password')}
        type="password"
        defaultValue="hunter2"
        endIcon={
          <CompactButton
            appearance="ghost"
            size="md"
            aria-label="Show password"
          >
            <Icon icon={RiEyeOffLine} />
          </CompactButton>
        }
      />
      <TextInput
        label={t('textInput.website')}
        startAffix="https://"
        endAffix=".com"
        latin
      />
      <TextInput
        label={t('textInput.amount')}
        endAffix={t('textInput.currency')}
        inputMode="numeric"
      />
    </div>
  );
};

// ====================== RTL ======================

/**
 * The point of `latin`. In فارسی the top field reverses and becomes
 * unreadable; the bottom one stays as written.
 */
export const LatinValues = () => {
  const { t } = useTranslation();
  return (
    <div className="flex w-80 flex-col gap-4">
      <TextInput
        label={`${t('textInput.website')} — latin={false}`}
        defaultValue="https://wal.design/docs?v=1"
      />
      <TextInput
        label={`${t('textInput.website')} — latin`}
        defaultValue="https://wal.design/docs?v=1"
        latin
      />
      <TextInput
        label={t('textInput.iban')}
        defaultValue="IR12 0170 0000 0012 3456 7890 01"
        latin
      />
    </div>
  );
};

export default meta;
