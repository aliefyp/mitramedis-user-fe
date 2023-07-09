import { useForm } from "react-hook-form";
import PageHeading from "components/PageHeading";
import Input from "components/Input";
import Button from "components/Button";
import Card from "components/Card";
import { PatientType } from "types/patient";
import Select from "components/Select";
import TextArea from "components/TextArea";
import Toggle from "components/Toggle";
import { useState } from "react";

interface PasienFormProps {
  type: "new" | "edit";
}

const PasienForm = ({ type }: PasienFormProps) => {
  const [isNewborn, setNewborn] = useState(false);
  // const [newbornHasName, setNewbornHasName] = useState(false);
  const { register, handleSubmit } = useForm<PatientType>();
  const isEdit = type === "edit";

  const onSubmit = (val: PatientType) => {
    console.log(val);
  };

  return (
    <div>
      <PageHeading
        title={isEdit ? "Update Data Pasien" : "Pendaftaran Pasien Baru"}
        breadcrumbs={[
          { text: "Pasien", url: "/pasien" },
          isEdit ? { text: "Ubah Data Pasien" } : { text: "Pasien Baru" },
        ]}
      />
      <Card className="max-w-screen-md rounded-2xl border-none p-6 shadow-sm">
        <form
          className="grid grid-cols-2 gap-6"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Toggle
            value={isNewborn}
            onSwitch={setNewborn}
            className="col-span-2"
          >
            Pasien adalah bayi baru lahir
          </Toggle>
          <Input
            prefix={isNewborn ? "Bayi Ny." : undefined}
            required
            label={isNewborn ? "Nama Bayi" : "Nama Lengkap"}
            type="text"
            placeholder={isNewborn ? "Nama ibu bayi" : "Nama pasien sesuai KTP"}
            className="col-span-2"
            {...register("patient_name")}
          />
          {!isNewborn && (
            <Input
              required
              label="Nama Ibu Kandung"
              type="text"
              placeholder="Nama ibu kandung sesuai KTP"
              className="col-span-2"
              {...register("mother_name")}
            />
          )}
          <Input
            label="Tempat Lahir"
            type="text"
            placeholder="Nama Kota/Kabupaten"
            className="col-span-2"
            {...register("birth_place")}
          />
          <Input
            label="Tanggal Lahir"
            type="date"
            placeholder="DD/MM/YYYY"
            className="col-span-2"
            {...register("birth_date")}
          />

          {isNewborn && (
            <div className="col-span-2">
              <div className=" grid grid-cols-2 gap-6">
                <Select
                  label="Jam"
                  id="birth_hour"
                  placeholder="00"
                  items={[
                    "00",
                    "01",
                    "02",
                    "03",
                    "04",
                    "05",
                    "06",
                    "07",
                    "08",
                    "09",
                    "10",
                    "11",
                    "12",
                    "13",
                    "14",
                    "15",
                    "16",
                    "17",
                    "18",
                    "19",
                    "20",
                    "21",
                    "22",
                    "23",
                  ]}
                  className="col-span-1"
                  {...register("birth_hour")}
                />
                <Select
                  label="Menit"
                  id="birth_minute"
                  placeholder="00"
                  items={[
                    "00",
                    "01",
                    "02",
                    "03",
                    "04",
                    "05",
                    "06",
                    "07",
                    "08",
                    "09",
                    "10",
                    "11",
                    "12",
                    "13",
                    "14",
                    "15",
                    "16",
                    "17",
                    "18",
                    "19",
                    "20",
                    "21",
                    "22",
                    "23",
                    "24",
                    "25",
                    "26",
                    "27",
                    "28",
                    "29",
                    "30",
                    "31",
                    "32",
                    "33",
                    "34",
                    "35",
                    "36",
                    "37",
                    "38",
                    "39",
                    "40",
                    "41",
                    "42",
                    "43",
                    "44",
                    "45",
                    "46",
                    "47",
                    "48",
                    "49",
                    "50",
                    "51",
                    "52",
                    "53",
                    "54",
                    "55",
                    "56",
                    "57",
                    "58",
                    "59",
                    "60",
                  ]}
                  className="col-span-1"
                  {...register("birth_minute")}
                />
              </div>
            </div>
          )}

          <Select
            id="gender"
            placeholder="Pilih jenis kelamin"
            label="Jenis Kelamin"
            items={[
              "Tidak diketahui",
              "Laki-laki",
              "Perempuan",
              "Tidak dapat ditentukan",
              "Tidak mengisi",
            ]}
            className="col-span-2"
            {...register("gender")}
          />

          {!isNewborn && (
            <>
              <Select
                id="religion"
                placeholder="Pilih agama"
                label="Agama"
                items={[
                  "Islam",
                  "Kristen",
                  "Katolik",
                  "Hindu",
                  "Budha",
                  "Khonghucu",
                  "Penghayat",
                  "Lain-lain",
                ]}
                className="col-span-2 md:col-span-1"
                {...register("religion")}
              />

              <Input
                label="Suku"
                type="text"
                placeholder="Suku"
                className="col-span-2 md:col-span-1"
                {...register("tribe")}
              />

              <TextArea
                label="Alamat KTP"
                placeholder="Alamat lengkap sesuai KTP"
                className="col-span-2"
                {...register("address_1")}
              />
              <TextArea
                label="Alamat Domisili"
                placeholder="Alamat tinggal saat ini"
                className="col-span-2"
                {...register("address_2")}
              />

              <Input
                label="No. Telepon Rumah"
                type="number"
                placeholder="08123xxxxxxx"
                className="col-span-2 md:col-span-1"
                {...register("phone_1")}
              />

              <Input
                label="No. Telepon HP"
                type="number"
                placeholder="08123xxxxxxx"
                className="col-span-2 md:col-span-1"
                {...register("phone_2")}
              />

              <Select
                id="education"
                placeholder="Pilih pendidikan terakhir"
                label="Pendidikan Terakhir"
                items={[
                  "Tidak Sekolah",
                  "SD",
                  "SLTP/Sederajat",
                  "SLTA/Sederajat",
                  "D1-D3/Sederajat",
                  "S1",
                  "S2",
                  "S3",
                ]}
                className="col-span-2"
                {...register("education")}
              />

              <Select
                id="occupation"
                placeholder="Pekerjaan saat ini"
                label="Pekerjaan"
                items={[
                  "Tidak bekerja",
                  "PNS",
                  "TNI/Polri",
                  "BUMN",
                  "Pegawai Swasta/Wiraswasta",
                  "Lain-lain",
                ]}
                className="col-span-2"
                {...register("education")}
              />

              <Select
                id="marital_status"
                placeholder="Status pernikahan"
                label="Status pernikahan"
                items={["Belum kawin", "Kawin", "Cerai hidup", "Cerai mati"]}
                className="col-span-2"
                {...register("marital_status")}
              />
            </>
          )}

          <Button type="submit" color="primary" className="col-span-2">
            Submit
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default PasienForm;
