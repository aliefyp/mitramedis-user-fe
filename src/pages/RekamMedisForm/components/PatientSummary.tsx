import Card from "components/Card";
import Typography from "components/Typography";
import { FaChevronRight } from "react-icons/fa";

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
    key: "Umur",
    value: "29th 11bln 11hr",
  },
];

const PatientSummary = () => {
  return (
    <Card className="divide-y rounded-2xl">
      <div className="px-4 py-3">
        <div className="flex items-center justify-between">
          <Typography className="mb-4 text-right text-xs font-bold text-gray-500">
            RM: <span className=" text-mm-purple-700">23000001</span>
          </Typography>
          <Typography className="mb-4 text-right text-xs italic text-gray-500">
            26 September 2022
          </Typography>
        </div>
        <Typography bold className="text-md text-slate-800">
          Risky Dwi Setiyawan
        </Typography>
        <Typography className="text-sm text-gray-500">Laki-laki</Typography>
      </div>
      <div className="space-y-2 px-4 py-3">
        {DUMMY_PREVIEW_DATA.map((item, index) => (
          <div key={index} className="grid grid-cols-12">
            <div className="col-span-5">
              <Typography className="text-xs text-gray-500">
                {item.key}
              </Typography>
            </div>
            <div className="col-span-1">
              <Typography className="text-xs text-slate-800">:</Typography>
            </div>
            <div className="col-span-6">
              <Typography className="text-xs text-slate-800">
                {item.value}
              </Typography>
            </div>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-end ">
        <div className="flex cursor-pointer items-center gap-2 px-4 py-2">
          <Typography className="text-sm font-semibold text-mm-purple-700">
            Lihat Detail
          </Typography>
          <FaChevronRight className="text-sm text-mm-purple-700" />
        </div>
      </div>
    </Card>
  );
};

export default PatientSummary;
