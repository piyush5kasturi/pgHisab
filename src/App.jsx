import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import Login from './components/login';
import { Suspense } from 'react';
import Create from './components/Create';
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route path="/" element={<Login />} />,
      <Route path="/create" element={<Create />} />
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
