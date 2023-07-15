import { useState } from "react";
import SearchMedicine from "./SearchMedicine";
import ButtonAddMore from "components/ButtonAddMore";
import Card from "components/Card";
import Typography from "components/Typography";
import { FaNotesMedical } from "react-icons/fa";
import Button from "components/Button";

interface FormResepObatType {
  medicine_name: string;
  type: string;
  unit: string;
  qty: string;
  frequency_count: number;
  frequency_unit: string;
  time: string;
  time_note: string;
  span: string;
  span_note: string;
  method: string;
}

const FormResepObat = () => {
  const [showMedicineModal, setShowMedicineModal] = useState(false);
  const [medicines, setMedicines] = useState<FormResepObatType[]>([]);

  const handleAddMedicine = (med) => {
    setShowMedicineModal(false);
    setMedicines([...medicines, med]);
  };

  const onSubmit = (val: FormResepObatType) => {
    console.log(val);
  };

  return (
    <>
      <div className="py-6">
        <div className="space-y-4">
          {medicines.map((item, index) => (
            <Card className="border shadow-lg">
              <div className="flex items-center gap-4 border-b p-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full border-4 border-lime-500">
                  <FaNotesMedical className="text-lg text-gray-500" />
                </div>
                <div className="grow">
                  <Typography bold>Mixagrip Flu dan Batuk</Typography>
                  <Typography smaller bold className="!text-gray-500">
                    2mg · 60tablet
                  </Typography>
                </div>
                <div className="flex flex-col gap-1">
                  <Button
                    size="small"
                    color="error"
                    onClick={() =>
                      setMedicines(medicines.filter((_, i) => i !== index))
                    }
                  >
                    Hapus
                  </Button>
                  <Button size="small" color="warning">
                    Edit
                  </Button>
                </div>
              </div>
              <div className="grid grid-cols-2 divide-x">
                <div className="col-span-1 p-2 text-center">
                  <Typography
                    smaller
                    bold
                    className="mb-2 uppercase !text-gray-500"
                  >
                    Aturan Pakai
                  </Typography>
                  <Typography small>3x sehari</Typography>
                  <Typography small>Sebelum makan</Typography>
                </div>
                <div className="col-span-1 p-2 text-center">
                  <Typography
                    smaller
                    bold
                    className="mb-2 uppercase !text-gray-500"
                  >
                    Rute Pemberian
                  </Typography>
                  <Typography small>Oral</Typography>
                </div>
              </div>
            </Card>
          ))}
          <ButtonAddMore onClick={() => setShowMedicineModal(true)}>
            Tambah Obat
          </ButtonAddMore>
        </div>
      </div>

      <SearchMedicine
        open={showMedicineModal}
        onClose={() => setShowMedicineModal(false)}
        onSubmit={(med) => handleAddMedicine(med)}
      />
    </>
  );
};

export default FormResepObat;
