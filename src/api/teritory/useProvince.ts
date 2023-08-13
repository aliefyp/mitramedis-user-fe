import { AxiosResponse } from "axios"
import { useQuery } from "react-query"
import { ProvinceResponse } from "types/teritory";
import useFetcher from "hooks/useFetcher";

type GetProvinceResponse = AxiosResponse & ProvinceResponse;

const useProvince = () => {
  const fetch = useFetcher(`${process.env.REACT_APP_API_ENDPOINT}/teritory/province`);

  return useQuery<unknown, Error, GetProvinceResponse>({
    queryKey: 'get-province',
    queryFn: fetch,
  })
}

export default useProvince;
