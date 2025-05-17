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
        const { totalPages: tp } = await dispatch(
          getCarsList({ ...filters, page })
        ).unwrap();

        if (page >= tp) {
          toast.info(
            "We're sorry, but you've reached the end of search results.",
            {
              toastId: "end-of-search-results",
            }
          );
        }
      } catch {
        toast.error("Failed to load cars. Please try again later.", {
          toastId: "fetch-cars-error",
        });
      }
    };

    fetchCars();
  }, [dispatch, page, filters]);

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
      const normalized = {
        ...newFilters,
        rentalPrice: newFilters.rentalPrice
          ? Number(newFilters.rentalPrice)
          : undefined,
      };
      setFilters(normalized);
      dispatch(setCurrentPage(1));
    },
    [dispatch]
  );

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
            <div className={css.loadMoreWrapper}>
              {isLoading ? (
                <Loader />
              ) : (
                <button className={css.loadMore} onClick={handleLoadMore}>
                  Load more
                </button>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CatalogPage;
