import useProvince from "./useProvince";
import useCity from "./useCity";
import useDistrict from "./useDistrict";
import useVillage from "./useVillage";

interface UseTeritoryProps {
  selectedProvince?: number,
  selectedCity?: number,
  selectedDistrict?: number,
}

const useTeritory = ({ selectedProvince, selectedCity, selectedDistrict }: UseTeritoryProps) => {
  const { data: dataProvince, isLoading: loadingProvince } = useProvince();
  const { data: dataCity, isLoading: loadingCity } = useCity({ provinceCode: selectedProvince });
  const { data: dataDistrict, isLoading: loadingDistrict } = useDistrict({ cityCode: selectedCity });
  const { data: dataVillage, isLoading: loadingVillage } = useVillage({ districtCode: selectedDistrict });

  return {
    data: {
      province: dataProvince?.data?.province || [],
      city: dataCity?.data?.city || [],
      district: dataDistrict?.data?.district || [],
      village: dataVillage?.data?.village || [],
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