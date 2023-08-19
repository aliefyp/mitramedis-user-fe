import { useState } from "react";
import Button from "components/Button";
import Input from "components/FormInput/Input";
import { useForm } from "react-hook-form";
import { StockEntryType } from "types/stock";
import PageHeading from "components/PageHeading";
import Card from "components/Card";
import StockCardTable from "./components/StockCardTable";
import Typography from "components/Typography";
import ComboBox from "components/FormInput/ComboBox";

type EntryType = Pick<StockEntryType, "code" | "item_name">;
interface StockCardType extends EntryType {
  start_date: string;
  end_date: string;
}

const StockCard = () => {
  const [filter, setFilterData] = useState<StockCardType>();

  console.log(filter);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<StockCardType>();

  const submitForm = (val: StockCardType) => {
    setFilterData(val);
  };

  return (
    <div>
      <PageHeading
        title="Kartu Stok"
        breadcrumbs={[{ text: "Stok", url: "/stok" }, { text: "Kartu Stok" }]}
      />
      <Card className="mx-auto max-w-screen-xl space-y-6 rounded-2xl border-none">
        <form onSubmit={handleSubmit(submitForm)}>
          <div className="grid grid-cols-3 gap-4 rounded-t-xl bg-slate-50 px-8 py-4 shadow-md">
            {/* item_name */}
            <ComboBox
              required
              type="text"
              label="Nama Item"
              options={[
                { key: 1, label: "Obat 1" },
                { key: 2, label: "Obat 2" },
                { key: 3, label: "Obat 3" },
              ]}
              placeholder="Paracetamol 60 mg / 0,6 mL Drops"
              className="col-span-3 md:col-span-2"
              error={Boolean(errors?.item_name)}
              helper={errors?.item_name?.message}
              onValueChange={(val) => setValue("item_name", val.label)}
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
              type="text"
              label="Kode Item KFA / Barcode"
              placeholder="9090xxxx"
              className="col-span-3 md:col-span-1"
              error={Boolean(errors?.code)}
              helper={errors?.code?.message}
              {...register("code", {
                required: {
                  value: true,
                  message: "Wajib diisi",
                },
              })}
            />

            {/* start_date */}
            <Input
              required
              type="date"
              label="Dari tanggal"
              className="col-span-3 md:col-span-1"
              error={Boolean(errors?.start_date)}
              helper={errors?.start_date?.message}
              {...register("start_date", {
                required: {
                  value: true,
                  message: "Wajib diisi",
                },
              })}
            />

            {/* end_date */}
            <Input
              required
              type="date"
              label="Sampai tanggal"
              className="col-span-3 md:col-span-1"
              error={Boolean(errors?.end_date)}
              helper={errors?.end_date?.message}
              {...register("end_date", {
                required: {
                  value: true,
                  message: "Wajib diisi",
                },
              })}
            />
            <div className="col-span-3 mt-2 flex h-full items-center justify-end gap-2 md:col-span-1">
              <Button type="reset" color="secondary">
                Reset
              </Button>
              <Button type="submit" color="primary">
                Terapkan
              </Button>
            </div>
          </div>
        </form>

        <div className="space-y-4 px-6 py-2">
          <Typography as="h4" bold>
            Data Transaksi
          </Typography>
          <StockCardTable items={[]} />
        </div>
      </Card>
    </div>
  );
};

export default StockCard;
