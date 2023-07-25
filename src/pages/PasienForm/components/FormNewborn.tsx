import { useMemo, useState } from "react";
import Button from "components/Button";
import FormSection from "components/FormSection";
import ComboBox from "components/FormInput/ComboBox";
import Input from "components/FormInput/Input";
import { useForm } from "react-hook-form";
import { PatientType } from "types/patient";
import {
  OPTIONS_GENDER,
  OPTIONS_HOUR,
  OPTIONS_MINUTE,
  OPTIONS_PAYMENT_METHOD,
  FORM_NEWBORN_PATIENT_ATTRIBUTES as ATTR,
} from "../constants";
import CheckBox from "components/FormInput/CheckBox";
import Typography from "components/Typography";
import ConfirmationModal from "./ConfirmationModal";

const FormNewborn = () => {
  const [showOtherPaymentMethod, setShowOtherPaymentMethod] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [formData, setFormData] = useState<PatientType | undefined>(undefined);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<PatientType>();

  const onSubmit = (val: PatientType) => {
    setFormData(val);
    setShowConfirmation(true);
  };

  const summaryData = useMemo(() => {
    if (!formData) return [];

    const keys = Object.keys(formData);
    return keys
      .filter((key) => ATTR[key]?.label)
      .map((key) => ({
        key: ATTR[key].label,
        value: (() => {
          const prefix = key === "patient_name" ? "Bayi Ny. " : "";
          return formData[key] ? prefix + formData[key] : "-";
        })(),
      }));
  }, [formData]);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormSection title="Data Kelahiran">
          <div className="grid grid-cols-4 gap-6">
            {/* patient_name */}
            <Input
              required
              prefix="Bayi Ny."
              type="text"
              label={ATTR.patient_name.label}
              placeholder={ATTR.patient_name.placeholder}
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
              label={ATTR.id_card_number.label}
              placeholder={ATTR.id_card_number.placeholder}
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
              label={ATTR.gender.label}
              placeholder={ATTR.gender.placeholder}
              options={OPTIONS_GENDER.map((item, index) => ({
                key: index + 1,
                label: item,
              }))}
              className="col-span-4"
              error={Boolean(errors?.gender)}
              helper={errors?.gender?.message}
              onValueChange={(val) => setValue("gender", val.label)}
              {...register("gender", {
                required: {
                  value: true,
                  message: "Wajib diisi",
                },
              })}
            />

            {/* birth_date */}
            <Input
              required
              type="date"
              label={ATTR.birth_date.label}
              placeholder={ATTR.birth_date.placeholder}
              className="col-span-4 md:col-span-2"
              error={Boolean(errors?.birth_date)}
              helper={errors?.birth_date?.message}
              {...register("birth_date", {
                required: {
                  value: true,
                  message: "Wajib diisi",
                },
              })}
            />

            {/* birth_hour */}
            <ComboBox
              id="birth_hour"
              label={ATTR.birth_hour.label}
              placeholder={ATTR.birth_hour.placeholder}
              options={OPTIONS_HOUR.map((item, index) => ({
                key: index + 1,
                label: item,
              }))}
              className="col-span-4 md:col-span-1"
              onValueChange={(val) => setValue("birth_hour", val.label)}
              {...register("birth_hour")}
            />

            {/* birth_minute */}
            <ComboBox
              id="birth_minute"
              label={ATTR.birth_minute.label}
              placeholder={ATTR.birth_minute.placeholder}
              options={OPTIONS_MINUTE.map((item, index) => ({
                key: index + 1,
                label: item,
              }))}
              className="col-span-4 md:col-span-1"
              onValueChange={(val) => setValue("birth_minute", val.label)}
              {...register("birth_minute")}
            />

            <ComboBox
              label={ATTR.payment_method.label}
              placeholder={ATTR.payment_method.placeholder}
              className="col-span-4 md:col-span-2"
              onValueChange={(val: { key: number; label: string }) =>
                setShowOtherPaymentMethod(val.label === "Asuransi Lainnya")
              }
              options={OPTIONS_PAYMENT_METHOD.map((item, index) => ({
                key: index + 1,
                label: item,
              }))}
              {...register("payment_method")}
            />
            {showOtherPaymentMethod && (
              <Input
                required={showOtherPaymentMethod}
                type="text"
                label={ATTR.payment_method_other.label}
                placeholder={ATTR.payment_method_other.placeholder}
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
          <CheckBox {...register("consent")} />
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
        items={summaryData}
        open={showConfirmation}
        onClose={() => setShowConfirmation(false)}
        onContinue={() => setShowConfirmation(false)}
      />
    </>
  );
};

export default FormNewborn;
