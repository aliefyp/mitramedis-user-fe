import { Pagination, Table, Tooltip } from "flowbite-react";
import { useState } from "react";
import {
  FaBookMedical,
  FaPencilAlt,
  FaPrint,
  FaTrashAlt,
} from "react-icons/fa";
import Card from "components/Card";
import Button from "components/Button";
import { useNavigate } from "react-router-dom";

const PATIENT_TABLE_ROW = [
  "No. Rekam Medis",
  "Nama",
  "Umur",
  "NIK",
  "Alamat",
  "",
];

const PATIENT_DATA = [
  {
    patient_id: "MR1",
    name: "Adit toor",
    age: "29 Tahun 1 Bulan 9 Hari",
    ktp: "128474839",
    address: "Saradan",
  },
  {
    patient_id: "MR5",
    name: "ahmad suhadi	",
    age: "28 Tahun 1 Bulan 21 Hari",
    ktp: "3010071304950001",
    address: "sidomekar, semboro, jember",
  },
  {
    patient_id: "MR6",
    name: "ahmad barun",
    age: "27 Tahun 10 Bulan 18 Hari",
    ktp: "3113071707950001",
    address: "semboro, semboro, jember",
  },
];

interface PasienTablePreviewProps {
  onPreview: () => void;
}

const PasienTable = ({ onPreview }: PasienTablePreviewProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();

  return (
    <Card className="rounded-2xl border-none p-6 shadow-sm">
      <div className=" min-w-2xl overflow-auto">
        <Table>
          <Table.Head>
            {PATIENT_TABLE_ROW.map((item, index) => (
              <Table.HeadCell
                key={index}
                className="text-md whitespace-nowrap bg-slate-100 uppercase text-slate-800 dark:text-white"
              >
                {item}
              </Table.HeadCell>
            ))}
          </Table.Head>
          <Table.Body className="divide-y">
            {PATIENT_DATA.map((item, index) => (
              <Table.Row
                key={index}
                className="bg-white hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800"
              >
                <Table.Cell className="whitespace-nowrap font-medium text-slate-800 dark:text-white">
                  {item.patient_id}
                </Table.Cell>
                <Table.Cell>{item.name}</Table.Cell>
                <Table.Cell>{item.age}</Table.Cell>
                <Table.Cell>{item.ktp}</Table.Cell>
                <Table.Cell>{item.address}</Table.Cell>
                <Table.Cell>
                  <div className="flex gap-1">
                    <Tooltip content="Cetak">
                      <Button
                        size="small"
                        color="secondary"
                        onClick={() => {}}
                        className="py-2"
                      >
                        <FaPrint />
                      </Button>
                    </Tooltip>
                    <Tooltip content="Ubah">
                      <Button
                        size="small"
                        color="primary"
                        onClick={() => navigate("/pasien/edit")}
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
                    <Tooltip content="Riwayat">
                      <Button
                        size="small"
                        color="success"
                        onClick={onPreview}
                        className="py-2"
                      >
                        <FaBookMedical />
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

export default PasienTable;
