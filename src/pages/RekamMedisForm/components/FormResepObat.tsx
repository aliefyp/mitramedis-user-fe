import { useForm } from "react-hook-form";
import { useState } from "react";
// import Select from "components/Select";
import { FaPlus } from "react-icons/fa";
import Typography from "components/Typography";
// import Card from "components/Card";
import SearchMedicine from "./SearchMedicine";

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
        <div
          className="col-span-3 col-start-1 flex h-[48px] cursor-pointer items-center justify-center gap-4 rounded-2xl border-2 border-dashed 2xl:col-span-2"
          onClick={() => setShowMedicineModal(true)}
        >
          <FaPlus className="text-gray-700" />
          <Typography bold className="text-gray-700">
            Tambah Obat
          </Typography>
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
