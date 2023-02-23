import {
  Direction,
  Result,
  SortBy,
  SortType,
  useSearchActions,
  useSearchState,
} from "@yext/search-headless-react";
import { useEffect, useState } from "react";
import styled from "styled-components";
import Facets from "../Facets";
import FilterDisplayManager from "../FilterDisplayManager";
import { useProductsContext } from "../../context/ProductsContext";
import { Divider } from "../StaticFilters";
import { PriceRange } from "./PriceRange";
import { NumericalFacets, StandardFacets } from "@yext/search-ui-react";

const FacetsSection = () => {
  const facetConfig = {
    c_department: {
      label: "Department",
      showFacet: true,
    },
    c_cCategory: {
      label: "Category",
      collapsible: true,
      defaultExpanded: true,
      showFacet: true,
    },
  };
  const answersActions = useSearchActions();
  const { priceValues, setPriceValues } = useProductsContext();

  const getMaxValue = () => {
    const sortOpt: { label: string; sortBy: SortBy }[] = [
      {
        label: "Price: High to Low",
        sortBy: {
          field: "price.value",
          direction: Direction.Descending,
          type: SortType.Field,
        },
      },
    ];
    answersActions.setSortBys([sortOpt[0].sortBy]);
    answersActions
      .executeVerticalQuery()
      .then((res: any) =>
        setPriceValues((prev: any) => [
          prev[0],
          Number(res.verticalResults.results[0].rawData.price.value),
        ])
      );
  };

  const getMinValue = () => {
    const sortOpt: { label: string; sortBy: SortBy }[] = [
      {
        label: "Price: High to Low",
        sortBy: {
          field: "price.value",
          direction: Direction.Ascending,
          type: SortType.Field,
        },
      },
    ];
    answersActions.setSortBys([sortOpt[0].sortBy]);
    answersActions.executeVerticalQuery().then((res: any) => {
      setPriceValues((prev: any) => [
        Number(res.verticalResults.results[0].rawData.price.value),
        prev[1],
      ]);
    });
  };

  useEffect(() => {
    if (priceValues.length <= 0) {
      getMinValue();
      getMaxValue();
    }
  }, []);

  return (
    <>
      {priceValues[0] && priceValues[1] && (
        <div className="content">
          <FilterDisplayManager>
            {/* <PriceRange /> */}
            <Divider />
            <Facets
              cssCompositionMethod="assign"
              searchOnChange={true}
              defaultExpanded={true}
              facetConfigs={{
                c_department: {
                  label: "Department",
                  showFacet: true,
                },
                c_category: {
                  label: "Category",
                  collapsible: true,
                  defaultExpanded: true,
                  showFacet: true,
                },
                color: {
                  label: "Colors",
                  collapsible: true,
                  defaultExpanded: true,
                  showFacet: true,
                  facetCss: { optionsContainer: "colors-container" },
                  type: "color",
                },
              }}
            />
            {/* <StandardFacets excludedFieldIds={["c_color"]} /> */}
          </FilterDisplayManager>
        </div>
      )}
    </>
  );
};

export default FacetsSection;
const Wrapper = styled.section`
  .form-control {
    margin-bottom: 1.25rem;
    h5 {
      margin-bottom: 0.5rem;
    }
  }
  .search-input {
    padding: 0.5rem;
    background: var(--clr-grey-10);
    border-radius: var(--radius);
    border-color: transparent;
    letter-spacing: var(--spacing);
  }
  .search-input::placeholder {
    text-transform: capitalize;
  }
  button {
    display: block;
    margin: 0.25em 0;
    padding: 0.25rem 0;
    text-transform: capitalize;
    background: transparent;
    border: none;
    border-bottom: 1px solid transparent;
    letter-spacing: var(--spacing);
    color: var(--clr-grey-5);
    cursor: pointer;
  }
  .active {
    border-color: var(--clr-grey-5);
  }
  .company {
    background: var(--clr-grey-10);
    border-radius: var(--radius);
    border-color: transparent;
    padding: 0.25rem;
  }
  .colors {
    display: flex;
    align-items: center;
  }
  .color-btn {
    display: inline-block;
    width: 1rem;
    height: 1rem;
    border-radius: 50%;
    background: #222;
    margin-right: 0.5rem;
    border: none;
    cursor: pointer;
    opacity: 0.5;
    display: flex;
    align-items: center;
    justify-content: center;
    svg {
      font-size: 0.5rem;
      color: var(--clr-white);
    }
  }
  .all-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 0.5rem;
    opacity: 0.5;
  }
  .active {
    opacity: 1;
  }
  .all-btn .active {
    text-decoration: underline;
  }
  .price {
    margin-bottom: 0.25rem;
  }
  .shipping {
    display: grid;
    grid-template-columns: auto 1fr;
    align-items: center;
    text-transform: capitalize;
    column-gap: 0.5rem;
    font-size: 1rem;
  }
  .clear-btn {
    background: var(--clr-red-dark);
    color: var(--clr-white);
    padding: 0.25rem 0.5rem;
    border-radius: var(--radius);
  }

  fieldset > button {
    display: flex !important;
  }
  @media (min-width: 768px) {
    .content {
      position: sticky;
      top: 1rem;
    }
  }
`;

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
  landingPageUrl: string;
  savedFilters: string[];
  price: Price;
  primaryPhoto: PrimaryPhoto;
  name: string;
  c_cCategory: string[];
  c_color: string[];
  c_department: string;
  c_fabric?: string[];
  c_fit: string[];
  c_price: string[];
  c_primaryCTA: CPrimaryCta;
  c_productCategory?: string[];
  c_size: string[];
  c_sleeveLength?: string[];
  c_subtitle?: string[];
  c_type?: string[];
  uid: string;
  c_isSale?: boolean;
  c_collarType?: string[];
  c_pockets?: string[];
}

export interface Price {
  value: string;
  currencyCode: string;
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

export interface HighlightedFields {}
