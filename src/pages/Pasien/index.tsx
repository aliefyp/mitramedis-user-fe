import { useEffect, useState } from "react";
import { useAllPatient, useDeletePatient } from "api/patient";
import PageHeading from "components/PageHeading";
import PasienFilter from "./components/PasienFilter";
import PasienTable from "./components/PasienTable";
import PasienPreviewModal from "./components/PasienPreviewModal";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "components/Button";
import { FaPlus } from "react-icons/fa";

const PasienPage = () => {
  const location = useLocation();
  const { data, isFetching, setPage, refetch } = useAllPatient();
  const deletePatient = useDeletePatient();
  const navigate = useNavigate();

  const [showPreview, setShowPreview] = useState(false);

  const handleEditPatient = (id: string) => {
    navigate(`/pasien/edit/${id}`);
  };

  const handleViewPatient = (mr_id: string) => {
    navigate(`/rekam-medis?mr_id=${mr_id}`);
  };

  const handleDeletePatient = (id: string) => {
    deletePatient.mutate({ patient_id: id });
  };

  const handleSubmitFilter = (filter) => {
    const query = new URLSearchParams(filter).toString();
    navigate(`${location.pathname}?${query}`);
  };

  useEffect(() => {
    if (deletePatient.isSuccess) refetch();
  }, [deletePatient.isSuccess, refetch]);

  return (
    <div>
      <PageHeading title="Data Pasien" breadcrumbs={[{ text: "Pasien" }]}>
        <Button
          className="w-full sm:w-auto"
          onClick={() => navigate("/pasien/new")}
        >
          <div className="flex items-center gap-4">
            <FaPlus />
            Pasien Baru
          </div>
        </Button>
      </PageHeading>
      <div className="space-y-4">
        <PasienFilter onSubmit={handleSubmitFilter} />
        <PasienTable
          data={data?.data?.data?.patient}
          pagination={data?.data?.data?.pagination}
          loading={isFetching}
          setPage={setPage}
          onDelete={handleDeletePatient}
          onEdit={handleEditPatient}
          onView={handleViewPatient}
        />
      </div>
      <PasienPreviewModal
        open={showPreview}
        onClose={() => setShowPreview(false)}
      />
    </div>
  );
};

export default PasienPage;
