import { useMemo, useState } from "react";
import { Checkbox, Label, Select, Table, TextInput } from "flowbite-react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { FaTrashAlt } from "react-icons/fa";
import { useKfa } from "api/kfa";
import Button from "components/Button";
import Modal from "components/Modal";
import Typography from "components/Typography";
import ComboBox2 from "components/FormInput/ComboBox2";
import ButtonAddMore from "components/ButtonAddMore";
import IconButton from "components/IconButton";
import EmptyData from "components/EmptyData";
import Card from "components/Card";
import { FormPrescriptionType } from "../interface";
import { useDebounce } from "use-debounce";
import { OPTIONS_METHOD } from "../constants";
interface ModalNewPrescriptionProps {
  isCustomPrescription: boolean;
  open: boolean;
  onClose: () => void;
  onSubmit: (val: FormPrescriptionType) => void;
}

const ModalNewPrescription = ({
  isCustomPrescription,
  open,
  onClose,
  onSubmit,
}: ModalNewPrescriptionProps) => {
  const [searchQuery, setSearchQuery] = useState("");

  const {
    control,
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      medicines: [
        {
          item: "",
          quantity: "1",
          price: "0",
        },
      ],
      frequency_count: "3",
      frequency_unit: "",
      time: [],
      time_note: "",
      span: [],
      span_note: "",
      method: "2",
    },
  });

  const {
    fields: fieldsMedicines,
    append: appendMedicines,
    remove: removeMedicines,
  } = useFieldArray({
    control,
    name: "medicines",
  });

  const watchTime = watch("time");
  const watchSpan = watch("span");

  const showFreeTextTime = watchTime.includes("lain");
  const showFreeTextSpan = watchSpan.includes("lain");

  const [keyword] = useDebounce(searchQuery, 500);

  const { data: dataKfa, isFetching } = useKfa({ keyword: keyword });

  const itemOptions = useMemo(() => {
    if (!dataKfa?.data?.result) return [];

    return dataKfa?.data?.result?.map((item) => ({
      key: item.kfa_code,
      label: item.display_name,
    }));
  }, [dataKfa]);

  const submitForm = (val) => {
    onSubmit({
      ...val,
      type: isCustomPrescription ? "custom" : "normal",
    });
  };

  return (
    <Modal open={open} onClose={onClose} className="md:min-w-[700px]">
      <form
        noValidate
        className="px-8 py-8"
        onSubmit={handleSubmit(submitForm)}
      >
        <Typography as="h1" className="mb-4 text-2xl font-bold">
          {isCustomPrescription ? "Racikan Baru" : "Resep Baru"}
        </Typography>

        <div className="mb-6 grid grid-cols-12 items-end gap-6">
          <div className="col-span-12">
            <Card className="rounded-xl shadow-none">
              <Table className="shadow-none">
                <Table.Head className="divide-x">
                  <Table.HeadCell className="text-md items-start whitespace-nowrap bg-slate-100 uppercase text-slate-800 dark:text-white">
                    Nama Obat
                  </Table.HeadCell>
                  <Table.HeadCell className="text-md w-[120px] items-start whitespace-nowrap bg-slate-100 uppercase text-slate-800 dark:text-white">
                    Jumlah
                  </Table.HeadCell>
                  <Table.HeadCell className="text-md w-[120px] items-start whitespace-nowrap bg-slate-100 uppercase text-slate-800 dark:text-white">
                    Harga Total
                  </Table.HeadCell>
                  <Table.HeadCell className="text-md w-[32px] items-start whitespace-nowrap bg-slate-100 uppercase text-slate-800 dark:text-white" />
                </Table.Head>
                <Table.Body className="divide-y">
                  {fieldsMedicines.length === 0 && (
                    <Table.Row>
                      <Table.Cell colSpan={4}>
                        <EmptyData>Belum ada obat</EmptyData>
                      </Table.Cell>
                    </Table.Row>
                  )}
                  {fieldsMedicines.map((item, index) => (
                    <Table.Row
                      key={index}
                      className="bg-white hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800"
                    >
                      <Table.Cell>
                        <Controller
                          control={control}
                          name={`medicines.${index}.item`}
                          rules={{
                            required: {
                              value: true,
                              message: "Wajib diisi",
                            },
                          }}
                          render={({ field: { onChange, value } }) => (
                            <ComboBox2
                              loading={isFetching}
                              placeholder="Cari nama obat"
                              options={itemOptions}
                              query={searchQuery}
                              value={value}
                              setQuery={setSearchQuery}
                              onChange={onChange}
                              color={
                                Boolean(errors?.medicines) ? "failure" : "gray"
                              }
                              helperText={errors?.medicines?.message}
                            />
                          )}
                        />
                      </Table.Cell>
                      <Table.Cell className="w-[80px]">
                        <TextInput
                          type="number"
                          defaultValue={1}
                          {...register(`medicines.${index}.quantity`)}
                        />
                      </Table.Cell>
                      <Table.Cell className="w-[120px]">
                        <TextInput
                          type="number"
                          defaultValue={1}
                          step={1000}
                          {...register(`medicines.${index}.price`)}
                        />
                      </Table.Cell>
                      <Table.Cell className="w-[32px]">
                        {fieldsMedicines.length > 1 && (
                          <IconButton onClick={() => removeMedicines(index)}>
                            <FaTrashAlt className="cursor-pointer text-gray-500" />
                          </IconButton>
                        )}
                      </Table.Cell>
                    </Table.Row>
                  ))}
                  {isCustomPrescription && (
                    <Table.Row>
                      <Table.Cell colSpan={4}>
                        <ButtonAddMore
                          className="col-span-12 h-8 text-sm"
                          onClick={() =>
                            appendMedicines({
                              item: "",
                              quantity: "1",
                              price: "0",
                            })
                          }
                        >
                          Tambah Obat Lain
                        </ButtonAddMore>
                      </Table.Cell>
                    </Table.Row>
                  )}
                </Table.Body>
              </Table>
            </Card>
          </div>

          <div className="col-span-6">
            <Label htmlFor="frequency_count" value="Aturan Pakai" />
            <TextInput
              type="text"
              addon="kali"
              {...register("frequency_count")}
            />
          </div>
          <div className="col-span-6">
            <Label htmlFor="frequency_unit" value="" />
            <TextInput
              type="text"
              placeholder="Sehari, 3 tetes, dll"
              className="col-span-6"
              {...register("frequency_unit")}
            />
          </div>
        </div>
        <div className="grid grid-cols-12 items-start gap-6">
          <div className="col-span-12 flex flex-col gap-2 md:col-span-6">
            <Label value="Waktu"></Label>
            <div className="flex items-center gap-3">
              <Checkbox {...register("time")} value="pagi" />
              <Typography>Pagi</Typography>
            </div>
            <div className="flex items-center gap-3">
              <Checkbox {...register("time")} value="siang" />
              <Typography>Siang</Typography>
            </div>
            <div className="flex items-center gap-3">
              <Checkbox {...register("time")} value="sore" />
              <Typography>Sore</Typography>
            </div>
            <div className="flex items-center gap-3">
              <Checkbox {...register("time")} value="lain" />
              <Typography>Lain-lain</Typography>
            </div>
            {showFreeTextTime && (
              <div className="col-span-1">
                <TextInput
                  autoFocus={showFreeTextTime}
                  type="text"
                  placeholder="Ex: Ketika nyeri datang"
                  {...register("time_note")}
                />
              </div>
            )}
          </div>
          <div className="col-span-12 flex flex-col gap-2 md:col-span-6">
            <Label>Waktu Spesifik</Label>
            <div className="flex items-center gap-3">
              <Checkbox {...register("span")} value="sebelum makan" />
              <Typography>Sebelum makan</Typography>
            </div>
            <div className="flex items-center gap-3">
              <Checkbox {...register("span")} value="sesudah makan" />
              <Typography>Sesudah makan</Typography>
            </div>
            <div className="flex items-center gap-3">
              <Checkbox {...register("span")} value="bersamaan makan" />
              <Typography>Bersamaan makan</Typography>
            </div>
            <div className="flex items-center gap-3">
              <Checkbox {...register("span")} value="lain" />
              <Typography>Lain-lain</Typography>
            </div>
            {showFreeTextSpan && (
              <div className="col-span-1">
                <TextInput
                  autoFocus={showFreeTextSpan}
                  type="text"
                  placeholder="Ex: Sebelum tidur"
                  {...register("span_note")}
                />
              </div>
            )}
          </div>

          <div className="col-span-12">
            <Label htmlFor="method" value="Rute Pemberian" />
            <Select
              required
              color={Boolean(errors?.method) ? "failure" : "gray"}
              helperText={errors?.method?.message}
              {...register("method", {
                required: {
                  value: true,
                  message: "Wajib diisi",
                },
              })}
            >
              <option value="" disabled>
                Pilih rute pemberian obat
              </option>
              {OPTIONS_METHOD.map((item) => (
                <option key={item.key} value={item.key}>
                  {item.label}
                </option>
              ))}
            </Select>
          </div>
          <div className="col-span-12 mt-4 flex flex-col gap-2">
            <Button color="secondary" className="w-full" onClick={onClose}>
              Batal
            </Button>
            <Button type="submit" className="w-full">
              Tambahkan
            </Button>
          </div>
        </div>
      </form>
    </Modal>
  );
};

export default ModalNewPrescription;
