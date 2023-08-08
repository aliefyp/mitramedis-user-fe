import { useEffect, useState } from "react";
import Button from "components/Button";
import FormSection from "components/FormSection";
import ComboBox from "components/FormInput/ComboBox";
import Input from "components/FormInput/Input";
import { useForm } from "react-hook-form";
import { PatientType } from "types/patient";
import {
  OPTIONS_GENDER,
  OPTIONS_PAYMENT_METHOD,
  PAYMENT_INSURANCE,
} from "../constants";
import CheckBox from "components/FormInput/CheckBox";
import Typography from "components/Typography";
import ConfirmationModal from "./ConfirmationModal";

interface FormNewbornProps {
  namePrefix: string;
  onSubmit: (values: PatientType) => void;
}

const FormNewborn = ({
  namePrefix = "Bayi Ny.",
  onSubmit,
}: FormNewbornProps) => {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [formData, setFormData] = useState<PatientType | undefined>(undefined);
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<PatientType>();

  const submitForm = (val: PatientType) => {
    setFormData(val);
    setShowConfirmation(true);
  };

  const handleConfirm = () => {
    setShowConfirmation(false);
    onSubmit(formData);
  };

  const showOtherPaymentMethod = watch("payment_method") === PAYMENT_INSURANCE;

  useEffect(() => {
    if (!showOtherPaymentMethod) setValue("payment_method_other", "");
  }, [setValue, showOtherPaymentMethod]);

  return (
    <>
      <form onSubmit={handleSubmit(submitForm)}>
        <FormSection title="Data Kelahiran">
          <div className="grid grid-cols-4 gap-6">
            {/* patient_name */}
            <Input
              required
              prefix={namePrefix}
              type="text"
              label="Nama"
              placeholder="Nama ibu bayi"
              className="col-span-4"
              error={Boolean(errors?.patient_name)}
              helper={errors?.patient_name?.message}
              {...register("patient_name", {
                required: {
                  value: true,
                  message: "Wajib diisi",
                },
              })}
            />

            {/* id_card_number */}
            <Input
              required
              type="text"
              label="NIK Ibu Kandung"
              placeholder="16 digit nomor KTP"
              className="col-span-4"
              error={Boolean(errors?.id_card_number)}
              helper={errors?.id_card_number?.message}
              {...register("id_card_number", {
                required: {
                  value: true,
                  message: "Wajib diisi",
                },
                pattern: {
                  value: /[0-9]{16}/,
                  message: "Format tidak sesuai",
                },
              })}
            />

            {/* gender */}
            <ComboBox
              required
              id="gender"
              label="Jenis Kelamin"
              placeholder="Pilih jenis kelamin"
              options={OPTIONS_GENDER}
              className="col-span-4 md:col-span-2"
              error={Boolean(errors?.gender)}
              helper={errors?.gender?.message}
              onValueChange={(val) => setValue("gender", val.key as number)}
              {...register("gender", {
                required: {
                  value: true,
                  message: "Wajib diisi",
                },
              })}
            />

            {/* birthdate */}
            <Input
              required
              type="date"
              label="Tanggal Lahir"
              placeholder="DD/MM/YYYY"
              className="col-span-2 md:col-span-1"
              error={Boolean(errors?.birthdate)}
              helper={errors?.birthdate?.message}
              {...register("birthdate", {
                required: {
                  value: true,
                  message: "Wajib diisi",
                },
              })}
            />

            {/* birth_time */}
            <Input
              required
              type="time"
              label="Jam Lahir"
              placeholder="00:00"
              className="col-span-2 md:col-span-1"
              error={Boolean(errors?.birth_time)}
              helper={errors?.birth_time?.message}
              {...register("birth_time")}
            />

            <ComboBox
              autoFocus
              label="Metode Pembayaran"
              placeholder="Pilih metode pembayaran yang digunakan"
              className="col-span-4 md:col-span-2"
              onValueChange={(val) =>
                setValue("payment_method", val.key as number)
              }
              options={OPTIONS_PAYMENT_METHOD}
              {...register("payment_method")}
            />

            {showOtherPaymentMethod && (
              <Input
                required={showOtherPaymentMethod}
                type="text"
                label="Metode Pembayaran"
                placeholder="Pilih metode pembayaran yang digunakan"
                className="col-span-4 md:col-span-2"
                error={Boolean(errors?.payment_method_other)}
                helper={errors?.payment_method_other?.message}
                {...register("payment_method_other", {
                  required: {
                    value: showOtherPaymentMethod,
                    message: "Wajib diisi",
                  },
                })}
              />
            )}
          </div>
        </FormSection>

        <div className="col-span-4 flex items-start gap-2 py-6">
          <CheckBox {...register("general_consent")} />
          <Typography>
            Pasien telah diberikan penjelasan mengenai <i>General Consent</i>{" "}
            atau Persetujuan Umum.
            <Typography link as="span" className="cursor-pointer ">
              Klik disini untuk cetak <i>General Consent</i>
            </Typography>
          </Typography>
        </div>
        <Button type="submit" color="primary" className="w-full">
          Simpan
        </Button>
      </form>
      <ConfirmationModal
        data={formData}
        namePrefix={namePrefix}
        open={showConfirmation}
        onClose={() => setShowConfirmation(false)}
        onContinue={handleConfirm}
      />
    </>
  );
};

export default FormNewborn;
