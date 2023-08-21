import Button from "components/Button";
import Card from "components/Card";
import EmptyData from "components/EmptyData";
import { Table, Tooltip } from "flowbite-react";
import toIDR from "helpers/toIDR";
import moment from "moment";
import { FaTrashAlt } from "react-icons/fa";
import { PurchaseFormType } from "types/purchase";

interface StockPurchaseTableProps {
  items: PurchaseFormType[];
  onDelete: (index: number) => void;
  onSubmit: () => void;
}

const StockPurchaseTable = ({
  items,
  onDelete,
  onSubmit,
}: StockPurchaseTableProps) => {
  return (
    <Card className="space-y-4 rounded-2xl border-none p-3 shadow-sm">
      <div className="w-full overflow-x-auto">
        <Table>
          <Table.Head>
            <Table.HeadCell className="text-md whitespace-nowrap bg-slate-100 uppercase text-slate-800 dark:text-white">
              No.
            </Table.HeadCell>
            <Table.HeadCell className="text-md whitespace-nowrap bg-slate-100 uppercase text-slate-800 dark:text-white">
              Kode
            </Table.HeadCell>
            <Table.HeadCell className="text-md whitespace-nowrap bg-slate-100 uppercase text-slate-800 dark:text-white">
              Nama Item
            </Table.HeadCell>
            <Table.HeadCell className="text-md whitespace-nowrap bg-slate-100 uppercase text-slate-800 dark:text-white">
              Qty
            </Table.HeadCell>
            <Table.HeadCell className="text-md whitespace-nowrap bg-slate-100 uppercase text-slate-800 dark:text-white">
              Satuan
            </Table.HeadCell>
            <Table.HeadCell className="text-md whitespace-nowrap bg-slate-100 uppercase text-slate-800 dark:text-white">
              Harga Beli
            </Table.HeadCell>
            <Table.HeadCell className="text-md whitespace-nowrap bg-slate-100 uppercase text-slate-800 dark:text-white">
              Harga Jual
            </Table.HeadCell>
            <Table.HeadCell className="text-md whitespace-nowrap bg-slate-100 uppercase text-slate-800 dark:text-white">
              Kadaluarsa
            </Table.HeadCell>
            <Table.HeadCell className="text-md whitespace-nowrap bg-slate-100 uppercase text-slate-800 dark:text-white">
              Total
            </Table.HeadCell>

            <Table.HeadCell className="text-md whitespace-nowrap bg-slate-100 uppercase text-slate-800 dark:text-white" />
          </Table.Head>
          <Table.Body className="divide-y">
            {items.length === 0 && (
              <Table.Row>
                <Table.Cell colSpan={10}>
                  <EmptyData>Belum ada entri</EmptyData>
                </Table.Cell>
              </Table.Row>
            )}
            {items.map((item, index) => (
              <Table.Row
                key={index}
                className="bg-white hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800"
              >
                <Table.Cell>{index + 1}</Table.Cell>
                <Table.Cell>{item.code}</Table.Cell>
                <Table.Cell>{item.stock_string}</Table.Cell>
                <Table.Cell>{item.qty}</Table.Cell>
                <Table.Cell>{item.unit}</Table.Cell>
                <Table.Cell>{toIDR(Number(item.cogs))}</Table.Cell>
                <Table.Cell>{toIDR(Number(item.sales_price))}</Table.Cell>
                <Table.Cell>
                  {moment(item.expired_date).format("DD/MM/YY")}
                </Table.Cell>
                <Table.Cell>{toIDR(item.qty * Number(item.cogs))}</Table.Cell>

                <Table.Cell>
                  <Tooltip content="Hapus">
                    <Button
                      size="small"
                      color="error"
                      onClick={() => onDelete(index)}
                      className="py-2"
                    >
                      <FaTrashAlt />
                    </Button>
                  </Tooltip>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>

      <div className="flex justify-end gap-2">
        <Button type="submit" color="primary" onClick={onSubmit}>
          Simpan
        </Button>
      </div>
    </Card>
  );
};

export default StockPurchaseTable;
