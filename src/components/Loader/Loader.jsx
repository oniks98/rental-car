import { ThreeDots } from "react-loader-spinner";
import css from "./Loader.module.css";

const Loader = () => {
  return (
    <div className={css.loaderContainer}>
      <ThreeDots
        className={css.loader}
        ariaLabel="loading"
        visible={true}
        color="var(--background-blue)"
      />
    </div>
  );
};

export default Loader;
