import Button from "components/Button";
import Input from "components/FormInput/Input";
import TextArea from "components/FormInput/TextArea";
import Toggle from "components/Toggle";
import Typography from "components/Typography";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { PatientType } from "types/patient";
import {
  OPTIONS_EDUCATION,
  OPTIONS_GENDER,
  OPTIONS_MARITAL_STATUS,
  OPTIONS_OCCUPATION,
  OPTIONS_PAYMENT_METHOD,
  FORM_ADULT_PATIENT_ATTRIBUTES as ATTR,
} from "../constants";
import FormSection from "components/FormSection";
import CheckBox from "components/FormInput/CheckBox";
import ComboBox from "components/FormInput/ComboBox";
import ConfirmationModal from "./ConfirmationModal";
import useTeritory from "api/address/useTeritory";

const FormAdult = () => {
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

  const { register, setValue, watch, handleSubmit } = useForm<PatientType>();

  const watchProvince = watch("address_1_province");
  const watchCity = watch("address_1_city");
  const watchDistrict = watch("address_1_district");

  const { data } = useTeritory({
    selectedProvince: watchProvince,
    selectedCity: watchCity,
    selectedDistrict: watchDistrict,
  });

  console.log("watchProvince", watchProvince);

  const onSubmit = (val: PatientType) => {
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

  const summaryData = useMemo(() => {
    if (!formData) return [];

    const keys = Object.keys(formData);
    return keys
      .filter((key) => ATTR[key]?.label)
      .map((key) => ({
        key: ATTR[key].label,
        value: formData[key] || "-",
      }));
  }, [formData]);

  const AddressForm = (index: 1 | 2) => {
    const isMainAddress = index === 1;

    return (
      <>
        <TextArea
          required={isMainAddress}
          label={ATTR[`address_${index}`].label}
          placeholder={ATTR[`address_${index}`].placeholder}
          className="col-span-4"
          rows={2}
          {...register(`address_${index}`, {
            required: {
              value: isMainAddress,
              message: "Wajib diisi",
            },
          })}
        />

        <ComboBox
          required={isMainAddress}
          label={ATTR[`address_${index}_province`].label}
          placeholder={ATTR[`address_${index}_province`].placeholder}
          options={provinceOptions}
          className="col-span-4 md:col-span-2"
          onValueChange={(val) => {
            console.log(val);
            setValue(`address_${index}_province`, val.key as string);
          }}
          onSearch={(val) => handleSearchQueryChange("province", val)}
          {...register(`address_${index}_province`, {
            required: {
              value: isMainAddress,
              message: "Wajib diisi",
            },
          })}
        />

        <ComboBox
          required={isMainAddress}
          label={ATTR[`address_${index}_city`].label}
          placeholder={ATTR[`address_${index}_city`].placeholder}
          options={cityOptions}
          className="col-span-4 md:col-span-2"
          onValueChange={(val) => setValue(`address_${index}_city`, val.label)}
          onSearch={(val) => handleSearchQueryChange("city", val)}
          {...register(`address_${index}_city`, {
            required: {
              value: isMainAddress,
              message: "Wajib diisi",
            },
          })}
        />

        <ComboBox
          required={isMainAddress}
          label={ATTR[`address_${index}_district`].label}
          placeholder={ATTR[`address_${index}_district`].placeholder}
          options={districtOptions}
          className="col-span-4 md:col-span-3"
          onValueChange={(val) =>
            setValue(`address_${index}_district`, val.label)
          }
          onSearch={(val) => handleSearchQueryChange("district", val)}
          {...register(`address_${index}_district`, {
            required: {
              value: isMainAddress,
              message: "Wajib diisi",
            },
          })}
        />

        <Input
          type="number"
          label={ATTR[`address_${index}_zip`].label}
          placeholder={ATTR[`address_${index}_zip`].placeholder}
          className="col-span-4 md:col-span-1"
          {...register(`address_${index}_zip`)}
        />

        <ComboBox
          required={isMainAddress}
          label={ATTR[`address_${index}_village`].label}
          placeholder={ATTR[`address_${index}_village`].placeholder}
          options={villageOptions}
          className="col-span-4 md:col-span-2"
          onValueChange={(val) =>
            setValue(`address_${index}_village`, val.label)
          }
          onSearch={(val) => handleSearchQueryChange("village", val)}
          {...register(`address_${index}_village`, {
            required: {
              value: isMainAddress,
              message: "Wajib diisi",
            },
          })}
        />

        <Input
          required={isMainAddress}
          type="number"
          label={ATTR[`address_${index}_rt`].label}
          placeholder={ATTR[`address_${index}_rt`].placeholder}
          className="col-span-4 md:col-span-1"
          {...register(`address_${index}_rt`, {
            required: {
              value: isMainAddress,
              message: "Wajib diisi",
            },
          })}
        />

        <Input
          required={isMainAddress}
          type="number"
          label={ATTR[`address_${index}_rw`].label}
          placeholder={ATTR[`address_${index}_rw`].placeholder}
          className="col-span-4 md:col-span-1"
          {...register(`address_${index}_rw`, {
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
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormSection title="Identitas">
          <div className="grid grid-cols-4 gap-6">
            {/* patient_name */}
            <Input
              required
              type="text"
              label={ATTR.patient_name.label}
              placeholder={ATTR.patient_name.placeholder}
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
              label={ATTR.id_card_number.label}
              placeholder={ATTR.id_card_number.placeholder}
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
              label={ATTR.id_card_number_2.label}
              placeholder={ATTR.id_card_number_2.placeholder}
              className="col-span-4 md:col-span-2"
              {...register("id_card_number_2")}
            />

            {/* mother_name */}
            <Input
              required
              type="text"
              label={ATTR.mother_name.label}
              placeholder={ATTR.mother_name.placeholder}
              className="col-span-4"
              {...register("mother_name")}
            />

            {/* birth_place */}
            <Input
              required
              type="text"
              label={ATTR.birth_place.label}
              placeholder={ATTR.birth_place.placeholder}
              className="col-span-4 md:col-span-2"
              {...register("birth_place", {
                required: {
                  value: true,
                  message: "Wajib diisi",
                },
              })}
            />

            {/* birth_date */}
            <Input
              required
              type="date"
              label={ATTR.birth_date.label}
              placeholder={ATTR.birth_date.placeholder}
              className="col-span-4 md:col-span-2"
              {...register("birth_date", {
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
              label={ATTR.gender.label}
              placeholder={ATTR.gender.placeholder}
              options={OPTIONS_GENDER.map((item, index) => ({
                key: index + 1,
                label: item,
              }))}
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
              label={ATTR.phone_1.label}
              placeholder={ATTR.phone_1.placeholder}
              className="col-span-4 md:col-span-2"
              {...register("phone_1", {
                required: {
                  value: true,
                  message: "Wajib diisi",
                },
              })}
            />
            <Input
              type="number"
              label={ATTR.phone_2.label}
              placeholder={ATTR.phone_2.placeholder}
              className="col-span-4 md:col-span-2"
              {...register("phone_2")}
            />
          </div>
        </FormSection>

        <FormSection title="Lain-lain">
          <div className="grid grid-cols-3 gap-6">
            <ComboBox
              id="education"
              label={ATTR.education.label}
              placeholder={ATTR.education.placeholder}
              options={OPTIONS_EDUCATION.map((item, index) => ({
                key: index + 1,
                label: item,
              }))}
              className="col-span-3 md:col-span-1"
              {...register("education")}
            />

            <ComboBox
              id="occupation"
              label={ATTR.occupation.label}
              placeholder={ATTR.occupation.placeholder}
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
              label={ATTR.marital_status.label}
              placeholder={ATTR.marital_status.placeholder}
              options={OPTIONS_MARITAL_STATUS.map((item, index) => ({
                key: index + 1,
                label: item,
              }))}
              className="col-span-3 md:col-span-1"
              {...register("marital_status", {
                required: {
                  value: true,
                  message: "Wajib diisi",
                },
              })}
            />
            <ComboBox
              label={ATTR.payment_method.label}
              placeholder={ATTR.payment_method.placeholder}
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
                type="text"
                label={ATTR.payment_method_other.label}
                placeholder={ATTR.payment_method_other.placeholder}
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
          <CheckBox {...register("consent")} />
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

      <ConfirmationModal
        items={summaryData}
        open={showConfirmation}
        onClose={() => setShowConfirmation(false)}
        onContinue={() => setShowConfirmation(false)}
      />
    </>
  );
};

export default FormAdult;
