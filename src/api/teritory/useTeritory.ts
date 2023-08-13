import useProvince from "./useProvince";
import useCity from "./useCity";
import useDistrict from "./useDistrict";
import useVillage from "./useVillage";

interface UseTeritoryProps {
  provinceCode?: string,
  cityCode?: string,
  districtCode?: string,
}

const useTeritory = ({ provinceCode, cityCode, districtCode }: UseTeritoryProps) => {
  const { data: dataProvince, isFetching: loadingProvince } = useProvince();
  const { data: dataCity, isFetching: loadingCity } = useCity({ provinceCode });
  const { data: dataDistrict, isFetching: loadingDistrict } = useDistrict({ cityCode });
  const { data: dataVillage, isFetching: loadingVillage } = useVillage({ districtCode });

  return {
    data: {
      province: dataProvince?.data?.data?.province || [],
      city: dataCity?.data?.data?.city || [],
      district: dataDistrict?.data?.data?.district || [],
      village: dataVillage?.data?.data?.village || [],
    },
    loading: {
      province: loadingProvince,
      city: loadingCity,
      district: loadingDistrict,
      village: loadingVillage,
    }
  }
}

export default useTeritory;
