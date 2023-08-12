import Button from "components/Button";
import Input from "components/FormInput/Input";
import TextArea from "components/FormInput/TextArea";
import Toggle from "components/Toggle";
import Typography from "components/Typography";
import { useEffect, useMemo, useState } from "react";
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
// import ConfirmationModal from "./ConfirmationModal";
import useTeritory from "api/address/useTeritory";

interface FormAdultProps {
  onSubmit: (values: PatientType) => void;
}

const FormAdult = ({ onSubmit }: FormAdultProps) => {
  const [sameAsAddress1, setSameAsAddress1] = useState(false);
  const [showOtherPaymentMethod, setShowOtherPaymentMethod] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [formData, setFormData] = useState<PatientType | undefined>(undefined);
  const [searchQuery, setSearchQuery] = useState({
    province: "",
    city: "",
    district: "",
    village: "",
  });

  console.log(showConfirmation, formData, onSubmit);

  const { register, setValue, watch, handleSubmit } = useForm<PatientType>();

  const watchProvince = watch("province_code");
  const watchCity = watch("city_code");
  const watchDistrict = watch("district_code");

  const { data } = useTeritory({
    selectedProvince: watchProvince,
    selectedCity: watchCity,
    selectedDistrict: watchDistrict,
  });

  const submitForm = (val: PatientType) => {
    setFormData(val);
    setShowConfirmation(true);
  };

  const handleSearchQueryChange = (key: string, val: string) => {
    setSearchQuery({
      ...searchQuery,
      [key]: val.trim(),
    });
  };

  const provinceOptions = useMemo(() => {
    const list = data.province.map((item) => ({
      key: item.province_code,
      label: item.province_name,
    }));

    const copyList = [...list];
    const filtered =
      searchQuery.province === ""
        ? copyList
        : copyList.filter((val) =>
            val.label
              .toLowerCase()
              .replace(/\s+/g, "")
              .includes(searchQuery.province.toLowerCase().replace(/\s+/g, ""))
          );

    return filtered;
  }, [data.province, searchQuery.province]);

  const cityOptions = useMemo(() => {
    const list = data.city.map((item) => ({
      key: item.city_code,
      label: item.city_name,
    }));

    const copyList = [...list];
    const filtered =
      searchQuery.city === ""
        ? copyList
        : copyList.filter((val) =>
            val.label
              .toLowerCase()
              .replace(/\s+/g, "")
              .includes(searchQuery.city.toLowerCase().replace(/\s+/g, ""))
          );

    return filtered;
  }, [data.city, searchQuery.city]);

  const districtOptions = useMemo(() => {
    const list = data.district.map((item) => ({
      key: item.district_code,
      label: item.district_name,
    }));

    const copyList = [...list];
    const filtered =
      searchQuery.district === ""
        ? copyList
        : copyList.filter((val) =>
            val.label
              .toLowerCase()
              .replace(/\s+/g, "")
              .includes(searchQuery.district.toLowerCase().replace(/\s+/g, ""))
          );

    return filtered;
  }, [data.district, searchQuery.district]);

  const villageOptions = useMemo(() => {
    const list = data.village.map((item) => ({
      key: item.village_code,
      label: item.village_name,
    }));

    const copyList = [...list];
    const filtered =
      searchQuery.village === ""
        ? copyList
        : copyList.filter((val) =>
            val.label
              .toLowerCase()
              .replace(/\s+/g, "")
              .includes(searchQuery.village.toLowerCase().replace(/\s+/g, ""))
          );

    return filtered;
  }, [data.village, searchQuery.village]);

  // const summaryData = useMemo(() => {
  //   if (!formData) return [];

  //   const keys = Object.keys(formData);
  //   return keys
  //     .filter((key) => ATTR[key]?.label)
  //     .map((key) => ({
  //       key: ATTR[key].label,
  //       value: formData[key] || "-",
  //     }));
  // }, [formData]);

  useEffect(() => {
    if (!showOtherPaymentMethod) setValue("payment_method_other", "");
  }, [setValue, showOtherPaymentMethod]);

  const AddressForm = (index: 1 | 2) => {
    const isMainAddress = index === 1;
    const prefix = index === 2 ? "domicile_" : "";

    return (
      <>
        <TextArea
          required={isMainAddress}
          label={isMainAddress ? "Alamat Lengkap" : "Alamat Domisili"}
          placeholder="Alamat lengkap sesuai kartu identitas"
          className="col-span-4"
          rows={2}
          {...register(`${prefix}address`, {
            required: {
              value: isMainAddress,
              message: "Wajib diisi",
            },
          })}
        />

        <ComboBox
          required={isMainAddress}
          label="Provinsi"
          placeholder="Pilih provinsi"
          options={provinceOptions}
          className="col-span-4 md:col-span-2"
          onValueChange={(val) => {
            setValue(`${prefix}province_code`, String(val.key));
          }}
          onSearch={(val) => handleSearchQueryChange("province", val)}
          {...register(`${prefix}province_code`, {
            required: {
              value: isMainAddress,
              message: "Wajib diisi",
            },
          })}
        />

        <ComboBox
          required={isMainAddress}
          label="Kotamadya / Kabupaten"
          placeholder="Pilih kota atau kabupaten"
          options={cityOptions}
          className="col-span-4 md:col-span-2"
          onValueChange={(val) =>
            setValue(`${prefix}city_code`, String(val.key))
          }
          onSearch={(val) => handleSearchQueryChange("city", val)}
          {...register(`${prefix}city_code`, {
            required: {
              value: isMainAddress,
              message: "Wajib diisi",
            },
          })}
        />

        <ComboBox
          required={isMainAddress}
          label="Kecamatan"
          placeholder="Pilih kecamatan"
          options={districtOptions}
          className="col-span-4 md:col-span-3"
          onValueChange={(val) =>
            setValue(`${prefix}district_code`, String(val.key))
          }
          onSearch={(val) => handleSearchQueryChange("district", val)}
          {...register(`${prefix}district_code`, {
            required: {
              value: isMainAddress,
              message: "Wajib diisi",
            },
          })}
        />

        <Input
          type="number"
          label="Kode Pos"
          placeholder="00xxx"
          className="col-span-4 md:col-span-1"
          {...register(`${prefix}zip_code`)}
        />

        <ComboBox
          required={isMainAddress}
          label="Kelurahan / Desa"
          placeholder="Pilih kelurahan atau desa"
          options={villageOptions}
          className="col-span-4 md:col-span-2"
          onValueChange={(val) =>
            setValue(`${prefix}village_code`, String(val.key))
          }
          onSearch={(val) => handleSearchQueryChange("village", val)}
          {...register(`${prefix}village_code`, {
            required: {
              value: isMainAddress,
              message: "Wajib diisi",
            },
          })}
        />

        <Input
          required={isMainAddress}
          type="number"
          label="Rukun Tetangga / RT"
          placeholder="00x"
          className="col-span-4 md:col-span-1"
          {...register(`${prefix}rt`, {
            required: {
              value: isMainAddress,
              message: "Wajib diisi",
            },
          })}
        />

        <Input
          required={isMainAddress}
          type="number"
          label="Rukun Warga / RW"
          placeholder="00x"
          className="col-span-4 md:col-span-1"
          {...register(`${prefix}rw`, {
            required: {
              value: isMainAddress,
              message: "Wajib diisi",
            },
          })}
        />
      </>
    );
  };

  return (
    <>
      <form onSubmit={handleSubmit(submitForm)}>
        <FormSection title="Identitas">
          <div className="grid grid-cols-4 gap-6">
            {/* patient_name */}
            <Input
              required
              type="text"
              label="Nama Lengkap"
              placeholder="Nama pasien sesuai KTP"
              className="col-span-4"
              {...register("patient_name", {
                required: {
                  value: true,
                  message: "Wajib diisi",
                },
              })}
            />

            {/* id_card_number */}
            <Input
              required
              type="text"
              label="NIK"
              placeholder="16 digit nomor KTP"
              className="col-span-4 md:col-span-2"
              {...register("id_card_number", {
                required: {
                  value: true,
                  message: "Wajib diisi",
                },
              })}
            />

            {/* id_card_number_2 */}
            <Input
              type="text"
              label="Nomor Identitas Lain (Khusus WNA)"
              placeholder="Nomor PASPOR / KITAS"
              className="col-span-4 md:col-span-2"
              {...register("other_id_card_number")}
            />

            {/* mother_name */}
            <Input
              required
              type="text"
              label="Nama Ibu Kandung"
              placeholder="Nama ibu kandung sesuai KTP"
              className="col-span-4"
              {...register("mother_name")}
            />

            {/* birthplace */}
            <Input
              required
              type="text"
              label="Tempat Lahir"
              placeholder="Nama Kota/Kabupaten"
              className="col-span-4 md:col-span-2"
              {...register("birthplace", {
                required: {
                  value: true,
                  message: "Wajib diisi",
                },
              })}
            />

            {/* birthdate */}
            <Input
              required
              type="date"
              label="Tanggal Lahir"
              placeholder="DD/MM/YYYY"
              className="col-span-4 md:col-span-2"
              {...register("birthdate", {
                required: {
                  value: true,
                  message: "Wajib diisi",
                },
              })}
            />

            {/* gender */}
            <ComboBox
              required
              id="gender"
              label="Jenis Kelamin"
              placeholder="Pilih jenis kelamin"
              options={OPTIONS_GENDER}
              className="col-span-4 md:col-span-2"
              {...register("gender", {
                required: {
                  value: true,
                  message: "Wajib diisi",
                },
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
              type="number"
              label="No. HP"
              placeholder="08123xxxxxxx"
              className="col-span-4 md:col-span-2"
              {...register("phone_number", {
                required: {
                  value: true,
                  message: "Wajib diisi",
                },
              })}
            />
            <Input
              type="number"
              label="No. Telepon Rumah"
              placeholder="08123xxxxxxx"
              className="col-span-4 md:col-span-2"
              {...register("phone_number")}
            />
          </div>
        </FormSection>

        <FormSection title="Lain-lain">
          <div className="grid grid-cols-3 gap-6">
            <ComboBox
              label="Pendidikan Terakhir"
              placeholder="Pilih pendidikan terakhir"
              options={OPTIONS_EDUCATION}
              className="col-span-3 md:col-span-1"
              {...register("education")}
            />

            <ComboBox
              label="Pekerjaan"
              placeholder="Pekerjaan saat ini"
              options={OPTIONS_OCCUPATION}
              className="col-span-3 md:col-span-1"
              {...register("job")}
            />

            <ComboBox
              required
              id="marital"
              label="Status pernikahan"
              placeholder="Status pernikahan"
              options={OPTIONS_MARITAL_STATUS}
              className="col-span-3 md:col-span-1"
              {...register("marital", {
                required: {
                  value: true,
                  message: "Wajib diisi",
                },
              })}
            />
            <ComboBox
              label="Metode Pembayaran"
              placeholder="Pilih metode pembayaran"
              className="col-span-3 md:col-span-2"
              onValueChange={(val: { key: number; label: string }) =>
                setShowOtherPaymentMethod(val.label === "Asuransi Lainnya")
              }
              options={OPTIONS_PAYMENT_METHOD}
              {...register("payment_method")}
            />
            {showOtherPaymentMethod && (
              <Input
                type="text"
                label="Asuransi Lainnya"
                placeholder="Tulis jenis asuransi"
                className="col-span-3 md:col-span-1"
                {...register("payment_method_other", {
                  required: {
                    value: showOtherPaymentMethod,
                    message: "Wajib diisi",
                  },
                })}
              />
            )}
          </div>
        </FormSection>

        <div className="col-span-2 flex items-start gap-2 py-6">
          <CheckBox {...register("general_consent")} />
          <Typography>
            Pasien telah diberikan penjelasan mengenai <i>General Consent</i>{" "}
            atau Persetujuan Umum.
            <Typography link as="span" className="cursor-pointer ">
              Klik disini untuk cetak <i>General Consent</i>
            </Typography>
          </Typography>
        </div>
        <Button type="submit" color="primary" className="w-full">
          Simpan
        </Button>
      </form>

      {/* <ConfirmationModal
        items={summaryData}
        open={showConfirmation}
        onClose={() => setShowConfirmation(false)}
        onContinue={() => setShowConfirmation(false)}
      /> */}
    </>
  );
};

export default FormAdult;
