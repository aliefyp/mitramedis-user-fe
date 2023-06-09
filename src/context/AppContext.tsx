// import useUserDetail from "hooks/user/useUserDetail";
// import { useAuthUser } from "react-auth-kit";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

const MOBILE_BREAKPOINT = 640;

interface AppContextInterface {
  isMobile: boolean;
  // userDetail: UserType | null;
}

export const AppContext = createContext({} as AppContextInterface);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [isMobile, setIsMobile] = useState(
    window.innerWidth <= MOBILE_BREAKPOINT
  );

  // const auth = useAuthUser();
  // const {
  //   data: userDetail,
  //   isLoading,
  //   isError,
  // } = useUserDetail({
  //   userId: auth()?.userId,
  //   clinicId: auth()?.clinicId,
  //   token: auth()?.token,
  // });

  // console.log(userDetail);
  // console.log(isLoading);
  // console.log(isError);

  const handleResize = () => {
    setIsMobile(window.innerWidth <= MOBILE_BREAKPOINT);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  });

  return (
    <AppContext.Provider
      value={{
        isMobile,
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
