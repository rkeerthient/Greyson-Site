import PageRouter from "./PageRouter";
import StandardLayout from "./pages/StandardLayout";
import {
  provideHeadless,
  SearchHeadlessProvider,
} from "@yext/search-headless-react";
import { answersHeadlessConfig } from "./config/answersHeadlessConfig";
import { CartProvider } from "./context/CartContext";
import { PageViewContextProvider } from "./context/PageViewContext";
import { routeConfig } from "./config/routeConfig";
import { useSchemaContext } from "./context/SchemaContext";
const searcher = provideHeadless(answersHeadlessConfig);
searcher.setSessionTrackingEnabled(true);

export default function App() {
  const { schemaOrg } = useSchemaContext();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrg) }}
      />
      <SearchHeadlessProvider searcher={searcher}>
        {/* <CartProvider> */}
        <PageViewContextProvider>
          <PageRouter Layout={StandardLayout} routes={routeConfig} />
        </PageViewContextProvider>
        {/* </CartProvider> */}
      </SearchHeadlessProvider>
    </>
  );
}
