import { Meta } from '@storybook/react';
import { useTranslation } from 'react-i18next';
import {
  RiArrowRightSLine,
  RiArrowLeftSLine,
  RiCloseLine,
  RiEditLine,
  RiMoreLine,
  RiBold,
  RiItalic,
  RiUnderline,
} from '@remixicon/react';
import {
  LinkButton,
  CompactButton,
  FancyButton,
  ButtonGroup,
  ButtonGroupItem,
} from '.';
import { Icon } from '@components/icon';

const meta: Meta<typeof LinkButton> = {
  title: 'Components/Button Family',
  component: LinkButton,
  parameters: {
    docs: {
      description: {
        component: `The Figma "❖ Button" and "❖ Button Group" pages contain four siblings besides the main **Button**. All four are implemented here.

| Component | Figma axes |
| --- | --- |
| \`LinkButton\` | Style (Gray · Black · Primary · Error · Success · Modifiable) × Size (20 · 16) × Underline |
| \`CompactButton\` | Style (Stroke · Ghost · White · Error · Modifiable) × Size (24 · 20) × Full Radius |
| \`FancyButton\` | Type (Primary · Neutral · Error · Success · Basic) × Size (40 · 36 · 32 · 28) |
| \`ButtonGroup\` | Size (36 · 32 · 24) × Quantity 02–06, items with left/right icons and icon-only |

**Two translations from Figma to code**

Figma's **"Modifiable"** style means the colour is overridden per instance. In code that is \`color="inherit"\` / \`appearance="inherit"\`: the control adopts the surrounding text colour, which is what lets a LinkButton sit inside a filled Banner without a hardcoded white variant for every container.

**Quantity** is not a prop on ButtonGroup, and **State** is not a prop anywhere. The count is however many children you pass; hover, focus and disabled are CSS states.`,
      },
    },
  },
};

// ====================== Link Button ======================

const LINK_COLORS = ['gray', 'black', 'primary', 'error', 'success'] as const;

export const LinkButtonColors = () => {
  const { t } = useTranslation();
  return (
    <div className="flex flex-wrap items-center gap-4">
      {LINK_COLORS.map((color) => (
        <LinkButton key={color} color={color} href="#">
          {t('button.link')}
        </LinkButton>
      ))}
    </div>
  );
};

export const LinkButtonSizes = () => {
  const { t } = useTranslation();
  return (
    <div className="flex flex-wrap items-center gap-4">
      <LinkButton
        size="md"
        color="primary"
        href="#"
        endIcon={<Icon icon={RiArrowRightSLine} mirrored />}
      >
        {t('button.link')}
      </LinkButton>
      <LinkButton
        size="sm"
        color="primary"
        href="#"
        endIcon={<Icon icon={RiArrowRightSLine} mirrored />}
      >
        {t('button.link')}
      </LinkButton>
    </div>
  );
};

export const LinkButtonUnderline = () => {
  const { t } = useTranslation();
  return (
    <div className="flex flex-wrap items-center gap-4">
      <LinkButton color="black" href="#">
        {t('button.link')}
      </LinkButton>
      <LinkButton color="black" href="#" underline>
        {t('button.link')}
      </LinkButton>
      <LinkButton color="black" href="#" disabled>
        {t('button.link')}
      </LinkButton>
    </div>
  );
};

/** `color="inherit"` is Figma's "Modifiable": the link takes the container's colour. */
export const LinkButtonInherit = () => {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-3 rounded-lg bg-primary-base px-4 py-3 text-static-white">
        <span className="text-[14px]">{t('banner.trialTitle')}</span>
        <LinkButton color="inherit" underline href="#">
          {t('banner.upgrade')}
        </LinkButton>
      </div>
      <div className="flex items-center gap-3 rounded-lg bg-error-base px-4 py-3 text-static-white">
        <span className="text-[14px]">{t('alert.errorTitle')}</span>
        <LinkButton color="inherit" underline href="#">
          {t('alert.retry')}
        </LinkButton>
      </div>
    </div>
  );
};

// ====================== Compact Button ======================

export const CompactButtons = () => {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col gap-4">
      {(['stroke', 'ghost', 'white', 'error'] as const).map((appearance) => (
        <div key={appearance} className="flex items-center gap-3">
          <span className="w-16 text-[11px] uppercase tracking-wider text-soft-400">
            {appearance}
          </span>
          <CompactButton
            appearance={appearance}
            size="lg"
            aria-label={t('button.close')}
          >
            <Icon icon={RiCloseLine} />
          </CompactButton>
          <CompactButton
            appearance={appearance}
            size="md"
            aria-label={t('button.edit')}
          >
            <Icon icon={RiEditLine} />
          </CompactButton>
          <CompactButton
            appearance={appearance}
            size="lg"
            fullRadius
            aria-label={t('button.more')}
          >
            <Icon icon={RiMoreLine} />
          </CompactButton>
          <CompactButton
            appearance={appearance}
            size="lg"
            disabled
            aria-label={t('button.close')}
          >
            <Icon icon={RiCloseLine} />
          </CompactButton>
        </div>
      ))}
    </div>
  );
};

// ====================== Fancy Button ======================

const FANCY_COLORS = [
  'primary',
  'neutral',
  'error',
  'success',
  'basic',
] as const;

export const FancyButtons = () => {
  const { t } = useTranslation();
  return (
    <div className="flex flex-wrap items-center gap-3">
      {FANCY_COLORS.map((color) => (
        <FancyButton
          key={color}
          color={color}
          startIcon={<Icon icon={RiArrowLeftSLine} mirrored />}
          endIcon={<Icon icon={RiArrowRightSLine} mirrored />}
        >
          {t('button.fancy')}
        </FancyButton>
      ))}
    </div>
  );
};

export const FancyButtonSizes = () => {
  const { t } = useTranslation();
  return (
    <div className="flex flex-wrap items-center gap-3">
      <FancyButton size="md">{t('button.medium')}</FancyButton>
      <FancyButton size="sm">{t('button.small')}</FancyButton>
      <FancyButton size="xs">{t('button.xsmall')}</FancyButton>
      <FancyButton size="2xs">{t('button.xxsmall')}</FancyButton>
      <FancyButton disabled>{t('button.fancy')}</FancyButton>
    </div>
  );
};

// ====================== Button Group ======================

/** `role="toolbar"` for independent actions; the selected segment is `aria-pressed`. */
export const ButtonGroups = () => {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col items-start gap-4">
      <ButtonGroup size="sm" label={t('button.toolbarLabel')}>
        <ButtonGroupItem selected startIcon={<Icon icon={RiBold} />}>
          {t('button.bold')}
        </ButtonGroupItem>
        <ButtonGroupItem startIcon={<Icon icon={RiItalic} />}>
          {t('button.italic')}
        </ButtonGroupItem>
        <ButtonGroupItem startIcon={<Icon icon={RiUnderline} />}>
          {t('button.underline')}
        </ButtonGroupItem>
      </ButtonGroup>

      <ButtonGroup size="xs" label={t('button.viewLabel')}>
        <ButtonGroupItem>{t('button.day')}</ButtonGroupItem>
        <ButtonGroupItem selected>{t('button.week')}</ButtonGroupItem>
        <ButtonGroupItem>{t('button.month')}</ButtonGroupItem>
      </ButtonGroup>

      <ButtonGroup size="2xs" label={t('button.toolbarLabel')}>
        <ButtonGroupItem iconOnly aria-label={t('button.bold')}>
          <Icon icon={RiBold} />
        </ButtonGroupItem>
        <ButtonGroupItem iconOnly aria-label={t('button.italic')}>
          <Icon icon={RiItalic} />
        </ButtonGroupItem>
        <ButtonGroupItem iconOnly selected aria-label={t('button.underline')}>
          <Icon icon={RiUnderline} />
        </ButtonGroupItem>
      </ButtonGroup>
    </div>
  );
};

export const ButtonGroupSizes = () => {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col items-start gap-4">
      {(['sm', 'xs', '2xs'] as const).map((size) => (
        <ButtonGroup key={size} size={size} label={t('button.viewLabel')}>
          <ButtonGroupItem>{t('button.day')}</ButtonGroupItem>
          <ButtonGroupItem selected>{t('button.week')}</ButtonGroupItem>
          <ButtonGroupItem>{t('button.month')}</ButtonGroupItem>
        </ButtonGroup>
      ))}
    </div>
  );
};

export const VerticalButtonGroup = () => {
  const { t } = useTranslation();
  return (
    <ButtonGroup orientation="vertical" size="sm" label={t('button.viewLabel')}>
      <ButtonGroupItem>{t('button.day')}</ButtonGroupItem>
      <ButtonGroupItem selected>{t('button.week')}</ButtonGroupItem>
      <ButtonGroupItem>{t('button.month')}</ButtonGroupItem>
    </ButtonGroup>
  );
};

export default meta;
