import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "mapbox-gl/dist/mapbox-gl.css";
import { ProductsProvider } from "./context/ProductsContext";
import "@yext/search-ui-react/bundle.css";
import "./index.css";
import { SchemaProvider } from "./context/SchemaContext";

const container = document.getElementById("root") as HTMLElement;
const root = createRoot(container);
root.render(
  <ProductsProvider>
    <SchemaProvider>
      <App />
    </SchemaProvider>
  </ProductsProvider>
);
