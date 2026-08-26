import { useState } from 'react';
import { StoryFn, Meta } from '@storybook/react';
import { useTranslation } from 'react-i18next';
import {
  RiListUnordered,
  RiLayoutGridLine,
  RiKanbanView,
  RiBold,
  RiItalic,
  RiUnderline,
  RiAlignLeft,
  RiAlignCenter,
  RiAlignRight,
} from '@remixicon/react';
import { Toggle, ToggleGroup } from '.';
import { Icon } from '@components/icon';

const meta: Meta<typeof Toggle> = {
  title: 'Components/Toggle',
  component: Toggle,
  parameters: {
    docs: {
      description: {
        component: `The **Toggle**, from the Figma "❖ Toggle" page: a button that stays pressed, and a group of them.

**Key Features:**
- **3 Appearances**: \`stroke\`, \`ghost\`, \`filled\`
- **2 Sizes**, plus \`iconOnly\` for toolbars
- **\`ToggleGroup\`** with \`single\` or \`multiple\` selection
- **\`attached\`** joins the group into one segmented bar
- **\`collapsible\`** allows un-pressing the last one

**Toggle, Switch or Tabs?** Three controls that all "turn something on", and the difference is what the user is doing:

- **Switch** — a *setting* that applies immediately. On or off, one thing.
- **Toggle** — a *button that stays pressed*. Bold in a toolbar, a view mode, a filter currently applied. An action with memory, which is why it announces \`aria-pressed\` and not "on".
- **Tabs** — *navigation* between panels. If picking one hides the other's content, it is tabs.

Screen readers say "pressed" for the second and "on" for the first, and those are genuinely different sentences. Picking the wrong control tells the user the wrong story about what it does.

**Each toggle keeps its own tab stop** — unlike \`Tabs\`, which uses roving focus. Tabs are navigation, and one stop for the whole bar keeps them out of the way; a toolbar of toggles is a set of actions reached individually.

**\`collapsible\` is off by default** in single mode: a view switcher with no view chosen is a state most screens cannot render.

**RTL**

\`attached\` uses logical corner and margin utilities, so the shared borders collapse correctly and the first toggle is rounded on the right in Persian.`,
      },
    },
  },
  argTypes: {
    appearance: {
      control: { type: 'inline-radio' },
      options: ['stroke', 'ghost', 'filled'],
      table: { defaultValue: { summary: 'stroke' } },
    },
    size: {
      control: { type: 'inline-radio' },
      options: ['sm', 'md'],
      table: { defaultValue: { summary: 'md' } },
    },
    iconOnly: { control: 'boolean' },
    disabled: { control: 'boolean' },
    onPressedChange: { action: 'pressed changed' },
  },
};

const Template: StoryFn<typeof Toggle> = (args) => {
  const { t } = useTranslation();
  return <Toggle {...args}>{t('toggle.bold')}</Toggle>;
};

// ====================== Basic Stories ======================

export const Default = Template.bind({});
Default.args = {};

export const Pressed = Template.bind({});
Pressed.args = { defaultPressed: true };

export const Disabled = Template.bind({});
Disabled.args = { disabled: true, defaultPressed: true };

export const AllAppearances = () => {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col gap-3">
      {(['stroke', 'ghost', 'filled'] as const).map((appearance) => (
        <div key={appearance} className="flex items-center gap-2">
          <span className="w-16 text-[11px] uppercase tracking-wider text-soft-400">
            {appearance}
          </span>
          <Toggle appearance={appearance}>{t('toggle.bold')}</Toggle>
          <Toggle appearance={appearance} defaultPressed>
            {t('toggle.italic')}
          </Toggle>
        </div>
      ))}
    </div>
  );
};

// ====================== Groups ======================

/** Single selection: a view switcher. `attached` joins them into one bar. */
export const SingleGroup = () => {
  const { t } = useTranslation();
  const [view, setView] = useState('list');
  return (
    <div className="flex flex-col gap-4">
      <ToggleGroup
        label={t('toggle.label')}
        value={view}
        onValueChange={setView}
      >
        <Toggle value="list" startIcon={<Icon icon={RiListUnordered} />}>
          {t('toggle.list')}
        </Toggle>
        <Toggle value="grid" startIcon={<Icon icon={RiLayoutGridLine} />}>
          {t('toggle.grid')}
        </Toggle>
        <Toggle value="board" startIcon={<Icon icon={RiKanbanView} />}>
          {t('toggle.board')}
        </Toggle>
      </ToggleGroup>

      <ToggleGroup
        attached
        label={t('toggle.label')}
        value={view}
        onValueChange={setView}
      >
        <Toggle value="list">{t('toggle.list')}</Toggle>
        <Toggle value="grid">{t('toggle.grid')}</Toggle>
        <Toggle value="board">{t('toggle.board')}</Toggle>
      </ToggleGroup>
    </div>
  );
};

/** Multiple selection: independent flags, like a text formatting toolbar. */
export const MultipleGroup = () => {
  const { t } = useTranslation();
  const [format, setFormat] = useState<string[]>(['bold']);
  return (
    <ToggleGroup
      type="multiple"
      attached
      appearance="ghost"
      label={t('toggle.format')}
      value={format}
      onValueChange={setFormat}
    >
      <Toggle value="bold" iconOnly aria-label={t('toggle.bold')}>
        <Icon icon={RiBold} />
      </Toggle>
      <Toggle value="italic" iconOnly aria-label={t('toggle.italic')}>
        <Icon icon={RiItalic} />
      </Toggle>
      <Toggle value="underline" iconOnly aria-label={t('toggle.underline')}>
        <Icon icon={RiUnderline} />
      </Toggle>
    </ToggleGroup>
  );
};

/** Icon-only toggles still need a name — an SVG has none. */
export const IconOnly = () => {
  const { t } = useTranslation();
  const [align, setAlign] = useState('start');
  return (
    <ToggleGroup
      attached
      label={t('toggle.format')}
      value={align}
      onValueChange={setAlign}
    >
      <Toggle value="start" iconOnly aria-label={t('toggle.alignStart')}>
        <Icon icon={RiAlignLeft} mirrored />
      </Toggle>
      <Toggle value="center" iconOnly aria-label={t('toggle.alignCenter')}>
        <Icon icon={RiAlignCenter} />
      </Toggle>
      <Toggle value="end" iconOnly aria-label={t('toggle.alignEnd')}>
        <Icon icon={RiAlignRight} mirrored />
      </Toggle>
    </ToggleGroup>
  );
};

/** `collapsible` lets the pressed item be un-pressed, leaving nothing chosen. */
export const Collapsible = () => {
  const { t } = useTranslation();
  const [value, setValue] = useState('list');
  return (
    <div className="flex flex-col gap-2">
      <ToggleGroup
        collapsible
        attached
        label={t('toggle.label')}
        value={value}
        onValueChange={setValue}
      >
        <Toggle value="list">{t('toggle.list')}</Toggle>
        <Toggle value="grid">{t('toggle.grid')}</Toggle>
      </ToggleGroup>
      <span className="text-[12px] leading-4 text-sub-600">
        value: {value || '—'}
      </span>
    </div>
  );
};

export default meta;
