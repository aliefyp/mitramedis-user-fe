import { useForm } from "react-hook-form";
import Button from "components/Button";
import Input from "components/FormInput/Input";
import Modal from "components/Modal";
import Typography from "components/Typography";
import { useNavigate } from "react-router-dom";
import ComboBox from "components/FormInput/ComboBox";
import CheckBox from "components/FormInput/CheckBox";
import Label from "components/FormInput/Label";

interface PrescriptionType {
  medicine_name: string;
  type: string;
  unit: string;
  qty: string;
  frequency_count: number;
  frequency_unit: string;
  time: string;
  time_note: string;
  span: string;
  span_note: string;
  method: string;
}

interface SearchMedicineProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (val: PrescriptionType) => void;
}

const SearchMedicine = ({ open, onClose, onSubmit }: SearchMedicineProps) => {
  const navigate = useNavigate();
  const { watch, register, handleSubmit } = useForm({
    defaultValues: {
      medicine_name: "",
      type: "",
      unit: "",
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

  return (
    <Modal open={open} onClose={onClose}>
      <form className="px-8 py-8" onSubmit={handleSubmit(onSubmit)}>
        <Typography as="h1" className="mb-4 text-2xl font-bold">
          Resep Baru
        </Typography>

        <div className="grid grid-cols-2 items-end gap-6">
          <ComboBox
            label="Nama Obat"
            placeholder="Cari nama obat"
            className="col-span-2"
            options={[]}
            {...register("medicine_name")}
          />
          <ComboBox
            label="Sediaan"
            placeholder=""
            className="col-span-1"
            options={[]}
            {...register("type")}
          />
          <ComboBox
            label="Unit"
            placeholder=""
            className="col-span-1"
            options={[]}
            {...register("unit")}
          />
          <Input
            label="Aturan Pakai"
            type="text"
            className="col-span-1"
            suffix="X"
            {...register("frequency_count")}
          />
          <Input
            label=""
            type="text"
            className="col-span-1"
            {...register("frequency_unit")}
          />
          <div className="col-span-1 flex flex-col gap-2">
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
            <Input
              type="text"
              placeholder="Lain-lain"
              className="col-span-1"
              {...register("time_note")}
            />
          </div>
          <div className="col-span-1 flex flex-col gap-2">
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
            <Input
              type="text"
              placeholder="Lain-lain"
              className="col-span-1"
              {...register("time_note")}
            />
          </div>

          <ComboBox
            label="Rute Pemberian"
            placeholder="Pilih rute pemberian obat"
            className="col-span-2"
            options={[]}
            {...register("method")}
          />
          <div className="col-span-2 mt-4 flex flex-col gap-2">
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

export default SearchMedicine;
