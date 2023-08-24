import useTeritory from "api/teritory/useTeritory";
import { Label, Textarea, TextInput, Select } from "flowbite-react";
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

  console.log(setSearchQuery);

  const prefix = !isMainAddress ? "domicile_" : "";

  const watchProvince = watch(`${prefix}province_code`);
  const watchCity = watch(`${prefix}city_code`);
  const watchDistrict = watch(`${prefix}district_code`);
  const watchVillage = watch(`${prefix}village_code`);

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
      zip_code: item.zip_code,
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

  // const handleSearchQueryChange = (key: string, val: string) => {
  //   setSearchQuery({
  //     ...searchQuery,
  //     [key]: val.trim(),
  //   });
  // };

  useEffect(() => {
    if (watchProvince) {
      resetField(`${prefix}city_code`);
      resetField(`${prefix}district_code`);
      resetField(`${prefix}village_code`);

      // setValue(
      //   `${prefix}province_string`,
      //   provinceOptions.find((i) => i.key === watchProvince).label
      // );
    }
  }, [prefix, provinceOptions, resetField, setValue, watchProvince]);

  useEffect(() => {
    if (watchCity) {
      resetField(`${prefix}district_code`);
      resetField(`${prefix}village_code`);

      // setValue(
      //   `${prefix}city_string`,
      //   cityOptions.find((i) => i.key === watchCity).label
      // );
    }
  }, [cityOptions, prefix, resetField, setValue, watchCity]);

  useEffect(() => {
    if (watchDistrict) {
      resetField(`${prefix}village_code`);

      // setValue(
      //   `${prefix}district_string`,
      //   districtOptions.find((i) => i.key === watchDistrict).label
      // );
    }
  }, [districtOptions, prefix, resetField, setValue, watchDistrict]);

  useEffect(() => {
    if (watchVillage) {
      setValue(
        `${prefix}zip_code`,
        villageOptions.find((i) => i.key === watchVillage)?.zip_code
      );

      // setValue(
      //   `${prefix}village_string`,
      //   villageOptions.find((i) => i.key === watchVillage).label
      // );
    }
  }, [prefix, setValue, villageOptions, watchVillage]);

  return (
    <>
      <div className="col-span-4">
        <div className="mb-2 block">
          <Label
            htmlFor={`${prefix}address`}
            value={isMainAddress ? "Alamat Lengkap" : "Alamat Domisili"}
          />
        </div>
        <Textarea
          required={isMainAddress}
          placeholder="Alamat lengkap sesuai kartu identitas"
          rows={2}
          error={Boolean(errors?.[`${prefix}address`])}
          helperText={errors?.[`${prefix}address`]?.message}
          {...register(`${prefix}address`, {
            required: {
              value: isMainAddress,
              message: "Wajib diisi",
            },
          })}
        />
      </div>

      <div className="col-span-4 md:col-span-2">
        <Label htmlFor={`${prefix}province_code`} value="Provinsi" />
        <Select
          required={isMainAddress}
          placeholder="Pilih provinsi"
          error={Boolean(errors?.[`${prefix}province_code`])}
          helperText={errors?.[`${prefix}province_code`]?.message}
          {...register(`${prefix}province_code`, {
            required: {
              value: isMainAddress,
              message: "Wajib diisi",
            },
          })}
        >
          {provinceOptions?.map((item) => (
            <option value={item.key}>{item.label}</option>
          ))}
        </Select>
      </div>

      <div className="col-span-4 md:col-span-2">
        <Label htmlFor={`${prefix}city_code`} value="Kota / Kabupaten" />
        <Select
          required={isMainAddress}
          placeholder="Pilih kota atau kabupaten"
          error={Boolean(errors?.[`${prefix}city_code`])}
          helperText={errors?.[`${prefix}city_code`]?.message}
          {...register(`${prefix}city_code`, {
            required: {
              value: isMainAddress,
              message: "Wajib diisi",
            },
          })}
        >
          {cityOptions?.map((item) => (
            <option value={item.key}>{item.label}</option>
          ))}
        </Select>
      </div>

      <div className="col-span-4 md:col-span-2">
        <Label htmlFor={`${prefix}district_code`} value="Kecamatan" />
        <Select
          required={isMainAddress}
          // placeholder="Pilih kecamatan"
          error={Boolean(errors?.[`${prefix}district_code`])}
          helperText={errors?.[`${prefix}district_code`]?.message}
          {...register(`${prefix}district_code`, {
            required: {
              value: isMainAddress,
              message: "Wajib diisi",
            },
          })}
        >
          {districtOptions?.map((item) => (
            <option value={item.key}>{item.label}</option>
          ))}
        </Select>
      </div>

      <div className="col-span-4 md:col-span-2">
        <Label htmlFor={`${prefix}village_code`} value="Kelurahan / Desa" />
        <Select
          required={isMainAddress}
          // placeholder="Pilih kelurahan atau desa"
          error={Boolean(errors?.[`${prefix}village_code`])}
          helperText={errors?.[`${prefix}village_code`]?.message}
          {...register(`${prefix}village_code`, {
            required: {
              value: isMainAddress,
              message: "Wajib diisi",
            },
          })}
        >
          {villageOptions?.map((item) => (
            <option value={item.key}>{item.label}</option>
          ))}
        </Select>
      </div>

      <div className="col-span-4 md:col-span-2">
        <Label htmlFor={`${prefix}zip_code`} value="Kode Pos" />
        <TextInput
          type="text"
          placeholder="00xxx"
          className="col-span-4 md:col-span-2"
          {...register(`${prefix}zip_code`, {
            pattern: {
              value: /[0-9]/,
              message: "Format tidak sesuai",
            },
          })}
        />
      </div>

      <div className="col-span-4 md:col-span-1">
        <Label htmlFor={`${prefix}rt`} value="Rukun Tetangga / RT" />
        <TextInput
          required={isMainAddress}
          type="text"
          label="Rukun Tetangga / RT"
          placeholder="00x"
          error={Boolean(errors?.[`${prefix}rt`])}
          helper={errors?.[`${prefix}rt`]?.message}
          {...register(`${prefix}rt`, {
            required: {
              value: isMainAddress,
              message: "Wajib diisi",
            },
            pattern: {
              value: /[0-9]/,
              message: "Format tidak sesuai",
            },
          })}
        />
      </div>

      <div className="col-span-4 md:col-span-1">
        <Label htmlFor={`${prefix}rw`} value="Rukun Warga / RW" />
        <TextInput
          required={isMainAddress}
          type="text"
          placeholder="00x"
          error={Boolean(errors?.[`${prefix}rw`])}
          helper={errors?.[`${prefix}rw`]?.message}
          {...register(`${prefix}rw`, {
            required: {
              value: isMainAddress,
              message: "Wajib diisi",
            },
            pattern: {
              value: /[0-9]/,
              message: "Format tidak sesuai",
            },
          })}
        />
      </div>
    </>
  );
};

export default AddressForm;
