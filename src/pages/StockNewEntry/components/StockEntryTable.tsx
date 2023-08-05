import Button from "components/Button";
import EmptyData from "components/EmptyData";
import { Table, Tooltip } from "flowbite-react";
import toIDR from "helpers/toIDR";
import moment from "moment";
import { FaTrashAlt } from "react-icons/fa";
import { StockEntryType } from "types/stock";

interface StockEntryTableProps {
  items: StockEntryType[];
  onDelete: (index: number) => void;
}

const StockEntryTable = ({ items, onDelete }: StockEntryTableProps) => {
  return (
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
            <Table.Cell>{item.item_code}</Table.Cell>
            <Table.Cell>{item.item_name}</Table.Cell>
            <Table.Cell>{item.quantity}</Table.Cell>
            <Table.Cell>{item.unit}</Table.Cell>
            <Table.Cell>{toIDR(item.purchase_price)}</Table.Cell>
            <Table.Cell>{toIDR(item.selling_price)}</Table.Cell>
            <Table.Cell>
              {moment(item.expired_date).format("DD/MM/YY")}
            </Table.Cell>
            <Table.Cell>
              {toIDR(item.quantity * item.purchase_price)}
            </Table.Cell>

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
  );
};

export default StockEntryTable;
