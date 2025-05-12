import { Navigation } from "../Navigation/Navigation";
import css from "./Header.module.css";

export const Header = () => {
  return (
    <header className={css.header}>
      <Navigation />
    </header>
  );
};
