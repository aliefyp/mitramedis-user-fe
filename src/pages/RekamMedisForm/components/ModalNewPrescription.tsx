import { useForm } from "react-hook-form";
import Button from "components/Button";
import Input from "components/FormInput/Input";
import Modal from "components/Modal";
import Typography from "components/Typography";
import ComboBox from "components/FormInput/ComboBox";
import CheckBox from "components/FormInput/CheckBox";
import Label from "components/FormInput/Label";
import { useEffect, useState } from "react";

interface PrescriptionType {
  medicine_name: string;
  qty: string;
  frequency_count: number;
  frequency_unit: string;
  time: string;
  time_note: string;
  span: string;
  span_note: string;
  method: string;
}

interface ModalNewPrescriptionProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (val: PrescriptionType) => void;
}

const ModalNewPrescription = ({
  open,
  onClose,
  onSubmit,
}: ModalNewPrescriptionProps) => {
  const [showFreeTextTime, setShowFreeTextTime] = useState(false);
  const [showFreeTextSpan, setShowFreeTextSpan] = useState(false);
  const { register, handleSubmit, watch } = useForm({
    defaultValues: {
      medicine_name: "",
      qty: "1",
      frequency_count: "3",
      frequency_unit: "sehari",
      time: [],
      time_note: "",
      span: [],
      span_note: "",
      method: "",
    },
  });

  const watchTime = watch("time");
  const watchSpan = watch("span");

  useEffect(() => {
    setShowFreeTextTime(watchTime.includes("lain"));
  }, [watchTime]);

  useEffect(() => {
    setShowFreeTextSpan(watchSpan.includes("lain"));
  }, [watchSpan]);

  return (
    <Modal open={open} onClose={onClose} className="md:min-w-[700px]">
      <form className="px-8 py-8" onSubmit={handleSubmit(onSubmit)}>
        <Typography as="h1" className="mb-4 text-2xl font-bold">
          Resep Baru
        </Typography>

        <div className="mb-6 grid grid-cols-12 items-end gap-6">
          <ComboBox
            label="Nama Obat"
            placeholder="Cari nama obat"
            className="col-span-10"
            options={[]}
            {...register("medicine_name")}
          />
          <Input
            type="number"
            label="Jumlah"
            className="col-span-2"
            {...register("qty")}
          />
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
            options={[]}
            {...register("method")}
          />
          <div className="col-span-12 mt-4 flex flex-col gap-2">
            <Button type="button" color="secondary" className="w-full">
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
