import { useForm } from "react-hook-form";
import { useMemo, useState } from "react";
import { FaTrashAlt } from "react-icons/fa";
import ComboBox from "components/FormInput/ComboBox";
import Button from "components/Button";
import { Table } from "flowbite-react";
import { HiPlus } from "react-icons/hi";
import EmptyData from "components/EmptyData";
import Card from "components/Card";
import IconButton from "components/IconButton";
import { FormDiagnoseType } from "../interface";
import useIcd10 from "api/medicalRecord/useIcd10";
// import { useAuthUser } from "react-auth-kit";
import { Icd10Response } from "types/icd10";

const DIAGNOSE_OPTION = [
  { key: 1, label: "Diagnosis Utama / Primer" },
  { key: 2, label: "Diagnosis Tambahan / Sekunder" },
];

const FormDiagnosis = ({ show, defaultValues, navigation, onSubmit }) => {
  // const auth = useAuthUser();
  const [icdPage, setIcdPage] = useState(1);
  const [icdSearch, setIcdSearch] = useState("");
  const [diagnoses, setDiagnoses] = useState<FormDiagnoseType[]>([]);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormDiagnoseType>({ defaultValues });

  const { data, isLoading } = useIcd10();

  const submitDiagnose = (val: FormDiagnoseType) => {
    setDiagnoses([...diagnoses, val]);
  };

  const submitForm = () => {
    onSubmit(diagnoses);
  };

  const icdList = useMemo(() => {
    if (!data) return [];

    const flattenIcd10 = (data as Icd10Response)?.data?.icd10
      ?.map((lv1) => {
        const { child: child1, ...lv1data } = lv1;
        return [
          lv1data,
          ...child1
            .map((lv2) => {
              const { child: child2, ...lv2data } = lv2;
              return [
                lv2data,
                ...child2
                  .map((lv3) => {
                    const { child: child3, ...lv3data } = lv3;
                    return [lv3data, ...child3];
                  })
                  .flat(),
              ];
            })
            .flat(),
        ];
      })
      .flat();

    return flattenIcd10?.map((item) => ({
      key: item.code,
      label: item.label,
    }));
  }, [data]);

  const displayedIcdList = useMemo(() => {
    if (!icdList?.length) return [];

    const copyIcd = [...icdList];
    const filtered =
      icdSearch === ""
        ? copyIcd
        : copyIcd.filter((val) =>
            val.label
              .toLowerCase()
              .replace(/\s+/g, "")
              .includes(icdSearch.toLowerCase().replace(/\s+/g, ""))
          );

    return filtered.splice(0, 10 * icdPage);
  }, [icdList, icdPage, icdSearch]);

  if (!show) return null;

  return (
    <div>
      <div className="space-y-8 p-6">
        <form onSubmit={handleSubmit(submitDiagnose)}>
          <Card className="w-full space-y-4 rounded-md !bg-slate-100 p-4">
            <ComboBox
              placeholder="Ketik nama atau pilih kode ICD-10"
              label="ICD-10"
              options={displayedIcdList}
              error={Boolean(errors?.icd_code)}
              helper={errors?.icd_code?.message}
              loading={isLoading}
              onValueChange={(val) => setValue("icd_code", val.label)}
              onSearch={(query) => setIcdSearch(query)}
              onLoadMore={() => setIcdPage(icdPage + 1)}
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
              options={DIAGNOSE_OPTION}
              error={Boolean(errors?.type)}
              helper={errors?.type?.message}
              onValueChange={(val) => setValue("type", val.label)}
              {...register("type", {
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

        <Card className="min-w-lg overflow-auto rounded-xl border">
          <Table className="w-full">
            <Table.Head className="divide-x">
              <Table.HeadCell className="text-md items-start whitespace-nowrap bg-slate-100 uppercase text-slate-800 dark:text-white">
                ICD-10
              </Table.HeadCell>
              <Table.HeadCell className="text-md w-[120px] items-start whitespace-nowrap bg-slate-100 uppercase text-slate-800 dark:text-white md:w-[240px]">
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
                  const aNoteKey = DIAGNOSE_OPTION.find(
                    (i) => i.label === a.type
                  )?.key;
                  const bNoteKey = DIAGNOSE_OPTION.find(
                    (i) => i.label === b.type
                  )?.key;

                  return aNoteKey - bNoteKey;
                })
                .map((item, index) => (
                  <Table.Row
                    key={index}
                    className="bg-white hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800"
                  >
                    <Table.Cell>{item.icd_code}</Table.Cell>
                    <Table.Cell className=" w-[120px] md:w-[240px]">
                      {item.type}
                    </Table.Cell>
                    <Table.Cell className="w-[64px]">
                      <IconButton
                        onClick={() =>
                          setDiagnoses(diagnoses.filter((_, i) => i !== index))
                        }
                      >
                        <FaTrashAlt className="cursor-pointer text-gray-500" />
                      </IconButton>
                    </Table.Cell>
                  </Table.Row>
                ))}
            </Table.Body>
          </Table>
        </Card>
      </div>
      <form onSubmit={submitForm}>{navigation}</form>
    </div>
  );
};

export default FormDiagnosis;
