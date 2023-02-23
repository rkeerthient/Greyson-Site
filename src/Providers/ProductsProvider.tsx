import { HighlightedFields } from "@yext/search-headless-react";
import { CardProps } from "@yext/search-ui-react";

//prettier-ignore
export interface ProductCardConfig {
    showOrdinal?: boolean
  }

//prettier-ignore
export interface ProductCardProps extends CardProps {
    configuration: ProductCardConfig
  }
export interface Root {
  rawData: RawData;
  source: string;
  index: number;
  name: string;
  id: string;
  highlightedFields: HighlightedFields;
  entityType: string;
}

export interface RawData {
  id: string;
  type: string;
  landingPageUrl: string;
  savedFilters: string[];
  primaryPhoto: PrimaryPhoto;
  name: string;
  c_cCategory: string[];
  c_color: string[];
  c_department: string;
  c_fabric: string[];
  c_fit: string[];
  c_price: string[];
  c_primaryCTA: CPrimaryCta;
  c_productCategory: string[];
  c_size: string[];
  c_sleeveLength: string[];
  c_subtitle: string[];
  c_type: string[];
  uid: string;
}

export interface PrimaryPhoto {
  image: Image;
}

export interface Image {
  url: string;
  width: number;
  height: number;
  sourceUrl: string;
  thumbnails: Thumbnail[];
}

export interface Thumbnail {
  url: string;
  width: number;
  height: number;
}

export interface CPrimaryCta {
  label: string;
  linkType: string;
  link: string;
}
