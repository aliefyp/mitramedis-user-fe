import './App.css';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Layout from './components/Layout';
import Home from './pages/Home';
import { AppProvider } from './context/AppContext';
import Login from './pages/Login';
import Pasien from './pages/Pasien';

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
