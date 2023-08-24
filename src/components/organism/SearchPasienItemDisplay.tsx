import Typography from "components/Typography";
import { FaChevronRight } from "react-icons/fa";
import { PatientTypeData } from "types/patient";

interface SearchPasienItemDisplayProps {
  item: PatientTypeData;
  onClick: (item: PatientTypeData) => void;
}

const SearchPasienItemDisplay = ({
  item,
  onClick,
}: SearchPasienItemDisplayProps) => (
  <div
    className="flex cursor-pointer items-center justify-between border-b px-4 py-2 last:border-none hover:bg-gray-100"
    onClick={() => onClick(item)}
  >
    <div className="space-y-0">
      <Typography as="div" className=" text-md font-bold">
        {item.patient_name}
      </Typography>
      <Typography as="div" className=" text-sm text-gray-500">
        {item.medical_record_number} | {item.id_card_number}
      </Typography>
    </div>
    <div>
      <FaChevronRight />
    </div>
  </div>
);

export default SearchPasienItemDisplay;
