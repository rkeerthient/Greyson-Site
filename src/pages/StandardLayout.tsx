import Navigation from "../components/Navigation";
import { universalResultsConfig } from "../config/universalResultsConfig";
import { LayoutComponent } from "../PageRouter";

const navLinks = [
  ...Object.entries(universalResultsConfig).map(([verticalKey, config]) => ({
    to: verticalKey,
    label: config.label || verticalKey,
  })),
];

/**
 * A LayoutComponent that provides a SearchBar and Navigation tabs to a given page.
 */
const StandardLayout: LayoutComponent = ({ page }) => {
  return (
    <>
      <Navigation links={navLinks} />
      {page}
    </>
  );
};
export default StandardLayout;
