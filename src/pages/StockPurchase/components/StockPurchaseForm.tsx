import Card from "components/Card";
import Button from "components/Button";
import Input from "components/FormInput/Input";
import { PurchaseFormType } from "types/purchase";
import ComboBox from "components/FormInput/ComboBox";
import { OPTIONS_UNIT } from "../constants";
import { FaArrowDown } from "react-icons/fa";
import { useKfa } from "api/kfa";
import { useSupplier } from "api/supplier";
import { useMemo, useState } from "react";
import { useDebounce } from "use-debounce";

const StockPurchaseForm = ({ form, onSubmit }) => {
  const [searchText, setSearchText] = useState("");
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = form;

  const { data: dataSupplier, isLoading: loadingSupplier } = useSupplier();

  const [keyword] = useDebounce(searchText, 500);
  const { data: dataKfa, isLoading: loadingKfa } = useKfa({ keyword: keyword });

  const handleReset = () => {
    reset({
      stock_id: null,
      code: null,
      qty: null,
      unit: null,
      cogs: null,
      sales_price: null,
      expired_date: null,
    });
  };

  const submitForm = (val: PurchaseFormType) => {
    handleReset();
    onSubmit(val);
  };

  const itemOptions = useMemo(() => {
    if (!dataKfa?.data?.result) return [];

    return dataKfa?.data?.result?.map((item) => ({
      key: item.kfa_code,
      label: item.display_name,
    }));
  }, [dataKfa]);

  const supplierOptions = useMemo(() => {
    if (!dataSupplier?.data?.data?.supplier) return [];

    return dataSupplier?.data?.data?.supplier?.map((item) => ({
      key: item.supplier_id,
      label: item.supplier_name,
    }));
  }, [dataSupplier]);

  return (
    <Card className="rounded-2xl border-none shadow-sm">
      <form onSubmit={handleSubmit(submitForm)}>
        <div className="grid grid-cols-3 gap-6 p-3">
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

          {/* code */}
          <Input
            required
            type="date"
            label="Tanggal"
            // placeholder=""
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

          {/* unit */}
          <ComboBox
            required
            label="Supplier"
            placeholder="Nama Supplier"
            loading={loadingSupplier}
            options={supplierOptions}
            className="col-span-3 md:col-span-1"
            error={Boolean(errors?.supplier_id)}
            helper={errors?.supplier_id?.message}
            onValueChange={(val) => {
              setValue("supplier_id", Number(val.key));
              setValue("supplier_string", val.label);
            }}
            {...register("supplier_id", {
              required: {
                value: true,
                message: "Wajib diisi",
              },
            })}
          />
        </div>

        <div className="grid grid-cols-12 gap-4 rounded-b-xl !bg-slate-100 p-3">
          {/* item_name */}
          <ComboBox
            required
            label="Nama Obat/BHP"
            placeholder="Paracetamol"
            loading={loadingKfa}
            options={itemOptions}
            className="col-span-8 md:col-span-6"
            error={Boolean(errors?.stock_id)}
            helper={errors?.stock_id?.message}
            onValueChange={(val) => {
              setValue("code", String(val.key));
              setValue("stock_id", Number(val.key));
              setValue("stock_string", val.label);
            }}
            onSearch={(val) => setSearchText(val)}
            {...register("stock_id", {
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
            label="Kode Item"
            placeholder="9090xxxx"
            className="col-span-4 md:col-span-2"
            error={Boolean(errors?.code)}
            helper={errors?.code?.message}
            {...register("code", {
              required: {
                value: true,
                message: "Wajib diisi",
              },
            })}
          />

          {/* code */}
          <Input
            required
            type="number"
            label="Jumlah"
            placeholder="1"
            className="col-span-6 md:col-span-2"
            error={Boolean(errors?.qty)}
            helper={errors?.qty?.message}
            {...register("qty", {
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
            error={Boolean(errors?.cogs)}
            helper={errors?.cogs?.message}
            {...register("cogs", {
              required: {
                value: true,
                message: "Wajib diisi",
              },
            })}
          />

          {/* sales_price */}
          <Input
            required
            type="text"
            prefix="Rp"
            label="Harga Jual"
            placeholder=""
            className="col-span-6 md:col-span-3"
            error={Boolean(errors?.sales_price)}
            helper={errors?.sales_price?.message}
            {...register("sales_price", {
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
            {/* <Button color="secondary" onClick={handleReset}>
              Reset
            </Button> */}
            <Button
              type="submit"
              color="secondary"
              className="flex w-full items-center justify-center gap-2"
            >
              <FaArrowDown />
              Tambahkan
            </Button>
          </div>
        </div>
      </form>
    </Card>
  );
};

export default StockPurchaseForm;
