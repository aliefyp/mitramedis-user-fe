import { Controller, useForm } from "react-hook-form";
import type { FormAnamnesisType } from "../interface";
import { Label, Textarea, ToggleSwitch } from "flowbite-react";

const Step1Anamnesis = ({ show, defaultValues, navigation, onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    watch,
  } = useForm<FormAnamnesisType>({ defaultValues });

  const watchMedicalHistory = watch("has_medical_history_past");
  const watchAllergyHistory = watch("has_allergy_history");
  const watchTreatmentHistory = watch("has_medical_treatment_history");

  const submitForm = (val: FormAnamnesisType) => {
    onSubmit(val);
  };

  if (!show) return null;

  return (
    <form noValidate onSubmit={handleSubmit(submitForm)}>
      <div className="grid gap-6 p-6">
        <div>
          <Label htmlFor="main_complaint" value="Keluhan Utama" />
          <Textarea
            rows={1}
            required
            color={Boolean(errors?.main_complaint) ? "failure" : "gray"}
            helperText={errors?.main_complaint?.message}
            placeholder="Tuliskan keluhan utama pasien"
            {...register("main_complaint", {
              required: {
                value: true,
                message: "Wajib diisi",
              },
            })}
          />
        </div>

        <div>
          <Label
            htmlFor="medical_history_recent"
            value="Riwayat Penyakit Sekarang"
          />
          <Textarea
            required
            color={Boolean(errors?.medical_history_recent) ? "failure" : "gray"}
            helperText={errors?.medical_history_recent?.message}
            placeholder="Tuliskan riwayat penyakit yang dialami pasien saat ini"
            {...register("medical_history_recent", {
              required: {
                value: true,
                message: "Wajib diisi",
              },
            })}
          />
        </div>

        <div className="grid gap-2">
          <Controller
            control={control}
            name="has_medical_history_past"
            render={({ field: { onChange, value } }) => (
              <ToggleSwitch
                label="Ada Riwayat Penyakit Terdahulu"
                checked={Boolean(value)}
                onChange={onChange}
              />
            )}
          />

          {watchMedicalHistory && (
            <Textarea
              required={watchMedicalHistory}
              autoFocus={watchMedicalHistory}
              color={Boolean(errors?.medical_history_past) ? "failure" : "gray"}
              helperText={errors?.medical_history_past?.message}
              placeholder="Riwayat penyakit yang pernah diderita oleh pasien"
              {...register("medical_history_past", {
                required: {
                  value: watchMedicalHistory,
                  message: "Wajib diisi",
                },
              })}
            />
          )}
        </div>

        <div className="grid gap-2">
          <Controller
            control={control}
            name="has_allergy_history"
            render={({ field: { onChange, value } }) => (
              <ToggleSwitch
                label="Ada Riwayat Alergi"
                checked={Boolean(value)}
                onChange={onChange}
              />
            )}
          />
          {watchAllergyHistory && (
            <Textarea
              required={watchAllergyHistory}
              autoFocus={watchAllergyHistory}
              color={Boolean(errors?.note_allergy_history) ? "failure" : "gray"}
              helperText={errors?.note_allergy_history?.message}
              placeholder="Riwayat alergi yang pernah dialami oleh pasien"
              {...register("note_allergy_history", {
                required: {
                  value: watchAllergyHistory,
                  message: "Wajib diisi",
                },
              })}
            />
          )}
        </div>

        <div className="grid gap-2">
          <Controller
            control={control}
            name="has_medical_treatment_history"
            render={({ field: { onChange, value } }) => (
              <ToggleSwitch
                label="Ada Riwayat Pengobatan"
                checked={Boolean(value)}
                onChange={onChange}
              />
            )}
          />

          {watchTreatmentHistory && (
            <Textarea
              required={watchTreatmentHistory}
              autoFocus={watchTreatmentHistory}
              color={
                Boolean(errors?.note_medical_treatment_history)
                  ? "failure"
                  : "gray"
              }
              helperText={errors?.note_medical_treatment_history?.message}
              placeholder="Riwayat obat-obatan yang pernah dikonsumsi oleh pasien"
              {...register("note_medical_treatment_history", {
                required: {
                  value: watchTreatmentHistory,
                  message: "Wajib diisi",
                },
              })}
            />
          )}
        </div>
      </div>
      {navigation}
    </form>
  );
};

export default Step1Anamnesis;
