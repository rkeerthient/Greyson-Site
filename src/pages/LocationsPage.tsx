import usePageSetupEffect from "../hooks/usePageSetupEffect";
import { useEffect, useState } from "react";
import styled from "styled-components";
import MapCard from "../components/cards/MapCard";
import { useSearchState } from "@yext/search-headless-react";
import Loading from "../components/Loading";
import PageHero from "../components/PageHero";
const filterSearchFields = [
  {
    fieldApiName: "name",
    entityType: "location",
  },
  {
    fieldApiName: "paymentOptions",
    entityType: "location",
  },
  {
    fieldApiName: "services",
    entityType: "location",
  },
];
export default function LocationsPage({
  verticalKey,
}: {
  verticalKey: string;
}) {
  usePageSetupEffect(verticalKey);
  let results = useSearchState((state) => state.vertical.results) || [];
  const [res1, setRes1] = useState<any>([]);
  const isLoading =
    useSearchState((state) => state.searchStatus.isLoading) || false;

  useEffect(() => {
    if (results.length >= 1) {
      if (!isLoading && results[0].rawData.type === "location") {
        setRes1(results);
      }
    }
  }, [results]);

  return isLoading ? (
    <Loading />
  ) : (
    <>
      <PageHero title="Locations" />
      <Wrapper className="page">
        <div className="margined">
          <div className="flex">
            <MapCard results={res1} isLoading={isLoading} />
          </div>
        </div>
      </Wrapper>
    </>
  );
}

const Wrapper = styled.section`
  .margined {
    margin: 2em;
    margin-right: 0.5em;
    margin-left: 0.5em;
  }
`;
