import { useForm } from "react-hook-form";
import TextArea from "components/FormInput/TextArea";
import Toggle from "components/Toggle";
import { useState } from "react";
import Typography from "components/Typography";
import Label from "components/FormInput/Label";

interface FormAnamnesisType {
  main_complaint: string;
  medical_history_recent: string;
  medical_history_past: string;
  has_allergy_history: boolean;
  note_allergy_history: string;
  has_medical_treatment_history: boolean;
  note_medical_treatment_history: string;
}

const FormAnamnesis = () => {
  const [showPastMedicalHistory, setShowPastMedicalHistory] = useState(false);
  const [showAllergyNote, setShowAllergyNote] = useState(false);
  const [showMedicalTreatmentNote, setShowMedicalTreatmentNote] =
    useState(false);
  const { register, handleSubmit } = useForm<FormAnamnesisType>();

  const onSubmit = (val: FormAnamnesisType) => {
    console.log(val);
  };

  return (
    <form className="grid grid-cols-3 py-6" onSubmit={handleSubmit(onSubmit)}>
      <div className="col-span-3 grid gap-6 2xl:col-span-2">
        <TextArea
          label="Keluhan Utama"
          placeholder="Tuliskan keluhan utama pasien"
          {...register("main_complaint")}
        />

        <TextArea
          label="Riwayat Penyakit Sekarang"
          placeholder="Tuliskan riwayat penyakit yang dialami pasien saat ini"
          {...register("medical_history_recent")}
        />

        <div className="grid gap-2">
          <Toggle
            value={showPastMedicalHistory}
            onSwitch={setShowPastMedicalHistory}
          >
            <Label>Ada Riwayat Penyakit Terdahulu</Label>
          </Toggle>
          {showPastMedicalHistory && (
            <TextArea
              autoFocus={showPastMedicalHistory}
              placeholder="Riwayat penyakit yang pernah diderita oleh pasien"
              {...register("medical_history_past")}
            />
          )}
        </div>

        <div className="grid gap-2">
          <Toggle value={showAllergyNote} onSwitch={setShowAllergyNote}>
            <Label>Ada Riwayat Alergi</Label>
          </Toggle>
          {showAllergyNote && (
            <TextArea
              autoFocus={showAllergyNote}
              placeholder="Riwayat alergi yang pernah dialami oleh pasien"
              {...register("note_allergy_history")}
            />
          )}
        </div>

        <div className="grid gap-2">
          <Toggle
            value={showMedicalTreatmentNote}
            onSwitch={setShowMedicalTreatmentNote}
          >
            <Label>Ada Riwayat Pengobatan</Label>
          </Toggle>
          {showMedicalTreatmentNote && (
            <TextArea
              autoFocus={showMedicalTreatmentNote}
              placeholder="Riwayat obat-obatan yang pernah dikonsumsi oleh pasien"
              {...register("note_medical_treatment_history")}
            />
          )}
        </div>
      </div>
    </form>
  );
};

export default FormAnamnesis;
