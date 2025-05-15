// const CarDetailsPage = () => {
//   return <div>CarDetailsPage</div>;
// };

// export default CarDetailsPage;

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  FaMapMarkerAlt,
  FaGasPump,
  FaTachometerAlt,
  FaCarSide,
  FaCogs,
  FaMoneyBillWave,
} from "react-icons/fa";

import css from "./CarDetailsPage.module.css";
import { getCarDetails } from "../../redux/carDetails/operations.js";
import {
  selectCarDetails,
  selectCarDetailsLoading,
  selectCarDetailsError,
} from "../../redux/carDetails/selectors.js";
import Loader from "../../components/Loader/Loader";
import BookingForm from "../../components/BookingForm/BookingForm";

const CarDetailsPage = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const car = useSelector(selectCarDetails);
  const isLoading = useSelector(selectCarDetailsLoading);
  const error = useSelector(selectCarDetailsError);

  useEffect(() => {
    dispatch(getCarDetails(id));
  }, [dispatch, id]);

  if (error) return <p>Error: {error}</p>;
  if (!car) return null;

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className={css.container}>
          <div className={css.imageformik}>
            <img
              className={css.image}
              src={car.img}
              alt={`${car.brand} ${car.model}`}
            />
            <div className={css.section}>
              <h2>Book your car now</h2>
              <p className={css.textformik}>
                Stay connected! We are always ready to help you.
              </p>
              <BookingForm />
            </div>
          </div>

          <div className={css.details}>
            <h1>
              {car.brand} {car.model} ({car.yea})
            </h1>
            <p>{car.description}</p>

            <div className={css.grid}>
              <div className={css.infoBox}>
                <FaMapMarkerAlt /> <span>{car.address}</span>
              </div>
              <div className={css.infoBox}>
                <FaGasPump /> <span>{car.fuelConsumption} L/100km</span>
              </div>
              <div className={css.infoBox}>
                <FaTachometerAlt /> <span>{car.mileage} km</span>
              </div>
              <div className={css.infoBox}>
                <FaCarSide /> <span>{car.type}</span>
              </div>
              <div className={css.infoBox}>
                <FaCogs /> <span>{car.engineSize}</span>
              </div>
              <div className={css.infoBox}>
                <FaMoneyBillWave /> <span>${car.rentalPrice}/day</span>
              </div>
            </div>

            <div className={css.section}>
              <h3>Accessories</h3>
              <ul>
                {car.accessories.map((item, idx) => (
                  <li key={idx}>• {item}</li>
                ))}
              </ul>
            </div>

            <div className={css.section}>
              <h3>Functionalities</h3>
              <ul>
                {car.functionalities.map((item, idx) => (
                  <li key={idx}>• {item}</li>
                ))}
              </ul>
            </div>

            <div className={css.section}>
              <h3>Rental Conditions</h3>
              <ul>
                {car.rentalConditions.map((cond, idx) => (
                  <li key={idx}>• {cond}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CarDetailsPage;
