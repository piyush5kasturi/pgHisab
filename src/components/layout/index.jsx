import { Navigate, Outlet, useLocation } from "react-router-dom";

import Header from "../header";
import { lazy } from "react";
const PayAll = lazy(() => import("../create/pay-all"));
const Layout = () => {
  const location = useLocation();

  if (!localStorage.getItem("pg-token")) {
    return <Navigate to="/" replace />;
  }

  return (
    <>
      <Header />
      <div className="mt-[100px] md:mt-[90px] mx-10 mb-10">
        {location.pathname === "create" ? (
          <PayAll />
        ) : location.pathname === "/" ? (
          <Navigate to="/create" />
        ) : (
          <Outlet />
        )}
      </div>
    </>
  );
};

export default Layout;
