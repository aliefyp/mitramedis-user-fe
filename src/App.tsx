import { useEffect } from "react";
import moment from "moment";
import "moment/locale/id";
import { Route, Routes, useLocation } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { AuthProvider } from "react-auth-kit";
import { AppProvider } from "context/AppContext";
import { ToasterProvider } from "context/ToasterContext";
import Layout from "components/Layout";
import Error from "pages/Error";
import Home from "pages/Home/index";
import Login from "pages/Login";
import Register from "pages/Register";
import Logout from "pages/Logout";
import Pasien from "pages/Pasien/index";
import PasienForm from "pages/PasienForm/index";
import RekamMedis from "pages/RekamMedis/index";
import RekamMedisForm from "pages/RekamMedisForm/index";
import Stock from "pages/Stock/index";
import StockNewItem from "pages/StockNewItem/index";
import StockNewEntry from "pages/StockNewEntry/index";
import StockCard from "pages/StockCard/index";
import StockOpname from "pages/StockOpname/index";
import "./App.css";
import "flowbite";

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

moment.locale("id");

function App() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

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
                <Route path="/" element={<Home />} />
                <Route path="/pasien" element={<Pasien />} />
                <Route path="/pasien/new" element={<PasienForm type="new" />} />
                <Route
                  path="/pasien/edit/:patient_id"
                  element={<PasienForm type="edit" />}
                />
                <Route path="/rekam-medis" element={<RekamMedis />} />
                <Route
                  path="/rekam-medis/new"
                  element={<RekamMedisForm type="new" />}
                />
                <Route path="/stok" element={<Stock />} />
                <Route path="/stok/new" element={<StockNewItem />} />
                <Route path="/stok/in" element={<StockNewEntry />} />
                <Route path="/stok/card" element={<StockCard />} />
                <Route path="/stok/opname" element={<StockOpname />} />
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
