import { TbSearch } from "react-icons/tb";
import { useForm } from "react-hook-form";
import Card from "components/Card";
import Button from "components/Button";
import Input from "components/FormInput/Input";
import ComboBox from "components/FormInput/ComboBox";
import { useMemo, useState } from "react";
import { useAllStock } from "api/stock";
import { useLocation } from "react-router-dom";

interface StockCardType {
  item_name: string;
  stock_id: string;
  period_month: string;
}

interface StockCardFilterProps {
  onSubmit: (val: StockCardType) => void;
}

const StockCardFilter = ({ onSubmit }: StockCardFilterProps) => {
  const [searchText, setSearchText] = useState("");
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<StockCardType>();

  const submitForm = (val: StockCardType) => {
    onSubmit(val);
  };

  const location = useLocation();
  const filter = Object.fromEntries(new URLSearchParams(location.search));

  const {
    data: dataStock,
    isLoading: loadingStock,
    page: stockPage,
    setPage: setStockPage,
  } = useAllStock({ filter });

  const stockList = useMemo(() => {
    if (!dataStock?.data?.data?.stock) return [];

    return dataStock?.data?.data?.stock?.map((item) => ({
      key: item.stock_id,
      label: item.item_name,
      unit: item.unit,
    }));
  }, [dataStock]);

  const displayedStockList = useMemo(() => {
    if (!stockList?.length) return [];

    const copyIcd = [...stockList];
    const filtered =
      searchText === ""
        ? copyIcd
        : copyIcd.filter((val) =>
            val.label
              .toLowerCase()
              .replace(/\s+/g, "")
              .includes(searchText.toLowerCase().replace(/\s+/g, ""))
          );

    return filtered.splice(0, 10 * stockPage);
  }, [stockList, stockPage, searchText]);

  return (
    <Card className="rounded-2xl border-none p-3 shadow-sm">
      <form onSubmit={handleSubmit(submitForm)}>
        <div className="grid grid-cols-3 items-center gap-4">
          <ComboBox
            required
            type="text"
            loading={loadingStock}
            options={displayedStockList}
            placeholder="Nama Item"
            className="col-span-3 md:col-span-2"
            error={Boolean(errors?.item_name)}
            helper={errors?.item_name?.message}
            onValueChange={(val) => {
              setValue("item_name", val.label);
              setValue("stock_id", String(val.key));
            }}
            onSearch={(val) => setSearchText(val)}
            onLoadMore={() => setStockPage(stockPage + 1)}
            {...register("item_name", {
              required: {
                value: true,
                message: "Wajib diisi",
              },
            })}
          />

          {/* code */}
          <Input
            required
            readOnly
            disabled
            type="text"
            placeholder="Kode Item KFA / Barcode"
            className="col-span-3 md:col-span-1"
            error={Boolean(errors?.stock_id)}
            helper={errors?.stock_id?.message}
            {...register("stock_id", {
              required: {
                value: true,
                message: "Wajib diisi",
              },
            })}
          />

          {/* period_month */}
          <Input
            required
            type="month"
            placeholder="Bulan"
            className="col-span-3 md:col-span-1"
            error={Boolean(errors?.period_month)}
            helper={errors?.period_month?.message}
            {...register("period_month", {
              required: {
                value: true,
                message: "Wajib diisi",
              },
            })}
          />

          <div className="col-span-3 flex h-full items-end justify-end gap-2 sm:col-span-2">
            <Button type="reset" color="ghost-primary">
              Reset
            </Button>
            <Button type="submit" color="secondary">
              <div className="flex items-center gap-2">
                <TbSearch />
                Cari
              </div>
            </Button>
          </div>
        </div>
      </form>
    </Card>
  );
};

export default StockCardFilter;
