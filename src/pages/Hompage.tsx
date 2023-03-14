import CategoriesGrid from "../components/HompageComponents/CategoriesGrid";
import Contact from "../components/HompageComponents/Contact";
import FeaturedProducts from "../components/HompageComponents/FeaturedProducts";
import Hero from "../components/HompageComponents/Hero";

const Homepage = () => {
  return (
    <main>
      <Hero />
      <FeaturedProducts />
      <CategoriesGrid />
      <Contact />
    </main>
  );
};

export default Homepage;
