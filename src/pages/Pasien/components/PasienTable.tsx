import { Pagination, Table, Tooltip } from "flowbite-react";
import { useState } from "react";
import { FaEye, FaPencilAlt } from "react-icons/fa";
import Card from "components/Card";

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
                  <div className="flex space-x-2">
                    <Tooltip content="Lihat">
                      <div
                        onClick={onPreview}
                        className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-slate-50 hover:bg-slate-200 dark:bg-slate-600 dark:hover:bg-slate-700"
                      >
                        <FaEye className="text-lg text-cyan-600" />
                      </div>
                    </Tooltip>
                    <Tooltip content="Ubah">
                      <div className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-slate-50 hover:bg-slate-200 dark:bg-slate-600 dark:hover:bg-slate-700">
                        <FaPencilAlt className="text-lg text-cyan-600" />
                      </div>
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
