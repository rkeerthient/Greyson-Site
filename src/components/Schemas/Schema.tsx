import * as React from "react";
import { JsonLd } from "react-schemaorg";
import { ItemList } from "schema-dts";
import { useProductsContext } from "../../context/ProductsContext";
import { RawData } from "../../Providers/SchemaProvider";
import { useState } from "react";
const Schema = () => {
  const { schemaData } = useProductsContext();
  const [schemaVal, setSchemeVal] = useState([]);
  const name = `${schemaData.name}`;
  React.useEffect(() => {
    let currData: any = [];
    schemaData.length &&
      schemaData.map((item: RawData) =>
        currData.push({
          "@type": "Product",
          name: item.name,
          image: item.photoGallery && item.photoGallery[0].image.url,
          description: item.c_shortDecription,

          sku: item.uid,
          offers: {
            "@type": "Offer",
            url: "",
            priceCurrency: item.price?.currencyCode,
            price: item.price?.value,
          },
        })
      );
    currData.length && setSchemeVal(currData);
  }, [schemaData]);
  return (
    <>
      {schemaVal && (
        <JsonLd<ItemList>
          item={{
            "@context": "https://schema.org",
            "@type": "ItemList",
            itemListElement: schemaVal,
          }}
        />
      )}
      {/* <JsonLd<Store>
        item={{
          "@context": "https://schema.org",
          "@type": "Store",
          name,
          address: {
            "@type": "PostalAddress",
            streetAddress: address.line1,
            addressLocality: address.city,
            addressRegion: address.region,
            postalCode: address.postalCode,
            addressCountry: address.countryCode,
          },
          openingHours: document.hours
            ? buildHoursSchema(document.hours)
            : "Mo,Tu,We,Th 09:00-12:00",
          telephone: telephone,
          hasOfferCatalog: {
            "@type": "OfferCatalog",
            name: "Store services",
            itemListElement: itemListElement,
          },
        }}
      />
      <JsonLd<ItemList>
        item={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          itemListElement: productsList,
        }}
      />
      <JsonLd<FAQPage>
        item={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqsList,
        }}
      />

      {document.geocodedCoordinate && (
        <JsonLd<Place>
          item={{
            "@context": "https://schema.org",
            "@type": "Place",
            geo: {
              "@type": "GeoCoordinates",
              latitude: document.geocodedCoordinate.latitude,
              longitude: document.geocodedCoordinate.longitude,
            },
          }}
        />
      )} */}
      Hi
    </>
  );
};

const buildHoursSchema = (hoursData: any) => {
  const nHrs: any = [];
  Object.keys(hoursData).forEach((item) =>
    nHrs.push(
      hoursData[item].openIntervals &&
        `${item.substring(0, 2).replace(/./, (c) => c.toUpperCase())} ${
          hoursData[item].openIntervals[0].start
        }-${hoursData[item].openIntervals[0].end}`
    )
  );
  return nHrs;
};

export default Schema;
