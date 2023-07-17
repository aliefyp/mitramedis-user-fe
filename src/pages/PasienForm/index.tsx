import PageHeading from "components/PageHeading";
import Card from "components/Card";
import Toggle from "components/Toggle";
import { useState } from "react";
import FormNewborn from "./components/FormNewborn";
import FormAdult from "./components/FormAdult";
import Typography from "components/Typography";

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
      <Card className="mx-auto max-w-screen-lg rounded-2xl border-none p-6 shadow-sm">
        <div className="col-span-2 flex flex-col items-start justify-between gap-4 border-b pb-4 md:flex-row md:items-center">
          <Toggle
            value={isNewborn}
            onSwitch={setNewborn}
            className="order-2 md:order-1"
          >
            Pasien adalah bayi baru lahir
          </Toggle>

          <div className="order-1 inline-block rounded-md bg-lime-500 px-2 py-1 md:order-2">
            <Typography bold className="text-lg text-white">
              RM 002121123
            </Typography>
          </div>
        </div>
        {isNewborn && <FormNewborn />}
        {!isNewborn && <FormAdult />}
      </Card>
    </div>
  );
};

export default PasienForm;
