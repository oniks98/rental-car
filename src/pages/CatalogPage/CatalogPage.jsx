// CatalogPage.jsx
import { useEffect, useCallback, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getCarsList } from "../../redux/carsList/operations";
import { setCurrentPage } from "../../redux/carsList/slice";
import {
  selectCars,
  selectIsLoading,
  selectError,
  selectCurrentPage,
  selectTotalPages,
} from "../../redux/carsList/selectors";
import { selectBrands } from "../../redux/carsBrands/selectors";
import toast from "react-hot-toast";
import Loader from "../../components/Loader/Loader";
import CarsList from "../../components/CarsList/CarsList";
import FilterPanel from "../../components/FilterPanel/FilterPanel";
import css from "./CatalogPage.module.css";

const CatalogPage = () => {
  const dispatch = useDispatch();
  const cars = useSelector(selectCars);
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);
  const page = useSelector(selectCurrentPage);
  const totalPages = useSelector(selectTotalPages);
  const brands = useSelector(selectBrands);

  const [filters, setFilters] = useState({});

  useEffect(() => {
    dispatch(getCarsList({ ...filters, page }));
  }, [dispatch, page, filters]);

  useEffect(() => {
    if (page >= totalPages) {
      toast("We're sorry, but you've reached the end of search results.");
    }
  }, [page, totalPages]);

  useEffect(() => {
    if (page > 1) {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [cars, page]);

  const handleLoadMore = useCallback(() => {
    if (page < totalPages) {
      dispatch(setCurrentPage(page + 1));
    }
  }, [dispatch, page, totalPages]);

  const handleSearch = useCallback(
    (newFilters) => {
      const normalizedFilters = {
        ...newFilters,
        rentalPrice: newFilters.rentalPrice
          ? Number(newFilters.rentalPrice)
          : undefined,
      };
      setFilters(normalizedFilters);
      dispatch(setCurrentPage(1));
    },
    [dispatch]
  );

  return (
    <div className={css.wrapper}>
      <FilterPanel onSearch={handleSearch} brands={brands} />
      {error && <p className={css.error}>{error}</p>}
      <CarsList cars={cars} />
      <div className={css.loadMoreWrapper}>
        {isLoading ? (
          <Loader />
        ) : (
          page < totalPages && (
            <button className={css.loadMore} onClick={handleLoadMore}>
              Load more
            </button>
          )
        )}
      </div>
    </div>
  );
};

export default CatalogPage;
