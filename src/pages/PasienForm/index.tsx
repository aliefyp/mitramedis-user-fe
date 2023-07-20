import { useState } from "react";
import { FaBabyCarriage } from "react-icons/fa";
import PageHeading from "components/PageHeading";
import Card from "components/Card";
import Toggle from "components/Toggle";
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
            <FaBabyCarriage className="text-gray-500" />
            Pasien adalah bayi baru lahir
          </Toggle>

          <Typography bold className="order-1 text-lg text-lime-600 md:order-2">
            RM 002121123
          </Typography>
        </div>
        {isNewborn && <FormNewborn />}
        {!isNewborn && <FormAdult />}
      </Card>
    </div>
  );
};

export default PasienForm;
