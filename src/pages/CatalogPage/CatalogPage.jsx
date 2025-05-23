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
import { toast } from "react-toastify";
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
    const fetchCars = async () => {
      try {
        await dispatch(getCarsList({ ...filters, page })).unwrap();
      } catch {
        toast.error("Failed to load cars. Please try again later.", {
          toastId: "fetch-cars-error",
        });
      }
    };

    fetchCars();
  }, [dispatch, page, filters]);

  const handleLoadMore = useCallback(() => {
    const nextPage = page + 1;

    if (nextPage >= totalPages) {
      toast.info("We're sorry, but you've reached the end of search results.", {
        toastId: "end-of-search-results",
      });
    }

    if (page < totalPages) {
      dispatch(setCurrentPage(nextPage));
    }
  }, [dispatch, page, totalPages]);

  const handleSearch = useCallback(
    (newFilters) => {
      const normalized = {
        ...newFilters,
      };
      setFilters(normalized);
      dispatch(setCurrentPage(1));
    },
    [dispatch]
  );

  useEffect(() => {
    if (page > 1) {
      const timeout = setTimeout(() => {
        window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: "smooth",
        });
      }, 100);

      return () => clearTimeout(timeout);
    }
  }, [cars, page]);

  return (
    <div className={css.wrapper}>
      <FilterPanel onSearch={handleSearch} brands={brands} />
      {error && <p className={css.error}>{error}</p>}

      {isLoading && page === 1 ? (
        <Loader />
      ) : cars.length === 0 ? (
        <p className={css.emptyMessage}>
          No cars found matching your criteria.
        </p>
      ) : (
        <div>
          <CarsList cars={cars} />

          {page < totalPages && (
            <>
              {isLoading ? (
                <Loader />
              ) : (
                <button className={css.loadMore} onClick={handleLoadMore}>
                  Load more
                </button>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default CatalogPage;
