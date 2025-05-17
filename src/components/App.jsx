import { Routes, Route } from "react-router-dom";
import { lazy } from "react";

import { ToastContainer } from "react-toastify";

import Layout from "../components/Layout/Layout";
import ScrollToTopButton from "../../src/components/ScrollToTopButton/ScrollToTopButton.jsx";
import "react-toastify/dist/ReactToastify.css";

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
      <ToastContainer position="top-center" autoClose={3000} hideProgressBar />
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
