import Card from "components/Card";
import EmptyData from "components/EmptyData";
import { Spinner, Table } from "flowbite-react";
import moment from "moment";
import { StockCardType } from "types/stock";

interface StockEntryTableProps {
  data: StockCardType[];
  loading: boolean;
}

const StockEntryTable = ({ data, loading }: StockEntryTableProps) => {
  return (
    <Card className="rounded-2xl border-none p-3 shadow-sm">
      <Table>
        <Table.Head>
          <Table.HeadCell className="text-md whitespace-nowrap bg-slate-100 uppercase text-slate-800 dark:text-white">
            No.
          </Table.HeadCell>
          <Table.HeadCell className="text-md whitespace-nowrap bg-slate-100 uppercase text-slate-800 dark:text-white">
            Nomor Transaksi/Invoice
          </Table.HeadCell>
          <Table.HeadCell className="text-md whitespace-nowrap bg-slate-100 uppercase text-slate-800 dark:text-white">
            Tanggal
          </Table.HeadCell>
          <Table.HeadCell className="text-md whitespace-nowrap bg-slate-100 uppercase text-slate-800 dark:text-white">
            Keterangan
          </Table.HeadCell>
          <Table.HeadCell className="text-md whitespace-nowrap bg-slate-100 uppercase text-slate-800 dark:text-white">
            Barang Masuk
          </Table.HeadCell>
          <Table.HeadCell className="text-md whitespace-nowrap bg-slate-100 uppercase text-slate-800 dark:text-white">
            Barang Keluar
          </Table.HeadCell>
          <Table.HeadCell className="text-md whitespace-nowrap bg-slate-100 uppercase text-slate-800 dark:text-white">
            Saldo Barang
          </Table.HeadCell>
          <Table.HeadCell className="text-md whitespace-nowrap bg-slate-100 uppercase text-slate-800 dark:text-white">
            Supplier / Nama Pasien
          </Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {loading && (
            <Table.Cell colSpan={10}>
              <Spinner size="lg" className="mx-auto w-full" />
            </Table.Cell>
          )}
          {!loading && !data?.length && (
            <Table.Cell colSpan={10}>
              <EmptyData>Data tidak ditemukan</EmptyData>
            </Table.Cell>
          )}
          {data?.map((item, index) => (
            <Table.Row
              key={index}
              className="bg-white hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800"
            >
              <Table.Cell>{index + 1}</Table.Cell>
              <Table.Cell>{"item.invoice"}</Table.Cell>
              <Table.Cell>
                {moment(item.created_at).format("DD/MM/YYYY")}
              </Table.Cell>
              <Table.Cell>{"item.remark"}</Table.Cell>
              <Table.Cell>{"item.item_in"}</Table.Cell>
              <Table.Cell>{"item.item_out"}</Table.Cell>
              <Table.Cell>{item.qty}</Table.Cell>
              <Table.Cell>{"item.respondent"}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </Card>
  );
};

export default StockEntryTable;
