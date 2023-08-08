// import useUserDetail from "api/user/useUserDetail";
// import { useAuthUser } from "react-auth-kit";
import Button from "components/Button";
import Modal from "components/Modal";
import ModalBody from "components/ModalBody";
import ModalFooter from "components/ModalFooter";
import Typography from "components/Typography";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { FaCheck } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";

const MOBILE_BREAKPOINT = 640;

interface AppContextInterface {
  isMobile: boolean;
  // userDetail: UserType | null;
}

export const AppContext = createContext({} as AppContextInterface);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [modal, setModal] = useState({
    show: false,
    type: "success",
    title: "",
    message: "",
    cta: () => {},
    ctaText: "",
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

  useEffect(() => {
    const { state } = location;

    if (state?.modal) {
      switch (state.modal?.key) {
        case "new-patient":
          setModal({
            show: true,
            type: "success",
            title: "Berhasil",
            message: `Data pasien baru atas nama <b>${state.modal.data.patient_name}</b> berhasil disimpan. Tekan tombol di bawah untuk membuat pemeriksaan atas nama pasien ini.`,
            cta: () => navigate(`/rekam-medis/${state.modal.data.id}`),
            ctaText: "Pemeriksaan Baru",
          });
          break;
        default:
          break;
      }
    }
  }, [location, location.state, navigate]);

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
      <Modal
        open={modal.show}
        onClose={() => setModal({ ...modal, show: false })}
      >
        <ModalBody>
          <div className="space-y-4 px-4 py-6 text-center">
            {modal.type === "success" && (
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-mm-lime-200">
                <FaCheck className="text-3xl text-mm-lime-500" />
              </div>
            )}
            <Typography bold className=" text-2xl">
              {modal.title}
            </Typography>
            <div
              className="text-gray-700"
              dangerouslySetInnerHTML={{ __html: modal.message }}
            />
          </div>
        </ModalBody>
        <ModalFooter className="justify-center">
          <Button color="primary" onClick={modal.cta} className="w-full">
            {modal.ctaText || "Simpan"}
          </Button>
        </ModalFooter>
      </Modal>
    </AppContext.Provider>
  );
};

const useAppContext = () => {
  return useContext(AppContext);
};

export default useAppContext;
