import { Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { AuthProvider } from "react-auth-kit";
import { AppProvider } from "context/AppContext";
import { ToasterProvider } from "context/ToasterContext";
import Layout from "components/Layout";
import Error from "pages/Error";
import Home from "pages/Home";
import Login from "pages/Login";
import Register from "pages/Register";
import Logout from "pages/Logout";
import Pasien from "pages/Pasien/index";
import "./App.css";
import "flowbite";
// import PasienForm from "pages/PasienForm";

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 0,
      suspense: true,
    },
  },
});

function App() {
  return (
    <ToasterProvider>
      <QueryClientProvider client={queryClient}>
        <AuthProvider
          authType="cookie"
          authName={process.env.REACT_APP_SESSION_PREFIX || ""}
          cookieDomain={window.location.hostname}
          // cookieSecure={process.env.NODE_ENV === "production"}
        >
          <AppProvider>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route path="" element={<Home />} />
                <Route path="/pasien" element={<Pasien />} />
                <Route path="/logout" element={<Logout />} />
                <Route path="*" element={<Error />} />
              </Route>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Routes>
          </AppProvider>
        </AuthProvider>
      </QueryClientProvider>
    </ToasterProvider>
  );
}

export default App;
