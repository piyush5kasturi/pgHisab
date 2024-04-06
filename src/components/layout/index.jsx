import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";

import Create from "../create";
import Header from "../header";
import { lazy } from "react";
const PayAll = lazy(() => import("../create/pay-all"));
const Layout = () => {
  const user = useSelector((state) => state.auth);
  const location = useLocation();

  if (!user?.isLoggedIn) {
    return <Navigate to="/" replace />;
  }

  return (
    <>
      <Header />
      <div className="mt-[90px] mx-10">{location.pathname === "create" ? <PayAll /> : <Outlet />}</div>
    </>
  );
};

export default Layout;
