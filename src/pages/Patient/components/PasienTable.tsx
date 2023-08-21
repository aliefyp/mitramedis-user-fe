import moment from "moment";
import { Pagination, Spinner, Table, Tooltip } from "flowbite-react";
import {
  FaBookMedical,
  FaPencilAlt,
  FaPrint,
  FaTrashAlt,
} from "react-icons/fa";
import Card from "components/Card";
import Button from "components/Button";
import EmptyData from "components/EmptyData";
import { PatientTypeData } from "types/patient";
import ModalConfirmation from "components/organism/ModalConfirmation";
import { useState } from "react";
import Typography from "components/Typography";

const PATIENT_TABLE_ROW = [
  "No. Rekam Medis",
  "Nama",
  "Umur",
  "NIK",
  "Alamat",
  "",
];

interface PaginationType {
  current_page: number;
  total_page: number;
}
interface PasienTablePreviewProps {
  data: PatientTypeData[];
  pagination: PaginationType;
  loading: boolean;
  onPageChange: (page: number) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string) => void;
  onView: (mr_id: string) => void;
}

const PasienTable = ({
  data,
  pagination,
  loading,
  onPageChange,
  onDelete,
  onEdit,
  onView,
}: PasienTablePreviewProps) => {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [tempId, setTempId] = useState("");

  const handleDeleteClick = (id: string) => {
    setTempId(id);
    setShowConfirmation(true);
  };

  const handleConfirmClick = () => {
    onDelete(tempId);
    setShowConfirmation(false);
  };

  return (
    <>
      <Card className="rounded-2xl border-none p-3 shadow-sm">
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
              {loading && (
                <Table.Cell colSpan={6}>
                  <Spinner size="lg" className="mx-auto w-full" />
                </Table.Cell>
              )}
              {!loading && data.length === 0 && (
                <Table.Cell colSpan={6}>
                  <EmptyData>Data tidak ditemukan</EmptyData>
                </Table.Cell>
              )}
              {!loading &&
                data?.map((item, index) => {
                  const age = moment.duration(moment().diff(item.birthdate));
                  const displayedAddress = `${item.village_name}, ${item.district_name}, ${item.city_name}, ${item.province_name}`;

                  return (
                    <Table.Row
                      key={index}
                      className="bg-white hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800"
                    >
                      <Table.Cell className="whitespace-nowrap font-medium text-slate-800 dark:text-white">
                        {item.medical_record_number}
                      </Table.Cell>
                      <Table.Cell>{item.patient_name}</Table.Cell>
                      <Table.Cell className="min-w-[80px]">{`${age.years()} tahun ${age.months()} bulan ${age.days()} hari`}</Table.Cell>
                      <Table.Cell>{item.id_card_number}</Table.Cell>
                      <Table.Cell>{displayedAddress}</Table.Cell>
                      <Table.Cell>
                        <div className="flex justify-end gap-1">
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
                              onClick={() => onEdit(item.patient_id)}
                              className="py-2"
                            >
                              <FaPencilAlt />
                            </Button>
                          </Tooltip>
                          <Tooltip content="Hapus">
                            <Button
                              size="small"
                              color="error"
                              onClick={() => handleDeleteClick(item.patient_id)}
                              className="py-2"
                            >
                              <FaTrashAlt />
                            </Button>
                          </Tooltip>
                          <Tooltip content="Riwayat">
                            <Button
                              size="small"
                              color="success"
                              onClick={() => onView(item.medical_record_number)}
                              className="py-2"
                            >
                              <FaBookMedical />
                            </Button>
                          </Tooltip>
                        </div>
                      </Table.Cell>
                    </Table.Row>
                  );
                })}
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
      <ModalConfirmation
        open={showConfirmation}
        onClose={() => setShowConfirmation(false)}
        type="warning"
        title="Hapus Pasien Ini?"
        message="Data pasien akan dihapus secara permanen"
        primaryAction="Ya, Hapus"
        onPrimaryActionClick={handleConfirmClick}
        secondaryAction="Batal"
        onSecondaryActionClick={() => setShowConfirmation(false)}
      />
    </>
  );
};

export default PasienTable;
