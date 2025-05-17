import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";

import { toast } from "react-toastify";

import { selectFavorites } from "../../redux/favorites/selectors";
import { clearFavorites } from "../../redux/favorites/slice";
import { getCarDetails } from "../../redux/carDetails/operations";
import CarsList from "../../components/CarsList/CarsList";
import Loader from "../../components/Loader/Loader";
import css from "./FavoritesPage.module.css";

const FavoritesPage = () => {
  const dispatch = useDispatch();
  const favoriteIds = useSelector(selectFavorites);
  const [favoriteCars, setFavoriteCars] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const handleReset = () => {
    dispatch(clearFavorites());
    setFavoriteCars([]);
  };

  useEffect(() => {
    const fetchFavorites = async () => {
      setIsLoading(true);
      try {
        const results = await Promise.all(
          favoriteIds.map((id) => dispatch(getCarDetails(id)).unwrap())
        );
        setFavoriteCars(results);
      } catch (error) {
        toast.error(`Error loading favorite machines: ${error.message}`);
        setFavoriteCars([]);
      } finally {
        setIsLoading(false);
      }
    };

    if (favoriteIds.length > 0) {
      fetchFavorites();
    } else {
      setFavoriteCars([]);
      setIsLoading(false);
    }
  }, [favoriteIds, dispatch]);

  return (
    <div className={css.wrapper}>
      <div className={css.header}>
        <h1 className={css.title}>Your Favorite Cars</h1>
        <button className={css.resetBtn} onClick={handleReset}>
          Reset Favorites
        </button>
      </div>

      {isLoading ? (
        <Loader />
      ) : favoriteCars.length === 0 ? (
        <p className={css.empty}>No favorites yet.</p>
      ) : (
        <CarsList cars={favoriteCars} />
      )}
    </div>
  );
};

export default FavoritesPage;
