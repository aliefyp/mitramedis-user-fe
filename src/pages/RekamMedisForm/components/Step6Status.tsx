import Card from "components/Card";
import Typography from "components/Typography";
import { useState } from "react";
import {
  FaHome,
  FaClinicMedical,
  FaHospital,
  FaSkullCrossbones,
} from "react-icons/fa";

// import { FormStatusType } from "../interface";

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

const Step6Status = ({ show, navigation, defaultValues, onSubmit }) => {
  const [selected, setSelected] = useState(defaultValues || OPTIONS[0].label);

  const submitForm = () => {
    onSubmit(selected);
  };

  if (!show) return null;

  return (
    <>
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
      </div>
      <form onSubmit={submitForm}>{navigation}</form>
    </>
  );
};

export default Step6Status;
