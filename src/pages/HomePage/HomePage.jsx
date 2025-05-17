import { Link } from "react-router-dom";
import css from "./HomePage.module.css";

const HomePage = () => {
  return (
    <div className={css.background}>
      <div className={css.container}>
        <h1 className={css.titleHome}>Find your perfect rental car</h1>
        <h2 className={css.subtitleHome}>
          Reliable and budget-friendly rentals for any journey
        </h2>
        <Link className={css.link} to="/catalog">
          <button className={css.btn}>View Catalog</button>
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
