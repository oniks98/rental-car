// import React from "react";

// const FavoritesPage = () => {
//   return <div>FavoritesPage</div>;
// };

// export default FavoritesPage;

// FavoritesPage.jsx;
import { useSelector, useDispatch } from "react-redux";
import { selectFavorites } from "../../redux/favorites/selectors.js"; // путь к favorites/selectors.js
import { selectCars } from "../../redux/carsList/selectors"; // список всех машин
import { clearFavorites } from "../../redux/favorites/slice.js"; // путь к favorites/slice.js

import CarsList from "../../components/CarsList/CarsList";
import css from "./FavoritesPage.module.css";

const FavoritesPage = () => {
  const dispatch = useDispatch();
  const favoriteIds = useSelector(selectFavorites);
  const allCars = useSelector(selectCars);

  const favoriteCars = allCars.filter((car) => favoriteIds.includes(car.id));

  const handleReset = () => {
    dispatch(clearFavorites());
  };

  return (
    <div className={css.wrapper}>
      <div className={css.header}>
        <h1 className={css.title}>Your Favorite Cars</h1>
        <button className={css.resetBtn} onClick={handleReset}>
          Reset Favorites
        </button>
      </div>

      {favoriteCars.length === 0 ? (
        <p className={css.empty}>No favorites yet.</p>
      ) : (
        <CarsList cars={favoriteCars} />
      )}
    </div>
  );
};

export default FavoritesPage;
