import Button from "components/Button";
import Input from "components/FormInput/Input";
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
  OPTIONS_PAYMENT_METHOD,
} from "../constants";
import FormSection from "components/FormSection";
import CheckBox from "components/FormInput/CheckBox";
import ComboBox from "components/FormInput/ComboBox";

const FormAdult = () => {
  const [sameAsAddress1, setSameAsAddress1] = useState(false);
  const { register, handleSubmit } = useForm<PatientType>();
  const [showOtherPaymentMethod, setShowOtherPaymentMethod] = useState(false);

  const onSubmit = (val: PatientType) => {
    console.log(val);
  };

  const AddressForm = (index: 1 | 2) => {
    const isMainAddress = index === 1;

    return (
      <>
        <TextArea
          required={isMainAddress}
          label={index === 1 ? "Alamat Lengkap" : "Alamat Domisili"}
          placeholder="Alamat lengkap sesuai kartu identitas"
          className="col-span-4"
          rows={2}
          {...register(`address_${index}`, {
            required: isMainAddress,
          })}
        />

        <ComboBox
          required={isMainAddress}
          label="Provinsi"
          placeholder="Pilih provinsi"
          options={[]}
          className="col-span-4 md:col-span-2"
          {...register(`address_${index}_province`, {
            required: isMainAddress,
          })}
        />

        <ComboBox
          required={isMainAddress}
          label="Kotamadya / Kabupaten"
          placeholder="Pilih kota atau kabupaten"
          options={[]}
          className="col-span-4 md:col-span-2"
          {...register(`address_${index}_city`, {
            required: isMainAddress,
          })}
        />

        <ComboBox
          required={isMainAddress}
          label="Kecamatan"
          placeholder="Pilih kecamatan"
          options={[]}
          className="col-span-4 md:col-span-3"
          {...register(`address_${index}_district`, {
            required: isMainAddress,
          })}
        />

        <Input
          label="Kode Pos"
          type="number"
          placeholder="00xxx"
          className="col-span-4 md:col-span-1"
          {...register(`address_${index}_zip`)}
        />

        <ComboBox
          required={isMainAddress}
          label="Kelurahan / Desa"
          placeholder="Pilih kelurahan atau desa"
          options={[]}
          className="col-span-4 md:col-span-2"
          {...register(`address_${index}_subdistrict`, {
            required: isMainAddress,
          })}
        />

        <Input
          required={isMainAddress}
          label="Rukun Tetangga / RT"
          type="number"
          placeholder="00x"
          className="col-span-4 md:col-span-1"
          {...register(`address_${index}_rt`, {
            required: isMainAddress,
          })}
        />

        <Input
          required={isMainAddress}
          label="Rukun Warga / RW"
          type="number"
          placeholder="00x"
          className="col-span-4 md:col-span-1"
          {...register(`address_${index}_rw`, {
            required: isMainAddress,
          })}
        />
      </>
    );
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormSection title="Identitas">
        <div className="grid grid-cols-4 gap-6">
          {/* patient_name */}
          <Input
            required
            label="Nama Lengkap"
            type="text"
            placeholder="Nama pasien sesuai KTP"
            className="col-span-4"
            {...register("patient_name", {
              required: true,
            })}
          />

          {/* id_card_number */}
          <Input
            required
            label="NIK"
            type="text"
            placeholder="16 digit nomor KTP"
            className="col-span-4 md:col-span-2"
            {...register("id_card_number", {
              required: true,
            })}
          />

          {/* id_card_number_2 */}
          <Input
            label="Nomor Identitas Lain (Khusus WNA)"
            type="text"
            placeholder="Nomor PASPOR / KITAS"
            className="col-span-4 md:col-span-2"
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
            required
            label="Tempat Lahir"
            type="text"
            placeholder="Nama Kota/Kabupaten"
            className="col-span-4 md:col-span-2"
            {...register("birth_place", {
              required: true,
            })}
          />

          {/* birth_date */}
          <Input
            required
            label="Tanggal Lahir"
            type="date"
            placeholder="DD/MM/YYYY"
            className="col-span-4 md:col-span-2"
            {...register("birth_date", {
              required: true,
            })}
          />

          {/* gender */}
          <ComboBox
            required
            id="gender"
            placeholder="Pilih jenis kelamin"
            label="Jenis Kelamin"
            options={OPTIONS_GENDER.map((item, index) => ({
              key: index + 1,
              label: item,
            }))}
            className="col-span-4 md:col-span-2"
            {...register("gender", {
              required: true,
            })}
          />
        </div>
      </FormSection>

      <FormSection title="Alamat">
        <div className="grid grid-cols-4 gap-6">
          {AddressForm(1)}
          <div className="col-span-4">
            <Toggle value={sameAsAddress1} onSwitch={setSameAsAddress1}>
              Alamat domisili sama dengan alamat pada kartu identitas
            </Toggle>
          </div>
          {!sameAsAddress1 && AddressForm(2)}
        </div>
      </FormSection>

      <FormSection title="Kontak">
        <div className="grid grid-cols-4 gap-6">
          <Input
            required
            label="No. HP"
            type="number"
            placeholder="08123xxxxxxx"
            className="col-span-4 md:col-span-2"
            {...register("phone_1", {
              required: true,
            })}
          />
          <Input
            label="No. Telepon Rumah"
            type="number"
            placeholder="08123xxxxxxx"
            className="col-span-4 md:col-span-2"
            {...register("phone_2")}
          />
        </div>
      </FormSection>

      <FormSection title="Lain-lain">
        <div className="grid grid-cols-3 gap-6">
          <ComboBox
            id="education"
            placeholder="Pilih pendidikan terakhir"
            label="Pendidikan Terakhir"
            options={OPTIONS_EDUCATION.map((item, index) => ({
              key: index + 1,
              label: item,
            }))}
            className="col-span-3 md:col-span-1"
            {...register("education")}
          />

          <ComboBox
            id="occupation"
            placeholder="Pekerjaan saat ini"
            label="Pekerjaan"
            options={OPTIONS_OCCUPATION.map((item, index) => ({
              key: index + 1,
              label: item,
            }))}
            className="col-span-3 md:col-span-1"
            {...register("occupation")}
          />

          <ComboBox
            required
            id="marital_status"
            placeholder="Status pernikahan"
            label="Status pernikahan"
            options={OPTIONS_MARITAL_STATUS.map((item, index) => ({
              key: index + 1,
              label: item,
            }))}
            className="col-span-3 md:col-span-1"
            {...register("marital_status", {
              required: true,
            })}
          />
          <ComboBox
            label="Metode Pembayaran"
            placeholder="Pilih metode pembayaran yang digunakan"
            className="col-span-3 md:col-span-2"
            onValueChange={(val: { key: number; label: string }) =>
              setShowOtherPaymentMethod(val.label === "Asuransi Lainnya")
            }
            options={OPTIONS_PAYMENT_METHOD.map((item, index) => ({
              key: index + 1,
              label: item,
            }))}
            {...register("payment_method")}
          />
          {showOtherPaymentMethod && (
            <Input
              label="Asuransi Lainnya"
              type="text"
              placeholder="Tulis jenis asuransi"
              className="col-span-3 md:col-span-1"
              {...register("payment_method_other")}
            />
          )}
        </div>
      </FormSection>

      <div className="col-span-2 flex items-start gap-2 py-6">
        <CheckBox {...register("consent")} />
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
