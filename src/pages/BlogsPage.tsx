import usePageSetupEffect from "../hooks/usePageSetupEffect";
import PageHero from "../components/PageHero";
import styled from "styled-components";
import ResultCountSection from "../components/cards/ResultCountSection";
import Facets from "../components/Facets";
import FacetContent from "../components/Layouts/FacetContent";
import MainContent from "../components/Layouts/MainContent";
import {
  StandardCard,
  Pagination,
  VerticalResults,
  LocationBias,
} from "@yext/search-ui-react";
import BlogsCard from "../components/cards/BlogsCard";
// import BlogsCard from "../components/cards/BlogsCard";

export default function BlogsPage({ verticalKey }: { verticalKey: string }) {
  usePageSetupEffect(verticalKey);
  let showAllFacets = false;

  return (
    <>
      {/* <PageHero title="Jobs" /> */}
      <WrapperGrid>
        <div className="section-center align-page">
          <MainContent
            result={<ResultCountSection isProducts={false} sortOptions={[]} />}
            className={{ width: "inherit" }}
            component={
              <VerticalResults
                customCssClasses={{
                  verticalResultsContainer: "products-container",
                }}
                CardComponent={BlogsCard}
              />
            }
          />
        </div>
      </WrapperGrid>

      <div style={{ marginTop: "1em" }}>
        <Pagination paginateAllOnNoResults={false}></Pagination>
      </div>
      <LocationBias />
    </>
  );
}
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
const Wrapper = styled.section`
  .container {
    position: relative;
    margin-left: auto;
    margin-right: auto;
    top: 1em;
    display: grid;
    grid-cols: 4;
  }

  .align-page {
    display: flex;
    gap: 3rem 2rem;
    margin: 4rem auto;
  }
`;
