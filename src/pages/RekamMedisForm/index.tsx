import { useEffect, useRef, useState } from "react";
import Card from "components/Card";
import useAppContext from "context/AppContext";
import PageHeading from "components/PageHeading";
import Stepper from "components/Stepper";
import Typography from "components/Typography";
import Button from "components/Button";
import PatientSummary from "./components/PatientSummary";
import FormAnamnesis from "./components/FormAnamnesis";
import FormPemeriksaanFisik from "./components/FormPemeriksaanFisik";
import FormDiagnosis from "./components/FormDiagnosis";
import FormTindakan from "./components/FormTindakan";
import FormResepObat from "./components/FormResepObat";
import FormBilling from "./components/FormBilling";

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
  const formRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const isEdit = type === "edit";
  const isLastStep = activeIndex === STEPS.length - 1;
  const { isMobile } = useAppContext();
  const [height, setHeight] = useState("unset");

  const handleBackClick = () => {
    setActiveIndex((activeIndex - 1) % STEPS.length);
  };

  const handleNextClick = () => {
    setActiveIndex((activeIndex + 1) % STEPS.length);
  };

  useEffect(() => {
    if (formRef.current && height === "unset") {
      try {
        if (isMobile) {
          setHeight("auto");
        } else {
          const windowHeight = window.innerHeight;
          const toleranceHeight = 48;
          const formOffset = (formRef.current as HTMLDivElement).offsetTop;
          setHeight(`${windowHeight - toleranceHeight - formOffset}px`);
        }
      } catch (err) {
        setHeight("auto");
      }
    }
  }, [height, isMobile]);

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
            <div className="order-1 hidden md:order-2 md:block">
              <Stepper activeIndex={activeIndex} steps={STEPS} />
            </div>
          </div>
        </div>
        <div className="col-span-10 md:col-span-6 lg:col-span-7">
          <Card className="rounded-2xl border-none shadow-sm">
            <div className="flex items-center justify-between border-b p-6">
              <div>
                <Typography
                  as="h2"
                  className=" text-xl font-bold text-slate-800"
                >
                  {STEPS[activeIndex]}
                </Typography>
                <Typography as="div" className=" text-sm text-gray-500">
                  {`Langkah ${activeIndex + 1} dari ${STEPS.length}`}
                </Typography>
              </div>
              <div className="fixed bottom-0 left-0 right-0 z-10 flex items-center justify-between space-x-2 border-t bg-white p-3 shadow-md md:static md:border-none md:bg-transparent md:p-0 md:shadow-none">
                <div className="block shrink-0 md:hidden">
                  <Stepper activeIndex={activeIndex} steps={STEPS} />
                </div>
                <div className="flex shrink-0 items-center gap-2">
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
            </div>
            <div
              ref={formRef}
              id="form-content"
              className="overflow-y-scroll p-6"
              style={{ height }}
            >
              {activeIndex === 0 && <FormAnamnesis />}
              {activeIndex === 1 && <FormPemeriksaanFisik />}
              {activeIndex === 2 && <FormDiagnosis />}
              {activeIndex === 3 && <FormTindakan />}
              {activeIndex === 4 && <FormResepObat />}
              {activeIndex === 5 && <FormBilling />}
            </div>
          </Card>
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
