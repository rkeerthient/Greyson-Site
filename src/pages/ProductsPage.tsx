import styled from "styled-components";
import { useProductsContext } from "../context/ProductsContext";
import ProductsOnly from "./ProductsOnly";
import Loading from "../components/Loading";

export default function ProductsPage({ verticalKey }: { verticalKey: string }) {
  const { custLoad, promoData } = useProductsContext();
  return (
    <>
      {custLoad && <Loading />}
      {!custLoad && (
        <div>
          <ProductsOnly verticalKey={verticalKey} promoData={promoData} />
        </div>
      )}
    </>
  );
}

const Wrapper = styled.div`
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
