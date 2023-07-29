import { useState } from "react";
import FormSection from "components/FormSection";
import ModalNewPrescription from "./ModalNewPrescription";
import CardPrescription from "./CardPrescription";
import { FormPrescriptionType } from "../interface";

const Step5Prescription = ({ show, defaultValues, navigation, onSubmit }) => {
  const [showPrescriptionModal, setShowPrescriptionModal] = useState(false);
  const [showCustomPrescription, setShowCustomPrescription] = useState(false);
  const [medicines, setMedicines] = useState<FormPrescriptionType[]>([]);
  const [custMedicines, setCustMedicines] = useState<FormPrescriptionType[]>(
    []
  );

  const handleAddMedicine = (med) => {
    setShowPrescriptionModal(false);

    if (showCustomPrescription) {
      setCustMedicines([...custMedicines, med]);
    } else {
      setMedicines([...medicines, med]);
    }
  };

  const handleDeleteMedicine = (isCustom: boolean, index: number) => {
    if (isCustom) {
      setCustMedicines(custMedicines.filter((_, i) => i !== index));
    } else {
      setMedicines(medicines.filter((_, i) => i !== index));
    }
  };

  const handleAddMoreClick = (isCustom: boolean) => {
    setShowCustomPrescription(isCustom);
    setShowPrescriptionModal(true);
  };

  const handleSubmit = () => {
    console.log("medicines", medicines);
    console.log("custMedicines", custMedicines);
  };

  if (!show) return null;

  return (
    <>
      <div className="px-6">
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
            items={custMedicines}
            buttonWording="Tambah Obat Racikan"
            onAdd={() => handleAddMoreClick(true)}
            onDelete={(index) => handleDeleteMedicine(true, index)}
          />
        </FormSection>
      </div>
      <form onSubmit={handleSubmit}>{navigation}</form>

      <ModalNewPrescription
        isCustomPrescription={showCustomPrescription}
        open={showPrescriptionModal}
        onClose={() => setShowPrescriptionModal(false)}
        onSubmit={(med) => handleAddMedicine(med)}
      />
    </>
  );
};

export default Step5Prescription;
