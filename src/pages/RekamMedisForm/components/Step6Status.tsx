import Card from "components/Card";
import FormSection from "components/FormSection";
import Typography from "components/Typography";
import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  FaHome,
  FaClinicMedical,
  FaHospital,
  FaSkullCrossbones,
} from "react-icons/fa";

import { FormStatusType } from "../interface";

const OPTIONS = [
  { key: 1, icon: FaHome, label: "Pulang" },
  {
    key: 2,
    icon: FaClinicMedical,
    label: "Rujuk Rawat Jalan",
  },
  {
    key: 3,
    icon: FaHospital,
    label: "Rujuk Rawat Inap",
  },
  {
    key: 1,
    icon: FaSkullCrossbones,
    label: "Meninggal",
  },
];

const Step6Status = ({ show, defaultValues, navigation, onSubmit }) => {
  const [selected, setSelected] = useState(OPTIONS[0].label);
  const { register, handleSubmit } = useForm<FormStatusType>({ defaultValues });

  const submitForm = (val: FormStatusType) => {
    onSubmit(val);
  };

  if (!show) return null;

  return (
    <form onSubmit={handleSubmit(submitForm)}>
      <div className="grid grid-cols-2 gap-4 p-6 md:grid-cols-4">
        {OPTIONS.map((item) => {
          const isSelected = item.label === selected;

          return (
            <Card
              className={`group flex cursor-pointer flex-col items-center justify-center gap-4 rounded-lg border-2 p-4 hover:bg-slate-50 ${
                isSelected && "border-sky-500"
              }`}
              onClick={() => setSelected(item.label)}
            >
              <item.icon
                className={`text-3xl text-slate-400 transition-all group-hover:-translate-y-1 ${
                  isSelected && "text-slate-700"
                }`}
              />
              <Typography small>{item.label}</Typography>
            </Card>
          );
        })}
        {/* <ComboBox
              required
              label="Status Pasien"
              placeholder="Pilih Status Pasien"
              options={[
                { key: 1, label: "Pulang" },
                { key: 2, label: "Rujuk Rawat Jalan" },
                { key: 3, label: "Rujuk Rawat Inap" },
                { key: 1, label: "Meninggal" },
              ]}
              className="col-span-4 md:col-span-2"
              {...register("status", {
                required: {
                  value: true,
                  message: "Wajib diisi",
                },
              })}
            /> */}
      </div>
      {navigation}
    </form>
  );
};

export default Step6Status;
