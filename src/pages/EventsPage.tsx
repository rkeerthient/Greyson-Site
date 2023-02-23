import usePageSetupEffect from "../hooks/usePageSetupEffect"; 
import { useContext } from "react";
import { PageViewContext } from "../context/PageViewContext";
import styled from "styled-components";
import ResultCountSection from "../components/cards/ResultCountSection";
import Facets from "../components/Facets";
import FacetContent from "../components/Layouts/FacetContent";
import MainContent from "../components/Layouts/MainContent";
import PageHero from "../components/PageHero";
import {
  LocationBias,
  Pagination,
  StandardCard,
  VerticalResults,
} from "@yext/search-ui-react";

const staticFiltersConfig = [
  {
    title: "Venue",
    options: [
      {
        label: "West End Avenue",
        fieldId: "venueName",
        value: "West End Avenue",
      },
      {
        label: "Peaceful Coffee",
        fieldId: "venueName",
        value: "Peaceful Coffee",
      },
    ],
  },
];
let showAllFacets = false;

export default function EventsPage({ verticalKey }: { verticalKey: string }) {
  const { pageView } = useContext(PageViewContext);
  usePageSetupEffect(verticalKey);

  return (
    <>
      <PageHero title="Events" />
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
    // <div className="flex">
    //   <FilterDisplayManager>
    //     <StaticFilters filterConfig={staticFiltersConfig} />
    //   </FilterDisplayManager>
    //   {(pageView === PageView.Desktop ||
    //     pageView === PageView.FiltersHiddenMobile) && (
    //     <div className="flex-grow">
    //       <DirectAnswer />
    //       <SpellCheck />
    //       <div className="flex">
    //         <ResultsCount />
    //         {pageView === PageView.FiltersHiddenMobile && <ViewFiltersButton />}
    //       </div>
    //       <AppliedFilters hiddenFields={["builtin.entityType"]} />
    //       <AlternativeVerticals
    //         currentVerticalLabel="Events"
    //         verticalsConfig={[
    //           { label: "FAQs", verticalKey: "faqs" },
    //           { label: "Jobs", verticalKey: "jobs" },
    //           { label: "Locations", verticalKey: "locations" },
    //         ]}
    //       />
    //       <VerticalResults CardComponent={StandardCard} />
    //       <LocationBias />
    //     </div>
    //   )}
    // </div>
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
