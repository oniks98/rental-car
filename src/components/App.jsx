import { Routes, Route } from "react-router-dom";
import { lazy } from "react";
import ScrollToTopButton from "../../src/components/ScrollToTopButton/ScrollToTopButton.jsx";
import "react-datepicker/dist/react-datepicker.css";
import "react-toastify/dist/ReactToastify.css";

import Layout from "../components/Layout/Layout";

// Ленивая загрузка страниц
const HomePage = lazy(() => import("../pages/HomePage/HomePage.jsx"));
const CatalogPage = lazy(() => import("../pages/CatalogPage/CatalogPage.jsx"));
const CarDetailsPage = lazy(() =>
  import("../pages/CarDetailsPage/CarDetailsPage.jsx")
);
const FavoritesPage = lazy(() =>
  import("../pages/FavoritesPage/FavoritesPage.jsx")
);
const NotFoundPage = lazy(() =>
  import("../pages/NotFoundPage/NotFoundPage.jsx")
);

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="catalog">
            <Route index element={<CatalogPage />} />
            <Route path=":id" element={<CarDetailsPage />} />
          </Route>
          <Route path="favorites" element={<FavoritesPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
      <ScrollToTopButton />
    </>
  );
};

export default App;
