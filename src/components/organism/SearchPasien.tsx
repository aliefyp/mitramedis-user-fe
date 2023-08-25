import { useForm } from "react-hook-form";
import Button from "components/Button";
import Modal from "components/Modal";
import Typography from "components/Typography";
import SearchPasienItemDisplay from "./SearchPasienItemDisplay";
import { useNavigate } from "react-router-dom";
import { Spinner, TextInput } from "flowbite-react";
import { useDebounce } from "use-debounce";
import { useAllPatient } from "api/patient";
import { PatientTypeData } from "types/patient";
import EmptyData from "components/EmptyData";

interface PasienType {
  id_card_number: string;
  patient_name: string;
  medical_record_number: string;
}

interface SearchPasienProps {
  open: boolean;
  onClose: () => void;
}

const SearchPasien = ({ open, onClose }: SearchPasienProps) => {
  const navigate = useNavigate();

  const { register, watch } = useForm<PasienType>();

  const [keywordName] = useDebounce(watch("patient_name"), 500);
  const [keywordMr] = useDebounce(watch("medical_record_number"), 500);
  const [keywordNik] = useDebounce(watch("id_card_number"), 500);

  const query = new URLSearchParams({
    id_card_number: keywordNik,
    medical_record_number: keywordMr,
    patient_name: keywordName,
  }).toString();

  const { data, isFetching } = useAllPatient(query);

  const handlePasienClick = (item: PatientTypeData) => {
    navigate(`/rekam-medis/new/${item.patient_id}`);
  };

  return (
    <Modal open={open} onClose={onClose}>
      <div className="px-8 py-8">
        <Typography as="h1" className="mb-4 text-2xl font-bold">
          Cari Pasien
        </Typography>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-2">
            <TextInput
              type="search"
              placeholder="Nama"
              className="col-span-2"
              {...register("patient_name")}
            />
            <TextInput
              type="search"
              placeholder="No. Rekam Medis"
              className="col-span-1"
              {...register("medical_record_number")}
            />
            <TextInput
              type="search"
              placeholder="NIK"
              className="col-span-1"
              {...register("id_card_number")}
            />
          </div>
          <div className="max-h-[300px] overflow-y-auto rounded-lg border">
            {isFetching && <Spinner size="lg" className="mx-auto w-full" />}
            {!isFetching && data?.data?.data?.patient?.length === 0 && (
              <EmptyData>Data tidak ditemukan</EmptyData>
            )}
            {data?.data?.data?.patient?.map((item, index) => (
              <SearchPasienItemDisplay
                key={index}
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
              color="secondary"
              onClick={() => navigate("/pasien/new")}
            >
              Input Pasien Baru
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default SearchPasien;
