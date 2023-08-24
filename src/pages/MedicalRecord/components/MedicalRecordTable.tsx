import { Pagination, Spinner, Table, Tooltip } from "flowbite-react";
import { FaFileMedical, FaPencilAlt, FaTrashAlt } from "react-icons/fa";
import Card from "components/Card";
import Button from "components/Button";
import { MedicalRecordTypeData } from "types/medical-record";
import moment from "moment";
import Typography from "components/Typography";
import EmptyData from "components/EmptyData";

const MEDICAL_RECORD_ROW = [
  "No. Rekam Medis",
  "Nama Pasien",
  "Tanggal Visit",
  "Keluhan",
  "Diagnosis",
  "Status",
  "",
];

interface PaginationType {
  current_page: number;
  total_page: number;
}
interface MedicalRecordTableProps {
  data: MedicalRecordTypeData[];
  pagination: PaginationType;
  loading: boolean;
  onPageChange: (page: number) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string) => void;
  onSelect: (medical_record_number: string) => void;
}

const MedicalRecordTable = ({
  data,
  pagination,
  loading,
  onPageChange,
  onDelete,
  onEdit,
  onSelect,
}: MedicalRecordTableProps) => {
  return (
    <Card className="rounded-2xl border-none p-3 shadow-sm">
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
            {loading && (
              <Table.Cell colSpan={7}>
                <Spinner size="lg" className="mx-auto w-full" />
              </Table.Cell>
            )}
            {!loading && data.length === 0 && (
              <Table.Cell colSpan={7}>
                <EmptyData>Data tidak ditemukan</EmptyData>
              </Table.Cell>
            )}
            {!loading &&
              data?.map((item, index) => (
                <Table.Row
                  key={index}
                  className="bg-white hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800"
                >
                  <Table.Cell className="whitespace-nowrap font-medium text-slate-800 dark:text-white">
                    {item.medical_record_number}
                  </Table.Cell>
                  <Table.Cell>{item.patient_name}</Table.Cell>
                  <Table.Cell>
                    {moment(item.visit_date_time).format("dddd, DD MMMM YYYY")}
                  </Table.Cell>
                  <Table.Cell>{item.symptom}</Table.Cell>
                  <Table.Cell>{item.diagnosis}</Table.Cell>
                  <Table.Cell>{item.patient_status}</Table.Cell>
                  <Table.Cell>
                    <div className="flex gap-1">
                      <Tooltip content="Ubah">
                        <Button
                          size="small"
                          color="primary"
                          onClick={onEdit}
                          className="py-2"
                        >
                          <FaPencilAlt />
                        </Button>
                      </Tooltip>
                      <Tooltip content="Hapus">
                        <Button
                          size="small"
                          color="error"
                          onClick={onDelete}
                          className="py-2"
                        >
                          <FaTrashAlt />
                        </Button>
                      </Tooltip>
                      <Tooltip content="Rekam Medis Baru">
                        <Button
                          size="small"
                          color="success"
                          onClick={onSelect}
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

export default MedicalRecordTable;
