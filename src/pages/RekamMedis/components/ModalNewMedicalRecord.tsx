import { useForm } from "react-hook-form";
import Modal from "components/Modal";
import Typography from "components/Typography";
import Button from "components/Button";
import ComboBox from "components/FormInput/ComboBox";
import Input from "components/FormInput/Input";

interface MedicalRecordType {
  code: string;
  name: string;
  category: string;
}

interface ModalNewMedicalRecordProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (values: MedicalRecordType[]) => void;
}

const ModalNewMedicalRecord = ({
  open,
  onClose,
  onSubmit,
}: ModalNewMedicalRecordProps) => {
  const { register, handleSubmit } = useForm<MedicalRecordType>();

  return (
    <Modal open={open} onClose={onClose} className=" md:max-w-2xl">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="px-8 py-8">
          <Typography as="h1" className="text-2xl font-bold">
            Rekam Medis Baru
          </Typography>
          <div className="grid gap-6 py-8">
            <ComboBox
              label="Nama Item"
              placeholder="Pilih Nama Obat"
              options={[]}
              {...register("name")}
            />
            <Input
              label="Kode Item (KFA)"
              placeholder="Kode Item (KFA)"
              {...register("code")}
            />
            <ComboBox
              label="Kategori"
              placeholder="Pilih kategori"
              options={[]}
              {...register("category")}
            />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <Button
              className="w-full"
              type="button"
              color="secondary"
              onClick={onClose}
            >
              Batal
            </Button>
            <Button className="w-full" type="button" color="primary">
              Tambahkan
            </Button>
          </div>
        </div>
      </form>
    </Modal>
  );
};

export default ModalNewMedicalRecord;
