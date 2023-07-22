import { useForm } from "react-hook-form";
import { useState } from "react";
import { FaTrashAlt } from "react-icons/fa";
import ComboBox from "components/FormInput/ComboBox";
import Button from "components/Button";
import { Table } from "flowbite-react";
import { HiPlus } from "react-icons/hi";
import EmptyData from "components/EmptyData";
import Card from "components/Card";

const icdOptions = [
  { key: 1, label: "A00 - Cholera" },
  { key: 2, label: "A01 - Typhoid and paratyphoid fevers" },
  { key: 3, label: "A02 - Other salmonella infections" },
];

const diagnoseOptions = [
  { key: 1, label: "Diagnosis Utama / Primer" },
  { key: 2, label: "Diagnosis Tambahan / Sekunder" },
];

interface FormDiagnosisType {
  icd_code: string;
  note: string;
}

const FormDiagnosis = () => {
  const [diagnoses, setDiagnoses] = useState<FormDiagnosisType[]>([]);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormDiagnosisType>();

  const onSubmit = (val: FormDiagnosisType) => {
    setDiagnoses([...diagnoses, val]);
  };

  return (
    <div className="space-y-8 py-6">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Card className="w-full space-y-4 rounded-md !bg-slate-100 p-4">
          <ComboBox
            placeholder="Ketik nama atau pilih kode ICD-10"
            label="ICD-10"
            options={icdOptions}
            error={Boolean(errors?.icd_code)}
            helper={errors?.icd_code?.message}
            onValueChange={(val) => setValue("icd_code", val.label)}
            {...register("icd_code", {
              required: {
                value: true,
                message: "Wajib diisi",
              },
            })}
          />
          <ComboBox
            placeholder="Pilih jenis Diagnosis"
            label="Diagnosis"
            options={diagnoseOptions}
            error={Boolean(errors?.note)}
            helper={errors?.note?.message}
            onValueChange={(val) => setValue("note", val.label)}
            {...register("note", {
              required: {
                value: true,
                message: "Wajib diisi",
              },
            })}
          />
          <div className="flex justify-end">
            <Button color="secondary" className="flex items-center gap-2">
              <HiPlus />
              Tambahkan
            </Button>
          </div>
        </Card>
      </form>
      <Card className="min-w-lg overflow-hidden rounded-xl border">
        <Table className="w-full">
          <Table.Head className="divide-x">
            <Table.HeadCell className="text-md items-start whitespace-nowrap bg-slate-100 uppercase text-slate-800 dark:text-white">
              ICD-10
            </Table.HeadCell>
            <Table.HeadCell className="text-md w-[240px] items-start whitespace-nowrap bg-slate-100 uppercase text-slate-800 dark:text-white">
              Jenis Diagnosis
            </Table.HeadCell>
            <Table.HeadCell className="text-md w-[64px] items-start whitespace-nowrap bg-slate-100 uppercase text-slate-800 dark:text-white" />
          </Table.Head>
          <Table.Body className="divide-y">
            {diagnoses.length === 0 && (
              <Table.Row>
                <Table.Cell colSpan={3}>
                  <EmptyData>Belum ada diagnosis</EmptyData>
                </Table.Cell>
              </Table.Row>
            )}
            {diagnoses
              .sort((a, b) => {
                const aNoteKey = diagnoseOptions.find(
                  (i) => i.label === a.note
                )?.key;
                const bNoteKey = diagnoseOptions.find(
                  (i) => i.label === b.note
                )?.key;

                return aNoteKey - bNoteKey;
              })
              .map((item, index) => (
                <Table.Row
                  key={index}
                  className="bg-white hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800"
                >
                  <Table.Cell>{item.icd_code}</Table.Cell>
                  <Table.Cell className="w-[240px]">{item.note}</Table.Cell>
                  <Table.Cell className="w-[64px]">
                    <FaTrashAlt
                      className="cursor-pointer text-gray-500"
                      onClick={() =>
                        setDiagnoses(diagnoses.filter((_, i) => i !== index))
                      }
                    />
                  </Table.Cell>
                </Table.Row>
              ))}
          </Table.Body>
        </Table>
      </Card>
    </div>
  );
};

export default FormDiagnosis;
