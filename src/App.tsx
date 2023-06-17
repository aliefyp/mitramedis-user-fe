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
import 'flowbite';
import Error from "pages/Error";
import PasienForm from "pages/PasienForm";

function App() {
  return (
    <>
      <AppProvider>
        <RouterProvider router={
          createBrowserRouter([
            {
              path: "/",
              element: <Layout />,
              errorElement: <Error />,
              children: [
                {
                  path: "",
                  element: <Home />,
                },
                {
                  path: "pasien",
                  element: <Pasien />,
                },
                {
                  path: "pasien/new",
                  element: <PasienForm />
                }
              ],
            },
            {
              path: "/login",
              element: <Login />
            }
          ])}
        />
      </AppProvider>
    </>
  );
}

export default App;
