import Button from "components/Button";
import DataDisplay from "components/DataDisplay";
import Modal from "components/Modal";
import Typography from "components/Typography";

const DUMMY_PREVIEW_DATA = [
  {
    key: "Nama Pasien",
    value: "Risky Dwi Setyawan",
  },
  {
    key: "NIK",
    value: "123123123123123",
  },
  {
    key: "Tanggal Lahir",
    value: "21 Mei 2023",
  },
  {
    key: "Jenis Kelamin",
    value: "Laki-laki",
  },
  {
    key: "Alamat",
    value: "Jl Keberanan No.114 RT07/RW09 Mejayan, Madiun, Jawa Timur",
  },
  {
    key: "Golongan Darah",
    value: "B",
  },
];

interface PasienPreviewModalProps {
  open: boolean;
  onClose: () => void;
}

const PasienPreviewModal = ({ open, onClose }: PasienPreviewModalProps) => {
  return (
    <Modal open={open} closeModal={onClose}>
      <div className="px-8 py-8">
        <Typography as="h1" className="text-md font-semibold text-slate-500">
          Data Pasien
        </Typography>
        <Typography as="h1" className="mb-4 text-2xl font-bold">
          Risky Dwi Setyawan
        </Typography>
        <DataDisplay items={DUMMY_PREVIEW_DATA} />
        <div className="mt-4 flex items-center justify-between">
          <Button type="button" color="primary" onClick={onClose}>
            Tutup
          </Button>
          <div className="flex items-center justify-end gap-2">
            <Button type="button" color="error">
              Hapus
            </Button>
            <Button type="button" color="success">
              Ubah Data
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default PasienPreviewModal;
