import PageHeading from "components/PageHeading";
import Card from "components/Card";
import Toggle from "components/Toggle";
import { useState } from "react";
import FormNewborn from "./components/FormNewborn";
import FormAdult from "./components/FormAdult";

interface PasienFormProps {
  type: "new" | "edit";
}

const PasienForm = ({ type }: PasienFormProps) => {
  const [isNewborn, setNewborn] = useState(false);
  const isEdit = type === "edit";

  return (
    <div>
      <PageHeading
        title={isEdit ? "Update Data Pasien" : "Pendaftaran Pasien Baru"}
        breadcrumbs={[
          { text: "Pasien", url: "/pasien" },
          isEdit ? { text: "Ubah Data Pasien" } : { text: "Pasien Baru" },
        ]}
      />
      <Card className="max-w-screen-md rounded-2xl border-none p-6 shadow-sm">
        <div className="col-span-2 border-b pb-4">
          <Toggle value={isNewborn} onSwitch={setNewborn}>
            Pasien adalah bayi baru lahir
          </Toggle>
        </div>
        {isNewborn && <FormNewborn />}
        {!isNewborn && <FormAdult />}
      </Card>
    </div>
  );
};

export default PasienForm;
