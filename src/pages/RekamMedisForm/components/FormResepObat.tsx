import { useForm } from "react-hook-form";
import { useState } from "react";
// import Select from "components/Select";
// import Card from "components/Card";
import SearchMedicine from "./SearchMedicine";
import ButtonAddMore from "components/ButtonAddMore";

interface FormResepObatType {
  medicine_name: string;
  type: string;
  unit: string;
  qty: string;
  direction_count: number;
  direction_unit: string;
  time: string;
  method: string;
}

const DEFAULT_DIAGNOSE_ITEM = {
  medicine_name: "",
  type: "",
  unit: "mg",
  qty: "",
  direction_count: 1,
  direction_unit: "",
  time: "",
  method: "",
};

const FormResepObat = () => {
  const [showMedicineModal, setShowMedicineModal] = useState(false);
  const [medicines, setMedicines] = useState<FormResepObatType[]>([
    DEFAULT_DIAGNOSE_ITEM,
  ]);
  const { register, handleSubmit } = useForm<FormResepObatType>();

  console.log(register);

  const handleAddMedicine = (med) => {
    setShowMedicineModal(false);
    setMedicines([
      ...medicines,
      {
        ...DEFAULT_DIAGNOSE_ITEM,
        medicine_name: med.name,
      },
    ]);
  };

  const onSubmit = (val: FormResepObatType) => {
    console.log(val);
  };

  return (
    <>
      <form
        className="grid grid-cols-3 space-y-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="col-span-3 col-start-1">
          <ButtonAddMore onClick={() => setShowMedicineModal(true)}>
            Tambah Obat
          </ButtonAddMore>
        </div>
      </form>

      <SearchMedicine
        open={showMedicineModal}
        onClose={() => setShowMedicineModal(false)}
        onSubmit={(med) => handleAddMedicine(med)}
      />
    </>
  );
};

export default FormResepObat;
