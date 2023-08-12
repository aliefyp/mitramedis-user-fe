import { useForm } from "react-hook-form";
import Card from "components/Card";
import Input from "components/FormInput/Input";

interface PasienFilterParam {
  id_card_number: string;
  patient_name: string;
  mr_number: string;
}

const PasienFilter = () => {
  const { register, handleSubmit } = useForm<PasienFilterParam>();

  const onSubmit = (val: PasienFilterParam) => {
    console.log(val);
  };

  return (
    <Card className="rounded-2xl border-none p-6 shadow-sm">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-4 items-center gap-4">
          <Input
            label="Nomor Medical Record"
            type="text"
            id="mr_number"
            placeholder="12345"
            prefix="MR"
            className="col-span-4 md:col-span-1"
            {...register("mr_number")}
          />
          <Input
            label="Nama Pasien"
            type="text"
            id="patient_name"
            placeholder="Tulis nama pasien"
            className="col-span-4 md:col-span-1"
            {...register("patient_name")}
          />
          <Input
            label="NIK"
            type="text"
            id="id_card_number"
            placeholder="35123xxxxxxxxxxx"
            className="col-span-4 md:col-span-1"
            {...register("patient_name")}
          />
        </div>
      </form>
    </Card>
  );
};

export default PasienFilter;
