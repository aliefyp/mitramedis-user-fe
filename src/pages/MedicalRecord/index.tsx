import { useEffect } from "react";
import PageHeading from "components/PageHeading";
import MedicalRecordFilter from "./components/MedicalRecordFilter";
import MedicalRecordTable from "./components/MedicalRecordTable";
// import ModalMedicalRecordPreview from "./components/ModalMedicalRecordPreview";
import { useLocation, useNavigate } from "react-router-dom";
import { useAllMedicalRecord, useDeleteMedicalRecord } from "api/medicalRecord";
import Button from "components/Button";
import { TbPlus } from "react-icons/tb";

const MedicalRecordPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { data, isFetching, setPage, refetch } = useAllMedicalRecord();
  const deleteMedicalRecord = useDeleteMedicalRecord();

  const handleEditMedicalRecord = (id: string) => {
    navigate(`/pasien/edit/${id}`);
  };

  const handleViewMedicalRecord = (medical_record_number: string) => {
    navigate(`/rekam-medis?medical_record_number=${medical_record_number}`);
  };

  const handleDeleteMedicalRecord = (id: string) => {
    deleteMedicalRecord.mutate({ medical_record_id: id });
  };

  const handleSubmitFilter = (filter) => {
    const query = new URLSearchParams(filter).toString();
    navigate(`${location.pathname}?${query}`);
  };

  useEffect(() => {
    if (deleteMedicalRecord.isSuccess) refetch();
  }, [deleteMedicalRecord.isSuccess, refetch]);

  return (
    <div>
      <PageHeading
        title="Data Rekam Medis"
        breadcrumbs={[{ text: "Rekam Medis" }]}
      >
        <Button
          className="w-full sm:w-auto"
          onClick={() => navigate("/rekam-medis/new")}
        >
          <div className="flex items-center gap-4">
            <TbPlus />
            Rekam Medis Baru
          </div>
        </Button>
      </PageHeading>
      <div className="space-y-4">
        <MedicalRecordFilter onSubmit={handleSubmitFilter} />
        <MedicalRecordTable
          data={data?.data?.data?.medical_record || []}
          pagination={data?.data?.data?.pagination}
          loading={isFetching}
          onPageChange={setPage}
          onDelete={handleDeleteMedicalRecord}
          onEdit={handleEditMedicalRecord}
          onSelect={handleViewMedicalRecord}
        />
      </div>
      {/* <ModalMedicalRecordPreview
        open={showPreview}
        onClose={() => setShowPreview(false)}
      /> */}
    </div>
  );
};

export default MedicalRecordPage;
