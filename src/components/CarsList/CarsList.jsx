import { motion } from "framer-motion";

import CarCard from "../CarCard/CarCard";

import css from "./CarsList.module.css";

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const MotionUl = motion.ul;

const CarsList = ({ cars }) => (
  <MotionUl
    className={css.list}
    variants={containerVariants}
    initial="hidden"
    animate="show"
  >
    {cars.map((car) => (
      <li key={car.id} className={css.listItem}>
        <CarCard car={car} />
      </li>
    ))}
  </MotionUl>
);

export default CarsList;
