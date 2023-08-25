import Modal from "components/Modal";
import Typography from "components/Typography";
import Card from "components/Card";
import { useEffect, useState } from "react";
import Button from "components/Button";
import ModalHeader from "components/ModalHeader";
import ModalBody from "components/ModalBody";
import ModalFooter from "components/ModalFooter";

const DATA_ORGAN = [
  { key: "note_skin", label: "Kulit" },
  { key: "note_nails", label: "Kuku" },
  { key: "note_head", label: "Kepala" },
  { key: "note_face", label: "Wajah" },
  { key: "note_eyes", label: "Mata" },
  { key: "note_ears", label: "Telinga" },
  { key: "note_nose", label: "Hidung" },
  { key: "note_mouth", label: "Mulut" },
  { key: "note_tooth", label: "Gigi" },
  { key: "note_neck", label: "Leher" },
  { key: "note_throat", label: "Tenggorokan" },
  { key: "note_tonsils", label: "Tonsil" },
  { key: "note_chest", label: "Dada" },
  { key: "note_breast", label: "Payudara" },
  { key: "note_back", label: "Punggung" },
  { key: "note_stomach", label: "Perut" },
  { key: "note_genital", label: "Genital" },
  { key: "note_anus", label: "Anus / Dubur" },
  { key: "note_arms", label: "Lengan Atas" },
  { key: "note_hands", label: "Lengan Bawah" },
  { key: "note_fingers", label: "Jari Tangan" },
  { key: "note_hand_nail", label: "Kuku Tangan" },
  { key: "note_hand_joints", label: "Persendian Tangan" },
  { key: "note_upper_limbs", label: "Tungkai Atas" },
  { key: "note_lower_limbs", label: "Tungkai Bawah" },
  { key: "note_toes", label: "Jari Kaki" },
  { key: "note_toe_nails", label: "Kuku Kaki" },
  { key: "note_leg_joints", label: "Persendian Kaki" },
  { key: "note_other", label: "Lainnya" },
];

interface Organ {
  key: string;
  label: string;
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
    if (selected.findIndex((i) => i.label === item.label) > -1) {
      setSelected(selected.filter((i) => i.label !== item.label));
    } else {
      setSelected([...selected, item]);
    }
  };

  useEffect(() => {
    if (open) setSelected([]);
  }, [open]);

  return (
    <Modal open={open} onClose={onClose} className="md:max-w-2xl">
      <ModalHeader>Pilih Bagian Tubuh</ModalHeader>
      <ModalBody>
        <Typography className="!text-gray-500">
          Pilih bagian tubuh mana saja yang ingin diberi catatan
        </Typography>
        <div className="my-8 grid grid-cols-3 gap-4 md:grid-cols-6">
          {DATA_ORGAN.map((item) => {
            const isDisabled =
              defaultSelected.findIndex((i) => i.label === item.label) > -1;
            const isSelected =
              selected.findIndex((i) => i.label === item.label) > -1;
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
                  alt={item.label}
                  className="h-[32px] w-[32px]"
                /> */}
                <Typography
                  smaller
                  className={`text-center ${selectedTextClass}`}
                >
                  {item.label}
                </Typography>
              </Card>
            );
          })}
        </div>
      </ModalBody>
      <ModalFooter>
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
          onClick={() => onSubmit([...defaultSelected, ...selected])}
        >
          Tambahkan
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default SearchPasien;
