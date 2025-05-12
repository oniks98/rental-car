import { NavLink } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import css from "./Navigation.module.css";

export const Navigation = () => {
  const getNavLinkClass = ({ isActive }) =>
    isActive ? `${css.link} ${css.active}` : css.link;

  return (
    <Box>
      <Typography variant="h6">
        <NavLink className={getNavLinkClass} to="/">
          Home
        </NavLink>
      </Typography>

      <Typography variant="h6">
        <NavLink className={getNavLinkClass} to="/contacts">
          Catalog
        </NavLink>
      </Typography>
    </Box>
  );
};
