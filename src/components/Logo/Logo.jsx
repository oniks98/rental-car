import css from "./Logo.module.css";

export const Logo = () => {
  return (
    <span className={css.logo}>
      Rental<span className={css.logoAccent}>Car</span>
    </span>
  );
};
