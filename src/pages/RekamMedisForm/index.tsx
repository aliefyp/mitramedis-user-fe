import { useState } from "react";
import Card from "components/Card";
import PageHeading from "components/PageHeading";
import Stepper from "components/Stepper";
import Typography from "components/Typography";
import Button from "components/Button";
import PatientSummary from "./components/PatientSummary";
import FormAnamnesa from "./components/FormAnamnesa";

const STEPS = [
  "Anamnesa",
  "Pemeriksaan Fisik",
  "Diagnosa",
  "KIE & Tindakan",
  "Resep Obat",
  "Billing",
];

interface RekamMedisFormProps {
  type: "new" | "edit";
}

const RekamMedisForm = ({ type }: RekamMedisFormProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const isEdit = type === "edit";
  const isLastStep = activeIndex === STEPS.length - 1;

  const handleBackClick = () => {
    setActiveIndex((activeIndex - 1) % STEPS.length);
  };

  const handleNextClick = () => {
    setActiveIndex((activeIndex + 1) % STEPS.length);
  };

  return (
    <div>
      <PageHeading
        title={isEdit ? "Update Data Rekam Medis" : "Rekam Medis Baru"}
        breadcrumbs={[
          { text: "Rekam Medis", url: "/rekam-medis" },
          { text: isEdit ? "Ubah Data Rekam Medis" : "Rekam Medis Baru" },
        ]}
      />
      <div className=" grid max-w-screen-2xl grid-cols-10 gap-4 md:min-w-[800px]">
        <div className="col-span-10 md:col-span-4 lg:col-span-3">
          <div className="flex flex-col gap-4 md:gap-8">
            <div className="order-2 md:order-1">
              <PatientSummary />
            </div>
            <div className="order-1 md:order-2">
              <Stepper activeIndex={activeIndex} steps={STEPS} />
            </div>
          </div>
        </div>
        <div className="col-span-10 md:col-span-6 lg:col-span-7">
          <Card className="rounded-2xl border-none shadow-sm">
            <div className="flex items-center justify-between border-b p-6">
              <Typography as="h2" className=" text-xl font-bold text-slate-800">
                {STEPS[activeIndex]}
              </Typography>
              <div className="fixed bottom-0 left-0 right-0 z-10 flex justify-end space-x-2 bg-mm-purple-100 p-2 shadow-md md:static md:bg-transparent md:p-0 md:shadow-none">
                {activeIndex > 0 && (
                  <Button
                    type="button"
                    color="ghost-primary"
                    onClick={handleBackClick}
                  >
                    Kembali
                  </Button>
                )}
                <Button type="button" onClick={handleNextClick}>
                  {isLastStep ? "Simpan" : "Lanjut"}
                </Button>
              </div>
            </div>
            <div className="p-6">
              <FormAnamnesa />
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default RekamMedisForm;
