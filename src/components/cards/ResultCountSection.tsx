import { Direction, SortBy, SortType } from "@yext/search-headless-react";
import { ResultsCount } from "@yext/search-ui-react";
import { useState } from "react";
import { BsFillGridFill, BsList } from "react-icons/bs";
import styled from "styled-components";
import { useProductsContext } from "../../context/ProductsContext";

const ResultCountSection = (props: any) => {
  const { isGrid, setIsGrid, setSortType } = useProductsContext();
  const [sortByLabel, setSortByLabel] = useState<string>("");
  const { isProducts } = props;
  const { sortOptions } = props;

  const sortByOptions: { label: string; sortBy: SortBy }[] = [
    {
      label: "Price: High to Low",
      sortBy: {
        field: "price.value",
        direction: Direction.Descending,
        type: SortType.Field,
      },
    },
    {
      label: "Price: Low to High",
      sortBy: {
        field: "price.value",
        direction: Direction.Ascending,
        type: SortType.Field,
      },
    },
    {
      label: "Name: A-Z",
      sortBy: {
        field: "name",
        direction: Direction.Ascending,
        type: SortType.Field,
      },
    },
    {
      label: "Name: Z-A",
      sortBy: {
        field: "name",
        direction: Direction.Descending,
        type: SortType.Field,
      },
    },
  ];
  const handleChange = (e: any) => {
    setSortByLabel(e.target.value);
    if (e.target.value) {
      let srt = sortByOptions.filter((item) => item.label === e.target.value);
      setSortType(srt[0].sortBy);
    } else {
      let srt = sortByOptions.filter((item) => item.label === "Name: A-Z");
      setSortType(srt[0].sortBy);
    }
  };

  return (
    <>
      {" "}
      <Wrapper
        style={{
          gridTemplateColumns: `${
            isProducts ? "auto auto 1fr auto" : "auto 1fr auto"
          }`,
          alignItems: "baseline",
        }}
      >
        {isProducts && (
          <div className="btn-container">
            <button
              onClick={() => setIsGrid(true)}
              className={`${isGrid ? "active" : null}`}
            >
              <BsFillGridFill />
            </button>
            <button
              onClick={() => setIsGrid(false)}
              className={`${!isGrid ? "active" : null}`}
            >
              <BsList />
            </button>
          </div>
        )}
        <ResultsCount />
        <hr />
        {sortOptions && isProducts && (
          <>
            <form onSubmit={(e) => e.preventDefault()}>
              <label htmlFor="sort">sort by</label>
              <select
                name="sort"
                id="sort"
                value={sortByLabel}
                className="sort-input"
                onChange={(e) => handleChange(e)}
              >
                <option value="">None</option>
                {sortByOptions?.map((item: any, idx: any) => {
                  return (
                    <option key={idx} value={item.label}>
                      {item.label}
                    </option>
                  );
                })}
              </select>
            </form>
          </>
        )}
      </Wrapper>
      {/* {props.promoData && (
        <img
          src={props.promoData}
          alt=""
          style={{ marginTop: "-2em", marginBottom: "1em" }}
        />
      )} */}
    </>
  );
};
const Wrapper = styled.section`
  display: grid;
  align-items: center;
  margin-bottom: 2rem;
  column-gap: 2rem;
  @media (max-width: 576px) {
    display: grid;
    grid-template-columns: 1fr;
    row-gap: 0.75rem;
    .btn-container {
      width: 50px;
    }
    label {
      display: inline-block;
      margin-right: 0.5rem;
    }
  }
  hr {
    width: 100%;
  }
  @media (min-width: 768px) {
    column-gap: 2rem;
  }
  p {
    margin-bottom: 0;
  }
  .btn-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 0.5rem;
    button {
      background: transparent;
      border: 1px solid var(--clr-black);
      color: var(--clr-black);
      width: 1.5rem;
      border-radius: var(--radius);
      height: 1.5rem;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      svg {
        font-size: 1rem;
      }
    }
    .active {
      background: var(--clr-black);
      color: var(--clr-white);
    }
  }
  .sort-input {
    border-color: transparent;
    font-size: 1rem;
    text-transform: capitalize;
    padding: 0.25rem 0.5rem;
  }
  label {
    font-size: 1rem;
    text-transform: capitalize;
  }
`;
export default ResultCountSection;
