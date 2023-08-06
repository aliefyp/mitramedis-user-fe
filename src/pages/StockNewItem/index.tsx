import { useState } from "react";
import Button from "components/Button";
import ComboBox from "components/FormInput/ComboBox";
import Input from "components/FormInput/Input";
import { useForm } from "react-hook-form";
import { StockType } from "types/stock";
import { OPTIONS_UNIT } from "./constants";
import PageHeading from "components/PageHeading";
import Card from "components/Card";
import AddNewSupplier from "./components/AddNewSupplier";
import { FaPlusCircle } from "react-icons/fa";
import { Tooltip } from "flowbite-react";

const StockNewItem = () => {
  const [showModalNewSupplier, setShowModalNewSupplier] = useState(false);
  const [suppliers, setSuppliers] = useState([
    { key: 1, label: "Farma 1" },
    { key: 2, label: "Farma 2" },
    { key: 3, label: "Farma 3" },
  ]);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<StockType>();

  const submitForm = (val: StockType) => {
    console.log(val);
  };

  const handleSubmitNewSupplier = (val: string) => {
    setSuppliers([...suppliers, { key: suppliers.length, label: val }]);
    setShowModalNewSupplier(false);
    setValue("supplier", val);
  };

  return (
    <div>
      <PageHeading
        title="Tambah Item Baru"
        breadcrumbs={[{ text: "Stok", url: "/stok" }, { text: "Item Baru" }]}
      />
      <Card className="max-w-screen-md rounded-2xl border-none p-6 shadow-sm">
        <form onSubmit={handleSubmit(submitForm)}>
          <div className="grid grid-cols-3 gap-6">
            {/* item_name */}
            <Input
              required
              type="text"
              label="Nama Item"
              placeholder="Paracetamol 60 mg / 0,6 mL Drops"
              className="col-span-3"
              error={Boolean(errors?.item_name)}
              helper={errors?.item_name?.message}
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

            {/* unit */}
            <ComboBox
              required
              label="Satuan"
              placeholder="Pcs"
              options={OPTIONS_UNIT}
              className="col-span-3 md:col-span-1"
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

            {/* category */}
            <ComboBox
              required
              label="Kategori"
              placeholder="Obat"
              options={OPTIONS_UNIT}
              className="col-span-3 md:col-span-1"
              error={Boolean(errors?.category)}
              helper={errors?.category?.message}
              onValueChange={(val) => setValue("category", val.label)}
              {...register("category", {
                required: {
                  value: true,
                  message: "Wajib diisi",
                },
              })}
            />

            {/* purchase_price */}
            <Input
              required
              type="text"
              prefix="Rp"
              label="Harga Beli Satuan"
              placeholder=""
              className="col-span-3 md:col-span-1"
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
              className="col-span-3 md:col-span-1"
              error={Boolean(errors?.selling_price)}
              helper={errors?.selling_price?.message}
              {...register("selling_price", {
                required: {
                  value: true,
                  message: "Wajib diisi",
                },
              })}
            />

            {/* bpjs_price */}
            <Input
              required
              type="text"
              prefix="Rp"
              label="Harga BPJS"
              placeholder=""
              className="col-span-3 md:col-span-1"
              error={Boolean(errors?.bpjs_price)}
              helper={errors?.bpjs_price?.message}
              {...register("bpjs_price", {
                required: {
                  value: true,
                  message: "Wajib diisi",
                },
              })}
            />

            {/* minimum_stock */}
            <Input
              type="text"
              prefix="Rp"
              label="Stok Minimum"
              placeholder=""
              className="col-span-3 md:col-span-1 md:col-start-1"
              {...register("minimum_stock")}
            />

            {/* supplier */}
            <div className="col-span-3 flex items-end gap-2 md:col-span-2 md:col-start-1">
              <ComboBox
                required
                label="Supplier"
                placeholder="Pilih Supplier"
                options={suppliers}
                error={Boolean(errors?.supplier)}
                helper={errors?.supplier?.message}
                className="grow"
                onValueChange={(val) => setValue("supplier", val.label)}
                {...register("supplier", {
                  required: {
                    value: true,
                    message: "Wajib diisi",
                  },
                })}
              />
              <div
                className={`flex h-full ${
                  Boolean(errors?.supplier) ? "items-center" : "items-end"
                } `}
              >
                <Tooltip content="Tambah Supplier Baru">
                  <Button
                    type="button"
                    color="secondary"
                    className="h-[42px]"
                    onClick={() => setShowModalNewSupplier(true)}
                  >
                    <div className="flex h-full items-center justify-center gap-1">
                      <FaPlusCircle />
                    </div>
                  </Button>
                </Tooltip>
              </div>
            </div>
            <div className="col-span-3 flex justify-end gap-2">
              <Button type="button" color="secondary">
                Kembali
              </Button>
              <Button type="submit" color="primary">
                Simpan
              </Button>
            </div>
          </div>
        </form>
        <AddNewSupplier
          open={showModalNewSupplier}
          onClose={() => setShowModalNewSupplier(false)}
          onSubmit={handleSubmitNewSupplier}
        />
      </Card>
    </div>
  );
};

export default StockNewItem;
