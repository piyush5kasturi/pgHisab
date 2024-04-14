import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Login from "./components/login";
import { Suspense, lazy } from "react";
import Layout from "./components/layout";
import { useSelector } from "react-redux";
import PayOne from "./components/create/pay-one";
import ErrorPage from "./components/Error";
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
              <Route path="*" element={<Navigate to={'/create'} />} />
            </Route>
          )}
        </Routes>
      </BrowserRouter>
    </Suspense>
  );
};

export default App;
