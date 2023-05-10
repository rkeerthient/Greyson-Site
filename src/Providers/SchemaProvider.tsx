export type Root = Root2[];

export interface Root2 {
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
  $key: Key;
  c_category: string;
  c_colorCode: string;
  c_colorToProd: CColorToProd[];
  c_oldPrice: COldPrice2;
  c_onSale: boolean;
  c_productVariants: CProductVariant[];
  c_reviewsCount: string;
  c_shortDecription: string;
  c_stars: string;
  color: string;
  name: string;
  photoGallery: PhotoGallery3[];
  price: Price2;
  richTextDescription: string;
  uid: string;
  s_snippet: string;
}

export interface Key {
  locale: string;
  primary_key: string;
}

export interface CColorToProd {
  c_colorCode: string;
  c_oldPrice: COldPrice;
  id: string;
  name: string;
  photoGallery: PhotoGallery[];
  price: Price;
}

export interface COldPrice {
  currencyCode: string;
  value?: string;
}

export interface PhotoGallery {
  image: Image;
}

export interface Image {
  url: string;
  thumbnails: Thumbnail[];
  height: number;
  width: number;
}

export interface Thumbnail {
  url: string;
  width: number;
  height: number;
}

export interface Price {
  currencyCode: string;
  value: string;
}

export interface COldPrice2 {
  currencyCode: string;
  value?: string;
}

export interface CProductVariant {
  c_colorCode: string;
  id: string;
  photoGallery: PhotoGallery2[];
}

export interface PhotoGallery2 {
  image: Image2;
}

export interface Image2 {
  url: string;
  thumbnails: Thumbnail2[];
  height: number;
  width: number;
}

export interface Thumbnail2 {
  url: string;
  width: number;
  height: number;
}

export interface PhotoGallery3 {
  image: Image3;
}

export interface Image3 {
  height: number;
  thumbnails: Thumbnail3[];
  width: number;
  url: string;
}

export interface Thumbnail3 {
  url: string;
  width: number;
  height: number;
}

export interface Price2 {
  currencyCode: string;
  value: string;
}

export interface HighlightedFields {}
