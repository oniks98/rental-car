import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { FaTachometerAlt, FaMoneyBillWave } from "react-icons/fa";
import { IoLocationOutline, IoCarOutline } from "react-icons/io5";
import { BsCheckCircle, BsFuelPump } from "react-icons/bs";
import { HiCalendar } from "react-icons/hi";
import { GoGear } from "react-icons/go";

import useMedia from "../../hooks/useMedia";
import { getCarDetails } from "../../redux/carDetails/operations.js";
import {
  selectCarDetails,
  selectCarDetailsLoading,
  selectCarDetailsError,
} from "../../redux/carDetails/selectors.js";
import { selectCurrency, selectRate } from "../../redux/currency/selectors";
import { getFormattedPrice } from "../../utils/formatPrice";
import Loader from "../../components/Loader/Loader";
import BookingForm from "../../components/BookingForm/BookingForm";
import NotFoundPage from "../NotFoundPage/NotFoundPage.jsx";
import css from "./CarDetailsPage.module.css";
import clsx from "clsx";

const CarDetailsPage = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const car = useSelector(selectCarDetails);
  const isLoading = useSelector(selectCarDetailsLoading);
  const error = useSelector(selectCarDetailsError);

  const currency = useSelector(selectCurrency);
  const rate = useSelector(selectRate);

  const { isMobile, isDesktop } = useMedia();

  useEffect(() => {
    dispatch(getCarDetails(id));
  }, [dispatch, id]);

  if (isLoading) return <Loader />;
  if (error || !car?.id) return <NotFoundPage />;

  const rentalPrice = getFormattedPrice(car.rentalPrice, currency, rate);

  return (
    <main className={css.container}>
      <section className={css.imageSection}>
        <img
          className={css.image}
          src={car.img}
          alt={`${car.brand} ${car.model}`}
        />

        {isDesktop && (
          <section className={clsx(css.bookingSection, css.desktopBooking)}>
            <h2>Book your car now</h2>
            <p className={css.text}>
              Stay connected! We are always ready to help you.
            </p>
            <BookingForm />
          </section>
        )}
      </section>

      <section className={css.detailsSection}>
        <div className={css.headerBox}>
          <header className={css.carHeader}>
            <h1 className={css.title}>
              {car.brand} {car.model}, {car.year}
            </h1>
            <p className={css.carId}>id: {car.id}</p>
            <ul className={css.infoList}>
              <li className={css.infoItem}>
                <IoLocationOutline className={css.icon} />{" "}
                <span>{car.address}</span>
              </li>
              <li className={css.infoItem}>
                <FaTachometerAlt className={css.icon} />{" "}
                <span>Mileage: {car.mileage.toLocaleString()} km</span>
              </li>
            </ul>
          </header>
          <div className={css.price}>
            <FaMoneyBillWave className={css.icon} /> <span>{rentalPrice}</span>
          </div>
          <p className={css.description}>{car.description}</p>
        </div>

        <section className={css.detailsBox}>
          <div className={css.detailBlock}>
            <h3>Rental Conditions</h3>
            <ul>
              {car.rentalConditions.map((cond, idx) => (
                <li key={idx} className={css.infoItem}>
                  <BsCheckCircle className={css.icon} /> {cond}
                </li>
              ))}
            </ul>
          </div>

          <div className={css.detailBlock}>
            <h3>Car Specifications:</h3>
            <ul className={css.infoList}>
              <li className={css.infoItem}>
                <HiCalendar className={css.icon} />{" "}
                <span>Year: {car.year}</span>
              </li>
              <li className={css.infoItem}>
                <IoCarOutline className={css.icon} />{" "}
                <span>Type: {car.type}</span>
              </li>
              <li className={css.infoItem}>
                <BsFuelPump className={css.icon} />{" "}
                <span>Fuel Consumption: {car.fuelConsumption}/day</span>
              </li>
              <li className={css.infoItem}>
                <GoGear className={css.icon} />{" "}
                <span>Engine Size: {car.engineSize}</span>
              </li>
            </ul>
          </div>

          <div className={css.detailBlock}>
            <h3>Accessories and functionalities:</h3>
            <ul>
              {[...car.accessories, ...car.functionalities].map((item, idx) => (
                <li key={idx} className={css.infoItem}>
                  <BsCheckCircle className={css.icon} /> {item}
                </li>
              ))}
            </ul>
          </div>
        </section>
      </section>

      {isMobile && (
        <section className={clsx(css.bookingSection, css.mobileBooking)}>
          <h2>Book your car now</h2>
          <p className={css.text}>
            Stay connected! We are always ready to help you.
          </p>
          <BookingForm />
        </section>
      )}
    </main>
  );
};

export default CarDetailsPage;
