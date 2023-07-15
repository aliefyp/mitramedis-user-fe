import { useState } from "react";
import PageHeading from "components/PageHeading";
import StokFilter from "./components/StokFilter";
import StokTable from "./components/StokTable";
import ModalStokPreview from "./components/ModalStokPreview";
import ModalNewStok from "./components/ModalNewStok";

const StokPage = () => {
  const [showPreview, setShowPreview] = useState(false);
  const [showForm, setShowForm] = useState(false);
  // const [searchText, setSearchText] = useState("");
  // const [value] = useDebounce(searchText, 500);

  // const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setSearchText(event.target.value.trim());
  // };

  return (
    <div>
      <PageHeading
        title="Data Stok Obat dan BHP (Bahan Habis Pakai)"
        breadcrumbs={[{ text: "Stok" }]}
      />
      <div className="space-y-4">
        <StokFilter onAddNew={() => setShowForm(true)} />
        <StokTable onPreview={() => setShowPreview(true)} />
      </div>
      <ModalNewStok
        open={showForm}
        onClose={() => setShowForm(false)}
        onSubmit={console.log}
      />
      <ModalStokPreview
        open={showPreview}
        onClose={() => setShowPreview(false)}
      />
    </div>
  );
};

export default StokPage;
