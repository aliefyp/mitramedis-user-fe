import { useForm } from "react-hook-form";
import Button from "components/Button";
import Input from "components/FormInput/Input";
import Modal from "components/Modal";
import Typography from "components/Typography";
import ComboBox from "components/FormInput/ComboBox";
import CheckBox from "components/FormInput/CheckBox";
import Label from "components/FormInput/Label";
import { useEffect, useState } from "react";
import ButtonAddMore from "components/ButtonAddMore";
import { Table } from "flowbite-react";
import IconButton from "components/IconButton";
import { FaTrashAlt } from "react-icons/fa";
import EmptyData from "components/EmptyData";
import Card from "components/Card";
import { FormPrescriptionType } from "../interface";

interface ModalNewPrescriptionProps {
  isCustomPrescription: boolean;
  open: boolean;
  onClose: () => void;
  onSubmit: (val: FormPrescriptionType) => void;
}

const DUMMY_MEDICINES = [
  { key: 1, label: "Paracetamol" },
  { key: 2, label: "Sunmol" },
  { key: 3, label: "OBH Combi" },
];

const ModalNewPrescription = ({
  isCustomPrescription,
  open,
  onClose,
  onSubmit,
}: ModalNewPrescriptionProps) => {
  const [medicines, setMedicines] = useState([{ name: "", quantity: 1 }]);
  const [showFreeTextTime, setShowFreeTextTime] = useState(false);
  const [showFreeTextSpan, setShowFreeTextSpan] = useState(false);
  const { register, handleSubmit, watch, setValue } = useForm({
    defaultValues: {
      frequency_count: "3",
      frequency_unit: "",
      time: [],
      time_note: "",
      span: [],
      span_note: "",
      method: "",
    },
  });

  const watchTime = watch("time");
  const watchSpan = watch("span");

  const handleMedicineNameChange = (index, name) => {
    setMedicines(
      medicines.map((item, i) => {
        if (i !== index) return item;
        return { ...item, name };
      })
    );
  };

  const handleMedicineQtyChange = (index, quantity) => {
    setMedicines(
      medicines.map((item, i) => {
        if (i !== index) return item;
        return { ...item, quantity };
      })
    );
  };

  const handleAddMedicine = () => {
    setMedicines([...medicines, { name: "", quantity: 1 }]);
  };

  const handleDeleteMedicine = (index) => {
    setMedicines(medicines.filter((_, i) => i !== index));
  };

  const submitForm = (val) => {
    onSubmit({
      ...val,
      medicines,
      type: isCustomPrescription ? "custom" : "normal",
    });
  };

  useEffect(() => {
    setShowFreeTextTime(watchTime.includes("lain"));
  }, [watchTime]);

  useEffect(() => {
    setShowFreeTextSpan(watchSpan.includes("lain"));
  }, [watchSpan]);

  return (
    <Modal open={open} onClose={onClose} className="md:min-w-[700px]">
      <form className="px-8 py-8" onSubmit={handleSubmit(submitForm)}>
        <Typography as="h1" className="mb-4 text-2xl font-bold">
          {isCustomPrescription ? "Racikan Baru" : "Resep Baru"}
        </Typography>

        <div className="mb-6 grid grid-cols-12 items-end gap-6">
          {isCustomPrescription && (
            <div className="col-span-12">
              <Card className="rounded-xl border shadow-none">
                <Table className="shadow-none">
                  <Table.Head className="divide-x">
                    <Table.HeadCell className="text-md items-start whitespace-nowrap bg-slate-100 uppercase text-slate-800 dark:text-white">
                      Nama Obat
                    </Table.HeadCell>
                    <Table.HeadCell className="text-md w-[120px] items-start whitespace-nowrap bg-slate-100 uppercase text-slate-800 dark:text-white">
                      Jumlah
                    </Table.HeadCell>
                    <Table.HeadCell className="text-md w-[32px] items-start whitespace-nowrap bg-slate-100 uppercase text-slate-800 dark:text-white" />
                  </Table.Head>
                  <Table.Body className="divide-y">
                    {medicines.length === 0 && (
                      <Table.Row>
                        <Table.Cell colSpan={3}>
                          <EmptyData>Belum ada obat</EmptyData>
                        </Table.Cell>
                      </Table.Row>
                    )}
                    {medicines.map((item, index) => (
                      <Table.Row
                        key={index}
                        className="bg-white hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800"
                      >
                        <Table.Cell>
                          <ComboBox
                            placeholder="Cari nama obat"
                            options={DUMMY_MEDICINES}
                            onValueChange={(val) =>
                              handleMedicineNameChange(index, val.label)
                            }
                          />
                        </Table.Cell>
                        <Table.Cell className="w-[120px]">
                          <Input
                            type="number"
                            value={item.quantity}
                            defaultValue={1}
                            onChange={(event) =>
                              handleMedicineQtyChange(
                                0,
                                (event.target as HTMLInputElement).value
                              )
                            }
                          />
                        </Table.Cell>
                        <Table.Cell className="w-[32px]">
                          {medicines.length > 1 && (
                            <IconButton
                              onClick={() => handleDeleteMedicine(index)}
                            >
                              <FaTrashAlt className="cursor-pointer text-gray-500" />
                            </IconButton>
                          )}
                        </Table.Cell>
                      </Table.Row>
                    ))}
                  </Table.Body>
                </Table>
                {isCustomPrescription && (
                  <div className="p-2">
                    <ButtonAddMore
                      className="col-span-12 h-8 text-sm"
                      onClick={handleAddMedicine}
                    >
                      Tambah Obat Lain
                    </ButtonAddMore>
                  </div>
                )}
              </Card>
            </div>
          )}

          {!isCustomPrescription && (
            <>
              <ComboBox
                label="Nama Obat"
                placeholder="Cari nama obat"
                options={DUMMY_MEDICINES}
                className="col-span-10"
                onValueChange={(val) => handleMedicineNameChange(0, val.label)}
              />
              <Input
                type="number"
                label="jumlah"
                className="col-span-2"
                value={medicines[0].quantity}
                onChange={(event) =>
                  handleMedicineQtyChange(
                    0,
                    (event.target as HTMLInputElement).value
                  )
                }
              />
            </>
          )}

          <Input
            type="text"
            label="Aturan Pakai"
            className="col-span-6"
            suffix="kali"
            {...register("frequency_count")}
          />
          <Input
            type="text"
            label=""
            placeholder="Sehari, 3 tetes, dll"
            className="col-span-6"
            {...register("frequency_unit")}
          />
        </div>
        <div className="grid grid-cols-12 items-start gap-6">
          <div className="col-span-12 flex flex-col gap-2 md:col-span-6">
            <Label>Waktu</Label>
            <CheckBox {...register("time")} value="pagi" id="pagi">
              Pagi
            </CheckBox>
            <CheckBox {...register("time")} value="siang" id="siang">
              Siang
            </CheckBox>
            <CheckBox {...register("time")} value="sore" id="sore">
              Sore
            </CheckBox>
            <CheckBox {...register("time")} value="lain" id="lain">
              Lain-lain
            </CheckBox>
            {showFreeTextTime && (
              <Input
                autoFocus={showFreeTextTime}
                type="text"
                placeholder="Ex: Ketika nyeri datang"
                className="col-span-1"
                {...register("time_note")}
              />
            )}
          </div>
          <div className="col-span-12 flex flex-col gap-2 md:col-span-6">
            <Label>Waktu Spesifik</Label>
            <CheckBox
              {...register("span")}
              value="sebelum makan"
              id="sebelum makan"
            >
              Sebelum Makan
            </CheckBox>
            <CheckBox
              {...register("span")}
              value="sesudah makan"
              id="sesudah makan"
            >
              Sesudah Makan
            </CheckBox>
            <CheckBox
              {...register("span")}
              value="bersamaan makan"
              id="bersamaan makan"
            >
              Bersamaan Makan
            </CheckBox>
            <CheckBox {...register("span")} value="lain" id="lain">
              Lain-lain
            </CheckBox>
            {showFreeTextSpan && (
              <Input
                autoFocus={showFreeTextSpan}
                type="text"
                placeholder="Ex: Sebelum tidur"
                className="col-span-1"
                {...register("time_note")}
              />
            )}
          </div>

          <ComboBox
            label="Rute Pemberian"
            placeholder="Pilih rute pemberian obat"
            className="col-span-12"
            onValueChange={(val) => setValue("method", val.label)}
            options={[
              { key: 1, label: "Injeksi" },
              { key: 2, label: "Oral" },
              { key: 3, label: "Suppositoria" },
              { key: 4, label: "Topikal" },
              { key: 5, label: "Sublingual" },
              { key: 6, label: "Inhalasi" },
            ]}
            {...register("method")}
          />
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
