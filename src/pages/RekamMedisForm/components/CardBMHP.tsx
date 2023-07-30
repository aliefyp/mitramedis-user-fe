import ButtonAddMore from "components/ButtonAddMore";
import Card from "components/Card";
import EmptyData from "components/EmptyData";
import ComboBox from "components/FormInput/ComboBox";
import Input from "components/FormInput/Input";
import IconButton from "components/IconButton";
import { Table } from "flowbite-react";
import { FaTrashAlt } from "react-icons/fa";

const CardBMHP = ({ items, onDelete, onAdd, onChange }) => {
  return (
    <Card className="min-w-lg rounded-xl border">
      <Table className="w-full">
        <Table.Head className="divide-x">
          <Table.HeadCell className="text-md items-start whitespace-nowrap bg-slate-100 uppercase text-slate-800 dark:text-white">
            Nama BMHP
          </Table.HeadCell>
          <Table.HeadCell className="text-md w-[240px] items-start whitespace-nowrap bg-slate-100 uppercase text-slate-800 dark:text-white">
            Jumlah
          </Table.HeadCell>
          <Table.HeadCell className="text-md w-[64px] items-start whitespace-nowrap bg-slate-100 uppercase text-slate-800 dark:text-white" />
        </Table.Head>
        <Table.Body className="divide-y">
          {items.length === 0 && (
            <Table.Row>
              <Table.Cell colSpan={3}>
                <EmptyData>Belum ada BMHP</EmptyData>
              </Table.Cell>
            </Table.Row>
          )}
          {items.map((item, index) => (
            <Table.Row
              key={index}
              className="bg-white hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800"
            >
              <Table.Cell>
                <ComboBox
                  type="text"
                  placeholder="Cari tindakan di sini"
                  options={[
                    { key: 1, label: "test 1" },
                    { key: 2, label: "test 2" },
                  ]}
                  onValueChange={(val) => onChange(index, "name", val.label)}
                />
              </Table.Cell>
              <Table.Cell className="w-[240px]">
                <Input
                  type="number"
                  placeholder="1"
                  defaultValue="1"
                  value={item.quantity}
                  onChange={(event) =>
                    onChange(
                      index,
                      "quantity",
                      (event.target as HTMLInputElement).value
                    )
                  }
                />
              </Table.Cell>
              <Table.Cell className="w-[64px]">
                <IconButton onClick={() => onDelete(index)}>
                  <FaTrashAlt className="cursor-pointer text-gray-500" />
                </IconButton>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
      <div className="p-4 pt-2">
        <ButtonAddMore onClick={onAdd}>Tambah BMHP</ButtonAddMore>
      </div>
    </Card>
  );
};

export default CardBMHP;
