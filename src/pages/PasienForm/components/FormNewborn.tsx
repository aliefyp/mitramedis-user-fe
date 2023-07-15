import Button from "components/Button";
import FormSection from "components/FormSection";
import ComboBox from "components/FormInput/ComboBox";
import Input from "components/FormInput/Input";
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
      <FormSection title="Data Kelahiran">
        <div className="grid grid-cols-4 gap-6">
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
          <ComboBox
            label="Jam"
            id="birth_hour"
            placeholder="00"
            options={OPTIONS_HOUR.map((item, index) => ({
              key: index + 1,
              label: item,
            }))}
            className="col-span-2"
            {...register("birth_hour")}
          />

          {/* birth_minute */}
          <ComboBox
            label="Menit"
            id="birth_minute"
            placeholder="00"
            options={OPTIONS_MINUTE.map((item, index) => ({
              key: index + 1,
              label: item,
            }))}
            className="col-span-2"
            {...register("birth_minute")}
          />

          {/* gender */}
          <ComboBox
            id="gender"
            placeholder="Pilih jenis kelamin"
            label="Jenis Kelamin"
            options={OPTIONS_GENDER.map((item, index) => ({
              key: index + 1,
              label: item,
            }))}
            className="col-span-4"
            {...register("gender")}
          />
        </div>
      </FormSection>

      <Button type="submit" color="primary" className="w-full">
        Simpan
      </Button>
    </form>
  );
};

export default FormNewborn;
