import { useSelector } from "react-redux";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

import Create from "../create";
import Header from "../header";
import { lazy } from "react";
const PayAll = lazy(() => import("../create/pay-all"));
const Layout = () => {
  const user = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const location = useLocation();
  console.log("ddddd",user?.isLoggedIn)
  if (!user?.isLoggedIn) {
    return navigate("/login");
  }

  return (
    <>
      <Header />
      <div className="mt-[90px] mx-10 mb-10">
        {location.pathname === "create" ? <PayAll /> : <Outlet />}
      </div>
    </>
  );
};

export default Layout;
