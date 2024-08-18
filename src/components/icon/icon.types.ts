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
} from './types';

export type IconName = `${
  | ArrowIcon
  | BuildingIcon
  | BusinessIcon
  | CommunicationIcon
  | DesignIcon
  | DevelopmentIcon
  | DeviceIcon
  | DocumentIcon
  | EditorIcon
  | FinanceIcon
  | FoodIcon
  | HealthMedicalIcon
  | LogoIcon
  | MapIcon
  | MediaIcon
  | MiscellaneousIcon
  | SystemIcon
  | UserAndFacesIcon
  | WeatherIcon}`;

export interface IconProps {
  name: IconName;
  size?: number;
  color?: string;
  className?: string;
}
