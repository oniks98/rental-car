import CarCard from "../CarCard/CarCard";
import { motion } from "framer-motion";
import css from "./CarsList.module.css";

const MotionDiv = motion.div;

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const CarsList = ({ cars }) => (
  <MotionDiv
    className={css.list}
    variants={containerVariants}
    initial="hidden"
    animate="show"
  >
    {cars.map((car) => (
      <CarCard key={car.id} car={car} />
    ))}
  </MotionDiv>
);

export default CarsList;
