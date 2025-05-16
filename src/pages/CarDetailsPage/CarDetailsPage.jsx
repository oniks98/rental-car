import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { FaTachometerAlt, FaMoneyBillWave } from "react-icons/fa";
import { IoLocationOutline, IoCarOutline } from "react-icons/io5";
import { BsCheckCircle, BsFuelPump } from "react-icons/bs";
import { HiCalendar } from "react-icons/hi";
import { GoGear } from "react-icons/go";

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
            <div className={css.data}>
              <div className={css.name}>
                <h1>
                  {car.brand} {car.model}, {car.year}
                </h1>
                <p className={css.id}>id:{car.id}</p>
                <div className={css.infoBox}>
                  <IoLocationOutline className={css.icon} />
                  <span>{car.address}</span>
                </div>
                <div className={css.infoBox}>
                  <FaTachometerAlt className={css.icon} />
                  <span>Mileage: {car.mileage.toLocaleString()} km</span>
                </div>
              </div>
              <div className={css.price}>
                <FaMoneyBillWave className={css.icon} />
                <span>${car.rentalPrice}</span>
              </div>
              <p className={css.infoBox}>{car.description}</p>
            </div>

            <div className={css.detailsBox}>
              <div className={css.details}>
                <h3>Rental Conditions</h3>
                <ul>
                  {car.rentalConditions.map((cond, idx) => (
                    <li key={idx}>
                      <BsCheckCircle className={css.icon} /> {cond}
                    </li>
                  ))}
                </ul>
              </div>

              <div className={css.details}>
                <h3>Car Specifications:</h3>
                <div className={css.infoTech}>
                  <div className={css.infoBox}>
                    <HiCalendar className={css.icon} />
                    <span>Year: {car.year}</span>
                  </div>

                  <div className={css.infoBox}>
                    <IoCarOutline className={css.icon} />
                    <span>Type: {car.type}</span>
                  </div>
                  <div className={css.infoBox}>
                    <BsFuelPump className={css.icon} />
                    <span>Fuel Consumption: {car.fuelConsumption}/day</span>
                  </div>
                  <div className={css.infoBox}>
                    <GoGear className={css.icon} />
                    <span>Engine Size: {car.engineSize}</span>
                  </div>
                </div>
              </div>
              <div className={css.details}>
                <h3>Accessories and functionalities:</h3>
                <ul>
                  {[...car.accessories, ...car.functionalities].map(
                    (item, idx) => (
                      <li key={idx}>
                        {" "}
                        <BsCheckCircle className={css.icon} /> {item}
                      </li>
                    )
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CarDetailsPage;
