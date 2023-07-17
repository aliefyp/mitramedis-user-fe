import Button from "components/Button";
import FormSection from "components/FormSection";
import ComboBox from "components/FormInput/ComboBox";
import Input from "components/FormInput/Input";
import { useForm } from "react-hook-form";
import { PatientType } from "types/patient";
import { OPTIONS_GENDER, OPTIONS_HOUR, OPTIONS_MINUTE } from "../constants";

const FormNewborn = () => {
  const { formState, register, handleSubmit } = useForm<PatientType>();

  console.log(formState.errors);

  const onSubmit = (val: PatientType) => {
    console.log(val);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormSection title="Data Kelahiran">
        <div className="grid grid-cols-4 gap-6">
          {/* patient_name */}
          <Input
            required
            prefix="Bayi Ny."
            label="Nama Bayi"
            type="text"
            placeholder="Nama ibu bayi"
            className="col-span-4"
            {...(register("patient_name"),
            {
              required: true,
            })}
          />

          {/* id_card_number */}
          <Input
            required
            label="NIK Ibu Kandung"
            type="text"
            placeholder="Silahkan masukkan 16 digit nomor identitas sesuai KTP"
            className="col-span-4"
            {...register("id_card_number", {
              required: true,
              min: 16,
            })}
          />

          {/* gender */}
          <ComboBox
            required
            id="gender"
            placeholder="Pilih jenis kelamin"
            label="Jenis Kelamin"
            options={OPTIONS_GENDER.map((item, index) => ({
              key: index + 1,
              label: item,
            }))}
            className="col-span-4"
            {...register("gender", {
              required: true,
            })}
          />

          {/* birth_date */}
          <Input
            required
            label="Tanggal Lahir"
            type="date"
            placeholder="DD/MM/YYYY"
            className="col-span-4 md:col-span-2"
            {...register("birth_date", {
              required: true,
            })}
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
            className="col-span-4 md:col-span-1"
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
            className="col-span-4 md:col-span-1"
            {...register("birth_minute")}
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
