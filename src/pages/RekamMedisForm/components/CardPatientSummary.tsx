import clsx from "clsx";
import Card from "components/Card";
import Typography from "components/Typography";
import { useEffect, useState } from "react";
import { FaChevronRight } from "react-icons/fa";

const DUMMY_PREVIEW_DATA = [
  {
    key: "NIK",
    value: "123123123123123",
  },
  {
    key: "Tgl Lahir",
    value: "21 Mei 2023",
  },
  {
    key: "Umur",
    value: "29th 11bln 11hr",
  },
];

const CardPatientSummary = () => {
  const [isSticky, setSticky] = useState(false);

  const handleSticky = (event) => {
    const scrollPos = event.target.scrollTop;
    const cardTop = document.getElementById("card-patient").offsetTop;
    const tolerance = Number(
      window
        .getComputedStyle(event.target, null)
        .getPropertyValue("padding-top")
        .replace("px", "")
    );

    if (scrollPos + tolerance < cardTop) setSticky(false);
    if (scrollPos + tolerance >= cardTop) setSticky(true);
  };

  useEffect(() => {
    const scrollable = document.querySelector("#scrollable-section");
    scrollable.addEventListener("scroll", handleSticky);
    return () => scrollable.removeEventListener("scroll", handleSticky);
  });

  return (
    <div id="card-patient" className="h-full w-full">
      <Card className={clsx("divide-y", isSticky && "sticky top-0")}>
        <div className="px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="mb-4 rounded-sm bg-lime-500 px-2 py-0">
              <Typography className="text-xs font-bold text-white">
                RM: 23000001
              </Typography>
            </div>
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
          <Typography
            link
            className="flex cursor-pointer items-center gap-2 px-4 py-2 text-sm font-semibold"
          >
            Lihat Detail
            <FaChevronRight className="text-sm" />
          </Typography>
        </div>
      </Card>
    </div>
  );
};

export default CardPatientSummary;
