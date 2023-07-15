import Typography from "components/Typography";
import useAppContext from "context/AppContext";

const DUMMY_DISEASE = [
  { id: 1, name: "Cardiovascular disease", count: 100 },
  { id: 2, name: "Neoplasms", count: 90 },
  { id: 3, name: "Diabetes & kidney diseases", count: 80 },
  { id: 4, name: "Digestive diseases", count: 70 },
  { id: 5, name: "Respiratory infections", count: 60 },
  { id: 6, name: "Chronic respiratory diseases", count: 50 },
  { id: 7, name: "Enteric infections", count: 40 },
  { id: 8, name: "Maternal & neonatal", count: 30 },
  { id: 9, name: "Transport injury", count: 20 },
  { id: 10, name: "Unintentional injury", count: 10 },
];

const StatsTopDisease = () => {
  const { isMobile } = useAppContext();
  const displayedData = isMobile ? DUMMY_DISEASE.splice(0, 5) : DUMMY_DISEASE;

  return (
    <div className=" divide-y">
      {displayedData.map((item, index) => (
        <div
          key={index}
          className="flex items-center justify-between gap-3 py-2"
        >
          <Typography bold className="w-[20px]">{`${index + 1}.`}</Typography>
          <Typography className="grow">{item.name}</Typography>
          <Typography bold className="text-orange-400">
            {item.count}
          </Typography>
        </div>
      ))}
    </div>
  );
};

export default StatsTopDisease;
