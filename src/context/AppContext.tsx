import getCookie from "helpers/getCookie";
// import useUserDetail from "hooks/user/useUserDetail";
import { useAuthUser } from "react-auth-kit";
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { UserType } from "types/user";
import axios from "axios";

const MOBILE_BREAKPOINT = 640;

interface AppContextInterface {
  isMobile: boolean;
  userDetail: UserType | null;
}

export const AppContext = createContext({} as AppContextInterface);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const hasAuth = useRef(false);
  const [userDetail, setUserDetail] = useState<UserType | null>(null);
  const [isMobile, setIsMobile] = useState(
    window.innerWidth <= MOBILE_BREAKPOINT
  );

  // const { getUserDetail } = useUserDetail();
  const auth = useAuthUser();

  // const userId = useMemo(() => {
  //   const authStateUri =
  //     getCookie(`${process.env.REACT_APP_SESSION_PREFIX}_state`) || "";
  //   const authStateStr = decodeURI(authStateUri);
  //   const authStateObj = JSON.parse(authStateStr);

  //   return authStateObj?.id;
  // }, []);

  const handleResize = () => {
    setIsMobile(window.innerWidth <= MOBILE_BREAKPOINT);
  };

  const handleUserDetail = useCallback(
    async (userId: string, clinicId: string, token: string) => {
      try {
        // const response = await getUserDetail({ userId, clinicId, token });

        // console.log(response);

        // if (response.success) {
        //   setUserDetail(response.data);
        // } else {
        //   throw new Error(response.message);
        // }
        const { data } = await axios.get(
          `${process.env.REACT_APP_API_ENDPOINT}/user/${userId}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
              "User-ID": userId,
              "Clinic-ID": clinicId,
            },
          }
        );

        console.log(data);
      } catch (err) {
        const message =
          err instanceof Error ? err.message : "Silahkan coba lagi";

        // console.error(message);
      }
    },
    []
  );

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  });

  console.log(auth());

  useEffect(() => {
    if (auth()?.token && !hasAuth.current) {
      hasAuth.current = true;
      handleUserDetail(auth()?.userId, auth()?.clinicId, auth()?.token);
    }
  }, [auth, handleUserDetail]);

  return (
    <AppContext.Provider
      value={{
        isMobile,
        userDetail,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

const useAppContext = () => {
  return useContext(AppContext);
};

export default useAppContext;
