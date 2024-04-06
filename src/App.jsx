import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";
import Login from "./components/login";
import { Suspense, lazy } from "react";
import Layout from "./components/layout";
import { useSelector } from "react-redux";
const PayAll = lazy(() => import("./components/create/pay-all"));
const App = () => {
  const user = useSelector((state) => state.auth);
  return (
    <Suspense fallback={<p> Loading...</p>}>
      <BrowserRouter>
        <Routes>
          {!user?.isLoggedIn ? (
            <Route path="/" element={<Login />} />
          ) : (
            <Route path="/" element={<Layout />}>
              <Route path="create" element={<PayAll />} />
            </Route>
          )}
        </Routes>
      </BrowserRouter>
    </Suspense>
  );
};

export default App;
