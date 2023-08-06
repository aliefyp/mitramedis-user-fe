import EmptyData from "components/EmptyData";
import ComboBox from "components/FormInput/ComboBox";
import Input from "components/FormInput/Input";
import { Table } from "flowbite-react";
import React from "react";
import { StockType } from "types/stock";

interface Item extends Partial<StockType> {
  quantity: number;
  real_quantity: number;
  officer_name: string;
}

interface StockOpnameTableProps {
  items: Item[];
  onQuantityChange: (index: number, qty: number) => void;
  onOfficerChange: (index: number, name: string) => void;
}

const StockOpnameTable = ({
  items,
  onQuantityChange,
  onOfficerChange,
}: StockOpnameTableProps) => {
  return (
    // <div className="w-full overflow-x-auto">
    <Table>
      <Table.Head>
        <Table.HeadCell className="text-md whitespace-nowrap bg-slate-100 uppercase text-slate-800 dark:text-white">
          Kode Item
        </Table.HeadCell>
        <Table.HeadCell className="text-md whitespace-nowrap bg-slate-100 uppercase text-slate-800 dark:text-white">
          Nama Obat/BHP
        </Table.HeadCell>
        <Table.HeadCell className="text-md whitespace-nowrap bg-slate-100 uppercase text-slate-800 dark:text-white">
          Jumlah
        </Table.HeadCell>
        <Table.HeadCell className="text-md whitespace-nowrap bg-slate-100 uppercase text-slate-800 dark:text-white">
          Satuan
        </Table.HeadCell>
        <Table.HeadCell className="text-md whitespace-nowrap bg-slate-100 uppercase text-slate-800 dark:text-white">
          Riil / Fisik
        </Table.HeadCell>
        <Table.HeadCell className="text-md whitespace-nowrap bg-slate-100 uppercase text-slate-800 dark:text-white">
          Selisih
        </Table.HeadCell>
        <Table.HeadCell className="text-md whitespace-nowrap bg-slate-100 uppercase text-slate-800 dark:text-white">
          Petugas
        </Table.HeadCell>
      </Table.Head>
      <Table.Body className="divide-y">
        {items.length === 0 && (
          <Table.Row>
            <Table.Cell colSpan={10}>
              <EmptyData>Belum ada data</EmptyData>
            </Table.Cell>
          </Table.Row>
        )}
        {items.map((item, index) => (
          <Table.Row
            key={index}
            className="bg-white hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800"
          >
            <Table.Cell>{item.item_code}</Table.Cell>
            <Table.Cell>{item.item_name}</Table.Cell>
            <Table.Cell>{item.quantity}</Table.Cell>
            <Table.Cell>{item.unit}</Table.Cell>
            <Table.Cell>
              <Input
                className="w-[80px]"
                placeholder="0"
                name={`real-qty-${item.item_code}`}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  onQuantityChange(index, Number(e.target.value))
                }
              />
            </Table.Cell>
            <Table.Cell>{item.quantity - item.real_quantity}</Table.Cell>
            <Table.Cell>
              <ComboBox
                required
                type="text"
                options={[
                  { key: 1, label: "Petugas 1" },
                  { key: 2, label: "Petugas 2" },
                  { key: 3, label: "Petugas 3" },
                ]}
                placeholder="Nama Petugas"
                className="col-span-3 md:col-span-2"
                // error={Boolean(errors?.item_name)}
                // helper={errors?.item_name?.message}
                onValueChange={(val) => onOfficerChange(index, val.label)}
              />
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
    // </div>
  );
};

export default StockOpnameTable;
