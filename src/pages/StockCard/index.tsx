import PageHeading from "components/PageHeading";
import StockCardTable from "./components/StockCardTable";
import StockCardFilter from "./components/StockCardFilter";
import { useLocation, useNavigate } from "react-router-dom";
import { useStockCard } from "api/stock";

const StockCard = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { stock_id, ...filter } = Object.fromEntries(
    new URLSearchParams(location.search)
  );
  const { data, isLoading } = useStockCard({ stock_id, filter });

  const handleSubmitFilter = (filter) => {
    const { stock_id, period_month } = filter;
    const splittedMonth = period_month.split("-");

    const queryObj = {
      stock_id,
      month: splittedMonth[1],
      year: splittedMonth[0],
    };

    const query = new URLSearchParams(queryObj).toString();
    navigate(`${location.pathname}?${query}`);
  };

  return (
    <div>
      <PageHeading
        title="Kartu Stok"
        breadcrumbs={[{ text: "Stok", url: "/stok" }, { text: "Kartu Stok" }]}
      />
      <div className="space-y-4">
        <StockCardFilter onSubmit={handleSubmitFilter} />
        <StockCardTable
          data={data?.data?.data?.stock_card}
          loading={isLoading}
        />
      </div>
    </div>
  );
};

export default StockCard;
