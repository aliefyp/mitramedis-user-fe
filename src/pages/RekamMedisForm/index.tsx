import { useState } from "react";
import { useForm } from "react-hook-form";
import Card from "components/Card";
import PageHeading from "components/PageHeading";
import Stepper from "components/Stepper";
import Typography from "components/Typography";
import TextArea from "components/TextArea";
import Toggle from "components/Toggle";
import Button from "components/Button";

const STEPS = [
  "Anamnesa",
  "Pemeriksaan Fisik",
  "Diagnosa",
  "Terapi",
  "Tindakan",
  "KIE",
  "Resep Obat",
];

interface RekamMedisFormProps {
  type: "new" | "edit";
}

interface RekamMedisFormType {
  main_complaint: string;
  medical_history_recent: string;
  medical_history_past: string;
  has_allergy_history: boolean;
  note_allergy_history: string;
  has_medical_treatment_history: boolean;
  note_medical_treatment_history: string;
}

const RekamMedisForm = ({ type }: RekamMedisFormProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [showAllergyNote, setShowAllergyNote] = useState(false);
  const [showMedicalTreatmentNote, setShowMedicalTreatmentNote] =
    useState(false);
  const isEdit = type === "edit";
  const { register, handleSubmit } = useForm<RekamMedisFormType>();

  const onSubmit = (val: RekamMedisFormType) => {
    console.log(val);
  };

  return (
    <div>
      <PageHeading
        title={isEdit ? "Update Data Rekam Medis" : "Rekam Medis Baru"}
        breadcrumbs={[
          { text: "Rekam Medis", url: "/rekammedis" },
          isEdit
            ? { text: "Ubah Data Rekam Medis" }
            : { text: "Rekam Medis Baru" },
        ]}
      />
      <div className=" grid min-w-full max-w-screen-2xl grid-cols-4 gap-4">
        <div className="col-span-4 md:col-span-1">
          <Stepper activeIndex={activeIndex} steps={STEPS} />
        </div>
        <div className="col-span-4 md:col-span-3">
          <Card className="rounded-2xl border-none p-6 shadow-sm">
            <form className="grid gap-6" onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-2 flex items-center justify-between">
                <Typography as="h2" bold className=" text-xl">
                  {STEPS[activeIndex]}
                </Typography>
                <div className="fixed bottom-0 left-0 right-0 flex justify-end space-x-2 bg-white p-2 md:static md:bg-transparent md:p-0">
                  <Button
                    type="button"
                    color="ghost-primary"
                    onClick={() =>
                      setActiveIndex((activeIndex - 1) % STEPS.length)
                    }
                  >
                    Kembali
                  </Button>
                  <Button
                    type="button"
                    onClick={() =>
                      setActiveIndex((activeIndex + 1) % STEPS.length)
                    }
                  >
                    {activeIndex === STEPS.length - 1 ? "Simpan" : "Lanjut"}
                  </Button>
                </div>
              </div>
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
          </Card>
        </div>
      </div>
    </div>
  );
};

export default RekamMedisForm;
