import { useState } from 'react';
import { StoryFn, Meta } from '@storybook/react';
import { useTranslation } from 'react-i18next';
import { Switch } from '.';

const meta: Meta<typeof Switch> = {
  title: 'Components/Switch',
  component: Switch,
  parameters: {
    docs: {
      description: {
        component: `The **Switch**, from the Figma "❖ Switch" page: two sizes, with or without a label, a description and a flip.

**Key Features:**
- A real \`<input type="checkbox">\` carrying \`role="switch"\`
- **2 Sizes** (sm · md)
- **\`onCheckedChange\`** gives you the boolean; \`onInputChange\` still gives you the event
- **\`labelPosition\`** is Figma's "Flip", expressed logically

**Why a checkbox and not a button.** \`role="switch"\` on a checkbox keeps form participation, \`:checked\` in CSS, Space to toggle and the label association, and changes only the announcement — "on" instead of "checked". A \`<button aria-pressed>\` gives up the form and has to rebuild the rest by hand.

**Switch or checkbox?** A switch takes effect *immediately*; a checkbox states an intention that a submit button later applies. A switch inside a form with a Save button is the most common misuse of this control — the user flips it, walks away, and nothing happened. If there is a Save button, it is a checkbox.

**No internal state.** The native input already handles uncontrolled use through \`defaultChecked\`, so there is nothing to mirror into React state — which is exactly the bug \`useControllableState\` exists to prevent elsewhere in this system.

**RTL**

\`translate-x\` is physical, so the knob's travel is mirrored under \`rtl:\` — an unmirrored knob slides *out of* its track in Persian. Switch the Locale toolbar to فارسی and toggle it.`,
      },
    },
  },
  argTypes: {
    size: {
      control: { type: 'inline-radio' },
      options: ['sm', 'md'],
      table: { defaultValue: { summary: 'md' } },
    },
    labelPosition: {
      control: { type: 'inline-radio' },
      options: ['start', 'end'],
      table: { defaultValue: { summary: 'end' } },
    },
    disabled: { control: 'boolean' },
    label: { control: 'text' },
    description: { control: 'text' },
    onCheckedChange: { action: 'toggled' },
  },
};

const Template: StoryFn<typeof Switch> = (args) => {
  const { t } = useTranslation();
  const [checked, setChecked] = useState(Boolean(args.checked));
  return (
    <Switch
      {...args}
      checked={checked}
      onCheckedChange={setChecked}
      label={args.label ?? t('switch.notifications')}
    />
  );
};

// ====================== Basic Stories ======================

export const Default = Template.bind({});
Default.args = { checked: true };

export const WithDescription = Template.bind({});
WithDescription.args = {
  checked: true,
  description: 'Sent once a day at most',
};

export const Disabled = Template.bind({});
Disabled.args = { checked: true, disabled: true };

/** No label at all — name it yourself, an unlabelled switch is unusable. */
export const ControlOnly = () => {
  const { t } = useTranslation();
  return <Switch aria-label={t('switch.autoSave')} defaultChecked />;
};

// ====================== Sizes ======================

export const AllSizes = () => {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col gap-4">
      {(['sm', 'md'] as const).map((size) => (
        <Switch
          key={size}
          size={size}
          defaultChecked
          label={`${t('switch.darkMode')} — ${size}`}
        />
      ))}
    </div>
  );
};

// ====================== Flip ======================

/** Figma's "Flip". Logical, so `start` is the right in Persian. */
export const LabelPosition = () => {
  const { t } = useTranslation();
  return (
    <div className="flex w-80 flex-col gap-4">
      {(['end', 'start'] as const).map((labelPosition) => (
        <Switch
          key={labelPosition}
          labelPosition={labelPosition}
          defaultChecked
          label={t('switch.publicProfile')}
          rootClassName="w-full"
        />
      ))}
    </div>
  );
};

// ====================== In context ======================

/** A settings list — where a switch belongs, because each row applies at once. */
export const SettingsList = () => {
  const { t } = useTranslation();
  return (
    <div className="flex w-96 flex-col divide-y divide-soft-200 rounded-xl border border-soft-200 bg-white-0">
      {[
        ['notifications', 'notificationsDescription', true],
        ['twoFactor', 'twoFactorDescription', false],
      ].map(([label, description, checked]) => (
        <div key={label as string} className="p-4">
          <Switch
            defaultChecked={checked as boolean}
            labelPosition="start"
            label={t(`switch.${label as string}`)}
            description={t(`switch.${description as string}`)}
            rootClassName="w-full"
          />
        </div>
      ))}
    </div>
  );
};

export default meta;
