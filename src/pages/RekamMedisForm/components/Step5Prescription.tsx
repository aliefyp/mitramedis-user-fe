import { useState } from "react";
import ModalNewPrescription from "./ModalNewPrescription";
import ButtonAddMore from "components/ButtonAddMore";
import Card from "components/Card";
import Typography from "components/Typography";
import { FaNotesMedical } from "react-icons/fa";
import Button from "components/Button";
import CardPrescription from "./CardPrescription";

interface PrescriptionType {
  medicine_name: string;
  qty: string;
  frequency_count: number;
  frequency_unit: string;
  time: string;
  time_note: string;
  span: string;
  span_note: string;
  method: string;
}

interface CustomPrescriptionType
  extends Omit<PrescriptionType, "medicine_name" | "qty"> {
  medicine_name: string[];
  qty: string[];
}

const FormPrescription = () => {
  const [showMedicineModal, setShowMedicineModal] = useState(false);
  const [medicines, setMedicines] = useState<PrescriptionType[]>([]);
  const [customMedicines, setCustomMedicines] = useState<
    CustomPrescriptionType[]
  >([]);

  const handleAddMedicine = (med) => {
    setShowMedicineModal(false);
    setMedicines([...medicines, med]);
  };

  return (
    <>
      <div className="py-6">
        <div className="space-y-4">
          {medicines.map((item, index) => (
            <CardPrescription />
          ))}
          {customMedicines.map((item, index) => (
            <CardPrescription />
          ))}
          <ButtonAddMore onClick={() => setShowMedicineModal(true)}>
            Tambah Obat
          </ButtonAddMore>
        </div>
      </div>

      <ModalNewPrescription
        open={showMedicineModal}
        onClose={() => setShowMedicineModal(false)}
        onSubmit={(med) => handleAddMedicine(med)}
      />
    </>
  );
};

export default FormPrescription;
