import { Pagination, Table, Tooltip } from "flowbite-react";
import { useState } from "react";
import { FaEye, FaFileMedical, FaPencilAlt, FaTrashAlt } from "react-icons/fa";
import Card from "components/Card";
import Button from "components/Button";
import toIDR from "helpers/toIDR";

const MEDICAL_RECORD_ROW = [
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

const MEDICAL_RECORD_DATA = [
  {
    id: "92000384",
    name: "Paracetamol 60 mg / 0,6 mL Drops",
    stock: "10",
    unit: "pcs",
    category: "Obat",
    base_price: 15000,
    selling_price: 20000,
    supplier: "Afi Farma",
    expired_date: "Feb 2024",
  },
  {
    id: "92000384",
    name: "Paracetamol 60 mg / 0,6 mL Drops",
    stock: "10",
    unit: "pcs",
    category: "Obat",
    base_price: 15000,
    selling_price: 20000,
    supplier: "Afi Farma",
    expired_date: "Feb 2024",
  },
  {
    id: "92000384",
    name: "Paracetamol 60 mg / 0,6 mL Drops",
    stock: "10",
    unit: "pcs",
    category: "Obat",
    base_price: 15000,
    selling_price: 20000,
    supplier: "Afi Farma",
    expired_date: "Feb 2024",
  },
];

interface MedicalRecordTableProps {
  onPreview: () => void;
}

const MedicalRecordTable = ({ onPreview }: MedicalRecordTableProps) => {
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <Card className="rounded-2xl border-none p-6 shadow-sm">
      <div className=" min-w-2xl overflow-auto">
        <Table>
          <Table.Head>
            {MEDICAL_RECORD_ROW.map((item, index) => (
              <Table.HeadCell
                key={index}
                className="text-md whitespace-nowrap bg-slate-100 uppercase text-slate-800 dark:text-white"
              >
                {item}
              </Table.HeadCell>
            ))}
          </Table.Head>
          <Table.Body className="divide-y">
            {MEDICAL_RECORD_DATA.map((item, index) => (
              <Table.Row
                key={index}
                className="bg-white hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800"
              >
                <Table.Cell className="whitespace-nowrap font-medium text-slate-800 dark:text-white">
                  {item.id}
                </Table.Cell>
                <Table.Cell>{item.name}</Table.Cell>
                <Table.Cell>{item.stock}</Table.Cell>
                <Table.Cell>{item.unit}</Table.Cell>
                <Table.Cell>{item.category}</Table.Cell>
                <Table.Cell>{toIDR(item.base_price)}</Table.Cell>
                <Table.Cell>{toIDR(item.selling_price)}</Table.Cell>
                <Table.Cell>{item.supplier}</Table.Cell>
                <Table.Cell>{item.expired_date}</Table.Cell>
                <Table.Cell>
                  <div className="flex gap-1">
                    <Tooltip content="Ubah">
                      <Button
                        size="small"
                        color="primary"
                        onClick={onPreview}
                        className="py-2"
                      >
                        <FaPencilAlt />
                      </Button>
                    </Tooltip>
                    <Tooltip content="Hapus">
                      <Button
                        size="small"
                        color="error"
                        onClick={onPreview}
                        className="py-2"
                      >
                        <FaTrashAlt />
                      </Button>
                    </Tooltip>
                    <Tooltip content="Rekam Medis Baru">
                      <Button
                        size="small"
                        color="success"
                        onClick={onPreview}
                        className="py-2"
                      >
                        <FaFileMedical />
                      </Button>
                    </Tooltip>
                  </div>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>
      <div className="mt-4 flex justify-center">
        <Pagination
          currentPage={currentPage}
          onPageChange={(page) => setCurrentPage(page)}
          totalPages={100}
        />
      </div>
    </Card>
  );
};

export default MedicalRecordTable;
