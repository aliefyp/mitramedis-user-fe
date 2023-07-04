import Button from "components/Button";
import PageHeading from "components/PageHeading";
import { useNavigate } from "react-router-dom";

const RekamMedis = () => {
  const navigate = useNavigate();

  return (
    <div>
      <PageHeading
        title="Rekam Medis"
        breadcrumbs={[{ text: "Rekam Medis", url: "/rekam-medis" }]}
      />
      <Button onClick={() => navigate("/rekam-medis/new")}>
        Rekam Medis Baru
      </Button>
    </div>
  );
};

export default RekamMedis;
