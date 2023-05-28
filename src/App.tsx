import './App.css';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Layout from './components/Layout';
import Dashboard from './pages/dashboard';

function App() {
  return (
    <RouterProvider router={
      createBrowserRouter([
        {
          path: "/",
          element: <Layout />,
          children: [
            {
              path: "",
              element: <Dashboard />,
            },
          ],
        },
      ])}
    />
  );
}

export default App;
