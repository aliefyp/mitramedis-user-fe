import Button from "components/Button";
import DataDisplay from "components/DataDisplay";
import Modal from "components/Modal";
import ModalBody from "components/ModalBody";
import ModalFooter from "components/ModalFooter";
import ModalHeader from "components/ModalHeader";
import Typography from "components/Typography";
import { AllFormType } from "../interface";

interface ConfirmationModalProps {
  data: AllFormType;
  open: boolean;
  onClose: () => void;
  onContinue: () => void;
}

const ConfirmationModal = ({
  data,
  open,
  onClose,
  onContinue,
}: ConfirmationModalProps) => {
  const dataStep1 = data[1];
  const dataStep2 = data[2];
  // const dataStep3 = data[3];
  // const dataStep4 = data[4];
  // const dataStep5 = data[5];
  // const dataStep6 = data[6];

  const physicalNoteStep2 = Object.keys(dataStep2).filter((item) =>
    item.startsWith("note_")
  );

  const displayStep1 = [
    {
      key: "Keluhan Utama",
      value: dataStep1.main_complaint,
    },
    {
      key: "Riwayat Penyakit Sekarang",
      value: dataStep1.medical_history_recent,
    },
    {
      key: "Riwayat Penyakit Terdahulu",
      value: dataStep1.medical_history_past,
    },
    {
      key: "Riwayat Alergi",
      value: dataStep1.note_allergy_history,
    },
    {
      key: "Riwayat Pengobatan",
      value: dataStep1.note_medical_treatment_history,
    },
  ].filter((item) => Boolean(item.value));

  const displayStep2 = [
    {
      key: "Tingkat Kesadaran",
      value: dataStep2.senses_level,
    },
    {
      key: "Status Psikologi",
      value: dataStep2.psychological_state,
    },
    {
      key: "Tinggi Badan",
      value: `${dataStep2.height} cm`,
    },
    {
      key: "Berat Badan",
      value: `${dataStep2.weight} kg`,
    },
    {
      key: "BMI",
      value: dataStep2.bmi,
    },
    {
      key: "Sistole",
      value: `${dataStep2.blood_pressure_sistole} mmHg`,
    },
    {
      key: "Diastole",
      value: `${dataStep2.blood_pressure_diastole} mmHg`,
    },
    {
      key: "SPO2",
      value: `${dataStep2.spo2} %`,
    },
    {
      key: "Suhu Tubuh",
      value: `${dataStep2.temperature} °C`,
    },
    {
      key: "Denyut Nadi",
      value: `${dataStep2.pulse_rate} /menit`,
    },
    {
      key: "Pernafasan",
      value: `${dataStep2.respiration_rate} /menit`,
    },
    {
      key: "Catatan Kondisi Tubuh",
      value: physicalNoteStep2.map((item) => dataStep2[item]).join("\n"),
    },
  ].filter((item) => Boolean(item.value));

  return (
    <Modal open={open} onClose={onClose} className="md:min-w-[700px]">
      <ModalHeader>Konfirmasi</ModalHeader>
      <ModalBody className="max-h-[70%] overflow-auto">
        <Typography className="mb-4 !text-gray-600">
          Periksa kembali data yang sudah Anda input. Pastikan semua data sudah
          benar.
        </Typography>
        <div className="space-y-6">
          <div className="space-y-2">
            <Typography bold>Anamnesis</Typography>
            <DataDisplay items={displayStep1} />
          </div>
          <div className="space-y-2">
            <Typography bold>Pemeriksaan Fisik</Typography>
            <DataDisplay items={displayStep2} />
          </div>
        </div>
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
