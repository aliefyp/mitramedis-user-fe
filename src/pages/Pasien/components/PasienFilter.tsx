import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { FaPlus } from "react-icons/fa";
import Card from "components/Card";
import Button from "components/Button";
import Input from "components/Input";

interface PasienFilterParam {
  id_card_number: string;
  patient_name: string;
  mr_number: string;
}

const PasienFilter = () => {
  const { register, handleSubmit } = useForm<PasienFilterParam>();
  const navigate = useNavigate();

  const onSubmit = (val: PasienFilterParam) => {
    console.log(val);
  };

  return (
    <Card className="rounded-2xl border-none p-6 shadow-sm">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-4 items-center gap-4">
          <div className="col-span-4 sm:col-span-1">
            <Input
              label="Nomor Medical Record"
              type="text"
              id="mr_number"
              placeholder="12345"
              prefix="MR"
              {...register("mr_number")}
            />
          </div>
          <div className="col-span-4 sm:col-span-1">
            <Input
              label="Nama Pasien"
              type="text"
              id="patient_name"
              placeholder="Tulis nama pasien"
              {...register("patient_name")}
            />
          </div>
          <div className="col-span-4 sm:col-span-1">
            <Input
              label="NIK"
              type="text"
              id="id_card_number"
              placeholder="35123xxxxxxxxxxx"
              {...register("patient_name")}
            />
          </div>
          <div className="col-span-4 flex h-full items-end justify-end sm:col-span-1">
            <Button
              className="w-full sm:w-auto"
              onClick={() => navigate("/pasien/new")}
            >
              <div className="flex items-center gap-4">
                <FaPlus />
                <p className="text-xl font-bold">Pasien Baru</p>
              </div>
            </Button>
          </div>
        </div>
      </form>
    </Card>
  );
};

export default PasienFilter;
