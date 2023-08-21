import { useForm } from "react-hook-form";
import TextArea from "components/FormInput/TextArea";
import Toggle from "components/Toggle";
import { useState } from "react";
import Label from "components/FormInput/Label";
import type { FormAnamnesisType } from "../interface";

const Step1Anamnesis = ({ show, defaultValues, navigation, onSubmit }) => {
  const [showIllness, setShowIllness] = useState(false);
  const [showAllergy, setShowAllergy] = useState(false);
  const [showTreatment, setShowTreatment] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormAnamnesisType>({ defaultValues });

  const submitForm = (val: FormAnamnesisType) => {
    onSubmit(val);
  };

  if (!show) return null;

  return (
    <form onSubmit={handleSubmit(submitForm)}>
      <div className="grid gap-6 p-6">
        <TextArea
          rows={1}
          required
          label="Keluhan Utama"
          error={Boolean(errors?.main_complaint)}
          helper={errors?.main_complaint?.message}
          placeholder="Tuliskan keluhan utama pasien"
          {...register("main_complaint", {
            required: {
              value: true,
              message: "Wajib diisi",
            },
          })}
        />

        <TextArea
          required
          label="Riwayat Penyakit Sekarang"
          error={Boolean(errors?.medical_history_recent)}
          helper={errors?.medical_history_recent?.message}
          placeholder="Tuliskan riwayat penyakit yang dialami pasien saat ini"
          {...register("medical_history_recent", {
            required: {
              value: true,
              message: "Wajib diisi",
            },
          })}
        />

        <div className="grid gap-2">
          <Toggle value={showIllness} onSwitch={setShowIllness}>
            <Label>Ada Riwayat Penyakit Terdahulu</Label>
          </Toggle>
          {showIllness && (
            <TextArea
              required={showIllness}
              autoFocus={showIllness}
              error={Boolean(errors?.medical_history_past)}
              helper={errors?.medical_history_past?.message}
              placeholder="Riwayat penyakit yang pernah diderita oleh pasien"
              {...register("medical_history_past", {
                required: {
                  value: showIllness,
                  message: "Wajib diisi",
                },
              })}
            />
          )}
        </div>

        <div className="grid gap-2">
          <Toggle value={showAllergy} onSwitch={setShowAllergy}>
            <Label>Ada Riwayat Alergi</Label>
          </Toggle>
          {showAllergy && (
            <TextArea
              required={showAllergy}
              autoFocus={showAllergy}
              error={Boolean(errors?.note_allergy_history)}
              helper={errors?.note_allergy_history?.message}
              placeholder="Riwayat alergi yang pernah dialami oleh pasien"
              {...register("note_allergy_history", {
                required: {
                  value: showAllergy,
                  message: "Wajib diisi",
                },
              })}
            />
          )}
        </div>

        <div className="grid gap-2">
          <Toggle value={showTreatment} onSwitch={setShowTreatment}>
            <Label>Ada Riwayat Pengobatan</Label>
          </Toggle>
          {showTreatment && (
            <TextArea
              required={showTreatment}
              autoFocus={showTreatment}
              error={Boolean(errors?.note_medical_treatment_history)}
              helper={errors?.note_medical_treatment_history?.message}
              placeholder="Riwayat obat-obatan yang pernah dikonsumsi oleh pasien"
              {...register("note_medical_treatment_history", {
                required: {
                  value: showTreatment,
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
