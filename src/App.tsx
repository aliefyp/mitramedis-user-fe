import './App.css';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Layout from './components/Layout';
import Dashboard from './pages/Home';
import { AppProvider } from './context/AppContext';
import Login from './pages/Login';

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
                element: <Dashboard />,
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
