import Button from "components/Button";
import Input from "components/FormInput/Input";
import Select from "components/Select";
import Typography from "components/Typography";
import { useForm } from "react-hook-form";
import { PatientType } from "types/patient";
import { OPTIONS_GENDER, OPTIONS_HOUR, OPTIONS_MINUTE } from "../constants";

const FormNewborn = () => {
  const { register, handleSubmit } = useForm<PatientType>();

  const onSubmit = (val: PatientType) => {
    console.log(val);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <section className="grid grid-cols-4 gap-6 border-b py-8">
        <Typography as="h3" variant="h3" bold className="col-span-4">
          Data Kelahiran
        </Typography>

        {/* mr_number */}
        <Input
          readOnly
          disabled
          label="Nomor Rekam Medis"
          type="text"
          className="col-span-4"
          value="002121"
          {...register("mr_number")}
        />

        {/* patient_name */}
        <Input
          prefix="Bayi Ny."
          required
          label="Nama Bayi"
          type="text"
          placeholder="Nama ibu bayi"
          className="col-span-4"
          {...register("patient_name")}
        />

        {/* id_card_number */}
        <Input
          label="NIK Ibu Kandung"
          type="text"
          placeholder="Silahkan masukkan 16 digit nomor identitas sesuai KTP"
          className="col-span-4"
          {...register("id_card_number")}
        />

        {/* birth_date */}
        <Input
          label="Tanggal Lahir"
          type="date"
          placeholder="DD/MM/YYYY"
          className="col-span-4"
          {...register("birth_date")}
        />

        {/* birth_hour */}
        <Select
          label="Jam"
          id="birth_hour"
          placeholder="00"
          items={OPTIONS_HOUR}
          className="col-span-2"
          {...register("birth_hour")}
        />

        {/* birth_minute */}
        <Select
          label="Menit"
          id="birth_minute"
          placeholder="00"
          items={OPTIONS_MINUTE}
          className="col-span-2"
          {...register("birth_minute")}
        />

        {/* gender */}
        <Select
          id="gender"
          placeholder="Pilih jenis kelamin"
          label="Jenis Kelamin"
          items={OPTIONS_GENDER}
          className="col-span-4"
          {...register("gender")}
        />

        <Button type="submit" color="primary" className="col-span-4">
          Simpan
        </Button>
      </section>
    </form>
  );
};

export default FormNewborn;
