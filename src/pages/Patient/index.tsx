import { useEffect, useState } from "react";
import { useAllPatient, useDeletePatient } from "api/patient";
import PageHeading from "components/PageHeading";
import PasienFilter from "./components/PasienFilter";
import PasienTable from "./components/PasienTable";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "components/Button";
import { TbPlus } from "react-icons/tb";

const PatientPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [page, setPage] = useState(1);
  const [perPage] = useState(10);

  const filter = Object.fromEntries(new URLSearchParams(location.search));
  const query = new URLSearchParams({
    page: String(page),
    per_page: String(perPage),
    ...filter,
  }).toString();

  const { data, isFetching, refetch } = useAllPatient(query);
  const deletePatient = useDeletePatient();

  const handleEditPatient = (id: string) => {
    navigate(`/pasien/edit/${id}`);
  };

  const handleViewPatient = (medical_record_number: string) => {
    navigate(`/rekam-medis?medical_record_number=${medical_record_number}`);
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
            <TbPlus />
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
          onPageChange={setPage}
          onDelete={handleDeletePatient}
          onEdit={handleEditPatient}
          onView={handleViewPatient}
        />
      </div>
    </div>
  );
};

export default PatientPage;
