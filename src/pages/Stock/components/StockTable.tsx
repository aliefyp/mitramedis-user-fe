import { Pagination, Spinner, Table, Tooltip } from "flowbite-react";
import Card from "components/Card";
import Button from "components/Button";
import toIDR from "helpers/toIDR";
import { StockType } from "types/stock";
import moment from "moment";
import Typography from "components/Typography";
import { TbEye } from "react-icons/tb";
import EmptyData from "components/EmptyData";

const STOK_TABLE_ROW = [
  "Kode",
  "Nama Item",
  "Stok",
  "Satuan",
  "Kategori",
  "Harga Pokok",
  "Harga Jual",
  "Supplier",
  "Exp",
  "",
];

interface PaginationType {
  current_page: number;
  total_page: number;
}

interface StockTableProps {
  data: StockType[];
  pagination: PaginationType;
  loading: boolean;
  onPageChange: (page: number) => void;
  onView: (id: string) => void;
}

const StockTable = ({
  data,
  pagination,
  loading,
  onPageChange,
  onView,
}: StockTableProps) => {
  return (
    <Card className="rounded-2xl border-none p-3 shadow-sm">
      <div className=" min-w-2xl overflow-auto">
        <Table>
          <Table.Head>
            {STOK_TABLE_ROW.map((item, index) => (
              <Table.HeadCell
                key={index}
                className="text-md whitespace-nowrap bg-slate-100 uppercase text-slate-800 dark:text-white"
              >
                {item}
              </Table.HeadCell>
            ))}
          </Table.Head>
          <Table.Body className="divide-y">
            {loading && (
              <Table.Cell colSpan={10}>
                <Spinner size="lg" className="mx-auto w-full" />
              </Table.Cell>
            )}
            {!loading && !data.length && (
              <Table.Cell colSpan={10}>
                <EmptyData>Data tidak ditemukan</EmptyData>
              </Table.Cell>
            )}
            {data?.map((item, index) => (
              <Table.Row
                key={index}
                className="bg-white hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800"
              >
                <Table.Cell className="whitespace-nowrap font-medium text-slate-800 dark:text-white">
                  {item.code}
                </Table.Cell>
                <Table.Cell>{item.item_name}</Table.Cell>
                <Table.Cell>{item.current_stock}</Table.Cell>
                <Table.Cell>{item.unit}</Table.Cell>
                <Table.Cell>{item.category}</Table.Cell>
                <Table.Cell>{toIDR(Number(item.cogs))}</Table.Cell>
                <Table.Cell>{toIDR(Number(item.sales_price))}</Table.Cell>
                <Table.Cell>{item.supplier_id}</Table.Cell>
                <Table.Cell>
                  {moment(item.expired_date).isValid()
                    ? moment(item.expired_date).format("DD MMMM YYYY")
                    : ""}
                </Table.Cell>
                <Table.Cell>
                  <div className="flex gap-1">
                    <Tooltip content="Lihat Stok">
                      <Button
                        size="small"
                        color="primary"
                        onClick={() => onView(item.code)}
                        className="py-2"
                      >
                        <TbEye />
                      </Button>
                    </Tooltip>
                  </div>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>
      {pagination && (
        <div className="mt-4 flex items-center justify-end gap-2">
          <Typography className="mt-2 text-sm !text-gray-400">
            {`Menampilkan halaman ${pagination?.current_page || 0} dari ${
              pagination?.total_page || 0
            }`}
          </Typography>
          <Pagination
            currentPage={pagination?.current_page}
            totalPages={pagination?.total_page}
            onPageChange={onPageChange}
          />
        </div>
      )}
    </Card>
  );
};

export default StockTable;
