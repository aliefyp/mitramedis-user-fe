import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaPlusCircle } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { Tooltip } from "flowbite-react";
import { useDebounce } from "use-debounce";
import Button from "components/Button";
import Card from "components/Card";
import ComboBox from "components/FormInput/ComboBox";
import Input from "components/FormInput/Input";
import PageHeading from "components/PageHeading";
import { useKfa } from "api/kfa";
import { useAddStock } from "api/stock";
import { useAddSupplier, useSupplier } from "api/supplier";
import { SupplierType } from "types/supplier";
import { StockType } from "types/stock";
import AddNewSupplier from "./components/AddNewSupplier";
import ModalConfirmation from "components/organism/ModalConfirmation";
import { OPTIONS_CATEGORY, OPTIONS_UNIT } from "./constants";

const StockNewItem = () => {
  const navigate = useNavigate();
  const [showSuccessAddSupplier, setShowSuccessAddSupplier] = useState(false);
  const [showAddStockNotif, setShowAddStockNotif] = useState(false);
  const [isSuccessAddStock, setSuccessAddStock] = useState(false);

  const [searchText, setSearchText] = useState("");
  const [showModalNewSupplier, setShowModalNewSupplier] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<StockType>();

  const [keyword] = useDebounce(searchText, 500);

  const { data: dataKfa, isLoading: loadingKfa } = useKfa({ keyword: keyword });
  const {
    data: dataSupplier,
    isLoading: loadingSupplier,
    refetch: refetchSupplier,
  } = useSupplier();
  const addSupplier = useAddSupplier();
  const addStock = useAddStock();

  const submitForm = (val: StockType) => {
    addStock.mutate(val);
  };

  const handleSubmitNewSupplier = (val: SupplierType) => {
    addSupplier.mutate(val);
  };

  const handleBlankForm = () => {
    setShowAddStockNotif(false);
    reset();
  };

  const handleGoToStockCard = () => {
    navigate(`/stok/card/${addStock.data.data.stock_id}`);
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

  useEffect(() => {
    if (addSupplier.isSuccess) {
      setShowSuccessAddSupplier(true);
      setShowModalNewSupplier(false);
      refetchSupplier();
    }
  }, [addSupplier.isSuccess, refetchSupplier]);

  useEffect(() => {
    if (addStock.isSuccess) {
      setShowAddStockNotif(true);
      setSuccessAddStock(addStock.data?.status === 200);
    }
  }, [addStock.data?.status, addStock.isSuccess]);

  return (
    <div>
      <PageHeading
        title="Item Baru"
        breadcrumbs={[{ text: "Stok", url: "/stok" }, { text: "Item Baru" }]}
      />
      <Card className="max-w-screen-md rounded-2xl border-none p-6 shadow-sm">
        <form onSubmit={handleSubmit(submitForm)}>
          <div className="grid grid-cols-3 gap-6">
            <ComboBox
              required
              type="text"
              label="Nama Item"
              placeholder="Paracetamol"
              className="col-span-3"
              loading={loadingKfa}
              options={itemOptions}
              error={Boolean(errors?.item_name)}
              helper={errors?.item_name?.message}
              onValueChange={(val) => {
                setValue("item_name", val.label);
                setValue("code", String(val.key));
              }}
              onSearch={(val) => setSearchText(val)}
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
              options={OPTIONS_CATEGORY}
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

            {/* cogs */}
            <Input
              required
              type="text"
              prefix="Rp"
              label="Harga Beli Satuan"
              placeholder=""
              className="col-span-3 md:col-span-1"
              error={Boolean(errors?.cogs)}
              helper={errors?.cogs?.message}
              {...register("cogs", {
                required: {
                  value: true,
                  message: "Wajib diisi",
                },
                pattern: {
                  value: /[0-9]/,
                  message: "Format tidak sesuai",
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
              className="col-span-3 md:col-span-1"
              error={Boolean(errors?.sales_price)}
              helper={errors?.sales_price?.message}
              {...register("sales_price", {
                required: {
                  value: true,
                  message: "Wajib diisi",
                },
                pattern: {
                  value: /[0-9]/,
                  message: "Format tidak sesuai",
                },
              })}
            />

            {/* minimum_stock */}
            <Input
              type="text"
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
                loading={loadingSupplier}
                options={supplierOptions}
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

        <ModalConfirmation
          open={showSuccessAddSupplier}
          type="success"
          title="Berhasil"
          message="Berhasil menambahkan data supplier"
          primaryAction="Tutup"
          onClose={() => setShowSuccessAddSupplier(false)}
          onPrimaryActionClick={() => setShowSuccessAddSupplier(false)}
        />

        <ModalConfirmation
          open={showAddStockNotif}
          type={isSuccessAddStock ? "success" : "error"}
          title={isSuccessAddStock ? "Berhasil" : "Gagal"}
          message={
            isSuccessAddStock
              ? "Berhasil menambahkan item baru"
              : "Gagal menyimpan data"
          }
          primaryAction={isSuccessAddStock ? "Ke Pembelian" : "Tutup"}
          onPrimaryActionClick={
            isSuccessAddStock
              ? handleGoToStockCard
              : () => setShowAddStockNotif(false)
          }
          {...(isSuccessAddStock && {
            secondaryAction: "Item Baru",
            onSecondaryActionClick: handleBlankForm,
          })}
          onClose={handleBlankForm}
        />
      </Card>
    </div>
  );
};

export default StockNewItem;
