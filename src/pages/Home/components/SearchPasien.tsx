import { useState } from "react";
import Button from "components/Button";
import Input from "components/Input";
import Modal from "components/Modal";
import Typography from "components/Typography";
import SearchPasienItemDisplay from "./SearchPasienItemDisplay";
import { useNavigate } from "react-router-dom";

const DUMMY_PASIEN = [
  { name: "Risky Dwi Setiyawan", mr_number: "MR-001", nik: "1234567891234567" },
  { name: "Sri Widodo", mr_number: "MR-002", nik: "1234567891234567" },
  { name: "Sri Wulandari", mr_number: "MR-003", nik: "1234567891234567" },
];

interface PasienType {
  name: string;
  mr_number: string;
  nik: string;
}

interface SearchPasienProps {
  open: boolean;
  onClose: () => void;
}

const SearchPasien = ({ open, onClose }: SearchPasienProps) => {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  const handlePasienClick = (item: PasienType) => {
    navigate("/rekam-medis/new");
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  return (
    <Modal open={open} closeModal={onClose}>
      <div className="px-8 py-8">
        <Typography as="h1" className="mb-4 text-2xl font-bold">
          Cari Pasien
        </Typography>

        <div className=" space-y-4">
          <Input
            name="search_pasien"
            type="text"
            placeholder="Ketik nama, nomor MR, atau NIK pasien"
            onChange={handleSearchChange}
          />
          <div>
            {Boolean(query) &&
              DUMMY_PASIEN.filter((item) => {
                const pasienName = item.name.trim().toLocaleLowerCase();
                const queryName = query.trim().toLocaleLowerCase();
                return pasienName.includes(queryName);
              }).map((item) => (
                <SearchPasienItemDisplay
                  item={item}
                  onClick={() => handlePasienClick(item)}
                />
              ))}
          </div>
          <div className="flex items-center justify-end gap-4 pt-8">
            <Typography className="text-sm text-gray-500">
              Tidak dapat menemukan pasien?
            </Typography>
            <Button
              type="button"
              color="primary"
              onClick={() => navigate("/pasien/new")}
            >
              <div className="flex items-center gap-2">Input Pasien Baru</div>
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default SearchPasien;
