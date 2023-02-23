import { AppliedFilters } from "@yext/search-ui-react";
import styled from "styled-components";

const MainContent = ({ result, component }: any): JSX.Element => {
  return (
    <Wrapper>
      {result}
      <AppliedFilters />
      {component}
    </Wrapper>
  );
};

export default MainContent;

const Wrapper = styled.section``;
