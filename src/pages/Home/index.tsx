import Button from "components/Button";
import PageHeading from "components/PageHeading";
// import { Avatar, Card } from "flowbite-react";
import { useMemo, useState } from "react";
// import { FaUserEdit, FaUserShield } from "react-icons/fa";
import SearchPasien from "./components/SearchPasien";

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
      <div className="flex flex-col gap-6 pt-2">
        <section className="max-w-screen-md">
          <div className="flex flex-col justify-center space-y-1">
            <h2 className="text-3xl font-extrabold leading-none tracking-tight text-slate-800 dark:text-white sm:text-2xl md:text-3xl lg:text-4xl">
              {`${Greeting.greeting}, Dok!`}
            </h2>
            <p className="text-lg font-normal text-slate-500 dark:text-slate-200 lg:text-xl">
              Anda belum memiliki appoinment hari ini
            </p>
            <div className="pt-2">
              <Button
                size="large"
                type="button"
                color="secondary"
                onClick={() => setShowPasienModal(true)}
              >
                Kunjungan Baru
              </Button>
            </div>
          </div>
        </section>
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
      <SearchPasien
        open={showPasienModal}
        onClose={() => setShowPasienModal(false)}
      />
    </div>
  );
};

export default Home;
