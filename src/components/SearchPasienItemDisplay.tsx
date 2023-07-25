import Typography from "components/Typography";
import { FaChevronRight } from "react-icons/fa";

interface PasienType {
  name: string;
  mr_number: string;
  nik: string;
}

interface SearchPasienItemDisplayProps {
  item: PasienType;
  onClick: (item: PasienType) => void;
}

const SearchPasienItemDisplay = ({
  item,
  onClick,
}: SearchPasienItemDisplayProps) => (
  <div
    className="flex cursor-pointer items-center justify-between border border-l-0 border-r-0 border-t-0 px-4 py-2 hover:bg-gray-100"
    onClick={() => onClick(item)}
  >
    <div className="space-y-0">
      <Typography as="div" className=" text-md font-bold">
        {item.name}
      </Typography>
      <Typography as="div" className=" text-sm text-gray-500">
        {item.mr_number} | {item.nik}
      </Typography>
    </div>
    <div>
      <FaChevronRight />
    </div>
  </div>
);

export default SearchPasienItemDisplay;
