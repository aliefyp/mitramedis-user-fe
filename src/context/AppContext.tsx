// import useUserDetail from "api/user/useUserDetail";
// import { useAuthUser } from "react-auth-kit";
import { useLocation, useNavigate } from "react-router-dom";
import ModalConfirmation, {
  ModalConfirmationProps,
} from "components/organism/ModalConfirmation";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";

const MOBILE_BREAKPOINT = 640;

interface AppContextInterface {
  isMobile: boolean;
  // userDetail: UserType | null;
}

export const AppContext = createContext({} as AppContextInterface);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [modal, setModal] = useState<Omit<ModalConfirmationProps, "onClose">>({
    open: false,
    type: "success",
    title: "",
    message: "",
  });
  const [isMobile, setIsMobile] = useState(
    window.innerWidth <= MOBILE_BREAKPOINT
  );
  const location = useLocation();
  const navigate = useNavigate();

  // const auth = useAuthUser();
  // const {
  //   data: userDetail,
  //   isLoading,
  //   isError,
  // } = useUserDetail({ userId: auth()?.userId });

  // console.log(userDetail);
  // console.log(isLoading);
  // console.log(isError);

  const handleResize = () => {
    setIsMobile(window.innerWidth <= MOBILE_BREAKPOINT);
  };

  const handleCloseModal = useCallback(() => {
    setModal({ ...modal, open: false });
  }, [modal]);

  useEffect(() => {
    const { state } = location;

    if (state?.modal) {
      switch (state.modal?.key) {
        case "new-patient":
          setModal({
            open: true,
            type: "success",
            title: "Berhasil",
            message: `Data pasien baru atas nama <b>${state.modal.data.patient_name}</b> berhasil disimpan. Tekan tombol di bawah untuk membuat pemeriksaan atas nama pasien ini.`,
            primaryAction: "Rekam Medis Baru",
            onPrimaryActionClick: () =>
              navigate(`/rekam-medis/${state.modal.data.patient_id}`),
          });
          break;

        case "edit-patient":
          setModal({
            open: true,
            type: "success",
            title: "Berhasil",
            message: `Data pasien atas nama <b>${state.modal.data.patient_name}</b> berhasil disimpan.`,
            primaryAction: "Tutup",
            onPrimaryActionClick: () => navigate(`/pasien`),
          });
          break;
        default:
          break;
      }
    }

    window.history.replaceState({}, document.title);
  }, [handleCloseModal, location, location.state, modal, navigate]);

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
      <ModalConfirmation {...modal} onClose={handleCloseModal} />
    </AppContext.Provider>
  );
};

const useAppContext = () => {
  return useContext(AppContext);
};

export default useAppContext;
