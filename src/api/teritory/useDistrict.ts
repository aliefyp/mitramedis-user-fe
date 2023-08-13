import { AxiosResponse } from "axios"
import { useQuery } from "react-query"
import { DistrictResponse } from "types/teritory";
import useFetcher from "hooks/useFetcher";

type GetDistrictResponse = AxiosResponse & DistrictResponse;

const useDistrict = ({ cityCode }: { cityCode: string }) => {
  const fetch = useFetcher(`${process.env.REACT_APP_API_ENDPOINT}/teritory/district?city_code=${cityCode}`);

  return useQuery<unknown, Error, GetDistrictResponse>({
    queryKey: ['get-district', cityCode],
    queryFn: fetch,
  })
}

export default useDistrict;
