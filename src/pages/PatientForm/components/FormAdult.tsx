import Button from "components/Button";
import Input from "components/FormInput/Input";
import Toggle from "components/Toggle";
import Typography from "components/Typography";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { PatientTypeForm } from "types/patient";
import {
  OPTIONS_EDUCATION,
  OPTIONS_GENDER,
  OPTIONS_MARITAL_STATUS,
  OPTIONS_OCCUPATION,
  OPTIONS_PAYMENT_METHOD,
} from "../constants";
import FormSection from "components/FormSection";
import CheckBox from "components/FormInput/CheckBox";
import ComboBox from "components/FormInput/ComboBox";
import AddressForm from "./AddressForm";
import constructSummaryAdult from "../helpers/constructSummaryAdult";
import NewPatientSummary from "./NewPatientSummary";

interface FormAdultProps {
  defaultValue?: PatientTypeForm;
  onSubmit: (values: PatientTypeForm) => void;
}

const FormAdult = ({ defaultValue, onSubmit }: FormAdultProps) => {
  const [sameAsAddress1, setSameAsAddress1] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [formData, setFormData] = useState<PatientTypeForm | undefined>(
    undefined
  );

  const {
    register,
    setValue,
    watch,
    resetField,
    handleSubmit,
    formState: { errors },
  } = useForm<PatientTypeForm>({ defaultValues: defaultValue });

  const showOtherPaymentMethod = watch("payment_method") === 3;

  const submitForm = (val: PatientTypeForm) => {
    setFormData({ ...val, is_same_domicile: String(Number(sameAsAddress1)) });
    setShowConfirmation(true);
  };

  const handleConfirm = () => {
    setShowConfirmation(false);
    onSubmit(formData);
  };

  useEffect(() => {
    if (!showOtherPaymentMethod) setValue("payment_method_other", "");
  }, [setValue, showOtherPaymentMethod]);

  useEffect(() => {
    if (defaultValue.is_same_domicile) {
      setSameAsAddress1(Boolean(Number(defaultValue.is_same_domicile)));
    }
  }, [defaultValue.is_same_domicile, setValue]);

  return (
    <>
      <form onSubmit={handleSubmit(submitForm)}>
        <FormSection title="Identitas">
          <div className="grid grid-cols-4 gap-6">
            {/* patient_name */}
            <Input
              required
              type="text"
              label="Nama Lengkap"
              placeholder="Nama pasien sesuai KTP"
              error={Boolean(errors?.patient_name)}
              helper={errors?.patient_name?.message}
              className="col-span-4"
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
              label="NIK"
              placeholder="16 digit nomor KTP"
              error={Boolean(errors?.id_card_number)}
              helper={errors?.id_card_number?.message}
              className="col-span-4 md:col-span-2"
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

            {/* id_card_number_2 */}
            <Input
              type="text"
              label="Nomor Identitas Lain (Khusus WNA)"
              placeholder="Nomor PASPOR / KITAS"
              className="col-span-4 md:col-span-2"
              {...register("other_id_card_number")}
            />

            {/* mother_name */}
            <Input
              required
              type="text"
              label="Nama Ibu Kandung"
              placeholder="Nama ibu kandung sesuai KTP"
              className="col-span-4"
              {...register("mother_name")}
            />

            {/* birthplace */}
            <Input
              required
              type="text"
              label="Tempat Lahir"
              placeholder="Nama Kota/Kabupaten"
              error={Boolean(errors?.birthplace)}
              helper={errors?.birthplace?.message}
              className="col-span-4 md:col-span-2"
              {...register("birthplace", {
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
              error={Boolean(errors?.birthdate)}
              helper={errors?.birthdate?.message}
              className="col-span-4 md:col-span-2"
              {...register("birthdate", {
                required: {
                  value: true,
                  message: "Wajib diisi",
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
              error={Boolean(errors?.gender)}
              helper={errors?.gender?.message}
              className="col-span-4 md:col-span-2"
              onValueChange={(val: { key: number; label: string }) => {
                setValue("gender", val.key);
                setValue("gender_string", val.label);
              }}
              {...register("gender", {
                required: {
                  value: true,
                  message: "Wajib diisi",
                },
              })}
            />
          </div>
        </FormSection>

        <FormSection title="Alamat">
          <div className="grid grid-cols-4 gap-6">
            <AddressForm
              isMainAddress
              watch={watch}
              resetField={resetField}
              register={register}
              setValue={setValue}
              errors={errors}
            />

            <div className="col-span-4">
              <Toggle value={sameAsAddress1} onSwitch={setSameAsAddress1}>
                Alamat domisili sama dengan alamat pada kartu identitas
              </Toggle>
            </div>
            {!sameAsAddress1 && (
              <AddressForm
                isMainAddress={false}
                watch={watch}
                resetField={resetField}
                register={register}
                setValue={setValue}
                errors={errors}
              />
            )}
          </div>
        </FormSection>

        <FormSection title="Kontak">
          <div className="grid grid-cols-4 gap-6">
            <Input
              required
              type="text"
              label="No. HP"
              placeholder="08123xxxxxxx"
              error={Boolean(errors?.phone_number)}
              helper={errors?.phone_number?.message}
              className="col-span-4 md:col-span-2"
              {...register("phone_number", {
                required: {
                  value: true,
                  message: "Wajib diisi",
                },
                pattern: {
                  value: /[0-9]/,
                  message: "Format tidak sesuai",
                },
              })}
            />
            <Input
              type="text"
              label="No. Telepon Rumah"
              placeholder="08123xxxxxxx"
              className="col-span-4 md:col-span-2"
              {...register("other_phone_number", {
                pattern: {
                  value: /[0-9]/,
                  message: "Format tidak sesuai",
                },
              })}
            />
          </div>
        </FormSection>

        <FormSection title="Lain-lain">
          <div className="grid grid-cols-3 gap-6">
            <ComboBox
              label="Pendidikan Terakhir"
              placeholder="Pilih pendidikan terakhir"
              options={OPTIONS_EDUCATION}
              className="col-span-3 md:col-span-1"
              onValueChange={(val: { key: number; label: string }) => {
                setValue("education", val.key);
                setValue("education_string", val.label);
              }}
              {...register("education")}
            />

            <ComboBox
              label="Pekerjaan"
              placeholder="Pekerjaan saat ini"
              options={OPTIONS_OCCUPATION}
              className="col-span-3 md:col-span-1"
              onValueChange={(val: { key: number; label: string }) => {
                setValue("job", val.label);
              }}
              {...register("job")}
            />

            <ComboBox
              required
              id="marital"
              label="Status pernikahan"
              placeholder="Status pernikahan"
              options={OPTIONS_MARITAL_STATUS}
              error={Boolean(errors?.marital)}
              helper={errors?.marital?.message}
              className="col-span-3 md:col-span-1"
              onValueChange={(val: { key: number; label: string }) => {
                setValue("marital", val.key);
                setValue("marital_string", val.label);
              }}
              {...register("marital", {
                required: {
                  value: true,
                  message: "Wajib diisi",
                },
              })}
            />
            <ComboBox
              label="Metode Pembayaran"
              placeholder="Pilih metode pembayaran"
              className="col-span-3 md:col-span-2"
              onValueChange={(val: { key: number; label: string }) => {
                setValue("payment_method", val.key);
                setValue("payment_method_string", val.label);
              }}
              options={OPTIONS_PAYMENT_METHOD}
              {...register("payment_method")}
            />
            {showOtherPaymentMethod && (
              <Input
                type="text"
                label="Asuransi Lainnya"
                placeholder="Tulis jenis asuransi"
                className="col-span-3 md:col-span-1"
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

        <div className="col-span-2 flex items-start gap-2 py-6">
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

      <NewPatientSummary
        data={constructSummaryAdult({ data: formData })}
        open={showConfirmation}
        onClose={() => setShowConfirmation(false)}
        onContinue={handleConfirm}
      />
    </>
  );
};

export default FormAdult;
