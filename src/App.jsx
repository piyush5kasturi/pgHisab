import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Login from "./components/login";
import { Suspense, lazy } from "react";
import Layout from "./components/layout";
import { useSelector } from "react-redux";
import PayOne from "./components/create/pay-one";
import PayList from "./components/create/pay-list";
import Profile from "./components/profile";
import YourPayOne from "./components/create/your-pay-one";
const PayAll = lazy(() => import("./components/create/pay-all"));
const App = () => {
  const user = useSelector((state) => state.auth);
  return (
    <Suspense fallback={<p> Loading...</p>}>
      <BrowserRouter>
        <Routes>
          {!localStorage.getItem("pg-token") ? (
            <Route>
              <Route path="/" element={<Login />} />
              <Route path="*" element={<Navigate to={"/"} />} />
            </Route>
          ) : (
            <Route path="/" element={<Layout />}>
              <Route path="create" element={<PayAll />} />
              <Route path="pay-one" element={<PayOne />} />
              <Route path="your-pay-one" element={<YourPayOne />} />
              <Route path="pay-list" element={<PayList />} />
              <Route path="profile" element={<Profile />} />
              <Route path="*" element={<Navigate to={"/create"} />} />
            </Route>
          )}
        </Routes>
      </BrowserRouter>
    </Suspense>
  );
};

export default App;
