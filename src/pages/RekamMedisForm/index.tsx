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
import Step6Status from "./components/Step6Status";
import Step7Billing from "./components/Step7Billing";
import {
  MEDICAL_FORM_STEPS as STEPS,
  DEFAULT_STEP_1,
  DEFAULT_STEP_2,
  DEFAULT_STEP_4,
  DEFAULT_STEP_5,
  DEFAULT_STEP_6,
} from "./constants";

interface RekamMedisFormProps {
  type: "new" | "edit";
}

const RekamMedisForm = ({ type }: RekamMedisFormProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [formValues, setFormValues] = useState({
    1: DEFAULT_STEP_1,
    2: DEFAULT_STEP_2,
    3: [],
    4: DEFAULT_STEP_4,
    5: DEFAULT_STEP_5,
    6: DEFAULT_STEP_6,
  });

  const activeStep = STEPS[activeIndex];
  const formLength = STEPS.length;
  const isEdit = type === "edit";
  const isLastStep = activeIndex === STEPS.length - 1;

  console.log(formValues);

  const handleBackClick = () => {
    setActiveIndex((activeIndex - 1) % STEPS.length);
  };

  const handleSubmitForm = (step, val) => {
    setFormValues({ ...formValues, [step]: val });
    setActiveIndex((activeIndex + 1) % STEPS.length);
  };

  const Navigation = () => (
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
          <Button type="button" color="ghost-primary" onClick={handleBackClick}>
            Kembali
          </Button>
        )}
        <Button type="submit" className="md:px-12">
          {isLastStep ? "Simpan" : "Lanjut"}
        </Button>
      </div>
    </div>
  );

  return (
    <div>
      <PageHeading
        title={isEdit ? "Update Data Rekam Medis" : "Rekam Medis Baru"}
        breadcrumbs={[
          { text: "Rekam Medis", url: "/rekam-medis" },
          { text: isEdit ? "Ubah Data Rekam Medis" : "Rekam Medis Baru" },
        ]}
      />
      <div className="z-20 mb-4 hidden md:block">
        <Stepper
          activeIndex={activeIndex}
          steps={STEPS}
          onClick={(index) => setActiveIndex(index)}
        />
      </div>
      <div className="flex max-w-screen-2xl flex-col gap-4 md:min-w-[800px] md:flex-row">
        <div className="order-2 grow pb-4 md:order-1">
          <Card>
            <div className="border-b px-6 py-4">
              <Typography as="h2" className=" text-xl font-bold tracking-tight">
                {activeStep}
              </Typography>
              <Typography as="div" className=" text-sm text-gray-500">
                {`Langkah ${activeIndex + 1} dari ${formLength}`}
              </Typography>
            </div>
            <div>
              <Step1Anamnesis
                show={activeIndex === 0}
                defaultValues={formValues[1]}
                navigation={<Navigation />}
                onSubmit={(val) => handleSubmitForm(1, val)}
              />
              <Step2PhysicalInspection
                show={activeIndex === 1}
                defaultValues={formValues[2]}
                navigation={<Navigation />}
                onSubmit={(val) => handleSubmitForm(2, val)}
              />
              <Step3Diagnose
                show={activeIndex === 2}
                defaultValues={formValues[3]}
                navigation={<Navigation />}
                onSubmit={(val) => handleSubmitForm(3, val)}
              />
              <Step4Action
                show={activeIndex === 3}
                defaultValues={formValues[4]}
                navigation={<Navigation />}
                onSubmit={(val) => handleSubmitForm(4, val)}
              />
              <Step5Prescription
                show={activeIndex === 4}
                defaultValues={formValues[5]}
                navigation={<Navigation />}
                onSubmit={(val) => handleSubmitForm(5, val)}
              />
              <Step6Status
                show={activeIndex === 5}
                defaultValues={formValues[6]}
                navigation={<Navigation />}
                onSubmit={(val) => handleSubmitForm(6, val)}
              />
              <Step7Billing
                show={activeIndex === 6}
                navigation={<Navigation />}
                onSubmit={() => handleSubmitForm(7, {})}
              />
            </div>
          </Card>
        </div>
        <div className="order-1 w-full shrink-0 md:order-2 md:w-[240px] xl:w-[320px]">
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
