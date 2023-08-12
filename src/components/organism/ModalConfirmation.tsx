import clsx from "clsx";
import Button from "components/Button";
import Modal from "components/Modal";
import ModalBody from "components/ModalBody";
import ModalFooter from "components/ModalFooter";
import Typography from "components/Typography";
import { FaCheck, FaExclamation, FaInfo, FaTimes } from "react-icons/fa";

export interface ModalConfirmationProps {
  open: boolean;
  type?: "success" | "error" | "warning" | "info";
  title?: string;
  message?: string;
  primaryAction?: string;
  secondaryAction?: string;
  onPrimaryActionClick?: () => void;
  onSecondaryActionClick?: () => void;
  onClose: () => void;
}

const mapBgIcon = {
  success: "bg-lime-500",
  error: "bg-red-500",
  warning: "bg-yellow-300",
  info: "bg-sky-500",
};

const mapIcon = {
  success: <FaCheck className="mx-auto h-10 w-10 text-white" />,
  error: <FaTimes className="mx-auto  h-10 w-10 text-white" />,
  warning: <FaExclamation className="mx-auto  h-10 w-10 text-white" />,
  info: <FaInfo className="mx-auto  h-10 w-10 text-white" />,
};

const ModalConfirmation = ({
  message,
  open,
  title,
  type = "info",
  primaryAction,
  secondaryAction,
  onPrimaryActionClick,
  onSecondaryActionClick,
  onClose,
}: ModalConfirmationProps) => {
  return (
    <Modal open={open} onClose={onClose} showCloseButton={false}>
      <ModalBody>
        <div className="space-y-4 px-4 py-6 text-center">
          <div className="relative -mt-20 inline-block">
            <div
              className={clsx(
                "absolute bottom-0 left-0 right-0 top-0 scale-125 rounded-full p-1 opacity-50",
                mapBgIcon[type]
              )}
            />
            <div className={clsx(mapBgIcon[type], "relative rounded-full p-4")}>
              {mapIcon[type]}
            </div>
          </div>
          {Boolean(title) && (
            <Typography bold className=" text-2xl">
              {title}
            </Typography>
          )}
          {Boolean(message) && (
            <div
              className="text-gray-700"
              dangerouslySetInnerHTML={{ __html: message }}
            />
          )}
        </div>
      </ModalBody>
      {Boolean(primaryAction || secondaryAction) && (
        <ModalFooter className="grid-cols-2 justify-center">
          {Boolean(secondaryAction) && (
            <Button
              color="secondary"
              onClick={onSecondaryActionClick}
              className={clsx(
                primaryAction ? "col-span-1" : "col-span-2",
                "w-full"
              )}
            >
              {secondaryAction}
            </Button>
          )}
          {Boolean(primaryAction) && (
            <Button
              color="primary"
              onClick={onPrimaryActionClick}
              className={clsx(
                primaryAction ? "col-span-1" : "col-span-2",
                "w-full"
              )}
            >
              {primaryAction}
            </Button>
          )}
        </ModalFooter>
      )}
    </Modal>
  );
};

export default ModalConfirmation;
