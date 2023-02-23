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

export default function JobsPage({ verticalKey }: { verticalKey: string }) {
  usePageSetupEffect(verticalKey);
  let showAllFacets = false;

  return (
    <>
      <PageHero title="Jobs" />
      <Wrapper className="page">
        <div className="section-center align-page">
          {showAllFacets && (
            <FacetContent
              component={<Facets showFacet={true} searchOnChange={true} />}
            />
          )}
          <MainContent
            result={<ResultCountSection isProducts={false} sortOptions={[]} />}
            className={{ width: "inherit" }}
            component={<VerticalResults CardComponent={StandardCard} />}
          />
        </div>
      </Wrapper>

      <div style={{ marginTop: "1em" }}>
        <Pagination paginateAllOnNoResults={false}></Pagination>
      </div>
      <LocationBias />
    </>
  );
}

const Wrapper = styled.section`
  .container {
    position: relative;
    margin-left: auto;
    margin-right: auto;
    top: 1em;
    display: flex;
  }

  .align-page {
    display: flex;
    gap: 3rem 2rem;
    margin: 4rem auto;
  }
`;
