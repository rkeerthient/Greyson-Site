import styled from "styled-components";
import { Link, NavLink } from "react-router-dom";
import { provideHeadless, useSearchActions } from "@yext/search-headless-react";
import { FaBars } from "react-icons/fa";
import {
  DropdownItem,
  executeSearch,
  SearchBar,
  VisualAutocompleteConfig,
} from "@yext/search-ui-react";
import { answersHeadlessConfig } from "../config/answersHeadlessConfig";
import { useEffect, useState } from "react";
import CartIcon from "./CartComponents/CartIcon";
import { useProductsContext } from "../context/ProductsContext";

const Navigation = ({ links }: any) => {
  const { setCustLoad, setPromoData } = useProductsContext();
  const [vertKey, setVertKey] = useState("");
  const searchActions = useSearchActions();
  const visualAutocompleteConfig: VisualAutocompleteConfig = {
    entityPreviewSearcher: provideHeadless({
      ...answersHeadlessConfig,
      headlessId: "visual-autocomplete",
    }),
    includedVerticals: ["products"],
    renderEntityPreviews: (isLoading, verticalKeyToResults) => {
      if (!verticalKeyToResults.products) {
        return null;
      }

      const { results } = verticalKeyToResults.products;

      return (
        <div className="SB_parent">
          {results.map((r: any, index: number) => (
            <DropdownItem
              key={index + "-" + r.name}
              value={r.name ? r.name : ""}
            >
              <Link to={`/product/${r.id}`}>
                <div className="SB_container2">
                  <div>
                    <img
                      src={r.rawData?.photoGallery[0]?.image?.url}
                      className="SB_iconDetails"
                      alt={r.rawData.name}
                    />
                  </div>
                  <div style={{ marginLeft: "5em" }}>
                    <h4>{r.name}</h4>
                    <div>${r.rawData?.price.value}</div>
                  </div>
                </div>
              </Link>
            </DropdownItem>
          ))}
        </div>
      );
    },
  };
  useEffect(() => {
    window.location.pathname
      ? setVertKey(window.location.pathname)
      : setVertKey("");
  }, [window.location.href]);

  const onSearch = async (searchEventData: { query?: string }) => {
    const { query } = searchEventData;
    if (vertKey === "/") {
      query && searchActions.setQuery(query);
      searchActions.setUniversal();
      searchActions.executeUniversalQuery().then((res) => console.log(res));
    } else if (query?.length) {
      setCustLoad(true);
      searchActions.setQuery(query);
      searchActions.setUniversal();
      searchActions
        .executeUniversalQuery()
        .then((res) =>
          res?.verticalResults[0].verticalKey === "promo"
            ? setPromoData(
                res?.verticalResults[0].results.map((item: any) => {
                  return item.rawData.primaryPhoto.image.url;
                })
              )
            : setPromoData("")
        )
        .then(() => setCustLoad(false));
    } else {
      console.log("b2");
      setCustLoad(true);
      searchActions.setVertical("products");
      searchActions.executeVerticalQuery();
      await new Promise((r) => setTimeout(r, 200));
      setPromoData("");
      setCustLoad(false);
    }
  };
  return (
    <NavContainer>
      <div className="nav-center">
        <ul className="nav-links">
          <li>
            <NavLink end to="/">
              Home
            </NavLink>
          </li>
          {links.map((item: any, idx: any) => {
            const { to, label } = item;
            return (
              <li key={to} className={to}>
                <NavLink end to={`/${to}`}>
                  {label}
                </NavLink>
              </li>
            );
          })}
        </ul>
        <div className="nav-header">
          <NavLink to="/" className="logoClass">
            <img
              src="https://cdn.shopify.com/s/files/1/0041/1018/8642/files/Greyson_Logo_3009f28e-551b-4b96-a8f8-d7c6d1b8968c.png?v=1646951009&width=250"
              alt=""
            />
          </NavLink>
          <button type="button" className="nav-toggle">
            <FaBars />
          </button>
        </div>
        {vertKey !== "/products" ? (
          <SearchBar
            placeholder="search"
            customCssClasses={{
              searchBarContainer: "overrideContainer",
            }}
            onSearch={onSearch}
          />
        ) : (
          <SearchBar
            visualAutocompleteConfig={visualAutocompleteConfig}
            hideRecentSearches={true}
            customCssClasses={{
              searchBarContainer: "overrideContainer",
              recentSearchesOption: "hidden",
              icon: "none",
            }}
            onSearch={onSearch}
          />
        )}
        <CartIcon />
      </div>
    </NavContainer>
  );
};
const NavContainer = styled.nav`
  height: 5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #ced7e4;
  .nav-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    img {
      width: 150%;
    }
  }
  .logoClass {
    height: 100px;
    width: 130px;
    display: flex;
    align-items: center;
  }
  .nav-toggle {
    background: transparent;
    border: transparent;
    color: var(--clr-primary-5);
    cursor: pointer;
    svg {
      font-size: 2rem;
    }
  }
  .nav-links {
    display: none;
  }
  .cart-btn-wrapper {
    display: none;
  }
  a.active {
    border-bottom: 2px solid var(--clr-primary-7);
  }
  @media (min-width: 992px) {
    .nav-toggle {
      display: none;
    }
    .nav-center {
      display: flex;
      align-items: center;
      gap: 1.5em;
      width: 100%;
      padding-right: 1em;
      padding-left: 1em;
      justify-content: space-around;
    }
    .nav-links {
      display: flex;
      justify-content: center;
      li {
        margin: 0 0.5rem;
      }
      a {
        color: var(--clr-grey-3);
        font-size: 1rem;
        text-transform: capitalize;
        letter-spacing: var(--spacing);
        padding: 0.5rem;

        &:hover {
          border-bottom: 2px solid var(--clr-primary-7);
        }
        a:active {
          border-bottom: 2px solid var(--clr-primary-7);
        }
      }
    }
    .cart-btn-wrapper {
      display: grid;
    }
  }
  .overrideContainer {
    margin-bottom: unset;
    width: 450px;
  }
`;
export default Navigation;
