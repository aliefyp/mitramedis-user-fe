import useTeritory from "api/teritory/useTeritory";
import { Label, Textarea, TextInput, Select } from "flowbite-react";
import { useEffect, useMemo } from "react";

const AddressForm = ({
  isMainAddress,
  watch,
  resetField,
  register,
  setValue,
  errors,
}) => {
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
    return data.province.map((item) => ({
      key: item.province_code,
      label: item.province_name,
    }));
  }, [data.province]);

  const cityOptions = useMemo(() => {
    return data.city.map((item) => ({
      key: item.city_code,
      label: item.city_name,
    }));
  }, [data.city]);

  const districtOptions = useMemo(() => {
    return data.district.map((item) => ({
      key: item.district_code,
      label: item.district_name,
    }));
  }, [data.district]);

  const villageOptions = useMemo(() => {
    return data.village.map((item) => ({
      key: item.village_code,
      label: item.village_name,
      zip_code: item.zip_code,
    }));
  }, [data.village]);

  useEffect(() => {
    if (watchProvince) {
      resetField(`${prefix}city_code`);
      resetField(`${prefix}district_code`);
      resetField(`${prefix}village_code`);

      setValue(
        `${prefix}province_string`,
        provinceOptions.find((i) => i.key === watchProvince)?.label
      );
    }
  }, [prefix, provinceOptions, resetField, setValue, watchProvince]);

  useEffect(() => {
    if (watchCity) {
      resetField(`${prefix}district_code`);
      resetField(`${prefix}village_code`);

      setValue(
        `${prefix}city_string`,
        cityOptions.find((i) => i.key === watchCity)?.label
      );
    }
  }, [cityOptions, prefix, resetField, setValue, watchCity]);

  useEffect(() => {
    if (watchDistrict) {
      resetField(`${prefix}village_code`);

      setValue(
        `${prefix}district_string`,
        districtOptions.find((i) => i.key === watchDistrict)?.label
      );
    }
  }, [districtOptions, prefix, resetField, setValue, watchDistrict]);

  useEffect(() => {
    if (watchVillage) {
      setValue(
        `${prefix}zip_code`,
        villageOptions.find((i) => i.key === watchVillage)?.zip_code
      );
      setValue(
        `${prefix}village_string`,
        villageOptions.find((i) => i.key === watchVillage)?.label
      );
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
          rows={2}
          required={isMainAddress}
          placeholder="Alamat lengkap sesuai kartu identitas"
          color={Boolean(errors?.[`${prefix}address`]) ? "failure" : "gray"}
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
          defaultValue=""
          required={isMainAddress}
          color={
            Boolean(errors?.[`${prefix}province_code`]) ? "failure" : "gray"
          }
          helperText={errors?.[`${prefix}province_code`]?.message}
          {...register(`${prefix}province_code`, {
            required: {
              value: isMainAddress,
              message: "Wajib diisi",
            },
          })}
        >
          <option value="" disabled>
            Pilih provinsi
          </option>
          {provinceOptions?.map((item) => (
            <option key={item.key} value={item.key}>
              {item.label}
            </option>
          ))}
        </Select>
      </div>

      <div className="col-span-4 md:col-span-2">
        <Label htmlFor={`${prefix}city_code`} value="Kota / Kabupaten" />
        <Select
          defaultValue=""
          required={isMainAddress}
          color={Boolean(errors?.[`${prefix}city_code`]) ? "failure" : "gray"}
          helperText={errors?.[`${prefix}city_code`]?.message}
          {...register(`${prefix}city_code`, {
            required: {
              value: isMainAddress,
              message: "Wajib diisi",
            },
          })}
        >
          <option value="" disabled>
            Pilih kota atau kabupaten
          </option>
          {cityOptions?.map((item) => (
            <option key={item.key} value={item.key}>
              {item.label}
            </option>
          ))}
        </Select>
      </div>

      <div className="col-span-4 md:col-span-2">
        <Label htmlFor={`${prefix}district_code`} value="Kecamatan" />
        <Select
          defaultValue=""
          required={isMainAddress}
          color={
            Boolean(errors?.[`${prefix}district_code`]) ? "failure" : "gray"
          }
          helperText={errors?.[`${prefix}district_code`]?.message}
          {...register(`${prefix}district_code`, {
            required: {
              value: isMainAddress,
              message: "Wajib diisi",
            },
          })}
        >
          <option value="" disabled>
            Pilih kecamatan
          </option>
          {districtOptions?.map((item) => (
            <option key={item.key} value={item.key}>
              {item.label}
            </option>
          ))}
        </Select>
      </div>

      <div className="col-span-4 md:col-span-2">
        <Label htmlFor={`${prefix}village_code`} value="Kelurahan / Desa" />
        <Select
          defaultValue=""
          required={isMainAddress}
          color={
            Boolean(errors?.[`${prefix}village_code`]) ? "failure" : "gray"
          }
          helperText={errors?.[`${prefix}village_code`]?.message}
          {...register(`${prefix}village_code`, {
            required: {
              value: isMainAddress,
              message: "Wajib diisi",
            },
          })}
        >
          <option value="" disabled>
            Pilih kelurahan atau desa
          </option>
          {villageOptions?.map((item) => (
            <option key={item.key} value={item.key}>
              {item.label}
            </option>
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
          color={Boolean(errors?.[`${prefix}rt`]) ? "failure" : "gray"}
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
          color={Boolean(errors?.[`${prefix}rw`]) ? "failure" : "gray"}
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
