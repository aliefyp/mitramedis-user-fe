import { useForm } from "react-hook-form";
import { useState } from "react";
import Select from "components/Select";
import { FaPlus, FaTrashAlt } from "react-icons/fa";
import Typography from "components/Typography";
import Card from "components/Card";

interface FormDiagnosisType {
  icd_code: string;
  note: string;
}

const DEFAULT_DIAGNOSE_ITEM = {
  icd_code: "",
  note: "",
};

const FormDiagnosis = () => {
  const [diagnoses, setDiagnoses] = useState<FormDiagnosisType[]>([
    DEFAULT_DIAGNOSE_ITEM,
  ]);
  const { register, handleSubmit } = useForm<FormDiagnosisType>();

  const onSubmit = (val: FormDiagnosisType) => {
    console.log(val);
  };

  return (
    <form
      className="grid grid-cols-3 space-y-4"
      onSubmit={handleSubmit(onSubmit)}
    >
      {diagnoses.map((item, index) => (
        <Card
          key={index}
          className="col-span-3 gap-6 space-y-4 border p-4 shadow-lg 2xl:col-span-2"
        >
          <div className="flex w-full items-center justify-between">
            <Typography bold as="h4">
              {`Diagnosis ${index + 1}`}
            </Typography>
            <FaTrashAlt
              className="font-xl shrink-0 cursor-pointer text-gray-500 hover:text-gray-400"
              onClick={() =>
                setDiagnoses(diagnoses.filter((_, i) => i !== index))
              }
            />
          </div>
          <Select
            id="icd_code"
            placeholder="Ketik nama atau pilih kode ICD-10"
            label="ICD-10"
            items={[
              "A00 - Cholera",
              "A01 - Typhoid and paratyphoid fevers",
              "A02 - Other salmonella infections",
            ]}
            className="col-span-2 md:col-span-2"
            {...register("icd_code")}
          />
          <Select
            id="note"
            placeholder="Pilih jenis Diagnosis"
            label="Diagnosis"
            items={[
              "Diagnosis Awal",
              "Diagnosis Utama / Primer",
              "Diagnosis Tambahan / Sekunder",
            ]}
            className="col-span-2 md:col-span-2"
            {...register("note")}
          />
        </Card>
      ))}
      <div
        className="col-span-2 col-start-1 flex h-[48px] cursor-pointer items-center justify-center gap-4 rounded-2xl border-2 border-dashed"
        onClick={() => setDiagnoses([...diagnoses, DEFAULT_DIAGNOSE_ITEM])}
      >
        <FaPlus className="text-gray-700" />
        <Typography bold className="text-gray-700">
          Tambah Diagnosa
        </Typography>
      </div>
    </form>
  );
};

export default FormDiagnosis;
