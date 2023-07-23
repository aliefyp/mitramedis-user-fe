import { useState } from "react";
import FormSection from "components/FormSection";
import ModalNewPrescription from "./ModalNewPrescription";
import CardPrescription from "./CardPrescription";

export interface PrescriptionType {
  medicine_name: string[];
  qty: string[];
  frequency_count: number;
  frequency_unit: string;
  time: string[];
  time_note: string;
  span: string[];
  span_note: string;
  method: string;
}

const FormPrescription = () => {
  const [showPrescriptionModal, setShowPrescriptionModal] = useState(false);
  const [showCustomPrescription, setShowCustomPrescription] = useState(false);
  const [medicines, setMedicines] = useState<PrescriptionType[]>([]);
  const [customMedicines, setCustomMedicines] = useState<PrescriptionType[]>(
    []
  );

  const handleAddMedicine = (med) => {
    setShowPrescriptionModal(false);

    if (showCustomPrescription) {
      setCustomMedicines([...customMedicines, med]);
    } else {
      setMedicines([...medicines, med]);
    }
  };

  const handleDeleteMedicine = (isCustom: boolean, index: number) => {
    if (isCustom) {
      setCustomMedicines(customMedicines.filter((_, i) => i !== index));
    } else {
      setMedicines(medicines.filter((_, i) => i !== index));
    }
  };

  const handleAddMoreClick = (isCustom: boolean) => {
    setShowCustomPrescription(isCustom);
    setShowPrescriptionModal(true);
  };

  return (
    <>
      <div>
        <FormSection title="Obat Non-Racikan" className="space-y-4">
          <CardPrescription
            items={medicines}
            buttonWording="Tambah Obat"
            onAdd={() => handleAddMoreClick(false)}
            onDelete={(index) => handleDeleteMedicine(false, index)}
          />
        </FormSection>
        <FormSection title="Obat Racikan" className="space-y-4">
          <CardPrescription
            items={customMedicines}
            buttonWording="Tambah Obat Racikan"
            onAdd={() => handleAddMoreClick(true)}
            onDelete={(index) => handleDeleteMedicine(true, index)}
          />
        </FormSection>
      </div>

      <ModalNewPrescription
        isCustomPrescription={showCustomPrescription}
        open={showPrescriptionModal}
        onClose={() => setShowPrescriptionModal(false)}
        onSubmit={(med) => handleAddMedicine(med)}
      />
    </>
  );
};

export default FormPrescription;
