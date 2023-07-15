import { FaPlus, FaSearch } from "react-icons/fa";
import Card from "components/Card";
import Button from "components/Button";
import Input from "components/FormInput/Input";
import React, { useState } from "react";
import { useDebounce } from "use-debounce";
import { useNavigate } from "react-router-dom";

// interface MedicalRecordFilterParam {
// query: string;
// }

const MedicalRecordFilter = () => {
  const [searchText, setSearchText] = useState("");
  const [value] = useDebounce(searchText, 500);

  const navigate = useNavigate();

  console.log(value);

  return (
    <Card className="rounded-2xl border-none p-6 shadow-sm">
      <div className="grid grid-cols-2 items-center gap-4">
        <div className="col-span-2 sm:col-span-1">
          <Input
            label="Cari disini"
            type="text"
            id="mr_number"
            placeholder="Cari nama atau nomor rekam medis"
            suffix={<FaSearch />}
            value={searchText}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setSearchText(e.target.value)
            }
            onSuffixClick={() => {}}
          />
        </div>
        <div className="col-span-2 flex h-full items-end justify-end sm:col-span-1">
          <Button
            className="w-full sm:w-auto"
            onClick={() => navigate("/rekam-medis/new")}
          >
            <div className="flex items-center gap-4">
              <FaPlus />
              Rekam Medis Baru
            </div>
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default MedicalRecordFilter;
