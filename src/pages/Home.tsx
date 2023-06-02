import { Avatar, Card } from "flowbite-react";
import { useMemo } from "react";
import { FaUserEdit, FaUserShield } from 'react-icons/fa';

const SUMMARY_CARD = [
  { text: 'Pasien Terdaftar', number: 20, icon: FaUserEdit },
  { text: 'Pasien Terlayani', number: 16, icon: FaUserShield },
  { text: 'Pasien Terdaftar', number: 20, icon: FaUserEdit },
  { text: 'Pasien Terlayani', number: 16, icon: FaUserShield },
]

const HISTORY = [
  { name: 'Rima Futiha', diagnose: 'Batuk pilek', date: '2021-06-01' },
  { name: 'Rima Futiha', diagnose: 'Batuk pilek', date: '2021-06-01' },
  { name: 'Rima Futiha', diagnose: 'Batuk pilek', date: '2021-06-01' },
]

const Dashboard = () => {
  const Greeting = useMemo(() => {
    const hourNow = new Date().getHours();
    if (hourNow < 11) return { greeting: 'Selamat Pagi', message: '' };
    if (hourNow < 15) return { greeting: 'Selamat Siang', message: '' };
    if (hourNow < 18) return { greeting: 'Selamat Sore', message: '' };
    return { greeting: 'Selamat Malam', message: '' };
  }, []);

  return (
    <div className="flex flex-col gap-6">
      <section className="max-w-screen-md">
        <div className="flex flex-col justify-center">
          <h1 className="mb-4 text-4xl sm:text-3xl font-extrabold tracking-tight leading-none text-slate-800 md:text-4xl lg:text-5xl dark:text-white">
            {`${Greeting.greeting}, Dokter Risky!`}
          </h1>
          <p className="mb-4 lg:mb-8 text-lg font-normal text-slate-500 lg:text-xl dark:text-slate-200">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam volutpat tincidunt nulla, sit amet hendrerit lacus elementum vitae. Etiam malesuada ante augue, nec venenatis neque commodo nec.
          </p>

        </div>
      </section>
      <div className="gap-12 sm:gap-8 grid grid-cols-1 lg:grid-cols-2">
        <section className="gap-4 grid grid-cols-2 lg:grid-cols-2">
          {SUMMARY_CARD.map(sum => (
            <Card className="relative bg-gradient-to-r from-cyan-500 to-blue-500 rounded-3xl border-none cursor-pointer overflow-hidden transition-transform duration-75 hover:scale-105">
              <sum.icon className="absolute opacity-20 text-slate-50" style={{ fontSize: '8rem', right: '-1rem', bottom: '-0.5rem' }} />
              <div className="flex flex-wrap gap-2">
                <sum.icon className=" text-2xl text-slate-50 shrink-0 hidden sm:block" />
                <p className="text-slate-50 text-md sm:text-lg font-semibold">{sum.text}</p>
              </div>
              <p className="text-slate-50 text-3xl sm:text-5xl font-bold">{sum.number}</p>
            </Card>
          ))}
        </section>
        <section>
          <h3 className="font-bold text-xl mb-6 text-slate-800 dark:text-slate-50">Pemeriksaan Terakhir</h3>
          {HISTORY.map(item => (
            <div className="flex gap-4 justify-between items-center px-4 py-2 mb-2 rounded-2xl shadow-sm bg-slate-50 dark:bg-slate-800 max-w-lg">
              <Avatar
                img="http://placehold.it/40x40"
                rounded
              />
              <div className="grow">
                {/* <p className="text-sm text-slate-500 dark:text-slate-200">{item.date}</p> */}
                <p className="font-semibold text-lg text-slate-800 dark:text-slate-50">{item.name}</p>
                <p className="text-sm text-slate-500 dark:text-slate-200">Diagnosa: {item.diagnose}</p>
              </div>
              <a href="#home" className="text-sm font-semibold text-teal-500 dark:text-teal-200">Selengkapnya</a>
            </div>
          ))}
        </section>
      </div>
    </div >
  )
}

export default Dashboard;
