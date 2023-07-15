import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import toIDR from "helpers/toIDR";
// import Typography from "components/Typography";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const DUMMY_DATA = [
  { month: "Maret", amount: 500000 },
  { month: "April", amount: 350000 },
  { month: "Mei", amount: 700000 },
  { month: "Juni", amount: 600000 },
  { month: "Juli", amount: 800000 },
];

const options = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
      position: "top" as const,
    },
  },
  scales: {
    y: {
      ticks: {
        callback: (value) => {
          return `${toIDR(value / 1000)}k`;
        },
      },
    },
    x: {
      grid: {
        display: false,
      },
    },
  },
};

const data = {
  labels: DUMMY_DATA.map((i) => i.month),
  datasets: [
    {
      label: "Pendapatan",
      data: DUMMY_DATA.map((i) => i.amount),
      backgroundColor: "rgb(14 165 233 / 1)",
    },
  ],
};

const ChartIncome = () => {
  // const totalIncome = DUMMY_DATA.map((i) => i.amount).reduce((a, b) => a + b);

  return (
    // <div className="grid grid-cols-4">
    //   <div className="col-span-4 flex flex-col items-center divide-y md:col-span-1">
    //     <Typography bold>Total Pendapatan</Typography>
    //     <Typography bold className="text-3xl">{`${toIDR(
    //       totalIncome / 1000
    //     )}k`}</Typography>
    //   </div>
    //   <div className="col-span-4 md:col-span-3">
    <Bar options={options} data={data} />
    //   </div>
    // </div>
  );
};

export default ChartIncome;
