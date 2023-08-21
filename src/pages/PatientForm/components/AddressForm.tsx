import useTeritory from "api/teritory/useTeritory";
import ComboBox from "components/FormInput/ComboBox";
import Input from "components/FormInput/Input";
import TextArea from "components/FormInput/TextArea";
import { useEffect, useMemo, useState } from "react";

const AddressForm = ({
  isMainAddress,
  watch,
  resetField,
  register,
  setValue,
  errors,
}) => {
  const [searchQuery, setSearchQuery] = useState({
    province: "",
    city: "",
    district: "",
    village: "",
  });

  const prefix = !isMainAddress ? "domicile_" : "";

  const watchProvince = watch(`${prefix}province_code`);
  const watchCity = watch(`${prefix}city_code`);
  const watchDistrict = watch(`${prefix}district_code`);

  const { data } = useTeritory({
    provinceCode: watchProvince,
    cityCode: watchCity,
    districtCode: watchDistrict,
  });

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

  const handleSearchQueryChange = (key: string, val: string) => {
    setSearchQuery({
      ...searchQuery,
      [key]: val.trim(),
    });
  };

  useEffect(() => {
    if (watchProvince) {
      resetField("city_code");
      resetField("district_code");
      resetField("village_code");
    }
  }, [resetField, watchProvince]);

  useEffect(() => {
    if (watchCity) {
      resetField("district_code");
      resetField("village_code");
    }
  }, [resetField, watchCity]);

  useEffect(() => {
    if (watchDistrict) {
      resetField("village_code");
    }
  }, [resetField, watchDistrict]);

  return (
    <>
      <TextArea
        required={isMainAddress}
        label={isMainAddress ? "Alamat Lengkap" : "Alamat Domisili"}
        placeholder="Alamat lengkap sesuai kartu identitas"
        className="col-span-4"
        rows={2}
        error={Boolean(errors?.[`${prefix}address`])}
        helper={errors?.[`${prefix}address`]?.message}
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
        error={Boolean(errors?.[`${prefix}province_code`])}
        helper={errors?.[`${prefix}province_code`]?.message}
        className="col-span-4 md:col-span-2"
        onValueChange={(val) => {
          setValue(`${prefix}province_code`, String(val.key));
          setValue(`${prefix}province_string`, String(val.label));
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
        error={Boolean(errors?.[`${prefix}city_code`])}
        helper={errors?.[`${prefix}city_code`]?.message}
        onValueChange={(val) => {
          setValue(`${prefix}city_code`, String(val.key));
          setValue(`${prefix}city_string`, String(val.label));
        }}
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
        error={Boolean(errors?.[`${prefix}district_code`])}
        helper={errors?.[`${prefix}district_code`]?.message}
        className="col-span-4 md:col-span-2"
        onValueChange={(val) => {
          setValue(`${prefix}district_code`, String(val.key));
          setValue(`${prefix}district_string`, String(val.label));
        }}
        onSearch={(val) => handleSearchQueryChange("district", val)}
        {...register(`${prefix}district_code`, {
          required: {
            value: isMainAddress,
            message: "Wajib diisi",
          },
        })}
      />

      <Input
        type="text"
        label="Kode Pos"
        placeholder="00xxx"
        className="col-span-4 md:col-span-2"
        {...register(`${prefix}zip_code`, {
          pattern: {
            value: /[0-9]/,
            message: "Format tidak sesuai",
          },
        })}
      />

      <ComboBox
        required={isMainAddress}
        label="Kelurahan / Desa"
        placeholder="Pilih kelurahan atau desa"
        options={villageOptions}
        error={Boolean(errors?.[`${prefix}village_code`])}
        helper={errors?.[`${prefix}village_code`]?.message}
        className="col-span-4 md:col-span-2"
        onValueChange={(val) => {
          setValue(`${prefix}village_code`, String(val.key));
          setValue(`${prefix}village_string`, String(val.label));
        }}
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
        type="text"
        label="Rukun Tetangga / RT"
        placeholder="00x"
        error={Boolean(errors?.[`${prefix}rt`])}
        helper={errors?.[`${prefix}rt`]?.message}
        className="col-span-4 md:col-span-1"
        {...register(`${prefix}rt`, {
          required: {
            value: isMainAddress,
            message: "Wajib diisi",
          },
          pattern: {
            value: /[0-9]{16}/,
            message: "Format tidak sesuai",
          },
        })}
      />

      <Input
        required={isMainAddress}
        type="text"
        label="Rukun Warga / RW"
        placeholder="00x"
        error={Boolean(errors?.[`${prefix}rw`])}
        helper={errors?.[`${prefix}rw`]?.message}
        className="col-span-4 md:col-span-1"
        {...register(`${prefix}rw`, {
          required: {
            value: isMainAddress,
            message: "Wajib diisi",
          },
          pattern: {
            value: /[0-9]{16}/,
            message: "Format tidak sesuai",
          },
        })}
      />
    </>
  );
};

export default AddressForm;
