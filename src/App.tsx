import {
  Route,
  Routes,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { AuthProvider } from "react-auth-kit";
import { AppProvider } from 'context/AppContext';
import { ToasterProvider } from 'context/ToasterContext';
import Layout from 'components/Layout';
import Home from 'pages/Home';
import Login from 'pages/Login';
import Logout from 'pages/Logout';
import Pasien from 'pages/Pasien';
import './App.css';
import 'flowbite';
import Error from "pages/Error";
// import PasienForm from "pages/PasienForm";

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 0,
      suspense: true
    }
  }
});

function App() {
  return (
    <ToasterProvider>
      <QueryClientProvider client={queryClient}>
        <AppProvider>
          <AuthProvider
            authType="cookie"
            authName={process.env.REACT_APP_SESSION_PREFIX || ''}
            cookieDomain={window.location.hostname}
            cookieSecure={process.env.NODE_ENV === 'production'}
          >
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route path="" element={<Home />} />
                <Route path="/pasien" element={<Pasien />} />
                <Route path="/logout" element={<Logout />} />
                <Route path="*" element={<Error />} />
              </Route>
              <Route path="/login" element={<Login />} />
            </Routes>
          </AuthProvider>
        </AppProvider>
      </QueryClientProvider>
    </ToasterProvider>
  );
}

export default App;
