import {
  ArrowIcon,
  BuildingIcon,
  BusinessIcon,
  CommunicationIcon,
  DesignIcon,
  DevelopmentIcon,
  DeviceIcon,
  DocumentIcon,
  EditorIcon,
  FinanceIcon,
  FoodIcon,
  HealthMedicalIcon,
  LogoIcon,
  MapIcon,
  MediaIcon,
  MiscellaneousIcon,
  SystemIcon,
  UserAndFacesIcon,
  WeatherIcon,
} from './names';
import type { IconName } from './names';

/**
 * The curated catalogue, grouped. Drives the Storybook gallery today and the
 * icon picker in the theme-builder dashboard later — which is why it returns
 * plain data instead of JSX the way the old `iconCategoryHelpers` did.
 */
export const iconCategories = {
  Arrow: ArrowIcon,
  Building: BuildingIcon,
  Business: BusinessIcon,
  Communication: CommunicationIcon,
  Design: DesignIcon,
  Development: DevelopmentIcon,
  Device: DeviceIcon,
  Document: DocumentIcon,
  Editor: EditorIcon,
  Finance: FinanceIcon,
  Food: FoodIcon,
  'Health & Medical': HealthMedicalIcon,
  Logo: LogoIcon,
  Map: MapIcon,
  Media: MediaIcon,
  Miscellaneous: MiscellaneousIcon,
  System: SystemIcon,
  'User & Faces': UserAndFacesIcon,
  Weather: WeatherIcon,
} as const;

export type IconCategory = keyof typeof iconCategories;

export const iconCategoryNames = Object.keys(iconCategories) as IconCategory[];

export function getIconsInCategory(category: IconCategory): IconName[] {
  return Object.values(iconCategories[category]) as IconName[];
}

export function searchIcons(query: string, limit = 200): IconName[] {
  const needle = query.trim().toLowerCase();
  const all = iconCategoryNames.flatMap(getIconsInCategory);
  if (!needle) return all.slice(0, limit);
  return all.filter((name) => name.includes(needle)).slice(0, limit);
}
