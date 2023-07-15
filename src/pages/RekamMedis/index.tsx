import { useState } from "react";
import PageHeading from "components/PageHeading";
import MedicalRecordFilterFilter from "./components/MedicalRecordFilter";
import MedicalRecordTable from "./components/MedicalRecordTable";
import ModalMedicalRecordPreview from "./components/ModalMedicalRecordPreview";

const MedicalRecordPage = () => {
  const [showPreview, setShowPreview] = useState(false);
  // const [searchText, setSearchText] = useState("");
  // const [value] = useDebounce(searchText, 500);

  // const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setSearchText(event.target.value.trim());
  // };

  return (
    <div>
      <PageHeading
        title="Data Rekam Medis"
        breadcrumbs={[{ text: "Rekam Medis" }]}
      />
      <div className="space-y-4">
        <MedicalRecordFilterFilter />
        <MedicalRecordTable onPreview={() => setShowPreview(true)} />
      </div>
      <ModalMedicalRecordPreview
        open={showPreview}
        onClose={() => setShowPreview(false)}
      />
    </div>
  );
};

export default MedicalRecordPage;
