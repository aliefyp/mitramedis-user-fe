import moment from "moment";
import { useMemo, useState } from "react";
import { HiCalendar } from "react-icons/hi";
import Button from "components/Button";
import PageHeading from "components/PageHeading";
import Typography from "components/Typography";
import SearchPasien from "./components/SearchPasien";
import Card from "components/Card";
import CardHeader from "components/CardHeader";
import CardBody from "components/CardBody";
import StatsTopDisease from "./components/StatsTopDisease";
import ChartIncome from "./components/ChartIncome";

// const SUMMARY_CARD = [
//   { text: "Pasien Terdaftar", number: 20, icon: FaUserEdit },
//   { text: "Pasien Terlayani", number: 16, icon: FaUserShield },
//   { text: "Pasien Terdaftar", number: 20, icon: FaUserEdit },
//   { text: "Pasien Terlayani", number: 16, icon: FaUserShield },
// ];

// const HISTORY = [
//   { name: "Rima Futiha", diagnose: "Batuk pilek", date: "2021-06-01" },
//   { name: "Rima Futiha", diagnose: "Batuk pilek", date: "2021-06-01" },
//   { name: "Rima Futiha", diagnose: "Batuk pilek", date: "2021-06-01" },
// ];

const Home = () => {
  const [showPasienModal, setShowPasienModal] = useState(false);

  const Greeting = useMemo(() => {
    const hourNow = new Date().getHours();
    if (hourNow < 11) return { greeting: "Selamat Pagi", message: "" };
    if (hourNow < 15) return { greeting: "Selamat Siang", message: "" };
    if (hourNow < 18) return { greeting: "Selamat Sore", message: "" };
    return { greeting: "Selamat Malam", message: "" };
  }, []);

  return (
    <div>
      <PageHeading title="" breadcrumbs={[{ text: "Dashboard" }]} />
      <div className="flex max-w-screen-2xl items-baseline justify-between gap-4 md:min-w-[800px]">
        <div className="space-y-1 pb-12 pt-0 md:pt-4">
          <Typography
            as="h2"
            className="text-2xl font-extrabold leading-none tracking-tight text-slate-800 dark:text-white md:text-4xl"
          >
            {`${Greeting.greeting}, Dok!`}
          </Typography>
          <Typography
            as="div"
            className="text-md font-normal text-slate-500 dark:text-slate-200 md:text-lg"
          >
            Anda belum memiliki appoinment hari ini
          </Typography>
          <div className="pt-2">
            <Button
              size="large"
              type="button"
              color="secondary"
              className="w-full md:w-auto"
              onClick={() => setShowPasienModal(true)}
            >
              Kunjungan Baru
            </Button>
          </div>
        </div>
        <div className="hidden md:block">
          <div className="flex  flex-col items-end">
            <Typography className="flex items-center gap-2 text-right text-sm !text-gray-500">
              <HiCalendar /> Hari ini:
            </Typography>
            <Typography bold>
              {moment().format("dddd, DD MMMM YYYY")}
            </Typography>
          </div>
        </div>
        {/* <div className="grid grid-cols-1 gap-12 sm:gap-8 lg:grid-cols-2">
          <section className="grid grid-cols-2 gap-4 lg:grid-cols-2">
            {SUMMARY_CARD.map((sum, index) => (
              <Card
                key={index}
                className="relative cursor-pointer overflow-hidden rounded-3xl border-none bg-gradient-to-r from-cyan-500 to-blue-500 transition-transform duration-75 hover:scale-105"
              >
                <sum.icon
                  className="absolute text-slate-50 opacity-20"
                  style={{ fontSize: "8rem", right: "-1rem", bottom: "-0.5rem" }}
                />
                <div className="flex flex-wrap gap-2">
                  <sum.icon className=" hidden shrink-0 text-2xl text-slate-50 sm:block" />
                  <p className="text-md font-semibold text-slate-50 sm:text-lg">
                    {sum.text}
                  </p>
                </div>
                <p className="text-3xl font-bold text-slate-50 sm:text-5xl">
                  {sum.number}
                </p>
              </Card>
            ))}
          </section>
          <section>
            <h3 className="mb-6 text-xl font-bold text-slate-800 dark:text-slate-50">
              Pemeriksaan Terakhir
            </h3>
            {HISTORY.map((item, index) => (
              <div
                key={index}
                className="mb-2 flex max-w-lg items-center justify-between gap-4 rounded-2xl bg-slate-50 px-4 py-2 shadow-sm dark:bg-slate-800"
              >
                <Avatar img="http://placehold.it/40x40" rounded />
                <div className="grow">
                  <p className="text-lg font-semibold text-slate-800 dark:text-slate-50">
                    {item.name}
                  </p>
                  <p className="text-sm text-slate-500 dark:text-slate-200">
                    Diagnosa: {item.diagnose}
                  </p>
                </div>
                <a
                  href="#home"
                  className="text-sm font-semibold text-teal-500 dark:text-teal-200"
                >
                  Selengkapnya
                </a>
              </div>
            ))}
          </section>
        </div> */}
      </div>

      <div className="grid grid-cols-8 gap-6">
        <Card className="col-span-8 md:col-span-5">
          <CardHeader title="Pendapatan" subtitle="Dalam 5 bulan terakhir" />
          <CardBody>
            <ChartIncome />
          </CardBody>
        </Card>
        <Card className="col-span-8 md:col-span-3">
          <CardHeader
            title="Top 10 Penyakit"
            subtitle="Berdasarkan 1000 kunjungan terakhir"
          />
          <CardBody>
            <StatsTopDisease />
          </CardBody>
        </Card>
        <Card className="col-span-8 md:col-span-3">
          <CardHeader title="Hehe" />
          <CardBody></CardBody>
        </Card>
        <Card className="col-span-8 md:col-span-5">
          <CardHeader title="Hehe" />
          <CardBody>asdkjasndj</CardBody>
        </Card>
      </div>
      <SearchPasien
        open={showPasienModal}
        onClose={() => setShowPasienModal(false)}
      />
    </div>
  );
};

export default Home;
