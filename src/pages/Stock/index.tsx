import { useLocation, useNavigate } from "react-router-dom";
import PageHeading from "components/PageHeading";
import StokFilter from "./components/StockFilter";
import StokTable from "./components/StockTable";
import Button from "components/Button";
import { TbCubePlus, TbPlus } from "react-icons/tb";
import { useAllStock } from "api/stock";

const StokPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { data, isFetching, setPage, refetch } = useAllStock();

  const handleViewStock = (code: string) => {
    navigate(`/stok/card?mr_id=${code}`);
  };

  const handleSubmitFilter = (filter) => {
    const query = new URLSearchParams(filter).toString();
    navigate(`${location.pathname}?${query}`);
  };

  return (
    <div>
      <PageHeading
        title="Manajemen Stok"
        subtitle="Manajemen stok obat dan Bahan Habis Pakai (BHP)"
        breadcrumbs={[{ text: "Stok" }, { text: "Manajemen Stok" }]}
      >
        <div className="flex items-center justify-end gap-2">
          <Button color="secondary" onClick={() => navigate("/stok/in")}>
            <div className="flex items-center gap-2">
              <TbCubePlus />
              Pembelian
            </div>
          </Button>
          <Button color="primary" onClick={() => navigate("/stok/new")}>
            <div className="flex items-center gap-2">
              <TbPlus />
              Item Baru
            </div>
          </Button>
        </div>
      </PageHeading>
      <div className="space-y-4">
        <StokFilter onSubmit={handleSubmitFilter} />
        <StokTable
          data={data?.data?.data?.stock}
          pagination={data?.data?.data?.pagination}
          loading={isFetching}
          onPageChange={setPage}
          onView={handleViewStock}
        />
      </div>
    </div>
  );
};

export default StokPage;
