import { Checkbox, Label, Select, TextInput } from "flowbite-react";
import Button from "components/Button";
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
import AddressForm from "./AddressForm";
import constructSummaryAdult from "../helpers/constructSummary";
import PatientSummary from "./PatientSummary";

interface FormAdultProps {
  isBaby: boolean;
  defaultValue?: PatientTypeForm;
  onSubmit: (values: PatientTypeForm) => void;
}

const FormAdult = ({ isBaby, defaultValue, onSubmit }: FormAdultProps) => {
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

  const watchGender = watch("gender");
  const watchEducation = watch("education");
  const watchMarital = watch("marital");
  const watchPaymentMethod = watch("payment_method");

  const showOtherPaymentMethod = Number(watch("payment_method")) === 3;

  const submitForm = (val: PatientTypeForm) => {
    setFormData({ ...val });
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
    if (watchGender) {
      setValue("gender_string", OPTIONS_GENDER.find((i) => i.key).label);
    }
    if (watchEducation) {
      setValue("education_string", OPTIONS_EDUCATION.find((i) => i.key).label);
    }
    if (watchMarital) {
      setValue(
        "marital_string",
        OPTIONS_MARITAL_STATUS.find((i) => i.key).label
      );
    }
    if (watchPaymentMethod) {
      setValue(
        "payment_method_string",
        OPTIONS_PAYMENT_METHOD.find((i) => i.key).label
      );
    }
  }, [
    setValue,
    watch,
    watchEducation,
    watchGender,
    watchMarital,
    watchPaymentMethod,
  ]);

  return (
    <>
      <form noValidate onSubmit={handleSubmit(submitForm)}>
        <FormSection title="Identitas">
          <div className="grid grid-cols-4 gap-6">
            {/* patient_name */}
            <div className="col-span-4">
              <Label htmlFor="patient_name" value="Nama Lengkap" />
              <TextInput
                required
                type="text"
                addon={isBaby ? "Bayi Ny." : ""}
                placeholder={
                  isBaby ? "Nama ibu bayi" : "Nama pasien sesuai KTP"
                }
                color={Boolean(errors?.patient_name) ? "failure" : "gray"}
                helperText={errors?.patient_name?.message}
                {...register("patient_name", {
                  required: {
                    value: true,
                    message: "Wajib diisi",
                  },
                })}
              />
            </div>

            {/* id_card_number */}
            <div className="col-span-4 md:col-span-2">
              <Label
                htmlFor="id_card_number"
                value={isBaby ? "NIK Ibu Kandung" : "NIK"}
              />
              <TextInput
                required
                type="text"
                placeholder="16 digit nomor KTP"
                color={Boolean(errors?.id_card_number) ? "failure" : "gray"}
                helperText={errors?.id_card_number?.message}
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
            </div>

            {/* other_id_card_number */}
            {!isBaby && (
              <div className="col-span-4 md:col-span-2">
                <div className="mb-1 flex gap-1">
                  <Label
                    htmlFor="other_id_card_number"
                    value="Nomor Identitas Lain (Khusus WNA)"
                  />
                  <Typography small className="italic !text-gray-500">
                    (Opsional)
                  </Typography>
                </div>

                <TextInput
                  type="text"
                  placeholder="Nomor PASPOR / KITAS"
                  {...register("other_id_card_number")}
                />
              </div>
            )}

            {/* mother_name */}
            {!isBaby && (
              <div className="col-span-4">
                <div className="mb-1 flex gap-1">
                  <Label htmlFor="mother_name" value="Nama Ibu Kandung" />
                  <Typography small className="italic !text-gray-500">
                    (Opsional)
                  </Typography>
                </div>
                <TextInput
                  required
                  type="text"
                  placeholder="Nama ibu kandung sesuai KTP"
                  {...register("mother_name")}
                />
              </div>
            )}

            {/* birthplace */}
            {!isBaby && (
              <div className="col-span-4 md:col-span-2">
                <Label htmlFor="birthplace" value="Tempat Lahir" />
                <TextInput
                  required
                  type="text"
                  placeholder="Nama Kota/Kabupaten"
                  color={Boolean(errors?.birthplace) ? "failure" : "gray"}
                  helperText={errors?.birthplace?.message}
                  {...register("birthplace", {
                    required: {
                      value: true,
                      message: "Wajib diisi",
                    },
                  })}
                />
              </div>
            )}

            {/* birthdate */}
            <div className="col-span-4 md:col-span-1">
              <Label htmlFor="birthdate" value="Tanggal Lahir" />
              <TextInput
                required
                type="date"
                placeholder="DD/MM/YYYY"
                color={Boolean(errors?.birthdate) ? "failure" : "gray"}
                helperText={errors?.birthdate?.message}
                {...register("birthdate", {
                  required: {
                    value: true,
                    message: "Wajib diisi",
                  },
                })}
              />
            </div>

            {/* birth_time */}
            {isBaby && (
              <div className="col-span-4 md:col-span-1">
                <Label htmlFor="birth_time" value="Jam Lahir" />
                <TextInput
                  required
                  type="time"
                  placeholder="00:00"
                  color={Boolean(errors?.birth_time) ? "failure" : "gray"}
                  helperText={errors?.birth_time?.message}
                  {...register("birth_time", {
                    required: {
                      value: true,
                      message: "Wajib diisi",
                    },
                  })}
                />
              </div>
            )}

            {/* gender */}
            <div className="col-span-4 md:col-span-2">
              <Label htmlFor="gender" value="Jenis Kelamin" />
              <Select
                defaultValue=""
                required
                color={Boolean(errors?.gender) ? "failure" : "gray"}
                helperText={errors?.gender?.message}
                {...register("gender", {
                  required: {
                    value: true,
                    message: "Wajib diisi",
                  },
                })}
              >
                <option value="" disabled>
                  Pilih jenis kelamin
                </option>
                {OPTIONS_GENDER.map((item) => (
                  <option key={item.key} value={item.key}>
                    {item.label}
                  </option>
                ))}
              </Select>
            </div>
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

            <div className="col-span-4 flex items-start gap-2">
              <Checkbox {...register("is_same_domicile")} />
              <Label htmlFor="is_same_domicile">
                Alamat domisili sama dengan alamat pada kartu identitas
              </Label>
            </div>
            {Boolean(!watch("is_same_domicile")) && (
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
            <div className="col-span-4 md:col-span-2">
              <div className="mb-1 flex gap-1">
                <Label htmlFor="phone_number" value="No. HP" />
                {isBaby && (
                  <Typography small className="italic !text-gray-500">
                    (Opsional)
                  </Typography>
                )}
              </div>
              <TextInput
                required={!isBaby}
                type="text"
                placeholder="08123xxxxxxx"
                color={Boolean(errors?.phone_number) ? "failure" : "gray"}
                helperText={errors?.phone_number?.message}
                {...register("phone_number", {
                  required: {
                    value: !isBaby,
                    message: "Wajib diisi",
                  },
                  pattern: {
                    value: /[0-9]/,
                    message: "Format tidak sesuai",
                  },
                })}
              />
            </div>

            <div className="col-span-4 md:col-span-2">
              <div className="mb-1 flex gap-1">
                <Label htmlFor="other_phone_number" value="No. Telepon Rumah" />
                <Typography small className="italic !text-gray-500">
                  (Opsional)
                </Typography>
              </div>
              <TextInput
                type="text"
                placeholder="08123xxxxxxx"
                {...register("other_phone_number", {
                  pattern: {
                    value: /[0-9]/,
                    message: "Format tidak sesuai",
                  },
                })}
              />
            </div>
          </div>
        </FormSection>

        <FormSection title="Lain-lain">
          <div className="grid grid-cols-3 gap-6">
            {!isBaby && (
              <div className="col-span-3 md:col-span-1">
                <div className="mb-1 flex gap-1">
                  <Label htmlFor="education" value="Pendidikan Terakhir" />
                  <Typography small className="italic !text-gray-500">
                    (Opsional)
                  </Typography>
                </div>
                <Select
                  defaultValue=""
                  color={Boolean(errors?.education) ? "failure" : "gray"}
                  helperText={errors?.education?.message}
                  {...register("education")}
                >
                  <option value="" disabled>
                    Pilih pendidikan terakhir
                  </option>
                  {OPTIONS_EDUCATION.map((item) => (
                    <option key={item.key} value={item.key}>
                      {item.label}
                    </option>
                  ))}
                </Select>
              </div>
            )}

            {!isBaby && (
              <div className="col-span-3 md:col-span-1">
                <div className="mb-1 flex gap-1">
                  <Label htmlFor="job" value="Pekerjaan" />
                  <Typography small className="italic !text-gray-500">
                    (Opsional)
                  </Typography>
                </div>
                <Select
                  defaultValue=""
                  color={Boolean(errors?.job) ? "failure" : "gray"}
                  helperText={errors?.job?.message}
                  {...register("job")}
                >
                  <option value="" disabled>
                    Pilih pekerjaan saat ini
                  </option>
                  {OPTIONS_OCCUPATION.map((item) => (
                    <option key={item.key} value={item.label}>
                      {item.label}
                    </option>
                  ))}
                </Select>
              </div>
            )}

            {!isBaby && (
              <div className="col-span-3 md:col-span-1">
                <Label htmlFor="marital" value="Status pernikahan" />
                <Select
                  defaultValue=""
                  required
                  color={Boolean(errors?.marital) ? "failure" : "gray"}
                  helperText={errors?.marital?.message}
                  {...register("marital", {
                    required: {
                      value: true,
                      message: "Wajib diisi",
                    },
                  })}
                >
                  <option value="" disabled>
                    Pilih status pernikahan
                  </option>
                  {OPTIONS_MARITAL_STATUS.map((item) => (
                    <option key={item.key} value={item.key}>
                      {item.label}
                    </option>
                  ))}
                </Select>
              </div>
            )}

            <div className="col-span-3 md:col-span-2">
              <div className="mb-1 flex gap-1">
                <Label htmlFor="payment_method" value="Metode Pembayaran" />
                <Typography small className="italic !text-gray-500">
                  (Opsional)
                </Typography>
              </div>
              <Select
                defaultValue=""
                color={Boolean(errors?.payment_method) ? "failure" : "gray"}
                helperText={errors?.payment_method?.message}
                {...register("payment_method")}
              >
                <option value="" disabled>
                  Pilih metode pembayaran
                </option>
                {OPTIONS_PAYMENT_METHOD.map((item) => (
                  <option key={item.key} value={item.key}>
                    {item.label}
                  </option>
                ))}
              </Select>
            </div>

            {showOtherPaymentMethod && (
              <div className="col-span-3 md:col-span-1">
                <Label
                  htmlFor="payment_method_other"
                  value="Asuransi Lainnya"
                />
                <TextInput
                  required={showOtherPaymentMethod}
                  type="text"
                  placeholder="Tulis jenis asuransi"
                  color={
                    Boolean(errors?.payment_method_other) ? "failure" : "gray"
                  }
                  helperText={errors?.payment_method_other?.message}
                  {...register("payment_method_other", {
                    required: {
                      value: showOtherPaymentMethod,
                      message: "Wajib diisi",
                    },
                  })}
                />
              </div>
            )}
          </div>
        </FormSection>

        <div className="col-span-2 flex items-start gap-2 py-6">
          <Checkbox
            {...register("general_consent", {
              required: {
                value: true,
                message: "Wajib diisi",
              },
            })}
          />
          <Label htmlFor="general_consent">
            <Typography>
              Pasien telah diberikan penjelasan mengenai <i>General Consent</i>{" "}
              atau Persetujuan Umum.
              <Typography link as="span" className="cursor-pointer ">
                Klik disini untuk cetak <i>General Consent</i>
              </Typography>
            </Typography>
          </Label>
        </div>
        <Button type="submit" color="primary" className="w-full">
          Simpan
        </Button>
      </form>

      <PatientSummary
        data={constructSummaryAdult({ isBaby, data: formData })}
        open={showConfirmation}
        onClose={() => setShowConfirmation(false)}
        onContinue={handleConfirm}
      />
    </>
  );
};

export default FormAdult;
