import Button from "components/Button";
import DataDisplay, { DataDisplayItem } from "components/DataDisplay";
import Modal from "components/Modal";
import ModalBody from "components/ModalBody";
import ModalFooter from "components/ModalFooter";
import ModalHeader from "components/ModalHeader";
import Typography from "components/Typography";

interface ConfirmationModalProps {
  data: DataDisplayItem[];
  open: boolean;
  namePrefix: string;
  onClose: () => void;
  onContinue: () => void;
}

const ConfirmationModal = ({
  data,
  open,
  namePrefix,
  onClose,
  onContinue,
}: ConfirmationModalProps) => {
  return (
    <Modal open={open} onClose={onClose}>
      <ModalHeader>Konfirmasi</ModalHeader>
      <ModalBody>
        <Typography className="mb-4 !text-gray-600">
          Periksa kembali data yang sudah Anda input. Pastikan semua data sudah
          benar.
        </Typography>
        <DataDisplay items={data} />
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={onClose}>
          Kembali
        </Button>
        <Button color="primary" onClick={onContinue}>
          Simpan
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default ConfirmationModal;
