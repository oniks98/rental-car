import { NavLink } from "react-router-dom";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import css from "./Navigation.module.css";

export const Navigation = () => {
  const getNavLinkClass = ({ isActive }) =>
    isActive ? `${css.link} ${css.active}` : css.link;

  return (
    <div className={css.nav}>
      <NavLink className={getNavLinkClass} to="/">
        Home
      </NavLink>

      <NavLink className={getNavLinkClass} to="/catalog" end>
        Catalog
      </NavLink>

      <NavLink className={getNavLinkClass} to="/favorites">
        {({ isActive }) =>
          isActive ? (
            <FaHeart className={`${css.icon} ${css.activeIcon}`} />
          ) : (
            <FaRegHeart className={css.icon} />
          )
        }
      </NavLink>
    </div>
  );
};
