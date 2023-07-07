import { useForm } from "react-hook-form";
import TextArea from "components/TextArea";
import Toggle from "components/Toggle";
import { useState } from "react";

interface FormAnamnesaType {
  main_complaint: string;
  medical_history_recent: string;
  medical_history_past: string;
  has_allergy_history: boolean;
  note_allergy_history: string;
  has_medical_treatment_history: boolean;
  note_medical_treatment_history: string;
}

const FormAnamnesa = () => {
  const [showAllergyNote, setShowAllergyNote] = useState(false);
  const [showMedicalTreatmentNote, setShowMedicalTreatmentNote] =
    useState(false);
  const { register, handleSubmit } = useForm<FormAnamnesaType>();

  const onSubmit = (val: FormAnamnesaType) => {
    console.log(val);
  };

  return (
    <form className="grid gap-6" onSubmit={handleSubmit(onSubmit)}>
      <TextArea
        label="Keluhan Utama"
        placeholder="Ceritakan keluhan utama pasien"
        // className="col-span-2"
        {...register("main_complaint")}
      />

      <TextArea
        label="Riwayat Penyakit Sekarang"
        placeholder="Penyakit yang baru dialami oleh pasien"
        // className="col-span-2"
        {...register("medical_history_recent")}
      />

      <TextArea
        label="Riwayat Penyakit Terdahulu"
        placeholder="Penyakit yang pernah dialami oleh pasien"
        // className="col-span-2"
        {...register("medical_history_past")}
      />

      <div className="grid gap-2">
        <Toggle value={showAllergyNote} onSwitch={setShowAllergyNote}>
          Ada Riwayat Alergi
        </Toggle>
        {showAllergyNote && (
          <TextArea
            autoFocus={showAllergyNote}
            placeholder="Ceritakan riwayat alergi pasien"
            // className="col-span-2"
            {...register("note_allergy_history")}
          />
        )}
      </div>

      <div className="grid gap-2">
        <Toggle
          value={showMedicalTreatmentNote}
          onSwitch={setShowMedicalTreatmentNote}
        >
          Ada Riwayat Pengobatan
        </Toggle>
        {showMedicalTreatmentNote && (
          <TextArea
            autoFocus={showMedicalTreatmentNote}
            placeholder="Ceritakan riwayat pengobatan pasien"
            // className="col-span-2"
            {...register("note_medical_treatment_history")}
          />
        )}
      </div>
    </form>
  );
};

export default FormAnamnesa;
