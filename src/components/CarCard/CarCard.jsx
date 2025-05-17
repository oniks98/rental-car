import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import { FaHeart, FaRegHeart } from "react-icons/fa";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

import { toggleFavorite } from "../../redux/favorites/slice.js";
import { isCarFavorite } from "../../redux/favorites/selectors.js";
import { selectCurrency, selectRate } from "../../redux/currency/selectors";

import { getFormattedPrice } from "../../utils/formatPrice";

import css from "./CarCard.module.css";

const MotionDiv = motion.div;

const CarCard = ({ car }) => {
  const dispatch = useDispatch();
  const isFavorite = useSelector(isCarFavorite(car.id));
  const currency = useSelector(selectCurrency);
  const rate = useSelector(selectRate);
  const src = car.img || "";

  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: false,
  });

  useEffect(() => {
    if (inView) {
      controls.start({ opacity: 1, y: 0 });
    } else {
      controls.start({ opacity: 0, y: 50 });
    }
  }, [inView, controls]);

  const handleFavoriteClick = () => {
    dispatch(toggleFavorite(car.id));
  };

  const rentalPrice = getFormattedPrice(car.rentalPrice, currency, rate);

  return (
    <MotionDiv
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={controls}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={css.card}
    >
      <div className={css.imageWrapper}>
        {src ? (
          <img
            src={src}
            alt={`${car.brand} ${car.model}`}
            className={css.image}
          />
        ) : (
          <div className={css.placeholder}>No image</div>
        )}

        <button
          className={`${css.favBtn} ${isFavorite ? css.activeIcon : ""}`}
          onClick={handleFavoriteClick}
          aria-label="Add to favorites"
        >
          {isFavorite ? <FaHeart /> : <FaRegHeart />}
        </button>
      </div>

      <div className={css.details}>
        <div className={css.box}>
          <h3 className={css.title}>
            {car.brand} <span className={css.model}>{car.model}</span>,{" "}
            {car.year}
          </h3>
          <div className={css.price}>{rentalPrice}</div>
        </div>
        <p className={css.meta}>{car.address}</p>
        <p className={css.rental}>{car.rentalCompany}</p>
        <p className={css.meta}>
          {car.type} &bull; {car.mileage.toLocaleString()} km
        </p>
      </div>

      <Link className={css.link} to={`/catalog/${car.id}`}>
        <button className={css.btn}>Read more</button>
      </Link>
    </MotionDiv>
  );
};

export default CarCard;
