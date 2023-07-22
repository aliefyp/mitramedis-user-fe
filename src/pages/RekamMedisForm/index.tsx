import { useState } from "react";
import Card from "components/Card";
import PageHeading from "components/PageHeading";
import Stepper from "components/Stepper";
import Typography from "components/Typography";
import Button from "components/Button";
import CardPatientSummary from "./components/CardPatientSummary";
import Step1Anamnesis from "./components/Step1Anamnesis";
import Step2PhysicalInspection from "./components/Step2PhysicalInspection";
import Step3Diagnose from "./components/Step3Diagnose";
import Step4Action from "./components/Step4Action";
import Step5Prescription from "./components/Step5Prescription";
import Step6Billing from "./components/Step6Billing";

const STEPS = [
  "Anamnesis",
  "Pemeriksaan Fisik",
  "Diagnosis",
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
      <div className="top-0 z-20 mb-4">
        <Stepper
          activeIndex={activeIndex}
          steps={STEPS}
          onClick={(index) => setActiveIndex(index)}
        />
      </div>
      <div className="flex max-w-screen-2xl gap-4 md:min-w-[800px]">
        <div className="grow pb-4">
          <Card>
            <div className="border-b px-6 py-4">
              <Typography as="h2" className=" text-xl font-bold tracking-tight">
                {STEPS[activeIndex]}
              </Typography>
              <Typography as="div" className=" text-sm text-gray-500">
                {`Langkah ${activeIndex + 1} dari ${STEPS.length}`}
              </Typography>
            </div>
            <div className="px-6">
              {activeIndex === 0 && <Step1Anamnesis />}
              {activeIndex === 1 && <Step2PhysicalInspection />}
              {activeIndex === 2 && <Step3Diagnose />}
              {activeIndex === 3 && <Step4Action />}
              {activeIndex === 4 && <Step5Prescription />}
              {activeIndex === 5 && <Step6Billing />}
            </div>
            <div className="fixed bottom-0 left-0 right-0 z-10 flex items-center justify-between space-x-2 border-t bg-white p-3 shadow-md md:static md:bg-transparent md:p-6 md:shadow-none">
              <div className="shrink-0">
                <div className="block md:hidden">
                  <Stepper
                    activeIndex={activeIndex}
                    steps={STEPS}
                    onClick={(index) => setActiveIndex(index)}
                  />
                </div>
              </div>
              <div className="flex shrink-0 items-center gap-2 ">
                {activeIndex > 0 && (
                  <Button
                    type="button"
                    color="ghost-primary"
                    onClick={handleBackClick}
                  >
                    Kembali
                  </Button>
                )}
                <Button
                  type="button"
                  onClick={handleNextClick}
                  className="md:px-12"
                >
                  {isLastStep ? "Simpan" : "Lanjut"}
                </Button>
              </div>
            </div>
          </Card>
        </div>
        <div className="sticky top-0 w-full shrink-0 md:w-[240px] xl:w-[320px]">
          <CardPatientSummary />
        </div>
      </div>
      <div
        aria-label="bottom spacer"
        className="block h-[80px] w-full md:hidden"
      />
    </div>
  );
};

export default RekamMedisForm;
