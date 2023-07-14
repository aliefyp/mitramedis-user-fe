import Button from "components/Button";
import Input from "components/FormInput/Input";
import Select from "components/Select";
import TextArea from "components/FormInput/TextArea";
import Toggle from "components/Toggle";
import Typography from "components/Typography";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { PatientType } from "types/patient";
import {
  OPTIONS_EDUCATION,
  OPTIONS_GENDER,
  OPTIONS_MARITAL_STATUS,
  OPTIONS_OCCUPATION,
} from "../constants";

const FormAdult = () => {
  const [sameAsAddress1, setSameAsAddress1] = useState(false);
  const { register, handleSubmit } = useForm<PatientType>();

  const onSubmit = (val: PatientType) => {
    console.log(val);
  };

  const AddressForm = (index: 1 | 2) => (
    <>
      <TextArea
        label={index === 1 ? "Alamat Lengkap" : "Alamat Domisili"}
        placeholder="Alamat lengkap sesuai kartu identitas"
        className="col-span-4"
        {...register(`address_${index}`)}
      />

      <Select
        label="Provinsi"
        placeholder="Pilih provinsi"
        items={[]}
        className="col-span-4"
        {...register(`address_${index}_province`)}
      />

      <Select
        label="Kotamadya / Kabupaten"
        placeholder="Pilih kota atau kabupaten"
        items={[]}
        className="col-span-4"
        {...register(`address_${index}_city`)}
      />

      <Select
        label="Kecamatan"
        placeholder="Pilih kecamatan"
        items={[]}
        className="col-span-4 md:col-span-3"
        {...register(`address_${index}_district`)}
      />

      <Input
        label="Kode Pos"
        type="number"
        placeholder="00xxx"
        className="col-span-4 md:col-span-1"
        {...register(`address_${index}_zip`)}
      />

      <Select
        label="Kelurahan / Desa"
        placeholder="Pilih kelurahan atau desa"
        items={[]}
        className="col-span-4"
        {...register(`address_${index}_subdistrict`)}
      />

      <Input
        label="Rukun Tetangga / RT"
        type="number"
        placeholder="00x"
        className="col-span-2"
        {...register(`address_${index}_rt`)}
      />

      <Input
        label="Rukun Warga / RW"
        type="number"
        placeholder="00x"
        className="col-span-2"
        {...register(`address_${index}_rw`)}
      />
    </>
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <section className="grid grid-cols-4 gap-6 border-b py-8">
        <Typography as="h3" variant="h3" className="col-span-4">
          Identitas
        </Typography>

        {/* mr_number */}
        <Input
          readOnly
          disabled
          label="Nomor Rekam Medis"
          type="text"
          className="col-span-4"
          value="002121"
          {...register("mr_number")}
        />

        {/* patient_name */}
        <Input
          required
          label="Nama Lengkap"
          type="text"
          placeholder="Nama pasien sesuai KTP"
          className="col-span-4"
          {...register("patient_name")}
        />

        {/* id_card_number */}
        <Input
          label="NIK"
          type="text"
          placeholder="Silahkan masukkan 16 digit nomor identitas sesuai KTP"
          className="col-span-4"
          {...register("id_card_number")}
        />

        {/* id_card_number_2 */}
        <Input
          label="Nomor Identitas Lain (Khusus Pasien WNA)"
          type="text"
          placeholder="Silahkan masukkan nomor PASPOR / KITAS"
          className="col-span-4"
          {...register("id_card_number_2")}
        />

        {/* mother_name */}
        <Input
          required
          label="Nama Ibu Kandung"
          type="text"
          placeholder="Nama ibu kandung sesuai KTP"
          className="col-span-4"
          {...register("mother_name")}
        />

        {/* birth_place */}
        <Input
          label="Tempat Lahir"
          type="text"
          placeholder="Nama Kota/Kabupaten"
          className="col-span-4"
          {...register("birth_place")}
        />

        {/* birth_date */}
        <Input
          label="Tanggal Lahir"
          type="date"
          placeholder="DD/MM/YYYY"
          className="col-span-4"
          {...register("birth_date")}
        />

        {/* gender */}
        <Select
          id="gender"
          placeholder="Pilih jenis kelamin"
          label="Jenis Kelamin"
          items={OPTIONS_GENDER}
          className="col-span-4"
          {...register("gender")}
        />
      </section>

      <section className="grid grid-cols-4 gap-6 border-b py-8">
        <Typography as="h3" variant="h3" className="col-span-4">
          Alamat
        </Typography>

        {AddressForm(1)}
        <div className="col-span-4">
          <Toggle value={sameAsAddress1} onSwitch={setSameAsAddress1}>
            Alamat domisili sama dengan alamat pada kartu identitas
          </Toggle>
        </div>
        {!sameAsAddress1 && AddressForm(2)}
      </section>

      <section className="grid grid-cols-4 gap-6 border-b py-8">
        <Typography as="h3" variant="h3" className="col-span-4">
          Kontak
        </Typography>

        <Input
          label="No. HP"
          type="number"
          placeholder="08123xxxxxxx"
          className="col-span-4 md:col-span-2"
          {...register("phone_2")}
        />
        <Input
          label="No. Telepon Rumah"
          type="number"
          placeholder="08123xxxxxxx"
          className="col-span-4 md:col-span-2"
          {...register("phone_1")}
        />
      </section>

      <section className="grid grid-cols-4 gap-6 border-b py-8">
        <Typography as="h3" variant="h3" className="col-span-4">
          Lain-lain
        </Typography>

        <Select
          id="education"
          placeholder="Pilih pendidikan terakhir"
          label="Pendidikan Terakhir"
          items={OPTIONS_EDUCATION}
          className="col-span-4"
          {...register("education")}
        />

        <Select
          id="occupation"
          placeholder="Pekerjaan saat ini"
          label="Pekerjaan"
          items={OPTIONS_OCCUPATION}
          className="col-span-4"
          {...register("occupation")}
        />

        <Select
          id="marital_status"
          placeholder="Status pernikahan"
          label="Status pernikahan"
          items={OPTIONS_MARITAL_STATUS}
          className="col-span-4"
          {...register("marital_status")}
        />
        <Input
          label="Metode Pembayaran"
          type="number"
          placeholder="Pilih metode pembayaran yang digunakan"
          className="col-span-4 md:col-span-2"
          {...register("payment_method")}
        />
        <Input
          label="Asuransi Lainnya"
          type="number"
          placeholder="Tulis jenis asuransi"
          className="col-span-4 md:col-span-2"
          {...register("payment_method")}
        />
      </section>

      <div className="col-span-2 flex items-start gap-2 py-4">
        <Input type="checkbox" {...register("consent")} />
        <Typography>
          Pasien telah diberikan penjelasan mengenai <i>General Consent</i> atau
          Persetujuan Umum.
          <Typography link as="span" className="cursor-pointer ">
            Klik disini untuk cetak <i>General Consent</i>
          </Typography>
        </Typography>
      </div>
      <Button type="submit" color="primary" className="w-full">
        Simpan
      </Button>
    </form>
  );
};

export default FormAdult;
