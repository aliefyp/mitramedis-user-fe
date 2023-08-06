import { useState } from "react";
import Button from "components/Button";
import Input from "components/FormInput/Input";
import { useForm } from "react-hook-form";
import { StockEntryType, StockType } from "types/stock";
import PageHeading from "components/PageHeading";
import Card from "components/Card";
import StockOpnameTable from "./components/StockOpnameTable";
import Typography from "components/Typography";
import ComboBox from "components/FormInput/ComboBox";

type EntryType = Pick<StockEntryType, "item_code" | "item_name">;
interface StockOpnameFilterType extends EntryType {
  date: string;
}

const DUMMY_ITEMS = [
  {
    item_code: 9203920,
    item_name: "Paracetamol",
    quantity: 1000,
    unit: "Pcs",
    real_quantity: 0,
    officer_name: "",
  },
];
export interface Data extends Partial<StockType> {
  quantity: number;
  real_quantity: number;
  officer_name: string;
}

const StockOpname = () => {
  const [filter, setFilterData] = useState<StockOpnameFilterType>();
  const [data, setData] = useState<Data[]>(DUMMY_ITEMS);

  console.log(filter);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<StockOpnameFilterType>();

  const submitForm = (val: StockOpnameFilterType) => {
    setFilterData(val);
  };

  const handleQuantityChange = (index: number, val: number) => {
    setData(
      data.map((item, i) => {
        if (index !== i) return item;
        return {
          ...item,
          real_quantity: val,
        };
      })
    );
  };

  const handleOfficerChange = (index: number, val: string) => {
    setData(
      data.map((item, i) => {
        if (index !== i) return item;
        return {
          ...item,
          officer_name: val,
        };
      })
    );
  };

  return (
    <div>
      <PageHeading
        title="Stock Opname"
        breadcrumbs={[{ text: "Stok", url: "/stok" }, { text: "Stock Opname" }]}
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

            {/* item_code */}
            <Input
              required
              type="text"
              label="Kode Item KFA / Barcode"
              placeholder="9090xxxx"
              className="col-span-3 md:col-span-1"
              error={Boolean(errors?.item_code)}
              helper={errors?.item_code?.message}
              {...register("item_code", {
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
              label="Tanggal"
              className="col-span-3 md:col-span-1"
              error={Boolean(errors?.date)}
              helper={errors?.date?.message}
              {...register("date", {
                required: {
                  value: true,
                  message: "Wajib diisi",
                },
              })}
            />

            <div className="col-span-3 mt-2 flex h-full items-center justify-end gap-2 md:col-span-2">
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
          <StockOpnameTable
            items={data}
            onQuantityChange={handleQuantityChange}
            onOfficerChange={handleOfficerChange}
          />
        </div>
        <div className="flex justify-end gap-2 p-6">
          {/* <Button type="button" color="secondary">
            Kembali
          </Button> */}
          <Button type="submit" color="primary">
            Simpan
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default StockOpname;
