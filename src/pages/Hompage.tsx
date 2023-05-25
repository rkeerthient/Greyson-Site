import { useSearchActions, useSearchState } from "@yext/search-headless-react";
import {
  DirectAnswer,
  StandardCard,
  StandardSection,
  UniversalResults,
} from "@yext/search-ui-react";
import { NavLink } from "react-router-dom";
import { ProductCard } from "../components/cards/ProductCard";
import { FAQCard } from "../components/FAQCard";
import CategoriesGrid from "../components/HompageComponents/CategoriesGrid";
import Contact from "../components/HompageComponents/Contact";
import FeaturedProducts from "../components/HompageComponents/FeaturedProducts";
import Hero from "../components/HompageComponents/Hero";
import usePageSetupEffect from "../hooks/usePageSetupEffect";

const Homepage = () => {
  usePageSetupEffect();
  const isLoading =
    useSearchState((state) => state.searchStatus.isLoading) || false;
  const queryString = useSearchState((state) => state.query.input);

  const GridSection = ({ results, CardComponent, header }: any) => {
    return (
      <>
        <div className="flex flex-col space-y-2 univ">
          <div className="flex justify-between">
            <div className="font-semibold px-32">{header.props.label}</div>
            <NavLink
              end
              to={`/${header.props.label.toLowerCase()}`}
              className="hover:underline "
              style={{ color: "blue" }}
            >
              View All
            </NavLink>
          </div>
          <div
            style={{
              marginTop: "2em",
              display: "grid",
              gridTemplateColumns: "25% 25% 25% 25%",
              gap: "2em",
            }}
          >
            {results.map((item: any) => (
              <ProductCard result={item} />
            ))}
          </div>
        </div>
        <hr />
      </>
    );
  };
  const FAQSection = ({ results, CardComponent, header }: any) => {
    return (
      <>
        <div className="flex flex-col  univ">
          <div className="flex justify-between">
            <div className="font-semibold px-32">{header.props.label}</div>
            <NavLink
              end
              to={`/${header.props.label.toLowerCase()}`}
              className="hover:underline "
              style={{ color: "blue" }}
            >
              View All
            </NavLink>
          </div>
          <div
            style={{
              marginTop: "2em",
            }}
          >
            {results.map((item: any) => (
              <FAQCard result={item} />
            ))}
          </div>
        </div>
        <hr />
      </>
    );
  };

  const PromoSection = ({ results, CardComponent, header }: any) => {
    console.log(JSON.stringify(results));
    return (
      <>
        <div>
          <div
            className="font-semibold px-32 "
            style={{ marginBottom: "2.5rem" }}
          >
            {header.props.label}
          </div>
          <img src={results[0].rawData.primaryPhoto.image.url} alt="" />
        </div>
      </>
    );
  };

  return (
    <main>
      <div style={{ padding: "3em", paddingBottom: "0em" }}>
        <DirectAnswer />
      </div>
      {queryString ? (
        <UniversalResults
          customCssClasses={{ universalResultsContainer: "univPadding" }}
          verticalConfigMap={{
            color_variants: {},
            products: {
              CardComponent: StandardCard,
              SectionComponent: GridSection,
              label: "Products",
            },
            faqs: {
              CardComponent: StandardCard,
              SectionComponent: FAQSection,
              label: "FAQs",
            },
            promo: {
              CardComponent: StandardCard,
              SectionComponent: PromoSection,
              label: "Promo",
            },
          }}
        />
      ) : (
        <>
          <Hero />
          <FeaturedProducts />
          <CategoriesGrid />
          <Contact />
        </>
      )}
    </main>
  );
};

export default Homepage;
