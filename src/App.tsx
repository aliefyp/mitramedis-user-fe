import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Layout from 'components/Layout';
import { AppProvider } from 'context/AppContext';
import Home from 'pages/Home';
import Login from 'pages/Login';
import Pasien from 'pages/Pasien';
import './App.css';

function App() {
  return (
    <AppProvider>
      <RouterProvider router={
        createBrowserRouter([
          {
            path: "/",
            element: <Layout />,
            children: [
              {
                path: "",
                element: <Home />,
              },
              {
                path: "pasien",
                element: <Pasien />,
              },
            ],
          },
          {
            path: "/login",
            element: <Login />
          }
        ])}
      />
    </AppProvider>
  );
}

export default App;
