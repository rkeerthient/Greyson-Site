import { useEffect, useState } from "react";
import styled from "styled-components";
import ProductsVerticalResults from "../VerticalRender/ProductsVerticalResults";
import { ProductCard } from "./ProductCard";
import { useProductsContext } from "../../context/ProductsContext";
import Loading from "../Loading";
import {
  Matcher,
  SelectableStaticFilter,
  useSearchActions,
  useSearchState,
} from "@yext/search-headless-react";
import { AppliedFilters } from "@yext/search-ui-react";
import Modal from "./Modal";
import Schema from "../Schemas/Schema";
import { useSchemaContext } from "../../context/SchemaContext";

const ProductsListContainer = (props: any) => {
  const {
    isGrid,
    sortType,
    priceValues,
    minPrice,
    prodId,
    isModalOpen,
    setIsModalOpen,
    initLoad,
    setTempPriceValues,
    tempPriceValues,
    setPriceValues,
    setInitLoad,
    setSchemaData,
  } = useProductsContext();
  const answersActions = useSearchActions();
  const { setSchemaOrg, schemaOrg, setSchemaOrg1 } = useSchemaContext();
  useEffect(() => {
    if (sortType) {
      sortType && answersActions.setSortBys([sortType]);
      sortType && answersActions.executeVerticalQuery();
      answersActions.executeVerticalQuery();
    }
  }, [sortType]);
  useEffect(() => {
    if (
      !initLoad &&
      JSON.stringify(priceValues) !== JSON.stringify(tempPriceValues)
    ) {
      const selectedFilters: SelectableStaticFilter[] = [];
      const priceFilter = getPriceRange();
      priceFilter && selectedFilters.push(priceFilter);
      answersActions.setStaticFilters(selectedFilters);
      answersActions.executeVerticalQuery();
    } else {
      setTempPriceValues(priceValues);
    }
  }, [priceValues]);

  const getPriceRange = (): SelectableStaticFilter | undefined => {
    if (priceValues[0] && priceValues[1]) {
      return {
        displayName: `$${priceValues[0]} - $${priceValues[1]}`,
        selected: true,
        filter: {
          kind: "fieldValue",
          fieldId: "price.value",
          value: {
            start: {
              matcher: Matcher.GreaterThanOrEqualTo,
              value: priceValues[0],
            },
            end: { matcher: Matcher.LessThanOrEqualTo, value: priceValues[1] },
          },
          matcher: Matcher.Between,
        },
      };
    }
  };

  const isLoading = useSearchState((state) => state.searchStatus.isLoading);

  const state = useSearchState((state) => state);
  const results = useSearchState((state) => state.vertical.resultsCount) || 0;
  const resultList =
    useSearchState((state) => state.vertical.results) || undefined;

  const filterState: any = state.filters ? state.filters : {};

  useEffect(() => {
    if (Object.keys(filterState).length >= 1) {
      if (filterState.hasOwnProperty("static")) {
        if (
          (filterState.static && filterState.static.length < 1) ||
          (filterState.static &&
            filterState.static.length >= 1 &&
            !filterState.static[0].selected)
        ) {
          setPriceValues(tempPriceValues);
        }
      }
    }
  }, [filterState]);

  useEffect(() => {
    let currData: any = [];

    if (!isLoading && resultList) {
      resultList.map((item: any) =>
        currData.push({
          "@type": "Product",
          name: item.rawData.name,
          image:
            item.rawData.photoGallery && item.rawData.photoGallery[0].image.url,
          description: item.rawData.c_shortDecription,
          sku: item.rawData.uid,
          offers: {
            "@type": "Offer",
            url: "",
            priceCurrency: item.rawData.price?.currencyCode,
            price: item.rawData.price?.value,
          },
        })
      );
      setSchemaOrg({
        "@context": "https://schema.org",
        "@type": "Organization",
        name: "Grayson Clothiers",
        alternateName: "greysonclothiers",
        url: "https://greysonclothiers.com/",
        logo: "https://cdn.shopify.com/s/files/1/0041/1018/8642/files/wolf_03.png?v=1647939709",
      });
      setSchemaOrg1({
        "@context": "https://schema.org",
        "@type": "ItemList",
        itemListElement: currData,
      });
    }
  }, [isLoading]);

  return isLoading && results >= 1 ? (
    <Loading />
  ) : (
    <>
      {isGrid ? (
        <WrapperGrid>
          <div className="products-container">
            <ProductsVerticalResults
              CardComponent={ProductCard}
              displayAllResults={false}
            />
          </div>
        </WrapperGrid>
      ) : prodId ? (
        <>
          {isModalOpen && <Modal />}
          <WrapperList>
            <ProductsVerticalResults
              CardComponent={ProductCard}
              displayAllResults={false}
            />
          </WrapperList>
        </>
      ) : (
        <WrapperList>
          <ProductsVerticalResults
            CardComponent={ProductCard}
            displayAllResults={false}
          />
        </WrapperList>
      )}
    </>
  );
};

export default ProductsListContainer;
const WrapperGrid = styled.section`
  img {
    height: 175px;
  }
  .products-container {
    display: grid;
    gap: 2rem 1.5rem;
  }
  @media (min-width: 992px) {
    .products-container {
      grid-template-columns: repeat(2, 1fr);
    }
  }
  @media (min-width: 1170px) {
    .products-container {
      grid-template-columns: repeat(3, 1fr);
    }
  }
`;

const WrapperList = styled.section`
  img {
    width: 100%;
    display: block;
    width: 300px;
    height: 200px;
    object-fit: cover;
    border-radius: var(--radius);
    margin-bottom: 1rem;
  }
  h4 {
    margin-bottom: 0.5rem;
  }
  .price {
    color: var(--clr-primary-6);
    margin-bottom: 0.75rem;
  }
  p {
    max-width: 45em;
    margin-bottom: 1rem;
  }
  .btn {
    font-size: 0.5rem;
    padding: 0.25rem 0.5rem;
  }
  @media (min-width: 992px) {
    article {
      display: grid;
      grid-template-columns: auto 1fr;
      column-gap: 2rem;
      align-items: center;
    }
  }
`;
