import { Navigation } from "../Navigation/Navigation.jsx";
import { Logo } from "../Logo/Logo.jsx";
import css from "./Header.module.css";

export const Header = () => {
  return (
    <div className={css.container}>
      <header className={css.header}>
        <Logo />
        <Navigation />
      </header>
    </div>
  );
};
