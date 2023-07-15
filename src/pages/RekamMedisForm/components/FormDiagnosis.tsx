import { useForm } from "react-hook-form";
import { useState } from "react";
import { FaTrashAlt } from "react-icons/fa";
import Typography from "components/Typography";
import Card from "components/Card";
import ButtonAddMore from "components/ButtonAddMore";
import ComboBox from "components/FormInput/ComboBox";

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
    <form className="space-y-4 py-6" onSubmit={handleSubmit(onSubmit)}>
      {diagnoses.map((item, index) => (
        <Card key={index} className="gap-6 space-y-4 border p-4 shadow-lg">
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
          <ComboBox
            placeholder="Ketik nama atau pilih kode ICD-10"
            label="ICD-10"
            options={[
              { key: 1, label: "A00 - Cholera" },
              { key: 2, label: "A01 - Typhoid and paratyphoid fevers" },
              { key: 3, label: "A02 - Other salmonella infections" },
            ]}
            {...register("icd_code")}
          />
          <ComboBox
            placeholder="Pilih jenis Diagnosis"
            label="Diagnosis"
            options={[
              { key: 1, label: "Diagnosis Awal" },
              { key: 2, label: "Diagnosis Utama / Primer" },
              { key: 3, label: "Diagnosis Tambahan / Sekunder" },
            ]}
            {...register("note")}
          />
        </Card>
      ))}
      {diagnoses.length === 0 && (
        <Typography small className="w-full text-center !text-gray-500">
          Belum ada diagnosis
        </Typography>
      )}
      <div>
        <ButtonAddMore
          onClick={() => setDiagnoses([...diagnoses, DEFAULT_DIAGNOSE_ITEM])}
        >
          Tambah Diagnosis
        </ButtonAddMore>
      </div>
    </form>
  );
};

export default FormDiagnosis;
