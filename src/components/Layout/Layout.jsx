import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import { Header } from "../Header/Header";
import Loader from "../../components/Loader/Loader";
import css from "./Layout.module.css";

const Layout = () => {
  return (
    <div className={css.container}>
      <Header />
      <main className={css.main}>
        <Suspense fallback={<Loader />}>
          <Outlet />
        </Suspense>
      </main>
    </div>
  );
};

export default Layout;
