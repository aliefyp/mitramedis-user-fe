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
  { name: "Lainnya" },
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
    if (open) setSelected([]);
  }, [open]);

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
            const isDisabled =
              defaultSelected.findIndex((i) => i.name === item.name) > -1;
            const isSelected =
              selected.findIndex((i) => i.name === item.name) > -1;
            const selectedCardClass = isSelected
              ? "border-sky-400"
              : "border-gray-300";
            const disabledCardClass = isDisabled && "!bg-gray-200 pointer-none";
            const selectedTextClass = isSelected && "font-bold";

            return (
              <Card
                className={`flex min-h-[52px] cursor-pointer flex-col items-center justify-center gap-1 border-2 p-2 shadow-xl  ${selectedCardClass} ${disabledCardClass}`}
                onClick={isDisabled ? null : () => handleSelect(item)}
              >
                {/* <img
                  src="http://placehold.it/32x32"
                  alt={item.name}
                  className="h-[32px] w-[32px]"
                /> */}
                <Typography
                  smaller
                  className={`text-center ${selectedTextClass}`}
                >
                  {item.name}
                </Typography>
              </Card>
            );
          })}
        </div>
        <div className="grid grid-cols-2 gap-2">
          <Button
            className="w-full"
            type="button"
            color="secondary"
            onClick={onClose}
          >
            Batal
          </Button>
          <Button
            className="w-full"
            type="button"
            color="primary"
            disabled={!selected.length}
            onClick={() => onSubmit([...defaultSelected, ...selected])}
          >
            Tambahkan
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default SearchPasien;
