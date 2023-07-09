import Modal from "components/Modal";
import Typography from "components/Typography";
import Card from "components/Card";
import { useEffect, useState } from "react";
import Button from "components/Button";

const DATA_ORGAN = [
  { name: "Kulit" },
  { name: "Kuku" },
  { name: "Kepala" },
  { name: "Wajah" },
  { name: "Mata" },
  { name: "Telinga" },
  { name: "Hidung" },
  { name: "Mulut" },
  { name: "Gigi" },
  { name: "Leher" },
  { name: "Tenggorokan" },
  { name: "Tonsil" },
  { name: "Dada" },
  { name: "Payudara" },
  { name: "Punggung" },
  { name: "Perut" },
  { name: "Genital" },
  { name: "Anus / Dubur" },
  { name: "Lengan Atas" },
  { name: "Lengan Bawah" },
  { name: "Jari Tangan" },
  { name: "Kuku Tangan" },
  { name: "Persendian Tangan" },
  { name: "Tungkai Atas" },
  { name: "Tungkai Bawah" },
  { name: "Jari Kaki" },
  { name: "Kuku Kaki" },
  { name: "Persendian Kaki" },
];

interface Organ {
  name: string;
}

interface SearchPasienProps {
  open: boolean;
  defaultSelected: Organ[];
  onClose: () => void;
  onSubmit: (values: Organ[]) => void;
}

const SearchPasien = ({
  open,
  defaultSelected,
  onClose,
  onSubmit,
}: SearchPasienProps) => {
  const [selected, setSelected] = useState<Organ[]>([]);

  const handleSelect = (item: Organ) => {
    if (selected.findIndex((i) => i.name === item.name) > -1) {
      setSelected(selected.filter((i) => i.name !== item.name));
    } else {
      setSelected([...selected, item]);
    }
  };

  useEffect(() => {
    setSelected(defaultSelected);
  }, [defaultSelected]);

  return (
    <Modal open={open} onClose={onClose} className="md:max-w-2xl">
      <div className="space-y-8 px-8 py-8">
        <div>
          <Typography as="h1" className="text-2xl font-bold">
            Pilih Bagian Tubuh
          </Typography>
          <Typography>
            Pilih bagian tubuh mana saja yang ingin diberi catatan
          </Typography>
        </div>
        <div className="grid grid-cols-3 gap-4 md:grid-cols-6">
          {DATA_ORGAN.map((item) => {
            const isSelected =
              selected.findIndex((i) => i.name === item.name) > -1;
            const selectedCardClass = isSelected
              ? "border-2 border-mm-teal-200"
              : "border-2 border-transparent";
            const selectedTextClass = isSelected ? "text-mm-teal-200" : "";

            return (
              <Card
                className={`flex cursor-pointer flex-col items-center justify-center gap-1 p-2 shadow-xl ${selectedCardClass}`}
                onClick={() => handleSelect(item)}
              >
                <img
                  src="http://placehold.it/32x32"
                  alt={item.name}
                  className="h-[32px] w-[32px]"
                />
                <Typography
                  smaller
                  bold
                  className={`min-h-[32px] text-center ${selectedTextClass}`}
                >
                  {item.name}
                </Typography>
              </Card>
            );
          })}
        </div>
        <div>
          <Button
            className="w-full"
            size="large"
            type="button"
            color="secondary"
            disabled={!selected.length}
            onClick={() => onSubmit(selected)}
          >
            Tambahkan
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default SearchPasien;
