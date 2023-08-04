import Button from "components/Button";
import DataDisplay from "components/DataDisplay";
import Modal from "components/Modal";
import Typography from "components/Typography";
import { FaBriefcaseMedical, FaPencilAlt, FaTrashAlt } from "react-icons/fa";

const DUMMY_PREVIEW_DATA = [
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
    key: "Golongan Darah",
    value: "B",
  },
  {
    key: "Alamat",
    value: "Jl Keberanan No.114 RT07/RW09 Mejayan, Madiun, Jawa Timur",
  },
];

interface StokPreviewModalProps {
  open: boolean;
  onClose: () => void;
}

const ModalStokPreview = ({ open, onClose }: StokPreviewModalProps) => {
  return (
    <Modal open={open} onClose={onClose}>
      <div className="px-8 py-8">
        <Typography as="h1" className="text-md font-semibold text-slate-500">
          Data Stok
        </Typography>
        <Typography as="h1" className="mb-4 text-2xl font-bold">
          Risky Dwi Setyawan
        </Typography>
        <DataDisplay className="my-12" items={DUMMY_PREVIEW_DATA} />
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button type="button" color="error">
              <div className="flex items-center gap-2">
                <FaTrashAlt />
                Hapus
              </div>
            </Button>
            <Button type="button" color="primary" onClick={onClose}>
              <div className="flex items-center gap-2">
                <FaPencilAlt />
                Ubah
              </div>
            </Button>
          </div>
          <Button type="button" color="success" className="">
            <div className="flex items-center gap-2">
              <FaBriefcaseMedical />
              Tindakan
            </div>
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default ModalStokPreview;
