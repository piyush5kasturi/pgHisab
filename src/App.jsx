import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import Login from './components/login';
import { Suspense } from 'react';
import Create from './components/create';
import Layout from './components/layout';
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route path="/" element={<Login />} />,
      <Route path="/" element={<Layout />}>
      <Route path="/create" element={<Create />} />
      </Route>
    </Route>
  ),
);


const App = () => {

  return (
    <Suspense fallback={<p> Loading...</p>}>
      <RouterProvider router={router} />
    </Suspense>
  );
};

export default App;
