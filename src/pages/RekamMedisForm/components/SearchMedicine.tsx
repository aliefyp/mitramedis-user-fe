import { useState } from "react";
import Button from "components/Button";
import Input from "components/FormInput/Input";
import Modal from "components/Modal";
import Typography from "components/Typography";
import { useNavigate } from "react-router-dom";
import SearchMedicineItemDisplay from "./SearchMedicineItemDisplay";

const DUMMY_OBAT = [
  { name: "Mixagrip" },
  { name: "Ultraflu" },
  { name: "Panadol" },
];

interface MedicineType {
  name: string;
}

interface SearchMedicineProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (val: MedicineType) => void;
}

const SearchMedicine = ({ open, onClose, onSubmit }: SearchMedicineProps) => {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  return (
    <Modal open={open} onClose={onClose}>
      <div className="px-8 py-8">
        <Typography as="h1" className="mb-4 text-2xl font-bold">
          Cari Nama Obat
        </Typography>

        <div className=" space-y-4">
          <Input
            name="search_pasien"
            type="text"
            placeholder="Ketik nama obat"
            onChange={handleSearchChange}
            autoComplete="off"
          />
          <div>
            {Boolean(query) &&
              DUMMY_OBAT.filter((item) => {
                const pasienName = item.name.trim().toLocaleLowerCase();
                const queryName = query.trim().toLocaleLowerCase();
                return pasienName.includes(queryName);
              }).map((item) => (
                <SearchMedicineItemDisplay
                  item={item}
                  onClick={() => onSubmit(item)}
                />
              ))}
          </div>
          <div className="flex items-center justify-end gap-4 pt-8">
            {/* <Typography className="text-sm text-gray-500">
              Tidak dapat menemukan pasien?
            </Typography> */}
            <Button
              type="button"
              color="primary"
              onClick={() => navigate("/pasien/new")}
            >
              <Typography>Tambahkan</Typography>
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default SearchMedicine;
