import clsx from "clsx";
import Card from "components/Card";
import Typography from "components/Typography";
import { Spinner } from "flowbite-react";
import getAge from "helpers/getAge";
import moment from "moment";
import { useEffect, useState } from "react";
// import { FaChevronRight } from "react-icons/fa";
import { PatientTypeData } from "types/patient";

interface CardPatientSummaryProps {
  data: PatientTypeData;
  loading: boolean;
}

const CardPatientSummary = ({ data, loading }: CardPatientSummaryProps) => {
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

  const patientData = [
    {
      key: "NIK",
      value: data?.id_card_number,
    },
    {
      key: "Tgl Lahir",
      value: moment(data?.birthdate).format("DD MMMM YYYY"),
    },
    {
      key: "Umur",
      value: getAge(data?.birthdate),
    },
  ];

  return (
    <div id="card-patient" className="h-full w-full">
      <Card className={clsx("divide-y", isSticky && "sticky top-0")}>
        {loading && (
          <div className="flex min-h-[180px] items-center justify-center">
            <Spinner />
          </div>
        )}
        {!loading && data && (
          <>
            <div className="px-4 py-3">
              <div className="flex items-center justify-between">
                <div className="mb-4 rounded-sm bg-lime-500 px-2 py-0">
                  <Typography className="text-xs font-bold text-white">
                    {data.medical_record_number}
                  </Typography>
                </div>
                <Typography className="mb-4 text-right text-xs italic text-gray-500">
                  {moment().format("DD MMMM YYYY")}
                </Typography>
              </div>
              <Typography bold className="text-md text-slate-800">
                {data.patient_name}
              </Typography>
              <Typography className="text-sm text-gray-500">
                Laki-laki
              </Typography>
            </div>
            <div className="space-y-2 px-4 py-3">
              {patientData.map((item, index) => (
                <div key={index} className="grid grid-cols-12">
                  <div className="col-span-5">
                    <Typography className="text-xs text-gray-500">
                      {item.key}
                    </Typography>
                  </div>
                  <div className="col-span-1">
                    <Typography className="text-xs text-slate-800">
                      :
                    </Typography>
                  </div>
                  <div className="col-span-6">
                    <Typography className="text-xs text-slate-800">
                      {item.value}
                    </Typography>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
        {/* <div className="flex items-center justify-end ">
          <Typography
            link
            className="flex cursor-pointer items-center gap-2 px-4 py-2 text-sm font-semibold"
          >
            Lihat Detail
            <FaChevronRight className="text-sm" />
          </Typography>
        </div> */}
      </Card>
    </div>
  );
};

export default CardPatientSummary;
