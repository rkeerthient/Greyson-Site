import styled from "styled-components";
import PageHero from "../components/PageHero";
import FacetsSection from "../components/cards/FacetsSection";
import ResultCountSection from "../components/cards/ResultCountSection";
import ProductsListContainer from "../components/cards/ProductsListContainer";
import FacetContent from "../components/Layouts/FacetContent";
import MainContent from "../components/Layouts/MainContent";
import { LocationBias, Pagination } from "@yext/search-ui-react";
import usePageSetupEffect from "../hooks/usePageSetupEffect";

export default function ProductsOnly({ verticalKey, promoData }: any) {
  usePageSetupEffect(verticalKey);

  return (
    <div>
      <PageHero title="Products" />
      <Wrapper className="page">
        <div className="section-center ">
          <img
            src={`${promoData}`}
            alt=""
            style={{ marginBottom: "-2em", marginTop: "1em" }}
          />
          <div className="products">
            <FacetContent component={<FacetsSection />} />
            <div className="flex" style={{ flexDirection: "column" }}>
              <div>
                <MainContent
                  result={
                    <ResultCountSection
                      isProducts={true}
                      sortOptions={true}
                      // promoData={undefined || promoData}
                    />
                  }
                  component={<ProductsListContainer />}
                ></MainContent>
              </div>
            </div>
          </div>
        </div>
      </Wrapper>
      <div style={{ marginTop: "1em", marginBottom: "1em" }}>
        <Pagination paginateAllOnNoResults={false}></Pagination>
      </div>
      <LocationBias />
    </div>
  );
}

const Wrapper = styled.div`
  container {
    display: flex;
    flex-direction: column;
  }
  .products {
    display: grid;
    gap: 3rem 1.5rem;
    margin: 4rem auto;
  }
  @media (min-width: 768px) {
    .products {
      grid-template-columns: 250px 1fr;
    }
  }
`;
