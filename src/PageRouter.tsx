import { ComponentType } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

interface RouteData {
  path: string;
  page: JSX.Element;
}

export type LayoutComponent = ComponentType<{ page: JSX.Element }>;

interface PageProps {
  Layout?: LayoutComponent;
  routes: RouteData[];
}

/**
 * PageRouter abstracts away logic surrounding react-router, and provides an easy way
 * to specify a {@link LayoutComponent} for a page.
 */
export default function PageRouter({ Layout, routes }: PageProps) {
  const pages = routes.map((routeData) => {
    const { path, page } = routeData;
    if (Layout) {
      return (
        <Route key={path} path={path} element={<Layout page={page} />}></Route>
      );
    }

    return <Route key={path} path={path} element={page}></Route>;
  });

  return (
    <BrowserRouter>
      <Routes>{pages}</Routes>
    </BrowserRouter>
  );
}
