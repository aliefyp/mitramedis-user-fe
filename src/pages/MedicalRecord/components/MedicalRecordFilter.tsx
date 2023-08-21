import { useForm } from "react-hook-form";
import Card from "components/Card";
import Input from "components/FormInput/Input";
import Button from "components/Button";
import { TbSearch } from "react-icons/tb";

interface MedicalRecordFilterParam {
  id_card_number: string;
  patient_name: string;
  medical_record_number: string;
}

interface MedicalRecordFilterProps {
  onSubmit: (val: MedicalRecordFilterParam) => void;
}

const MedicalRecordFilter = ({ onSubmit }: MedicalRecordFilterProps) => {
  const { register, handleSubmit } = useForm<MedicalRecordFilterParam>();

  const submitForm = (val: MedicalRecordFilterParam) => {
    onSubmit(val);
  };

  return (
    <Card className="rounded-2xl border-none p-3 shadow-sm">
      <form onSubmit={handleSubmit(submitForm)}>
        <div className="grid grid-cols-4 items-center gap-4">
          <Input
            type="search"
            id="patient_name"
            placeholder="Nama pasien"
            className="col-span-4 md:col-span-1"
            {...register("patient_name")}
          />
          <Input
            type="search"
            id="medical_record_number"
            placeholder="Nomor Rekam Medis"
            className="col-span-4 md:col-span-1"
            {...register("medical_record_number")}
          />
          <Input
            type="search"
            id="id_card_number"
            placeholder="NIK pasien"
            className="col-span-4 md:col-span-1"
            {...register("id_card_number")}
          />
          <div className="col-span-4 flex items-center justify-end gap-2 md:col-span-1">
            <Button type="reset" color="ghost-primary">
              Reset
            </Button>
            <Button type="submit" color="secondary">
              <div className="flex items-center gap-2">
                <TbSearch />
                Cari
              </div>
            </Button>
          </div>
        </div>
      </form>
    </Card>
  );
};

export default MedicalRecordFilter;
