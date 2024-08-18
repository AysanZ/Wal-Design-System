import { Typography } from '@components/typography';
import { Icon } from '..';
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
} from '../types';

const iconCategories = {
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
  'Health&Medical': HealthMedicalIcon,
  Logo: LogoIcon,
  Map: MapIcon,
  Media: MediaIcon,
  Miscellaneous: MiscellaneousIcon,
  System: SystemIcon,
  UserAndFaces: UserAndFacesIcon,
  Weather: WeatherIcon,
};

const iconCategoryValues = Object.fromEntries(
  Object.entries(iconCategories).map(([category, iconObject]) => [
    category,
    Object.values(iconObject),
  ]),
);

export const IconNames = Object.entries(iconCategoryValues).flatMap(
  ([, icons]) => {
    return icons.map((iconName) => iconName);
  },
);

export const IconCategoryDisplay = ({
  category,
}: {
  category: keyof typeof iconCategories;
}) => {
  const icons = iconCategoryValues[category];

  return (
    <div className="flex flex-col justify-start items-start gap-10">
      <Typography as={'h2'} variant="h2">
        {category}
      </Typography>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(150px,1fr))] w-full">
        {icons.map((iconName) => (
          <div
            key={iconName}
            className="border p-5 aspect-square border-soft-200 dark:border-soft-200-dark flex flex-col justify-center items-center gap-4"
          >
            <Icon
              name={iconName}
              size={28}
              className="text-verified-dark dark:text-verified-dark-dark"
            />
            <Typography as={'p'} variant="label-small" className="text-center">
              {iconName}
            </Typography>
          </div>
        ))}
      </div>
    </div>
  );
};
