import { useEffect, useState } from "react";
import { PurchaseFormType } from "types/purchase";
import PageHeading from "components/PageHeading";
import useToaster from "context/ToasterContext";
import StockPurchaseTable from "./components/StockPurchaseTable";
import StockPurchaseForm from "./components/StockPurchaseForm";
import { usePurchase } from "api/purchase";
import ModalConfirmation from "components/organism/ModalConfirmation";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

const StockPurchase = () => {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showPurchaseStatus, setShowPurchaseStatus] = useState(false);
  const [isPurchaseSuccess, setPurchaseSuccess] = useState(false);
  const [entryData, setEntryData] = useState<PurchaseFormType[]>([]);
  const purchase = usePurchase();
  const { open: openToaster } = useToaster();
  const navigate = useNavigate();

  const form = useForm<PurchaseFormType>();

  const addItem = (val: PurchaseFormType) => {
    setEntryData([...entryData, val]);
  };

  const handleDeleteEntry = (index: number) => {
    setEntryData(entryData.filter((_, i) => i !== index));
  };

  const handleSubmitPurchase = () => {
    if (!entryData.length) {
      openToaster({
        title: "Belum ada data",
        message: "Harap tambahkan data pembelian terlebih dahulu",
        variant: "error",
        autoClose: true,
      });
      return;
    }

    setShowConfirmation(true);
  };

  const handleConfirmClick = () => {
    setShowConfirmation(false);

    const { invoice, date, supplier_id } = entryData[0];
    const payload = {
      invoice,
      date,
      supplier_id,
      stock: entryData.map((item) => ({
        stock_id: item.stock_id,
        qty: Number(item.qty),
        cogs: Number(item.cogs),
        sales_price: item.sales_price,
        total: Number(item.qty) * Number(item.cogs),
        expired_date: item.expired_date,
      })),
    };

    purchase.mutate(payload);
  };

  const handleGoToStock = () => {
    navigate("/stok");
  };

  const handleBlankForm = () => {
    setShowPurchaseStatus(false);
    form.reset();
  };

  useEffect(() => {
    if (purchase.isSuccess) {
      setShowPurchaseStatus(true);
      setPurchaseSuccess(purchase.data?.status === 200);
    }
  }, [purchase.data?.status, purchase.isSuccess]);

  return (
    <>
      <div>
        <PageHeading
          title="Pembelian"
          breadcrumbs={[{ text: "Stok", url: "/stok" }, { text: "Pembelian" }]}
        />

        <div className="space-y-4">
          <StockPurchaseForm form={form} onSubmit={addItem} />
          <StockPurchaseTable
            items={entryData}
            onDelete={handleDeleteEntry}
            onSubmit={handleSubmitPurchase}
          />
        </div>
      </div>

      <ModalConfirmation
        open={showConfirmation}
        onClose={() => setShowConfirmation(false)}
        type="info"
        title="Konfirmasi"
        message="Pastikan semua data yang dimasukkan sudah benar"
        primaryAction="Simpan"
        onPrimaryActionClick={handleConfirmClick}
        secondaryAction="Periksa kembali"
        onSecondaryActionClick={() => setShowConfirmation(false)}
      />

      <ModalConfirmation
        open={showPurchaseStatus}
        type={isPurchaseSuccess ? "success" : "error"}
        title={isPurchaseSuccess ? "Berhasil" : "Gagal"}
        message={
          isPurchaseSuccess
            ? "Berhasil menyimpan pembelian"
            : "Gagal menyimpan data"
        }
        primaryAction={isPurchaseSuccess ? "Ke Manajemen Stok" : "Tutup"}
        onPrimaryActionClick={
          isPurchaseSuccess
            ? handleGoToStock
            : () => setShowPurchaseStatus(false)
        }
        {...(isPurchaseSuccess && {
          secondaryAction: "Pembelian Baru",
          onSecondaryActionClick: handleBlankForm,
        })}
        onClose={handleBlankForm}
      />
    </>
  );
};

export default StockPurchase;
