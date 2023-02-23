import { CardProps } from "@yext/search-ui-react";

//prettier-ignore
export interface LocationCardConfig {
    showOrdinal?: boolean
  }

//prettier-ignore
export interface LocationCardProps extends CardProps {
    configuration: LocationCardConfig
  }
export type Root = RootArr[];

export interface RootArr {
  rawData: RawData;
  source: string;
  index: number;
  name: string;
  description: string;
  id: string;
  distance: number;
  highlightedFields: HighlightedFields;
  entityType: string;
}

export interface RawData {
  id: string;
  type: string;
  landingPageUrl: string;
  savedFilters: string[];
  address: Address;
  addressHidden: boolean;
  description: string;
  hours: Hours;
  name: string;
  cityCoordinate: CityCoordinate;
  c_secondaryCTA?: CSecondaryCta;
  c_tertiaryCTA: CTertiaryCta;
  geocodedCoordinate: GeocodedCoordinate;
  isoRegionCode: string;
  mainPhone: string;
  timezone: string;
  yextDisplayCoordinate: YextDisplayCoordinate;
  yextRoutableCoordinate: YextRoutableCoordinate;
  timeZoneUtcOffset: string;
  uid: string;
  c_primaryCTA?: CPrimaryCta;
}

export interface Address {
  line1: string;
  city: string;
  region: string;
  postalCode: string;
  countryCode: string;
  extraDescription?: string;
}

export interface Hours {
  monday: Monday;
  tuesday: Tuesday;
  wednesday: Wednesday;
  thursday: Thursday;
  friday: Friday;
  saturday: Saturday;
  sunday: Sunday;
}

export interface Monday {
  openIntervals: OpenInterval[];
  isClosed: boolean;
}

export interface OpenInterval {
  start: string;
  end: string;
}

export interface Tuesday {
  openIntervals: OpenInterval2[];
  isClosed: boolean;
}

export interface OpenInterval2 {
  start: string;
  end: string;
}

export interface Wednesday {
  openIntervals: OpenInterval3[];
  isClosed: boolean;
}

export interface OpenInterval3 {
  start: string;
  end: string;
}

export interface Thursday {
  openIntervals: OpenInterval4[];
  isClosed: boolean;
}

export interface OpenInterval4 {
  start: string;
  end: string;
}

export interface Friday {
  openIntervals: OpenInterval5[];
  isClosed: boolean;
}

export interface OpenInterval5 {
  start: string;
  end: string;
}

export interface Saturday {
  openIntervals: OpenInterval6[];
  isClosed: boolean;
}

export interface OpenInterval6 {
  start: string;
  end: string;
}

export interface Sunday {
  openIntervals: OpenInterval7[];
  isClosed: boolean;
}

export interface OpenInterval7 {
  start: string;
  end: string;
}

export interface CityCoordinate {
  latitude: number;
  longitude: number;
}

export interface CSecondaryCta {
  label: string;
  link: string;
  linkType: string;
}

export interface CTertiaryCta {
  label: string;
  link: string;
  linkType: string;
}

export interface GeocodedCoordinate {
  latitude: number;
  longitude: number;
}

export interface YextDisplayCoordinate {
  latitude: number;
  longitude: number;
}

export interface YextRoutableCoordinate {
  latitude: number;
  longitude: number;
}

export interface CPrimaryCta {
  label: string;
  link: string;
  linkType: string;
}

export interface HighlightedFields {}
