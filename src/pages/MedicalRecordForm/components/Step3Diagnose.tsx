import { Controller, useForm } from "react-hook-form";
import { useMemo, useState } from "react";
import { HiArrowDown } from "react-icons/hi";
import { FaTrashAlt } from "react-icons/fa";
import { Label, Select, Table } from "flowbite-react";
import Button from "components/Button";
import Card from "components/Card";
import ComboBox2 from "components/FormInput/ComboBox2";
import EmptyData from "components/EmptyData";
import IconButton from "components/IconButton";
import { useIcd10 } from "api/icd10";
import useToaster from "context/ToasterContext";
import { FormDiagnoseType } from "../interface";
import { DIAGNOSE_OPTION } from "../constants";
import normalizeIcd10Data from "helpers/normalizer/normalizeIcd10Data";

const FormDiagnosis = ({ show, defaultValues, navigation, onSubmit }) => {
  const toaster = useToaster();
  const [icdPage, setIcdPage] = useState(1);
  const [icdSearch, setIcdSearch] = useState("");
  const [diagnoses, setDiagnoses] = useState<FormDiagnoseType[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm<FormDiagnoseType>({ defaultValues });

  const { data, isFetching } = useIcd10();

  const submitDiagnose = (val: FormDiagnoseType) => {
    reset();
    setDiagnoses([...diagnoses, val]);
  };

  const submitForm = () => {
    if (diagnoses.length === 0) {
      toaster.open({
        title: "Diagnosis belum diisi",
        message: "Tambahkan minimal 1 diagnosis",
        variant: "error",
        autoClose: false,
      });
      // return;
    } else {
      onSubmit(diagnoses);
    }
  };

  const displayedIcdList = useMemo(() => {
    const icdList = normalizeIcd10Data(data?.data?.data?.icd10);
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
  }, [data?.data?.data?.icd10, icdPage, icdSearch]);

  if (!show) return null;

  return (
    <div>
      <div className="space-y-8 p-6">
        <form noValidate onSubmit={handleSubmit(submitDiagnose)}>
          <Card className="w-full space-y-4 rounded-md !bg-slate-100 p-4">
            <div>
              <Label htmlFor="icd_code" value="ICD-10" />
              <Controller
                control={control}
                name="icd_code"
                rules={{
                  required: {
                    value: true,
                    message: "Wajib diisi",
                  },
                }}
                render={({ field: { onChange, value } }) => (
                  <ComboBox2
                    loading={isFetching}
                    placeholder="Ketik nama atau pilih kode ICD-10"
                    options={displayedIcdList}
                    query={icdSearch}
                    value={value}
                    setQuery={setIcdSearch}
                    onChange={onChange}
                    color={Boolean(errors?.icd_code) ? "failure" : "gray"}
                    helperText={errors?.icd_code?.message}
                    onLoadMore={() => setIcdPage(icdPage + 1)}
                  />
                )}
              />
            </div>

            <div>
              <Label htmlFor="type" value="Diagnosis" />
              <Select
                required
                defaultValue=""
                color={Boolean(errors?.type) ? "failure" : "gray"}
                helperText={errors?.type?.message}
                {...register("type", {
                  required: {
                    value: true,
                    message: "Wajib diisi",
                  },
                })}
              >
                <option value="" disabled>
                  Pilih jenis diagnosis
                </option>
                {DIAGNOSE_OPTION.map((item) => (
                  <option key={item.key} value={item.key}>
                    {item.label}
                  </option>
                ))}
              </Select>
            </div>

            <div className="flex justify-end">
              <Button
                type="submit"
                color="secondary"
                className="flex items-center gap-2"
              >
                <HiArrowDown />
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
                    <Table.Cell>{item.icd_code.label}</Table.Cell>
                    <Table.Cell className=" w-[120px] md:w-[240px]">
                      {
                        DIAGNOSE_OPTION.find((i) => i.key === Number(item.type))
                          ?.label
                      }
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
      <form noValidate onSubmit={submitForm}>
        {navigation}
      </form>
    </div>
  );
};

export default FormDiagnosis;
