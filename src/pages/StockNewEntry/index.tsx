import { useState } from "react";
import Button from "components/Button";
import ComboBox from "components/FormInput/ComboBox";
import Input from "components/FormInput/Input";
import { useForm } from "react-hook-form";
import { StockEntryType } from "types/stock";
import { OPTIONS_UNIT } from "./constants";
import PageHeading from "components/PageHeading";
import Card from "components/Card";
import { FaArrowDown } from "react-icons/fa";
import StockEntryTable from "./components/StockEntryTable";
import Typography from "components/Typography";

const StockNewEntry = () => {
  const [entryData, setEntryData] = useState<StockEntryType[]>([]);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<StockEntryType>();

  const submitForm = (val: StockEntryType) => {
    setEntryData([...entryData, val]);
  };

  const handleDeleteEntry = (index: number) => {
    setEntryData(entryData.filter((_, i) => i !== index));
  };

  const handleReset = () => {
    reset({
      item_name: null,
      item_code: null,
      quantity: null,
      unit: null,
      purchase_price: null,
      selling_price: null,
      expired_date: null,
    });
  };

  return (
    <div>
      <PageHeading
        title="Entri Stok Baru"
        breadcrumbs={[{ text: "Stok", url: "/stok" }, { text: "Entri Baru" }]}
      />
      <Card className="mx-auto max-w-screen-xl space-y-6 rounded-2xl border-none">
        <form
          onSubmit={handleSubmit(submitForm)}
          className="rounded-t-xl shadow-md"
        >
          <div className="grid grid-cols-3 gap-6 px-8 py-4">
            {/* invoice */}
            <Input
              required
              type="text"
              label="Nomor Faktur"
              placeholder="INV/xxxx"
              className="col-span-3 md:col-span-1"
              error={Boolean(errors?.invoice)}
              helper={errors?.invoice?.message}
              {...register("invoice", {
                required: {
                  value: true,
                  message: "Wajib diisi",
                },
              })}
            />

            {/* item_code */}
            <Input
              required
              type="date"
              label="Tanggal"
              // placeholder=""
              className="col-span-3 md:col-span-1"
              error={Boolean(errors?.created_date)}
              helper={errors?.created_date?.message}
              {...register("created_date", {
                required: {
                  value: true,
                  message: "Wajib diisi",
                },
              })}
            />

            {/* unit */}
            <ComboBox
              required
              label="Supplier"
              placeholder="Nama Supplier"
              options={[
                { key: 1, label: "Farma 1" },
                { key: 2, label: "Farma 2" },
                { key: 3, label: "Farma 3" },
              ]}
              className="col-span-3 md:col-span-1"
              error={Boolean(errors?.supplier)}
              helper={errors?.supplier?.message}
              onValueChange={(val) => setValue("supplier", val.label)}
              {...register("supplier", {
                required: {
                  value: true,
                  message: "Wajib diisi",
                },
              })}
            />
          </div>

          <div className="grid grid-cols-12 gap-4 !rounded-none !bg-slate-100 px-8 py-4 shadow-sm">
            {/* item_name */}
            <ComboBox
              required
              label="Nama Obat/BHP"
              placeholder="Paracetamol"
              options={[
                { key: 1, label: "Obat 1" },
                { key: 2, label: "Obat 2" },
              ]}
              className="col-span-8 md:col-span-6"
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
              label="Kode Item"
              placeholder="9090xxxx"
              className="col-span-4 md:col-span-2"
              error={Boolean(errors?.item_code)}
              helper={errors?.item_code?.message}
              {...register("item_code", {
                required: {
                  value: true,
                  message: "Wajib diisi",
                },
              })}
            />

            {/* item_code */}
            <Input
              required
              type="number"
              label="Jumlah"
              placeholder="1"
              className="col-span-6 md:col-span-2"
              error={Boolean(errors?.quantity)}
              helper={errors?.quantity?.message}
              {...register("quantity", {
                required: {
                  value: true,
                  message: "Wajib diisi",
                },
              })}
            />

            {/* unit */}
            <ComboBox
              required
              label="Satuan"
              placeholder="Pcs"
              options={OPTIONS_UNIT}
              className="col-span-6 md:col-span-2"
              error={Boolean(errors?.unit)}
              helper={errors?.unit?.message}
              onValueChange={(val) => setValue("unit", val.label)}
              {...register("unit", {
                required: {
                  value: true,
                  message: "Wajib diisi",
                },
              })}
            />

            <Input
              required
              type="text"
              prefix="Rp"
              label="Harga Beli Satuan"
              placeholder=""
              className="col-span-6 md:col-span-3"
              error={Boolean(errors?.purchase_price)}
              helper={errors?.purchase_price?.message}
              {...register("purchase_price", {
                required: {
                  value: true,
                  message: "Wajib diisi",
                },
              })}
            />

            {/* selling_price */}
            <Input
              required
              type="text"
              prefix="Rp"
              label="Harga Jual"
              placeholder=""
              className="col-span-6 md:col-span-3"
              error={Boolean(errors?.selling_price)}
              helper={errors?.selling_price?.message}
              {...register("selling_price", {
                required: {
                  value: true,
                  message: "Wajib diisi",
                },
              })}
            />

            {/* expired_date */}
            <Input
              required
              type="date"
              label="Tanggal Kadaluarsa"
              placeholder=""
              className="col-span-6 md:col-span-3"
              error={Boolean(errors?.expired_date)}
              helper={errors?.expired_date?.message}
              {...register("expired_date", {
                required: {
                  value: true,
                  message: "Wajib diisi",
                },
              })}
            />

            <div className="col-span-12 mt-2 flex h-full items-center gap-2 md:col-span-3">
              <Button color="secondary" onClick={handleReset}>
                Reset
              </Button>
              <Button
                type="submit"
                color="primary"
                className="flex w-full items-center justify-center gap-2"
              >
                <FaArrowDown />
                Tambahkan
              </Button>
            </div>
          </div>
        </form>
        <div className="space-y-4 px-6 py-2">
          <Typography as="h4" bold>
            Data Entri
          </Typography>
          <StockEntryTable items={entryData} onDelete={handleDeleteEntry} />
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

export default StockNewEntry;
