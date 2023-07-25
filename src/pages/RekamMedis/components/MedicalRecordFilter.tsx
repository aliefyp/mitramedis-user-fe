import { FaPlus } from "react-icons/fa";
import Card from "components/Card";
import Button from "components/Button";
import Input from "components/FormInput/Input";
// import React, { useState } from "react";
// import { useDebounce } from "use-debounce";
import { useForm } from "react-hook-form";
import { useState } from "react";
import SearchPasien from "components/SearchPasien";

interface MedicalRecordFilterParam {
  id_card_number: string;
  patient_name: string;
  mr_number: string;
}

const MedicalRecordFilter = () => {
  const { register, handleSubmit } = useForm<MedicalRecordFilterParam>();
  const [showPasienModal, setShowPasienModal] = useState(false);

  const onSubmit = (val: MedicalRecordFilterParam) => {
    console.log(val);
  };
  // const [value] = useDebounce(searchText, 500);

  // console.log(value);

  return (
    <>
      <Card className="rounded-2xl border-none p-6 shadow-sm">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-4 items-center gap-4">
            <Input
              label="Nomor Medical Record"
              type="text"
              id="mr_number"
              placeholder="12345"
              prefix="MR"
              className="col-span-4 sm:col-span-1"
              {...register("mr_number")}
            />
            <Input
              label="Nama Pasien"
              type="text"
              id="patient_name"
              placeholder="Tulis nama pasien"
              className="col-span-4 sm:col-span-1"
              {...register("patient_name")}
            />
            <Input
              label="NIK"
              type="text"
              id="id_card_number"
              placeholder="35123xxxxxxxxxxx"
              className="col-span-4 sm:col-span-1"
              {...register("patient_name")}
            />
            <div className="col-span-2 flex h-full items-end justify-end sm:col-span-1">
              <Button
                className="w-full sm:w-auto"
                onClick={() => setShowPasienModal(true)}
              >
                <div className="flex items-center gap-4">
                  <FaPlus />
                  Rekam Medis Baru
                </div>
              </Button>
            </div>
          </div>
        </form>
      </Card>

      <SearchPasien
        open={showPasienModal}
        onClose={() => setShowPasienModal(false)}
      />
    </>
  );
};

export default MedicalRecordFilter;
