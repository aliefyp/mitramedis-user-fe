import Button from "components/Button";
import DataDisplay from "components/DataDisplay";
import Modal from "components/Modal";
import ModalBody from "components/ModalBody";
import ModalFooter from "components/ModalFooter";
import ModalHeader from "components/ModalHeader";
import Typography from "components/Typography";
import moment from "moment";
import { useMemo } from "react";
import { PatientType } from "types/patient";
import { OPTIONS_GENDER, OPTIONS_PAYMENT_METHOD } from "../constants";

interface ConfirmationModalProps {
  data: PatientType;
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
  const summaryData = useMemo(() => {
    if (!data) return [];

    return [
      {
        key: "Nama",
        value: `${namePrefix} ${data.patient_name}`,
      },
      {
        key: "NIK Ibu Kandung",
        value: data.id_card_number,
      },
      {
        key: "Jenis Kelamin",
        value: OPTIONS_GENDER.find((i) => i.key === data.gender).label,
      },
      {
        key: "Tanggal Lahir",
        value: moment(data.birthdate).format("dddd, DD MMMM YYYY"),
      },
      {
        key: "Jam Lahir",
        value: data.birth_time,
      },
      {
        key: "Metode Pembayaran",
        value: `${
          OPTIONS_PAYMENT_METHOD.find((i) => i.key === data.payment_method)
            .label
        } ${data.payment_method_other && `: ${data.payment_method_other}`}`,
      },
    ];
  }, [data, namePrefix]);

  return (
    <Modal open={open} onClose={onClose}>
      <ModalHeader>Konfirmasi</ModalHeader>
      <ModalBody>
        <Typography className="mb-4 !text-gray-600">
          Periksa kembali data yang sudah Anda input. Pastikan semua data sudah
          benar.
        </Typography>
        <DataDisplay items={summaryData} />
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
