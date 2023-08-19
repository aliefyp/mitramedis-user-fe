import Card from "components/Card";
import Button from "components/Button";
import Input from "components/FormInput/Input";
import React, { useState } from "react";
import { useDebounce } from "use-debounce";
import { TbSearch } from "react-icons/tb";

interface StockFilterParam {
  query: string;
}

interface StockFilterProps {
  onSubmit: (val: StockFilterParam) => void;
}

const StockFilter = ({ onSubmit }: StockFilterProps) => {
  const [searchText, setSearchText] = useState("");
  const [value] = useDebounce(searchText, 500);

  console.log(value);

  return (
    <Card className="rounded-2xl border-none p-3 shadow-sm">
      <div className="grid grid-cols-2 items-center gap-4">
        <div className="col-span-2 sm:col-span-1">
          <Input
            type="search"
            id="mr_number"
            placeholder="Cari kode, nama produk atau kategori"
            value={searchText}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setSearchText(e.target.value)
            }
            onSuffixClick={() => {}}
          />
        </div>
        <div className="col-span-2 flex h-full items-end justify-start sm:col-span-1">
          <Button type="submit" color="secondary">
            <div className="flex items-center gap-2">
              <TbSearch />
              Cari
            </div>
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default StockFilter;
