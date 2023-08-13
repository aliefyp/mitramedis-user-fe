import { useEffect, useState } from "react";
import PageHeading from "components/PageHeading";
import Card from "components/Card";
import Toggle from "components/Toggle";
import FormNewborn from "./components/FormNewborn";
import FormAdult from "./components/FormAdult";
import { PatientType } from "types/patient";
import { useAddPatient } from "api/patient";
import { NEWBORN_PREFIX } from "./constants";
import { useNavigate } from "react-router-dom";
import useToaster from "context/ToasterContext";

interface PasienFormProps {
  type: "new" | "edit";
}

const PasienForm = ({ type }: PasienFormProps) => {
  const [isNewborn, setNewborn] = useState(false);
  const [createdPatient, setCreatedPatient] = useState<
    { patient_name: string } | undefined
  >(undefined);
  const addPatient = useAddPatient();
  const navigate = useNavigate();
  const { open: openToaster } = useToaster();

  const isEdit = type === "edit";

  const handleSubmit = (values: PatientType) => {
    setCreatedPatient(values);

    addPatient.mutate({
      ...values,
      is_baby: Number(isNewborn),
      name_prefix: Number(isNewborn),
    });
  };

  useEffect(() => {
    if (addPatient.isSuccess) {
      navigate("/", {
        state: {
          modal: {
            key: "new-patient",
            data: {
              ...createdPatient,
              ...addPatient.data?.data,
            },
          },
        },
      });
    }

    if (addPatient.isError) {
      openToaster({
        title: "Data pasien gagal disimpan",
        message: "Silahkan ulangi kembali setelah beberapa saat",
        variant: "error",
        autoClose: false,
      });
    }
  }, [
    addPatient.data?.data,
    addPatient.error,
    addPatient.isError,
    addPatient.isSuccess,
    createdPatient,
    navigate,
    openToaster,
  ]);

  return (
    <div>
      <PageHeading
        title={isEdit ? "Ubah Data Pasien" : "Pendaftaran Pasien Baru"}
        breadcrumbs={[
          { text: "Pasien", url: "/pasien" },
          isEdit ? { text: "Ubah Data Pasien" } : { text: "Pasien Baru" },
        ]}
      />
      <Card className="max-w-screen-lg rounded-2xl border-none p-6 shadow-sm">
        <div className="col-span-2 border-b pb-4">
          <Toggle
            value={isNewborn}
            onSwitch={setNewborn}
            className="order-2 md:order-1"
          >
            Pasien adalah bayi baru lahir
          </Toggle>
        </div>
        {isNewborn && (
          <FormNewborn namePrefix={NEWBORN_PREFIX} onSubmit={handleSubmit} />
        )}
        {!isNewborn && <FormAdult onSubmit={handleSubmit} />}
      </Card>
    </div>
  );
};

export default PasienForm;
