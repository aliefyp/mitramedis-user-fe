import { useState } from "react";
import PageHeading from "components/PageHeading";
import PasienFilter from "./components/PasienFilter";
import PasienTable from "./components/PasienTable";
import PasienPreviewModal from "./components/PasienPreviewModal";

const PasienPage = () => {
  const [showPreview, setShowPreview] = useState(false);
  // const [searchText, setSearchText] = useState("");
  // const [value] = useDebounce(searchText, 500);

  // const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setSearchText(event.target.value.trim());
  // };

  return (
    <div>
      <PageHeading title="Pasien" breadcrumbs={[{ text: "Pasien" }]} />
      <div className="space-y-4">
        <PasienFilter />
        <PasienTable onPreview={() => setShowPreview(true)} />
      </div>
      <PasienPreviewModal
        open={showPreview}
        onClose={() => setShowPreview(false)}
      />
    </div>
  );
};

export default PasienPage;
